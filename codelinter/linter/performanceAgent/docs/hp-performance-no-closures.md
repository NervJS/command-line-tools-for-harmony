# Pass in parameters for internal variables of functions (`hp-performance-no-closures`)

## Benefits from Code Optimization
Adherence to ArkTS coding standards.

## Rule Details
Whenever possible, pass in parameters, instead of closures, as internal variables of functions. If closures are used as parameters, they are created and accessed once. 

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-performance-no-closures-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-arkts-high-performance-V5#section6500161618544) for more details.

## Examples

Examples of **incorrect** code for this rule.

``` ts
let arr = [0, 1, 2];

function foo() {
  // arr should be passed through parameters as much as possible
  return arr[0] + arr[1];
}
foo();
```

Examples of **correct** code for this rule.

``` ts
let arr = [0, 1, 2];

function foo(array: Array<number>): number {
 // arr should be passed through parameters as much as possible
  return array[0] + array[1];
}

foo(arr);
```