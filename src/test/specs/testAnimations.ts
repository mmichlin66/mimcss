import * as css from "../../index"


describe("animations:", () =>
{
	describe("animation:", () =>
	{
		it("animation: single object", () =>
		{
            let s = css.getStylePropValue( "animation", {
                duration: 3000,
                func: "ease-in",
                delay: 10,
                count: 2,
                direction: "reverse",
                mode: "both",
                state: "paused",
                name: "name"
            });
            expect(s).toEqual( "3000ms ease-in 10ms 2 reverse both paused name");
		})

		it("animation: two objects", () =>
		{
            let s = css.getStylePropValue( "animation", [
                {
                    duration: 3000,
                    func: "ease-in",
                    delay: 10,
                    count: 2,
                    direction: "reverse",
                    mode: "both",
                    state: "paused",
                    name: "name"
                },
                {
                    duration: 2.5,
                    func: "linear",
                    count: 2,
                    mode: "both",
                    state: "running",
                    name: "name2"
                }
            ]);
            expect(s).toEqual( "3000ms ease-in 10ms 2 reverse both paused name,2.5s linear 2 both running name2");
		})

		it("animation: object and string", () =>
		{
            let s = css.getStylePropValue( "animation", [
                {
                    duration: 3000,
                    func: "ease-in",
                    delay: 10,
                    count: 2,
                    direction: "reverse",
                    mode: "both",
                    state: "paused",
                    name: "name"
                },
                "2.5s linear 2 both running name2"
            ]);
            expect(s).toEqual( "3000ms ease-in 10ms 2 reverse both paused name,2.5s linear 2 both running name2");
		})
	})

	describe("timing function", () =>
	{
		it("animation-timing-function: steps(4)", () =>
		{
            let s = css.getStylePropValue( "animationTimingFunction", css.steps(4));
            expect(s).toEqual( "steps(4)");
		})

		it("animation-timing-function: steps(4, jump-start)", () =>
		{
            let s = css.getStylePropValue( "animationTimingFunction", css.steps(4, "jump-start"));
            expect(s).toEqual( "steps(4,jump-start)");
		})

		it("animation-timing-function: cubic-bezier()", () =>
		{
            let s = css.getStylePropValue( "animationTimingFunction", css.cubicBezier(0.1, 0.7, 1, 0.1));
            expect(s).toEqual( "cubic-bezier(0.1,0.7,1,0.1)");
		})

		it("animation-timing-function: cubic-bezier(), ease-in-out, steps()", () =>
		{
            let s = css.getStylePropValue( "animationTimingFunction", [
                css.cubicBezier(0.1, 0.7, 1, 0.1),
                "ease-in-out",
                css.steps(4, "end")
            ]);
            expect(s).toEqual( "cubic-bezier(0.1,0.7,1,0.1),ease-in-out,steps(4,end)");
		})
	})
})



