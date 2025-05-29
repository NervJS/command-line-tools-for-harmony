# Use @ObjectLink instead of @Prop to reduce unnecessary deep copies (`hp-arkui-use-object-link-to-replace-prop`)

## Benefits from Code Optimization
Reduced frame loss in general cases.

## Rule Details
When you need to pass values between parent and child components, choosing the right decorator can significantly improve application performance. If the value of a state variable is not changed in the child component, using @Prop to decorate the state variable will mean more time required in component creation. 

> See [***documentation***](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_hp-arkui-use-object-link-to-replace-prop-{{apiVersion}}) or [***best practice***](https://developer.huawei.com/consumer/cn/doc/best-practices-V5/bpta-component-reuse-V5#section4470171391314) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Observed
class ClassA {
  public c: number = 0;
  constructor(c: number) {
    this.c = c;
  }
}
@Component
struct PropChild {
  // @Prop makes a deep copy.
  @Prop testNum: ClassA;
  build() {
    Text(`PropChild testNum ${this.testNum.c}`)
  }
}
@Entry
@Component
struct MyComponent {
  @State testNum: ClassA[] = [new ClassA(1)];
  build() {
    Column() {
      Text(`Parent testNum ${this.testNum[0].c}`)
        .onClick(() => {
          this.testNum[0].c += 1;
        })

      // PropChild does not change the value of @Prop testNum: ClassA. Therefore, @ObjectLink is a better choice.
      PropChild({ testNum: this.testNum[0] })
    }
  }
}
```
Examples of **correct** code for this rule.

In the preceding example, the **PropChild** component does not change the value of **@Prop testNum: ClassA**. In this case, @ObjectLink is a better choice, because @Prop makes a deep copy and increases performance overhead. 

```ts
@Observed
class ClassA {
  public c: number = 0;
  constructor(c: number) {
    this.c = c;
  }
}
@Component
struct PropChild {
  // When decorated by @ObjectLink, ClassA must be also decorated by @Observed.
  @ObjectLink testNum: ClassA;
  build() {
    Text(`PropChild testNum ${this.testNum.c}`)
  }
}
@Entry
@Component
struct MyComponent {
  @State testNum: ClassA[] = [new ClassA(1)];
  build() {
    Column() {
      Text(`Parent testNum ${this.testNum[0].c}`)
        .onClick(() => {
          this.testNum[0].c += 1;
        })

      // When a child component does not need to be changed locally, @ObjectLink is preferred over @Prop, whose deep copy can result in an increase in overhead.
      PropChild({ testNum: this.testNum[0] })
    }
  }}
```