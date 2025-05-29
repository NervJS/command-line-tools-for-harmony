#if defined(BSPUB_COMMON)
//===-- LegalityPtrUseVisitor.h - Analysis for Data Restructuring ---------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// LegalityPtrUseVisitor provides legality analyses for Structure Peeling and
// Array Restructuring.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_ANALYSIS_LEGALITYPTRUSEVISITOR_H
#define LLVM_ANALYSIS_LEGALITYPTRUSEVISITOR_H

#include "llvm/ADT/MapVector.h"
#include "llvm/ADT/SmallVector.h"
#include "llvm/Analysis/AssumptionCache.h"
#include "llvm/Analysis/LazyCallGraph.h"
#include "llvm/Analysis/PtrUseVisitor.h"
#include "llvm/IR/Operator.h"
#include <functional>
#include <map>
#include <unordered_map>
#include <unordered_set>

namespace llvm {
template <typename T, typename Enable> struct DenseMapInfo;
class DominatorTree;

bool isLibFunc(const CallInst *CallI, StringRef LibCFuncName);

/// Returns the type of alloc call.
///
/// Type depends on the bitcast and storeinst uses of the allocation call.
Type *getAllocType(Value *V, std::unordered_map<CallInst *, Type *> &HeapType);

// This class looks at each heap memory allocation in the IR, and tries to
// to make a hypothesis about the access pattern to that memory segment.
// At this point, this hypothesis is stated in terms of a data type,
// we can go one level of abstraction higher, and just rely on sizes and
// offsets.
// First we visit uses of the return value of allocation library call, and
// gather all data points that we can from the IR. Then we look at all the
// information gathered and try to find a data type that is consistent with
// all the data points.
// Most likely we will need to merge this logic into the escape analysis
// logic in legality check, but this is a non-trivial task. So need to be done
// separately in a later step.
class MemLayoutVisitor : protected InstVisitor<MemLayoutVisitor>,
                         public detail::PtrUseVisitorBase {
  friend class InstVisitor<MemLayoutVisitor>;
  using Base = InstVisitor<MemLayoutVisitor>;
  using TypeSet = std::unordered_set<Type *>;
  // Key is an offset from the beginning of the allocated memory.
  // Value is a data type that we expect to be stored at this offset.
  using Observations = std::map<size_t, TypeSet>;
  // For a given Value in the IR, we keep track of which offset of the
  // allocated memory it points to.
  using Offsets = std::unordered_map<Value *, size_t>;

  Offsets OffMap;
  Observations Obs;

public:
  explicit MemLayoutVisitor(const DataLayout &DL)
      : PtrUseVisitorBase(DL), OffMap(), Obs() {}
  ~MemLayoutVisitor() {}
  Type *visitAllocation(CallInst &CI);
  // In order to ensure the consistency of the binary program compiled each
  // time, a SetVector is added to save the keys of the unordered_map to ensure
  // that the traversal order of the unordered_map is the same each time.
  // Since only optimizations related to struct peeling affect binary
  // consistency now, use HeapTypeKeysSet as the default parameter.
  static void
  populateHeapTypes(const Module &M,
                    std::unordered_map<CallInst *, Type *> &HeapType,
                    SmallSetVector<CallInst *, 8> *HeapTypeKeysSet = nullptr);
  static void populateHeapTypesForFunction(
      const Function &F, std::unordered_map<CallInst *, Type *> &HeapType,
      SmallSetVector<CallInst *, 8> *HeapTypeKeysSet = nullptr);

private:
  void addObservation(size_t Offset, Type *Ty);

  // This function may return an incorrect data type/memory layout. This is OK.
  // Later on legality analysis will detect a violation of data type checks and
  // We will give up. Functional correctness does not depend on the correct
  // identification of data type or memory layout here.
  Type *processObservations();
  void visitBinaryOperator(BinaryOperator &I);
  void visitBitCastInst(BitCastInst &BC);
  void visitGetElementPtrInst(GetElementPtrInst &GEP);
  void visitStoreInst(StoreInst &SI);
  void visitPHINode(PHINode &Phi);
  void visitPtrToIntInst(PtrToIntInst &P2I);
  void visitIntToPtrInst(IntToPtrInst &I2P);
  void visitMemIntrinsic(MemIntrinsic &I);
};

/// Represent either a global variable or a field in a global structure.
class GlobalMemLoc {
public:
  GlobalMemLoc(Value *V, bool IsTombstone = false);
  ~GlobalMemLoc() = default;

  GlobalVariable *getGV();
  GEPOperator *getGEPOp();

  /// Return true if this global memory location is a field in a global struct.
  bool isStructField();

  /// Return the type of the stored global memory location.
  Type *getType();

  /// Return true if an instance of GlobalMemLoc has been initialized correctly.
  bool isValid();

  bool operator==(const GlobalMemLoc &Other) const;

  unsigned getHashValue() const;

  /// Special DenseMap key values.
  ///
  ///{
  static const GlobalMemLoc EmptyKey;
  static const GlobalMemLoc TombstoneKey;
  ///}

private:
  bool isGEPsEqual(const GEPOperator *GEPOpA, const GEPOperator *GEPOpB) const;
  bool isExternal(GlobalVariable *GV) const;

  GlobalVariable *GV = nullptr;
  GEPOperator *GEPOp = nullptr;
  bool IsTombstone = false;
};

raw_ostream &operator<<(raw_ostream &OS, GlobalMemLoc &GML);

class ActualType {
public:
  ActualType() = default;
  ActualType(Type *T, StructType *ST = nullptr, unsigned SEltInd = 0,
             bool IsTombstone = false);
  ~ActualType() = default;

  Type *getType();
  StructType *getStructType();
  unsigned getStructEltInd();

  bool isKnown() const;
  bool isPtrToStructElt() const;

  bool operator==(const ActualType &Other) const;
  bool operator!=(const ActualType &Other) const;

  bool isCompatible(ActualType WithThis);
  bool isVectorsCompatible(VectorType *VTy, ActualType PtrActTy,
                           const DataLayout &DL);
  bool isPaddedAccess() const { return PaddingOffset != 0; }
  /// Set the padding offset in bytes.
  void setPaddingOffset(unsigned Bytes) { PaddingOffset = Bytes; }
  /// Return the padding offset in bytes.
  unsigned getPaddingOffset() { return PaddingOffset; }

  unsigned getHashValue() const;

  /// Special DenseMap key values.
  ///
  ///{
  static const ActualType EmptyKey;
  static const ActualType TombstoneKey;
  ///}

private:
  Type *Ty = nullptr;
  StructType *STy = nullptr;
  unsigned SEltInd = 0;
  bool IsTombstone = false;
  /// Number of bytes offset from the logical start of some data.
  /// Offset could point in the middle of a datum, or into empty
  /// space used for padding, e.g., padding between structure elements.
  unsigned PaddingOffset = 0;
};

raw_ostream &operator<<(raw_ostream &OS, ActualType &ActTy);

/// The main interface to data type analysis.
class TypeChecker {
public:
  void setType(Value *V, ActualType ActTy);

  ActualType getType(Value *V);

  void reset();

  MapVector<Value *, ActualType>::iterator begin();
  MapVector<Value *, ActualType>::iterator end();

private:
  MapVector<Value *, ActualType> TypeOf;
};

// Each ptr2int of a non-candidate struct instance is allowed, unless:
// 1. Values derived from a ptr2int escape to external functions, or
// 2. Values derived from a ptr2int are converted back to a pointer (int2ptr).
class Ptr2IntChecker : protected InstVisitor<Ptr2IntChecker>,
                       public detail::PtrUseVisitorBase {
  friend class InstVisitor<Ptr2IntChecker>;

  using Base = InstVisitor<Ptr2IntChecker>;

public:
  Ptr2IntChecker(const DataLayout &DL);
  ~Ptr2IntChecker() = default;

  bool isValid(Instruction &StartI, bool TrackInsts = false,
               bool PtrToStruct = true);

  bool isSupportedPtrArith(Instruction &StartI, bool TrackInsts = false,
                           bool PtrToStruct = true);

  void getVisitedInstructions(SetVector<Instruction *> &Visited);
  void getTerminalInstructions(SetVector<Instruction *> &TerminalInsts);
  uint64_t getMinPtrAddressRange(Instruction &I);

private:
  void visitInstruction(Instruction &I);
  void visitGetElementPtrInst(GetElementPtrInst &GEP);
  void visitCmpInst(CmpInst &);
  void visitBinaryOperator(BinaryOperator &I);
  void visitPHINode(PHINode &Phi);
  void visitSelectInst(SelectInst &SI);
  void visitCallBase(CallBase &Call);
  void visitIntToPtrInst(IntToPtrInst &I2P);
  void visitIntrinsicInst(IntrinsicInst &II);
  /// Update the address range scope of a pointer during pointer arithmetic
  /// using binary operators.
  template <typename BinaryFunction>
  void updatePtrAddressRange(uint64_t Val, BinaryFunction Op) {
    CurrentPointerRange = Op(CurrentPointerRange, Val);
  }
  SetVector<Instruction *> VisitedInstructions;
  SetVector<Instruction *> TerminalInstructions;
  uint64_t CurrentPointerRange = 0;
  uint64_t MinPtrAddressRange = 0;
  Value *PtrAddressRange = nullptr;
  bool IsPtrToStruct = false;
};

class UnderlyingObjectFinder {
public:
  /// This is similar to GetUnderlyingObjects() from ValueTracking but with a
  /// few additions:
  ///
  /// - Calls to realloc() must be followed through its pointer argument but at
  ///   the same time added to \p Objects.
  /// - Follow function arguments interprocedurally at each call site.
  /// - Avoid following the pointer operand of a GEP for a global variable:
  ///   double* getelementptr (%struct.n, %struct.n* @net, i64 0, i32 19)
  ///   Return them as is to be handled by the higher level of abstraction.
  ///
  /// Unimplemented: caching of underlying objects.
  bool get(Value *V, SmallVectorImpl<Value *> &Objects,
           bool IsInterProcedural = true, unsigned Limit = 0);

  // Reset the cache.
  void reset();

private:
  Value *getUnderlyingObject(Value *V);
};

/// Use together with \p InstVisitor to also visit \p ConstantExpr-s.
template <typename SubClass> class ConstantExprVisitor {
public:
  void visitConstantExprOperands(Instruction *I) {
    for (Use &U : I->operands()) {
      if (auto *CEOp = dyn_cast<ConstantExpr>(U.get()))
        visitCEs(CEOp, I);
    }
  }

protected:
  void dump(ConstantExpr &CE);

private:
  /// Recursively visit all constant expressions starting the innermost one.
  void visitCEs(ConstantExpr *CE, Instruction *I) {
    for (Use &U : CE->operands()) {
      if (auto *CEOp = dyn_cast<ConstantExpr>(U.get()))
        visitCEs(CEOp, I);
    }
    if (static_cast<SubClass *>(this)->isAborted())
      return;
    visitCE(*CE, *I);
  }

  void visitCE(ConstantExpr &CE, Instruction &I) {
    static_assert(std::is_base_of<ConstantExprVisitor, SubClass>::value,
                  "Must pass the derived type to this template!");

    dump(CE);

    switch (CE.getOpcode()) {
    case Instruction::GetElementPtr:
      static_cast<SubClass *>(this)->visitGetElementPtrCE(CE, I);
      break;
    case Instruction::BitCast:
      static_cast<SubClass *>(this)->visitBitCastCE(CE, I);
      break;
    case Instruction::ICmp:
      static_cast<SubClass *>(this)->visitCmpCE(CE, I);
      break;
    default:
      static_cast<SubClass *>(this)->abort();
      break;
    }
  }
};

/// Recursively visit the uses of the given pointer and
class LegalityPtrUseVisitor
    : protected InstVisitor<LegalityPtrUseVisitor>,
      public detail::PtrUseVisitorBase,
      public ConstantExprVisitor<LegalityPtrUseVisitor> {
  friend class InstVisitor<LegalityPtrUseVisitor>;

  using Base = InstVisitor<LegalityPtrUseVisitor>;
  using ActualTypeSet = DenseSet<ActualType>;
  using CGSCC = LazyCallGraph::RefSCC;

public:
  using ClobberMap = DenseMap<CGSCC *, ActualTypeSet>;
  LegalityPtrUseVisitor(const DataLayout &DL,
                        std::unordered_map<CallInst *, Type *> &HeapType,
                        bool RelaxMemCpy = false, bool RelaxPtr2Int = false,
                        LazyCallGraph *LCG = nullptr);
  ~LegalityPtrUseVisitor() = default;

  void abort(Instruction *AbortingI = nullptr);
  bool isAborted();

  void
  setAssumptionCacheGetter(std::function<AssumptionCache *(Function *)> GetAC_);

  void
  setDominatorTreeGetter(std::function<DominatorTree *(Function *)> GetDT_);

  void setTargetLibraryInfoGetter(
      std::function<const TargetLibraryInfo &(Function &)> GetTLI_);

  detail::PtrUseVisitorBase::PtrInfo visitPtr(Instruction &FirstI);

  /// Using given types decide if clobbering is possible or not.
  static bool typesIndicateClobberIsPossible(ActualType &ActTy,
                                             ActualType &PTy);

  /// Rely on the ActualType information to compute instructions, \p Clobbering,
  /// and functions, \p Functions, that clobber \p UnderlyingObj and \p ActualI.
  /// \p ActualTypes is needed for caching machanism.
  detail::PtrUseVisitorBase::PtrInfo getClobberingInstrs(
      Instruction &UnderlyingObj, Instruction &ActualI,
      DenseSet<const Instruction *> &Clobbering,
      DenseSet<const Function *> &Functions, bool FilterInstrs = true,
      DenseMap<const Instruction *, ActualType> *ActualTypes = nullptr,
      DenseSet<ActualType> *AST = nullptr);

  void getInstrsToPreTransform(SmallVectorImpl<Instruction *> &Instrs);
  void getAddressCalcInstrsToTransform(SmallVectorImpl<Instruction *> &Instrs);

  void getActualTypeOfMap(MapVector<Value *, ActualType> &TypeOf);

  void visitGetElementPtrCE(ConstantExpr &CE, Instruction &I);
  void visitBitCastCE(ConstantExpr &CE, Instruction &I);
  void visitCmpCE(ConstantExpr &CE, Instruction &I);

private:
  void visitInstruction(Instruction &I);
  void visitCmpInst(CmpInst &CmpI);
  void visitStoreInst(StoreInst &SI);
  void visitLoadInst(LoadInst &LI);
  void visitBitCastInst(BitCastInst &BC);
  void visitPtrToIntInst(PtrToIntInst &P2I);
  void visitIntToPtrInst(IntToPtrInst &I2P);
  void visitGetElementPtrInst(GetElementPtrInst &GEP);
  void visitDbgInfoIntrinsic(DbgInfoIntrinsic &I);
  void visitMemIntrinsic(MemIntrinsic &I);
  void visitIntrinsicInst(IntrinsicInst &II);
  void visitCallBase(CallBase &Call);
  void visitReturnInst(ReturnInst &RI);
  void visitPHINode(PHINode &Phi);
  void visitSelectInst(SelectInst &SI);
  void visitInsertElementInst(InsertElementInst &IE);
  void visitShuffleVectorInst(ShuffleVectorInst &SV);
  void visitExtractElementInst(ExtractElementInst &EE);

  bool isGlobalMemLocHandled(const GlobalMemLoc &GML);

  void markGlobalMemLocHandled(const GlobalMemLoc &GML);

  bool collectGVUses(GlobalMemLoc &GML, SmallVectorImpl<Use *> &Uses);

  bool enqueueGVUses(GlobalMemLoc GML);

  void enqueueUnderlyingObjects(Value *V);

  /// Get the type of ST's field at a specific offset.
  Type *getElementTypeAtOffset(StructType *ST, uint64_t Offset,
                               uint64_t &PaddingBytes);

  bool isMemsetValid(MemIntrinsic &I);

  /// Check if the memory access size is compatible with the
  /// ActualType of the memory location.
  bool checkMemAccessSize(ActualType PtrOpActTy, Type *AccessTy);

  bool isValueDivisible(Function *F, Value *V, uint64_t ByThis);

  /// Compute the filtered set of instructions clobbering \p V
  ///
  /// If \p getClobberingInstrs is called using EscapeAnalysisPass the filtering
  /// step needs to be done inside it, and the filtered out version of \p
  /// Clobbering should be returned to client.
  void addToClobbering(Value *V, ActualType &UnderlyingObjTy, ActualType &ActTy,
                       DenseSet<const Instruction *> &Clobbering);

  /// Compute the unfiltered set of instructions clobbering \p V
  ///
  /// If \p getClobberingInstrs is called inside EscapeAnalysisAAWrapperPass the
  /// filtering should be skipped. This is because we need to have all \p
  /// Clobbering instructions to be able to use caching mechanism to mitigate
  /// the compile time impact of the algorithm.
  void returnClobbering(Value *V, DenseSet<const Instruction *> &Clobbering,
                        DenseSet<const Function *> &Functions,
                        DenseMap<const Instruction *, ActualType> &ActualTypes,
                        DenseSet<ActualType> &AST);
  void registerFunction(Function &);

  /// Allow pointer arithmetic that calculates the number of elements between
  /// two pointers; reject anything else.
  bool isSupportedPtrArithOnCandidateStruct(PtrToIntInst &P2I,
                                            const DataLayout &DL,
                                            PtrToIntInst *&OtherP2I);
  SetVector<Instruction *> EscapeRoots;
  UnderlyingObjectFinder UnderlyingObjects;
  SetVector<GlobalMemLoc> HandledGlobalMemLocs;
  std::unique_ptr<Ptr2IntChecker> P2IChecker = nullptr;
  std::function<AssumptionCache *(Function *)> GetAC;
  std::function<DominatorTree *(Function *)> GetDT;
  TypeChecker TyChecker;
  Type *TypeToPeel = nullptr;
  SmallVector<Instruction *, 8> InstrsToPreTransform;
  SetVector<Instruction *> TerminalInstrs;
  SetVector<Instruction *> AddressCalcInstrs;
  /// A workaround data structure used to skip exploring underlying objects if
  /// a call is encountered, given that that call has been explored during
  /// regular top-down exploration.
  SetVector<CallInst *> VisitedCallSiteReturns;
  /// Collect call sites encountered by visiting function arguments. This is
  /// needed for some clients (e.g., StructPeeling) to avoid subtle bugs.
  SetVector<CallBase *> VisitedCallSites;
  std::unordered_map<CallInst *, Type *> &HeapType;
  ClobberMap FuncClobberInfo;
  bool RelaxPtrToInt = false;
  bool RelaxMemCpy = false;
  std::function<const TargetLibraryInfo &(Function &)> GetTLI = nullptr;
  std::unique_ptr<LazyCallGraph> LCG = nullptr;
};

/// Use it for load and store instructions to copy their attributes.
template <class T> void copyMemInstAttrs(T &To, T &From) {
  To.setAlignment(From.getAlign());
  To.setVolatile(From.isVolatile());
  To.setOrdering(From.getOrdering());
  To.setSyncScopeID(From.getSyncScopeID());
  To.setMetadata(LLVMContext::MD_tbaa, From.getMetadata(LLVMContext::MD_tbaa));
}

/// Helper that allows GlobalMemLoc as a key in a DenseMap.
template <> struct DenseMapInfo<llvm::GlobalMemLoc> {
  static inline llvm::GlobalMemLoc getEmptyKey() {
    return llvm::GlobalMemLoc::EmptyKey;
  }
  static inline llvm::GlobalMemLoc getTombstoneKey() {
    return llvm::GlobalMemLoc::TombstoneKey;
  }
  static unsigned getHashValue(const llvm::GlobalMemLoc &GML) {
    return GML.getHashValue();
  }
  static bool isEqual(const llvm::GlobalMemLoc &LHS,
                      const llvm::GlobalMemLoc &RHS) {
    return LHS == RHS;
  }
};

/// Helper that allows ActualType as a key in a DenseMap.
template <> struct DenseMapInfo<llvm::ActualType> {
  static inline llvm::ActualType getEmptyKey() {
    return llvm::ActualType::EmptyKey;
  }
  static inline llvm::ActualType getTombstoneKey() {
    return llvm::ActualType::TombstoneKey;
  }
  static unsigned getHashValue(const llvm::ActualType &ActTy) {
    return ActTy.getHashValue();
  }
  static bool isEqual(const llvm::ActualType &LHS,
                      const llvm::ActualType &RHS) {
    return LHS == RHS;
  }
};

class EscapeAnalysis : public ModulePass {
  std::unordered_map<CallInst *, Type *> HeapType;
  std::unique_ptr<LegalityPtrUseVisitor> PtrVisitor = nullptr;

public:
  static char ID; /// Pass ID
  EscapeAnalysis();
  void getAnalysisUsage(AnalysisUsage &AU) const override;
  bool runOnModule(Module &M) override;
  LegalityPtrUseVisitor &getPtrVisitor(Module &M);
};

ModulePass *createEscapeAnalysisPass();
} // end namespace llvm

#endif // LLVM_ANALYSIS_LEGALITYPTRUSEVISITOR_H
#endif
