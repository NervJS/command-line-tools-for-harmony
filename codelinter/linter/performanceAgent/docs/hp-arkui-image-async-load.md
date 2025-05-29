# Asynchronously load large images (`hp-arkui-image-async-load`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
Asynchronous loading, along with reducing the view nesting level, is effective in reducing layout time.

During synchronous loading, images are loaded in the main thread. This means that, page layout needs to wait until the main thread has completed the **makePixelMap** task, resulting in long page layout times. On the contrary, during asynchronous loading, images are loaded in other threads while page layout is executed in the main thread. In this way, no blocking occurs, leading to faster page layout and better performance. For small local images that are fast to load, use synchronous loading (with **syncLoad** set to **true**) whenever possible. 

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-image-async-load-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-click-to-click-response-optimization-V5#section6120161911126) for more details.

## Examples

Examples of **incorrect** code for this rule.

This example synchronously loads high-resolution images, blocking the UI thread and increasing the total page layout time.

```ts
@Entry
@Component
struct MyComponent {
  build() {
    Row() {
      // Local image 4k.png
      Image($r('app.media.4k'))
        .border({ width: 1 })
        .borderStyle(BorderStyle.Dashed)
        .height(100)
        .width(100)
        .syncLoad(true)
    }
  }
}
```

Examples of **correct** code for this rule.

This example uses the default asynchronous loading method to load images, without blocking the UI thread and reducing page layout time.

```ts
@Entry
@Component
struct MyComponent {
  build() {
    Row() {
      // Local image 4k.png
      Image($r('app.media.4k'))
        .border({ width: 1 })
        .borderStyle(BorderStyle.Dashed)
        .height(100)
        .width(100)
    }
  }
}
```