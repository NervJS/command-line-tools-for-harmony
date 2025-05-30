import { ArkComponent } from '../superior/ark-component.js';
/**
 * js ark实例
 */
export declare class JsArkComponent implements ArkComponent {
    private _log;
    private readonly ts2abcToolPath;
    private ts2abcVersion;
    constructor(jsLoaderPath: string);
    getArkVersion(compatibleSdkVersion?: number, compatibleSdkVersionStage?: string): string;
}
