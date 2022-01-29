import { Extended, IGenericProxy, OneOrBox, OneOrPair } from "./CoreTypes";
/**
 * The `INumberBaseMath` interface contains methods that implement CSS mathematical functions on the
 * numeric CSS types. This interface is extended by dimension-specific interfaces such as
 * [[INumberMath]], [[ILengthMath]], [[IAngleMath]], etc.
 *
 * @typeparam T Type of values participating in the mathematical functions. For example, the
 * [[ILengthMath]] interface specifies it as [[CssLength]].
 * @typeparam U Type that contains string literals defining units available for the given numeric
 * type.
 */
export interface INumericMath<T, U extends string> {
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
    units(n: number, unit: U): IGenericProxy<U>;
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
     *     cls1 = this.$class({
     *         width: css.Len.min( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    min(...params: Extended<T>[]): IGenericProxy<U>;
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
     *     cls1 = this.$class({
     *         width: css.Len.max( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    max(...params: Extended<T>[]): IGenericProxy<U>;
    /**
     * Creates property value using the CSS `clamp()` function. Parameters are of the type
     * `Extended<T>`; that is, they can be either of the generic type `T`, or a CSS custom variable
     * or constant of type `T`.
     *
     * @param min Lower bound for the return value.
     * @param pref Preferred value.
     * @param max Upper bound for the return value.
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
     *     cls1 = this.$class({
     *         width: css.Len.clamp( 200, 25.5, css.percent(45))
     *     })
     * }
     * ```
     */
    clamp(min: Extended<T>, pref: Extended<T>, max: Extended<T>): IGenericProxy<U>;
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
     *     cls1 = this.$class({
     *         width: css.Len.calc` 200px - (2 * ${this.defaultPadding})`
     *     })
     * }
     * ```
     */
    calc(formulaParts: TemplateStringsArray, ...params: Extended<T>[]): IGenericProxy<U>;
}
/** Proxy interface that represents values of the `<percent>` CSS type */
export interface INumberProxy extends IGenericProxy<""> {
}
/** Type for a value of the `<number>` CSS type */
export declare type CssNumber = number | IGenericProxy<"">;
/**
 * The `INumberMath` interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types. This interface is implemented by the [[Num]] object.
 */
export interface INumberMath extends INumericMath<CssNumber, ""> {
}
/** Units of percent */
export declare type PercentUnits = "%";
/** Proxy interface that represents values of the `<percent>` CSS type */
export interface IPercentProxy extends IGenericProxy<PercentUnits> {
}
/**
 * Type for style properties of the `<percentage>` CSS type. Values of this type can be specifed as:
 * - one of pre-defined strings like `"100%"`
 * - return value from the [[percent]] function
 * - a number:
 *   - if the number is an integer, it is taken as is and a percent sign is appended to it
 *   - if the number is a floating point, it is multiplied by 100 and a percent sign is appended to it
 */
export declare type CssPercent = number | IPercentProxy | "5%" | "10%" | "15%" | "20%" | "25%" | "30%" | "35%" | "40%" | "45%" | "50%" | "55%" | "60%" | "65%" | "70%" | "75%" | "80%" | "85%" | "90%" | "95%" | "100%";
/**
 * The `IPercentMath` interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types. This interface is implemented by the [[Percent]] object.
 */
export interface IPercentMath extends INumericMath<CssPercent, PercentUnits> {
}
/** Units of length */
export declare type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" | "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "fr";
/** Proxy interface that represents values of the `<length>` CSS type */
export interface ILengthProxy extends IGenericProxy<LengthUnits> {
}
/**
 * Type for single style property of the `<length> | <percentage>` CSS type. Values of this type
 * can be specifed as:
 * - one of pre-defined strings like `"100vh"` or `"1fr"`
 * - return value from the length unit functions such as [[rem]], [[vh]], [[vmin]], [[percent]], etc.
 * - a number:
 *   - if the number is an integer, it is interpreted as `"px"` units
 *   - if the number is a floating point, it is interpreted as `"em"` units
 */
export declare type CssLength = CssPercent | ILengthProxy | "100vh" | "100vw" | "1fr" | "2fr" | "3fr" | "4fr" | "5fr" | "6fr" | "7fr" | "8fr" | "9fr" | "10fr" | "11fr" | "12fr";
/**
 * Type that combines [[CssLength]] and the string literal `"auto"`. This type is often used when a
 * property accepts the `<length>` type and the `"auto"` literal - for example, when specifying
 * margins.
 */
export declare type CssLengthOrAuto = CssLength | "auto";
/**
 * The `ILengthMath` interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types. This interface is implemented by the [[Len]] object.
 */
export interface ILengthMath extends INumericMath<CssLength, LengthUnits | PercentUnits> {
}
/** Units of angle */
export declare type AngleUnits = "deg" | "rad" | "grad" | "turn";
/** Proxy interface that represents values of the `<angle>` CSS type */
export interface IAngleProxy extends IGenericProxy<AngleUnits> {
}
/** Type for single style property of the `<angle>` CSS type */
export declare type CssAngle = number | IAngleProxy;
/**
 * The `IAngleMath` interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types. This interface is implemented by the [[Angle]] object.
 * Type for single style property of the `<length> | <percentage>` CSS type. Values of this type
 * can be specifed as:
 * - one of pre-defined strings like `"100vh"` or `"1fr"`
 * - return value from the length unit functions such as [[rem]], [[vh]], [[vmin]], [[percent]], etc.
 * - a number:
 *   - if the number is an integer, it is interpreted as `"deg"` units
 *   - if the number is a floating point, it is interpreted as `"turn"` units
 */
export interface IAngleMath extends INumericMath<CssAngle, AngleUnits | PercentUnits> {
}
/** Units of time */
export declare type TimeUnits = "s" | "ms";
/** Proxy interface that represents values of the `<time>` CSS type*/
export interface ITimeProxy extends IGenericProxy<TimeUnits> {
}
/** Type for single style property of the `<time>` CSS type */
export declare type CssTime = number | ITimeProxy;
/**
 * The `ITimeMath` interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types. This interface is implemented by the [[Time]] object.
 */
export interface ITimeMath extends INumericMath<CssTime, TimeUnits> {
}
/** Units of resolution */
export declare type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";
/** Proxy interface that represents values of the `<resolution>` CSS type */
export interface IResolutionProxy extends IGenericProxy<ResolutionUnits> {
}
/** Type for single style property of the `<resolution>` CSS type */
export declare type CssResolution = number | IResolutionProxy | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | "1dppx" | "2dppx" | "3dppx" | "4dppx" | "5dppx" | "6dppx" | "7dppx" | "8dppx" | "9dppx" | "10dppx";
/**
 * The `IResolutionMath` interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types. This interface is implemented by the [[Resolution]] object.
 */
export interface IResolutionMath extends INumericMath<CssResolution, ResolutionUnits> {
}
/** Units of frequency */
export declare type FrequencyUnits = "Hz" | "kHz";
/** Proxy interface that represents values of the `<frequency>` CSS type */
export interface IFrequencyProxy extends IGenericProxy<FrequencyUnits> {
}
/** Type for single style property of the `<frequency>` CSS type */
export declare type CssFrequency = number | IFrequencyProxy;
/**
 * The `IFrequencyMath` interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types. This interface is implemented by the [[Frequency]] object.
 */
export interface IFrequencyMath extends INumericMath<CssFrequency, FrequencyUnits> {
}
/** Type for `width`, `height`, `block-size` and `inline-size` style properties */
export declare type CssSize = "auto" | "max-content" | "min-content" | "fit-content" | "stretch" | CssLength | IFitContentProxy;
/**
 * The IFitContentProxy interface represents an invocation of the CSS `fit-content()` function. It
 * is returned from the [[fitContent]] function.
 */
export interface IFitContentProxy extends IGenericProxy<"fit-content"> {
}
/**
 * Type representing a point as a two element tuple where x and y coordinates are specified using
 * the [[CssLength]] type.
 */
export declare type CssPoint = [Extended<CssLength>, Extended<CssLength>];
/** Horizontal position keywords */
export declare type HorizontalPositionKeyword = "left" | "center" | "right";
/** Type of a value specifying the horizontal position */
export declare type HorizontalPosition = HorizontalPositionKeyword | CssLength;
/** Type describing horizontal position CSS type consisting of 2 values using a tuple */
export declare type HorizontalPositionTuple = [Extended<HorizontalPositionKeyword>, Extended<CssLength>];
/** Vertical position keywords */
export declare type VerticalPositionKeyword = "top" | "center" | "bottom";
/** Type of a value specifying the vertical position */
export declare type VerticalPosition = VerticalPositionKeyword | CssLength;
/** Type describing vertical position CSS type consisting of 2 values using a tuple */
export declare type VerticalPositionTuple = [Extended<VerticalPositionKeyword>, Extended<CssLength>];
/** Type describing `<position-x>` CSS type consisting of up to 2 values */
export declare type CssPositionX = HorizontalPosition | HorizontalPositionTuple;
/** Type describing multiple `<position-x>` CSS types consisting of up to 2 values */
export declare type CssMultiPositionX = CssPositionX | ([Extended<HorizontalPosition>] | Extended<HorizontalPositionTuple>)[];
/** Type describing `<position-y>` CSS type consisting of up to 2 values */
export declare type CssPositionY = VerticalPosition | VerticalPositionTuple;
/** Type describing multiple `<position-y>` CSS types consisting of up to 2 values */
export declare type CssMultiPositionY = CssPositionY | ([Extended<VerticalPosition>] | Extended<VerticalPositionTuple>)[];
/** Type describing a single item in the `<position>` CSS type */
export declare type CssPositionItem = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength;
/** Type describing `<position>` CSS type consisting of 1 to 4 values using touples */
export declare type CssPositionTuple = [
    Extended<HorizontalPosition>,
    Extended<VerticalPosition>
] | [
    Extended<VerticalPosition>,
    Extended<HorizontalPosition>
] | [
    Extended<HorizontalPositionKeyword>,
    Extended<VerticalPositionKeyword>,
    Extended<CssLength>
] | [
    Extended<HorizontalPositionKeyword>,
    Extended<CssLength>,
    Extended<VerticalPositionKeyword>,
    Extended<CssLength>?
] | [
    Extended<VerticalPositionKeyword>,
    Extended<HorizontalPositionKeyword>,
    Extended<CssLength>
] | [
    Extended<VerticalPositionKeyword>,
    Extended<CssLength>,
    Extended<HorizontalPositionKeyword>,
    Extended<CssLength>?
];
/** Type describing `<position>` CSS type consisting of up to 4 values */
export declare type CssPosition = CssPositionItem | CssPositionTuple;
/** Type describing multiple `<position>` CSS types consisting of up to 4 values */
export declare type CssMultiPosition = CssPosition | ([Extended<CssPositionItem>] | Extended<CssPositionTuple>)[];
/** Type for a single corner radius */
export declare type CssRadius = OneOrPair<CssLength>;
/** Type for border-radius style property */
export declare type BorderRadiusItem = [Extended<CssLength>, Extended<CssLength>?, Extended<CssLength>?, Extended<CssLength>?];
/** Type for border-radius style property */
export declare type BorderRadius = OneOrBox<CssLength> | [BorderRadiusItem, BorderRadiusItem];
/**
 * The IAspectRatioProxy interface represents an invocation of the [[ratio]] function.
 */
export interface IAspectRatioProxy extends IGenericProxy<"aspect-ratio"> {
}
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
export declare type CssAspectRatio = CssNumber | IAspectRatioProxy | "1/1" | "4/3" | "16/9" | "185/100" | "239/100";
/**
 * The `IRectProxy` interface represents an invocation of the [[rect]] function used for the `clip`
 * style property.
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export interface IRectProxy extends IGenericProxy<"rect"> {
}
//# sourceMappingURL=NumericTypes.d.ts.map