import {StringProxy, UnitValue} from "./UtilTypes"
import * as UtilFuncs from "./UtilFuncs"
import * as ColorTypes from "./ColorTypes";
import * as ColorFuncs from "./ColorFuncs";
import {ICustomVar} from "../api/rules"
import {CustomVar} from "../rules/CustomVar"
import {Styleset} from "../styles/StyleTypes"
import {stylePropToCssString} from "./StyleFuncs";



/**
 * The msh class contains static helper functions that are used whenever there is a need to produce
 * CSS string value based on more complicated type(s). The majority of these functions return
 * StringProxy object so that they can be used in styleset properties assignments, for example:
 * ```tsx
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
     * Converts the given number to a percent string. Numbers between -1 and 1 are multiplyed by 100.
     */
    public static percent( n: number): string
    {
        return UtilFuncs.percentToCssString( n);
    }

    /**
     * Converts the given value corresponding to the given style property to string.
     * @param stylePropName Style property name that determines how the value should be converted
     * to a CSS compliant string.
     * @param stylePropValue Value to convert.
     */
    public static val( stylePropName: string, stylePropValue: any): string
    {
        return stylePropToCssString( stylePropName, stylePropValue, true);
    }

    public static units( n: number, unit: string): UnitValue
    {
        return new UnitValue( n, unit);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Colors
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static colorSep( c: number | string): string
    {
        return ColorFuncs.colorSep(c);
    }

    public static rgb( r: number | string, g: number | string, b: number | string, a?: number | string): StringProxy
    {
        return new StringProxy( ColorFuncs.rgb( r, g, b, a));
    }

    public static hsl( h: number | string, s: number | string, l: number | string, a?: number | string): StringProxy
    {
        return new StringProxy( ColorFuncs.hsl( h, s, l, a));
    }

    public static alpha( c: number | keyof ColorTypes.ColorsClass, a: number | string): StringProxy
    {
        return new StringProxy( ColorFuncs.alpha( c, a));
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Length units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static Q( n: number) { return this.units( n, "Q"); }
    public static ch( n: number) { return this.units( n, "ch"); }
    public static cm( n: number) { return this.units( n, "cm"); }
    public static em( n: number) { return this.units( n, "em"); }
    public static ex( n: number) { return this.units( n, "ex"); }
    public static ic( n: number) { return this.units( n, "ic"); }
    public static in( n: number) { return this.units( n, "in"); }
    public static lh( n: number) { return this.units( n, "lh"); }
    public static mm( n: number) { return this.units( n, "mm"); }
    public static pc( n: number) { return this.units( n, "pc"); }
    public static pt( n: number) { return this.units( n, "pt"); }
    public static px( n: number) { return this.units( n, "px"); }
    public static vb( n: number) { return this.units( n, "vb"); }
    public static vh( n: number) { return this.units( n, "vh"); }
    public static vi( n: number) { return this.units( n, "vi"); }
    public static vw( n: number) { return this.units( n, "vw"); }
    public static rem( n: number) { return this.units( n, "rem"); }
    public static rlh( n: number) { return this.units( n, "rlh"); }
    public static vmax( n: number) { return this.units( n, "vmax"); }
    public static vmin( n: number) { return this.units( n, "vmin"); }

    /**
     * Converts length value from the numeric representation to the CSS string.
     */
    public static len( n: number, units?: string): string
    {
        return UtilFuncs.lengthToCssString( n, units);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Angle units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static deg( n: number) { return this.units( n, "deg"); }
    public static rad( n: number) { return this.units( n, "rad"); }
    public static grad( n: number) { return this.units( n, "grad"); }
    public static turn( n: number) { return this.units( n, "turn"); }

    /**
     * Converts angle value from the numeric representation to the CSS string. Integer
     * values are treated as degrees while floating numbers are treated as radians.
     */
    public static angle( n: number, units?: string): string
    {
        return UtilFuncs.angleToCssString(n);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Time units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static s( n: number) { return this.units( n, "s"); }
    public static ms( n: number) { return this.units( n, "ms"); }

    /**
     * Converts time value from the numeric representation to the CSS string. Integer
     * values are treated as milliseconds while floating numbers are treated as seconds.
     */
    public static time( n: number, units?: string): string
    {
        return UtilFuncs.timeToCssString(n);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Frequency units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static hz( n: number) { return this.units( n, "Hz"); }
    public static khz( n: number) { return this.units( n, "kHz"); }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Resolution units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static dpi( n: number) { return this.units( n, "dpi"); }
    public static dpcm( n: number) { return this.units( n, "dpcm"); }
    public static dppx( n: number) { return this.units( n, "dppx"); }

/**
     * Converts resolution value from the numeric representation to the CSS string. Integer
     * values are treated as DPI while floating numbers are treated as DPCM.
     */
    public static resolution( n: number, units?: string): string
    {
        return UtilFuncs.resolutionToCssString( n, units);
    }





    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Fraction units (for flex)
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////
    public static fr( n: number) { return this.units( n, "fr"); }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Custom CSS properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Returns a StringProxy object that defines a custom CSS property as part of a Styleset.
     * Use it as in the following example:
     * ```tsx
     * let myStyles = $scope( class
     * {
     *     div = $tag( "div", { $custom: {
     *         defaultColor: tsh.custom( "color", "black"),
     *         defaultBgColor: tsh.custom( "color", "white"),
     *     }})
     * });
     * ```
     */
    public static custom<K extends keyof Styleset>( templatePropName: K, propVal: Styleset[K]): StringProxy
    {
		return new StringProxy( `${tsh.val( templatePropName, propVal)}`);
    }

    /**
     * Returns the string representation of the CSS var() function for the given custom property.
     * Use it as in the following example:
     * ```tsx
     * let myStyles = $scope( class
     * {
     *     defaultColor = $custom( "color", "blue");
     * 
     *     sidebar = $class( { color: tsh.var( this.defaultColor, "black") })
     * });
     * ```
     * The var method can also be used with simple string values:
     * ```tsx
     * <div style={{ color: tsh.var( "default-color", "black") }}
     * ```
     */
    public static var<T>( customVar: ICustomVar<T> | string, fallbackValue?: T | ICustomVar<T> | string | StringProxy): StringProxy
    {
        let varName = typeof customVar === "string" ? customVar : (customVar as CustomVar<T>).varName;
        let s = `var(--${varName}`;
        if (fallbackValue)
        {
            s += ",";
            if (fallbackValue instanceof CustomVar)
                s += this.var( fallbackValue);
            else if (typeof fallbackValue === "string" || fallbackValue instanceof StringProxy || typeof customVar === "string")
                s += fallbackValue;
            else
                s += this.val( (customVar as CustomVar<T>).templatePropName, fallbackValue);
        }

        return new StringProxy( s + ")");
    }
}



