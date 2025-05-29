# Asynchronously obtain the anonymous ID for IFAA passwordless authentication on the main thread (`hp-arkui-suggest-use-get-anonymousid-async`)

## Benefits from Code Optimization
Efficient handling of long-running functions.

# Rule Details
In app development, using the **getAnonymousIdSync** API on the main thread can easily lead to frame dropping issues.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkui-sg-anonymousid-async-{{apiVersion}}) for more details.

# Examples

Examples of **incorrect** code for this rule:

```ts
// Example 1
import {ifaa} from '@kit.OnlineAuthenticationKit'
// Construct the input parameters according to the IIFAA TLV format and convert them into Uint8Array parameters; here, arg should be replaced by the actual input parameter.
let arg = new Uint8Array([0]);
let getAnonIdResult: Uint8Array = ifaa.getAnonymousIdSync(arg);

// Example 2
import {ifaa} from '@kit.OnlineAuthenticationKit'

@Entry
@Component
struct Index {
  @State private getAnonIdResult: Uint8Array = ifaa.getAnonymousIdSync(new Uint8Array([0]));
  build() {
    // Service logic
  }
}

```

Examples of **correct** code for this rule:
```ts
// Example 1:
import {ifaa} from '@kit.OnlineAuthenticationKit'
// Construct the input parameters according to the IIFAA TLV format and convert them into Uint8Array parameters; here, arg should be replaced by the actual input parameter.
let arg = new Uint8Array([0]);
let getAnonIdPromise: Promise<Uint8Array> = ifaa.getAnonymousId(arg);
getAnonIdPromise.then(result => {
  console.info("Succeeded in doing getAnonymousId.");
  // Process the result.
}).catch((err: BusinessError) => {
  console.error(`Failed to call getAnonymousId. Code: ${err.code}, message: ${err.message}`);
 });

// Example 2
import {ifaa} from '@kit.OnlineAuthenticationKit'

@Entry
@Component
struct Index {
  @State private getAnonIdResult: Promise<Uint8Array> = ifaa.getAnonymousId(arg);
  build() {
    // Service logic
  }
}
```
