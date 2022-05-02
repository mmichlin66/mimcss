import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using `url()` function
    cls1 = this.$class({ backgroundImage: css.url("lizard.png") })

    // Using gradient function
    cls2 = this.$class({ backgroundImage: css.linearGradient( "red", "yellow", "green").to( "bottom right") })

    // Using custom property
    customVar = this.$var( "backgroundImage", css.conicGradient( "red", "yellow", "green").at( ["center", 20]))
    cls3 = this.$class({ backgroundImage: this.customVar })

    // Using multiple values
    cls4 = this.$class({
        backgroundImage: [
            css.url("lizard.png"),
            this.customVar,
            css.radialGradient( ["red", 20], ["yellow", 30]).ellipse().repeating(true)
        ]
    })
}
