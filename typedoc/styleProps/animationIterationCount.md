The **animation-iteration-count** CSS property sets the number of times an animation sequence should be played before stopping.

If multiple values are specified, each time the animation is played the next value in the list is used, cycling back to the first value after the last one is used.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationIterationCount: "infinite" })

    // Using number
    cls2 = this.$class({ animationIterationCount: 2 })

    // Using custom property
    varCount = this.$var( "animationIterationCount", "1")
    cls3 = this.$class({ animationIterationCount: this.varCount })

    // Using with "!important" flag
    cls4 = this.$class({ animationIterationCount: {"!": 3} })

    // Using with global values
    cls5 = this.$class({ animationIterationCount: "initial" })

    // Multiple values
    cls6 = this.$class({ animationIterationCount: ["infinite", 3, this.varCount] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

