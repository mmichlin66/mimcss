import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal for a built in color
    cls1 = this.$class({ borderColor: "red" })
    cls1a = this.$class({ borderColor: ["red", "yellow", "green", "blue"] })

    // Using one of built in colors as a number
    cls2 = this.$class({ borderColor: css.Colors.red })
    cls2a = this.$class({ borderColor: [css.Colors.red, css.Colors.yellow] })

    // Using number to specify RGB components
    cls3 = this.$class({ borderColor: 0x74992E })
    cls3a = this.$class({ borderColor: [0x74992E, 0xAA0033, 0xB63F27] })

    // Using negative number to obtain complement color
    cls4 = this.$class({ borderColor: -0x74992E })
    cls4a = this.$class({ borderColor: [-0x74992E, -0xAA0033, -0xB63F27] })

    // Using negative number to obtain complement color for one of built-in colors
    cls5 = this.$class({ borderColor: -css.Colors.navy })
    cls5a = this.$class({ borderColor: [-css.Colors.navy, -css.Colors.teal] })

    // Using RGB number with alpha component
    cls6 = this.$class({ borderColor: 0x74992E + 0.5 })
    cls6a = this.$class({ borderColor: [0x74992E + 0.5, 0xAA0033 + 0.6] })

    // Using one of color functions (hsl or rgb in this case) and optional alpha
    cls7 = this.$class({ borderColor: css.hsl( 250, 100, 34, 0.7) })
    cls7a = this.$class({ borderColor: [css.hsl( 250, 100, 34, 0.7), css.rgb( 216, 86, 57)] })

    // Using alpha() function to apply alpha to a named color
    cls8 = this.$class({ borderColor: css.alpha( "orange", 0.75) })
    cls8a = this.$class({ borderColor: [css.alpha( "orange", 0.75), css.alpha( "azure", 0.4)] })

    // Using custom property
    defaultColor = this.$var( "borderColor", "blue")
    cls9 = this.$class({ borderColor: this.defaultColor })

    // Specifying "!important" flag
    cls10 = this.$class({ borderColor: {"!": "brown"} })

    // Using with global values
    cls11 = this.$class({ borderColor: "initial" })

    // Using with raw string (e.g. with format not directly supported by Mimcss)
    cls12 = this.$class({ borderColor: css.raw`#CCC` })

    // Multiple definitions when one of them may not be supported by all browsers
    cls13 = this.$class({ borderColor: {
        "[]": [
            "red",
            css.colorMix("blue", 30).with("red", 60).in("srgb")
        ]}
    })
}
