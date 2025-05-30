import { NativeCodemodel } from './native-codemodel.js';
export declare class NativeLibraryModel {
    private _buildCommand;
    private _buildCommandComponents;
    private _buildType;
    private _toolchain;
    private _groupName;
    private _abi;
    private _artifactName;
    private _folders;
    private _files;
    private _headers;
    private _codemodel;
    private _nameOnDisk;
    private _outputs;
    private _runtimeFiles;
    private _build;
    private _source;
    private _id;
    private readonly _type;
    constructor(name: string, id: string, type: string);
    get id(): string;
    set id(value: string);
    getType(): string;
    getBuildCommand(): string | undefined;
    setBuildCommand(value: string | undefined): void;
    getBuildCommandComponents(): string[] | undefined;
    setBuildCommandComponents(value: string[] | undefined): void;
    getBuildType(): string | undefined;
    setBuildType(value: string | undefined): void;
    getToolchain(): string | undefined;
    setToolchain(value: string | undefined): void;
    getGroupName(): string | undefined;
    setGroupName(value: string | undefined): void;
    getAbi(): string | undefined;
    setAbi(value: string | undefined): void;
    getArtifactName(): string;
    setArtifactName(value: string): void;
    getFolders(): string[] | undefined;
    setFolders(value: string[] | undefined): void;
    getFiles(): string[] | undefined;
    setFiles(value: string[] | undefined): void;
    getHeaders(): string[] | undefined;
    setHeaders(value: string[] | undefined): void;
    getOutputs(): string[];
    setOutputs(value: string[] | undefined): void;
    getRuntimeFiles(): string[];
    setRuntimeFiles(value: string[] | undefined): void;
    getCodemodel(): NativeCodemodel | undefined;
    setCodemodel(value: NativeCodemodel | undefined): void;
    getNameOnDisk(): string | undefined;
    setNameOnDisk(value: string | undefined): void;
    getBuild(): string | undefined;
    setBuild(value: string | undefined): void;
    getSource(): string | undefined;
    setSource(value: string | undefined): void;
}
