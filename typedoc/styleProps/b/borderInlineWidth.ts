import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ borderInlineWidth: "thick" })

    // Using a pre-defined string literal
    cls2 = this.$class({ borderInlineWidth: "10%" })

    // Using integer number for `px` units (4px)
    cls3 = this.$class({ borderInlineWidth: 4 })

    // Using floating point number for `em` units (0.2em)
    cls4 = this.$class({ borderInlineWidth: 0.2 })

    // Using a unit function (1vmin)
    cls5 = this.$class({ borderInlineWidth: css.vmin(1) })

    // Using custom property
    customVar = this.$var( "borderInlineWidth", 3)
    cls6 = this.$class({ borderInlineWidth: this.customVar })

    // Using the `min()` function ( min( 10px, 0.2em) )
    cls7 = this.$class({ borderInlineWidth: css.Len.min( 10, 0.2) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ borderInlineWidth: css.Len.calc`(10% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ borderInlineWidth: ["medium", 2] })
    cls10 = this.$class({ borderInlineWidth: [0.5, this.customVar] })
    cls11 = this.$class({ borderInlineWidth:
        [
            css.Len.min( 10, 0.2),
            css.Len.calc`(10% - ${this.customVar}) / 2`
        ]
    })

    // Using with "!important" flag
    cls12 = this.$class({ borderInlineWidth: {"!": "thin"} })

    // Using with global values
    cls13 = this.$class({ borderInlineWidth: "unset" })
}
