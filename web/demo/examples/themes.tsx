// This example demonstrates how style definition class inheritance can be used to change styles
// of many elements just by activating and deactivating different style definition classes and
// without re-rendering the HTML content.

import * as mim from "mimbl";
import * as css from "mimcss"



// Use abstract style definition class as a theme interface
class Theme extends css.ThemeDefinition
{
    // define several properties for rules that must be overridden in the derined style
    // definition classes. These rules define the names that will be used when rendering HTML.
	box = this.$class()
	button = this.$class()
    input = this.$class()

    // define several custom CSS properties that are used by rules of this class. We don't provide
    // values for these variables but we specify the CSS property names (in camel form) that
    // define the types of these variables.
    fontFamily = this.$var( "fontFamily")
    fontStyle = this.$var( "fontStyle")
    fontSize = this.$var( "fontSize")
    borderColor = this.$var( "color")
    boxBgColor = this.$const( "color")

    grid = this.$class({
        display: "grid",
        gridTemplateColumns: css.repeat(2, "1fr"),
        gridTemplateRows: css.repeat(2, "1fr"),
        gap: 20,
        width: css.percent(90),
        minWidth: 300,
        height: 300,
        margin: 20
    })

    // use $abstract rule because the following rules are only used as bases for the rules in the
    // derived style definition classes. Using the $abstract rule means that we will not create
    // actual CSS SOM objects for them.
    boxBase = this.$abstract({
        display: "flex",
        padding: 24,
        border: [3, "solid", this.borderColor],
        fontFamily: this.fontFamily,
        fontStyle: this.fontStyle,
        fontSize: this.fontSize,
        backgroundColor: this.boxBgColor
    })

    buttonBase = this.$abstract({
        padding: 16,
        border: [3, "solid", this.borderColor],
        fontFamily: this.fontFamily,
        fontStyle: this.fontStyle,
        margin: "auto",
        cursor: "pointer",
        ":hover": { opacity: 0.7 }
    })

    inputBase = this.$abstract({
        padding: 16,
        border: [3, "solid", this.borderColor],
        fontFamily: this.fontFamily,
        fontStyle: this.fontStyle,
        margin: "auto"
    })

    other = [
        this.$style( 'button, input[type="text"]', {
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            ":focus": { outline: "none" }
        })
    ]
}



// Define style definition class for our "round" theme
class RoundTheme extends Theme
{
    // override values of custom CSS properties.
    fontFamily = this.$var( "fontFamily", "Verdana")
    fontStyle = this.$var( "fontStyle", 45)
    fontSize = this.$var( "fontSize", 24)
    borderColor = this.$var( "color", "blue")
    boxBgColor = this.$const( "color", "cyan")

    // override the rules that were declared in the base class.
    box = this.$class({
        "+": this.boxBase,
        borderRadius: 16
    })

    button = this.$class({
        "+": this.buttonBase,
        borderRadius: 16
    })

    input = this.$class({
        "+": this.inputBase,
        borderRadius: 16,
    })
}



// Define style definition class for our "square" theme - this is very similar to what we did with
// the RoundTheme class - we just need to specify different values for some properties.
class SquareTheme extends Theme
{
    fontFamily = this.$var( "fontFamily", "monospace")
    fontStyle = this.$var( "fontStyle", "normal")
    fontSize = this.$var( "fontSize", 24)
    borderColor = this.$var( "color", "red")
    boxBgColor = this.$const( "color", "lightpink")

    box = this.$class({
        "+": this.boxBase,
        borderLeftWidth: 10
    })

    button = this.$class({
        "+": this.buttonBase,
        borderLeftWidth: 10
    })

    input = this.$class({
        "+": this.inputBase,
        borderLeftWidth: 10
    })
}



// Define component that allows to change themes
export class Themes extends mim.Component
{
    // property that holds the currently ative theme. Notice that we use the base class as a type
    // for this property. When we render HTML we will use this property to refer to the class rules.
    private theme: Theme;

    // propert that holds the name of the current theme - to facilitate switching.
    private currentTheme = "round";

    willMount()
    {
        // activate the initial theme ( we decided to use the round one)
        this.theme = css.activate( RoundTheme);
    }

    willUnmount()
    {
        // deactivate the las selected theme
        css.deactivate( this.theme);
    }

    // Render our component's HTML content
	public render()
	{
		return <div class={this.theme.grid}>
            <div class={this.theme.box}>
                <input type="text" placeholder="First Name" class={this.theme.input}></input>
            </div>
             <div class={this.theme.box}>
                <input type="text" placeholder="Last Name" class={this.theme.input}></input>
            </div>
            <div class={this.theme.box}>
                <button click={this.onRoundThemeClicked} class={this.theme.button}>Round Theme</button>
            </div>
            <div class={this.theme.box}>
                <button click={this.onSquareThemeClicked} class={this.theme.button}>Square Theme</button>
            </div>
       </div>
    }

    private onRoundThemeClicked()
    {
        if (this.currentTheme !== "round")
        {
            this.currentTheme = "round";
            this.theme = css.activate( RoundTheme);
        }
    }

    private onSquareThemeClicked()
    {
        if (this.currentTheme !== "square")
        {
            this.currentTheme = "square";
            this.theme = css.activate( SquareTheme);
        }
    }
}



// Mount our component under the body element.
mim.mount( new Themes());


