import { Module, ToolingModelBean } from '@ohos/hvigor';
/**
 * OhosProject中的Module模块的toolModel数据模型
 *
 * @since 2022/2/19
 */
export declare class OhosModuleModelBean implements ToolingModelBean {
    modelId: string;
    private readonly _isFaMode;
    private readonly _module;
    private readonly _projectModel;
    private readonly _moduleModel;
    private readonly _moduleTaskService;
    private readonly _targetDataSet;
    private readonly _isHarModule;
    private readonly _targetTaskServices;
    private readonly _moduleType;
    constructor(module: Module, isFaMode: boolean);
    private computeCommonInfo;
    private computeBuildOption;
    private computePathInfo;
    private getCachePath;
    private getFirstEntryName;
    private computeBuildDirInfo;
    buildModel(): string | undefined;
}
