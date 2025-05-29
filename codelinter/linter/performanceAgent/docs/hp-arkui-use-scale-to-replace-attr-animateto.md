# Use the scale animation to replace animateTo when the component layout is changed (`hp-arkui-use-scale-to-replace-attr-animateto`)

## Benefits from Code Optimization
Reduced frame loss in animations.

## Rule Details
You can change the layout of a component in either of the following methods:

- Modify layout properties, which will cause a UI re-layout. Common layout properties include **width**, **height**, and **layoutWeight**.
- Modify transform properties, which will cause the component to translate, rotate, or scale.

As modifying transform properties does not involve the time-consuming UI re-layout, it is more time efficient than modifying layout properties, and is therefore recommended.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-scale-to-replace-attr-animateto-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/bpta-fair-use-animation#section1723931117204) for more details.

## Examples

Examples of **incorrect** code for this rule.

The following code scales the component by setting the layout properties **width** and **height**.
```ts
@Entry
@Component
struct MyComponent {
  @State textWidth: number = 10;
  @State textHeight: number = 10;

  build() {
    Column() {
      Text()
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .fontSize(20)
        .width(this.textWidth)
        .height(this.textHeight)

      Button('LayoutProperty')
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .fontSize(20)
        .margin({ top: 30 })
        .borderRadius(30)
        .padding(10)
        .onClick(() => {
          animateTo({ duration: 1000 }, () => {
            this.textWidth = 100;
            this.textHeight = 100;
          })
        })
    }
  }
}
```


Examples of **correct** code for this rule.

Because animating the location and size properties of a component involves new UI measurement and layout, performance overhead is high. If a component's location or size changes continuously, as in a pinch gesture, using the **scale** property is a better choice for the animation, as in the example below. 

```ts
@Entry
@Component
struct MyComponent {
  @State textScaleX: number = 1;
  @State textScaleY: number = 1;

  build() {
    Column() {
      Text()
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .fontSize(20)
        .width(10)
        .height(10)
        .scale({ x: this.textScaleX, y: this.textScaleY })
        .margin({ top: 100 })

      Button('LayoutProperty')
        .backgroundColor(Color.Blue)
        .fontColor(Color.White)
        .fontSize(20)
        .margin({ top: 60 })
        .borderRadius(30)
        .padding(10)
        .onClick(() => {
          animateTo({ duration: 1000 }, () => {
            this.textScaleX = 10;
            this.textScaleY = 10;
          })
        })
    }
}
}

```