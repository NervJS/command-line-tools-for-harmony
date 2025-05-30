import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { OhosHarTask } from '../task/ohos-har-task.js';
import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { TargetTaskService } from '../service/target-task-service.js';
/**
 * packageHar前的前置操作，负责在打包前将需要打包的文件放在build/target/cache/下
 */
export declare abstract class AbstractProcessHarArtifacts extends OhosHarTask {
    protected abstract logger: OhosLogger;
    readonly hasNativeOption: boolean;
    readonly cmakeListDir: string | undefined;
    protected readonly _moduleDir: string;
    protected readonly taskTmpDir: string;
    protected readonly processedLibs: string;
    protected readonly resourceTablePath: string;
    protected readonly harProfile: string;
    protected readonly harModuleJson: string;
    protected readonly projectDir: string;
    protected readonly cppTypes: string;
    protected readonly allInvalidPrefix: string[];
    protected readonly resourceDir: string;
    protected readonly generateDir: string;
    protected readonly headerPath: string[];
    protected readonly needCppTypes: boolean;
    protected readonly ignoreFileNames: string[];
    protected readonly ohpmIgnoreRules: string[];
    protected readonly obfuscationFiles: string[];
    protected readonly releaseWhiteListTemDir: string[];
    protected needCopyFileNames: string[];
    declareExecutionEnv(): Map<string, string>;
    declareInputs(): Map<string, TaskInputValue>;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    protected constructor(taskService: TargetTaskService, taskDetails: TaskDetails);
    private initModuleToplevelPathFilter;
    private initNeedCopyFileNames;
    private initFilterRules;
    private initSourceRootFilterRules;
    abstract copyCompiledSourceFileToTempDir(): void;
    abstract processPackageJson(): void;
    protected doTaskAction(): Promise<void>;
    private syncNativeHeader;
    private syncObfuscationFile;
    private resolveObfuscationFiles;
    private noNeedCopyCmakeList;
    private copyLocalDepsFileToTempDir;
    private copyModuleSourceFileToTempDirByWhiteList;
    private getCopyFilter;
    private needCopyFile;
    /**
     * 过滤混淆配置文件
     *
     * @param src absolute file path
     * @private
     */
    private excludeObfuscationFiles;
    private needIgnoreSrc;
    private copyModuleSourceFileToTempDirByBlackList;
    private preCheckBeforePack;
    private copyBuildIntermediatesOutToTempDir;
    protected copyOtherGenerateFiles(): void;
    protected processHarRouterMap(): void;
    protected processBundleDepRes(): void;
    protected processObfuscatedHarAbility(): void;
}
