import {
    INumberMath, ILengthMath, IAngleMath, ITimeMath, IResolutionMath, IFrequencyMath,
    IPercentMath, Extended, IStringProxy, AttrTypeKeyword, AttrUnitKeyword, ILengthProxy,
    IPercentProxy, IAngleProxy, ITimeProxy, IResolutionProxy, IFrequencyProxy, IQuotedProxy,
    CssLength, IFitContentProxy, CssNumber, IAspectRatioProxy, SelectorItem, ISelectorProxy,
    IGenericProxy
} from "./CoreTypes"
import {
	NumberMath, LengthMath, AngleMath, TimeMath, ResolutionMath, FrequencyMath, PercentMath, v2s,
    tag2s, f2s, WellKnownFunc, mv2s
} from "../impl/CoreFuncs"



// Helper function for units conversion
function toUnitsProxy( n: number, unit: string): IGenericProxy { return () => n + unit; }



/**
 * The Num object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type.
 */
export let Num: INumberMath = new NumberMath();



/**
 * The Percent object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type by appending a "%" unit suffix.
 */
export let Percent: IPercentMath = new PercentMath();



/**
 * Creates percent value by appenfing the `"%"` sign to the given number. This function should be
 * used whenever a `<percentage>` CSS type is used for a style property or value.
 */
export function percent( n: number): IPercentProxy { return toUnitsProxy( n, "%"); }



/**
 * The Len object contains methods that implement CSS mathematic functions on the `<length>`
 * CSS type by appending a length unit suffix.
 * Integer numbers use "px"; floating point numbers use "em".
 */
export let Len: ILengthMath = new LengthMath();



/** Creates length value in quarters of an inch */
export function Q( n: number): ILengthProxy { return toUnitsProxy( n, "Q"); }

/** Creates length value in ch units */
export function ch( n: number): ILengthProxy { return toUnitsProxy( n, "ch"); }

/** Creates length value in cantimeters */
export function cm( n: number): ILengthProxy { return toUnitsProxy( n, "cm"); }

/** Creates length value in calculated font-sizes of the element */
export function em( n: number): ILengthProxy { return toUnitsProxy( n, "em"); }

/** Creates length value in heights of lowercase letter 'x' in the font */
export function ex( n: number): ILengthProxy { return toUnitsProxy( n, "ex"); }

/** Creates length value in ic units */
export function ic( n: number): ILengthProxy { return toUnitsProxy( n, "ic"); }

/** Creates length value in inches */
export function inch( n: number): ILengthProxy { return toUnitsProxy( n, "in"); }

/** Creates length value in line-heights of the element */
export function lh( n: number): ILengthProxy { return toUnitsProxy( n, "lh"); }

/** Creates length value in millimeters */
export function mm( n: number): ILengthProxy { return toUnitsProxy( n, "mm"); }

/** Creates length value in picas */
export function pc( n: number): ILengthProxy { return toUnitsProxy( n, "pc"); }

/** Creates length value in points */
export function pt( n: number): ILengthProxy { return toUnitsProxy( n, "pt"); }

/** Creates length value in pixels */
export function px( n: number): ILengthProxy { return toUnitsProxy( n, "px"); }

/** Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis */
export function vb( n: number): ILengthProxy { return toUnitsProxy( n, "vb"); }

/** Creates length value in 1% of the height of the viewport's initial containing block */
export function vh( n: number): ILengthProxy { return toUnitsProxy( n, "vh"); }

/** Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis */
export function vi( n: number): ILengthProxy { return toUnitsProxy( n, "vi"); }

/** Creates length value in 1% of the width of the viewport's initial containing block */
export function vw( n: number): ILengthProxy { return toUnitsProxy( n, "vw"); }

/** Creates length value in fontsizes of the root element (<html>) */
export function rem( n: number): ILengthProxy { return toUnitsProxy( n, "rem"); }

/** Creates length value in line-heights of the root element (<html>) */
export function rlh( n: number): ILengthProxy { return toUnitsProxy( n, "rlh"); }

/** Creates length value in the units which are a smaller value between vw and vh */
export function vmin( n: number): ILengthProxy { return toUnitsProxy( n, "vmin"); }

/** Creates length value in the units which are a larger value between vw and vh */
export function vmax( n: number): ILengthProxy { return toUnitsProxy( n, "vmax"); }

/** Creates length value for flex */
export function fr( n: number): ILengthProxy { return toUnitsProxy( n, "fr"); }


/**
 * The Angle object contains methods that implement CSS mathematic functions on the `<angle>`
 * CSS type by appending an angle unit suffix.
 * Integer numbers use "deg"; floating point numbers use "turn".
 */
export let Angle: IAngleMath = new AngleMath();



/** Creates angle value in degrees */
export function deg( n: number): IAngleProxy { return toUnitsProxy( n, "deg"); }

/** Creates angle value in radians */
export function rad( n: number): IAngleProxy { return toUnitsProxy( n, "rad"); }

/** Creates angle value in gradians */
export function grad( n: number): IAngleProxy { return toUnitsProxy( n, "grad"); }

/** Creates angle value in turns */
export function turn( n: number): IAngleProxy { return toUnitsProxy( n, "turn"); }



/**
 * The Time object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type by appending a time unit suffix.
 * Integer numbers use "ms"; floating point numbers use "s".
 */
export let Time: ITimeMath = new TimeMath();



/** Creates time value in milliseconds */
export function ms( n: number): ITimeProxy { return toUnitsProxy( n, "ms"); }

/** Creates time value in seconds */
export function s( n: number): ITimeProxy { return toUnitsProxy( n, "s"); }


/**
 * The Resolution object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type by appending a resolution unit suffix.
 * Integer numbers use "dpi"; floating point numbers use "dpcm".
 */
export let Resolution: IResolutionMath = new ResolutionMath();



/** Creates resolution value in DPI */
export function dpi( n: number): IResolutionProxy { return toUnitsProxy( n, "dpi"); }

/** Creates resolution value in DPCM */
export function dpcm( n: number): IResolutionProxy { return toUnitsProxy( n, "dpcm"); }

/** Creates resolution value in DPPX */
export function dppx( n: number): IResolutionProxy { return toUnitsProxy( n, "dppx"); }

/** Creates resolution value in X */
export function x( n: number): IResolutionProxy { return toUnitsProxy( n, "x"); }



/**
 * The Frequency object contains methods that implement CSS mathematic functions on the
 * `<frequency>` CSS type by appending a frequency unit suffix.
 * Integer numbers use "Hz"; floating point numbers use "kHz".
 */
export let Frequency: IFrequencyMath = new FrequencyMath();



/** Creates frequency value in Hertz */
export function hz( n: number): IFrequencyProxy { return toUnitsProxy( n, "hz"); }

/** Creates frequency value in Kilo-Hertz */
export function khz( n: number): IFrequencyProxy { return toUnitsProxy( n, "khz"); }



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses.
 */
 export function selector( parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy
 {
     return () => tag2s( parts, params);
 }



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
    return () => tag2s( parts, params);
}



/**
 * Returns an IFitContentProxy function representing the `fit-content()` CSS function.
 */
export function fitContent( size: Extended<CssLength>): IFitContentProxy
{
    return () => f2s( "fit-content", [[size, WellKnownFunc.Length]]);
}



/**
 * Returns an IAspectRatioProxy function representing the `<ratio>` CSS type.
 */
export function ratio( w: CssNumber, h?: CssNumber): IAspectRatioProxy
{
    return () => mv2s( [w, h], "/");
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
    // () => `attr(${attrName}${typeOrUnit ? " " + typeOrUnit : ""}${fallback ? "," + fallback : ""})`;
    return () => `attr(${mv2s( [mv2s( [attrName, typeOrUnit], " "), fallback], ",")})`;
}



/**
 * Returns a function representing a string in quotation marks.
 */
export function quoted( val: any): IQuotedProxy
{
    return () => `"${v2s(val)}"`;
}



