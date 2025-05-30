/****************************************************************************
 ****************************************************************************
 ***
 ***   This header was automatically generated from a Linux kernel header
 ***   of the same name, to make information necessary for userspace to
 ***   call into the kernel available to libc.  It contains only constants,
 ***   structures, and macros generated from the original header, and thus,
 ***   contains no copyrightable information.
 ***
 ***   To edit the content of this header, modify the corresponding
 ***   source file (e.g. under external/kernel-headers/original/) then
 ***   run bionic/libc/kernel/tools/update_all.py
 ***
 ***   Any manual change here will be lost the next time this script will
 ***   be run. You've been warned!
 ***
 ****************************************************************************
 ****************************************************************************/
#ifndef _ASM_PTRACE_H
#define _ASM_PTRACE_H

#include <linux/types.h>

#include <stdint.h>

/*
 * For PTRACE_{POKE,PEEK}USR. 0 - 31 are GPRs,
 * 32 is syscall's original ARG0, 33 is PC, 34 is BADVADDR.
 */
#define GPR_BASE	0
#define GPR_NUM		32
#define GPR_END		(GPR_BASE + GPR_NUM - 1)
#define ARG0		(GPR_END + 1)
#define PC		(GPR_END + 2)
#define BADVADDR	(GPR_END + 3)

#define NUM_FPU_REGS	32

struct user_pt_regs {
	/* Main processor registers. */
	unsigned long regs[32];

	/* Original syscall arg0. */
	unsigned long orig_a0;

	/* Special CSR registers. */
	unsigned long csr_era;
	unsigned long csr_badv;
	unsigned long reserved[10];
} __attribute__((aligned(8)));

struct user_fp_state {
	uint64_t fpr[32];
	uint64_t fcc;
	uint32_t fcsr;
};

struct user_lsx_state {
	/* 32 registers, 128 bits width per register. */
	uint64_t vregs[32*2];
};

struct user_lasx_state {
	/* 32 registers, 256 bits width per register. */
	uint64_t vregs[32*4];
};

/*
 * This structure definition saves the LBT data structure,
 * the data comes from the task_struct structure, format is as follows:
 * regs[0]: thread.lbt.scr0
 * regs[1]: thread.lbt.scr1
 * regs[2]: thread.lbt.scr2
 * regs[3]: thread.lbt.scr3
 * regs[4]: thread.lbt.eflags
 * regs[5]: thread.fpu.ftop
 */
struct user_lbt_state {
	uint64_t regs[6];
};

/* Read and write watchpoint registers.	 */
#define NUM_WATCH_REGS 16

enum pt_watch_style {
	pt_watch_style_la32,
	pt_watch_style_la64
};

struct la32_watch_regs {
	uint32_t addr;
	uint32_t mask;
	/* irw/irwsta/irwmask I R W bits.
	 * bit 0 -- 1 if W bit is usable.
	 * bit 1 -- 1 if R bit is usable.
	 * bit 2 -- 1 if I bit is usable.
	 */
	uint8_t irw;
	uint8_t irwstat;
	uint8_t irwmask;
} __attribute__((aligned(8)));

struct la64_watch_regs {
	uint64_t addr;
	uint64_t mask;
	/* irw/irwsta/irwmask I R W bits.
	 * bit 0 -- 1 if W bit is usable.
	 * bit 1 -- 1 if R bit is usable.
	 * bit 2 -- 1 if I bit is usable.
	 */
	uint8_t irw;
	uint8_t irwstat;
	uint8_t irwmask;
} __attribute__((aligned(8)));

struct pt_watch_regs {
	int16_t max_valid;
	int16_t num_valid;
	enum pt_watch_style style;
	union {
		struct la32_watch_regs la32[NUM_WATCH_REGS];
		struct la64_watch_regs la64[NUM_WATCH_REGS];
	};
};

#define PTRACE_SYSEMU			0x1f
#define PTRACE_SYSEMU_SINGLESTEP	0x20
#define PTRACE_GET_WATCH_REGS		0xd0
#define PTRACE_SET_WATCH_REGS		0xd1

/* Watch irw/irwmask/irwstat bit definitions */
#define LA_WATCH_W		(1 << 0)
#define LA_WATCH_R		(1 << 1)
#define LA_WATCH_I		(1 << 2)
#define LA_WATCH_IRW	(LA_WATCH_W | LA_WATCH_R | LA_WATCH_I)

#endif /* _ASM_PTRACE_H */
