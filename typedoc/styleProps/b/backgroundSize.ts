import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using single keyword
    cls1 = this.$class({ backgroundSize: "cover" })

    // Using single number
    cls2 = this.$class({ backgroundSize: 100 })

    // Using two values - one for X axis and one fro Y axis
    cls3 = this.$class({ backgroundSize: [[100, 200]] })

    // Using custom property
    customVar = this.$var( "backgroundSize", "contain")
    cls4 = this.$class({ backgroundSize: this.customVar })

    // Using multiple values
    cls5 = this.$class({
        backgroundSize: [
            "cover",
            this.customVar,
            [150, "auto"]
        ]
    })
}
