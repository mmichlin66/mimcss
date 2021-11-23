The **animation-name** CSS property specifies the names of one or more `@keyframes` at-rules describing the animation or animations to apply to the element.

In Mimcss, instead of specifying the name of the `@keyframes` rule, you can specify the `@keyframes` rule object itself.

**Example**

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Defining a `@keyframes` rule and using it in the `animation-name` style property
    move = this.$keyframes([
        ["from", {transform: translate(0)}],
        ["to", {transform: translate(50,50)}]
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
```

Note that although a `@keyframes` rules defined using Mimcss have the `name` property, this property cannot be used in the same Style Definition class where the `@keyframes` rule is defined. That is, the following code will not work:

```typescript
import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    move = this.$keyframes([
        ["from", {transform: translate(0)}],
        ["to", {transform: translate(50,50)}]
    ])

    // !!!!! WILL NOT WORK
    cls1 = this.$class({ animationName: this.move.name })

    // This will work
    cls2 = this.$class({ animationName: this.move })
}
```

This limitation exists because by the time the `name` property is accessed (that is, during the style definition class construction), it has not been assigned yet.

**See Also:**
- <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction" target="mdn">MDN Page</a>
- <a href="https://css-tricks.com/almanac/properties/a/animation" target="css-tricks">CSS-Tricks Almanac</a>
- <a href="https://www.mimcss.com/demo/playground.html?file=animations.tsx" target="playground">Mimcss Playground</a>

