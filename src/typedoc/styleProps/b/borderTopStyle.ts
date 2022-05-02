import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderTopStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderTopStyle", "solid")
    cls2 = this.$class({ borderTopStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderTopStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderTopStyle: "initial" })
}
