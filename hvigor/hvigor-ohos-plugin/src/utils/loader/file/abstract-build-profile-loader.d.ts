export declare abstract class AbstractBuildProfileLoader {
    abstract getBuildProfile(nodeName?: string): any;
    protected getBuildProfileJson5Obj(hvigorNodeName: string, schemaCheck?: boolean, classKind?: string): any;
    abstract setBuildProfileJson5Obj(hvigorNodeName: string, buildProfileJson5Obj: any, schemaCheck: boolean): void;
    protected setBuildProfileJson5ObjCheck(hvigorNodeName: string, buildProfileJson5Obj: any, schemaPath: string | undefined, classKind?: string): void;
    protected validateBuildProfile(obj: object, filePath: string, schemaPath: string): void;
    protected initializeReplace(json5Obj: any): any;
}
