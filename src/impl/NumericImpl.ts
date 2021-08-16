import {Extended, IGenericProxy, OneOrMany} from "../api/CoreTypes";
import {
    INumericMath, CssLength, CssAngle, CssTime, CssResolution,
    CssFrequency, CssPosition, LengthUnits, PercentUnits, AngleUnits, TimeUnits,
    ResolutionUnits, FrequencyUnits, CssNumber, CssPercent, CssRadius, BorderRadius
} from "../api/NumericTypes";
import {a2s, NumberToStringFunc, tag2s, v2s, wkf, WKF} from "./Utils";



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
    return v2s( val, { num: convertFunc});
}

/**
 * Converts single numeric style value or array of numericstyle values to the CSS string.
 * @param val Single- or multi-number style value.
 * @param convertFunc Function that converts a number to a string.
 * @param separator String to use to separate multiple values.
 */
function multiNumberStyleToString<T>( val: OneOrMany<Extended<T>>, convertFunc?: NumberToStringFunc,
    separator: string = " "): string
{
    return v2s( val, {
        num: convertFunc,
        item: v => numberStyleToString( v, convertFunc),
        sep: separator
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

    public mv2s( val: OneOrMany<Extended<T>>, separator: string): string
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
export let NumberMath = new NumericMath<CssNumber,"">( n => n.toString());

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
// Size, Point, Position, Radius
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Converts single position style value to the CSS string.
function pos2s( val: Extended<CssPosition>): string
{
    return v2s( val, { any: WKF.Length });
}

/**
 * Converts multi-position style value to the CSS string.
 */
function mpos2s( val: OneOrMany<Extended<CssPosition>>): string
{
    return v2s( val, {
        arr: (v: any[]) => {
            if (v.length === 0)
                return "";
            else if (Array.isArray(v[0]))
                return a2s( v, { any: pos2s }, ",");
            else
                return pos2s(v as CssPosition);
        },
        any: pos2s
    });
}

wkf[WKF.Position] = pos2s;
wkf[WKF.AtPosition] = (v: Extended<CssPosition>) => v == null ? "" : "at " + pos2s(v);
wkf[WKF.MultiPosition] = mpos2s;



// Converts corner radius style value to the CSS string.
wkf[WKF.Radius] = (v: Extended<CssRadius>) => v2s( v, { any: WKF.Length });



/**
 * Converts border radius style value to the CSS string.
 */
 function borderRadius2s( val: Extended<BorderRadius>): string
 {
     return v2s( val, {
         arr: v =>
         {
             if (Array.isArray( v[0]))
                return a2s( v, {any: WKF.Length}, "/");
             else
                 return a2s( v, WKF.Length);
         },
         any: WKF.Length
     });
 }

 wkf[WKF.BorderRadius] = borderRadius2s;



