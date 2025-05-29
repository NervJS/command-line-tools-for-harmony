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
#              platform and compiler related information.

cmake_minimum_required(VERSION 3.6.0)

set(CMAKE_TRY_COMPILE_PLATFORM_VARIABLES OHOS_SDK_NATIVE HMOS_SDK_NATIVE OHOS_ARCH)

# include ohos cmake
include(${OHOS_SDK_NATIVE}/build/cmake/ohos.toolchain.cmake)

include_directories(${HMOS_SDK_NATIVE}/sysroot/usr/include)
list(APPEND CMAKE_FIND_ROOT_PATH ${HMOS_SDK_NATIVE}/sysroot/usr)