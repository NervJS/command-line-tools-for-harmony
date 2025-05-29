# Suggestion: Use effectKit.createEffect to create a blur effect (`hp-arkui-suggest-use-effectkit-blur`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
While `blur` and `backdropBlur` can also create a blur effect, the blur is dynamic. When they are used, the system refreshes the blur effect in each frame, which causes heavy rendering load and even frame loss if a page transition animation is involved. In light of this, `effectKit.createEffect` is recommended if you are simply applying a blur effect to an image.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-arkui-suggest-use-effectkit-blur-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-fuzzy-scene-performance-optimization-V5) for more details.

## Examples

Examples of **incorrect** code for this rule:
```ts
@Entry
@Component
struct BlurEffectsExample {
  build() {
    Column({ space: 10 }) {
      // Blur the image without using effectKit.createEffect
      Text('Image blur').fontSize(15).fontColor(0xCCCCCC).width('90%')
      Image('resources/base/media/sss001.jpg').blur(1)
          .border({ width: 1 }).borderStyle(BorderStyle.Dashed).aspectRatio(1).width('90%').height(40)

     // Blur the background without using effectKit.createEffect
      Text('backdropBlur').fontSize(15).fontColor(0xCCCCCC).width('90%')
      Text()
        .width('90%')
        .height(40)
        .fontSize(16)
        .backdropBlur(3)
        .backgroundImage('/pages/attrs/image/image.jpg')
        .backgroundImageSize({ width: 1200, height: 160 })
    }.width('100%').margin({ top: 5 })
  }
}
```

Examples of **correct** code for this rule:

```ts
import image from "@ohos.multimedia.image"; // Import image processing module
import effectKit from '@ohos.effectKit'; // Import image effects module

@Entry
@Component
struct Index {
  @State isShowStaticBlur: boolean = false;
  @State pixelMap: image.PixelMap | undefined = undefined; 
  imgSource: image.ImageSource | undefined = undefined;

  // static blur
  async staticBlur() {
    let context = getContext(this); 
    let resourceMgr = context.resourceManager; 
    const fileData = await resourceMgr.getRawFileContent('startIcon.png');
    let buffer: ArrayBuffer = fileData.buffer.slice(0); 
    this.imgSource = image.createImageSource(buffer); 
    // Create properties for pixels
    let opts: image.InitializationOptions = {
      editable: true,
      pixelFormat: 3, 
      size: { 
        height: 4,
        width: 6
      }
    };

    await this.imgSource.createPixelMap(opts).then((pixelMap: image.PixelMap) => {
      const blurRadius = 1; // Blur radius
      let headFilter = effectKit.createEffect(pixelMap); 
      if (headFilter != null) {
        headFilter.blur(blurRadius); //Sets the static blur. Adds a blur effect to the effects list
        headFilter.getEffectPixelMap().then((pixelMap: image.PixelMap) => {
          this.pixelMap = pixelMap;
        });
      }
    })
  }

  // Image set static blurred modal page
  @Builder
  staticBlurBuilder() {
    Stack() {
      Image(this.pixelMap)
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Fill)
      Button('close')
        .fontSize(20)
        .onClick(() => {
          this.isShowStaticBlur = false;
        })
    }
    .width('100%')
    .height('100%')
  }

  build() {
    Column({ space: 10 }) {
      Button('static blur')
        .onClick(() => {
          this.isShowStaticBlur = true;
          // Set static blur
          this.staticBlur();
        })
        .bindContentCover(this.isShowStaticBlur, this.staticBlurBuilder(), {
          modalTransition: ModalTransition.DEFAULT 
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
```