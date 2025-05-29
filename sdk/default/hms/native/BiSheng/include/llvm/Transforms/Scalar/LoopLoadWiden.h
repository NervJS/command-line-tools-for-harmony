#if defined(BSPUB_COMMON) && defined(BSPRIV_COMMON_LOOP_LOAD_WIDEN)
//===-- LoopLoadWiden.h - Loop Load Widen Pass ----------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// This file implement a loop-aware load widen pass.
//
// This pass transforms loops used for array elements comparison, which have two
// exits, one is the upper limit of index and the other is comparison result,
// to more loops that can widen the loading of elements.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_SCALAR_LOOPLOADWIDEN_H
#define LLVM_TRANSFORMS_SCALAR_LOOPLOADWIDEN_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class LoopLoadWidenPass : public PassInfoMixin<LoopLoadWidenPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &FAM);
};

} // namespace llvm

extern std::vector<unsigned> LoopLoadWidenPatternIDs;

#endif // LLVM_TRANSFORMS_SCALAR_LOOPLOADWIDEN_H
#endif
