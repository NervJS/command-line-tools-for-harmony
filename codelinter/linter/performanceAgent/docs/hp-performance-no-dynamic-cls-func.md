# Avoid dynamically declaring functions and classes (`hp-performance-no-dynamic-cls-func`)

## Benefits from Code Optimization
Adherence to ArkTS coding standards.

## Rule Details
Whenever possible, avoid using dynamic declarations of functions and classes.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-performance-no-dynamic-cls-func-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

The methods **add** and **sub** are declared dynamically. Each time **foo** is called, the methods are recreated, which has memory and performance implications.

```ts
function foo(f: boolean, a: number, b: number): number {
  if (f) {
    function add(c: number, d: number): number {
      return c + d;
    }
    return add(a, b);
  } else {
    function sub(e: number, g: number): number {
      return e - g;
    }
    return sub(a, b);
  }
}
```
Examples of **correct** code for this rule.

```ts
function foo(f: boolean, a: number, b: number): number {
  if (f) {
    return add(a, b);
  } else {
    return sub(a, b);
  }
}

function add(c: number, d: number): number {
  return c + d;
}
function sub(e: number, g: number): number {
  return e - g;
}
```