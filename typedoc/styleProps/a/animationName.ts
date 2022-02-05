import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Defining a `@keyframes` rule and using it in the `animation-name` style property
    move = this.$keyframes([
        ["from", {transform: css.translate(0)}],
        ["to", {transform: css.translate(50,50)}]
    ])

    cls1 = this.$class({ animationName: this.move })

    // Using string literal to reference a `@keyframes` rule defined without Mimcss
    cls2 = this.$class({ animationName: "slidein" })

    // Using custom property
    varName = this.$var( "animationName", this.move)
    cls3 = this.$class({ animationName: this.varName })

    // Multiple values
    cls4 = this.$class({ animationName: [this.move, "slidein", this.varName] })
}
