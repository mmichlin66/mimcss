import {Extended, IGenericProxy} from "./CoreTypes"
import {
    ILengthProxy, IPercentProxy, IAngleProxy, ITimeProxy, IResolutionProxy, IFrequencyProxy,
    CssLength, IFitContentProxy, CssNumber, IAspectRatioProxy, INumberMath, IPercentMath,
    ILengthMath, IAngleMath, ITimeMath, IResolutionMath, IFrequencyMath, IRectProxy,
} from "./NumericTypes"
import {NumberMath, PercentMath, LengthMath, AngleMath, TimeMath, ResolutionMath, FrequencyMath} from "../impl/NumericImpl"
import {f2s, WKF, a2s} from "../impl/Utils";




// Helper function for units conversion
function toUnitsProxy( n: number, unit: string): IGenericProxy { return () => n + unit; }



/**
 * The `Num` object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type. It implements the [[INumericMath]] interface and thus allows using the methods such
 * as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the [[CssNumber]] type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // define custom CSS property - note that its value can be changed
 *     // programmatically
 *     columnQty = css.$var( "CssNumber", 3)
 *
 *     // max( 5, var(--columnQty))
 *     cls1 = css.$class({
 *         columns: css.Num.max( 5, this.columnQty)
 *     })
 * }
 * ```
 */
export let Num: INumberMath = NumberMath;



/**
 * The `Percent` object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type. It implements the [[INumericMath]] interface and thus allows using
 * the methods such as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the
 * [[CssPercent]] type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     initialZoom = css.var( "CssPercent", 1.5)
 *
 *     // min( 0.5, var(--initialZoom))
 *     cls1 = css.$class({
 *         zoom: css.Percent.min( 0.5, this.initialZoom)
 *     })
 * }
 * ```
 */
 export let Percent: IPercentMath = PercentMath;

/**
 * Creates percent value by appenfing the `"%"` sign to the given number. This function should be
 * used whenever a `<percentage>` CSS type is used for a style property or value.
 * @category Units
 */
export function percent( n: number): IPercentProxy { return toUnitsProxy( n, "%"); }



/**
 * The `Len` object contains methods that implement CSS mathematic functions on the
 * `<length> | <percentage>` CSS type. It implements the [[INumericMath]] interface and thus
 * allows using the methods such as [[min]], [[max]], [[calc]] and [[clamp]] with parameters
 * of the [[CssLength]] type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     defaultPadding = css.var( "CssLength", 8)
 *
 *     // calc( 200px - (2 * var(--defaultPadding)))
 *     cls1 = css.$class({
 *         width: css.Len.calc` 200px - (2 * ${this.defaultPadding})`
 *     })
 * }
 * ```
 */
 export let Len: ILengthMath = LengthMath;

/**
 * Creates length value in quarters of an inch.
 * @category Units
 */
export function Q( n: number): ILengthProxy { return toUnitsProxy( n, "Q"); }

/**
 * Creates length value in ch units, which is equal to the used advance measure of the `“0”` (ZERO,
 * U+0030) glyph found in the font used to render it. (The advance measure of a glyph is its
 * advance width or height, whichever is in the inline axis of the element.)
 * @category Units
 */
export function ch( n: number): ILengthProxy { return toUnitsProxy( n, "ch"); }

/**
 * Creates length value in cantimeters.
 * @category Units
 */
export function cm( n: number): ILengthProxy { return toUnitsProxy( n, "cm"); }

/**
 * Creates length value in calculated font-sizes of the element.
 * @category Units
 */
export function em( n: number): ILengthProxy { return toUnitsProxy( n, "em"); }

/**
 * Creates length value in heights of lowercase letter 'x' in the font.
 * @category Units
 */
export function ex( n: number): ILengthProxy { return toUnitsProxy( n, "ex"); }

/**
 * Creates length value in ic units.
 * @category Units
 */
export function ic( n: number): ILengthProxy { return toUnitsProxy( n, "ic"); }

/**
 * Creates length value in inches.
 * @category Units
 */
export function inch( n: number): ILengthProxy { return toUnitsProxy( n, "in"); }

/**
 * Creates length value in line-heights of the element.
 * @category Units
 */
export function lh( n: number): ILengthProxy { return toUnitsProxy( n, "lh"); }

/**
 * Creates length value in millimeters.
 * @category Units
 */
export function mm( n: number): ILengthProxy { return toUnitsProxy( n, "mm"); }

/**
 * Creates length value in picas.
 * @category Units
 */
export function pc( n: number): ILengthProxy { return toUnitsProxy( n, "pc"); }

/**
 * Creates length value in points.
 * @category Units
 */
export function pt( n: number): ILengthProxy { return toUnitsProxy( n, "pt"); }

/**
 * Creates length value in pixels.
 * @category Units
 */
export function px( n: number): ILengthProxy { return toUnitsProxy( n, "px"); }

/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis.
 * @category Units
 */
export function vb( n: number): ILengthProxy { return toUnitsProxy( n, "vb"); }

/**
 * Creates length value in 1% of the height of the viewport's initial containing block.
 * @category Units
 */
export function vh( n: number): ILengthProxy { return toUnitsProxy( n, "vh"); }

/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis.
 * @category Units
 */
export function vi( n: number): ILengthProxy { return toUnitsProxy( n, "vi"); }

/**
 * Creates length value in 1% of the width of the viewport's initial containing block.
 * @category Units
 */
export function vw( n: number): ILengthProxy { return toUnitsProxy( n, "vw"); }

/**
 * Creates length value in font-sizes of the root element (<html>).
 * @category Units
 */
export function rem( n: number): ILengthProxy { return toUnitsProxy( n, "rem"); }

/**
 * Creates length value in line-heights of the root element (<html>).
 * @category Units
 */
export function rlh( n: number): ILengthProxy { return toUnitsProxy( n, "rlh"); }

/**
 * Creates length value in the units which are a smaller value between vw and vh.
 * @category Units
 */
export function vmin( n: number): ILengthProxy { return toUnitsProxy( n, "vmin"); }

/**
 * Creates length value in the units which are a larger value between vw and vh.
 * @category Units
 */
export function vmax( n: number): ILengthProxy { return toUnitsProxy( n, "vmax"); }

/**
 * Creates length value for flex.
 * @category Units
 */
export function fr( n: number): ILengthProxy { return toUnitsProxy( n, "fr"); }



/**
 * The `Angle` object contains methods that implement CSS mathematic functions on the
 * `<angle> | <percentage>` CSS type. It implements the [[INumericMath]] interface and thus
 * allows using the methods such as [[min]], [[max]], [[calc]] and [[clamp]] with parameters
 * of the [[CssAngle]] type.
 */
export let Angle: IAngleMath = AngleMath;

/**
 * Creates angle value in degrees.
 * @category Units
 */
export function deg( n: number): IAngleProxy { return toUnitsProxy( n, "deg"); }

/**
 * Creates angle value in radians.
 * @category Units
 */
export function rad( n: number): IAngleProxy { return toUnitsProxy( n, "rad"); }

/**
 * Creates angle value in gradians.
 * @category Units
 */
export function grad( n: number): IAngleProxy { return toUnitsProxy( n, "grad"); }

/**
 * Creates angle value in turns.
 * @category Units
 */
export function turn( n: number): IAngleProxy { return toUnitsProxy( n, "turn"); }



/**
 * The `Time` object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type. It implements the [[INumericMath]] interface and thus allows using the methods such
 * as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the [[CssTime]] type.
 */
 export let Time: ITimeMath = TimeMath;

 /**
 * Creates time value in milliseconds.
 * @category Units
 */
export function ms( n: number): ITimeProxy { return toUnitsProxy( n, "ms"); }

/**
 * Creates time value in seconds.
 * @category Units
 */
export function s( n: number): ITimeProxy { return toUnitsProxy( n, "s"); }



/**
 * The `Resolution` object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type. It implements the [[INumericMath]] interface and thus allows using
 * the methods such as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the
 * [[CssResolution]] type.
 */
 export let Resolution: IResolutionMath = ResolutionMath;

 /**
 * Creates resolution value in DPI.
 * @category Units
 */
export function dpi( n: number): IResolutionProxy { return toUnitsProxy( n, "dpi"); }

/**
 * Creates resolution value in DPCM.
 * @category Units
 */
export function dpcm( n: number): IResolutionProxy { return toUnitsProxy( n, "dpcm"); }

/**
 * Creates resolution value in DPPX.
 * @category Units
 */
export function dppx( n: number): IResolutionProxy { return toUnitsProxy( n, "dppx"); }

/**
 * Creates resolution value in X.
 * @category Units
 */
export function x( n: number): IResolutionProxy { return toUnitsProxy( n, "x"); }



/**
 * The `Frequency` object contains methods that implement CSS mathematic functions on the `<frequency>`
 * CSS type. It implements the [[INumericMath]] interface and thus allows using the methods such
 * as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the [[CssFrequency]] type.
 */
 export let Frequency: IFrequencyMath = FrequencyMath;

 /**
 * Creates frequency value in Hertz.
 * @category Units
 */
export function hz( n: number): IFrequencyProxy { return toUnitsProxy( n, "hz"); }

/**
 * Creates frequency value in Kilo-Hertz.
 * @category Units
 */
export function khz( n: number): IFrequencyProxy { return toUnitsProxy( n, "khz"); }



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an `IFitContentProxy` function representing the `fit-content()` CSS function
 * ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content())).
 */
export function fitContent( size: Extended<CssLength>): IFitContentProxy
{
    return () => f2s( "fit-content", [[size, WKF.Length]]);
}



/**
 * Returns an `IAspectRatioProxy` function representing the `<ratio>` CSS type.
 */
export function ratio( w: CssNumber, h?: CssNumber): IAspectRatioProxy
{
    return () => a2s( [w, h], undefined, "/");
}



/**
 * Returns an `IRectProxy` function representing the `rect()` CSS function used for the `clip`
 * style property.
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export function rect( top: CssLength, right: CssLength, bottom: CssLength, left: CssLength): IRectProxy
{
    return () => `rect(${a2s( [top, right, bottom, left], WKF.Length, ",")})`;
}



