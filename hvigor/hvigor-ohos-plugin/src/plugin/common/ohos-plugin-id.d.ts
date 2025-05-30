/**
 * 默认的Ohos plugin中对应的三种Module的plugin id
 *
 * @since 2022/5/5
 */
export declare class OhosPluginId {
    static readonly OHOS_APP_PLUGIN = "com.ohos.app";
    static readonly OHOS_HAP_PLUGIN = "com.ohos.hap";
    static readonly OHOS_HAR_PLUGIN = "com.ohos.har";
    static readonly OHOS_HSP_PLUGIN = "com.ohos.hsp";
}
/**
 * OhosPlugin 对应不同模块使用的插件id
 *
 * @deprecated 此接口类型名称已废弃，不再推荐使用，请使用OhosPluginId替代
 */
export type DefaultPluginId = OhosPluginId;
