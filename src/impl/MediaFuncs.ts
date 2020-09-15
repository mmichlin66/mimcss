﻿import {IMediaFeatureset, MediaQuery, ExtendedSingleMediaQuery} from "../api/MediaAPI";
import {CssAspectRatio, CssResolution, CssLength} from "../api/BasicTypes";
import {val2str, camelToDash, ResolutionMath, LengthMath} from "./UtilFuncs";



function aspectRatioToString( val: CssAspectRatio): string
{
    return val2str( val, { arrSep: "/" })
}



function lengthFeatureToString( val: CssLength): string
{
    return val2str( val, {
        fromNumber: LengthMath.styleToString
    });
}



function resolutionFeatureToString( val: CssResolution): string
{
    return val2str( val, {
        fromNumber: ResolutionMath.styleToString
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
export function mediaQueryToString( query: MediaQuery): string
{
    return val2str( query, {
        fromAny: singleMediaQueryToString,
        arrSep: ","
    })
}



/**
 * Converts the given media query object to the CSS media query string
 */
function singleMediaQueryToString( query: ExtendedSingleMediaQuery): string
{
    if (!query)
        return "";

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
            items.push( `(${mediaFeatureToString( propName, query[propName])})`);
    }

    return `${negate ? "not " : ""}${items.join(" and ")}`;
}



/**
 * Converts the given media feature to the CSS media query string
 */
function mediaFeatureToString( featureName: string, val: any, valueOnly?: boolean): string | null
{
    if (!featureName || val == null)
        return null;

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
        return `${s1} <= ${realFeatureName} <= ${s2}`;
    }
    else
    {
        let s = mediaFeatureSingleValueToString( val, convert);
        return valueOnly ? s : realFeatureName + ":" + s;
    }
}



function mediaFeatureSingleValueToString( val: any, convert?: convertFuncType): string
{
    return convert ? convert( val) : val2str( val);
}



let mediaFeatures: { [K in keyof IMediaFeatureset]?: MediaFeatureInfo<K> } =
{
    aspectRatio: aspectRatioToString,
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



