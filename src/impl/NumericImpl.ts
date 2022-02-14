import {Extended, IGenericProxy, OneOrMany} from "../api/CoreTypes";
import {
    INumericMath, CssLength, CssAngle, CssTime, CssResolution,
    CssFrequency, CssPosition, LengthUnits, PercentUnits, AngleUnits, TimeUnits,
    ResolutionUnits, FrequencyUnits, CssNumber, CssPercent, CssRadius, BorderRadius
} from "../api/NumericTypes";
import {NumberToStringFunc, tag2s, v2s, wkf, WKF} from "./Utils";



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
const numberToString = (n: number, intUnit: string = "", floatUint: string = ""): string =>
    n + (Number.isInteger(n) ?  intUnit : floatUint);



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
        return v2s( val, { num: this.n2s });
    }

    public mv2s( val: OneOrMany<T>, separator: string): string
    {
        return v2s( val, {
            any: v => this.v2s(v),
            sep: separator
        });
    }

    /** Creates CssLength value from the number and the given unit. */
    public units( n: number, unit: U): IGenericProxy<U>
    {
        return () => n + unit;
    }

    public min( ...params: Extended<T>[]): IGenericProxy<U>
    {
        return () => this.m( "min", params);
    }

    public max( ...params: Extended<T>[]): IGenericProxy<U>
    {
        return () => this.m( "max", params);
    }

    public clamp( min: Extended<T>, pref: Extended<T>, max: Extended<T>): IGenericProxy<U>
    {
        // return () => mathFunc( "clamp", [min, pref, max], this.n2s);
        return () => this.m( "clamp", [min, pref, max]);
    }

    public calc( formulaParts: TemplateStringsArray, ...params: Extended<T>[]): IGenericProxy<U>
    {
        return () => `calc(${tag2s( formulaParts, params, (v: Extended<T>) => this.v2s(v))})`;
    }

    private m( name: string, params: Extended<T>[]): string
    {
        return `${name}(${this.mv2s( params, ",")})`;
    }
}



/**
 * The NumberMath object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type.
 */
export const NumberMath = new NumericMath<CssNumber,"">( n => n.toString());

wkf[WKF.Number] = v => NumberMath.v2s( v);



/**
 * The PercentMath object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type by appending a "%" unit suffix. If the number is between -1 and 1 (non
 * inclusive), multiplies the number by 100.
 */
export const PercentMath = new NumericMath<CssPercent,PercentUnits>(
    n => (n >= 1 || n <= -1 ? n : Math.round(n * 100)) + "%");

/**
 * Converts the given number to string using the following rules:
 * - if the number is between -1 and 1 (non inclusive), multiplies the number by 100 and appends "%"
 * - otherwise, converts the number to string without appending any units.
 */
const unitlessOrPercentToString = (n: number): string => n >= 1 || n <= -1 ? n.toString() : (Math.round(n * 100) + "%");

wkf[WKF.Percent] = v => PercentMath.v2s( v);
wkf[WKF.UnitlessOrPercent] = unitlessOrPercentToString;
wkf[WKF.AlwaysPercent] = v => v + "%";



/**
 * The LengthMath object contains methods that implement CSS mathematic functions on the `<length>`
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export const LengthMath = new NumericMath<CssLength,LengthUnits>( n => numberToString( n, "px", "em"));

wkf[WKF.Length] = v => LengthMath.v2s( v);
wkf[WKF.MultiLengthWithSpace] = v => LengthMath.mv2s( v, " ");



/**
 * The AngleMath object contains methods that implement CSS mathematic functions on the `<angle>`
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "turn".
 */
export const AngleMath = new NumericMath<CssAngle,AngleUnits>( n => numberToString( n, "deg", "turn"));

wkf[WKF.Angle] = v => AngleMath.v2s( v);



/**
 * The TimeMath object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export const TimeMath = new NumericMath<CssTime,TimeUnits>( n => numberToString( n, "ms", "s"));

wkf[WKF.Time] = v => TimeMath.v2s( v);
wkf[WKF.MultiTimeWithComma] = v => TimeMath.mv2s( v, ",");


/**
 * The ResolutionMath object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "x".
 */
export const ResolutionMath = new NumericMath<CssResolution,ResolutionUnits>( n => numberToString( n, "dpi", "x"));

wkf[WKF.Resolution] = v => ResolutionMath.v2s( v);


/**
 * The FrequencyMath object contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export const FrequencyMath = new NumericMath<CssFrequency, FrequencyUnits>( n => numberToString( n, "Hz", "kHz"));

wkf[WKF.Frequency] = v => FrequencyMath.v2s( v);


///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Size, Point, Position, Radius
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Converts single position style value to the CSS string.
wkf[WKF.Position] = (val: Extended<CssPosition>): string => v2s( val, { any: WKF.Length });
wkf[WKF.AtPosition] = (v: Extended<CssPosition>) => v == null ? "" : "at " + wkf[WKF.Position](v);

// Converts multi-position style value to the CSS string.
 wkf[WKF.MultiPosition] = (val: OneOrMany<CssPosition>): string =>
    v2s( val, {
        arr2: { any: WKF.Position, sep: "," },
        any: WKF.Position
    });



// Converts corner radius style value to the CSS string.
wkf[WKF.Radius] = (v: Extended<CssRadius>) => v2s( v, { any: WKF.Length });



/**
 * Converts border radius style value to the CSS string.
 */
 wkf[WKF.BorderRadius] = (val: Extended<BorderRadius>): string =>
    v2s( val, {
        arr2: { any: { any: WKF.Length }, sep: "/" },
        any: WKF.Length
    });




