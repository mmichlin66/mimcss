﻿/**
 * This file contains basic types and functions used to define CSS property types.
 */



/**
 * The IStringProxy interface represents an object that can produce a string, which is returned
 * via the valueToString() method.
 * 
 * All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"red" | "green" | ...` for the
 * color) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"red" | "green" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The IStringProxy
 * can be used instead of string (e.g. `"row" | "column" | IStringProxy`) and this solves
 * the Intellisense issue.
 * 
 * Another benefit of using objects implementing the IStringProxy interface is that they are
 * constructed at one point but the string generation occurs at another time. This allows
 * using these objects in the style definition classes. They can reference objects like
 * IVarRule that are not fully initialized yet. However, when the styles should be inserted
 * into DOM the initialization will have already occurred and the valueToString method will
 * return a correct string.
 */
export interface IStringProxy
{
    /** Converts internnally held value(s) to string */
    valueToString(): string;

    /** Flag indicating that this object implements the IStringProxy interface */
    readonly isStringProxy: boolean;
}



/**
 * Style values that can be used for (almost) any CSS property.
 */
export type Base_StyleType = "inherit" | "initial" | "unset" | "revert" | IStringProxy | null | undefined;



/**
 * The ICustomVar interface represents a CSS custom property object with values of the given type.
 * we need this interface because every style property can accept value in the form of var()
 * CSS function.
 */
export interface ICustomVar<T = any>
{
    /** Converts internnally held value(s) to string */
    valueToString(): string;

    // Type of the internally held value.
    value: T;
}



/**
 * Type that extends the given type with the following types:
 * - basic style values that are valid for all style properties.
 * - IStringProxy type that allows specifying raw string value.
 * - ICustomVar object that allows using a CSS custom property.
 */
export type Extended<T> = T | Base_StyleType | ICustomVar<Extended<T>>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for pair-like property that can have 1 to 2 values of the given type */
export type Pair<T> = T | [Extended<T>, Extended<T>];

/** Type for box-like property that can have 1 to 4 values of the given type */
export type Box<T> = T | [Extended<T>, Extended<T>, Extended<T>?, Extended<T>?];

/** Type for a roperty that can have 1 or more values of the given type */
export type OneOrMany<T> = T | Extended<T>[];



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
export interface INumberProxy
{
    /** Converts internnally held value(s) to string */
    valueToString(): string;

    /** Flag indicating that this object implements the INumerProxy interface */
    readonly isNumberProxy: boolean;
}



/** Type for single numeric style property */
export type CssNumber = number | string | INumberProxy;

/** Type for multi-part numeric style property */
export type MultiCssNumber = OneOrMany<CssNumber>;

/** Type for box style property that can have 1 to 4 numeric values */
export type NumberBox = Box<CssNumber>;



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
// Size
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for CSS size, which can be expressed as one or two values each of each is of the
 * Number_StyleType type. Two values are given as an object with 'w' (width) and 'h' (height)
 * properties.
 */
export type Size_StyleType = CssNumber | { w: CssNumber; h: CssNumber };

/** Type for multi-part size style property */
export type MultiSize_StyleType = Size_StyleType | Size_StyleType[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for CSS position, which can be expressed as one or two or 3 or 4 values.
 */
export type Position_StyleType = Extended<"center" | "left" | "right" | "top" | "bottom" | CssNumber |
                { x: "center" | "left" | "right" | CssNumber; y: "center" | "top" | "bottom" | CssNumber } |
                { xedge: string; x?: CssNumber; yedge: string; y?: CssNumber }>;

/** Type for multi-part position style property */
export type MultiPosition_StyleType = Position_StyleType | Position_StyleType[];



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
    /** Converts internnally held value(s) to string */
    valueToString(): string;

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



