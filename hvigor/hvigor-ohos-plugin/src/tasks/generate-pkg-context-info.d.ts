import { FileSet } from '@ohos/hvigor';
import { PkgContextInfoOpt } from '@ohos/hvigor-arkts-compose';
import { OhosLogger } from '../utils/log/ohos-logger.js';
import { ProcessLibsCommonProperties } from './common-properties/process-libs-common-properties.js';
import { TargetTaskService } from './service/target-task-service.js';
export declare const soLibsPattern: RegExp;
export declare class GeneratePkgContextInfo extends ProcessLibsCommonProperties {
    private readonly pkgContextInfoMap;
    protected _log: OhosLogger;
    private readonly currentBundleName;
    private readonly currentBundleType;
    private readonly pkgInfoPath;
    private get useNormalizedOHMUrl();
    declareOutputFiles(): FileSet;
    constructor(taskService: TargetTaskService);
    beforeTask(): void;
    taskShouldDo(): boolean;
    protected doTaskAction(): void;
    /**
     * 获取当前编译模块的信息表
     * @private
     */
    private getCurrentPkgContextInfo;
    /**
     * 不同场景下获取当前模块的entryPath
     *
     * @param _dependencyRootPath
     * @param _pkgJsonObj
     * @private
     */
    private getCurrentEntryPath;
    /**
     * 获取依赖收集的数据组合出的信息表
     *
     * @param dependencyInfo
     * @private
     */
    private getDependenciesPkgContextInfo;
    /**
     * 应用间HspA 依赖应用间HspB 用HspB的bundle name
     * 应用间HspA 依赖HarB 用HspA的bundle name
     * 应用内Hsp 依赖应用内的包 不写入bundle name
     * 应用内Hsp 依赖应用间的hsp 如果bundle name不同则写入 否则不写入
     *
     * @private
     * @param dependencyInfo  依赖的包信息
     * @param dependencyType  依赖的包类型
     */
    private getBundleName;
    /**
     * 定制化获取version 只有har和ohpm包需要带version
     *
     * @private
     * @param dependencyInfo  依赖的包信息
     * @param dependencyType  依赖的包类型
     */
    private getVersion;
    /**
     * 获取别名，如果别名和pkgName不同则写入信息表
     *
     * @param dependencyInfo
     * @private
     */
    private getDepedencyAlias;
    /**
     * 判断依赖的hsp是否为应用间hsp
     *
     * @private
     * @param moduleJsonObj
     * @param dependencyType
     */
    private isHspInCommonApp;
    /**
     * 由于无法通过挂载processLibs任务去收集so，所以手动进行so的收集
     *
     * @private
     */
    private initLibsSoPkgContextInfo;
    /**
     * 循环遍历libs目录收集所有so文件
     *
     * @param libsPath
     * @private
     */
    private getNativeLibraryByLibs;
    /**
     * 通过targetService获取当前模块需要编译的so文件
     *
     * @param targetService
     * @private
     */
    private getNativeLibrary;
    /**
     * 将so相关文件写入信息表（如果配置了collectAllLibs则还会额外收集libs目录下的其他文件）
     *
     * @param soFileName
     * @private
     */
    private setPkgContextInfoMapWithSo;
    initTaskDepends(): void;
}
export declare function getSoDefaultContextInfo(soFileName: string): PkgContextInfoOpt;
