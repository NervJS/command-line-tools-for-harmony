---
Disallow returning a value with type `any` from a function.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-return-{{apiVersion}}) for more details.

The `any` type in TypeScript is a dangerous "escape hatch" from the type system.
Using `any` disables many type checking rules and is generally best used only as a last resort or when prototyping code.

Despite your best intentions, the `any` type can sometimes leak into your codebase.
Returning an an `any`-typed value from a function creates a potential type safety hole and source of bugs in your codebase.

This rule disallows returning `any` or `any[]` from a function.

This rule also compares generic type argument types to ensure you don't return an unsafe `any` in a generic position to a function that's expecting a specific type.
For example, it will error if you return `Set<any>` from a function declared as returning `Set<string>`.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
function foo1() {
  return 1 as any;
}
function foo2() {
  return Object.create(null);
}
const foo3 = () => {
  return 1 as any;
};
const foo4 = () => Object.create(null);

function foo5() {
  return [] as any[];
}
function foo6() {
  return [] as Array<any>;
}
function foo7() {
  return [] as readonly any[];
}
function foo8() {
  return [] as Readonly<any[]>;
}
const foo9 = () => {
  return [] as any[];
};
const foo10 = () => [] as any[];

const foo11 = (): string[] => [1, 2, 3] as any[];

// generic position examples
function assignability1(): Set<string> {
  return new Set<any>([1]);
}
type TAssign = () => Set<string>;
const assignability2: TAssign = () => new Set<any>([true]);
```

### ✅ Correct

```ts
function foo1() {
  return 1;
}
function foo2() {
  return Object.create(null) as Record<string, unknown>;
}

const foo3 = () => [];
const foo4 = () => ['a'];

function assignability1(): Set<string> {
  return new Set<string>(['foo']);
}
type TAssign = () => Set<string>;
const assignability2: TAssign = () => new Set(['foo']);
```

<!--/tabs-->

There are cases where the rule allows to return `any` to `unknown`.

Examples of `any` to `unknown` return that are allowed:

```ts showPlaygroundButton
function foo1(): unknown {
  return JSON.parse(singleObjString); // Return type for JSON.parse is any.
}

function foo2(): unknown[] {
  return [] as any[];
}
```

## When Not To Use It

If your codebase has many existing `any`s or areas of unsafe code, it may be difficult to enable this rule.
It may be easier to skip the `no-unsafe-*` rules pending increasing type safety in unsafe areas of your project.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

## Related To

- [`no-explicit-any`](./no-explicit-any.md)
- [`no-unsafe-argument`](./no-unsafe-argument.md)
- [`no-unsafe-assignment`](./no-unsafe-assignment.md)
- [`no-unsafe-call`](./no-unsafe-call.md)
- [`no-unsafe-member-access`](./no-unsafe-member-access.md)
