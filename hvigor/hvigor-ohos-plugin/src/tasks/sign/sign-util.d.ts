import { DurationEvent, FileSet, TaskInputValue } from '@ohos/hvigor';
import { ModulePathInfoIml } from '../../common/iml/module-path-info-iml.js';
import { ProjectPathInfoIml } from '../../common/iml/project-path-info-iml.js';
import { SignTypeEnum } from '../../enum/sign-type-enum.js';
import { ProjectModel } from '../../model/project/project-model.js';
import { ProjectBuildProfile } from '../../options/build/project-build-profile';
import { SdkInfo } from '../../sdk/sdk-info.js';
import { TaskService } from '../service/task-service';
import { SignModel } from './command-builder-impl/sign-model';
import SigningConfigBuildOpt = ProjectBuildProfile.SigningConfigBuildOpt;
import MaterialBuildOpt = ProjectBuildProfile.MaterialBuildOpt;
/**
 * 执行签名的工具类
 *
 * @since 2022/1/21
 */
export declare class SignUtil {
    private _log;
    private readonly _taskService;
    private readonly _signType;
    private readonly _targetProduct;
    private readonly _signCommandFactory;
    protected readonly _pathInfo: ModulePathInfoIml | ProjectPathInfoIml;
    private signingConfigCheckLogStr;
    private readonly sdkInfo;
    constructor(taskService: TaskService, signType: SignTypeEnum, pathInfo: ModulePathInfoIml | ProjectPathInfoIml, targetProduct: ProjectBuildProfile.ProductBuildOpt, sdkInfo: SdkInfo);
    get _signingConfig(): ProjectBuildProfile.SigningConfigBuildOpt | undefined;
    get _signingConfigCheckLogStr(): string | undefined;
    /**
     * 执行签名公共接口
     *
     * @param {SignModel} signModel 签名类型、输入、输出参数
     * @param durationEvent 持续事件
     */
    sign(signModel: SignModel, durationEvent: DurationEvent): Promise<void>;
    getSignCommand(signModel: SignModel): string[] | undefined;
    getBundleNameFromHap(projectModel: ProjectModel): string;
    getVerifySignCommands(pathInfo: ModulePathInfoIml): string[] | null;
    /**
     * 签名配置文件与hap包BundleName校验
     *
     * @param {SignModel | undefined} signModel
     * @param {ModulePathInfoIml | ProjectPathInfoIml} pathInfo
     * @param subDurationEvent 子持续事件
     * @param useJavaDaemon 是否使用 java daemon
     * @private
     */
    validateBundleName(signModel: SignModel | undefined, pathInfo: ModulePathInfoIml | ProjectPathInfoIml, subDurationEvent: DurationEvent, useJavaDaemon?: boolean): Promise<void>;
    /**
     * 执行签名命令
     *
     * @param {SignModel} signModel
     * @param durationEvent 持续事件
     * @private
     */
    private executeSign;
    /**
     * 通过发送websocket请求执行签名命令
     *
     * @param {SignModel} signModel
     * @param durationEvent 持续事件
     * @private
     */
    private executeSignRequest;
    /**
     * 获取签名配置项
     *
     * @return {SigningConfigBuildOpt | undefined} 签名配置
     * @private
     */
    private getSigningConfig;
    /**
     * 获取默认签名配置
     *
     * @returns {ProjectBuildProfile.SigningConfigBuildOpt}
     */
    static getDefaultSign(): SigningConfigBuildOpt;
    /**
     * 判断签名材料是否是默认签名
     *
     * @param {MaterialBuildOpt} currentSignMaterial
     * @returns {boolean}
     */
    static isUseDefaultShellSign(currentSignMaterial: MaterialBuildOpt): boolean;
    /**
     * 获取签名材料的的增量输入
     *
     * @return {Map<string, TaskInputValue>} 签名配置增量输入对象
     */
    static getSigningConfigInputs(sdkInfo: SdkInfo, signingConfig: SigningConfigBuildOpt | undefined): Map<string, TaskInputValue>;
    /**
     * 获取签名材料的的增量输入文件
     *
     * @return {FileSet} 签名配置增量文件输入对象
     */
    getSigningConfigInputFiles(): FileSet;
}
/**
 * 判断当前工程是否需要执行签名操作
 *
 * @param projectModel
 * @param isHarModule
 */
export declare const isSigned: (projectModel: ProjectModel, isHarModule?: boolean) => boolean;
/**
 * 获取签名配置项
 *
 * @return {SigningConfigBuildOpt | undefined} 签名配置
 * @private
 */
export declare function getSigningConfig(projectModel: ProjectModel): SigningConfigBuildOpt | undefined;
export declare function mergeSigningConfig(signingConfig: SigningConfigBuildOpt, signingConfigFromHvigorfile: SigningConfigBuildOpt | undefined): {
    material: {
        storeFile: string;
        storePassword: string;
        keyAlias: string;
        keyPassword: string;
        signAlg: string;
        profile: string;
        certpath: string;
    };
    name: string;
    type: string | undefined;
};
/**
 * 统一获取hqf名
 * @param {string} moduleName
 * @param {string} targetName
 * @param {boolean} isSigned
 * @returns {string}
 */
export declare function getHqfName(moduleName: string, targetName: string, isSigned?: boolean): string;
