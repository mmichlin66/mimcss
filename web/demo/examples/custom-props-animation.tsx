// This example is taken from the article of Dan Wilson on the css-tricks.com Web site:
// https://css-tricks.com/making-custom-properties-css-variables-dynamic/.
// It demonstrates how CSS custom properties are defined on global level and redefined under
// lower-level elements. It also demonstrates how CSS custom property values can be directly
// set from JavaScript.


import * as mim from "mimbl";
import * as css from "mimcss"


class MyStyles extends css.StyleDefinition
{
    // define custom properties whose values will be changed by user actions
    translate = this.$var( "<length>", 0)
    scale = this.$var( "<number>", 1)
    rotate = this.$var( "<angle>", 0)

    // define custom properties which will be defined differently under different elements
    hue = this.$var( "<angle>")
    duration = this.$var( "<time>")

    mover = this.$class({
        // define propeties common for all "movers"
        width: css.vmin(15),
        height: css.vmin(15),
        borderRadius: css.percent(10),

        // define transform using the custom properties whose values are controled by user
        transform: [
            css.translateX( this.translate),
            css.scale( this.scale),
            css.rotate( this.rotate)
        ],

        // redefine custom properties to give each block a different color and transition duration.
        // The beauty of CSS-in-JS is that we can use the full power of JvaScript to create styles;
        // for example, the following line creates an array of custom CSS property re-definitions
        // for the ":nth-of-type" pseudo class. The commented out section below shows how to create
        // it manually.
        ":nth-of-type": [1,2,3,4].map( i => [i, { "--": [ [this.hue, i*90 - 50], [this.duration, i*1000] ] }]),

        // ":nth-of-type": [
        //     [1, { "--": [ [this.hue,  40], [this.duration, 1000] ] }],
        //     [2, { "--": [ [this.hue, 130], [this.duration, 2000] ] }],
        //     [3, { "--": [ [this.hue, 220], [this.duration, 3000] ] }],
        //     [4, { "--": [ [this.hue, 310], [this.duration, 4000] ] }],
        // ],

        // define transition using the custom property for duration
        transition: { property: "transform", duration: this.duration, func: "linear" },
        willChange: "transform",

        // define background color using the custom property for HSL's hue
        backgroundColor: css.hsl( this.hue, 90, 52),
    })

    // general styles for structure and controls
    container = this.$id({
        height: "100vh",
        overflow: "hidden",
        background: css.hsl( 220, 12, 16),
        padding: 16
    })

    controls = this.$id({
        position: "absolute",
        right: css.rem(1),
        bottom: css.percent(50),
        transform: css.translateY( css.percent(50)),
        display: "flex",
        flexDirection: "column",
    })

    // using array so that we don't have to give names to rules whose names we don't use
    structure = [
        this.$media( "screen and (orientation: portrait)",
            class extends css.StyleDefinition<MyStyles>
            {
                controls = this.$id({
                    right: css.percent(50),
                    bottom: 0,
                    transform: css.translateX( css.percent(50))
                })
            }
        ),

        this.$tag( "input", {
            width: css.rem(12),
            marginBottom: css.rem(1)
        }),

        this.$tag( "label", {
            display: "flex",
            justifyContent: "space-between",
            color: "white",
            fontSize: css.rem(0.85),
            fontFamily: "system-ui, -apple-system, sans-serif"
        })
    ]
}

// activate our styles
let styles = css.activate( MyStyles);



// Define component
class MyComponent extends mim.Component
{
	public render()
	{
		return <div id={styles.container}>
            <div class={styles.mover}></div>
            <div class={styles.mover}></div>
            <div class={styles.mover}></div>
            <div class={styles.mover}></div>

            <div id={styles.controls}>
                <label for="tx"><span>0</span>translateX<span>80</span></label>
                <input type="range" id="tx" min="0" max="80" value="0" input={this.onTranslateChanged} />
                <label for="scale"><span>0</span>scale<span>2</span></label>
                <input type="range" id="scale" min="0" max="2" step={.05} value="1" input={this.onScaleChanged} />
                <label for="deg"><span>-360</span>rotate<span>360</span></label>
                <input type="range" id="deg" min="-360" max="360" value="0" input={this.onDegChanged} />
            </div>
        </div>
    }

    private onTranslateChanged( e: Event)
    {
        styles.translate.setValue( css.vw( parseFloat( (e.currentTarget as HTMLInputElement).value)))
    }

    private onScaleChanged( e: Event)
    {
        styles.scale.setValue( parseFloat((e.currentTarget as HTMLInputElement).value))
    }

    private onDegChanged( e: Event)
    {
        styles.rotate.setValue( css.deg( parseFloat( (e.currentTarget as HTMLInputElement).value)))
    }
}



// Mount our component under the body element.
mim.mount( new MyComponent());
