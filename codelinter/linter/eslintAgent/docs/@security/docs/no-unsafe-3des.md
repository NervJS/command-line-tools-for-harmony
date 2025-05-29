# This rule forbids unsafe 3DES algorithm. (`no-unsafe-3des`)

## Rule Details

This rule forbids unsafe 3DES algorithm, including 3DES|ECB.Recommend integrating secure 3des interfaces in Petal Aegis SDK. For details,
please refer to: [**_Symmetric key encryption and decryption_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-References/aesenctext-0000001964620489).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-no-unsafe-3des-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let cipher = cryptoFramework.createCipher('3DES|ECB');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let cipher = cryptoFramework.createCipher('3DES|CBC');
```
