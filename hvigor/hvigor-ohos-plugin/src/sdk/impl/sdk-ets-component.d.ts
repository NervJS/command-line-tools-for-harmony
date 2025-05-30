import { Component } from '@ohos/sdkmanager-common';
import { SdkComponent } from '../superior/sdk-component.js';
/**
 * sdk ets实例
 *
 * @since 2021-12-16
 */
export declare class SdkEtsComponent extends SdkComponent {
    private readonly _etsLoaderPath;
    private readonly _arkComponent;
    private readonly _sysCapFilePath;
    constructor(component: Component);
    getEtsLoaderPath(): string;
    getArkVersion(): string;
    getCompatibleArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getSysCapFilePath(): string;
}
