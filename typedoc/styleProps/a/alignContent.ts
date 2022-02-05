import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ alignContent: "stretch" })

    // Using custom property
    defaultAlignContent = this.$var( "alignContent", "first baseline")
    cls2 = this.$class({ alignContent: this.defaultAlignContent })

    // Using with "!important" flag
    cls3 = this.$class({ alignContent: {"!": "safe center"} })

    // Using with global values
    cls4 = this.$class({ alignContent: "initial" })
}
