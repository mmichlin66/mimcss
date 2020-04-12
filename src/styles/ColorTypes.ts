/**
 * This module contains types for working with CSS colors.
 */

import {IStringProxy, OneOrBox} from "./UtilTypes"



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
 * The IColors interface provides convenience functions working with colors.
 */
export interface IColors extends INamedColors
{
    /**
     * Converts the color specified as red, green, blue separation values and an optional alpha
     * mask to a CSS color representation. This method should be used when defining CSS color
     * values in styleset properties. Each color separation can be represented as a number or a
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
    rgb( r: number | string, g: number | string, b: number | string, a?: number | string): IStringProxy;

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
    hsl( h: number | string, s: number | string, l: number | string, a?: number | string): IStringProxy;

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
    alpha( c: number | keyof INamedColors, a: number | string): IStringProxy;
}



/**
 * Type for CSS color. Color can be represented using the following types:
 *   - string (e.g. "red" or "#fe5" or "rgba(190, 200, 235, 90%)", etc.)
 *   - number:
 *     - positive integer numbers less than or equal to 0xFFFFFF are treated as RGB separations 0xRRGGBB.
 *     - positive integer numbers greater than 0xFFFFFF are treated as RGBA separations 0xRRGGBBAA.
 *     - negative and floating point numbers are rejected.
 */
export type CssColor = "transparent" | "currentcolor" | keyof INamedColors | number;



