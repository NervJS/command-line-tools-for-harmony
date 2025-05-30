import { Json5Reader } from './json5-reader.js';
export interface Environment {
    nodeHome?: string;
    hvigorUserHome?: string;
}
export interface Execution {
    daemon?: boolean;
    parallel?: boolean;
    incremental?: boolean;
    typeCheck?: boolean;
    analyze?: string | boolean;
    skipNativeIncremental?: boolean;
}
export interface Debugging {
    stacktrace?: boolean;
}
export interface Logging {
    level?: string;
}
export interface NodeOptions {
    maxOldSpaceSize?: number | undefined;
    exposeGC?: boolean;
}
export interface JavaOptions {
    Xmx?: number;
}
export declare const defaultOptions: Required<NodeOptions>;
export interface HvigorConfig {
    modelVersion: string;
    dependencies: Record<string, string>;
    environment?: Environment;
    execution?: Execution;
    logging?: Logging;
    debugging?: Debugging;
    nodeOptions?: NodeOptions;
    javaOptions?: JavaOptions;
    properties?: Record<string, any>;
}
/**
 * hvigor-config.json5读取器
 *
 * @since 2023/04/06
 */
export declare class HvigorConfigReader extends Json5Reader {
    private static readonly maxOldSpaceSizeParamPrefix;
    static getHvigorConfig(): HvigorConfig | undefined;
    static getPropertiesConfigValue<T>(key: string): T | undefined;
    static getMaxOldSpaceSize(): number;
    static getNodeParamFromProcessArgv(): string[];
}
