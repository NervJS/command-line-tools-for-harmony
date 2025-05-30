import { CoreTask, TaskDetails } from '@ohos/hvigor';
import { CodeType } from '../../enum/code-type-enum.js';
import { TargetTaskService } from '../service/target-task-service.js';
import { TargetTaskCreator, TaskCreatorManager } from '../task-creator.js';
export declare const initializeArkTsTasks: (service: TargetTaskService, creatorManager: TaskCreatorManager) => void;
export declare class ArkTsTaskCA extends TargetTaskCreator {
    protected codeType: CodeType;
    constructor(taskService: TargetTaskService, codeType: CodeType);
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => string[];
}
export declare class ArkTsHarTaskCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => string[];
}
export declare class ArkTsOhosTestCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
}
export declare class ArkTsUnitTestCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => string[];
}
export declare class ArkTsPreviewCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => string[];
}
export declare class ArkTsHotReloadCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => string[];
    afterConfigure: () => void;
}
export declare class ArkTsColdReloadCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => never[];
}
export declare class NodeBuildTaskCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
    declareDepends: () => string[];
}
export declare class NodeHarBuildTaskCA extends NodeBuildTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
}
export declare class NodeOhosTestBuildTaskCA extends ArkTsTaskCA {
    provider: () => CoreTask;
    declareTaskDetail: () => TaskDetails;
}
