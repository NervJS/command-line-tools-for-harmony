import { ArkComponent } from '../superior/ark-component.js';
/**
 * js ark实例
 *
 * @since 2021-12-16
 */
export declare class EtsArkComponent implements ArkComponent {
    private _log;
    private readonly _ets2abcToolPath;
    private ets2abcVersion;
    constructor(etsLoaderPath: string);
    getArkVersion(compatibleSdkVersion?: number, compatibleSdkVersionStage?: string): string;
}
