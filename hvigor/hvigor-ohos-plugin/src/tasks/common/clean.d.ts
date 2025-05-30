import { DefaultTask, HvigorCoreNode } from '@ohos/hvigor';
import { SdkInfo } from '../../sdk/sdk-info.js';
import { ProcessUtils } from '../../utils/process-utils.js';
import { ModuleTaskService } from '../service/module-task-service.js';
import { TaskService } from '../service/task-service.js';
/**
 * module级别的clean
 *
 * @since 2022/1/10
 */
export declare class Clean extends DefaultTask {
    private readonly _taskService;
    private _logger;
    constructor(node: HvigorCoreNode, taskService: TaskService);
    nativeClean: (sdkInfo: SdkInfo | undefined) => void;
    tryCatchExecute: (commands: string[], warns: string[], archDir: string, processUtils: ProcessUtils) => void;
    getArchDirectories: (directoryPath: string, archDirectories: string[], taskService: ModuleTaskService) => void;
    private pushArchDirectories;
    private isDirectory;
    private resetRemoteHspCache;
    registryAction: () => Function;
    clean: (buildDir: string, testBuildDir?: string) => Promise<void>;
    terminateWorkerPool: () => Promise<void>;
    rmdirSyncWithBuildDir: (buildDir: string) => boolean;
    rmdirSync: (dirPath: string, hasError: boolean) => boolean;
}
