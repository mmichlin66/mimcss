import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignContent: "stretch" })

    // Using custom property
    customVar = this.$var( "alignContent", "first baseline")
    cls2 = this.$class({ alignContent: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ alignContent: {"!": "safe center"} })

    // Using with global values
    cls4 = this.$class({ alignContent: "initial" })
}
