import {
    FontSrc_FontFaceType, FontSrc_Single, FontStretch_FontFaceType, FontStyle_FontFaceType,
    FontWeight_FontFaceType, IFontFace
} from "../api/FontFaceTypes"
import {camelToDash, v2s, AngleMath, a2s, WellKnownFunc} from "./CoreFuncs";



/**
 * Converts the given font face definition object to the CSS string
 */
export function fontFaceToString( fontface: IFontFace): string | null
{
    if (!fontface || !fontface.fontFamily)
        return null;

    let s = "{";

    for( let propName in fontface)
    {
        s += `${camelToDash( propName)}:`;
        let propVal = fontface[propName];
        if (propName === "fontStretch")
            s += fontStretchToString( propVal);
        else if (propName === "fontStyle")
            s += fontStyleToString( propVal);
        else if (propName === "fontWeight")
            s += fontWeightToString( propVal);
        else if (propName === "src")
            s += fontSrcToString( propVal);
        else
            s += propVal;

        s += ";"
    }

    return s + "}";
}



function fontStretchToString( val: FontStretch_FontFaceType): string
{
    return v2s( val, { fromAny: WellKnownFunc.Percent });
}



function fontStyleToString( val: FontStyle_FontFaceType): string
{
    return v2s( val, {
        fromNumber: v => `oblique ${AngleMath.s2s(v)}`,
        fromArray: v => `oblique ${a2s( v, AngleMath.s2s)}`
    });
}



function fontWeightToString( val: FontWeight_FontFaceType): string
{
    return v2s( val, { fromAny: WellKnownFunc.Number });
}



function fontSrcToString( val: FontSrc_FontFaceType): string
{
    return v2s( val, {
        fromAny: fontSingleSrcToString,
        arrSep: ","
    });
}



function fontSingleSrcToString( val: FontSrc_Single): string
{
    return v2s( val, {
        fromProps: [
            ["local", v => `local(${v})`],
            ["url", v => `url(${v})`],
            ["format", v => `format(${fontFormatToString(v)})`]
        ]
    });
}



function fontFormatToString( val: FontSrc_Single): string
{
    return v2s( val, {
        fromString: v => `\"${v}\"`,
        arrSep: ","
    });
}



