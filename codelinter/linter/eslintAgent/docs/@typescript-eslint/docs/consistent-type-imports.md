---
Enforce consistent usage of type imports.
---

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_consistent-type-imports-{{apiVersion}}) for more details.

TypeScript allows specifying a `type` keyword on imports to indicate that the export exists only in the type system, not at runtime.
This allows transpilers to drop imports without knowing the types of the dependencies.

> See [Blog > Consistent Type Exports and Imports: Why and How](/blog/consistent-type-imports-and-exports-why-and-how) for more details.

## Options

### `prefer`

This option defines the expected import kind for type-only imports. Valid values for `prefer` are:

- `type-imports` will enforce that you always use `import type Foo from '...'` except referenced by metadata of decorators. It is the default.
- `no-type-imports` will enforce that you always use `import Foo from '...'`.

Examples of **correct** code with `{prefer: 'type-imports'}`, and **incorrect** code with `{prefer: 'no-type-imports'}`.

```ts option='{ "prefer": "type-imports" }' showPlaygroundButton
import type { Foo } from 'Foo';
import type Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

Examples of **incorrect** code with `{prefer: 'type-imports'}`, and **correct** code with `{prefer: 'no-type-imports'}`.

```ts option='{ "prefer": "type-imports" }' showPlaygroundButton
import { Foo } from 'Foo';
import Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

### `fixStyle`

This option defines the expected type modifier to be added when an import is detected as used only in the type position. Valid values for `fixStyle` are:

- `separate-type-imports` will add the type keyword after the import keyword `import type { A } from '...'`. It is the default.
- `inline-type-imports` will inline the type keyword `import { type A } from '...'` and is only available in TypeScript 4.5 and onwards. See [documentation here](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#type-modifiers-on-import-names 'TypeScript 4.5 documentation on type modifiers and import names').

<!--tabs-->

#### ❌ Incorrect

```ts
import { Foo } from 'Foo';
import Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

#### ✅ With `separate-type-imports`

```ts option='{ "fixStyle": "separate-type-imports" }'
import type { Foo } from 'Foo';
import type Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

#### ✅ With `inline-type-imports`

```ts option='{ "fixStyle": "inline-type-imports" }'
import { type Foo } from 'Foo';
import type Bar from 'Bar';
type T = Foo;
const x: Bar = 1;
```

<!--tabs-->

### `disallowTypeAnnotations`

If `true`, type imports in type annotations (`import()`) are not allowed.
Default is `true`.

Examples of **incorrect** code with `{disallowTypeAnnotations: true}`:

```ts option='{ "disallowTypeAnnotations": true }' showPlaygroundButton
type T = import('Foo').Foo;
const x: import('Bar') = 1;
```

## Usage with `emitDecoratorMetadata`

The `emitDecoratorMetadata` compiler option changes the code the TypeScript emits. In short - it causes TypeScript to create references to value imports when they are used in a type-only location. If you are using `emitDecoratorMetadata` then our tooling will require additional information in order for the rule to work correctly.

If you are using [type-aware linting](https://typescript-eslint.io/linting/typed-linting), then you just need to ensure that the `tsconfig.json` you've configured for `parserOptions.project` has `emitDecoratorMetadata` turned on. Otherwise you can explicitly tell our tooling to analyze your code as if the compiler option was turned on [by setting `parserOptions.emitDecoratorMetadata` to `true`](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/parser/README.md#parseroptionsemitdecoratormetadata).

## When Not To Use It

If you specifically want to use both import kinds for stylistic reasons, or don't wish to enforce one style over the other, you can avoid this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.

## Related To

- [`no-import-type-side-effects`](./no-import-type-side-effects.md)
- [`import/consistent-type-specifier-style`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md)
- [`import/no-duplicates` with `{"prefer-inline": true}`](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md#inline-type-imports)
