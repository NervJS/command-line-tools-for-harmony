# Enforce a maximum line length. (`max-len`)

## Rule Details

Enforce a maximum line length.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_max-len-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// This line has a length of 126. Maximum allowed is 120.
let longLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongLongName = 10;
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
struct Index {
  message: string = 'hello';

  build() {
    Text(this.message)
  }
}
```
