/**
 * This file contains basic types and functions used to define CSS property types.
 * 
 * All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"red" | "green" | ...` for the
 * color) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"red" | "green" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The IValueProxy
 * can be used instead of string and this solves the Intellisense issue.
 * 
 * Another benefit of using objects implementing the IValueProxy interface is that they are
 * constructed at one point but the string generation occurs at another time. This allows
 * using these objects in the style definition classes. They can reference objects like
 * IVarRule that are not fully initialized yet. However, when the styles should be inserted
 * into DOM the initialization will have already occurred and the valueToString method will
 * return a correct string.
 * 
 * Note that the IXxxProxy interfaces have a property or method that distinguishes them from
 * other proxy interface. This is because we want to distinguish between different CSS types,
 * so that a function used for one CSS type cannot be used for a different CSS type. For
 * example, the `calc()` function returns the INumberProxy interface, while the
 * `linearIngradient()` function returns the IImageProxy interface. Thus you cannot use the
 * 'calc()` function for image-based CSS properties and vice versa.
 */



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IStringProxy interface represents an object that can be assigned to any CSS property. This
 * This interface is part of type definition for all CSS properties - even for those that don't
 * have `string` as part of their type. 
 * 
 * This interface is returned from the `raw()` function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from some external calculations.
 */
export interface IStringProxy
{
    /** Flag indicating that this object implements the IStringProxy interface */
    readonly isStringProxy: boolean;
}



/**
 * Style values that can be used for (almost) any CSS property.
 */
export type Base_StyleType = "inherit" | "initial" | "unset" | "revert" | IStringProxy | null | undefined;



/**
 * The IVarProxy interface represents a CSS custom property object with values of the given type.
 * we need this interface because every style property can accept value in the form of var()
 * CSS function.
 */
export interface IVarProxy<T = any>
{
	setValue( value: T, important?: boolean): void;
}



/**
 * Type that extends the given type with the following types:
 * - basic style values that are valid for all style properties.
 * - IStringProxy type that allows specifying raw string value.
 * - IVarProxy object that allows using a CSS custom property.
 */
export type Extended<T> = T | Base_StyleType | IVarProxy<T>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for pair-like property that can have 1 to 2 values of the given type */
export type OneOrPair<T> = T | [Extended<T>, Extended<T>];

/** Type for box-like property that can have 1 to 4 values of the given type */
export type OneOrBox<T> = T | [Extended<T>, Extended<T>, Extended<T>?, Extended<T>?];

/** Type for a property that can have 1 or more values of the given type */
export type OneOrMany<T> = T | Extended<T>[];

/** Type for a property that can have 1 or more values of the given type */
export type Many<T> = Extended<T>[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Numeric types as a baseis for handling CSS <number>. <length>, <angle>, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The INumberProxy interface represents a string proxy object whose string value can be assigned
 * to properties of the CSS numeric types. This interface is returned from functions like min(),
 * max() and calc().
 */
export interface INumberProxy<T extends string = null>
{
    /**
     * Returns true - needed only to indicate that this object implements the INumerProxy interface
     * for a given type
     */
    isNumberProxy( o: T): boolean;
}



/** Type for single numeric style property */
export type NumberBase<T extends string = null> = number | string | INumberProxy<T>;

/** Type for multi-part numeric style property */
export type MultiNumberBase<T extends string = null> = OneOrMany<NumberBase<T>>;



/**
 * The INummberMath interface contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number type, they are converted
 * to strings by calling a function specified in the constructor.
 */
export interface INumberMath<T extends string = null>
{
    /** Converts number to string appending necessary unit suffixes */
    numberToString: ( n: number) => string;

    /** Converts single numeric style value to string appending necessary unit suffixes */
    styleToString: ( val: Extended<NumberBase<T>>) => string;

    /** Converts multiple numeric style value to string appending necessary unit suffixes */
    multiStyleToString: ( val: Extended<MultiNumberBase<T>>, separator: string) => string;

    /** Creates property value of using the CSS min() function. */
    min( ...params: Extended<NumberBase<T>>[]): INumberProxy<T>;

    /** Creates property value using the CSS max() function. */
    max( ...params: Extended<NumberBase<T>>[]): INumberProxy<T>;

    /** Creates property value using the CSS clamp() function. */
    clamp( min: Extended<NumberBase<T>>, pref: Extended<NumberBase<T>>, max: Extended<NumberBase<T>>): INumberProxy<T>;

    /**
     * Creates property value using the CSS calc() function. This function accepts a formular
     * string and an arbitrary number of parameters. The formular string can contain placeholders
     * that will be replaced by the parameters. Placeholders have the following format:
     * 
     * ```
     * {<index> [| <unit>]}
     * ```
     * The `<index>` token is a zero-based index in the parameter array. The optional `<unit>` token is
     * a measurement unit (length, percent, angle, etc.) and is used if the corresponding parameter
     * is a number.
     * 
     * ```typescript
     * class MyStyles
     * {
     *     wallGap = $var( "width", 16);
     *     myClass = $class({ maxWidth: Len.calc("100% - 2*{0}", this.wallGap)})
     * }
     * ```
     * @param formula 
     * @param params 
     */
    calc( formula: string, ...params: Extended<NumberBase<T>>[]): INumberProxy<T>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for single style property of the `<number>` CSS type*/
export type CssNumber = NumberBase<"Number">;

/** Type for multi-part style property of the `<number>` CSS type*/
export type CssMultiNumber = OneOrMany<CssNumber>;

/** Type for 1-to-four-part style property of the `<number>` CSS type*/
export type CssNumberBox = OneOrBox<CssNumber>;

/**
 * The ICssNumberMath interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types.
 */
export interface ICssNumberMath extends INumberMath<"Number"> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<length>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin";

/** Type for single style property of the `<length>` CSS type*/
export type CssLength = NumberBase<"Length" | "Percent">;

/** Type for multi-part style property of the `<length>` CSS type*/
export type CssMultiLength = OneOrMany<CssLength>;

/** Type for 1-to-four-part style property of the `<length>` CSS type*/
export type CssLengthBox = OneOrBox<CssLength>;

/** Proxy type that represents values of the `<length>` CSS type*/
export interface ILengthProxy extends INumberProxy<"Length" | "Percent"> {}

/**
 * The ICssLengthMath interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types.
 */
export interface ICssLengthMath extends INumberMath<"Length" | "Percent">
{
    /** Creates length value in quaters of an inch */
    Q( n: number): ILengthProxy;

    /** Creates length value in ch units */
    ch( n: number): ILengthProxy;

    /** Creates length value in cantimeters */
    cm( n: number): ILengthProxy;

    /** Creates length value in calculated font-sizes of the element */
    em( n: number): ILengthProxy;

    /** Creates length value in heights of lowercase letter 'x' in the font */
    ex( n: number): ILengthProxy;

    /** Creates length value in ic units */
    ic( n: number): ILengthProxy;

    /** Creates length value in inches */
    in( n: number): ILengthProxy;

    /** Creates length value in line-heights of the element */
    lh( n: number): ILengthProxy;

    /** Creates length value in millimeters */
    mm( n: number): ILengthProxy;

    /** Creates length value in picas */
    pc( n: number): ILengthProxy;

    /** Creates length value in points */
    pt( n: number): ILengthProxy;

    /** Creates length value in pixels */
    px( n: number): ILengthProxy;

    /** Creates length value in 1% of the size of the initial containing block, in the direction
     * of the root element’s block axis */
    vb( n: number): ILengthProxy;

    /** Creates length value in 1% of the height of the viewport's initial containing block */
    vh( n: number): ILengthProxy;

    /** Creates length value in 1% of the size of the initial containing block, in the direction
     * of the root element’s inline axis */
    vi( n: number): ILengthProxy;

    /** Creates length value in 1% of the width of the viewport's initial containing block */
    vw( n: number): ILengthProxy;

    /** Creates length value in fontsizes of the root element (<html>) */
    rem( n: number): ILengthProxy;

    /** Creates length value in line-heights of the root element (<html>) */
    rlh( n: number): ILengthProxy;

    /** Creates length value in the units which are a smaller value between vw and vh */
    vmax( n: number): ILengthProxy;

    /** Creates length value in the units which are a larger value between vw and vh */
    vmin( n: number): ILengthProxy;
}


                
///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<angle>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Type for single style property of the `<angle>` CSS type*/
export type CssAngle = NumberBase<"Angle" | "Percent">;

/** Type for multi-part style property of the `<angle>` CSS type*/
export type CssMultiAngle = OneOrMany<CssAngle>;

/** Type for 1-to-four-part style property of the `<angle>` CSS type*/
export type CssAngleBox = OneOrBox<CssAngle>;

/** Proxy type that represents values of the `<angle>` CSS type*/
export interface IAngleProxy extends INumberProxy<"Angle" | "Percent"> {}

/**
 * The ICssAngleMath interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types.
 */
export interface ICssAngleMath extends INumberMath<"Angle" | "Percent">
{
    /** Creates angle value in degrees */
     deg( n: number): IAngleProxy;

    /** Creates angle value in radians */
    rad( n: number): IAngleProxy;

    /** Creates angle value in gradians */
    grad( n: number): IAngleProxy;

    /** Creates angle value in turns */
    turn( n: number): IAngleProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Type for single style property of the `<time>` CSS type*/
export type CssTime = NumberBase<"Time" | "Percent">;

/** Type for multi-part style property of the `<time>` CSS type*/
export type CssMultiTime = OneOrMany<CssTime>;

/** Type for 1-to-four-part style property of the `<time>` CSS type*/
export type CssTimeBox = OneOrBox<CssTime>;

/** Proxy type that represents values of the `<time>` CSS type*/
export interface ITimeProxy extends INumberProxy<"Time" | "Percent"> {}

/**
 * The ICssTimeMath interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types.
 */
export interface ICssTimeMath extends INumberMath<"Time" | "Percent">
{
    /** Creates frequency value in milliseconds */
    ms( n: number): ITimeProxy;

    /** Creates frequency value in seconds */
    s( n: number): ITimeProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<resolution>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Type for single style property of the `<resolution>` CSS type*/
export type CssResolution = NumberBase<"Resolution" | "Percent">;

/** Type for multi-part style property of the `<resolution>` CSS type*/
export type CssMultiResolution = OneOrMany<CssResolution>;

/** Type for 1-to-four-part style property of the `<resolution>` CSS type*/
export type CssResolutionBox = OneOrBox<CssResolution>;

/** Proxy type that represents values of the `<resolution>` CSS type*/
export interface IResolutionProxy extends INumberProxy<"Resolution" | "Percent"> {}

/**
 * The ICssResolutionMath interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types.
 */
export interface ICssResolutionMath extends INumberMath<"Resolution" | "Percent">
{
    /** Creates resolution value in DPI */
    dpi( n: number): IResolutionProxy;

    /** Creates resolution value in DPCM */
    dpcm( n: number): IResolutionProxy;

    /** Creates resolution value in DPPX */
    dppx( n: number): IResolutionProxy;

    /** Creates resolution value in X */
    x( n: number): IResolutionProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<frequency>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Type for single style property of the `<frequency>` CSS type*/
export type CssFrequency = NumberBase<"Frequency" | "Percent">;

/** Type for multi-part style property of the `<frequency>` CSS type*/
export type CssMultiFrequency = OneOrMany<CssFrequency>;

/** Type for 1-to-four-part style property of the `<frequency>` CSS type*/
export type CssFrequencyBox = OneOrBox<CssFrequency>;

/** Proxy type that represents values of the `<frequency>` CSS type*/
export interface IFrequencyProxy extends INumberProxy<"Frequency" | "Percent"> {}

/**
 * The ICssFrequencyMath interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types.
 */
export interface ICssFrequencyMath extends INumberMath<"Frequency" | "Percent">
{
    /** Creates frequency value in Hertz */
    hz( n: number): IFrequencyProxy

    /** Creates frequency value in Kilo-Hertz */
    khz( n: number): IFrequencyProxy
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of fractions (for flex and grid layouts) */
export type FractionUnits = "fr";

/** Type for single style property of the `<fraction>` CSS type*/
export type CssFraction = NumberBase<"Fraction" | "Percent">;

/** Type for multi-part style property of the `<fraction>` CSS type*/
export type CssMultiFraction = OneOrMany<CssFraction>;

/** Type for 1-to-four-part style property of the `<fraction>` CSS type*/
export type CssFractionBox = OneOrBox<CssFraction>;

/** Proxy type that represents values of the `<fraction>` CSS type*/
export interface IFractionProxy extends INumberProxy<"Fraction" | "Percent"> {}

/**
 * The IFractionMath interface contains methods that implement CSS mathematic functions on the
 * `<fraction>` CSS types.
 */
export interface ICssFractionMath extends INumberMath<"Fraction" | "Percent">
{
    /** Creates property value using the CSS minmax() function. */
    minmax( min: Extended<CssFraction>, max: Extended<CssFraction>): INumberProxy<"Fraction" | "Percent">;

    /** Creates fraction value for flex */
    fr( n: number): IFractionProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of percent */
export type PercentUnits = "%";

/** Type for single style property of the `<percent>` CSS type*/
export type CssPercent = NumberBase<"Percent">;

/** Type for multi-part style property of the `<percent>` CSS type*/
export type CssMultiPercent = OneOrMany<CssPercent>;

/** Type for 1-to-four-part style property of the `<percent>` CSS type*/
export type CssPercentBox = OneOrBox<CssPercent>;

/** Proxy type that represents values of the `<percent>` CSS type*/
export interface IPercentProxy extends INumberProxy<"Percent"> {}

/**
 * The IFractionMath interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types.
 */
export interface ICssPercentMath extends INumberMath<"Percent">
{
    /**
     * Converts the given number to a percent string. Numbers between -1 and 1 are multiplyed by 100.
     */
    percent( n: number): IPercentProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type describing the horizontal position */
export type HorizontalPositionKeyword = "left" | "center" | "right";

/** Type describing the horizontal position */
export type VerticalPositionKeyword = "top" | "center" | "bottom";

/** Type describing a simple 1 or two values `<position>` CSS type */
export type SimpleCssPosition = HorizontalPositionKeyword | VerticalPositionKeyword | Extended<CssNumber> |
    [HorizontalPositionKeyword | Extended<CssNumber>, VerticalPositionKeyword | Extended<CssNumber>];

/** Type describing the full up to 4 values `<position>` CSS type */
export type CssPosition = SimpleCssPosition | 
    [HorizontalPositionKeyword, Extended<CssNumber>, VerticalPositionKeyword] |
    [HorizontalPositionKeyword, VerticalPositionKeyword, Extended<CssNumber>] |
    [HorizontalPositionKeyword, Extended<CssNumber>, VerticalPositionKeyword, Extended<CssNumber>];

/** Type describing multiple `<position>` CSS types */
export type MultiCssPosition = Extended<CssPosition>[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Radius
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for a single corner radius */
export type CssRadius = OneOrPair<CssLength>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// URLs.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IUrlProxy interface represents an invocation of the CSS url() function.
 */
export interface IUrlProxy
{
    /** Flag indicating that this object implements the IUrlProxy interface */
    readonly isUrlProxy: boolean;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Web Namespaces.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The WebNamespaces class contains identifiers for the known Web-related namespaces.
 */
export abstract class WebNamespaces
{
	static readonly HTML = "http://www.w3.org/1999/xhtml";
	static readonly SVG = "http://www.w3.org/2000/svg";
	static readonly XLink = "http://www.w3.org/1999/xlink";
	static readonly XML = "http://www.w3.org/XML/1998/namespace";
	static readonly XMLNS = "http://www.w3.org/2000/xmlns/";
	static readonly MathML = "http://www.w3.org/1998/Math/MathML";
}



