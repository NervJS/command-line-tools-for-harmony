# This rule validates the font size. (`font-size`)

## Rule Details

The font size should be at least 8 fp for legibility.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_font-size-{{apiVersion}}) for more details.

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
        Text(this.message).fontSize('50vp')
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
  build() {
    Row() {
      Column() {
        Text(this.message).fontSize(50)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```
