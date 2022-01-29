// Demonstrates use of filter functions

import * as mim from "mimbl";
import * as css from "mimcss"


class MyStyles extends css.StyleDefinition
{
	container = this.$class({
		display: "flex",
		flexWrap: "wrap",
		gap: 16
	})

	box = this.$class({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		border: [1, "solid"],
		padding: [10, 10, 0]
	})

	img = this.$tag( "img", {
		height: 150,
		width: 150,
	})

	label = this.$class({
		padding: [8, 0, 2],
	})

    // In the following filter functions, the parameter value is percentage
	brightness = this.$class({ filter: css.brightness(150) })
	contrast = this.$class({ filter: css.contrast(150) })
	grayscale = this.$class({ filter: css.grayscale(100) })
	invert = this.$class({ filter: css.invert(80) })
	opacity = this.$class({ filter: css.opacity(50) })
	saturate = this.$class({ filter: css.saturate(60) })
	sepia = this.$class({ filter: css.sepia(80) })

    // for `blur()`, the parameter is `<length>`: 2px in this case
    blur = this.$class({ filter: css.blur(2) })

    // for `hueRotate()`, the parameter is `<angle>`: 90deg in this case
	hueRotate = this.$class({ filter: css.hueRotate(90) })

    // applying multiple shadows
    dropShadow = this.$class({
		filter: [css.dropShadow( -4, -4, "blue", 8), css.dropShadow( 4, 4, "green", 8)]
	})
}

// activate our styles
let styles = css.activate( MyStyles);



class MyComponent extends mim.Component
{
	public render()
	{
		return <div class={styles.container}>
			{new FilteredImage( "original")}
			{new FilteredImage( "brightness", styles.brightness)}
			{new FilteredImage( "contrast", styles.contrast)}
			{new FilteredImage( "grayscale", styles.grayscale)}
			{new FilteredImage( "invert", styles.invert)}
			{new FilteredImage( "opacity", styles.opacity)}
			{new FilteredImage( "saturate", styles.saturate)}
			{new FilteredImage( "sepia", styles.sepia)}
			{new FilteredImage( "blur", styles.blur)}
			{new FilteredImage( "hue-rotate", styles.hueRotate)}
			{new FilteredImage( "drop-shadow", styles.dropShadow)}
		</div>
	}
}



// Helper component to draw the image with the given CSS class and label
class FilteredImage extends mim.Component
{
	url = "examples/rose.png";
	label: string;
	cls?: css.IClassRule;

	constructor( label: string, cls?: css.IClassRule)
	{
		super();
		this.label = label;
		this.cls = cls;
	}

	public render()
	{
		return <div class={styles.box}>
			<img src={this.url} class={this.cls}/>
			<span class={styles.label}>{this.label}</span>
		</div>
	}
}



// mount our component under the body element.
mim.mount( new MyComponent());


