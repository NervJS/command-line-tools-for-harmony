#if defined(BSPRIV_COMMON_IPOP)
//===- IPOPrefetch.h - Interprocedural Object Prefetch ----------*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
// Copyright (C) 2023, Huawei Technologies Co., Ltd. All rights reserved.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_IPO_IPOP_H
#define LLVM_TRANSFORMS_IPO_IPOP_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class IPOPrefetchPass : public PassInfoMixin<IPOPrefetchPass> {
public:
  PreservedAnalyses run(Module &M, ModuleAnalysisManager &MAM);
  void readWhiteList(const Twine &Filename);
};

} // namespace llvm

#endif
#endif // BSPRIV_COMMON_IPOP
