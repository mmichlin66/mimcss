/**
 * This file contains types for working with CSS colors.
 */

import {Base_StyleType} from "./UtilTypes"



/**
 * Object whose property names are names of well-known colors and values correspond to the hexadecimal
 * representartion of the RGB separations (without an alpha mask).
 */
export class Colors 
{
    static readonly black = 0x000000;
    static readonly silver = 0xc0c0c0;
    static readonly gray = 0x808080;
    static readonly white = 0xffffff;
    static readonly maroon = 0x800000;
    static readonly red = 0xff0000;
    static readonly purple = 0x800080;
    static readonly fuchsia = 0xff00ff;
    static readonly green = 0x008000;
    static readonly lime = 0x00ff00;
    static readonly olive = 0x808000;
    static readonly yellow = 0xffff00;
    static readonly navy = 0x000080;
    static readonly blue = 0x0000ff;
    static readonly teal = 0x008080;
    static readonly aqua = 0x00ffff;
    static readonly orange = 0xffa500;
    static readonly aliceblue = 0xf0f8ff;
    static readonly antiquewhite = 0xfaebd7;
    static readonly aquamarine = 0x7fffd4;
    static readonly azure = 0xf0ffff;
    static readonly beige = 0xf5f5dc;
    static readonly bisque = 0xffe4c4;
    static readonly blanchedalmond = 0xffebcd;
    static readonly blueviolet = 0x8a2be2;
    static readonly brown = 0xa52a2a;
    static readonly burlywood = 0xdeb887;
    static readonly cadetblue = 0x5f9ea0;
    static readonly chartreuse = 0x7fff00;
    static readonly chocolate = 0xd2691e;
    static readonly coral = 0xff7f50;
    static readonly cornflowerblue = 0x6495ed;
    static readonly cornsilk = 0xfff8dc;
    static readonly crimson = 0xdc143c;
    static readonly cyan = 0x00ffff;
    static readonly darkblue = 0x00008b;
    static readonly darkcyan = 0x008b8b;
    static readonly darkgoldenrod = 0xb8860b;
    static readonly darkgray = 0xa9a9a9;
    static readonly darkgreen = 0x006400;
    static readonly darkgrey = 0xa9a9a9;
    static readonly darkkhaki = 0xbdb76b;
    static readonly darkmagenta = 0x8b008b;
    static readonly darkolivegreen = 0x556b2f;
    static readonly darkorange = 0xff8c00;
    static readonly darkorchid = 0x9932cc;
    static readonly darkred = 0x8b0000;
    static readonly darksalmon = 0xe9967a;
    static readonly darkseagreen = 0x8fbc8f;
    static readonly darkslateblue = 0x483d8b;
    static readonly darkslategray = 0x2f4f4f;
    static readonly darkslategrey = 0x2f4f4f;
    static readonly darkturquoise = 0x00ced1;
    static readonly darkviolet = 0x9400d3;
    static readonly deeppink = 0xff1493;
    static readonly deepskyblue = 0x00bfff;
    static readonly dimgray = 0x696969;
    static readonly dimgrey = 0x696969;
    static readonly dodgerblue = 0x1e90ff;
    static readonly firebrick = 0xb22222;
    static readonly floralwhite = 0xfffaf0;
    static readonly forestgreen = 0x228b22;
    static readonly gainsboro = 0xdcdcdc;
    static readonly ghostwhite = 0xf8f8ff;
    static readonly gold = 0xffd700;
    static readonly goldenrod = 0xdaa520;
    static readonly greenyellow = 0xadff2f;
    static readonly grey = 0x808080;
    static readonly honeydew = 0xf0fff0;
    static readonly hotpink = 0xff69b4;
    static readonly indianred = 0xcd5c5c;
    static readonly indigo = 0x4b0082;
    static readonly ivory = 0xfffff0;
    static readonly khaki = 0xf0e68c;
    static readonly lavender = 0xe6e6fa;
    static readonly lavenderblush = 0xfff0f5;
    static readonly lawngreen = 0x7cfc00;
    static readonly lemonchiffon = 0xfffacd;
    static readonly lightblue = 0xadd8e6;
    static readonly lightcoral = 0xf08080;
    static readonly lightcyan = 0xe0ffff;
    static readonly lightgoldenrodyellow = 0xfafad2;
    static readonly lightgray = 0xd3d3d3;
    static readonly lightgreen = 0x90ee90;
    static readonly lightgrey = 0xd3d3d3;
    static readonly lightpink = 0xffb6c1;
    static readonly lightsalmon = 0xffa07a;
    static readonly lightseagreen = 0x20b2aa;
    static readonly lightskyblue = 0x87cefa;
    static readonly lightslategray = 0x778899;
    static readonly lightslategrey = 0x778899;
    static readonly lightsteelblue = 0xb0c4de;
    static readonly lightyellow = 0xffffe0;
    static readonly limegreen = 0x32cd32;
    static readonly linen = 0xfaf0e6;
    static readonly magenta = 0xff00ff;
    static readonly mediumaquamarine = 0x66cdaa;
    static readonly mediumblue = 0x0000cd;
    static readonly mediumorchid = 0xba55d3;
    static readonly mediumpurple = 0x9370db;
    static readonly mediumseagreen = 0x3cb371;
    static readonly mediumslateblue = 0x7b68ee;
    static readonly mediumspringgreen = 0x00fa9a;
    static readonly mediumturquoise = 0x48d1cc;
    static readonly mediumvioletred = 0xc71585;
    static readonly midnightblue = 0x191970;
    static readonly mintcream = 0xf5fffa;
    static readonly mistyrose = 0xffe4e1;
    static readonly moccasin = 0xffe4b5;
    static readonly navajowhite = 0xffdead;
    static readonly oldlace = 0xfdf5e6;
    static readonly olivedrab = 0x6b8e23;
    static readonly orangered = 0xff4500;
    static readonly orchid = 0xda70d6;
    static readonly palegoldenrod = 0xeee8aa;
    static readonly palegreen = 0x98fb98;
    static readonly paleturquoise = 0xafeeee;
    static readonly palevioletred = 0xdb7093;
    static readonly papayawhip = 0xffefd5;
    static readonly peachpuff = 0xffdab9;
    static readonly peru = 0xcd853f;
    static readonly pink = 0xffc0cb;
    static readonly plum = 0xdda0dd;
    static readonly powderblue = 0xb0e0e6;
    static readonly rosybrown = 0xbc8f8f;
    static readonly royalblue = 0x4169e1;
    static readonly saddlebrown = 0x8b4513;
    static readonly salmon = 0xfa8072;
    static readonly sandybrown = 0xf4a460;
    static readonly seagreen = 0x2e8b57;
    static readonly seashell = 0xfff5ee;
    static readonly sienna = 0xa0522d;
    static readonly skyblue = 0x87ceeb;
    static readonly slateblue = 0x6a5acd;
    static readonly slategray = 0x708090;
    static readonly slategrey = 0x708090;
    static readonly snow = 0xfffafa;
    static readonly springgreen = 0x00ff7f;
    static readonly steelblue = 0x4682b4;
    static readonly tan = 0xd2b48c;
    static readonly thistle = 0xd8bfd8;
    static readonly tomato = 0xff6347;
    static readonly turquoise = 0x40e0d0;
    static readonly violet = 0xee82ee;
    static readonly wheat = 0xf5deb3;
    static readonly whitesmoke = 0xf5f5f5;
    static readonly yellowgreen = 0x9acd32;
    static readonly rebeccapurple = 0x663399
}



// /**
//  * The Colors object is used to get string representations of the well-known Web colors as well as
//  * to get their numeric values.
//  */
// export let Colors = new ColorsClass();



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
                [keyof Colors | number] |
                [keyof Colors | number, number] |
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
export type Color_StyleType = "transparent" | "currentcolor" | keyof Colors | number | ColorAsArray | Base_StyleType;



