import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using URL to SVG filter
    cls1 = this.$class({ filter: css.url("commonfilters.svg#filter") })

    // Using filter functions
    cls2 = this.$class({ filter: css.blur(2) })
    cls3 = this.$class({ filter: css.dropShadow( 4, 4, "blue", 10) })

    // Using custom property
    customVar = this.$var( "filter", css.grayscale(30))
    cls4 = this.$class({ filter: this.customVar })

    // Using multiple values
    cls5 = this.$class({
        filter: [
            css.url("filters.svg#filter"),
            this.customVar,
            css.saturate(150)
        ]
    })

    // Using with "!important" flag
    cls6 = this.$class({ filter: {"!": css.invert(70)} })

    // Using with global values
    cls7 = this.$class({ filter: "initial" })

    // Don't apply any filter
    cls8 = this.$class({ filter: "none" })
}
