import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string literal for a built in color
    cls1 = this.$class({ textStrokeColor: "red" })

    // Using one of built in colors as a number
    cls2 = this.$class({ textStrokeColor: css.Colors.red })

    // Using number to specify RGB components
    cls3 = this.$class({ textStrokeColor: 0x74992E })

    // Using negative number to obtain complement color
    cls4 = this.$class({ textStrokeColor: -0x74992E })

    // Using negative number to obtain complement color for one of built-in colors
    cls5 = this.$class({ textStrokeColor: -css.Colors.navy })

    // Using RGB number with alpha component
    cls6 = this.$class({ textStrokeColor: 0x74992E + 0.5 })

    // Using one of color functions (hsl in this case) and optional alpha
    cls7 = this.$class({ textStrokeColor: css.hsl( 250, 100, 34, 0.7) })

    // Using alpha() function to apply alpha to a named color
    cls8 = this.$class({ textStrokeColor: css.alpha( "orange", 0.75) })

    // Using custom property
    customVar = this.$var( "textStrokeColor", "blue")
    cls9 = this.$class({ textStrokeColor: this.customVar })

    // Specifying "!important" flag
    cls10 = this.$class({ textStrokeColor: {"!": "brown"} })

    // Using with global values
    cls11 = this.$class({ textStrokeColor: "initial" })

    // Using with raw string (e.g. with format not directly supported by Mimcss)
    cls12 = this.$class({ textStrokeColor: css.raw`#CCC` })

    // Multiple definitions when one of them may not be supported by all browsers
    cls13 = this.$class({ textStrokeColor: {
        "[]": [
            "red",
            css.colorMix("blue", 30).with("red", 60).in("srgb")
        ]}
    })
}
