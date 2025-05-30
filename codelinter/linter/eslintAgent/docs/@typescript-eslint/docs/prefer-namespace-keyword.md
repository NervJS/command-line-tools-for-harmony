---
Require using `namespace` keyword over `module` keyword to declare custom TypeScript modules.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_prefer-namespace-keyword-{{apiVersion}}) for more details.

TypeScript historically allowed a form of code organization called "custom modules" (`module Example {}`), later renamed to "namespaces" (`namespace Example`).

Namespaces are an outdated way to organize TypeScript code.
ES2015 module syntax is now preferred (`import`/`export`).

For projects still using custom modules / namespaces, it's preferred to refer to them as namespaces.
This rule reports when the `module` keyword is used instead of `namespace`.

> This rule does not report on the use of TypeScript module declarations to describe external APIs (`declare module 'foo' {}`).

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
module Example {}
```

### ✅ Correct

```ts
namespace Example {}

declare module 'foo' {}
```

<!--/tabs-->

## When Not To Use It

If you are not using TypeScript's older `module`/`namespace` keywords, then you will not need this rule.

## Further Reading

- [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)
