import * as css from "../../index"
import * as dom from "../utils/dom"


// Color augmentation
declare module "../../api/ColorTypes"
{
	interface INamedColors
	{
		readonly positiveColor?: number;
		readonly positiveColorWithAlpha?: number;
		readonly negativeColor?: number;
		readonly negativeColorWithAlpha?: number;
	}
}

css.registerColor( "positiveColor", 0x123456);
css.registerColor( "positiveColorWithAlpha", 0x123456 + 0.25);
css.registerColor( "negativeColor", -0x123456);
css.registerColor( "negativeColorWithAlpha", -0x123456 - 0.25);



describe("Colors", () =>
{
	beforeEach(() => { dom.removeAllStylesFromHead(); })



	describe("Named colors", () =>
	{
		it("named color", () =>
		{
			dom.testLonghandProp( "color", "red", "red");
		})

		// it("named color with alpha function", () =>
		// {
		// 	dom.testLonghandProp( "color", css.alpha( "red", 0.5), "rgba(255, 0, 0, 0.5)");
		// })
	})



	describe("Numeric colors", () =>
	{
		it("numeric color not corresponding to named color", () =>
		{
			dom.testLonghandProp( "color", 0x123456, "rgb(18, 52, 86)");
		})

		// it("numeric color with alpha function", () =>
		// {
		// 	dom.testLonghandProp( "color", css.alpha( 0x00FF00, 0.5), "rgba(0, 255, 0, 0.5)");
		// })

		it("numeric color with alpha floating point part", () =>
		{
			dom.testLonghandProp( "color", 0x00FF00 + 0.5, "rgba(0, 255, 0, 0.5)");
		})

		it("negative color number not corresponding to named color", () =>
		{
			dom.testLonghandProp( "color", -0x123456, "rgb(237, 203, 169)");
		})

		// it("negative color with alpha function", () =>
		// {
		// 	dom.testLonghandProp( "color", css.alpha( -0x123456, 0.5), "rgba(237, 203, 169, 0.5)");
		// })

		it("negative color with alpha as floating point part", () =>
		{
			dom.testLonghandProp( "color", -0x123456 - 0.5, "rgba(237, 203, 169, 0.5)");
		})
	})



	describe("rgb()", () =>
	{
		it("rgb() with integer values and no alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(18, 52, 86), "rgb(18, 52, 86)");
		})

		it("rgb() with floating point values and no alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(0.18, 0.52, 0.86), 'rgb(46, 133, 219)');
		})

		it("rgb() with floating point alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(18, 52, 86, 0.3), "rgba(18, 52, 86, 0.3)");
		})

		it("rgb() with integer alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(18, 52, 86, 30), "rgba(18, 52, 86, 0.3)");
		})

		it("rgb() with percent string alpha", () =>
		{
			dom.testLonghandProp( "color", css.rgb(18, 52, 86, "30%"), "rgba(18, 52, 86, 0.3)");
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



