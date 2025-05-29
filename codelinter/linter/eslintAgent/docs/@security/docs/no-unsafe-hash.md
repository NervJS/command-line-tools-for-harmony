# This rule forbids unsafe hash algorithm. (`no-unsafe-hash`)

## Rule Details

This rule forbids unsafe hash algorithm, including MD5,SHA1. Recommend integrating secure hash interfaces in Petal Aegis SDK. For details, please refer to: [**_Message digest calculation_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-Guides/aegis-message-digest-calculation-0000001819195648#section114711448195318).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-hash-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
cryptoFramework.createMd('MD5');
```

```ts
import CryptoJS from '@ohos/crypto-js';
CryptoJS.MD5('123456').toString();
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
cryptoFramework.createMd('SHA256');
```

```ts
import CryptoJS from '@ohos/crypto-js';
CryptoJS.SHA256('123456').toString();
```
