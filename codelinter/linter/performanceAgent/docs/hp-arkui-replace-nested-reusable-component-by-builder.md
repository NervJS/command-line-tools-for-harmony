# Prioritize @Builder over nested custom components (`hp-arkui-replace-nested-reusable-component-by-builder`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
Nesting of custom components increases the difficulty of component reuse. To improve page loading speeds, use @Builder to replace custom components and reduce nesting levels.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui--replace-reusable-by-builder-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section937434455716) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code example, the reused component `ComponentA` is nested in the customized component `ComponentB`.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();

  aboutToAppear(): void {
    for (let index = 0; index < 30; index++) {
      this.data.pushData(index.toString())
    }
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.data, (item: string) => {
          ListItem() {
            //Counterexample Using Custom Components
            ItemComponent({ desc: item })
          }
        }, (item: string) => item)
      }
      .height('100%')
      .width('100%')
    }
  }
}

@Reusable
@Component
struct ItemComponent {
  @State desc: string = '';

  aboutToReuse(params: ESObject): void {
    this.desc = params.desc as string;
  }

  build() {
    // Nesting Custom Components in Reusable Components
    ComponentA({ desc: this.desc })
  }
}


@Component
struct ComponentA {
  @State desc: string = '';

  aboutToReuse(params: ESObject): void {
    this.desc = params.desc as string;
  }

  build() {
    Column() {
      Text('Subcomponents' + this.desc)
        .fontSize(30)
        .fontWeight(30)
    }
    .width('100%')
  }
}
```

Examples of **correct** code for this rule.

It is recommended that you use the ChildComponentBuilder decorated by `@Builder` to replace the custom component `ComponentB`.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();

  aboutToAppear(): void {
    for (let index = 0; index < 30; index++) {
      this.data.pushData(index.toString())
    }
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.data, (item: string) => {
          ListItem() {
            ItemComponent({ desc: item })
          }
        }, (item: string) => item)
      }
      .height('100%')
      .width('100%')
    }
    .width('100%')
  }
}

@Reusable
@Component
struct ItemComponent {
  @State desc: string = '';

  aboutToReuse(params: Record<string, Object>): void {
    this.desc = params.desc as string;
  }

  build() {
    Column() {
      // With @Builder, you can reduce the time it takes to create and render custom components
      ComponentA({ paramA: this.desc })
    }
    .width('100%')
  }
}

class Temp {
  paramA: string = '';
}

@Builder
function ComponentA($$: Temp) {
  Column() {
    Text(`Subcomponents + ${$$.paramA}`)
      .fontSize(30)
      .fontWeight(30)
  }
  .width('100%')
}
```