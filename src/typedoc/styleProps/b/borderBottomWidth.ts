import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ borderBottomWidth: "thick" })

    // Using a pre-defined string literal
    cls2 = this.$class({ borderBottomWidth: "10%" })

    // Using integer number for `px` units (4px)
    cls3 = this.$class({ borderBottomWidth: 4 })

    // Using floating point number for `em` units (0.2em)
    cls4 = this.$class({ borderBottomWidth: 0.2 })

    // Using a unit function (1vmin)
    cls5 = this.$class({ borderBottomWidth: css.vmin(1) })

    // Using custom property
    customVar = this.$var( "borderBottomWidth", 3)
    cls6 = this.$class({ borderBottomWidth: this.customVar })

    // Using the `min()` function ( min( 10px, 0.2em) )
    cls7 = this.$class({ borderBottomWidth: css.Len.min( 10, 0.2) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ borderBottomWidth: css.Len.calc`(10% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls9 = this.$class({ borderBottomWidth: {"!": "thin"} })

    // Using with global values
    cls10 = this.$class({ borderBottomWidth: "unset" })
}
