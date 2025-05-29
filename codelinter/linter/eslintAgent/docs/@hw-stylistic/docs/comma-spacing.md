# Enforce consistent spacing before and after commas. (`comma-spacing`)

## Rule Details

Enforce consistent spacing before and after commas.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-comma-spacing-stylistic-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// A space is required after ','.
// There should be no space before ','.
let arr = [1 ,2 ,3];
```

Examples of **correct** code for this rule.

```ts
function bar(param1: string, param2: string) {}
let arr = [1, 2, 3, 4];
```
