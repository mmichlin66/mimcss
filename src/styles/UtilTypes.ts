/**
 * This file contains basic types and functions used to define CSS property types.
 */

import {ICustomVar} from "../rules/RuleTypes"



/**
 * Style values that can be used for (almost) any CSS property.
 */
export type Base_StyleType = "inherit" | "initial" | "unset" | "revert" | null | undefined;



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
 * ICustomVar that are not fully initialized yet. However, when the styles should be inserted
 * into DOM the initialization will have already occurred and the valueToString method will
 * return a correct string.
 */
export interface IStringProxy
{
    valueToString(): string;
}



/**
 * Type that extends the given type with the following types:
 * - basic style values that are valid for all style properties.
 * - IStringProxy type that allows specifying raw string value.
 * - ICustomVar object that allows using a CSS custom property.
 */
export type ExtendedPropType<T> = T | Base_StyleType | IStringProxy | ICustomVar<ExtendedPropType<T>>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Numeric types for handling CSS <number>. <length>, <angle>, etc.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for single numeric style property */
export type Number_StyleType = ExtendedPropType<number | string>;

/** Type for multi-part numeric style property */
export type MultiNumber_StyleType = Number_StyleType | Number_StyleType[];



/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "%";

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/** Units of time */
export type TimeUnits = "s" | "ms";

/** Units of resolution */
export type ResolutionUnits = "dpi" | "dpcm" | "dppx" | "x";

/** Units of frequency */
export type FrequencyUnits = "Hz" | "kHz";

/** Units of flex */
export type FlexUnits = "fr";



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
export type Size_StyleType = Number_StyleType | { w: Number_StyleType; h: Number_StyleType };

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
export type Position_StyleType = ExtendedPropType<"center" | "left" | "right" | "top" | "bottom" | Number_StyleType |
                { x: "center" | "left" | "right" | Number_StyleType; y: "center" | "top" | "bottom" | Number_StyleType } |
                { xedge: string; x?: Number_StyleType; yedge: string; y?: Number_StyleType }>;

/** Type for multi-part position style property */
export type MultiPosition_StyleType = Position_StyleType | Position_StyleType[];



/**
 * The CssNummberMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
export interface ICssNumberMath
{
    /** Converts number to string appending necessary unit suffixes */
    numberToString: ( n: number) => string;

    /** Converts single numeric style value to string appending necessary unit suffixes */
    styleToString: ( val: Number_StyleType) => string;

    /** Converts multiple numeric style value to string appending necessary unit suffixes */
    multiStyleToString: ( val: MultiNumber_StyleType, separator: string) => string;

    /** Creates property value of <number> type using the CSS min() function. */
    min( ...params: Number_StyleType[]): IStringProxy;

    /** Creates property value of <number> type using the CSS max() function. */
    max( ...params: Number_StyleType[]): IStringProxy;

    /** Creates property value of <number> type using the CSS minmax() function. */
    minmax( min: Number_StyleType, max: Number_StyleType): IStringProxy;

    /** Creates property value of <number> type using the CSS clamp() function. */
    clamp( min: Number_StyleType, pref: Number_StyleType, max: Number_StyleType): IStringProxy;

    /**
     * Creates property value using the CSS calc() function. This function accepts a formular
     * string and an arbitrary number of parameters. The formular string can contain placeholders
     * that will be replaced by the parameters. Placeholders have the following format:
     * 
     * ```
     * {<index> [| <unit>]}
     * ```
     * The <index> token is a zero-based index in the parameter array. The optional <unit> token is
     * a measurement unit (length, percent, angle, etc.) and is used if the corresponding parameter
     * is a number.
     * 
     * ```typescript
     * class MyStyles
     * {
     *     wallGap = $custom( "width", 16);
     *     myClass = $class({ maxWidth: tsh.calc("100% - 2*{0}", this.wallGap)})
     * }
     * ```
     * @param formula 
     * @param params 
     */
    calc( formula: string, ...params: Number_StyleType[]): IStringProxy;
}



