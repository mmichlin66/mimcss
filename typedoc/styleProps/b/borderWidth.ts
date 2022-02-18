import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using a keyword
    cls1 = this.$class({ borderWidth: "thick" })

    // Using a pre-defined string literal
    cls2 = this.$class({ borderWidth: "10%" })

    // Using integer number for `px` units (4px)
    cls3 = this.$class({ borderWidth: 4 })

    // Using floating point number for `em` units (0.2em)
    cls4 = this.$class({ borderWidth: 0.2 })

    // Using a unit function (1vmin)
    cls5 = this.$class({ borderWidth: css.vmin(1) })

    // Using custom property
    customVar = this.$var( "borderWidth", 3)
    cls6 = this.$class({ borderWidth: this.customVar })

    // Using the `min()` function ( min( 10px, 0.2em) )
    cls7 = this.$class({ borderWidth: css.Len.min( 10, 0.2) })

    // Using the `calc()` tag function ( calc( (100% - var(--customVar)) / 2) )
    cls8 = this.$class({ borderWidth: css.Len.calc`(10% - ${this.customVar}) / 2` })

    // Using two-item tuples with different types
    cls9 = this.$class({ borderWidth: ["medium", 2] })
    cls10 = this.$class({ borderWidth: [0.5, this.customVar] })
    cls11 = this.$class({ borderWidth:
        [
            css.Len.min( 10, 0.2),
            css.Len.calc`(10% - ${this.customVar}) / 2`
        ]
    })

    // Using three-item tuples with different types
    cls12 = this.$class({ borderWidth: ["thin", 2, this.customVar] })
    cls13 = this.$class({ borderWidth:
        [
            css.Len.max( 10, 0.2),
            css.inch(0.02),
            css.Len.calc`(100% - ${this.customVar}) / 2`
        ]
    })

    // Using four-item tuples with different types
    cls14 = this.$class({ borderWidth: ["medium", 8, this.customVar, css.vmin(1)] })
    cls15 = this.$class({ borderWidth:
        [
            css.Len.clamp( 2, 0.2, 10),
            css.inch(0.02),
            css.Len.calc`(100% - ${this.customVar}) / 2`,
            0.5
        ]
    })

    // Using with "!important" flag
    cls16 = this.$class({ borderWidth: {"!": "thin"} })

    // Using with global values
    cls17 = this.$class({ borderWidth: "unset" })
}
