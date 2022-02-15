import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ inlineSize: "max-content" })

    // Using a pre-defined string literal
    cls2 = this.$class({ inlineSize: "90%" })

    // Using integer number for `px` units (100px)
    cls3 = this.$class({ inlineSize: 100 })

    // Using floating point number for `em` units (3.5em)
    cls4 = this.$class({ inlineSize: 3.5 })

    // Using a unit function (10vmin)
    cls5 = this.$class({ inlineSize: css.vmin(10) })

    // Using the `fitContent()` function
    cls6 = this.$class({ inlineSize: css.fitContent(200) })

    // Using the `min()` function ( min( 200px, 23%) )
    // Using custom property
    customVar = this.$var( "inlineSize", 30)
    cls7 = this.$class({ inlineSize: this.customVar })

    cls8 = this.$class({ inlineSize: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls9 = this.$class({ inlineSize: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls10 = this.$class({ inlineSize: {"!": "auto"} })

    // Using with global values
    cls11 = this.$class({ inlineSize: "unset" })
}
