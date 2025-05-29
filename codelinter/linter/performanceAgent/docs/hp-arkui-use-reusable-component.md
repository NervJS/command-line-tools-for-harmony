# Use reusable components to define complex components whenever possible (`hp-arkui-use-reusable-component`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details
In scenarios such as list scrolling, dynamic layout update, and map rendering, instances of the same type of components are frequently created and destroyed, which easily becomes the frame rate bottleneck of the UI thread. Therefore, the component reuse mechanism should be used to improve application performance. It is recommended that the components use the **@Reusable** decorator and implement the **aboutToReuse** logic.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-reusable-component-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section142448345398) for more details.

## Examples

Examples of **incorrect** code for this rule.

### Example 1

```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { GoodItems } from './data/DataEntry';

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource([]);

  build() {
    Column() {
      LazyForEach(this.data, (item: GoodItems) => {
        GridItem() {
          Column() {
            Text(item.introduce)
              .fontSize(14)
              .padding({ left: 5, right: 5 })
              .margin({ top: 5 })
            Row() {
              Text('￥')
                .fontSize(10)
                .fontColor(Color.Red)
                .baselineOffset(-4)
              Text(item.price)
                .fontSize(16)
                .fontColor(Color.Red)
              Text(item.numb)
                .fontSize(10)
                .fontColor(Color.Gray)
                .baselineOffset(-4)
                .margin({ left: 5 })

            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
            .padding({ left: 5, right: 5 })
            .margin({ top: 15 })
          }
          .borderRadius(10)
          .backgroundColor(Color.White)
          .clip(true)
          .width('100%')
          .height(290)
        }
      }, (item: GoodItems) => item.index)
    }
  }
}
```
In the preceding code, multiple components are added as grid items. In this case, you can customize reusable components for reuse.

### Example 2
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { GoodItems } from './data/DataEntry';

@Component
struct ItemComponent {
  @State introduce: string = ''
  @State price: string = ''
  @State numb: string = ''

  aboutToReuse(params: Record<string, ESObject>) {
    this.introduce = params.introduce
    this.price = params.price
    this.numb = params.numb
  }

  build() {
    Column() {
      Text(this.introduce)
        .fontSize(14)
        .padding({ left: 5, right: 5 })
        .margin({ top: 5 })
      Row() {
        Text('￥')
          .fontSize(10)
          .fontColor(Color.Red)
          .baselineOffset(-4)
        Text(this.price)
          .fontSize(16)
          .fontColor(Color.Red)
        Text(this.numb)
          .fontSize(10)
          .fontColor(Color.Gray)
          .baselineOffset(-4)
          .margin({ left: 5 })

      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({ left: 5, right: 5 })
      .margin({ top: 15 })
    }
  }
}

@Entry
@Component
struct MYComponent {
  private data: MyDataSource = new MyDataSource([]);

  build() {
    Column() {
      LazyForEach(this.data, (item: GoodItems, index) => {
        GridItem() {
          ItemComponent({
            introduce: item.data.introduce,
            price: item.data.price,
            numb: item.data.numb,
          }).reuseId(item.numb)
        }
      }, (item: GoodItems) => item.index)
    }
  }
}
```
In the preceding code, custom component `ItemComponent` has been extracted out. However, this component is not decorated by `@Reusable`. In this case, you can add `@Reusable` to this component.

Examples of **correct** code for this rule.

You are advised to define the entire column content as a reusable custom component for the parent component to reuse in the **LazyForEach** scenario.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { GoodItems } from './data/DataEntry';

@Reusable
@Component
struct ItemComponent {
  @State introduce: string = ''
  @State price: string = ''
  @State numb: string = ''

  aboutToReuse(params: Record<string, ESObject>) {
    this.introduce = params.introduce
    this.price = params.price
    this.numb = params.numb
  }

  build() {
    Column() {
      Text(this.introduce)
        .fontSize(14)
        .padding({ left: 5, right: 5 })
        .margin({ top: 5 })
      Row() {
        Text('￥')
          .fontSize(10)
          .fontColor(Color.Red)
          .baselineOffset(-4)
        Text(this.price)
          .fontSize(16)
          .fontColor(Color.Red)
        Text(this.numb)
          .fontSize(10)
          .fontColor(Color.Gray)
          .baselineOffset(-4)
          .margin({ left: 5 })

      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({ left: 5, right: 5 })
      .margin({ top: 15 })
    }
  }
}

@Entry
@Component
struct MYComponent {
  private data: MyDataSource = new MyDataSource([]);

  build() {
    Column() {
      LazyForEach(this.data, (item: GoodItems, index) => {
        GridItem() {
          ItemComponent({
            introduce: item.data.introduce,
            price: item.data.price,
            numb: item.data.numb,
          }).reuseId(item.numb)
        }
      }, (item: GoodItems) => item.index)
    }
  }
}
```