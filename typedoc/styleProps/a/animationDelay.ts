import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using floating point number to indicate seconds: 0.5s
    cls1 = this.$class({ animationDelay: 0.5 })

    // Using integer number to indicate milliseconds: 300s
    cls2 = this.$class({ animationDelay: 300 })

    // Using time-unit function: 3s
    cls3 = this.$class({ animationDelay: css.s(3) })

    // Using time-unit function: -500ms
    cls4 = this.$class({ animationDelay: css.ms(-500) })

    // Using custom property
    customVar = this.$var( "animationDelay", 1000)
    cls5 = this.$class({ animationDelay: this.customVar })

    // Using min() CSS function
    cls6 = this.$class({ animationDelay: css.Time.min( 2000, this.customVar) })

    // Multiple values
    cls7 = this.$class({ animationDelay: [0.5, -300, this.customVar] })
}

