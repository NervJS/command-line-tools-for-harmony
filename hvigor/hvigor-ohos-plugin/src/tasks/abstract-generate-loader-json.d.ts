import { TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { TargetTaskService } from './service/target-task-service.js';
import { OhosHapTask } from './task/ohos-hap-task.js';
/**
 * 生成loader需要的json文件
 *
 * @since 2022/9/9
 */
export declare abstract class AbstractGenerateLoaderJson extends OhosHapTask {
    protected _log: OhosLogger;
    protected readonly workerConfig: string[] | undefined;
    protected modulePathMap: Record<string, string>;
    protected readonly projectRootPath: string;
    protected constructor(taskService: TargetTaskService, taskDetails: TaskDetails);
    declareInputs(): Map<string, TaskInputValue>;
    protected beforeTask(): void;
    protected getWorkerConfig(): string[] | undefined;
    private getModulePathMap;
}
