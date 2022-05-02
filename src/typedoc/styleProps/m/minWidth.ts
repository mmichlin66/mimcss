import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ minWidth: "max-content" })

    // Using a pre-defined string literal
    cls2 = this.$class({ minWidth: "90%" })

    // Using integer number for `px` units (100px)
    cls3 = this.$class({ minWidth: 100 })

    // Using floating point number for `em` units (3.5em)
    cls4 = this.$class({ minWidth: 3.5 })

    // Using a unit function (10vmin)
    cls5 = this.$class({ minWidth: css.vmin(10) })

    // Using the `fitContent()` function
    cls6 = this.$class({ minWidth: css.fitContent(200) })

    // Using custom property
    customVar = this.$var( "minWidth", 30)
    cls7 = this.$class({ minWidth: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls8 = this.$class({ minWidth: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls9 = this.$class({ minWidth: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls10 = this.$class({ minWidth: {"!": "auto"} })

    // Using with global values
    cls11 = this.$class({ minWidth: "unset" })
}
