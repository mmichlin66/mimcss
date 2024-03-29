﻿import {Extended, IGenericProxy, OneOrBox, OneOrPair} from "./CoreTypes";



/**
 * String representing numeric values with the given unit type
 */
export type NumericString<U extends string> = `${number}${U}`;



/**
 * The `INumberBaseMath` interface contains methods that implement CSS mathematical functions on the
 * numeric CSS types. This interface is extended by dimension-specific interfaces such as
 * {@link INumberMath}, {@link ILengthMath}, {@link IAngleMath}, etc.
 *
 * @typeparam T Type of values participating in the mathematical functions. For example, the
 * {@link ILengthMath} interface specifies it as {@link CssLength}.
 * @typeparam U Type that contains string literals defining units available for the given numeric
 * type.
 */
export interface INumericMath<T, U extends string>
{
    /** Returns the current unit used for converting integer numbers to strings */
    getIntUnit(): U | "";

    /**
     * Sets the unit to use for converting integer numbers to strings and returns the old unit.
     *
     * @param newUnit New unit to use or empty string (no unit will be appended)
     * @returns Old unit value
     */
    setIntUnit(newUnit: U | ""): U | "";

    /** Returns the current unit used for converting floating point numbers to strings */
    getFloatUnit(): U | "";

    /**
     * Sets the unit to use for converting floating point numbers to strings and returns the old unit.
     *
     * @param newUnit New unit to use or empty string (no unit will be appended)
     * @returns Old unit value
     */
    setFloatUnit(newUnit: U | ""): U | "";

    /**
     * Creates value from the given number and unit. This method can be used to dynamically
     * construct the needed dimension.
     *
     * @param n Numeric value.
     * @param unit Unit to append to the numeric value.
     * @returns Numeric string of the proper unit type. This allows the result of the `calc` method
     * to be assigned only to the properties of a compatible numeric type.
     */
    units(n: number, unit: U): NumericString<U>;

    /**
     * Creates property value using the CSS `min()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param params One or more values to choose the minimum from.
     * @returns Numeric string of the proper unit type. This allows the result of the `calc` method
     * to be assigned only to the properties of a compatible numeric type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // min( 200px, 25.5em, 45%)
     *     cls1 = this.$class({
     *         width: css.Len.min( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    min(...params: Extended<T>[]): NumericString<U>;

    /**
     * Creates property value using the CSS `max()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param params One or more values to choose the maximum from.
     * @returns Numeric string of the proper unit type. This allows the result of the `calc` method
     * to be assigned only to the properties of a compatible numeric type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // max( 200px, 25.5em, 45%)
     *     cls1 = this.$class({
     *         width: css.Len.max( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    max(...params: Extended<T>[]): NumericString<U>;

    /**
     * Creates property value using the CSS `clamp()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param min Lower bound for the return value.
     * @param pref Preferred value.
     * @param max Upper bound for the return value.
     * @returns Numeric string of the proper unit type. This allows the result of the `calc` method
     * to be assigned only to the properties of a compatible numeric type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     // clamp( 200px, 25.5em, 45%)
     *     cls1 = this.$class({
     *         width: css.Len.clamp( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    clamp(min: Extended<T>, pref: Extended<T>, max: Extended<T>): NumericString<U>;

    /**
     * Creates property value using the CSS `calc()` function. This method is a tag function and must
     * be invoked with a template string without parentheses. Parameters in the template string
     * are of the type `Extended<T>`; that is, they can be either of the generic type `T`, or a
     * CSS custom variable or constant of type `T`.
     *
     * @param formularParts Array of strings, which are part of the template string and which are
     * not parameters.
     * @param params Array of parameters from the template string.
     * @returns Numeric string of the proper unit type. This allows the result of the `calc` method
     * to be assigned only to the properties of a compatible numeric type.
     *
     * **Example:**
     *
     * ```typescript
     * class MyStyles extends css.StyleDefinition
     * {
     *     defaultPadding = css.var( "CssLength", 8)
     *
     *     // calc( 200px - (2 * var(--defaultPadding)))
     *     cls1 = this.$class({
     *         width: css.Len.calc` 200px - (2 * ${this.defaultPadding})`
     *     })
     * }
     * ```
     */
    calc(formulaParts: TemplateStringsArray, ...params: Extended<T>[]): NumericString<U>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** String representing unitless number values */
export type NumberString = NumericString<"">;

/** Type for a value of the `<number>` CSS type */
export type CssNumber = number | NumberString;

/**
 * The `INumberMath` interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types. This interface is implemented by the {@link NumericAPI!Num} object.
 */
export interface INumberMath extends INumericMath<CssNumber,""> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<percentage>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of percent */
export type PercentUnits = "%";

/** String representing percent values */
export type PercentString = NumericString<PercentUnits>;

/**
 * Type for style properties of the `<percentage>` CSS type. Values of this type can be specifed as:
 * - strings that have a number followed by the percent sign, like `"83%"`
 * - return value from the {@link NumericAPI!percent} function
 * - a number:
 *   - if the number is an integer, it is taken as is and a percent sign is appended to it
 *   - if the number is a floating point, it is multiplied by 100 and a percent sign is appended to it
 */
export type CssPercent = number | PercentString;

/**
 * The `IPercentMath` interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types. This interface is implemented by the {@link NumericAPI!Percent} object.
 */
export interface IPercentMath extends INumericMath<CssPercent, PercentUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<length> | <percentage>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of length */
export type LengthUnits = PercentUnits | "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" |
    "mm" | "pc" | "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "fr";

/** String representing length values */
export type LengthString = NumericString<LengthUnits>;

/**
 * Type for single style property of the `<length> | <percentage>` CSS type. Values of this type
 * can be specifed as:
 * - strings that have a number followed by one of the length units, like `"100vh"` or `"1fr"`
 * - return value from the length unit functions such as {@link NumericAPI!rem},
 * {@link NumericAPI!vh}, {@link NumericAPI!vmin}, {@link NumericAPI!percent}, etc.
 * - a number:
 *   - if the number is an integer, it is interpreted as `"px"` units
 *   - if the number is a floating point, it is interpreted as `"em"` units
 */
export type CssLength = CssPercent | LengthString;

/**
 * Type that combines {@link CssLength} and the string literal `"auto"`. This type is often used when a
 * property accepts the `<length>` type and the `"auto"` literal - for example, when specifying
 * margins.
 */
export type CssLengthOrAuto = CssLength | "auto";

/**
 * The `ILengthMath` interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types. This interface is implemented by the {@link NumericAPI!Len} object.
 */
export interface ILengthMath extends INumericMath<CssLength, LengthUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<angle> | <percentage>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of angle */
export type AngleUnits = PercentUnits | "deg" | "rad" | "grad" | "turn";

/** String representing angle values */
export type AngleString = NumericString<AngleUnits>;

/** Type for single style property of the `<angle>` CSS type */
export type CssAngle = number | AngleString;

/**
 * The `IAngleMath` interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types. This interface is implemented by the {@link NumericAPI!Angle} object.
 * Type for single style property of the `<angle> | <percentage>` CSS type. Values of this type
 * can be specifed as:
 * - strings that have a number followed by one of the angle units, like `"100deg"` or `"0.4rad"`
 * - return value from the angle unit functions such as {@link NumericAPI!rad}, {@link NumericAPI!deg}, etc.
 * - a number:
 *   - if the number is an integer, it is interpreted as `"deg"` units
 *   - if the number is a floating point, it is interpreted as `"turn"` units
 */
export interface IAngleMath extends INumericMath<CssAngle, AngleUnits>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/** String representing time values */
export type TimeString = NumericString<TimeUnits>;

/** Type for single style property of the `<time>` CSS type */
export type CssTime = number | TimeString;

/**
 * The `ITimeMath` interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types. This interface is implemented by the {@link NumericAPI!Time} object.
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

/** String representing resolution values */
export type ResolutionString = NumericString<ResolutionUnits>;

/** Type for single style property of the `<resolution>` CSS type */
export type CssResolution = number | ResolutionString;

/**
 * The `IResolutionMath` interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types. This interface is implemented by the {@link NumericAPI!Resolution} object.
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

/** String representing frequency values */
export type FrequencyString = NumericString<FrequencyUnits>;

/** Type for single style property of the `<frequency>` CSS type */
export type CssFrequency = number | FrequencyString;

/**
 * The `IFrequencyMath` interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types. This interface is implemented by the {@link NumericAPI!Frequency} object.
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
export type CssSize = "auto" | "max-content" | "min-content" | "fit-content" | "stretch" |
    CssLength | IFitContentProxy;

/**
 * The IFitContentProxy interface represents an invocation of the CSS `fit-content()` function. It
 * is returned from the {@link NumericAPI!fitContent} function.
 */
export interface IFitContentProxy extends IGenericProxy<"fit-content"> {}



/**
 * Type representing a point as a two element tuple where x and y coordinates are specified using
 * the {@link CssLength} type.
 */
export type CssPoint = [Extended<CssLength>, Extended<CssLength>];



/** Horizontal position keywords */
export type HorizontalPositionKeyword = "left" | "center" | "right";

/** Type of a value specifying the horizontal position */
export type HorizontalPosition = HorizontalPositionKeyword | CssLength;

/** Type describing horizontal position CSS type consisting of 2 values using a tuple */
export type HorizontalPositionTuple = [Extended<HorizontalPositionKeyword>, Extended<CssLength>];

/** Vertical position keywords */
export type VerticalPositionKeyword = "top" | "center" | "bottom";

/** Type of a value specifying the vertical position */
export type VerticalPosition = VerticalPositionKeyword | CssLength;

/** Type describing vertical position CSS type consisting of 2 values using a tuple */
export type VerticalPositionTuple = [Extended<VerticalPositionKeyword>, Extended<CssLength>];



/** Type describing `<position-x>` CSS type consisting of up to 2 values */
export type CssPositionX = HorizontalPosition | HorizontalPositionTuple;

/** Type describing multiple `<position-x>` CSS types consisting of up to 2 values */
export type CssMultiPositionX = CssPositionX | ([Extended<HorizontalPosition>] | Extended<HorizontalPositionTuple>)[];



/** Type describing `<position-y>` CSS type consisting of up to 2 values */
export type CssPositionY = VerticalPosition | VerticalPositionTuple;

/** Type describing multiple `<position-y>` CSS types consisting of up to 2 values */
export type CssMultiPositionY = CssPositionY | ([Extended<VerticalPosition>] | Extended<VerticalPositionTuple>)[];



/** Type describing a single item in the `<position>` CSS type */
export type CssPositionItem = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength;

/** Type describing `<position>` CSS type consisting of 1 to 4 values using touples */
export type CssPositionTuple =
    [Extended<HorizontalPosition>, Extended<VerticalPosition>] |
    [Extended<HorizontalPosition>, Extended<VerticalPositionKeyword>, Extended<CssLength>] |
    [Extended<HorizontalPositionKeyword>,  Extended<CssLength>, Extended<VerticalPosition>] |
    [Extended<HorizontalPositionKeyword>, Extended<CssLength>, Extended<VerticalPositionKeyword>, Extended<CssLength>] |

    [Extended<VerticalPosition>, Extended<HorizontalPosition>] |
    [Extended<VerticalPosition>, Extended<HorizontalPositionKeyword>, Extended<CssLength>] |
    [Extended<VerticalPositionKeyword>, Extended<CssLength>, Extended<HorizontalPosition>] |
    [Extended<VerticalPositionKeyword>, Extended<CssLength>, Extended<HorizontalPositionKeyword>, Extended<CssLength>];

/** Type describing `<position>` CSS type consisting of up to 4 values */
export type CssPosition = CssPositionItem | CssPositionTuple;

/** Type describing multiple `<position>` CSS types consisting of up to 4 values */
export type CssMultiPosition = CssPosition | ([Extended<CssPositionItem>] | Extended<CssPositionTuple>)[];



/** Type for a single corner radius */
export type CssRadius = OneOrPair<CssLength>;



/** Type for border-radius style property */
export type BorderRadiusItem = [Extended<CssLength>, Extended<CssLength>?, Extended<CssLength>?, Extended<CssLength>?];

/** Type for border-radius style property */
export type BorderRadius = OneOrBox<CssLength> | [BorderRadiusItem, BorderRadiusItem];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Aspect Ratio
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IAspectRatioProxy interface represents an invocation of the {@link NumericAPI!ratio} function.
 */
export interface IAspectRatioProxy extends IGenericProxy<"aspect-ratio"> {}

/**
 * The `CssAspectRatio` type represents the CSS `<ratio>` type. This type can be used for the
 * `aspect-ratio` CSS property and by the `aspect-ratio` media feature in a `@media` rule.
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // using pre-defined string literal value
 *     class1 = this.$class( {aspectRatio: "4/3"})
 *
 *     // using the `ratio()` function
 *     class2 = this.$class( {aspectRatio: css.ratio( 4, 3)})
 *
 *     // using a single number
 *     mediaRule1 = this.$media( {aspectRatio: 1.33}, ...)
 *
 *     // using a tuple to specify range; this will result in the following media condition:
 *     // (min-aspect-ratio: 4/3) and (max-aspect-ratio:16/9)
 *     mediaRule2 = this.$media( {aspectRatio: ["4/3","16/9"]}, ...)
 * }
 * ```
 */
export type CssAspectRatio = CssNumber | IAspectRatioProxy | `${number}/${number}`;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// rect() function for clip property
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The `IRectProxy` interface represents an invocation of the {@link NumericAPI!rect} function used for the `clip`
 * style property.
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export interface IRectProxy extends IGenericProxy<"rect"> {}

