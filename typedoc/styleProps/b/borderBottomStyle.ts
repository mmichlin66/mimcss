import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderBottomStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderBottomStyle", "solid")
    cls2 = this.$class({ borderBottomStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderBottomStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderBottomStyle: "initial" })
}
