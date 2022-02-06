import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationTimingFunction: "ease-in-out" })

    // Using `steps()` function
    cls2 = this.$class({ animationTimingFunction: css.steps(4, "jump-start") })

    // Using `cubic-bezier()` function
    cls3 = this.$class({ animationTimingFunction: css.cubicBezier(0.1, 0.7, 1.0, 0.1) })

    // Using custom property
    customVar = this.$var( "animationTimingFunction", css.steps(6, "start"))
    cls4 = this.$class({ animationTimingFunction: this.customVar })

    // Using with global values
    cls5 = this.$class({ animationTimingFunction: "initial" })

    // Multiple values
    cls6 = this.$class({ animationTimingFunction: ["ease-in-out", css.cubicBezier(0.1, 0.7, 1.0, 0.1), this.customVar] })
}
