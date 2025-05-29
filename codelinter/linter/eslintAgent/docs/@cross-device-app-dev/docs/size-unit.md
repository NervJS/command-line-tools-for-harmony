# This rule validates the unit of the layout dimension. (`size-unit`)

## Rule Details

The px unit is not recommended. Use vp instead, so that the app layout can adapt to different screen widths.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_size-unit-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
  build() {
    Row() {
      Row() {
      }.width('100px')
      .height('100px')
    }
    .height('100%')
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
struct Index {
  build() {
    Row() {
      Row() {
      }.width('100vp')
      .height(100)
    }
    .height('100%')
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```
