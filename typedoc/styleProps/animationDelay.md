The **animation-delay** CSS property specifies the amount of time to wait from applying the animation to an element before beginning to perform the animation. The animation can start later, immediately from its beginning, or immediately and partway through the animation.

In Mimcss, the type of this property is [[CssTime]]. Integer numbers are treated as time in milliseconds; floating point numbers are treated as time in seconds.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using floating point number to indicate seconds: 5s
    cls1 = this.$class({ animationDelay: 0.5 })

    // Using integer number to indicate milliseconds: 300s
    cls2 = this.$class({ animationDelay: 300 })

    // Using time-unit function: 3s
    cls3 = this.$class({ animationDelay: css.s(3) })

    // Using time-unit function: -500ms
    cls4 = this.$class({ animationDelay: css.ms(-500) })

    // Using custom property
    varDelay = this.$var( "animationDelay", 1000)
    cls5 = this.$class({ animationDelay: this.varDelay }})

    // Using min() CSS function
    cls6 = this.$class({ animationDelay: css.Time.min( 2000, this.varDelay) })

    // Multiple values
    cls7 = this.$class({ animationDelay: [0.5, -300, this.varDelay] })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

