import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using single keyword
    cls1 = this.$class({ backgroundPositionY: "top" })

    // Using single length value in pixels (25px)
    cls2 = this.$class({ backgroundPositionY: 25 })

    // Using single length value in centimeters (2cm)
    cls3 = this.$class({ backgroundPositionY: css.cm(2) })

    // Using offset represented as keyword and length
    cls4 = this.$class({ backgroundPositionY: ["bottom", 20] })

    // Using custom property
    customVar = this.$var( "backgroundPositionY", "top")
    cls5 = this.$class({ backgroundPositionY: this.customVar })

    // Using multiple values
    cls6 = this.$class({
        backgroundPositionY: [
            ["center"],
            [this.customVar],
            ["bottom", 20]
        ]
    })
}
