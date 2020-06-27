﻿/**
 * This module contains types for working with CSS colors.
 */

import { IGenericProxy } from "./UtilTypes";



/**
 * The INamedColors interface lists the names of standard Web colors. It is needed to allow developers
 * to add new named colors through module augmentation technique.
 */
export interface INamedColors
{
    readonly black:                  number;
    readonly silver:                 number;
    readonly gray:                   number;
    readonly white:                  number;
    readonly maroon:                 number;
    readonly red:                    number;
    readonly purple:                 number;
    readonly fuchsia:                number;
    readonly green:                  number;
    readonly lime:                   number;
    readonly olive:                  number;
    readonly yellow:                 number;
    readonly navy:                   number;
    readonly blue:                   number;
    readonly teal:                   number;
    readonly aqua:                   number;
    readonly orange:                 number;
    readonly aliceblue:              number;
    readonly antiquewhite:           number;
    readonly aquamarine:             number;
    readonly azure:                  number;
    readonly beige:                  number;
    readonly bisque:                 number;
    readonly blanchedalmond:         number;
    readonly blueviolet:             number;
    readonly brown:                  number;
    readonly burlywood:              number;
    readonly cadetblue:              number;
    readonly chartreuse:             number;
    readonly chocolate:              number;
    readonly coral:                  number;
    readonly cornflowerblue:         number;
    readonly cornsilk:               number;
    readonly crimson:                number;
    readonly cyan:                   number;
    readonly darkblue:               number;
    readonly darkcyan:               number;
    readonly darkgoldenrod:          number;
    readonly darkgray:               number;
    readonly darkgreen:              number;
    readonly darkgrey:               number;
    readonly darkkhaki:              number;
    readonly darkmagenta:            number;
    readonly darkolivegreen:         number;
    readonly darkorange:             number;
    readonly darkorchid:             number;
    readonly darkred:                number;
    readonly darksalmon:             number;
    readonly darkseagreen:           number;
    readonly darkslateblue:          number;
    readonly darkslategray:          number;
    readonly darkslategrey:          number;
    readonly darkturquoise:          number;
    readonly darkviolet:             number;
    readonly deeppink:               number;
    readonly deepskyblue:            number;
    readonly dimgray:                number;
    readonly dimgrey:                number;
    readonly dodgerblue:             number;
    readonly firebrick:              number;
    readonly floralwhite:            number;
    readonly forestgreen:            number;
    readonly gainsboro:              number;
    readonly ghostwhite:             number;
    readonly gold:                   number;
    readonly goldenrod:              number;
    readonly greenyellow:            number;
    readonly grey:                   number;
    readonly honeydew:               number;
    readonly hotpink:                number;
    readonly indianred:              number;
    readonly indigo:                 number;
    readonly ivory:                  number;
    readonly khaki:                  number;
    readonly lavender:               number;
    readonly lavenderblush:          number;
    readonly lawngreen:              number;
    readonly lemonchiffon:           number;
    readonly lightblue:              number;
    readonly lightcoral:             number;
    readonly lightcyan:              number;
    readonly lightgoldenrodyellow:   number;
    readonly lightgray:              number;
    readonly lightgreen:             number;
    readonly lightgrey:              number;
    readonly lightpink:              number;
    readonly lightsalmon:            number;
    readonly lightseagreen:          number;
    readonly lightskyblue:           number;
    readonly lightslategray:         number;
    readonly lightslategrey:         number;
    readonly lightsteelblue:         number;
    readonly lightyellow:            number;
    readonly limegreen:              number;
    readonly linen:                  number;
    readonly magenta:                number;
    readonly mediumaquamarine:       number;
    readonly mediumblue:             number;
    readonly mediumorchid:           number;
    readonly mediumpurple:           number;
    readonly mediumseagreen:         number;
    readonly mediumslateblue:        number;
    readonly mediumspringgreen:      number;
    readonly mediumturquoise:        number;
    readonly mediumvioletred:        number;
    readonly midnightblue:           number;
    readonly mintcream:              number;
    readonly mistyrose:              number;
    readonly moccasin:               number;
    readonly navajowhite:            number;
    readonly oldlace:                number;
    readonly olivedrab:              number;
    readonly orangered:              number;
    readonly orchid:                 number;
    readonly palegoldenrod:          number;
    readonly palegreen:              number;
    readonly paleturquoise:          number;
    readonly palevioletred:          number;
    readonly papayawhip:             number;
    readonly peachpuff:              number;
    readonly peru:                   number;
    readonly pink:                   number;
    readonly plum:                   number;
    readonly powderblue:             number;
    readonly rosybrown:              number;
    readonly royalblue:              number;
    readonly saddlebrown:            number;
    readonly salmon:                 number;
    readonly sandybrown:             number;
    readonly seagreen:               number;
    readonly seashell:               number;
    readonly sienna:                 number;
    readonly skyblue:                number;
    readonly slateblue:              number;
    readonly slategray:              number;
    readonly slategrey:              number;
    readonly snow:                   number;
    readonly springgreen:            number;
    readonly steelblue:              number;
    readonly tan:                    number;
    readonly thistle:                number;
    readonly tomato:                 number;
    readonly turquoise:              number;
    readonly violet:                 number;
    readonly wheat:                  number;
    readonly whitesmoke:             number;
    readonly yellowgreen:            number;
    readonly rebeccapurple:          number;
}



/**
 * The IColorProxy interface represents an invocation of one of CSS functions that are used for
 * specifying colors. This interface is returned from functions like: rgb(), alpha(), etc.
 */
export interface IColorProxy extends IGenericProxy<"color"> {};



/**
 * The SystemColors type defines keywords for system colors that are used in forced-color mode
 * (but can be also used in the regular mode).
 */
export type SystemColors = "ActiveText" | "ButtonFace" | "ButtonText" | "Canvas" | "CanvasText" |
    "Field" | "FieldText" | "GrayText" | "Highlight" | "HighlightText" | "LinkText" | "VisitedText";



/**
 * Type for CSS color. Color can be represented using the following types:
 * - keywords: any string that is a name of a property in the INamedColors interface.
 * - number:
 *   - negative numbers are treated as inverted colors.
 *   - integer part of the number must be less than or equal to 0xFFFFFF - everything else is
 *     ignored.
 *   - floating point part of the number is treated as percents of alpha channel. If there is no
 *     floating part, alpha is 1.
 * - functions: rgb(), hsl(), alpha() as well as any function that returns the IColorProxy type.
 */
export type CssColor = "transparent" | "currentcolor" | keyof INamedColors | number | IColorProxy | SystemColors;



/**
 * Object whose property names are names of well-known colors and values correspond to the hexadecimal
 * representartion of the RGB separations (without an alpha mask).
 */
export let Colors: INamedColors =
{
    black:                  0x000000,
    silver:                 0xc0c0c0,
    gray:                   0x808080,
    white:                  0xffffff,
    maroon:                 0x800000,
    red:                    0xff0000,
    purple:                 0x800080,
    fuchsia:                0xff00ff,
    green:                  0x008000,
    lime:                   0x00ff00,
    olive:                  0x808000,
    yellow:                 0xffff00,
    navy:                   0x000080,
    blue:                   0x0000ff,
    teal:                   0x008080,
    aqua:                   0x00ffff,
    orange:                 0xffa500,
    aliceblue:              0xf0f8ff,
    antiquewhite:           0xfaebd7,
    aquamarine:             0x7fffd4,
    azure:                  0xf0ffff,
    beige:                  0xf5f5dc,
    bisque:                 0xffe4c4,
    blanchedalmond:         0xffebcd,
    blueviolet:             0x8a2be2,
    brown:                  0xa52a2a,
    burlywood:              0xdeb887,
    cadetblue:              0x5f9ea0,
    chartreuse:             0x7fff00,
    chocolate:              0xd2691e,
    coral:                  0xff7f50,
    cornflowerblue:         0x6495ed,
    cornsilk:               0xfff8dc,
    crimson:                0xdc143c,
    cyan:                   0x00ffff,
    darkblue:               0x00008b,
    darkcyan:               0x008b8b,
    darkgoldenrod:          0xb8860b,
    darkgray:               0xa9a9a9,
    darkgreen:              0x006400,
    darkgrey:               0xa9a9a9,
    darkkhaki:              0xbdb76b,
    darkmagenta:            0x8b008b,
    darkolivegreen:         0x556b2f,
    darkorange:             0xff8c00,
    darkorchid:             0x9932cc,
    darkred:                0x8b0000,
    darksalmon:             0xe9967a,
    darkseagreen:           0x8fbc8f,
    darkslateblue:          0x483d8b,
    darkslategray:          0x2f4f4f,
    darkslategrey:          0x2f4f4f,
    darkturquoise:          0x00ced1,
    darkviolet:             0x9400d3,
    deeppink:               0xff1493,
    deepskyblue:            0x00bfff,
    dimgray:                0x696969,
    dimgrey:                0x696969,
    dodgerblue:             0x1e90ff,
    firebrick:              0xb22222,
    floralwhite:            0xfffaf0,
    forestgreen:            0x228b22,
    gainsboro:              0xdcdcdc,
    ghostwhite:             0xf8f8ff,
    gold:                   0xffd700,
    goldenrod:              0xdaa520,
    greenyellow:            0xadff2f,
    grey:                   0x808080,
    honeydew:               0xf0fff0,
    hotpink:                0xff69b4,
    indianred:              0xcd5c5c,
    indigo:                 0x4b0082,
    ivory:                  0xfffff0,
    khaki:                  0xf0e68c,
    lavender:               0xe6e6fa,
    lavenderblush:          0xfff0f5,
    lawngreen:              0x7cfc00,
    lemonchiffon:           0xfffacd,
    lightblue:              0xadd8e6,
    lightcoral:             0xf08080,
    lightcyan:              0xe0ffff,
    lightgoldenrodyellow:   0xfafad2,
    lightgray:              0xd3d3d3,
    lightgreen:             0x90ee90,
    lightgrey:              0xd3d3d3,
    lightpink:              0xffb6c1,
    lightsalmon:            0xffa07a,
    lightseagreen:          0x20b2aa,
    lightskyblue:           0x87cefa,
    lightslategray:         0x778899,
    lightslategrey:         0x778899,
    lightsteelblue:         0xb0c4de,
    lightyellow:            0xffffe0,
    limegreen:              0x32cd32,
    linen:                  0xfaf0e6,
    magenta:                0xff00ff,
    mediumaquamarine:       0x66cdaa,
    mediumblue:             0x0000cd,
    mediumorchid:           0xba55d3,
    mediumpurple:           0x9370db,
    mediumseagreen:         0x3cb371,
    mediumslateblue:        0x7b68ee,
    mediumspringgreen:      0x00fa9a,
    mediumturquoise:        0x48d1cc,
    mediumvioletred:        0xc71585,
    midnightblue:           0x191970,
    mintcream:              0xf5fffa,
    mistyrose:              0xffe4e1,
    moccasin:               0xffe4b5,
    navajowhite:            0xffdead,
    oldlace:                0xfdf5e6,
    olivedrab:              0x6b8e23,
    orangered:              0xff4500,
    orchid:                 0xda70d6,
    palegoldenrod:          0xeee8aa,
    palegreen:              0x98fb98,
    paleturquoise:          0xafeeee,
    palevioletred:          0xdb7093,
    papayawhip:             0xffefd5,
    peachpuff:              0xffdab9,
    peru:                   0xcd853f,
    pink:                   0xffc0cb,
    plum:                   0xdda0dd,
    powderblue:             0xb0e0e6,
    rosybrown:              0xbc8f8f,
    royalblue:              0x4169e1,
    saddlebrown:            0x8b4513,
    salmon:                 0xfa8072,
    sandybrown:             0xf4a460,
    seagreen:               0x2e8b57,
    seashell:               0xfff5ee,
    sienna:                 0xa0522d,
    skyblue:                0x87ceeb,
    slateblue:              0x6a5acd,
    slategray:              0x708090,
    slategrey:              0x708090,
    snow:                   0xfffafa,
    springgreen:            0x00ff7f,
    steelblue:              0x4682b4,
    tan:                    0xd2b48c,
    thistle:                0xd8bfd8,
    tomato:                 0xff6347,
    turquoise:              0x40e0d0,
    violet:                 0xee82ee,
    wheat:                  0xf5deb3,
    whitesmoke:             0xf5f5f5,
    yellowgreen:            0x9acd32,
    rebeccapurple:          0x663399,
};



