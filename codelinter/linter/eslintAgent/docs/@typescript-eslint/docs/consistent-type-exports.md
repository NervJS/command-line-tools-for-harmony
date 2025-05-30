---
Enforce consistent usage of type exports.
---

> See [***documentation***](link to developer.harmonyos.com) for more details.

TypeScript allows specifying a `type` keyword on exports to indicate that the export exists only in the type system, not at runtime.
This allows transpilers to drop exports without knowing the types of the dependencies.

> See [Blog > Consistent Type Exports and Imports: Why and How](/blog/consistent-type-imports-and-exports-why-and-how) for more details.

## Examples

<!--tabs-->

### ❌ Incorrect

```ts
interface ButtonProps {
  onClick: () => void;
}

class Button implements ButtonProps {
  onClick = () => console.log('button!');
}

export { Button, ButtonProps };
```

### ✅ Correct

```ts
interface ButtonProps {
  onClick: () => void;
}

class Button implements ButtonProps {
  onClick = () => console.log('button!');
}

export { Button };
export type { ButtonProps };
```

## Options

### `fixMixedExportsWithInlineTypeSpecifier`

When this is set to true, the rule will autofix "mixed" export cases using TS 4.5's "inline type specifier".
If you are using a TypeScript version less than 4.5, then you will not be able to use this option.

For example the following code:

```ts
const x = 1;
type T = number;

export { x, T };
```

With `{fixMixedExportsWithInlineTypeSpecifier: true}` will be fixed to:

```ts
const x = 1;
type T = number;

export { x, type T };
```

With `{fixMixedExportsWithInlineTypeSpecifier: false}` will be fixed to:

```ts
const x = 1;
type T = number;

export type { T };
export { x };
```

<!--tabs-->

### ❌ Incorrect

```ts option='{ "fixMixedExportsWithInlineTypeSpecifier": true }'
export { Button } from 'some-library';
export type { ButtonProps } from 'some-library';
```

### ✅ Correct

```ts option='{ "fixMixedExportsWithInlineTypeSpecifier": true }'
export { Button, type ButtonProps } from 'some-library';
```

## When Not To Use It

If you use `--isolatedModules` the compiler would error if a type is not re-exported using `export type`.
This rule may be less useful in those cases.

If you specifically want to use both export kinds for stylistic reasons, or don't wish to enforce one style over the other, you can avoid this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
