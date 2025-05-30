import { TaskDetails } from '@ohos/hvigor';
import { TaskInputValue } from '@ohos/hvigor';
import { ModulePathInfoIml } from '../common/iml/module-path-info-iml.js';
import { ProjectModel } from '../model/project/project-model.js';
import { ProjectBuildProfile } from '../options/build/project-build-profile.js';
import { AppEnvironmentOption } from '../options/configure/app_environment_option.js';
import { ModuleTargetData } from './data/hap-task-target-data.js';
import { TargetTaskService } from './service/target-task-service.js';
import { OhosHapTask } from './task/ohos-hap-task.js';
import ApiMeta = ProjectBuildProfile.ApiMeta;
import { Dependency } from '../project/dependency/core/dependency-interface.js';
import AppEnvironmentObj = AppEnvironmentOption.AppEnvironmentObj;
export declare const INPUT_KEY: {
    isHarModule: string;
    bundleName: string;
    targetSdkVersion: string;
    compatibleSdkVersion: string;
    multiProjects: string;
    releaseType: string;
    buildRoot: string;
    isDebug: string;
    asanEnable: string;
    tsanEnable: string;
    hwasanEnable: string;
    ubsanEnable: string;
    projectConfigAppOpt: string;
    vendor: string;
    buildProfileAbilities: string;
    appEnvironments: string;
    toolChainSdkVersion: string;
    moduleJsonOpt: string;
    appJsonOpt: string;
};
/**
 * 合并module.json5或config.json
 *
 * @since 2022/9/15
 */
export declare abstract class AbstractMergeProfile extends OhosHapTask {
    protected _moduleTargetData: ModuleTargetData;
    protected _pathInfo: ModulePathInfoIml;
    protected _projectModel: ProjectModel;
    protected readonly _bundleName: string | undefined;
    protected readonly _targetName: string;
    protected readonly _buildRoot: string;
    protected readonly _vendor: string | undefined;
    protected readonly asanEnable: boolean;
    protected readonly tsanEnable: boolean;
    protected readonly hwAsanEnable: boolean;
    protected readonly ubsanEnable: boolean;
    protected readonly appEnvironments: string | undefined;
    protected constructor(taskService: TargetTaskService, taskDetails: TaskDetails);
    protected mergeDependsLibs(jsonType: string): string[];
    getHarDenPath(localHarModuleMap: Map<string, [string, Dependency]>, ohDepPath: string, buildCacheParentDir: string, jsonType: string): string;
    apiTransform(api: ApiMeta): number;
    declareInputs(): Map<string, TaskInputValue>;
    parseToAppEnvironments(jsonStr: string | undefined): AppEnvironmentObj[];
}
