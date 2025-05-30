---
Disallow unnecessary namespace qualifiers.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unnecessary-qualifier-{{apiVersion}}) for more details.

Members of TypeScript enums and namespaces are generally retrieved as qualified property lookups: e.g. `Enum.member`.
However, when accessed within their parent enum or namespace, the qualifier is unnecessary: e.g. just `member` instead of `Enum.member`.
This rule reports when an enum or namespace qualifier is unnecessary.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
enum A {
  B,
  C = A.B,
}
```

```ts
namespace A {
  export type B = number;
  const x: A.B = 3;
}
```

### ✅ Correct

```ts
enum A {
  B,
  C = B,
}
```

```ts
namespace A {
  export type B = number;
  const x: B = 3;
}
```

## When Not To Use It

If you explicitly prefer to use fully qualified names, such as for explicitness, then you don't need to use this rule.
