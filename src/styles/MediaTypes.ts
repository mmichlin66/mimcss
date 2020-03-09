import * as UtilFuncs from "./UtilFuncs"



/** Possible media types */
export type MediaType = "all" | "screen" | "print" | "speech";



export type AspectRatioFetaureType = [number, number] | string;



export type LengthFetaureType = number | string;



export type ResolutionFetaureType = number | string;



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export type MediaFeatureset =
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



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export type SingleMediaQuery = MediaFeatureset &
{
    $mediaType?: MediaType;
    $only?: boolean;
    $negate?: boolean;
}



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export type MediaQuery = SingleMediaQuery | SingleMediaQuery[];



