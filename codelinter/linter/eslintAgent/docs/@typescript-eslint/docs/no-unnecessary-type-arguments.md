---
Disallow type arguments that are equal to the default.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unnecessary-type-arguments-{{apiVersion}}) for more details.

Type parameters in TypeScript may specify a default value.
For example:

```ts
function f<T = number>(/* ... */) {
  // ...
}
```

It is redundant to provide an explicit type parameter equal to that default: e.g. calling `f<number>(...)`.
This rule reports when an explicitly specified type argument is the default for that type parameter.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
function f<T = number>() {}
f<number>();
```

```ts
function g<T = number, U = string>() {}
g<string, string>();
```

```ts
class C<T = number> {}
new C<number>();

class D extends C<number> {}
```

```ts
interface I<T = number> {}
class Impl implements I<number> {}
```

### ✅ Correct

```ts
function f<T = number>() {}
f();
f<string>();
```

```ts
function g<T = number, U = string>() {}
g<string>();
g<number, number>();
```

```ts
class C<T = number> {}
new C();
new C<string>();

class D extends C {}
class D extends C<string> {}
```

```ts
interface I<T = number> {}
class Impl implements I<string> {}
```

## When Not To Use It

If you prefer explicitly specifying type parameters even when they are equal to the default, you can skip this rule.
