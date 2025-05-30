/**
 * 针对json/json5文件中有相同属性的配置项，可以使用泛型
 *
 * @since 2022/1/10
 */
export type Option = {
    [index: string]: unknown;
};
export interface Named extends Option {
    name?: string;
}
export interface RequiredNamed extends Named {
    name: string;
}
export interface Configurable extends Option {
    runtimeOS?: string;
}
