/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit BackgroundTasksKit
 */
import backgroundTaskManager from '@ohos.resourceschedule.backgroundTaskManager';
import backgroundProcessManager from '@ohos.resourceschedule.backgroundProcessManager';
import bundleState from '@ohos.bundleState';
import reminderAgent from '@ohos.reminderAgent';
import reminderAgentManager from '@ohos.reminderAgentManager';
import deviceStandby from '@ohos.resourceschedule.deviceStandby';
import usageStatistics from '@ohos.resourceschedule.usageStatistics';
import workScheduler from '@ohos.resourceschedule.workScheduler';
import WorkSchedulerExtensionAbility, { WorkSchedulerExtensionContext } from '@ohos.WorkSchedulerExtensionAbility';
export { WorkSchedulerExtensionAbility, WorkSchedulerExtensionContext, backgroundTaskManager, bundleState, deviceStandby, reminderAgent, reminderAgentManager, usageStatistics, workScheduler, backgroundProcessManager };
