import { Module } from '@ohos/hvigor';
import { CompileModeEnum } from '../../enum/compile-mode-enum.js';
import { ModuleType } from '../../enum/module-type-enum.js';
import { ModuleBuildProfile } from '../../options/build/module-build-profile.js';
import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import { ConfigJson } from '../../options/configure/config-json-options.js';
import { ModuleJson } from '../../options/configure/module-json-options.js';
import { ApiType } from '../../project/data/hap-extra-info.js';
import { Model } from '../model.js';
import { ProjectModel } from '../project/project-model.js';
import { SourceSetModel, SourceSetModelType } from '../source-set/source-set-model.js';
import ConfigOptObj = ConfigJson.ConfigOptObj;
import ModuleOptObj = ModuleJson.ModuleOptObj;
/**
 * ohos模块模型
 *
 * 1 模块的路径
 * 2 该模块包含的构建文件
 * 3 package.json
 * 4 开发者输入集合(源码，配置，资源等)
 */
export interface ModuleModel extends Model {
    /**
     * 刷新模型数据，从BuildProfileLoader中重新读取
     */
    refreshData: () => void;
    /**
     * 返回该模块关联的entry模块
     */
    getRelatedEntryModules: () => string[] | undefined;
    /**
     * 获取build-profile.json5配置文件的对象
     */
    getProfileOpt: () => ModuleBuildProfile.ModuleBuildOpt;
    /**
     * 判断该模块是否是ark
     */
    isArkModule: () => boolean;
    /**
     * 判断该模块是否是hap
     */
    isHapModule: () => boolean;
    /**
     * 判断该模块是否是har
     */
    isHarModule: () => boolean;
    /**
     * 判断该模块是否是hsp
     */
    isHspModule: () => boolean;
    /**
     * 获取该模块的类型
     */
    getModuleType: () => ModuleType;
    /**
     * 判断该模块是否为原子化服务
     * @returns {boolean}
     */
    isAtomicService: () => boolean;
    /**
     * 判断该模块是否为installFree
     * @returns {boolean}
     */
    isInstallFree: () => boolean;
    /**
     * 获取module对应的target的根目录
     *
     * 1.针对一般的target,当前统一为../{Module_Path}/src/main
     *
     * 2.针对ohosTest这个特殊的target,为../{Module_Path}/src/ohosTest
     */
    getSourceRootByTargetName: (targetName: string) => string;
    /**
     * 获取module对应的target的源码集对象
     */
    getSourceSetByTargetName: (targetName: string) => SourceSetModel;
    /**
     * 获取根模块project对象
     */
    getParentProject: () => ProjectModel;
    /**
     * 根据target的name获取不同target下的对应的config.json或module.json5转换的json对象
     *
     * @param targetName 模块的target名
     */
    getJsonObjByTargetName: (targetName: string) => ConfigOptObj | ModuleOptObj;
    /**
     * 获取当前模块的所有设备
     *
     * @returns {string[]}
     */
    getDeviceTypes(): string[];
    getTargetOptions(): ModuleBuildProfile.ModuleTargetBuildOpt[];
    /**
     * 获取当前模块的apiType, 默认为stage模型
     *
     * @returns {ApiType}
     */
    getApiType(): ApiType;
    /**
     * 获取vigor-base中定义的模块结构
     *
     * @returns {Module}
     */
    getModule(): Module;
    /**
     * 获取当前工程的编译模式, 默认为jsBundle
     *
     * @returns {CompileModeEnum}
     */
    getCompileMode(product: ProjectBuildProfile.ProductBuildOpt): CompileModeEnum;
    /**
     * 根据target的name获取不同target下的对应的config.json或module.json5的路径
     *
     * @param targetName 模块的target名
     */
    getJsonPathByTargetName(targetName: string): string;
    /**
     * 获取当前模块所有的target数据
     */
    getAllTargetSourceSet(): ReadonlyMap<string, SourceSetModelType>;
    /**
     * 返回mock配置文件的路径，默认是 src/mock/mock-config.json5
     */
    getMockConfigPath(): string;
    /**
     * 获取belongProjectPath
     */
    getBelongProjectPath(): string;
    /**
     * 用户rollup自定义插件绝对路径
     */
    getCompilePluginPath(): string | undefined;
}
