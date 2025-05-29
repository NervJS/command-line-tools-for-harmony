# This rule validates the value of the color. (`color-value`)

## Rule Details

The color values should be referenced through '$r', rather than being fixed, to allow for adaptation to the color mode.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_color-value-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  build() {
   Row() {
      Column() {
        Text(this.message).fontColor('#000000').fontSize(50)
        Text(this.message).fontColor(Color.Red).fontSize(50)
        // The value of 'app.color.test_color' is not set to dark or light.
        Text(this.message).fontColor($r('app.color.test_color')).fontSize(50)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  private fontColor:Resource = $r('sys.color.ohos_id_color_activated')
  build() {
    Row() {
      Column() {
        Text(this.message).fontColor(this.fontColor).fontSize(50)
        Text(this.message).fontColor(this.fontColor).fontSize(50)
        // The value of 'app.color.test_color' is configured with both dark and light
        Text(this.message).fontColor($r('app.color.test_color')).fontSize(50)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```
