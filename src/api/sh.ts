import {
    IStringProxy, Extended, CssNumber, IUrlProxy, CssPosition
} from "../styles/UtilTypes"
import {StringProxy, valueToString} from "../styles/UtilFuncs"
import {IStyleset} from "../styles/StyleTypes"
import * as ColorTypes from "../styles/ColorTypes"
import * as ColorFuncs from "../styles/ColorFuncs"
import * as ImageTypes from "../styles/ImageTypes"
import * as ImageFuncs from "../styles/ImageFuncs"
import * as StyleTypes from "../styles/StyleTypes"
import {stylePropToCssString} from "../styles/StyleFuncs";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// URLs
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The UrlProxy class represents an invocation of the CSS url() function.
 */
class UrlProxy implements IUrlProxy
{
    /** Flag indicating that this object implements the INumerProxy interface */
    public get isUrlProxy(): boolean { return true; }

    constructor( url: Extended<string>)
    {
        this.url = url;
    }

    /** Converts internally held value(s) to string */
    public valueToString(): string
    {
        let s = valueToString( this.url);
        return s && !s.startsWith("url(") ? `url(${s})` : s;
    }

    // Array of CssNumber parameters to the mathematical function.
    private url: Extended<string>;
}



/**
 * The sh class stands for Style Helper andcontains static helper functions that are used whenever
 * there is a need to produce CSS string value based on more complicated type(s).
 */
export class sh
{
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Utilities
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates an IStringProxy object from the given string or another IStringProxy object.
     */
    public static raw( s: string | IStringProxy): IStringProxy
    {
        return typeof s === "string" ? new StringProxy(s) : s;
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



    /**
     * Creates an IUrlProxy object representing the CSS `url()` function. The string parameter
     * will be wrapped in a "url()" invocation unless it already is.
     */
    public static url( val: Extended<string>): IUrlProxy
    {
        return new UrlProxy( val);
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
    public static rgb( r: number | string, g: number | string, b: number | string, a?: number | string): ColorTypes.IColorProxy
    {
        return new ColorFuncs.RgbProxy( r, g, b, a);
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
    public static hsl( h: number | string, s: number | string, l: number | string, a?: number | string): ColorTypes.IColorProxy
    {
        return new ColorFuncs.HslProxy( h, s, l, a);
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
    public static alpha( c: number | keyof ColorTypes.INamedColors, a: number | string): ColorTypes.IColorProxy
    {
        return new ColorFuncs.AlphaProxy( c, a);
    }

    

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Images
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Creates an IImageProxy object representing the CSS `linear-gradient()` function.
     */
    public static linearGradient( angle: ImageTypes.LinearGradAngle,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.IImageProxy
    {
        return new ImageFuncs.LinearGradientProxy( "linear-gradient", angle, stopsOrHints);
    }

    /**
     * Creates an IImageProxy object representing the CSS `repeating-linear-gradient()` function.
     */
    public static repeatingLinearGradient( angle: ImageTypes.LinearGradAngle = "to bottom",
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.IImageProxy
    {
        return new ImageFuncs.LinearGradientProxy( "repeating-linear-gradient", angle, stopsOrHints);
    }

    /**
     * Creates an IImageProxy object representing the CSS `radial-gradient()` function.
     */
    public static radialGradient( shape: ImageTypes.RadialGradientShape,
        extent: ImageTypes.RadialGradientExtent, pos: CssPosition,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.IImageProxy
    {
        return new ImageFuncs.RadialGradientProxy( "radial-gradient", shape, extent, pos, stopsOrHints);
    }

    /**
     * Creates an IImageProxy object representing the CSS `repeating-radial-gradient()` function.
     */
    public static repeatingRadialGradient( shape: ImageTypes.RadialGradientShape,
        extent: ImageTypes.RadialGradientExtent, pos: CssPosition,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.IImageProxy
    {
        return new ImageFuncs.RadialGradientProxy( "repeating-radial-gradient", shape, extent, pos, stopsOrHints);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Animations
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns an object that can be assigned to the animation property.
     * @param name Animation name. This can be either a string or a reference to the animation
     * rule definition.
     * @param duration Animation duration. Integer numbers for milliseconds, floating point
     * numbers for seconds. The default value is 1 second.
     * @param func Timing function. Default value is "ease". This can be one of the following types:
     *   - one of pre-defined timing function names.
     *   - a number of steps in the steps function. The step position will be set to jump-start.
     *   - one- or two-item array that defines a step function. The first item defines the number
     *     of steps. The optional second item is one of pre-defined step postion names.
     *   - four-item array that defines cubic-bezier function.
     * @param delay Delay before the animation starts. Integer numbers for milliseconds, floating
     * point numbers for seconds. The default value is 0.
     * @param count Number of iterations the animation shold run. The default value is 1.
     * @param direction Animation direction. The default value is "normal".
     * @param mode Animation fill mode. The default value is "none".
     * @param state Animation state. The default value is "running".
     */
    public static animation( name: Extended<StyleTypes.SingleAnimationName>,
        duration: Extended<CssNumber> = 1000,
        func: Extended<StyleTypes.SingleAnimationTimingFunction> = "ease",
        delay: Extended<CssNumber> = 0,
        count: Extended<StyleTypes.SingleAnimationIterationCount> = 1,
        direction: Extended<StyleTypes.SingleAnimationDirection> = "normal",
        mode: Extended<StyleTypes.SingleAnimationFillMode> = "none",
        state: Extended<StyleTypes.SingleAnimationPlayState> = "running",
        ): StyleTypes.SingleAnimation
    {
        return { name, duration, func, delay,count, direction, state, mode };
    }
}



