/*
 * Copyright (c) 2022-2024 Huawei Device Co., Ltd.
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
 * @kit MDMKit
 */

import type Want from './@ohos.app.ability.Want';
import common from '@ohos.app.ability.common';
/**
 * This module provides the capability to manage the administrator of the enterprise devices.
 *
 * @namespace adminManager
 * @syscap SystemCapability.Customization.EnterpriseDeviceManager
 * @since 9
 */
declare namespace adminManager {
    /**
     * Enum for type of administrator.
     *
     * @enum { number }
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @since 15
     */
    export enum AdminType {
        /**
         * The value of administrator used in BYOD device.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @since 15
         */
        ADMIN_TYPE_BYOD = 0x02
    }
    /**
     * Enum for managed event
     *
     * @enum { number }
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @since 12
     */
    export enum ManagedEvent {
        /**
         * The event of bundle added.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @since 12
         */
        MANAGED_EVENT_BUNDLE_ADDED = 0,
        /**
         * The event of bundle removed.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @since 12
         */
        MANAGED_EVENT_BUNDLE_REMOVED = 1,
        /**
         * The event of app start.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @since 12
         */
        MANAGED_EVENT_APP_START = 2,
        /**
         * The event of app stop.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @since 12
         */
        MANAGED_EVENT_APP_STOP = 3,
        /**
         * The event of system update.
         *
         * @syscap SystemCapability.Customization.EnterpriseDeviceManager
         * @since 12
         */
        MANAGED_EVENT_SYSTEM_UPDATE = 4
    }
    /**
     * Disables a current administrator ability.
     * Only apps with the ohos.permission.MANAGE_ENTERPRISE_DEVICE_ADMIN permission or the shell uid can call this method.
     *
     * @permission ohos.permission.MANAGE_ENTERPRISE_DEVICE_ADMIN
     * @param { Want } admin - admin indicates the enterprise admin extension ability information.
     *                         The admin must have the corresponding permission.
     * @param { number } [userId] - userId indicates the user ID or do not pass user ID.
     * @returns { Promise<void> } the promise returned by the disableAdmin.
     * @throws { BusinessError } 9200005 - Failed to deactivate the administrator application of the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function disableAdmin(admin: Want, userId?: number): Promise<void>;
    /**
     * Subscribes the managed event of admin.
     *
     * @permission ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { Array<ManagedEvent> } managedEvents - managedEvents indicates the managed events to subscribe.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200008 - The specified system event is invalid.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function subscribeManagedEventSync(admin: Want, managedEvents: Array<ManagedEvent>): void;
    /**
     * Unsubscribes the managed event of admin.
     *
     * @permission ohos.permission.ENTERPRISE_SUBSCRIBE_MANAGED_EVENT
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { Array<ManagedEvent> } managedEvents - managedEvents indicates the managed events to subscribe.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200008 - The specified system event is invalid.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 12
     */
    function unsubscribeManagedEventSync(admin: Want, managedEvents: Array<ManagedEvent>): void;
    /**
     * Administrator delegates access to policies to another application.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } bundleName - bundleName indicates the bundle name of the delegated application.
     * @param { Array<string> } policies - policies indicates the policies accessible to the delegated application.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 9200009 - Failed to grant the permission to the application.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    function setDelegatedPolicies(admin: Want, bundleName: string, policies: Array<string>): void;
    /**
     * Administrator gets the list of delegation policies for the application.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } bundleName - bundleName indicates the bundle name of the delegated application.
     * @returns { Array<string> } the policies accessible to the delegated application.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    function getDelegatedPolicies(admin: Want, bundleName: string): Array<string>;
    /**
     * Administrator gets the delegated applications which access to the policy.
     *
     * @permission ohos.permission.ENTERPRISE_MANAGE_DELEGATED_POLICY
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { string } policy - policy indicates the policy that delegated to other applications.
     * @returns { Array<string> } the bundle names of the delegated application that access to the policy.
     * @throws { BusinessError } 9200001 - The application is not an administrator application of the device.
     * @throws { BusinessError } 9200002 - The administrator application does not have permission to manage the device.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 14
     */
    function getDelegatedBundleNames(admin: Want, policy: string): Array<string>;
    /**
     * Starts an ability of admin provision application.
     *
     * @permission ohos.permission.START_PROVISIONING_MESSAGE
     * @param { Want } admin - admin indicates the administrator ability information.
     * @param { AdminType } type - type indicates the type of administrator to set.
     * @param { common.Context } context - context indicates the context of application.
     * @param { Record<string, string> } parameters - the parameters indicates the custom parameters of start an administrator provision.
     * @throws { BusinessError } 201 - Permission verification failed. The application does not have the permission required to call the API.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *                                 2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.Customization.EnterpriseDeviceManager
     * @stagemodelonly
     * @since 15
     */
    function startAdminProvision(admin: Want, type: AdminType, context: common.Context, parameters: Record<string, string>): void;
}
export default adminManager;
