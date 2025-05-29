#if defined(BSPRIV_COMMON_INST_PREFETCH)
//===- InstPrefetchUtils.h - Prefetch Insertion Utilites.  ------*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
#ifndef LLVM_TRANSFORMS_UTILS_INST_PREFETCH_H
#define LLVM_TRANSFORMS_UTILS_INST_PREFETCH_H

#include "llvm/Analysis/TargetTransformInfo.h"
#include "llvm/IR/Instruction.h"

namespace llvm {
// A call free partition is contiguous sequence of basic blocks that do not
// have any call instruction. It is based on basic block layout.
typedef std::vector<const BasicBlock *> CallFreePartition;

class FunctionPartition {
public:
  FunctionPartition() {}
  FunctionPartition(Function *Owner);
  Function *getOwner() { return F; }
  std::vector<CallFreePartition> getPartitions() { return Partitions; };

private:
  std::vector<CallFreePartition> Partitions;
  Function *F;
};
} // end namespace llvm
#endif
#endif // BSPRIV_COMMON_INST_PREFETCH