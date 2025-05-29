# Use GridLayoutOptions when specifying the position in grids (`hp-arkui-use-grid-layout-options`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
In setting **columnStart** and **columnEnd**, there is an issue to bear in mind: If **columnStart** is set for any node, it should be set for all nodes; otherwise, when the page is refreshed, there is no prediction for whether the previous grid item occupies multiple cells. In this case, all grid items are created recursively to determine their space; if a node is added or deleted during this process, the attributes of all subsequent nodes must be modified to match the new layout. Therefore, to improve the grid scroll experience, use **GridLayoutOptions** in place of **columnStart** and **columnEnd**.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-grid-layout-options-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-improve_grid_performance-V5) for more details.

## Examples

Examples of **incorrect** code for this rule.

The Grid in the code below uses `columnStart` and `columnEnd`.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State item: string = "";

  build() {
    Text(this.item)
      .fontSize(16)
      .backgroundColor(0xF9CF93)
      .width('100%')
      .height(80)
      .textAlign(TextAlign.Center)
      .onClick(() => {
        this.item = 'click';
      })
  }
}

@Entry
@Component
struct MyComponent {
  private datasource: MyDataSource = new MyDataSource();
  scroller: Scroller = new Scroller();

  aboutToAppear() {
    for (let i = 1; i <= 2000; i++) {
      this.datasource.pushData(i + '');
    }
  }

  build() {
    Column({ space: 5 }) {
      Text('Use columnStart and columnEnd to set the GridItem size').fontColor(0xCCCCCC).fontSize(9).width('90%')
      Grid(this.scroller) {
        LazyForEach(this.datasource, (item: string, index: number) => {
          if ((index % 4) === 0) {
            GridItem() {
              ItemComponent({ item: item })
            }
            .columnStart(0).columnEnd(2)
          } else {
            GridItem() {
              ItemComponent({ item: item })
            }
          }
        }, (item: string) => item)
      }
      .cachedCount(1)
      .columnsTemplate('1fr 1fr 1fr')
      .columnsGap(10)
      .rowsGap(10)
      .width('90%')
      .height('40%')

      Button("scrollToIndex:1900").onClick(() => {
        this.scroller.scrollToIndex(1900);
      })
    }.width('100%')
    .margin({ top: 5 })
  }
}
```

Examples of **correct** code for this rule.

To solve the problem in the preceding scenario, you are advised to use `GridLayoutOptions` instead.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State item: string = "";

  build() {
    Text(this.item)
      .fontSize(16)
      .backgroundColor(0xF9CF93)
      .width('100%')
      .height(80)
      .textAlign(TextAlign.Center)
      .onClick(() => {
        this.item = 'click';
      })
  }
}

@Entry
@Component
export struct MyComponent {
  private datasource: MyDataSource = new MyDataSource();
  scroller: Scroller = new Scroller();
  private irregularData: number[] = [];
  layoutOptions: GridLayoutOptions = {
    regularSize: [1, 1],
    irregularIndexes: this.irregularData,
  };

  aboutToAppear() {
    for (let i = 1; i <= 2000; i++) {
      this.datasource.pushData(i + '');
      if ((i - 1) % 4 === 0) {
        this.irregularData.push(i - 1);
      }
    }
  }

  build() {
    Column({ space: 5 }) {
      Text('Set GridItem size using GridLayoutOptions').fontColor(0xCCCCCC).fontSize(9).width('90%')
      Grid(this.scroller, this.layoutOptions) {
        LazyForEach(this.datasource, (item: string, index: number) => {
          GridItem() {
            ItemComponent({ item: item })
          }
        }, (item: string) => item)
      }
      .cachedCount(1)
      .columnsTemplate('1fr 1fr 1fr')
      .columnsGap(10)
      .rowsGap(10)
      .width('90%')
      .height('40%')

      Button("scrollToIndex:1900").onClick(() => {
        this.scroller.scrollToIndex(1900);
      })
    }.width('100%')
    .margin({ top: 5 })
  }
}
```