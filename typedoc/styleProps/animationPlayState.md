The **animation-play-state** CSS property sets whether an animation is running or paused.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationPlayState: "paused" })

    // Using custom property
    varState = this.$var( "animationPlayState", "running")
    cls2 = this.$class({ animationPlayState: this.varState })

    // Using with "!important" flag
    cls3 = this.$class({ animationPlayState: {"!": "paused"} })

    // Using with global values
    cls4 = this.$class({ animationPlayState: "initial" })

    // Multiple values
    cls5 = this.$class({ animationPlayState: ["paused", "running", this.varState] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

