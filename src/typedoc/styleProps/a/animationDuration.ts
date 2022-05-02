import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using floating point number to indicate seconds: 0.5s
    cls1 = this.$class({ animationDuration: 0.5 })

    // Using integer number to indicate milliseconds: 300s
    cls2 = this.$class({ animationDuration: 300 })

    // Using time-unit function: 3s
    cls3 = this.$class({ animationDuration: css.s(3) })

    // Using time-unit function: -500ms
    cls4 = this.$class({ animationDuration: css.ms(-500) })

    // Using custom property
    customVar = this.$var( "animationDuration", 1000)
    cls5 = this.$class({ animationDuration: this.customVar })

    // Using min() CSS function
    cls6 = this.$class({ animationDuration: css.Time.min( 2000, this.customVar) })

    // Multiple values
    cls7 = this.$class({ animationDuration: [0.5, -300, this.customVar] })
}
