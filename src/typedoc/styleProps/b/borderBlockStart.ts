import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using border style keyword
    cls1 = this.$class({ borderBlockStart: "dashed" })

    // Using border width keyword
    cls2 = this.$class({ borderBlockStart: "thick" })

    // Using border width number (borderBlockStart: 2px)
    cls3 = this.$class({ borderBlockStart: 2 })

    // Using border width non-numeric color. Note that a single numeric value is
    // always treated as a width
    cls4 = this.$class({ borderBlockStart: "red" })
    cls5 = this.$class({ borderBlockStart: css.rgb( 100, 30, 200) })

    // Using object
    cls6 = this.$class({
        borderBlockStart: {
            color: 0xaa0033,
            style: "groove",
            width: 3
        }
    })

    // Using tuples. The first numeric value in a tuple is always treated as line width;
    // thereofore, a numeric color value can only follow a line width value. A non-numeric
    // color value can be at any place in the tuple.
    cls7 = this.$class({ borderBlockStart: [1, "solid"] })
    cls8 = this.$class({ borderBlockStart: [1, "solid", 0xaa0033] })
    cls9 = this.$class({ borderBlockStart: ["thin", "double"] })
    cls10 = this.$class({ borderBlockStart: ["thin", 0xaa0033, "double"] })
    cls11 = this.$class({ borderBlockStart: ["red", "double", 1] })
    cls12 = this.$class({ borderBlockStart: ["red", "thin", "dotted"] })

    // Using custom property
    customVar = this.$var( "border", [1, "solid", 0xaa0033])
    cls13 = this.$class({ borderBlockStart: this.customVar })

    // Using with "!important" flag
    cls14 = this.$class({ borderBlockStart: [1, "solid", 0xaa0033] })

    // Don't apply any border
    cls15 = this.$class({ borderBlockStart: "none" })

    // Using with global values
    cls16 = this.$class({ borderBlockStart: "initial" })
}
