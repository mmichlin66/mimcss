import {
    CssLength, IFitContentProxy, CssNumber, IAspectRatioProxy, INumberMath, IPercentMath,
    ILengthMath, IAngleMath, ITimeMath, IResolutionMath, IFrequencyMath, IRectProxy,
    FrequencyString, LengthString, AngleString, PercentString, TimeString, ResolutionString, NumericString, AngleUnits,
} from "./NumericTypes"
import { Extended } from "./CoreTypes";
import {
    NumberMath, PercentMath, LengthMath, AngleMath, TimeMath, ResolutionMath, FrequencyMath
} from "../impl/NumericImpl"
import {f2s, WKF, a2s} from "../impl/Utils";




// Helper function for units conversion
function toUnits<U extends string>(this: U, n: number): NumericString<U>
{
    return (n + this) as NumericString<U>;
}



/**
 * The `Num` object contains methods that implement CSS mathematic functions on the `<number>`
 * CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus allows using the methods such
 * as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max}, {@link NumericTypes!INumberMath.calc}
 * and {@link NumericTypes!INumberMath.clamp} with parameters of the {@link NumericTypes!CssNumber} type.
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
 * `<percentage>` CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus allows using
 * the methods such as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max},
 * {@link NumericTypes!INumberMath.calc} and {@link NumericTypes!INumberMath.clamp} with parameters of the
 * {@link NumericTypes!CssPercent} type.
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
export const percent = toUnits.bind("%") as (n: number) => PercentString;



/**
 * The `Len` object contains methods that implement CSS mathematic functions on the
 * `<length> | <percentage>` CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus
 * allows using the methods such as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max},
 * {@link NumericTypes!INumberMath.calc} and {@link NumericTypes!INumberMath.clamp} with parameters
 * of the {@link NumericTypes!CssLength} type.
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
export const Q = toUnits.bind("Q") as (n: number) => LengthString;

/**
 * Creates length value in ch units, which is equal to the used advance measure of the `“0”` (ZERO,
 * U+0030) glyph found in the font used to render it. (The advance measure of a glyph is its
 * advance width or height, whichever is in the inline axis of the element.)
 * @category Units
 */
export const ch = toUnits.bind("ch") as (n: number) => LengthString;

/**
 * Creates length value in cantimeters.
 * @category Units
 */
export const cm = toUnits.bind("cm") as (n: number) => LengthString;

/**
 * Creates length value in calculated font-sizes of the element.
 * @category Units
 */
export const em = toUnits.bind("em") as (n: number) => LengthString;

/**
 * Creates length value in heights of lowercase letter 'x' in the font.
 * @category Units
 */
export const ex = toUnits.bind("ex") as (n: number) => LengthString;

/**
 * Creates length value in ic units.
 * @category Units
 */
export const ic = toUnits.bind("ic") as (n: number) => LengthString;

/**
 * Creates length value in inches.
 * @category Units
 */
export const inch = toUnits.bind("Qin") as (n: number) => LengthString;

/**
 * Creates length value in line-heights of the element.
 * @category Units
 */
export const lh = toUnits.bind("lh") as (n: number) => LengthString;

/**
 * Creates length value in millimeters.
 * @category Units
 */
export const mm = toUnits.bind("mm") as (n: number) => LengthString;

/**
 * Creates length value in picas.
 * @category Units
 */
export const pc = toUnits.bind("pc") as (n: number) => LengthString;

/**
 * Creates length value in points.
 * @category Units
 */
export const pt = toUnits.bind("pt") as (n: number) => LengthString;

/**
 * Creates length value in pixels.
 * @category Units
 */
export const px = toUnits.bind("px") as (n: number) => LengthString;

/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s block axis.
 * @category Units
 */
export const vb = toUnits.bind("vb") as (n: number) => LengthString;

/**
 * Creates length value in 1% of the height of the viewport's initial containing block.
 * @category Units
 */
export const vh = toUnits.bind("vh") as (n: number) => LengthString;

/**
 * Creates length value in 1% of the size of the initial containing block, in the direction
 * of the root element’s inline axis.
 * @category Units
 */
export const vi = toUnits.bind("vi") as (n: number) => LengthString;

/**
 * Creates length value in 1% of the width of the viewport's initial containing block.
 * @category Units
 */
export const vw = toUnits.bind("vw") as (n: number) => LengthString;

/**
 * Creates length value in font-sizes of the root element (<html>).
 * @category Units
 */
export const rem = toUnits.bind("rem") as (n: number) => LengthString;

/**
 * Creates length value in line-heights of the root element (<html>).
 * @category Units
 */
export const rlh = toUnits.bind("rlh") as (n: number) => LengthString;

/**
 * Creates length value in the units which are a smaller value between vw and vh.
 * @category Units
 */
export const vmin = toUnits.bind("vmin") as (n: number) => LengthString;

/**
 * Creates length value in the units which are a larger value between vw and vh.
 * @category Units
 */
export const vmax = toUnits.bind("vmax") as (n: number) => LengthString;

/**
 * Creates length value for flex.
 * @category Units
 */
export const fr = toUnits.bind("fr") as (n: number) => LengthString;



/**
 * The `Angle` object contains methods that implement CSS mathematic functions on the
 * `<angle> | <percentage>` CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus
 * allows using the methods such as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max},
 * {@link NumericTypes!INumberMath.calc} and {@link NumericTypes!INumberMath.clamp} with parameters
 * of the {@link NumericTypes!CssAngle} type.
 */
export const Angle: IAngleMath = AngleMath;

/**
 * Creates angle value in degrees.
 * @category Units
 */
// export const deg = (n: number): AngleString => toUnits( n, "deg");
export const deg = toUnits.bind("deg") as (n: number) => AngleString;

/**
 * Creates angle value in radians.
 * @category Units
 */
export const rad = toUnits.bind("rad") as (n: number) => AngleString;

/**
 * Creates angle value in gradians.
 * @category Units
 */
export const grad = toUnits.bind("grad") as (n: number) => AngleString;

/**
 * Creates angle value in turns.
 * @category Units
 */
export const turn = toUnits.bind("turn") as (n: number) => AngleString;



/**
 * The `Time` object contains methods that implement CSS mathematic functions on the `<time>`
 * CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus allows using the methods such
 * as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max}, {@link NumericTypes!INumberMath.calc}
 * and {@link NumericTypes!INumberMath.clamp} with parameters of the {@link NumericTypes!CssTime} type.
 */
 export const Time: ITimeMath = TimeMath;

 /**
 * Creates time value in milliseconds.
 * @category Units
 */
export const ms = toUnits.bind("ms") as (n: number) => TimeString;

/**
 * Creates time value in seconds.
 * @category Units
 */
export const s = toUnits.bind("s") as (n: number) => TimeString;



/**
 * The `Resolution` object contains methods that implement CSS mathematic functions on the
 * `<resolution>` CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus allows using
 * the methods such as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max},
 * {@link NumericTypes!INumberMath.calc} and {@link NumericTypes!INumberMath.clamp} with parameters of the
 * {@link NumericTypes!CssResolution} type.
 */
 export const Resolution: IResolutionMath = ResolutionMath;

 /**
 * Creates resolution value in DPI.
 * @category Units
 */
export const dpi = toUnits.bind("dpi") as (n: number) => ResolutionString;

/**
 * Creates resolution value in DPCM.
 * @category Units
 */
export const dpcm = toUnits.bind("dpcm") as (n: number) => ResolutionString;

/**
 * Creates resolution value in DPPX.
 * @category Units
 */
export const dppx = toUnits.bind("dppx") as (n: number) => ResolutionString;

/**
 * Creates resolution value in X.
 * @category Units
 */
export const x = toUnits.bind("x") as (n: number) => ResolutionString;



/**
 * The `Frequency` object contains methods that implement CSS mathematic functions on the `<frequency>`
 * CSS type. It implements the {@link NumericTypes!INumericMath} interface and thus allows using the methods such
 * as {@link NumericTypes!INumberMath.min}, {@link NumericTypes!INumberMath.max}, {@link NumericTypes!INumberMath.calc}
 * and {@link NumericTypes!INumberMath.clamp} with parameters of the {@link NumericTypes!CssFrequency} type.
 */
 export const Frequency: IFrequencyMath = FrequencyMath;

 /**
 * Creates frequency value in Hertz.
 * @category Units
 */
export const hz = toUnits.bind("Hz") as (n: number) => FrequencyString;

/**
 * Creates frequency value in Kilo-Hertz.
 * @category Units
 */
export const khz = toUnits.bind("kHz") as (n: number) => FrequencyString;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an {@link NumericTypes!IFitContentProxy} function representing the `fit-content()` CSS function
 * (<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/fit-content()" target="mdn">MDN Page</a>).
 */
export const fitContent = (size: Extended<CssLength>): IFitContentProxy =>
    () => f2s( "fit-content", [[size, WKF.Length]]);



/**
 * Returns an {@link NumericTypes!IAspectRatioProxy} function representing the `<ratio>` CSS type.
 */
export const ratio = (w: CssNumber, h?: CssNumber): IAspectRatioProxy => () => [w,h].join("/");



/**
 * Returns an {@link NumericTypes!IRectProxy} function representing the `rect()` CSS function used for the `clip`
 * style property.
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export const rect = (top: CssLength, right: CssLength, bottom: CssLength, left: CssLength): IRectProxy =>
    () => `rect(${a2s( [top, right, bottom, left], WKF.Length, ",")})`;



