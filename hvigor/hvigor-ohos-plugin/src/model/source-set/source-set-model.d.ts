import { CodeType } from '../../enum/code-type-enum.js';
import { CodeModel } from '../code-source/code-model.js';
import { LegacyModuleTargetRes, ModuleTargetRes } from '../res/res-model.js';
/**
 * Target的源碼集合
 *
 * 1. js ets cpp
 * 2. 资源(resource + 配置文件)
 */
export interface SourceSetModel {
    /**
     * 获取target的sourceSet的根目录
     *
     * @return string
     */
    getSourceSetRoot: () => string;
    /**
     * 获取开发者的源码集
     *
     * @return Map<CodeType, CodeModel>
     */
    getCodeMap: () => Map<CodeType, CodeModel>;
    /**
     * 获取资源路径
     *
     * @return string
     */
    getTargetResPath: () => string;
    /**
     * 获取targetSourceSet的配置文件中的moduleName
     */
    getTargetSourceSetModuleName: () => string | undefined;
}
export interface TargetSourceSetModel extends SourceSetModel {
    /**
     * 获取Stage模型资源模型
     *
     * @return ModuleTargetRes
     */
    getModuleTargetRes: () => ModuleTargetRes;
}
export interface LegacyTargetSourceSetModel extends SourceSetModel {
    /**
     * 获取Fa模型资源模型
     *
     * @return LegacyModuleTargetRes
     */
    getLegacyModuleTargetRes: () => LegacyModuleTargetRes;
}
export type SourceSetModelType = TargetSourceSetModel | LegacyTargetSourceSetModel;
