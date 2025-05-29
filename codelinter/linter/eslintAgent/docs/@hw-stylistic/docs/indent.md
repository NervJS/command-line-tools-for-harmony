# Enforce indention of case and default in switch. (`indent`)

## Rule Details

Enforce indention of case and default in switch.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_indent-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
let a = 10;
switch (a) {
    // Expected indentation of 2 relative to switch.
    case 0:
    // Expected indentation of 2 relative to case.
    console.info('hello');
    // Expected indentation of 2 relative to case.
    break;
  case 1:
    console.info('hello');
    break;
  case 2:
  // Expected indentation of 2 relative to case.
  console.info('hello');
    break;
  default:
  // Expected indentation of 2 relative to default.
  console.info('hello');
}
```

Examples of **correct** code for this rule.

```ts
let a = 10;
switch (a) {
  case 0:
    console.info('');
    break;
  case 1:
  case 2:
    console.info('');
    break;
  default:
    console.info('');
}
```
