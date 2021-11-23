The **animation-timing-function** CSS property sets how an animation progresses through the duration of each cycle.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationTimingFunction: "ease-in-out" })

    // Using `steps()` function
    cls2 = this.$class({ animationTimingFunction: css.steps(4, "jump-start") })

    // Using `cubic-bezier()` function
    cls3 = this.$class({ animationTimingFunction: css.cubic-bezier(0.1, 0.7, 1.0, 0.1) })

    // Using custom property
    varFunc = this.$var( "animationTimingFunction", css.steps(6, "start"))
    cls4 = this.$class({ animationTimingFunction: this.varFunc })

    // Using with global values
    cls5 = this.$class({ animationTimingFunction: "initial" })

    // Multiple values
    cls6 = this.$class({ animationTimingFunction: ["ease-in-out", css.cubic-bezier(0.1, 0.7, 1.0, 0.1), this.varFunc] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

