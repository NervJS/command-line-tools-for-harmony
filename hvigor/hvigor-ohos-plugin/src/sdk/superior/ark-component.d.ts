/**
 * ark实例公共接口
 *
 * @since 2021-12-16
 */
export interface ArkComponent {
    /**
     * 获取ark版本
     */
    getArkVersion(compatibleSdkVersion?: number, compatibleSdkVersionStage?: string): string;
}
