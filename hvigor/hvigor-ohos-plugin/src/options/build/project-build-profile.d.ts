import { RequiredNamed } from '../options.js';
import { BuildOpt } from './build-opt.js';
/**
 * 工程级别的build-profile.json5的pattern
 * 所有需要配到project.json5的数据通过对应接口提供，
 * 若该接口中未定义，则认为是开发者手动加了不支持的字段(开发态无法联想)
 *
 * 命名规范: 每一个子标签都以xxxBuildOpt结尾
 *
 */
export declare namespace ProjectBuildProfile {
    interface MaterialBuildOpt {
        storeFile: string;
        storePassword: string;
        keyAlias: string;
        keyPassword: string;
        signAlg: string;
        profile: string;
        certpath: string;
    }
    interface SigningConfigBuildOpt extends RequiredNamed {
        material: MaterialBuildOpt;
        type?: string;
    }
    interface ProductBuildOpt extends RequiredNamed {
        signingConfig?: string;
        bundleName?: string;
        buildOption?: BuildOpt;
        compileSdkVersion?: number | string;
        compatibleSdkVersion?: number | string;
        targetSdkVersion?: number | string;
        runtimeOS?: string;
        bundleType?: string;
        label?: string;
        versionCode?: number;
        versionName?: string;
        icon?: string;
        resource?: ProductResourceObj;
        output?: OutputOpt;
        arkTSVersion?: string;
        vendor?: string;
        compatibleSdkVersionStage?: string;
    }
    interface ProductResourceObj {
        directories: string[];
    }
    interface ProductApiMeta {
        compileSdkVersion: ApiMeta;
        compatibleSdkVersion: ApiMeta;
        targetSdkVersion: ApiMeta | undefined;
    }
    /**
     * API数据
     * type:
     * 0: 10
     * 1: 4.0.0(10)
     *
     * api 字符串版本 0: '10' 1: '4.0.0'
     * type API数据类型 0: number 1: string
     */
    interface ApiMeta {
        api: string;
        version: number;
        type: ApiValType;
    }
    enum ApiValType {
        'NUM' = 0,
        'STRING' = 1
    }
    interface AppBuildOpt {
        supportHos?: boolean;
        signingConfigs?: SigningConfigBuildOpt[];
        compileSdkVersion?: number;
        compatibleSdkVersion?: number;
        products?: ProductBuildOpt[];
        multiProjects?: boolean;
        buildModeSet?: BuildMode[];
    }
    interface ProjectTargetBuildOpt extends RequiredNamed {
        applyToProducts: string[];
    }
    interface ModuleBuildOpt extends RequiredNamed {
        srcPath: string;
        targets?: ProjectTargetBuildOpt[];
        belongProjectPath?: string;
    }
    interface ProjectProfileOpt {
        app: AppBuildOpt;
        modules: ModuleBuildOpt[];
        crossplatform: boolean;
    }
    interface BuildMode extends RequiredNamed {
        buildOption?: BuildOpt;
    }
    interface ModuleRuntimeOS {
        targetRunTimeOS?: string;
        targetMsg?: string;
    }
    interface RemoteHspOpt {
        hspName: string;
        hspPath: string;
        hspVersion: string;
        hspFileName: string;
        hspDirName: string;
        isIntegratedHsp: boolean;
    }
    /**
     * product定制产物输出配置
     */
    interface OutputOpt {
        artifactName: string;
    }
}
