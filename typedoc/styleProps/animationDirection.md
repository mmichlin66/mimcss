The **animation-direction** CSS property sets whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationDirection: "reverse" })

    // Using custom property
    varDirection = this.$var( "animationDirection", "normal")
    cls2 = this.$class({ animationDirection: this.varDirection })

    // Using with "!important" flag
    cls3 = this.$class({ animationDirection: {"!": "alternate"} })

    // Using with global values
    cls4 = this.$class({ animationDirection: "initial" })

    // Multiple values
    cls5 = this.$class({ animationDirection: ["normal", "alternate", this.varDirection] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

