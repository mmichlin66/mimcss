import {
    Extended, INumberBaseMath, IGenericProxy, NumberType, CssNumber,
    PercentType, IPercentMath, CssPercent, LengthType, ILengthMath, CssLength,
    AngleType, IAngleMath, CssAngle, TimeType, ITimeMath, CssTime, ResolutionType, IResolutionMath,
    CssResolution, FrequencyType, IFrequencyMath, CssFrequency, CssPosition, OneOrMany, LengthUnits,
    PercentUnits, AngleUnits, TimeUnits, ResolutionUnits, FrequencyUnits, INumberMath
} from "../api/CoreTypes";



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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Conversion of values to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Symbol under which a function is defined that converts an object to a string. We need a special
 * symbol because the standard method toString exists on every object and we only want some to
 * explicitly provide this support.
 */
 export const symValueToString: unique symbol = Symbol();



/** Type of functions that convert a value of arbitrary type to a string */
export type AnyToStringFunc = (val: any) => string;

/** Type of functions that convert a number to a string */
export type NumberToStringFunc = (n: number) => string;



 /**
 * The V2SOptions type defines options on how to convert values of differnt
 * types to strings. A value is converted according to the following rules:
 * - If the option is a number it is treated as an ID of a registered conversion function.
 * - If the option is a function, it is invoked to convert the value.
 * - If the option is an object, then depending on the type of the value, one of the fromXxx
 *   methods defines how the value is converted.
 */
export type V2SOptions = WellKnownFunc | AnyToStringFunc |
{
    // String value to use or function to call if value is null or undefined
    fromNull?: string | ((val?: null) => string);

    // String value to use or function to call if value is a boolean
    fromBool?: (val: boolean) => string;

    // Options to use if value is a string. This allows transforming one string to another.
    fromString?: (val: string) => string;

    // Options to use if value is a number
    fromNumber?: WellKnownFunc | NumberToStringFunc;

    // Options to use if value is an array
    fromArray?: WellKnownFunc | ((val: any[]) => string);

    // Options to use if value is an object
    fromObj?: V2SOptions;

    // Options to use to convert value's properties if value is an object
    fromProps?: P2SOptions;

    // Separator for array items (used with arrItemFunc) or object properties (used with
    // fromProps). If not specified, a single space will be used.
    propSep?: string;

    // Options to use if type-specific function is not defined except for null and string values.
    // This is also used for array elements if arrItemFunc is not defined.
    fromAny?: V2SOptions;

    // Options to use to convert each array item - used only if fromArray is not defined
    arrItemFunc?: V2SOptions;

    // Separator for array items (used with arrItemFunc) or object properties (used with
    // fromProps). If not specified, a single space will be used.
    arrSep?: string;

    // If value is a function, these are arguments to pass when invoking it
    funcArgs?: any[];
};



/**
 * The P2SOption type defines a name of a property of an object along with the options of how
 * this property is converted to a string. The type is either a property name or a tuple
 * where the first element is the property name and the second element is the V2SOptions value.
 * If the tuple has a third string element it is placed before the converted property value.
 */
 export type P2SOption = string | [string, V2SOptions?, string?];

/**
 * The P2SOptions type defines names of properties of an object along with the options of how
 * each property is converted to a string. The type is an array of either property names or tuples
 * where the first element is the property name and the second element is the V2SOptions value.
 * If the tuple has a third string element it is placed before the converted property value.
 */
 export type P2SOptions = P2SOption[];



/**
 * Converts a value of an arbitrary type to a single string. The optional options parameter
 * can define how specific types are converted.
 */
export function v2s( val: any, options?: V2SOptions): string
{
   if (!options)
    {
        if (typeof val === "string")
            return val;
        else if (Array.isArray(val))
            return a2s( val);
        else if (typeof val === "function")
            return v2s(val());
        else if (val == null)
            return "";
        else if (typeof val[symValueToString] === "function")
            return val[symValueToString]();
        else
            return val.toString();
    }
    else if (typeof options == "number")
        return v2sByFuncID( val, options);
    else if (typeof options == "function")
        return options( val);
    else
    {
        // processing with options. For all types except null and string, if the type-specific
        // function is not defined, call fromAny if defined.
        let newOptions: V2SOptions | undefined = undefined;

        if (val == null)
            return options.fromNull ? typeof options.fromNull === "string" ? options.fromNull : options.fromNull( val) : "";
        else if (typeof val === "number")
            newOptions = options.fromNumber || options.fromAny;
        else if (typeof val === "function")
            return options.funcArgs ? val( ...options.funcArgs) : val();
        else if (Array.isArray(val))
        {
            if (options.fromArray)
                newOptions = options.fromArray;
            else
            {
                let separator = options.arrSep != null ? options.arrSep : " ";
                return a2s( val, options.arrItemFunc || options.fromAny, separator);
            }
        }
        else if (typeof val === "object")
        {
            if (options.fromObj || options.fromAny)
                newOptions = options.fromObj || options.fromAny;
            else if (options.fromProps)
            {
                let separator = options.propSep != null ? options.propSep : " ";
                return p2s( val, options.fromProps, separator);
            }
            else if (typeof val[symValueToString] === "function")
                return val[symValueToString]();
            else
                return val.toString();
        }
        else if (typeof val === "string")
            return options.fromString ? options.fromString( val) : val;
        else if (typeof val === "boolean")
            return options.fromBool ? options.fromBool( val) : val.toString();
        else
            return "";

        return v2s( val, newOptions);
    }
}



/**
 * Converts the given array to a single string by converting every item using the given otions
 * and joining the results with the given delimiter.
 */
export function a2s( val: any[], options?: V2SOptions, separator: string = " "): string
{
    return !val || val.length === 0
        ? ""
        : val.filter( v => v != null).map( v => v2s( v, options)).join( separator);
}



/**
 * Converts properties of the given object to string by converting each property from the options
 * array and joining them using the given separator.
 * @param val
 * @param options
 * @param separator
 */
export function p2s( val: {[p:string]: any}, options: P2SOptions, separator?: string): string
{
    if (val == null)
        return "";

    let params: string[] = [];
    for( let nameOrTuple of options)
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
            params.push( prefix);

        let options = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
        params.push( v2s( propVal, options));
    }

    return params.join( separator ?? " ");
}



// /**
//  * Converts the given value to a CSS string using the info parameter to inform how the object's
//  * properties should be converted to strings. The info parameter is an array of either strings
//  * or two- or thre-element tuples. The only string and the first tuple element corresponds to a
//  * property expected in the value object to be converted. Each property is converted according
//  * to the following rules:
//  * - If the array item is just a string, the corresponding value's property is converted using
//  *   the val2str function.
//  * - If the second element is null or undefined, the corresponding value's property is converted using
//  *   the val2str function..
//  * - If the second element is a function, it is used to convert the value's property.
//  * - If a third element exists in the tuple it is treated as a prefix to be placed before the
//  *   converted property value.
//  *
//  * The order of the names determines in which order the properties should be added to the string.
//  */
//  export function obj2str( val: any,
//     info: (string | [string, null | number | ToStringFunc, string?] )[],
//     separator: string = " "): string
// {
//     if (val == null)
//         return "";
//     else if (typeof val !== "object")
//         return val.toString();

//     let buf: (string)[] = [];
//     for( let nameOrTuple of info)
//     {
//         // get the name of the property in the value to be converted and the corresponding value;
//         // if the properties value is not defined, skip it.
//         let propName = typeof nameOrTuple === "string" ? nameOrTuple : nameOrTuple[0];
//         let propVal = val[propName];
//         if (propVal == null)
//             continue;

//         // check whether we have a prefix
//         let prefix = typeof nameOrTuple === "string" ? undefined : nameOrTuple[2];
//         if (prefix)
//             buf.push( prefix);

//         let convertor = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
//         if (!convertor)
//             buf.push( v2s( propVal));
//         else if (typeof convertor === "number")
//             buf.push( v2sByFuncID( propVal, convertor));
//         else
//             buf.push( convertor( propVal));
//     }

// 	return buf.join(separator);
// }



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
// Numbers
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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
 * Converts a single number-based style value to the CSS string.
 * @param val Number as a style property type.
 * @param convertFunc Function that converts a number to a string.
 */
function numberBasedToString<T>( val: Extended<T>, convertFunc?: NumberToStringFunc): string
{
    return v2s( val, { fromNumber: convertFunc});
}

/**
 * Converts single CssNumber or array of CssNumber objects to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiStyleToString<T>( val: OneOrMany<T>, convertFunc?: NumberToStringFunc,
    separator: string = " "): string
{
    return v2s( val, {
        fromNumber: convertFunc,
        arrItemFunc: v => numberBasedToString( v, convertFunc),
        arrSep: separator
    });
}



/**
 * The mathFunc function returns one of the mathematic CSS function that accepts one or more
 * parameters whose type is derived from NumberBase<T>.
 */
function mathFunc<T>( name: string, params: Extended<T>[], convertFunc?: NumberToStringFunc): string
{
    return `${name}(${multiStyleToString( params, convertFunc, ",")})`;
}



/**
 * The calcFunc function returns the string representation of the calc() CSS function.
 */
function calcFunc<T>( parts: TemplateStringsArray, params: Extended<T>[],
    convertFunc?: NumberToStringFunc): string
{
    return `calc(${templateStringToString( parts, params, (v: any) => numberBasedToString( v, convertFunc))})`;
}



/**
 * The NummberBaseMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
class NumberBaseMath<T = any, U extends string = any, P extends string = any> implements INumberBaseMath<T,U,P>
{
    constructor( protected convertFunc: NumberToStringFunc)
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
        { return numberBasedToString( val, NumberMath.convertFunc); }

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
        { return numberBasedToString( val, PercentMath.convertFunc); }

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
        { return numberBasedToString( val, LengthMath.convertFunc); }

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
        { return numberBasedToString( val, AngleMath.convertFunc); }

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
        { return numberBasedToString( val, TimeMath.convertFunc); }

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
        { return numberBasedToString( val, ResolutionMath.convertFunc); }

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
        { return numberBasedToString( val, FrequencyMath.convertFunc); }

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
    Resolution,
    Frequency,
    Position,
    Color,
    MultiPositionWithComman,
    MultiLengthWithSpace,
    MultiTimeWithComma,
    ArrayWithComma,
    ArrayWithSlash,
    UnitlessOrPercent,
    Radius,
    Border,
    GridAxis,

}



// Map of function IDs to functions that convert a value to string
let registeredV2SFuncs = new Map<number,AnyToStringFunc>([
    [WellKnownFunc.Number, NumberMath.s2s],
    [WellKnownFunc.Percent, PercentMath.s2s],
    [WellKnownFunc.Length, LengthMath.s2s],
    [WellKnownFunc.Angle, AngleMath.s2s],
    [WellKnownFunc.Time, TimeMath.s2s],
    [WellKnownFunc.Resolution, ResolutionMath.s2s],
    [WellKnownFunc.Frequency, FrequencyMath.s2s],
    [WellKnownFunc.Position, pos2str],
    [WellKnownFunc.MultiPositionWithComman, val => multiPos2str( val, ",")],
    [WellKnownFunc.MultiLengthWithSpace, val => LengthMath.ms2s( val, " ")],
    [WellKnownFunc.MultiTimeWithComma, val => LengthMath.ms2s( val, ",")],
    [WellKnownFunc.ArrayWithComma, val => v2s( val, { arrSep: "," })],
    [WellKnownFunc.ArrayWithSlash, val => v2s( val, { arrSep: "/" })],
    [WellKnownFunc.UnitlessOrPercent, unitlessOrPercentToString],
]);



// Next identifier for registering a function that converts a value to string.
let nextRegisteredV2SFuncID = 1000;



/**
 * Registers the given function so that it can be used for converting a value to string using
 * the v2sByFuncID function.
 */
export function registerV2SFuncID( func: AnyToStringFunc, weelKnownID?: WellKnownFunc): number
{
    let funcID = weelKnownID ?? nextRegisteredV2SFuncID++;
    registeredV2SFuncs.set( funcID, func);
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
    let func = registeredV2SFuncs.get( funcID);
    return func ? func(val) : "";
}



