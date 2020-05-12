import {
    Extended, NumberProxy, CssNumber, CssMultiNumber, INumberMath,
    ICssFractionMath, CssPosition, MultiCssPosition, NumberBase, MultiNumberBase,
    CssLength, CssMultiLength, CssAngle, CssMultiAngle, CssTime, CssMultiTime,
    CssResolution, CssMultiResolution, CssFrequency, CssMultiFrequency, CssFraction,
    CssMultiFraction, CssPercent, CssMultiPercent, ICssLengthMath,
    ICssAngleMath, ICssPercentMath, ICssFrequencyMath, ICssResolutionMath, ICssTimeMath,
    NumberType, LengthType, PercentType, AngleType, TimeType, ResolutionType, FrequencyType, FractionType
} from "./UtilTypes"



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
    fromObject?: (val: any) => string;

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
        // - null/undefined become empty string.
        // - call valueToString (proxy objects) if exist.
        // - function: call without parameters.
        // - everything else: call toString().
        if (val == null)
            return "";
        else if (typeof val === "string")
            return val;
        else if (Array.isArray(val))
            return arrayToString( val);
        else if (typeof val === "function")
            return val();
        else if (typeof val.valueToString === "function")
            return val.valueToString();
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
        else if (typeof val === "number")
            return options.fromNumber ? options.fromNumber( val) : options.fromAny ? options.fromAny( val) : val.toString();
        else if (typeof val === "function")
            return valueToString( options.funcArgs ? val( ...options.funcArgs) : val());
        else if (Array.isArray(val))
        {
            if (options.fromArray)
                return options.fromArray( val);
            else
            {
                let separator = options.arraySeparator != null ? options.arraySeparator : " ";
                return arrayToString( val, options.arrayItemFunc || options.fromAny || undefined, separator);
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
export function arrayToString( val: any[], func?: (v) => string, separator: string = " "): string
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
 *     which order the properties should be added to the string. If a function is present for the property,
 *     it will be used to convert the property's value to the string. If a function is not present, then the
 *     property value should be converted to the string using the valueToString function.
 */
export function objectToString( val: any, propsAndFuncs: (string | [string, (val: any) => string, string?])[],
    separator: string = " ", usePropNames: boolean = false): string
{
    if (val == null || propsAndFuncs.length === 0)
        return "";

    let buf: (string)[] = [];
    propsAndFuncs.forEach( propAndFunc =>
        {
            let propName = typeof propAndFunc === "string" ? propAndFunc : propAndFunc[0];

            let propVal = val[propName];
            if (propVal == null)
                return;

            if (usePropNames)
                buf.push( propName);

            let prefix = typeof propAndFunc === "string" ? undefined : propAndFunc[2];
            if (prefix)
                buf.push( prefix);

            let func = typeof propAndFunc === "string" ? undefined : propAndFunc[1];
            if (func)
                buf.push( func( propVal));
            else if (propVal != null)
                buf.push( valueToString( propVal));
        }
    );

	return buf.join(separator);
}



/**
 * The templateStringToString is a tag function helper that converts the template string with
 * parameters to a string using the given function to convert parameters.
 */
export function templateStringToString( parts: TemplateStringsArray, params: any[],
    convertFunc: ( v: any) => string): string
{
    // number of parameters is always 1 less than the number of string parts
    let paramsLen = params.length;
    if (paramsLen === 0)
        return parts[0];

    let s = "";
    for( let i = 0; i < paramsLen; i++)
        s += parts[i] + convertFunc( params[i]);

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
function styleToString<T extends string>( val: Extended<NumberBase<T>>,
    convertFunc?: ConvertNumberFuncType): string
{
    return valueToString( val, { fromNumber: convertFunc});
}

/**
 * Converts single CssNumber or array of CssNumber objects to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiStyleToString<T extends string>( val: Extended<MultiNumberBase<T>>,
                convertFunc?: ConvertNumberFuncType, separator: string = " "): string
{
    return valueToString( val, {
        fromNumber: convertFunc,
        arrayItemFunc: v => styleToString( v, convertFunc),
        arraySeparator: separator
    });
}



/**
 * The mathFunc function returns one of the mathematic CSS function that accepts one or more
 * parameters whose type is derived from NumberBase<T>.
 */
function mathFunc<T extends string>( name: string, params: Extended<NumberBase<T>>[],
    convertFunc?: ConvertNumberFuncType): string
{
    return `${name}(${multiStyleToString( params, convertFunc, ",")})`;
}



/**
 * The calcFunc function returns the string representation of the calc() CSS function.
 */
function calcFunc<T extends string>( parts: TemplateStringsArray, params: Extended<NumberBase<T>>[],
    convertFunc?: ConvertNumberFuncType): string
{
    return `calc(${templateStringToString( parts, params, (v: any) => styleToString( v, convertFunc))})`;
}



/**
 * The unitFunc function returns string representation of the given number with the given units.
 */
function unitFunc<T extends string>( n: number, unit: string): string
{
    return n + unit;
}



/**
 * The NummberMath class contains methods that implement CSS mathematic functions on the
 * numeric CSS types. When arguments for these functions are of the number JavaScript type they
 * are converted to strings by calling a function specified in the constructor.
 */
class NumberMath<T extends string> implements INumberMath<T>
{
    constructor( protected convertFunc: ConvertNumberFuncType)
    {
    }

    public numberToString = (n: number): string =>
    {
        return this.convertFunc( n);
    }

    public styleToString = (val: Extended<NumberBase<T>>): string =>
    {
        return styleToString( val, this.convertFunc);
    }

    public multiStyleToString = (val: Extended<MultiNumberBase<T>>, separator: string = " "): string =>
    {
        return multiStyleToString( val, this.convertFunc, separator);
    }

    public min( ...params: Extended<NumberBase<T>>[]): NumberProxy<T>
    {
        return () => mathFunc( "min", params, this.convertFunc);
    }

    public max( ...params: Extended<NumberBase<T>>[]): NumberProxy<T>
    {
        return () => mathFunc( "max", params, this.convertFunc);
    }

    public clamp( min: Extended<NumberBase<T>>, pref: Extended<NumberBase<T>>, max: Extended<NumberBase<T>>): NumberProxy<T>
    {
        return () => mathFunc( "clamp", [min, pref, max], this.convertFunc);
    }

    public calc( formulaParts: TemplateStringsArray, ...params: Extended<NumberBase<T>>[]): NumberProxy<T>
    {
        return () => calcFunc( formulaParts, params, this.convertFunc);
    }

    public percent( n: number)
    {
        return () => CssPercentMath.convertFunc(n);
    }

    public unit( n: number, unit: string): NumberProxy<T>
    {
        return () => unitFunc<T>( n, unit);
    }
}



/**
 * The INumberMathClass interface represents a "static" side of classes derived from the
 * NumberMath class.
 */
export interface INumberMathClass<T extends string>
{
    convertFunc( n: number): string;

    styleToString( val: Extended<NumberBase<T>>): string;

    multiStyleToString( val: Extended<MultiNumberBase<T>>, separator: string): string;

    multiStyleToStringWithSpace( val: Extended<MultiNumberBase<T>>): string;

    multiStyleToStringWithComma( val: Extended<MultiNumberBase<T>>): string;

    new(): INumberMath<T>;
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
export class CssNumberMath extends NumberMath<NumberType>
{
    public static convertFunc( n: number): string { return n.toString(); }

    public static styleToString( val: Extended<CssNumber>): string
        { return styleToString( val, CssNumberMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiNumber>, separator: string): string
        { return multiStyleToString( val, CssNumberMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiNumber>): string
        { return multiStyleToString( val, CssNumberMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiNumber>): string
        { return multiStyleToString( val, CssNumberMath.convertFunc, ","); }

    constructor() { super( CssNumberMath.convertFunc) }
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
export class CssPercentMath extends NumberMath<PercentType> implements ICssPercentMath
{
    public static convertFunc( n: number): string
        { return (Number.isInteger(n) ? n : Math.round(n * 100)) + "%"; }

    public static styleToString( val: Extended<CssPercent>): string
        { return styleToString( val, CssPercentMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiPercent>, separator: string): string
        { return multiStyleToString( val, CssPercentMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiPercent>): string
        { return multiStyleToString( val, CssPercentMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiNumber>): string
        { return multiStyleToString( val, CssPercentMath.convertFunc, ","); }

    constructor() { super( CssFractionMath.convertFunc) }
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
export class CssLengthMath extends NumberMath<LengthType> implements ICssLengthMath
{
    public static convertFunc( n: number): string { return numberToString( n, "px", "em"); }

    public static styleToString( val: Extended<CssLength>): string
        { return styleToString( val, CssLengthMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiLength>, separator: string): string
        { return multiStyleToString( val, CssLengthMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiLength>): string
        { return multiStyleToString( val, CssLengthMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiLength>): string
        { return multiStyleToString( val, CssLengthMath.convertFunc, ","); }

    constructor() { super( CssLengthMath.convertFunc) }

    public Q( n: number) { return this.unit( n, "Q"); }
    public ch( n: number) { return this.unit( n, "ch"); }
    public cm( n: number) { return this.unit( n, "cm"); }
    public em( n: number) { return this.unit( n, "em"); }
    public ex( n: number) { return this.unit( n, "ex"); }
    public ic( n: number) { return this.unit( n, "ic"); }
    public in( n: number) { return this.unit( n, "in"); }
    public lh( n: number) { return this.unit( n, "lh"); }
    public mm( n: number) { return this.unit( n, "mm"); }
    public pc( n: number) { return this.unit( n, "pc"); }
    public pt( n: number) { return this.unit( n, "pt"); }
    public px( n: number) { return this.unit( n, "px"); }
    public vb( n: number) { return this.unit( n, "vb"); }
    public vh( n: number) { return this.unit( n, "vh"); }
    public vi( n: number) { return this.unit( n, "vi"); }
    public vw( n: number) { return this.unit( n, "vw"); }
    public rem( n: number) { return this.unit( n, "rem"); }
    public rlh( n: number) { return this.unit( n, "rlh"); }
    public vmax( n: number) { return this.unit( n, "vmax"); }
    public vmin( n: number) { return this.unit( n, "vmin"); }
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
export class CssAngleMath extends NumberMath<AngleType> implements ICssAngleMath
{
    public static convertFunc( n: number): string { return numberToString( n, "deg", "turn"); }

    public static styleToString( val: Extended<CssAngle>): string
        { return styleToString( val, CssAngleMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiAngle>, separator: string): string
        { return multiStyleToString( val, CssAngleMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiAngle>): string
        { return multiStyleToString( val, CssAngleMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiAngle>): string
        { return multiStyleToString( val, CssAngleMath.convertFunc, ","); }

    constructor() { super( CssAngleMath.convertFunc) }

    public deg( n: number) { return this.unit( n, "deg"); }
    public rad( n: number) { return this.unit( n, "rad"); }
    public grad( n: number) { return this.unit( n, "grad"); }
    public turn( n: number) { return this.unit( n, "turn"); }
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
export class CssTimeMath extends NumberMath<TimeType> implements ICssTimeMath
{
    public static convertFunc( n: number): string { return numberToString( n, "ms", "s"); }

    public static styleToString( val: Extended<CssTime>): string
        { return styleToString( val, CssTimeMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiTime>, separator: string): string
        { return multiStyleToString( val, CssTimeMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiTime>): string
        { return multiStyleToString( val, CssTimeMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiTime>): string
        { return multiStyleToString( val, CssTimeMath.convertFunc, ","); }

    constructor() { super( CssTimeMath.convertFunc) }

    public ms( n: number) { return this.unit( n, "ms"); }
    public s( n: number) { return this.unit( n, "s"); }
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
export class CssResolutionMath extends NumberMath<ResolutionType> implements ICssResolutionMath
{
    public static convertFunc( n: number): string { return numberToString( n, "dpi", "x"); }

    public static styleToString( val: Extended<CssResolution>): string
        { return styleToString( val, CssResolutionMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiResolution>, separator: string): string
        { return multiStyleToString( val, CssResolutionMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiResolution>): string
        { return multiStyleToString( val, CssResolutionMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiResolution>): string
        { return multiStyleToString( val, CssResolutionMath.convertFunc, ","); }

    constructor() { super( CssResolutionMath.convertFunc) }

    /** Creates resolution value in DPI */
    public dpi( n: number) { return this.unit( n, "dpi"); }

    /** Creates resolution value in DPCM */
    public dpcm( n: number) { return this.unit( n, "dpcm"); }

    /** Creates resolution value in DPPX */
    public dppx( n: number) { return this.unit( n, "dppx"); }

    /** Creates resolution value in DPPX */
    public x( n: number) { return this.unit( n, "x"); }
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
export class CssFrequencyMath extends NumberMath<FrequencyType> implements ICssFrequencyMath
{
    public static convertFunc( n: number): string { return numberToString( n, "Hz", "kHz"); }

    public static styleToString( val: Extended<CssFrequency>): string
        { return styleToString( val, CssFrequencyMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiFrequency>, separator: string): string
        { return multiStyleToString( val, CssFrequencyMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiFrequency>): string
        { return multiStyleToString( val, CssFrequencyMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiFrequency>): string
        { return multiStyleToString( val, CssFrequencyMath.convertFunc, ","); }

    constructor() { super( CssFrequencyMath.convertFunc) }

    public hz( n: number) { return this.unit( n, "Hz"); }
    public khz( n: number) { return this.unit( n, "kHz"); }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Fraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The CssFractionMath class contains methods that implement CSS mathematic functions on the
 * <fraction> CSS types.
 */
export class CssFractionMath extends NumberMath<FractionType> implements ICssFractionMath
{
    public static convertFunc( n: number): string { return numberToString( n, "fr", "fr"); }

    public static styleToString( val: Extended<CssFraction>): string
        { return styleToString( val, CssFractionMath.convertFunc); }

    public static multiStyleToString( val: Extended<CssMultiFraction>, separator: string): string
        { return multiStyleToString( val, CssFractionMath.convertFunc, separator); }

    public static multiStyleToStringWithSpace( val: Extended<CssMultiFraction>): string
        { return multiStyleToString( val, CssFractionMath.convertFunc, " "); }

    public static multiStyleToStringWithComma( val: Extended<CssMultiFraction>): string
        { return multiStyleToString( val, CssFractionMath.convertFunc, ","); }

    constructor() { super( CssFractionMath.convertFunc) }

    public minmax( min: Extended<CssFraction>, max: Extended<CssFraction>): NumberProxy<FractionType>
    {
        return () => mathFunc( "minmax", [min, max], CssFractionMath.convertFunc);
    }

    public fr( n: number) { return this.unit( n, "fr"); }
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
        fromNull: v => "",
        fromNumber: CssLengthMath.styleToString,
        fromArray: CssLengthMath.multiStyleToStringWithSpace
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



