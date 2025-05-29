# This rule forbids unsafe DSA key. (`no-unsafe-dsa-key`)

## Rule Details

This rule forbids unsafe DSA key, including DSA1024.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-dsa-key-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('DSA1024');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('DSA3072');
```
