# The variable declaration should declare only one variable. (`one-var-declaration-per-line`)

## Rule Details

The variable declaration should declare only one variable.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_one-var-declaration-per-line-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// Split 'let' declarations into multiple statements.
let a, b;
```

Examples of **correct** code for this rule.

```ts
let a;
let b;

const c;
const d;

let e;
let f;
```
