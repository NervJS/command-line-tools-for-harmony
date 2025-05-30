import { ModuleTargetData } from './data/hap-task-target-data.js';
import { TargetTaskService } from './service/target-task-service.js';
import { DurationEvent } from '@ohos/hvigor';
import { AbstractBuildNative } from './abstract-build-native.js';
/**
 * ohos native代码编译so任务
 *
 * @since 2021/1/21
 */
export declare class BuildNativeWithNinja extends AbstractBuildNative {
    private _log;
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
    buildCommand(abiFilter: string, targetData: ModuleTargetData, callback: Function, callbackInput: unknown[], subDurationEvent: DurationEvent): Promise<void>;
    taskShouldDo(): boolean;
    protected doTaskAction(): Promise<void>;
    cleanUnwanted(abiFilters: string[]): Promise<void>;
    /**
     * 检查.so实际输出与默认输出并同步
     *
     * @param nativeLibraries NativeLibraryModel
     * @param expectedOutput 默认输出
     * @param cxxAbi .cxx中间目录
     * @private
     */
    private syncOutput;
    /**
     * 同步本模块生成的so产物到intermediates/cmake目录下
     *
     * @param library NativeLibraryModel
     * @param expectedOutput 默认输出
     * @param cxxAbi .cxx中间目录
     * @param index 全局同步的so缓存, 避免重复拷贝
     * @private
     */
    private syncLibOutputs;
    /**
     * 同步本模块生成的so的依赖so到intermediates/cmake目录下
     *
     * @param library NativeLibraryModel
     * @param expectedOutput 默认输出
     * @param cxxAbi .cxx中间目录
     * @param index 全局同步的so缓存, 避免重复拷贝
     * @private
     */
    private syncLibDeps;
    /**
     * 是否需要exclude
     * @param file
     * @private
     */
    private isExcludeFromHar;
    /**
     * 如果该so文件已存在于缓存中，并且需要exclude，需将缓存中的so文件删除
     * @param file
     * @param destination
     * @private
     */
    private removeHarOutPutSo;
    /**
     * 同步标准库stl
     *
     * 设置了 -DOHOS_STL=c++_static 或者 -DOHOS_STL=none 时，不拷贝 libc++_shared.so，且删除临时目录下的.so文件
     * 否则拷贝libc++_shared.so到临时目录
     * 最终打包到hap的lib目录下
     *
     * @param abiFilter abiFilter
     * @param outputDir 临时目录
     * @param replyFolder cmake file-api reply folder
     * @param pathInfo pathInfo
     * @private copyLibSo
     */
    private syncStl;
    private excludeFromHsp;
    private excludeFromHar;
}
