import { SdkInfo } from './sdk-info.js';
export declare class DefaultSdk implements SdkInfo {
    hasRollUpPluginInEtsLoader: boolean;
    hasRollUpPluginInJsLoader: boolean;
    isOhos: boolean;
    sdkDir: string;
    setup(): Promise<void>;
    checkAotFixedSdkVersion(): boolean;
    getAppSchema(): string;
    getInsightIntentSchema(): string;
    getArkDataSchema(): string;
    getUtdSchema(): string;
    getArkUIXSdkDir(): string;
    getArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getCmakeTool(): string;
    getEtsComponentReleaseType(): string;
    getEtsComponentVersion(): string;
    getHosToolchainsDir(): string;
    getEtsLoader(): string;
    getFormSchema(): string;
    getHapSignToolV2(): string;
    getHapTobin(): string;
    getHmsArkDir(): string;
    getHmsNativeDir(): string;
    getHmsToolchainFile(): string;
    getHmsBiShengToolchainFile(): string;
    getHosModuleSchema(): string;
    getHosResTool(): string;
    getJsLoader(): string;
    getLiteSchema(): string;
    getModuleSchema(): string;
    getNativeNinjaTool(): string;
    getNativeToolchain(): string;
    getOhosJar(): string;
    getPackageTool(): string;
    getPageSchema(): string;
    getRouterMapSchema(): string;
    getShortcutsJsonSchema(): string;
    getAppStartupSchema(): string;
    getSysCapSchema(): string;
    getReleaseType(): string;
    getRestool(): string;
    getRichSchema(): string;
    getSdkEtsDir(): string;
    getSdkJsDir(): string;
    getSdkNativeDir(): string;
    getSdkToolchainsDir(): string;
    getSdkLlvmStrip(): string;
    getSdkLlvmReadElf(): string;
    getSdkVersion(): number;
    getHosToolchainsLibDir(): string;
    getLibimageTranscoderShared(): string;
    getPreviewerCommonBinDir(): string;
    getPreviewerPermissionNames(): string[];
    getPreviewerUserGrant(): string[];
    allowSdkPermission(): boolean;
    getSignDir(): string;
    getHosSignTool(): string;
    getSysCapFileInEts(): string;
    getSysCapFileInJs(): string;
    getSysCapTool(): string;
    getToolchainsComponentVersion(): string | undefined;
    getHosToolchainsComponentVersion(): string | undefined;
    getVerifySignConfigTool(): string;
    isPreviewCompileResourceIncrement(isHarmonyOS: boolean): any;
    requireUISyntax(): boolean;
    supportOhpmProject(isHarmonyOS: boolean): any;
    supportHapSignToolApiCall(isHarmonyOS: boolean): boolean;
    getSdkApi(): string;
    getBasePath(): string;
    getAppConfigurationSchema(): string;
}
