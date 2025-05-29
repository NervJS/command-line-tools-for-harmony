//===--------------------- InsertDicpPacInst.h ----------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// This file declares InsertDicpPac pass, which insert DICP PAC instructions
// and generate gloabal constructors for DICP PAC protected data.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_INSERT_DICP_PAC_INST_H
#define LLVM_TRANSFORMS_INSERT_DICP_PAC_INST_H

#include "llvm/IR/Function.h"
#include "llvm/IR/IRBuilder.h"
#include "llvm/IR/Instructions.h"
#include "llvm/IR/Module.h"
#include "llvm/IR/PassManager.h"
#include "llvm/Pass.h"

namespace llvm {
class InsertDicpPac : public PassInfoMixin<InsertDicpPac> {
public:
  PreservedAnalyses run(Module &M, ModuleAnalysisManager &MAM);

private:
  // Type cast for different protected data type, because the param type of pac
  // instruction is int64 constantly.
  Value *typeCastForProtectedData(Value *PacData, Type *PacDataTy,
                                  IRBuilder<> &Builder);
  Value *typeRecoverForProtectedData(Value *PacData, Type *PacDataTy,
                                     IRBuilder<> &Builder);

  // Calculate encode/decode result of original PAC data.
  Value *calcPacReturnVal(Value *OrigPacData, Type *PacDataTy,
                          Value *PacDataAddr, Function *PacFunc,
                          IRBuilder<> &Builder);

  // insert PAC encode/decode instructions for store/load operation on PAC
  // protected data.
  void insertEpacgaInst(StoreInst *StInst, Function *PacEncodeFunc);
  void insertDpacgaInst(LoadInst *LdInst, Function *PacDecodeFunc);

  // Static initiated variables like global variables were init during
  // compilation, The purpose of this function is to transform static
  // initialization into block-local initialization in order to insert PAC
  // instructions.
  void createConstructorForPacGlobalVar(GlobalVariable *GV, Module &M);
};
} // end namespace llvm

#endif // LLVM_TRANSFORMS_PAC_FOR_DICP_H
