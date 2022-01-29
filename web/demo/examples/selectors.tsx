// This example demonstrates how to use methods of StyleDefinition class to define style
// rules with different selectors.

import * as mim from "mimbl";
import * as css from "mimcss"



class MyStyles extends css.StyleDefinition
{
    // common styles for all elements in this example
    common = this.$tag("p", { padding: 16, margin: 0, fontWeight: "bold" })

    container = this.$class({})

    // all p elements will have 16px padding, 0 margin and bold font
    p = this.$tag( "p", { "+": this.common })

    // all elements that have CSS class whose name is defined by the "byClass" property
    // will be white
    byClass = this.$class({ backgroundColor: "white" })

    // all elements that have ID whose name is defined by the "byID" property
    // will be beige
    byID = this.$id({ backgroundColor: "beige" })

    // all elements that have the title attribute will be cyan (unless overridden)
    byTitlePresence = this.$style( css.sel("p").attr("title"), { backgroundColor: "cyan" })

    // all elements that have the title attribute with the exact value of "tooltip"
    // will be lightpink
    byTitleValue = this.$style( css.sel(this.p).attr( "title", "tooltip"), { backgroundColor: "lightpink" })

    // all elements that have the title attribute, which starts with "https://"
    // will be orange
    byTitleStart = this.$style(
        css.sel("p").attr( "title", "^=", "https://"),
        { backgroundColor: "orange" }
    )

    // all <p> elements, which are the last in the list of <p> elements, will be lightgreen
    lastP = this.$tag( "p", {
        ":last-of-type": {backgroundColor: "lightgreen"}
    })

    // gradient background if the element has class .fancy unless it also has class .plain
    fancy = this.$class({"+": this.common})
    plain = this.$class()
    // gradient = this.$style( [this.fancy, css.sel().not(this.plain)], {
    gradient = this.$style( css.sel(this.fancy).not(this.plain), {
        backgroundImage: css.linearGradient( "blue", "red", "green").to("bottom"),
        color: "white",
    })

    // all <p> elements, which are the last in the list of <p> elements, will be lightgreen
    everyOther = this.$style( css.sel(this.container).child("p").nthChild( 2, 1), {
        fontStyle: "italic"
    })
}



class Selectors extends mim.Component
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

    // Render our component's HTML content
	public render()
	{
		return <div>
            <div class={this.styles.container}>
                <p class={this.styles.byClass}>
                    This element is selected using class selector
                </p>
                <p id={this.styles.byID}>
                    This element is selected using ID selector
                </p>
                <p title="this element has a tooltip">
                    This element is selected using simple attribute selector
                </p>
                <p title="tooltip">
                    This element is selected using complex attribute selector
                </p>
                <p title="https://github.com">
                    This element is selected using yet more complex attribute selector
                </p>
                <p title="https://github.com">
                    This element is selected because it is the last element of type 'p'
                </p>
            </div>
            <div class={this.styles.container}>
                <div class={this.styles.fancy}>
                    This element should have gradient background because it has .fancy class
                </div>
                <div class={[this.styles.fancy, this.styles.plain]}>
                    This element does not have gradient background because it has .plain class, although it also has .fancy class
                </div>
           </div>
        </div>
    }
}



// Mount our component under the body element.
mim.mount( new Selectors());


