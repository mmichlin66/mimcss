The **animation-duration** CSS property sets the length of time that an animation takes to complete one cycle.

In Mimcss, the type of this property is [[CssTime]]. Integer numbers are treated as time in milliseconds; floating point numbers are treated as time in seconds.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using floating point number to indicate seconds: 5s
    cls1 = this.$class({ animationDuration: 0.5 })

    // Using integer number to indicate milliseconds: 300s
    cls2 = this.$class({ animationDuration: 300 })

    // Using time-unit function: 3s
    cls3 = this.$class({ animationDuration: css.s(3) })

    // Using time-unit function: -500ms
    cls4 = this.$class({ animationDuration: css.ms(-500) })

    // Using custom property
    varDuration = this.$var( "animationDuration", 1000)
    cls5 = this.$class({ animationDuration: this.varDuration }})

    // Using min() CSS function
    cls6 = this.$class({ animationDuration: css.Time.min( 2000, this.varDuration) })

    // Multiple values
    cls7 = this.$class({ animationDuration: [0.5, -300, this.varDuration] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

