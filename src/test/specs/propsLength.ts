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
			dom.testShorthandProp( "margin", [0.25, 4, "1%", 3],
				{
					marginTop: "0.25em",
					marginRight: "4px",
					marginBottom: "1%",
					marginLeft: "3px",
				}
			);
		})
	})



	describe("math functions:", () =>
	{
		it("min", () =>
		{
			dom.testLonghandProp( "width", css.Len.min( "90%", 250, 30.5), "min(90%, 250px, 30.5em)");
		})

		it("calc", () =>
		{
			dom.testLonghandProp( "width", css.Len.calc`(90% - ${250}) / 2 + ${2.5}`, "calc((90% - 250px) / 2 + 2.5em)");
		})
	})
})



