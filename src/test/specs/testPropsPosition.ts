import * as css from "../../index"


describe("style properties of type <position>:", () =>
{
	describe("position", () =>
	{
		it("single position as one keyword", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", "top");
            expect(s).toEqual( "top");
		})

		it("single position as one length", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", 25);
            expect(s).toEqual( "25px");
		})

		it("single position as two keywords", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", ["left", "center"]);
            expect(s).toEqual( "left center");
		})

		it("single position as keyword, length", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", ["left", 0.5]);
            expect(s).toEqual( "left 0.5em");
		})

		it("single position as length, keyword", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [ 30, "center"]);
            expect(s).toEqual( "30px center");
		})

		it("single position as two lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [30, 0.5]);
            expect(s).toEqual( "30px 0.5em");
		})

		it("single position as keyword, length, keyword", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", ["left", 30, "bottom"]);
            expect(s).toEqual( "left 30px bottom");
		})

		it("single position as keyword, keyword, length", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", ["top", "right", 0.5]);
            expect(s).toEqual( "top right 0.5em");
		})

		it("single position as keyword, length, keyword, length", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", ["top", css.cm(1), "right", 0.5]);
            expect(s).toEqual( "top 1cm right 0.5em");
		})

        it("multi position as keywords", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [["top"], ["left", "top"], ["center", "top"]]);
            expect(s).toEqual( "top,left top,center top");
		})

		it("multi position as lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [[30, 0.5], [css.cm(1), 30]]);
            expect(s).toEqual( "30px 0.5em,1cm 30px");
		})

		it("multi position as keywords and lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [["left", 30, "top", 0.5], ["bottom", css.cm(1), "right", 30]]);
            expect(s).toEqual( "left 30px top 0.5em,bottom 1cm right 30px");
		})
	})

	describe("position-x", () =>
	{
		it("single position-x as one keyword", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionX", "left");
            expect(s).toEqual( "left");
		})

		it("single position-x as one length", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionX", 25);
            expect(s).toEqual( "25px");
		})

		it("single position-x as keyword, length", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionX", ["left", 0.5]);
            expect(s).toEqual( "left 0.5em");
		})

        it("multi position-x as keywords", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionX", [["left"], ["center"], ["right"]]);
            expect(s).toEqual( "left,center,right");
		})

		it("multi position-x as lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionX", [[30], [0.5], [css.cm(1)]]);
            expect(s).toEqual( "30px,0.5em,1cm");
		})

		it("multi position-x as keywords and lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [["left", 30], ["center", css.cm(1)], ["right", 30]]);
            expect(s).toEqual( "left 30px,center 1cm,right 30px");
		})
	})

	describe("position-y", () =>
	{
		it("single position-y as one keyword", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionY", "top");
            expect(s).toEqual( "top");
		})

		it("single position-y as one length", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionY", 25);
            expect(s).toEqual( "25px");
		})

		it("single position-y as keyword, length", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionY", ["top", 0.5]);
            expect(s).toEqual( "top 0.5em");
		})

        it("multi position-y as keywords", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionY", [["top"], ["center"], ["bottom"]]);
            expect(s).toEqual( "top,center,bottom");
		})

		it("multi position-y as lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPositionY", [[30], [0.5], [css.cm(1)]]);
            expect(s).toEqual( "30px,0.5em,1cm");
		})

		it("multi position-y as keywords and lengths", () =>
		{
            let s = css.getStylePropValue( "backgroundPosition", [["top", 30], ["center", css.cm(1)], ["bottom", 30]]);
            expect(s).toEqual( "top 30px,center 1cm,bottom 30px");
		})
	})
})



