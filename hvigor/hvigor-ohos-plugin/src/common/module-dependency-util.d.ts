import { ModuleModel } from '../model/module/module-model.js';
import { ProjectModel } from '../model/project/project-model.js';
import { TaskService } from '../tasks/service/task-service.js';
/**
 * 记录Project工程中的entry依赖的本地har的情况下，har的依赖链中只存在har 不存在hsp
 * 此时的har合并到entry的时候不需要生成resource_str目录
 */
declare class ModuleDependencyUtil {
    private pureHar;
    getPureHar(service: TaskService, module: ModuleModel, projectModel: ProjectModel, isFaMode: boolean): Set<string>;
    init(service: TaskService, module: ModuleModel, projectModel: ProjectModel, isFaMode: boolean): void;
}
export declare const moduleDependencyUtil: ModuleDependencyUtil;
export {};
