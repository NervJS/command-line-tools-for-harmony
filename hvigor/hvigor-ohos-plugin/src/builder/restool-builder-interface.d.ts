import { RestoolCompressionConfig } from '../options/build/build-opt.js';
/**
 * RestoolConfigBuilder和RestoolCommandBuilder需要实现的接口类
 *
 * @since 2022/7/4
 */
export interface RestoolBuilderInterface {
    addInputVariantDir(inputVariantDir: string): RestoolBuilderInterface;
    addInputDir(inputDir: string, inputType?: string): RestoolBuilderInterface;
    addJsonFile(jsonFile: string): RestoolBuilderInterface;
    addModulePackName(packName: string): RestoolBuilderInterface;
    addOutputDir(outputDir: string): RestoolBuilderInterface;
    addResTable(resTable: string): RestoolBuilderInterface;
    forceDelete(): RestoolBuilderInterface;
    incremental(): RestoolBuilderInterface;
    compressImage(): RestoolBuilderInterface;
    setIconCheck(enable: boolean): RestoolBuilderInterface;
    addOutputBak(outputBak: string): RestoolBuilderInterface;
    addModules(modules: string): RestoolBuilderInterface;
    addStartId(startId: string): RestoolBuilderInterface;
    addIdsPath(idsPath: string): RestoolBuilderInterface;
    addDefinedIds(definedIds: string): RestoolBuilderInterface;
    addDefinedSysIds(definedIds: string): RestoolBuilderInterface;
    /**
     * 【参数 -d】 Fa模型 feature编译时需要依赖entry模块的资源编译结果
     * 这里传entry资源编译结果目录, 例: .\entry\build\default\intermediates\res\default
     */
    addEntryCompiledResource(inputDir: string): RestoolBuilderInterface;
    addAppScopeResourcesDir(inputDir: string): RestoolBuilderInterface;
    addModuleResourcesMap(map: Map<string, string>): RestoolBuilderInterface;
    addHarResourcesMap(map: Map<string, string>): RestoolBuilderInterface;
    incrementalCompile(): RestoolBuilderInterface;
}
export interface OptCompressionBuilderInterface {
    setResourceDirArr(resourceDirArr: string[]): OptCompressionBuilderInterface;
    setCompressionConfig(config: RestoolCompressionConfig | undefined): OptCompressionBuilderInterface;
    setExtensionPath(extensionPath?: string): OptCompressionBuilderInterface;
}
