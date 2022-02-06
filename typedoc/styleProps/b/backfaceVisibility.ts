import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ backfaceVisibility: "visible" })

    // Using custom property
    customVar = this.$var( "backfaceVisibility", "hidden")
    cls2 = this.$class({ backfaceVisibility: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ backfaceVisibility: {"!": "visible"} })

    // Using with global values
    cls4 = this.$class({ backfaceVisibility: "initial" })
}
