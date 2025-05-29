# Enforce consistent brace style for blocks. (`brace-style`)

## Rule Details

Enforce consistent brace style for blocks.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-brace-style-stylistic-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
try
// Opening curly brace does not appear on the same line as statement before.
{

// Closing curly brace does not appear on the same line as statement after.
}
catch (e)
// Opening curly brace does not appear on the same line as statement before.
{

// Closing curly brace does not appear on the same line as statement after.
}
finally
// Opening curly brace does not appear on the same line as statement before.
{

}
```

Examples of **correct** code for this rule.

```ts
try {
  // doSomething
} catch (e) {
  // doSomething
} finally {
  // doSomething
}
```
