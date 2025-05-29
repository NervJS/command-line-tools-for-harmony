# Do not use export * to export types and data defined in the current module (`hp-arkts-no-use-any-export-current`)

## Benefits from Code Optimization
Decreased cold start completion time.

## Rule Details
Do not use **export * from ''** or **export * as *name* from ''** to export the types and data defined in the current module.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkts-no-use-any-export-current-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-application-cold-start-optimization-V5) for more details.

## Examples

Examples of **incorrect** code for this rule:

```ts
class User {
  id?: number;
  name?: string;
}
// Current File User.ets
export * from './User';
// Current File User.ets
export * as XX from './User'
```
Examples of **correct** code for this rule:

```ts
export class User {
  id?: number;
  name?: string;
}
```