import {
    ExtendedFontFace, FontSrc_FontFaceType, FontSrc, IBaseFontFace
} from "../api/FontTypes"
import {camelToDash, v2s, a2s, WKF, V2SOptions, dashToCamel, wkf} from "./Utils";



wkf[WKF.FontStyle] = v => v2s( v, {
    fromNumber: v => `oblique ${wkf[WKF.Angle](v)}`,
    fromArray: v => `oblique ${a2s( v, WKF.Angle)}`
});



function fontSrcToString( val: FontSrc_FontFaceType): string
{
    return v2s( val, {
        fromAny: fontSingleSrcToString,
        arrSep: ","
    });
}



function fontSingleSrcToString( val: FontSrc): string
{
    return v2s( val, {
        fromProps: [
            ["local", v => `local(${v})`],
            ["url", v => `url(${v})`],
            ["format", {
                fromAny: v => `format(\"${v}\")`,
                arrSep: ","
            }]
        ]
    });
}



/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
export function fontFace2s( fontface: ExtendedFontFace): string
{
    if (!fontface)
        return "";

    let s = "";
	for( let name in fontface)
        s += fontFaceProp2s( name, fontface[name], true) + ";";

    return s;
}



/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
function fontFaceProp2s( propName: string, propVal: any, includeName?: boolean): string
{
    if (!propName)
        return "";

    // convert the value to string based on the information object for the property (if defined)
    let stringValue = v2s( propVal, fontFacePropertyInfos[dashToCamel(propName)]);

    // if the resulting string is empty and the name should be included, then we return
    // "name: initial"; otherwise we will return an empty string.
    if (!stringValue && includeName)
        stringValue = "initial";

    return includeName ? `${camelToDash( propName)}:${stringValue}` : stringValue;
}



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const fontFacePropertyInfos: { [K in keyof IBaseFontFace]?: V2SOptions } =
{
    ascentOverride: WKF.Percent,
    descentOverride: WKF.Percent,
    fontStretch: { fromAny: WKF.Percent },
    fontStyle: WKF.FontStyle,
    fontWeight: { fromAny: WKF.Number },
    lineGapOverride: WKF.Percent,
    src: fontSrcToString,
    sizeAdjust: WKF.Percent,
}



