import { ProjectModel } from '../model/project/project-model.js';
import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
import RemoteHspOpt = ProjectBuildProfile.RemoteHspOpt;
export interface IntegratedRemoteHspCacheOpt {
    bundleName: string;
    versionCode: string;
    integratedRemoteHsps: Map<string, RemoteHspOpt>;
}
/**
 * 集成态hsp的utils
 */
export declare class IntegratedHspUtils {
    private integratedHspCache;
    private readonly integratedHspCachePath;
    constructor(projectModel: ProjectModel);
    private initIntegratedHspCache;
    getIntegratedHspCache(): IntegratedRemoteHspCacheOpt;
    /**
     * 判断remoteHsp是否需要回填，用于去重
     * @param hspDirName  hsp目录名
     */
    isNeedIntegrated(hspDirName: string): boolean;
    /**
     * 将需要回填的hsp加入到map中
     *
     * @param integratedRemoteHsp
     */
    setIntegratedRemoteHsps(integratedRemoteHsp: RemoteHspOpt): void;
    /**
     * 改变回填hsp的isIntegratedHsp字段为true
     *
     * @param hspDirName
     */
    changeIntegratedHspStatus(hspDirName: string): void;
    /**
     * 确认所有hsp都回填后写入集成态hsp的缓存
     */
    writeIntegratedHspCache(): void;
    resetIntegratedHspCache(): void;
}
/**
 * 生成回填命令行，用于integratedHsp集成态hsp回填数据bundleName和versionCode
 *
 * @param projectModel  工程model
 * @param packageTool 打包工具jar包地址
 * @param inputPath  需要回填的hsp包路径
 * @param outputPath  回填后的输出hsp包路径
 */
export declare function generateIntegratedHspCommand(projectModel: ProjectModel, packageTool: string, inputPath: string, outputPath: string): string[];
/**
 * 获取当前工程的bundleName和versionCode字段
 *
 * @param projectModel
 */
export declare function getAppInfoByProject(projectModel: ProjectModel): {
    bundleName: string;
    versionCode: number;
};
