/** Possible media types */
export type MediaType = "all" | "braille" | "embossed" | "handheld" | "print" | "projection" | "screen" | "speech" | "tty" | "tv";



export type AspectRatioFeatureType = [number, number] | string;



export type LengthFeatureType = number | string;



export type ResolutionFeatureType = number | string;



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export type MediaFeatureset =
{
    anyHover?: "none" | "hover";
    anyPointer?: "none" | "coarse" | "fine";
    aspectRatio?: AspectRatioFeatureType;
    minAspectRatio?: AspectRatioFeatureType;
    maxAspectRatio?: AspectRatioFeatureType;
    color?: number | [number, number];
    minColor?: number;
    maxColor?: number;
    colorGamut?: "srgb" | "p3" | "rec2020";
    colorIndex?: number | [number, number];
    minColorIndex?: number;
    maxColorIndex?: number;
    // deviceAspectRatio?: FeatureType;
    // deviceHeight?: FeatureType;
    // deviceWidth?: FeatureType;
    displayMode?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    forcedColors?: "none" | "active";
    grid?: boolean;
    height?: LengthFeatureType | [LengthFeatureType, LengthFeatureType];
    minHeight?: LengthFeatureType;
    maxHeight?: LengthFeatureType;
    hover?: "none" | "hover";
    invertedColors?: "none" | "inverted";
    lightLevel?: "dim" | "normal" | "washed";
    monochrome?: number | [number, number];
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
    resolution?: ResolutionFeatureType | [ResolutionFeatureType, ResolutionFeatureType];
    minResolution?: ResolutionFeatureType;
    maxResolution?: ResolutionFeatureType;
    scan?: "interlace" | "progressive";
    scripting?: "none" | "initial-only" | "enabled";
    update?: "none" | "slow" | "fast";
    width?: LengthFeatureType | [LengthFeatureType, LengthFeatureType];
    minWidth?: LengthFeatureType;
    maxWidth?: LengthFeatureType;
}



/**
 * Type representing a single set of styles as part of the @media rules. The styles in the
 * styleset are combined with the "and" operator. The entire styleset can be negated, which will
 * result in placing the "not" operator that will act on all styles in the query.
 */
export type SingleMediaQuery = MediaFeatureset &
{
    $mediaType?: MediaType;
    $only?: boolean;
    $negate?: boolean;
}



/**
 * Type representing one or more queries as part of the @media rule. While multiple queries in
 * an array are combined with the "," operator, the styles within each styleset are combined with
 * the "and" operator.
 */
export type MediaQuery = SingleMediaQuery | SingleMediaQuery[];



