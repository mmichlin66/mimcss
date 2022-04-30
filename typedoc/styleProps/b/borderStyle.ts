import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ borderStyle: "dashed" })
    cls1a = this.$class({ borderStyle: ["solid", "dotted"] })
    cls1b = this.$class({ borderStyle: ["dashed", "solid", "double"] })
    cls1c = this.$class({ borderStyle: ["inset", "outset", "groove", "none"] })

    // Using custom property
    customVar = this.$var( "borderStyle", ["dashed", "solid", "double", "none"])
    cls2 = this.$class({ borderStyle: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ borderStyle: {"!": ["solid", "dotted"]} })

    // Using with global values
    cls4 = this.$class({ borderStyle: "initial" })
}
