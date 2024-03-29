import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationFillMode: "forwards" })

    // Using custom property
    customVar = this.$var( "animationFillMode", "none")
    cls2 = this.$class({ animationFillMode: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ animationFillMode: {"!": "backwards"} })

    // Using with global values
    cls4 = this.$class({ animationFillMode: "initial" })

    // Multiple values
    cls5 = this.$class({ animationFillMode: ["forwards", "both", this.customVar] })
}
