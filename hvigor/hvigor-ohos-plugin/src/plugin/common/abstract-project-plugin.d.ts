import { HvigorSystemPlugin, Project } from '@ohos/hvigor';
import { ProjectModel } from '../../model/project/project-model.js';
import { Clean } from '../../tasks/common/clean.js';
import { AssembleApp } from '../../tasks/hook/assemble/assemble-app.js';
import { ProjectTaskService } from '../../tasks/service/project-task-service.js';
import { SyncProject } from '../../tasks/sync/sync-project.js';
import { OhosAppContext, OhosProjectContext } from '../context/plugin-context.js';
/**
 * 对外暴露app级别的接口和任务的plugin
 *
 * @since 2021/12/16
 */
export declare abstract class AbstractProjectPlugin extends HvigorSystemPlugin {
    protected _projectName: string;
    protected _projectModel: ProjectModel | undefined;
    protected _taskService: ProjectTaskService | undefined;
    protected ohosAppContext: OhosAppContext | OhosProjectContext | undefined;
    _project: Project;
    assembleApp: AssembleApp | undefined;
    clean: Clean | undefined;
    syncProject: SyncProject | undefined;
    protected constructor(project: Project);
    abstract initTaskService(): void;
    doRegisterTask(): void;
    doProjectInspection(): void;
    initBuildOptionMap(path: string): void;
    initTraceData(): void;
    initGlobalData(): void;
    getTaskService(): ProjectTaskService | undefined;
    getProjectModel(): ProjectModel | undefined;
    initContext(): void;
    getContext(): OhosAppContext | undefined;
}
