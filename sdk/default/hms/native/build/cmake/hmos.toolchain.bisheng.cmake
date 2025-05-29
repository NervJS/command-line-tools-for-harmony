# Copyright (c) 2021 Huawei Device Co., Ltd.
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Description: The configuration of toolchain file supplied to cmake, which specifies
#              locations for compilers and toolchain utilities, and other target
#              platform and compiler related information.In the configuration file,
#              Bisheng Compiler is the default c and c++ compiler.

cmake_minimum_required(VERSION 3.6.0)

set(CMAKE_TRY_COMPILE_PLATFORM_VARIABLES OHOS_SDK_NATIVE HMOS_SDK_NATIVE OHOS_ARCH)

include(${OHOS_SDK_NATIVE}/build/cmake/ohos.toolchain.cmake)

# Set HMOS_SDK_NATIVE
get_filename_component(HMOS_SDK_NATIVE "${CMAKE_CURRENT_LIST_DIR}/../.." ABSOLUTE)
file(TO_CMAKE_PATH "${HMOS_SDK_NATIVE}" HMOS_SDK_NATIVE)

# set the toolchain config.replace ohos llvm with BiSheng
set(TOOLCHAIN_ROOT_PATH "${HMOS_SDK_NATIVE}/BiSheng")
set(TOOLCHAIN_BIN_PATH  "${HMOS_SDK_NATIVE}/BiSheng/bin")

set(CMAKE_C_COMPILER_EXTERNAL_TOOLCHAIN   "${TOOLCHAIN_ROOT_PATH}")
set(CMAKE_CXX_COMPILER_EXTERNAL_TOOLCHAIN "${TOOLCHAIN_ROOT_PATH}")
set(CMAKE_ASM_COMPILER_EXTERNAL_TOOLCHAIN "${TOOLCHAIN_ROOT_PATH}")
set(CMAKE_C_COMPILER "${TOOLCHAIN_BIN_PATH}/clang${HOST_SYSTEM_EXE_SUFFIX}")
set(CMAKE_CXX_COMPILER "${TOOLCHAIN_BIN_PATH}/clang++${HOST_SYSTEM_EXE_SUFFIX}")

set(OHOS_AR "${TOOLCHAIN_BIN_PATH}/llvm-ar${HOST_SYSTEM_EXE_SUFFIX}")
set(OHOS_RANLIB "${TOOLCHAIN_BIN_PATH}/llvm-ranlib${HOST_SYSTEM_EXE_SUFFIX}")
set(CMAKE_AR                "${OHOS_AR}" CACHE FILEPATH "Archiver" FORCE)
set(CMAKE_RANLIB            "${OHOS_RANLIB}" CACHE FILEPATH "Ranlib" FORCE)

include_directories(${HMOS_SDK_NATIVE}/sysroot/usr/include)
list(APPEND CMAKE_FIND_ROOT_PATH ${HMOS_SDK_NATIVE}/sysroot/usr)
