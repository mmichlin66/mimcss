import * as UtilTypes from "./UtilTypes"



/**
 * Converts names with dashes into names in camelCase, where every character after a dash is
 * capitalized and dashes are removed.
 * @param dash
 */
export function dashToCamel( dash: string): string
{
	if (!dash)
		return dash;

	return dash.replace( /-([a-zA-Z])/g, (x, $1) => $1.toUpperCase());
}



/**
 * Converts camelCase to dash-case.
 * @param camel
 */
export function camelToDash( camel: string): string
{
  return camel.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}



/**
 * Generic function that converts an array of the given typeto a single string using the given separator.
 * Elements of the array are converted to strings using the given function.
 * @param val Array of time values
 */
export function arrayToCssString<T>( val: T[], func: (v: T) => string, separator: string = " "): string
{
    return !val || val.length === 0 ? "" : val.map( (item) => func(item)).join( separator);
}



/**
 * Converts array of string values to a single string using the given separator.
 * @param val Array of string values
 */
export function stringArrayToCssString( val: (string | UtilTypes.StringProxy)[], separator: string = " "): string
{
    return arrayToCssString( val, (v) => typeof v === "string" ? v : v.toString());
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Number
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts single number style value to the CSS string.
 * @param val Single number value
 */
export function numberToCssString( val: UtilTypes.Number_StyleType): string
{
    return typeof val === "string" ? val : val.toString();
}

/**
 * Converts multi-part number style value to the CSS string.
 * @param val Multi-part number value
 */
export function multiNumberToCssString( val: UtilTypes.MultiNumber_StyleType): string
{
    if (Array.isArray(val))
        return arrayToCssString( val, numberToCssString);
    else
        return numberToCssString( val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Percent
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given number to a percent string. Numbers between -1 and 1 are multiplyed by 100.
 */
export function percentNumberToCssString( n: number): string
{
    return (Number.isInteger(n) ? n : n > -1.0 && n < 1.0 ? Math.round( n * 100) : Math.round(n)) + "%";
}

/**
 * Converts single percent style value to the CSS string.
 * @param val Single percent value
 */
export function percentToCssString( val: UtilTypes.Percent_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
	    return percentNumberToCssString( val);
}

/**
 * Converts multi-part percent style value to the CSS string.
 * @param val Multi-part percent value
 */
export function multiPercentToCssString( val: UtilTypes.MultiPercent_StyleType, separator: string = " "): string
{
    if (Array.isArray(val))
        return arrayToCssString( val, percentToCssString, separator);
    else
        return percentToCssString( val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Length
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts length value from the numeric representation to the CSS string. Integer
 * values are treated as pixels while floating numbers within -1 and 1 are treated as
 * percents and floating numbers outside -1 and 1 are treated as "em".
 * @param val Length as a number
 */
export function lengthNumberToCssString( n: number, units?: UtilTypes.LengthUnits): string
{
    return units ? n + units : Number.isInteger( n) ?  n + "px" : n > -1.0 && n < 1.0 ? Math.round( n * 100) + "%" : n + "em";
}

/**
 * Converts length style value to the CSS string.
 * @param val Length as a style property type
 */
export function lengthToCssString( val: UtilTypes.Length_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
	    return lengthNumberToCssString( val);
}

/**
 * Converts multi-part length or percentage style property to the CSS string.
 * @param val Array of length style values
 */
export function multiLengthToCssString( val: UtilTypes.MultiLength_StyleType, separator: string = " "): string
{
    if (Array.isArray(val))
        return arrayToCssString( val, lengthToCssString, separator);
    else
        return lengthToCssString( val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Angle
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts angle value from the numeric representation to the CSS string. Integer
 * values are treated as degrees while floating numbers are treated as radians.
 * @param val Angle as a number
 */
export function angleNumberToCssString( n: number, units?: UtilTypes.AngleUnits): string
{
    return n === 0 ? "0" : units ? n + units : Number.isInteger(n) ?  n + "deg" : n + "rad";
}

/**
 * Converts length style value to the CSS string.
 * @param val Length as a style property type
 */
export function angleToCssString( val: UtilTypes.Angle_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
	    return angleNumberToCssString( val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Time
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts time value from the numeric representation to the CSS string. Integer
 * values are treated as milliseconds while floating numbers are treated as seconds.
 * @param val Time as a number
 */
export function timeNumberToCssString( n: number, units?: UtilTypes.TimeUnits): string
{
    return n === 0 ? "0s" : units ? n + units : Number.isInteger(n) ?  n + "ms" : n + "s";
}

/**
 * Converts time style value to the CSS string.
 * @param val Time as a style property type
 */
export function timeToCssString( val: UtilTypes.Time_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
	    return timeNumberToCssString( val);
}

/**
 * Converts animation delay style value to the CSS string.
 * @param val Animation delay value
 */
export function multiTimeToCssString( val: UtilTypes.MultiTime_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return timeNumberToCssString( val);
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return arrayToCssString( val, timeToCssString);
}



/**
 * Converts resolution value from the numeric representation to the CSS string. Integer
 * values are treated as DPI while floating numbers are treated as DPCM.
 * @param val Resolution as a number
 */
export function resolutionToCssString( n: number, units?: string): string
{
    return n === 0 ? "0" : units ? n + units : Number.isInteger(n) ?  n + "dpi" : n + "dpcm";
}



/**
 * Converts size style value to the CSS string.
 * @param val Size as a style property type
 */
export function sizeToCssString( val: UtilTypes.Size_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (typeof val === "object")
        return objectToCssString( val, false, ["w", lengthToCssString], ["h", lengthToCssString]);
    // else if (Array.isArray( val))
    //     return lengthToCssString( val[0]) + " " + lengthToCssString( val[1]);
    else
	    return lengthToCssString( val);
}

/**
 * Converts multi-part size style property to the CSS string.
 * @param val Array of length style values
 */
export function multiSizeToCssString( val: UtilTypes.MultiSize_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
        return arrayToCssString( val, sizeToCssString);
    else
        return sizeToCssString( val);
}



/**
 * Converts single position style value to the CSS string.
 * @param val Size as a style property type
 */
export function positionToCssString( val: UtilTypes.Position_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (typeof val === "object")
    {
        if ("xedge" in val)
            return objectToCssString( val, false, "xedge", ["x", lengthToCssString], "yedge", ["y", lengthToCssString]);
        else
            return objectToCssString( val, false, ["x", lengthToCssString], ["y", lengthToCssString]);
    }
    else
	    return lengthToCssString( val);
}

/**
 * Converts multi-part position style values to the CSS string.
 * @param val Array of length style values
 */
export function multiPositionToCssString( val: UtilTypes.MultiPosition_StyleType): string
{
    if (Array.isArray(val))
        return arrayToCssString( val, positionToCssString);
    else
        return  positionToCssString( val);
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
export function objectToCssString( val: any, usePropNames: boolean, ...propsAndFuncs: (string | [string, (val: any) => string])[] ): string
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



