---
Disallow non-null assertions after an optional chain expression.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-non-null-asserted-optional-chain-{{apiVersion}}) for more details.

`?.` optional chain expressions provide `undefined` if an object is `null` or `undefined`.
Using a `!` non-null assertion to assert the result of an `?.` optional chain expression is non-nullable is likely wrong.

> Most of the time, either the object was not nullable and did not need the `?.` for its property lookup, or the `!` is incorrect and introducing a type safety hole.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
foo?.bar!;
foo?.bar()!;
```

### ✅ Correct

```ts
foo?.bar;
foo?.bar();
```

## When Not To Use It

If your project's types don't yet fully describe whether certain values may be nullable, such as if you're transitioning to `strictNullChecks`, this rule might create many false reports.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

- [TypeScript 3.7 Release Notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html)
- [Optional Chaining Proposal](https://github.com/tc39/proposal-optional-chaining/)
