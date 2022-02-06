import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationPlayState: "paused" })

    // Using custom property
    customVar = this.$var( "animationPlayState", "running")
    cls2 = this.$class({ animationPlayState: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ animationPlayState: {"!": "paused"} })

    // Using with global values
    cls4 = this.$class({ animationPlayState: "initial" })

    // Multiple values
    cls5 = this.$class({ animationPlayState: ["paused", "running", this.customVar] })
}
