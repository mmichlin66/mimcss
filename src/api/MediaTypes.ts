import {IGenericProxy, RawExtended} from "./CoreTypes";
import {CssAspectRatio, CssNumber, CssLength, CssResolution} from "./NumericTypes";
import {Styleset} from "./Stylesets";



/** Possible media types */
export type MediaType = "all" | "print" | "screen" | "speech";



/**
 * Type for a media feature that can be specified either as a single value or as a range between
 * two values of the given type.
 */
export type OneOrRange<T> = T | [RawExtended<T>, RawExtended<T>?];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Media query types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Representing the type of objects used to create media queries in the {@link RuleAPI!StyleDefinition.$media}
 * method.
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
    dynamicRange?: "standard" | "high";
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
    videoDynamicRange?: "standard" | "high";
    width?: OneOrRange<CssLength>;
    minWidth?: CssLength;
    maxWidth?: CssLength;
}



/**
 * The `ExtendedMediaFeatureset` type maps all media features defined in the {@link IMediaFeatureset}
 * interface to the "extended" versions of their types. These extended types are defined by
 * allowing {@link CoreTypes!IRawProxy} interface to the type that is defined in the
 * {@link IMediaFeatureset} interface.
 */
export type ExtendedMediaFeatureset = { [K in keyof IMediaFeatureset]?: RawExtended<IMediaFeatureset[K]> }



/**
 * Represents media query returned from the {@link CoreAPI!media} function.
 */
export interface IMediaQueryProxy extends IGenericProxy<"media-query"> {}



/**
 * Type representing a single query as part of the`@media` rule. The features within each
 * feature-set are combined with the "and" operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // css: @media (max-width: 400px) and (max-height: 400px) {...}
 *     ifNarrowAndShort = this.$media( {maxWidth: 400, maxHeight: 400}, ...)
 * }
 * ```
 */
export type MediaQuery = string | ExtendedMediaFeatureset | IMediaQueryProxy;



/**
 * Type representing one or more queries as part of the `@media` rule. While multiple queries in
 * an array are combined with the "," operator, the styles within each feature-set are combined with
 * the "and" operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // css: @media (min-width: 1000px), (min-height: 1000px) {...}
 *     ifWideOrTall = this.$media( [{minWidth: 1000}, {minHeight: 1000}], {...})
 * }
 * ```
 */
export type MediaStatement = MediaQuery | MediaQuery[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Supports query types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Represents supports query returned from the {@link CoreAPI!supports} function.
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
 export type SupportsStatement = SupportsQuery | SupportsQuery[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Container query types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Representing the type of objects used to create container queries in the
 * {@link RuleAPI!StyleDefinition.$container} method.
 */
export type IContainerFeatureset = Pick<IMediaFeatureset,
    "aspectRatio" | "minAspectRatio" | "maxAspectRatio" |
    "height" | "minHeight" | "maxHeight" |
    "orientation" |
    "width" | "minWidth" | "maxWidth"> &
{
    blockSize?: OneOrRange<CssLength>;
    minBlockSize?: CssLength;
    maxBlockSize?: CssLength;
    inlineSize?: OneOrRange<CssLength>;
    minInlineSize?: CssLength;
    maxInlineSize?: CssLength;
}



/**
 * The `ExtendedContainerFeatureset` type maps all container features defined in the {@link IContainerFeatureset}
 * interface to the "extended" versions of their types. These extended types are defined by
 * allowing {@link CoreTypes!IRawProxy} interface to the type that is defined in the
 * {@link IContainerFeatureset} interface.
 */
export type ExtendedContainerFeatureset = { [K in keyof IContainerFeatureset]?: RawExtended<IContainerFeatureset[K]> }



/**
 * Represents container query returned from the {@link CoreAPI!container} function.
 */
export interface IContainerQueryProxy extends IGenericProxy<"container-query"> {}



/**
 * Represents container style query returned from the {@link CoreAPI!style} function.
 */
export interface IContainerStyleQueryProxy extends IGenericProxy<"container-style-query"> {}



/**
 * Type representing a single query as part of the`@container` rule. The features within each
 * feature-set are combined with the "and" operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // css: @container (max-width: 400px) and (max-height: 400px) {...}
 *     ifNarrowAndShort = this.$container( {maxWidth: 400, maxHeight: 400}, ...)
 * }
 * ```
 */
export type ContainerQuery = string | ExtendedContainerFeatureset | IContainerQueryProxy | IContainerStyleQueryProxy;



/**
 * Type representing one or more queries as part of the `@container` rule. While multiple queries in
 * an array are combined with the "," operator, the styles within each feature-set are combined with
 * the "and" operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // css: @container (min-width: 1000px), (min-height: 1000px) {...}
 *     ifWideOrTall = this.$container( [{minWidth: 1000}, {minHeight: 1000}], ...)
 * }
 * ```
 */
export type ContainerStatement = ContainerQuery | ContainerQuery[];



