import * as css from "../../index"
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
			dom.testLonghandProp( "paddingLeft", 8, "8px");
		})

		it("margin-left, floating point number", () =>
		{
			dom.testLonghandProp( "marginLeft", 0.5, "0.5em");
		})

		it("padding, single integer number", () =>
		{
			dom.testShorthandProp( "padding", 8,
				{
					paddingTop: "8px",
					paddingRight: "8px",
					paddingBottom: "8px",
					paddingLeft: "8px",
				}
			);
		})

		it("margin, two floating point numbers", () =>
		{
			dom.testShorthandProp( "margin", [0.25, 0.5],
				{
					marginTop: "0.25em",
					marginRight: "0.5em",
					marginBottom: "0.25em",
					marginLeft: "0.5em",
				}
			);
		})

		it("padding, three different numbers", () =>
		{
			dom.testShorthandProp( "padding", [8, 6.5, 4],
				{
					paddingTop: "8px",
					paddingRight: "6.5em",
					paddingBottom: "4px",
					paddingLeft: "6.5em",
				}
			);
		})

		it("margin, four different numbers", () =>
		{
			dom.testShorthandProp( "margin", [0.25, 4, css.percent(1), 3],
				{
					marginTop: "0.25em",
					marginRight: "4px",
					marginBottom: "1%",
					marginLeft: "3px",
				}
			);
		})
	})



	describe("line width:", () =>
	{
		it("borderBlockEndWidth, number", () =>
		{
			dom.testLonghandProp( "borderBlockEndWidth", 8, "8px");
		})

		it("borderInlineStartWidth, keyword", () =>
		{
			dom.testLonghandProp( "borderInlineStartWidth", "thick", "thick");
		})

		it("borderBlockWidth, single number", () =>
		{
			dom.testLonghandProp( "borderBlockWidth", 0.2, "0.2em");
		})

		it("borderInlineWidth, two values", () =>
		{
			dom.testLonghandProp( "borderInlineWidth", [0.2, "thin"], "0.2em thin");
		})

		it("borderWidth, single number", () =>
		{
			dom.testLonghandProp( "borderWidth", 0.2, "0.2em");
		})

		it("borderWidth, two values", () =>
		{
			dom.testLonghandProp( "borderWidth", [0.2, "thin"], "0.2em thin");
		})

		it("borderWidth, three values", () =>
		{
			dom.testLonghandProp( "borderWidth", [0.2, "thin", css.Len.min( 4, css.vmin(1))], "0.2em thin min(4px, 1vmin)");
		})

		it("borderWidth, four values", () =>
		{
			dom.testLonghandProp( "borderWidth", [0.2, "thin", 0, css.cm(0.1)], "0.2em thin 0px 0.1cm");
		})
	})



    describe("math functions:", () =>
	{
		it("min", () =>
		{
			dom.testLonghandProp( "width", css.Len.min( css.percent(90), 250, 30.5), "min(90%, 250px, 30.5em)");
		})

		it("calc", () =>
		{
			dom.testLonghandProp( "width", css.Len.calc`(45% + ${2.5} - ${250})`,
				"calc(45% + 2.5em - 250px)", "calc((45% + 2.5em) - 250px)");
		})
	})
})



