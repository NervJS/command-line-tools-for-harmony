import { BaseCommandBuilder } from './base-command-builder.js';
export declare class NodeCommandBuilder extends BaseCommandBuilder {
    private _supportNewEnvArgs;
    private _envArgs;
    constructor(supportNewEnvArgs?: boolean);
    extendBuilder(nodeCommandBuilder: NodeCommandBuilder): NodeCommandBuilder;
    addWebpackPath(webpackPath: string): NodeCommandBuilder;
    addJsPath(jsPath: string): NodeCommandBuilder;
    getTsVersion(): NodeCommandBuilder;
    getCompatibleTsVersion(compatibleSdkVersion: number): NodeCommandBuilder;
    getCompatibleSdkVersionStage(compatibleSdkVersionStage: string): NodeCommandBuilder;
    addWebpackConfig(config: string): NodeCommandBuilder;
    addTitle(title: string): NodeCommandBuilder;
    addObfuscateType(obfuscateType: string): NodeCommandBuilder;
    addDeviceType(deviceTypeList: string[]): NodeCommandBuilder;
    addBuildMode(isDebug: boolean): NodeCommandBuilder;
    addCompilerType(compilerType: string): NodeCommandBuilder;
    addOpenSslLegacyOption(flag: boolean): NodeCommandBuilder;
    build(): string[];
    isEtsLoader(): boolean;
    getEnvArgs(): string[];
    private addEnvArgs;
    private appendEnvArgs;
}
