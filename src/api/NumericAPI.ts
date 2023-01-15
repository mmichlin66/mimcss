import {Extended, IGenericProxy} from "./CoreTypes"
import {
    ILengthProxy, IPercentProxy, IAngleProxy, ITimeProxy, IResolutionProxy, IFrequencyProxy,
    CssLength, IFitContentProxy, CssNumber, IAspectRatioProxy, INumberMath, IPercentMath,
    ILengthMath, IAngleMath, ITimeMath, IResolutionMath, IFrequencyMath, IRectProxy,
} from "./NumericTypes"
import {NumberMath, PercentMath, LengthMath, AngleMath, TimeMath, ResolutionMath, FrequencyMath} from "../impl/NumericImpl"
import {f2s, WKF, a2s} from "../impl/Utils";




// Helper function for units conversion
const toUnitsProxy = ( n: number, unit: string): IGenericProxy => () => n + unit;



/**
 * The `Num` object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type. It implements the {@link INumericMath} interface and thus allows using the methods such
 * as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters of the {@link CssNumber} type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // define custom CSS property - note that its value can be changed
 *     // programmatically
 *     columnQty = this.$var( "CssNumber", 3)
 *
 *     // max( 5, var(--columnQty))
 *     cls1 = this.$class({
 *         columns: css.Num.max( 5, this.columnQty)
 *     })
 * }
 * ```
 */
export const Num: INumberMath = NumberMath;



/**
 * The `Percent` object contains methods that implement CSS mathematic functions on the
 * `<percentage>` CSS type. It implements the {@link INumericMath} interface and thus allows using
 * the methods such as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters of the
 * {@link CssPercent} type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     initialZoom = css.var( "CssPercent", 1.5)
 *
 *     // min( 0.5, var(--initialZoom))
 *     cls1 = this.$class({
 *         zoom: css.Percent.min( 0.5, this.initialZoom)
 *     })
 * }
 * ```
 */
export const Percent: IPercentMath = PercentMath;

/**
 * Creates percent value by appenfing the `"%"` sign to the given number. This function should be
 * used whenever a `<percentage>` CSS type is used for a style property or value.
 * @category Units
 */
export const percent = (n: number): IPercentProxy => toUnitsProxy( n, "%");



/**
 * The `Len` object contains methods that implement CSS mathematic functions on the
 * `<length> | <percentage>` CSS type. It implements the {@link INumericMath} interface and thus
 * allows using the methods such as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters
 * of the {@link CssLength} type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     defaultPadding = css.var( "CssLength", 8)
 *
 *     // calc( 200px - (2 * var(--defaultPadding)))
 *     cls1 = this.$class({
 *         width: css.Len.calc` 200px - (2 * ${this.defaultPadding})`
 *     })
 * }
 * ```
 */
export const Len: ILengthMath = LengthMath;

/**
 * Creates length value in quarters of an inch.
 * @category Units
 */
export const Q = (n: number): ILengthProxy => toUnitsProxy( n, "Q");

/**
 * Creates length value in ch units, which is equal to the used advance measure of the `“0”` (ZERO,
 * U+0030) glyph found in the font used to render it. (The advance measure of a glyph is its
 * advance width or height, whichever is in the inline axis of the element.)
 * @category Units
 */
export const ch = (n: number): ILengthProxy => toUnitsProxy( n, "ch");

/**
 * Creates length value in cantimeters.
 * @category Units
 */
export const cm = (n: number): ILengthProxy => toUnitsProxy( n, "cm");

/**
 * Creates length value in calculated font-sizes of the element.
 * @category Units
 */
export const em = (n: number): ILengthProxy => toUnitsProxy( n, "em");

/**
 * Creates length value in heights of lowercase letter 'x' in the font.
 * @category Units
 */
export const ex = (n: number): ILengthProxy => toUnitsProxy( n, "ex");

/**
 * Creates length value in ic units.
 * @category Units
 */
export const ic = (n: number): ILengthProxy => toUnitsProxy( n, "ic");

/**
 * Creates length value in inches.
 * @category Units
 */
export const inch = (n: number): ILengthProxy => toUnitsProxy( n, "in");

/**
 * Creates length value in line-heights of the element.
 * @category Units
 */
export const lh = (n: number): ILengthProxy => toUnitsProxy( n, "lh");

/**
 * Creates length value in millimeters.
 * @category Units
 */
export const mm = (n: number): ILengthProxy => toUnitsProxy( n, "mm");

/**
 * Creates length value in picas.
 * @category Units
 */
export const pc = (n: number): ILengthProxy => toUnitsProxy( n, "pc");

/**
 * Creates length value in points.
 * @category Units
 */
export const pt = (n: number): ILengthProxy => toUnitsProxy( n, "pt");

/**
 * Creates length value in pixels.
 * @category Units
 */
export const px = (n: number): ILengthProxy => toUnitsProxy( n, "px");

/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis.
 * @category Units
 */
export const vb = (n: number): ILengthProxy => toUnitsProxy( n, "vb");

/**
 * Creates length value in 1% of the height of the viewport's initial containing block.
 * @category Units
 */
export const vh = (n: number): ILengthProxy => toUnitsProxy( n, "vh");

/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis.
 * @category Units
 */
export const vi = (n: number): ILengthProxy => toUnitsProxy( n, "vi");

/**
 * Creates length value in 1% of the width of the viewport's initial containing block.
 * @category Units
 */
export const vw = (n: number): ILengthProxy => toUnitsProxy( n, "vw");

/**
 * Creates length value in font-sizes of the root element (<html>).
 * @category Units
 */
export const rem = (n: number): ILengthProxy => toUnitsProxy( n, "rem");

/**
 * Creates length value in line-heights of the root element (<html>).
 * @category Units
 */
export const rlh = (n: number): ILengthProxy => toUnitsProxy( n, "rlh");

/**
 * Creates length value in the units which are a smaller value between vw and vh.
 * @category Units
 */
export const vmin = (n: number): ILengthProxy => toUnitsProxy( n, "vmin");

/**
 * Creates length value in the units which are a larger value between vw and vh.
 * @category Units
 */
export const vmax = (n: number): ILengthProxy => toUnitsProxy( n, "vmax");

/**
 * Creates length value for flex.
 * @category Units
 */
export const fr = (n: number): ILengthProxy => toUnitsProxy( n, "fr");



/**
 * The `Angle` object contains methods that implement CSS mathematic functions on the
 * `<angle> | <percentage>` CSS type. It implements the {@link INumericMath} interface and thus
 * allows using the methods such as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters
 * of the {@link CssAngle} type.
 */
export const Angle: IAngleMath = AngleMath;

/**
 * Creates angle value in degrees.
 * @category Units
 */
export const deg = (n: number): IAngleProxy => toUnitsProxy( n, "deg");

/**
 * Creates angle value in radians.
 * @category Units
 */
export const rad = (n: number): IAngleProxy => toUnitsProxy( n, "rad");

/**
 * Creates angle value in gradians.
 * @category Units
 */
export const grad = (n: number): IAngleProxy => toUnitsProxy( n, "grad");

/**
 * Creates angle value in turns.
 * @category Units
 */
export const turn = (n: number): IAngleProxy => toUnitsProxy( n, "turn");



/**
 * The `Time` object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type. It implements the {@link INumericMath} interface and thus allows using the methods such
 * as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters of the {@link CssTime} type.
 */
 export const Time: ITimeMath = TimeMath;

 /**
 * Creates time value in milliseconds.
 * @category Units
 */
export const ms = (n: number): ITimeProxy => toUnitsProxy( n, "ms");

/**
 * Creates time value in seconds.
 * @category Units
 */
export const s = (n: number): ITimeProxy => toUnitsProxy( n, "s");



/**
 * The `Resolution` object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type. It implements the {@link INumericMath} interface and thus allows using
 * the methods such as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters of the
 * {@link CssResolution} type.
 */
 export const Resolution: IResolutionMath = ResolutionMath;

 /**
 * Creates resolution value in DPI.
 * @category Units
 */
export const dpi = (n: number): IResolutionProxy => toUnitsProxy( n, "dpi");

/**
 * Creates resolution value in DPCM.
 * @category Units
 */
export const dpcm = (n: number): IResolutionProxy => toUnitsProxy( n, "dpcm");

/**
 * Creates resolution value in DPPX.
 * @category Units
 */
export const dppx = (n: number): IResolutionProxy => toUnitsProxy( n, "dppx");

/**
 * Creates resolution value in X.
 * @category Units
 */
export const x = (n: number): IResolutionProxy => toUnitsProxy( n, "x");



/**
 * The `Frequency` object contains methods that implement CSS mathematic functions on the `<frequency>`
 * CSS type. It implements the {@link INumericMath} interface and thus allows using the methods such
 * as {@link min}, {@link max}, {@link calc} and {@link clamp} with parameters of the {@link CssFrequency} type.
 */
 export const Frequency: IFrequencyMath = FrequencyMath;

 /**
 * Creates frequency value in Hertz.
 * @category Units
 */
export const hz = (n: number): IFrequencyProxy => toUnitsProxy( n, "hz");

/**
 * Creates frequency value in Kilo-Hertz.
 * @category Units
 */
export const khz = (n: number): IFrequencyProxy => toUnitsProxy( n, "khz");



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an {@link IFitContentProxy} function representing the `fit-content()` CSS function
 * (<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content()" target="mdn">MDN Page</a>).
 */
export const fitContent = (size: Extended<CssLength>): IFitContentProxy =>
    () => f2s( "fit-content", [[size, WKF.Length]]);



/**
 * Returns an {@link IAspectRatioProxy} function representing the `<ratio>` CSS type.
 */
export const ratio = (w: CssNumber, h?: CssNumber): IAspectRatioProxy => () => [w,h].join("/");



/**
 * Returns an {@link IRectProxy} function representing the `rect()` CSS function used for the `clip`
 * style property.
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export const rect = (top: CssLength, right: CssLength, bottom: CssLength, left: CssLength): IRectProxy =>
    () => `rect(${a2s( [top, right, bottom, left], WKF.Length, ",")})`;



