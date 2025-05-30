---
Disallow using the `delete` operator on computed key expressions.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-dynamic-delete-{{apiVersion}}) for more details.

Deleting dynamically computed keys can be dangerous and in some cases not well optimized.
Using the `delete` operator on keys that aren't runtime constants could be a sign that you're using the wrong data structures.
Using `Object`s with added and removed keys can cause occasional edge case bugs, such as if a key is named `"hasOwnProperty"`.

> Consider using a `Map` or `Set` if you’re storing collections of objects.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
// Can be replaced with the constant equivalents, such as container.aaa
delete container['aaa'];
delete container['Infinity'];

// Dynamic, difficult-to-reason-about lookups
const name = 'name';
delete container[name];
delete container[name.toUpperCase()];
```

### ✅ Correct

```ts
const container: { [i: string]: number } = {
  /* ... */
};

// Constant runtime lookups by string index
delete container.aaa;

// Constants that must be accessed by []
delete container[7];
delete container['-Infinity'];
```

## When Not To Use It

When you know your keys are safe to delete, this rule can be unnecessary.
You might consider using [ESLint disable comments](https://eslint.org/docs/latest/use/configure/rules#using-configuration-comments-1) for those specific situations instead of completely disabling this rule.

Do not consider this rule as performance advice before profiling your code's bottlenecks.
Even repeated minor performance slowdowns likely do not significantly affect your application's general perceived speed.
