import { Extended } from "./CoreTypes";
import { ILengthProxy, IPercentProxy, IAngleProxy, ITimeProxy, IResolutionProxy, IFrequencyProxy, CssLength, IFitContentProxy, CssNumber, IAspectRatioProxy, INumberMath, IPercentMath, ILengthMath, IAngleMath, ITimeMath, IResolutionMath, IFrequencyMath, IRectProxy } from "./NumericTypes";
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
 *     columnQty = this.$var( "CssNumber", 3)
 *
 *     // max( 5, var(--columnQty))
 *     cls1 = this.$class({
 *         columns: css.Num.max( 5, this.columnQty)
 *     })
 * }
 * ```
 */
export declare const Num: INumberMath;
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
 *     cls1 = this.$class({
 *         zoom: css.Percent.min( 0.5, this.initialZoom)
 *     })
 * }
 * ```
 */
export declare const Percent: IPercentMath;
/**
 * Creates percent value by appenfing the `"%"` sign to the given number. This function should be
 * used whenever a `<percentage>` CSS type is used for a style property or value.
 * @category Units
 */
export declare const percent: (n: number) => IPercentProxy;
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
 *     cls1 = this.$class({
 *         width: css.Len.calc` 200px - (2 * ${this.defaultPadding})`
 *     })
 * }
 * ```
 */
export declare const Len: ILengthMath;
/**
 * Creates length value in quarters of an inch.
 * @category Units
 */
export declare const Q: (n: number) => ILengthProxy;
/**
 * Creates length value in ch units, which is equal to the used advance measure of the `“0”` (ZERO,
 * U+0030) glyph found in the font used to render it. (The advance measure of a glyph is its
 * advance width or height, whichever is in the inline axis of the element.)
 * @category Units
 */
export declare const ch: (n: number) => ILengthProxy;
/**
 * Creates length value in cantimeters.
 * @category Units
 */
export declare const cm: (n: number) => ILengthProxy;
/**
 * Creates length value in calculated font-sizes of the element.
 * @category Units
 */
export declare const em: (n: number) => ILengthProxy;
/**
 * Creates length value in heights of lowercase letter 'x' in the font.
 * @category Units
 */
export declare const ex: (n: number) => ILengthProxy;
/**
 * Creates length value in ic units.
 * @category Units
 */
export declare const ic: (n: number) => ILengthProxy;
/**
 * Creates length value in inches.
 * @category Units
 */
export declare const inch: (n: number) => ILengthProxy;
/**
 * Creates length value in line-heights of the element.
 * @category Units
 */
export declare const lh: (n: number) => ILengthProxy;
/**
 * Creates length value in millimeters.
 * @category Units
 */
export declare const mm: (n: number) => ILengthProxy;
/**
 * Creates length value in picas.
 * @category Units
 */
export declare const pc: (n: number) => ILengthProxy;
/**
 * Creates length value in points.
 * @category Units
 */
export declare const pt: (n: number) => ILengthProxy;
/**
 * Creates length value in pixels.
 * @category Units
 */
export declare const px: (n: number) => ILengthProxy;
/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis.
 * @category Units
 */
export declare const vb: (n: number) => ILengthProxy;
/**
 * Creates length value in 1% of the height of the viewport's initial containing block.
 * @category Units
 */
export declare const vh: (n: number) => ILengthProxy;
/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis.
 * @category Units
 */
export declare const vi: (n: number) => ILengthProxy;
/**
 * Creates length value in 1% of the width of the viewport's initial containing block.
 * @category Units
 */
export declare const vw: (n: number) => ILengthProxy;
/**
 * Creates length value in font-sizes of the root element (<html>).
 * @category Units
 */
export declare const rem: (n: number) => ILengthProxy;
/**
 * Creates length value in line-heights of the root element (<html>).
 * @category Units
 */
export declare const rlh: (n: number) => ILengthProxy;
/**
 * Creates length value in the units which are a smaller value between vw and vh.
 * @category Units
 */
export declare const vmin: (n: number) => ILengthProxy;
/**
 * Creates length value in the units which are a larger value between vw and vh.
 * @category Units
 */
export declare const vmax: (n: number) => ILengthProxy;
/**
 * Creates length value for flex.
 * @category Units
 */
export declare const fr: (n: number) => ILengthProxy;
/**
 * The `Angle` object contains methods that implement CSS mathematic functions on the
 * `<angle> | <percentage>` CSS type. It implements the [[INumericMath]] interface and thus
 * allows using the methods such as [[min]], [[max]], [[calc]] and [[clamp]] with parameters
 * of the [[CssAngle]] type.
 */
export declare const Angle: IAngleMath;
/**
 * Creates angle value in degrees.
 * @category Units
 */
export declare const deg: (n: number) => IAngleProxy;
/**
 * Creates angle value in radians.
 * @category Units
 */
export declare const rad: (n: number) => IAngleProxy;
/**
 * Creates angle value in gradians.
 * @category Units
 */
export declare const grad: (n: number) => IAngleProxy;
/**
 * Creates angle value in turns.
 * @category Units
 */
export declare const turn: (n: number) => IAngleProxy;
/**
 * The `Time` object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type. It implements the [[INumericMath]] interface and thus allows using the methods such
 * as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the [[CssTime]] type.
 */
export declare const Time: ITimeMath;
/**
* Creates time value in milliseconds.
* @category Units
*/
export declare const ms: (n: number) => ITimeProxy;
/**
 * Creates time value in seconds.
 * @category Units
 */
export declare const s: (n: number) => ITimeProxy;
/**
 * The `Resolution` object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type. It implements the [[INumericMath]] interface and thus allows using
 * the methods such as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the
 * [[CssResolution]] type.
 */
export declare const Resolution: IResolutionMath;
/**
* Creates resolution value in DPI.
* @category Units
*/
export declare const dpi: (n: number) => IResolutionProxy;
/**
 * Creates resolution value in DPCM.
 * @category Units
 */
export declare const dpcm: (n: number) => IResolutionProxy;
/**
 * Creates resolution value in DPPX.
 * @category Units
 */
export declare const dppx: (n: number) => IResolutionProxy;
/**
 * Creates resolution value in X.
 * @category Units
 */
export declare const x: (n: number) => IResolutionProxy;
/**
 * The `Frequency` object contains methods that implement CSS mathematic functions on the `<frequency>`
 * CSS type. It implements the [[INumericMath]] interface and thus allows using the methods such
 * as [[min]], [[max]], [[calc]] and [[clamp]] with parameters of the [[CssFrequency]] type.
 */
export declare const Frequency: IFrequencyMath;
/**
* Creates frequency value in Hertz.
* @category Units
*/
export declare const hz: (n: number) => IFrequencyProxy;
/**
 * Creates frequency value in Kilo-Hertz.
 * @category Units
 */
export declare const khz: (n: number) => IFrequencyProxy;
/**
 * Returns an [[IFitContentProxy]] function representing the `fit-content()` CSS function
 * ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content())).
 */
export declare const fitContent: (size: Extended<CssLength>) => IFitContentProxy;
/**
 * Returns an [[IAspectRatioProxy]] function representing the `<ratio>` CSS type.
 */
export declare const ratio: (w: CssNumber, h?: CssNumber | undefined) => IAspectRatioProxy;
/**
 * Returns an [[IRectProxy]] function representing the `rect()` CSS function used for the `clip`
 * style property.
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export declare const rect: (top: CssLength, right: CssLength, bottom: CssLength, left: CssLength) => IRectProxy;
//# sourceMappingURL=NumericAPI.d.ts.map