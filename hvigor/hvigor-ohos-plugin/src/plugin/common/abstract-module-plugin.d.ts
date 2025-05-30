import { HvigorSystemPlugin, Module } from '@ohos/hvigor';
import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { ApiType } from '../../project/data/hap-extra-info.js';
import { Clean } from '../../tasks/common/clean.js';
import { AbstractModuleHookTask } from '../../tasks/hook/abstract-module-hook-task.js';
import { CompileNativeHook } from '../../tasks/hook/native/compile-native-hook.js';
import { ModuleTaskService } from '../../tasks/service/module-task-service.js';
import { TargetTaskService } from '../../tasks/service/target-task-service.js';
import { SyncModule } from '../../tasks/sync/sync-module.js';
import { OhosModuleContext } from '../context/plugin-context.js';
/**
 * hap模块的抽象接口
 *
 * @since 2022/1/20
 */
export declare abstract class AbstractModulePlugin extends HvigorSystemPlugin {
    private _log;
    protected _module: Module;
    protected _projectModel: ProjectModel | undefined;
    protected _moduleModel: ModuleModel | undefined;
    protected _moduleService: ModuleTaskService | undefined;
    protected _configFileName: string | undefined;
    protected _needExecTargetServiceList: TargetTaskService[];
    protected _pluginApiType: string | undefined;
    protected ohosModuleContext: OhosModuleContext | undefined;
    protected readonly moduleName: string | undefined;
    clean: Clean | undefined;
    compileNative: CompileNativeHook | undefined;
    sync: SyncModule | undefined;
    protected constructor(pluginId: string, module: Module);
    refreshTargetServiceList(): void;
    getContext(): OhosModuleContext;
    initContext(): void;
    withProjectModel(projectModel: ProjectModel): this;
    getProjectModel(): ProjectModel | undefined;
    withModuleModel(moduleModel: ModuleModel): this;
    getModuleModel(): ModuleModel | undefined;
    withPluginApiType(pluginApiType: ApiType): this;
    withRuntimeConfigFileName(runtimeFileName: string): this;
    initModuleTaskService(isFaMode: boolean): void;
    initBuildOptionMap(path: string): void;
    doModuleInspection(): void;
    getNeedExecTargetServiceList(): TargetTaskService[];
    /**
     * 初始化获取当前模块有哪些target需要创建任务流，并挂接在hook任务上
     * 1. 如果当前模块所有target都与指定的product不匹配，则报一个warn
     *
     */
    initTargetDepends(): void;
    /**
     * 初始化 公共的与target无关的任务
     *
     * @private
     */
    initModuleCommonTasks(): void;
    initModuleCommonTasksForDiffApiType(isFaMode: boolean): void;
    protected initTaskDependsForAllNeedExecTarget(...tasks: AbstractModuleHookTask[]): void;
    /**
     * 校验Module Target配置
     */
    private checkModuleTarget;
    /**
     * 检查hvigor命令行中配置的target
     */
    checkHvigorCommandTarget(): void;
    /**
     * 校验已配置、或默认的target源码目录下的配置文件
     */
    private checkTargetSourceCodeConfigFile;
    /**
     * 校验module文件配置与module工程模型是否有差异
     *
     * @private
     */
    checkModuleConfigStatus(): void;
    /**
     * ohosTest Target规格校验
     */
    checkOhosTestTarget(): void;
    getTaskService(): ModuleTaskService | undefined;
}
