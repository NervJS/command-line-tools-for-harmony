---
Disallow specified modules when loaded by `import`.
---

> See [***documentation***](link to developer.harmonyos.com) for more details.

This rule extends the base [`eslint/no-restricted-imports`](https://eslint.org/docs/rules/no-restricted-imports) rule. It adds support for the type import (`import type X from "..."`, `import { type X } from "..."`) and `import x = require("...")` syntaxes.

## Options

This rule adds the following options:

### `allowTypeImports`

(default: `false`)

You can specify this option for a specific path or pattern as follows:

```jsonc
{
  "rules": {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "import-foo",
            "message": "Please use import-bar instead.",
            "allowTypeImports": true,
          },
          {
            "name": "import-baz",
            "message": "Please use import-quux instead.",
            "allowTypeImports": true,
          },
        ],
      },
    ],
  },
}
```

When set to `true`, the rule will allow [Type-Only Imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export).

Examples of code with the above config:

<!--tabs-->

#### ❌ Incorrect

```ts option='{"paths":[{"name":"import-foo","message":"Please use import-bar instead.","allowTypeImports":true},{"name":"import-baz","message":"Please use import-quux instead.","allowTypeImports":true}]}'
import foo from 'import-foo';
export { Foo } from 'import-foo';

import baz from 'import-baz';
export { Baz } from 'import-baz';
```

#### ✅ Correct

```ts option='{"paths":[{"name":"import-foo","message":"Please use import-bar instead.","allowTypeImports":true},{"name":"import-baz","message":"Please use import-quux instead.","allowTypeImports":true}]}'
import { foo } from 'other-module';

import type foo from 'import-foo';
export type { Foo } from 'import-foo';

import type baz from 'import-baz';
export type { Baz } from 'import-baz';
```
