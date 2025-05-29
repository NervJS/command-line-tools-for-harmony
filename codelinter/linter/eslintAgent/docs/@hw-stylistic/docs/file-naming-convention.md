# Enforce file naming conventions. (`file-naming-convention`)

## Rule Details

Enforce file naming conventions.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-file-naming-convention-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
// The code file name should be in upper camel case.
// src/main/ets/pages/index.ets
// The code file name should be in lower camel case.
// src/main/js/MainAbility/pages/index/Index.js

// The resource file name should be in lower camel case or in snake case (where words are written in lowercase, separated by underscores).
// resources/base/element/Color.json
```

Examples of **correct** code for this rule.

```ts
// src/main/ets/pages/Index.ets
// src/main/js/MainAbility/pages/index/index.js

// resources/base/element/color.json
// resources/base/profile/main_pages.json
```
