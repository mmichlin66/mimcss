import * as css from "../../../src/index"

class MyStyles extends css.StyleDefinition
{
    // Using string
    cls1 = this.$class({ animation: ".5s linear 1s infinite alternate slidein" })

    // Using Animation_Single object
    cls2 = this.$class({ animation: {
        name: "slidein",
        duration: 0.5,
        func: "linear",
        delay: 1000,
        count: "infinite",
        direction: "alternate"
    }})

    // Animation name can point to a keyframes rule
    rotate360 = this.$keyframes([
        ["from", { transform: css.rotate(0) }],
        ["to", { transform: css.rotate(360) }]
    ])
    cls3 = this.$class({ animation: {
        name: this.rotate360,
        duration: 2000,
        func: "linear",
        delay: 1000,
        count: "infinite",
        direction: "alternate"
    }})

    // Using array to specify multiple animations
    cls4 = this.$class({ animation: [
        ".5s linear 1s infinite alternate slidein",
        {
            name: this.rotate360,
            duration: 2000,
            func: "linear",
            delay: 1000,
            count: "infinite",
            direction: "alternate"
        }
    ]})

    // Every animation property can be specified using a custom property
    varName = this.$var( "animationName", this.rotate360)
    varDuration = this.$var( "animationDuration", 2000)
    varFunc = this.$var( "animationTimingFunction", "linear")
    varDelay = this.$var( "animationDelay", 1000)
    varCount = this.$var( "animationIterationCount", "infinite")
    varDirection = this.$var( "animationDirection", "alternate")
    cls5 = this.$class({ animation: {
        name: this.varName,
        duration:  this.varDuration,
        func:  this.varFunc,
        delay:  this.varDelay,
        count:  this.varCount,
        direction:  this.varDirection
    }})
}
