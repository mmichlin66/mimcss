import {Extended, IStringProxy, INumberProxy, CssNumber, MultiCssNumber, INumberMath,
    IFractionMath, CssPosition, MultiCssPosition
} from "./UtilTypes"



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basics.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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

    // Called if value is a string. This allows transforming one string to another.
    fromString?: ( val: string) => string;

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
   if (!options)
    {
        // standard processing:
        // - null/undefined become "initial".
        // - call valueToString (IStringProxy and the like) if exist.
        // - function: call without parameters.
        // - everything else: call toString().
        if (val == null)
            return "";
        else if (typeof val === "string")
            return val;
        else if (Array.isArray(val))
            return arrayToCssString( val);
        else if (typeof val.valueToString === "function")
            return val.valueToString();
        else if (typeof val === "function")
            return val();
        else
            return val.toString();
    }
    else
    {
        // processing with options. For all types except null and string, if the type-specific
        // function is not defined, call fromAny if defined.
        if (val == null)
            return options.fromNull ? options.fromNull( val) : "";
        else if (typeof val === "string")
            return options.fromString ? options.fromString( val) : val;
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
        : val.filter( x => x != null).map( y => func ? func(y) : valueToString( y)).join( separator);
}



/**
 * Converts the given object to a CSS string.
 * @param val Object to convert to string.
 * @param usePropNames Flag indicating whether the names of the object's proprties should be added to the string.
 * @param propsAndFuncs Array of property names and optionally functions. The order of the names determines in
 *     which oprder the properties should be added to the string. If a function is present for the property,
 *     it will be used to convert the property's value to the string. If a function is not present, then the
 *     property value should be converted to the string using the valueToString function.
 */
export function objectToCssString( val: any, usePropNames: boolean,
    ...propsAndFuncs: (string | [string, (val: any) => string])[] ): string
{
    if (val == null || propsAndFuncs.length === 0)
        return "";

    let buf: string[] = [];
    propsAndFuncs.forEach( propAndFunc =>
        {
            let propName = typeof propAndFunc === "string" ? propAndFunc : propAndFunc[0];
            let func = typeof propAndFunc === "string" ? undefined : propAndFunc[1];

            let propVal = val[propName];
            if (propVal == null)
                return;

            if (usePropNames)
                buf.push( propName);

            if (func)
                buf.push( func( propVal));
            else if (propVal != null)
                buf.push( valueToString( propVal));
        }
    );

	return buf.join(" ");
}



/**
 * The StringProxy class implements the IStringProxy interface by encapsulating the string.
 */
export class StringProxy implements IStringProxy
{
    /** Flag indicating that this object implements the IStringProxy interface */
    public get isStringProxy(): boolean { return true; }

    constructor( s?: string | IStringProxy)
    {
        this.s = s;
    }

    /** Converts internally held value(s) to string */
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
type ConvertNumberFuncType = (n: number) => string;



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
function styleToString( val: Extended<CssNumber>, convertFunc?: ConvertNumberFuncType): string
{
    return valueToString( val, { fromNumber: convertFunc});
}

/**
 * Converts single CssNumber or array of CssNumber objects to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiStyleToString( val: Extended<MultiCssNumber>,
                convertFunc: ConvertNumberFuncType, separator: string): string
{
    return valueToString( val, {
        fromNumber: convertFunc,
        arrayItemFunc: v => styleToString( v, convertFunc),
        arraySeparator: separator
    });
}



/**
 * Replaces patterns {index[|unit]} in the format string with values from the given array.
 * @param format 
 * @param convertFunc 
 * @param params 
 */
function formatNumbers( format: string, params: Extended<CssNumber>[], convertFunc?: ConvertNumberFuncType): string
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
            return styleToString( param, convertFunc);
    }

    return format.replace( /{\s*(\d*)\s*(?:\|\s*([a-zA-Z\%]+)\s*)?}/g, replacer);
}



/**
 * The NumberProxy class implements the INumberProxy interface by encapsulating parameters of a
 * mathematic CSS function that accepts one or more parameters of type CssNumber.
 */
abstract class NumberProxy implements INumberProxy
{
    /** Flag indicating that this object implements the INumerProxy interface */
    public get isNumberProxy(): boolean { return true; }

    constructor( params: Extended<CssNumber>[], convertFunc?: ConvertNumberFuncType)
    {
        this.convertFunc = convertFunc;
        this.params = params;
    }

    /** Converts internally held value(s) to string - should be implemented by the derived classes */
    abstract valueToString(): string;

    // Function that converts JavaScript numbers to strings (e.g. by appending a suffix for units).
    // If not defined, numbers are converted to strings without appending any suffix.
    protected convertFunc: ConvertNumberFuncType;

    // Array of CssNumber parameters to the mathematical function.
    protected params: Extended<CssNumber>[];
}



/**
 * The MathFuncProxy class implements the INumberProxy interface by encapsulating parameters of a
 * mathematic CSS function that accepts one or more parameters of type CssNumber.
 */
class MathFuncProxy extends NumberProxy
{
    constructor( name: string, params: Extended<CssNumber>[], convertFunc?: ConvertNumberFuncType)
    {
        super( params, convertFunc);
        this.name = name;
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return `${this.name}(${multiStyleToString( this.params, this.convertFunc, ",")})`;
    }

    // Name of the mathematical function.
    private name: string;
}



/**
 * The CalcFuncProxy class implements the INumberProxy interface by encapsulating parameters of a
 * calc() CSS function that accepts a formula string and zero or more parameters of type CssNumber.
 */
class CalcFuncProxy extends NumberProxy
{
    constructor( formula: string, params: Extended<CssNumber>[], convertFunc?: ConvertNumberFuncType)
    {
        super( params, convertFunc);
        this.formula = formula;
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        return `calc(${formatNumbers( this.formula, this.params, this.convertFunc)})`;
    }

    // Calculation formula with placeholders.
    private formula: string;
}



/**
 * The NummberMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
class NumberMath implements INumberMath
{
    constructor( protected convertFunc: ConvertNumberFuncType)
    {
    }

    public numberToString = (n: number): string =>
    {
        return this.convertFunc( n);
    }

    public styleToString = (val: Extended<CssNumber>): string =>
    {
        return styleToString( val, this.convertFunc);
    }

    public multiStyleToString = (val: Extended<MultiCssNumber>, separator: string = " "): string =>
    {
        return multiStyleToString( val, this.convertFunc, separator);
    }

    public min( ...params: Extended<CssNumber>[]): INumberProxy
    {
        return new MathFuncProxy( "min", params, this.convertFunc);
    }

    public max( ...params: Extended<CssNumber>[]): INumberProxy
    {
        return new MathFuncProxy( "max", params, this.convertFunc);
    }

    public clamp( min: Extended<CssNumber>, pref: Extended<CssNumber>, max: Extended<CssNumber>): INumberProxy
    {
        return new MathFuncProxy( "clamp", [min, pref, max], this.convertFunc);
    }

    public calc( formula: string, ...params: Extended<CssNumber>[]): INumberProxy
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
 * The NumMath class contains methods that implement CSS mathematic functions on the
 * <number> CSS types.
 */
export class NumMath extends NumberMath
{
    public static convertFunc( n: number) { return n.toString(); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, NumMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, NumMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, NumMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, NumMath.convertFunc, ","); }

    constructor() { super( NumMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Length
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The LengthMath class contains methods that implement CSS mathematic functions on the
 * <length> CSS types.
 */
export class LengthMath extends NumberMath
{
    public static convertFunc( n: number) { return numberToCssString( n, "px", "em"); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, LengthMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, LengthMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, LengthMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, LengthMath.convertFunc, ","); }

    constructor() { super( LengthMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Angle
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The AngleMath class contains methods that implement CSS mathematic functions on the
 * <angle> CSS types.
 */
export class AngleMath extends NumberMath
{
    public static convertFunc( n: number) { return numberToCssString( n, "deg", "rad"); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, AngleMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, AngleMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, AngleMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, AngleMath.convertFunc, ","); }

    constructor() { super( AngleMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Time
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The TimeMath class contains methods that implement CSS mathematic functions on the
 * <time> CSS types.
 */
export class TimeMath extends NumberMath
{
    public static convertFunc( n: number) { return numberToCssString( n, "ms", "s"); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, TimeMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, TimeMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, TimeMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, TimeMath.convertFunc, ","); }

    constructor() { super( TimeMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Resolution
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The ResolutionMath class contains methods that implement CSS mathematic functions on the
 * <resolution> CSS types.
 */
export class ResolutionMath extends NumberMath
{
    public static convertFunc( n: number) { return numberToCssString( n, "dpi", "dpcm"); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, ResolutionMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, ResolutionMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, ResolutionMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, ResolutionMath.convertFunc, ","); }

    constructor() { super( ResolutionMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Frequency
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The FrequencyMath class contains methods that implement CSS mathematic functions on the
 * <frequence> CSS types.
 */
export class FrequencyMath extends NumberMath
{
    public static convertFunc( n: number) { return numberToCssString( n, "Hz", "kHz"); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, FrequencyMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, FrequencyMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, FrequencyMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, FrequencyMath.convertFunc, ","); }

    constructor() { super( FrequencyMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The FractionMath class contains methods that implement CSS mathematic functions on the
 * <fraction> CSS types.
 */
export class FractionMath extends NumberMath implements IFractionMath
{
    public static convertFunc( n: number) { return numberToCssString( n, "fr", "fr"); }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, FractionMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, FractionMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, FractionMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, FractionMath.convertFunc, ","); }

    constructor() { super( FractionMath.convertFunc) }

    public minmax( min: Extended<CssNumber>, max: Extended<CssNumber>): INumberProxy
    {
        return new MathFuncProxy( "minmax", [min, max], this.convertFunc);
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The PercentMath class contains methods that implement CSS mathematic functions on the
 * <percent> CSS types.
 */
export class PercentMath extends NumberMath
{
    public static convertFunc( n: number): string
        { return (Number.isInteger(n) ? n : n > -1.0 && n < 1.0 ? Math.round( n * 100) : Math.round(n)) + "%"; }

    public static styleToString( val: Extended<CssNumber>)
        { return styleToString( val, PercentMath.convertFunc); }

    public static multiStyleToString( val: Extended<MultiCssNumber>, separator: string)
        { return multiStyleToString( val, PercentMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, PercentMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<MultiCssNumber>)
        { return multiStyleToString( val, PercentMath.convertFunc, ","); }

    constructor() { super( FractionMath.convertFunc) }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Position
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts single position style value to the CSS string.
 */
export function positionToString( val: Extended<CssPosition>): string
{
    return valueToString( val, {
        fromNull: v => null,
        fromNumber: LengthMath.styleToString,
        fromArray: LengthMath.multiStyleToStringWithSpace
    });
}

/**
 * Converts multi-position style value to the CSS string.
 */
export function multiPositionToString( val: Extended<MultiCssPosition>, separator: string): string
{
    return valueToString( val, {
        arrayItemFunc: positionToString,
        arraySeparator: separator
    });
}



