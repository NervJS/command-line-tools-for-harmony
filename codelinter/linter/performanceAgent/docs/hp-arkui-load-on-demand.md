# Use LazyForEach when appropriate (`hp-arkui-load-on-demand`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details

On-demand loading, as its name implies, loads resources only when they are needed. It avoids initializing and loading all elements at a time. In this way, the time required for creating list elements is reduced, allowing pages to load faster.

**LazyForEach** iterates data as needed from the provided data sources and creates corresponding components during each iteration process. When **LazyForEach** is used in a scrollable container, the framework will create components as needed based on the visible area of the container. When the components are marked out of the visible area, the framework will perform component destruction and recycling to reduce memory usage.

**LazyForEach** works only within container components: **\<List>**, **\<Grid>**, **\<Swiper>**, **\<WaterFlow>**.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-load-on-demand-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V1/best-practices-long-list-foreach-V1) for more details.

## Examples

Examples of **incorrect** code for this rule.


There is a list with 10,000 elements (the sheer number is intended to make it easier to observe the benefits of on-demand loading). If each of the list element is initialized and loaded during page load, the page load time will be excessively long. 

```ts
@Entry
@Component
struct MyComponent {
  @State arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]

  build() {
    List() {
      // LazyForEach is recommended in the list
      ForEach(this.arr, (item: number) => {
        ListItem() {
          Text(`item value: ${item}`)
        }
      }, (item: number) => item.toString())
    }
    .width('100%')
    .height('100%')
  }
}
```

Examples of **correct** code for this rule.

**ForEach** is replaced with **LazyForEach** to avoid initializing and loading all elements at once. 

```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State introduce: string = ''

  aboutToReuse(params: Record<string, ESObject>) {
    this.introduce = params.introduce
  }

  build() {
    Text(this.introduce)
      .fontSize(14)
      .padding({ left: 5, right: 5 })
      .margin({ top: 5 })
  }
}

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource()

  build() {
    List() {
      LazyForEach(this.data, (item: string) => {
        ListItem() {
          ItemComponent({ introduce: item }).reuseId(item)
        }
      }, (item: string) => item)
    }
    .width('100%')
    .height('100%')
  }
}
```