//===- BlockReordering.h - Reorders the control predicates -----*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// This pass performs the control predicate block reordering, currently,
// reorders predicates involving function calls if it can prove that there is no
// side-effects.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_IPO_BLOCKREORDERING_H
#define LLVM_TRANSFORMS_IPO_BLOCKREORDERING_H

#include "llvm/IR/PassManager.h"

namespace llvm {

class Module;

class BlockReorderPass : public PassInfoMixin<BlockReorderPass> {
public:
  PreservedAnalyses run(Module &M, ModuleAnalysisManager &);
};

} // end namespace llvm

#endif // LLVM_TRANSFORMS_IPO_BLOCKREORDERING_H
