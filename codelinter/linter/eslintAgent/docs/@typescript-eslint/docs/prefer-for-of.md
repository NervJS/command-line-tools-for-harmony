---
Enforce the use of `for-of` loop over the standard `for` loop where possible.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_prefer-for-of-{{apiVersion}}) for more details.

Many developers default to writing `for (let i = 0; i < ...` loops to iterate over arrays.
However, in many of those arrays, the loop iterator variable (e.g. `i`) is only used to access the respective element of the array.
In those cases, a `for-of` loop is easier to read and write.

This rule recommends a for-of loop when the loop index is only used to read from an array that is being iterated.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
declare const array: string[];

for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

### ✅ Correct

```ts
declare const array: string[];

for (const x of array) {
  console.log(x);
}

for (let i = 0; i < array.length; i++) {
  // i is used, so for-of could not be used.
  console.log(i, array[i]);
}
```

<!-- Intentionally Omitted: When Not To Use It -->
