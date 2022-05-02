import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ backgroundAttachment: "fixed" })

    // Using custom property
    customVar = this.$var( "backgroundAttachment", "local")
    cls2 = this.$class({ backgroundAttachment: this.customVar })

    // Using with "!important" flag
    cls3 = this.$class({ backgroundAttachment: {"!": "scroll"} })

    // Using with global values
    cls4 = this.$class({ backgroundAttachment: "initial" })

    // Using multiple values
    cls5 = this.$class({
        backgroundAttachment: [
            "fixed",
            this.customVar,
            "local"
        ]
    })
}
