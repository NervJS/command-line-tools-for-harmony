---
Enforce non-null assertions over explicit type casts.
---

> See [***documentation***](link to developer.harmonyos.com) for more details.

There are two common ways to assert to TypeScript that a value is its type without `null` or `undefined`:

- `!`: Non-null assertion
- `as`: Traditional type assertion with a coincidentally equivalent type

`!` non-null assertions are generally preferred for requiring less code and being harder to fall out of sync as types change.
This rule reports when an `as` cast is doing the same job as a `!` would, and suggests fixing the code to be an `!`.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
const maybe = Math.random() > 0.5 ? '' : undefined;

const definitely = maybe as string;
const alsoDefinitely = <string>maybe;
```

### ✅ Correct

```ts
const maybe = Math.random() > 0.5 ? '' : undefined;

const definitely = maybe!;
const alsoDefinitely = maybe!;
```

## When Not To Use It

If you don't mind having unnecessarily verbose type assertions, you can avoid this rule.
