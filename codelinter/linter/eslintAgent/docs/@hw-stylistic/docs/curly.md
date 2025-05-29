# Enforce consistent brace style for all control statements. (`curly`)

## Rule Details

Enforce consistent brace style for all control statements.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_curly-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
const a = 10;
if (a > 9)
  // Expected { after 'if' condition.
  console.info('hello');
else if (a > 7)
  // Expected { after 'if' condition.
  console.info('hello');
else if (a > 6)
  // Expected { after 'if' condition.
  console.info('hello');
else
  // Expected { after 'else'.
  console.info('hello');
console.info('hello');
```

Examples of **correct** code for this rule.

```ts
if (true) {
  console.info('info');
}

while (true) {
  console.info('info');
}
```
