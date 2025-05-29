#if defined(BSPUB_COMMON)
//===- EscapeAnalysisAA.h - Escape Analysis for Alias Analysis ------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
///
/// This is the interface for LLVM's EscapeAnalysis-based alias analysis
/// implemented with using LegalityPtrUseVisitor.
///
//===----------------------------------------------------------------------===//

#ifndef LLVM_ANALYSIS_ESCAPEANALYSISAA_H
#define LLVM_ANALYSIS_ESCAPEANALYSISAA_H

#include "llvm/ADT/DenseMap.h"
#include "llvm/ADT/Optional.h"
#include "llvm/ADT/SmallPtrSet.h"
#include "llvm/ADT/SmallVector.h"
#include "llvm/Analysis/AliasAnalysis.h"
#include "llvm/Analysis/LegalityPtrUseVisitor.h"
#include "llvm/Analysis/ValueTracking.h"
#include "llvm/IR/PassManager.h"
#include "llvm/Pass.h"
#include <algorithm>
#include <cstdint>
#include <memory>
#include <utility>

namespace llvm {
class EscapeAnalysisAAResult : public AAResultBase<EscapeAnalysisAAResult> {
  friend AAResultBase<EscapeAnalysisAAResult>;

  // Keep some cache to improve compile time.
  // PtrInfoCache contains all instructions without any filtering based on
  // type information.
  // Thus as long as the UnderlyingObject of memory locations are the same, we
  // can reuse the collected clobberign instructions and avoid calling
  // LegalityPtrUseVisitor again. key of the map is the UnderlyingObject and
  // DenseSet contains all visited instruction by LegalityPtrUseVisitor.
  DenseMap<const Instruction *, DenseSet<const Instruction *>> PtrInfoCache;

  // ClobberingFuncs contains all functions with at least one instruction
  // that mod/ref a location.
  // key of the map is the UnderlyingObject and DenseSet contains all clobbering
  // functions visited by LegalityPtrUseVisitor.
  DenseMap<const Instruction *, DenseSet<const Function *>> ClobberingFuncs;

  // ActualTypes contains the ActualType of memory locations calculated by
  // TyChecker.
  DenseMap<const Instruction *, ActualType> ActualTypes;

  DenseSet<const Instruction *> AbortedUnderlyingObjects;
  DenseSet<const Instruction *> VisitedMallocInst;
  std::unordered_map<CallInst *, Type *> HeapType;
  const DataLayout &DL;

  bool RelaxMemCpy = true;
  bool ExplicitPtrToInt = true;
  // This will be set to true when added to LTO pipeline to reduce compile-time impact of EscapeAnalysis
  bool AllowOnlyMalloc = false;

  // This set is needed in future for having the callgraph.
  DenseSet<ActualType> AST;
  std::function<const TargetLibraryInfo &(Function &)> GetTLI;
  explicit EscapeAnalysisAAResult(
      const DataLayout &DL, bool AllowOnlyMalloc,
      std::function<const TargetLibraryInfo &(Function &)> GetTLI);

public:
  EscapeAnalysisAAResult(EscapeAnalysisAAResult &&Arg);
  ~EscapeAnalysisAAResult();

  static EscapeAnalysisAAResult
  analyzeModule(Module &M, const DataLayout &DL, bool AllowOnlyMalloc,
                std::function<const TargetLibraryInfo &(Function &)> GetTLI);

  /// Handle invalidation events in the new pass manager.
  bool invalidate(Module &M, const PreservedAnalyses &PA,
                  ModuleAnalysisManager::Invalidator &Inv);
  //------------------------------------------------
  // Implement the AliasAnalysis API
  //
  AliasResult alias(const MemoryLocation &LocA, const MemoryLocation &LocB,
                    AAQueryInfo &AAQI);

  using AAResultBase::getModRefInfo;
  ModRefInfo getModRefInfo(const CallBase *Call, const MemoryLocation &Loc,
                           AAQueryInfo &AAQI);
  ModRefInfo getAliasInfo(const StoreInst *SI, const MemoryLocation &Loc,
                           AAQueryInfo &AAQI);

private:
  /// Filters the unfiltered set of instructions based on data types
  ///
  /// If instruction \p ClobberingInst is not present inside instructions in the
  /// map \p PtrInfoCache for \p UnderlyingObj, we can assume \p ActInst is not
  /// mod/ref with \p ClobberingInst. If \p ClobberingInst is present in the
  /// entry map of \p PtrInfoCache for \p UnderlyingObj, more checks based on
  /// data types are performed to check whether clobber is possible or not.
  ModRefInfo filterClobbering(const Instruction *ClobberingInst,
                              const Instruction *ActInst,
                              const Instruction *UnderlyingObj,
                              DenseSet<ActualType> &AST);
  /// Uses LegalityPtruseVisitor to collect the unfiltered set of instructions
  /// clobbering undelying object of \p OptLoc
  ///
  /// This function uses LegalityPtrUseVisitor to collect all instructions and
  /// functions that clobber memory location \p OptLoc. If the analysis fails,
  /// the function conservatively returns \p nullptr as undelying object. Inside
  /// the function, we check underlying objects for OptLoc. We only continue if
  /// there is one underlying object detected for this location. Then we ask
  /// LegalityPtrUseVisitor to list all instructions using this underlying
  /// object. Currenlty, some caches are used to reduce the compilation time.
  Instruction *ptrInfoCheck(const Instruction *I,
                            const Optional<MemoryLocation> &OptLoc);
};

/// Analysis pass providing a never-invalidated alias analysis result.
class EscapeAnalysisAA : public AnalysisInfoMixin<EscapeAnalysisAA> {
  friend AnalysisInfoMixin<EscapeAnalysisAA>;
  bool AllowOnlyMalloc;
  static AnalysisKey Key;

public:
  using Result = EscapeAnalysisAAResult;

  EscapeAnalysisAAResult run(Module &M, ModuleAnalysisManager &AM);
};

/// Legacy wrapper pass to provide the EscapeAnalysisAAResult object.
class EscapeAnalysisAAWrapperPass : public ModulePass {
  std::unique_ptr<EscapeAnalysisAAResult> Result;
  bool AllowOnlyMalloc;
  virtual void anchor();

public:
  static char ID;

  EscapeAnalysisAAWrapperPass(bool AllowOnlyMalloc = false);

  EscapeAnalysisAAResult &getResult() { return *Result; }
  const EscapeAnalysisAAResult &getResult() const { return *Result; }

  bool runOnModule(Module &M) override;
  bool doFinalization(Module &M) override;
  void getAnalysisUsage(AnalysisUsage &AU) const override;
};

ModulePass *createEscapeAnalysisAAWrapperPass(bool AllowOnlyMalloc = false);
} // end namespace llvm

#endif // LLVM_ANALYSIS_ESCAPEANALYSISAA_H
#endif
