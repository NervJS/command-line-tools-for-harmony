# This rule validates the initial values of the width and height attributes of the List component. (`init-list-component`)

## Rule Details

This rule validates the initial values of the width and height attributes of the List component.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide-init-list-component-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Component
struct Greeting {
  @Builder myBuilder() {
    // missing initialization of attribute 'height'
    List().width(10)
  }
  build() {
    // missing initialization of attribute 'width'
    List().height(10);
  }
}

@Builder function myBuilder() {
  // missing initialization of attribute 'height'
  List().width(10)
}
```

```ts
@Extend(List) function extendList () {
  .width(20)
}

@Component
struct Greeting {
  build() {
    // missing initialization of attribute 'height' in List and extend-List-function 'extendList'
    List().width(10).extendList();
  }
}
```

```ts
@Styles function globalStyle () {
  .width(30)
}

@Component
struct Greeting {
  build() {
    // missing initialization of attribute 'height' in List and styles-function 'globalStyle'
    List() {
    }.width(10).globalStyle();
  }
}
```

Examples of **correct** code for this rule.

```ts
@Component
struct Greeting {
  @Builder myBuilder() {
    List().width(10).height(10)
  }
  build() {
    List() {
    }.width(10).height(10);
  }
}

@Builder function globalBuilder() {
  List().width(10).height(10)
}
```

```ts
@Extend(List) function extendList () {
  .height(20)
  .width(10)
}

@Component
struct Greeting {
  @Builder myBuilder() {
    List(){}.extendList()
  }
  build() {
    List().extendList()
  }
}

@Builder function globalBuilder() {
  List(){}.extendList()
}
```

```ts
@Extend(List) function extendList () {
  .height(20)
}

@Component
struct Greeting {
  @Builder myBuilder() {
    List().width(10).extendList()
  }
  build() {
    List() {
    }.width(10).extendList()
  }
}

@Builder function globalBuilder() {
  List() {
  }.width(10).extendList()
}
```

```ts
@Styles function globalStyle () {
  .width(30)
  .height(30)
}

@Component
struct Greeting {
  @Builder myBuilder() {
    List() {
    }.globalStyle()
  }
  build() {
    List().globalStyle()
  }
}

@Builder function globalBuilder() {
  List().globalStyle()
}
```
