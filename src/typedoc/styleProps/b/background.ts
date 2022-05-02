import * as css from "mimcss"

class MyStyles extends css.StyleDefinition
{
    // Using single string value
    cls1 = this.$class({ background: "green url('lizard.png') 0.5em 20px / contain repeat-x fixed border-box content-box" })

    // Using single color value
    cls2 = this.$class({ background: 0xAA0033 })

    // Using single image value
    cls3 = this.$class({ background: css.url("lizard.png") })

    // Using single object value
    cls4 = this.$class({ background: {
        color: "green",
        image: css.url("lizard.png"),
        position: [0.5, 20],
        size: "contain",
        repeat: "repeat-x",
        attachment: "fixed",
        origin: "border-box",
        clip: "content-box",
    }})

    // Using custom property
    customVar = this.$var( "background", {
        image: css.url("lizard.png"),
        position: [0.5, 20],
        repeat: "repeat-x",
        origin: "border-box",
    })
    cls5 = this.$class({ background: this.customVar })

    // Using multiple values
    cls6 = this.$class({
        background: [
            0xAA0033,
            this.customVar,
            css.linearGradient("red","yellow")
        ]
    })
}
