import {
	INumberMath, ILengthMath, IAngleMath, ITimeMath, IResolutionMath,
    IFrequencyMath, IPercentMath, Extended, IStringProxy, IUrlProxy,
    AttrTypeKeyword, AttrUnitKeyword, ILengthProxy, IPercentProxy, IAngleProxy,
    ITimeProxy, IResolutionProxy, IFrequencyProxy, IQuotedProxy
} from "../api/BasicTypes"
import {IVarRule, ICounterRule, IIDRule} from "./RuleTypes";
import {VarTemplateName, ListStyleType_StyleType, ExtendedVarValue} from "./StyleTypes";
import {
	NumberMath, LengthMath, AngleMath, TimeMath, ResolutionMath,
	FrequencyMath, PercentMath, val2str, templateStringToString
} from "../impl/UtilFuncs"
import {stylePropToString} from "../impl/StyleFuncs";



/**
 * The Num object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type. When arguments for these functions are of the number JavaScript type they are
 * converted to strings without appending any units to them.
 */
export let Num: INumberMath = new NumberMath();



/**
 * The Percent object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type by appending a "%" unit suffix.
 */
export let Percent: IPercentMath = new PercentMath();



/** Creates percent value */
export function percent( n: number): IPercentProxy { return () => n + "%"; }



/**
 * The Len object contains methods that implement CSS mathematic functions on the `<length>`
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: ILengthMath = new LengthMath();



/** Creates length value in quarters of an inch */
export function Q( n: number): ILengthProxy { return () => n + "Q"; }

/** Creates length value in ch units */
export function ch( n: number): ILengthProxy { return () => n + "ch"; }

/** Creates length value in cantimeters */
export function cm( n: number): ILengthProxy { return () => n + "cm"; }

/** Creates length value in calculated font-sizes of the element */
export function em( n: number): ILengthProxy { return () => n + "em"; }

/** Creates length value in heights of lowercase letter 'x' in the font */
export function ex( n: number): ILengthProxy { return () => n + "ex"; }

/** Creates length value in ic units */
export function ic( n: number): ILengthProxy { return () => n + "ic"; }

/** Creates length value in inches */
export function inch( n: number): ILengthProxy { return () => n + "in"; }

/** Creates length value in line-heights of the element */
export function lh( n: number): ILengthProxy { return () => n + "lh"; }

/** Creates length value in millimeters */
export function mm( n: number): ILengthProxy { return () => n + "mm"; }

/** Creates length value in picas */
export function pc( n: number): ILengthProxy { return () => n + "pc"; }

/** Creates length value in points */
export function pt( n: number): ILengthProxy { return () => n + "pt"; }

/** Creates length value in pixels */
export function px( n: number): ILengthProxy { return () => n + "px"; }

/** Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis */
export function vb( n: number): ILengthProxy { return () => n + "vb"; }

/** Creates length value in 1% of the height of the viewport's initial containing block */
export function vh( n: number): ILengthProxy { return () => n + "vh"; }

/** Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis */
export function vi( n: number): ILengthProxy { return () => n + "vi"; }

/** Creates length value in 1% of the width of the viewport's initial containing block */
export function vw( n: number): ILengthProxy { return () => n + "vw"; }

/** Creates length value in fontsizes of the root element (<html>) */
export function rem( n: number): ILengthProxy { return () => n + "rem"; }

/** Creates length value in line-heights of the root element (<html>) */
export function rlh( n: number): ILengthProxy { return () => n + "rlh"; }

/** Creates length value in the units which are a smaller value between vw and vh */
export function vmax( n: number): ILengthProxy { return () => n + "vmax"; }

/** Creates length value in the units which are a larger value between vw and vh */
export function vmin( n: number): ILengthProxy { return () => n + "vmin"; }

/** Creates length value for flex */
export function fr( n: number): ILengthProxy { return () => n + "fr"; }


/**
 * The Angle object contains methods that implement CSS mathematic functions on the `<angle>`
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "turn".
 */
export let Angle: IAngleMath = new AngleMath();



/** Creates angle value in degrees */
export function deg( n: number): IAngleProxy { return () => n + "deg"; }

/** Creates angle value in radians */
export function rad( n: number): IAngleProxy { return () => n + "rad"; }

/** Creates angle value in gradians */
export function grad( n: number): IAngleProxy { return () => n + "grad"; }

/** Creates angle value in turns */
export function turn( n: number): IAngleProxy { return () => n + "turn"; }



/**
 * The Time object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: ITimeMath = new TimeMath();



/** Creates time value in milliseconds */
export function ms( n: number): ITimeProxy { return () => n + "ms"; }

/** Creates time value in seconds */
export function s( n: number): ITimeProxy { return () => n + "s"; }


/**
 * The Resolution object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: IResolutionMath = new ResolutionMath();



/** Creates resolution value in DPI */
export function dpi( n: number): IResolutionProxy { return () => n + "dpi"; }

/** Creates resolution value in DPCM */
export function dpcm( n: number): IResolutionProxy { return () => n + "dpcm"; }

/** Creates resolution value in DPPX */
export function dppx( n: number): IResolutionProxy { return () => n + "dppx"; }

/** Creates resolution value in X */
export function x( n: number): IResolutionProxy { return () => n + "x"; }



/**
 * The Frequency object contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: IFrequencyMath = new FrequencyMath();



/** Creates frequency value in Hertz */
export function hz( n: number): IFrequencyProxy { return () => n + "hz"; }

/** Creates frequency value in Kilo-Hertz */
export function khz( n: number): IFrequencyProxy { return () => n + "khz"; }



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The `raw` function allows specifying arbitrary text for properties whose type normally doesn't
 * allow strings.This function is a tag function and must be invoked with the template string
 * without parentheses. The `raw` function can be used for any style property. Note, however, that
 * no validation checks are performed on the structure of the template. If the resulting string
 * isn't valid for the style property, the property will not be come part of the style rule
 * inserted into the DOM.
 *
 * **Example**
 *
 * ```typescript
 * clip-path: raw`polygon(50% 20%, 90% 80%, 10% 80%)`
 * ```
 */
export function raw( parts: TemplateStringsArray, ...params: any[]): IStringProxy
{
    return () => templateStringToString( parts, params);
}



/**
 * Returns a function representing the invocation of the `var()` CSS function for
 * the given custom CSS property with optional fallbacks.
 */
export function usevar<K extends VarTemplateName>( varObj: IVarRule<K>, fallback?: ExtendedVarValue<K>): IStringProxy
{
    return () => fallback
        ? `var(--${varObj.name},${stylePropToString( varObj.template, fallback, true)})`
        : `var(--${varObj.name})`;
}



/**
 * Returns a function representing the CSS `url()` function. The string parameter
 * will be wrapped in a "url()" invocation. The function can also accept the IIDRule object to
 * create url(#element) invocation, which is often used to address SVG elements by their IDs.
 */
export function url( val: Extended<string | IIDRule>): IUrlProxy
{
	return () => `url(${val2str(val)})`;
}



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



/**
 * Returns a function representing a string in quotation marks.
 */
export function quoted( val: any): IQuotedProxy
{
    return () => `"${val2str(val)}"`;
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



