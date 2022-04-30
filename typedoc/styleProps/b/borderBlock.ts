import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using border style keyword
    cls1 = this.$class({ borderBlock: "dashed" })

    // Using border width keyword
    cls2 = this.$class({ borderBlock: "thick" })

    // Using border width number (borderBlock: 2px)
    cls3 = this.$class({ borderBlock: 2 })

    // Using border width non-numeric color. Note that a single numeric value is
    // always treated as a width
    cls4 = this.$class({ borderBlock: "red" })
    cls5 = this.$class({ borderBlock: css.rgb( 100, 30, 200) })

    // Using object
    cls6 = this.$class({
        borderBlock: {
            color: 0xaa0033,
            style: "groove",
            width: 3
        }
    })

    // Using tuples. The first numeric value in a tuple is always treated as line width;
    // thereofore, a numeric color value can only follow a line width value. A non-numeric
    // color value can be at any place in the tuple.
    cls7 = this.$class({ borderBlock: [1, "solid"] })
    cls8 = this.$class({ borderBlock: [1, "solid", 0xaa0033] })
    cls9 = this.$class({ borderBlock: ["thin", "double"] })
    cls10 = this.$class({ borderBlock: ["thin", 0xaa0033, "double"] })
    cls11 = this.$class({ borderBlock: ["red", "double", 1] })
    cls12 = this.$class({ borderBlock: ["red", "thin", "dotted"] })

    // Using custom property
    customVar = this.$var( "border", [1, "solid", 0xaa0033])
    cls13 = this.$class({ borderBlock: this.customVar })

    // Using with "!important" flag
    cls14 = this.$class({ borderBlock: [1, "solid", 0xaa0033] })

    // Don't apply any border
    cls15 = this.$class({ borderBlock: "none" })

    // Using with global values
    cls16 = this.$class({ borderBlock: "initial" })
}
