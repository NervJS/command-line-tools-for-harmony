# This rule forbids unsafe DSA sign algorithm. (`no-unsafe-dsa`)

## Rule Details

This rule forbids unsafe DSA sign algorithm, such as modulus length less than 2048, digest algorithm md5 or sha1.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unsafe-dsa-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let verify = cryptoFramework.createVerify('DSA1024|SHA1');
```

Examples of **correct** code for this rule.

```ts
import cryptoFramework from '@ohos.security.cryptoFramework';
let verify = cryptoFramework.createVerify('DSA3072|SHA256');
```
