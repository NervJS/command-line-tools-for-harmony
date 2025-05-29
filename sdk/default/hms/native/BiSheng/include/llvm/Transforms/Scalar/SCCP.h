//===- SCCP.cpp - Sparse Conditional Constant Propagation -------*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//
//
// \file
// This file implements sparse conditional constant propagation and merging:
//
// Specifically, this:
//   * Assumes values are constant unless proven otherwise
//   * Assumes BasicBlocks are dead unless proven otherwise
//   * Proves values to be constant, and replaces them with constants
//   * Proves conditional branches to be unconditional
//
//===----------------------------------------------------------------------===//

#ifndef LLVM_TRANSFORMS_SCALAR_SCCP_H
#define LLVM_TRANSFORMS_SCALAR_SCCP_H

#include "llvm/ADT/STLFunctionalExtras.h"
#include "llvm/IR/PassManager.h"

#include <functional>

#if defined(BSPUB_COMMON)
#include "llvm/Analysis/AliasAnalysis.h"
#include "llvm/Analysis/BlockFrequencyInfo.h"
#include "llvm/Analysis/LoopInfo.h"
#include "llvm/Analysis/ProfileSummaryInfo.h"
#endif

namespace llvm {
class AssumptionCache;
class DataLayout;
class Function;
class Module;
class TargetLibraryInfo;
class TargetTransformInfo;
struct AnalysisResultsForFn;

/// This pass performs function-level constant propagation and merging.
class SCCPPass : public PassInfoMixin<SCCPPass> {
public:
  PreservedAnalyses run(Function &F, FunctionAnalysisManager &AM);
};

bool runIPSCCP(Module &M, const DataLayout &DL,
               std::function<const TargetLibraryInfo &(Function &)> GetTLI,
               function_ref<AnalysisResultsForFn(Function &)> getAnalysis);

bool runFunctionSpecialization(
    Module &M, const DataLayout &DL,
    std::function<TargetLibraryInfo &(Function &)> GetTLI,
    std::function<TargetTransformInfo &(Function &)> GetTTI,
    std::function<AssumptionCache &(Function &)> GetAC,
#if defined(BSPUB_COMMON) && defined(BSPRIV_COMMON_FUNCTION_SPECIALIZATION)
    function_ref<AnalysisResultsForFn(Function &)> GetAnalysis,
    // BISHENG: Add GetLI, GetAAR
    std::function<LoopInfo &(Function &)> GetLI,
    std::function<AAResults &(Function &)> GetAAR);
#else
    function_ref<AnalysisResultsForFn(Function &)> GetAnalysis);
#endif
} // end namespace llvm

#endif // LLVM_TRANSFORMS_SCALAR_SCCP_H
