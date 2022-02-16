import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ maxBlockSize: "max-content" })

    // Using a pre-defined string literal
    cls2 = this.$class({ maxBlockSize: "90%" })

    // Using integer number for `px` units (100px)
    cls3 = this.$class({ maxBlockSize: 100 })

    // Using floating point number for `em` units (3.5em)
    cls4 = this.$class({ maxBlockSize: 3.5 })

    // Using a unit function (10vmin)
    cls5 = this.$class({ maxBlockSize: css.vmin(10) })

    // Using the `fitContent()` function
    cls6 = this.$class({ maxBlockSize: css.fitContent(200) })

    // Using custom property
    customVar = this.$var( "maxBlockSize", 30)
    cls7 = this.$class({ maxBlockSize: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls8 = this.$class({ maxBlockSize: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls9 = this.$class({ maxBlockSize: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls10 = this.$class({ maxBlockSize: {"!": "auto"} })

    // Using with global values
    cls11 = this.$class({ maxBlockSize: "unset" })
}
