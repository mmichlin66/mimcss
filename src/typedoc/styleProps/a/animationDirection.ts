import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationDirection: "reverse" })

    // Using custom property
    customVar = this.$var( "animationDirection", "normal")
    cls2 = this.$class({ animationDirection: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ animationDirection: {"!": "alternate"} })

    // Using with global values
    cls4 = this.$class({ animationDirection: "initial" })

    // Multiple values
    cls5 = this.$class({ animationDirection: ["normal", "alternate", this.customVar] })
}
