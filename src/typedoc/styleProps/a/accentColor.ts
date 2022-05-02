import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal for a built in color
    cls1 = this.$class({ accentColor: "red" })

    // Using one of built in colors as a number
    cls2 = this.$class({ accentColor: css.Colors.red })

    // Using number to specify RGB components
    cls3 = this.$class({ accentColor: 0x74992E })

    // Using negative number to obtain complement color
    cls4 = this.$class({ accentColor: -0x74992E })

    // Using negative number to obtain complement color for one of built-in colors
    cls5 = this.$class({ accentColor: -css.Colors.navy })

    // Using RGB number with alpha component
    cls6 = this.$class({ accentColor: 0x74992E + 0.5 })

    // Using one of color functions (hsl in this case) and optional alpha
    cls7 = this.$class({ accentColor: css.hsl( 250, 100, 34, 0.7) })

    // Using alpha() function to apply alpha to a named color
    cls8 = this.$class({ accentColor: css.alpha( "orange", 0.75) })

    // Using custom property
    customVar = this.$var( "accentColor", "blue")
    cls9 = this.$class({ accentColor: this.customVar })

    // Specifying "!important" flag
    cls10 = this.$class({ accentColor: {"!": "brown"} })

    // Using with global values
    cls11 = this.$class({ accentColor: "initial" })

    // Using with raw string (e.g. with format not directly supported by Mimcss)
    cls12 = this.$class({ accentColor: css.raw`#CCC` })

    // Multiple definitions when one of them may not be supported by all browsers
    cls13 = this.$class({ accentColor: {
        "[]": [
            "red",
            css.colorMix("blue", 30).with("red", 60).in("srgb")
        ]}
    })
}
