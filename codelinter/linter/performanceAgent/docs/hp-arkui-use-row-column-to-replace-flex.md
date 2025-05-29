# Replace Flex with Column/Row (`hp-arkui-use-row-column-to-replace-flex`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
In the Flex nesting scenario, the flex container needs to re-layout the flex items to match the **flexShrink** and **flexGrow** settings. This may cause a decrease in rendering performance.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-row-column-to-replace-flex-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V1/bpta-improve-layout-performance-0000001658183646-V1#section13346921145813) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct MyComponent {
  build() {
    // Flex Nesting
    Flex({ direction: FlexDirection.Column }) {
      Text('Replace Flex with Column/Row')
        .fontSize(12)
        .height('16')
        .margin({
          top: 5,
          bottom: 10
        })
      Flex().width(300).height(200).backgroundColor(Color.Pink)
      Flex().width(300).height(200).backgroundColor(Color.Yellow)
      Flex().width(300).height(200).backgroundColor(Color.Grey)
      Flex().width(300).height(200).backgroundColor(Color.Pink)
      Flex().width(300).height(200).backgroundColor(Color.Yellow)
      Flex().width(300).height(200).backgroundColor(Color.Grey)
    }.height(200)
  }
}
```

Examples of **correct** code for this rule.

In this example, **\<Column>** components are used in place of **\<Flex>** to bring out the same page layout without the negative impact of re-layout.
```ts
@Entry
@Component
struct MyComponent {
  build() {
    // Replace Flex with Column/Row
    Column() {
      Text('Replace Flex with Column/Row')
        .fontSize(12)
        .height('16')
        .margin({
          top: 5,
          bottom: 10
        })
      Flex().width(300).height(200).backgroundColor(Color.Pink)
      Flex().width(300).height(200).backgroundColor(Color.Yellow)
      Flex().width(300).height(200).backgroundColor(Color.Grey)
      Flex().width(300).height(200).backgroundColor(Color.Pink)
      Flex().width(300).height(200).backgroundColor(Color.Yellow)
      Flex().width(300).height(200).backgroundColor(Color.Grey)
    }.height(200)
  }
}
```