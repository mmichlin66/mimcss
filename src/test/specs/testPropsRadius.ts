import * as css from "../../index"


describe("style properties of type <radius>:", () =>
{
	describe("single corner radius", () =>
	{
		it("single corner radius as one value", () =>
		{
            let s = css.getStylePropValue( "borderTopLeftRadius", 8);
            expect(s).toEqual( "8px");
		})

		it("single corner radius as two values", () =>
		{
            let s = css.getStylePropValue( "borderTopLeftRadius", [8, 16]);
            expect(s).toEqual( "8px 16px");
		})
	})

	describe("single corner radius", () =>
	{
		it("border radius as one / zero values", () =>
		{
            let s = css.getStylePropValue( "borderRadius", 8);
            expect(s).toEqual( "8px");
		})

		it("border radius as two / zero values", () =>
		{
            let s = css.getStylePropValue( "borderRadius", [8, 16]);
            expect(s).toEqual( "8px 16px");
		})

		it("border radius as two / two values", () =>
		{
            let s = css.getStylePropValue( "borderRadius", [[8, 16], [3, 6]]);
            expect(s).toEqual( "8px 16px/3px 6px");
		})

		it("border radius as three / four values", () =>
		{
            let s = css.getStylePropValue( "borderRadius", [[8, 16, 12], [3, 6, 9, 12]]);
            expect(s).toEqual( "8px 16px 12px/3px 6px 9px 12px");
		})
	})
})



