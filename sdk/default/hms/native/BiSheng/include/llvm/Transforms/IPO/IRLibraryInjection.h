#if defined(BSPUB_COMMON) && defined(BSPRIV_COMMON_IR_LIBRARY_INJECTION)
//===-  IRLibraryInjection.h - IR Library Infrastructure  ---------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
// Copyright (C) 2021-2022. Huawei Technologies Co., Ltd. All rights reserved.
//
//===----------------------------------------------------------------------===//
//
// This is the pass for the IR Library infrastructure in the Huawei BiSheng
// compiler. The Huawei BiSheng compiler comes with a set of explicitly
// hand-optimized core functions (for example GEMM). These functions' bitcode
// IR are stored in BiSheng's IR Library. This pass looks through the input IR
// to identify any calls to the IR Library functions, then injects the called
// IR library functions into the input IR. The resultant output IR of this pass
// is standalone, and doesn't need to be linked to the Library IRs.
//
//===----------------------------------------------------------------------===//
#ifndef LLVM_TRANSFORMS_IRLIBINJECTION_H
#define LLVM_TRANSFORMS_IRLIBINJECTION_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class ModulePass;

ModulePass *createIRLibraryInjectionPass();

class IRLibraryInjectionPass : public PassInfoMixin<IRLibraryInjectionPass> {
public:
  PreservedAnalyses run(Module &M, ModuleAnalysisManager &MM);
};

} // end namespace llvm

#endif // LLVM_TRANSFORMS_IRLIBINJECTION_H
#endif
