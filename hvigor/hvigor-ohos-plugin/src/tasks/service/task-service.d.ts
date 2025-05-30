import { HvigorCoreNode } from '@ohos/hvigor';
import { ProjectModel } from '../../model/project/project-model.js';
import { DependRemoteHspInfo, OhpmDependencyInfo } from '../../plugin/context/plugin-context.js';
import { Dependency } from '../../project/dependency/core/dependency-interface.js';
import { DependencyManager, ModulePkgNode } from '../../project/dependency/dependency-manager.js';
import { ModuleDependencyInfo } from '../../project/dependency/module-dependency-info.js';
import { ModuleTaskService } from './module-task-service.js';
import { ProjectTaskService } from './project-task-service.js';
import { DependencyInfoType } from '@ohos/hvigor-arkts-compose';
/**
 * 任务流服务的基础类
 *
 * @since 2022/1/20
 */
export declare class TaskService {
    protected hvigorNode: HvigorCoreNode;
    protected readonly _projectModel: ProjectModel;
    private _moduleDependencyInfo;
    protected _dependencyManager: DependencyManager;
    protected _isFaMode: boolean;
    private log;
    constructor(node: HvigorCoreNode, projectModel: ProjectModel, dependencyManager: DependencyManager, isFaMode: boolean);
    initDependencyInfo(): void;
    isFaMode(): boolean;
    getNode(): HvigorCoreNode;
    getProjectModel(): ProjectModel;
    /**
     * 获取所有依赖的main对应文件的路径的集合
     * @returns {string[]}
     */
    getDependencyMainPaths(): string[];
    /**
     * 获取所有依赖在node_modules中路径的集合
     * @returns {string[]}
     */
    getDependencyRootPaths(): string[];
    getDependencyName2RootPath(): any;
    getDependencyName2DepInfo(): Map<string, DependencyInfoType>;
    /**
     * 获取所有har依赖
     * @returns {Dependency[]}
     */
    getHarDependencies(): Dependency[];
    /**
     * 获取远程har依赖
     */
    getRemoteHarDependencies(): Dependency[];
    /**
     * 获取所有hsp依赖
     * @returns {Dependency[]}
     */
    getHspDependencies(): Dependency[];
    /**
     * 获取字节码Har对应的Hsp map: Map<dependencyKey, hspPkgName[]>
     */
    getByteCodeHar2Hsp(): Map<string, string[]>;
    /**
     * 递归获取依赖树中的所有hsp
     */
    getHspRecursion(deptName: string, allDep: Dependency[], tempMap?: Map<string, string[]>): string[];
    getHspOrByteCodeHarDependencies(): Dependency[];
    /**
     * 获取所有so依赖
     * @returns {Dependency[]}
     */
    getSODependencies(): Dependency[];
    /**
     * 获取所有ohpm npm依赖
     * @returns {Dependency[]}
     */
    getOtherDependencies(): Dependency[];
    /**
     * 获取所有其他依赖
     * @returns {Dependency[]}
     */
    getAllDependencies(): Dependency[];
    private excludeChildrenWhenInDevDependencies;
    getDirectPkgNodes(): ModulePkgNode[];
    /**
     * 获取当前模块的直接依赖
     * @returns {Dependency[]}
     */
    getDirectDependencies(): Dependency[];
    /**
     * 获取所有hsp依赖的路径的集合
     * @returns {Dependency[]}
     */
    getHspDependencyPaths(): string[];
    /**
     * 获取所有本地鸿蒙依赖模块
     * @returns {Dependency[]}
     */
    getModuleDependencies(): Dependency[];
    /**
     * 获取所有本地鸿蒙依赖模块的路径的集合
     * @returns {Dependency[]}
     */
    getModuleDependenciesPaths(): string[];
    /**
     * 获取所有本地依赖har模块
     * @returns {[string, Dependency][]}
     */
    getHarModuleDependencies(): [string, Dependency][];
    /**
     * 获取所有本地依赖har模块返回Map
     * @returns {Map<string, [string, Dependency]>}
     */
    getHarModuleDependenciesWithRootPath(): Map<string, [string, Dependency]>;
    /**
     * 获取所有本地依赖har模块的名称
     * @returns {string[]}
     */
    getHarModuleDependencyNames(): string[];
    /**
     * 获取所有本地依赖har模块的路径
     * @returns {string[]}
     */
    getHarModuleDependencyPaths(): string[];
    /**
     * 获取所有本地依赖hsp模块
     * @returns {[string, Dependency][]}
     */
    getHspModuleDependencies(): [string, Dependency][];
    /**
     * 获取所有本地hsp依赖模块的名称
     * @returns {string[]}
     */
    getHspModuleDependencyNames(): string[];
    /**
     * 获取所有本地hsp依赖模块的路径
     * @returns {string[]}
     */
    getHspModuleDependencyPaths(): string[];
    /**
     * 获取除Dynamic所有本地hsp依赖模块的路径
     * @returns {string[]}
     */
    getHspModuleDependencyPathsWithOutDynamic(): string[];
    /**
     * 判断本模块是否有hsp依赖
     * @returns {[string, Dependency][]}
     */
    hasHspDependencies(): boolean;
    getDependencyInfo(): ModuleDependencyInfo;
    getOhpmDependencyInfo(): Record<string, OhpmDependencyInfo>;
    getOhpmRemoteHspAllInfo(service: ModuleTaskService | ProjectTaskService, currentProduct: string | undefined, isSigned: boolean): Record<string, DependRemoteHspInfo>;
    private setDependencyInfo;
    /**
     *   获取dependencies中的远程hsp依赖,对外暴露的api
     *
     * @param service
     * @param currentProduct
     * @param isSigned
     */
    getOhpmRemoteHspDependencies(service: ModuleTaskService | ProjectTaskService, currentProduct: string | undefined, isSigned: boolean): Record<string, OhpmDependencyInfo>;
    getRemoteHspDirName(dependencyRootPath: string): string | undefined;
}
