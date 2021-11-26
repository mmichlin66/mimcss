The **appearance** CSS property is used to display an element using platform-native styling, based on the operating system's theme.

In Mimcss, the **appearance** property has the type of `string` and thus accepts any string value. Although the latest standard only lists several string literals as possible values, the browser vendors used to support numerous other string literals. In order to allow all thee values to be specified, Mimcss decided to use the `string` type. Note, however, that this disables any compile-time checking so you should be extra cautious when assigning values to this property.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ appearance: "none" })

    // Using custom property
    varAppearance = this.$var( "appearance", "auto")
    cls2 = this.$class({ appearance: this.varAppearance })

    // Using with "!important" flag
    cls3 = this.$class({ appearance: {"!": "textfield"} })

    // Using with global values
    cls4 = this.$class({ appearance: "initial" })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/appearance" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/appearance" target="css-tricks">CSS-Tricks Almanac</a>

