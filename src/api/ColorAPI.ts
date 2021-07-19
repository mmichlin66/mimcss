/**
 * This module contains definitions of functions and classes used to define CSS Color functions.
 * @module
 */



import {Extended} from "./CoreTypes";
import {CssAngle} from "./NumericTypes";
import {CssColor, IColorProxy, INamedColors} from "./ColorTypes";
import {AngleMath} from "../impl/NumericImpl";
import {v2s, wkf, WKF} from "../impl/Utils";



/**
 * Object whose property names are names of well-known colors and values correspond to the
 * hexadecimal representation of the RGB separations (without an alpha mask). The properties of
 * this object can be used wherever the [[CssColor]] type can be used. Since the properties are
 * of the `number` type, they can be used for manipulating the color value.
*/
export let Colors: INamedColors =
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
 * Map of predefined color names by their numeric values. Only built-in color names will be in
 * this map - those named colors that are added using module augmentation will NOT reside in
 * this map. This is needed to convert the numeric color values set using the Color.brown
 * notation to their names when inserting CSS rules.
 */
let reversedColorMap = new Map<number,string>();

// build Reversed Color Map
Object.entries( Colors).forEach( ([name, value]) => reversedColorMap.set( value, name) );



/**
 * Converts color value from the numeric representation to the CSS color string.
 */
function colorNumberToString( val: number): string
{
    // if the number is negative, remember that fact and get the positive number
    let n = val < 0 ? -val : val;
    let isNegative = n !== val;

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

    if (a > 0)
        // return colorWithAlphaToString( n, a);
        // return rgbToString( (n & 0xFF0000) >> 16, (n & 0x00FF00) >> 8, n & 0x0000FF, a);
        return "#" + n.toString(16).padStart( 6, "0") + a.toString(16).padStart( 2, "0");
    else
    {
        // if we have a named color with the given value, return the color name
        let name = reversedColorMap.get( n);
        return name ? name : "#" + n.toString(16).padStart( 6, "0");
    }
}



/**
 * Converts the color separation value to a CSS string. Separation are represented as a number
 * with the following meaning:
 *   - Integer number -255 to 255. Numbers beyond this range will be clamped. Negative numbers
 *     will be inverted.
 *   - Floating number -1.0 to 1.0 non-inclusive, which is multiplied by 100 treated as percentage.
 *     Floating numbers beyond this range will be rounded and treated as integer numbers. Negative
 *     numbers will be inverted.
 *
 * @param c Color separation value.
 */
function separationToString( c: Extended<number>): string
{
    return v2s( c, {
        num: c => {
            if (c !== 0 && c > -1 && c < 1)
            {
                // invert negative value
                if (c < 0)
                    c = 1 + c;

                return Math.round( c * 100) + "%";
            }
            else
            {
                // clamp the value between -255 and 255
                c = c > 255 ? 255 : c < -255 ? -255 : c;

                if (!Number.isInteger(c))
                    c = Math.round(c);

                // invert negative value
                if (c < 0)
                    c = 255 + c;

                return c.toString();
            }
        }
    })
}



/**
 * Converts the alpha channel value to a CSS string. Alpha can be represented using the following
 * types:
 * - Floating number 0 to 1 inclusive.
 * - Integer or floating number 1 to 100, which is treated as percentage. Floating numbers will be
 *   rounded. Numbers beyond this range will be clamped.
 * - ICustomVar - CSS custom property, for which the var() expression is returned
 */
function alphaToString( a?: Extended<number>): string
{
    return v2s( a, {
        nil: "1",
        num: a => {
            // negative and positive values of alpha are treated identically, so convert to positive
            if (a < 0)
                a = -a;

            // convert alpha to a number with absolute value less than 1 (if it is not yet). If alpha
            // is greater than 100, set it to 1; otherwise,
            return (a > 100 ? 1 : a > 1 ? a / 100 : a).toFixed(2);
        }
    })
}



/**
 * Converts a number representing either saturation or lightness in the HSL scheme to percentage:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive are multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100 are treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped to 100.
 */
function colorPercentToString( n: Extended<number>): string
{
    return v2s( n, {
        num: n => {
            // negative and positive values are treated identically, so convert to positive
            if (n < 0)
                n = -n;

            // convert the input to a number with absolute value less than 1 (if it is not yet). If it
            // is greater than 100, clamp it.
            return (n > 100 ? 100 : Math.round(n <= 1 ? n * 100 : n)).toString() + "%";
        }
    })
}



/**
 * Converts the given color and the alpha mask to the CSS Color representation. This
 * method should be used when defining CSS color values in styleset properties.
 *
 * The color can be specified as a numeric value or as a string color name.
 *
 * The alpha mask is specified as a number:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - Number 1 to 100 inclusive, which is treated as percentage.
 *   - Numbers greater than 100 are clamped to 100;
 *
 * @param c Color value as either a number or a named color
 * @param a Alpha channel value
 */
function colorWithAlphaToString( c: number | keyof INamedColors, a: number): string
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
    return colorNumberToString( n >= 0 ? n + a : n - a);
}



/**
 * Converts color style value to the CSS time string. If a string value is in the Colors object we
 * need to get its number and convert it to the rgb[a]() function because it might be a custom
 * color name added via INamedColors module augmentation. For numeric values, we check if this is
 * one of the predefined colors and return its string representation
 */
function color2s( val: Extended<CssColor>): string
{
    return v2s( val, {
        str: v => Colors[v] ? colorNumberToString( Colors[v]) : v,
        num: colorNumberToString
    });
}

// register color conversion function
wkf[WKF.Color] = color2s;



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
 * @param r Red separation value.
 * @param g Green separation value.
 * @param b Blue separation value.
 * @param a Optional alpha mask as a percentage value.
 * @return The IColorProxy function representing the invocation of the hsla CSS function
 */
export function rgb( r: Extended<number>, g: Extended<number>, b: Extended<number>, a?: Extended<number>): IColorProxy
{
    return () => `rgba(${separationToString( r)},${separationToString( g)},${separationToString( b)},${alphaToString( a)})`;
    // return f2s("rgba", [[r, separationToString], [g, separationToString], [b, separationToString], [a, alphaToString]]);
}



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
 * @param h Hue component as an angle value.
 * @param s Saturation component as a percentage value.
 * @param l Lightness component as a percentage value.
 * @param a Optional alpha mask as a percentage value.
 * @return The IColorProxy function representing the invocation of the hsla CSS function
 */
export function hsl( h: Extended<CssAngle>, s: Extended<number>, l: Extended<number>, a?: Extended<number>): IColorProxy
{
    return () => `hsla(${AngleMath.v2s(h)},${colorPercentToString(s)},${colorPercentToString(l)},${alphaToString( a)})`;
    // return f2s("hsla", [[h, WKF.Angle], [s, colorPercentToString], [l, colorPercentToString], [a, alphaToString]]);
}



/**
 * Converts the given color and the alpha mask to the CSS Color representation. This
 * method should be used when defining CSS color values in styleset properties.
 *
 * The color can be specified as a numeric value or as a string color name.
 *
 * The alpha mask is specified as a number:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - Number 1 to 100 inclusive, which is treated as percentage.
 *   - Numbers greater than 100 are clamped to 100;
 *
 * @param c Color value as either a number or a named color
 * @param a Alpha channel value
 */
export function alpha( c: number | keyof INamedColors, a: number): IColorProxy
{
    return () => colorWithAlphaToString( c, a);
}



