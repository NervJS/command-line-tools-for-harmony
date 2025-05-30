import { TaskDetails } from '@ohos/hvigor';
import { DebugSymbol, NativeLib } from '../../options/build/build-opt.js';
import { AbstractBuildNative } from '../abstract-build-native.js';
import { TargetTaskService } from '../service/target-task-service.js';
/**
 * CacheNativeLibs和DoNativeStrip的抽象父类
 *
 * @since 2023/11/30
 */
export declare abstract class AbstractNativeStrip extends AbstractBuildNative {
    protected readonly nativeLibOption: NativeLib | undefined;
    protected readonly debugSymbol: DebugSymbol | undefined;
    protected readonly exclude: string[] | undefined;
    protected readonly intermediatesProcessLibs: string;
    protected readonly strippedNativeLibs: string;
    protected readonly moduleBuildPath: string;
    protected readonly cacheFilePath: string;
    protected constructor(targetService: TargetTaskService, taskDetails: TaskDetails);
}
