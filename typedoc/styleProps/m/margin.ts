import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using signle `auto` keyword
    cls1 = this.$class({ margin: "auto" })

    // Using a signle pre-defined string literal
    cls2 = this.$class({ margin: "10%" })

    // Using a single integer number for `px` units (100px)
    cls3 = this.$class({ margin: 100 })

    // Using a single floating point number for `em` units (3.5em)
    cls4 = this.$class({ margin: 3.5 })

    // Using a single unit function (10vmin)
    cls5 = this.$class({ margin: css.vmin(10) })

    // Using a single custom property
    customVar = this.$var( "margin", 30)
    cls6 = this.$class({ margin: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls7 = this.$class({ margin: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ margin: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ margin: ["auto", 20] })
    cls10 = this.$class({ margin: [2.5, this.customVar] })
    cls11 = this.$class({ margin:
        [
            css.Len.min( 200, css.percent(23)),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using three-item tuples with different types
    cls12 = this.$class({ margin: ["auto", 20, this.customVar] })
    cls13 = this.$class({ margin:
        [
            css.Len.min( 200, css.percent(23)),
            css.inch(2),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using four-item tuples with different types
    cls14 = this.$class({ margin: ["auto", 20, this.customVar, css.vmin(10)] })
    cls15 = this.$class({ margin:
        [
            css.Len.min( 200, css.percent(23)),
            css.inch(2),
            css.Len.calc`(100% - ${this.customVar}) / 2`,
            0.5
        ]
    })

    // Using with "!important" flag
    cls16 = this.$class({ margin: {"!": "auto"} })

    // Using with global values
    cls17 = this.$class({ margin: "unset" })
}
