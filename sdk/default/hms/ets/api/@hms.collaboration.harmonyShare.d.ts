/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines huaweishare capability.
 * @kit ShareKit
 */
import systemShare from '@hms.collaboration.systemShare';
import type { Callback } from '@ohos.base';
/**
 * Provide methods make the host (data owner) application can conveniently wrap shared data,
 * do the device to device huaweiShare.
 *
 * @namespace harmonyShare
 * @syscap SystemCapability.Collaboration.HarmonyShare
 * @stagemodelonly
 * @since 5.0.0(12)
 */
declare namespace harmonyShare {
    /**
     * HuaweiShare error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.3(15)
     */
    enum SharableErrorCode {
        /**
         * No content error
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        NO_CONTENT_ERROR = 1,
        /**
         * no internet error.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        NO_INTERNET_ERROR = 2,
        /**
         * download error.
         *
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        DOWNLOAD_ERROR = 3
    }
    /**
     * Describe the huaweiShare method.
     * @typedef SharableTarget
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    interface SharableTarget {
        /**
         * Start the huaweiShare with shared data
         *
         * @param { systemShare.SharedData } data - host application's shared data
         * @returns { Promise<void> } - returns promise void.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.0(12)
         */
        share(data: systemShare.SharedData): Promise<void>;
        /**
         * Reject huaweiShare with shared error
         *
         * @param { SharableErrorCode } error - reject error message
         * @returns { Promise<void> } - returns promise void.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Collaboration.HarmonyShare
         * @stagemodelonly
         * @since 5.0.3(15)
         */
        reject(error: SharableErrorCode): Promise<void>;
    }
    /**
     * Register the knockShare event callback.
     *
     * @param { 'knockShare' } event - knockShare event.
     * @param { Callback<SharableTarget> } callback - Called when resource can be shared.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function on(event: 'knockShare', callback: Callback<SharableTarget>): void;
    /**
     * Cancel the knockShare event registered through { @link on }.
     *
     * @param { 'knockShare' } event - canceled event.
     * @param { Callback<SharableTarget> } callback - Called when callback unregister.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Collaboration.HarmonyShare
     * @stagemodelonly
     * @since 5.0.0(12)
     */
    function off(event: 'knockShare', callback?: Callback<SharableTarget>): void;
}
export default harmonyShare;
