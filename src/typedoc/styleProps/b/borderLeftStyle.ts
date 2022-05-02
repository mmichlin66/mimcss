import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderLeftStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderLeftStyle", "solid")
    cls2 = this.$class({ borderLeftStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderLeftStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderLeftStyle: "initial" })
}
