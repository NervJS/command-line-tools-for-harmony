# Use transition for component transition animation (`hp-arkui-use-transition-to-replace-animateto`)

## Benefits from Code Optimization
Reduced frame loss in animations.

## Rule Details
There are two methods for animating the component appearance and disappearance:

- Use **animateTo** to create an animation, and add logic processing in the animation end callback.
- Use **transition** to directly create a transition animation.

**transition** is a preferred option for two reasons:

- **animateTo** requires attribute updates before and after the animation, while **transition** requires only one conditional update. So **transition** delivers better performance.
- **transition** is easier to develop and implement, without the need for complex logic processing in the end callback.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-transition-to-replace-animateto-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-page-transition-V5#section1560222414153) for more details.

## Examples

Examples of **incorrect** code for this rule.

The following code hides the component by changing the **opacity** attribute from 1 to 0 and adding the component disappearance in the animation end callback.

```ts
@Entry
@Component
struct MyComponent {
  @State mOpacity: number = 1;
  @State show: boolean = true;

  build() {
    Column() {
      Row() {
        if (this.show) {
          Text('value')
            .opacity(this.mOpacity)
        }
      }
      .width('100%')
      .height(100)
      .justifyContent(FlexAlign.Center)

      Text('toggle state')
        .onClick(() => {
          this.show = true;
          animateTo({
            duration: 1000, onFinish: () => {
              if (this.mOpacity === 0) {
                this.show = false;
              }
            }
          }, () => {
            this.mOpacity = this.mOpacity === 1 ? 0 : 1;
          })
        })
    }
  }
}
```


Examples of **correct** code for this rule.

The following code uses **transition** to animate opacity for appearance and disappearance of the **Text** component.

```ts
@Entry
@Component
struct MyComponent {
  @State show: boolean = true;

  build() {
    Column() {
      Row() {
        if (this.show) {
          Text('value')// Set id to make transition interruptible
            .id('myText')
            .transition(TransitionEffect.OPACITY.animation({ duration: 1000 }))
        }
      }.width('100%')
      .height(100)
      .justifyContent(FlexAlign.Center)

      Text('toggle state')
        .onClick(() => {
          // Through transition, animates the appearance or disappearance of transparency.
          this.show = !this.show;
        })
    }
  }
}
```