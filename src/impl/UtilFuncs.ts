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
    fromString?: number | (( val: string) => string);

    // Called if value is a boolean
    fromBool?: number | ((val: boolean) => string);

    // Called if value is a number
    fromNumber?: number | ((val: number) => string);

    // Called if value is an array
    fromArray?: number | ((val: any[]) => string);

    // Called if value is an object
    fromObj?: number | ((val: any) => string);

    // Called if type-specific function is not defined except for null and string values. This is
    // also used for array elements if arrItemFunc is not defined.
    fromAny?: number | ((val: any) => string);

    // Called to convert array items if fromArray is not defined
    arrItemFunc?: number | ((v: any) => string);

    // Separator for array items - used only if fromArray is not defined
    arrSep?: string;

    // If value is a function, these are arguments to pass when invoking it
    funcArgs?: any[];
}



/**
 * Converts a value of an arbitrary type to a single string. The optional options parameter
 * can define how specific types are converted.
 */
export function v2s( val: any, options?: IValueConvertOptions): string
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
            return a2s( val);
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
        let func: number | ToStringFunc | undefined = undefined;

        if (val == null)
            return options.fromNull ? typeof options.fromNull === "string" ? options.fromNull : options.fromNull( val) : "";
        else if (typeof val === "string")
            func = options.fromString;
        else if (typeof val === "number")
            func = options.fromNumber || options.fromAny;
        else if (typeof val === "function")
            return v2s( options.funcArgs ? val( ...options.funcArgs) : val());
        else if (Array.isArray(val))
        {
            if (options.fromArray)
                func = options.fromArray;
            else
            {
                let separator = options.arrSep != null ? options.arrSep : " ";
                return a2s( val, options.arrItemFunc || options.fromAny, separator);
            }
        }
        else if (typeof val === "object")
        {
            if (typeof val[symValueToString] === "function")
                return val[symValueToString]();
            else
                func = options.fromObj || options.fromAny;
        }
        else if (typeof val === "boolean")
            func = options.fromBool || options.fromAny;
        else
            func = options.fromAny;

        return typeof func === "number" ? v2sByFuncID( val, func) : func ? func( val) : val.toString();
    }
}



/**
 * Converts an array of the given typeto a single string using the given separator.
 * Elements of the array are converted to strings using the given function.
 */
export function a2s( val: any[], func?: number | ((v) => string), separator: string = " "): string
{
    return !val || val.length === 0
        ? ""
        : val.filter( v => v != null).map(
            v => typeof func === "number" ? v2sByFuncID( v, func) : func ? func(v) : v2s( v)
        ).join( separator);
}




/** Type defnition of a function that takes a value and converts it to string */
export type ToStringFunc = (val: any) => string;




/**
 * Converts the given value to a CSS string using the info parameter to inform how the object's
 * properties should be converted to strings. The info parameter is an array of either strings
 * or two- or thre-element tuples. The only string and the first tuple element corresponds to a
 * property expected in the value object to be converted. Each property is converted according
 * to the following rules:
 * - If the array item is just a string, the corresponding value's property is converted using
 *   the val2str function.
 * - If the second element is null or undefined, the corresponding value's property is converted using
 *   the val2str function..
 * - If the second element is a function, it is used to convert the value's property.
 * - If a third element exists in the tuple it is treated as a prefix to be placed before the
 *   converted property value.
 *
 * The order of the names determines in which order the properties should be added to the string.
 */
 export function obj2str( val: any,
    info: (string | [string, null | number | ToStringFunc, string?] )[],
    separator: string = " "): string
{
    if (val == null)
        return "";
    else if (typeof val !== "object")
        return val.toString();

    let buf: (string)[] = [];
    for( let nameOrTuple of info)
    {
        // get the name of the property in the value to be converted and the corresponding value;
        // if the properties value is not defined, skip it.
        let propName = typeof nameOrTuple === "string" ? nameOrTuple : nameOrTuple[0];
        let propVal = val[propName];
        if (propVal == null)
            continue;

        // check whether we have a prefix
        let prefix = typeof nameOrTuple === "string" ? undefined : nameOrTuple[2];
        if (prefix)
            buf.push( prefix);

        let convertor = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
        if (!convertor)
            buf.push( v2s( propVal));
        else if (typeof convertor === "number")
            buf.push( v2sByFuncID( propVal, convertor));
        else
            buf.push( convertor( propVal));
    }

	return buf.join(separator);
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
        s += parts[i] + (convertFunc ? convertFunc( params[i]) : v2s( params[i]));

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
    return v2s( val, { fromNumber: convertFunc});
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
    return v2s( val, {
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

    s2s( val: Extended<T>): string;

    ms2s( val: OneOrMany<T>, separator: string): string;

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

    public static s2s( val: Extended<CssNumber>): string
        { return numberBaseToString( val, NumberMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssNumber>, separator: string): string
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

    public static s2s( val: Extended<CssPercent>): string
        { return numberBaseToString( val, PercentMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssPercent>, separator: string): string
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

    public static s2s( val: Extended<CssLength | string>): string
        { return numberBaseToString( val, LengthMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssLength>, separator: string): string
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

    public static s2s( val: Extended<CssAngle>): string
        { return numberBaseToString( val, AngleMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssAngle>, separator: string): string
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

    public static s2s( val: Extended<CssTime>): string
        { return numberBaseToString( val, TimeMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssTime>, separator: string): string
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

    public static s2s( val: Extended<CssResolution>): string
        { return numberBaseToString( val, ResolutionMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssResolution>, separator: string): string
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

    public static s2s( val: Extended<CssFrequency>): string
        { return numberBaseToString( val, FrequencyMath.convertFunc); }

    public static ms2s( val: OneOrMany<CssFrequency>, separator: string): string
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
    return v2s( val, { fromAny: WellKnownFunc.Length });
}

/**
 * Converts multi-position style value to the CSS string.
 */
function multiPos2str( val: Extended<OneOrMany<CssPosition>>, separator: string): string
{
    return v2s( val, {
        arrItemFunc: WellKnownFunc.Position,
        arrSep: separator
    });
}



/**
 * Numeric identifiers corresponding to well known functions used to convert style property values
 * to strings. This is used to reduce the size of the object used for mapping style properties to
 * conversion functions.
 */
export const enum WellKnownFunc
{
    Number = 1,
    Percent,
    Length,
    Angle,
    Time,
    Position,
    MultiPositionWithComman,
    MultiLengthWithSpace,
    MultiTimeWithComma,
    ArrayWithComma,
    ArrayWithSlash,
    UnitlessOrPercent,
}



// Map of function IDs to functions that convert a value to string
let registeredToStringFuncs = new Map<number,ToStringFunc>([
    [WellKnownFunc.Number, NumberMath.s2s],
    [WellKnownFunc.Percent, PercentMath.s2s],
    [WellKnownFunc.Length, LengthMath.s2s],
    [WellKnownFunc.Angle, AngleMath.s2s],
    [WellKnownFunc.Time, TimeMath.s2s],
    [WellKnownFunc.Position, pos2str],
    [WellKnownFunc.MultiPositionWithComman, val => multiPos2str( val, ",")],
    [WellKnownFunc.MultiLengthWithSpace, val => LengthMath.ms2s( val, " ")],
    [WellKnownFunc.MultiTimeWithComma, val => LengthMath.ms2s( val, ",")],
    [WellKnownFunc.ArrayWithComma, val => v2s( val, { arrSep: "," })],
    [WellKnownFunc.ArrayWithSlash, val => v2s( val, { arrSep: "/" })],
    [WellKnownFunc.UnitlessOrPercent, unitlessOrPercentToString],
]);



// Next identifier for registering a function that converts a value to string.
let nextRegisteredFuncID = 1000;



/**
 * Registers the given function so that it can be used for converting a value to string using
 * the v2sByFuncID function.
 */
export function registerV2SFuncID( func: ToStringFunc): number
{
    let funcID = nextRegisteredFuncID++;
    registeredToStringFuncs.set( funcID, func);
    return funcID;
}



/**
 * Converts the given value to string using a registered conversion function indicated by the
 * given function ID.
 * @param val Value to convert
 * @param funcID ID of the previously registered conversion function
 */
export function v2sByFuncID( val: any, funcID: number): string
{
    let func = registeredToStringFuncs.get( funcID);
    return func ? func(val) : "";
}



