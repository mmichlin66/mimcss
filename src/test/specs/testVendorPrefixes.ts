import * as css from "../../index"
import {styleset2s} from "../../impl/StyleImpl";


describe("vendor prefixes", () =>
{
    describe("converting to string", () =>
    {
        it("appearance", () =>
        {
            let s = styleset2s( {appearance: "auto"});
            expect(s).toEqual( "{appearance:auto;-webkit-appearance:auto;-moz-appearance:auto;}");
        })

        it("background-clip without 'text'", () =>
        {
            let s = styleset2s( {"backgroundClip": "border-box"});
            expect(s).toEqual( "{background-clip:border-box;}");
        })

        it("background-clip with 'text'", () =>
        {
            let s = styleset2s( {"backgroundClip": "text"});
            expect(s).toEqual( "{background-clip:text;-webkit-background-clip:text;}");
        })

        it("box-decoration-break", () =>
        {
            let s = styleset2s( {boxDecorationBreak: "slice"});
            expect(s).toEqual( "{box-decoration-break:slice;-webkit-box-decoration-break:slice;}");
        })

        it("color-adjust", () =>
        {
            let s = styleset2s( {colorAdjust: "economy"});
            expect(s).toEqual( "{color-adjust:economy;-webkit-print-color-adjust:economy;}");
        })
    })

    describe("converting to StringStyleset", () =>
    {
        it("appearance", () =>
        {
            let ss = css.stylesetToStringStyleset( {appearance: "auto"});
            expect(ss.appearance).toEqual( "auto");
            expect(ss["webkitAppearance"]).toEqual( "auto");
            expect(ss["mozAppearance"]).toEqual( "auto");
        })

        it("background-clip without 'text'", () =>
        {
            let ss = css.stylesetToStringStyleset( {"backgroundClip": "border-box"});
            expect(ss.backgroundClip).toEqual( "border-box");
            expect(ss["webkitBackgroundClip"]).toEqual( undefined);
        })

        it("background-clip with 'text'", () =>
        {
            let ss = css.stylesetToStringStyleset( {"backgroundClip": "text"});
            expect(ss.backgroundClip).toEqual( "text");
            expect(ss["webkitBackgroundClip"]).toEqual( "text");
        })

        it("box-decoration-break", () =>
        {
            let ss = css.stylesetToStringStyleset( {boxDecorationBreak: "slice"});
            expect(ss.boxDecorationBreak).toEqual( "slice");
            expect(ss["webkitBoxDecorationBreak"]).toEqual( "slice");
        })

        it("color-adjust", () =>
        {
            let ss = css.stylesetToStringStyleset( {colorAdjust: "economy"});
            expect(ss.colorAdjust).toEqual( "economy");
            expect(ss["webkitPrintColorAdjust"]).toEqual( "economy");
        })
    })
})



