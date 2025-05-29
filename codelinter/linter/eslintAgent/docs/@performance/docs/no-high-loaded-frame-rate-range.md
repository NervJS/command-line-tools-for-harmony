# Disallow fixed high frame rates. (`no-high-loaded-frame-rate-range`)

## Rule Details

The values of expected, min, and max should not be all 120.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-high-loaded-frame-rate-range-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import { displaySync } from '@kit.ArkGraphics2D';

let sync = displaySync.create();
sync.setExpectedFrameRateRange({
  expected: 120,
  min: 120,
  max: 120,
});
```

Examples of **correct** code for this rule.

```ts
import { displaySync } from '@kit.ArkGraphics2D';

let sync = displaySync.create();
sync.setExpectedFrameRateRange({
  expected: 60,
  min: 45,
  max: 60,
});
```
