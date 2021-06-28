import * as FontFaceTypes from "../api/FontFaceAPI"
import {camelToDash, v2s, PercentMath, AngleMath, a2s, obj2str, NumberMath} from "./UtilFuncs";



/**
 * Converts the given font face definition object to the CSS string
 */
export function fontFaceToString( fontface: FontFaceTypes.IFontFace): string | null
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



function fontStretchToString( val: FontFaceTypes.FontStretch_FontFaceType): string
{
    return v2s( val, {
        fromNumber: PercentMath.s2s,
        arrItemFunc: PercentMath.s2s
    });
}



function fontStyleToString( val: FontFaceTypes.FontStyle_FontFaceType): string
{
    return v2s( val, {
        fromNumber: v => `oblique ${AngleMath.s2s(v)}`,
        fromArray: v => `oblique ${a2s( v, AngleMath.s2s)}`
    });
}



function fontWeightToString( val: FontFaceTypes.FontWeight_FontFaceType): string
{
    return v2s( val, {
        fromAny: NumberMath.s2s
    });
}



function fontSrcToString( val: FontFaceTypes.FontSrc_FontFaceType): string
{
    return v2s( val, {
        fromAny: fontSingleSrcToString,
        arrSep: ","
    });
}



function fontSingleSrcToString( val: FontFaceTypes.FontSrc_Single): string
{
    return obj2str( val, [
        ["local", v => `local(${v})`],
        ["url", v => `url(${v})`],
        ["format", v => `format(${fontFormatToString(v)})`]
    ]);
}



function fontFormatToString( val: FontFaceTypes.FontSrc_Single): string
{
    return v2s( val, {
        fromString: v => `\"${v}\"`,
        arrSep: ","
    });
}



