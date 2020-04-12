import {
    IStringProxy, Extended, CssNumber, IUrlProxy
} from "./UtilTypes"
import {StringProxy, valueToString} from "./UtilFuncs"
import {IStyleset} from "./StyleTypes"
import * as StyleTypes from "./StyleTypes"
import {stylePropToCssString} from "./StyleFuncs";



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
     * Creates an IStringProxy object representing the CSS url() function. The string parameter
     * will be wrapped in a "url()" invocation unless it already is.
     */
    public static url( val: Extended<string>): IUrlProxy
    {
        return new UrlProxy( val);
    }



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
     *   - for-item array that defines cubic-bezier function.
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



