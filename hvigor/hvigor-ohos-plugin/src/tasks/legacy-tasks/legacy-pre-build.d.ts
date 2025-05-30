import { FileSet } from '@ohos/hvigor';
import { JsonProfile } from '../../model/json-profile.js';
import { AbstractPreBuild } from '../abstract/abstract-pre-build.js';
import { TargetTaskService } from '../service/target-task-service.js';
/**
 * Fa module preBuild Task
 *
 * @since 2022/9/8
 */
export declare class LegacyPreBuild extends AbstractPreBuild {
    private readonly targetJsonPath;
    private readonly targetConfigOptObj;
    private logger;
    private readonly configOptObj;
    declareInputFiles(): FileSet;
    constructor(taskService: TargetTaskService);
    protected doValidateForDiffApiType(): void;
    protected getJsonProfileByModel(): JsonProfile;
    private validateForm;
    private validateJsType;
    private validateAbilities;
    /**
     * AtomicService相关校验
     *
     * @private
     */
    validateAtomicService(): void;
    initTaskDepends(): void;
    /**
     * 检查差异化的sourceRoot，预留
     */
    protected checkExtendSourceDirs(): void;
    /**
     * 检查byteCodeHar，预留
     */
    protected checkByteCodeHar(): void;
}
