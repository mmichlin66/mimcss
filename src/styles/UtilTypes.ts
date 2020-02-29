/**
 * This file contains basic types and functions used to define CSS property types.
 */


/**
 * Style values that can be used for (almost) any property
 */
export type Base_StyleType = "inherit" | "initial" | "unset" | StringProxy;



/**
 * The StringProxy class encapsulates a string, which is returned via the standard toString()
 * method. All CSS properties should accept string as the type of their value even if normally
 * they accept other types (e.g a set of string literals as `"row" | "column"` for the
 * flex-dirction) property. This is because in addition to their normal values any property
 * can use custom CSS property in the form `var(--propname)`. However, if we add string type
 * to the set of string literals (e.g. `"row" | "column" | string`), this throws off the
 * Intellisense and it doesn't prompt developers for the possible values. The StringProxy
 * can be used instead of string (e.g. `"row" | "column" | StringProxy`) and this solves
 * the Intellisense issue.
 */
export class StringProxy
{
    constructor( s?: string | StringProxy)
    {
        this.s = typeof s === "string" ? s : s != null ? s.toString() : undefined;
    }

    public toString(): string { return this.s; }

    private s: string;
}



/**
 * The UnitValue class encapsulates a numeric value and a unit. It is used to represents such
 * values as lengths, angles, time, etc.
 */
export class UnitValue extends StringProxy
{
    constructor( value?: number, unit?: string)
    {
        super();
        this.value = value;
        this.unit = unit;
    }

    public toString(): string { return this.value + this.unit; }

    public value: number;
    public unit: string;
}



/** Type for single number style property */
export type SingleNumber_StyleType = number | string | Base_StyleType;

/** Type for multi-part number style property */
export type MultiNumber_StyleType = SingleNumber_StyleType | SingleNumber_StyleType[];



/**
 * Type for CSS length or percentage. Length can be represented using the following types:
 *   - string (e.g. 20px or 75%)
 *   - number: zero is treated as not having any suffix; integer numbers are treated as pixels;
 *     floating numbers are treated as percents: 0.0 to 1.0.
 */
export type SingleLength_StyleType = "auto" | number | string | Base_StyleType;

/** Type for multi-part length or percentage style property */
export type MultiLength_StyleType = SingleLength_StyleType | SingleLength_StyleType[];



/**
 * Type for CSS size, which can be expressed as one or two values each of each is of the
 * Length_StyleType type. Two values are given as an object with 'w' (width) and 'h' (height)
 * properties.
 */
export type SingleSize_StyleType = SingleLength_StyleType | { w: SingleLength_StyleType; h: SingleLength_StyleType };

/** Type for multi-part size style property */
export type MultiSize_StyleType = SingleSize_StyleType | SingleSize_StyleType[];



/**
 * Type for CSS angle. Length can be represented using the following types:
 *   - string (e.g. 20deg or 1.4rad)
 *   - number: zero is treated as not having any suffix; integer numbers are treated as degrees;
 *     floating numbers are treated as radians.
 */
export type SingleAngle_StyleType = number | Base_StyleType;



/**
 * Type for CSS position, which can be expressed as one or two or 3 or 4 values.
 */
export type SinglePosition_StyleType = "center" | "left" | "right" | "top" | "bottom" | SingleLength_StyleType |
                { x: "center" | "left" | "right" | SingleLength_StyleType; y: "center" | "top" | "bottom" | SingleLength_StyleType } |
                { xedge: string; x?: SingleLength_StyleType; yedge: string; y?: SingleLength_StyleType } |
                Base_StyleType;

/** Type for multi-part position style property */
export type MultiPosition_StyleType = SinglePosition_StyleType | SinglePosition_StyleType[];



/**
 * Type for CSS time. Time can be represented using the following types:
 *   - string (e.g. 2s or 250ms)
 *   - number: integer numbers are treated as milliseconds while floating numbers are treated
 *     as seconds.
 */
export type SingleTime_StyleType = number | Base_StyleType;

/** Type for multi-part time style property */
export type MultiTime_StyleType = SingleTime_StyleType | SingleTime_StyleType[];



