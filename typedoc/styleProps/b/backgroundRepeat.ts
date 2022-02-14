import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using single keyword
    cls1 = this.$class({ backgroundRepeat: "repeat" })

    // Using two keywords - one for X axis and one fro Y axis
    cls2 = this.$class({ backgroundRepeat: [["space", "round"]] })

    // Using custom property
    customVar = this.$var( "backgroundRepeat", "no-repeat")
    cls3 = this.$class({ backgroundRepeat: this.customVar })

    // Using multiple values
    cls4 = this.$class({
        backgroundRepeat: [
            "repeat",
            this.customVar,
            ["space", "round"]
        ]
    })
}
