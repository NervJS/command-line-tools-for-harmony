---
Disallow usage of the implicit `any` type in catch clauses.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-implicit-any-catch-{{apiVersion}}) for more details.

TypeScript 4.0 added support for adding an explicit `any` or `unknown` type annotation on a catch clause variable.

By default, TypeScript will type a catch clause variable as `any`, so explicitly annotating it as `unknown` can add a lot of safety to your codebase.

The `noImplicitAny` flag in TypeScript does not cover this for backwards compatibility reasons, however you can use `useUnknownInCatchVariables` (part of `strict`) instead of this rule.

## DEPRECATED

## Examples

This rule requires an explicit type to be declared on a catch clause variable.

<!--tabs-->

### ❌ Incorrect

```ts
try {
  // ...
} catch (e) {
  // ...
}
```

### ✅ Correct

<!-- TODO: prettier currently removes the type annotations, re-enable this once prettier is updated -->
<!-- prettier-ignore-start -->

```ts
try {
  // ...
} catch (e: unknown) {
  // ...
}
```

<!-- prettier-ignore-end -->

## Options

### `allowExplicitAny`

The follow is is **_not_** considered a warning with `{ allowExplicitAny: true }`

```ts
try {
  // ...
} catch (e: any) {
  // ...
}
```

## When Not To Use It

If you are not using TypeScript 4.0 (or greater), then you will not be able to use this rule, annotations on catch clauses is not supported.

## Further Reading

- [TypeScript 4.0 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-4-0/#unknown-on-catch)
