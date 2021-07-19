///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Case conversions for property names.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts dashe-case to camelCase, e.g. font-size to fontSize.
 * @param dash
 */
export function dashToCamel( dash: string): string
{
	if (!dash)
		return dash;

	return dash.replace( /-([a-zA-Z])/g, (x, $1) => $1.toUpperCase());
}



/**
 * Converts camelCase to dash-case, e.g. fontSize to font-size.
 * @param camel
 */
export function camelToDash( camel: string): string
{
  return camel.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Conversion of values to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Symbol under which a function is defined that converts an object to a string. We need a special
 * symbol because the standard method toString exists on every object and we only want some to
 * explicitly provide this support.
 */
 export const symValueToString: unique symbol = Symbol();



/** Type of functions that convert a value of arbitrary type to a string */
export type AnyToStringFunc = (val: any) => string;

/** Type of functions that convert a number to a string */
export type NumberToStringFunc = (n: number) => string;



/**
 * Numeric identifiers corresponding to well known functions used to convert style property values
 * to strings. This is used to reduce the size of the object used for mapping style properties to
 * conversion functions.
 */
export const enum WKF
{
    Number = 1,
    Percent,
    Length,
    Angle,
    Time,
    Resolution,
    Frequency,
    Position,
    AtPosition,
    AspectRatio,
    Color,
    MultiPositionWithComma,
    MultiLengthWithSpace,
    MultiTimeWithComma,
    OneOrManyWithComma,
    OneOrManyWithSlash,
    UnitlessOrPercent,
    Radius,
    Border,
    BorderRadius,
    GridAxis,
    GridTrack,
    Quoted,
    FontStyle,

    // indicates the length of the array needed to keep conversion functions
    Last
}



/**
 * The P2SOption type defines a name of a property of an object along with the options of how
 * this property is converted to a string. The type is either a property name or a tuple
 * where the first element is the property name and the second element is the V2SOptions value.
 * If the tuple has a third string element it is placed before the converted property value.
 */
export type P2SOption = string | [string, V2SOptions?, string?];

/**
 * The P2SOptions type defines names of properties of an object along with the options of how
 * each property is converted to a string. The type is an array of either property names or tuples
 * where the first element is the property name and the second element is the V2SOptions value.
 * If the tuple has a third string element it is placed before the converted property value.
 */
export type P2SOptions = P2SOption[];



/**
 * Array of well known conversion functions. Indexes are the identifier of well known functions
 * from the WellKnownFunc enumeration
 */
export let wkf: AnyToStringFunc[] = new Array( WKF.Last);



/**
 * The V2SOptions type defines options on how to convert values of differnt
 * types to strings. A value is converted according to the following rules:
 * - If the option is a number it is treated as an ID of a registered conversion function.
 * - If the option is a function, it is invoked to convert the value.
 * - If the option is an object, then depending on the type of the value, one of the fromXxx
 *   methods defines how the value is converted.
 */
export type V2SOptions = WKF | AnyToStringFunc |
{
    // String value to use or function to call if value is null or undefined
    nil?: string | ((val?: null) => string);

    // String value to use or function to call if value is a boolean
    bool?: (val: boolean) => string;

    // Options to use if value is a string. This allows transforming one string to another.
    str?: WKF | ((val: string) => string);

    // Options to use if value is a number
    num?: WKF | NumberToStringFunc;

    // Options to use if value is an array
    arr?: WKF | ((val: any[]) => string);

    // Options to use if value is an object
    obj?: V2SOptions;

    // Options to use to convert value's properties if value is an object
    props?: P2SOptions;

    // Options to use if type-specific function is not defined except for null and string values.
    // This is also used for array elements if arrItemFunc is not defined.
    any?: V2SOptions;

    // Options to use to convert each array item - used only if fromArray is not defined
    item?: V2SOptions;

    // Separator for array items used with the item or props properties. If not specified, a
    // single space will be used.
    sep?: string;
};



/**
 * Converts a value of an arbitrary type to a single string. The optional options parameter
 * can define how specific types are converted.
 */
export function v2s( val: any, options?: V2SOptions): string
{
    // if options is not specified, do standard processing
    if (!options)
    {
        if (typeof val === "string")
            return val;
        else if (Array.isArray(val))
            return a2s( val);
        else if (typeof val === "function")
            return v2s(val());
        else if (val == null)
            return "";
        else if (typeof val[symValueToString] === "function")
            return val[symValueToString]();
        else
            return val.toString();
    }

    // do different things for different types of options
    if (typeof options == "number")
        return wkf[options] ? wkf[options](val) : "";
    else if (typeof options == "function")
        return options( val);
    else
    {
        // processing with options. For all types except null and string, if the type-specific
        // function is not defined, call fromAny if defined.
        let newOptions: V2SOptions | undefined = undefined;

        if (val == null)
            return options.nil ? typeof options.nil === "string" ? options.nil : options.nil( val) : "";
        else if (typeof val === "number")
            newOptions = options.num || options.any;
        else if (typeof val === "function")
            return v2s( val());
        else if (Array.isArray(val))
        {
            if (options.arr)
                newOptions = options.arr;
            else if (val.length === 0)
                return "";
            else
                return a2s( val, options.item || options.any, options.sep);
        }
        else if (typeof val === "object")
        {
            if (options.obj || options.any)
                newOptions = options.obj || options.any;
            else if (options.props)
                return o2s( val, options.props, options.sep);
            else if (typeof val[symValueToString] === "function")
                return val[symValueToString]();
            else
                return val.toString();
        }
        else if (typeof val === "string")
            newOptions = options.str || options.any;
        else if (typeof val === "boolean")
            return options.bool ? options.bool( val) : val.toString();
        else
            return "";

        return v2s( val, newOptions);
    }
}



wkf[WKF.OneOrManyWithComma] = v => v2s( v, { sep: "," });
wkf[WKF.OneOrManyWithSlash] = v => v2s( v, { sep: "/" });
wkf[WKF.Quoted] = v => typeof v === "string" ? `"${v}"` : v2s(v);



/**
 * Converts the given array to a single string by converting every item using the given otions
 * and joining the results with the given delimiter.
 */
export function a2s( val: any[], options?: V2SOptions, separator: string = " "): string
{
    return !val || val.length === 0
        ? ""
        : val.map( v => v2s( v, options)).filter( v => !!v).join( separator);
}



/**
 * Converts properties of the given object to string by converting each property from the options
 * array and joining them using the given separator.
 * @param val
 * @param options
 * @param separator
 */
export function o2s( val: {[p:string]: any}, options: P2SOptions, separator?: string): string
{
    if (val == null)
        return "";

    let params: string[] = [];
    for( let nameOrTuple of options)
    {
        // get the name of the property in the value to be converted and the corresponding value;
        // if the properties value is not defined, skip it.
        let propName = typeof nameOrTuple === "string" ? nameOrTuple : nameOrTuple[0];
        let propVal = val[propName];
        if (propVal == null)
            continue;

        // check whether we have a prefix
        let prefix = typeof nameOrTuple === "string" ? undefined : nameOrTuple[2];
        if (prefix)
            params.push( prefix);

        let options = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
        params.push( v2s( propVal, options));
    }

    return params.filter( v => !!v).join( separator ?? " ");
}



/**
 * Converts the given array of values to a single string according to the specified options and
 * using the given separator. For each item in the array, the v2s function is called to convert
 * it to string.
 * @param values
 * @param separator
 */
export function mv2s( values: (any | [any, V2SOptions?])[], separator: string = " "): string
{
    if (values == null || values.length === 0)
        return "";

    let arr: string[] = [];
    for( let item of values)
    {
        let val: any;
        let options: V2SOptions | undefined;
        if (Array.isArray(item))
        {
            val = item[0];
            options = item[1];
        }
        else
            val = item;

        arr.push( v2s( val, options));
    }

    return arr.filter( v => !!v).join( separator);
}



/**
 * Converts the given values as parameters to the given CSS function invocation.
 * @param name
 * @param values
 * @param separator
 */
export function f2s( name: string, values: (any | [any, V2SOptions?])[], separator = ",")
{
    return `${name}(${mv2s( values, separator)})`;
}



/**
 * The tag2s is a tag function helper that converts the template string with
 * parameters to a string using the given function to convert parameters.
 */
export function tag2s( parts: TemplateStringsArray, params: any[],
    convertFunc?: ( v: any) => string): string
{
    // number of parameters is always 1 less than the number of string parts
    let paramsLen = params.length;
    if (paramsLen === 0)
        return parts[0];

    let s = "";
    for( let i = 0; i < paramsLen; i++)
        s += parts[i] + (convertFunc ? convertFunc( params[i]) : v2s( params[i]));

    // add the last part
    return s + parts[paramsLen];
}



/**
 * Object that specifying string serialization options for properties in a property set. Each
 * property of a property set will be serialized according to the V2SOptions parameter in this
 * object; if the property does not appear in this object, the v2s function will be called for it.
 */
 export type PropSetInfos = { [K: string]: V2SOptions };

 /**
  * Object that specifying options for string serialization of a property set.
  */
 export type PropSet2SOptions = {
     prefix?: string;
     suffix?: string;
     separator?: string;
     propFunc?: (dashName: string, camelName: string, val: any, options: V2SOptions) => string;
 };



 /**
  * Converts the given font face object to the CSS style string.
  */
 export function propSet2s( val: any, infos: PropSetInfos, options?: PropSet2SOptions): string
 {
     return v2s( val, {
         obj: v => {
             let propNames = Object.keys( v);
             if (propNames.length === 0)
                 return "";

             let func = options?.propFunc ?? propInPropSet2s;
             let arr = propNames.map( (propName) =>
             {
                 let dashPropName = camelToDash(propName);
                 let camelPropName = dashToCamel(propName);
                 return func( dashPropName, camelPropName, v[propName], infos[camelPropName]);
             });
             return (options?.prefix ?? "") + `${arr.join( options?.separator ?? ";")}` + (options?.suffix ?? "");
         }
     });
 }

 // convert the value to string based on the information object for the property (if defined)
 function propInPropSet2s( dashName: string, camelName: string, val: any, options: V2SOptions): string
 {
     return `${dashName}:${ v2s( val, options)}`;
 }



