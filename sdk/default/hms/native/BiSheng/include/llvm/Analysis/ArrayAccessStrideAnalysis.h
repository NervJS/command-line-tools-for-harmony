#if defined(BSPUB_COMMON)
//===--- ArrayAccessStrideAnalysis.h - Analysis for Array Restructuring ---===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// This pass determines array access strides for array restructuring.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_ANALYSIS_ARRAYACCESSSTRIDE_H
#define LLVM_ANALYSIS_ARRAYACCESSSTRIDE_H

#include "llvm/ADT/MapVector.h"
#include "llvm/ADT/SetVector.h"
#include "llvm/Analysis/AliasAnalysis.h"
#include "llvm/Analysis/LegalityPtrUseVisitor.h"
#include "llvm/Analysis/LoopInfo.h"
#include "llvm/IR/Instructions.h"
#include "llvm/IR/Value.h"
#include "llvm/InitializePasses.h"
#include "llvm/Pass.h"
#include "llvm/Support/raw_ostream.h"
#include <stack>

namespace llvm {
class ArrayAccessStrideInfo {
public:
  explicit ArrayAccessStrideInfo() {}

  /// Invoked by wrapper passes to build the analysis result. This should
  /// probably be moved into the constructor when the legacy PM is removed.
  bool build(Module &M,
             std::function<const TargetLibraryInfo &(Function &)> GetTLI);

  /// This structure holds information for a single candidate array
  /// for array restructuring.
  struct CandidateArrayInfo {
    /// Definition value for the candidate array.
    Value *ArrayVal;
    /// Allocation instruction for the candidate array.
    /// (i.e., call to malloc)
    Instruction *AllocSiteInst;
    /// Array element type.
    Type *ElementType;
    /// Size of the array in bits.
    uint64_t Size = 0;
    /// M is the determined access stride,
    /// or the implicit structure size in the context
    /// of array-of-structures.
    int AccessStride = 0;
    /// N value is number of implcit structures in the array.
    /// This value is derived from the size of the array and the
    /// access stride (or implicit structure size).
    int NumAccesses = 0;
    /// True if candidate is legal, otherwise false.
    bool IsLegal = false;
    /// Number of different allocations this candidate sees.
    unsigned NumAllocations = 0;
    /// The set holds other candidate arrays that require the same
    /// transformation. If a candidate array has dependent arrays,
    /// the transformation must be applied to all, or none.
    std::unordered_set<CandidateArrayInfo *> RelatedArrays;
    /// Information from Escape Analysis
    bool IsAborted = true;
    MapVector<Value *, ActualType> VisitedValues;
    SetVector<Instruction *> EscapeRoots;
    SetVector<Instruction *> EscapingInsts;
    SetVector<Instruction *> TerminalInsts;
  };

  /// Functor for finding CandidateArrayInfo using ArrayVal.
  struct CandidateArrayFindByArray {
    CandidateArrayFindByArray(Value *ArrayVal) : ArrayVal(ArrayVal) {}
    bool operator()(CandidateArrayInfo *const &Other) {
      return (Other->ArrayVal == ArrayVal);
    }

  private:
    /// Definition value for the candidate array.
    Value *ArrayVal;
  };

  /// Functor for finding CandidateArrayInfo using AllocSiteInst.
  struct CandidateArrayFindByAllocSiteInst {
    CandidateArrayFindByAllocSiteInst(Instruction *AllocSiteInst)
        : AllocSiteInst(AllocSiteInst) {}
    bool operator()(CandidateArrayInfo *const &Other) {
      return (Other->AllocSiteInst == AllocSiteInst);
    }

  private:
    /// Definition value for the candidate array.
    Instruction *AllocSiteInst;
  };

  /// This structure holds candidate arrays
  /// with common transformation parameters,
  /// and is passed to the transformation pass.
  struct CandidateArrayGroupInfo {
    /// Array element type.
    Type *ElementType;
    /// Size of the array in bits.
    uint64_t Size;
    /// M is the determined access stride,
    /// or the implicit structure size in the context
    /// of array-of-structures.
    int AccessStride;
    /// N value is number of implcit structures in the array.
    /// This value is derived from the size of the array and the
    /// access stride (or implicit structure size).
    int NumAccesses;
    /// The candidate arrays that share the above common values.
    std::unordered_set<CandidateArrayInfo *> RelatedArrays;

    std::unordered_map<Value *, ActualType> VisitedValues;
    std::unordered_set<Instruction *> EscapeRoots;
    std::unordered_set<Instruction *> TerminalInsts;
    CandidateArrayGroupInfo() {}

    CandidateArrayGroupInfo(CandidateArrayInfo *CA) {
      ElementType = CA->ElementType;
      Size = CA->Size;
      AccessStride = CA->AccessStride;
      NumAccesses = CA->NumAccesses;
      /// Add the arrays with dependent layouts.
      RelatedArrays = CA->RelatedArrays;
      /// Add yourself into the group also.
      RelatedArrays.insert(CA);
    }
  };

  /// Getter function to get the main data structure holding all the candidate
  /// Arrays.
  std::unordered_set<CandidateArrayGroupInfo *> *getCandidateArrayGroupInfo();

  std::unordered_set<CandidateArrayInfo *> ArraysToRestructure;
  std::unordered_set<CandidateArrayGroupInfo *> ArrayGroupsToRestructure;
  std::unordered_map<CallInst *, Type *> HeapType;
  /// This is different from Loop::getInductionVariable(ScalarEvolution &SE) and
  /// Loop::getCanonicalInductionVariable() because it is more generalized.
  std::pair<PHINode *, Instruction *> getLoopIndVarAndIncrement(Loop *GEPLoop);
  void getLoopIndVarAndIncrement(Loop *GEPLoop, std::vector<PHINode *> &PHIs,
                                 std::vector<Instruction *> &Insts);

  friend raw_ostream &
  operator<<(raw_ostream &OS, ArrayAccessStrideInfo::CandidateArrayInfo &CA) {
    if (CA.ArrayVal)
      OS << "Array Val: " << *(CA.ArrayVal) << "\n";
    else
      OS << "Array Val: "
         << "null"
         << "\n";

    if (CA.AllocSiteInst)
      OS << "\tAlloc Site Inst: " << *(CA.AllocSiteInst) << "\n";
    else
      OS << "\tAlloc Site Inst: "
         << "null"
         << "\n";

    if (CA.ElementType)
      OS << "\tElement Type: " << *(CA.ElementType) << "\n";
    else
      OS << "\tElement Type: "
         << "null"
         << "\n";

    OS << "\tSize: " << CA.Size << "\n";
    OS << "\tM: " << CA.AccessStride << "\n";
    OS << "\tN: " << CA.NumAccesses << "\n";
    OS << "\tisLegal: " << CA.IsLegal << "\n";
    OS << "\tNumber Allocations: " << CA.NumAllocations << "\n";

    for (auto RCA : CA.RelatedArrays) {
      if (RCA->ArrayVal)
        OS << "Related Array Val: " << *(RCA->ArrayVal) << "\n";
      else
        OS << "Related Array Val: "
           << "null"
           << "\n";
    }

    return OS;
  }

private:
  /// Function to find candidate arrays in module.
  /// Looking for arrays with single malloc site.
  void findCandidateArrays(Module &M);

  /// Remove implicit ptrtoint-s so as not to confuse the legality phase.
  ///
  /// \code
  /// Transform
  ///   %358 = load i64, i64* bitcast ([26000000 x double]** @srcGrid to i64*)
  ///   %359 = load i64, i64* bitcast ([26000000 x double]** @dstGrid to i64*)
  ///   store i64 %359, i64* bitcast ([26000000 x double]** @srcGrid to i64*)
  ///   store i64 %358, i64* bitcast ([26000000 x double]** @dstGrid to i64*)
  /// to
  ///   %358 = load [26000000 x double]*, [26000000 x double]** @srcGrid
  ///   %359 = load [26000000 x double]*, [26000000 x double]** @dstGrid
  ///   store [26000000 x double]* %359, [26000000 x double]** @srcGrid
  ///   store [26000000 x double]* %358, [26000000 x double]** @dstGrid
  /// \endcode
  void removeCandidateImplicitPtrToIntInsts(Module &M);

  /// For a given Candidate Array, set the access stride value (i.e., M) based
  /// On its previous known/set value. Returns true if M is consistent with
  /// previous value (i.e., has a common GCD value). Returns false if M is not
  /// consistent.
  bool setImplicitStructSize(CandidateArrayInfo *CA, int ImplicitStructSize);

  /// This function analyzes all the GEPs with non-constant
  /// to determine a the implicit size of a structure in the array
  /// (i.e., M value).
  /// The function returns a (int, bool) pair. The int being the size and
  /// the bool to say if the size is legal.
  /// return (0, true) - no analyzable GEPs in the loop; legal
  /// return (0, false) - analyzable GEPs exist in the loop, but inconsistent
  /// sizes; not legal return (N, true) - analyzable GEPs exist in the loop,
  /// consistent sizes; legal
  std::pair<int, bool>
  findImplicitStructSize(std::unordered_set<Value *> &ValueUses, LoopInfo &LI);

  /// Returns true if the Candidate Array is legal to restructure.
  bool isLegalToRestructure(Module &M, CandidateArrayInfo *CA);

  /// Returns true if a Candidate Array's transformations parameters
  /// are legal to restructure.
  bool isCandidateLegal(CandidateArrayInfo *CA);

  /// Function to remove any candidate Arrays with untransformable parameters.
  bool hasIllegalDependents(CandidateArrayInfo *CA);

  bool getRelatedCandidateArray(Module &M, CandidateArrayInfo *CA, Value *Val);

  /// Function to remove any candidate arrays with untransformable parameters or
  /// illegal.
  void removeIllegalCandidates();

  /// Gets the candidate arrays from ArraysToRestructure and then
  /// forms a new set grouping related layout arrays together
  /// for the transformation pass.
  bool setArrayGroupsToRestructure();

  /// This function determines the effective stride of the GEP instructions used
  /// in a loop.  Note that the effective stride is not always the induction
  /// variable stride. The stride depends on the arithmetic instructions between
  /// the GEP and the induction variable.
  int getEffectiveLoopStride(GetElementPtrInst *GEPInst, Loop *GEPLoop);
}; // end class ArrayAccessStrideInfo

class ArrayAccessStrideAnalysis
    : public AnalysisInfoMixin<ArrayAccessStrideAnalysis> {
  friend AnalysisInfoMixin<ArrayAccessStrideAnalysis>;

  static AnalysisKey Key;

public:
  using Result = ArrayAccessStrideInfo;

  Result run(Module &M, ModuleAnalysisManager &AM);
}; // end class ArrayAccessStrideAnalysis

class ArrayAccessStrideAnalysisWrapper : public ModulePass {
private:
  std::unique_ptr<ArrayAccessStrideInfo> AASI;

public:
  static char ID; /// Pass ID, replacement for typeid

  ArrayAccessStrideAnalysisWrapper() : ModulePass(ID) {
    initializeArrayAccessStrideAnalysisWrapperPass(
        *PassRegistry::getPassRegistry());
  }

  void getAnalysisUsage(AnalysisUsage &AU) const override {
    AU.addRequired<AssumptionCacheTracker>();
    AU.addRequired<TargetLibraryInfoWrapperPass>();
    getAAResultsAnalysisUsage(AU);
    AU.setPreservesAll();
  }

  bool runOnModule(Module &M) override;

  bool doFinalization(llvm::Module &) override;

  ArrayAccessStrideInfo &getResult() const { return *AASI; }
}; // end class ArrayAccessStrideAnalysisWrapper
} // end namespace llvm

#endif
#endif
