---
Enforce consistent spacing before blocks.
---

> See [***documentation***](link to developer.harmonyos.com) for more details.

This rule extends the base [`eslint/space-before-blocks`](https://eslint.org/docs/rules/space-before-blocks) rule.
It adds support for interfaces and enums.

<!-- tabs -->

### ❌ Incorrect

<!-- prettier-ignore -->
```ts
enum Breakpoint{
  Large,
  Medium,
}

interface State{
  currentBreakpoint: Breakpoint;
}
```

### ✅ Correct

```ts
enum Breakpoint {
  Large,
  Medium,
}

interface State {
  currentBreakpoint: Breakpoint;
}
```

## Options

In case a more specific options object is passed these blocks will follow `classes` configuration option.
