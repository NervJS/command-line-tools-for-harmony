---
Require or disallow trailing commas.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_comma-dangle-{{apiVersion}}) for more details.

This rule extends the base [`eslint/comma-dangle`](https://eslint.org/docs/rules/comma-dangle) rule.
It adds support for TypeScript syntax.

See the [ESLint documentation](https://eslint.org/docs/rules/comma-dangle) for more details on the `comma-dangle` rule.

## Options

In addition to the options supported by the `comma-dangle` rule in ESLint core, the rule adds the following options:

- `"enums"` is for trailing comma in enum. (e.g. `enum Foo = {Bar,}`)
- `"generics"` is for trailing comma in generic. (e.g. `function foo<T,>() {}`)
- `"tuples"` is for trailing comma in tuple. (e.g. `type Foo = [string,]`)
