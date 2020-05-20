import {INamedColors, CssColor, Colors} from "./ColorTypes"
import {CssAngleMath, valueToString} from "./UtilFuncs"
import {Extended} from "./UtilTypes";



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
function separationToString( c: number): string
{
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



/**
 * Converts the alpha channel value to a CSS string. Alpha is represented as a number
 * with the following meaning:
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive, which is multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100, which is treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 */
function alphaToString( a?: number): string
{
    // if alpha is null or undefined, set it to 1
    if (a == null)
        return "1";

    // negative and positive values of alpha are treated identically, so convert to positive
    if (a < 0)
        a = -a;

    // convert alpha to a number with absolute value less than 1 (if it is not yet). If alpha
    // is greater than 100, set it to 1; otherwise, 
    return (a > 100 ? 1 : a > 1 ? a / 100 : a).toFixed(2);
}



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
 */
export function rgbToString( r: number, g: number, b: number, a?: number): string
{
    return `rgba(${separationToString( r)},${separationToString( g)},${separationToString( b)},${alphaToString( a)})`;
}



/**
 * Converts a number representing either saturation or lightness in the HSL scheme to percentage:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive are multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100 are treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped to 100.
 */
function colorPercentToString( n: number): string
{
    // negative and positive values are treated identically, so convert to positive
    if (n < 0)
        n = -n;

    // convert alpha to a number with absolute value less than 1 (if it is not yet). If alpha
    // is greater than 100, clamp it. 
    return (n > 100 ? 100 : Math.round(n <= 1 ? n * 100 : n)).toString() + "%";
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
 */
export function hslToString( h: number | string, s: number, l: number, a?: number): string
{
    return `hsla(${CssAngleMath.styleToString(h)},${colorPercentToString(s)},${colorPercentToString(l)},${alphaToString( a)})`;
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
export function colorWithAlphaToString( c: number | keyof INamedColors, a: number): string
{
    // if the alpha is 0, return transparent color
    if (a === 0)
        return "#0000";

    // convert color to numeric value (if it's not a number yet). If the color was given as a
    // string that we cannot find in the Colors object, return pure white.
    let n = typeof c === "string" ? Colors[c] : c;
    if (n == null)
        return "FFF";

    // negative and positive values of alpha are treated identically, so convert to positive
    if (a < 0)
        a = -a;

    // convert alpha to a number with absolute value less than 1 (if it is not yet). If alpha
    // is 1 or 100, then set it to 0 because 0 in the colorNumberToString means "no alpha".
    a = a === 1 || a >= 100 ? 0 : a > 1 ? a / 100 : a;

    // make the new alpha
    return colorNumberToString( n > 0 ? n + a : n - a);
}



/**
 * Converts color style value to the CSS time string. If a string value is in the Colors object we
 * need to get its number and convert it to the rgb[a]() function because it might be a custom
 * color name added via INamedColors module augmentation. For numeric values, we check if this is
 * one of the predefined colors and return its string representation
 */
export function colorToString( val: Extended<CssColor>): string
{
    return valueToString( val, {
        fromString: v => Colors[v] ? colorNumberToString( Colors[v]) : v,
        fromNumber: colorNumberToString
    });
}



