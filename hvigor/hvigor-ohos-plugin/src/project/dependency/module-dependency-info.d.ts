import { Dependency } from './core/dependency-interface.js';
import { ModulePkgNode } from './dependency-manager.js';
/**
 * Module的依赖信息集合
 *
 * @since 2022/5/7
 */
export declare class ModuleDependencyInfo {
    /**
     * har module 依赖的map集合
     * key - module name
     * value -module package.json path
     *
     * @private
     */
    private readonly _moduleDependencyMap;
    private readonly _moduleDependencyCategory;
    private readonly _npmDependencies;
    private readonly _allDependencies;
    private readonly _npmDependenciesObj;
    private readonly _hasHspDependency;
    private readonly _self;
    private readonly _modulePkgNode;
    private readonly _projectPkgNode;
    constructor(self: Dependency, modulePkgNode: ModulePkgNode, projectPkgNode: ModulePkgNode | undefined, moduleDependencyMap: Map<string, Dependency>, npmDependencies: Dependency[]);
    getSelfAsDependency(): Dependency;
    getModulePkgNode(): ModulePkgNode;
    getProjectPkgNode(): ModulePkgNode | undefined;
    /**
     * 依赖的本地模块与其模块名的键值对
     * @returns {Map<string, Dependency>}
     */
    getModuleDependencyMap(): Map<string, Dependency>;
    /**
     * 依赖的本地模块与其模块名的键值对
     * @returns {[string, Dependency][]}
     */
    getModuleDependenciesByType(targetType: string): [string, Dependency][];
    /**
     * 依赖的鸿蒙依赖，包括本地开发态的模块与发布态的远程或者本地依赖
     * @returns {Dependency[]}
     */
    getNpmDependencies(): Dependency[];
    /**
     * 全部依赖，包括本地开发态的模块与发布态的远程或者本地依赖，so，ohpm，npm等依赖
     * @returns {Dependency[]}
     */
    getAllDependencies(): Dependency[];
    /**
     * 判断当前模块是否有hsp依赖
     */
    hasHspDependency(): boolean;
    getHspDependencies(): Dependency[];
}
