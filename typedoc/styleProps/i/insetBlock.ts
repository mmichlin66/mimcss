import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using signle `auto` keyword
    cls1 = this.$class({ insetBlock: "auto" })

    // Using a signle pre-defined string literal
    cls2 = this.$class({ insetBlock: "10%" })

    // Using a single integer number for `px` units (100px)
    cls3 = this.$class({ insetBlock: 100 })

    // Using a single floating point number for `em` units (3.5em)
    cls4 = this.$class({ insetBlock: 3.5 })

    // Using a single unit function (10vmin)
    cls5 = this.$class({ insetBlock: css.vmin(10) })

    // Using a single custom property
    customVar = this.$var( "insetBlock", 30)
    cls6 = this.$class({ insetBlock: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls7 = this.$class({ insetBlock: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ insetBlock: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ insetBlock: ["auto", 20] })
    cls10 = this.$class({ insetBlock: [2.5, this.customVar] })
    cls11 = this.$class({ insetBlock:
        [
            css.Len.min( 200, css.percent(23)),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using with "!important" flag
    cls12 = this.$class({ insetBlock: {"!": "auto"} })

    // Using with global values
    cls13 = this.$class({ insetBlock: "unset" })
}
