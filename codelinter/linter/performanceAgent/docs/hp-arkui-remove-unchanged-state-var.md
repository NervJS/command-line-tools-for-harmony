# Convert unchanged state variables into regular variables (`hp-arkui-remove-unchanged-state-var`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
The variables that do not change values should not be defined as state variables. Otherwise, the performance may be affected when the state variables are read.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkui-remove-unchanged-state-var-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-status-management-V5#section2674939304) for more details.

## Examples

Examples of **incorrect** code for this rule:

```ts
@Observed
class Translate {
  translateX: number = 20;
}
@Component
struct Title {
  build() {
    Row() {
      // Local resource icon.png
      Image($r('app.media.icon'))
        .width(50)
        .height(50)
      Text("Title")
        .fontSize(20)
    }
  }
}
@Entry
@Component
struct MyComponent {
  @State translateObj: Translate = new Translate();
  @State button_msg: string = "i am button";

  build() {
    Column() {
      Title()
      Stack() {
      }
      .backgroundColor("black")
      .width(200)
      .height(400)
      // There are no write operations on the button_msg variable.
      Button(this.button_msg)
        .onClick(() => {
          animateTo({
            duration: 50
          },()=>{
            this.translateObj.translateX = (this.translateObj.translateX + 50) % 150
          })
        })
    }
    .translate({
      x: this.translateObj.translateX
    })
  }
}
```
Examples of **correct** code for this rule:

```ts
class Translate {
  translateX: number = 20;
}

@Component
struct Title {
  build() {
    Row() {
      // Local resource icon.png
      Image($r('app.media.icon'))
        .width(50)
        .height(50)
      Text("Title")
        .fontSize(20)
    }
  }
}

@Entry
@Component
struct MyComponent {
  @State translateObj: Translate = new Translate();
  // button_msg is properly used as a regular variable.
  button_msg = "i am button";

  build() {
    Column() {
      Title()
      Stack() {
      }
      .backgroundColor("black")
      .width(200)
      .height(400)

      Button(this.button_msg)
        .onClick(() => {
          animateTo({
            duration: 50
          }, () => {
            this.translateObj.translateX = (this.translateObj.translateX + 50) % 150
          })
        })
    }
    .translate({ // The component in Column shares the same property translate.
      x: this.translateObj.translateX
    })
  }
}
```