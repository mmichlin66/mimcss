import * as css from "../../index"
import * as dom from "../utils/dom"


describe("@page rules:", () =>
{
    // switch to Scoped name generation method so that names are predictable
    css.configNameGeneration( css.NameGenerationMethod.Scoped);

    beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



	it("with pseudo-page and margin box", () =>
	{
		class A extends css.StyleDefinition
		{
            firstPage = this.$page( ":first", {
                margin: "auto",
                size: ["A4", "portrait"],
                "@top-left": { content: css.counter("pages")}
            })
        }

		let s = dom.serialize( A);
		expect(s).toEqual("<style id=\"A\">@page :first{margin:auto;size:A4 portrait;@top-left{content:counter(pages);}}</style>");
	})

	it("with named page and pseudo-page", () =>
	{
		class A extends css.StyleDefinition
		{
            namedPage = this.$pageName();
            firstPage = this.$page( [this.namedPage, ":left"], {
                margin: "auto",
                size: "landscape",
            })
        }

		let s = dom.serialize( A);
		expect(s).toEqual("<style id=\"A\">@page A_namedPage:left{margin:auto;size:landscape;}</style>");
	})
})



