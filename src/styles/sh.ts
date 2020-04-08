import {IStringProxy} from "./UtilTypes"
import * as UtilFuncs from "./UtilFuncs"
import {IColors} from "./ColorTypes";
import {rgb, hsl, alpha} from "./ColorFuncs";
import {IStyleset} from "./StyleTypes"
import {stylePropToCssString} from "./StyleFuncs";



/**
 * The sh class stands for Style Helper andcontains static helper functions that are used whenever
 * there is a need to produce CSS string value based on more complicated type(s). The majority of
 * these functions return StringProxy object so that they can be used in styleset properties
 * assignments, for example:
 * ```typescript
 * <div style={{ color: sh.rgb( 255, 128, 64) }}
 * ```
 */
export class sh
{
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Utilities
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates a StringProxy object from the given string or another StringProxy object.
     */
    public static raw( s: string | IStringProxy): IStringProxy
    {
        return typeof s === "string" ? new UtilFuncs.StringProxy(s) : s;
    }

    /**
     * Converts the given value corresponding to the given style property to a CSS string.
     * @param stylePropName Style property name that determines how the value should be converted
     * to a CSS compliant string.
     * @param stylePropValue Value to convert.
     */
    public static val<K extends keyof IStyleset>( stylePropName: K, stylePropValue: IStyleset[K]): string | null
    {
        return stylePropToCssString( stylePropName, stylePropValue, true);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Colors
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    
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
    public static rgb( r: number | string, g: number | string, b: number | string, a?: number | string): IStringProxy
    {
        return new UtilFuncs.StringProxy( rgb( r, g, b, a));
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
    public static hsl( h: number | string, s: number | string, l: number | string, a?: number | string): IStringProxy
    {
        return new UtilFuncs.StringProxy( hsl( h, s, l, a));
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
    public static alpha( c: number | keyof IColors, a: number | string): IStringProxy
    {
        return new UtilFuncs.StringProxy( alpha( c, a));
    }
}



