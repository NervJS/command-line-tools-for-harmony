import { FileSet, TaskInputValue } from '@ohos/hvigor';
import { TargetTaskService } from '../service/target-task-service.js';
import { OhosHapTask } from '../task/ohos-hap-task.js';
/**
 * 遍历project的module信息并生成JsManifest.json文件
 *
 * @since 2022/1/19
 */
export declare class LegacyGenerateJsManifest extends OhosHapTask {
    private _log;
    private readonly previewSrcPath;
    private readonly unitTestSrcPath;
    private readonly isPreview;
    private readonly previewPage;
    private readonly unitTestPage;
    private readonly isUnitTest;
    private readonly _moduleModel;
    private readonly _abilityModels;
    private readonly _configOpt;
    private readonly _minPlatformVersion;
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
    declareInputs(): Map<string, TaskInputValue>;
    declareOutputFiles(): FileSet;
    protected doTaskAction(): void;
    private getUnitTestManifestPage;
    private getManifestPages;
    private getAbilityPages;
    private generateJsonInfo;
    private static findAppName;
    private getWindowObj;
}
