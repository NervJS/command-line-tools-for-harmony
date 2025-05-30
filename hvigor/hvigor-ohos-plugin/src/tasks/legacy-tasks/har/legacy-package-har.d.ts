import { AbstractPackageHar } from '../../abstract/abstract-package-har.js';
import { TargetTaskService } from '../../service/target-task-service.js';
/**
 * 打包Fa模型的Har包
 *
 * @since 2021/12/18
 */
export declare class LegacyPackageHar extends AbstractPackageHar {
    protected readonly taskTmpDir: string;
    constructor(taskService: TargetTaskService);
    initTaskDepends(): void;
}
