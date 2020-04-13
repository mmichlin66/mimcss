import {INamedColors, IColors, CssColor} from "./ColorTypes"
import {Percent, valueToString, StringProxy} from "./UtilFuncs"
import {IStringProxy, Extended} from "./UtilTypes";



// /**
//  * Converts color separation value from the numeric representation to the 2-digit hexadecimal string.
//  * @param val Number from 0 to 255
//  */
// function sepToHex( val: number): string
// {
//     let s = val.toString(16);
//     return val > 0xf ? s : "0" + s;
// }



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

    // let s = val.toString(16);
    // if (val <= 0xFFFFFF)
    //     s = s.length < 6 ? (s as any).padStart( 6, "0") : s;
    // else
    //     s = s.length < 8 ? (s as any).padStart( 8, "0") : s;

    // return `#${s}`;

    // if we have a named color with the given value, return the color name
    let name = reversedColorMap.get( val);
    if (name)
        return name;
    else
    {
        // otherwise convert numeric value to # notation
        let s = val.toString(16);
        return "#" + (val <= 0xFFFFFF
            ? s.length < 6 ? (s as any).padStart( 6, "0") : s
            : s.length < 8 ? (s as any).padStart( 8, "0") : s);

        // // otherwise convert numeric value to rgb notation
        // return (val <= 0xFFFFFF)
        //     ? `rgb(${(val & 0xFF0000) >> 16},${(val & 0x00FF00) >> 8},${val & 0x0000FF})`
        //     : `rgb(${(val & 0xFF000000) >> 24},${(val & 0x00FF0000) >> 16},${(val & 0x0000FF00) >> 8},${(val & 0x000000FF) / 255})`;
    }
}



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



function sep( c: number | string): string
{
    return c == null ? "0" : typeof c === "string" ? c : Number.isInteger(c) ? c.toString() : Percent.numberToString(c);
}



/**
 * Object whose property names are names of well-known colors and values correspond to the hexadecimal
 * representartion of the RGB separations (without an alpha mask).
 */
class ColorsClass implements IColors
{
    black =                 0x000000;
    silver =                0xc0c0c0;
    gray =                  0x808080;
    white =                 0xffffff;
    maroon =                0x800000;
    red =                   0xff0000;
    purple =                0x800080;
    fuchsia =               0xff00ff;
    green =                 0x008000;
    lime =                  0x00ff00;
    olive =                 0x808000;
    yellow =                0xffff00;
    navy =                  0x000080;
    blue =                  0x0000ff;
    teal =                  0x008080;
    aqua =                  0x00ffff;
    orange =                0xffa500;
    aliceblue =             0xf0f8ff;
    antiquewhite =          0xfaebd7;
    aquamarine =            0x7fffd4;
    azure =                 0xf0ffff;
    beige =                 0xf5f5dc;
    bisque =                0xffe4c4;
    blanchedalmond =        0xffebcd;
    blueviolet =            0x8a2be2;
    brown =                 0xa52a2a;
    burlywood =             0xdeb887;
    cadetblue =             0x5f9ea0;
    chartreuse =            0x7fff00;
    chocolate =             0xd2691e;
    coral =                 0xff7f50;
    cornflowerblue =        0x6495ed;
    cornsilk =              0xfff8dc;
    crimson =               0xdc143c;
    cyan =                  0x00ffff;
    darkblue =              0x00008b;
    darkcyan =              0x008b8b;
    darkgoldenrod =         0xb8860b;
    darkgray =              0xa9a9a9;
    darkgreen =             0x006400;
    darkgrey =              0xa9a9a9;
    darkkhaki =             0xbdb76b;
    darkmagenta =           0x8b008b;
    darkolivegreen =        0x556b2f;
    darkorange =            0xff8c00;
    darkorchid =            0x9932cc;
    darkred =               0x8b0000;
    darksalmon =            0xe9967a;
    darkseagreen =          0x8fbc8f;
    darkslateblue =         0x483d8b;
    darkslategray =         0x2f4f4f;
    darkslategrey =         0x2f4f4f;
    darkturquoise =         0x00ced1;
    darkviolet =            0x9400d3;
    deeppink =              0xff1493;
    deepskyblue =           0x00bfff;
    dimgray =               0x696969;
    dimgrey =               0x696969;
    dodgerblue =            0x1e90ff;
    firebrick =             0xb22222;
    floralwhite =           0xfffaf0;
    forestgreen =           0x228b22;
    gainsboro =             0xdcdcdc;
    ghostwhite =            0xf8f8ff;
    gold =                  0xffd700;
    goldenrod =             0xdaa520;
    greenyellow =           0xadff2f;
    grey =                  0x808080;
    honeydew =              0xf0fff0;
    hotpink =               0xff69b4;
    indianred =             0xcd5c5c;
    indigo =                0x4b0082;
    ivory =                 0xfffff0;
    khaki =                 0xf0e68c;
    lavender =              0xe6e6fa;
    lavenderblush =         0xfff0f5;
    lawngreen =             0x7cfc00;
    lemonchiffon =          0xfffacd;
    lightblue =             0xadd8e6;
    lightcoral =            0xf08080;
    lightcyan =             0xe0ffff;
    lightgoldenrodyellow =  0xfafad2;
    lightgray =             0xd3d3d3;
    lightgreen =            0x90ee90;
    lightgrey =             0xd3d3d3;
    lightpink =             0xffb6c1;
    lightsalmon =           0xffa07a;
    lightseagreen =         0x20b2aa;
    lightskyblue =          0x87cefa;
    lightslategray =        0x778899;
    lightslategrey =        0x778899;
    lightsteelblue =        0xb0c4de;
    lightyellow =           0xffffe0;
    limegreen =             0x32cd32;
    linen =                 0xfaf0e6;
    magenta =               0xff00ff;
    mediumaquamarine =      0x66cdaa;
    mediumblue =            0x0000cd;
    mediumorchid =          0xba55d3;
    mediumpurple =          0x9370db;
    mediumseagreen =        0x3cb371;
    mediumslateblue =       0x7b68ee;
    mediumspringgreen =     0x00fa9a;
    mediumturquoise =       0x48d1cc;
    mediumvioletred =       0xc71585;
    midnightblue =          0x191970;
    mintcream =             0xf5fffa;
    mistyrose =             0xffe4e1;
    moccasin =              0xffe4b5;
    navajowhite =           0xffdead;
    oldlace =               0xfdf5e6;
    olivedrab =             0x6b8e23;
    orangered =             0xff4500;
    orchid =                0xda70d6;
    palegoldenrod =         0xeee8aa;
    palegreen =             0x98fb98;
    paleturquoise =         0xafeeee;
    palevioletred =         0xdb7093;
    papayawhip =            0xffefd5;
    peachpuff =             0xffdab9;
    peru =                  0xcd853f;
    pink =                  0xffc0cb;
    plum =                  0xdda0dd;
    powderblue =            0xb0e0e6;
    rosybrown =             0xbc8f8f;
    royalblue =             0x4169e1;
    saddlebrown =           0x8b4513;
    salmon =                0xfa8072;
    sandybrown =            0xf4a460;
    seagreen =              0x2e8b57;
    seashell =              0xfff5ee;
    sienna =                0xa0522d;
    skyblue =               0x87ceeb;
    slateblue =             0x6a5acd;
    slategray =             0x708090;
    slategrey =             0x708090;
    snow =                  0xfffafa;
    springgreen =           0x00ff7f;
    steelblue =             0x4682b4;
    tan =                   0xd2b48c;
    thistle =               0xd8bfd8;
    tomato =                0xff6347;
    turquoise =             0x40e0d0;
    violet =                0xee82ee;
    wheat =                 0xf5deb3;
    whitesmoke =            0xf5f5f5;
    yellowgreen =           0x9acd32;
    rebeccapurple =         0x663399;



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
    public rgb( r: number | string, g: number | string, b: number | string, a?: number | string): IStringProxy
    {
        r = sep(r);
        g = sep(g);
        b = sep(b);
        a = a == null ? null : typeof a === "string" ? a : Percent.numberToString(a);
    
        return new StringProxy( a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`);
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
    public hsl( h: number | string, s: number | string, l: number | string, a?: number | string): IStringProxy
    {
        h = typeof h === "string" ? h : Number.isInteger( h) ? h + "deg" : h + "rad";
        s = s == null ? "100%" : typeof s === "string" ? s : Percent.numberToString(s);
        l = l == null ? "100%" : typeof l === "string" ? l : Percent.numberToString(l);
        a = a == null ? null : typeof a === "string" ? a : Percent.numberToString(a);
    
        return new StringProxy( a == null ? `hsl(${h},${s},${l})` : `hsla(${h},${s},${l},${a})`);
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
    public alpha( c: number | keyof INamedColors, a: number | string): IStringProxy
    {
        let rgbVal = typeof c === "string" ? this[c] : c;
        return this.rgb( (rgbVal & 0xFF0000) >> 16, (rgbVal & 0x00FF00) >> 8, rgbVal & 0x0000FF, a);
    }
}



/**
 * The Colors object is used to get representations of the well-known Web colors as well as
 * to get their numeric values.
 */
export let Colors: IColors = new ColorsClass();


/**
 * Map of predefined color names by their numeric values
 */
let reversedColorMap = new Map<number,string>();

Object.keys( Colors).forEach( name => {
    if (typeof Colors[name] === "number")
        reversedColorMap.set( Colors[name], name);
});



