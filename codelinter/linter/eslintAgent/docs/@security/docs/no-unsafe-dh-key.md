# This rule forbids unsafe DH key. (`no-unsafe-dh-key`)

## Rule Details

This rule forbids unsafe DH key, including DH_modp1536.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-dh-key-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('DH_modp1536');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('DH_modp3072');
```
