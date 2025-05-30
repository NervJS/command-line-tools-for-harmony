---
Disallow two overloads that could be unified into one with a union or an optional/rest parameter.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_unified-signatures-{{apiVersion}}) for more details.

Function overload signatures are a TypeScript way to define a function that can be called in multiple very different ways.
Overload signatures add syntax and theoretical bloat, so it's generally best to avoid using them when possible.
Switching to union types and/or optional or rest parameters can often avoid the need for overload signatures.

This rule reports when function overload signatures can be replaced by a single function signature.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
function x(x: number): void;
function x(x: string): void;
```

```ts
function y(): void;
function y(...x: number[]): void;
```

### ✅ Correct

```ts
function x(x: number | string): void;
```

```ts
function y(...x: number[]): void;
```

```ts
// This rule won't check overload signatures with different rest parameter types.
// See https://github.com/microsoft/TypeScript/issues/5077
function f(...a: number[]): void;
function f(...a: string[]): void;
```

## Options

### `ignoreDifferentlyNamedParameters`

Examples of code for this rule with `ignoreDifferentlyNamedParameters`:

<!--tabs-->

### ❌ Incorrect

```ts option='{ "ignoreDifferentlyNamedParameters": true }'
function f(a: number): void;
function f(a: string): void;
```

### ✅ Correct

```ts option='{ "ignoreDifferentlyNamedParameters": true }'
function f(a: number): void;
function f(b: string): void;
```

## When Not To Use It

This is purely a stylistic rule to help with readability of function signature overloads.
You can turn it off if you don't want to consistently keep them next to each other and unified.

## Related To

- [`adjacent-overload-signatures`](./adjacent-overload-signatures.md)
