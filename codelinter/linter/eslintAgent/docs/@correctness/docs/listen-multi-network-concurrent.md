# Subscribe to network handover notifications to receive status updates before and after switching between Wi-Fi and cellular connections. (`listen-multi-network-concurrent`)

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_listen-multi-network-concurrent-{{apiVersion}}) for more details.

## ❌ Incorrect

```ts
// With the ohos.permission.GET_NETWORK_INFO permission configured

// The `on(type: 'handoverChange', callback: Callback<HandoverInfo>)` function is not called.
```

## ✅ Correct

```ts
// With the ohos.permission.GET_NETWORK_INFO permission configured

import { netHandover } from '@kit.NetworkBoostKit';
import { BusinessError } from '@kit.BasicServicesKit';

try {
  netHandover.on('handoverChange', (info: netHandover.HandoverInfo) => {
    if (info.handoverStart) {
      console.info('handover start');
    } else if (info.handoverComplete) {
      console.info('handover complete');
    }
  });
} catch (err) {
  console.error(
    'errCode: ' +
      (err as BusinessError).code +
      ', errMessage: ' +
      (err as BusinessError).message,
  );
}

try {
  netHandover.off('handoverChange');
} catch (err) {
  console.error(
    'errCode: ' +
      (err as BusinessError).code +
      ', errMessage: ' +
      (err as BusinessError).message,
  );
}
```
