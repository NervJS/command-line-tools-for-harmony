# This rule forbids unsafe DH key exchange algorithm. (`no-unsafe-dh`)

## Rule Details

This rule forbids unsafe DH key exchange algorithm, including DH_modp1536.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-dh-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let keyAgreement = cryptoFramework.createKeyAgreement('DH_modp1536');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let keyAgreement = cryptoFramework.createKeyAgreement('DH_modp3072');
```
