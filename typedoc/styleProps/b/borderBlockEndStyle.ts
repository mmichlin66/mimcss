import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderBlockEndStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderBlockEndStyle", "solid")
    cls2 = this.$class({ borderBlockEndStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderBlockEndStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderBlockEndStyle: "initial" })
}
