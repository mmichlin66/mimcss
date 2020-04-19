import {INamedColors, CssColor, Colors} from "./ColorTypes"
import {CssPercentMath, CssAngleMath, valueToString} from "./UtilFuncs"
import {Extended} from "./UtilTypes";



/**
 * Converts color value from the numeric representation to the CSS color string.
 */
function colorNumberToString( val: number): string
{
    /// #if DEBUG
        if (val < 0)
        {
            console.error( "A number representing color cannot be negative: " + val);
            return "#000";
        }
        else if (!Number.isInteger(val))
        {
            console.error( "A number representing color cannot be floating point: " + val);
            return "#000";
        }
    /// #endif

    // if we have a named color with the given value, return the color name
    let name = reversedColorMap.get( val);
    if (name)
        return name;
    else
    {
        // otherwise convert numeric value to # notation
        let s = val.toString(16);
        return "#" + (val <= 0xFFFFFF ? s.padStart( 6, "0") : s.padStart( 8, "0"));
    }
}



function colorSeparationToString( c: number | string): string
{
    return c == null ? "0" : typeof c === "string" ? c : Number.isInteger(c) ? c.toString() : CssPercentMath.convertFunc(c);
}



export function rgbToString( r: number | string, g: number | string, b: number | string, a?: number | string): string
{
    r = colorSeparationToString( r);
    g = colorSeparationToString( g);
    b = colorSeparationToString( b);
    a = a == null ? null : CssPercentMath.styleToString( a);

    return !a ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
}



export function hslToString( h: number | string, s: number | string, l: number | string, a?: number | string): string
{
    h = CssAngleMath.styleToString(h);
    s = s == null ? "100%" : CssPercentMath.styleToString( s);
    l = l == null ? "100%" : CssPercentMath.styleToString( l);
    a = a == null ? null : CssPercentMath.styleToString( a);

    return !a ? `hsl(${h},${s},${l})` : `hsla(${h},${s},${l},${a})`;
}



export function alphaToString( c: number | keyof INamedColors, a: number | string): string
{
    let rgbVal = typeof c === "string" ? this[c] : c;
    return rgbToString( (rgbVal & 0xFF0000) >> 16, (rgbVal & 0x00FF00) >> 8, rgbVal & 0x0000FF, a);
}



/**
 * Map of predefined color names by their numeric values
 */
let reversedColorMap = new Map<number,string>();

// build Reversed Color Map
Object.entries( Colors).forEach( ([name, value]) => reversedColorMap.set( value, name) );



/**
 * Converts color style value to the CSS time string. If a string value is in the Colors object we
 * need to get its number and convert it to the rgb[a]() function because it might be a custom
 * color name added via INamedColors module augmentation. For numeric values, we check if this is
 * one of the predefined
 */
export function colorToString( val: Extended<CssColor>): string
{
    return valueToString( val, {
        fromString: v => Colors[v] ? colorNumberToString( Colors[v]) : v,
        fromNumber: colorNumberToString
    });
}



