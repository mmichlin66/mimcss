import * as css from "../../index"


describe("vendor prefixes", () =>
{
    describe("converting to string", () =>
    {
        it("appearance", () =>
        {
            let s = css.stylesetToString( {appearance: "auto"});
            expect(s).toEqual( "-webkit-appearance:auto;-moz-appearance:auto;appearance:auto;");
        })

        it("background-clip without 'text'", () =>
        {
            let s = css.stylesetToString( {"backgroundClip": "border-box"});
            expect(s).toEqual( "background-clip:border-box;");
        })

        it("background-clip with 'text'", () =>
        {
            let s = css.stylesetToString( {"backgroundClip": "text"});
            expect(s).toEqual( "-webkit-background-clip:text;background-clip:text;");
        })

        it("box-decoration-break", () =>
        {
            let s = css.stylesetToString( {boxDecorationBreak: "slice"});
            expect(s).toEqual( "-webkit-box-decoration-break:slice;box-decoration-break:slice;");
        })

        it("color-adjust", () =>
        {
            let s = css.stylesetToString( {colorAdjust: "economy"});
            expect(s).toEqual( "-webkit-print-color-adjust:economy;color-adjust:economy;");
        })

        it("size: stretch", () =>
        {
            let s = css.stylesetToString( {width: "stretch"});
            expect(s).toEqual( "width:-webkit-fill-available;width:stretch;");
        })

        it("cross-fade old signature", () =>
        {
            let s = css.stylesetToString( {background: css.crossFade(
                [css.linearGradient("red", "blue"), css.url("1.png"), 36]
            )});
            expect(s).toEqual(
                "background:-webkit-cross-fade(linear-gradient(red,blue),url(\"1.png\"),36%);" +
                "background:cross-fade(linear-gradient(red,blue),url(\"1.png\"),36%);"
            );
        })
    })

    describe("converting to StringStyleset", () =>
    {
        it("appearance", () =>
        {
            let ss = css.stylesetToStringStyleset( {appearance: "auto"});
            expect(ss.appearance).toEqual( "auto");
            expect(ss.webkitAppearance).toEqual( "auto");
            expect(ss.mozAppearance).toEqual( "auto");
        })

        it("background-clip without 'text'", () =>
        {
            let ss = css.stylesetToStringStyleset( {"backgroundClip": "border-box"});
            expect(ss.backgroundClip).toEqual( "border-box");
            expect(ss["webkitBackgroundClip"]).toBeUndefined();
        })

        it("background-clip with 'text'", () =>
        {
            let ss = css.stylesetToStringStyleset( {"backgroundClip": "text"});
            expect(ss.backgroundClip).toEqual( "text");
            expect(ss.webkitBackgroundClip).toEqual( "text");
        })

        it("box-decoration-break", () =>
        {
            let ss = css.stylesetToStringStyleset( {boxDecorationBreak: "slice"});
            expect(ss.boxDecorationBreak).toEqual( "slice");
            expect(ss.webkitBoxDecorationBreak).toEqual( "slice");
        })

        it("color-adjust", () =>
        {
            let ss = css.stylesetToStringStyleset( {colorAdjust: "economy"});
            expect(ss.colorAdjust).toEqual( "economy");
            expect(ss.webkitPrintColorAdjust).toEqual( "economy");
        })

        it("size: stretch", () =>
        {
            let ss = css.stylesetToStringStyleset( {width: "stretch"});
            expect(ss.width).toEqual( "stretch");
        })
    })
})



