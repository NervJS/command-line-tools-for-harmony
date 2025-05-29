#if defined(BSPUB_COMMON) && defined(BSPRIV_COMMON_HASH_DATA_PREFETCH)
//===---- HashDataPrefetch.h - HashDataPrefetch Pass ----===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
/// \file
/// This file provides the interface for Hash Data Prefetch Pass.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_SCALAR_HASHDATAPREFETCH_H
#define LLVM_TRANSFORMS_SCALAR_HASHDATAPREFETCH_H

#include "llvm/Analysis/LoopInfo.h"
#include "llvm/IR/Function.h"
#include "llvm/IR/PassManager.h"
#include "llvm/Transforms/Utils/ValueMapper.h"
#include <set>

namespace llvm {
struct HashPrefetchInfo {
  // Memory Access to the target hash
  SmallVector<StoreInst *> SIs;
  // Offset array base
  LoadInst *OffsetBase;
  // Offset array index
  LoadInst *OffsetIndex;
  // Offset array step
  ConstantInt *OffsetStep;
  // Prefetch distance bound
  Instruction *Bound;

  HashPrefetchInfo() = default;
  ~HashPrefetchInfo() {
    // If the generated bound is not used (i.e Transformtion failed),
    // remove the bound value from function
    if (Bound != nullptr && Bound->user_empty())
      Bound->eraseFromParent();
  };

  void print(raw_ostream &OS) const {
    OS << "\n";
    OS << "HashPrefetchInfo {\n";
    for (auto *Inst : SIs)
      OS << "   Inst: " << *Inst << "\n";
    if (OffsetBase != nullptr)
      OS << "   OffsetBase: " << *OffsetBase << "\n";
    if (OffsetIndex != nullptr)
      OS << "   OffsetIndex: " << *OffsetIndex << "\n";
    if (Bound != nullptr)
      OS << "   Bound: " << *Bound << "\n";
    OS << "}\n";
  }

  friend raw_ostream &operator<<(raw_ostream &OS, const HashPrefetchInfo &HPI) {
    HPI.print(OS);
    return OS;
  }
};

class HashDataPrefetch : public PassInfoMixin<HashDataPrefetch> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);
  bool runImpl(Function &Func, LoopInfo &RunLI);

private:
  LoopInfo *LI = nullptr;
  Function *F = nullptr;
  // Record all the StoreInsts that write to the same memory base
  DenseMap<Value *, SmallVector<StoreInst *>> HashAccessMap;
  // Set of the candidates
  std::set<std::unique_ptr<HashPrefetchInfo>> HashPrefetchCandidates;

  /*---------------------- Legality --------------------------*/
  void collectHashAccesses(Function &F);
  void collectHashPrefetchCandidates(Function &F);
  std::unique_ptr<HashPrefetchInfo>
  computeHashPrefetchInfo(SmallVector<StoreInst *> &SIs);
  bool getOffsetBase(Instruction *Inst, SmallVector<Instruction *> &List,
                     LoadInst *&OffsetBase);
  LoadInst *getOffsetIndex(LoadInst *OffsetBase);
  ConstantInt *getOffsetAccessStep(const LoadInst &OffsetIndex);
  Instruction *getOffsetBound(const LoadInst &OffsetIndex,
                              BasicBlock &OffsetBB);
  bool getConditionsFromPredecessors(DenseMap<const Value *, bool> &Conditions,
                                     const BasicBlock &OffsetBB);

  /*---------------------- Insert Prefetchers --------------------------*/
  bool
  prefetchHashDataAccess(const std::unique_ptr<HashPrefetchInfo> &Candidate);
  bool collectDependenceList(Instruction *I,
                             SmallVector<Instruction *> &InstList,
                             Instruction *CandidateReductionNode);
  bool insertPrefetcherForHashDataAccess(
      SmallVector<Instruction *> &DependentInsts, Instruction *Bound,
      ConstantInt *Step, ValueMap<Value *, Value *> &TransformedInstMap);

  /*---------------------- Others --------------------------*/
  void clear();
}; // end class HashDataPrefetch

FunctionPass *createHashDataPrefetchPass();
} // end namespace llvm

#endif // LLVM_TRANSFORMS_SCALAR_HASHDATAPREFETCH_H
#endif
