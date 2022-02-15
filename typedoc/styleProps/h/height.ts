import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ height: "max-content" })

    // Using a pre-defined string literal
    cls2 = this.$class({ height: "90%" })

    // Using integer number for `px` units (100px)
    cls3 = this.$class({ height: 100 })

    // Using floating point number for `em` units (3.5em)
    cls4 = this.$class({ height: 3.5 })

    // Using a unit function (10vmin)
    cls5 = this.$class({ height: css.vmin(10) })

    // Using the `fitContent()` function
    cls6 = this.$class({ height: css.fitContent(200) })

    // Using the `min()` function ( min( 200px, 23%) )
    // Using custom property
    customVar = this.$var( "height", 30)
    cls7 = this.$class({ height: this.customVar })

    cls8 = this.$class({ height: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls9 = this.$class({ height: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls10 = this.$class({ height: {"!": "auto"} })

    // Using with global values
    cls11 = this.$class({ height: "unset" })
}
