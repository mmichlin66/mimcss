import * as css from "../../index"


describe("backgrounds:", () =>
{
	describe("background:", () =>
	{
		it("background: color", () =>
		{
            let s = css.getStylePropValue( "background", "green");
            expect(s).toEqual( "green");
		})

		it("background: image", () =>
		{
            let s = css.getStylePropValue( "background", css.url("1.png"));
            expect(s).toEqual( "url(\"1.png\")");
		})

		it("background: single object all properties", () =>
		{
            let s = css.getStylePropValue( "background", {
                color: "green",
                image: css.url("1.png"),
                position: [0.5, 20],
                size: "contain",
                repeat: "repeat-x",
                attachment: "fixed",
                origin: "border-box",
                clip: "content-box",
            });
            expect(s).toEqual( "green url(\"1.png\") 0.5em 20px / contain repeat-x fixed border-box content-box");
		})

		it("background: single object some properties", () =>
		{
            let s = css.getStylePropValue( "background", {
                image: css.url("1.png"),
                position: [0.5, 20],
                repeat: "repeat-x",
                origin: "border-box",
            });
            expect(s).toEqual( "url(\"1.png\") 0.5em 20px repeat-x border-box");
		})

		it("background: object, string, image, color", () =>
		{
            let s = css.getStylePropValue( "background", [
                {
                    image: css.url("1.png"),
                    position: [0.5, 20],
                    repeat: "repeat-x",
                    origin: "border-box",
                },
                "url(\"test.jpg\") repeat-y",
                css.linearGradient("red","yellow"),
                0xaa0033
            ]);
            expect(s).toEqual( "url(\"1.png\") 0.5em 20px repeat-x border-box,url(\"test.jpg\") repeat-y,linear-gradient(red,yellow),#aa0033");
		})

	})

	describe("timing function", () =>
	{
		it("animation-timing-function: steps(4)", () =>
		{
            let s = css.getStylePropValue( "animationTimingFunction", css.steps(4));
            expect(s).toEqual( "steps(4)");
		})
	})
})



