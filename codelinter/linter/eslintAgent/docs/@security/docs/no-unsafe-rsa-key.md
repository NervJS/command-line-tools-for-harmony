# This rule forbids unsafe RSA key. (`no-unsafe-rsa-key`)

## Rule Details

This rule forbids unsafe RSA key, such as modulus length less than 2048. Recommend integrating secure ecdsa
sign interfaces in Petal Aegis SDK. For details, please refer to:[**_RSA key_**](https://developer.huawei.com/consumer/cn/doc/AppGallery-connect-References/ohaeggeneratersakeypairbase64-0000001864601898).

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-rsa-key-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('RSA512|PRIMES_2');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let asyKeyGenerator = cryptoFramework.createAsyKeyGenerator('RSA3072|PRIMES_2');
```
