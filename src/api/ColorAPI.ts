import {Extended, OneOrMany} from "./CoreTypes";
import {CssAngle, CssPercent} from "./NumericTypes";
import {
    ColorProfile, ColorSpace, CssColor, CssColorSeparation, IAlphaFunc, IColorContrastFunc, IColorFunc,
    IColorMixBuilder, IHslFunc, IHwbFunc, ILabFunc, ILchFunc, INamedColors, IRgbFunc
} from "./ColorTypes";
import {a2s, fdo, mv2s, v2s, wkf, WKF} from "../impl/Utils";



/**
 * Object whose property names are the well-known Web color names while values correspond to the
 * hexadecimal representation of the RGB separations (without an alpha mask). The properties of
 * this object can be used wherever the [[CssColor]] type can be used. Since the properties are
 * of the `number` type, they can be used for manipulating the color value.
*/
export const Colors: INamedColors =
{
    black:                  0x000000,
    silver:                 0xc0c0c0,
    gray:                   0x808080,
    white:                  0xffffff,
    maroon:                 0x800000,
    red:                    0xff0000,
    purple:                 0x800080,
    fuchsia:                0xff00ff,
    green:                  0x008000,
    lime:                   0x00ff00,
    olive:                  0x808000,
    yellow:                 0xffff00,
    navy:                   0x000080,
    blue:                   0x0000ff,
    teal:                   0x008080,
    aqua:                   0x00ffff,
    orange:                 0xffa500,
    aliceblue:              0xf0f8ff,
    antiquewhite:           0xfaebd7,
    aquamarine:             0x7fffd4,
    azure:                  0xf0ffff,
    beige:                  0xf5f5dc,
    bisque:                 0xffe4c4,
    blanchedalmond:         0xffebcd,
    blueviolet:             0x8a2be2,
    brown:                  0xa52a2a,
    burlywood:              0xdeb887,
    cadetblue:              0x5f9ea0,
    chartreuse:             0x7fff00,
    chocolate:              0xd2691e,
    coral:                  0xff7f50,
    cornflowerblue:         0x6495ed,
    cornsilk:               0xfff8dc,
    crimson:                0xdc143c,
    cyan:                   0x00ffff,
    darkblue:               0x00008b,
    darkcyan:               0x008b8b,
    darkgoldenrod:          0xb8860b,
    darkgray:               0xa9a9a9,
    darkgreen:              0x006400,
    darkgrey:               0xa9a9a9,
    darkkhaki:              0xbdb76b,
    darkmagenta:            0x8b008b,
    darkolivegreen:         0x556b2f,
    darkorange:             0xff8c00,
    darkorchid:             0x9932cc,
    darkred:                0x8b0000,
    darksalmon:             0xe9967a,
    darkseagreen:           0x8fbc8f,
    darkslateblue:          0x483d8b,
    darkslategray:          0x2f4f4f,
    darkslategrey:          0x2f4f4f,
    darkturquoise:          0x00ced1,
    darkviolet:             0x9400d3,
    deeppink:               0xff1493,
    deepskyblue:            0x00bfff,
    dimgray:                0x696969,
    dimgrey:                0x696969,
    dodgerblue:             0x1e90ff,
    firebrick:              0xb22222,
    floralwhite:            0xfffaf0,
    forestgreen:            0x228b22,
    gainsboro:              0xdcdcdc,
    ghostwhite:             0xf8f8ff,
    gold:                   0xffd700,
    goldenrod:              0xdaa520,
    greenyellow:            0xadff2f,
    grey:                   0x808080,
    honeydew:               0xf0fff0,
    hotpink:                0xff69b4,
    indianred:              0xcd5c5c,
    indigo:                 0x4b0082,
    ivory:                  0xfffff0,
    khaki:                  0xf0e68c,
    lavender:               0xe6e6fa,
    lavenderblush:          0xfff0f5,
    lawngreen:              0x7cfc00,
    lemonchiffon:           0xfffacd,
    lightblue:              0xadd8e6,
    lightcoral:             0xf08080,
    lightcyan:              0xe0ffff,
    lightgoldenrodyellow:   0xfafad2,
    lightgray:              0xd3d3d3,
    lightgreen:             0x90ee90,
    lightgrey:              0xd3d3d3,
    lightpink:              0xffb6c1,
    lightsalmon:            0xffa07a,
    lightseagreen:          0x20b2aa,
    lightskyblue:           0x87cefa,
    lightslategray:         0x778899,
    lightslategrey:         0x778899,
    lightsteelblue:         0xb0c4de,
    lightyellow:            0xffffe0,
    limegreen:              0x32cd32,
    linen:                  0xfaf0e6,
    magenta:                0xff00ff,
    mediumaquamarine:       0x66cdaa,
    mediumblue:             0x0000cd,
    mediumorchid:           0xba55d3,
    mediumpurple:           0x9370db,
    mediumseagreen:         0x3cb371,
    mediumslateblue:        0x7b68ee,
    mediumspringgreen:      0x00fa9a,
    mediumturquoise:        0x48d1cc,
    mediumvioletred:        0xc71585,
    midnightblue:           0x191970,
    mintcream:              0xf5fffa,
    mistyrose:              0xffe4e1,
    moccasin:               0xffe4b5,
    navajowhite:            0xffdead,
    oldlace:                0xfdf5e6,
    olivedrab:              0x6b8e23,
    orangered:              0xff4500,
    orchid:                 0xda70d6,
    palegoldenrod:          0xeee8aa,
    palegreen:              0x98fb98,
    paleturquoise:          0xafeeee,
    palevioletred:          0xdb7093,
    papayawhip:             0xffefd5,
    peachpuff:              0xffdab9,
    peru:                   0xcd853f,
    pink:                   0xffc0cb,
    plum:                   0xdda0dd,
    powderblue:             0xb0e0e6,
    rosybrown:              0xbc8f8f,
    royalblue:              0x4169e1,
    saddlebrown:            0x8b4513,
    salmon:                 0xfa8072,
    sandybrown:             0xf4a460,
    seagreen:               0x2e8b57,
    seashell:               0xfff5ee,
    sienna:                 0xa0522d,
    skyblue:                0x87ceeb,
    slateblue:              0x6a5acd,
    slategray:              0x708090,
    slategrey:              0x708090,
    snow:                   0xfffafa,
    springgreen:            0x00ff7f,
    steelblue:              0x4682b4,
    tan:                    0xd2b48c,
    thistle:                0xd8bfd8,
    tomato:                 0xff6347,
    turquoise:              0x40e0d0,
    violet:                 0xee82ee,
    wheat:                  0xf5deb3,
    whitesmoke:             0xf5f5f5,
    yellowgreen:            0x9acd32,
    rebeccapurple:          0x663399,
};



/**
 * Object where we keep the registered custom colors. We need it to determine whether the color
 * is a standard or a custom one.
 */
const customColors: { [P: string]: number } = {};



/**
 * Registers a new custom color or changes the value of the existing custom color. The name of the
 * custom color should have been already added to the [[INamedColors]] interface using the module
 * augmentation technique. Note that values of standard Web colors cannot be changed.
 *
 * @param name Color name. This name cannot be a name of the standard Web color.
 * @param value Color value to assign to the given named color.
 * @returns Flag indicating whether the operation was successful.
 */
export const registerColor = ( name: keyof INamedColors, value: number): boolean =>
{
    if (!name || value == null)
        return false;

    // try to retrieve this name from the CustomColors object. Non-undefined value means that
    // we already have this color registered.
    let customValue = customColors[name];

    // if the color name already exists in the Colors object we will only allow changing its
    // value if this is a custom color.
    if (name in Colors && customValue != null)
        return false;

    // add the value to the Colors and CustomColors objects
    (Colors as any)[name] = value;
    customColors[name] = value;
    return true;
}



/**
 * Converts color value from the numeric representation to the CSS color string.
 */
let  colorNumber2s = (val: number): string =>
{
    // if the number is negative, remember that fact and get the positive number
    let isNegative = val < 0;
    let n = isNegative ? -val : val;

    // if the number has a floating point part, separate it into alpha channel
    let a = 0;
    if (!Number.isInteger(n))
    {
        let k = Math.floor(n);
        // a = Math.round( (n - k) * 100);
        a = Math.round( (n - k) * 255);
        n = k;
    }

    // If the number was negative we revert the color by negating all the bits. In any case,
    // we clear everything beyond the first three bytes.
    n = isNegative ? ~(0xFF000000 | n) : 0x00FFFFFF & n;

    let s = "#" + n.toString(16).padStart( 6, "0");
    return a ? s + a.toString(16).padStart( 2, "0") : s;
}



/**
 * Converts color style value to the CSS string. We convert numeric values to the #RRGGBBAA
 * representation. If a string value is a custom color added via INamedColors module
 * augmentation we get its number from the `custmColors` object and also convert it to the
 * #RRGGBBAA representation. Standard named colors as well as are returned as is.
 */
wkf[WKF.Color] = (val: Extended<CssColor>): string =>
    v2s( val, {
        str: v => v in customColors ? colorNumber2s( customColors[v]) : v,
        num: colorNumber2s
    });

/**
 * Converts color style value to the CSS string. We convert numeric values to the #RRGGBBAA
 * representation. If a string value is a custom color added via INamedColors module
 * augmentation we get its number from the `custmColors` object and also convert it to the
 * #RRGGBBAA representation. Standard named colors as well as are returned as is.
 */
wkf[WKF.Colors] = (val: OneOrMany<CssColor>): string => v2s( val, { any: WKF.Color })



/**
 * Converts the color separation value to a CSS string.
 */
wkf[WKF.ColorSeparation] = (c: Extended<number>): string =>
    v2s( c, {
        num: c => {
            c = c < 0 ? -c : c;
            return (c === 0 || c >= 1) ? "" + c : (Math.round( c * 100) + "%");
        }
    })



/**
 * Converts the color specified as red, green, blue separation values and an optional alpha
 * mask to a CSS color representation. Each color separation can be represented as a number with
 * the following meaning:
 *   - Integer number -255 to 255. Numbers beyond this range will be clamped. Negative numbers
 *     will be inverted.
 *   - Floating number -1.0 to 1.0 non-inclusive, which is multiplied by 100 treated as percentage.
 *     Floating numbers beyond this range will be rounded and treated as integer numbers. Negative
 *     numbers will be inverted.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb()
 *
 * @param r Red separation value.
 * @param g Green separation value.
 * @param b Blue separation value.
 * @param a Optional alpha mask as a percentage value.
 * @return The `IRgbFunc` object representing the invocation of the `rgb()` CSS function
 */
export const rgb = (r: Extended<CssColorSeparation>, g: Extended<CssColorSeparation>,
    b: Extended<CssColorSeparation>, a?: Extended<CssPercent>): IRgbFunc =>
{
    return { fn: "rgb", r, g, b, a };
}

fdo.rgb = {
    p: [ ["r", WKF.ColorSeparation], ["g",  WKF.ColorSeparation], ["b",  WKF.ColorSeparation], ["a",  WKF.Percent, "/"] ],
    s: " "
};



/**
 * Converts the color specified as hue-saturation-lightness components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * The Hue component is treated as the CSS `<angle>` type. Numbers are considered degrees.
 *
 * The Saturation and Lightness components are treated as percentages:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive are multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100 are treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped to 100.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()
 *
 * @param h Hue component as an angle value.
 * @param s Saturation component as a percentage value.
 * @param l Lightness component as a percentage value.
 * @param a Optional alpha mask as a percentage value.
 * @return The `IHslFunc` object representing the invocation of the `hsl()` CSS function
 */
export const hsl = (h: Extended<CssAngle>, s: Extended<CssPercent>, l: Extended<CssPercent>,
    a?: Extended<CssPercent>): IHslFunc =>
{
    return { fn: "hsl", h, s, l, a };
}

fdo.hsl = {
    p: [ ["h", WKF.Angle], ["s", WKF.Percent], ["l", WKF.Percent], ["a", WKF.Percent, "/"] ],
    s: " "
};



/**
 * Converts the color specified as hue-whiteness-blackness components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * The Hue component is treated as the CSS `<angle>` type. Numbers are considered degrees.
 *
 * The Whiteness and Blackness components are treated as percentages:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive are multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100 are treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped to 100.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl()
 *
 * @param h Hue component as an angle value.
 * @param w Whiteness coponent as a percentage value.
 * @param b Blackness component as a percentage value.
 * @param a Optional alpha mask as a percentage value.
 * @return The `IHwbFunc` object representing the invocation of the `hwb()` CSS function
 */
export const hwb = (h: Extended<CssAngle>, w: Extended<CssPercent>, b: Extended<CssPercent>,
    a?: Extended<CssPercent>): IHwbFunc =>
{
    return { fn: "hwb", h, w, b, a };
}

fdo.hwb = {
    p: [ ["h", WKF.Angle], ["w", WKF.Percent], ["b", WKF.Percent], ["a", WKF.Percent, "/"] ],
    s: " "
};



/**
 * Converts the color specified as L\*a\*b\* components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab()
 *
 * @param l CIE Lightness component
 * @param da Distance along the a axis in the Lab colorspace
 * @param db Distance along the b axis in the Lab colorspace
 * @param a Optional alpha mask as a percentage value.
 * @returns The `ILabFunc` object representing the invocation of the `lab()` CSS function
 */
export const lab = (l: Extended<CssPercent>, da: Extended<number>, db: Extended<number>,
    a?: Extended<CssPercent>): ILabFunc =>
{
    return { fn: "lab", l, da, db, a };
}

fdo.lab = {
    p: [ ["l", WKF.AlwaysPercent], "da", "db", ["a", WKF.Percent, "/"] ],
    s: " "
};



/**
 * Converts the color specified as lightness-chroma-hue components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch()
 *
 * @param l CIE Lightness component
 * @param c Chroma component
 * @param h Hue component as an angle value.
 * @param a Optional alpha mask as a percentage value.
 * @returns The `ILchFunc` object representing the invocation of the `lch()` CSS function
 */
export const lch = (l: Extended<CssPercent>, c: Extended<number>, h: Extended<CssAngle>,
    a?: Extended<CssPercent>): ILchFunc =>
{
    return { fn: "lch", l, c, h, a };
}

fdo.lch = {
    p: [ ["l", WKF.AlwaysPercent], "c", ["h", WKF.Angle], ["a", WKF.Percent, "/"] ],
    s: " "
};



/**
 * Implements the `color-contrast()` CSS property.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-contrast()
 *
 * @param c Color to which the list of colors in the `vs` property will be compared
 * @param vs List of colors from which to select the most contrasting to the base color.
 * @returns The `IColorContrastFunc` object representing the invocation of the `color-contrast()`
 * CSS function
 */
export const colorContrast = (c: Extended<CssColor>, ...vs: Extended<CssColor>[]): IColorContrastFunc =>
    ({ fn: "color-contrast", c, vs });

fdo["color-contrast"] = {
    p: [
        ["c", (v: Extended<CssColor>) => v2s( v, WKF.Color) + " vs"],
        ["vs", (v: Extended<CssColor>[]) => a2s( v, WKF.Color, ",")]
    ],
    s: " "
};



/**
 * Represents an invocation of the CSS `color-mix()` function. This interface is returned from the
 * [[colorMix]] function. Developers can use this structure wherever [[CssColor]] is accepted.
 */
class ColorMixFunc implements IColorMixBuilder
{
    fn: "color-mix" = "color-mix";

    cs?: Extended<ColorSpace>;
    c1: [Extended<CssColor>, Extended<CssPercent>?];
    c2: [Extended<CssColor>, Extended<CssPercent>?];

    constructor( c: Extended<CssColor>, p?: Extended<CssPercent>) { this.c1 = [c, p]; }

    with( c: Extended<CssColor>, p?: Extended<CssPercent>): this  { this.c2 = [c, p]; return this; }
    in( cs: Extended<ColorSpace>): this { this.cs = cs; return this; }
}

/**
 * Implements the `color-mix()` CSS property.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix()
 *
 * **Examples**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefnition
 * {
 *     // color-mix( "blue", "red")
 *     cls1 = this.$class({
 *         color: css.colorMix("blue").with("red");
 *     })
 *
 *     // color-mix( in srgb, "blue 30%", "red" 60%)
 *     cls2 = this.$class({
 *         color: css.colorMix("blue", 30).with("red", 60).in("srgb");
 *     })
 * }
 * ```
 *
 * @param cs Color space. Default is "lch".
 * @returns The `IColorMixBuilder` object that allows adding colors and optional percentages to mix
 */
export const colorMix = (c: Extended<CssColor>, p?: Extended<CssPercent>): IColorMixBuilder => new ColorMixFunc( c, p);

fdo["color-mix"] = [
    ["cs", (v: Extended<ColorSpace>) => v ? "in " + v2s(v) : ""],
    ["c1", v => mv2s( [[v[0], WKF.Color], [v[1], WKF.Percent]])],
    ["c2", v => mv2s( [[v[0], WKF.Color], [v[1], WKF.Percent]])],
];



/**
 * Creates color representation in the given color profile. This method should be used when
 * defining CSS color values in styleset properties.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color()
 *
 * **Examples**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefnition
 * {
 *     // color(display-p3 1 50% 0 / .5)
 *     cls1 = this.$class({
 *         color: css.color("display-p3, [1, "50%", 0], 0.5);
 *     })
 * }
 * ```
 *
 * @param cp Name of the color profile
 * @param vs Array of color component values. Contains either numbers or strings denoting percents
 * or the `"none"` keyword.
 * @param a Optional alpha mask as a percentage value.
 * @returns The `IColorFunc` object representing the invocation of the `color()` CSS function
 */
 export const color = (cp: Extended<ColorProfile>, vs: Extended<number | string>[] | Extended<string>,
    a?: Extended<CssPercent>): IColorFunc =>
{
    return { fn: "color", cp, vs, a };
}

fdo.color = {
    p: [ "cp", "vs", ["a", WKF.Percent, "/"] ],
    s: " "
};



/**
 * Converts the given color and the alpha mask to the CSS Color representation. This
 * method should be used when defining CSS color values in styleset properties.
 *
 * The color can be specified as a numeric value or as a color name from the [[INamedColors]]
 * interface - including colors added using the module augmentation technique.
 *
 * The alpha mask is specified as a number:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - Number 1 to 100 inclusive, which is treated as percentage.
 *   - Numbers greater than 100 are clamped to 100;
 *
 * **Examples**
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // applying alpha to a numeric color
 *     cls1 = this.$class({ color: css.alpha( 0xAA00AA, 0.5) })
 *
 *     // applying alpha to a named color
 *     cls1 = this.$class({ color: css.alpha( "darkolivegreen", 0.5) })
 * }
 * ```
 * @param c Color value as either a number or a named color
 * @param a Alpha channel value
 */
export const alpha = (c: number | keyof INamedColors, a: number): IAlphaFunc => ({ fn: "alpha", c, a });

const alpha2s = (c: number | keyof INamedColors, a: number): string =>
{
    // if the alpha is 0, return transparent color
    if (a === 0)
        return "#0000";

    // convert color to numeric value (if it's not a number yet). If the color was given as a
    // string that we cannot find in the Colors object, return pure white.
    let n = typeof c === "string" ? Colors[c] : c;
    if (n == null)
        return "#FFF";

    // negative and positive values of alpha are treated identically, so convert to positive
    if (a < 0)
        a = -a;

    // convert alpha to a number with absolute value less than 1 (if it is not yet). If alpha
    // is 1 or 100, then set it to 0 because 0 in the colorNumberToString means "no alpha".
    a = a === 1 || a >= 100 ? 0 : a > 1 ? a / 100 : a;

    // make the new alpha
    return colorNumber2s( n >= 0 ? n + a : n - a);
}

fdo.alpha = (v: IAlphaFunc) => alpha2s( v.c, v.a)


