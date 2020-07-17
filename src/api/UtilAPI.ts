﻿import {
	ICssNumberMath, ICssLengthMath, ICssAngleMath, ICssTimeMath, ICssResolutionMath,
	ICssFrequencyMath, ICssPercentMath, Extended, IStringProxy,
	IUrlProxy, AttrTypeKeyword, AttrUnitKeyword
} from "../styles/UtilTypes"
import {
	CssNumberMath, CssLengthMath, CssAngleMath, CssTimeMath, CssResolutionMath,
	CssFrequencyMath, CssPercentMath, val2str, templateStringToString
} from "../styles/UtilFuncs"
import {IVarRule, ICounterRule, IIDRule} from "../rules/RuleTypes";
import {VarTemplateName, VarValueType, ListStyleType_StyleType} from "../styles/StyleTypes";
import {stylePropToString} from "../styles/StyleFuncs";



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
 * Returns a function encapsulating the given string-like parameter. This function
 * allows specifying arbitrary text for properties whose type normally doesn't allow strings.
 * This is used as an "escape hatch" when a string value already exists and there is no sense
 * to convert it to a proper type. This function is a tag function and must be invoked with
 * the template string without parentheses.
 */
export function raw( parts: TemplateStringsArray, ...params: any[]): IStringProxy
{
    return () => templateStringToString( parts, params);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// usevar()
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the invocation of the `var()` CSS function for
 * the given custom CSS property with optional fallbacks.
 */
export function usevar<K extends VarTemplateName>( varObj: IVarRule<K>, fallback?: VarValueType<K>): IStringProxy
{
    return () => fallback
        ? `var(--${varObj.name},${stylePropToString( varObj.template, fallback, true)})`
        : `var(--${varObj.name})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// url()
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the CSS `url()` function. The string parameter
 * will be wrapped in a "url()" invocation. The function can also accept the IIDRule object to
 * create url(#element) invocation, which is often used to address SVG elements by their IDs.
 */
export function url( val: Extended<string | IIDRule>): IUrlProxy
{
	return () => `url(${val2str(val)})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Counters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the CSS `counter()` function with additional
 * optional strings added after and/or before the counter.
 */
export function counter( counterObj: Extended<ICounterRule | string>,
	style?: Extended<ListStyleType_StyleType>,
	textAfter?: Extended<string>, textBefore?: Extended<string>): IStringProxy
{
	return () =>
	{
		let styleString = style ? `,${val2str( style)}` : "";
		let before = textBefore ? `"${val2str( textBefore)}"` : "";
		let after = textAfter ? `"${val2str( textAfter)}"` : "";
		return `${before} counter(${val2str(counterObj)}${styleString}) ${after}`;
	}
}



/**
 * Returns a function representing the CSS `countesr()` function with the given
 * separator string and additional optional strings added after and/or before the counter.
 */
export function counters( counterObj: Extended<ICounterRule | string>,
	separator: Extended<string>, style?: Extended<ListStyleType_StyleType>,
	textAfter?: Extended<string>, textBefore?: Extended<string>): IStringProxy
{
	return () =>
	{
		let sepString = separator ? `"${val2str( separator)}"` : `"."`;
		let styleString = style ? `,${val2str( style)}` : "";
		let before = textBefore ? `"${val2str( textBefore)}"` : "";
		let after = textAfter ? `"${val2str( textAfter)}"` : "";
		return `${before} counters(${val2str(counterObj)},${sepString}${styleString}) ${after}`;
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// attr()
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the `attr()` CSS function. It returns IStringProxy
 * and theoretically can be used in any style property; however, its use by browsers is currently
 * limited to the `content` property. Also no browser currently support type, units or fallback
 * values.
 */
export function attr( attrName: Extended<string>, typeOrUnit?: Extended<AttrTypeKeyword | AttrUnitKeyword>,
	fallback?: Extended<string>): IStringProxy
{
    return () => `attr(${attrName}${typeOrUnit ? " " + typeOrUnit : ""}${fallback ? "," + fallback : ""})`;
}



