import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderBlockStartStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderBlockStartStyle", "solid")
    cls2 = this.$class({ borderBlockStartStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderBlockStartStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderBlockStartStyle: "initial" })
}
