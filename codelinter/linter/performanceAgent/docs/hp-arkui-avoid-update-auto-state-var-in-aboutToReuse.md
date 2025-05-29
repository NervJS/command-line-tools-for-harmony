# Avoid updating state variables in aboutToReuse with automatically updated values (`hp-arkui-avoid-update-auto-state-var-in-aboutToReuse`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
You do not need to update the state variables decorated by @Link, @StorageLink, @ObjectLink, and @Consume in **aboutToReuse**. These state variables are automatically updated, and manual update may trigger unnecessary component re-renders.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-abouttoreuse-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section4470171391314) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code example, `aboutToReuse` of the customized reused component `ChildComponent` updates the avg variable decorated by `@ObjectLink`.

```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State desc: string = '';
  @State sum: number = 0;
  @Link avg: number;

  aboutToReuse(params: Record<string, Object>): void {
    this.desc = params.desc as string;
    this.sum = params.sum as number;
    this.avg = params.avg as number;
  }

  build() {
    Column() {
      Text('Subcomponents' + this.desc)
        .fontSize(30)
        .fontWeight(30)
      Text('The result' + this.sum)
        .fontSize(30)
        .fontWeight(30)
      Text('Average' + this.avg)
        .fontSize(30)
        .fontWeight(30)
    }
  }
}

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();

  aboutToAppear(): void {
    for (let index = 0; index < 20; index++) {
      this.data.pushData(index.toString())
    }
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.data, (item: string) => {
          ListItem() {
            ItemComponent({ desc: item, sum: 0, avg: 0 })
          }
          .width('100%')
          .height(100)
        }, (item: string) => item)
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}
```

Examples of **correct** code for this rule.

It is recommended that the status variable be changed to `@State`.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State desc: string = '';
  @State sum: number = 0;
  @State avg: number = 0;

  aboutToReuse(params: Record<string, Object>): void {
    this.desc = params.desc as string;
    this.sum = params.sum as number;
    this.avg = params.avg as number;
  }

  build() {
    Column() {
      Text('Subcomponents' + this.desc)
        .fontSize(30)
        .fontWeight(30)
      Text('The result' + this.sum)
        .fontSize(30)
        .fontWeight(30)
      Text('Average' + this.avg)
        .fontSize(30)
        .fontWeight(30)
    }
  }
}

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();

  aboutToAppear(): void {
    for (let index = 0; index < 20; index++) {
      this.data.pushData(index.toString())
    }
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.data, (item: string) => {
          ListItem() {
            ItemComponent({ desc: item, sum: 0, avg: 0 })
          }
          .width('100%')
          .height(100)
        }, (item: string) => item)
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}
```