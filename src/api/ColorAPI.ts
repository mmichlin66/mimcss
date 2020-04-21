import * as ColorTypes from "../styles/ColorTypes"
import * as ColorFuncs from "../styles/ColorFuncs"



/**
 * Converts the color specified as red, green, blue separation values and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties. Each color separation can be represented as a number or a
 * string with the following meaning:
 *   - Integer number 0 to 255.
 *   - Floating number 0.0 to 1.0 non-inclusive, which is treated as percentage.
 *   - String which is used as is.
 * 
 * The alpha mask can be one of the following:
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - String which is used as is.
 * 
 * @param r Red separation value.
 * @param g Green separation vaue.
 * @param b Blue separation value.
 * @param a Optional alpha mask as a percentage value.
 */
export function rgb( r: number | string, g: number | string, b: number | string, a?: number | string): ColorTypes.ColorProxy
{
    return () => ColorFuncs.rgbToString( r, g, b, a);
}

/**
 * Converts the color specified as hue-saturation-lightness components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 * 
 * The alpha mask can be one of the following:
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - String which is used as is.
 * 
 * @param h Hue component as an angle value.
 * @param s Saturation as a percentage value.
 * @param l Lightness component as a percentage value.
 * @param a Optional alpha mask as a percentage value.
 */
export function hsl( h: number | string, s: number | string, l: number | string, a?: number | string): ColorTypes.ColorProxy
{
    return () => ColorFuncs.hslToString( h, s, l, a);
}

/**
 * Converts the given color and an optional alpha mask to the CSS Color representation. This
 * method should be used when defining CSS color values in styleset properties.
 * The color can be specified as a numeric value or as a string color name.
 * 
 * The alpha mask can be one of the following:
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - String which is used as is.
 * 
 * @param c 
 * @param a 
 */
export function alpha( c: number | keyof ColorTypes.INamedColors, a: number | string): ColorTypes.ColorProxy
{
    return () => ColorFuncs.alphaToString( c, a);
}



