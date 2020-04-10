import {
    IStringProxy, ExtendedPropType, ExtendedNumber_StyleType
} from "./UtilTypes"
import {StringProxy} from "./UtilFuncs"
import {IStyleset} from "./StyleTypes"
import * as StyleTypes from "./StyleTypes"
import {stylePropToCssString} from "./StyleFuncs";



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
     * Creates a StringProxy object from the given string or another StringProxy object.
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
    public static animation( name: ExtendedPropType<StyleTypes.SingleAnimationName>,
        duration: ExtendedNumber_StyleType = 1000,
        func: ExtendedPropType<StyleTypes.SingleAnimationTimingFunction> = "ease",
        delay: ExtendedNumber_StyleType = 0,
        count: ExtendedPropType<StyleTypes.SingleAnimationIterationCount> = 1,
        direction: ExtendedPropType<StyleTypes.SingleAnimationDirection> = "normal",
        mode: ExtendedPropType<StyleTypes.SingleAnimationFillMode> = "none",
        state: ExtendedPropType<StyleTypes.SingleAnimationPlayState> = "running",
        ): StyleTypes.SingleAnimation
    {
        return { name, duration, func, delay,count, direction, state, mode };
    }
}



