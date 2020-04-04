import * as ColorTypes from "./ColorTypes"
import {Percent, valueToString} from "./UtilFuncs"



/**
 * Converts color separation value from the numeric representation to the 2-digit hexadecimal string.
 * @param val Number from 0 to 255
 */
function sepToHex( val: number): string
{
    let s = val.toString(16);
    return s.length === 1 ? "0" + s : s;
}



/**
 * Converts color value from the numeric representation to the CSS color string.
 * @param val Color as a number
 */
function colorNumberToCssString( val: number): string
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

    if (val <= 0xFFFFFF)
    {
        let r = (val & 0xFF0000) >> 16;
        let g = (val & 0x00FF00) >> 8;
        let b = (val & 0x0000FF);
        return `#${sepToHex(r)}${sepToHex(g)}${sepToHex(b)}`;
    }
    else
    {
        let r = (val & 0xFF000000) >> 24;
        let g = (val & 0x00FF0000) >> 16;
        let b = (val & 0x0000FF00) >> 8;
        let a = (val & 0x000000FF);
        return `#${sepToHex(r)}${sepToHex(g)}${sepToHex(b)}${sepToHex(a)}}`;
    }
}



/**
 * Converts time style value to the CSS time string.
 * @param val Time as a style property type
 */
export function colorToCssString( val: ColorTypes.Color_StyleType): string
{

    if (typeof val === "string")
    {
        if (ColorTypes.Colors[val])
            return colorNumberToCssString( ColorTypes.Colors[val]);
        else
            return val;
    }
    else
        return valueToString( val, { fromNumber: colorNumberToCssString });
}



function sep( c: number | string): string
{
    return c == null ? "0" : typeof c === "string" ? c : Number.isInteger(c) ? c.toString() : Percent.numberToString(c);
}



export function rgb( r: number | string, g: number | string, b: number | string, a?: number | string): string
{
    r = sep(r);
    g = sep(g);
    b = sep(b);
    a = a == null ? null : typeof a === "string" ? a : Percent.numberToString(a);

    return a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
}



export function hsl( h: number | string, s: number | string, l: number | string, a?: number | string): string
{
    h = typeof h === "string" ? h : Number.isInteger( h) ? h + "deg" : h + "rad";
    s = s == null ? "100%" : typeof s === "string" ? s : Percent.numberToString(s);
    l = l == null ? "100%" : typeof l === "string" ? l : Percent.numberToString(l);
    a = a == null ? null : typeof a === "string" ? a : Percent.numberToString(a);

    return a == null ? `hsl(${h},${s},${l})` : `hsla(${h},${s},${l},${a})`;
}



export function alpha( c: number | keyof typeof ColorTypes.Colors, a: number | string): string
{
    let rgbVal = typeof c === "string" ? ColorTypes.Colors[c] : c;
    return rgb( (rgbVal & 0xFF0000) >> 16, (rgbVal & 0x00FF00) >> 8, rgbVal & 0x0000FF, a);
}



