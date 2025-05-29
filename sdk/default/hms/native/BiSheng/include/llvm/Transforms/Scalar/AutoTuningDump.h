#if defined(BSPRIV_COMMON_AUTO_TUNING)
//===----------------- AutoTuningDump.h - Auto-Tuning ---------------------===//
//                     The LLVM Compiler Infrastructure
//
// This file is distributed under the University of Illinois Open Source
// License. See LICENSE.TXT for details.
//
// ===---------------------------------------------------------------------===//
//
/// This file contains pass collecting IR of tuned regions and storing them into
/// predetermined locations, to be used later by autotuning ML guidance and
/// other features e.g. incremental compilation and replayable kernel
/// extraction.
//
// ===---------------------------------------------------------------------===//

#ifndef LLVM_AUTOTUNER_AUTOTUNING_DUMP_H_
#define LLVM_AUTOTUNER_AUTOTUNING_DUMP_H_

#include "llvm/Analysis/LoopInfo.h"
#include "llvm/Analysis/LoopPass.h"
#include "llvm/IR/PassManager.h"
#include "llvm/Transforms/Scalar/LoopPassManager.h"
#include <string>

namespace llvm {
class AutoTuningDump {
public:
  AutoTuningDump(bool IncrementalCompilation = false);
  bool run(Module &F, function_ref<LoopInfo &(Function &)> GetLI);

private:
  std::string AutoTuneDirPath;
  std::unique_ptr<raw_ostream> createFile(const Twine &File);
  int getConfigNumber();
  void dumpToStream(llvm::raw_ostream &os, const Loop &L) const;
  void dumpToStream(llvm::raw_ostream &os, const Function &F) const;
  void dumpFunctions(llvm::Module &M);
  void dumpLoops(llvm::Module &M, function_ref<LoopInfo &(Function &)> GetLI);
  void dumpModule(llvm::Module &M);
  std::string getDirectoryName(const std::string File) const;
  std::string getFileName(std::string FilePath);
  // Extract specified function along with all required global variables and
  // functions recursively in module.
  void dumpFunctionRecursive(Module &M);

  bool IsIncrementalCompilation;
};

class AutoTuningDumpPass : public PassInfoMixin<AutoTuningDumpPass> {
public:
  explicit AutoTuningDumpPass(bool IncrementalCompilation = false) {
    IsIncrementalCompilation = IncrementalCompilation;
  }

  PreservedAnalyses run(Module &M, ModuleAnalysisManager &AM);

private:
  bool IsIncrementalCompilation;
};
} // namespace llvm

#endif /* LLVM_AUTOTUNER_AUTOTUNING_DUMP_H_ */
#endif
