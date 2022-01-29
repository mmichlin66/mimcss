// This example demonstrates a custom scheduler that will apply style changes after a certain
// delay. Although the scheduler as written doesn't makes much sense, it does demonstrates how
// developers can create their own custom schedulers

import * as mim from "mimbl";
import * as css from "mimcss"



// This custom scheduler will write style changes to DOM after a one-second delay
export class DelayScheduler implements css.IScheduler
{
    // you can change the value (in milliseconds) to play with the delay
    private static delay = 1000;

    // Handle returned by setTimeout function.
	private timeoutHandle = 0;

    // Callback to call to write changes to the DOM.
	private doDOMUpdate: () => void;

    /**
     * Initializes the scheduler object and provides the callback that should be invoked when the
     * scheduler decides to make changes to the DOM.
     */
    public init( doDOMUpdate: () => void)
    {
        this.doDOMUpdate = doDOMUpdate;
    }

	/**
	 * Is invoked when the scheduler needs to schedule its callback or event.
	 */
    public scheduleDOMUpdate(): void
    {
		this.timeoutHandle = setTimeout( this.onTimeout, DelayScheduler.delay);
    }

	/**
	 * Is invoked when the scheduler needs to cancel its scheduled callback or event.
	 */
    public cancelDOMUpdate(): void
    {
		if (this.timeoutHandle > 0)
		{
			clearTimeout( this.timeoutHandle);
			this.timeoutHandle = 0;
		}
    }

	/**
	 * Is invoked when the timeout expires.
	 */
	private onTimeout = (): void =>
	{
		this.timeoutHandle = 0;
		this.doDOMUpdate();
	}
}



// register our scenduler
let delaySchedulerID = css.registerScheduler( new DelayScheduler());



// Declare styles for our themes and define several themes
class ThemeBase extends css.StyleDefinition
{
    @css.virtual clr = this.$const("color")

    happy = this.$class({
        fontSize: 40,
        fontWeight: "bold",
        padding: 0.5,
        color: this.clr,
        border: [4, "inset", this.clr],
        borderRadius: 16,
        textAlign: "center"
    });
}

// Define several themes
class BlueTheme extends ThemeBase { clr = this.$const("color", "dodgerblue") }
class GreenTheme extends ThemeBase { clr = this.$const("color", "darkgreen") }
class OrangeTheme extends ThemeBase { clr = this.$const("color", "orange") }
class RedTheme extends ThemeBase { clr = this.$const("color", "red") }
class BrownTheme extends ThemeBase { clr = this.$const("color", "brown") }
class PurpleTheme extends ThemeBase { clr = this.$const("color", "purple") }

let themes = [BlueTheme, GreenTheme, OrangeTheme, RedTheme, BrownTheme, PurpleTheme];



// Define component that displays "Hello World!"
class HelloWorld extends mim.Component
{
    private prevScheduler: number;
    private themeIndex: number;
    private theme: ThemeBase;

    willMount()
    {
        this.prevScheduler = css.setDefaultScheduler( delaySchedulerID);
        this.themeIndex = 0;
        this.theme = css.activate( themes[this.themeIndex]);
    }

    willUnmount()
    {
        css.setDefaultScheduler( this.prevScheduler);
        css.deactivate( this.theme);
    }

	render()
	{
		return <div style={{display: "flex", flexDirection: "column", gap: 16}}>
            <div class={this.theme.happy}>
                Happy Scheduling!
            </div>
            <p style={{margin: [0, "auto"]}}>
                When you click the button below, the style theme will change; however,
                it will do it with a delay.
            </p>
            <button click={this.onToggleStyles} style={{margin: [0, "auto"]}}>
                Toggle Styles
            </button>
        </div>
	}

    private onToggleStyles()
    {
        if (++this.themeIndex == themes.length)
            this.themeIndex = 0;

        css.deactivate( this.theme);
        this.theme = css.activate( themes[this.themeIndex]);
    }
}



// Mount our component under the body element.
mim.mount( new HelloWorld());


