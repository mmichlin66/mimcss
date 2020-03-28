import {StringProxy} from "../styles/UtilTypes"
import {percentNumberToCssString} from "../styles/UtilFuncs"
import {IColors} from "../styles/ColorTypes";
import {rgb, hsl, alpha} from "../styles/ColorFuncs";
import {IStyleset} from "../styles/StyleTypes"
import {stylePropToCssString} from "../styles/StyleFuncs";



/**
 * The msh class contains static helper functions that are used whenever there is a need to produce
 * CSS string value based on more complicated type(s). The majority of these functions return
 * StringProxy object so that they can be used in styleset properties assignments, for example:
 * ```typescript
 * <div style={{ color: tsh.rgb( 255, 128, 64) }}
 * ```
 */
export class tsh
{
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Utilities
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates a StringProxy object from the given string or another StringProxy object.
     */
    public static raw( s: string | StringProxy): StringProxy
    {
        return new StringProxy(s);
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
     * values in styleset properties. Each color separation cna be represented as a number or a
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
    public static rgb( r: number | string, g: number | string, b: number | string, a?: number | string): StringProxy
    {
        return new StringProxy( rgb( r, g, b, a));
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
    public static hsl( h: number | string, s: number | string, l: number | string, a?: number | string): StringProxy
    {
        return new StringProxy( hsl( h, s, l, a));
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
    public static alpha( c: number | keyof IColors, a: number | string): StringProxy
    {
        return new StringProxy( alpha( c, a));
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Percent
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Converts the given number to a percent string. Numbers between -1 and 1 are multiplyed by 100.
     */
    public static percent( n: number): string
    {
        return percentNumberToCssString( n);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Length units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates length value in quaters of an inch */
    public static Q( n: number) { return n + "Q"; }

    /** Creates length value in ch units */
    public static ch( n: number) { return n + "ch"; }

    /** Creates length value in cantimeters */
    public static cm( n: number) { return n + "cm"; }

    /** Creates length value in calculated font-sizes of the element */
    public static em( n: number) { return n + "em"; }

    /** Creates length value in heights of lowercase letter 'x' in the font */
    public static ex( n: number) { return n + "ex"; }

    /** Creates length value in ic units */
    public static ic( n: number) { return n + "ic"; }

    /** Creates length value in inches */
    public static in( n: number) { return n + "in"; }

    /** Creates length value in line-heights of the element */
    public static lh( n: number) { return n + "lh"; }

    /** Creates length value in millimeters */
    public static mm( n: number) { return n + "mm"; }

    /** Creates length value in picas */
    public static pc( n: number) { return n + "pc"; }

    /** Creates length value in points */
    public static pt( n: number) { return n + "pt"; }

    /** Creates length value in pixels */
    public static px( n: number) { return n + "px"; }

    /** Creates length value in 1% of the size of the initial containing block, in the direction
     * of the root element’s block axis */
    public static vb( n: number) { return n + "vb"; }

    /** Creates length value in 1% of the height of the viewport's initial containing block */
    public static vh( n: number) { return n + "vh"; }

    /** Creates length value in 1% of the size of the initial containing block, in the direction
     * of the root element’s inline axis */
    public static vi( n: number) { return n + "vi"; }

    /** Creates length value in 1% of the width of the viewport's initial containing block */
    public static vw( n: number) { return n + "vw"; }

    /** Creates length value in fontsizes of the root element (<html>) */
    public static rem( n: number) { return n + "rem"; }

    /** Creates length value in line-heights of the root element (<html>) */
    public static rlh( n: number) { return n + "rlh"; }

    /** Creates length value in the units which are a smaller value between vw and vh */
    public static vmax( n: number) { return n + "vmax"; }

    /** Creates length value in the units which are a larger value between vw and vh */
    public static vmin( n: number) { return n + "vmin"; }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Angle units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates angle value in degrees */
    public static deg( n: number) { return n + "deg"; }

    /** Creates angle value in radians */
    public static rad( n: number) { return n + "rad"; }

    /** Creates angle value in gradians */
    public static grad( n: number) { return n + "grad"; }

    /** Creates angle value in turns */
    public static turn( n: number) { return n + "turn"; }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Time units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates time value in seconds */
    public static s( n: number) { return n + "s"; }

    /** Creates time value in milliseconds */
    public static ms( n: number) { return n + "ms"; }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Frequency units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates frequency value in Hertz */
    public static hz( n: number) { return n + "Hz"; }

    /** Creates frequency value in Kilo-Hertz */
    public static khz( n: number) { n + "kHz"; }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Resolution units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates resolution value in DPI */
    public static dpi( n: number) { return n + "dpi"; }

    /** Creates resolution value in DPCM */
    public static dpcm( n: number) { return n + "dpcm"; }

    /** Creates resolution value in DPPX */
    public static dppx( n: number) { return n + "dppx"; }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Fraction units (for flex)
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates fraction value for flex */
    public static fr( n: number) { return n + "fr"; }
}



