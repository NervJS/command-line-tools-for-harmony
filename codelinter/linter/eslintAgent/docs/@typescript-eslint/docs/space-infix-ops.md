---
Require spacing around infix operators.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_space-infix-ops-{{apiVersion}}) for more details.

This rule extends the base [`eslint/space-infix-ops`](https://eslint.org/docs/rules/space-infix-ops) rule.
It adds support for enum members.

```ts
enum MyEnum {
  KEY = 'value',
}
```
