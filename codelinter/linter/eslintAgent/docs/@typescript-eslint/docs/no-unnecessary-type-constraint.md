---
Disallow unnecessary constraints on generic types.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unnecessary-type-constraint-{{apiVersion}}) for more details.

Generic type parameters (`<T>`) in TypeScript may be "constrained" with an [`extends` keyword](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints).
When no `extends` is provided, type parameters default a constraint to `unknown`.
It is therefore redundant to `extend` from `any` or `unknown`.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
interface FooAny<T extends any> {}

interface FooUnknown<T extends unknown> {}

type BarAny<T extends any> = {};

type BarUnknown<T extends unknown> = {};

class BazAny<T extends any> {
  quxAny<U extends any>() {}
}

const QuuxAny = <T extends any>() => {};

function QuuzAny<T extends any>() {}
```

### ✅ Correct

```ts
interface Foo<T> {}

type Bar<T> = {};

class Baz<T> {
  qux<U>() {}
}

const Quux = <T>() => {};

function Quuz<T>() {}
```

## When Not To Use It

If you don't care about the specific styles of your type constraints, or never use them in the first place, then you will not need this rule.
