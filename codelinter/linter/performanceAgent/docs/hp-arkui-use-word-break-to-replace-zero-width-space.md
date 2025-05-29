# Use word-break to replace zero-width spaces (\u200b) (`hp-arkui-use-word-break-to-replace-zero-width-space`)

## Benefits from Code Optimization
Alignment with ArkUI coding guidelines.

## Rule Details
Use word-break to reduce the load on the render service side during text rendering.

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-word-break-in-space-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-time-optimization-of-the-main-thread-V5#section193673511440) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Component
export struct MyComponent {
  private diskName: string = '';

  build() {
    // Zero-width space used
    Text(this.diskName.split("").join("\u200B"))
      .textAlign(TextAlign.Start)
  }
}
```

Examples of **correct** code for this rule.

```ts
@Component
export struct MyComponent {
  private diskName: string = '';

  build() {
    Text(this.diskName)
      .textAlign(TextAlign.Start)
      .wordBreak(WordBreak.BREAK_ALL)
  }
}
```