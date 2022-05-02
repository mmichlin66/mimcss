import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ backgroundOrigin: "border-box" })

    // Using custom property
    customVar = this.$var( "backgroundOrigin", "padding-box")
    cls2 = this.$class({ backgroundOrigin: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ backgroundOrigin: {"!": "content-box"} })

    // Using with global values
    cls4 = this.$class({ backgroundOrigin: "initial" })

    // Using multiple values
    cls5 = this.$class({
        backgroundOrigin: [
            "border-box",
            this.customVar,
            "content-box"
        ]
    })
}
