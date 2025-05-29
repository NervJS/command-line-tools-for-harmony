# Reduce redundant nested containers (`hp-arkui-remove-container-without-property`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
The view hierarchy can significantly affect application performance. Flatter view hierarchies can bring faster page layout and better layout performance. Therefore, whenever possible, reduce nesting and eliminate misplaced container components.

This rule deletes container components without attributes to reduce the number of page nesting levels and intermediate nodes, thereby reducing the performance consumption caused by the calculation of the number of nodes. 

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-remove-container-without-property-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-improve-layout-performance-V5#section9293918175210) for more details.

## Examples

Examples of **incorrect** code for this rule.

A **\<Grid>** container is used to load 1000 grid items at once, and additional three-layer **\<Flex>** containers are used, resulting in an unnecessarily deeply nested structure. 

```ts
@Entry
@Component
struct MyComponent {
  @State number: Number[] = Array.from(Array<number>(1000), (val, i) => i);
  scroller: Scroller = new Scroller()
  build() {
    Column() {
      Grid(this.scroller) {
        ForEach(this.number, (item: number) => {
          GridItem() {
            // multilevel nesting
            Flex() {
              Flex() {
                Flex() {
                  Text(item.toString())
                    .fontSize(16)
                    .backgroundColor(0xF9CF93)
                    .width('100%')
                    .height(80)
                    .textAlign(TextAlign.Center)
                    .border({width:1})
                }
              }
            }
          }
        }, (item:string) => item)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .columnsGap(0)
      .rowsGap(0)
      .size({ width: "100%", height: "100%" })
    }
  }
}
```
Examples of **correct** code for this rule.

A **\<Grid>** container is used to load 1000 grid items at a time, but this time no unnecessary containers are used, which leads to faster layout. 

```ts
@Entry
@Component
struct MyComponent {
  @State number: Number[] = Array.from(Array<number>(1000), (val, i) => i);
  scroller: Scroller = new Scroller()
  build() {
    Column() {
      Grid(this.scroller) {
        ForEach(this.number, (item: number) => {
          GridItem() {
            // after removing redundant Flex
            Text(item.toString())
              .fontSize(16)
              .backgroundColor(0xF9CF93)
              .width('100%')
              .height(80)
              .textAlign(TextAlign.Center)
              .border({width:1})
          }
        }, (item:string) => item)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr 1fr')
      .columnsGap(0)
      .rowsGap(0)
      .size({ width: "100%", height: "100%" })
    }
  }
}
```
