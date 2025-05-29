//===-- StackProtectorRetLowering.h -----------------------------*- C++ -*-===//
//
// Part of the LLVM Project, under the Apache License v2.0 with LLVM Exceptions.
// See https://llvm.org/LICENSE.txt for license information.
// SPDX-License-Identifier: Apache-2.0 WITH LLVM-exception
//
//===----------------------------------------------------------------------===//

/// OHOS_LOCAL begin
#ifndef LLVM_CODEGEN_STACKPROTECTORRETLOWERING_H
#define LLVM_CODEGEN_STACKPROTECTORRETLOWERING_H

#include "llvm/ADT/SmallVector.h"
#include "llvm/Support/ErrorHandling.h"

#include <utility>
#include <vector>

namespace llvm {
class CalleeSavedInfo;
class GlobalVariable;
class MachineBasicBlock;
class MachineFunction;
class MachineInstr;

class StackProtectorRetLowering {
public:
  virtual ~StackProtectorRetLowering() {}

  /// insert stack-protector-ret instrumentation in prologue or epilogue.
  virtual void insertStackProtectorRetPrologue(MachineFunction &MF,
                                               MachineBasicBlock &MBB,
                                               GlobalVariable *cookie) const {}
  virtual void insertStackProtectorRetEpilogue(MachineFunction &MF,
                                               MachineInstr &MI,
                                               GlobalVariable *cookie) const {}

  /// Check if it is a return instruction.
  /// Need to overide the implementation for different architectures.
  virtual bool instrIsRet(unsigned opcode) const { return false; }

  /// Get a caller saved temporary register for the target architecture.
  /// Need to overide the implementation for different architectures.
  virtual unsigned getTargetReg(void) const { return 0; }

  /// Check if backward CFI protection is required.
  virtual void setupStackProtectorRet(MachineFunction &MF) const;

  /// Set SSPRetReg as a callee saved register to push the computed stack guard value onto the stack.
  virtual void saveStackProtectorRetRegister(MachineFunction &MF, std::vector<CalleeSavedInfo> &CSI) const;

  /// Determine an available SSPRet register and feedback the determination result.
  /// Find a register that can be used during function prologue / epilogue to store
  /// the return protector cookie. Returns false if a register is needed but could
  /// not be found, otherwise returns true.
  virtual bool determineStackProtectorRetRegister(
      MachineFunction &MF,
      const SmallVector<MachineBasicBlock *, 4> &SaveBlocks,
      const SmallVector<MachineBasicBlock *, 4> &RestoreBlocks) const;

  /// insertStackProtectorRets - insert stack-protector-ret instrumentation.
  virtual void insertStackProtectorRets(MachineFunction &MF) const;

  /// fillTempRegisters - Fill the list of available temp registers we can
  /// use as a CalculationRegister.
  virtual void fillTempRegisters(MachineFunction &MF,
                                 std::vector<unsigned> &TempRegs) const {
    llvm_unreachable("Not Implemented");
  }
};

} // namespace llvm

#endif
/// OHOS_LOCAL end
