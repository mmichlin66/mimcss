import {
    CssAspectRatio, CssNumber, CssLength, CssResolution, IConstant, IStringProxy
} from "./BasicTypes";
import {s_mediaQueryToString} from "../impl/MediaFuncs";



/** Possible media types */
export type MediaType = "all" | "braille" | "embossed" | "handheld" | "print" | "projection" |
    "screen" | "speech" | "tty" | "tv";



/**
 * Type that extends the given type with the following types:
 * - IConstant interface that allows using a constant value.
 * - IStringProxy interface that allows specifying raw string value.
 */
export type ExtendedFeature<T> = T | IConstant<T> | IStringProxy | null | undefined;



/**
 * Type for a media feature that can be specified either as a single value or as a range between
 * two values of the given type.
 */
export type OneOrRange<T> = T | [ExtendedFeature<T>, ExtendedFeature<T>?];



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export interface IMediaFeatureset
{
    anyHover?: "none" | "hover";
    anyPointer?: "none" | "coarse" | "fine";
    aspectRatio?: OneOrRange<CssAspectRatio>;
    minAspectRatio?: CssAspectRatio;
    maxAspectRatio?: CssAspectRatio;
    color?: OneOrRange<CssNumber>;
    minColor?: CssNumber;
    maxColor?: CssNumber;
    colorGamut?: "srgb" | "p3" | "rec2020";
    colorIndex?: OneOrRange<CssNumber>;
    minColorIndex?: CssNumber;
    maxColorIndex?: CssNumber;
    displayMode?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    forcedColors?: "none" | "active";
    grid?: boolean;
    height?: OneOrRange<CssLength>;
    minHeight?: CssLength;
    maxHeight?: CssLength;
    hover?: "none" | "hover";
    invertedColors?: "none" | "inverted";
    lightLevel?: "dim" | "normal" | "washed";
    monochrome?: OneOrRange<CssNumber>;
    minMonochrome?: CssNumber;
    maxMonochrome?: CssNumber;
    orientation?: "portrait" | "landscape";
    overflowBlock?: "none" | "scroll" | "optional-paged" | "paged";
    overflowInline?: "none" | "scroll";
    pointer?: "none" | "coars" | "fine";
    prefersColorScheme?: "no-preference" | "light" | "dark";
    prefersContrast?: "no-preference" | "high" | "low";
    prefersReducedMotion?: "no-preference" | "reduce";
    prefersReducedTransparency?: "no-preference" | "reduce";
    resolution?: OneOrRange<CssResolution>;
    minResolution?: CssResolution;
    maxResolution?: CssResolution;
    scan?: "interlace" | "progressive";
    scripting?: "none" | "initial-only" | "enabled";
    update?: "none" | "slow" | "fast";
    width?: OneOrRange<CssLength>;
    minWidth?: CssLength;
    maxWidth?: CssLength;
}



/**
 * Type representing a single set of styles as part of the @media rules. The styles in the
 * styleset are combined with the "and" operator. The entire styleset can be negated, which will
 * result in placing the "not" operator that will act on all styles in the query.
 */
export interface ISingleMediaQuery extends IMediaFeatureset
{
    $mediaType?: MediaType;
    $only?: boolean;
    $negate?: boolean;
}



/**
 * The ExtendedSingleMediaQuery type maps all media features defined in the [[ISingleMediaQuery]]
 * interface to the "extended" versions of their types. These extended types are defined by
 * allowing [[StringProxy]] and [[IConstant]] interfaces to the type that is defined in the
 * `ISingleMediaQuery` interface.
 */
export type ExtendedSingleMediaQuery = { [K in keyof ISingleMediaQuery]?: ExtendedFeature<ISingleMediaQuery[K]> }



/**
 * Type representing one or more queries as part of the @media rule. While multiple queries in
 * an array are combined with the "," operator, the styles within each styleset are combined with
 * the "and" operator.
 */
export type MediaQuery = string | ExtendedSingleMediaQuery | ExtendedSingleMediaQuery[];



/**
 * Converts the given media query value to the CSS media query string. This function should be used
 * by libraries that allow specifying the [[MediaQuery]] type for the `media` attribute of elements
 * such as `<link>`, `<style>` and `<source>`
 */
export function mediaQueryToString( query: MediaQuery): string
{
    return s_mediaQueryToString( query);
}



