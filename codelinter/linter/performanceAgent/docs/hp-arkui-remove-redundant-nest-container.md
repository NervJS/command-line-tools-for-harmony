# Avoid redundant nesting (`hp-arkui-remove-redundant-nest-container`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
Redundant nesting results in unnecessary component nodes and deepens the hierarchy of the component tree. For example, if internal and external containers have the same layout direction, you can use the external container in place of the internal one to reduce nesting.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-no-redundant-nest-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-nesting-optimization-V5#section5886145875813) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct MyComponent {
  @State children: Number[] = Array.from(Array<number>(900), (v, k) => k);

  build() {
    Scroll() {
      Grid() {
        ForEach(this.children, (item: Number[]) => {
          GridItem() {
            // Redundant stack
            Stack() {
              Stack() {
                Stack() {
                  Text(item.toString())
                }.size({ width: "100%"})
              }.backgroundColor(Color.Yellow)
            }.backgroundColor(Color.Pink)
          }
        }, (item: string) => item)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr')
      .columnsGap(0)
      .rowsGap(0)
      .size({ width: "100%", height: "100%" })
    }
  }
}
```

Examples of **correct** code for this rule.

```ts
@@Entry
@Component
struct MyComponent {
  @State children: Number[] = Array.from(Array<number>(900), (v, k) => k);

  build() {
    Scroll() {
      Grid() {
        ForEach(this.children, (item: Number[]) => {
          GridItem() {
            // After removing redundant stack
            Text(item.toString())
          }.backgroundColor(Color.Yellow)
        }, (item: string) => item)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr')
      .columnsGap(0)
      .rowsGap(0)
      .size({ width: "100%", height: "100%" })
    }
  }
}
```