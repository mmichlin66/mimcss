import {StringProxy, UnitValue} from "./utils"
import {Colors} from "./colors";
import {ICustomVar} from "../api/rules"
import {CustomVar} from "../rules/CustomVar"
import { stylePropToCssString } from "./styles";



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
    public static percent( n: number): string
    {
        return (Number.isInteger(n) ? n : n > -1.0 && n < 1.0 ? Math.round( n * 100) : Math.round(n)) + "%";
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
        return c == null ? "0" : typeof c === "string" ? c : Number.isInteger(c) ? c.toString() : this.percent(c);
    }

    public static rgb( r: number | string, g: number | string, b: number | string, a?: number | string): StringProxy
    {
        r = this.colorSep(r);
        g = this.colorSep(g);
        b = this.colorSep(b);
        a = a == null ? null : typeof a === "string" ? a : this.percent(a);

        return new StringProxy( a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`);
    }

    public static hsl( h: number | string, s: number | string, l: number | string, a?: number | string): StringProxy
    {
        h = typeof h === "string" ? h : Number.isInteger( h) ? h + "deg" : h + "rad";
        s = s == null ? "100%" : typeof s === "string" ? s : this.percent(s);
        l = l == null ? "100%" : typeof l === "string" ? l : this.percent(l);
        a = a == null ? null : typeof a === "string" ? a : this.percent(a);

        return new StringProxy( a == null ? `hsl(${h},${s},${l})` : `hsla(${h},${s},${l},${a})`);
    }

    public static alpha( c: number | keyof typeof Colors, a: number | string): StringProxy
    {
        let rgb = typeof c === "string" ? Colors[c] : c;
        return this.rgb( (rgb & 0xFF0000) >> 16, (rgb & 0x00FF00) >> 8, rgb & 0x0000FF, a);
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
     * Converts length value from the numeric representation to the CSS string. Integer
     * values are treated as pixels while floating numbers are treated as percents from 0.0 to 1.0.
     * @param val Length as a number
     */
    public static len( n: number, units?: string): string
    {
        return n === 0 ? "0" : units ? n + units : Number.isInteger( n) ?  n + "px" : this.percent(n);
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
     * @param val Angle as a number
     */
    public static angle( n: number, units?: string): string
    {
        return n === 0 ? "0" : units ? n + units : Number.isInteger(n) ?  n + "deg" : n + "rad";
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
     * @param val Time as a number
     */
    public static time( n: number, units?: "s" | "ms"): string
    {
        return n === 0 ? "0s" : units ? n + units : Number.isInteger(n) ?  n + "ms" : n + "s";
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
     * Returns the string representation of the CSS var() function for the given custom property.
     * Example:
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
            if (fallbackValue instanceof CustomVar)
                s += this.var( fallbackValue);
            else if (typeof fallbackValue === "string")
                s += fallbackValue.toString();
            else if (fallbackValue instanceof StringProxy || typeof customVar === "string")
                s += fallbackValue;
            else
                s += stylePropToCssString( (customVar as CustomVar<T>).templatePropName, fallbackValue);
        }

        return new StringProxy( s + ")");
    }
}



