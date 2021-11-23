The CSS **align-content** property sets the distribution of space between and around content items along a flexbox's cross-axis or a grid's block axis.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignContent: "stretch" })

    // Using custom property
    defaultAlignContent = this.$var( "alignContent", "first baseline")
    cls2 = this.$class({ alignContent: this.defaultAlignContent })

    // Using with "!important" flag
    cls3 = this.$class({ alignContent: {"!": "safe center"} })

    // Using with global values
    cls4 = this.$class({ alignContent: "initial" })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-content" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/align-content" target="css-tricks">CSS-Tricks Almanac</a>

