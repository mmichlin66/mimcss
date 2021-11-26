The **aspect-ratio** CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ aspectRatio: "4/3" })

    // using the `ratio()` function
    cls2 = this.$class({ aspectRatio: css.ratio( 16, 9)})

    // using a single number
    cls4 = this.$media({ aspectRatio: 1.33 }, ...)

    // Using custom property
    varRatio = this.$var( "aspectRatio", "185/100")
    cls5 = this.$class({ aspectRatio: this.varRatio })

    // Using with "!important" flag
    cls6 = this.$class({ aspectRatio: {"!": 1} })

    // Using with global values
    cls7 = this.$class({ aspectRatio: "initial" })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/aspect-ratio" target="css-tricks">CSS-Tricks Almanac</a>

