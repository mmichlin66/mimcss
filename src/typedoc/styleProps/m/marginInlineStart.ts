import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using the `auto` keyword
    cls1 = this.$class({ marginInlineStart: "auto" })

    // Using a pre-defined string literal
    cls2 = this.$class({ marginInlineStart: "90%" })

    // Using integer number for `px` units (100px)
    cls3 = this.$class({ marginInlineStart: 100 })

    // Using floating point number for `em` units (3.5em)
    cls4 = this.$class({ marginInlineStart: 3.5 })

    // Using a unit function (10vmin)
    cls5 = this.$class({ marginInlineStart: css.vmin(10) })

    // Using custom property
    customVar = this.$var( "marginInlineStart", 30)
    cls6 = this.$class({ marginInlineStart: this.customVar })

    // Using the `min()` function ( min( 200px, 23%) )
    cls7 = this.$class({ marginInlineStart: css.Len.min( 200, css.percent(23)) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ marginInlineStart: css.Len.calc`(100% - ${this.customVar}) / 2` })

    // Using with "!important" flag
    cls9 = this.$class({ marginInlineStart: {"!": "auto"} })

    // Using with global values
    cls10 = this.$class({ marginInlineStart: "unset" })
}
