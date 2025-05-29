# Set cachedCount to an appropriate value when using LazyForEach in grids (`hp-arkui-set-cache-count-for-lazyforeach-grid`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details
If lazy loading of a grid is time-consuming, for example, when downloading online data or images is involved, the grid is prone to white blocks. In this case, consider setting **cachedCount** to preload a specific number of grid items. **cachedCount** takes effect only when **LazyForEach** is used.

When set at an appropriate value other than the default value, it can help improve the grid scrolling experience. When **cachedCount** is set for a grid, the specified number of grid items are cached before and after the grid display area, and grid items that exceed the display and cache range are released. Note that a greater value of **cachedCount** increases the CPU and memory overhead. Adjust the value by taking into account both the comprehensive performance and user experience.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-set-cache-count-for-lazyforeach-grid-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-best-practices-long-list-V5#section11667144010222) for more details.

## Examples

Examples of **incorrect** code for this rule.

The following code does not set the number of caches for GridItem.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Entry
@Component
struct MyComponent {
  // DataSource
  private data: MyDataSource = new MyDataSource();

  aboutToAppear() {
    for (let i = 1; i < 1000; i++) {
      this.data.pushData(i);
    }
  }

  build() {
    Column({ space: 5 }) {
      Grid() {
        LazyForEach(this.data, (item: number) => {
          GridItem() {
             // Using Reusable Custom Components
            // Service logic
          }
        }, (item: string) => item)
      }
      // The number of cached GridItems is not set.
      .columnsTemplate('1fr 1fr 1fr')
      .columnsGap(10)
      .rowsGap(10)
      .margin(10)
      .height(500)
      .backgroundColor(0xFAEEE0)
    }
  }
}
```

Examples of **correct** code for this rule.

It is recommended that cachedCount be used to set the number of cached GridItems.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Entry
@Component
struct MyComponent {
  // DataSource
  private data: MyDataSource = new MyDataSource();

  aboutToAppear() {
    for (let i = 1; i < 1000; i++) {
      this.data.pushData(i);
    }
  }

  build() {
    Column({ space: 5 }) {
      Grid() {
        LazyForEach(this.data, (item: number) => {
          GridItem() {
            // Using Reusable Custom Components
            // Service logic
          }
        }, (item: string) => item)
      }
      // Sets the number of cached GridItems.
      .cachedCount(2)
      .columnsTemplate('1fr 1fr 1fr')
      .columnsGap(10)
      .rowsGap(10)
      .margin(10)
      .height(500)
      .backgroundColor(0xFAEEE0)
    }
  }
}
```