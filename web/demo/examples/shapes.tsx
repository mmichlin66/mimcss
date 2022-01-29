// This example demonstrates using Mimcss functions to build shapes that are used for the clip-path
// style property.

import * as mim from "mimbl"
import * as css from "mimcss"



class MyStyles extends css.StyleDefinition
{
    bgImage = css.conicGradient( css.Colors.red, css.Colors.orange, css.Colors.yellow, css.Colors.green,
        css.Colors.lightblue, css.Colors.blue, css.Colors.violet, css.Colors.red).from(0.5).at("center")

	colorBox = this.$class({
		width: 200,
		height: 200,
        backgroundImage: this.bgImage,
		":hover": { opacity: 0.7 },
	});

	polygon = this.$class({
		"+": this.colorBox,
		clipPath: css.polygon( [20,20], [180,20], [20, 180], [180,180]).fill( "nonzero"),
	})

	ellipse = this.$class({
		"+": this.colorBox,
		clipPath: css.ellipse( 75, 50).at( ["center", css.percent(35)]),
	})

	circle = this.$class({
		"+": this.colorBox,
		clipPath: css.circle( "closest-side").at( [ 130, css.percent(65)]),
	})

	inset = this.$class({
		"+": this.colorBox,
		clipPath: css.inset( css.percent(15)).round( 8),
	})

	container = this.$class({
        display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
	})

	outerBox = this.$class({
		border: [2, "solid", "blue"],
	})
}

let styles = css.activate( MyStyles);



export class MyComponent extends mim.Component
{
	render(): any
	{
		return <div class={styles.container}>
            <div class={styles.outerBox}>
                <div class={styles.polygon} />
            </div>
            <div class={styles.outerBox}>
                <div class={styles.ellipse} />
            </div>
            <div class={styles.outerBox}>
                <div class={styles.circle} />
            </div>
            <div class={styles.outerBox}>
                <div class={styles.inset} />
            </div>
		</div>
	}
}



// Mount our component under the body element.
mim.mount( new MyComponent());






