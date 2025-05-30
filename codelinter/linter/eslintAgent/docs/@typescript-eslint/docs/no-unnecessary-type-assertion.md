---
Disallow type assertions that do not change the type of an expression.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unnecessary-type-assertion-{{apiVersion}}) for more details.

TypeScript can be told an expression is a different type than expected using `as` type assertions.
Leaving `as` assertions in the codebase increases visual clutter and harms code readability, so it's generally best practice to remove them if they don't change the type of an expression.
This rule reports when a type assertion does not change the type of an expression.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
const foo = 3;
const bar = foo!;
```

```ts
const foo = <3>3;
```

```ts
type Foo = 3;
const foo = <Foo>3;
```

```ts
type Foo = 3;
const foo = 3 as Foo;
```

```ts
function foo(x: number): number {
  return x!; // unnecessary non-null
}
```

### ✅ Correct

```ts
const foo = <number>3;
```

```ts
const foo = 3 as number;
```

```ts
const foo = 'foo' as const;
```

```ts
function foo(x: number | undefined): number {
  return x!;
}
```

## Options

### `typesToIgnore`

With `@typescript-eslint/no-unnecessary-type-assertion: ["error", { typesToIgnore: ['Foo'] }]`, the following is **correct** code:

```ts option='{ "typesToIgnore": ["Foo"] }' showPlaygroundButton
type Foo = 3;
const foo: Foo = 3;
```

## When Not To Use It

If you don't care about having no-op type assertions in your code, then you can turn off this rule.
