// This example is taken from Zach Saucier's article on css-tricks.com: https://css-tricks.com/css-animation-tricks/.
// It demonstrates not only how animations are defined in Mimcss but also how TypeScript (actually, JavaScript)
// constructs make it easier to define styles for multiple objects.

import * as mim from "mimbl"
import * as css from "mimcss"


// Number of circles
let N = 11;

// Animation duration in seconds
let D = 3;

// Helper array of numbers from 0 to N-1
let numbers: number[] = Array.from({length:N}, (x,i) => i);

class MyStyles extends css.StyleDefinition
{
    // Define the animation
    slide = this.$keyframes([
        [0, { left: "75%" }],
        [50, { left: "25%" }],
        [100, { left: "75%" }],
    ])

    // Define the container within which the animation will occur
    container = this.$class({
        position: "relative",
        width: 700,
        height: 500,
        border: [1, "solid", "black"],
        margin: "auto",
    })

    // Define a custom property that can be set to start and stop the animation
    playState = this.$var( "animationPlayState", "running")

    // Define a class for our moving circles
    circle = this.$class({
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        left: "75%",
        animationName: this.slide,
        animationDuration: css.s(D),
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationPlayState: this.playState,

        // call function that returns an array
        ":nth-of-type": this.fillDivs()
    })

    text = this.$class({
        position: "absolute",
        bottom: 0,
        left: 4
    })

    // Helper method that returns an array of tuples defining styles for our circles.
    // Style values are calculated based on the circle index.
    private fillDivs(): [number, css.CombinedStyleset][]
    {
        return numbers.map( i => {
            let styles: css.CombinedStyleset = {
                backgroundColor: i % 2 === 0 ? "black" : "white",
                border: [2, "solid",  i % 2 === 0 ? "white" : "black"],
                height: 20*N - 10 - 20*i,
                width: 20*N - 10 - 20*i,
                marginTop: -(8*N + 10) + 8*i,
                marginLeft: -(8*N + 10) + 8*i,
                animationDelay: css.s(-(D / N) * i),
            };
            return [i+1, styles];
        })
    }
    }



export class MyComponent extends mim.Component
{
	styles = css.activate( MyStyles);

	willUnmount()
	{
		css.deactivate( this.styles);
	}

	render(): any
	{
		return <div class={this.styles.container} click={this.onClick}>
            {numbers.map( i => <div class={this.styles.circle} />)}
            <span class={this.styles.text}>Click anywhere inside the box to pause and resume the animation.</span>
        </div>;
	}

    onClick()
    {
        // Get the current value of the custom CSS property
        let prevState = this.styles.playState.getValue();

        // Set the new value of the custom CSS property
        this.styles.playState.setValue( prevState === "running" ? "paused" : "running");
    }
}



// mount our component under the body element.
mim.mount( new MyComponent());



