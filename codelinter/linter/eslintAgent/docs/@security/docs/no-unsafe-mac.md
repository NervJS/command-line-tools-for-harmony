# This rule forbids unsafe MAC algorithm. (`no-unsafe-mac`)

## Rule Details

This rule forbids unsafe hash in MAC algorithm, such as SHA1. Recommend integrating secure mac interfaces in Petal
Aegis SDK. For details, please refer to: [**_Message authentication code calculation_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/aegis-message-authentication-code-calculation-0000001907018769#section18239113743516).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-mac-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
cryptoFramework.createMac('SHA1');
```

```ts
import CryptoJS from '@ohos/crypto-js';
CryptoJS.HmacSHA1('123456', '123456').toString();
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
cryptoFramework.createMac('SHA256');
```

```ts
import CryptoJS from '@ohos/crypto-js';
CryptoJS.HmacSHA256('123456', '123456').toString();
```
