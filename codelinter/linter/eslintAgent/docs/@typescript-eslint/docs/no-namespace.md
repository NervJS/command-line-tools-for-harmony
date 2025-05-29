---
Disallow TypeScript namespaces.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-namespace-{{apiVersion}}) for more details.

TypeScript historically allowed a form of code organization called "custom modules" (`module Example {}`), later renamed to "namespaces" (`namespace Example`).
Namespaces are an outdated way to organize TypeScript code.
ES2015 module syntax is now preferred (`import`/`export`).

> This rule does not report on the use of TypeScript module declarations to describe external APIs (`declare module 'foo' {}`).

## Examples

Examples of code with the default options:

<!--tabs-->

### ❌ Incorrect

```ts
module foo {}
namespace foo {}

declare module foo {}
declare namespace foo {}
```

### ✅ Correct

```ts
declare module 'foo' {}

// anything inside a d.ts file
```

<!--/tabs-->

## Options

### `allowDeclarations`

Examples of code with the `{ "allowDeclarations": true }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowDeclarations": true }'
module foo {}
namespace foo {}
```

#### ✅ Correct

```ts option='{ "allowDeclarations": true }'
declare module 'foo' {}
declare module foo {}
declare namespace foo {}

declare global {
  namespace foo {}
}

declare module foo {
  namespace foo {}
}
```

<!--/tabs-->

Examples of code for the `{ "allowDeclarations": false }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowDeclarations": false }'
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

#### ✅ Correct

```ts option='{ "allowDeclarations": false }'
declare module 'foo' {}
```

### `allowDefinitionFiles`

Examples of code for the `{ "allowDefinitionFiles": true }` option:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "allowDefinitionFiles": true }'
// if outside a d.ts file
module foo {}
namespace foo {}

// if outside a d.ts file and allowDeclarations = false
module foo {}
namespace foo {}
declare module foo {}
declare namespace foo {}
```

#### ✅ Correct

```ts option='{ "allowDefinitionFiles": true }'
declare module 'foo' {}

// anything inside a d.ts file
```

## When Not To Use It

If your project was architected before modern modules and namespaces, it may be difficult to migrate off of namespaces.
In that case you may not be able to use this rule for parts of your project.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Further Reading

- [Modules](https://www.typescriptlang.org/docs/handbook/modules.html)
- [Namespaces](https://www.typescriptlang.org/docs/handbook/namespaces.html)
- [Namespaces and Modules](https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html)
