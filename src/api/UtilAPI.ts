import * as UtilTypes from "../styles/UtilTypes"
import * as UtilFuncs from "../styles/UtilFuncs"



/**
 * The Num object contains static methods that implement CSS mathematic functions on the <number>
 * CSS type. When arguments for these functions are of the number JavaScript type they are
 * converted to strings without appending any units to them.
 */
export let Num: UtilTypes.ICssNumberMath = new UtilFuncs.CssNumberMath();



/**
 * The Len object contains static methods that implement CSS mathematic functions on the <length>
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: UtilTypes.ICssLengthMath = new UtilFuncs.CssLengthMath();



/**
 * The Angle object contains static methods that implement CSS mathematic functions on the <angle>
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "rad".
 */
export let Angle: UtilTypes.ICssAngleMath = new UtilFuncs.CssAngleMath();



/**
 * The Time object contains static methods that implement CSS mathematic functions on the <time>
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: UtilTypes.ICssTimeMath = new UtilFuncs.CssTimeMath();



/**
 * The Resolution object contains static methods that implement CSS mathematic functions on the
 * <resolution> CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: UtilTypes.ICssResolutionMath = new UtilFuncs.CssResolutionMath();



/**
 * The Frequency object contains static methods that implement CSS mathematic functions on the
 * <frequency> CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: UtilTypes.ICssFrequencyMath = new UtilFuncs.CssFrequencyMath();



/**
 * The Fraction object contains static methods that implement CSS mathematic functions on the
 * <fraction> CSS type by appending a fraction unit suffix.
 * Integer numbers use "fr"; floating point numbers use "%".
 */
export let Fraction: UtilTypes.ICssFractionMath = new UtilFuncs.CssFractionMath();



/**
 * The Percent object contains static methods that implement CSS mathematic functions on the
 * <percentage> CSS type by appending a "%" unit suffix.
 */
export let Percent: UtilTypes.ICssPercentMath = new UtilFuncs.CssPercentMath();



/**
 * Returns a StringProxy function encapsulating the given string-like parameter.
 */
export function raw( val: UtilTypes.Extended<string>): UtilTypes.StringProxy
{
	return () => UtilFuncs.valueToString(val);
}



/**
 * Returns a UrlProxy function representing the CSS `url()` function. The string parameter
 * will be wrapped in a "url()" invocation unless it already is.
 */
export function url( val: UtilTypes.Extended<string>): UtilTypes.UrlProxy
{
	return () => `url(${UtilFuncs.valueToString(val)})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// attr()
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an AttrProxy function representing the `attr()` CSS function.
 */
export function attr( attrName: string, typeOrUnit?: UtilTypes.AttrTypeKeyword | UtilTypes.AttrUnitKeyword,
	fallback?: UtilTypes.Extended<string>): UtilTypes.AttrProxy
{
    return () => `attr(${attrName}${typeOrUnit ? " " + typeOrUnit : ""}${fallback ? "," + fallback : ""})`;
}



