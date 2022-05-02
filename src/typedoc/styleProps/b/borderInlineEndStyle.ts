import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderInlineEndStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderInlineEndStyle", "solid")
    cls2 = this.$class({ borderInlineEndStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderInlineEndStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderInlineEndStyle: "initial" })
}
