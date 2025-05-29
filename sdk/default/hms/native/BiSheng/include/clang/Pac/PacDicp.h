//===-------------------------- PacDicp.h ---------------------------------===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// This file declares the methods of setting metadata for DICP PAC data in
// codegen.
//
//===----------------------------------------------------------------------===//

#ifndef PAC_DICP_H
#define PAC_DICP_H

#include "clang/AST/ASTContext.h"
#include "llvm/IR/GlobalVariable.h"
#include "llvm/IR/Instructions.h"
#include "llvm/IR/LLVMContext.h"

// Emit metadata for store/load instructions which store/load data protected by
// DICP PAC, use these metadata to insert PAC decode instruction on IR level.
void PacDicpSelStInstToEncode(const clang::QualType &Ty,
                              llvm::StoreInst *StInst);
void PacDicpSelLdInstToDecode(const clang::QualType &Ty,
                              llvm::LoadInst *LdInst);

// Emit metadata for static initiated global variable protected by DICP PAC,
// use these metadata to generate gloabal constructor on IR level.
void PacDicpMarkStaticInitiatedGv(const clang::VarDecl *D,
                                  llvm::GlobalVariable *GV,
                                  llvm::LLVMContext &VMContext,
                                  clang::DiagnosticsEngine &Diags);

// Generate errors for local variable belongs to record type:
// 1.union type contains DICP PAC protected members
// 2.struct type contains bit-field members belongs to DICP PAC protected types
void PacDicpGenErrForLocRecordVar(const clang::QualType &Ty,
                                  clang::DiagnosticsEngine *Diags);

#endif
