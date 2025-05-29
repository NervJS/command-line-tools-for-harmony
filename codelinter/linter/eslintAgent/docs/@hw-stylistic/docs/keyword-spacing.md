# Enforce consistent spacing before and after keywords. (`keyword-spacing`)

## Rule Details

Enforce consistent spacing before and after keywords.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-keyword-spacing-stylistic-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// Expected space after 'if'.
if(true) {
  console.info('hello');
// Expected space before 'else'.
// Expected space after 'if'.
}else if(false) {
  console.info('hello');
// Expected space before 'else'.
// Expected space after 'else'.
}else{
  console.info('hello');
}
```

Examples of **correct** code for this rule.

```ts
if (true) {
  console.info('hello');
}

for (let item in [1, 2, 3]) {
  console.info(`${item}`);
}
```
