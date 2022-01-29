import * as mim from "mimbl";
import * as css from "mimcss"



// Define styles for our component
class MyStyles extends css.StyleDefinition
{
    outerBox = this.$class({
        // values of CSS <length> type use "px" for integer numbers and "em" for floating point numbers
        fontSize: 24,
        padding: 1.5,

        // values of CSS <angle> type use "deg" for integer numbers and "turn" for floating point numbers
        fontStyle: 45,

        // Mimcss provides functions with names corresponding to units
        margin: css.cm(0.5),

        // using unit functions
        width: css.percent(95),
        height: css.inch(2),

        border: [1, "solid", "black"],
        overflow: "auto",
    })

    orangeBox = this.$class({
        border: [3, "solid", "red"],
        backgroundColor: "orange",

        // 8px
        borderRadius: 8,

        // use numeric functions to size and position the box. Since we are using the Len object,
        // the parameters will only accept values compatible with the CSS <length> type.
        // Note: there are better ways to position and size elements - we are just demonstrating
        // the Mimcss numeric functions.
        width: css.Len.calc`100% - ${200}`,
    })

    blueBox = this.$class({
        border: [3, "solid", "blue"],
        backgroundColor: "cyan",
        marginTop: 20,

        // The Len.max() function accepts any number of parameters. Each parameter can be of any
        // type corresponding to the CSS `<length>` type.
        width: css.Len.max( css.percent(80), 300, css.inch(4)),

        // padding can be specified as an array of 2 to 4 elements:
        // 10px 1.4em 0.5cm 1%
        padding: [10, 1.4, css.cm(0.5), css.percent(1)],
    })

    init = [
        this.$tag( "*", { boxSizing: "border-box"}),
        this.$tag( "html", {height: "100%"}),
        this.$tag( "body", {height: "100%", margin: 0}),
    ]
}

// activate our styles
let styles = css.activate( MyStyles);



// Define component that displays "Hello World!"
class MyComponent extends mim.Component
{
    // Render our component's HTML content
	public render()
	{
        // specify class by using the property of our style definition class
		return <div class={styles.outerBox}>
            <div class={styles.orangeBox}>
                This box uses Len.calc() function
            </div>
            <div class={styles.blueBox}>
                This box uses Len.max() function
            </div>
        </div>
	}
}



// Mount our component under the body element.
mim.mount( new MyComponent());


