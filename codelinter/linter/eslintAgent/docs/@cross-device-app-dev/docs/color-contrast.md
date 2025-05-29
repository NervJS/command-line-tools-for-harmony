# This rule checks color contrast. (`color-contrast`)

## Rule Details

The color contrast between text and its background should be at least 4.5:1 to ensure legibility.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_color-contrast-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
    @State message: string = 'Hello World'
    build() {
        Row() {
            Text(this.message)
                .fontColor('#000000')
                .backgroundColor('#000000')
        }
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
            Text(this.message)
                .fontColor('#ffffff')
                .backgroundColor('#000000')
        }
    }
}
```
