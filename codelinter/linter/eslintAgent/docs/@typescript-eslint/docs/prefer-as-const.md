---
Enforce the use of `as const` over literal type.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_prefer-as-const-{{apiVersion}}) for more details.

There are two common ways to tell TypeScript that a literal value should be interpreted as its literal type (e.g. `2`) rather than general primitive type (e.g. `number`);

- `as const`: telling TypeScript to infer the literal type automatically
- `as` with the literal type: explicitly telling the literal type to TypeScript

`as const` is generally preferred, as it doesn't require re-typing the literal value.
This rule reports when an `as` with an explicit literal type can be replaced with an `as const`.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
let bar: 2 = 2;
let foo = <'bar'>'bar';
let foo = { bar: 'baz' as 'baz' };
```

### ✅ Correct

```ts
let foo = 'bar';
let foo = 'bar' as const;
let foo: 'bar' = 'bar' as const;
let bar = 'bar' as string;
let foo = <string>'bar';
let foo = { bar: 'baz' };
```

<!--/tabs-->

## When Not To Use It

If you don't care about which style of literals assertions is used in your code, then you will not need this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
