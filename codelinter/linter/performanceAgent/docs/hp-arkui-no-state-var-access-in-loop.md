# Avoid frequent state variable reads inside loop logic (`hp-arkui-no-state-var-access-in-loop`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
If possible, avoid frequent state variable reads inside loop logic, such as **for** and **while**. Instead, read status variables outside the loop.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-no-state-var-access-in-loop-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-state-management-best-practices-0000001774119958#ZH-CN_TOPIC_0000001811318098__避免在forwhile等循环逻辑中频繁读取状态变量) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following example, the state variable `this.message` is used in the for loop.
```ts
import hilog from '@ohos.hilog'
@Entry
@Component
struct MyComponent {
  @State message: string = '';
  build() {
    Column() {
      Button('Click to print logs')
        .onClick(() => {
          this.message = 'click';
          for (let i = 0; i < 10; i++) {
            hilog.info(0x0000, 'TAG', '%{public}s', this.message);
          }
        })
        .width('90%')
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .margin({
          top: 10
        })
    }
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
    .margin({
      top: 15
    })
  }
}
```

Examples of **correct** code for this rule.

The solution is to replace the read and write of the state variable with the local variable `logMessage` to avoid the read and write of the state variable in the loop. 
```ts
import hilog from '@ohos.hilog'

@Entry
@Component
struct MyComponent {
  @State message: string = '';
  build() {
    Column() {
      Button('Click to print logs')
        .onClick(() => {
          this.message = 'click';
          let logMessage: string = this.message;
          for (let i = 0; i < 10; i++) {
            hilog.info(0x0000, 'TAG', '%{public}s', logMessage);
          }
        })
        .width('90%')
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .margin({
          top: 10
        })
    }
    .justifyContent(FlexAlign.Start)
    .alignItems(HorizontalAlign.Center)
    .margin({
      top: 15
    })
  }
}
```