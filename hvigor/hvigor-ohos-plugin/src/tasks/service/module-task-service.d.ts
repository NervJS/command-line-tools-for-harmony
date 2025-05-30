import { CoreModuleModelImpl } from '../../model/module/core-module-model-impl.js';
import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { ModuleTargetData } from '../data/hap-task-target-data.js';
import { TaskService } from './task-service.js';
import { Target } from '../../plugin/context/plugin-context.js';
import { DependencyManager } from '../../project/dependency/dependency-manager.js';
/**
 * 基于持久化module的模型层提供的数据，经过处理后,提供给打包hap任务流需要使用的服务和数据
 *
 * @since 2022/1/20
 */
export declare class ModuleTaskService extends TaskService {
    private readonly _moduleModel;
    private readonly _status;
    private readonly _targetDataSet;
    private _targets;
    constructor(projectModel: ProjectModel, moduleModel: ModuleModel, dependencyManager: DependencyManager, isFaMode: boolean);
    getModuleModel(): CoreModuleModelImpl;
    getTargetDataSet(): Set<[ModuleTargetData, boolean]>;
    getTargets(): Target[];
    isArkModule(): boolean;
    /**
     * 返回该service对应模块关联的entry模块
     */
    getRelatedEntryModules(): string[] | undefined;
    /**
     * 模块级build-profile.json5中模板不再提供entryModules字段且schema将其标识为废弃
     * 检查feature模块配置文件中entryModules字段
     */
    static checkEntryModules(moduleType: string, relatedEntryModules: string[] | undefined): boolean;
    hasLiteDevice(): boolean;
    /**
     * 初始化hap模块打包流的target数据集合, 并返回对应所有需要打包targets的状态
     */
    private initTargetData;
    /**
     * 根据name返回target信息，若没有则返回undefined
     *
     * @param {string} targetName
     * @returns {ModuleTargetData | undefined}
     */
    findTargetDataByName(targetName: string): ModuleTargetData | undefined;
    private targetNeedPack;
}
/**
 * 校验一个Module的指定的TargetName对应的Target是否applyTo了指定的targetProduct,即默认的default或者命令行中执行的target
 *
 * @param {ModuleModel} moduleModel
 * @param {string} targetName
 * @param {string} targetProductName
 * @return {boolean}
 */
export declare function checkHasTargetApplyProduct(moduleModel: ModuleModel, targetName: string, targetProductName: string): boolean;
