# This rule validates the value of responseRegion. (`touch-target-size`)

## Rule Details

The value of responseRegion, specifying the touch target of an interactive UI element or component, should be at least 40 vp x 40 vp (mandatory) or 48 vp x 48 vp (recommended).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_touch-target-size-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  build() {
    Row() {
        Text(this.message).responseRegion({width: 27, height: 40})
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
        Text(this.message).responseRegion({width: 40, height: 40})
    }
  }
}
```
