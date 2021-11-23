The **animation-fill-mode** CSS property sets how a CSS animation applies styles to its target before and after its execution.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationFillMode: "forwards" })

    // Using custom property
    varMode = this.$var( "animationFillMode", "none")
    cls2 = this.$class({ animationFillMode: this.varMode })

    // Using with "!important" flag
    cls3 = this.$class({ animationFillMode: {"!": "backwards"} })

    // Using with global values
    cls4 = this.$class({ animationFillMode: "initial" })

    // Multiple values
    cls5 = this.$class({ animationFillMode: ["forwards", "both", this.varMode] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>

