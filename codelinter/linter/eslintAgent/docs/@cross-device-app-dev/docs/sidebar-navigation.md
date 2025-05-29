# This rule validates the navigation bar settings for PCs and tablets. (`sidebar-navigation`)

## Rule Details

For PCs and tablets the Tabs component should be set to serve as a side navigation bar.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_sidebar-navigation-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
  build() {
    Tabs() {
        TabContent() {
        }.tabBar("1")
        TabContent() {
        }.tabBar("2")
    }
  }
}
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
struct Index {
    build() {
        Tabs() {
            TabContent() {
            }.tabBar("1")
            TabContent() {
            }.tabBar("2")
        }
        .vertical(true)
    }
}
```
