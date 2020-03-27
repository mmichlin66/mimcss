/**
 * This file contains basic types and functions used to define CSS property types.
 */

import {ICustomVar} from "../rules/RuleTypes"
import {CustomVar} from "../rules/CustomVar";
import {stylePropToCssString} from "./StyleFuncs";



/**
 * Style values that can be used for (almost) any CSS property.
 */
export type Base_StyleType = "inherit" | "initial" | "unset";



/**
 * The StringProxy class encapsulates a string, which is returned via the standard toString()
 * method. All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"red" | "green" | ...` for the
 * color) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"red" | "green" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The StringProxy
 * can be used instead of string (e.g. `"row" | "column" | StringProxy`) and this solves
 * the Intellisense issue.
 */
export class StringProxy
{
    constructor( s?: string | StringProxy)
    {
        this.s = s;
    }

    public stringProxyToCssString(): string
    {
        return this.s == null ? "" : typeof this.s === "string" ? this.s : this.s.toString();
    }

    public toString(): string
    {
        return this.stringProxyToCssString();
    }

    private s?: string | StringProxy;
}



/**
 * Type that extends the given type with the following types:
 * - basic style values that are valid for all style properties.
 * - StringProxy type that allows specifying raw string value.
 * - ICustomVar object that allows using a CSS custom property.
 */
export type ExtendedPropType<T> = T | Base_StyleType | StringProxy | ICustomVar<ExtendedPropType<T>>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Number
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for single number style property */
export type Number_StyleType = ExtendedPropType<number>;

/** Type for multi-part number style property */
export type MultiNumber_StyleType = Number_StyleType | Number_StyleType[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for CSS percentage. Percent can be represented using the following types:
 *   - number: integer numbers are treated as percents; floating numbers within -1 and 1
 *     are multilied by 100.
 */
export type Percent_StyleType = ExtendedPropType<number>;

/** Type for multi-part percentage style property */
export type MultiPercent_StyleType = Percent_StyleType | Percent_StyleType[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Length
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of length */
export type LengthUnits = "Q" | "ch" | "cm" | "em" | "ex" | "ic" | "in" | "lh" | "mm" | "pc" |
                "pt" | "px" | "vb" | "vh" | "vi" | "vw" | "rem" | "rlh" | "vmax" | "vmin" | "%";

/**
 * Type for CSS length or percentage. Length can be represented using the following types:
 *   - string (e.g. "20px" or "75%")
 *   - number: integer values are treated as pixels while floating numbers within -1 and 1 are
 *     treated as percents and floating numbers outside -1 and 1 are treated as "em".
 */
export type Length_StyleType = ExtendedPropType<"auto" | number | string>;

/** Type for multi-part length or percentage style property */
export type MultiLength_StyleType = Length_StyleType | Length_StyleType[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Angle
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of angle */
export type AngleUnits = "deg" | "rad" | "grad" | "turn";

/**
 * Type for CSS angle. Angle can be represented using the following types:
 *   - string (e.g. 20deg or 1.4rad)
 *   - number: zero is treated as not having any suffix; integer numbers are treated as degrees;
 *     floating numbers are treated as radians.
 */
export type Angle_StyleType = ExtendedPropType<number | string>;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Time
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Units of time */
export type TimeUnits = "s" | "ms";

/**
 * Type for CSS time. Time can be represented using the following types:
 *   - string (e.g. "2s" or "250ms")
 *   - number: integer numbers are treated as milliseconds while floating numbers are treated
 *     as seconds.
 */
export type Time_StyleType = ExtendedPropType<number>;

/** Type for multi-part time style property */
export type MultiTime_StyleType = Time_StyleType | Time_StyleType[];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Size
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for CSS size, which can be expressed as one or two values each of each is of the
 * Length_StyleType type. Two values are given as an object with 'w' (width) and 'h' (height)
 * properties.
 */
export type Size_StyleType = Length_StyleType | { w: Length_StyleType; h: Length_StyleType };

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
export type Position_StyleType = ExtendedPropType<"center" | "left" | "right" | "top" | "bottom" | Length_StyleType |
                { x: "center" | "left" | "right" | Length_StyleType; y: "center" | "top" | "bottom" | Length_StyleType } |
                { xedge: string; x?: Length_StyleType; yedge: string; y?: Length_StyleType }>;

/** Type for multi-part position style property */
export type MultiPosition_StyleType = Position_StyleType | Position_StyleType[];



