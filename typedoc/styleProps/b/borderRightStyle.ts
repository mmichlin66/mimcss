import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderRightStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderRightStyle", "solid")
    cls2 = this.$class({ borderRightStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderRightStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderRightStyle: "initial" })
}
