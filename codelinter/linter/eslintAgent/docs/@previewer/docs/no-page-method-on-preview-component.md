# Page methods cannot be called for @Preview decorated components. (`no-page-method-on-preview-component`)

## Rule Details

Page methods such as onPageShow/onPageHide/onBackPress should be used only for @Entry decorated components.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-page-method-on-preview-component-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Preview
@Component
struct Index {
  @State message: string = 'Hello World';

  onPageShow(): void {}
  onPageHide(): void {}
  onBackPress(): void {}

  build() {
    Column() {
      Text(this.message)
    }
  }
}
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
struct Index {
  @State message: string = 'Hello World';

  onPageShow(): void {}
  onPageHide(): void {}
  onBackPress(): void {}

  build() {
    Row() {
      Column() {
        Text(this.message)
      }
    }
  }
}
```
