---
Require or disallow an empty line between class members.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_lines-between-class-members-{{apiVersion}}) for more details.

This rule extends the base [`eslint/lines-between-class-members`](https://eslint.org/docs/rules/lines-between-class-members) rule.
It adds support for ignoring overload methods in a class.

## Options

In addition to the options supported by the `lines-between-class-members` rule in ESLint core, the rule adds the following options:

- Object option:

  - `"exceptAfterOverload": true` (default) - Skip checking empty lines after overload class members
  - `"exceptAfterOverload": false` - **do not** skip checking empty lines after overload class members

- [See the other options allowed](https://github.com/eslint/eslint/blob/main/docs/rules/lines-between-class-members.md#options)

### `exceptAfterOverload: true`

Examples of **correct** code for the `{ "exceptAfterOverload": true }` option:

```ts option='"always", { "exceptAfterOverload": true }' showPlaygroundButton
class foo {
  bar(a: string): void;
  bar(a: string, b: string): void;
  bar(a: string, b: string) {}

  baz() {}

  qux() {}
}
```

### `exceptAfterOverload: false`

Examples of **correct** code for the `{ "exceptAfterOverload": false }` option:

```ts option='"always", { "exceptAfterOverload": false }' showPlaygroundButton
class foo {
  bar(a: string): void;

  bar(a: string, b: string): void;

  bar(a: string, b: string) {}

  baz() {}

  qux() {}
}
```
