import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ backgroundClip: "border-box" })

    // Using custom property
    customVar = this.$var( "backgroundClip", "padding-box")
    cls2 = this.$class({ backgroundClip: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ backgroundClip: {"!": "content-box"} })

    // Using with global values
    cls4 = this.$class({ backgroundClip: "initial" })

    // Using multiple values
    cls5 = this.$class({
        backgroundClip: [
            "text",
            this.customVar,
            "content-box"
        ]
    })
}
