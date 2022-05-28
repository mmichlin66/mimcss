import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Defining a `@scroll-timeline` rule and using it in the `animation-timeline`
    // style property
    timeline = this.$scrollTimeline({
        scrollOffsets: [0, 200]
    })

    cls1 = this.$class({ animationTimeline: this.timeline })

    // Using raw string to reference a `@scroll-timeline` rule defined without Mimcss
    cls2 = this.$class({ animationTimeline: css.raw`rotated` })

    // Using custom property
    customVar = this.$var( "animationTimeline", this.timeline)
    cls3 = this.$class({ animationTimeline: this.customVar })

    // Multiple values
    cls4 = this.$class({
        animationTimeline: [this.timeline, css.raw`rotated`, this.customVar]
    })
}
