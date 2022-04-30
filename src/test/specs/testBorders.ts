import * as css from "../../index"


describe("border longhand property", () =>
{
	describe("single value", () =>
	{
		it("width: keyword", () =>
		{
            let s = css.getStylePropValue( "border", "thick");
            expect(s).toEqual( "thick solid");
		})

		it("width: number", () =>
		{
            let s = css.getStylePropValue( "border", 0.1);
            expect(s).toEqual( "0.1em solid"); // "solid" should be added
		})

		it("color: number (treated as width - not as color)", () =>
		{
            let s = css.getStylePropValue( "border", 0xAA0033);
            expect(s).toEqual( "11141171px solid");
		})

		it("color: keyword", () =>
		{
            let s = css.getStylePropValue( "border", "red");
            expect(s).toEqual( "red solid"); // "solid" should be added
		})

		it("style", () =>
		{
            let s = css.getStylePropValue( "border", "dashed");
            expect(s).toEqual( "dashed");
		})
	})

	describe("tuples", () =>
	{
		it("width and style", () =>
		{
            let s = css.getStylePropValue( "border", [1, "dotted"]);
            expect(s).toEqual( "1px dotted");
		})

		it("width, style and color", () =>
		{
            let s = css.getStylePropValue( "border", [1, "dotted", 0xAA0033]);
            expect(s).toEqual( "1px dotted #aa0033");
		})

		it("width and color", () =>
		{
            let s = css.getStylePropValue( "border", [1, "red"]);
            expect(s).toEqual( "1px red");
		})

		it("width, color and style", () =>
		{
            let s = css.getStylePropValue( "border", ["medium", "red", "dotted"]);
            expect(s).toEqual( "medium red dotted");
		})

		it("style and width", () =>
		{
            let s = css.getStylePropValue( "border", ["dashed", 1]);
            expect(s).toEqual( "dashed 1px");
		})

		it("style, width and color", () =>
		{
            let s = css.getStylePropValue( "border", ["dashed", "thick", 0xAA0033]);
            expect(s).toEqual( "dashed thick #aa0033");
		})

		it("style and color", () =>
		{
            let s = css.getStylePropValue( "border", ["dashed", css.rgb(200, 150, 40)]);
            expect(s).toEqual( "dashed rgb(200 150 40)");
		})

		it("style, color and width", () =>
		{
            let s = css.getStylePropValue( "border", ["dashed", "red", "thick"]);
            expect(s).toEqual( "dashed red thick");
		})

		it("color and width", () =>
		{
            let s = css.getStylePropValue( "border", [css.rgb(200, 150, 40), "medium"]);
            expect(s).toEqual( "rgb(200 150 40) medium");
		})

		it("color, width and style", () =>
		{
            let s = css.getStylePropValue( "border", [css.rgb(200, 150, 40), "medium", "inset"]);
            expect(s).toEqual( "rgb(200 150 40) medium inset");
		})

		it("color and style", () =>
		{
            let s = css.getStylePropValue( "border", [css.rgb(200, 150, 40), "inset"]);
            expect(s).toEqual( "rgb(200 150 40) inset");
		})

		it("color, style and width", () =>
		{
            let s = css.getStylePropValue( "border", [css.rgb(200, 150, 40), "inset", 1]);
            expect(s).toEqual( "rgb(200 150 40) inset 1px");
		})
	})

	describe("object", () =>
	{
		it("style alone", () =>
		{
            let s = css.getStylePropValue( "border", { style: "dotted"});
            expect(s).toEqual( "dotted");
		})

		it("width and style", () =>
		{
            let s = css.getStylePropValue( "border", { width: 1, style: "dotted"});
            expect(s).toEqual( "1px dotted");
		})

		it("width and color", () =>
		{
            let s = css.getStylePropValue( "border", { width: 1, color: 0xAA0033});
            expect(s).toEqual( "1px #aa0033");
		})

		it("style and color", () =>
		{
            let s = css.getStylePropValue( "border", { style: "groove", color: 0xAA0033});
            expect(s).toEqual( "groove #aa0033");
		})

		it("style and width", () =>
		{
            let s = css.getStylePropValue( "border", { style: "groove", width: css.cm(0.1)});
            expect(s).toEqual( "0.1cm groove");
		})

		it("width, style and color", () =>
		{
            let s = css.getStylePropValue( "border", { width: 1, style: "dotted", color: "red"});
            expect(s).toEqual( "1px dotted red");
		})
	})
})



