/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ConnectivityKit
 */
import type baseProfile from './@ohos.bluetooth.baseProfile';
/**
 * Provides methods to accessing bluetooth PAN(Personal Area Networking Profile)-related capabilities.
 *
 * @namespace pan
 * @syscap SystemCapability.Communication.Bluetooth.Core
 * @since 10
 */
declare namespace pan {
    /**
     * Base interface of profile.
     *
     * @typedef { baseProfile.BaseProfile } BaseProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    type BaseProfile = baseProfile.BaseProfile;
    /**
     * create the instance of pan profile.
     *
     * @returns { PanProfile } Returns the instance of pan profile.
     * @throws { BusinessError } 401 - Invalid parameter. Possible causes: 1. Mandatory parameters are left unspecified.
     * <br>2. Incorrect parameter types. 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    function createPanProfile(): PanProfile;
    /**
     * Manager pan host profile.
     *
     * @extends BaseProfile
     * @typedef PanProfile
     * @syscap SystemCapability.Communication.Bluetooth.Core
     * @since 10
     */
    interface PanProfile extends BaseProfile {
    }
}
export default pan;
