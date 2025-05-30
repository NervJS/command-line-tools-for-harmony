#if defined(BSPRIV_COMMON_INST_PREFETCH)
//===- InstPrefetch.h - Prefetch insertion interface  -----------*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
#ifndef LLVM_TRANSFORMS_IPO_INST_PREFETCH_H
#define LLVM_TRANSFORMS_IPO_INST_PREFETCH_H

#include "llvm/Analysis/LazyCallGraph.h"
#include "llvm/IR/Module.h"
#include "llvm/IR/PassManager.h"

namespace llvm {

class InstPrefetchPass : public PassInfoMixin<InstPrefetchPass> {
public:
  PreservedAnalyses run(Module &M, ModuleAnalysisManager &MAM);
};

} // namespace llvm

#endif
#endif // BSPRIV_COMMON_INST_PREFETCH
