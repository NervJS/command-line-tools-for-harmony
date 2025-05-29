# Add a listener to listen for changes in the default network. Upon detecting such changes, stop current data transfers and initiate new ones using the new network. (`listen-default-network-change`)

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_listen-default-network-change-{{apiVersion}}) for more details.

## ❌ Incorrect

```ts
// With the ohos.permission.GET_NETWORK_INFO permission configured

// The `on(type: 'netCapabilitiesChange', callback: Callback<NetCapabilityInfo>)`, `getDefaultNet`/`getDefaultNetSync` and `getNetCapabilities`/`getNetCapabilitiesSync` functions are not called.
```

## ✅ Correct

```ts
// With the ohos.permission.GET_NETWORK_INFO permission configured

import connection from '@ohos.net.connection';

export function test() {
  const defaultNet = connection.getDefaultNetSync();
  const netCapabilities = connection.getNetCapabilitiesSync(defaultNet);
  let bearerTypes = netCapabilities.bearerTypes;
  const netConnection = connection.createNetConnection();

  netConnection.on(
    'netCapabilitiesChange',
    (netCap: connection.NetCapabilityInfo) => {
      const newBearTypes = netCap.netCap.bearerTypes;
      if (newBearTypes !== bearerTypes) {
        bearerTypes = newBearTypes;
      }
    },
  );
}
```
