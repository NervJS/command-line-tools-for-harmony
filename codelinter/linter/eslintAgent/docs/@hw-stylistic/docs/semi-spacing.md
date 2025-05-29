# Enforce consistent spacing before semicolons. (`semi-spacing`)

## Rule Details

Enforce consistent spacing before semicolons.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_semi-spacing-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// Unexpected whitespace before semicolon.
for (let a = 0 ; a < 10  ; a++) {
  break ;
}
```

Examples of **correct** code for this rule.

```ts
const a = 10;

for (let a = 0; a < 10; a++) {
  break;
}

class C {
  name: string = 'hello';
}
```
