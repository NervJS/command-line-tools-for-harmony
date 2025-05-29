# Enforce consistent line break style for operators. (`operator-linebreak`)

## Rule Details

Enforce consistent line break style for operators.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_operator-linebreak-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
let a = 10;
if (a > 10
  // '||' should be placed at the end of the line.
  || a < 5) {
  console.info('hello');
}
```

Examples of **correct** code for this rule.

```ts
let a = 10;
if (a > 10) {
  console.info('hello');
}

let b = 10;
if (b >
 10) {
  console.info('hello');
}
```
