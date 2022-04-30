import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderBlockStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderBlockStyle", "solid")
    cls2 = this.$class({ borderBlockStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderBlockStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderBlockStyle: "initial" })
}
