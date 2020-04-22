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
 * Another benefit of using functions is that they are
 * constructed at one time but the string generation occurs at another time. This allows
 * using these objects in the style definition classes. They can reference objects like
 * IVarRule that are not fully initialized yet. However, when the styles should be inserted
 * into DOM the initialization will have already occurred and the function will
 * return a correct string.
 * 
 * Note that the proxy functions have a parameter that distinguishes them from
 * other proxy functions. This is because we want to distinguish between different CSS types,
 * so that a function used for one CSS type cannot be used for a different CSS type. For
 * example, the `calc()` function returns the NumberProxy function, while the
 * `linearIngradient()` function returns the ImageProxy function. Thus you cannot use the
 * 'calc()` function for image-based CSS properties and vice versa.
 */



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The StringProxy type represents a function that returns a string. This function is part of type
 * definition for all CSS properties - even for those that don't have `string` as part of their
 * type.
 * 
 * This function is returned from the `raw()` function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from some external calculations.
 */
export type StringProxy = (p?: "string") => string;



/**
 * Style values that can be used for (almost) any CSS property.
 */
export type Base_StyleType = "inherit" | "initial" | "unset" | "revert" | StringProxy | null | undefined;



/**
 * The IVarProxy interface represents a CSS custom property object with values of the given type.
 * we need this interface because every style property can accept value in the form of var()
 * CSS function.
 */
export interface IVarProxy<T = any>
{
	/**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	setValue( value: T, important?: boolean): void;
}



/**
 * Type that extends the given type with the following types:
 * - basic style values that are valid for all style properties.
 * - StringProxy type that allows specifying raw string value.
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
 * The INumberProxy function represents a string value can be assigned to properties of the CSS
 * numeric types. This function is returned from functions like min(), max() and calc().
 */
export type NumberProxy<T extends string> = (p?: T) => string;

/** Type for single numeric style property */
export type NumberBase<T extends string> = number | string | NumberProxy<T>;

/** Type for multi-part numeric style property */
export type MultiNumberBase<T extends string> = OneOrMany<NumberBase<T>>;



/**
 * The INummberMath interface contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number type, they are converted
 * to strings by calling a function specified in the constructor.
 */
export interface INumberMath<T extends string>
{
    /** Converts number to string appending necessary unit suffixes */
    numberToString: ( n: number) => string;

    /** Converts single numeric style value to string appending necessary unit suffixes */
    styleToString: ( val: Extended<NumberBase<T>>) => string;

    /** Converts multiple numeric style value to string appending necessary unit suffixes */
    multiStyleToString: ( val: Extended<MultiNumberBase<T>>, separator: string) => string;

    /** Creates property value of using the CSS min() function. */
    min( ...params: Extended<NumberBase<T>>[]): NumberProxy<T>;

    /** Creates property value using the CSS max() function. */
    max( ...params: Extended<NumberBase<T>>[]): NumberProxy<T>;

    /** Creates property value using the CSS clamp() function. */
    clamp( min: Extended<NumberBase<T>>, pref: Extended<NumberBase<T>>, max: Extended<NumberBase<T>>): NumberProxy<T>;

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
    calc( formula: string, ...params: Extended<NumberBase<T>>[]): NumberProxy<T>;

    /**
     * Converts the given number into percents. Values between -1.0 and 1.0 non-inclusive are
     * multiplied by 100.
     */
    percent( n: number): NumberProxy<T>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Number type from other numeric types */
export type NumberType = "Number";

/** Type for single style property of the `<number>` CSS type*/
export type CssNumber = NumberBase<NumberType>;

/** Type for multi-part style property of the `<number>` CSS type*/
export type CssMultiNumber = OneOrMany<CssNumber>;

/** Type for 1-to-four-part style property of the `<number>` CSS type*/
export type CssNumberBox = OneOrBox<CssNumber>;

/**
 * The ICssNumberMath interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types.
 */
export interface ICssNumberMath extends INumberMath<NumberType> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of percent */
export type PercentUnits = "%";

/** Unique string literal that distinguishes the Percent type from other numeric types */
export type PercentType = "Percent";

/** Type for single style property of the `<percent>` CSS type */
export type CssPercent = NumberBase<PercentType>;

/** Type for multi-part style property of the `<percent>` CSS type */
export type CssMultiPercent = OneOrMany<CssPercent>;

/** Type for 1-to-four-part style property of the `<percent>` CSS type */
export type CssPercentBox = OneOrBox<CssPercent>;

/** Proxy type that represents values of the `<percent>` CSS type */
export type PercentProxy = NumberProxy<PercentType>;

/**
 * The IFractionMath interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types.
 */
export interface ICssPercentMath extends INumberMath<PercentType>
{
    /**
     * Converts the given number to a percent string. Numbers between -1 and 1 are multiplyed by 100.
     */
    percent( n: number): PercentProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<length>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin";

/** Unique string literal that distinguishes the Length type from other numeric types */
export type LengthType = "Length" | PercentType;

/** Type for single style property of the `<length>` CSS type */
export type CssLength = NumberBase<LengthType>;

/** Type for multi-part style property of the `<length>` CSS type */
export type CssMultiLength = OneOrMany<CssLength>;

/** Type for 1-to-four-part style property of the `<length>` CSS type */
export type CssLengthBox = OneOrBox<CssLength>;

/** Proxy type that represents values of the `<length>` CSS type */
export type LengthProxy = NumberProxy<LengthType>;

/**
 * The ICssLengthMath interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types.
 */
export interface ICssLengthMath extends INumberMath<LengthType>
{
    /** Creates length value in quaters of an inch */
    Q( n: number): LengthProxy;

    /** Creates length value in ch units */
    ch( n: number): LengthProxy;

    /** Creates length value in cantimeters */
    cm( n: number): LengthProxy;

    /** Creates length value in calculated font-sizes of the element */
    em( n: number): LengthProxy;

    /** Creates length value in heights of lowercase letter 'x' in the font */
    ex( n: number): LengthProxy;

    /** Creates length value in ic units */
    ic( n: number): LengthProxy;

    /** Creates length value in inches */
    in( n: number): LengthProxy;

    /** Creates length value in line-heights of the element */
    lh( n: number): LengthProxy;

    /** Creates length value in millimeters */
    mm( n: number): LengthProxy;

    /** Creates length value in picas */
    pc( n: number): LengthProxy;

    /** Creates length value in points */
    pt( n: number): LengthProxy;

    /** Creates length value in pixels */
    px( n: number): LengthProxy;

    /** Creates length value in 1% of the size of the initial containing block, in the direction
     * of the root element’s block axis */
    vb( n: number): LengthProxy;

    /** Creates length value in 1% of the height of the viewport's initial containing block */
    vh( n: number): LengthProxy;

    /** Creates length value in 1% of the size of the initial containing block, in the direction
     * of the root element’s inline axis */
    vi( n: number): LengthProxy;

    /** Creates length value in 1% of the width of the viewport's initial containing block */
    vw( n: number): LengthProxy;

    /** Creates length value in fontsizes of the root element (<html>) */
    rem( n: number): LengthProxy;

    /** Creates length value in line-heights of the root element (<html>) */
    rlh( n: number): LengthProxy;

    /** Creates length value in the units which are a smaller value between vw and vh */
    vmax( n: number): LengthProxy;

    /** Creates length value in the units which are a larger value between vw and vh */
    vmin( n: number): LengthProxy;
}


                
///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<angle>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Unique string literal that distinguishes the Angle type from other numeric types */
export type AngleType = "Angle" | PercentType;

/** Type for single style property of the `<angle>` CSS type */
export type CssAngle = NumberBase<AngleType>;

/** Type for multi-part style property of the `<angle>` CSS type */
export type CssMultiAngle = OneOrMany<CssAngle>;

/** Type for 1-to-four-part style property of the `<angle>` CSS type */
export type CssAngleBox = OneOrBox<CssAngle>;

/** Proxy type that represents values of the `<angle>` CSS type */
export type AngleProxy = NumberProxy<AngleType>;

/**
 * The ICssAngleMath interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types.
 */
export interface ICssAngleMath extends INumberMath<AngleType>
{
    /** Creates angle value in degrees */
     deg( n: number): AngleProxy;

    /** Creates angle value in radians */
    rad( n: number): AngleProxy;

    /** Creates angle value in gradians */
    grad( n: number): AngleProxy;

    /** Creates angle value in turns */
    turn( n: number): AngleProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Unique string literal that distinguishes the Time type from other numeric types */
export type TimeType = "Time" | PercentType;

/** Type for single style property of the `<time>` CSS type */
export type CssTime = NumberBase<TimeType>;

/** Type for multi-part style property of the `<time>` CSS type */
export type CssMultiTime = OneOrMany<CssTime>;

/** Type for 1-to-four-part style property of the `<time>` CSS type */
export type CssTimeBox = OneOrBox<CssTime>;

/** Proxy type that represents values of the `<time>` CSS type*/
export type TimeProxy = NumberProxy<TimeType>;

/**
 * The ICssTimeMath interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types.
 */
export interface ICssTimeMath extends INumberMath<TimeType>
{
    /** Creates frequency value in milliseconds */
    ms( n: number): TimeProxy;

    /** Creates frequency value in seconds */
    s( n: number): TimeProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<resolution>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Unique string literal that distinguishes the Resolution type from other numeric types */
export type ResolutionType = "Resolution" | PercentType;

/** Type for single style property of the `<resolution>` CSS type */
export type CssResolution = NumberBase<ResolutionType>;

/** Type for multi-part style property of the `<resolution>` CSS type */
export type CssMultiResolution = OneOrMany<CssResolution>;

/** Type for 1-to-four-part style property of the `<resolution>` CSS type */
export type CssResolutionBox = OneOrBox<CssResolution>;

/** Proxy type that represents values of the `<resolution>` CSS type */
export type ResolutionProxy = NumberProxy<ResolutionType>;

/**
 * The ICssResolutionMath interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types.
 */
export interface ICssResolutionMath extends INumberMath<ResolutionType>
{
    /** Creates resolution value in DPI */
    dpi( n: number): ResolutionProxy;

    /** Creates resolution value in DPCM */
    dpcm( n: number): ResolutionProxy;

    /** Creates resolution value in DPPX */
    dppx( n: number): ResolutionProxy;

    /** Creates resolution value in X */
    x( n: number): ResolutionProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<frequency>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Unique string literal that distinguishes the Frequency type from other numeric types */
export type FrequencyType = "Frequency" | PercentType;

/** Type for single style property of the `<frequency>` CSS type */
export type CssFrequency = NumberBase<FrequencyType>;

/** Type for multi-part style property of the `<frequency>` CSS type */
export type CssMultiFrequency = OneOrMany<CssFrequency>;

/** Type for 1-to-four-part style property of the `<frequency>` CSS type */
export type CssFrequencyBox = OneOrBox<CssFrequency>;

/** Proxy type that represents values of the `<frequency>` CSS type */
export type FrequencyProxy = NumberProxy<FrequencyType>;

/**
 * The ICssFrequencyMath interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types.
 */
export interface ICssFrequencyMath extends INumberMath<FrequencyType>
{
    /** Creates frequency value in Hertz */
    hz( n: number): FrequencyProxy

    /** Creates frequency value in Kilo-Hertz */
    khz( n: number): FrequencyProxy
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of fractions (for flex and grid layouts) */
export type FractionUnits = "fr";

/** Unique string literal that distinguishes the Fraction type from other numeric types */
export type FractionType = "Fraction" | PercentType;

/** Type for single style property of the `<fraction>` CSS type */
export type CssFraction = NumberBase<FractionType>;

/** Type for multi-part style property of the `<fraction>` CSS type */
export type CssMultiFraction = OneOrMany<CssFraction>;

/** Type for 1-to-four-part style property of the `<fraction>` CSS type */
export type CssFractionBox = OneOrBox<CssFraction>;

/** Proxy type that represents values of the `<fraction>` CSS type */
export type FractionProxy = NumberProxy<FractionType>;

/**
 * The IFractionMath interface contains methods that implement CSS mathematic functions on the
 * `<fraction>` CSS types.
 */
export interface ICssFractionMath extends INumberMath<FractionType>
{
    /** Creates property value using the CSS minmax() function. */
    minmax( min: Extended<CssFraction>, max: Extended<CssFraction>): NumberProxy<FractionType>;

    /** Creates fraction value for flex */
    fr( n: number): FractionProxy;
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
 * The UrlProxy function represents an invocation of the CSS url() function.
 */
export type UrlProxy = (p?: "url") => string;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// attr() function support
//
///////////////////////////////////////////////////////////////////////////////////////////////////

export type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" | "angle" | "time" | "frequency";

export type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;

/**
 * The AttrProxy function represents an invocation of the CSS attr() functions.
 */
export type AttrProxy = (p?: "attr") => string;



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



