import {ExtendedFontFace, FontSrc, IFontFace} from "../api/FontTypes"
import {IMediaFeatureset, MediaQuery, MediaStatement, SupportsQuery, SupportsStatement} from "../api/MediaTypes";
import {styleProp2s} from "./StyleImpl";
import {camelToDash, v2s, a2s, WKF, V2SOptions, dashToCamel, wkf, propSet2s} from "./Utils";
import {ExtendedCounterStyleset, ICounterStyleset} from "../api/CounterTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @media rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given media query object to the CSS media query string
 */
export const media2s = (statement: MediaStatement): string =>
    v2s( statement, {
        any: mediaQuery2s,
        sep: ","
    })

/**
 * Converts the given media query object to the CSS media query string
 */
const mediaQuery2s = (query: MediaQuery): string =>
    propSet2s( query, mediaFeatureInfos, {
        separator: " and ",
        propFunc: mediaFeature2s,
    });

/**
 * Converts the given media feature to the CSS media query string
 */
const mediaFeature2s = (dashName: string, camelName: string, val: any, options: V2SOptions): string =>
{
    if (val == null)
        return "";

    // if defaultValue is defined and the property value is equal to it, no value should be returned.
    let defaultValue = mediaFeatureDefaultValues.get(camelName);
    if (defaultValue !== undefined && val === defaultValue)
        return dashName;

    let isRange = rangeMediaFeatures.has( camelName);
    if (isRange && Array.isArray( val))
    {
        return `(${"min-" + dashName}:${v2s( val[0], options)}) and (${"max-" + dashName}:${v2s( val[1], options)})`;

        // this syntax is not widely supported yet
        // return `${s1} <= ${dashName} <= ${s2}`;
    }
    else
        return `(${dashName}:${v2s( val, options)})`;
}



const mediaFeatureInfos: { [K in keyof IMediaFeatureset]?: V2SOptions } =
{
    height: WKF.Length,
    minHeight: WKF.Length,
    maxHeight: WKF.Length,
    resolution: WKF.Resolution,
    minResolution: WKF.Resolution,
    maxResolution: WKF.Resolution,
    width: WKF.Length,
    minWidth: WKF.Length,
    maxWidth: WKF.Length,
};

// Set of media features that allow range of values
const rangeMediaFeatures = new Set<string>(["aspectRatio", "color", "colorIndex", "height", "monochrome", "resolution", "width"]);

// Map of media features to default values
const mediaFeatureDefaultValues = new Map<string,any>([
    ["color", 0],
    ["colorIndex", 0],
    ["monochrome", 0]
]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @supports rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given supports statement to its string representation */
export const supports2s = (statement: SupportsStatement): string =>
    v2s( statement, {
        any: supportsQuery2s,
        sep: " or "
    });

/** Converts the given supports query to its string representation */
const supportsQuery2s = (query: SupportsQuery): string =>
    v2s( query, {
        obj: (v: Exclude<SupportsQuery,string>) => {
            let propNames = Object.keys( v);
            if (propNames.length === 0)
                return "";

            return `(${propNames.map( (propName) =>
                `${camelToDash(propName)}:${styleProp2s( propName, query[propName])}`).join( ") and (")})`;
        }
    });



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @font-face rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const fontSingleSrc2s = (val: FontSrc): string =>
    v2s( val, {
        obj: [
            ["local", v => `local(${v})`],
            ["url", v => `url(${v})`],
            ["format", {
                any: v => `format(\"${v}\")`,
                sep: ","
            }]
        ]
    });

/**
 * Converts the given font face object to the CSS style string.
 */
export const fontFace2s = (fontface: ExtendedFontFace): string => propSet2s( fontface, fontFacePropertyInfos);

wkf[WKF.FontStyle] = v => v2s( v, {
    num: v => `oblique ${wkf[WKF.Angle](v)}`,
    arr: v => `oblique ${a2s( v, WKF.Angle)}`
});



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const fontFacePropertyInfos: { [K in keyof IFontFace]?: V2SOptions } =
{
    ascentOverride: WKF.Percent,
    descentOverride: WKF.Percent,
    fontStretch: { any: WKF.Percent },
    fontStyle: WKF.FontStyle,
    fontWeight: { any: WKF.Number },
    lineGapOverride: WKF.Percent,
    src: {
        any: fontSingleSrc2s,
        sep: ","
    },
    sizeAdjust: WKF.Percent,
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @counter-style rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given counter styleset property to the CSS style string. Property name can be in
 * either dash or camel form.
 */
 const counterStylesetProp2s = (propName: string, propVal: any, includeName?: boolean): string =>
 {
     if (!propName)
         return "";

     // convert the value to string based on the information object for the property (if defined)
     let stringValue = v2s( propVal, counterStylePropertyInfos[dashToCamel(propName)]);

     // if the resulting string is empty and the name should be included, then we return
     // "name:; otherwise we will return an empty string.
     if (!stringValue && includeName)
         stringValue = "";

     return includeName ? `${camelToDash( propName)}:${stringValue}` : stringValue;
 }

/**
 * Converts the given counter styleset object to the CSS media query string
 */
 export const counterStyleset2s = (counterStyleset: ExtendedCounterStyleset): string =>
 {
    if (!counterStyleset)
        return "";

    let s = "";
	for( let name in counterStyleset)
        s += counterStylesetProp2s( name, counterStyleset[name], true) + ";";

    return s;
 }





 /**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const counterStylePropertyInfos: { [K in keyof ICounterStyleset]?: V2SOptions } =
{
    system: {
        num: v => "fixed " + v,
        arr: v => "extends " + v2s(v[0])
    },
    negative: {
        any: WKF.Quoted
    },
    prefix: WKF.Quoted,
    suffix: WKF.Quoted,
    range: {
        arr: v => v.length ? Array.isArray(v[0]) ? a2s( v, undefined, ",") : a2s(v) : ""
    },
    pad: {
        item: WKF.Quoted
    },
    symbols: {
        item: WKF.Quoted
    },
    additiveSymbols: {
        arr: v => v.length ? Array.isArray(v[0]) ? a2s( v, {item: WKF.Quoted}, ",") : a2s( v, WKF.Quoted) : ""
    },
}



