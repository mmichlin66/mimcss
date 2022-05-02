import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ backgroundBlendMode: "normal" })

    // Using custom property
    customVar = this.$var( "backgroundBlendMode", "multiply")
    cls2 = this.$class({ backgroundBlendMode: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ backgroundBlendMode: {"!": "difference"} })

    // Using with global values
    cls4 = this.$class({ backgroundBlendMode: "initial" })

    // Using multiple values
    cls5 = this.$class({
        backgroundBlendMode: [
            "exclusion",
            this.customVar,
            "hard-light"
        ]
    })
}
