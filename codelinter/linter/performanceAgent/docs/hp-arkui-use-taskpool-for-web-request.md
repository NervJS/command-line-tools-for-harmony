# [Experimental] Use taskpool for asynchronous processing of network resource requests and responses (`hp-arkui-use-taskpool-for-web-request`)

## Benefits from Code Optimization
Reduced in-app touch completion latency.

## Rule Details
For the **request** and **requestInStream** APIs in **httpRequest** (@kit.NetworkKit) and the **request**, **get**, and **post** APIs in **axios** and **rcp** (@kit.RemoteCommunicationKit), you are advised to use **taskpool** for asynchronous processing.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkui-use-taskpool-for-web-request-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-time-optimization-of-the-main-thread-V5#section193673511440) for more details.

## @kit.NetworkKit Network Library

## Examples

Examples of **incorrect** code for this rule.

In the following example, the request and response processing function is time-consuming.

```ts
import { http } from '@kit.NetworkKit';

let httpRequest = http.createHttp();
httpRequest.request("EXAMPLE_URL", (err: Error, data: http.HttpResponse) => {
  if (!err) {
    console.info('Result:' + data.result);
    console.info('code:' + data.responseCode);
    console.info('type:' + JSON.stringify(data.resultType));
    console.info('header:' + JSON.stringify(data.header));
    console.info('cookies:' + data.cookies);
  } else {
    console.info('error:' + JSON.stringify(err));
  }
});
```
Examples of **correct** code for this rule.

The following example assumes that the request is fast but the response contains a large amount of data. **taskpool** is used for asynchronous processing.
```ts
import { http } from '@kit.NetworkKit';
import { BusinessError } from '@ohos.base';
import taskpool from '@ohos.taskpool';

@Concurrent
function processRespTask(err: BusinessError, data: http.HttpResponse) {
  if (!err) {
    console.info('Result:' + data.result);
    console.info('code:' + data.responseCode);
    console.info('type:' + JSON.stringify(data.resultType));
    console.info('header:' + JSON.stringify(data.header));
    console.info('cookies:' + data.cookies);
  } else {
    console.info('error:' + JSON.stringify(err));
  }
}

let httpRequest = http.createHttp();
httpRequest.request("EXAMPLE_URL", async (err: Error, data: http.HttpResponse) => {
  let task = new taskpool.Task(processRespTask, data);
  await taskpool.execute(task);
});
```