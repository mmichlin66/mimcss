import * as css from "../../mimcssTypes"
import * as dom from "../utils/dom"


// Color augmentation
declare module "../../styles/ColorTypes"
{
	interface INamedColors
	{
		positiveColor?: number;
		positiveColorWithAlpha?: number;
		negativeColor?: number;
		negativeColorWithAlpha?: number;
	}
}

css.Colors.positiveColor = 0x123456;
css.Colors.positiveColorWithAlpha = 0x123456 + 0.25;
css.Colors.negativeColor = -0x123456;
css.Colors.negativeColorWithAlpha = -0x123456 - 0.25;



describe("Colors", () =>
{
	beforeEach(() => { dom.removeAllStylesFromHead(); })



	describe("Named colors", () =>
	{
		it("named color", () =>
		{
			dom.testLonghandProp( "color", "red", "red");
		})

		it("numeric color corresponding to named color", () =>
		{
			dom.testLonghandProp( "color", 0xFF0000, "red");
		})

		it("named color from the Colors object", () =>
		{
			dom.testLonghandProp( "color", css.Colors.rebeccapurple, "rebeccapurple");
		})

		it("named color with alpha function", () =>
		{
			dom.testLonghandProp( "color", css.alpha( "red", 0.5), "rgba(255, 0, 0, 0.5)");
		})

		it("negative color number corresponding to named color", () =>
		{
			dom.testLonghandProp( "color", -css.Colors.red, "cyan");
		})
	})


	
	describe("Numeric colors", () =>
	{
		it("numeric color not corresponding to named color", () =>
		{
			dom.testLonghandProp( "color", 0x123456, "rgb(18, 52, 86)");
		})

		it("numeric color with alpha function", () =>
		{
			dom.testLonghandProp( "color", css.alpha( 0x00FF00, 0.5), "rgba(0, 255, 0, 0.5)");
		})

		it("numeric color with alpha floating point part", () =>
		{
			dom.testLonghandProp( "color", 0x00FF00 + 0.5, "rgba(0, 255, 0, 0.5)");
		})

		it("negative color number not corresponding to named color", () =>
		{
			dom.testLonghandProp( "color", -0x123456, "rgb(237, 203, 169)");
		})

		it("negative color with alpha function", () =>
		{
			dom.testLonghandProp( "color", css.alpha( -0x123456, 0.5), "rgba(237, 203, 169, 0.5)");
		})

		it("negative color with alpha as floating point part", () =>
		{
			dom.testLonghandProp( "color", -0x123456 - 0.5, "rgba(237, 203, 169, 0.5)");
		})
	})



	describe("rgb()", () =>
	{
		it("rgb() with positive values", () =>
		{
			dom.testLonghandProp( "color", css.rgb(18, 52, 86), "rgb(18, 52, 86)");
		})

		it("rgb() with positive values and alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(18, 52, 86, 0.3), "rgba(18, 52, 86, 0.3)");
		})

		it("rgb() with negative values", () =>
		{
			dom.testLonghandProp( "color", css.rgb(-18, -52, -86), "rgb(237, 203, 169)");
		})

		it("rgb() with negative values and alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(-18, -52, -86, 0.7), "rgba(237, 203, 169, 0.7)");
		})
	})



	describe("Custom colors", () =>
	{
		it("positive custom color", () =>
		{
			dom.testLonghandProp( "color", "positiveColor", "rgb(18, 52, 86)");
		})

		it("positive custom color with alpha", () =>
		{
			dom.testLonghandProp( "color", "positiveColorWithAlpha", "rgba(18, 52, 86, 0.25)");
		})

		it("negative custom color", () =>
		{
			dom.testLonghandProp( "color", "negativeColor", "rgb(237, 203, 169)");
		})

		it("negative custom color with alpha", () =>
		{
			dom.testLonghandProp( "color", "negativeColorWithAlpha", "rgba(237, 203, 169, 0.25)");
		})
	})
})



