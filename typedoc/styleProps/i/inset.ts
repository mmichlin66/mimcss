import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using signle `auto` keyword
    cls1 = this.$class({ inset: "auto" })

    // Using a signle pre-defined string literal
    cls2 = this.$class({ inset: "10%" })

    // Using a single integer number for `px` units (100px)
    cls3 = this.$class({ inset: 100 })

    // Using a single floating point number for `em` units (3.5em)
    cls4 = this.$class({ inset: 3.5 })

    // Using a single unit function (10vmin)
    cls5 = this.$class({ inset: css.vmin(10) })

    // Using a single custom property
    customVar = this.$var( "inset", 30)
    cls6 = this.$class({ inset: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls7 = this.$class({ inset: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ inset: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ inset: ["auto", 20] })
    cls10 = this.$class({ inset: [2.5, this.customVar] })
    cls11 = this.$class({ inset:
        [
            css.Len.min( 200, css.percent(23)),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using three-item tuples with different types
    cls12 = this.$class({ inset: ["auto", 20, this.customVar] })
    cls13 = this.$class({ inset:
        [
            css.Len.min( 200, css.percent(23)),
            css.inch(2),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using four-item tuples with different types
    cls14 = this.$class({ inset: ["auto", 20, this.customVar, css.vmin(10)] })
    cls15 = this.$class({ inset:
        [
            css.Len.min( 200, css.percent(23)),
            css.inch(2),
            css.Len.calc`(100% - ${this.customVar}) / 2`,
            0.5
        ]
    })

    // Using with "!important" flag
    cls16 = this.$class({ inset: {"!": "auto"} })

    // Using with global values
    cls17 = this.$class({ inset: "unset" })
}
