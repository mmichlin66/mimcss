import {IStringProxy} from "./UtilTypes"
import {StringProxy} from "./UtilFuncs"
import {IStyleset} from "./StyleTypes"
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
}



