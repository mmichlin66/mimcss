The **alignment-baseline** attribute specifies how an object is aligned with respect to its parent. This property specifies which baseline of this element is to be aligned with the corresponding baseline of the parent. For example, this allows alphabetic baselines in Roman text to stay aligned across font size changes. It defaults to the baseline with the same name as the computed value of the alignment-baseline property.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignmentBaseline: "middle" })

    // Using custom property
    defaultAlignmentBaseline = this.$var( "alignmentBaseline", "mathematical")
    cls2 = this.$class({ alignmentBaseline: this.defaultAlignmentBaseline })

    // Using with "!important" flag
    cls3 = this.$class({ alignmentBaseline: {"!": "after-edge"} })

    // Using with global values
    cls4 = this.$class({ alignmentBaseline: "initial" })
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline" target="mdn">MDN Page</a>

