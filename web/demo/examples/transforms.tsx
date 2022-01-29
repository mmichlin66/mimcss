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
		padding: [25, 25, 0]
	})

	label = this.$class({
		padding: [8, 0, 2],
	})

	img = this.$tag( "img", {
		height: 150,
		width: 150,
        margin: 40
	})

	rotate = this.$class({ transform: css.rotate(45) })
	rotateY = this.$class({ transform: css.rotateY(60) })
	scale = this.$class({ transform: css.scale( 1.2, 1.5) })
	skew = this.$class({ transform: css.skew( 10, 15) })
	translate = this.$class({ transform: css.translate( 50, -3.5) })
	// perspective = this.$class({ transform: css.perspective( css.cm(20)) })
}

// activate our styles
let styles = css.activate( MyStyles);



class MyComponent extends mim.Component
{
	public render()
	{
		return <div class={styles.container}>
			{new TransformedImage( "original")}
			{new TransformedImage( "rotate", styles.rotate)}
			{new TransformedImage( "rotateY", styles.rotateY)}
			{new TransformedImage( "scale", styles.scale)}
			{new TransformedImage( "skew", styles.skew)}
			{new TransformedImage( "translate", styles.translate)}
			{/* {new TransformedImage( "perspective", styles.perspective)} */}
		</div>
	}
}



// Helper component to draw the image with the given CSS class and label
class TransformedImage extends mim.Component
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


