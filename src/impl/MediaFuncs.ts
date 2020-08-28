﻿import * as MediaTypes from "../api/MediaAPI"
import {val2str, camelToDash, arr2str} from "./UtilFuncs";



function aspectRatioToString( val: MediaTypes.AspectRatioFeatureType): string
{
    return typeof val === "string" ? val : val[0] + "/" + val[1];
}



function lengthFeatureToString( val: MediaTypes.LengthFeatureType): string
{
    return typeof val === "string" ? val : val + "px";
}



function resolutionFeatureToString( val: MediaTypes.ResolutionFeatureType): string
{
    return typeof val === "string" ? val : val + "dpi";
}



/** Type of a function that converts the property-specific type to CSS string */
type convertFuncType<K extends keyof MediaTypes.MediaFeatureset = any> = (val: MediaTypes.MediaFeatureset[K]) => string;



/**
 * The MediaFeatureInfo represents information that we keep for style properties
 */
type MediaFeatureInfo<K extends keyof MediaTypes.MediaFeatureset = any> = convertFuncType<K> | boolean |
    {
        /** Function that converts from the property-specific type to CSS string */
        convert?: convertFuncType<K>;

        /**
         * If defined, indicates the value, which we will not put into CSS string. This is needed for
         * media features that can be specified without the value, e.g. color or color-index.
         */
        defaultValue?: MediaTypes.MediaFeatureset[K];

        /**
         * Flag indicating whether the feature is a "range" feature; that is, can be used in an
         * expression (a <= feature <= b).
         */
        isRange?: boolean;
    }



/**
 * Converts the given media query object to the CSS media query string
 */
export function mediaQueryToString( query: string | MediaTypes.MediaQuery): string
{
    return val2str( query, {
        fromAny: singleMediaQueryToString,
        arrSep: ","
    })
}



/**
 * Converts the given media query object to the CSS media query string
 */
export function singleMediaQueryToString( query: MediaTypes.SingleMediaQuery): string
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
export function mediaFeatureToString( featureName: string, propVal: any, valueOnly?: boolean): string | null
{
    if (!featureName || propVal == null)
        return null;

    // find information object
    let info: MediaFeatureInfo = mediaFeatures[featureName];

    let realFeatureName = camelToDash( featureName);

    // if defaultValue is defined and the property value is equal to it, no value should be returned.
    let defaultValue = typeof info === "object" ? info.defaultValue : undefined;
    if (defaultValue !== undefined && propVal === defaultValue)
        return valueOnly ? "" : realFeatureName;

    let convert = typeof info === "function" ? info : typeof info === "object" ? info.convert : undefined;
    let isRange = typeof info === "boolean" ? info : typeof info === "object" ? info.isRange : undefined;
    if (isRange && !valueOnly && Array.isArray( propVal) && propVal.length === 2)
    {
        let s1 = mediaFeatureSingleValueToString( propVal[0], convert);
        let s2 = mediaFeatureSingleValueToString( propVal[1], convert);
        return `${s1} <= ${realFeatureName} <= ${s2}`;
    }
    else
    {
        let s = mediaFeatureSingleValueToString( propVal, convert);
        return valueOnly ? s : realFeatureName + ":" + s;
    }
}



function mediaFeatureSingleValueToString( propVal: any, convert?: convertFuncType): string
{
    if (propVal == null)
        return "";

    if (convert)
        return convert( propVal);
    else if (typeof propVal === "string")
        return propVal;
    else if (Array.isArray( propVal))
        return arr2str( propVal);
    else
        return propVal.toString();
}



let mediaFeatures: { [K in keyof MediaTypes.MediaFeatureset]?: MediaFeatureInfo<K> } =
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



