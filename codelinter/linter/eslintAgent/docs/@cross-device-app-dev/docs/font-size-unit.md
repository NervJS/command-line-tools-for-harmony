# This rule validates the font size unit. (`font-size-unit`)

## Rule Details

This unit is not recommended for font sizes. Use fp instead, so that the app font can adapt to system font settings.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_font-size-unit-{{apiVersion}}) for more details.

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
