import {
    Extended, INumberBaseMath, IGenericProxy, NumberType, CssNumber,
    PercentType, IPercentMath, CssPercent, LengthType, ILengthMath, CssLength,
    AngleType, IAngleMath, CssAngle, TimeType, ITimeMath, CssTime, ResolutionType, IResolutionMath,
    CssResolution, FrequencyType, IFrequencyMath, CssFrequency, CssPosition, OneOrMany, LengthUnits,
    PercentUnits, AngleUnits, TimeUnits, ResolutionUnits, FrequencyUnits, INumberMath
} from "../api/BasicTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basics.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts dashe-case to camelCase, e.g. font-size to fontSize.
 * @param dash
 */
export function dashToCamel( dash: string): string
{
	if (!dash)
		return dash;

	return dash.replace( /-([a-zA-Z])/g, (x, $1) => $1.toUpperCase());
}



/**
 * Converts camelCase to dash-case, e.g. fontSize to font-size.
 * @param camel
 */
export function camelToDash( camel: string): string
{
  return camel.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}



/**
 * Symbol under which a function is defined that converts an object to a string. We need a special
 * symbol because the standard method toString exists on every object and we only want some to
 * explicitly provide this support.
 */

 export let symValueToString = Symbol("symValueToString");



/**
 * The IValueConvertOptions interface defines optional functions that convertvalues of differnt
 * types to strings.
 */
export interface IValueConvertOptions
{
    // String value to use or function to call if value is null or undefined
    fromNull?: string | ((val: null | undefined) => string);

    // Called if value is a string. This allows transforming one string to another.
    fromString?: ( val: string) => string;

    // Called if value is a boolean
    fromBool?: (val: boolean) => string;

    // Called if value is a number
    fromNumber?: (val: number) => string;

    // Called if value is an array
    fromArray?: (val: any[]) => string;

    // Called if value is an object
    fromObj?: (val: any) => string;

    // Called if type-specific function is not defined except for null and string values. This is
    // also used for array elements if arrItemFunc is not defined.
    fromAny?: (val: any) => string;

    // Called to convert array items if fromArray is not defined
    arrItemFunc?: (v: any) => string;

    // Separator for array items - used only if fromArray is not defined
    arrSep?: string;

    // If value is a function, these are arguments to pass when invoking it
    funcArgs?: any[];
}



/**
 * Converts a value of an arbitrary type to a single string. The optional options parameter
 * can define how specific types are converted.
 */
export function val2str( val: any, options?: IValueConvertOptions): string
{
   if (!options)
    {
        // standard processing:
        // - null/undefined become empty string.
        // - call [symValueToString] method on objects that have it.
        // - function: call without parameters - support for proxies.
        // - everything else: call toString().
        if (val == null)
            return "";
        else if (typeof val === "string")
            return val;
        else if (Array.isArray(val))
            return arr2str( val);
        else if (typeof val === "function")
            return val();
        else if (typeof val[symValueToString] === "function")
            return val[symValueToString]();
        else
            return val.toString();
    }
    else
    {
        // processing with options. For all types except null and string, if the type-specific
        // function is not defined, call fromAny if defined.
        if (val == null)
            return options.fromNull ? typeof options.fromNull === "string" ? options.fromNull : options.fromNull( val) : "";
        else if (typeof val === "string")
            return options.fromString ? options.fromString( val) : val;
        else if (typeof val === "number")
            return options.fromNumber ? options.fromNumber( val) : options.fromAny ? options.fromAny( val) : val.toString();
        else if (typeof val === "function")
            return val2str( options.funcArgs ? val( ...options.funcArgs) : val());
        else if (Array.isArray(val))
        {
            if (options.fromArray)
                return options.fromArray( val);
            else
            {
                let separator = options.arrSep != null ? options.arrSep : " ";
                return arr2str( val, options.arrItemFunc || options.fromAny || undefined, separator);
            }
        }
        else if (typeof val === "object")
        {
            if (typeof val[symValueToString] === "function")
                return val[symValueToString]();
            else if (options.fromObj)
                return options.fromObj( val);
            else if (options.fromAny)
                return options.fromAny( val);
            else
                return val.toString();
        }
        else if (typeof val === "boolean")
            return options.fromBool ? options.fromBool( val) : options.fromAny ? options.fromAny( val) : val.toString();
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
export function arr2str( val: any[], func?: (v) => string, separator: string = " "): string
{
    return !val || val.length === 0
        ? ""
        : val.filter( x => x != null).map( y => func ? func(y) : val2str( y)).join( separator);
}




/**
 * The templateStringToString is a tag function helper that converts the template string with
 * parameters to a string using the given function to convert parameters.
 */
export function templateStringToString( parts: TemplateStringsArray, params: any[],
    convertFunc?: ( v: any) => string): string
{
    // number of parameters is always 1 less than the number of string parts
    let paramsLen = params.length;
    if (paramsLen === 0)
        return parts[0];

    let s = "";
    for( let i = 0; i < paramsLen; i++)
        s += parts[i] + (convertFunc ? convertFunc( params[i]) : val2str( params[i]));

    // add the last part
    return s + parts[paramsLen];
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Number
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type of functions that convert a number to a string */
type ConvertNumberFuncType = (n: number) => string;



/**
 * Converts a single numeric value to a CSS string optionally appending units that can be different
 * for integer and floating point numbers.
 * @param n Number to convert to string representation.
 * @param intUnit Units to append if the number is integer.
 * @param floatUnit Units to append if the number is floating point.
 */
function numberToString( n: number, intUnit: string = "", floatUint: string = ""): string
{
    return Number.isInteger(n) ?  n + intUnit : n + floatUint;
}

/**
 * Converts time style value to the CSS string.
 * @param val Number as a style property type.
 * @param convertFunc Function that converts a number to a string.
 */
function numberBaseToString<T>( val: Extended<T>, convertFunc?: ConvertNumberFuncType): string
{
    return val2str( val, { fromNumber: convertFunc});
}

/**
 * Converts single CssNumber or array of CssNumber objects to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiStyleToString<T>( val: OneOrMany<T>, convertFunc?: ConvertNumberFuncType,
    separator: string = " "): string
{
    return val2str( val, {
        fromNumber: convertFunc,
        arrItemFunc: v => numberBaseToString( v, convertFunc),
        arrSep: separator
    });
}



/**
 * The mathFunc function returns one of the mathematic CSS function that accepts one or more
 * parameters whose type is derived from NumberBase<T>.
 */
function mathFunc<T>( name: string, params: Extended<T>[], convertFunc?: ConvertNumberFuncType): string
{
    return `${name}(${multiStyleToString( params, convertFunc, ",")})`;
}



/**
 * The calcFunc function returns the string representation of the calc() CSS function.
 */
function calcFunc<T>( parts: TemplateStringsArray, params: Extended<T>[],
    convertFunc?: ConvertNumberFuncType): string
{
    return `calc(${templateStringToString( parts, params, (v: any) => numberBaseToString( v, convertFunc))})`;
}



/**
 * The NummberBaseMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
class NumberBaseMath<T = any, U extends string = any, P extends string = any> implements INumberBaseMath<T,U,P>
{
    constructor( protected convertFunc: ConvertNumberFuncType)
    {
    }

    public numberToString = (n: number): string =>
    {
        return this.convertFunc( n);
    }

    public styleToString = (val: Extended<T>): string =>
    {
        return numberBaseToString( val, this.convertFunc);
    }

    public multiStyleToString = (val: OneOrMany<T>, separator: string = " "): string =>
    {
        return multiStyleToString( val, this.convertFunc, separator);
    }

    /** Creates CssLength value from the number and the given unit. */
    public units( n: number, unit: U): IGenericProxy<P>
    {
        return () => n + unit;
    }

    public min( ...params: Extended<T>[]): IGenericProxy<P>
    {
        return () => mathFunc( "min", params, this.convertFunc);
    }

    public max( ...params: Extended<T>[]): IGenericProxy<P>
    {
        return () => mathFunc( "max", params, this.convertFunc);
    }

    public clamp( min: Extended<T>, pref: Extended<T>, max: Extended<T>): IGenericProxy<P>
    {
        return () => mathFunc( "clamp", [min, pref, max], this.convertFunc);
    }

    public calc( formulaParts: TemplateStringsArray, ...params: Extended<T>[]): IGenericProxy<P>
    {
        return () => calcFunc( formulaParts, params, this.convertFunc);
    }
}



/**
 * The INumberMathClass interface represents a "static" side of classes derived from the
 * NumberMath class.
 */
export interface INumberBaseMathClass<T = any, U extends string = any, P extends string = any>
{
    convertFunc( n: number): string;

    styleToString( val: Extended<T>): string;

    multiStyleToString( val: OneOrMany<T>, separator: string): string;

    new(): INumberBaseMath<T,U,P>;
}




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Unitless number
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssNumberMath class contains methods that implement CSS mathematic functions on the
 * <number> CSS types.
 */
export class NumberMath extends NumberBaseMath<CssNumber, "", NumberType> implements INumberMath
{
    public static convertFunc( n: number): string { return n.toString(); }

    public static styleToString( val: Extended<CssNumber>): string
        { return numberBaseToString( val, NumberMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssNumber>, separator: string): string
        { return multiStyleToString( val, NumberMath.convertFunc, separator); }

    constructor() { super( NumberMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssPercentMath class contains methods that implement CSS mathematic functions on the
 * <percent> CSS types.
 */
export class PercentMath extends NumberBaseMath<CssPercent, PercentUnits, PercentType> implements IPercentMath
{
    public static convertFunc( n: number): string
        { return (Number.isInteger(n) ? n : Math.round(n * 100)) + "%"; }

    public static styleToString( val: Extended<CssPercent>): string
        { return numberBaseToString( val, PercentMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssPercent>, separator: string): string
        { return multiStyleToString( val, PercentMath.convertFunc, separator); }

    constructor() { super( PercentMath.convertFunc) }
}

/**
 * Converts the given number to string using the following rules:
 * - if the number is between -1 and 1 (non inclusive), multiplies the number and appends "%"
 * - otherwise, converts the number to string without appending any utints.
 */
export function unitlessOrPercentToString( n: number): string
{
    return n >= 1 || n <= -1 ? n.toString() : Math.round(n * 100) + "%";
}


///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Length
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssLengthMath class contains methods that implement CSS mathematic functions on the
 * <length> CSS types.
 */
export class LengthMath extends NumberBaseMath<CssLength, LengthUnits | PercentUnits, LengthType> implements ILengthMath
{
    public static convertFunc( n: number): string { return numberToString( n, "px", "em"); }

    public static styleToString( val: Extended<CssLength | string>): string
        { return numberBaseToString( val, LengthMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssLength>, separator: string): string
        { return multiStyleToString( val, LengthMath.convertFunc, separator); }

    constructor() { super( LengthMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Angle
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssAngleMath class contains methods that implement CSS mathematic functions on the
 * <angle> CSS types.
 */
export class AngleMath extends NumberBaseMath<CssAngle, AngleUnits | PercentUnits, AngleType> implements IAngleMath
{
    public static convertFunc( n: number): string { return numberToString( n, "deg", "turn"); }

    public static styleToString( val: Extended<CssAngle>): string
        { return numberBaseToString( val, AngleMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssAngle>, separator: string): string
        { return multiStyleToString( val, AngleMath.convertFunc, separator); }

    constructor() { super( AngleMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Time
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssTimeMath class contains methods that implement CSS mathematic functions on the
 * <time> CSS types.
 */
export class TimeMath extends NumberBaseMath<CssTime, TimeUnits, TimeType> implements ITimeMath
{
    public static convertFunc( n: number): string { return numberToString( n, "ms", "s"); }

    public static styleToString( val: Extended<CssTime>): string
        { return numberBaseToString( val, TimeMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssTime>, separator: string): string
        { return multiStyleToString( val, TimeMath.convertFunc, separator); }

    constructor() { super( TimeMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Resolution
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssResolutionMath class contains methods that implement CSS mathematic functions on the
 * <resolution> CSS types.
 */
export class ResolutionMath extends NumberBaseMath<CssResolution, ResolutionUnits, ResolutionType> implements IResolutionMath
{
    public static convertFunc( n: number): string { return numberToString( n, "dpi", "x"); }

    public static styleToString( val: Extended<CssResolution>): string
        { return numberBaseToString( val, ResolutionMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssResolution>, separator: string): string
        { return multiStyleToString( val, ResolutionMath.convertFunc, separator); }

    constructor() { super( ResolutionMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Frequency
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssFrequencyMath class contains methods that implement CSS mathematic functions on the
 * <frequence> CSS types.
 */
export class FrequencyMath extends NumberBaseMath<CssFrequency, FrequencyUnits, FrequencyType> implements IFrequencyMath
{
    public static convertFunc( n: number): string { return numberToString( n, "Hz", "kHz"); }

    public static styleToString( val: Extended<CssFrequency>): string
        { return numberBaseToString( val, FrequencyMath.convertFunc); }

    public static multiStyleToString( val: OneOrMany<CssFrequency>, separator: string): string
        { return multiStyleToString( val, FrequencyMath.convertFunc, separator); }

    constructor() { super( FrequencyMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts single position style value to the CSS string.
 */
export function pos2str( val: Extended<CssPosition>): string
{
    return val2str( val, {
        fromNumber: LengthMath.styleToString,
        fromArray: v => LengthMath.multiStyleToString( v, " ")
    });
}

/**
 * Converts multi-position style value to the CSS string.
 */
export function multiPos2str( val: Extended<OneOrMany<CssPosition>>, separator: string): string
{
    return val2str( val, {
        arrItemFunc: pos2str,
        arrSep: separator
    });
}



