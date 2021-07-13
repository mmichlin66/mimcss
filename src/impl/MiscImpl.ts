import {CssAspectRatio, CssLength, CssResolution} from "../api/NumericTypes";
import {ExtendedFontFace, FontSrc_FontFaceType, FontSrc, IBaseFontFace} from "../api/FontTypes"
import {ExtendedSingleMediaQuery, IMediaFeatureset, MediaQuery, SingleSupportsQuery, SupportsQuery} from "../api/MediaTypes";
import {ExtendedBaseStyleset} from "../api/StyleTypes";
import {styleProp2s} from "./StyleImpl";
import {camelToDash, v2s, a2s, WKF, V2SOptions, dashToCamel, wkf} from "./Utils";
import { ExtendedCounterStyleset, IBaseCounterStyleset } from "../api/CounterTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @media rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given media query object to the CSS media query string
 */
export function mediaQuery2s( query: MediaQuery): string
{
    return v2s( query, {
        fromAny: singleMediaQueryToString,
        arrSep: ","
    })
}



function aspectRatioToString( val: CssAspectRatio): string
{
    return v2s( val, { arrSep: "/" })
}



function lengthFeatureToString( val: CssLength): string
{
    return v2s( val, {
        fromNumber: WKF.Length
    });
}



function resolutionFeatureToString( val: CssResolution): string
{
    return v2s( val, {
        fromNumber: WKF.Resolution
    });
}



/** Type of a function that converts the property-specific type to CSS string */
type convertFuncType<K extends keyof IMediaFeatureset = any> = (val: IMediaFeatureset[K]) => string;



/**
 * The MediaFeatureInfo represents information that we keep for style properties
 */
type MediaFeatureInfo<K extends keyof IMediaFeatureset = any> = convertFuncType<K> | boolean |
    {
        /** Function that converts from the property-specific type to CSS string */
        convert?: convertFuncType<K>;

        /**
         * If defined, indicates the value, which we will not put into CSS string. This is needed for
         * media features that can be specified without the value, e.g. color or color-index.
         */
        defaultValue?: IMediaFeatureset[K];

        /**
         * Flag indicating whether the feature is a "range" feature; that is, can be used in an
         * expression (a <= feature <= b).
         */
        isRange?: boolean;
    }



/**
 * Converts the given media query object to the CSS media query string
 */
function singleMediaQueryToString( query: ExtendedSingleMediaQuery): string
{
    if (!query)
        return "";
    else if (typeof query === "string")
        return query;

    let mediaType = query.$mediaType;
    let only = query.$only;
    let negate = query.$negate;

    let items: string[] = [];
    if (mediaType)
        items.push( (only ? "only " : "") + mediaType);

    for( let propName in query)
    {
        if (propName.startsWith("$"))
            continue;

        if (query[propName])
            items.push( mediaFeatureToString( propName, query[propName]));
    }

    return `${negate ? "not " : ""}${items.join(" and ")}`;
}



/**
 * Converts the given media feature to the CSS media query string
 */
function mediaFeatureToString( featureName: string, val: any, valueOnly?: boolean): string
{
    if (!featureName || val == null)
        return "()";

    // find information object
    let info: MediaFeatureInfo = mediaFeatures[featureName];

    let realFeatureName = camelToDash( featureName);

    // if defaultValue is defined and the property value is equal to it, no value should be returned.
    let defaultValue = typeof info === "object" ? info.defaultValue : undefined;
    if (defaultValue !== undefined && val === defaultValue)
        return valueOnly ? "" : realFeatureName;

    let convert = typeof info === "function" ? info : typeof info === "object" ? info.convert : undefined;
    let isRange = typeof info === "boolean" ? info : typeof info === "object" ? info.isRange : undefined;
    if (isRange && !valueOnly && Array.isArray( val) && val.length === 2)
    {
        let s1 = mediaFeatureSingleValueToString( val[0], convert);
        let s2 = mediaFeatureSingleValueToString( val[1], convert);

        return `(${"min-" + realFeatureName}:${s1}) and (${"max-" + realFeatureName}:${s2})`;

        // this syntax is not widely supported yet
        // return `${s1} <= ${realFeatureName} <= ${s2}`;
    }
    else
    {
        let s = mediaFeatureSingleValueToString( val, convert);
        return valueOnly ? s : `(${realFeatureName}:${s})`;
    }
}



function mediaFeatureSingleValueToString( val: any, convert?: convertFuncType): string
{
    return convert ? convert( val) : v2s( val);
}



let mediaFeatures: { [K in keyof IMediaFeatureset]?: MediaFeatureInfo<K> } =
{
    aspectRatio: { convert: aspectRatioToString, isRange: true },
    minAspectRatio: aspectRatioToString,
    maxAspectRatio: aspectRatioToString,
    color: { defaultValue: 0, isRange: true },
    colorIndex: { defaultValue: 0, isRange: true },
    height: { convert: lengthFeatureToString, isRange: true },
    minHeight: lengthFeatureToString,
    maxHeight: lengthFeatureToString,
    monochrome: { defaultValue: 0, isRange: true },
    resolution: { convert: resolutionFeatureToString, isRange: true },
    minResolution: resolutionFeatureToString,
    maxResolution: resolutionFeatureToString,
    width: { convert: lengthFeatureToString, isRange: true },
    minWidth: lengthFeatureToString,
    maxWidth: lengthFeatureToString,
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @supports rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given supports query to its string representation */
export function supportsQuery2s( query: SupportsQuery): string
{
    return v2s( query, {
        fromAny: singleSupportsQueryToString,
        arrSep: " or "
    });
}



/** Converts the given supports query to its string representation */
function singleSupportsQueryToString( query: SingleSupportsQuery): string
{
    return v2s( query, {
        fromObj: (v: ExtendedBaseStyleset & { $negate?: boolean; }) => {
            let propNames = Object.keys( v).filter( (propName) => propName != "$negate");
            if (propNames.length === 0)
                return "";

            let not = v.$negate ? "not" : "";
            return  `${not} (${propNames.map( (propName) =>
                styleProp2s( propName as keyof ExtendedBaseStyleset, query[propName], true)).join( ") and (")})`;
        }
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @font-face rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given font face object to the CSS style string.
 */
export function fontFace2s( fontface: ExtendedFontFace): string
{
    if (!fontface)
        return "";

    let s = "";
	for( let name in fontface)
        s += fontFacePropToString( name, fontface[name], true) + ";";

    return s;
}



/**
 * Converts the given font face property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
function fontFacePropToString( propName: string, propVal: any, includeName?: boolean): string
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS @counter-style rule.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given counter styleset object to the CSS media query string
 */
 export function counterStyleset2s( counterStyleset: ExtendedCounterStyleset): string
 {
    if (!counterStyleset)
        return "";

    let s = "";
	for( let name in counterStyleset)
        s += counterStylesetProp2s( name, counterStyleset[name], true) + ";";

    return s;
 }



/**
 * Converts the given counter styleset property to the CSS style string. Property name can be in
 * either dash or camel form.
 */
 function counterStylesetProp2s( propName: string, propVal: any, includeName?: boolean): string
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
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const counterStylePropertyInfos: { [K in keyof IBaseCounterStyleset]?: V2SOptions } =
{
    system: {
        fromNumber: v => "fixed " + v,
        fromArray: v => "extends " + v2s(v[0])
    },
    negative: {
        fromAny: WKF.Quoted
    },
    prefix: WKF.Quoted,
    suffix: WKF.Quoted,
    range: WKF.OneOrManyWithComma,
    pad: {
        arrItemFunc: WKF.Quoted
    },
    symbols: {
        arrItemFunc: WKF.Quoted
    },
    additiveSymbols: {
        arrItemFunc: {
            arrItemFunc: WKF.Quoted
        },
        arrSep: ","
    },
}



