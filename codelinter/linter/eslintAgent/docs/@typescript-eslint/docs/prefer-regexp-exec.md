---
Enforce `RegExp#exec` over `String#match` if no global flag is provided.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_prefer-regexp-exec-{{apiVersion}}) for more details.

`String#match` is defined to work the same as `RegExp#exec` when the regular expression does not include the `g` flag.
Keeping to consistently using one of the two can help improve code readability.

This rule reports when a `String#match` call can be replaced with an equivalent `RegExp#exec`.

> `RegExp#exec` may also be slightly faster than `String#match`; this is the reason to choose it as the preferred usage.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
'something'.match(/thing/);

'some things are just things'.match(/thing/);

const text = 'something';
const search = /thing/;
text.match(search);
```

### ✅ Correct

```ts
/thing/.exec('something');

'some things are just things'.match(/thing/g);

const text = 'something';
const search = /thing/;
search.exec(text);
```

## When Not To Use It

If you prefer consistent use of `String#match` for both with `g` flag and without it, you can turn this rule off.
