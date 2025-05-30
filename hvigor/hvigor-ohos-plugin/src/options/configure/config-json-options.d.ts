import { ModuleBuildProfile } from '../build/module-build-profile.js';
import { Named, Option, RequiredNamed } from '../options';
import { AppEnvironmentOption } from './app_environment_option.js';
import AppEnvironmentObj = AppEnvironmentOption.AppEnvironmentObj;
export declare namespace ConfigJson {
    interface AppObj extends Option {
        bundleName: string;
        vendor?: string;
        apiVersion?: ApiVersionObj;
        version: VersionObj;
        type?: string;
        targetBundleList?: string[];
        relatedBundleName?: string;
        smartWindowSize?: string;
        smartWindowDeviceType?: string[];
        singleton?: boolean;
        removable?: boolean;
        userDataClearable?: boolean;
        asanEnabled?: boolean;
        tsanEnabled?: boolean;
        hwasanEnabled?: boolean;
        ubsanEnabled?: boolean;
        appEnvironments?: AppEnvironmentObj[];
    }
    interface ApiVersionObj extends Option {
        compatible?: number;
        target?: number;
        releaseType?: string;
    }
    interface VersionObj extends Named {
        code: number;
        minCompatibleVersionCode?: number;
    }
    interface DeviceConfigObj extends Option {
        [propName: string]: DeviceConfigOptionObj;
    }
    interface DeviceConfigOptionObj extends Option {
        jointUserId?: string;
        process?: string;
        ark?: ArkObj;
        keepAlive?: boolean;
        directLaunch?: boolean;
        network?: NetworkObj;
        supportBackup?: boolean;
        compressNativeLibs?: boolean;
        allowComponentsProxy?: boolean;
        debug?: boolean;
    }
    interface ArkObj extends Option {
        reqVersion?: ReqVersionObj;
        flag?: string;
    }
    interface ReqVersionObj extends Option {
        compatible?: number;
        target?: number;
    }
    interface NetworkObj extends Option {
        cleartextTraffic?: boolean;
        securityConfig?: SecurityConfigObj;
    }
    interface SecurityConfigObj extends Option {
        domainSettings: DomainSettingsObj;
    }
    interface DomainSettingsObj extends Option {
        cleartextPermitted: boolean;
        domains: DomainObj[];
    }
    interface DomainObj extends Named {
        subdomains?: boolean;
    }
    interface ModuleObj extends RequiredNamed {
        package: string;
        description?: string;
        supportedModes?: string[];
        theme?: string;
        entryTheme?: string;
        reqCapabilities?: string[];
        deviceType: string[];
        distro: DistroObj;
        metaData?: MetaDataObj;
        abilities?: AbilitiesObj[];
        commonEvents?: CommonEventObj[];
        shortcuts?: ShortcutsObj[];
        js?: JsObj[];
        reqPermissions?: ReqPermissionsObj[];
        defPermissions?: DefPermissionsObj[];
        definePermissions?: DefPermissionsObj[];
        defPermissionGroups?: DefPermissionGroupsObj[];
        allowClassMap?: boolean;
        mainAbility?: string;
        resizeable?: boolean;
        colorMode?: string;
        testRunner?: TestRunnerObj;
        distroFilter?: ModuleBuildProfile.DistroFilterBuildOpt;
    }
    interface TestRunnerObj extends RequiredNamed {
        srcPath: string;
    }
    interface DistroObj extends Option {
        deliveryWithInstall: boolean;
        moduleName: string;
        moduleType: string;
        installationFree?: boolean;
    }
    interface MetaDataObj extends Option {
        parameters?: ParametersObj[];
        results?: ResultObj[];
        customizeData?: CustomizeDataObj[];
        mergeRule?: MergeRuleObj;
    }
    interface ParametersObj extends Named {
        type: string;
        description?: string;
        mergeRule?: MergeRuleObj;
    }
    interface ResultObj extends Named {
        type: string;
        description?: string;
        mergeRule?: MergeRuleObj;
    }
    interface CustomizeDataObj extends Named {
        value?: string;
        extra?: string;
        mergeRule?: MergeRuleObj;
    }
    interface AbilitiesObj extends RequiredNamed {
        description?: string;
        icon?: string;
        label?: string;
        skills?: SkillsObj[];
        orientation?: string;
        visible?: boolean;
        srcPath: string;
        srcLanguage?: string;
        formsEnabled?: boolean;
        type: string;
        launchType?: string;
        theme?: string;
        uri?: string;
        metaData?: MetaDataObj;
        permissions?: string[];
        configChanges?: string[];
        process?: string;
        backgroundModes?: string[];
        grantPermission?: boolean;
        definePermissions?: DefinePermissionsObj;
        formEnabled?: boolean;
        form?: FormObj;
        readPermission?: string;
        writePermission?: string;
        uriPermission?: UriPermissionObj;
        multiUserShared?: boolean;
        mission?: string;
        targetAbility?: string;
        supportPipMode?: boolean;
        mergeRule?: MergeRuleObj;
        forms?: FormsObj[];
        resizeable?: boolean;
        deviceCapability?: string[];
        entryTheme?: string;
    }
    interface SkillsObj extends Option {
        actions?: string[];
        entities?: string[];
        uris?: UrisObj[];
    }
    interface UrisObj extends Option {
        scheme?: string;
        host?: string;
        port?: string;
        path?: string;
        pathStartWith?: string;
        pathRegx?: string;
        type?: string;
        uri?: string;
    }
    interface FormObj extends Option {
        formEntity: string[];
        minHeight: number;
        defaultHeight: number;
        minWidth: number;
        defaultWidth: number;
    }
    interface FormsObj extends RequiredNamed {
        description?: string;
        type?: string;
        jsComponentName?: string;
        colorMode?: string;
        isDefault?: string;
        updateEnabled?: boolean;
        scheduledUpdateTime?: number;
        updateDuration?: number;
        supportDimensions?: string[];
        defaultDimension?: string;
        landscapeLayouts?: string[];
        portraitLayouts?: string[];
        deepLink?: string;
        metaData?: MetaDataObj[];
        formConfigAbility?: string;
        formVisibleNotify?: boolean;
    }
    interface UriPermissionObj extends Option {
        mode?: string;
        path: string;
    }
    interface CommonEventObj extends Named {
        permission?: string;
        data?: string[];
        type?: string[];
        events: string[];
        mergeRule?: MergeRuleObj;
    }
    interface ShortcutsObj extends Option {
        shortcutId?: string;
        label?: string;
        icon?: string;
        intents?: IntentObj[];
    }
    interface IntentObj extends Option {
        targetClass?: string;
        targetBundle?: string;
    }
    interface JsObj extends RequiredNamed {
        pages: string[];
        window?: WindowObj;
        mergeRule?: MergeRuleObj;
        type?: string;
        mode?: ModeObj;
    }
    interface WindowObj extends Option {
        designWidth?: number;
        autoDesignWidth?: boolean;
    }
    interface ModeObj extends Option {
        syntax?: string;
        type?: string;
    }
    interface ReqPermissionsObj extends RequiredNamed {
        reason?: string;
        usedScene?: UsedSceneObj;
        mergeRule?: MergeRuleObj;
    }
    interface UsedSceneObj extends Option {
        ability?: string[];
        when?: string;
    }
    interface DefPermissionsObj extends Named {
        grantMode?: string;
        label?: string;
        description?: string;
        group?: string;
        availableScope?: string[];
        mergeRule?: MergeRuleObj;
    }
    interface DefinePermissionsObj extends Named {
        grantMode?: string;
        label?: string;
        description?: string;
        availableLevel?: string;
        provisionEnable?: boolean;
        distributedSceneEnable?: boolean;
    }
    interface DefPermissionGroupsObj extends Named {
        icon?: string;
        label?: string;
        description?: string;
        order?: number;
        request?: string;
        mergeRule?: MergeRuleObj;
    }
    interface MergeRuleObj extends Option {
        remove?: string[];
        replace?: string[];
    }
    interface ConfigOptObj extends Option {
        app: AppObj;
        deviceConfig: DeviceConfigObj;
        module: ModuleObj;
    }
}
