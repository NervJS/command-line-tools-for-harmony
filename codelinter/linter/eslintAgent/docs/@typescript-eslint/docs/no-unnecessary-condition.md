---
Disallow conditionals where the type is always truthy or always falsy.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unnecessary-condition-{{apiVersion}}) for more details.

Any expression being used as a condition must be able to evaluate as truthy or falsy in order to be considered "necessary".
Conversely, any expression that always evaluates to truthy or always evaluates to falsy, as determined by the type of the expression, is considered unnecessary and will be flagged by this rule.

The following expressions are checked:

- Arguments to the `&&`, `||` and `?:` (ternary) operators
- Conditions for `if`, `for`, `while`, and `do-while` statements
- Base values of optional chain expressions

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
function head<T>(items: T[]) {
  // items can never be nullable, so this is unnecessary
  if (items) {
    return items[0].toUpperCase();
  }
}

function foo(arg: 'bar' | 'baz') {
  // arg is never nullable or empty string, so this is unnecessary
  if (arg) {
  }
}

function bar<T>(arg: string) {
  // arg can never be nullish, so ?. is unnecessary
  return arg?.length;
}

// Checks array predicate return types, where possible
[
  [1, 2],
  [3, 4],
].filter(t => t); // number[] is always truthy
```

### ✅ Correct

```ts
function head<T>(items: T[]) {
  // Necessary, since items.length might be 0
  if (items.length) {
    return items[0].toUpperCase();
  }
}

function foo(arg: string) {
  // Necessary, since foo might be ''.
  if (arg) {
  }
}

function bar(arg?: string | null) {
  // Necessary, since arg might be nullish
  return arg?.length;
}

[0, 1, 2, 3].filter(t => t); // number can be truthy or falsy
```

## Options

### `allowConstantLoopConditions`

Example of correct code for `{ allowConstantLoopConditions: true }`:

```ts option='{ "allowConstantLoopConditions": true }' showPlaygroundButton
while (true) {}
for (; true; ) {}
do {} while (true);
```

### `allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing`

If this is set to `false`, then the rule will error on every file whose `tsconfig.json` does _not_ have the `strictNullChecks` compiler option (or `strict`) set to `true`.

Without `strictNullChecks`, TypeScript essentially erases `undefined` and `null` from the types. This means when this rule inspects the types from a variable, **it will not be able to tell that the variable might be `null` or `undefined`**, which essentially makes this rule useless.

You should be using `strictNullChecks` to ensure complete type-safety in your codebase.

If for some reason you cannot turn on `strictNullChecks`, but still want to use this rule - you can use this option to allow it - but know that the behavior of this rule is _undefined_ with the compiler option turned off. We will not accept bug reports if you are using this option.

## When Not To Use It

If your project is not accurately typed, such as if it's in the process of being converted to TypeScript or is susceptible to [trade-offs in control flow analysis](https://github.com/Microsoft/TypeScript/issues/9998), it may be difficult to enable this rule for particularly non-type-safe areas of code.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

This rule has a known edge case of triggering on conditions that were modified within function calls (as side effects).
It is due to limitations of TypeScript's type narrowing.
See [#9998](https://github.com/microsoft/TypeScript/issues/9998) for details.
We recommend using a [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) in those cases.

```ts
let condition = false as boolean;

const f = () => (condition = true);
f();

if (condition) {
}
```

## Related To

- ESLint: [no-constant-condition](https://eslint.org/docs/rules/no-constant-condition) - `no-unnecessary-condition` is essentially a stronger version of `no-constant-condition`, but requires type information.
- [strict-boolean-expressions](./strict-boolean-expressions.md) - a more opinionated version of `no-unnecessary-condition`. `strict-boolean-expressions` enforces a specific code style, while `no-unnecessary-condition` is about correctness.
