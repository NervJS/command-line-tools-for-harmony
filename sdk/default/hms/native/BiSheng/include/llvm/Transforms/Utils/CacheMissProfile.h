#if defined(BSPRIV_COMMON_SAMPLE_PGO)
//===- CacheMissProfile.h - Insert cache miss sample metadata ---*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
// Copyright (C) 2023, Huawei Technologies Co., Ltd. All rights reserved.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_UTILS_CACHEMISSPROFILE_H
#define LLVM_TRANSFORMS_UTILS_CACHEMISSPROFILE_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class CacheMissProfileLoaderPass
    : public PassInfoMixin<CacheMissProfileLoaderPass> {
public:
  PreservedAnalyses run(Module &M, ModuleAnalysisManager &MAM);
};

} // end namespace llvm

#endif // LLVM_TRANSFORMS_UTILS_CACHEMISSPROFILE_H
#endif // BSPRIV_COMMON_SAMPLE_PGO
