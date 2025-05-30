import { CacheStoreManager, DurationEvent, TaskDetails } from '@ohos/hvigor';
import { ExternalNativeOpt } from '../options/build/build-opt.js';
import { TargetTaskService } from './service/target-task-service.js';
import { OhosHapTask } from './task/ohos-hap-task.js';
type NativeExecutionArgs = {
    commandLine: string[];
    logFolder: string;
};
/**
 * BuildNativeWithNinja和BuildNativeWithCmake的抽象父类
 *
 * @since 2022/8/23
 */
export declare abstract class AbstractBuildNative extends OhosHapTask {
    protected readonly _nativeOption?: ExternalNativeOpt;
    protected constructor(targetService: TargetTaskService, taskDetails: TaskDetails);
    /**
     * 执行编译命令
     *
     * @param commandLine 命令行
     * @param dir
     * @param callback 回调函数
     * @param callbackInput 回调函数的输入
     * @param subDurationEvent 子事件
     */
    protected executeCommand(commandLine: string[], dir: string, callback: Function, callbackInput: unknown[], subDurationEvent: DurationEvent): Promise<void>;
}
export declare const nativeExecution: (args: NativeExecutionArgs, workerCacheManager?: CacheStoreManager) => Promise<void>;
export {};
