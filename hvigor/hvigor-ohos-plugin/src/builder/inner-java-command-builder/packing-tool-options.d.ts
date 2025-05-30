import { JavaCommandBuilder } from '../java-command-builder.js';
export declare class PackingToolOptions extends JavaCommandBuilder {
    constructor();
    addFieldAndPath(field: string, path: string): this;
    addMode(mode: string): PackingToolOptions;
    addHapPath(hapPath: string): PackingToolOptions;
    addHspPath(hspPath: string): PackingToolOptions;
    addHarPath(harPath: string): PackingToolOptions;
    addPackInfoPath(packInfoPath: string): PackingToolOptions;
    addPkgContextInfoPath(pkgContextInfoPath: string): PackingToolOptions;
    /**
     * 1.hsp包文件路径，文件名必须以.hsp为后缀。如果是多个hsp包需要英文","分隔。2.hsp包目录。
     *
     * @param hspList
     */
    addHspList(hspList: string): this;
    /**
     * 指定的版本号，hsp的版本号会被修改为该版本。需要为整数
     *
     * @param versionCode
     */
    addVersionCode(versionCode: string): this;
    /**
     * 指定bundleName
     *
     * @param bundleName
     */
    addBundleName(bundleName: string): this;
    /**
     * 传入一个路径数组, 传递给打包工具需要打包到hap的目录的路径.
     *
     * 打包工具doc:
     * 在命令行中新增一个 --dir-list 命令，支持将输入的目录打入hap包
     * 使用命令如：
     * java -jar \app_packing_tool.jar --mode hap
     * --dir-list \dir1,\dir2,\dir3
     * --out-path \stage.hap
     * --force true
     *
     * @param {string[]} dirList 需要打到hap包里所有的目录
     * @returns {PackingToolOptions}
     */
    addDirList(dirList: string[]): PackingToolOptions;
    addOutPath(outPath: string): PackingToolOptions;
    addFilePath(filePath: string): PackingToolOptions;
    addProjectPath(projectPath: string): PackingToolOptions;
    addBinPath(binPath: string): PackingToolOptions;
    addJsonPath(jsonPath: string): PackingToolOptions;
    addPackResPath(packResPath: string): PackingToolOptions;
    addEntryCardPath(entryCardFile: string): PackingToolOptions;
    addResourcesPath(resourcesPath: string): PackingToolOptions;
    addResourceTableTxtPath(txtPath: string): PackingToolOptions;
    addJsPath(jsPath: string): PackingToolOptions;
    addEtsPath(etsPath: string): PackingToolOptions;
    addAssetsPath(assetPath: string): PackingToolOptions;
    addIndexPath(indexPath: string): PackingToolOptions;
    addLibPath(libPath: string): PackingToolOptions;
    addJarPath(jarPath: string): PackingToolOptions;
    addAnPath(anPath: string): PackingToolOptions;
    addSysCapPath(sysCapPath: string): PackingToolOptions;
    addMainModuleLimit(mainPackageLimitSize: number): PackingToolOptions;
    addNormalModuleLimit(normalPackageLimitSize: number): PackingToolOptions;
    addTotalLimit(totalPackageLimitSize: number): PackingToolOptions;
    addCompressLevel(level: string, apiVersion: number): this;
    force(force: boolean): PackingToolOptions;
}
