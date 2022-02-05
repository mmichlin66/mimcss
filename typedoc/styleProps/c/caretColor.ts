import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using the "auto" value
    cls0 = this.$class({ caretColor: "auto" })

    // Using string literal for a built in color
    cls1 = this.$class({ caretColor: "red" })

    // Using one of built in colors as a number
    cls2 = this.$class({ caretColor: css.Colors.red })

    // Using number to specify RGB components
    cls3 = this.$class({ caretColor: 0x74992E })

    // Using negative number to obtain complement color
    cls4 = this.$class({ caretColor: -0x74992E })

    // Using negative number to obtain complement color for one of built-in colors
    cls5 = this.$class({ caretColor: -css.Colors.navy })

    // Using RGB number with alpha component
    cls6 = this.$class({ caretColor: 0x74992E + 0.5 })

    // Using one of color functions (hsl in this case) and optional alpha
    cls7 = this.$class({ caretColor: css.hsl( 250, 100, 34, 0.7) })

    // Using alpha() function to apply alpha to a named color
    cls8 = this.$class({ caretColor: css.alpha( "orange", 0.75) })

    // Using custom property
    defaultColor = this.$var( "caretColor", "blue")
    cls9 = this.$class({ caretColor: this.defaultColor })

    // Specifying "!important" flag
    cls10 = this.$class({ caretColor: {"!": "brown"} })

    // Using with global values
    cls11 = this.$class({ caretColor: "initial" })

    // Using with raw string (e.g. with format not directly supported by Mimcss)
    cls12 = this.$class({ caretColor: css.raw`#CCC` })

    // Multiple definitions when one of them may not be supported by all browsers
    cls13 = this.$class({ caretColor: {
        "[]": [
            "red",
            css.colorMix("blue", 30).with("red", 60).in("srgb")
        ]}
    })
}
