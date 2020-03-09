import * as UtilFuncs from "./UtilFuncs"
import * as MediaTypes from "./MediaTypes"



function aspectRatioToCssString( val: MediaTypes.AspectRatioFetaureType): string
{
    return typeof val === "string" ? val : val[0] + "/" + val[1];
}



function lengthFetaureToCssString( val: MediaTypes.LengthFetaureType): string
{
    return typeof val === "string" ? val : val + "px";
}



function resolutionFetaureToCssString( val: MediaTypes.ResolutionFetaureType): string
{
    return typeof val === "string" ? val : val + "dpi";
}



/** Type of a function that converts the property-specific type to CSS string */
type convertFuncType<K extends keyof MediaTypes.MediaFeatureset> = (val: MediaTypes.MediaFeatureset[K]) => string;



/**
 * The MediaFeatureInfo represents information that we keep for style properties
 */
type MediaFeatureInfo<K extends keyof MediaTypes.MediaFeatureset = any> = convertFuncType<K> | string |
    {
        /** Function that converts from the property-specific type to CSS string */
        convert?: convertFuncType<K>;

        /** If defined, indicates the property that our property should be treated as */
        treatAs?: string;

        /**
         * If defined, indicates the value, which we will not put into CSS string. This is needed for
         * media features that can be specified without the value, e.g. color or color-index.
         */
        defaultValue?: MediaTypes.MediaFeatureset[K];

    }



/**
 * Converts the given media query object to the CSS media query string
 */
export function mediaQueryToCssString( query: MediaTypes.MediaQuery): string | null
{
    if (!query)
        return null;
    else if (Array.isArray(query))
        return query.map( (singleQuery) => singleMediaQueryToCssString( singleQuery)).join(", ");
    else
        return singleMediaQueryToCssString( query);
}



/**
 * Converts the given media query object to the CSS media query string
 */
export function singleMediaQueryToCssString( query: MediaTypes.SingleMediaQuery): string | null
{
    if (!query)
        return null;

    let mediaType = query.$mediaType;
    let only = mediaType && query.$only;
    let negate = query.$negate;

    let items: string[] = [];
    if (mediaType)
        items.push( only ? "only " : "" + mediaType);

    for( let propName in query)
    {
        if (propName.startsWith("$"))
            continue;

        if (query[propName])
            items.push( `(${mediaFeatureToCssString( propName, query[propName])})`);
    }

    return `${negate ? "not " : ""}${items.join(" and ")}`;
}



/**
 * Converts the given media feature to the CSS media query string
 */
export function mediaFeatureToCssString( featureName: string, propVal: any, valueOnly?: boolean): string | null
{
    if (!featureName || propVal == null)
        return null;

    // find information object and follow "treatAs" while exists
    let info: MediaFeatureInfo = mediaFeatures[featureName];
    while( info)
    {
        if (typeof info === "string")
            info = mediaFeatures[info];
        else if (typeof info === "object")
            info = mediaFeatures[info.treatAs];
        else
            break;
    }

    let realFeatureName = UtilFuncs.camelToDash( featureName);

    // if defaultValue is defined and the property value is equal to it, no value should be returned.
    let defaultValue = typeof info === "object" ? info.defaultValue : undefined;
    if (defaultValue !== undefined && propVal === defaultValue)
        return valueOnly ? "" : realFeatureName;

    let s: string;
    let convert = typeof info === "function" ? info : typeof info === "object" ? info.convert : undefined;
    if (convert)
        s = convert( propVal);
    else if (typeof propVal === "string")
        s = propVal;
    else if (Array.isArray( propVal))
        s = UtilFuncs.arrayToCssString( propVal, item => item == null ? "" : item.toString());
    else
        s = propVal.toString();

    return valueOnly ? s : realFeatureName + ":" + s;
}



let mediaFeatures: { [K in keyof MediaTypes.MediaFeatureset]?: MediaFeatureInfo<K> } =
{
    aspectRatio: aspectRatioToCssString,
    minAspectRatio: "aspectRatio",
    maxAspectRatio: "aspectRatio",
    color: { defaultValue: 0 },
    minColor: "color",
    maxColor: "color",
    colorIndex: { defaultValue: 0 },
    minColorIndex: "color",
    maxColorIndex: "color",
    height: lengthFetaureToCssString,
    minHeight: "height",
    maxHeight: "height",
    monochrome: { defaultValue: 0 },
    minMonochrome: "monochrome",
    maxMonochrome:"monochrome",
    resolution: resolutionFetaureToCssString,
    minResolution: "resolution",
    maxResolution: "resolution",
    width: lengthFetaureToCssString,
    minWidth: "width",
    maxWidth:"width",
};



