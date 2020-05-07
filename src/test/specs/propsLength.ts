import * as css from "../../mimcssTypes"
import * as dom from "../utils/dom"


describe("style properties of type <length>:", () =>
{
	beforeEach(() =>
	{
		dom.removeAllStylesFromHead();
	})



	describe("padding/margin:", () =>
	{
		it("padding-left, integer number", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { paddingLeft: 8})
			}

			let a = css.$activate( A);
			dom.verifyPropValue( a!.c, "paddingLeft", "8px");

			css.$deactivate( a!);
		})

		it("margin-left, floating point number", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { marginLeft: 0.5})
			}

			let a = css.$activate( A);
			dom.verifyPropValue( a!.c, "marginLeft", "0.5em");

			css.$deactivate( a!);
		})

		it("padding, single integer number", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { padding: 8})
			}

			let a = css.$activate( A);
			dom.verifyMultiPropValues( a!.c, {
				paddingTop: "8px",
				paddingRight: "8px",
				paddingBottom: "8px",
				paddingLeft: "8px",
			});

			css.$deactivate( a!);
		})

		it("margin, two floating point numbers", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { margin: [0.25, 0.5]})
			}

			let a = css.$activate( A);
			dom.verifyMultiPropValues( a!.c, {
				marginTop: "0.25em",
				marginRight: "0.5em",
				marginBottom: "0.25em",
				marginLeft: "0.5em",
			});

			css.$deactivate( a!);
		})

		it("padding, three different numbers", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { padding: [8, 6.5, 4]})
			}

			let a = css.$activate( A);
			dom.verifyMultiPropValues( a!.c, {
				paddingTop: "8px",
				paddingRight: "6.5em",
				paddingBottom: "4px",
				paddingLeft: "6.5em",
			});

			css.$deactivate( a!);
		})

		it("margin, four different numbers", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { margin: [0.25, 4, "1%", 3]})
			}

			let a = css.$activate( A);
			dom.verifyMultiPropValues( a!.c, {
				marginTop: "0.25em",
				marginRight: "4px",
				marginBottom: "1%",
				marginLeft: "3px",
			});

			css.$deactivate( a!);
		})
	})



	describe("math functions:", () =>
	{
		it("min", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { width: css.Len.min( "90%", 250, 30.5)})
			}

			let a = css.$activate( A);
			dom.verifyPropValue( a!.c, "width", "min(90%, 250px, 30.5em)");

			css.$deactivate( a!);
		})

		it("calc", () =>
		{
			class A extends css.StyleDefinition
			{
				c = css.$class( { width: css.Len.calc `(90% - ${250}) / 2 + ${2.5}`})
			}

			let a = css.$activate( A);
			dom.verifyPropValue( a!.c, "width", "calc((90% - 250px) / 2 + 2.5em)");

			css.$deactivate( a!);
		})
	})
})



