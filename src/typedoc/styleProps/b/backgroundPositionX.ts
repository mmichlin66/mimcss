import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using single keyword
    cls1 = this.$class({ backgroundPositionX: "left" })

    // Using single length value in pixels (25px)
    cls2 = this.$class({ backgroundPositionX: 25 })

    // Using single length value in centimeters (2cm)
    cls3 = this.$class({ backgroundPositionX: css.cm(2) })

    // Using offset represented as keyword and length
    cls4 = this.$class({ backgroundPositionX: ["right", 20] })

    // Using custom property
    customVar = this.$var( "backgroundPositionX", "right")
    cls5 = this.$class({ backgroundPositionX: this.customVar })

    // Using multiple values
    cls6 = this.$class({
        backgroundPositionX: [
            ["center"],
            [this.customVar],
            ["right", 20]
        ]
    })
}
