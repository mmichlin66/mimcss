import {Extended, IGenericProxy, OneOrPair} from "./CoreTypes";



/**
 * The INumberBaseMath interface contains methods that implement CSS mathematical functions on the
 * numeric CSS types. This interface is extended by dimension-specific interfaces such as
 * [[INumberMath]], [[ILengthMath]], [[IAngleMath]], etc.
 *
 * @typeparam T Type of values participating in the mathematical functions. For example, the
 * [[ILengthMath]] interface specifies it as [[CssLength]].
 * @typeparam U Type that contains string literals defining units available for the given numeric
 * type.
 */
export interface INumericMath<T, U extends string>
{
    /**
     * Creates value from the given number and unit. This method can be used to dynamically
     * construct the needed dimension.
     *
     * @param n Numeric value.
     * @param unit Unit to append to the numeric value.
     * @returns Function implementing the `IGenericProxy<U>` callable interface. This allows the
     * result of the `units` method to be assigned only to the properties of compatible numeric
     * type.
     */
    units( n: number, unit: U): IGenericProxy<U>;

    /**
     * Creates property value using the CSS `min()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param params One or more values to choose the minimum from.
     * @returns Function implementing the `IGenericProxy<U>` callable interface. This allows the
     * result of the `min` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // min( 200px, 25.5em, 45%)
     *     cls1 = css.$class({
     *         width: css.Len.min( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    min( ...params: Extended<T>[]): IGenericProxy<U>;

    /**
     * Creates property value using the CSS `max()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param params One or more values to choose the maximum from.
     * @returns Function implementing the `IGenericProxy<U>` callable interface. This allows the
     * result of the `max` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // max( 200px, 25.5em, 45%)
     *     cls1 = css.$class({
     *         width: css.Len.max( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    max( ...params: Extended<T>[]): IGenericProxy<U>;

    /**
     * Creates property value using the CSS `clamp()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param min Lower bound for the return value.
     * @param pref Preferred value.
     * @param min Upper bound for the return value.
     * @returns Function implementing the `IGenericProxy<U>` callable interface. This allows the
     * result of the `clamp` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // clamp( 200px, 25.5em, 45%)
     *     cls1 = css.$class({
     *         width: css.Len.clamp( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    clamp( min: Extended<T>, pref: Extended<T>, max: Extended<T>): IGenericProxy<U>;

    /**
     * Creates property value using the CSS `calc()` function. This method is a tag function and must
     * be invoked with a template string without parentheses. Parameters in the template string
     * are of the type `Extended<T>`; that is, they can be either of the generic type `T`, or a
     * CSS custom variable or constant of type `T`.
     *
     * @param formularParts Array of strings, which are part of the template string and which are
     * not parameters.
     * @param params Array of parameters from the template string.
     * @returns Function implementing the `IGenericProxy<U>` callable interface. This allows the
     * result of the `calc` method to be assigned only to the properties of a compatible numeric
     * type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     defaultPadding = css.var( "CssLength", 8)
     *
     *     // calc( 200px - (2 * var(--defaultPadding)))
     *     cls1 = css.$class({
     *         width: css.Len.calc` 200px - (2 * ${this.defaultPadding})`
     *     })
     * }
     * ```
     */
    calc( formulaParts: TemplateStringsArray, ...params: Extended<T>[]): IGenericProxy<U>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface INumberProxy extends IGenericProxy<""> {};

/** Type for a value of the `<number>` CSS type */
export type CssNumber = number | IGenericProxy<"">;

/**
 * The ICssNumberMath interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types. This interface is implemented by the [[Num]] object.
 */
export interface INumberMath extends INumericMath<CssNumber,""> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of percent */
export type PercentUnits = "%";

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface IPercentProxy extends IGenericProxy<PercentUnits> {};

/** Type for single style property of the `<percent>` CSS type */
export type CssPercent = number | IPercentProxy |
    "5%" | "10%" | "15%" | "20%" | "25%" | "30%" | "35%" | "40%" | "45%" | "50%" |
    "55%" | "60%" | "65%" | "70%" | "75%" | "80%" | "85%" | "90%" | "95%" | "100%";

/**
 * The ICssPercentMath interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types. This interface is implemented by the [[Percent]] object.
 */
export interface IPercentMath extends INumericMath<CssPercent, PercentUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<length>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "fr";

/** Proxy interface that represents values of the `<length>` CSS type */
export interface ILengthProxy extends IGenericProxy<LengthUnits> {};

/**
 * Type for single style property of the `<length>` CSS type. Integer numbers are interpreted as
 * having the `"px"` units and floating point numbers are interpreted as having the `"em"` units.
 * In addition to numbers and the [[ILengthProxy]] interface it also allows several string
 * literals, such as `"1fr"` and `"100%"`. This is in order to make it more convenient for
 * developers to write these frequently used values. Other `<length>` units should be specified
 * using the functions such as [[rem]], [[vh]], [[vmin]], etc.
 */
export type CssLength = CssPercent | ILengthProxy |
    "100vh" | "100vw" |
    "1fr" | "2fr" | "3fr" | "4fr" | "5fr" | "6fr" | "7fr" | "8fr" | "9fr" | "10fr" | "11fr" | "12fr";

/**
 * Type that combines CssLength and the string literal `"auto"`. This type is often used when a
 * property accepts the `<length>` type and the `"auto"` literal - for example, when specifying
 * margins.
 */
export type CssLengthOrAuto = CssLength | "auto";

/**
 * The ICssLengthMath interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types. This interface is implemented by the [[Len]] object.
 */
export interface ILengthMath extends INumericMath<CssLength, LengthUnits | PercentUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<angle>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Proxy interface that represents values of the `<angle>` CSS type */
export interface IAngleProxy extends IGenericProxy<AngleUnits> {};

/** Type for single style property of the `<angle>` CSS type */
export type CssAngle = number | IAngleProxy;

/**
 * The ICssAngleMath interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types. This interface is implemented by the [[Angle]] object.
 */
export interface IAngleMath extends INumericMath<CssAngle, AngleUnits | PercentUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Proxy interface that represents values of the `<time>` CSS type*/
export interface ITimeProxy extends IGenericProxy<TimeUnits> {};

/** Type for single style property of the `<time>` CSS type */
export type CssTime = number | ITimeProxy;

/**
 * The ICssTimeMath interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types. This interface is implemented by the [[Time]] object.
 */
export interface ITimeMath extends INumericMath<CssTime, TimeUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<resolution>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Proxy interface that represents values of the `<resolution>` CSS type */
export interface IResolutionProxy extends IGenericProxy<ResolutionUnits> {};

/** Type for single style property of the `<resolution>` CSS type */
export type CssResolution = number | IResolutionProxy |
    "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" |
    "1dppx" | "2dppx" | "3dppx" | "4dppx" | "5dppx" | "6dppx" | "7dppx" | "8dppx" | "9dppx" | "10dppx";

/**
 * The ICssResolutionMath interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types. This interface is implemented by the [[Resolution]] object.
 */
export interface IResolutionMath extends INumericMath<CssResolution, ResolutionUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<frequency>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Proxy interface that represents values of the `<frequency>` CSS type */
export interface IFrequencyProxy extends IGenericProxy<FrequencyUnits> {};

/** Type for single style property of the `<frequency>` CSS type */
export type CssFrequency = number | IFrequencyProxy;

/**
 * The ICssFrequencyMath interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types. This interface is implemented by the [[Frequency]] object.
 */
export interface IFrequencyMath extends INumericMath<CssFrequency, FrequencyUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Size, Point, Position, Radius
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for `width`, `height`, `block-size` and `inline-size` style properties */
export type CssSize = CssLength | "auto" | "max-content" | "min-content" | IFitContentProxy;

/**
 * The IFitContentProxy interface represents an invocation of the CSS `fit-content()` function. It
 * is returned from the [[fitContent]] function.
 */
export interface IFitContentProxy extends IGenericProxy<"fit-content"> {}



/**
 * Type representing a point as a two element tuple where x and y coordinates are specified using
 * the [[CssLength]] type.
 */
export type CssPoint = [Extended<CssLength>, Extended<CssLength>];



/** Horizontal position keywords */
export type HorizontalPositionKeyword = "left" | "center" | "right";

/** Type of a value specifying the horizontal position */
export type HorizontalPosition = HorizontalPositionKeyword | CssLength;

/** Vertical position keywords */
export type VerticalPositionKeyword = "top" | "center" | "bottom";

/** Type of a value specifying the vertical position */
export type VerticalPosition = VerticalPositionKeyword | CssLength;

/** Type describing a simple 1 or two values `<position>` CSS type */
export type SimpleCssPosition = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPosition>, Extended<VerticalPosition>] |
    [Extended<VerticalPosition>, Extended<HorizontalPosition>];

/** Type describing the full up to 4 values `<position>` CSS type */
export type CssPosition = SimpleCssPosition |
    [Extended<HorizontalPositionKeyword>, Extended<VerticalPositionKeyword>, Extended<CssLength>] |
    [Extended<HorizontalPositionKeyword>, Extended<CssLength>, Extended<VerticalPositionKeyword>, Extended<CssLength>?] |
    [Extended<VerticalPositionKeyword>, Extended<HorizontalPositionKeyword>, Extended<CssLength>] |
    [Extended<VerticalPositionKeyword>, Extended<CssLength>, Extended<HorizontalPositionKeyword>, Extended<CssLength>?];



/** Type for a single corner radius */
export type CssRadius = OneOrPair<Extended<CssLength>>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Aspect Ratio
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssAspectRatio interface represents the CSS `<ratio>` type. This type can be used for the
 * `aspect-ratio` CSS property although this property is not implemented yet by most of the
 * browsers. More frequently though this type is used by the `aspect-ratio` media feature in a
 * `@media` rule.
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // using string value
 *     mediaRule1 = css.$media( {aspectRatio: "4/3"}, ...)
 *
 *     // using the `ratio()` function
 *     mediaRule2 = css.$media( {aspectRatio: css.ratio( 4, 3)}, ...)
 *
 *     // using a single number (not widely supported yet)
 *     mediaRule3 = css.$media( {aspectRatio: 1.33}, ...)
 *
 *     // using a tuple to specify range; this will result in the following media condition:
 *     // (min-aspect-ratio: 4/3) and (max-aspect-ratio:16/9)
 *     mediaRule4 = css.$media( {aspectRatio: ["4/3","16/9"]}, ...)
 * }
 * ```
 */
export type CssAspectRatio = CssNumber | IAspectRatioProxy |
    "1/1" | "4/3" | "16/9" | "185/100" | "239/100";

/**
 * The IAspectRatioProxy interface represents an invocation of the [[ratio]] function.
 */
export interface IAspectRatioProxy extends IGenericProxy<"aspect-ratio"> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// rect() function for clip property
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IRectProxy interface represents an invocation of the [[rect]] function.
 */
export interface IRectProxy extends IGenericProxy<"rect"> {}

