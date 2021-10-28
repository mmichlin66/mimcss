import * as css from "../../index"
import * as dom from "../utils/dom"


describe("border-image- longhand properties", () =>
{
	beforeEach(() => { dom.removeAllStylesFromHead(); })



	describe("border-image-outset", () =>
	{
		it("single number", () =>
		{
			dom.testLonghandProp( "borderImageOutset", 2, "2");
		})

		it("single string", () =>
		{
			dom.testLonghandProp( "borderImageOutset", css.px(3), "3px");
		})

		it("two numbers, two strings", () =>
		{
			dom.testLonghandProp( "borderImageOutset", [2, css.px(2), css.em(0.4), 1.5], "2 2px 0.4em 1.5");
		})
	})



	describe("border-image-repeat", () =>
	{
		it("single value", () =>
		{
			dom.testLonghandProp( "borderImageRepeat", "stretch", "stretch");
		})

		it("two values", () =>
		{
			dom.testLonghandProp( "borderImageRepeat", ["round", "space"], "round space");
		})
	})



	describe("border-image-slice", () =>
	{
		it("single number", () =>
		{
			dom.testLonghandProp( "borderImageSlice", 10, "10");
		})

		it("single percentage", () =>
		{
			dom.testLonghandProp( "borderImageSlice", css.percent(5), "5%");
		})

		it("two numbers, two percentages", () =>
		{
			dom.testLonghandProp( "borderImageSlice", [css.percent(5), 10, 5, css.percent(10)], "5% 10 5 10%");
		})

		it("'fill' with single number", () =>
		{
			dom.testLonghandProp( "borderImageSlice", [10, "fill"], "10 fill");
		})

		it("'fill' with single percentage", () =>
		{
			dom.testLonghandProp( "borderImageSlice", [css.percent(5), "fill"], "5% fill");
		})

		it("'fill' with two numbers one percentage", () =>
		{
			dom.testLonghandProp( "borderImageSlice", [10, css.percent(5), 12, "fill"], "10 5% 12 fill");
		})

		it("'fill' with two numbers two percentages", () =>
		{
			dom.testLonghandProp( "borderImageSlice", [10, css.percent(5), 15, css.percent(6), "fill"], "10 5% 15 6% fill");
		})
	})



	describe("border-image-source", () =>
	{
		it("url", () =>
		{
			dom.testLonghandProp( "borderImageSource", css.url("image.png"), "url(\"image.png\")");
		})

		it("raw", () =>
		{
			dom.testLonghandProp( "borderImageSource", css.raw`url(image.png)`, "url(\"image.png\")");
		})
	})
})



describe("border-image shorthand property:", () =>
{
	it("image url only", () =>
	{
		dom.testShorthandProp( "borderImage",
			{
				source: css.url("image.png"),
			},
			{
				borderImageSource: "url(\"image.png\")",
			}
		);
	})

	it("image url, slice number, repeat pair, width four numbers", () =>
	{
		dom.testShorthandProp( "borderImage",
			{
				source: css.url("image.png"),
				slice: 10,
				repeat: ["round", "space"],
				width: [1, 2, 3, 4]
			},
			{
				borderImageSource: "url(\"image.png\")",
				borderImageSlice: "10",
				borderImageRepeat: "round space",
				borderImageWidth: "1 2 3 4",
			}
		);
	})

	it("image raw, slice number and fill, repeat one, width two numbers two strings", () =>
	{
		dom.testShorthandProp( "borderImage",
			{
				source: css.raw`url(image.png)`,
				slice: [10, "fill"],
				repeat: "stretch",
				width: [1, css.px(2), css.rem(0.3), 2]
			},
			{
				borderImageSource: "url(\"image.png\")",
				borderImageSlice: "10 fill",
				borderImageRepeat: "stretch",
				borderImageWidth: "1 2px 0.3rem 2",
			}
		);
	})

	it("image linear-gradient, slice number and string, no width, outset two numbers two strings", () =>
	{
		dom.testShorthandProp( "borderImage",
			{
				source: css.linearGradient( "red", "blue"),
				slice: [10, css.percent(5)],
				width: 10,
				outset: [1, css.px(2), css.rem(0.3), 2]
			},
			{
				borderImageSource: "linear-gradient(red, blue)",
				borderImageSlice: "10 5%",
				borderImageOutset: "1 2px 0.3rem 2",
			}
		);
	})

	it("image linear-gradient, no slice, no width, outset one number", () =>
	{
		dom.testShorthandProp( "borderImage",
			{
				source: css.linearGradient( "red", "blue"),
				outset: 2
			},
			{
				borderImageSource: "linear-gradient(red, blue)",
				borderImageOutset: "2",
			}
		);
	})
})



