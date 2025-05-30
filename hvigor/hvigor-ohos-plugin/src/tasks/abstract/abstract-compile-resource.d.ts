/// <reference types="node" />
import { SpawnSyncOptions } from 'child_process';
import { FileSet, TaskDetails, TaskInputValue } from '@ohos/hvigor';
import { RestoolLinkParamObj } from '../../options/configure/restool-config-options.js';
import { OhosLogger } from '../../utils/log/ohos-logger.js';
import { ModuleTargetData } from '../data/hap-task-target-data.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { AbstractResource } from './abstract-resource-task.js';
/**
 * 资源编译任务的公共抽象类
 *
 * @since 2022/9/8
 */
export declare abstract class AbstractCompileResource extends AbstractResource {
    protected intermediatesResDir: string;
    protected generateSourceRDir: string | undefined;
    protected resConfigFilePath: string | undefined;
    protected entryModuleName: string | undefined;
    protected compileCommands: string[][];
    protected linkCommand: string[] | undefined;
    protected linkOutputPath: string | undefined;
    protected isPreview: boolean | undefined;
    restoolLinkParamObj: RestoolLinkParamObj | undefined;
    protected abstract processProfileTask: string;
    protected constructor(taskService: TargetTaskService, taskDetails: TaskDetails);
    getEnabled(): boolean;
    protected getCommand(): string[];
    protected beforeTask(): void;
    declareInputs(): Map<string, TaskInputValue>;
    declareExecutionTool(): string;
    declareInputFiles(): FileSet;
    declareOutputFiles(): FileSet;
    /**
     * get restool path
     *
     * @returns {string}
     */
    protected getResToolFile(): string;
    /**
     * 资源编译流程模板方法
     *
     * @param {string} commandType 命令类型（）
     * @param {ModuleTargetData} targetData
     * @protected
     */
    protected compilationProcess(commandType: string, targetData: ModuleTargetData): Promise<void>;
    /**
     * 资源编译前置检查
     *
     * @param {string} commandType 构造资源编译命令的方式
     * @return {boolean} true 通过 false 不通过
     */
    precheck(commandType: string): boolean;
    /**
     * 调用restool执行资源编译，抽象方法
     *
     * @param {ModuleTargetData} targetData
     */
    invokeRestool(targetData: ModuleTargetData): Promise<void>;
    /**
     * 同步执行命令
     *
     * @param {commands} commands 命令
     * @param {OhosLogger} log 日志
     * @param {Function} callback 编译资源完成后的回调函数
     * @protected
     */
    protected executeCommand(commands: string[], log: OhosLogger, callback?: Function, spawnOptions?: SpawnSyncOptions): Promise<void>;
    /**
     * 资源编译特殊日志处理
     *
     * @param {execa.SpawnSyncReturns<string>} spawnReturnValue 执行命令返回结果
     * @param {string} ohosCharset 日志解析编码方式
     * @param {OhosLogger} log 日志对象
     * @return {boolean} true/false，处理成功返回无需后续通用日志打印
     * @private
     */
    private iconSizeWarningHandler;
    /**
     * restool 输出结果打点上报
     * @param spawnReturnValue
     * @private
     */
    private restoolReportHandler;
    /**
     * 以命令为参数执行编译、链接resTool命令
     *
     * @param {OhosLogger} log 日志对象
     * @param {Function} callback 编译资源完成后的回调函数
     * @protected
     */
    protected compileLink(log: OhosLogger, callback?: Function): Promise<void>;
    private getInputData;
    /**
     * 执行preview资源编译、链接
     *
     * @param {OhosLogger} log 日志对象
     * @param {Function} callback 回调函数
     */
    previewCompileLink(log: OhosLogger, callback?: Function): Promise<void>;
    /**
     * Preview 构建参数持久化
     * （预览热加载时使用此参数）
     */
    previewBuildParamPersistence(): Promise<void>;
    /**
     * 构建增量特性编译链接完整命令
     *
     * @protected
     */
    protected buildIncrementalCompileLinkFullCommand(): Promise<void>;
    /**
     * 链接（link）命令添加ResourcesMap转换的命令
     *
     * @protected
     */
    protected linkCommandPushResourcesMap(resourcesMap: Map<string, string>): void;
    /**
     * 根据entry的deviceType和当前feature的deviceType取交集后生成到config.json中
     * 若取交集后deviceType为空, 则报warning
     *
     * @param {ModuleTargetData} targetData
     * @param {string} entryName
     * @param {OhosLogger} _log
     * @protected
     */
    protected retainDeviceType(targetData: ModuleTargetData, entryName: string, _log: OhosLogger): Promise<void>;
    /**
     * 资源编译完成后处理target页面路由配置
     *
     * @param {ModuleTargetData} targetData
     * @param {OhosLogger} log
     * @return true 表示处理完成， false 未处理
     * @protected
     */
    protected replaceTargetPages(targetData: ModuleTargetData, log: OhosLogger): void;
    /**
     * 处理shortcuts字段bundleName定制场景
     * @constructor
     * @protected
     */
    protected customizeShortcut(): void;
}
