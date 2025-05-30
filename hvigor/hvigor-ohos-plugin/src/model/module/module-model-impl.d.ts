import { Module } from '@ohos/hvigor';
import { ModuleType } from '../../enum/module-type-enum.js';
import { ModuleJson } from '../../options/configure/module-json-options.js';
import { ProjectModel } from '../project/project-model.js';
import { TargetSourceSetModel } from '../source-set/source-set-model.js';
import { CoreModuleModelImpl } from './core-module-model-impl.js';
/**
 * hvigor 工程的module模块的数据管理对象
 *
 * @since 2022/2/23
 */
export declare class ModuleModelImpl extends CoreModuleModelImpl {
    constructor(module: Module, parentProject: ProjectModel);
    getDeviceTypes(): string[];
    initDefaultTargetSourceSet(): void;
    getModuleType(): ModuleType;
    getSourceSetByTargetName(targetName?: string): TargetSourceSetModel;
    getJsonObjByTargetName(targetName: string): ModuleJson.ModuleOptObj;
    getJsonPathByTargetName(targetName: string): string;
    isAtomicService(): boolean;
    isInstallFree(): boolean;
    /**
     * 根据模块的target和存储卡片信息的文件路径得到卡片信息
     *
     * @param targetName 模块的target名
     * @param formPath 存储卡片信息的文件路径
     * @return ModuleJson.FormsObj 存储卡片们的信息的对象
     */
    getFormJsonObjByTargetName(targetName: string, formPath: string): ModuleJson.FormsObj;
    getPermission(): object;
    getCompressNativeLib(): unknown;
}
