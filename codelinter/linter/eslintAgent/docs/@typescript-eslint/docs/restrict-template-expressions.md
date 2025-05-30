---
Enforce template literal expressions to be of `string` type.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_restrict-template-expressions-{{apiVersion}}) for more details.

JavaScript automatically [converts an object to a string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion) in a string context, such as when concatenating it with a string using `+` or embedding it in a template literal using `${}`.
The default `toString()` method of objects returns `"[object Object]"`, which is often not what was intended.
This rule reports on values used in a template literal string that aren't strings, numbers, or BigInts, optionally allowing other data types that provide useful stringification results.

This rule intentionally does not allow objects with a custom `toString()` method to be used in template literals, because the stringification result may not be user-friendly.

For example, arrays have a custom [`toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) method, which only calls `join()` internally, which joins the array elements with commas. This means that (1) array elements are not necessarily stringified to useful results (2) the commas don't have spaces after them, making the result not user-friendly. The best way to format arrays is to use [`Intl.ListFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat), which even supports adding the "and" conjunction where necessary.
You must explicitly call `object.toString()` if you want to use this object in a template literal.
The [`no-base-to-string`](./no-base-to-string.md) rule can be used to guard this case against producing `"[object Object]"` by accident.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
const arg1 = [1, 2];
const msg1 = `arg1 = ${arg1}`;

const arg2 = { name: 'Foo' };
const msg2 = `arg2 = ${arg2 || null}`;
```

### ✅ Correct

```ts
const arg = 'foo';
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || 'default'}`;

const stringWithKindProp: string & { _kind?: 'MyString' } = 'foo';
const msg3 = `stringWithKindProp = ${stringWithKindProp}`;
```

## Options

### `allowNumber`

Examples of additional **correct** code for this rule with `{ allowNumber: true }`:

```ts option='{ "allowNumber": true }' showPlaygroundButton
const arg = 123;
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || 'zero'}`;
```

This option controls both numbers and BigInts.

### `allowBoolean`

Examples of additional **correct** code for this rule with `{ allowBoolean: true }`:

```ts option='{ "allowBoolean": true }' showPlaygroundButton
const arg = true;
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || 'not truthy'}`;
```

### `allowAny`

Examples of additional **correct** code for this rule with `{ allowAny: true }`:

```ts option='{ "allowAny": true }' showPlaygroundButton
const user = JSON.parse('{ "name": "foo" }');
const msg1 = `arg = ${user.name}`;
const msg2 = `arg = ${user.name || 'the user with no name'}`;
```

### `allowNullish`

Examples of additional **correct** code for this rule with `{ allowNullish: true }`:

```ts option='{ "allowNullish": true }' showPlaygroundButton
const arg = condition ? 'ok' : null;
const msg1 = `arg = ${arg}`;
```

### `allowRegExp`

Examples of additional **correct** code for this rule with `{ allowRegExp: true }`:

```ts option='{ "allowRegExp": true }' showPlaygroundButton
const arg = new RegExp('foo');
const msg1 = `arg = ${arg}`;
```

```ts option='{ "allowRegExp": true }' showPlaygroundButton
const arg = /foo/;
const msg1 = `arg = ${arg}`;
```

### `allowNever`

Examples of additional **correct** code for this rule with `{ allowNever: true }`:

```ts option='{ "allowNever": true }' showPlaygroundButton
const arg = 'something';
const msg1 = typeof arg === 'string' ? arg : `arg = ${arg}`;
```

## When Not To Use It

If you're not worried about incorrectly stringifying non-string values in template literals, then you likely don't need this rule.

## Related To

- [`no-base-to-string`](./no-base-to-string.md)
- [`restrict-plus-operands`](./restrict-plus-operands.md)
