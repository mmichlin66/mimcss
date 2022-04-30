import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using border style keyword
    cls1 = this.$class({ borderLeft: "dashed" })

    // Using border width keyword
    cls2 = this.$class({ borderLeft: "thick" })

    // Using border width number (borderLeft: 2px)
    cls3 = this.$class({ borderLeft: 2 })

    // Using border width non-numeric color. Note that a single numeric value is
    // always treated as a width
    cls4 = this.$class({ borderLeft: "red" })
    cls5 = this.$class({ borderLeft: css.rgb( 100, 30, 200) })

    // Using object
    cls6 = this.$class({
        borderLeft: {
            color: 0xaa0033,
            style: "groove",
            width: 3
        }
    })

    // Using tuples. The first numeric value in a tuple is always treated as line width;
    // thereofore, a numeric color value can only follow a line width value. A non-numeric
    // color value can be at any place in the tuple.
    cls7 = this.$class({ borderLeft: [1, "solid"] })
    cls8 = this.$class({ borderLeft: [1, "solid", 0xaa0033] })
    cls9 = this.$class({ borderLeft: ["thin", "double"] })
    cls10 = this.$class({ borderLeft: ["thin", 0xaa0033, "double"] })
    cls11 = this.$class({ borderLeft: ["red", "double", 1] })
    cls12 = this.$class({ borderLeft: ["red", "thin", "dotted"] })

    // Using custom property
    customVar = this.$var( "border", [1, "solid", 0xaa0033])
    cls13 = this.$class({ borderLeft: this.customVar })

    // Using with "!important" flag
    cls14 = this.$class({ borderLeft: [1, "solid", 0xaa0033] })

    // Don't apply any border
    cls15 = this.$class({ borderLeft: "none" })

    // Using with global values
    cls16 = this.$class({ borderLeft: "initial" })
}
