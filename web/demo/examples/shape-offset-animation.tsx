// This is an example from MDN demonstrating animation of the offset-distance property. The example
// presents two variants of the same animation - just to demonstrate the different means Mimcss
// provides that can be used under different circumstances.

import * as mim from "mimbl"
import * as css from "mimcss"



class MyStyles extends css.StyleDefinition
{
    // Define simple animation of the offset-distance property
	moveOffset = this.$keyframes([
		[0, { offsetDistance: 0 }],
		[100, { offsetDistance: "100%" }],
	])

	// define properties common to both variants
	base = this.$abstract({
		width: 40,
		height: 40,
		margin: 20,

        // define path using chain of commands
        offsetPath: css.path().M([20,20]).C([20,50,180,-10,180,20]),

        // using parameterized pseudo class :nth-child(n) to define different rotations for
        //  sequence of elements with the same class
        ":nth-child": [
			[1, {offsetRotate: "auto"}],
			[2, {offsetRotate: ["auto", 90]}],
			[3, {offsetRotate: "reverse"}],
			[4, {offsetRotate: 90}],
		]
	})

	variant1 = this.$class({
		"+": this.base,
		backgroundColor: 0x2BC4A2,

		// define clip-path using raw CSS
		clipPath: css.raw`polygon(evenodd, 0% 0%, 70% 0%, 100% 50%, 70% 100%, 0% 100%, 30% 50%)`,

		// define animation using raw CSS with embedded keyframe rule reference
		animation: css.raw`${this.moveOffset} 5000ms infinite alternate ease-in-out`,
	})

	variant2 = this.$class({
		"+": this.base,

		// using negative number for inverted color and fraction for opacity
		backgroundColor: -(0x2BC4A2 + 0.7),

		// define clip-path using Mimcss polygon function and a helper function that returns array
        // of points. This can be useful when generating path dynamically based on some internal
        // data. Note that what units to use is also specified dynamically.
		clipPath: css.polygon( ...flatCoordsToCssPoints( "%", 0,0, 70,0, 100,50, 70,100, 0,100, 30,50)),

		// define animation using object notation, which is less error prone
		animation: {
			name: this.moveOffset,
			duration: 5000,
			count: "infinite",
			direction: "alternate",
			func: "ease-in-out"
		},
	})

	container = this.$class({
        display: "flex",
		// justifyContent: "space-around",
	})
}

// Helper function that packs the given flat array of points into array of CssPoint objects
// that is accepted by the Mimcss polygon function.
function flatCoordsToCssPoints( unit: css.LengthUnits | css.PercentUnits, ...coords: number[]): css.CssPoint[]
{
	let points: css.CssPoint[] = []
	for( let i = 0; i + 1 < coords.length; i += 2)
        points.push( [css.Len.units( coords[i], unit), css.Len.units( coords[i+1], unit)]);

	return points;
}



let styles = css.activate( MyStyles);



export class MyComponent extends mim.Component
{
	render(): any
	{
		return <div class={styles.container}>
			<div>
				<div class={styles.variant1} />
				<div class={styles.variant1} />
				<div class={styles.variant1} />
				<div class={styles.variant1} />
			</div>

			<div>
				<div class={styles.variant2} />
				<div class={styles.variant2} />
				<div class={styles.variant2} />
				<div class={styles.variant2} />
			</div>
		</div>
	}
}



// Mount our component under the body element.
mim.mount( new MyComponent());






