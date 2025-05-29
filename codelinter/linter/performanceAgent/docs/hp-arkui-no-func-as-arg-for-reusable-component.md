# Do not use functions as input parameters for creating reusable components (`hp-arkui-no-func-as-arg-for-reusable-component`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details
If a component reuses a custom component decorated by @Reusable, the constructor should not contain functions as its parameters.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-no-func-as-arg-for-reusable-component-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section18721184816136) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code, this.count () is used to transfer parameters when the reuse component reuses the customized reuse component ChildComponent. This function is a time-consuming action.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State desc: string = '';
  @State sum: number = 0;

  aboutToReuse(params: Record<string, Object>): void {
    this.desc = params.desc as string;
    this.sum = params.sum as number;
  }

  build() {
    Column() {
      Text('Subcomponents' + this.desc)
        .fontSize(30)
        .fontWeight(30)
      Text('The result' + this.sum)
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

  // Functions may contain unknown time-consuming operation logic in practice. In this example, loop functions are used to simulate time-consuming operations.
  count(): number {
    let temp: number = 0;
    for (let index = 0; index < 10000; index++) {
      temp += index;
    }
    return temp;
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.data, (item: string) => {
          ListItem() {
            // The sum parameter is obtained by the function. In the actual development scenario, the time-consuming operations that may occur in the function cannot be predicted. Each time the component is reused, the function is invoked repeatedly.
            ItemComponent({ desc: item, sum: this.count() })
          }
          .width('100%')
          .height(100)
        }, (item: string) => item)
      }
      .height('100%')
      .width('100%')
    }
  }
}
```

Examples of **correct** code for this rule.

It is recommended that you use this.sum to store the count () value to ensure that the count () value is calculated only once.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';

@Reusable
@Component
struct ItemComponent {
  @State desc: string = '';
  @State sum: number = 0;

  aboutToReuse(params: Record<string, Object>): void {
    this.desc = params.desc as string;
    this.sum = params.sum as number;
  }

  build() {
    Column() {
      Text('Subcomponents' + this.desc)
        .fontSize(30)
        .fontWeight(30)
      Text('The result' + this.sum)
        .fontSize(30)
        .fontWeight(30)
    }
  }
}

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();
  @State sum: number = 0;

  aboutToAppear(): void {
    for (let index = 0; index < 20; index++) {
      this.data.pushData(index.toString())
    }
    // Execute the asynchronous function.
    this.count();
  }

  // Simulate time-consuming operation logic.
  async count() {
    let temp: number = 0;
    for (let index = 0; index < 10000; index++) {
      temp += index;
    }
    // Put the result in a state variable
    this.sum = temp;
  }

  build() {
    Column() {
      List() {
        LazyForEach(this.data, (item: string) => {
          ListItem() {
            // The parameters of subcomponents are transferred through state variables.
            ItemComponent({ desc: item, sum: this.sum })
          }
          .width('100%')
          .height(100)
        }, (item: string) => item)
      }
      .width('100%')
      .height('100%')
    }
  }
}
```