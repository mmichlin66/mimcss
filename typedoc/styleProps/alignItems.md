The CSS **align-items** property sets the align-self value on all direct children as a group. In Flexbox, it controls the alignment of items on the Cross Axis. In Grid Layout, it controls the alignment of items on the Block Axis within their grid area.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignItems: "flex-start" })

    // Using custom property
    defaultAlignItems = this.$var( "alignItems", "first baseline")
    cls2 = this.$class({ alignItems: this.defaultAlignItems })

    // Using with "!important" flag
    cls3 = this.$class({ alignItems: {"!": "safe center"} })

    // Using with global values
    cls4 = this.$class({ alignItems: "initial" })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items" target="mdn">MDN Page</a>

