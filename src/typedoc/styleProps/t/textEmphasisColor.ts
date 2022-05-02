import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using string literal for a built in color
    cls1 = this.$class({ textEmphasisColor: "red" })

    // Using one of built in colors as a number
    cls2 = this.$class({ textEmphasisColor: css.Colors.red })

    // Using number to specify RGB components
    cls3 = this.$class({ textEmphasisColor: 0x74992E })

    // Using negative number to obtain complement color
    cls4 = this.$class({ textEmphasisColor: -0x74992E })

    // Using negative number to obtain complement color for one of built-in colors
    cls5 = this.$class({ textEmphasisColor: -css.Colors.navy })

    // Using RGB number with alpha component
    cls6 = this.$class({ textEmphasisColor: 0x74992E + 0.5 })

    // Using one of color functions (hsl in this case) and optional alpha
    cls7 = this.$class({ textEmphasisColor: css.hsl( 250, 100, 34, 0.7) })

    // Using alpha() function to apply alpha to a named color
    cls8 = this.$class({ textEmphasisColor: css.alpha( "orange", 0.75) })

    // Using custom property
    customVar = this.$var( "textEmphasisColor", "blue")
    cls9 = this.$class({ textEmphasisColor: this.customVar })

    // Specifying "!important" flag
    cls10 = this.$class({ textEmphasisColor: {"!": "brown"} })

    // Using with global values
    cls11 = this.$class({ textEmphasisColor: "initial" })

    // Using with raw string (e.g. with format not directly supported by Mimcss)
    cls12 = this.$class({ textEmphasisColor: css.raw`#CCC` })

    // Multiple definitions when one of them may not be supported by all browsers
    cls13 = this.$class({ textEmphasisColor: {
        "[]": [
            "red",
            css.colorMix("blue", 30).with("red", 60).in("srgb")
        ]}
    })
}
