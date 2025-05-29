/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 * Description: PAC inline function
 */
#ifndef __ASSEMBLY__
#ifndef DP_PACFUNC_H
#define DP_PACFUNC_H
#define F16 0xffffffffffffffffUL
#define VA_SIZE 48
#define KERNEL_MASK ((F16) << (VA_SIZE))

#define PAC_NULL ((void*)0)

#define PAC_PACGA_MASK(bits) ((1UL << (bits)) - 1UL)
#define PAC_PACGA_SHIFT_BITS 32
#define PAC_PACGA_DATA_BYTES (sizeof(unsigned long long))
#define PAC_PACGA_ALIGN_UP(x) (((x) + (PAC_PACGA_DATA_BYTES - 1)) & ~(PAC_PACGA_DATA_BYTES - 1))
#define PAC_PACGA_ALIGN_DOWN(x) ((x) & ~(PAC_PACGA_DATA_BYTES - 1))
#define pac_min(a, b) ((a) < (b) ? (a) : (b))
#define pac_max(a, b) ((a) < (b) ? (b) : (a))

#ifdef __cplusplus
    extern "C" {
#endif

#define pac_func_create(struct_type) \
    static void pac_aut_data_pac_##struct_type(struct struct_type *param) { \
        return; \
    } \
    static void pac_gen_data_pac_##struct_type(struct struct_type *param) { \
        return; \
    }

#define __pac_nr_vars(ignored, a, b, c, d, e, f, g, h, i, j, k, n, ...) n
#define pac_nr_vars(...) __pac_nr_vars(ignored, ##__VA_ARGS__, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0)

#define __pac_pacga_f0(tmp, ptr, field)         __undeclared__[-1]
#define __pac_pacga_f1(tmp, ptr, field)         tmp = pacga(tmp, (unsigned long long)(ptr->field))
#define __pac_pacga_f2(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f1(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f3(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f2(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f4(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f3(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f5(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f4(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f6(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f5(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f7(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f6(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f8(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f7(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f9(tmp, ptr, field, ...)    tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f8(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f10(tmp, ptr, field, ...)   tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f9(tmp, ptr, __VA_ARGS__)
#define __pac_pacga_f11(tmp, ptr, field, ...)   tmp = pacga(tmp, (unsigned long long)(ptr->field)); \
    __pac_pacga_f10(tmp, ptr, __VA_ARGS__)

#define __pac_pacga_f(tmp, ptr, n, ...) do { __pac_pacga_f##n(tmp, ptr, __VA_ARGS__); } while (0)
#define pac_pacga_f(tmp, ptr, ...) __pac_pacga_f(tmp, ptr, pac_nr_vars(__VA_ARGS__), __VA_ARGS__)

#define pac_gen_fields_pac(addr, ...)                             \
    ({                                                            \
        unsigned long long __res = (unsigned long long)(addr);    \
        typeof(addr) ptr = addr;                                  \
        pac_pacga_f(__res, ptr, __VA_ARGS__);                     \
        __res;                                                    \
    })

static inline unsigned long long autda(unsigned long long pointer, unsigned long long address)
{
    void *t1 = (void *)pointer;
    void *t2 = (void *)address;
#ifdef PAC_DFI_PTR_BKEY
    __asm__ __volatile__("autdb  %0, %1" : "+r"(t1) : "r"(t2) :);
#else
    __asm__ __volatile__("autda  %0, %1" : "+r"(t1) : "r"(t2) :);
#endif
    return (unsigned long long)t1;
}

static inline unsigned long long pacda(unsigned long long pointer, unsigned long long address)
{
    void *t1 = (void *)pointer;
    void *t2 = (void *)address;
#ifdef PAC_DFI_PTR_BKEY
    __asm__ __volatile__("pacdb  %0, %1" : "+r"(t1) : "r"(t2) :);
#else
    __asm__ __volatile__("pacda  %0, %1" : "+r"(t1) : "r"(t2) :);
#endif
    return (unsigned long long)t1;
}

static inline unsigned int pacga(unsigned long long context, unsigned long long data)
{
    unsigned long long res;
    __asm__ __volatile__(
        "pacga  %0, %1, %2"
        : "=r"(res)
        : "r" (data), "r"(context)
        :
    );
    return res >> 32; // pac数组中只需要保存32位
}

static inline unsigned long long pac_load_dp(unsigned long long *addr)
{
    unsigned long long paced_ptr = *addr;
    if ((paced_ptr >> VA_SIZE) == 0) {
        return paced_ptr;
    }

    return autda(paced_ptr, (unsigned long long)addr);
}

static inline unsigned long long pac_load_dp_volatile(unsigned long long *addr)
{
    unsigned long long paced_ptr = *(volatile unsigned long long *)addr;
    if ((paced_ptr >> VA_SIZE) == 0) {
        return paced_ptr;
    }

    return autda(paced_ptr, (unsigned long long)addr);
}

static inline unsigned long long aut_dp(unsigned long long paced_ptr, unsigned long long addr,
    unsigned long long addr_len)
{
    if ((paced_ptr >> addr_len) == 0) {
        return paced_ptr;
    }

    return autda(paced_ptr, (unsigned long long)addr);
}

static inline unsigned long long pac_dp(unsigned long long ptr, unsigned long long addr,
    unsigned long long addr_len)
{
    unsigned long long paced_ptr = ptr;
    if ((ptr >> addr_len) != 0) {
        paced_ptr = pacda(ptr, addr);
    }
    return paced_ptr;
}

static inline void repac_dp(unsigned long long addr)
{
    unsigned long long *addr_ptr = (unsigned long long *)addr;
    unsigned long long ptr = *addr_ptr;
    if ((ptr >> VA_SIZE) != 0) {
        *addr_ptr = pacda(ptr | KERNEL_MASK, addr);
    }
}

static inline void repac_dp_n(unsigned long long addr, unsigned long long size)
{
    unsigned long long cnt = size / 8; // 8: bit转换成byte
    unsigned long long i = 0;
    for (; i < cnt; i++, addr += 8) { // 8: 跳过一个字节的地址
        repac_dp(addr);
    }
}

static inline void repac_dp_ctx(unsigned long long addr, unsigned long long ctx)
{
    unsigned long long *addr_ptr = (unsigned long long *)addr;
    unsigned long long ptr = *addr_ptr;
    if ((ptr >> VA_SIZE) != 0) {
        *addr_ptr = pacda(ptr | KERNEL_MASK, ctx);
    }
}

static inline unsigned long long aut_memop_dp(unsigned long long addr)
{
    unsigned long long *addr_ptr = (unsigned long long *)addr;
    unsigned long long ptr = *addr_ptr;
    if ((ptr >> VA_SIZE) == 0) {
        return ptr;
    }
    return autda(ptr, addr);
}

static inline void pac_store_dp(unsigned long long ptr, unsigned long long *addr)
{
    unsigned long long paced_ptr = ptr;
    if ((ptr >> VA_SIZE) != 0) {
        paced_ptr = pacda(ptr, (unsigned long long)addr);
    }
    *addr = paced_ptr;
}

static inline void pac_store_dp_volatile(unsigned long long ptr, unsigned long long *addr)
{
    unsigned long long paced_ptr = ptr;
    if ((ptr >> VA_SIZE) != 0) {
        paced_ptr = pacda(ptr, (unsigned long long)addr);
    }
    *(volatile unsigned long long *)addr = paced_ptr;
}

static inline unsigned long long pac_restore_dp(unsigned long long paced_ptr)
{
    unsigned long long ptr = paced_ptr;
    if ((paced_ptr >> VA_SIZE) == 0) {
        ptr = paced_ptr;
    } else {
        ptr = paced_ptr | KERNEL_MASK;
    }
    return ptr;
}

static inline void pac_store_dp2(unsigned long long *addr)
{
    *addr = pacda(*addr, (unsigned long long)addr);
}

static inline void pac_dp2(unsigned long long *addr)
{
#ifdef PAC_DFI_ADDRLEN
    if ((*addr >> PAC_DFI_ADDRLEN) != 0) {
#else
    if ((*addr >> VA_SIZE) != 0) {
#endif
        pac_store_dp2(addr);
    }
}

static inline int memcmp_paced_ptr(void *cs, void *ct, unsigned long long count)
{
    unsigned long long *su1 = 0;
    unsigned long long *su2 = 0;
    int res = 0;
    count /= 8;
    for (su1 = cs, su2 = ct; 0 < count; ++su1, ++su2, count--) {
        unsigned long long p1 = pac_restore_dp(*su1);
        unsigned long long p2 = pac_restore_dp(*su2);
        if ((res = p1 - p2) != 0) {
            break;
        }
    }
    return res;
}

static inline void pac_gen_data_pac(unsigned long long data, unsigned long long context,
    unsigned int *pac_addr)
{
    *pac_addr = pacga(context, data);
}

static inline void pac_aut_data_pac(unsigned long long data, unsigned long long context,
    unsigned int *pac_addr)
{
    unsigned long long pac1 = pacga(context, data);
    unsigned long long pac2 = *pac_addr;
    if (pac1 != pac2)
        __asm__ __volatile__("lsl    %0, %0, #32\n\t"
                    "orr    %0, %1, %0\n\t"
                    "mov    %1, #1\n\t"
                    "ldr    %1, [%1]"
                    :
                    : "r"(pac1), "r"(pac2)
                    :);
}

static inline unsigned long long pac_gen_mem_pac(unsigned char *base, unsigned int len)
{
    unsigned char *p = PAC_NULL;
    unsigned char *aligned_base = PAC_NULL;
    unsigned char *aligned_end = PAC_NULL;
    unsigned char *end = base + len;
    unsigned long long sig = (unsigned long long)base;

    aligned_base = pac_min((unsigned char *)PAC_PACGA_ALIGN_UP((unsigned long long)base), end);
    aligned_end = pac_max((unsigned char *)PAC_PACGA_ALIGN_DOWN((unsigned long long)end), aligned_base);

    /* calculate pac for unaligned prefix: [base, aligned_base) */
    for (p = base; p < aligned_base; p++) {
        sig = pacga(sig, *p);
    }

    /* calculate pac for aligned data: [aligned_base, aligned_end) */
    for (p = aligned_base; p < aligned_end; p += PAC_PACGA_DATA_BYTES) {
        sig = pacga(sig, *(unsigned long long *)p);
    }

    /* calculate pac for unaligned suffix: [aligned_end, end) */
    for (p = aligned_end; p < end; p++) {
        sig = pacga(sig, *p);
    }

    return sig;
}

static inline void pac_cmp_pac(unsigned long long pac_new, unsigned long long pac_old, unsigned int bits)
{
    pac_new &= PAC_PACGA_MASK(bits);
    pac_old &= PAC_PACGA_MASK(bits);
    if (pac_new != pac_old)
        __asm__ __volatile__("mov    x0, #0\n\t"
                "mov    w1, %w0\n\t"
                "mov    w2, %w1\n\t"
                "ldr    x0, [x0]"
                :
                : "r"(pac_new), "r"(pac_old)
                :);
}

extern void pacfunc_placeholder(void);
// 增加函数调用保证本文件的内联函数不会被编译器优化删除，weak符号保证多个编译单元链接时不会出重复定义
__attribute__((weak)) void pacfunc_placeholder(void)
{
    unsigned int addr = 0;
    unsigned long long data = 0;
    unsigned long long context = 0;
    pac_dp(data, context, VA_SIZE);
    aut_dp(data, context, VA_SIZE);
    pac_dp2(&context);
    pac_gen_data_pac(data, context, &addr);
    pac_aut_data_pac(data, context, &addr);
}

#ifdef __cplusplus
}
#endif

#endif  // DP_PACFUNC_H
#endif  // __ASSEMBLY__
