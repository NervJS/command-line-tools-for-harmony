#  [Experimental]  Use the swiper preloading mechanism with the OnAnimationStart callback (`hp-arkui-use-onAnimationStart-for-swiper-preload`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details
When the **OnAnimationStart** callback of the **\<Swiper>** component, which is triggered when the switching animation starts, is executed, the main thread is idle. At this time, your app can preload resources such as images, reducing the time required for preloading nodes specified by **cachedCount**.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-onanimationstart-in-swiper-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-swiper_high_performance_development_guide-V5) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code example, the Swiper component is not preloaded using `onAnimationStart`.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { PhotoItem } from './component/ChildComponent';
import { MyObject } from './data/DataEntry';


@Entry
@Component
struct MyComponent {
  cacheCount: number = 1
  swiperController: SwiperController = new SwiperController();
  private data: MyDataSource = new MyDataSource([]);
  context = getContext(this);

  build() {
    // The Swiper component is not preloaded with OnAnimationStart.
    Swiper(this.swiperController) {
      LazyForEach(this.data, (item: MyObject, index?: number) => {
        // Source code file. Set this parameter based on the site requirements.
        PhotoItem({ myIndex: index, dataSource: this.data })
      }, (item: MyObject) => item.id)
    }
    .cachedCount(this.cacheCount)
    .indicator(true)
    .loop(false)
    .width('100%')
    .height('100%')
  }
}
```

Examples of **correct** code for this rule.

You are advised to use `onAnimationStart` for preloading.
```ts
import image from '@ohos.multimedia.image';
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { PhotoItem } from './component/ChildComponent';
import { MyObject } from './data/DataEntry';

@Entry
@Component
struct MyComponent {
  cacheCount: number = 1
  swiperController: SwiperController = new SwiperController();
  private data: MyDataSource = new MyDataSource([]);
  context = getContext(this);

  build() {
    Swiper(this.swiperController) {
      LazyForEach(this.data, (item: MyObject, index?: number) => {
        // Source code file. Set this parameter based on the site requirements.
        PhotoItem({ myIndex: index, dataSource: this.data })
      }, (item: MyObject) => item.id) 
    }
    .cachedCount(this.cacheCount)
    .indicator(true)
    .loop(false)
    // Preload resources in the onAnimationStart callback.
    .onAnimationStart((index: number, targetIndex: number) => {
      if (targetIndex !== index) {
        try {
          // Get resourceManager
          const resourceMgr = this.context.resourceManager;
          // Obtain the ArrayBuffer of icon.png in the rawfile folder.
          let str = "item" + (targetIndex + this.cacheCount + 2) + ".jpg";
          resourceMgr.getRawFileContent(str).then((value) => {
            // Create an imageSource.
            const imageSource = image.createImageSource(value.buffer);
            imageSource.createPixelMap().then((value) => {
              this.data.addData(targetIndex + this.cacheCount + 1, {
                description: "" + (targetIndex + this.cacheCount + 1),
                image: value
              })
            })
          })
        } catch (err) {
          console.log("error code" + err);
        }
      }
    })
    .width('100%')
    .height('100%')
  }
}
```