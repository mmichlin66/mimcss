import {IStringProxy, Number_StyleType, MultiNumber_StyleType, ICssNumberMath,
    Size_StyleType, MultiSize_StyleType, Position_StyleType, MultiPosition_StyleType
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
 * Converts an array of the given typeto a single string using the given separator.
 * Elements of the array are converted to strings using the given function.
 * @param val Array of time values
 */
export function arrayToCssString( val: any[], func?: (v) => string, separator: string = " "): string
{
    return !val || val.length === 0
        ? ""
        : val.filter( (v) => v != null).map(
                (v) => func ? func(v) : (x) => valueToCssString( x, separator)).join( separator);
}



/**
 * Converts a value of an arbitrary type to a single string using the given separator. If the value
 * is an array, every item is converted to a string and they are joined using the given separator.
 */
export function valueToCssString( val: any, separator: string = " "): string
{
    if (val == null)
        return "";
    else if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return arrayToCssString( val, undefined, separator);
    else
        return val.toString();
}



/**
 * The StringProxyBase abstract class serves as a base for all classes implementing the
 * IStringProxy interface. It implements the standard toString method by calling the
 * valueToCssString method.
 */
export abstract class StringProxyBase implements IStringProxy
{
    public abstract valueToCssString(): string;

    public toString(): string
    {
        return this.valueToCssString();
    }
}



/**
 * The StringProxy class implements the IStringProxy interface by encapsulating the string.
 */
export class StringProxy extends StringProxyBase
{
    constructor( s?: string | IStringProxy)
    {
        super();
        this.s = s;
    }

    public valueToCssString(): string
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
type ConvertFuncType = ((n: number) => string) | null | undefined;



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
function numberStyleToCssString( val: Number_StyleType, convertFunc?: ConvertFuncType): string
{
    if (val == null)
        return "0";
    else if (typeof val === "string")
        return val;
    else if (typeof val === "object")
        return val.toString();
    else if (convertFunc)
        return convertFunc( val);
    else
        return val.toString();
}

/**
 * Converts animation delay style value to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiNumberStyleToCssString( val: MultiNumber_StyleType,
                convertFunc: ConvertFuncType, separator: string = " "): string
{
    return Array.isArray(val)
        ? arrayToCssString( val, (v) => numberStyleToCssString( v, convertFunc), separator)
        : numberStyleToCssString( val, convertFunc);
}



/**
 * Replaces patterns {index|[unit]} in the format string with values from the given array.
 * @param format 
 * @param convertFunc 
 * @param params 
 */
function formatNumbers( format: string, params: Number_StyleType[], convertFunc?: ConvertFuncType): string
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

    return format.replace( /{ *(\d*) *(?:\| *([a-zA-Z\%]+) *)?}/g, replacer);
}



/**
 * The MathFuncProxy class implements the IStringProxy interface by encapsulating parameters of a
 * mathematic CSS function that accepts one or more parameters of type Number_StyleType.
 */
class MathFuncProxy extends StringProxyBase
{
    constructor( name: string, params: Number_StyleType[], convertFunc?: ConvertFuncType)
    {
        super();
        this.name = name;
        this.convertFunc = convertFunc;
        this.params = params;
    }

    public valueToCssString(): string
    {
        return `${this.name}(${multiNumberStyleToCssString( this.params, this.convertFunc, ",")})`;
    }

    // Name of the mathematical function.
    private name: string;

    // Function that converts JavaScript numbers to strings (e.g. by appending a suffix for units).
    // If not defined, numbers are converted to strings without appending any suffix.
    private convertFunc: ConvertFuncType;

    // Array of Number_StyleType parameters to the mathematical function.
    private params: Number_StyleType[];
}



/**
 * The CalcFuncProxy class implements the IStringProxy interface by encapsulating parameters of a
 * calc() CSS function that accepts a formula string and zero or more parameters of type
 * Number_StyleType.
 */
class CalcFuncProxy extends StringProxyBase
{
    constructor( formula: string, params: Number_StyleType[], convertFunc?: ConvertFuncType)
    {
        super();
        this.formula = formula;
        this.convertFunc = convertFunc;
        this.params = params;
    }

    public valueToCssString(): string
    {
        return `calc(${formatNumbers( this.formula, this.params, this.convertFunc)})`;
    }

    // Calculation formula with placeholders.
    private formula: string;

    // Function that converts JavaScript numbers to strings (e.g. by appending a suffix for units).
    // If not defined, numbers are converted to strings without appending any suffix.
    private convertFunc: ConvertFuncType;

    // Array Number_StyleType parameters to substitute placeholders in the formula string.
    private params: Number_StyleType[];
}



/**
 * The CssNummberMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
class CssNumberMath implements ICssNumberMath
{
    // Function that appends proper units for parameters of number type.
    private convertFunc: ConvertFuncType;

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

    public styleToString = (val: Number_StyleType): string =>
    {
        return numberStyleToCssString( val, this.convertFunc);
    }

    public multiStyleToString = (val: MultiNumber_StyleType, separator: string = " "): string =>
    {
        return multiNumberStyleToCssString( val, this.convertFunc, separator);
    }

    public min( ...params: Number_StyleType[]): IStringProxy
    {
        return new MathFuncProxy( "min", params, this.convertFunc);
    }

    public max( ...params: Number_StyleType[]): IStringProxy
    {
        return new MathFuncProxy( "max", params, this.convertFunc);
    }

    public minmax( min: Number_StyleType, max: Number_StyleType): IStringProxy
    {
        return new MathFuncProxy( "minmax", [min, max], this.convertFunc);
    }

    public clamp( min: Number_StyleType, pref: Number_StyleType, max: Number_StyleType): IStringProxy
    {
        return new MathFuncProxy( "clamp", [min, pref, max], this.convertFunc);
    }

    public calc( formula: string, ...params: Number_StyleType[]): IStringProxy
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
export let Num: ICssNumberMath = new CssNumberMath();



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
export let Len: ICssNumberMath = new CssNumberMath( ["px", "em"]);



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
export let Angle: ICssNumberMath = new CssNumberMath( ["deg", "rad"]);



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
export let Time: ICssNumberMath = new CssNumberMath( ["ms", "s"]);



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
export let Resolution: ICssNumberMath = new CssNumberMath( ["dpi", "dpcm"]);



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
export let Frequency: ICssNumberMath = new CssNumberMath( ["Hz", "kHz"]);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The Percent object contains static methods that implement CSS mathematic functions on the
 * <percentage> CSS type by appending a "%" unit suffix.
 */
export let Percent: ICssNumberMath = new CssNumberMath( (n: number) =>
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
    else if (val instanceof StringProxyBase)
        return val.toString();
    else if (typeof val === "object")
        return objectToCssString( val, false, ["w", Len.styleToString], ["h", Len.styleToString]);
    // else if (Array.isArray( val))
    //     return lengthToCssString( val[0]) + " " + lengthToCssString( val[1]);
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
    else if (typeof val === "object")
        return val.toString();
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
    else if (val instanceof StringProxyBase)
        return val.toString();
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



