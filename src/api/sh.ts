import {
    StringProxy, Extended, UrlProxy, CssPosition, SimpleCssPosition, CssTime, CssAngle, CssLength
} from "../styles/UtilTypes"
import * as ColorTypes from "../styles/ColorTypes"
import * as ColorFuncs from "../styles/ColorFuncs"
import * as ImageTypes from "../styles/ImageTypes"
import * as ImageFuncs from "../styles/ImageFuncs"
import * as StyleTypes from "../styles/StyleTypes"
import {valueToString} from "../styles/UtilFuncs"
import {stylePropToCssString} from "../styles/StyleFuncs";



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
     * Returns a StringProxy function encapsulating the given string-like parameter.
     */
    public static raw( val: Extended<string>): StringProxy
    {
        return () => valueToString(val);
    }



    /**
     * Converts the given value corresponding to the given style property to a CSS string.
     * @param stylePropName Style property name that determines how the value should be converted
     * to a CSS compliant string.
     * @param stylePropValue Value to convert.
     */
    public static val<K extends StyleTypes.VarTemplateName>( stylePropName: K,
        stylePropValue: StyleTypes.VarValueType<K>): string | null
    {
        return stylePropToCssString( stylePropName, stylePropValue, true);
    }



    /**
     * Returns a UrlProxy function representing the CSS `url()` function. The string parameter
     * will be wrapped in a "url()" invocation unless it already is.
     */
    public static url( val: Extended<string>): UrlProxy
    {
        return () => `url(${valueToString(val)})`;
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
    public static rgb( r: number | string, g: number | string, b: number | string, a?: number | string): ColorTypes.ColorProxy
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
    public static hsl( h: number | string, s: number | string, l: number | string, a?: number | string): ColorTypes.ColorProxy
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
    public static alpha( c: number | keyof ColorTypes.INamedColors, a: number | string): ColorTypes.ColorProxy
    {
        return () => ColorFuncs.alphaToString( c, a);
    }

    

    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Images
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns an ImageProxy function representing the `linear-gradient()` CSS function.
     */
    public static linearGradient( angle?: ImageTypes.LinearGradAngle,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
    {
        return () => ImageFuncs.linearGradientToString( "linear-gradient", angle, stopsOrHints);
    }

    /**
     * Returns an ImageProxy function representing the `repeating-linear-gradient()` CSS function.
     */
    public static repeatingLinearGradient( angle?: ImageTypes.LinearGradAngle,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
    {
        return () => ImageFuncs.linearGradientToString( "repeating-linear-gradient", angle, stopsOrHints);
    }

    /**
     * Returns an ImageProxy function representing the `radial-gradient()` CSS function.
     */
    public static radialGradient( shape?: ImageTypes.RadialGradientShape,
        extent?: ImageTypes.RadialGradientExtent, pos?: CssPosition,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
    {
        return () => ImageFuncs.radialGradientToString( "radial-gradient", shape, extent, pos, stopsOrHints);
    }

    /**
     * Returns an ImageProxy function representing the `repeating-radial-gradient()` CSS function.
     */
    public static repeatingRadialGradient( shape?: ImageTypes.RadialGradientShape,
        extent?: ImageTypes.RadialGradientExtent, pos?: CssPosition,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): ImageTypes.ImageProxy
    {
        return () => ImageFuncs.radialGradientToString( "repeating-radial-gradient", shape, extent, pos, stopsOrHints);
    }

    /**
     * Returns an ImageProxy function representing the`conic-gradient()`  CSS function.
     */
    public static conicGradient( angle?: Extended<CssAngle>, pos?: SimpleCssPosition,
        ...stopsOrHints: ImageTypes.GradientStopOrHint[]): (img?:"image") => string
    {
        return () => ImageFuncs.conicGradientToString( angle, pos, stopsOrHints);
    }

    /**
     * Returns an ImageProxy function representing the `cross-fade()` CSS function.
     */
    public static crossFade( ...args: ImageTypes.CrossFadeParam[]): ImageTypes.ImageProxy
    {
        return () => ImageFuncs.crossFadeToString( args);
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
    public static animation( name: Extended<StyleTypes.AnimationName_Single>,
        duration: Extended<CssTime> = 1000,
        func: Extended<StyleTypes.AnimationTimingFunction_Single> = "ease",
        delay: Extended<CssTime> = 0,
        count: Extended<StyleTypes.AnimationIterationCount_Single> = 1,
        direction: Extended<StyleTypes.AnimationDirection_Single> = "normal",
        mode: Extended<StyleTypes.AnimationFillMode_Single> = "none",
        state: Extended<StyleTypes.AnimationPlayState_Single> = "running"): StyleTypes.Animation_Single
    {
        return { name, duration, func, delay,count, direction, state, mode };
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Background
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns an object that can be assigned to the animation property.
     * @param color Color value.
     * @param position
     * @param size
     * @param repeat Background repeat value. The default value is "repeat".
     * @param attachment Background attachment. The default value is "scroll".
     * @param origin Background origin. The default value is "padding-box".
     * @param clip Background clip. The default value is "border-box".
     */
    public static background(
            color?: Extended<ColorTypes.CssColor>,
            image?: Extended<ImageTypes.CssImage>,
            position?: Extended<CssPosition>,
            size?: Extended<StyleTypes.BackgroundSize_Single>,
            repeat: Extended<StyleTypes.BackgroundRepeat_Single> = "repeat",
            attachment: Extended<StyleTypes.BackgroundAttachment_Single> = "scroll",
            origin: Extended<StyleTypes.BackgroundOrigin_Single> = "padding-box",
            clip: Extended<StyleTypes.BackgroundClip_Single> = "border-box"
        ): StyleTypes.Background_Single
    {
        return { color, image, position, size, repeat, attachment, origin, clip };
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Shadow
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns an object that can be assigned to the box-shadow or text-shadow property.
     * @param x Horizontal offset of the shadow.
     * @param y Vertical offset of the shadow.
     * @param color Color of the shadow.
     * @param blur Value of the shadow's blurring. The default value is 1 pixel.
     * @param spread Value of the shadow's spreading. The default value is 0.
     * @param inset Flag indicating whether the shadow goes inside the shape. The default value is false.
     */
    public static shadow(
                    x: Extended<CssLength>,
                    y: Extended<CssLength>,
                    color: Extended<ColorTypes.CssColor>,
                    blur: Extended<CssLength> = 1,
                    spread: Extended<CssLength> = 0,
                    inset: Extended<boolean> = false)
    {
        return { x, y, color, blur, spread, inset };
    }
}



