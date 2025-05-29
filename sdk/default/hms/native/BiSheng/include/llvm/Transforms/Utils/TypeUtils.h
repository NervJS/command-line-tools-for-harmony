#if defined(BSPUB_COMMON)
//===- Transform/Utils/TypeUtils.h - Type Utils -----*- C++ -*------ =========//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// Utilities for manipulating IR types.
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_UTILS_TYPEUTILS_H
#define LLVM_TRANSFORMS_UTILS_TYPEUTILS_H

#include "llvm/ADT/ArrayRef.h"
#include "llvm/ADT/DenseMap.h"
#include "llvm/ADT/DenseSet.h"
#include "llvm/ADT/SetVector.h"
#include "llvm/ADT/SmallSet.h"
#include "llvm/ADT/StringRef.h"
#include "llvm/IR/Constants.h"
#include "llvm/IR/Instructions.h"
#include <memory>
#include <set>
#include <stack>
#include <unordered_map>

namespace llvm {

class Value;
class Module;
class Function;
class Type;
class StructType;
class PtrToIntInst;
class MemIntrinsic;
class MemCpyInst;
class CallInst;
class BasicBlock;
class Instruction;

namespace type_utils {

// Map indexed by the original StructType to pairs of the new StructType and the
// vector of rewritten fields.
using StructTypeDef =
    std::pair<StructType *, std::unique_ptr<SmallVectorImpl<Type *>>>;

std::pair<Type *, int> getBaseType(Type *T, bool Verbose = false);

typedef std::unordered_map<Type *, Type *> TypeMap;

struct ImplicitPtrToIntToRemove {
  LoadInst *LI;
  StoreInst *SI;
  ConstantExpr *LICE;
  ConstantExpr *SICE;
};

/// Search for a field in T1 of type T2.
bool doesTypeContainType(StructType *T1, Type *T2);

unsigned int getNewTypeSize(
    const Module &M,
    DenseMap<StructType *, type_utils::StructTypeDef> &RewrittenTypeMap,
    const StructType *OldSTy);

unsigned int didSizeofTypeChange(
    const Module &M,
    DenseMap<StructType *, type_utils::StructTypeDef> &RewrittenTypeMap,
    StructType *OldSTy);

void removePtrToIntInsts(Module &M);

void gatherImplicitPtrToIntToRemove(
    Module &M, SmallVectorImpl<ImplicitPtrToIntToRemove> &CasesToRemove);

void removeImplicitPtrToIntInsts(
    Module &M, SmallVectorImpl<ImplicitPtrToIntToRemove> &CasesToRemove);

void removeSizeofInAllocator(
    const Module &M,
    DenseMap<StructType *, type_utils::StructTypeDef> &RewrittenTypeMap,
    CallInst *CI, Function *Fun, StructType *ElemTy);

void removeSizeofInMemIntrinsic(
    const Module &M,
    DenseMap<StructType *, type_utils::StructTypeDef> &RewrittenTypeMap,
    MemIntrinsic *MI);

void removeSizeofInPtrArith(
    const Module &M,
    DenseMap<StructType *, type_utils::StructTypeDef> &RewrittenTypeMap,
    PtrToIntInst *P2I, unsigned NewSize = 0);

/// Transform all of the types in Module M by replacing all instances of
/// \p OldSTy with \p NewTy.
/// In order to ensure the consistency of the binary program compiled each
/// time, a SetVector is added to save the keys of the unordered_map to ensure
/// that the traversal order of the unordered_map is the same each time.
/// Since only optimizations related to struct peeling affect binary consistency
/// now, use RewrittenTypeKeysSet as the default parameter.
void transformTypesToFixedPoint(
    Module *M, DenseMap<StructType *, StructTypeDef> &RewrittenTypeMap,
    StructType *OldSTy, Type *NewTy, StringRef NameSuffix,
    bool CompressPointers = false, bool PadStructs = false,
    SmallSetVector<StructType *, 8> *RewrittenTypeKeysSet = nullptr);

bool isAffectedType(Type *OpType,
                    DenseMap<StructType *, StructTypeDef> &RewrittenTypeMap);

Type *generateTypeWithIndirection(Type *T, int IndirectionLevel);

Type *replaceType(Type *T,
                  DenseMap<StructType *, StructTypeDef> &RewrittenTypeMap);

/// Check if a given function signature needs to be transformed.
bool isFuncSignatureAffectedByTransform(
    Function &F, DenseMap<StructType *, StructTypeDef> &RewrittenTypeMap);

/// Clone \p OldFun so that the types in its signature match the ones in
/// \p RewrittenTypeMap.
Function *cloneFunctionAndModifySignature(
    Function *OldFun, DenseMap<StructType *, StructTypeDef> &RewrittenTypeMap,
    std::unordered_map<Value *, Value *> &ReplacementMap,
    std::unordered_map<Function *, std::vector<int>> &ClonedFunctionArgMap,
    StringRef NameSuffix, TypeMap CustomTypeMapping = {});

/// Remove old instructions from \p F as specified in \p ReplacementMap.
void pruneReplacedInstructions(
    Function &F,
    std::unordered_map<Value *, Value *>
        &ReplacementMap, /* Rest are optional, only needed for Struct Peeling
                            but not repacking */
    std::set<Instruction *> *prunableInstrs = nullptr,
    DenseSet<Instruction *> *P1deletedInstrs = nullptr,
    SmallSet<BasicBlock *, 8> *commonBBs = nullptr);

} // end namespace type_utils
} // end namespace llvm

#endif // LLVM_TRANSFORMS_UTILS_TYPEUTILS_H
#endif
