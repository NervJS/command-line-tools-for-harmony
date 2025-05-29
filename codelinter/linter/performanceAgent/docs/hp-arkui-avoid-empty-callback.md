# Avoid setting empty system callback listeners (`hp-arkui-avoid-empty-callback`)

## Benefits from Code Optimization
Alignment with ArkUI coding guidelines.

## Rule Details
In the development process, it is important to identify and reduce redundant operations. In the production environment, check for and delete empty callback functions that have no actual functions to ensure that each callback function has a clear purpose. If a callback function body does not contain any service logic code, delete the callback function. 

Strict processing of callback functions can effectively reduce redundancy, improve code quality and running performance, and improve user experience of your app.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-avoid-empty-callback-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-time-optimization-of-the-main-thread-V5#section1193294163616) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the `onClick` callback, no code logic is actually executed.
```ts
@Component
struct MyComponent {
  build() {
    Button('Click', { type: ButtonType.Normal, stateEffect: true })
      .onClick(() => {
        // No service logic
      })
  }
}
```

Examples of **correct** code for this rule.

The callback function that does not contain any service logic code is deleted.
```ts
@Component
struct MyComponent {
  doSomething() {
    // Service logic
  }

  build() {
    Button('Click', { type: ButtonType.Normal, stateEffect: true })
      .onClick(() => {
        this.doSomething()
      })
  }
}
```

