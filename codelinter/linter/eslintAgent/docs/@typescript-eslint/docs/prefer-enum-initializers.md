---
Require each enum member value to be explicitly initialized.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_prefer-enum-initializers-{{apiVersion}}) for more details.

TypeScript `enum`s are a practical way to organize semantically related constant values.
Members of `enum`s that don't have explicit values are by default given sequentially increasing numbers.

In projects where the value of `enum` members are important, allowing implicit values for enums can cause bugs if `enum`s are modified over time.

This rule recommends having each `enum` member value explicitly initialized.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
enum Status {
  Open = 1,
  Close,
}

enum Direction {
  Up,
  Down,
}

enum Color {
  Red,
  Green = 'Green',
  Blue = 'Blue',
}
```

### ✅ Correct

```ts
enum Status {
  Open = 'Open',
  Close = 'Close',
}

enum Direction {
  Up = 1,
  Down = 2,
}

enum Color {
  Red = 'Red',
  Green = 'Green',
  Blue = 'Blue',
}
```

## When Not To Use It

If you don't care about `enum`s having implicit values you can safely disable this rule.
