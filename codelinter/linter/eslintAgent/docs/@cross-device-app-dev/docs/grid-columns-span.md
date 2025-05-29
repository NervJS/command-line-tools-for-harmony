# This rule validates the grid layout. (`grid-columns-span`)

## Rule Details

This setting is equivalent to a fixed percentage of the container width. It is not recommended for the responsive grid layout.

> See [**_documentation_**](https://developer.huawei.com/consumer/{{region}}/doc/harmonyos-guides-{{apiVersion}}/ide_grid-columns-span-{{apiVersion}}) for more details.

## Examples

Examples of **incorrect** code for this rule.

```ts
@Entry
@Component
struct Index {
  build() {
    GridRow({ columns: { sm: 4, md: 8, lg: 12 },
    }) {
      GridCol({ span: { sm: 4, md: 8, lg: 12 }
      }) {
        Row().backgroundColor($r('sys.color.ohos_id_color_palette_aux1'))
          .height(30).width('100%')
      }
    }
  }
}
```

Examples of **correct** code for this rule.

```ts
@Entry
@Component
export struct Index{
  build() {
    Column() {
      GridRow({ columns: { sm: 4, md: 8, lg: 12 },
      }) {
        GridCol({ span: { sm: 4, md: 4, lg: 4 }, offset: { sm: 0, md: 2, lg: 4 }
        }) {
          Row().backgroundColor($r('sys.color.ohos_id_color_palette_aux1'))
            .height(30).width('100%')
        }
      }
    }
  }
}
```
