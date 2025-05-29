# Disallow multiple spaces. (`no-multi-spaces`)

## Rule Details

Disallow multiple spaces.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-multi-spaces-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
  // Multiple spaces found before 'message'.
  // Multiple spaces found before 'string'.
  // Multiple spaces found before '='.
  // Multiple spaces found before ''Hello World''.
  @State  message:  string  =  'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
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
        Text(this.message)
      }
      .width('100%')
    }
    .height('100%')
  }
}
```
