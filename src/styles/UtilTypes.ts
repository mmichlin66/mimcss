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
 * Style values that can be used for any CSS property.
 */
export type Global_StyleType = "inherit" | "initial" | "unset" | "revert";



/**
 * The IGenericProxy interface represents a callable interface implemented using functions that
 * accept an optional parameter of a generic type and return a string. This interface is used as a
 * base for proxy interfaces defining types acceptable by certain style properties. The type
 * parameter helps differentiate these interfaces so that functions that can be assigned to one
 * type of style properties (e.g. "transform") cannot be assigned to an incompatible style property
 * (e.g. clip-path).
 */
export interface IGenericProxy<T extends string>
{
    (p?: T): string;
}



/**
 * The IStringProxy interface represents a function that returns a string. This function is part
 * of type definition for all CSS properties - even for those that don't have `string` as part of
 * their type.
 * 
 * This function is returned from the `raw()` function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from some external calculations.
 */
export interface IStringProxy extends IGenericProxy<"string"> {}



/**
 * The ICustomVar interface represents a CSS custom property object with values of the given type.
 * This interface is needed because every style property can accept value in the form of the var()
 * CSS function.
 */
export interface ICustomVar<T = any>
{
	/**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	setValue( value: T, important?: boolean, schedulerType?: number): void;
}



/**
 * Type that extends the given type with the following types:
 * - ICustomVar interface that allows using a CSS custom property.
 * - IStringProxy interface that allows specifying raw string value.
 */
export type Extended<T> = T | ICustomVar<T> | IStringProxy | undefined;



/**
 * Type that encapsulates the type of property in an object with a single "!" property. This
 * type is used to indicate that the property value must be flagged as "!important".
 */
export type ImportantProp<T> = { "!": Extended<T> };



/**
 * The ExtendedProp extends the given generic type with the following elements:
 * - Object with a single property "!", which is used to mark a property as "!important".
 * - Global_StyleType, which allows any property to be assigned the global values such as
 *   "initial", "inherit", "unset" and "revert".
 */
export type ExtendedProp<T> = Extended<T> | ImportantProp<T> | Global_StyleType;



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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Numeric types as a basis for handling CSS <number>, <length>, <angle>, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for single numeric style property */
export type NumberBase<T extends string> = number | string | IGenericProxy<T>;

/** Type for multi-part numeric style property */
export type MultiNumberBase<T extends string> = OneOrMany<NumberBase<T>>;



/**
 * The INumberBaseMath interface contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number type, they are converted
 * to strings using the `numberToString` method.
 */
export interface INumberBaseMath<T extends string>
{
    /** Creates property value using the CSS min() function. */
    min( ...params: Extended<NumberBase<T>>[]): IGenericProxy<T>;

    /** Creates property value using the CSS max() function. */
    max( ...params: Extended<NumberBase<T>>[]): IGenericProxy<T>;

    /** Creates property value using the CSS clamp() function. */
    clamp( min: Extended<NumberBase<T>>, pref: Extended<NumberBase<T>>, max: Extended<NumberBase<T>>): IGenericProxy<T>;

    /**
     * Creates property value using the CSS calc() function. This method is a tag function and must
     * be invoked with a template string without parentheses.
     */
    calc( formulaParts: TemplateStringsArray, ...params: Extended<NumberBase<T>>[]): IGenericProxy<T>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<number>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Unique string literal that distinguishes the Number type from other numeric types */
export type NumberType = "Number";

/** Type for single style property of the `<number>` CSS type - note that it exludes `string` */
export type CssNumber = Exclude<NumberBase<NumberType>,string>;

/** Type for multi-part style property of the `<number>` CSS type */
export type CssMultiNumber = OneOrMany<CssNumber>;

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface INumberProxy extends IGenericProxy<NumberType> {};

/**
 * The ICssNumberMath interface contains methods that implement CSS mathematic functions on the
 * `<number>` CSS types.
 */
export interface ICssNumberMath extends INumberBaseMath<NumberType> {}



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

/** Proxy interface that represents values of the `<percent>` CSS type */
export interface IPercentProxy extends IGenericProxy<PercentType> {};

/**
 * The ICssPercentMath interface contains methods that implement CSS mathematic functions on the
 * `<percent>` CSS types.
 */
export interface ICssPercentMath extends INumberBaseMath<PercentType>
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

/** Unique string literal that distinguishes the Length type from other numeric types */
export type LengthType = "Length" | PercentType;

/** Type for single style property of the `<length>` CSS type */
export type CssLength = NumberBase<LengthType>;

/** Type for multi-part style property of the `<length>` CSS type */
export type CssMultiLength = OneOrMany<CssLength>;

/** Type for 1-to-2-part style property of the `<length>` CSS type */
export type CssLengthPair = OneOrPair<CssLength>;

/** Type for 1-to-4-part style property of the `<length>` CSS type */
export type CssLengthBox = OneOrBox<CssLength>;

/** Proxy interface that represents values of the `<length>` CSS type */
export interface ILengthProxy extends IGenericProxy<LengthType> {};

/**
 * The ICssLengthMath interface contains methods that implement CSS mathematic functions on the
 * `<length>` CSS types.
 */
export interface ICssLengthMath extends INumberBaseMath<LengthType>
{
    /** Creates property value using the CSS minmax() function. */
    minmax( min: Extended<CssLength>, max: Extended<CssLength>): ILengthProxy;
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

/** Proxy interface that represents values of the `<angle>` CSS type */
export interface IAngleProxy extends IGenericProxy<AngleType> {};

/**
 * The ICssAngleMath interface contains methods that implement CSS mathematic functions on the
 * `<angle>` CSS types.
 */
export interface ICssAngleMath extends INumberBaseMath<AngleType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<time>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Unique string literal that distinguishes the Time type from other numeric types */
export type TimeType = "Time";

/** Type for single style property of the `<time>` CSS type */
export type CssTime = NumberBase<TimeType>;

/** Type for multi-part style property of the `<time>` CSS type */
export type CssMultiTime = OneOrMany<CssTime>;

/** Proxy interface that represents values of the `<time>` CSS type*/
export interface ITimeProxy extends IGenericProxy<TimeType> {};

/**
 * The ICssTimeMath interface contains methods that implement CSS mathematic functions on the
 * `<time>` CSS types.
 */
export interface ICssTimeMath extends INumberBaseMath<TimeType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<resolution>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Unique string literal that distinguishes the Resolution type from other numeric types */
export type ResolutionType = "Resolution";

/** Type for single style property of the `<resolution>` CSS type */
export type CssResolution = NumberBase<ResolutionType>;

/** Type for multi-part style property of the `<resolution>` CSS type */
export type CssMultiResolution = OneOrMany<CssResolution>;

/** Proxy interface that represents values of the `<resolution>` CSS type */
export interface IResolutionProxy extends IGenericProxy<ResolutionType> {};

/**
 * The ICssResolutionMath interface contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS types.
 */
export interface ICssResolutionMath extends INumberBaseMath<ResolutionType>
{
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS `<frequency>` type.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Unique string literal that distinguishes the Frequency type from other numeric types */
export type FrequencyType = "Frequency";

/** Type for single style property of the `<frequency>` CSS type */
export type CssFrequency = NumberBase<FrequencyType>;

/** Type for multi-part style property of the `<frequency>` CSS type */
export type CssMultiFrequency = OneOrMany<CssFrequency>;

/** Proxy interface that represents values of the `<frequency>` CSS type */
export interface IFrequencyProxy extends IGenericProxy<FrequencyType> {};

/**
 * The ICssFrequencyMath interface contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS types.
 */
export interface ICssFrequencyMath extends INumberBaseMath<FrequencyType>
{
}



/**
 * Type representing a point using x and y coordinates.
 */
export type CssPoint = [Extended<CssLength>, Extended<CssLength>];



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
export type SimpleCssPosition = HorizontalPositionKeyword | VerticalPositionKeyword | Extended<CssLength> |
    [HorizontalPositionKeyword | Extended<CssLength>, VerticalPositionKeyword | Extended<CssLength>];

/** Type describing the full up to 4 values `<position>` CSS type */
export type CssPosition = SimpleCssPosition | 
    [HorizontalPositionKeyword, Extended<CssLength>, VerticalPositionKeyword] |
    [HorizontalPositionKeyword, VerticalPositionKeyword, Extended<CssLength>] |
    [HorizontalPositionKeyword, Extended<CssLength>, VerticalPositionKeyword, Extended<CssLength>];

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
 * The IUrlProxy function represents an invocation of the CSS url() function.
 */
export interface IUrlProxy extends IGenericProxy<"url"> {};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// attr() function support
//
///////////////////////////////////////////////////////////////////////////////////////////////////

export type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" | "angle" | "time" | "frequency";

export type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;



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



