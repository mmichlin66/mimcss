import {
    Extended, INumericMath, IGenericProxy, CssLength, CssAngle, CssTime, CssResolution,
    CssFrequency, CssPosition, OneOrMany, LengthUnits, PercentUnits, AngleUnits, TimeUnits,
    ResolutionUnits, FrequencyUnits, CssNumber, CssPercent, NumberUnits
} from "../api/CoreTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Case conversions for property names.
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
 * Numeric identifiers corresponding to well known functions used to convert style property values
 * to strings. This is used to reduce the size of the object used for mapping style properties to
 * conversion functions.
 */
export const enum WKF
{
    Number = 1,
    Percent,
    Length,
    Angle,
    Time,
    Resolution,
    Frequency,
    Position,
    AtPosition,
    Color,
    MultiPositionWithComma,
    MultiLengthWithSpace,
    MultiTimeWithComma,
    OneOrManyWithComma,
    OneOrManyWithSlash,
    UnitlessOrPercent,
    Radius,
    Border,
    GridAxis,

    // indicates the length of the array needed to keep conversion functions
    Last
}



/**
 * Array of well known conversion functions. Indexes are the identifier of well known functions
 * from the WellKnownFunc enumeration
 */
export let wkf: AnyToStringFunc[] = new Array( WKF.Last);



/**
 * The V2SOptions type defines options on how to convert values of differnt
 * types to strings. A value is converted according to the following rules:
 * - If the option is a number it is treated as an ID of a registered conversion function.
 * - If the option is a function, it is invoked to convert the value.
 * - If the option is an object, then depending on the type of the value, one of the fromXxx
 *   methods defines how the value is converted.
 */
export type V2SOptions = WKF | AnyToStringFunc |
{
    // String value to use or function to call if value is null or undefined
    fromNull?: string | ((val?: null) => string);

    // String value to use or function to call if value is a boolean
    fromBool?: (val: boolean) => string;

    // Options to use if value is a string. This allows transforming one string to another.
    fromString?: (val: string) => string;

    // Options to use if value is a number
    fromNumber?: WKF | NumberToStringFunc;

    // Options to use if value is an array
    fromArray?: WKF | ((val: any[]) => string);

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

wkf[WKF.OneOrManyWithComma] = v => v2s( v, { arrSep: "," });
wkf[WKF.OneOrManyWithSlash] = v => v2s( v, { arrSep: "/" });



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
    {
        let func = wkf[options];
        return func ? func(val) : "";
    }
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
            else if (val.length === 0)
                return "";
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
                return o2s( val, options.fromProps, separator);
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
        : val.map( v => v2s( v, options)).filter( v => !!v).join( separator);
}



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
 * Converts properties of the given object to string by converting each property from the options
 * array and joining them using the given separator.
 * @param val
 * @param options
 * @param separator
 */
export function o2s( val: {[p:string]: any}, options: P2SOptions, separator?: string): string
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

    return params.filter( v => !!v).join( separator ?? " ");
}



/**
 * Converts the given array of values to a single string according to the specified options and
 * using the given separator. For each item in the array, the v2s function is called to convert
 * it to string.
 * @param values
 * @param separator
 */
export function mv2s( values: (any | [any, V2SOptions?])[], separator: string = " "): string
{
    if (values == null || values.length === 0)
        return "";

    let arr: string[] = [];
    for( let item of values)
    {
        let val: any;
        let options: V2SOptions | undefined;
        if (Array.isArray(item))
        {
            val = item[0];
            options = item[1];
        }
        else
            val = item;

        arr.push( v2s( val, options));
    }

    return arr.filter( v => !!v).join( separator);
}



/**
 * Converts the given values as parameters to the given CSS function invocation.
 * @param name
 * @param values
 * @param separator
 */
export function f2s( name: string, values: (any | [any, V2SOptions?])[], separator = ",")
{
    return `${name}(${mv2s( values, separator)})`;
}



/**
 * The tag2s is a tag function helper that converts the template string with
 * parameters to a string using the given function to convert parameters.
 */
export function tag2s( parts: TemplateStringsArray, params: any[],
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
function numberStyleToString<T>( val: Extended<T>, convertFunc?: NumberToStringFunc): string
{
    return v2s( val, { fromNumber: convertFunc});
}

/**
 * Converts single numeric style value or array of numericstyle values to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiNumberStyleToString<T>( val: OneOrMany<T>, convertFunc?: NumberToStringFunc,
    separator: string = " "): string
{
    return v2s( val, {
        fromNumber: convertFunc,
        arrItemFunc: v => numberStyleToString( v, convertFunc),
        arrSep: separator
    });
}



/**
 * The mathFunc function returns one of the mathematic CSS function that accepts one or more
 * parameters whose type is derived from NumberBase<T>.
 */
function mathFunc<T>( name: string, params: Extended<T>[], convertFunc?: NumberToStringFunc): string
{
    return `${name}(${multiNumberStyleToString( params, convertFunc, ",")})`;
}



/**
 * The calcFunc function returns the string representation of the calc() CSS function.
 */
function calcFunc<T>( parts: TemplateStringsArray, params: Extended<T>[],
    convertFunc?: NumberToStringFunc): string
{
    return `calc(${tag2s( parts, params, (v: any) => numberStyleToString( v, convertFunc))})`;
}



/**
 * The NumericMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
export class NumericMath<T = any, U extends string = any> implements INumericMath<T,U>
{
    public n2s: NumberToStringFunc;

    constructor( n2s: NumberToStringFunc)
    {
        this.n2s = n2s;
    }

    public v2s( val: Extended<T>): string
    {
        return numberStyleToString( val, this.n2s);
    }

    public mv2s( val: OneOrMany<T>, separator: string): string
    {
        return multiNumberStyleToString( val, this.n2s, separator);
    }

    /** Creates CssLength value from the number and the given unit. */
    public units( n: number, unit: U): IGenericProxy<U>
    {
        return () => n + unit;
    }

    public min( ...params: Extended<T>[]): IGenericProxy<U>
    {
        return () => mathFunc( "min", params, this.n2s);
    }

    public max( ...params: Extended<T>[]): IGenericProxy<U>
    {
        return () => mathFunc( "max", params, this.n2s);
    }

    public clamp( min: Extended<T>, pref: Extended<T>, max: Extended<T>): IGenericProxy<U>
    {
        return () => mathFunc( "clamp", [min, pref, max], this.n2s);
    }

    public calc( formulaParts: TemplateStringsArray, ...params: Extended<T>[]): IGenericProxy<U>
    {
        return () => calcFunc( formulaParts, params, this.n2s);
    }
}



/**
 * The NumberMath object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type.
 */
export let NumberMath = new NumericMath<CssNumber,NumberUnits>( n => n.toString());

wkf[WKF.Number] = v => NumberMath.v2s( v);



/**
 * The PercentMath object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type by appending a "%" unit suffix.
 */
export let PercentMath = new NumericMath<CssPercent,PercentUnits>(
    n => (Number.isInteger(n) ? n : Math.round(n * 100)) + "%");

wkf[WKF.Percent] = v => PercentMath.v2s( v);

/**
 * Converts the given number to string using the following rules:
 * - if the number is between -1 and 1 (non inclusive), multiplies the number and appends "%"
 * - otherwise, converts the number to string without appending any units.
 */
function unitlessOrPercentToString( n: number): string
{
    return n >= 1 || n <= -1 ? n.toString() : Math.round(n * 100) + "%";
}

wkf[WKF.UnitlessOrPercent] = unitlessOrPercentToString;



/**
 * The LengthMath object contains methods that implement CSS mathematic functions on the `<length>`
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let LengthMath = new NumericMath<CssLength,LengthUnits>( n => numberToString( n, "px", "em"));

wkf[WKF.Length] = v => LengthMath.v2s( v);
wkf[WKF.MultiLengthWithSpace] = v => LengthMath.mv2s( v, " ");



/**
 * The AngleMath object contains methods that implement CSS mathematic functions on the `<angle>`
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "turn".
 */
export let AngleMath = new NumericMath<CssAngle,AngleUnits>( n => numberToString( n, "deg", "turn"));

wkf[WKF.Angle] = v => AngleMath.v2s( v);



/**
 * The TimeMath object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let TimeMath = new NumericMath<CssTime,TimeUnits>( n => numberToString( n, "ms", "s"));

wkf[WKF.Time] = v => TimeMath.v2s( v);
wkf[WKF.MultiTimeWithComma] = v => TimeMath.mv2s( v, ",");


/**
 * The ResolutionMath object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "x".
 */
export let ResolutionMath = new NumericMath<CssResolution,ResolutionUnits>( n => numberToString( n, "dpi", "x"));

wkf[WKF.Resolution] = v => ResolutionMath.v2s( v);


/**
 * The FrequencyMath object contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let FrequencyMath = new NumericMath<CssFrequency, FrequencyUnits>( n => numberToString( n, "Hz", "kHz"));

wkf[WKF.Frequency] = v => FrequencyMath.v2s( v);


///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts single position style value to the CSS string.
 */
function pos2s( val: Extended<CssPosition>): string
{
    return v2s( val, { fromAny: WKF.Length });
}

/**
 * Converts multi-position style value to the CSS string.
 */
function mpos2s( val: Extended<OneOrMany<CssPosition>>, separator: string): string
{
    return v2s( val, {
        arrItemFunc: pos2s,
        arrSep: separator
    });
}

wkf[WKF.Position] = pos2s;
wkf[WKF.AtPosition] = v => v == null ? "" : "at " + pos2s(v);
wkf[WKF.MultiPositionWithComma] = val => mpos2s( val, ",");



