import { AdaptorErrorMessage } from '@ohos/hvigor-logger';
import type { Configuration, Level, Logger } from 'log4js';
import { MetricLogType } from '../metrics/event/log-event.js';
import { FileLogger } from './adaptor/fileLogger.js';
/**
 * 基于log4js封装的HvigorLogger
 *
 * @since 2022/03/02
 */
export declare class HvigorLogger {
    protected readonly _logger: Logger;
    protected readonly _filelogger: Logger;
    protected readonly anonymizeFileLogger: FileLogger;
    protected durationId: string | undefined;
    protected constructor(category?: string, durationId?: string);
    /**
     * 获取对于类别的HvigorLogger实例
     *
     * @param {string} category 默认是default
     * @return {HvigorLogger}
     */
    static getLogger(category?: string): HvigorLogger;
    static getLoggerWithDurationId(category: string, durationId: string): HvigorLogger;
    log(level: Level | string, ...args: unknown[]): void;
    debug(message: unknown, ...args: unknown[]): void;
    info(message: unknown, ...args: unknown[]): void;
    warn(message: unknown, ...args: unknown[]): void;
    error(message: unknown, ...args: unknown[]): void;
    anonymizeDebug(message: unknown, ...args: unknown[]): void;
    _printTaskExecuteInfo(taskPath: string, time: string): void;
    _printFailedTaskInfo(taskPath: string): void;
    _printDisabledTaskInfo(taskPath: string): void;
    _printUpToDateTaskInfo(taskPath: string): void;
    _printStackErrorToFile(message: unknown, ...args: unknown[]): void;
    errorMessageExit(message: string, ...args: unknown[]): void;
    errorExit(e: Error, message?: string, ...args: unknown[]): void;
    getLevel(): Level | string;
    setLevel(level: Level | string): void;
    createLogEventByDurationId(message: unknown, logType: MetricLogType, ...args: unknown[]): unknown;
    getMessage(message: string, ...args: unknown[]): string;
    printError(adaptorErrorMessage: AdaptorErrorMessage): void;
    printErrorExitWithAdaptor(adaptorErrorMessage: AdaptorErrorMessage): never;
    printErrorExit(errorId: string, messages?: unknown[], solutions?: unknown[][]): void;
    /**
     * 在 hvigorfile.ts 中调用的函数如果使用 printErrorExit 报错退出会打印 throw 那一行的代码，而压缩后的代码只有一行，会把整个文件的代码都打印出来
     * 所以新增此方法避免打印多余信息影响阅读
     * @param adaptorErrorMessage
     */
    printErrorExitWithoutStack(adaptorErrorMessage: AdaptorErrorMessage): void;
}
export declare function evaluateLogLevel(level: Level, ignoreLevelCategoryFilterArr?: string[]): void;
/**
 * 这个方法会对configuration里加入daemon或者daemon-client的部分
 * 之后调用setConfiguration时，就会使用包含daemon/daemon-client的部分
 *
 * @param {Configuration} configuration
 */
export declare function configure(configuration: Configuration): void;
