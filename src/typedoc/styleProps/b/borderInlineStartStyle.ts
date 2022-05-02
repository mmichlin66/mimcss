import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderInlineStartStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderInlineStartStyle", "solid")
    cls2 = this.$class({ borderInlineStartStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderInlineStartStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderInlineStartStyle: "initial" })
}
