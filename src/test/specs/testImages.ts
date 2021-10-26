import * as css from "../../index"


describe("images:", () =>
{
	describe("image-set()", () =>
	{
		it("image-set(): one image as string URL", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( "1.png"));
            expect(s).toEqual( "image-set(\"1.png\")");
		})

		it("image-set(): one image as url()", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( css.url("1.png")));
            expect(s).toEqual( "image-set(url(\"1.png\"))");
		})

		it("image-set(): one image as gradient", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( css.linearGradient("red", "blue")));
            expect(s).toEqual( "image-set(linear-gradient(red,blue))");
		})

        it("image-set(): one image and type without 'image/'", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", "jpeg"]));
            expect(s).toEqual( "image-set(\"1.png\" type(\"image/jpeg\"))");
		})

        it("image-set(): one image and type with 'image/'", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", "image/jpeg"]));
            expect(s).toEqual( "image-set(\"1.png\" type(\"image/jpeg\"))");
		})

        it("image-set(): one image and resolution as number", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", 2]));
            expect(s).toEqual( "image-set(\"1.png\" 2x)");
		})

        it("image-set(): one image and resolution as dpi()", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", css.dpi(600)]));
            expect(s).toEqual( "image-set(\"1.png\" 600dpi)");
		})

        it("image-set(): one image and type and resolution", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", "jpeg", 2]));
            expect(s).toEqual( "image-set(\"1.png\" type(\"image/jpeg\") 2x)");
		})

        it("image-set(): image + image", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( "1.png", "2.png"));
            expect(s).toEqual( "image-set(\"1.png\",\"2.png\")");
		})

        it("image-set(): image + [image and type]", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( "1.png", ["2.png", "jpeg"]));
            expect(s).toEqual( "image-set(\"1.png\",\"2.png\" type(\"image/jpeg\"))");
		})

        it("image-set(): [image and type and resolution] + image", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", "jpeg", 2], "2.png"));
            expect(s).toEqual( "image-set(\"1.png\" type(\"image/jpeg\") 2x,\"2.png\")");
		})

        it("image-set(): [image and type and resolution] + [image and type and resolution]", () =>
		{
            let s = css.getStylePropValue( "background", css.imageSet( ["1.png", "jpeg", 2], ["2.png", "jpeg", 1]));
            expect(s).toEqual( "image-set(\"1.png\" type(\"image/jpeg\") 2x,\"2.png\" type(\"image/jpeg\") 1x)");
		})
	})



	describe("cross-fade()", () =>
	{
		it("cross-fade(): old signature", () =>
		{
            let s = css.getStylePropValue( "background", css.crossFade( [css.url("1.png"), css.url("2.png"), 35]));
            expect(s).toEqual( "cross-fade(url(\"1.png\"),url(\"2.png\"),35%)");
		})

		it("cross-fade(): image + image", () =>
		{
            let s = css.getStylePropValue( "background", css.crossFade( css.url("1.png"), css.url("2.png")));
            expect(s).toEqual( "cross-fade(url(\"1.png\"),url(\"2.png\"))");
		})

		it("cross-fade(): image + image + color", () =>
		{
            let s = css.getStylePropValue( "background", css.crossFade( css.url("1.png"), css.url("2.png")).color("dodgerblue"));
            expect(s).toEqual( "cross-fade(url(\"1.png\"),url(\"2.png\"),dodgerblue)");
		})

		it("cross-fade(): [image and percent] + image", () =>
		{
            let s = css.getStylePropValue( "background", css.crossFade( [css.url("1.png"), 35], css.url("2.png")));
            expect(s).toEqual( "cross-fade(url(\"1.png\") 35%,url(\"2.png\"))");
		})

		it("cross-fade(): [image and percent] + [image and percent] + color", () =>
		{
            let s = css.getStylePropValue( "background", css.crossFade( [css.url("1.png"), 35], [css.url("2.png"), 45]).color("dodgerblue"));
            expect(s).toEqual( "cross-fade(url(\"1.png\") 35%,url(\"2.png\") 45%,dodgerblue)");
		})
	})
})



