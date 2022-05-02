import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using single keyword
    cls1 = this.$class({ backgroundPosition: "top" })

    // Using single length value in pixels (25px)
    cls2 = this.$class({ backgroundPosition: 25 })

    // Using single length value in centimeters (2cm)
    cls3 = this.$class({ backgroundPosition: css.cm(2) })

    // Using two keywords for X and Y axis
    cls4 = this.$class({ backgroundPosition: ["left", "center"] })

    // Using two numbers for X and Y axis (20px 2.5em)
    cls5 = this.$class({ backgroundPosition: [20, 2.5] })

    // Using offset for X axis and keyword for Y axis (right 20px 3inch)
    cls6 = this.$class({ backgroundPosition: ["right", 20, css.inch(3)] })

    // Using keyword for X axis and offset for Y axis (20px bottom 2.5em)
    cls7 = this.$class({ backgroundPosition: [20, "bottom", 2.5] })

    // Using offset for X axis and offset for Y axis (right 20px bottom 2.5em)
    cls8 = this.$class({ backgroundPosition: ["right", 20, "bottom", 2.5] })

    // Using custom property
    customVar = this.$var( "backgroundPosition", [20, 2.5])
    cls9 = this.$class({ backgroundPosition: this.customVar })

    // Using multiple values
    cls10 = this.$class({
        backgroundPosition: [
            ["center"],
            [this.customVar],
            ["right", 20, "bottom", 2.5]
        ]
    })
}
