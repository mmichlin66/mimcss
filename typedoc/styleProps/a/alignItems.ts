import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignItems: "flex-start" })

    // Using custom property
    customVar = this.$var( "alignItems", "first baseline")
    cls2 = this.$class({ alignItems: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ alignItems: {"!": "safe center"} })

    // Using with global values
    cls4 = this.$class({ alignItems: "initial" })
}
