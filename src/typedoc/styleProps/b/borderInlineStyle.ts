import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderInlineStyle: "dashed" })

    // Using custom property
    customVar = this.$var( "borderInlineStyle", "solid")
    cls2 = this.$class({ borderInlineStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderInlineStyle: {"!": "double"} })

    // Using with global values
    cls4 = this.$class({ borderInlineStyle: "initial" })
}
