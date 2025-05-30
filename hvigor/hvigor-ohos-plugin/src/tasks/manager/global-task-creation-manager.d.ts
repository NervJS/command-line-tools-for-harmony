import { TaskDetails } from '@ohos/hvigor';
import { AbstractModulePlugin } from '../../plugin/common/abstract-module-plugin.js';
import { Clean } from '../common/clean.js';
import { BuildHotReloadResource } from '../debugger/build-hot-reload-resource.js';
import { HotReloadBuild } from '../debugger/hot-reload-build.js';
import { DeviceTestHook } from '../device-test-hook.js';
import { GeneratedBuildProfileTask } from '../generated-build-profile-task.js';
import { AssembleHap } from '../hook/assemble/assemble-hap.js';
import { AssembleHar } from '../hook/assemble/assemble-har.js';
import { AssembleHqf } from '../hook/assemble/assemble-hqf.js';
import { AssembleHsp } from '../hook/assemble/assemble-hsp.js';
import { GenOnDeviceTestHap } from '../hook/gen-on-device-test-hap.js';
import { CompileNativeHook } from '../hook/native/compile-native-hook.js';
import { PreviewHookCompileResource } from '../hook/preview-hook-compile-resource.js';
import { BuildHarPreviewerRes } from '../hook/previewer/build-har-previewer-res.js';
import { BuildPreviewerRes } from '../hook/previewer/build-previewer-res.js';
import { PreviewBuild } from '../hook/previewer/preview-build.js';
import { ModuleTaskService } from '../service/module-task-service.js';
import { GlobalTaskCreator, TargetTaskCreator } from '../task-creator.js';
import { Test } from '../unitTest/test.js';
import { UnitTestBuild } from '../unitTest/unit-test-build.js';
export declare class AssembleHqfCA extends GlobalTaskCreator {
    constructor(service: ModuleTaskService, plugin: AbstractModulePlugin, isFa?: boolean);
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => AssembleHqf;
}
export declare class AssembleHapCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => AssembleHap;
}
export declare class GenOnDeviceTestHapCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => GenOnDeviceTestHap;
}
export declare class AssembleHspCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => AssembleHsp;
}
export declare class PreviewHookCompileResourceCA extends TargetTaskCreator {
    provider: () => PreviewHookCompileResource;
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
}
export declare class AssembleHarCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => AssembleHar;
}
export declare class LibraryBuildPreviewerResCA extends GlobalTaskCreator {
    declareDepends(): string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => BuildHarPreviewerRes;
}
export declare class BuildPreviewerResCA extends GlobalTaskCreator {
    declareDepends(): string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => BuildPreviewerRes;
}
export declare class HotReloadBuildCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => HotReloadBuild;
}
export declare class GeneratedBuildProfileCA extends GlobalTaskCreator {
    private isHar;
    constructor(service: ModuleTaskService, plugin: AbstractModulePlugin, isFa: boolean, isHar?: boolean);
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => GeneratedBuildProfileTask;
}
export declare class PreviewBuildCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => PreviewBuild;
}
export declare class CompileNativeHookCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => CompileNativeHook;
}
export declare class CleanCA extends GlobalTaskCreator {
    declareDepends: () => never[];
    declareTaskDetail: () => TaskDetails;
    provider: () => Clean;
}
export declare class UnitTestBuildCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => UnitTestBuild;
}
export declare class TestCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => Test;
}
export declare class DeviceTestHookCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => DeviceTestHook;
}
export declare class BuildHotReloadResourceCA extends GlobalTaskCreator {
    declareDepends: () => string[];
    declareTaskDetail: () => TaskDetails;
    provider: () => BuildHotReloadResource;
}
