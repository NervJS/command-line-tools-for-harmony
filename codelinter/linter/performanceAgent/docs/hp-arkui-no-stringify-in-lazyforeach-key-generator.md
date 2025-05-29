# Do not use stringify in the key generator function of LazyForEach (`hp-arkui-no-stringify-in-lazyforeach-key-generator`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details
Do not use any time-consuming function as the key generator of **LazyForEach**. For example, **JSON.stringify** is time-consuming, and you are advised to convert the JSON object into a string as the key. 

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-no-stringify-lazyforeach-key-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-lazyforeach-optimization-V5#section68711519072) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code example, the key generation function of LazyForEach calls `JSON.stringify` to calculate the key of the entire item, which is time-consuming.
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

class Item {
  advertInfos: Model[] = []
  productPrice: PriceInfo[] = []
  addresses: string[] = []
  id: string = ''
}

class Model {
  pictureUrl: string = ""
  name: string = ""
  comments: string = ""
  desc: string = ""
  linkParam: string = ""
  mcInfo: string = ""
  label: string = ""
  cgType: string = ""

  constructor(pictureUrl: string, name: string, comments: string, desc: string, linkParam: string, mcInfo: string,
    label: string, cgType: string) {
    this.pictureUrl = pictureUrl;
    this.name = name;
    this.comments = comments;
    this.desc = desc;
    this.linkParam = linkParam;
    this.mcInfo = mcInfo;
    this.label = label;
    this.cgType = cgType;
  }
}

class PriceInfo {
  price: number = 0;
  level: number = 1;

  constructor(price: number, level: number) {
    this.price = price;
    this.level = level;
  }
}

@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();

  aboutToAppear(): void {
    for (let index = 0; index < 20; index++) {
      let item = new Item()
      for (let i = 0; i < 1000; i++) {
        item.advertInfos.push(new Model("Product A", "Product A", "Product A", "Product A", "Product A", "Product A", "Product A", "Product A"));
        item.productPrice.push(new PriceInfo(1.99, 123456));
        item.addresses.push("Beijing")
      }
      item.id = index.toString();
      this.data.pushData(item)
    }
  }

  build() {
    Column() {
      Text('Use the time-consuming function `JSON.stringify (item)` to generate a key')
        .fontSize(12)
        .height('16')
        .margin({
          top: 5,
          bottom: 10
        })
      List() {
        LazyForEach(this.data, (item: Item) => {
          ListItem() {
            ItemComponent({ desc: item.id, sum: 0, avg: 0 })
          }
          .width('100%')
          .height('10%')
          .border({ width: 1 })
          .borderStyle(BorderStyle.Dashed)
        }, (item: Item) => JSON.stringify(item))
      }
      .height('100%')
      .width('100%')
    }
  }
}


```

Examples of **correct** code for this rule.

You are advised to use a simple function to calculate the key of each item and ensure that the key is unique.
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
class Item {
  advertInfos: Model[] = []
  productPrice: PriceInfo[] = []
  addresses: string[] = []
  id: string = ''
}
class Model {
  pictureUrl: string = ""
  name: string = ""
  comments: string = ""
  desc: string = ""
  linkParam: string = ""
  mcInfo: string = ""
  label: string = ""
  cgType: string = ""
  constructor(pictureUrl: string, name: string, comments: string, desc: string, linkParam: string, mcInfo: string,
    label: string, cgType: string) {
    this.pictureUrl = pictureUrl;
    this.name = name;
    this.comments = comments;
    this.desc = desc;
    this.linkParam = linkParam;
    this.mcInfo = mcInfo;
    this.label = label;
    this.cgType = cgType;
  }
}
class PriceInfo {
  price: number = 0;
  level: number = 1;
  constructor(price: number, level: number) {
    this.price = price;
    this.level = level;
  }
}
@Entry
@Component
struct MyComponent {
  private data: MyDataSource = new MyDataSource();
  aboutToAppear(): void {
    for (let index = 0; index < 20; index++) {
      let item = new Item()
      for (let i = 0; i < 1000; i++) {
        item.advertInfos.push(new Model("Product A", "Product A", "Product A", "Product A", "Product A", "Product A", "Product A", "Product A"));
        item.productPrice.push(new PriceInfo(1.99, 123456));
        item.addresses.push("Beijing")
      }
      item.id = index.toString();
      this.data.pushData(item)
    }
  }
  build() {
    Column() {
      Text('Use the unique ID of an item as the key')
        .fontSize(12)
        .height('16')
        .margin({
          top: 5,
          bottom: 10
        })
      List() {
        LazyForEach(this.data, (item: Item) => {
          ListItem() {
            ItemComponent({ desc: item.id, sum: 0, avg: 0 })
          }
          .width('100%')
          .height('10%')
          .border({ width: 1 })
          .borderStyle(BorderStyle.Dashed)
        }, (item: Item) => item.id.toString())
      }
      .height('100%')
      .width('100%')
    }
  }
}
```