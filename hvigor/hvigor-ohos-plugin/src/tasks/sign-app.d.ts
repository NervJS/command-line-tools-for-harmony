import { Project, FileSet, TaskInputValue } from '@ohos/hvigor';
import { ProjectTaskService } from './service/project-task-service.js';
import { OhosAppTask } from './task/ohos-app-task.js';
/**
 * 对app包进行签名
 *
 * @since 2022/1/22
 */
export declare class SignApp extends OhosAppTask {
    private readonly log;
    private pathInfo;
    private signUtil;
    private signingConfig;
    constructor(project: Project, taskService: ProjectTaskService);
    beforeAlwaysAction(): Promise<void>;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    protected doTaskAction(): Promise<void>;
    initTaskDepends(): void;
}
