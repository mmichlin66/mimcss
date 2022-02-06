import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignmentBaseline: "middle" })

    // Using custom property
    customVar = this.$var( "alignmentBaseline", "mathematical")
    cls2 = this.$class({ alignmentBaseline: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ alignmentBaseline: {"!": "after-edge"} })

    // Using with global values
    cls4 = this.$class({ alignmentBaseline: "initial" })
}
