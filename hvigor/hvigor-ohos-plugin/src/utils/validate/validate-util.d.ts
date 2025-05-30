import { DurationEvent } from '@ohos/hvigor';
import { ValidateFunction } from 'ajv';
import { ModulePathInfoIml } from '../../common/iml/module-path-info-iml.js';
import { ModuleModel } from '../../model/module/module-model.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { ProjectBuildProfile } from '../../options/build/project-build-profile.js';
import { RequiredNamed } from '../../options/options.js';
import { SdkInfo } from '../../sdk/sdk-info.js';
import { ModuleTargetData } from '../../tasks/data/hap-task-target-data.js';
import ProductBuildOpt = ProjectBuildProfile.ProductBuildOpt;
import SigningConfigBuildOpt = ProjectBuildProfile.SigningConfigBuildOpt;
import { BuildOpt } from '../../options/build/build-opt';
import { ModuleJson } from '../../options/configure/module-json-options.js';
import { Dependency } from '../../project/dependency/core/dependency-interface';
export type VersionCheckRes = {
    suggestedVersion: number;
    errorHandler?: Function;
};
/**
 * 校验的工具类
 *
 * @since 2021/12/29
 */
export declare class ValidateUtil {
    private static _log;
    private static richDeviceTypes;
    private static liteDeviceTypes;
    private static hosApiCompatible;
    private static FILE_START_EXP;
    static modelVersionCheck(): void;
    static integrationVersionCheck(isHarmonyOS: boolean, currentProduct: ProductBuildOpt, isAtomicService: boolean, profilePath: string): void;
    /**
     * 工程级build-profile.json5 API版本校验
     * app.compileSdkVersion与products下compileSdkVersion不可同时配置或同时不配置
     */
    static apiConfigurationCheck(projectModel: ProjectModel): void;
    private static checkProducts;
    /**
     * 检查API版本兼容性检查
     * stage 9 -- 9
     * HarmonyOS 9 -- 9
     * FA 8 -- 8
     * OpenHarmony 8 -- 8
     *
     * @param projectModel 项目模型
     * @param targetData target信息
     * @param moduleModel 模块模型
     */
    static apiCompatibleCheck(projectModel: ProjectModel, targetData: ModuleTargetData, moduleModel?: ModuleModel): VersionCheckRes;
    /**
     * 检查HarmonyOS API版本兼容性
     *
     * @return [boolean, number] 是否兼容，以及最低的兼容版本
     * @param targetData
     */
    private static hosApiMatrixCheck;
    /**
     * 根据schema规则校验，并只返回校验通过与否的结果
     *
     * @param moduleName 校验文件所属module
     * @param filePath 需要校验的JSON5文件路径
     * @param validator schema校验器
     * @returns boolean 校验结果
     */
    private static schemaCheckOnly;
    /**
     * 提交同步schema检查的工作
     * @param schemaCheckOption schema检查所需要的参数
     * @returns {boolean} 校验结果
     */
    static submitSchemaCheckWork(schemaCheckOption: SchemaCheckOption): boolean;
    static schemaCheckJSObject(obj: object, filePath: string | undefined, validator: ValidateFunction): boolean;
    /**
     * 根据schema规则校验JSON5的内容
     *
     * @param moduleName 校验文件所属module
     * @param filePath 需要校验的JSON5文件路径
     * @param validator schema校验器
     * @param errorHandlers 对schema校验结果进行定制化处理的方法数组
     * @returns {boolean} 校验结果
     */
    private static doSchemaCheck;
    private static addLocationInfo;
    /**
     *根据SignConfig中的p7b文件调用sign-hap-tool获取bundleName
     *
     * @param sdkInfo sdkInfo
     * @param signingConfigObj signingConfigObject
     * @param pathInfo pathInfoIml
     * @param subDurationEvent subDurationEvent
     * @param useJavaDaemon 是否使用 java daemon
     * @return bundleName from p7b
     */
    static getBundleNameFromP7b(sdkInfo: SdkInfo, signingConfigObj: SigningConfigBuildOpt | undefined, pathInfo: ModulePathInfoIml, subDurationEvent: DurationEvent, useJavaDaemon?: boolean): Promise<string | null>;
    private static getVerifySignInfo;
    static getVerifySignCommands(sdkInfo: SdkInfo, signingConfigObj: SigningConfigBuildOpt | undefined, pathInfo: ModulePathInfoIml): string[] | null;
    private static executeVerifySingningConfig;
    private static executeVerifySingningConfigRequest;
    /**
     * 获取hap包中的bundleName
     * 1 优先获取product配置的bundleName
     * 2 若无bundleName则读取config.json/module.json里的bundleName
     *
     * @param targetProduct ProductBuildOpt
     * @param projectModel ProjectModelImpl
     * @return bundleName from hap
     */
    static getBundleNameFromHap(targetProduct: ProductBuildOpt, projectModel: ProjectModel): string;
    /**
     * 查找是否有重名的配置
     *
     * @param {Named[]} names 继承names的对象组成的数组
     * @returns {(string | undefined)[]}
     */
    static searchDuplicateName(names: RequiredNamed[]): (string | undefined)[];
    /**
     * 通过map过滤moduleName大小写同名问题
     *
     * @param names
     */
    private static checkUniqueModuleName;
    /**
     * 校验继承names的数组是否有重名, 若有重名则报错
     *
     * @param {Named[] | undefined} names 继承named的数组
     * @param {string} nameValue 继承named的对象名称
     * @param {string} filePath 校验的object的路径
     */
    static validateDuplicatedName(names: RequiredNamed[] | undefined, nameValue: string, filePath: string): void;
    /**
     * 校验product数组里有没有default, 若无则报错
     *
     * @param {ProjectBuildProfile.ProductBuildOpt[] | undefined} products
     * @param {string} filePath
     */
    static validateContainsDefault(products: any[] | undefined, filePath: string): void;
    /**
     * 判断deviceType中是否存在rich/lite设备
     *
     * @param devicesList deviceType[]
     * @param typeList  rich[]/lite[]
     * @return 若deviceType存在对应类型设备 true
     */
    static isDeviceTypeExist(devicesList: string[], typeList: Set<string>): boolean;
    /**
     * 判断deviceType中是否全部为lite设备
     *
     * @param devicesList deviceType[]
     * @param typeList lite[]
     * @return 若deviceType全部为lite设备 true
     */
    static isAllLiteDeviceType(devicesList: string[], typeList: Set<string>): boolean;
    /**
     * 混合设备类型场景校验
     * 1.deviceTypes中存在富设备 则不可存在任一瘦设备
     * 2.deviceTypes存在瘦设备 则该瘦设备唯一
     *
     * @param deviceTypeList
     */
    static validateHybridDeviceTypes(deviceTypeList: string[]): void;
    /**
     * 校验FA模型是否存在lite device
     *
     * @param deviceTypeList deviceType[]
     */
    static validateFALiteDevice(deviceTypeList: string[]): void;
    /**
     * 校验target定制资源路径是否合法
     *
     * @param {string} relativePath 资源相对路径
     * @param {string} absolutePath 资源绝对路径
     */
    static validateTargetCustomizeResources(relativePath: string, absolutePath: string): void;
    /**
     * 检查form_config.json中只有一个form的isDefault为true
     *
     * @param formsObj form数据数组
     * @param formPath form_config.json 路径
     */
    static isDefaultCheck(formsObj: ModuleJson.FormObj[], formPath: string): void;
    /**
     * 检查form_config.json中，updateEnabled字段标记值为"true”时，updateDuration字段和scheduleUpdateTime字段不可同时为空
     *
     * @param formsObj form数据数组
     * @param formPath form_config.json 路径
     */
    static checkUpdateEnable(formsObj: ModuleJson.FormObj[], formPath: string): void;
    /**
     * 对har/hsp的本地依赖进行校验
     * @param moduleModel 模块模型
     * @param buildOpt buildOption
     * @param dependencies Dependency[]
     */
    static validateLocalDependency(moduleModel: ModuleModel, buildOpt: BuildOpt, dependencies: Dependency[] | undefined): void;
}
/**
 * errorInfo对象声明
 */
export type ErrorInfo = {
    instancePath: string;
    keyword: string;
    params: Record<string, any>;
    message?: string;
    location?: string;
    help?: string;
    solution?: string;
    reason?: string;
};
export type SchemaCheckOption = {
    moduleName: string;
    filePath: string;
    schemaPath: string;
    changeAppSchema?: boolean;
    checkOnly?: boolean;
    errorHandlers?: ErrorHandlerFunction[];
};
export type ErrorHandlerFunction = (errorInfos: ErrorInfo[], checkedFile?: object) => ErrorInfo[];
