# Use .id when using getColorSync and getStringSync (`hp-arkui-use-id-in-get-resource-sync-api`)

## Benefits from Code Optimization
Efficient handling of long-running functions.

## Rule Details
The **getColorSync** and **getStringSync** APIs can be called with or without **.id**. To obtain resources in the same HAP, you are advised to use **.id**. If only **resource** is passed in such a case, a resource is created, which affects the request performance.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-id-in-get-resource-sync-api-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-ui-component-performance-optimization-V5) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following example, only the resource  **$r ('app.color.test')** is passed in.
```ts
import { BusinessError } from '@ohos.base';

try {
  // Here, the $r ('app.color.test') resource is directly used as a parameter.
  this.context.resourceManager.getColorSync($r('app.color.test'));
} catch (error) {
  let code = (error as BusinessError).code;
  let message = (error as BusinessError).message;
  console.error(`getColorSync failed, error code: ${code}, message: ${message}.`);
}
```

Examples of **correct** code for this rule.

In the following example,  **.id** is used to obtain resources.
```ts
import { BusinessError } from '@ohos.base';

try {
  // You are advised to use .id to obtain resources.
  this.context.resourceManager.getColorSync($r('app.color.test').id);
} catch (error) {
  let code = (error as BusinessError).code;
  let message = (error as BusinessError).message;
  console.error(`getColorSync failed, error code: ${code}, message: ${message}.`);
}
```