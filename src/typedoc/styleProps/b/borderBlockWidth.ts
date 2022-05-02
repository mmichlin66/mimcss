import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ borderBlockWidth: "thick" })

    // Using a pre-defined string literal
    cls2 = this.$class({ borderBlockWidth: "10%" })

    // Using integer number for `px` units (4px)
    cls3 = this.$class({ borderBlockWidth: 4 })

    // Using floating point number for `em` units (0.2em)
    cls4 = this.$class({ borderBlockWidth: 0.2 })

    // Using a unit function (1vmin)
    cls5 = this.$class({ borderBlockWidth: css.vmin(1) })

    // Using custom property
    customVar = this.$var( "borderBlockWidth", 3)
    cls6 = this.$class({ borderBlockWidth: this.customVar })

    // Using the `min()` function ( min( 10px, 0.2em) )
    cls7 = this.$class({ borderBlockWidth: css.Len.min( 10, 0.2) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ borderBlockWidth: css.Len.calc`(10% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ borderBlockWidth: ["medium", 2] })
    cls10 = this.$class({ borderBlockWidth: [0.5, this.customVar] })
    cls11 = this.$class({ borderBlockWidth:
        [
            css.Len.min( 10, 0.2),
            css.Len.calc`(10% - ${this.customVar}) / 2`
        ]
    })

    // Using with "!important" flag
    cls12 = this.$class({ borderBlockWidth: {"!": "thin"} })

    // Using with global values
    cls13 = this.$class({ borderBlockWidth: "unset" })
}
