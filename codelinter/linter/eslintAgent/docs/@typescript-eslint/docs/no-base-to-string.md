---
Require `.toString()` to only be called on objects which provide useful information when stringified.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-base-to-string-{{apiVersion}}) for more details.

JavaScript will call `toString()` on an object when it is converted to a string, such as when `+` adding to a string or in `${}` template literals.
The default Object `.toString()` returns `"[object Object]"`, which is often not what was intended.
This rule reports on stringified values that aren't primitives and don't define a more useful `.toString()` method.

> Note that `Function` provides its own `.toString()` that returns the function's code.
> Functions are not flagged by this rule.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
// Passing an object or class instance to string concatenation:
'' + {};

class MyClass {}
const value = new MyClass();
value + '';

// Interpolation and manual .toString() calls too:
`Value: ${value}`;
({}).toString();
```

### ✅ Correct

```ts
// These types all have useful .toString()s
'Text' + true;
`Value: ${123}`;
`Arrays too: ${[1, 2, 3]}`;
(() => {}).toString();

// Defining a custom .toString class is considered acceptable
class CustomToString {
  toString() {
    return 'Hello, world!';
  }
}
`Value: ${new CustomToString()}`;

const literalWithToString = {
  toString: () => 'Hello, world!',
};

`Value: ${literalWithToString}`;
```

## Options

### `ignoredTypeNames`

A string array of type names to ignore, this is useful for types missing `toString()` (but actually has `toString()`).
There are some types missing `toString()` in old version TypeScript, like `RegExp`, `URL`, `URLSearchParams` etc.

The following patterns are considered correct with the default options `{ ignoredTypeNames: ["RegExp"] }`:

```ts option='{ "ignoredTypeNames": ["RegExp"] }' showPlaygroundButton
`${/regex/}`;
'' + /regex/;
/regex/.toString();
let value = /regex/;
value.toString();
let text = `${value}`;
```

## When Not To Use It

If you don't mind a risk of `"[object Object]"` or incorrect type coercions in your values, then you will not need this rule.

## Related To

- [`restrict-plus-operands`](./restrict-plus-operands.md)
- [`restrict-template-expressions`](./restrict-template-expressions.md)

## Further Reading

- [`Object.prototype.toString()` MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)
