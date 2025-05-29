# @Entry decorated components and @Preview decorated root components should not contain decorators forbidding local initialization. (`no-unallowed-decorator-on-root-component`)

## Rule Details

To be previewed properly, an @Entry decorated component should be clear of the @Consume, @Link, @ObjectLink, and @Prop decorators, and it is recommended that an @Preview decorated component should have a parent container with a valid, runtime-independent default value.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_no-unallowed-decorator-on-root-component-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Preview
@Component
struct LinkSample {
  @Link message: string;
  build() {
    Row() {
      Text(this.message)
    }
  }
}
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
struct LinkSampleContainer {
  @State message: string = 'Hello World';
  build() {
    Row() {
      LinkSample({message: this.message})
    }
  }
}

@Component
struct LinkSample {
  @Link message: string;
  build() {
    Row() {
      Text(this.message)
    }
  }
}
```
