import * as FontFaceTypes from "./FontFaceTypes"
import * as UtilFuncs from "./UtilFuncs"



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
        s += `${UtilFuncs.camelToDash( propName)}:`;
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
    return UtilFuncs.valueToString( val, {
        fromNumber: UtilFuncs.CssPercentMath.styleToString,
        arrayItemFunc: UtilFuncs.CssPercentMath.styleToString
    });
}



function fontStyleToString( val: FontFaceTypes.FontStyle_FontFaceType): string
{
    return UtilFuncs.valueToString( val, {
        fromNumber: v => `oblique ${UtilFuncs.CssAngleMath.styleToString(v)}`,
        fromArray: v => `oblique ${UtilFuncs.arrayToString( v, UtilFuncs.CssAngleMath.styleToString)}`
    });
}



function fontWeightToString( val: FontFaceTypes.FontWeight_FontFaceType): string
{
    return UtilFuncs.valueToString( val, {
        fromAny: UtilFuncs.CssNumberMath.styleToString
    });
}



function fontSrcToString( val: FontFaceTypes.FontSrc_FontFaceType): string
{
    return UtilFuncs.valueToString( val, {
        fromAny: fontSingleSrcToString,
        arraySeparator: ","
    });
}



function fontSingleSrcToString( val: FontFaceTypes.FontSrc_Single): string
{
    return UtilFuncs.objectToString( val, [
        ["local", v => `local(${v})`],
        ["url", v => `url(${v})`],
        ["format", v => `format(${fontFormatToString(v)})`]
    ]);
}



function fontFormatToString( val: FontFaceTypes.FontSrc_Single): string
{
    return UtilFuncs.valueToString( val, {
        fromString: v => `\"${v}\"`,
        arraySeparator: ","
    });
}



