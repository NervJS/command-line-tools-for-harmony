# Replace state variables with local variables (`hp-arkui-use-local-var-to-replace-state-var`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
State variable assignment affects the renders of UI components. As such, you are advised to replace a state variable used for temporary calculation with a local variable, so as to reduce the impact on the render performance.

If a state variable is assigned more than twice, consider replacing it with a local variable.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-local-var-to-replace-state-var-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/arkts-state-management-best-practices-V5#%E5%BB%BA%E8%AE%AE%E4%BD%BF%E7%94%A8%E4%B8%B4%E6%97%B6%E5%8F%98%E9%87%8F%E6%9B%BF%E6%8D%A2%E7%8A%B6%E6%80%81%E5%8F%98%E9%87%8F) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following example, the state variable `this.message` is assigned three times and should be replaced with a local variable.
```ts
@Entry
@Component
struct MyComponent {
  @State message: string = '';
  appendMsg(newMsg: String) {
    this.message += newMsg;
    this.message += ";";
    this.message += "<br/>";
  }
  build() {
    Text(this.message).font(10).
  }
}
```

Examples of **correct** code for this rule.

In this example, the state variable is replaced with the local variable `message` and assigned back to `this.message` at the end.
```ts
@Entry
@Component
struct MyComponent {
  @State message: string = '';
  appendMsg(newMsg: String) {
    let message = this.message;
    message += newMsg;
    message += ";";
    message += "<br/>";
    this.message = message;
  }
  build() {
    // 业务代码...
  }
}
```