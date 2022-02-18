import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ borderBlockStartWidth: "thick" })

    // Using a pre-defined string literal
    cls2 = this.$class({ borderBlockStartWidth: "10%" })

    // Using integer number for `px` units (4px)
    cls3 = this.$class({ borderBlockStartWidth: 4 })

    // Using floating point number for `em` units (0.2em)
    cls4 = this.$class({ borderBlockStartWidth: 0.2 })

    // Using a unit function (1vmin)
    cls5 = this.$class({ borderBlockStartWidth: css.vmin(1) })

    // Using custom property
    customVar = this.$var( "borderBlockStartWidth", 3)
    cls6 = this.$class({ borderBlockStartWidth: this.customVar })

    // Using the `min()` function ( min( 10px, 0.2em) )
    cls7 = this.$class({ borderBlockStartWidth: css.Len.min( 10, 0.2) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ borderBlockStartWidth: css.Len.calc`(10% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls9 = this.$class({ borderBlockStartWidth: {"!": "thin"} })

    // Using with global values
    cls10 = this.$class({ borderBlockStartWidth: "unset" })
}
