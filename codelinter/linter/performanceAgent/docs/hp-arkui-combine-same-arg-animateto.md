# Combine animateTo calls that share the same parameters (`hp-arkui-combine-same-arg-animateto`)

## Benefits from Code Optimization
Reduced frame loss in animations.

## Rule Details
Each time **animateTo** is called, a before-after comparison is required. Less **animateTo** calls can contribute to fewer component re-renders and thereby higher performance. In light of this, if properties share the same animation settings, consider placing them in the same animation closure. 

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-combine-same-arg-animateto-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-fair-use-animation-V5#section1150051943714) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code, the state variable update of the same animation parameter is placed in different animation closures.
```ts
@@Entry
@Component
struct MyComponent {
  @State textWidth: number = 200;
  @State color: Color = Color.Red;

  func1() {
    animateTo({ curve: Curve.Sharp, duration: 1000 }, () => {
      this.textWidth = (this.textWidth === 100 ? 200 : 100);
    });
  }

  func2() {
    animateTo({ curve: Curve.Sharp, duration: 1000 }, () => {
      this.color = (this.color === Color.Yellow ? Color.Red : Color.Yellow);
    });
  }

  build() {
    Column() {
      Row()
        .width(this.textWidth)
        .height(10)
        .backgroundColor(this.color)
      Text('click')
        .onClick(() => {
          this.func1();
          this.func2();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```

Examples of **correct** code for this rule.

For better performance, it is recommended to combine animations with the same animation parameters in one animation closure.
```ts
@Entry
@Component
struct MyComponent {
  @State textWidth: number = 200;
  @State color: Color = Color.Red;

  func() {
    animateTo({ curve: Curve.Sharp, duration: 1000 }, () => {
      this.textWidth = (this.textWidth === 100 ? 200 : 100);
      this.color = (this.color === Color.Yellow ? Color.Red : Color.Yellow);
    });
  }

  build() {
    Column() {
      Row()
        .width(this.textWidth)
        .height(10)
        .backgroundColor(this.color)
      Text('click')
        .onClick(() => {
          this.func();
        })
    }
    .width('100%')
    .height('100%')
  }
}
```