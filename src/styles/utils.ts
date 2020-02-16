/**
 * This file contains definitions of CSS properties adn helper types
 */

/**
 * Style values that can be used for (almost) any property
 */
export type Base_StyleType = "inherit" | "initial" | "unset";



/**
 * Converts camelCase to dash-case.
 * @param s
 */
export function camelToDash( s: string)
{
  return s.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}



/**
 * Generic function that converts an array of the given typeto a single string using the given separator.
 * Elements of the array are converted to strings using the given function.
 * @param val Array of time values
 */
export function arrayToCssString<T>( val: T[], func: (v: T) => string, separator: string = ","): string
{
    let s = "";
    for( let v of val)
    {
        let item = func( v);
        if (item != null)
        {
            if (s.length > 0)
                s += separator;

            s += item;
        }
    }

    return s;
}



/**
 * Converts array of string values to a single string using the given separator.
 * @param val Array of string values
 */
export function stringArrayToCssString( val: string[], separator: string = ","): string
{
    let s = "";
    for( let v of val)
    {
        if (v != null)
        {
            if (s.length > 0)
                s += separator;

            s += v;
        }
    }

    return s;
}



// /**
//  * Converts a value that can be either a string or an array of strings to a single string using
//  * the given separator.
//  * @param val String value or array of string values
//  */
// export function stringOrStringArrayToCssString( val: string[] | string, separator: string = ","): string
// {
//     if (typeof val === "string")
//         return val;
//     else
//         return stringArrayToCssString( val, separator);
// }



/** Type for single number style property */
export type SingleNumber_StyleType = number | string | Base_StyleType;

/** Type for multi-part number style property */
export type MultiNumber_StyleType = SingleNumber_StyleType | SingleNumber_StyleType[] | string;

/**
 * Converts single number style value to the CSS string.
 * @param val Single number or string value
 */
export function singleNumberToCssString( val: SingleNumber_StyleType): string
{
    if (typeof val === "string")
        return val;
    else
        return val.toString();
}

/**
 * Converts multi-part number style value to the CSS string.
 * @param val Animation delay value
 */
export function multiNumberToCssString( val: MultiNumber_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else
        return arrayToCssString( val, singleNumberToCssString);
}



/**
 * Type for CSS length or percentage. Length can be represented using the following types:
 *   - string (e.g. 20px or 75%)
 *   - number: zero is treated as not having any suffix; integer numbers are treated as pixels;
 *     floating numbers are treated as percents.
 */
export type SingleLength_StyleType = "auto" | number | string | Base_StyleType;

/** Type for multi-part length or percentage style property */
export type MultiLength_StyleType = SingleLength_StyleType | SingleLength_StyleType[] | string;

/**
 * Converts length value from the numeric representation to the CSS string. Integer
 * values are treated as pixels while floating numbers are treated as percents from 0.0 to 1.0.
 * @param val Length as a number
 */
export function lengthNumberToCssString( val: number): string
{
    return val === 0 ? val.toString() : Number.isInteger( val) ?  val + "px" : val * 100 + "%";
}

/**
 * Converts length style value to the CSS time string.
 * @param val Length as a style property type
 */
export function singleLengthToCssString( val: SingleLength_StyleType): string
{
    if (typeof val === "string")
        return val;
    else
	    return lengthNumberToCssString( val);
}

/**
 * Converts multi-part length or percentage style property to the CSS string.
 * @param val Array of length style values
 */
export function multiLengthToCssString( val: MultiLength_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return arrayToCssString( val, singleLengthToCssString);
    else
        return singleLengthToCssString( val);
}



/**
 * Type for CSS size, which can be expressed as one or two values each of each is of the
 * Length_StyleType type. Two values are given as an object with 'w' (width) and 'h' (height)
 * properties.
 */
export type SingleSize_StyleType = SingleLength_StyleType | { w: SingleLength_StyleType; h: SingleLength_StyleType };

/** Type for multi-part size style property */
export type MultiSize_StyleType = SingleSize_StyleType | SingleSize_StyleType[] | string;

/**
 * Converts size style value to the CSS string.
 * @param val Size as a style property type
 */
export function singleSizeToCssString( val: SingleSize_StyleType): string
{
    if (typeof val === "object")
        return objectToCssString( val, false, ["w", singleLengthToCssString], ["h", singleLengthToCssString]);
    // else if (Array.isArray( val))
    //     return lengthToCssString( val[0]) + " " + lengthToCssString( val[1]);
    else
	    return singleLengthToCssString( val);
}

/**
 * Converts multi-part size style property to the CSS string.
 * @param val Array of length style values
 */
export function multiSizeToCssString( val: MultiSize_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return arrayToCssString( val, singleSizeToCssString);
    else
        return singleSizeToCssString( val);
}



/**
 * Type for CSS angle. Length can be represented using the following types:
 *   - string (e.g. 20deg or 1.4rad)
 *   - number: zero is treated as not having any suffix; integer numbers are treated as degrees;
 *     floating numbers are treated as radians.
 */
export type SingleAngle_StyleType = number | string | Base_StyleType;

/**
 * Converts angle value from the numeric representation to the CSS string. Integer
 * values are treated as degrees while floating numbers are treated as radians.
 * @param val Angle as a number
 */
export function angleNumberToCssString( val: number): string
{
    return val === 0 ? val.toString() : Number.isInteger( val) ?  val + "deg" : val + "rad";
}

/**
 * Converts length style value to the CSS time string.
 * @param val Length as a style property type
 */
export function singleAngleToCssString( val: SingleAngle_StyleType): string
{
    if (typeof val === "string")
        return val;
    else
	    return angleNumberToCssString( val);
}



/**
 * Type for CSS position, which can be expressed as one or two or 3 or 4 values.
 */
export type SinglePosition_StyleType = "center" | "left" | "right" | "top" | "bottom" | SingleLength_StyleType |
                { x: "center" | "left" | "right" | SingleLength_StyleType; y: "center" | "top" | "bottom" | SingleLength_StyleType } |
                { xedge: string; x?: SingleLength_StyleType; yedge: string; y?: SingleLength_StyleType } |
                Base_StyleType;

/** Type for multi-part position style property */
export type MultiPosition_StyleType = SinglePosition_StyleType | SinglePosition_StyleType[] | string;

/**
 * Converts single position style value to the CSS time string.
 * @param val Size as a style property type
 */
export function  singlePositionToCssString( val: SinglePosition_StyleType): string
{
    if (typeof val === "object")
    {
        if ("xedge" in val)
            return objectToCssString( val, false, "xedge", ["x", singleLengthToCssString], "yedge", ["y", singleLengthToCssString]);
        else
            return objectToCssString( val, false, ["x", singleLengthToCssString], ["y", singleLengthToCssString]);
    }
    else
	    return singleLengthToCssString( val);
}

/**
 * Converts multi-part position style values to the CSS string.
 * @param val Array of length style values
 */
export function multiPositionToCssString( val: MultiPosition_StyleType): string
{
    if (Array.isArray(val))
        return arrayToCssString( val,  singlePositionToCssString);
    else
        return  singlePositionToCssString( val);
}



/**
 * Type for CSS time. Time can be represented using the following types:
 *   - string (e.g. 2s or 250ms)
 *   - number: integer numbers are treated as milliseconds while floating numbers are treated
 *     as seconds.
 */
export type SingleTime_StyleType = string | number | Base_StyleType;

/** Type for multi-part time style property */
export type MultiTime_StyleType = SingleTime_StyleType | SingleTime_StyleType[] | string;

/**
 * Converts time interval value from the numeric representation to the CSS time string. Integer
 * values are treated as milliseconds while floating numbers are treated as seconds.
 * @param val Time as a number
 */
export function timeNumberToCssString( val: number): string
{
    return val + (Number.isInteger( val) ? "ms" : "s");
}

/**
 * Converts time style value to the CSS time string.
 * @param val Time as a style property type
 */
export function singleTimeToCssString( val: SingleTime_StyleType): string
{
    if (typeof val === "string")
        return val;
    else
	    return timeNumberToCssString( val);
}

/**
 * Converts animation delay style value to the CSS time string.
 * @param val Animation delay value
 */
export function multiTimeToCssString( val: MultiTime_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return timeNumberToCssString( val);
    else
        return arrayToCssString( val, singleTimeToCssString);
}



/**
 * Enumeration of well-known colors. The values of the enumeration items correspond to the hexadecimal
 * representartion of the RGB separations (without an alpha mask). This enumeration is not marked const
 * because we want to retain the ability to find RGB values by their names.
 */
export enum Colors
{
    black = 0x000000,
    silver = 0xc0c0c0,
    gray = 0x808080,
    white = 0xffffff,
    maroon = 0x800000,
    red = 0xff0000,
    purple = 0x800080,
    fuchsia = 0xff00ff,
    green = 0x008000,
    lime = 0x00ff00,
    olive = 0x808000,
    yellow = 0xffff00,
    navy = 0x000080,
    blue = 0x0000ff,
    teal = 0x008080,
    aqua = 0x00ffff,
    orange = 0xffa500,
    aliceblue = 0xf0f8ff,
    antiquewhite = 0xfaebd7,
    aquamarine = 0x7fffd4,
    azure = 0xf0ffff,
    beige = 0xf5f5dc,
    bisque = 0xffe4c4,
    blanchedalmond = 0xffebcd,
    blueviolet = 0x8a2be2,
    brown = 0xa52a2a,
    burlywood = 0xdeb887,
    cadetblue = 0x5f9ea0,
    chartreuse = 0x7fff00,
    chocolate = 0xd2691e,
    coral = 0xff7f50,
    cornflowerblue = 0x6495ed,
    cornsilk = 0xfff8dc,
    crimson = 0xdc143c,
    cyan = 0x00ffff,
    darkblue = 0x00008b,
    darkcyan = 0x008b8b,
    darkgoldenrod = 0xb8860b,
    darkgray = 0xa9a9a9,
    darkgreen = 0x006400,
    darkgrey = 0xa9a9a9,
    darkkhaki = 0xbdb76b,
    darkmagenta = 0x8b008b,
    darkolivegreen = 0x556b2f,
    darkorange = 0xff8c00,
    darkorchid = 0x9932cc,
    darkred = 0x8b0000,
    darksalmon = 0xe9967a,
    darkseagreen = 0x8fbc8f,
    darkslateblue = 0x483d8b,
    darkslategray = 0x2f4f4f,
    darkslategrey = 0x2f4f4f,
    darkturquoise = 0x00ced1,
    darkviolet = 0x9400d3,
    deeppink = 0xff1493,
    deepskyblue = 0x00bfff,
    dimgray = 0x696969,
    dimgrey = 0x696969,
    dodgerblue = 0x1e90ff,
    firebrick = 0xb22222,
    floralwhite = 0xfffaf0,
    forestgreen = 0x228b22,
    gainsboro = 0xdcdcdc,
    ghostwhite = 0xf8f8ff,
    gold = 0xffd700,
    goldenrod = 0xdaa520,
    greenyellow = 0xadff2f,
    grey = 0x808080,
    honeydew = 0xf0fff0,
    hotpink = 0xff69b4,
    indianred = 0xcd5c5c,
    indigo = 0x4b0082,
    ivory = 0xfffff0,
    khaki = 0xf0e68c,
    lavender = 0xe6e6fa,
    lavenderblush = 0xfff0f5,
    lawngreen = 0x7cfc00,
    lemonchiffon = 0xfffacd,
    lightblue = 0xadd8e6,
    lightcoral = 0xf08080,
    lightcyan = 0xe0ffff,
    lightgoldenrodyellow = 0xfafad2,
    lightgray = 0xd3d3d3,
    lightgreen = 0x90ee90,
    lightgrey = 0xd3d3d3,
    lightpink = 0xffb6c1,
    lightsalmon = 0xffa07a,
    lightseagreen = 0x20b2aa,
    lightskyblue = 0x87cefa,
    lightslategray = 0x778899,
    lightslategrey = 0x778899,
    lightsteelblue = 0xb0c4de,
    lightyellow = 0xffffe0,
    limegreen = 0x32cd32,
    linen = 0xfaf0e6,
    magenta = 0xff00ff,
    mediumaquamarine = 0x66cdaa,
    mediumblue = 0x0000cd,
    mediumorchid = 0xba55d3,
    mediumpurple = 0x9370db,
    mediumseagreen = 0x3cb371,
    mediumslateblue = 0x7b68ee,
    mediumspringgreen = 0x00fa9a,
    mediumturquoise = 0x48d1cc,
    mediumvioletred = 0xc71585,
    midnightblue = 0x191970,
    mintcream = 0xf5fffa,
    mistyrose = 0xffe4e1,
    moccasin = 0xffe4b5,
    navajowhite = 0xffdead,
    oldlace = 0xfdf5e6,
    olivedrab = 0x6b8e23,
    orangered = 0xff4500,
    orchid = 0xda70d6,
    palegoldenrod = 0xeee8aa,
    palegreen = 0x98fb98,
    paleturquoise = 0xafeeee,
    palevioletred = 0xdb7093,
    papayawhip = 0xffefd5,
    peachpuff = 0xffdab9,
    peru = 0xcd853f,
    pink = 0xffc0cb,
    plum = 0xdda0dd,
    powderblue = 0xb0e0e6,
    rosybrown = 0xbc8f8f,
    royalblue = 0x4169e1,
    saddlebrown = 0x8b4513,
    salmon = 0xfa8072,
    sandybrown = 0xf4a460,
    seagreen = 0x2e8b57,
    seashell = 0xfff5ee,
    sienna = 0xa0522d,
    skyblue = 0x87ceeb,
    slateblue = 0x6a5acd,
    slategray = 0x708090,
    slategrey = 0x708090,
    snow = 0xfffafa,
    springgreen = 0x00ff7f,
    steelblue = 0x4682b4,
    tan = 0xd2b48c,
    thistle = 0xd8bfd8,
    tomato = 0xff6347,
    turquoise = 0x40e0d0,
    violet = 0xee82ee,
    wheat = 0xf5deb3,
    whitesmoke = 0xf5f5f5,
    yellowgreen = 0x9acd32,
    rebeccapurple = 0x663399
}

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
                [string | number] |
                [keyof Colors | number, number] |
                [number, number, number] |
                [number, number, number, number];

/**
 * Type for CSS color represented as an object:
 *   - properties: "r", "g", "b", "h", "s", "l" and "a" are treated as separations (red, green,
 *     blue, hue, saturation, lightness and alpha respectively).
 *   - Values for "r", "g", "b" can be either integer values from 0 to 255 for regular color values or
 *     floating numbers from 0.0 to 1.0 for percentages.
 *   - Value for "h" is either an integer number for degrees or a floating number for radians or a string
 *     for other dimensions (for gradians and turns).
 *   - Values for "s", "l" and "a" can be either integer values from 0 to 100 or floating numbers from 0.0 to
 *     1.0. Both types indicate percentages for percentages.
 *   - string property "name" is treated as a named color (can be used with property "a" for alpha)
 *   - numeric property "rgb" is treated as an RGB color 0xRRGGBB (can be used with property "a" for alpha)
 */
export type ColorAsObject =
                {
                    r?: number;
                    g?: number;
                    b?: number;
                    h?: number | string;
                    s?: number;
                    l?: number;
                    rgb?: number;
                    name?: string;
                    a?: number;
                };

/**
 * Type for CSS color. Color can be represented using the following types:
 *   - string (e.g. "red" or "#fe5" or "rgba(190, 200, 235, 90%)", etc.)
 *   - number:
 *     - positive integer numbers less than or equal to 0xFFFFFF are treated as RGB separations 0xRRGGBB.
 *     - positive integer numbers greater than 0xFFFFFF are treated as RGBA separations 0xRRGGBBAA.
 *     - negative and floating point numbers are rejected.
 *   - array [[ColorAsArray]] or object [[ColorAsObject]]:
 */
export type Color_StyleType = "transparent" | "currentcolor" | number | Base_StyleType | ColorAsArray | ColorAsObject | keyof Colors | string;

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

/**
 * Converts color value from the array representation to the CSS time string.
 */
export function colorAsArrayToCssString( val: ColorAsArray): string
{
    if (val.length === 1)
        return colorToCssString( val[0]);
    else if (val.length === 2)
    {
        let rgb = typeof val[0] === "string" ? Colors[val[0]] : val[0];
        let r = (rgb & 0xFF0000) >> 16;
        let g = (rgb & 0x00FF00) >> 8;
        let b = (rgb & 0x0000FF);
        let a = val[1] == null ? null : Number.isInteger( val[1]) ? val[1].toString() : val[1] * 100 + "%";
        return a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
    }
    else
    {
        let r = val[0] == null ? "0" : Number.isInteger( val[0]) ? val[0].toString() : val[0] * 100 + "%";
        let g = val[1] == null ? "0" : Number.isInteger( val[1]) ? val[1].toString() : val[1] * 100 + "%";
        let b = val[2] == null ? "0" : Number.isInteger( val[2]) ? val[2].toString() : val[2] * 100 + "%";
        if (val.length === 3 || val[3] == null)
            return `rgb(${r},${g},${b})`;
        else
        {
            let a =  Number.isInteger( val[3]) ? val[3].toString() : val[3] * 100 + "%";
            return `rgba(${r},${g},${b},${a})`;
        }
    }
}

/**
 * Converts color value from the array representation to the CSS time string.
 */
export function colorAsObjectToCssString( val: ColorAsObject): string
{
    let ret: string;

    let a = val.a == null ? null : Number.isInteger( val.a) ? val.a.toString() : val.a * 100 + "%";

    // if the "h" property exists, then it is an HSL color; otherwise it is RGB
    if (val.h !== undefined)
    {
        let h = typeof val.h === "string" ? val.h : Number.isInteger( val.h) ? val.h + "deg" : val.h + "rad";
        let s = val.s == null ? "100%" : Number.isInteger( val.s) ? val.s + "%" : val.s * 100 + "%";
        let l = val.l == null ? "100%" : Number.isInteger( val.l) ? val.l + "%" : val.l * 100 + "%";
        return a == null ? `hsl(${h},${s},${l})` : `hsla(${h},${s},${l},${a})`;
    }
    else
    {
        let r = val.r == null ? "0" : Number.isInteger( val.r) ? val.r.toString() : val.r * 100 + "%";
        let g = val.g == null ? "0" : Number.isInteger( val.g) ? val.g.toString() : val.g * 100 + "%";
        let b = val.b == null ? "0" : Number.isInteger( val.b) ? val.b.toString() : val.b * 100 + "%";
        return a == null ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
    }
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
	    return colorAsObjectToCssString( val);
}



/**
 * Converts the given object to a CSS string.
 * @param val Object to convert to string.
 * @param usePropNames Flag indicating whether the names of the object's proprties should be added to the string.
 * @param propsAndFuncs Array of property names and optionally functions. The order of the names determines in
 *     which oprder the properties should be added to the string. If a function is present for the property,
 *     it will be used to convert the property's value to the string. If a function is not present, then the
 *     property value should be converted to the string using the toString method.
 */
export function objectToCssString( val: any, usePropNames: boolean, ...propsAndFuncs: (string | [string, (val:any) => string])[] ): string
{
    if (val == null || propsAndFuncs.length === 0)
        return null;

	let s = "";

    for( let propAndFunc in propsAndFuncs)
    {
        let propName = typeof propAndFunc === "string" ? propAndFunc : propAndFunc[0];
        let func = typeof propAndFunc === "string" ? undefined : propAndFunc[1];

        let propVal = val[propName];
        if (propVal == null)
            continue;

        if (s.length > 0)
            s += " ";

        if (usePropNames)
            s += propName;

        if (func)
            s += " " + func( propVal);
        else if (propVal != null)
            s += " " + propVal;
    }

	return s;
}



