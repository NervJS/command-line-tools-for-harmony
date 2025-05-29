# Remove state variables that are not associated with a UI component (`hp-arkui-remove-redundant-state-var`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
Variables that are not associated with any UI component should not be defined as state variables. Otherwise, performance will be affected when reading and writing these state variables.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkui-remove-redundant-state-var-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-status-management-V5#section2674939304) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code, the **message** variable is a state variable used to accumulate messages, but is not associated with any component property.
```ts
@Entry
@Component
struct MyComponent {
  @State message: string = "";

  appendMsg(newMsg: String): string {
    this.message += newMsg;
    return this.message;
  }

  build() {
    Column() {
      Stack() {
      }
      .backgroundColor("black")
      .width(200)
      .height(400)

      Button("move")
    }
  }
}
```

Examples of **correct** code for this rule.

In the following code, the **message** variable is defined as a regular variable.
```ts
@Entry
@Component
struct MyComponent {
  @State message: string = "";

  appendMsg(newMsg: String): string {
    this.message += newMsg;
    return this.message;
  }

  build() {
    Column() {
      Stack() {
        Text(this.message)
      }
      .backgroundColor("black")
      .width(200)
      .height(400)

      Button("move")
    }
  }
}
```