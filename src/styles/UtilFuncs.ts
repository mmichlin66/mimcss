﻿import {IStringProxy, ExtendedNumber_StyleType, ExtendedMultiNumber_StyleType, INumberMath,
    Size_StyleType, MultiSize_StyleType, Position_StyleType, MultiPosition_StyleType, IFractionMath
} from "./UtilTypes"



/**
 * Converts names with dashes into names in camelCase, where every character after a dash is
 * capitalized and dashes are removed.
 * @param dash
 */
export function dashToCamel( dash: string): string
{
	if (!dash)
		return dash;

	return dash.replace( /-([a-zA-Z])/g, (x, $1) => $1.toUpperCase());
}



/**
 * Converts camelCase to dash-case.
 * @param camel
 */
export function camelToDash( camel: string): string
{
  return camel.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}



/**
 * The IValueConvertOptions interface defines optional functions that convertvalues of differnt
 * types to strings.
 */
export interface IValueConvertOptions
{
    // Called if value is null or undefined
    fromNull?: ( val: null | undefined) => string;

    // Called if value is a boolean
    fromBool?: (val: boolean) => string;

    // Called if value is a number
    fromNumber?: (val: number) => string;

    // Called if value is an array
    fromArray?: (val: any[]) => string;

    // Called if value is an object
    fromObject?: (val: {[K: string]: any}) => string;

    // Called if type-specific function is not defined
    fromAny?: (val: any) => string;

    // Called to convert array items if fromArray is not defined
    arrayItemFunc?: (v: any) => string;

    // Separator for array items - used only if fromArray is not defined
    arraySeparator?: string;

    // If value is a function, these are arguments to pass when invoking it
    funcArgs?: any[];
}



/**
 * Converts a value of an arbitrary type to a single string. The optional options parameter
 * can define how specific types are converted.
 */
export function valueToString( val: any, options?: IValueConvertOptions): string
{
    if (typeof val === "string")
        return val;
    else if (!options)
    {
        if (val == null)
            return "";
        else if (typeof val.valueToString === "function")
            return val.valueToString();
        else if (typeof val.varToString === "function")
            return val.varToString();
        else if (typeof val === "function")
            return val();
        else
            return val.toString();
    }
    else
    {
        if (val == null)
            return options.fromNull ? options.fromNull( val) : options.fromAny ? options.fromAny( val) : "";
        else if (typeof val === "boolean")
            return options.fromBool ? options.fromBool( val) : options.fromAny ? options.fromAny( val) : val.toString();
        else if (typeof val === "number")
            return options.fromNumber ? options.fromNumber( val) : options.fromAny ? options.fromAny( val) : val.toString();
        else if (Array.isArray(val))
        {
            if (options.fromArray)
                return options.fromArray( val);
            else
            {
                let separator = options.arraySeparator != null ? options.arraySeparator : " ";
                if (options.arrayItemFunc)
                    return arrayToCssString( val, options.arrayItemFunc, separator);
                else if (options.fromAny)
                    return options.fromAny( val);
                else
                    return arrayToCssString( val, undefined, separator);
            }
        }
        else if (typeof val === "object")
        {
            if (typeof val.valueToString === "function")
                return val.valueToString();
            else if (typeof val.varToString === "function")
                return val.varToString();
            else if (options.fromObject)
                return options.fromObject( val);
            else if (options.fromAny)
                return options.fromAny( val);
            else
                return val.toString();
        }
        else if (typeof val === "function")
            return valueToString( options.funcArgs ? val( ...options.funcArgs) : val());
        else if (options.fromAny)
            return options.fromAny( val);
        else
            return val.toString();
    }
}



/**
 * Converts an array of the given typeto a single string using the given separator.
 * Elements of the array are converted to strings using the given function.
 */
export function arrayToCssString( val: any[], func?: (v) => string, separator: string = " "): string
{
    return !val || val.length === 0
        ? ""
        : val.filter( x => x != null).map( y => func ? func(y) : z => valueToString( z)).join( separator);
}



/**
 * The StringProxy class implements the IStringProxy interface by encapsulating the string.
 */
export class StringProxy implements IStringProxy
{
    constructor( s?: string | IStringProxy)
    {
        this.s = s;
    }

    public valueToString(): string
    {
        return this.s == null ? "" : typeof this.s === "string" ? this.s : this.s.toString();
    }

    private s?: string | StringProxy;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Number
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type of functions that convert a number to a string */
type ConvertFuncType = (n: number) => string;



/**
 * Converts a single numeric value to a CSS string optionally appending units that can be different
 * for integer and floating point numbers.
 * @param n Number to convert to string representation.
 * @param intUnit Units to append if the number is integer.
 * @param floatUnit Units to append if the number is floating point.
 */
function numberToCssString( n: number, intUnit: string = "", floatUint: string = ""): string
{
    return Number.isInteger(n) ?  n + intUnit : n + floatUint;
}

/**
 * Converts time style value to the CSS string.
 * @param val Number as a style property type.
 * @param convertFunc Function that converts a number to a string.
 */
function numberStyleToCssString( val: ExtendedNumber_StyleType, convertFunc?: ConvertFuncType): string
{
    return valueToString( val, { fromNumber: convertFunc});
}

/**
 * Converts animation delay style value to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiNumberStyleToCssString( val: ExtendedMultiNumber_StyleType,
                convertFunc: ConvertFuncType, separator: string = " "): string
{
    return valueToString( val, { fromNumber: convertFunc,
        arrayItemFunc: v => numberStyleToCssString( v, convertFunc),
        arraySeparator: separator
    });
}



/**
 * Replaces patterns {index[|unit]} in the format string with values from the given array.
 * @param format 
 * @param convertFunc 
 * @param params 
 */
function formatNumbers( format: string, params: ExtendedNumber_StyleType[], convertFunc?: ConvertFuncType): string
{
    function replacer( token: string, ...args: any[]): string
    {
        let index = parseInt( args[0]);
        if (index >= params.length)
            return "0";

        let unit = args[1];
        let param = params[index];
        if (unit && typeof param === "number")
            return param + unit;
        else
            return numberStyleToCssString( param, convertFunc);
    }

    return format.replace( /{\s*(\d*)\s*(?:\|\s*([a-zA-Z\%]+)\s*)?}/g, replacer);
}



/**
 * The MathFuncProxy class implements the IStringProxy interface by encapsulating parameters of a
 * mathematic CSS function that accepts one or more parameters of type Number_StyleType.
 */
class MathFuncProxy implements IStringProxy
{
    constructor( name: string, params: ExtendedNumber_StyleType[], convertFunc?: ConvertFuncType)
    {
        this.name = name;
        this.convertFunc = convertFunc;
        this.params = params;
    }

    public valueToString(): string
    {
        return `${this.name}(${multiNumberStyleToCssString( this.params, this.convertFunc, ",")})`;
    }

    // Name of the mathematical function.
    private name: string;

    // Function that converts JavaScript numbers to strings (e.g. by appending a suffix for units).
    // If not defined, numbers are converted to strings without appending any suffix.
    private convertFunc: ConvertFuncType;

    // Array of Number_StyleType parameters to the mathematical function.
    private params: ExtendedNumber_StyleType[];
}



/**
 * The CalcFuncProxy class implements the IStringProxy interface by encapsulating parameters of a
 * calc() CSS function that accepts a formula string and zero or more parameters of type
 * Number_StyleType.
 */
class CalcFuncProxy implements IStringProxy
{
    constructor( formula: string, params: ExtendedNumber_StyleType[], convertFunc?: ConvertFuncType)
    {
        this.formula = formula;
        this.convertFunc = convertFunc;
        this.params = params;
    }

    public valueToString(): string
    {
        return `calc(${formatNumbers( this.formula, this.params, this.convertFunc)})`;
    }

    // Calculation formula with placeholders.
    private formula: string;

    // Function that converts JavaScript numbers to strings (e.g. by appending a suffix for units).
    // If not defined, numbers are converted to strings without appending any suffix.
    private convertFunc: ConvertFuncType;

    // Array Number_StyleType parameters to substitute placeholders in the formula string.
    private params: ExtendedNumber_StyleType[];
}



/**
 * The NummberMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
class NumberMath implements INumberMath
{
    // Function that appends proper units for parameters of number type.
    protected convertFunc: ConvertFuncType;

    constructor( init?: ConvertFuncType | [string,string])
    {
        this.convertFunc = !init
            ? (n: number) => n.toString()
            : typeof init === "function"
                ? init
                : (n: number) => numberToCssString( n, init[0], init[1]);
    }

    public numberToString = (n: number): string =>
    {
        return this.convertFunc( n);
    }

    public styleToString = (val: ExtendedNumber_StyleType): string =>
    {
        return numberStyleToCssString( val, this.convertFunc);
    }

    public multiStyleToString = (val: ExtendedMultiNumber_StyleType, separator: string = " "): string =>
    {
        return multiNumberStyleToCssString( val, this.convertFunc, separator);
    }

    public min( ...params: ExtendedNumber_StyleType[]): IStringProxy
    {
        return new MathFuncProxy( "min", params, this.convertFunc);
    }

    public max( ...params: ExtendedNumber_StyleType[]): IStringProxy
    {
        return new MathFuncProxy( "max", params, this.convertFunc);
    }

    public clamp( min: ExtendedNumber_StyleType, pref: ExtendedNumber_StyleType, max: ExtendedNumber_StyleType): IStringProxy
    {
        return new MathFuncProxy( "clamp", [min, pref, max], this.convertFunc);
    }

    public calc( formula: string, ...params: ExtendedNumber_StyleType[]): IStringProxy
    {
        return new CalcFuncProxy( formula, params, this.convertFunc);
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Num - unitless number
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Num object contains static methods that implement CSS mathematic functions on the <number>
 * CSS type. When arguments for these functions are of the number JavaScript type they are
 * converted to strings without appending any units to them.
 */
export let Num: INumberMath = new NumberMath();



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Length
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Len object contains static methods that implement CSS mathematic functions on the <length>
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: INumberMath = new NumberMath( ["px", "em"]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Angle
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Angle object contains static methods that implement CSS mathematic functions on the <angle>
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "rad".
 */
export let Angle: INumberMath = new NumberMath( ["deg", "rad"]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Time
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Time object contains static methods that implement CSS mathematic functions on the <time>
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: INumberMath = new NumberMath( ["ms", "s"]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Resolution
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Resolution object contains static methods that implement CSS mathematic functions on the
 * <resolution> CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: INumberMath = new NumberMath( ["dpi", "dpcm"]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Frequency
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Frequency object contains static methods that implement CSS mathematic functions on the
 * <frequency> CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: INumberMath = new NumberMath( ["Hz", "kHz"]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The FractionMath class contains methods that implement CSS mathematic functions on the
 * <fraction> CSS types.
 */
class FractionMath extends NumberMath implements IFractionMath
{
    constructor()
    {
        super( ["fr", "%"])
    }

    public minmax( min: ExtendedNumber_StyleType, max: ExtendedNumber_StyleType): IStringProxy
    {
        return new MathFuncProxy( "minmax", [min, max], this.convertFunc);
    }
}



/**
 * The Fraction object contains static methods that implement CSS mathematic functions on the
 * <fraction> CSS type by appending a fraction unit suffix.
 * Integer numbers use "fr"; floating point numbers use "%".
 */
export let Fraction: IFractionMath = new FractionMath();



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Percent object contains static methods that implement CSS mathematic functions on the
 * <percentage> CSS type by appending a "%" unit suffix.
 */
export let Percent: INumberMath = new NumberMath( (n: number) =>
        (Number.isInteger(n) ? n : n > -1.0 && n < 1.0 ? Math.round( n * 100) : Math.round(n)) + "%");



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Size
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts size style value to the CSS string.
 * @param val Size as a style property type
 */
export function sizeToCssString( val: Size_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof (val as any).valueToString === "function")
        return (val as any).valueToString();
    else if (typeof (val as any).varToString === "function")
        return (val as any).varToString();
    else if (typeof val === "object")
        return objectToCssString( val, false, ["w", Len.styleToString], ["h", Len.styleToString]);
    else
	    return Len.styleToString( val);
}

/**
 * Converts multi-part size style property to the CSS string.
 * @param val Array of length style values
 */
export function multiSizeToCssString( val: MultiSize_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return arrayToCssString( val, sizeToCssString);
    else
        return sizeToCssString( val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts single position style value to the CSS string.
 * @param val Size as a style property type
 */
export function positionToCssString( val: Position_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof (val as any).valueToString === "function")
        return (val as any).valueToString();
    else if (typeof (val as any).varToString === "function")
        return (val as any).varToString();
    else if (typeof val === "object")
    {
        if ("xedge" in val)
            return objectToCssString( val, false, "xedge", ["x", Len.styleToString], "yedge", ["y", Len.styleToString]);
        else
            return objectToCssString( val, false, ["x", Len.styleToString], ["y", Len.styleToString]);
    }
    else
	    return Len.styleToString( val);
}

/**
 * Converts multi-part position style values to the CSS string.
 * @param val Array of length style values
 */
export function multiPositionToCssString( val: MultiPosition_StyleType): string
{
    if (Array.isArray(val))
        return arrayToCssString( val, positionToCssString);
    else
        return  positionToCssString( val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Object
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given object to a CSS string.
 * @param val Object to convert to string.
 * @param usePropNames Flag indicating whether the names of the object's proprties should be added to the string.
 * @param propsAndFuncs Array of property names and optionally functions. The order of the names determines in
 *     which oprder the properties should be added to the string. If a function is present for the property,
 *     it will be used to convert the property's value to the string. If a function is not present, then the
 *     property value should be converted to the string using the toString method.
 */
export function objectToCssString( val: any, usePropNames: boolean, ...propsAndFuncs: (string | [string, (val: any) => string])[] ): string
{
    if (val == null || propsAndFuncs.length === 0)
        return null;

	let s = "";

    for( let propAndFunc in propsAndFuncs)
    {
        let propName = typeof propAndFunc === "string" ? propAndFunc : propAndFunc[0];
        let func = typeof propAndFunc === "string" ? undefined : propAndFunc[1];

        let propVal = val[propName];
        if (propVal == null)
            continue;

        if (s.length > 0)
            s += " ";

        if (usePropNames)
            s += propName;

        if (func)
            s += " " + func( propVal);
        else if (propVal != null)
            s += " " + propVal;
    }

	return s;
}



