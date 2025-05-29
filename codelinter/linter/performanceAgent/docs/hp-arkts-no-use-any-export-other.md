# Do not use export * to export types and data defined in another module (`hp-arkts-no-use-any-export-other`)

## Benefits from Code Optimization
Decreased cold start completion time.

## Rule Details
Do not use **export * from *moduleName*** or **export * as *name* from *moduleName*** to export the types and data defined in another module.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkts-no-use-any-export-other-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-application-cold-start-optimization-V5) for more details.


## Examples

Examples of **incorrect** code for this rule:

```ts
// Current File User.ets
// Export all exportable members from the Product.ets file
export * from './Product';
// Export all exportable members from the Product.ets file
export * as XX from './Product';
class User {
  id?: number;
  name?: string;
}
```
Examples of **correct** code for this rule:

```ts
// Current File User.ets
// Export all exportable members from the Product.ets file
export { Product } from './Product';
class User {
  id?: number;
  name?: string;
}
```