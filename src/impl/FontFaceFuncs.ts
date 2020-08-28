import * as FontFaceTypes from "../api/FontFaceAPI"
import {obj2str} from "./StyleFuncs";
import {camelToDash, val2str, PercentMath, AngleMath, arr2str, NumberMath} from "./UtilFuncs";



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
    return val2str( val, {
        fromNumber: PercentMath.styleToString,
        arrItemFunc: PercentMath.styleToString
    });
}



function fontStyleToString( val: FontFaceTypes.FontStyle_FontFaceType): string
{
    return val2str( val, {
        fromNumber: v => `oblique ${AngleMath.styleToString(v)}`,
        fromArray: v => `oblique ${arr2str( v, AngleMath.styleToString)}`
    });
}



function fontWeightToString( val: FontFaceTypes.FontWeight_FontFaceType): string
{
    return val2str( val, {
        fromAny: NumberMath.styleToString
    });
}



function fontSrcToString( val: FontFaceTypes.FontSrc_FontFaceType): string
{
    return val2str( val, {
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
    return val2str( val, {
        fromString: v => `\"${v}\"`,
        arrSep: ","
    });
}



