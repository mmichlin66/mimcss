The **align-self** CSS property overrides a grid or flex item's align-items value. In Grid, it aligns the item inside the grid area. In Flexbox, it aligns the item on the cross axis.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignSelf: "self-start" })

    // Using custom property
    defaultAlignSelf = this.$var( "alignItems", "first baseline")
    cls2 = this.$class({ alignSelf: this.defaultAlignSelf })

    // Using with "!important" flag
    cls3 = this.$class({ alignSelf: {"!": "safe center"} })

    // Using with global values
    cls4 = this.$class({ alignSelf: "initial" })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-self" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/align-self" target="mdn">CSS-Tricks Almanac</a>

