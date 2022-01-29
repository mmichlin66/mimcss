import * as mim from "mimbl";
import * as css from "mimcss"


class MyStyles extends css.StyleDefinition
{
    // example of linear gradient
	linearGradient = this.$class({
		width: 200,
		height: 200,
        backgroundImage: css.linearGradient( css.Colors.pink,
            css.Colors.burlywood, [30], [css.Colors.pink, 50]).to(15).repeating()
	})

    // example of radial gradient
	radialGradient = this.$class({
		width: 200,
		height: 200,
		backgroundImage: css.radialGradient( css.Colors.lightcyan, css.Colors.orange, [30],
			[css.Colors.lightcyan, 50]).circle().extent("farthest-corner").at([5.5,3.3]).repeating()
	})

    // example of conic gradient
	conic = this.$class({
		width: 200,
		height: 200,
        backgroundImage: css.conicGradient( css.Colors.red, css.Colors.orange,css.Colors.yellow, css.Colors.green,
            css.Colors.lightblue, css.Colors.blue, css.Colors.violet, css.Colors.red).from(45).at( css.percent(70))
    })

    // another example of conic gradient
	checkerboard = this.$class({
		width: 200,
		height: 200,
		background: {
            image: css.conicGradient( ["white", 0.25], ["black", 0.25, 0.5], ["white", 0.5, 0.75], ["black", 0.75]),
            position: ["top", "left"],
            size: [css.percent(25), css.percent(25)],
            repeat: "repeat"
		},
		border: [1, "solid"]
    })

    // helper class for layout
	hbox = this.$class({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
	})
}

// activate our styles
let styles = css.activate( MyStyles);



class MyComponent extends mim.Component
{
	public render()
	{
		return <div>
			<div class={styles.hbox}>
				<div class={styles.linearGradient} />
				<div class={styles.radialGradient} />
				<div class={styles.conic} />
				<div class={styles.checkerboard} />
			</div>
		</div>
	}
}



// mount our component under the body element.
mim.mount( new MyComponent());


