# Enforce consistent spacing before `function` definition opening parenthesis. (`space-before-function-paren`)

## Rule Details

Enforce consistent spacing before `function` definition opening parenthesis.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-space-before-function-paren-stylistic-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// Unexpected space before function parentheses.
function bar () {}
// Unexpected space before function parentheses.
bar  ();
```

Examples of **correct** code for this rule.

```ts
function bar() {}
bar();
```
