import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { JsonProfile } from '../model/json-profile.js';
import { ModuleJson } from '../options/configure/module-json-options.js';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { AbstractPreBuild } from './abstract/abstract-pre-build.js';
import { TargetTaskService } from './service/target-task-service.js';
/**
 * preBuild Task
 *
 * @since 2022/1/10
 */
export declare class PreBuild extends AbstractPreBuild {
    protected readonly INSIGHT_INTENT_SRC_ENTRY = "insightIntent-srcEntry";
    protected readonly MODULE_SRC_ENTRY = "module-srcEntry";
    protected readonly MODULE_ABILITIES_SRC_ENTRY = "module-abilities-srcEntry";
    protected readonly MODULE_EXTENSION_ABILITIES_SRC_ENTRY = "module-extensionAbilities-srcEntry";
    protected readonly insightIntentJsonPath: string;
    protected readonly targetJsonPath: string;
    protected isPreview: boolean | undefined;
    private readonly appJson5Path;
    private readonly arkDataPath;
    private readonly utdPath;
    private readonly hvigorConfigPath;
    private readonly targetModuleOptObj;
    private readonly resourcePath;
    private readonly pagesJsonPath;
    private readonly formJsonPathArr;
    private readonly appStartupPath;
    private readonly routerMapJsonPath;
    private readonly shortcutsJsonPaths;
    private readonly extendSourceValidateResult;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    private setShortcutsJsonPathIncrementalInput;
    constructor(taskService: TargetTaskService, taskName?: import("@ohos/hvigor").TaskDetails);
    protected doValidateForDiffApiType(): void;
    /**
     * 当存在.preview缓存时移动mock-config.json5配置文件，需要删除.preview中mock-config缓存文件
     * @protected
     */
    protected mockCacheClean(): void;
    protected targetESVerisonValidate(): void;
    protected checkByteCodeHar(): void;
    /**
     * 对compileSdkVersion和compatibleSdkVersion进行校验，对runtimeOS进行校验
     *
     * @protected
     */
    protected buildProfileJsonValidate(): void;
    /**
     * insight_intent.json文件校验
     *
     * @protected
     */
    protected insightIntentJsonValidate(): void;
    protected utdJsonValidate(utdFilePath: string): void;
    protected arkDataJsonValidate(arkDataFilePath: string): void;
    protected appJson5Validate(): void;
    protected validateModuleSrcEntry(logger: OhosLogger, moduleJsonObj: ModuleJson.ModuleOptObj): void;
    protected moduleJson5Validate(): void;
    /**
     * 校验dynamicImport配置中文件配置
     * 仅检查包名是否为本模块oh-package.json5中dependencies的子集;相对路径通过schema校验,且同时检查文件是否存在
     * @private
     */
    protected checkDynamicImportFile(): void;
    /**
     * 检查所有srcEntry字段是否以相对路径的形式配置
     * @private
     */
    protected checkAllSrcEntry(): void;
    private formJsonValidate;
    beforeAlwaysAction(): Promise<void>;
    private checkEntryModuleJson;
    /**
     * hap: src/main/resources/base/profile/main_pages.json
     * hsp: src/main/resources/base/profile/main_pages.json
     * har: undefined
     * ohosTest: src/ohosTest/resources/base/profile/test_pages.json
     *
     * @private
     */
    private getPagesJsonPath;
    private pagesJsonValidate;
    /**
     * shortcut.json文件schema校验
     * @private
     */
    private shortcutsJsonValidate;
    /**
     * routerMap.json文件schema校验
     * @private
     */
    private routerMapJsonValidate;
    /**
     * appStartup.json文件schema校验
     * @private
     */
    private appStartupValidate;
    /**
     * syscap.json文件schema校验
     * @private
     */
    private sysCapValidate;
    private hvigorConfigValidate;
    /**
     * 1. validate form file is under current module
     * 2. validate form file exists
     *
     * @param formJsonPath string
     */
    private validateFormSrc;
    /**
     * 校验module.json中的mainElement
     * 1、非模块（模块未空），或新版ohosTest模块不进行校验。
     * 2、支持免安装特性的元服务，mainElement不能为空。
     * 3、mainElement的ability需包含icon和label字段。 -- 此规格变更，允许不包含这两个字段。
     * @returns
     */
    private validateMainElement;
    /**
     * 是否是新的ohosTest模板。
     * 说明：ohosTest原来工程模板里有openHarmonyTestRunner.ets这些模板文件，新模板是把testrunner等目录移走了。
     * @private
     */
    private isNewOhosTestTemplate;
    /**
     * AtomicService相关校验
     *
     * @private
     */
    validateAtomicService(): void;
    /**
     * 获取元服务校验报错文件路径
     *
     * @param bundleType  app.json5-bundleType
     * @param installationFree  module.json5-installationFree
     * @private
     */
    private getAtomicServiceErrorPath;
    /**
     * 指定bundleType和installationFree字段校验
     *
     * @param bundleType  app.json5-bundleType
     * @param installationFree  module.json5-installationFree
     * @param cause cause
     * @private
     */
    private validateSpecificField;
    private validateMockConfig;
    /**
     * appStartup配置业务校验
     * @private
     */
    private checkAppStartupConfig;
    /**
     * 校验启动框架任务对象集合中对象名称唯一
     * @private
     * @param startupTaskObjList
     */
    private checkStartupTaskName;
    /**
     * 1.srcEntry校验
     * 2.configEntry校验
     * 文件必须真实存在;指向文件必须以ets,ts,js后缀结尾
     * @param appStartupPath
     * @param entryPath
     * @private
     */
    private checkStartupPath;
    protected getJsonProfileByModel(): JsonProfile;
    private hvigorFileConfigValidate;
    /**
     * 检查当前工程的OHMURL解析方式依赖的hsp包是否支持
     *
     * @private
     */
    private checkOHMURL;
    /**
     * 判断OHMUrl是否一致，如果是本地模块默认一致，如果是非本地模块则需要判断一致性，只对hsp模块进行判断
     *
     * @param dependency
     * @param currentOHMUrl
     * @private
     */
    private isEqualOHMUrl;
    private getExtendSourceDirsValidateResult;
    protected checkExtendSourceDirs(): void;
    /**
     * 如果integratedHsp字段hap中配置了则warn告警
     * 如果配置了integratedHsp为true但是useNormalizedOHMUrl为false或者没有配置的话，error报错
     *
     * @private
     */
    private checkIntegratedHspHsp;
    /**
     *  校验配置的transformLib是否合法
     *
     */
    private checkTransformLib;
    private checkTransformLibFileType;
    /**
     *  检查app.json5 下面configuration 字段的合法性
     * @protected
     */
    protected checkAppConfiguration(): void;
    protected getConfigurationFilePath(configuration: string): string;
    protected addConfigurationToInput(declareInputsMap: Map<string, TaskInputValue>): Map<string, TaskInputValue>;
    /**
     * 校验如"routerMap":"$profile:xxx"等资源引用方式的配置,若对应文件不存在则报错
     * @param configField
     * @private
     */
    private checkResReferenceConfig;
    /**
     * 仅byteCodeHar支持bundleDependencies
     * @private
     */
    private checkBundledDependencies;
    /**
     * 检查当前api版本har/hsp是否支持UIAbility
     * 该功能仅在api≥14支持,一体化IDE中sdk与hvigor配套,若配置compatibleApiVersion小于14则抛出告警
     * @private
     */
    private checkUIAbility;
    private checkSdkVersionMatchLazyImport;
}
export interface FrameworkConfigurationOpt {
    frameworkType: string;
}
