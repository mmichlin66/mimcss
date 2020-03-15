import {StringProxy, LengthUnits, AngleUnits, TimeUnits} from "../styles/UtilTypes"
import * as UtilFuncs from "../styles/UtilFuncs"
import * as ColorTypes from "../styles/ColorTypes";
import * as ColorFuncs from "../styles/ColorFuncs";
import {ICustomVar, ICustomVal} from "../rules/RuleTypes"
import {CustomVar} from "../rules/CustomVar"
import {PureStyleset} from "../styles/StyleTypes"
import {stylePropToCssString} from "../styles/StyleFuncs";



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
     * Converts the given value corresponding to the given style property to string.
     * @param stylePropName Style property name that determines how the value should be converted
     * to a CSS compliant string.
     * @param stylePropValue Value to convert.
     */
    public static val( stylePropName: string, stylePropValue: any): string
    {
        return stylePropToCssString( stylePropName, stylePropValue, true);
    }

    public static units<T extends string>( n: number, unit: T): string
    {
        return n + unit;
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

    public static alpha( c: number | keyof typeof ColorTypes.Colors, a: number | string): StringProxy
    {
        return new StringProxy( ColorFuncs.alpha( c, a));
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
        return UtilFuncs.percentNumberToCssString( n);
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
    public static len( n: number, units?: LengthUnits): string
    {
        return UtilFuncs.lengthNumberToCssString( n, units);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Angle units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates angle value in degrees */
    public static deg( n: number) { return this.units( n, "deg"); }

    /** Creates angle value in radians */
    public static rad( n: number) { return this.units( n, "rad"); }

    /** Creates angle value in gradians */
    public static grad( n: number) { return this.units( n, "grad"); }

    /** Creates angle value in turns */
    public static turn( n: number) { return this.units( n, "turn"); }

    /**
     * Converts angle value from the numeric representation to the CSS string. Integer
     * values are treated as degrees while floating numbers are treated as radians.
     */
    public static angle( n: number, units?: AngleUnits): string
    {
        return UtilFuncs.angleNumberToCssString( n, units);
    }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Time units
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /** Creates time value in seconds */
    public static s( n: number) { return this.units( n, "s"); }

    /** Creates time value in milliseconds */
    public static ms( n: number) { return this.units( n, "ms"); }

    /**
     * Converts time value from the numeric representation to the CSS string. Integer
     * values are treated as milliseconds while floating numbers are treated as seconds.
     */
    public static time( n: number, units?: TimeUnits): string
    {
        return UtilFuncs.timeNumberToCssString( n, units);
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
     * Returns an ICustomVal object that defines a custom CSS property as part of a Styleset.
     * Use it as in the following example:
     * ```tsx
     * let myStyles = $scope( class
     * {
     *     mainColor = $custom( "color", Colors.black);
     * 
     *     div = $tag( "div", { $custom: [ tsh.custom( this.mainColor, "brown") ] })
     * });
     * ```
     * This is equivalent to the following CSS rule (where *mainColorVarName* is the unique name
     * assigned by Mimcss to the `mainColor` custom CSS property):
     * ```css
     * div {
     *     --mainColorVarName: "brown";
     * }
     * ```
     * The `custom` method will produce a compilation error if an invalid type is used for the
     * property value.
     */
    public static custom<K extends keyof PureStyleset>( varDef: ICustomVar<K>, varValue: PureStyleset[K]): ICustomVal<K>
    {
		return { varDef, varValue };
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
    public static var<K extends keyof PureStyleset>( varDef: ICustomVar<K> | string,
                    fallbackValue?: PureStyleset[K] | ICustomVar<K> | string | StringProxy): VarValue<K>
    {
        return new VarValue( varDef, fallbackValue);
    }
}



/**
 * The VarValue class encapsulates a usage of the CSS `var` function for getting a value of a
 * custom CSS property.
 */
export class VarValue<K extends keyof PureStyleset> extends StringProxy
{
    constructor( varDef: ICustomVar<K> | string,
                    fallbackValue?: PureStyleset[K] | ICustomVar<K> | string | StringProxy)
    {
        super();
        this.varDef = varDef;
        this.fallbackValue = fallbackValue;
    }

    public toString(): string
    {
        let varName = typeof this.varDef === "string" ? this.varDef : (this.varDef as CustomVar<K>).varName;
        let s = `var(--${varName}`;
        if (this.fallbackValue)
        {
            s += ",";
            if (this.fallbackValue instanceof CustomVar)
                s += tsh.var( this.fallbackValue);
            else if (typeof this.fallbackValue === "string" || this.fallbackValue instanceof StringProxy || typeof this.varDef === "string")
                s += this.fallbackValue;
            else
                s += tsh.val( (this.varDef as CustomVar<K>).templatePropName, this.fallbackValue);
        }

        return s + ")";
    }

    public varDef: ICustomVar<K> | string;
    // public fallbackValue?: PureStyleset[K] | ICustomVar<K> | string | StringProxy;
    public fallbackValue?: any;
}



