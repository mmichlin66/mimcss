import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal
    cls1 = this.$class({ aspectRatio: "4/3" })

    // using the `ratio()` function
    cls2 = this.$class({ aspectRatio: css.ratio( 16, 9)})

    // using a single number
    cls4 = this.$media({ aspectRatio: 1.33 }, class extends css.StyleDefinition {})

    // Using custom property
    customVar = this.$var( "aspectRatio", "185/100")
    cls5 = this.$class({ aspectRatio: this.customVar })

    // Using with "!important" flag
    cls6 = this.$class({ aspectRatio: {"!": 1} })

    // Using with global values
    cls7 = this.$class({ aspectRatio: "initial" })
}
