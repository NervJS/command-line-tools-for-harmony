# This rule ensures that there is no resolvable path back to this module via its dependencies. (`no-cycle`)

## Rule Details

This rule ensures that there is no resolvable path back to this module via its dependencies.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-cycle-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// Foo.ets
import {} from './Bar.ets';

// Bar.ets
import {} from './Foo.ets';
```

Examples of **correct** code for this rule.

```ts
// Foo.ets
import {} from './Bar.ets';

// Bar.ets
import {} from './Foo1.ets';
```

## When Not To Use It

This rule is comparatively computationally expensive. If you are pressed for lint time, or don't think you have an issue with dependency cycles, you may not want this rule enabled.
