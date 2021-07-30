import {IConstant, IGenericProxy, IStringProxy, OneOrMany, OneOrPair} from "./CoreTypes";
import {CssAspectRatio, CssNumber, CssLength, CssResolution} from "./NumericTypes";
import {Styleset} from "./StyleTypes";



/** Possible media types */
export type MediaType = "all" | "print" | "screen" | "speech";



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
export type OneOrRange<T> = OneOrPair<ExtendedFeature<T>>;



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
 * The ExtendedMediaFeatureset type maps all media features defined in the [[IMediaFeatureset]]
 * interface to the "extended" versions of their types. These extended types are defined by
 * allowing [[StringProxy]] and [[IConstant]] interfaces to the type that is defined in the
 * `IMediaFeatureset` interface.
 */
export type ExtendedMediaFeatureset = { [K in keyof IMediaFeatureset]?: ExtendedFeature<IMediaFeatureset[K]> }



/**
 * Represents media query returned from the [[media]] function.
 */
export interface IMediaQueryProxy extends IGenericProxy<"media-query"> {}



/**
 * Type representing a single query as part of the`@media` rule. The features within each
 * feature-set are combined with the "and" operator.
 */
export type MediaQuery = string | ExtendedMediaFeatureset | IMediaQueryProxy;



/**
 * Type representing one or more queries as part of the `@media` rule. While multiple queries in
 * an array are combined with the "," operator, the styles within each feature-set are combined with
 * the "and" operator.
 */
export type MediaStatement = OneOrMany<MediaQuery>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Supports query types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Represents supports query returned from the [[supports]] function.
 */
export interface ISupportsQueryProxy extends IGenericProxy<"supports-query"> {}



/**
 * Type representing a single set of styles as part of the `@supports` rules. The styles in the
 * styleset are combined with the "and" operator.
 */
 export type SupportsQuery = string | Styleset | ISupportsQueryProxy;



 /**
  * Type representing one or more queries as part of the `@supports` rule. While multiple queries in
  * an array are combined with the "or" operator, the styles within each styleset are combined with
  * the "and" operator.
  */
 export type SupportsStatement = OneOrMany<SupportsQuery>;



