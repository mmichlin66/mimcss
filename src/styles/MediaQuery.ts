import * as utils from "./utils"



/** Possible media types */
export type MediaType = "all" | "screen" | "print" | "speech";



export type AspectRatioFetaureType = [number, number] | string;

export function aspectRatioToCssString( val: AspectRatioFetaureType): string
{
    return typeof val === "string" ? val : val[0] + "/" + val[1];
}



export type LengthFetaureType = number | string;

export function lengthFetaureToCssString( val: LengthFetaureType): string
{
    return typeof val === "string" ? val : val + "px";
}



export type ResolutionFetaureType = number | string;

export function resolutionFetaureToCssString( val: ResolutionFetaureType): string
{
    return typeof val === "string" ? val : val + "dpi";
}



export type FeatureType = "" | string;



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export interface MediaFeatureset
{
    anyHover?: "none" | "hover";
    anyPointer?: "none" | "coarse" | "fine";
    aspectRatio?: AspectRatioFetaureType;
    minAspectRatio?: AspectRatioFetaureType;
    maxAspectRatio?: AspectRatioFetaureType;
    color?: number;
    minColor?: number;
    maxColor?: number;
    colorGamut?: "srgb" | "p3" | "rec2020";
    colorIndex?: number;
    minColorIndex?: number;
    maxColorIndex?: number;
    // deviceAspectRatio?: FeatureType;
    // deviceHeight?: FeatureType;
    // deviceWidth?: FeatureType;
    displayMode?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    forcedColors?: "none" | "active";
    grid?: boolean;
    height?: LengthFetaureType;
    minHeight?: LengthFetaureType;
    maxHeight?: LengthFetaureType;
    hover?: "none" | "hover";
    invertedColors?: "none" | "inverted";
    lightLevel?: "dim" | "normal" | "washed";
    monochrome?: number;
    minMonochrome?: number;
    maxMonochrome?: number;
    orientation?: "portrait" | "landscape";
    overflowBlock?: "none" | "scroll" | "optional-paged" | "paged";
    overflowInline?: "none" | "scroll";
    pointer?: "none" | "coars" | "fine";
    prefersColorScheme?: "no-preference" | "light" | "dark";
    prefersContrast?: "no-preference" | "high" | "low";
    prefersReducedMotion?: "no-preference" | "reduce";
    prefersReducedTransparency?: "no-preference" | "reduce";
    resolution?: ResolutionFetaureType;
    minResolution?: ResolutionFetaureType;
    maxResolution?: ResolutionFetaureType;
    scan?: "interlace" | "progressive";
    scripting?: "none" | "initial-only" | "enabled";
    update?: "none" | "slow" | "fast";
    width?: LengthFetaureType;
    minWidth?: LengthFetaureType;
    maxWidth?: LengthFetaureType;
}



type convertFuncType<T> = (val: T) => string;

/**
 * The MediaFeatureInfo represents information that we keep for style properties
 */
interface MediaFeatureInfo<T>
{
    /** Function that converts from object representation to CSS string */
    convert?: convertFuncType<T>;

    /** If defined, indicates the property that our property should be treated as */
    treatAs?: string;

    /**
     * If defined, indicates the value, which we will not put into CSS string. This is needed for
     * media features that can be specified without the value, e.g. color or color-index.
     */
    defaultValue?: T;

}



let mediaFeatures: { [K in keyof MediaFeatureset]?: MediaFeatureInfo<MediaFeatureset[K]> | convertFuncType<MediaFeatureset[K]> | string } =
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
    height: { convert: utils.singleLengthToCssString },
    minHeight: "height",
    maxHeight: "height",
    width: { convert: utils.singleLengthToCssString },
    minWidth: "width",
    maxWidth:"width",
    monochrome: { defaultValue: 0 },
    minMonochrome: "monochrome",
    maxMonochrome:"monochrome",
    resolution: { convert: utils.resolutionToCssString },
    minResolution: "resolution",
    maxResolution: "resolution",
};



/**
 * Converts the given media featureset object to the CSS media query string
 * @param style 
 */
export function mediaFeaturesetToCssString( query: MediaFeatureset): string | null
{
    if (!query)
        return null;

    let s = "";

    for( let propName in query)
    {
        if (query[propName])
        {
            if (s.length > 0)
                s += ";";

            s += mediaFeatureToCssString( propName, query[propName]);
        }
    }

    return s;
}



/**
 * Converts the given media feature to the CSS media query string
 * @param style 
 */
function mediaFeatureToCssString( featureName: string, propVal: any, valueOnly?: boolean): string | null
{
    if (!featureName || propVal == null)
        return null;

    let info: MediaFeatureInfo<any> = mediaFeatures[featureName];
    while( info)
    {
        if (typeof info === "string")
            info = mediaFeatures[info];
        else if (typeof info === "object")
            info = mediaFeatures[info.treatAs];
        else
            break;
    }

    if (info && info.defaultValue !== undefined && propVal === info.defaultValue)
        return valueOnly ? "" : featureName;

    let s: string;
    if (info && info.convert)
        s = info.convert( propVal);
    else if (typeof propVal === "string")
        s = propVal;
    else if (Array.isArray( propVal))
        s = utils.arrayToCssString( propVal, item => item == null ? "" : item.toString());
    else
        s = propVal.toString();

    return valueOnly ? s : featureName + ":" + s;
}



