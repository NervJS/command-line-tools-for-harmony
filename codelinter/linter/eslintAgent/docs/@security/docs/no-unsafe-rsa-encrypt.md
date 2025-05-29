# This rule forbids unsafe RSA encrypt algorithm. (`no-unsafe-rsa-encrypt`)

## Rule Details

This rule forbids unsafe RSA encrypt algorithm, such as modulus length less than 2048, padding mode PKCS1,
digest algorithm or mask digest algorithm using md5 or sha1. Recommend integrating secure rsa encryption and
decryption interfaces in Petal Aegis SDK. For details, please refer to: [**_RSA encryption and decryption_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/aegis-encryption-and-decryption-asymmetric-0000001907932453#section1925912512).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-rsa-encrypt-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let cipher = cryptoFramework.createCipher('RSA512|PKCS1');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let cipher = cryptoFramework.createCipher(
  'RSA3072|PKCS1_OAEP|SHA256|MGF1_SHA256',
);
```
