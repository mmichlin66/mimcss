import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal for a built in color
    cls1 = this.$class({ borderBlockColor: "red" })
    cls1a = this.$class({ borderBlockColor: ["red", "yellow"] })

    // Using one of built in colors as a number
    cls2 = this.$class({ borderBlockColor: css.Colors.red })
    cls2a = this.$class({ borderBlockColor: [css.Colors.red, css.Colors.yellow] })

    // Using number to specify RGB components
    cls3 = this.$class({ borderBlockColor: 0x74992E })
    cls3a = this.$class({ borderBlockColor: [0x74992E, 0xAA0033] })

    // Using negative number to obtain complement color
    cls4 = this.$class({ borderBlockColor: -0x74992E })
    cls4a = this.$class({ borderBlockColor: [-0x74992E, -0xAA0033] })

    // Using negative number to obtain complement color for one of built-in colors
    cls5 = this.$class({ borderBlockColor: -css.Colors.navy })
    cls5a = this.$class({ borderBlockColor: [-css.Colors.navy, -css.Colors.teal] })

    // Using RGB number with alpha component
    cls6 = this.$class({ borderBlockColor: 0x74992E + 0.5 })
    cls6a = this.$class({ borderBlockColor: [0x74992E + 0.5, 0xAA0033 + 0.6] })

    // Using one of color functions (hsl or rgb in this case) and optional alpha
    cls7 = this.$class({ borderBlockColor: css.hsl( 250, 100, 34, 0.7) })
    cls7a = this.$class({ borderBlockColor: [css.hsl( 250, 100, 34, 0.7), css.rgb( 216, 86, 57)] })

    // Using alpha() function to apply alpha to a named color
    cls8 = this.$class({ borderBlockColor: css.alpha( "orange", 0.75) })
    cls8a = this.$class({ borderBlockColor: [css.alpha( "orange", 0.75), css.alpha( "azure", 0.4)] })

    // Using custom property
    defaultColor = this.$var( "borderBlockColor", "blue")
    cls9 = this.$class({ borderBlockColor: this.defaultColor })

    // Specifying "!important" flag
    cls10 = this.$class({ borderBlockColor: {"!": "brown"} })

    // Using with global values
    cls11 = this.$class({ borderBlockColor: "initial" })

    // Using with raw string (e.g. with format not directly supported by Mimcss)
    cls12 = this.$class({ borderBlockColor: css.raw`#CCC` })

    // Multiple definitions when one of them may not be supported by all browsers
    cls13 = this.$class({ borderBlockColor: {
        "[]": [
            "red",
            css.colorMix("blue", 30).with("red", 60).in("srgb")
        ]}
    })
}
