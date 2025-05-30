import { Project, TaskDetails } from '@ohos/hvigor';
import { IncrementalExecTask } from '@ohos/hvigor';
import { ProjectTaskService } from '../service/project-task-service.js';
/**
 * openHarmony基础app task
 *
 * @since 2022/1/10
 */
export declare abstract class OhosAppTask extends IncrementalExecTask {
    protected project: Project;
    protected service: ProjectTaskService;
    protected constructor(project: Project, taskService: ProjectTaskService, taskDetails: TaskDetails);
    protected abstract initTaskDepends(): void;
    /**
     * 为每个target执行task的具体逻辑
     *
     */
    protected abstract doTaskAction(): void;
    registryAction: () => Function;
}
