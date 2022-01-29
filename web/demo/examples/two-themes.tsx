// This example demonstrates how to use two themes at the same time on a single page.
// The example defines two themes and show how to apply them to two different sections
// of the page.

import * as mim from "mimbl";
import * as css from "mimcss"



// Define theme base class
class Theme extends css.ThemeDefinition
{
    fgColor = this.$var( "color")
    bgColor = this.$var( "color")
}



// Define first theme
class LightTheme extends Theme
{
    fgColor = this.$var( "color", "black")
    bgColor = this.$var( "color", "white")
}



// Define second theme
class DarkTheme extends Theme
{
    fgColor = this.$var( "color", "white")
    bgColor = this.$var( "color", "black")
}



// Define styles that will be used by our component
class MyStyles extends css.StyleDefinition
{
    // reference them base class
    theme = this.$use(Theme)

    // define CSS class that will be re-used by both sections of the HTML
    block = this.$class({
        backgroundColor: this.theme.bgColor,
        color: this.theme.fgColor,
        padding: 16
    })

    // define CSS class for the top section of our HTML
    top = this.$class({
        // the "++" property makes CSS class name "block top"
        "++": this.block,

        // the "--" property references the LightTheme class, which copies the
        // values of custom CSS properties defined in this class under our ruleset
        "--": [LightTheme],
    })

    // define CSS class for the bottom section of our HTML
    bottom = this.$class({
        "++": this.block,
        "--": [DarkTheme],
    })
}



// Define our component
class TwoThemes extends mim.Component
{
    private styles: MyStyles;

    willMount()
    {
        this.styles = css.activate( MyStyles);
    }

    willUnmount()
    {
        css.deactivate( this.styles);
    }

	public render()
	{
		return <div>
            <div class={this.styles.top}>
                This should be black text on white background
            </div>
            <div class={this.styles.bottom}>
                This should be white text on black background
            </div>
       </div>
    }
}



// Mount our component under the body element.
mim.mount( new TwoThemes());


