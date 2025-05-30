import { Component } from '@ohos/sdkmanager-common';
import { SdkComponent } from '../superior/sdk-component.js';
/**
 * sdk js实例
 *
 * @since 2021-12-16
 */
export declare class SdkJsComponent extends SdkComponent {
    private readonly _jsLoaderPath;
    private readonly _hapToBinPath;
    private readonly _sysCapFilePath;
    private arkComponent;
    constructor(component: Component);
    getJsLoaderPath(): string;
    getArkVersion(): string;
    getCompatibleArkVersion(compatibleSdkVersion: number, compatibleSdkVersionStage?: string): string;
    getSysCapFilePath(): string;
    getHapToBinFilePath(): string;
}
