import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ animationIterationCount: "infinite" })

    // Using number
    cls2 = this.$class({ animationIterationCount: 2 })

    // Using custom property
    varCount = this.$var( "animationIterationCount", 1)
    cls3 = this.$class({ animationIterationCount: this.varCount })

    // Using with "!important" flag
    cls4 = this.$class({ animationIterationCount: {"!": 3} })

    // Using with global values
    cls5 = this.$class({ animationIterationCount: "initial" })

    // Multiple values
    cls6 = this.$class({ animationIterationCount: ["infinite", 3, this.varCount] })
}
