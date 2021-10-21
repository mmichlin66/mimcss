///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Case conversions for property names.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

import { ICssFuncObject } from "../api/CoreTypes";

/**
 * Converts dashe-case to camelCase, e.g. font-size to fontSize.
 * @param dash
 */
export const dashToCamel = (dash: string): string =>
	!dash ? dash : dash.replace( /-([a-zA-Z])/g, (x, $1) => $1.toUpperCase());



/**
 * Converts camelCase to dash-case, e.g. fontSize to font-size.
 * @param camel
 */
export const camelToDash = (camel: string): string =>
    camel.replace( /([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();



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
 * Numeric identifiers corresponding to Well Known Functions used to convert style property values
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
    MultiPosition,
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
    BoxShadow,
    AlwaysPercent,
    ColorSeparation,
    Marker,
    Colors,

    // indicates the length of the array needed to keep conversion functions. This is used when
    // we create this array below. Any new enumeration members must be added before this.
    Last
}

/**
 * Array of well known conversion functions. Indexes are the identifier of well known functions
 * from the WellKnownFunc enumeration
 */
export let wkf: AnyToStringFunc[] = new Array( WKF.Last);



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
 * Converts a value of an arbitrary type to a single string. The options parameter
 * can define how specific types are converted.
 */
export const v2s = (val: any, options?: V2SOptions): string =>
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
        else if (typeof val.fn === "string")
            return fdo2s( val);
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
        // property is not defined, use options.any if defined.
        let newOptions: V2SOptions | undefined = undefined;

        if (val == null)
            return options.nil ? typeof options.nil === "string" ? options.nil : options.nil( val) : "";
        else if (typeof val === "number")
            newOptions = options.num ?? options.any;
        else if (typeof val === "function")
            return v2s( val());
        else if (Array.isArray(val))
        {
            if (options.arr)
                newOptions = options.arr;
            else if (val.length === 0)
                return "";
            else
                return a2s( val, options.item ?? options.any, options.sep);
        }
        else if (typeof val === "object")
        {
            if (typeof val[symValueToString] === "function")
                return val[symValueToString]();
            else if (typeof val.fn === "string")
                return fdo2s( val);
            else if (options.obj || options.any)
                newOptions = options.obj ?? options.any;
            else if (options.props)
                return o2s( val, options.props, options.sep);
            else
                return val.toString();
        }
        else if (typeof val === "string")
            newOptions = options.str ?? options.any;
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
export const a2s = (val: any[], options?: V2SOptions, separator: string = " "): string =>
    !val || val.length === 0 ? "" : val.map( v => v2s( v, options)).filter( v => !!v).join( separator);



/**
 * Converts properties of the given object to string by converting each property from the options
 * array and joining them using the given separator.
 * @param val Object to convert to string
 * @param options array of property names or tuples with property names, options and prefixes.
 * @param separator Separator character.
 * @param defaultOptions - V2SOptions for those properties in the "params" array that don't
 * define their own. This should be used in the case when all function parameters are of the
 * same type
 * @param defaultPrefix - prefix to use for those properties in the "params" array that don't
 * define their own prefix
 */
export const o2s = (val: {[p:string]: any}, options: P2SOptions, separator?: string,
    defaultOptions?: V2SOptions, defaultPrefix?: string): string =>
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
        let prefix = typeof nameOrTuple === "string" ? defaultPrefix : nameOrTuple[2];
        if (prefix)
            params.push( prefix);

        let options = typeof nameOrTuple === "string" ? defaultOptions : nameOrTuple[1];
        params.push( v2s( propVal, options));
    }

    return params.filter( v => !!v).join( separator ?? " ");
}



// Type representing an array of values or two-item tuples where the item is a value and the
// second item is the V2SOptions object determining how this value should be serialized.
export type ParamListWithOptions = (any | [any, V2SOptions?])[];



/**
 * Converts the given array of values to a single string according to the specified options and
 * using the given separator. For each item in the array, the v2s function is called to convert
 * it to string.
 * @param values
 * @param separator
 */
export const mv2s = (values: ParamListWithOptions, separator: string = " "): string =>
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

        if (val || (options && (options as any).nil))
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
export const f2s = (name: string, values: ParamListWithOptions, separator = ",") =>
    `${name}(${mv2s( values, separator)})`;



/**
 * The tag2s is a tag function helper that converts the template string with
 * parameters to a string using the given function to convert parameters.
 */
export const tag2s = (parts: TemplateStringsArray, params: any[], convertFunc?: ( v: any) => string): string =>
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
 * Object that specifies options for string serialization of a property set.
 */
export type PropSet2SOptions = {
    prefix?: string;
    suffix?: string;
    separator?: string;
    propFunc?: (dashName: string, camelName: string, val: any, options: V2SOptions) => string;
};



/**
 * Converts the given property set object to the CSS style string.
 */
export const propSet2s = (val: any, infos: PropSetInfos, options?: PropSet2SOptions): string =>
    v2s( val, {
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

// convert the value to string based on the information object for the property (if defined)
const propInPropSet2s = (dashName: string, camelName: string, val: any, options: V2SOptions): string =>
    `${dashName}:${ v2s( val, options)}`;



/**
 * Type that defines how to serialize a value for an entry in the function definitions object.
 * The value can be of one of the following types with each corresponding to a certain way of
 * string serialization:
 *   - function - the function is invoked.
 *   - number - all object properties except "fn" are converted using the corresponding function
 *     from the WKF enumeration. Since the enumerating order of the properties is indeterminate,
 *     this option is only good for functions with a single parameter.
 *   - array of P2SOption types - o2s is ivoked
 *   - object - may have the following properties:
 *     - optional "fn" - replaces function name.
 *     - optional "p" - array of P2SOption types, for which o2s is invoked.
 *     - optional "f" - function that returns the list of parameters.
 *     - either "p" or "f" must be present and "p" has precedence.
 *     - optional "sep" for separator (default is ",").
 *     - optional "do" - defines V2SOptions for those properties in the "params" array that don't
 *       define their own. This should be used in the case when all function parameters are of the
 *       same type
 *     - optional "dp" - default prefix to use for those properties in the "params" array that
 *       don't define their own prefix
 */
type FdoOptions = AnyToStringFunc | number | P2SOptions |
    {
        fn?: string | AnyToStringFunc,
        p?: P2SOptions,
        f?: AnyToStringFunc,
        s?: string,
        do?: V2SOptions,
        dp?: string
    }



// This object is filled in in the XxxAPI files where the functions corresponding to CSS functions
// are defined.
export const fdo: { [fn: string]: FdoOptions } = {};


/**
 * Converts the given function definition object to string. Conversion is performed according
 * to the type found in the "fdo" object for the property name equal to the "fn" property of
 * the given value. If no such property exist in the "fdo" object, all object's properties except
 * "fn" will be converted to strings using v2s and concatenated with comma.
 *
 * @param val Function definition object that has the "fn" property defining the function name.
 * @returns String representation of CSS function invocation.
 */
export const fdo2s = (val: ICssFuncObject): string =>
{
    let options = fdo[val.fn];
    if (!options)
        return goOverProps(val);
    else if (typeof options === "number")
        return goOverProps( val, options);
    else if (typeof options === "function")
        return options( val);
    else if (Array.isArray(options))
        return `${val.fn}(${o2s( val, options, ",")})`;
    else
    {
        let fn = options.fn;
        fn = !fn ? val.fn : typeof fn === "string" ? fn : fn(val);
        return options.p
            ? `${fn}(${o2s( val, options.p, options.s ?? ",", options.do, options.dp)})`
            : options.f
                ? `${fn}(${options.f(val)})`
                : "";
    }
}



/**
 * Helper function that goes over the props of the given object except the "fn" property,
 * serializes all the props using the given options and concatenates them with the given
 * separator (comma by default).
 * @param val
 * @param options
 * @param sep
 * @returns
 */
const goOverProps = (val: ICssFuncObject, options?: V2SOptions, sep?: string): string =>
{
    let buf: string[] = [];
    for( let p in val)
    {
        if (p !== "fn")
            buf.push( v2s( val[p], options));
    }

    return `${val.fn}(${buf.join( sep ?? ",")})`;
}



