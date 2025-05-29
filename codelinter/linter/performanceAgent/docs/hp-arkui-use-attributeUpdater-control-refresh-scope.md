# Use attributeUpdater to precisely control the update scope of component attributes (`hp-arkui-use-attributeUpdater-control-refresh-scope`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
When component reuse is employed, which typically involves frequent component updates, you are advised to use **attributeUpdater** to precisely control the update scope of component attributes. This can effectively avoid redundant re-renders, thereby reducing the main thread work and improving the swipe performance.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-hp-attribute-update-refresh-scope-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section4470171391314) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code, **color** is updated in **aboutToReuse**, and the **Text** component has many other attributes besides **color** being updated with **this.color**.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { FriendMoment } from './data/DataEntry'

@Component
export struct MyComponent {
  private momentData: MyDataSource = new MyDataSource();

  build() {
    Column() {
      Text('use nothing')
      List({ space: 5 }) {
        LazyForEach(this.momentData, (moment: FriendMoment) => {
          ListItem() {
            OneMomentNoModifier({ color: moment.color })
              .onClick(() => {
                console.log(`my id is ${moment.id}`)
              })
          }
        }, (moment: FriendMoment) => moment.id)
      }
      .width("100%")
      .height("100%")
      .cachedCount(5)
    }
  }
}

@Reusable
@Component
export struct OneMomentNoModifier {
  @State color: string | number | Resource = "";

  aboutToReuse(params: Record<string, Object>): void {
    this.color = params.color as number;
  }

  build() {
    Column() {
      Text('This is the title')
      Text('This is the internal text')
        .fontColor(this.color)
        .textAlign(TextAlign.Center)
        .fontStyle(FontStyle.Normal)
        .fontSize(13)
        .lineHeight(30)
        .opacity(0.6)
        .margin({ top: 10 })
        .fontWeight(30)
        .clip(false)
        .backgroundBlurStyle(BlurStyle.NONE)
        .foregroundBlurStyle(BlurStyle.NONE)
        .borderWidth(1)
        .borderColor(Color.Pink)
        .borderStyle(BorderStyle.Solid)
        .alignRules({
          'top': { 'anchor': '__container__', 'align': VerticalAlign.Top },
          'left': { 'anchor': 'image', 'align': HorizontalAlign.End }
        })
    }
  }
}
```

Examples of **correct** code for this rule.

In the following code, **attributeUpdater** is used to control the update scope.
```ts
import { AttributeUpdater } from '@ohos.arkui.modifier';
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { FriendMoment } from './data/DataEntry'

export class MyTextUpdater extends AttributeUpdater<TextAttribute> {
  private color: string | number | Resource = "";

  constructor(color: string | number | Resource) {
    super();
    this.color = color
  }

  initializeModifier(instance: TextAttribute): void {
    instance.fontColor(this.color)
  }
}

@Component
export struct MyComponent {
  private momentData: MyDataSource = new MyDataSource();

  build() {
    Column() {
      Text('use MyTextUpdater')
      List({ space: 5 }) {
        LazyForEach(this.momentData, (moment: FriendMoment) => {
          ListItem() {
            OneMomentNoModifier({ color: moment.color })
              .onClick(() => {
                console.log(`my id is ${moment.id}`)
              })
          }
        }, (moment: FriendMoment) => moment.id)
      }.width('100%')
      .height('100%')
      .cachedCount(5)
    }
  }
}

@Reusable
@Component
export struct OneMomentNoModifier {
  color: string | number | Resource = "";
  textUpdater: MyTextUpdater | null = null;

  aboutToAppear(): void {
    this.textUpdater = new MyTextUpdater(this.color);
  }

  aboutToReuse(params: Record<string, Object>): void {
    this.color = params.color as string;
    this.textUpdater?.attribute?.fontColor(this.color);
  }

  build() {
    Column() {
      Text('This is the title')
      Text('This is the internal text')
        .attributeModifier(this.textUpdater) // Use attributeUpdater to accurately refresh the fontColor attributes that need to be updated to avoid unnecessary attribute refreshes
        .textAlign(TextAlign.Center)
        .fontStyle(FontStyle.Normal)
        .fontSize(13)
        .lineHeight(30)
        .opacity(0.6)
        .margin({ top: 10 })
        .fontWeight(30)
        .clip(false)
        .backgroundBlurStyle(BlurStyle.NONE)
        .foregroundBlurStyle(BlurStyle.NONE)
        .borderWidth(1)
        .borderColor(Color.Pink)
        .borderStyle(BorderStyle.Solid)
        .alignRules({
          'top': { 'anchor': '__container__', 'align': VerticalAlign.Top },
          'left': { 'anchor': 'image', 'align': HorizontalAlign.End }
        })
    }
  }
}
```