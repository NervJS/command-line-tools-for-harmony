---
Disallow `// tslint:<rule-flag>` comments.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_ban-tslint-comment-{{apiVersion}}) for more details.

Useful when migrating from TSLint to ESLint. Once TSLint has been removed, this rule helps locate TSLint annotations (e.g. `// tslint:disable`).

> See the [TSLint rule flags docs](https://palantir.github.io/tslint/usage/rule-flags) for reference.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
/* tslint:disable */
/* tslint:enable */
/* tslint:disable:rule1 rule2 rule3... */
/* tslint:enable:rule1 rule2 rule3... */
// tslint:disable-next-line
someCode(); // tslint:disable-line
// tslint:disable-next-line:rule1 rule2 rule3...
```

### ✅ Correct

```ts
// This is a comment that just happens to mention tslint
/* This is a multiline comment that just happens to mention tslint */
someCode(); // This is a comment that just happens to mention tslint
```

## When Not To Use It

If you are still using TSLint alongside ESLint.
