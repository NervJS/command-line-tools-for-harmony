# Require spacing around infix operators. (`space-infix-ops`)

## Rule Details

Require spacing around infix operators.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-space-infix-ops-stylistic-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// Operator '=' must be spaced.
// Operator '<' must be spaced.
for (let i=0; i<10; i++) {
  console.info(`${i}`);
}
```

Examples of **correct** code for this rule.

```ts
const a = 1 + 1;

const b = a > 3 ? 0 : 1;

const c = b > 3 ? 0 : 1;

const d = a || (b && b);
```
