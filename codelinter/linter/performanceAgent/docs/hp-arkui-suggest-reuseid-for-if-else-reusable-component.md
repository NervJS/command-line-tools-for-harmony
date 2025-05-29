# Use reuseId to mark the components of different structures (`hp-arkui-suggest-reuseid-for-if-else-reusable-component`)

## Benefits from Code Optimization
Reduced frame loss during swiping.

## Rule Details
When custom components are reused, using the **if/else** statements to control the layout structure may result in components being created with different layout structures in different logics and thereby different component tree structures. To enable the system to distinguish components of different structures and correctly cache components, consider using **reuseId**.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-reuseid-if-else-component-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section4981115441415) for more details.

## Examples

Examples of **incorrect** code for this rule.

In the following code example, ListItem contains if-else and uses the custom reuse component in the branch.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { ChartInfoEntry } from './data/DataEntry';
import { PublicChatItem } from './component/PublicChatItem';
import { ChatItem } from './component/ChatItem';

@Entry
@Component
struct MyComponent {
  private scroller: Scroller = new Scroller()
  private lazyChatList: MyDataSource = new MyDataSource();

  build() {
    Column() {
      List({ scroller: this.scroller }) {
        LazyForEach(this.lazyChatList, (item: ChartInfoEntry, index: number) => {
          ListItem() {
            // ListItem contains if-else and uses the customized reuse component in the branch.
            Button({ type: ButtonType.Normal }) {
              Row() {
                if (item['isPublicChat']) {
                  // Source code file. Set this parameter based on the site requirements.
                  PublicChatItem({ chatInfo: item as PublicChatItem })
                } else {
                  // Source code file. Set this parameter based on the site requirements.
                  ChatItem({ chatInfo: item as ChatItem })
                }
              }.padding({ left: 16, right: 16 })
            }
            .type(ButtonType.Normal)
            .width('100%')
            .height('100%')
            .borderRadius(0)
          }
          .height(72)
        }, (item: ChartInfoEntry) => item.id)
      }
      .cachedCount(3)
      .width('100%')
      .height('100%')
    }
  }
}
```

Examples of **correct** code for this rule.

It is recommended that `reuseId` be used to control component reuse.
```ts
// Source code file. Set this parameter based on the site requirements.
import { MyDataSource } from './MyDataSource';
import { ChartInfoEntry } from './data/DataEntry';
import { PublicChatItem } from './component/PublicChatItem';
import { ChatItem } from './component/ChatItem';

@Entry
@Component
struct MyComponent {
  private scroller: Scroller = new Scroller()
  private lazyChatList: MyDataSource = new MyDataSource();

  build() {
    Column() {
      List({ scroller: this.scroller }) {
        LazyForEach(this.lazyChatList, (item: ChartInfoEntry, index: number) => {
          ListItem() {
           // Use reuseId to control component reuse.
            ItemComponent({ chatInfo: item }).reuseId(this.lazyChatList.getReuseIdByIndex(index))
          }
          .height(72)
        }, (item: ChartInfoEntry) => item.id)
      }
      .cachedCount(3)
      .width('100%')
      .height('100%')
    }
  }
}

@Reusable
@Component
struct ItemComponent {
  @State chatInfo: ChartInfoEntry = new ChartInfoEntry()

  aboutToReuse(params: Record<string, ESObject>): void {
    this.chatInfo = params.chatInfo as ChartInfoEntry
  }

  build() {
    Button({ type: ButtonType.Normal }) {
      Row() {
        if (this.chatInfo['isPublicChat']) {
         // Source code file. Set this parameter based on the     site requirements.
          PublicChatItem({ chatInfo: chatInfo as ChartInfoEntry })
        } else {
          // Source code file. Set this parameter based on the site requirements.
          ChatItem({ chatInfo: this.chatInfo as ChatItem })
        }
      }.padding({ left: 16, right: 16 })
    }
    .type(ButtonType.Normal)
    .width('100%')
    .height('100%')
    .borderRadius(0)
  }
}
```