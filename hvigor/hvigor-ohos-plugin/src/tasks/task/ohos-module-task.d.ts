import { CoreTask, HvigorCoreNode, IncrementalExecTask, Module, TaskDetails } from '@ohos/hvigor';
import { ModulePathInfoIml } from '../../common/iml/module-path-info-iml.js';
import { CoreModuleModelImpl } from '../../model/module/core-module-model-impl';
import { ProjectModel } from '../../model/project/project-model.js';
import { SdkInfo } from '../../sdk/sdk-info.js';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { ModuleTargetData } from '../data/hap-task-target-data.js';
import { ModuleTaskService } from '../service/module-task-service.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhPackageJsonOpt, PackageJsonOpt } from './ohos-har-task.js';
/**
 * openHarmony的公共module类型的基础task
 *
 * @since 2022/1/5
 */
export declare abstract class OhosModuleTask extends IncrementalExecTask {
    readonly pathInfo: ModulePathInfoIml;
    moduleModel: CoreModuleModelImpl;
    targetName: string;
    targetData: ModuleTargetData;
    protected readonly projectModel: ProjectModel;
    protected module: Module;
    protected moduleName: string;
    protected service: ModuleTaskService;
    targetService: TargetTaskService;
    protected compileApiVersion: number;
    protected compatibleApiVersion: number;
    protected compatibleSdkVersionStage: string | undefined;
    protected targetSdkVersion: number | undefined;
    protected sdkInfo: SdkInfo;
    protected isFaMode: boolean;
    protected readonly isOhpmProject: boolean;
    protected readonly packageManagerPath: string;
    protected readonly packageJsonObj: PackageJsonOpt | OhPackageJsonOpt;
    protected readonly paramWhiteList: string[];
    protected readonly moduleModelNodePaths: Set<string>;
    /**
     * 当 oh-package.json5 中的依赖是以 @param: 参数化形式填写的本地产物依赖
     * 在打包该 har 模块时需要把本地产物依赖也打进去，所以需要记录依赖的绝对路径，在 AbstractProcessHarArtifacts 中使用
     * 打包非 har 模块或没有使用 @param: 不会有变化
     * @protected
     */
    protected readonly localProductDependenciesPath: string[];
    protected constructor(targetService: TargetTaskService, taskDetails: TaskDetails);
    private shouldCloseWorkerPoolAfterBuild;
    /**
     * 该方法用于添加本模块的任务与其他非library模块之间的任务依赖关系,和处理逻辑
     * 由于需要获取其他模块的信息,因此需要在hvigor的nodeEvaluated方法中先注册,等待所有模块evaluate完后,再执行
     *
     * @protected
     */
    protected initTaskDependsForOtherModule(): void;
    /**
     * 该方法只能添加本模块自身的task之间的任务依赖关系,其中的处理逻辑不需要依赖其他模块的任务数据
     *
     * @protected
     */
    abstract initTaskDepends(): void;
    /**
     * 该方法用于添加本模块与本地library模块之间的任务依赖关系
     *
     * @protected
     */
    protected initHarModuleDepends(): void;
    /**
     * 为每个target执行task的具体逻辑
     */
    protected abstract doTaskAction(): void;
    /**
     * 在task执行之前做hook, 通常用于clean上次构建的输出
     */
    protected beforeTask(): void;
    /**
     * 根据targetData状态判断是否跳过该task
     */
    taskShouldDo(): boolean;
    registryAction: () => Function;
    /**
     * 获取每个target的临时目录(缓存目录)
     * 调该方法时如果该目录不存在，则创建新目录
     *
     * @param {string} targetData targets数据对象
     * @param {string} tempDirName 拼接目录名称
     * @param {boolean} isCreateDir 若目录不存在，是否创建新目录
     * @protected
     */
    protected getTaskTempDir(targetData: ModuleTargetData, tempDirName?: string, isCreateDir?: boolean): string;
    /**
     * 替换.preview产物中的pages文件的src
     * 保证路由/非路由页面预览pages.json中配置一致
     *
     * @param {OhosLogger} log
     * @param {string[]} pages 预览传入当前实际预览页面src
     * @protected
     */
    protected replacePagesInPreview(log: OhosLogger, pages: string[]): void;
    /**
     * 替换module.json5中配置的pages信息
     * 该方法需要在stage模型的资源编译后才可调用
     *
     * @param {OhosLogger} log
     * @param {string[]} pages
     * @protected
     */
    protected replacePages(log: OhosLogger, pages: string[]): void;
    /**
     * 获取profile pages路由配置文件名
     *
     * @param {OhosLogger} log
     * @return {string} profile路由配置文件名称
     * @protected
     */
    protected getPageJsonFileName(log: OhosLogger): string;
    /**
     * 解析模块级/工程级的oh-package.json5/package.json获取其dependencies或devDependencies
     * @param model CoreModuleModelImpl | ProjectModel
     * @param needDev
     * @private
     */
    protected getDependencies(model: CoreModuleModelImpl | ProjectModel, needDev: boolean): Record<string, string>;
    declareDepends(task: string | CoreTask, node?: string | HvigorCoreNode): CoreTask;
    declareDependsList(...tasks: (string | CoreTask)[]): void;
    dependsOnHook(task: string | CoreTask, node?: string | HvigorCoreNode): CoreTask;
    protected hasUseTsHarField(): boolean;
}
