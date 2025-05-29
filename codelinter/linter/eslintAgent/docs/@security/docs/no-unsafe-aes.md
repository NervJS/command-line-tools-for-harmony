# This rule forbids unsafe AES algorithm. (`no-unsafe-aes`)

## Rule Details

This rule forbids unsafe AES algorithm, such as using ECB Cipher Mode. Recommend integrating secure aes interfaces in Petal Aegis SDK. For details, please refer to: [
**_Symmetric encryption and decryption_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/aegis-encryption-and-decryption-symmetry-0000001861247310#section153801471317).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-aes-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let cipher = cryptoFramework.createCipher('AES128|ECB|NoPadding');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let cipher = cryptoFramework.createCipher('AES128|CBC|PKCS7');
```
