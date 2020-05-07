import {
	ICssNumberMath, ICssLengthMath, ICssAngleMath, ICssTimeMath, ICssResolutionMath,
	ICssFrequencyMath, ICssFractionMath, ICssPercentMath, Extended, StringProxy,
	UrlProxy, AttrTypeKeyword, AttrUnitKeyword, AttrProxy
} from "../styles/UtilTypes"
import {
	CssNumberMath, CssLengthMath, CssAngleMath, CssTimeMath, CssResolutionMath,
	CssFrequencyMath, CssFractionMath, CssPercentMath, valueToString
} from "../styles/UtilFuncs"



/**
 * The Num object contains static methods that implement CSS mathematic functions on the `<number>`
 * CSS type. When arguments for these functions are of the number JavaScript type they are
 * converted to strings without appending any units to them.
 */
export let Num: ICssNumberMath = new CssNumberMath();



/**
 * The Len object contains static methods that implement CSS mathematic functions on the `<length>`
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: ICssLengthMath = new CssLengthMath();



/**
 * The Angle object contains static methods that implement CSS mathematic functions on the `<angle>`
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "turn".
 */
export let Angle: ICssAngleMath = new CssAngleMath();



/**
 * The Time object contains static methods that implement CSS mathematic functions on the `<time>`
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: ICssTimeMath = new CssTimeMath();



/**
 * The Resolution object contains static methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: ICssResolutionMath = new CssResolutionMath();



/**
 * The Frequency object contains static methods that implement CSS mathematic functions on the
 * `<frequency>` CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: ICssFrequencyMath = new CssFrequencyMath();



/**
 * The Fraction object contains static methods that implement CSS mathematic functions on the
 * `<fraction>` CSS type by appending a fraction unit suffix.
 * Integer numbers use "fr"; floating point numbers use "%".
 */
export let Fraction: ICssFractionMath = new CssFractionMath();



/**
 * The Percent object contains static methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type by appending a "%" unit suffix.
 */
export let Percent: ICssPercentMath = new CssPercentMath();



///////////////////////////////////////////////////////////////////////////////////////////////
//
// raw()
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a StringProxy function encapsulating the given string-like parameter. This function
 * allows specifying arbitrary text for properties whose type normally doesn't allow strings.
 * This is used as an "escape hatch" when a string value already exists and there is no sense
 * to convert it to a proper type. This function is a tag function and must be invoked with
 * the template string without parentheses.
 */
export function raw( parts: TemplateStringsArray, ...params: any[]): StringProxy
{
    // number of parameters is always 1 less than the number of string parts
    let paramsLen = params.length;
    if (paramsLen === 0)
        return () => parts[0];

    let buf: string[] = [];
    for( let i = 0; i < paramsLen; i++)
    {
        buf.push( parts[i]);
        buf.push( valueToString( params[i]));
    }

	return () => `${buf.join("")}${parts[paramsLen]}`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// url()
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a UrlProxy function representing the CSS `url()` function. The string parameter
 * will be wrapped in a "url()" invocation.
 */
export function url( val: Extended<string>): UrlProxy
{
	return () => `url(${valueToString(val)})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// attr()
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an AttrProxy function representing the `attr()` CSS function.
 */
export function attr( attrName: Extended<string>, typeOrUnit?: Extended<AttrTypeKeyword | AttrUnitKeyword>,
	fallback?: Extended<string>): AttrProxy
{
    return () => `attr(${attrName}${typeOrUnit ? " " + typeOrUnit : ""}${fallback ? "," + fallback : ""})`;
}



