# This rule forbids unsafe RSA sign algorithm. (`no-unsafe-rsa-sign`)

## Rule Details

This rule forbids unsafe RSA sign algorithm, such as modulus length less than 2048, digest algorithm or mask digest
algorithm using md5 or sha1. Recommend integrating secure rsa sign interfaces in Petal Aegis SDK. For details, please
refer to: [
**_RSA encryption and decryption_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/aegis-signature-verification-0000001866035345#section1039727112016).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-rsa-sign-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let sign = cryptoFramework.createSign('RSA512|PSS|MD5|MGF1_MD5');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let sign = cryptoFramework.createSign('RSA3072|PSS|SHA256|MGF1_SHA256');
```
