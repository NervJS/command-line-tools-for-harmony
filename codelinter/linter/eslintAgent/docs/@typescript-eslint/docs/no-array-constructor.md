---
Disallow generic `Array` constructors.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-array-constructor-{{apiVersion}}) for more details.

This rule extends the base [`eslint/no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor) rule.
It adds support for the generically typed `Array` constructor (`new Array<Foo>()`).

<!--tabs-->

### ❌ Incorrect

```ts
Array(0, 1, 2);
new Array(0, 1, 2);
```

### ✅ Correct

```ts
Array<number>(0, 1, 2);
new Array<Foo>(x, y, z);

Array(500);
new Array(someOtherArray.length);
```
