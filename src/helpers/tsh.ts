import {StringProxy, LengthUnits, AngleUnits, TimeUnits} from "../styles/UtilTypes"
import * as UtilFuncs from "../styles/UtilFuncs"
import * as ColorTypes from "../styles/ColorTypes";
import * as ColorFuncs from "../styles/ColorFuncs";
import {PureStyleset, ICustomVal} from "../styles/StyleTypes"
import {stylePropToCssString} from "../styles/StyleFuncs";
import {ICustomVar} from "../rules/RuleTypes"
import {CustomVar} from "../rules/CustomVar"



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
    public static val<K extends keyof PureStyleset>( stylePropName: K, stylePropValue: PureStyleset[K]): string
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
        return new StringProxy( ColorFuncs.rgb( r, g, b, a));
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
        return new StringProxy( ColorFuncs.hsl( h, s, l, a));
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
    public static deg( n: number) { return n + "deg"; }

    /** Creates angle value in radians */
    public static rad( n: number) { return n + "rad"; }

    /** Creates angle value in gradians */
    public static grad( n: number) { return n + "grad"; }

    /** Creates angle value in turns */
    public static turn( n: number) { return n + "turn"; }

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
    public static s( n: number) { return n + "s"; }

    /** Creates time value in milliseconds */
    public static ms( n: number) { return n + "ms"; }

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

    /** Creates fraction value for flex */
    public static fr( n: number) { return n + "fr"; }



    ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // Custom CSS properties
    //
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Defines a custom CSS property as part of a Styleset. Use it as in the following example:
     * 
     * ```typescript
     * let myStyles = $scope( class
     * {
     *     mainColor = $custom( "color", "black");
     *     div = $tag( "div", { $custom: [ tsh.custom( this.mainColor, "brown") ] })
     * });
     * ```
     * 
     * This is equivalent to the following CSS:
     * 
     * ```css
     * :root { --mainColor: "black"; }
     * div { --mainColor: "brown"; }
     * ```
     * 
     * The `tsh.custom` method will produce a compilation error if an invalid type is used for the
     * property value.
     */
    public static custom<K extends keyof PureStyleset>( varDef: ICustomVar<K>, varValue: PureStyleset[K]): ICustomVal<K>
    {
		return { varDef, varValue };
    }

    /**
     * Returns the string representation of the CSS var() function for the given custom property.
     * Use it as in the following example:
     * 
     * ```typescript
     * let myStyles = $scope( class
     * {
     *     defaultColor = $custom( "color", "blue");
     * 
     *     sidebar = $class( { color: tsh.var( this.defaultColor) })
     * });
     * ```
     * 
     * The var method can also be used with simple string values:
     * ```typescript
     * <div style={{ color: tsh.var( "default-color") }}
     * ```
     */
    public static var<K extends keyof PureStyleset>( varDef: ICustomVar<K> | string,
                    fallbackValue?: PureStyleset[K] | ICustomVar<K> | string | StringProxy): StringProxy
    {
        return new VarValue( varDef, fallbackValue);
    }
}



/**
 * The VarValue class encapsulates a usage of the CSS `var` function for getting a value of a
 * custom CSS property.
 */
class VarValue<K extends keyof PureStyleset> extends StringProxy
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
                s += stylePropToCssString( (this.varDef as CustomVar<K>).templatePropName, this.fallbackValue, true);
        }

        return s + ")";
    }

    public varDef: ICustomVar<K> | string;
    // public fallbackValue?: PureStyleset[K] | ICustomVar<K> | string | StringProxy;
    public fallbackValue?: any;
}



