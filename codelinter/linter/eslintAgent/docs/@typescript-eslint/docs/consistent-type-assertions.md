---
Enforce consistent usage of type assertions.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_consistent-type-assertions-{{apiVersion}}) for more details.

TypeScript provides two syntaxes for "type assertions":

- Angle brackets: `<Type>value`
- As: `value as Type`

This rule aims to standardize the use of type assertion style across the codebase.
Keeping to one syntax consistently helps with code readability.

Type assertions are also commonly referred as "type casting" in TypeScript.
However, that term is technically slightly different to what is understood by type casting in other languages.
Type assertions are a way to say to the TypeScript compiler, _"I know better than you, it's actually this different type!"_.

[`const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) are always allowed by this rule.
Examples of them include `let x = "hello" as const;` and `let x = <const>"hello";`.

## Options

### `assertionStyle`

This option defines the expected assertion style. Valid values for `assertionStyle` are:

- `as` will enforce that you always use `... as foo`.
- `angle-bracket` will enforce that you always use `<foo>...`
- `never` will enforce that you do not do any type assertions.

Most codebases will want to enforce not using `angle-bracket` style because it conflicts with JSX syntax, and is confusing when paired with generic syntax.

Some codebases like to go for an extra level of type safety, and ban assertions altogether via the `never` option.

### `objectLiteralTypeAssertions`

Always prefer `const x: T = { ... };` to `const x = { ... } as T;` (or similar with angle brackets). The type assertion in the latter case is either unnecessary or will probably hide an error.

The compiler will warn for excess properties with this syntax, but not missing _required_ fields. For example: `const x: { foo: number } = {};` will fail to compile, but `const x = {} as { foo: number }` will succeed.

The const assertion `const x = { foo: 1 } as const`, introduced in TypeScript 3.4, is considered beneficial and is ignored by this option.

Assertions to `any` are also ignored by this option.

Examples of code for `{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "assertionStyle": "as", "objectLiteralTypeAssertions": "never" }'
const x = { foo: 1 } as T;

function bar() {
  return { foo: 1 } as T;
}
```

#### ✅ Correct

```ts option='{ "assertionStyle": "as", "objectLiteralTypeAssertions": "never" }'
const x: T = { foo: 1 };
const y = { foo: 1 } as any;
const z = { foo: 1 } as unknown;

function bar(): T {
  return { foo: 1 };
}
```

<!--/tabs-->

Examples of code for `{ assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }`:

<!--tabs-->

#### ❌ Incorrect

```ts option='{ "assertionStyle": "as", "objectLiteralTypeAssertions": "allow-as-parameter" }'
const x = { foo: 1 } as T;

function bar() {
  return { foo: 1 } as T;
}
```

#### ✅ Correct

```tsx option='{ "assertionStyle": "as", "objectLiteralTypeAssertions": "allow-as-parameter" }'
const x: T = { foo: 1 };
const y = { foo: 1 } as any;
const z = { foo: 1 } as unknown;
bar({ foo: 1 } as T);
new Clazz({ foo: 1 } as T);
function bar() {
  throw { foo: 1 } as Foo;
}
const foo = <Foo props={{ bar: 1 } as Bar} />;
```

<!--/tabs-->

## When Not To Use It

If you do not want to enforce consistent type assertions.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
