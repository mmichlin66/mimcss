import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using signle `auto` keyword
    cls1 = this.$class({ marginBlock: "auto" })

    // Using a signle pre-defined string literal
    cls2 = this.$class({ marginBlock: "10%" })

    // Using a single integer number for `px` units (100px)
    cls3 = this.$class({ marginBlock: 100 })

    // Using a single floating point number for `em` units (3.5em)
    cls4 = this.$class({ marginBlock: 3.5 })

    // Using a single unit function (10vmin)
    cls5 = this.$class({ marginBlock: css.vmin(10) })

    // Using a single custom property
    customVar = this.$var( "marginBlock", 30)
    cls6 = this.$class({ marginBlock: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls7 = this.$class({ marginBlock: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ marginBlock: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ marginBlock: ["auto", 20] })
    cls10 = this.$class({ marginBlock: [2.5, this.customVar] })
    cls11 = this.$class({ marginBlock:
        [
            css.Len.min( 200, css.percent(23)),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using with "!important" flag
    cls12 = this.$class({ marginBlock: {"!": "auto"} })

    // Using with global values
    cls13 = this.$class({ marginBlock: "unset" })
}
