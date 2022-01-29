import { Extended, ICssFuncObject } from "./CoreTypes";
import { CssAngle, CssPercent } from "./NumericTypes";
/**
 * The `INamedColors` interface lists the names of standard Web colors. It is needed to allow developers
 * to add new named colors through module augmentation technique. This interface is implemented by the
 * [[Colors]] object, which provides numeric values for the standard Web colors.
 */
export interface INamedColors {
    readonly black: number;
    readonly silver: number;
    readonly gray: number;
    readonly white: number;
    readonly maroon: number;
    readonly red: number;
    readonly purple: number;
    readonly fuchsia: number;
    readonly green: number;
    readonly lime: number;
    readonly olive: number;
    readonly yellow: number;
    readonly navy: number;
    readonly blue: number;
    readonly teal: number;
    readonly aqua: number;
    readonly orange: number;
    readonly aliceblue: number;
    readonly antiquewhite: number;
    readonly aquamarine: number;
    readonly azure: number;
    readonly beige: number;
    readonly bisque: number;
    readonly blanchedalmond: number;
    readonly blueviolet: number;
    readonly brown: number;
    readonly burlywood: number;
    readonly cadetblue: number;
    readonly chartreuse: number;
    readonly chocolate: number;
    readonly coral: number;
    readonly cornflowerblue: number;
    readonly cornsilk: number;
    readonly crimson: number;
    readonly cyan: number;
    readonly darkblue: number;
    readonly darkcyan: number;
    readonly darkgoldenrod: number;
    readonly darkgray: number;
    readonly darkgreen: number;
    readonly darkgrey: number;
    readonly darkkhaki: number;
    readonly darkmagenta: number;
    readonly darkolivegreen: number;
    readonly darkorange: number;
    readonly darkorchid: number;
    readonly darkred: number;
    readonly darksalmon: number;
    readonly darkseagreen: number;
    readonly darkslateblue: number;
    readonly darkslategray: number;
    readonly darkslategrey: number;
    readonly darkturquoise: number;
    readonly darkviolet: number;
    readonly deeppink: number;
    readonly deepskyblue: number;
    readonly dimgray: number;
    readonly dimgrey: number;
    readonly dodgerblue: number;
    readonly firebrick: number;
    readonly floralwhite: number;
    readonly forestgreen: number;
    readonly gainsboro: number;
    readonly ghostwhite: number;
    readonly gold: number;
    readonly goldenrod: number;
    readonly greenyellow: number;
    readonly grey: number;
    readonly honeydew: number;
    readonly hotpink: number;
    readonly indianred: number;
    readonly indigo: number;
    readonly ivory: number;
    readonly khaki: number;
    readonly lavender: number;
    readonly lavenderblush: number;
    readonly lawngreen: number;
    readonly lemonchiffon: number;
    readonly lightblue: number;
    readonly lightcoral: number;
    readonly lightcyan: number;
    readonly lightgoldenrodyellow: number;
    readonly lightgray: number;
    readonly lightgreen: number;
    readonly lightgrey: number;
    readonly lightpink: number;
    readonly lightsalmon: number;
    readonly lightseagreen: number;
    readonly lightskyblue: number;
    readonly lightslategray: number;
    readonly lightslategrey: number;
    readonly lightsteelblue: number;
    readonly lightyellow: number;
    readonly limegreen: number;
    readonly linen: number;
    readonly magenta: number;
    readonly mediumaquamarine: number;
    readonly mediumblue: number;
    readonly mediumorchid: number;
    readonly mediumpurple: number;
    readonly mediumseagreen: number;
    readonly mediumslateblue: number;
    readonly mediumspringgreen: number;
    readonly mediumturquoise: number;
    readonly mediumvioletred: number;
    readonly midnightblue: number;
    readonly mintcream: number;
    readonly mistyrose: number;
    readonly moccasin: number;
    readonly navajowhite: number;
    readonly oldlace: number;
    readonly olivedrab: number;
    readonly orangered: number;
    readonly orchid: number;
    readonly palegoldenrod: number;
    readonly palegreen: number;
    readonly paleturquoise: number;
    readonly palevioletred: number;
    readonly papayawhip: number;
    readonly peachpuff: number;
    readonly peru: number;
    readonly pink: number;
    readonly plum: number;
    readonly powderblue: number;
    readonly rosybrown: number;
    readonly royalblue: number;
    readonly saddlebrown: number;
    readonly salmon: number;
    readonly sandybrown: number;
    readonly seagreen: number;
    readonly seashell: number;
    readonly sienna: number;
    readonly skyblue: number;
    readonly slateblue: number;
    readonly slategray: number;
    readonly slategrey: number;
    readonly snow: number;
    readonly springgreen: number;
    readonly steelblue: number;
    readonly tan: number;
    readonly thistle: number;
    readonly tomato: number;
    readonly turquoise: number;
    readonly violet: number;
    readonly wheat: number;
    readonly whitesmoke: number;
    readonly yellowgreen: number;
    readonly rebeccapurple: number;
}
/**
 * The `SystemColors` type defines keywords for system colors that are used in forced-color mode
 * (but can be also used in the regular mode).
 */
export declare type SystemColors = "ActiveText" | "ButtonFace" | "ButtonText" | "Canvas" | "CanvasText" | "Field" | "FieldText" | "GrayText" | "Highlight" | "HighlightText" | "LinkText" | "VisitedText";
/**
 * Represents a single color separation in the `rgb()` CSS function. It can be expressed as either
 * a number or a string. Strings are interprested as is and can be used to specify percentage
 * values. Numbers less than 1 are multiplied by 100 and interpreted as percents.
 */
export declare type CssColorSeparation = number | string | CssPercent;
/**
 * Base interface for all interfaces representing color functions. Developers can use any function
 * that returns this interface wherever [[CssColor]] is accepted.
 */
export interface ICssColorFunc extends ICssFuncObject {
    fn: "rgb" | "hsl" | "lab" | "lch" | "color-mix" | "color-contrast" | "alpha";
}
/**
 * Type for CSS color. Color can be represented using the following types:
 * - keywords: any string that is a name of a property in the [[INamedColors]] interface or of the
 *   [[SystemColors]] type.
 * - number:
 *   - negative numbers are treated as inverted colors.
 *   - integer part of the number must be less than or equal to 0xFFFFFF - everything else is
 *     ignored.
 *   - floating point part of the number is treated as percents of alpha channel. If there is no
 *     floating part, alpha is 1.
 * - functions: [[rgb]], [[hsl]], [[lch]], [[lab]], [[alpha]].
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // using string value and numeric value of Web colors
 *     cls1 = this.$class({ color: "red", backgroundColor: css.Colors.yellow })
 *
 *     // using string value of a system color
 *     cls2 = this.$class({ color: "LinkText" })
 *
 *     // using numeric value
 *     cls3 = this.$class({ color: 0xCCCCCC })
 *
 *     // using numeric value with fractional part for alpha
 *     cls4 = this.$class({ color: 0x123456 + 0.4 })
 *
 *     // using negative numeric value for inverted color
 *     cls5 = this.$class({ color: -0x123456 })
 *
 *     // using negative numeric value with fractional part for inverted color with alpha
 *     cls6 = this.$class({ color: -(0x123456 + 0.4) })
 *
 *     // using the `alpha()` function with named color
 *     cls7 = this.$class({ color: css.alpha( "red", 0.4) })
 *
 *     // using the `rgb()` function
 *     cls8 = this.$class({ color: css.rgb( 256, 0, 128) })
 *
 *     // using the `hsl()` function
 *     cls9 = this.$class({ color: css.hsl( 200, 90, 52) })
 * }
 * ```
 */
export declare type CssColor = number | keyof INamedColors | "transparent" | "currentcolor" | SystemColors | ICssColorFunc;
/**
* Type for CSS color that exclude numeric color representation. Color can be represented using
* the following types:
* - keywords: any string that is a name of a property in the [[INamedColors]] interface or of the
*   [[SystemColors]] type.
* - functions: [[rgb]], [[hsl]], [[alpha]] as well as any function that returns the IColorProxy type.
*
* Non-numeric representation of color is sometimes required where it can conflict with numeric
* representations of other style properties. For example, the [[border]] property allows specifying
* border width, style and color in any order. In this case a numeric representation of color could
* come into conflict with a numeric representation of width. Therefore, for the `border` property,
* only non-numeric color representation is allowed.
*/
export declare type CssNonNumericColor = Exclude<CssColor, number>;
/**
 * Represents an invocation of the CSS `rgb()/rgba()` function. This interface is returned from the
 * [[rgb]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
export interface IRgbFunc extends ICssColorFunc {
    fn: "rgb";
    /** Red separation value */
    r: Extended<CssColorSeparation>;
    /** Green separation value */
    g: Extended<CssColorSeparation>;
    /** Blue separation value */
    b: Extended<CssColorSeparation>;
    /** Alpha channel value */
    a?: Extended<CssPercent>;
}
/**
 * Represents an invocation of the CSS `hsl()/hsla()` function. This interface is returned from the
 * [[hsl]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
export interface IHslFunc extends ICssColorFunc {
    fn: "hsl";
    /** Hue value */
    h: Extended<CssAngle>;
    /** Saturation value */
    s: Extended<CssPercent>;
    /** Lightness value */
    l: Extended<CssPercent>;
    /** Alpha channel value */
    a?: Extended<CssPercent>;
}
/**
 * Represents an invocation of the CSS `lch()` function. This interface is returned from the
 * [[lch]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
export interface ILchFunc extends ICssColorFunc {
    fn: "lch";
    /** CIE lightness value */
    l: Extended<CssPercent>;
    /** Chroma (amount of color) value */
    c: Extended<number>;
    /** Hue value */
    h: Extended<CssAngle>;
    /** Alpha channel value */
    a?: Extended<CssPercent>;
}
/**
 * Represents an invocation of the CSS `lab()` function. This interface is returned from the
 * [[lab]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
export interface ILabFunc extends ICssColorFunc {
    fn: "lab";
    /** CIE lightness value */
    l: Extended<CssPercent>;
    /** Distance along the a axis in the Lab colorspace */
    da: Extended<number>;
    /** Distance along the b axis in the Lab colorspace */
    db: Extended<number>;
    /** Alpha channel value */
    a?: Extended<CssPercent>;
}
/**
 * Represents an invocation of the CSS `color-contrast()` function. This interface is returned from the
 * [[colorContrast]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
export interface IColorContrastFunc extends ICssColorFunc {
    fn: "color-contrast";
    /** Color to which the list of colors in the `vs` property will be compared */
    c: Extended<CssColor>;
    /** List of colors from which to select the most contrasting to the base color */
    vs: Extended<CssColor>[];
}
/**
 * Represents color spaces that CSS works with.
 */
export declare type ColorSpace = "srgb" | "hsl" | "hwb" | "xyz" | "lab" | "lch" | "oklab" | "oklch";
/**
 * Represents an invocation of the CSS `color-mix()` function. This interface is returned from the
 * [[colorMix]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
export interface IColorMixFunc extends ICssColorFunc {
    fn: "color-mix";
    /** Color space in which to mix colors */
    cs?: Extended<ColorSpace>;
    /** First color and optional percentage to include in the mix */
    c1: [Extended<CssColor>, Extended<CssPercent>?];
    /** Second color and optional percentage to include in the mix */
    c2: [Extended<CssColor>, Extended<CssPercent>?];
}
/**
 * Allows gradually building the [[IColorMixFunc]] stucture.
 */
export interface IColorMixBuilder extends IColorMixFunc {
    /**
     * Sets the second color and optional percentage
     *
     * @param c Second color to be mixed
     * @param p Percentage of the second color to include in the mix
     */
    with(c: Extended<CssColor>, p?: Extended<CssPercent>): this;
    /**
     * Sets the color space in which to mix the colors
     *
     * @param c First color to be mixed
     * @param p Percentage of the first color to include in the mix
     */
    in(cs: Extended<ColorSpace>): this;
}
/**
 * Represents an invocation of the [[alpha]] function. Developers can use this structure wherever
 * CssColor is accepted.
 */
export interface IAlphaFunc extends ICssColorFunc {
    fn: "alpha";
    c: number | keyof INamedColors;
    a: number;
}
//# sourceMappingURL=ColorTypes.d.ts.map