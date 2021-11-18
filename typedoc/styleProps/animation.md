The **animation** shorthand CSS property applies an animation between styles. It is a shorthand for [[animationName]], [[animationDuration]], [[animationTimingFunction]], [[animationDelay]], [[animationIterationCount]], [[animationDirection]], [[animationFillMode]], and [[animationPlayState]].

The values for this property can be either a string or an object of type [[Animation_Single]] or an array of either strings or [[Animation_Single]] objects.

**Example**

```typescript
import * as css from "mimcss"

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
    rotate360 = this.$keframes({
        "from": { transform: css.rotate(0) }
        "to": { transform: css.rotate(360) }
    })
    cls2 = this.$class({ animation: {
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
    varDirection = this.$var( "animationDirection", "alternate)
    cls5 = this.$class({ animation: {
        name: this.varName,
        duration:  this.varDuration,
        func:  this.varFunc,
        delay:  this.varDelay,
        count:  this.varCount,
        direction:  this.varDirection
    }})
}
```

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="mdn">CSS-Tricks Almanac</a>
- <a href="http://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Animations in Playground</a>

