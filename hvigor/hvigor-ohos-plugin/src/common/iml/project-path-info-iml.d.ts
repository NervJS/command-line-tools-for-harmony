import { ProjectModel } from '../../model/project/project-model.js';
export declare class ProjectPathInfoIml {
    private readonly _projectModel;
    private readonly _productName;
    private readonly _projectPath;
    constructor(projectModel: ProjectModel, productName: string);
    getProjectBuildPath(): string;
    getProjectOutputPath(): string;
    getProjectDebugSymbolPath(): string;
}
