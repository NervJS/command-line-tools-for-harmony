/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2025-2025. All rights reserved.
 */
/**
 * @file This module provides the capabilities of antifraud helper.
 * @kit DeviceSecurityKit
 */
import type common from '@ohos.app.ability.common';
/**
 * @namespace antifraudPicker
 * @syscap SystemCapability.Security.Antifraud
 * @since 5.0.3(15)
 */
declare namespace antifraudPicker {
    /**
     * Antifraud message options.
     *
     * @typedef AntifraudMessageOptions
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudMessageOptions {
        /**
         * Indicates the maximum number of selected items.
         * If this parameter is not transferred, the default value 50 is used.
         * The value ranges from 0 to 50. The value 0 is not recommended.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        maxSelectNumber?: number;
    }
    /**
     * Single antifraud message Information.
     *
     * @typedef SingleAntifraudMessageInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface SingleAntifraudMessageInfo {
        /**
         * Message sender number.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        senderNumber: string;
        /**
         * Message receiving time.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        receivingTime: number;
        /**
         * Message Content.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        messageContent: string;
        /**
         * Sender name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        senderName: string;
        /**
         * Home area of the SMS sender number.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        senderPlace: string;
        /**
         * Message Type.
         * 1 -- MMS
         * 0 -- SMS
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        messageType: string;
        /**
         * MMS subject.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        mmsSubject?: string;
        /**
         * MMS attachment information.
         *
         * @type { MmsAttachmentInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        mmsAttachments?: MmsAttachmentInfo[];
    }
    /**
     * MMS attachment information.
     *
     * @typedef MmsAttachmentInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface MmsAttachmentInfo {
        /**
         * MMS attachment type.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        attachmentType: number;
        /**
         * attachment uri.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        uri: string;
    }
    /**
     * Antifraud Message Result.
     *
     * @typedef AntifraudMessageResult
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudMessageResult {
        /**
         * Single antifraud message information.
         *
         * @type { SingleAntifraudMessageInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        messageInfo: SingleAntifraudMessageInfo[];
    }
    /**
     * Single antifraud call log Information.
     *
     * @typedef SingleAntifraudCallLogInfo
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface SingleAntifraudCallLogInfo {
        /**
         * Call log caller number.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callerNumber: string;
        /**
         * Call log receiving time.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        receivingTime: number;
        /**
         * Call log type.
         * 0 -- Incoming calls
         * 1 -- Talking out calls
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callLogType: number;
        /**
         * Caller name.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callerName: string;
        /**
         * Call duration.
         *
         * @type { string }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callDuration: number;
    }
    /**
     * Antifraud call log result.
     *
     * @typedef AntifraudCallLogResult
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudCallLogResult {
        /**
         * Single antifraud call log information.
         *
         * @type { SingleAntifraudCallLogInfo[] }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        callLogInfo: SingleAntifraudCallLogInfo[];
    }
    /**
     * Antifraud call log options.
     *
     * @typedef AntifraudCallLogOptions
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    interface AntifraudCallLogOptions {
        /**
         * Indicates the maximum number of selected items.
         * If this parameter is not transferred, the default value 50 is used.
         * The value ranges from 0 to 50. The value 0 is not recommended.
         *
         * @type { number }
         * @syscap SystemCapability.Security.Antifraud
         * @since 5.0.3(15)
         */
        maxSelectNumber?: number;
    }
    /**
     * Pull up the antifraudPicker based on the selection mode.
     *
     * @permission ohos.permission.USE_FRAUD_MESSAGES_PICKER
     * @param { common.Context } context - The context of an ability.
     * @param { AntifraudMessageOptions } options - represents the options provided in select mode.
     * @returns { Promise<AntifraudMessageResult> } Returns the information for the selected message.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.USE_FRAUD_MESSAGES_PICKER".
     * @throws { BusinessError } 401 - Input parameter error.
     * @throws { BusinessError } 1017100001 - Unknown error.
     * @throws { BusinessError } 1017100002 - The device type is not supported..
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    function selectFraudMessage(context: common.Context, options?: AntifraudMessageOptions): Promise<AntifraudMessageResult>;
    /**
     * Pull up the antifraudPicker based on the selection mode.
     *
     * @permission ohos.permission.USE_FRAUD_CALL_LOG_PICKER
     * @param { common.Context } context - The context of an ability.
     * @param { AntifraudCallLogOptions } options - represents the options provided in select mode.
     * @returns { Promise<AntifraudCallLogResult> } Returns the information for the selected call log.
     * @throws { BusinessError } 201 - Permission denied. Interface caller does not have permission "ohos.permission.USE_FRAUD_CALL_LOG_PICKER".
     * @throws { BusinessError } 401 - Input parameter error.
     * @throws { BusinessError } 1017100001 - Unknown error.
     * @throws { BusinessError } 1017100002 - The device type is not supported.
     * @syscap SystemCapability.Security.Antifraud
     * @since 5.0.3(15)
     */
    function selectFraudCallLog(context: common.Context, options?: AntifraudCallLogOptions): Promise<AntifraudCallLogResult>;
}
export default antifraudPicker;
