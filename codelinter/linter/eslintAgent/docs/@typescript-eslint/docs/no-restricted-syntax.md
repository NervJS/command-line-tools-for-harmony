---
Disallow specified syntax.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-restricted-syntax-{{apiVersion}}) for more details.

## Examples

This rule extends the base [`eslint/no-restricted-syntax`](https://eslint.org/docs/rules/no-restricted-syntax) rule.

## Options

This rule takes a list of strings, where each string is an AST selector:

```jsonc
"@typescript-eslint/no-restricted-syntax": ["error", "FunctionExpression", "WithStatement", "BinaryExpression[operator='in']"]
```

Alternatively, the rule also accepts objects, where the selector and an optional custom message are specified:

```jsonc
"no-restricted-syntax": [
    "error",
    {
        "selector": "CallExpression[callee.name='foo']",
        "message": "Function calls named 'foo' are not allowed."
    },
    {
        "selector": "CallExpression[callee.type='MemberExpression'][callee.object.name='hilog']",
        "message": "Hilog is not allowed."
    }
]
```

Examples of codes for this rule with the `CallExpression[callee.name='foo']` options:

### ❌ Incorrect

```ts
function foo() {}
// Function calls named 'foo' are not allowed.
foo();
```

### ✅ Correct

```ts
function bar() {}

bar();
```

Examples of codes for this rule with the `CallExpression[callee.type='MemberExpression'][callee.object.name='hilog']` options:

### ❌ Incorrect

```ts
import hilog from '@ohos.hilog';

// Hilog is not allowed.
hilog.info(0x0000, 'testTag', '%{public}s');
```

### ✅ Correct

```ts
import log from 'util';

log.info('log');
```
