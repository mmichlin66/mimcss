/**
 * This file contains types and functions used to work with CSS colors.
 */

import {Base_StyleType} from "./utils"



/**
 * Object whose property names are names of well-known colors and values correspond to the hexadecimal
 * representartion of the RGB separations (without an alpha mask).
 */
export class ColorsClass 
{
    readonly black = 0x000000;
    readonly silver = 0xc0c0c0;
    readonly gray = 0x808080;
    readonly white = 0xffffff;
    readonly maroon = 0x800000;
    readonly red = 0xff0000;
    readonly purple = 0x800080;
    readonly fuchsia = 0xff00ff;
    readonly green = 0x008000;
    readonly lime = 0x00ff00;
    readonly olive = 0x808000;
    readonly yellow = 0xffff00;
    readonly navy = 0x000080;
    readonly blue = 0x0000ff;
    readonly teal = 0x008080;
    readonly aqua = 0x00ffff;
    readonly orange = 0xffa500;
    readonly aliceblue = 0xf0f8ff;
    readonly antiquewhite = 0xfaebd7;
    readonly aquamarine = 0x7fffd4;
    readonly azure = 0xf0ffff;
    readonly beige = 0xf5f5dc;
    readonly bisque = 0xffe4c4;
    readonly blanchedalmond = 0xffebcd;
    readonly blueviolet = 0x8a2be2;
    readonly brown = 0xa52a2a;
    readonly burlywood = 0xdeb887;
    readonly cadetblue = 0x5f9ea0;
    readonly chartreuse = 0x7fff00;
    readonly chocolate = 0xd2691e;
    readonly coral = 0xff7f50;
    readonly cornflowerblue = 0x6495ed;
    readonly cornsilk = 0xfff8dc;
    readonly crimson = 0xdc143c;
    readonly cyan = 0x00ffff;
    readonly darkblue = 0x00008b;
    readonly darkcyan = 0x008b8b;
    readonly darkgoldenrod = 0xb8860b;
    readonly darkgray = 0xa9a9a9;
    readonly darkgreen = 0x006400;
    readonly darkgrey = 0xa9a9a9;
    readonly darkkhaki = 0xbdb76b;
    readonly darkmagenta = 0x8b008b;
    readonly darkolivegreen = 0x556b2f;
    readonly darkorange = 0xff8c00;
    readonly darkorchid = 0x9932cc;
    readonly darkred = 0x8b0000;
    readonly darksalmon = 0xe9967a;
    readonly darkseagreen = 0x8fbc8f;
    readonly darkslateblue = 0x483d8b;
    readonly darkslategray = 0x2f4f4f;
    readonly darkslategrey = 0x2f4f4f;
    readonly darkturquoise = 0x00ced1;
    readonly darkviolet = 0x9400d3;
    readonly deeppink = 0xff1493;
    readonly deepskyblue = 0x00bfff;
    readonly dimgray = 0x696969;
    readonly dimgrey = 0x696969;
    readonly dodgerblue = 0x1e90ff;
    readonly firebrick = 0xb22222;
    readonly floralwhite = 0xfffaf0;
    readonly forestgreen = 0x228b22;
    readonly gainsboro = 0xdcdcdc;
    readonly ghostwhite = 0xf8f8ff;
    readonly gold = 0xffd700;
    readonly goldenrod = 0xdaa520;
    readonly greenyellow = 0xadff2f;
    readonly grey = 0x808080;
    readonly honeydew = 0xf0fff0;
    readonly hotpink = 0xff69b4;
    readonly indianred = 0xcd5c5c;
    readonly indigo = 0x4b0082;
    readonly ivory = 0xfffff0;
    readonly khaki = 0xf0e68c;
    readonly lavender = 0xe6e6fa;
    readonly lavenderblush = 0xfff0f5;
    readonly lawngreen = 0x7cfc00;
    readonly lemonchiffon = 0xfffacd;
    readonly lightblue = 0xadd8e6;
    readonly lightcoral = 0xf08080;
    readonly lightcyan = 0xe0ffff;
    readonly lightgoldenrodyellow = 0xfafad2;
    readonly lightgray = 0xd3d3d3;
    readonly lightgreen = 0x90ee90;
    readonly lightgrey = 0xd3d3d3;
    readonly lightpink = 0xffb6c1;
    readonly lightsalmon = 0xffa07a;
    readonly lightseagreen = 0x20b2aa;
    readonly lightskyblue = 0x87cefa;
    readonly lightslategray = 0x778899;
    readonly lightslategrey = 0x778899;
    readonly lightsteelblue = 0xb0c4de;
    readonly lightyellow = 0xffffe0;
    readonly limegreen = 0x32cd32;
    readonly linen = 0xfaf0e6;
    readonly magenta = 0xff00ff;
    readonly mediumaquamarine = 0x66cdaa;
    readonly mediumblue = 0x0000cd;
    readonly mediumorchid = 0xba55d3;
    readonly mediumpurple = 0x9370db;
    readonly mediumseagreen = 0x3cb371;
    readonly mediumslateblue = 0x7b68ee;
    readonly mediumspringgreen = 0x00fa9a;
    readonly mediumturquoise = 0x48d1cc;
    readonly mediumvioletred = 0xc71585;
    readonly midnightblue = 0x191970;
    readonly mintcream = 0xf5fffa;
    readonly mistyrose = 0xffe4e1;
    readonly moccasin = 0xffe4b5;
    readonly navajowhite = 0xffdead;
    readonly oldlace = 0xfdf5e6;
    readonly olivedrab = 0x6b8e23;
    readonly orangered = 0xff4500;
    readonly orchid = 0xda70d6;
    readonly palegoldenrod = 0xeee8aa;
    readonly palegreen = 0x98fb98;
    readonly paleturquoise = 0xafeeee;
    readonly palevioletred = 0xdb7093;
    readonly papayawhip = 0xffefd5;
    readonly peachpuff = 0xffdab9;
    readonly peru = 0xcd853f;
    readonly pink = 0xffc0cb;
    readonly plum = 0xdda0dd;
    readonly powderblue = 0xb0e0e6;
    readonly rosybrown = 0xbc8f8f;
    readonly royalblue = 0x4169e1;
    readonly saddlebrown = 0x8b4513;
    readonly salmon = 0xfa8072;
    readonly sandybrown = 0xf4a460;
    readonly seagreen = 0x2e8b57;
    readonly seashell = 0xfff5ee;
    readonly sienna = 0xa0522d;
    readonly skyblue = 0x87ceeb;
    readonly slateblue = 0x6a5acd;
    readonly slategray = 0x708090;
    readonly slategrey = 0x708090;
    readonly snow = 0xfffafa;
    readonly springgreen = 0x00ff7f;
    readonly steelblue = 0x4682b4;
    readonly tan = 0xd2b48c;
    readonly thistle = 0xd8bfd8;
    readonly tomato = 0xff6347;
    readonly turquoise = 0x40e0d0;
    readonly violet = 0xee82ee;
    readonly wheat = 0xf5deb3;
    readonly whitesmoke = 0xf5f5f5;
    readonly yellowgreen = 0x9acd32;
    readonly rebeccapurple = 0x663399
}



/**
 * The Colors object is used to get string representations of the well-known Web colors as well as
 * to get their numeric values.
 */
export let Colors = new ColorsClass();



/**
 * Type for CSS color represented as an array:
 *   - single-element array represents a color value either as a string or as a number.
 *   - two-element array represents either a color name or a numeric RGB value in the first element
 *     and an alpha separation in the second element.
 *   - three-element aray represents RGB separations as either integer numbers (0 to 255) or floating
 *     numbers (0.0 to 1.0) for percentages.
 *   - four-element aray represents RGBA separations as either integer numbers (0 to 255) or floating
 *     numbers (0.0 to 1.0) for percentages. The alpha separation (the last element) is always a
 *     percentage value.
 */
export type ColorAsArray =
                [keyof ColorsClass | number] |
                [keyof ColorsClass | number, number] |
                [number, number, number] |
                [number, number, number, number];

/**
 * Type for CSS color. Color can be represented using the following types:
 *   - string (e.g. "red" or "#fe5" or "rgba(190, 200, 235, 90%)", etc.)
 *   - number:
 *     - positive integer numbers less than or equal to 0xFFFFFF are treated as RGB separations 0xRRGGBB.
 *     - positive integer numbers greater than 0xFFFFFF are treated as RGBA separations 0xRRGGBBAA.
 *     - negative and floating point numbers are rejected.
 *   - array [[ColorAsArray]]
 */
export type Color_StyleType = "transparent" | "currentcolor" | keyof ColorsClass | number | ColorAsArray | Base_StyleType;



/**
 * Converts color separation value from the numeric representation to the 2-digit hexadecimal string.
 * @param val Number from 0 to 255
 */
export function sepToHex( val: number): string
{
    let s = val.toString(16);
    return s.length === 1 ? "0" + s : s;
}



/**
 * Converts color value from the numeric representation to the CSS color string.
 * @param val Color as a number
 */
export function colorNumberToCssString( val: number): string
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



export function colorSep( c: number | string): string
{
    return c == null ? "0" : typeof c === "string" ? c : Number.isInteger(c) ? c.toString() : this.percent(c);
}



export function rgb( r: number | string, g: number | string, b: number | string, a?: number | string): string
{
    r = this.colorSep(r);
    g = this.colorSep(g);
    b = this.colorSep(b);
    a = a == null ? null : typeof a === "string" ? a : this.percent(a);

    return a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
}



export function hsl( h: number | string, s: number | string, l: number | string, a?: number | string): string
{
    h = typeof h === "string" ? h : Number.isInteger( h) ? h + "deg" : h + "rad";
    s = s == null ? "100%" : typeof s === "string" ? s : this.percent(s);
    l = l == null ? "100%" : typeof l === "string" ? l : this.percent(l);
    a = a == null ? null : typeof a === "string" ? a : this.percent(a);

    return a == null ? `hsl(${h},${s},${l})` : `hsla(${h},${s},${l},${a})`;
}

export function alpha( c: number | keyof typeof Colors, a: number | string): string
{
    let rgbVal = typeof c === "string" ? Colors[c] : c;
    return rgb( (rgbVal & 0xFF0000) >> 16, (rgbVal & 0x00FF00) >> 8, rgbVal & 0x0000FF, a);
}



/**
 * Converts color value from the array representation to the CSS time string.
 */
export function colorAsArrayToCssString( val: ColorAsArray): string
{
    if (val.length === 1)
        return colorToCssString( val[0]);
    else if (val.length === 2)
        return alpha( val[0], val[1]).toString();
    else if (val.length === 3)
        return rgb( val[0], val[1], val[2]).toString();
    else
        return rgb( val[0], val[1], val[2], val[3]).toString();
}

/**
 * Converts time style value to the CSS time string.
 * @param val Time as a style property type
 */
export function colorToCssString( val: Color_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
	    return colorNumberToCssString( val);
    else if (Array.isArray( val))
	    return colorAsArrayToCssString( val);
    else
        return val.toString();
}



