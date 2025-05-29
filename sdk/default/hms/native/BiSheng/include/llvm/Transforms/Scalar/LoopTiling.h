//===- LoopTiling.h - Loop Tiling Pass --------------------------*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
// Copyright (C) 2021-2022. Huawei Technologies Co., Ltd. All rights reserved.
//
//===----------------------------------------------------------------------===//
//
// This file implements the Loop Tiling Pass.  Its main focus is to
// tile loops to improve memory access patterns where potential data reuse can
// lead to performance improvement.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_SCALAR_LOOPTILING_H
#define LLVM_TRANSFORMS_SCALAR_LOOPTILING_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class Function;

class LoopTilingPass : public PassInfoMixin<LoopTilingPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);
};

} // end namespace llvm

#endif // LLVM_TRANSFORMS_SCALAR_LOOPTILING_H
