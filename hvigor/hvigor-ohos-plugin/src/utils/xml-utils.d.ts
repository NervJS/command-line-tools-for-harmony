export type nodeType = {
    [index: string]: unknown;
};
export declare const XMLOption: {
    ignoreAttributes: boolean;
    format: boolean;
    suppressEmptyNode: boolean;
    suppressBooleanAttributes: boolean;
};
export declare class XMLNode {
    node: nodeType;
    private parent;
    /**
     * Node的构造函数
     * 可以在初始化时为节点添加属性和将本节点添加到父节点
     *
     * @param node
     */
    constructor(node?: nodeType);
    static initByAttrs(map: {
        [index: string]: unknown;
    }): XMLNode;
    static initByParent(parent: XMLNode, key: string): XMLNode;
    static initByAttrsAndParent(map: {
        [index: string]: unknown;
    }, parent: XMLNode, key: string): XMLNode;
    addPI(): XMLNode;
    /**
     * 向节点中添加标签名为key的子节点
     *
     * @param {string} key 子节点标签名
     * @param {XMLNode} value 子节点内容
     */
    addNode(key: string, value: XMLNode): XMLNode;
    /**
     * 向节点中添加命名空间
     *
     * @param {string} prefix 命名空间
     * @param {string} uri 命名空间uri
     */
    addNamespace(prefix: string, uri: string): XMLNode;
    /**
     * 检查一个xml节点是否存在命名空间
     */
    hasNamespace(): boolean;
    /**
     * 向节点中添加属性
     *
     * @param {string} attr 属性名
     * @param {unknown} value 属性值
     */
    addAttr(attr: string, value: unknown): XMLNode;
    /**
     * 向节点中添加多个属性
     *
     * @param {{[index: string]: unknown}} map 属性名和属性值的键值对
     */
    addAttrs(map: {
        [index: string]: unknown;
    }): XMLNode;
    /**
     * 获取节点中指定属性名的值
     *
     * @param {string} attr 属性名
     */
    getAttr(attr: string): unknown;
    /**
     * 向节点中添加值
     *
     * @param {unknown} value
     */
    addValue(value: unknown): XMLNode;
    build(): nodeType;
    getParent(): XMLNode | undefined;
    setParent(parent: XMLNode): void;
}
