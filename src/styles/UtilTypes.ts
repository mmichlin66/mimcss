/**
 * This file contains basic types and functions used to define CSS property types.
 */



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IValueProxy interface represents an object that can produce a string, which is returned
 * via the valueToString() method. This interface is used as a base for other interfaces that
 * represents different CSS types, such as `<number>`, <length>`, `<url>`, `<image>`, etc.
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
 * Note that the IValueProxy interface is never used directly when specifying property types;
 * only its derivatives are used directly. This is because we want to distinguish between
 * different CSS types, so that a function used for one CSS type cannot be used for a different
 * CSS type. For example, the `calc()` function returns the INumberProxy interface, while the
 * `linearIngradient()` function returns the IImageProxy interface. Thus you cannot use the
 * 'calc()` function for image-based CSS properties and vice versa.
 */
export interface IValueProxy
{
    /** Converts internally held value(s) to string */
    valueToString(): string;
}



/**
 * The IStringProxy interface represents an object that can be assigned to any CSS property. This
 * This interface is part of type definition for all CSS properties - even for those that don't
 * have `string` as part of their type. 
 * 
 * This interface is returned from the `raw()` function, which allows by-passing the property
 * typing rules and specifying a string directly. This might be useful, when a string value is
 * obtained from soe external calculations.
 */
export interface IStringProxy extends IValueProxy
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
export interface IVarProxy<T = any> extends IValueProxy
{
    /**
     * Returns true - this is only needed to indicate that this object implements the IVarProxy
     * interface for the given type
     */
    isVarProxy( o: T): boolean;
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

/** Type for a roperty that can have 1 or more values of the given type */
export type OneOrMany<T> = T | Extended<T>[];

/** Type for a roperty that can have 1 or more values of the given type */
export type Many<T> = Extended<T>[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Numeric types for handling CSS <number>. <length>, <angle>, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The INumberProxy interface represents a string proxy object whose string value can be assigned
 * to propertoes of the CSS numeric types. This interface is returned from functions like min(),
 * max(), calc() and others.
 */
export interface INumberProxy extends IValueProxy
{
    /** Flag indicating that this object implements the INumerProxy interface */
    readonly isNumberProxy: boolean;
}



/** Type for single numeric style property */
export type CssNumber = number | string | INumberProxy;

/** Type for multi-part numeric style property */
export type MultiCssNumber = OneOrMany<CssNumber>;

/** Type for box style property that can have 1 to 4 numeric values */
export type NumberBox = OneOrBox<CssNumber>;



/**
 * The INummberMath interface contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number type, they are converted
 * to strings by calling a function specified in the constructor.
 */
export interface INumberMath
{
    /** Converts number to string appending necessary unit suffixes */
    numberToString: ( n: number) => string;

    /** Converts single numeric style value to string appending necessary unit suffixes */
    styleToString: ( val: Extended<CssNumber>) => string;

    /** Converts multiple numeric style value to string appending necessary unit suffixes */
    multiStyleToString: ( val: Extended<MultiCssNumber>, separator: string) => string;

    /** Creates property value of using the CSS min() function. */
    min( ...params: Extended<CssNumber>[]): INumberProxy;

    /** Creates property value using the CSS max() function. */
    max( ...params: Extended<CssNumber>[]): INumberProxy;

    /** Creates property value using the CSS clamp() function. */
    clamp( min: Extended<CssNumber>, pref: Extended<CssNumber>, max: Extended<CssNumber>): INumberProxy;

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
    calc( formula: string, ...params: Extended<CssNumber>[]): INumberProxy;
}



/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin";

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of fractions (for flex and grid layouts) */
export type FractionUnits = "fr";



/**
 * The IFractionMath interface contains methods that implement CSS mathematic functions on the
 * `<fraction>` CSS types.
 */
export interface IFractionMath extends INumberMath
{
    /** Creates property value using the CSS minmax() function. */
    minmax( min: Extended<CssNumber>, max: Extended<CssNumber>): INumberProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type describing the horizontal position */
export type HorizontalKeyword = "left" | "center" | "right";

/** Type describing the horizontal position */
export type VerticalKeyword = "top" | "center" | "bottom";

/** Type describing a simple 1 or two values `<position>` CSS type */
export type SimpleCssPosition = HorizontalKeyword | VerticalKeyword | Extended<CssNumber> |
    [HorizontalKeyword | Extended<CssNumber>, VerticalKeyword | Extended<CssNumber>];

/** Type describing the full up to 4 values `<position>` CSS type */
export type CssPosition = SimpleCssPosition | 
    [HorizontalKeyword, Extended<CssNumber>, VerticalKeyword] |
    [HorizontalKeyword, VerticalKeyword, Extended<CssNumber>] |
    [HorizontalKeyword, Extended<CssNumber>, VerticalKeyword, Extended<CssNumber>];

/** Type describing multiple `<position>` CSS types */
export type MultiCssPosition = Extended<CssPosition>[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// URLs.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IUrlProxy interface represents an invocation of the CSS url() function.
 */
export interface IUrlProxy extends IValueProxy
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



