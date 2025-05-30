import { ModulePathInfoIml } from '../../common/iml/module-path-info-iml.js';
import { LegacyAbilityModel } from '../../model/ability/legacy-ability-model.js';
import { ModuleModel } from '../../model/module/module-model.js';
import { SourceSetModel } from '../../model/source-set/source-set-model.js';
import { ModuleBuildProfile } from '../../options/build/module-build-profile.js';
import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import { Status } from '../service/status.js';
import AbilityBuildOpt = ModuleBuildProfile.AbilityBuildOpt;
/**
 * 针对每一个Module中的target初始化的一个数据对象
 *
 * @since 2021/12/24
 */
export declare class ModuleTargetData {
    private readonly _moduleModel;
    private readonly _target;
    private readonly _pathInfo;
    private readonly _product;
    private readonly _targetStatus;
    private readonly _moduleSourceSetModel;
    private readonly compileApiVersion;
    private readonly compatibleApiVersion;
    private readonly compatibleSdkVersionStage;
    private readonly targetSdkVersion;
    private readonly _apiMeta;
    private _log;
    constructor(moduleModel: ModuleModel, target: ModuleBuildProfile.ModuleTargetBuildOpt, pathInfo: ModulePathInfoIml, product: ProjectBuildProfile.ProductBuildOpt);
    isHarmonyOS(): boolean;
    getApiMeta(): ProjectBuildProfile.ProductApiMeta;
    getCompileApiVersion(): number;
    getCompatibleApiVersion(): number;
    getTargetSdkVersion(): number | undefined;
    getCompatibleSdkVersionStage(): string | undefined;
    /**
     * 返回该target对应的模块模型
     */
    getModuleModel(): ModuleModel;
    getModuleSourceSetModel(): SourceSetModel;
    /**
     * 返回该target对应的模块关联的entry模块
     */
    getRelatedEntryModules(): string[] | undefined;
    getTargetName(): string;
    getTargetOpt(): ModuleBuildProfile.ModuleTargetBuildOpt;
    getPathInfo(): ModulePathInfoIml;
    /**
     * 根据入参获取hap包的名字, 格式为: moduleName(-entryName)-targetName(-signed).hap
     * 入参是null时, 不带是否签名
     *
     * @param {string} entryName 模块可能关联的entry名
     * @param {boolean | null} isSigned 是否签名
     * @param suffix 打出包的包格式,默认是.hap
     * @param deviceType 富瘦设备类型
     * @param targetName 当前target名
     * @returns {string}
     */
    getModuleTargetOutputFileName(entryName: string, isSigned: boolean | null, suffix?: string, deviceType?: string, targetName?: string): string;
    /**
     * 获取本模块的apk名称
     * 注意: 只在fa模型中调用该方法
     *
     * @param {boolean} isCut 是否是cutApk
     * @returns {string}
     */
    getApkName(isCut?: boolean): string;
    getTargetStatus(): Status;
    getProduct(): ProjectBuildProfile.ProductBuildOpt;
    /**
     * 根据name寻找其他模块的targetData
     * 若没有该模块, 或者该模块下没有同名的targetName, 则返回undefined
     *
     * @param {string} name
     * @param {string} target
     * @returns {ModuleTargetData | undefined}
     */
    findTargetDataByName(name: string, target?: string): ModuleTargetData | undefined;
    /**
     * 根据所关联entry模块name查找target
     * 存在同名则返回同名target 否则返回default
     *
     * @param entryName 与feature模块关联的entry模块Name
     */
    findRelatedTargetData(entryName: string): ModuleTargetData | undefined;
    /**
     * 根据config.json中的抽象的ability对象, 寻找target中对应的配置
     *
     * @param {LegacyAbilityModel} abilityObj
     * @returns {ModuleBuildProfile.AbilityBuildOpt | undefined}
     */
    findTargetConfigOpt(abilityObj: LegacyAbilityModel): AbilityBuildOpt | undefined;
    /**
     * 获取target中配置的设备类型,
     * 若没有配置, 或配置为空的数组, 返回配置文件中的deviceType
     * 若target中的设备类型不是模块的子集, 则报错
     *
     * @returns {string[]}
     */
    getTargetDeviceType(): string[];
    /**
     * 判断是否包含富设备
     */
    hasRichDeviceInTarget(): boolean;
    /**
     * 判断是否包含瘦设备
     */
    hasLiteDeviceInTarget(): boolean;
    /**
     * 判断是否是混合设备
     */
    isMixedDeviceTarget(): boolean;
    /**
     * 判断是否是纯富设备
     */
    isPurerRichDeviceTarget(): boolean;
    /**
     * 判断是否是纯瘦设备
     */
    isPurerLiteDeviceTarget(): boolean;
    /**
     * 判断是否是纯N设备
     */
    isPurerNDeviceTarget(): boolean;
    /**
     *  返回设备类型的分类
     *
     *  @returns {[string]}
     */
    getTargetDeviceTypeClasses(): Array<string>;
    /**
     * 判断是否是纯富/瘦设备类型
     *
     * @return {boolean}
     */
    isSingleDeviceTypeTarget(): boolean;
}
