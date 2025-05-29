# This rule forbids unsafe ECDSA sign algorithm. (`no-unsafe-ecdsa`)

## Rule Details

This rule forbids unsafe ECDSA sign algorithm, such as using sha1 digest algorithm. Recommend integrating secure ecdsa
sign interfaces in Petal Aegis SDK. For details, please refer to: [
**_ECDSA signature verification_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/aegis-signature-verification-0000001866035345#section12984925133517).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-ecdsa-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let sign = cryptoFramework.createSign('ECC256|SHA1');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let sign = cryptoFramework.createSign('ECC256|SHA256');
```
