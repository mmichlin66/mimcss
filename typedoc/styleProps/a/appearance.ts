import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ appearance: "none" })

    // Using custom property
    customVar = this.$var( "appearance", "auto")
    cls2 = this.$class({ appearance: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ appearance: {"!": "textfield"} })

    // Using with global values
    cls4 = this.$class({ appearance: "initial" })
}
