import {CssSelector, Extended, OneOrMany, CssRadius, CssLength, CssTime} from "../api/BasicTypes";
import {
    TimingFunction_Single, Animation_Single, Background_Single, BackgroundSize_Single,
    BorderImage_Object, BorderImageSlice_StyleType, BoxShadow_Single, BorderRadius_StyleType,
    Border_StyleType, Columns_StyleType, Cursor_StyleType, Flex_StyleType, Font_StyleType,
    GridTemplateAreas_StyleType, GridTemplateArea_Definition, GridTrack, GridTemplateAxis_StyleType,
    Marker_StyleType, Rotate_StyleType, TextDecoration_StyleType, Transition_Single, Offset_StyleType,
    Styleset, CustomVar_StyleType, VarTemplateName, SupportsQuery, SingleSupportsQuery, ExtendedStyleset,
    TransformFunc,
    FilterFunc
} from "../api/StyleTypes";
import {
    v2s, TimeMath, NumberMath, arr2str, pos2str, LengthMath, unitlessOrPercentToString, AngleMath,
    camelToDash, dashToCamel, IValueConvertOptions, multiPos2str, PercentMath, ResolutionMath, FrequencyMath, ToStringFunc
} from "./UtilFuncs";
import {colorToString} from "./ColorFuncs";
import {VarRule} from "../rules/VarRule";
import {IIDRule} from "../api/RuleTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS selector.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given two-number tuple to a string in the form An+B.
 */
function nthTupleToString( val: [number, number?]): string
{
	let v0 = v2s( val[0]);
	let v1n = val[1];

	// the '!v1n' expression covers null, undefined and 0.
	let v1 = !v1n ? "" : v1n > 0 ? "+" + v2s( v1n) : "-" + v2s( -v1n);

	return `${v0}n${v1}`;
}



/**
 * Returns a string representation of a selector.
 */
export function selectorToString( val: CssSelector): string
{
	return v2s( val, {
		arrSep: ""
	})
}



/**
 * Returns a string representation of a parameterized pseudo entity.
 */
export function pseudoEntityToString( entityName: string, val: any): string
{
	if (!entityName)
		return "";

	if (entityName.startsWith( ":nth"))
		return v2s( val, { fromArray: nthTupleToString });
	else
		return v2s(val);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions for converting values to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Numeric identifiers corresponding to well known functions used to convert style property values
 * to strings. This is used to reduce the size of the object used for mapping style properties to
 * conversion functions.
 *
 * Note!!!: the values in the enumeration cannot be changed - otherwise, it will not be backwards
 * compatible. All new values must be appended at the end.
 */
 const enum WellKnownFunc
 {
     Length = 1,
     Color,
     Border,
     Position,
     CornerRadius,
     MultiLengthWithSpace,
     MultiTimeWithComma,
     ArrayWithComma,
     ArrayWithSlash,
     GridAxis,
     Angle,
     Number,
     Percent,
 }



 /**
  * Converts the given value to string using a well-known function indicated by the given
  * enumeration value.
  * @param val
  * @param funcType
  */
 function valueToStringByWellKnownFunc( val: any, funcType: WellKnownFunc): string
 {
     let func: ToStringFunc | null =
         funcType === WellKnownFunc.Length ? LengthMath.s2s :
         funcType === WellKnownFunc.Angle ? AngleMath.s2s :
         funcType === WellKnownFunc.Number ? NumberMath.s2s :
         funcType === WellKnownFunc.Percent ? PercentMath.s2s :
         funcType === WellKnownFunc.Color ? colorToString :
         funcType === WellKnownFunc.Border ? borderToString :
         funcType === WellKnownFunc.Position ? pos2str :
         funcType === WellKnownFunc.CornerRadius ? singleCornerRadiusToString :
         funcType === WellKnownFunc.MultiLengthWithSpace ? multiLengthToStringWithSpace :
         funcType === WellKnownFunc.MultiTimeWithComma ? multiTimeToStringWithComma :
         funcType === WellKnownFunc.ArrayWithComma ? arrayToStringWithComma :
         funcType === WellKnownFunc.ArrayWithSlash ? arrayToStringWithSlash :
         funcType === WellKnownFunc.GridAxis ? gridAxisToString :
         null;

     return func ? func(val) : "";
 }



// Helper function converts the given multi-length value to string. If the value is an array, the
// items will be separated by space.
function multiLengthToStringWithSpace( val: OneOrMany<CssLength>): string
{
    return LengthMath.ms2s( val, " ");
}

// Helper function converts the given multi-time value to string. If the value is an array, the
// items will be separated by comma.
function multiTimeToStringWithComma( val: OneOrMany<CssTime>): string
{
    return TimeMath.ms2s( val, ",");
}

// Helper function converts the given value to string. If the value is an array, the items will be
// separated by comma.
function arrayToStringWithComma( val: any)
{
    return v2s( val, { arrSep: "," });
};

// Helper function converts the given value to string. If the value is an array, the items will be
// separated by slash.
function arrayToStringWithSlash( val: any)
{
    return v2s( val, { arrSep: "/" });
};



/**
 * Converts the given value to a CSS function string using the given function name and the info
 * parameter to inform how the object's properties should be converted to strings. The info
 * parameter is an array of either strings or two-element tuples. The only string and the first
 * tuple element corresponds to a property expected in the value object to be converted. Each
 * property is converted according to the following rules:
 * - If the array item is just a string, the corresponding value's property is converted using
 *   the val2str function.
 * - If the second element is null or undefined, the corresponding value's property is converted using
 *   the val2str function..
 * - If the second element is a number it is treated as an index of a well-known conversion function.
 * - If the second element is a function, it is used to convert the value's property.
 *
 * Since the elements in the info array constitute parameters for the function, processing stops as
 * soon as an undefined parameter is encountered because undefined parameter indicates that optional
 * parameters started with this one were not passed to the function.
 */
 function funcObj2String( val: { fn: string, [p: string]: any },
    info: (string | [string, WellKnownFunc | ToStringFunc])[]): string
{
    if (val == null)
        return "";

    let params: string[] = [];
    for( let nameOrTuple of info)
    {
        // get the name of the property in the value to be converted and the corresponding value;
        // if the properties value is not defined, skip it.
        let propName = typeof nameOrTuple === "string" ? nameOrTuple : nameOrTuple[0];
        let propVal = val[propName];
        if (propVal == null)
            break;

        let convertor = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
        if (!convertor)
            params.push( v2s( propVal));
        else if (typeof convertor === "number")
            params.push( valueToStringByWellKnownFunc( propVal, convertor));
        else
            params.push( convertor( propVal));
    }

	return `${val.fn}(${params.join(",")})`;
}



/**
 * Converts the given value to a CSS string using the info parameter to inform how the object's
 * properties should be converted to strings. The info parameter is an array of either strings
 * or two- or thre-element tuples. The only string and the first tuple element corresponds to a
 * property expected in the value object to be converted. Each property is converted according
 * to the following rules:
 * - If the array item is just a string, the corresponding value's property is converted using
 *   the val2str function.
 * - If the second element is null or undefined, the corresponding value's property is converted using
 *   the val2str function..
 * - If the second element is a string it is treated as a name of a longhand style property. The
 *   value's property is converted using the stylePropToString function for this longhand style
 *   property.
 * - If the second element is a function, it is used to convert the value's property.
 * - If a third element exists in the tuple it is treated as a prefix to be placed before the
 *   converted property value.
 *
 * The order of the names determines in which order the properties should be added to the string.
 */
function styleObj2String( val: any,
    info: (string | [string, null | string | ToStringFunc, string?] )[],
    separator: string = " "): string
{
    if (val == null)
        return "";
    else if (typeof val !== "object")
        return val.toString();

    let buf: string[] = [];
    info.forEach( nameOrTuple =>
    {
        // get the name of the property in the value to be converted and the corresponding value;
        // if the properties value is not defined, skip it.
        let propName = typeof nameOrTuple === "string" ? nameOrTuple : nameOrTuple[0];
        let propVal = val[propName];
        if (propVal == null)
            return;

        // check whether we have a prefix
        let prefix = typeof nameOrTuple === "string" ? undefined : nameOrTuple[2];
        if (prefix)
            buf.push( prefix);

        let convertor = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
        if (!convertor)
            buf.push( v2s( propVal));
        else if (typeof convertor === "string")
            buf.push( stylePropToString( convertor, propVal, true));
        else
            buf.push( convertor( propVal));
    });

	return buf.join(separator);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for converting CSS property types to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

function singleAnimation_fromObject( val: Animation_Single): string
{
    return styleObj2String( val, [
        ["duration", TimeMath.s2s],
        ["func", singleTimingFunction_fromStyle],
        ["delay", TimeMath.s2s],
        ["count", NumberMath.s2s],
        "direction",
        "mode",
        "state",
        "name"
    ]);
}



function singleAnimation_fromStyle( val: Extended<Animation_Single>): string
{
    return v2s( val, {
        fromObj: singleAnimation_fromObject
    });
}



function timingFunctionToString( val: Extended<OneOrMany<TimingFunction_Single>>): string
{
    return v2s( val, {
        fromNumber: timingFunction_fromNumber,
        fromArray: timingFunction_fromArray
    });
}



function timingFunction_fromNumber( val: number): string
{
    return `steps(${val})`;
}



function timingFunction_fromArray( val: any[]): string
{
    return typeof val[0] === "number"
        ? singleTimingFunction_fromStyle( val as TimingFunction_Single)
        : arr2str( val, singleTimingFunction_fromStyle, ",");
}



function singleTimingFunction_fromStyle( val: Extended<TimingFunction_Single>): string
{
    return v2s( val, {
        fromNumber: timingFunction_fromNumber,
        fromArray: v =>
        {
            if (v.length < 3)
            {
                // this is steps function

                /// #if DEBUG
                    if (v[0] <= 0)
                        console.error( `Number of steps in animation function must be greater than zero. You have: ${v[0]}`);
                    else if (!Number.isInteger( v[0]))
                        console.error( `Number of steps in animation function must be an Integer. You have: ${v[0]}`);
                /// #endif

                return `steps(${v[0]}${v.length === 2 ? "," + v[1] : ""})`;
            }
            else
            {
                // this is bezier function

                /// #if DEBUG
                    if (v[0] < 0 || v[0] > 1 || v[2] < 0 || v[2] > 1)
                        console.error( `First and third parameters of cubic-bezier animation function must be between 0 and 1. You have ${v[0]} and ${v[2]}`);
                /// #endif

                return `cubic-bezier(${v[0]},${v[1]},${v[2]},${v[3]})`;
            }
        }
    });
}



function singleBackground_fromObject( val: Background_Single): string
{
    return styleObj2String( val, [
        ["color", colorToString],
        "image",
        ["position", pos2str],
        ["size", multiLengthToStringWithSpace, "/"],
        "repeat",
        "attachment",
        "origin",
        "clip"
    ]);
}



function singleBackground_fromStyle( val: Extended<Background_Single>): string
{
    return v2s( val, {
        fromNumber: colorToString,
        fromObj: singleBackground_fromObject
    });
}



function singleBackgroundSize_fromStyle( val: Extended<BackgroundSize_Single>): string
{
    return v2s( val, {
        fromNumber: LengthMath.s2s,
        fromArray: multiLengthToStringWithSpace
    });
}



/**
 * Converts border image style value to the CSS string.
 */
function borderImageToString( val: BorderImage_Object): string
{
    // if width is specified, but slice is not, we need to set slice to the default 100% value;
    // if outset is specified but width is not. we need to set width to the default 1 value;
    let valCopy: BorderImage_Object = Object.assign( {}, val);
    if (val.slice == null && (val.width != null || val.outset != null))
        valCopy.slice = "100%";
    if (val.width == null && val.outset != null)
        valCopy.width = 1;

    return styleObj2String( valCopy, [
        "source",
        ["slice", "borderImageSlice"],
        ["width", null, "/"],
        ["outset",null, "/"],
        "repeat"
    ]);
}



/**
 * Converts border image slice style value to the CSS string.
 */
function borderImageSliceToString( val: Extended<BorderImageSlice_StyleType>): string
{
    return v2s( val, {
        fromNumber: unitlessOrPercentToString,
        arrItemFunc: v => v2s( v, {
            fromBool: () => "fill",
            fromNumber: unitlessOrPercentToString,
        })
    });
}



export function singleBoxShadow_fromObject( val: BoxShadow_Single): string
{
    return styleObj2String( val, [
        ["inset", v => v ? "inset" : ""],
        ["x", LengthMath.s2s],
        ["y", LengthMath.s2s],
        ["blur", LengthMath.s2s],
        ["spread", LengthMath.s2s],
        ["color", colorToString]
    ]);
}



/**
 * Converts corner radius style value to the CSS string.
 */
function singleCornerRadiusToString( val: Extended<CssRadius>): string
{
    return v2s( val, {
        arrItemFunc: LengthMath.s2s,
        fromAny: LengthMath.s2s
    });
}



/**
 * Converts border radius style value to the CSS string.
 */
export function borderRadiusToString( val: Extended<BorderRadius_StyleType>): string
{
    return v2s( val, {
        fromArray: v =>
        {
            if (Array.isArray( v[0]))
            {
                // two MultiCornerRadius values
                let s = arr2str( v[0], LengthMath.s2s, " ");
                s += " / ";
                return s + arr2str( v[1], LengthMath.s2s, " ");
            }
            else
            {
                // single MultiCornerRadius value
                return arr2str( v, LengthMath.s2s, " ");
            }
        },
        fromAny: LengthMath.s2s
    });
}



/**
 * Converts border side style value to the CSS string.
 */
function borderToString( val: Extended<Border_StyleType>): string
{
    return v2s( val, {
        fromNumber: LengthMath.s2s,
        fromArray: v =>
        {
            let buf: string[] = [];
            if (v[0] != null)
                buf.push( LengthMath.s2s( v[0]))

            if (v[1] != null)
                buf.push( v2s(v[1]));

            if (v[2] != null)
                buf.push( colorToString(v[2]));

            return buf.join(" ");
        },
        fromAny: colorToString
    });
}



/**
 * Converts columns style to its CSS string value.
 */
function columnsToString( val: Extended<Columns_StyleType>): string
{
    return v2s( val, {
        fromArray: v => v[0] + " " + LengthMath.s2s( v[1])
    });
}



/**
 * Converts cursor style to its CSS string value.
 */
function cursorToString( val: Extended<Cursor_StyleType>): string
{
    // the value can be either a string or a function or an array. If it is an array,
    // if the first element is a function, then we need to use space as a separator (because
    // this is a URL with optional numbers for the hot spot); otherwise, we use comma as a
    // separator - because these are multiple cursor definitions.
    return v2s( val, {
        fromArray: v => {
            if (v.length === 0)
                return "";
            else if (v.length === 1)
                return v2s(v);
            else if (typeof v[1] === "number")
                return v2s( v, { arrSep: " "})
            else
            {
                return v2s( v, {
                    arrItemFunc: cursorToString,
                    arrSep: ","
                })
            }
        }
    });
}



/**
 * Converts flex style value to the CSS string.
 */
function flexToString( val: Extended<Flex_StyleType>): string
{
    return v2s( val, {
        fromArray: v =>
        {
            if (v.length === 2)
                return v.join( " ");
            else
                return v[0] + " " + v[1] + " " + LengthMath.s2s( v[2]);
        },
        fromAny: LengthMath.s2s
    });
}



function font_fromObject( val: any): string
{
    return styleObj2String( val, [
        ["style", fontStyleToString],
        "variant",
        "weight",
        "stretch",
        ["size", LengthMath.s2s],
        ["lineHeight", null, "/"],
        "family"
    ]);
}



function fontStyleToString( val: Extended<Font_StyleType>): string
{
    return v2s( val, {
        fromNumber: v => "oblique " + AngleMath.s2s( v)
    });
}



function gridTemplateAreasToString( val: Extended<GridTemplateAreas_StyleType>): string
{
    // val can be array of functions (IQuotedProxy[]) or arrays (GridTemplateArea_Definition[])
    return v2s( val, {
        fromArray: v => {
            if (v.length === 0)
                return "";
            else if (typeof v[0] === "function")
                return arr2str( v);
            else
                return createGridTemplateAreasFromDefinitions(v);
        }
    });
}



/**
 * Converts the array of GridTemplateArea_Definition objects to a string that is suitable for
 * the grid-template-areas format.
 */
function createGridTemplateAreasFromDefinitions( defs: GridTemplateArea_Definition[]): string
{
    // calculate total size of the matrix from the areas' sizes
    let rowCount = 0, colCount = 0;
    for( let def of defs)
    {
        rowCount = Math.max( rowCount, def[3]);
        colCount = Math.max( colCount, def[4]);
    }

    if (rowCount === 0 || colCount === 0)
        return "";

    // create array of rows where every element is an array of cells
    let matrix = new Array<string[]>(rowCount);
    for( let i = 0; i < rowCount; i++)
        matrix[i] = new Array<string>(colCount);

    // go over definitions and fill the appropriate places in the cells with area names
    for( let def of defs)
    {
        let name = v2s( def[0]);
        for( let i = def[1]; i <= def[3]; i++)
        {
            for( let j = def[2]; j <= def[4]; j++)
                matrix[i-1][j-1] = name;
        }
    }

    // go over our matrix and for every row create a quoted string. Since our cell arrays may be
    // sparse, use dot for the undefined cells
    let s = "";
    for( let i = 0; i < rowCount; i++)
    {
        let rowNames: string[] = [];
        for( let j = 0; j < rowCount; j++)
        {
            let name = matrix[i][j];
            rowNames.push( name ? name : ".")
        }

        s += `"${rowNames.join(" ")}"\n`;
    }

    return s;
}



export function gridTrackToString( val: GridTrack): string
{
    return v2s( val, {
        fromNumber: v => LengthMath.s2s( v),
        fromArray: v => `[${arr2str(v)}]`
    });
}



function gridAxisToString( val: Extended<GridTemplateAxis_StyleType>): string
{
    return v2s( val, {
        fromNumber: v => LengthMath.s2s( v),
        arrItemFunc: gridTrackToString
    });
}



function markerStyleToString( val: Extended<Marker_StyleType>): string
{
    return v2s( val, {
        fromObj: v => `url(#${(val as IIDRule).name})`
    });
}



function rotateToString( val:Rotate_StyleType): string
{
    return v2s( val, {
        fromNumber: AngleMath.s2s,
        fromArray: v => {
            if (v.length === 2)
                return `${v[0]} ${AngleMath.s2s(v[1])}`;
            else
                return `${v[0]} ${v[1]} ${v[2]} ${AngleMath.s2s(v[3])}`;
        }
    });
}

function textDecoration_fromObject( val: Extended<TextDecoration_StyleType>): string
{
    return styleObj2String( val, [
        "line",
        "style",
        ["color", colorToString],
        ["thickness", LengthMath.s2s],
    ]);
}



function singleTransition_fromObject( val: Extended<Transition_Single>): string
{
    return styleObj2String( val, [
        ["property", camelToDash],
        ["duration", TimeMath.s2s],
        ["func", singleTimingFunction_fromStyle],
        ["delay", TimeMath.s2s]
    ]);
}



function singleTransition_fromStyle( val: Extended<Transition_Single>): string
{
    return v2s( val, {
        fromObj: singleTransition_fromObject
    });
}



function offsetToString( val: Offset_StyleType): string
{
    return styleObj2String( val, [
        ["position", "offsetPosition"],
        ["path", "offsetPath"],
        ["distance", "offsetDistance"],
        ["rotate", "offsetRotate"],
        ["anchor", "offsetAnchor", "/"],
    ]);
}



function filter_fromObject( val: FilterFunc): string
{
    switch (val.fn)
    {
        case "brightness":
        case "contrast":
        case "grayscale":
        case "invert":
        case "opacity":
        case "saturate":
        case "sepia":
            return funcObj2String( val, [["p", WellKnownFunc.Percent]]);

        case "blur":
            return funcObj2String( val, [["r", WellKnownFunc.Length]]);

        case "drop-shadow":
            return 	`drop-shadow(${singleBoxShadow_fromObject( val)})`;

        case "hue-rotate":
            return funcObj2String( val, [["a", WellKnownFunc.Angle]]);

        default: return "";
    }
}



function transform_fromObject( val: TransformFunc): string
{
    switch (val.fn)
    {
        case "matrix":
            return funcObj2String( val, ["a","b","c","d","tx","ty"]);
        case "matrix3d":
            return funcObj2String( val, ["a1","b1","c1","d1","a2","b2","c2","d2","a3","b3","c3","d3","a4","b4","c4","d4"]);

        case "perspective":
            return funcObj2String( val, [["a", WellKnownFunc.Length]]);

        case "rotate":
        case "rotateX":
        case "rotateY":
        case "rotateZ":
            return funcObj2String( val, [["a", WellKnownFunc.Angle]]);
        case "rotate3d":
            return funcObj2String( val, [ "x", "y", "z", ["a", WellKnownFunc.Angle] ]);

        case "scaleX":
        case "scaleY":
        case "scaleZ":
            return funcObj2String( val, ["s"]);
        case "scale":
        case "scale3d":
            return funcObj2String( val, ["sx", "sy", "sz"]);

        case "skewX":
        case "skewY":
            return funcObj2String( val, [["a", WellKnownFunc.Angle]]);
        case "skew":
            return funcObj2String( val, [ ["ax", WellKnownFunc.Angle], ["ay", WellKnownFunc.Angle] ]);

        case "translateX":
        case "translateY":
        case "translateZ":
            return funcObj2String( val, [["d", WellKnownFunc.Length]]);
        case "translate":
        case "translate3d":
            return funcObj2String( val, [ ["x", WellKnownFunc.Length], ["y", WellKnownFunc.Length], ["z", WellKnownFunc.Length] ]);

        default: return "";
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for handling Stylesets.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Merges properties from the source styleset to the target styleset. All regular properties are
 * replaced. The "--" property gets special treatment because it is an array.
 * @param target
 * @param source
 * @returns Reference to the target styleset if not null or a new styleset otherwise.
 */
export function mergeStylesets( target: Styleset | undefined | null,
    source: Styleset): Styleset
{
    if (!source)
        return target ? target : {};

    // if target is not defined, create it as an empty object. This object will be returned after
    // properties from the source are copied to it.
    if (!target)
    {
        target = {};
        Object.assign( target, source);
        return target;
    }

    // check whether custom properties are defined. If not, we can just use the Object.assign function.
    let sourceCustomProps = source["--"];
    if (!sourceCustomProps)
    {
        Object.assign( target, source);
        return target;
    }

    // merge custom and important properties
    mergeStylesetCustomProps( target, source);

    // copy all other properties from the source
	for( let propName in source)
	{
        if (propName === "!" || propName === "--")
            continue;
        else
            target[propName] = source[propName];
	}

    return target;
}



/**
 * Merges "--" property from the source styleset to the target styleset.
 */
export function mergeStylesetCustomProps( target: Styleset, source: Styleset): void
{
    // check whether custom properties and important properties are defined
    let sourceCustomProps = source["--"];
    if (!sourceCustomProps)
        return;

    // merge custom properties
    if (sourceCustomProps)
    {
        let targetCustomProps = target["--"];
        target["--"] = !targetCustomProps ? sourceCustomProps.slice() : targetCustomProps.concat( sourceCustomProps);
    }
}



/** Converts the given styleset to its string representation */
export function stylesetToString( styleset: Styleset): string
{
    if (!styleset)
        return "";

    let s = "";

	forAllPropsInStylset( styleset, (name: string, value: string, isCustom: boolean): void => {
        if (isCustom)
            s += `${name}:${value};`;
        else
            s += `${camelToDash(name)}:${value};`;
    });

    return s;
}



/**
 * Extracts name and string values from the given custom CSS property definition.
 * @param customVal
 */
export function getCustomPropNameAndValue( customVal: CustomVar_StyleType): [string?,string?]
{
    if (!customVal)
        return [];

    let varName: string;
    let template: string;
    let value: any;
    if (customVal.length === 2)
    {
        varName = (customVal[0] as VarRule).cssName;
        template = customVal[0].template;
        value = customVal[1]
    }
    else
    {
        varName = customVal[0];
        if (!varName)
            return [];
        else if (!varName.startsWith("--"))
            varName = "--" + varName;

        template = customVal[1];
        if (!varName || !template)
            return [];

        value = customVal[2];
    }

    return [varName, stylePropToString( template, value, true)];
}



/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
export function stylePropToString( propName: string, propVal: any, valueOnly?: boolean): string
{
    if (!propName)
        return "";

    // find information object for the property
    let info: any = stylePropertyInfos[dashToCamel(propName)];

    // if the property value is an object with the "!" property, then the actual value is the
    // value of this property and we also need to set the "!important" flag
    let varValue = propVal;
    let impFlag = false;
    if (typeof propVal === "object" && "!" in propVal)
    {
        varValue = propVal["!"];
        impFlag = true;
    }

    let stringValue = !info
        ? v2s( varValue)
        : typeof info === "object"
            ? v2s( varValue, info as IValueConvertOptions)
            : typeof info === "number"
                ? valueToStringByWellKnownFunc( varValue, info)
                : (info as ToStringFunc)( varValue);

    if (!stringValue && !valueOnly)
        stringValue = "initial";

    if (impFlag)
        stringValue += " !important";

    return valueOnly ? stringValue : `${camelToDash( propName)}:${stringValue}`;
}



/**
 * For each property - regular and custom - in the given styleset invokes the appropriate
 * function that gets the property name and the value converted to string.
 * @param styleset
 * @param forProp
 */
export function forAllPropsInStylset( styleset: Styleset,
    forProp: (name: string, val: string, isCustom: boolean) => void)
{
	for( let propName in styleset)
	{
		if (propName === "--")
		{
			// special handling of the "--" property, which is an array where each item is
			// a two-item or three-item array
			let propVal = styleset[propName] as CustomVar_StyleType[];
			for( let customVal of propVal)
			{
				if (!customVal)
					continue;

				let [varName, varValue] = getCustomPropNameAndValue( customVal);
				if (!varName)
					continue;
				if (varValue == null)
					varValue = "";

				forProp( varName, varValue, true);
			}
		}
		else
		{
			// get the string representation of the property
            forProp( propName, stylePropToString( propName, styleset[propName], true), false);
		}
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

type StylePropertyInfo = WellKnownFunc | ToStringFunc | IValueConvertOptions;

export function s_registerStylePropertyInfo( name: string, toStringFunc: ToStringFunc)
{
    if (name in stylePropertyInfos)
        return false;
    else
    {
        stylePropertyInfos[name] = toStringFunc;
        return true;
    }
}

/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const stylePropertyInfos: { [K in VarTemplateName]?: StylePropertyInfo } =
{
    animation: {
        fromObj: singleAnimation_fromObject,
        fromAny: singleAnimation_fromStyle,
        arrSep: ",",
    },
    animationDelay: WellKnownFunc.MultiTimeWithComma,
    animationDuration: WellKnownFunc.MultiTimeWithComma,
    animationIterationCount: WellKnownFunc.ArrayWithComma,
    animationFillMode: WellKnownFunc.ArrayWithComma,
    animationName: WellKnownFunc.ArrayWithComma,
    animationPlayState: WellKnownFunc.ArrayWithComma,
    animationTimingFunction: timingFunctionToString,

    background: {
        fromNumber: colorToString,
        fromObj: singleBackground_fromObject,
        fromAny: singleBackground_fromStyle,
        arrItemFunc: singleBackground_fromStyle,
        arrSep: ",",
    },
    backgroundAttachment: WellKnownFunc.ArrayWithComma,
    backgroundBlendMode: WellKnownFunc.ArrayWithComma,
    backgroundClip: WellKnownFunc.ArrayWithComma,
    backgroundColor: WellKnownFunc.Color,
    backgroundImage: WellKnownFunc.ArrayWithComma,
    backgroundOrigin: WellKnownFunc.ArrayWithComma,
    backgroundPosition: v => multiPos2str( v, ","),
    backgroundPositionX: v => multiPos2str( v, ","),
    backgroundPositionY: v => multiPos2str( v, ","),
    backgroundRepeat: WellKnownFunc.ArrayWithComma,
    backgroundSize: {
        fromNumber: LengthMath.s2s,
        arrItemFunc: singleBackgroundSize_fromStyle,
        arrSep: ","
    },
    baselineShift: WellKnownFunc.Length,
    blockSize: WellKnownFunc.Length,
    border: WellKnownFunc.Border,
    borderBlock: WellKnownFunc.Border,
    borderBlockEnd: WellKnownFunc.Border,
    borderBlockEndColor: WellKnownFunc.Color,
    borderBlockEndWidth: WellKnownFunc.Length,
    borderBlockStart: WellKnownFunc.Border,
    borderBlockStartColor: WellKnownFunc.Color,
    borderBlockStartWidth: WellKnownFunc.Length,
    borderBottom: WellKnownFunc.Border,
    borderBottomColor: WellKnownFunc.Color,
    borderBottomLeftRadius: WellKnownFunc.CornerRadius,
    borderBottomRightRadius: WellKnownFunc.CornerRadius,
    borderBottomWidth: WellKnownFunc.Length,
    borderColor: {
        fromAny: colorToString
    },
    borderImage: {
        fromObj: borderImageToString,
    },
    borderImageSlice: borderImageSliceToString,
    borderInline: WellKnownFunc.Border,
    borderInlineEnd: WellKnownFunc.Border,
    borderInlineEndColor: WellKnownFunc.Color,
    borderInlineEndWidth: WellKnownFunc.Length,
    borderInlineStart: WellKnownFunc.Border,
    borderInlineStartColor: WellKnownFunc.Color,
    borderInlineStartWidth: WellKnownFunc.Length,
    borderLeft: WellKnownFunc.Border,
    borderLeftColor: WellKnownFunc.Color,
    borderLeftWidth: WellKnownFunc.Length,
    borderRadius: borderRadiusToString,
    borderRight: WellKnownFunc.Border,
    borderRightColor: WellKnownFunc.Color,
    borderRightWidth: WellKnownFunc.Length,
    borderSpacing: WellKnownFunc.MultiLengthWithSpace,
    borderTop: WellKnownFunc.Border,
    borderTopColor: WellKnownFunc.Color,
    borderTopLeftRadius: WellKnownFunc.CornerRadius,
    borderTopRightRadius: WellKnownFunc.CornerRadius,
    borderTopWidth: WellKnownFunc.Length,
    borderWidth: WellKnownFunc.MultiLengthWithSpace,
    bottom: WellKnownFunc.Length,
    boxShadow: {
        fromObj: singleBoxShadow_fromObject,
        arrSep: ",",
    },

    caretColor: WellKnownFunc.Color,
    clip:  {
        fromArray: v => `rect(${multiLengthToStringWithSpace(v)}`
    },
    color: WellKnownFunc.Color,
    columnGap: WellKnownFunc.Length,
    columnRule: WellKnownFunc.Border,
    columnRuleColor: WellKnownFunc.Color,
    columnRuleWidth: WellKnownFunc.MultiLengthWithSpace,
    columns: columnsToString,
    columnWidth: WellKnownFunc.Length,
    cursor: cursorToString,

    fill: WellKnownFunc.Color,
    fillOpacity: PercentMath.s2s,
    filter: {
        fromAny: filter_fromObject,
    },
    flex: flexToString,
    flexBasis: WellKnownFunc.Length,
    floodColor: WellKnownFunc.Color,
    font: {
        fromObj: font_fromObject
    },
    fontSize: WellKnownFunc.Length,
    fontStyle: fontStyleToString,

    gap: WellKnownFunc.MultiLengthWithSpace,
    gridColumnGap: WellKnownFunc.Length,
    gridGap: WellKnownFunc.MultiLengthWithSpace,
    gridRowGap: WellKnownFunc.Length,
    gridArea: WellKnownFunc.ArrayWithSlash,
    gridAutoColumns: WellKnownFunc.GridAxis,
    gridAutoRows: WellKnownFunc.GridAxis,
    gridColumn: WellKnownFunc.ArrayWithSlash,
    gridRow: WellKnownFunc.ArrayWithSlash,
    gridTemplateAreas: gridTemplateAreasToString,
    gridTemplateColumns: WellKnownFunc.GridAxis,
    gridTemplateRows: WellKnownFunc.GridAxis,

    height: WellKnownFunc.Length,

    inlineSize: WellKnownFunc.Length,

    left: WellKnownFunc.Length,
    letterSpacing: WellKnownFunc.Length,
    lightingColor: WellKnownFunc.Color,

    margin: WellKnownFunc.MultiLengthWithSpace,
    marginBlock: WellKnownFunc.MultiLengthWithSpace,
    marginBlockEnd: WellKnownFunc.Length,
    marginBlockStart: WellKnownFunc.Length,
    marginBottom: WellKnownFunc.Length,
    marginInline: WellKnownFunc.MultiLengthWithSpace,
    marginInlineEnd: WellKnownFunc.Length,
    marginInlineStart: WellKnownFunc.Length,
    marginLeft: WellKnownFunc.Length,
    marginRight: WellKnownFunc.Length,
    marginTop: WellKnownFunc.Length,
    markerEnd: markerStyleToString,
    markerMid: markerStyleToString,
    markerStart: markerStyleToString,
    maxBlockSize: WellKnownFunc.Length,
    maxHeight: WellKnownFunc.Length,
    maxInlineSize: WellKnownFunc.Length,
    maxWidth: WellKnownFunc.Length,
    minBlockSize: WellKnownFunc.Length,
    minHeight: WellKnownFunc.Length,
    minInlineSize: WellKnownFunc.Length,
	minWidth: WellKnownFunc.Length,

    objectPosition: WellKnownFunc.Position,
    offset: offsetToString,
    offsetAnchor: WellKnownFunc.Position,
    offsetDistance: WellKnownFunc.Length,
    offsetPosition: WellKnownFunc.Position,
    offsetRotate: {
        fromAny: AngleMath.s2s
    },
    outline: WellKnownFunc.Border,
    outlineColor: WellKnownFunc.Color,
    outlineOffset: WellKnownFunc.Length,

    padding: WellKnownFunc.MultiLengthWithSpace,
    paddingBlock: WellKnownFunc.MultiLengthWithSpace,
    paddingBlockEnd: WellKnownFunc.Length,
    paddingBlockStart: WellKnownFunc.Length,
    paddingBottom: WellKnownFunc.Length,
    paddingInline: WellKnownFunc.MultiLengthWithSpace,
    paddingInlineEnd: WellKnownFunc.Length,
    paddingInlineStart: WellKnownFunc.Length,
    paddingLeft: WellKnownFunc.Length,
    paddingRight: WellKnownFunc.Length,
    paddingTop: WellKnownFunc.Length,
    perspective: WellKnownFunc.Length,
    perspectiveOrigin: {
        fromAny: LengthMath.s2s
    },

    quotes: {
        arrItemFunc: v => `"${v}"`
    },

    right: WellKnownFunc.Length,
    rotate: rotateToString,
    rowGap: WellKnownFunc.Length,

    scrollbarColor: {
        arrItemFunc: colorToString
    },
    scrollMargin: WellKnownFunc.MultiLengthWithSpace,
    scrollMarginBlock: WellKnownFunc.MultiLengthWithSpace,
    scrollMarginBlockEnd: WellKnownFunc.Length,
    scrollMarginBlockStart: WellKnownFunc.Length,
    scrollMarginBottom: WellKnownFunc.Length,
    scrollMarginInline: WellKnownFunc.MultiLengthWithSpace,
    scrollMarginInlineEnd: WellKnownFunc.Length,
    scrollMarginInlineStart: WellKnownFunc.Length,
    scrollMarginLeft: WellKnownFunc.Length,
    scrollMarginRight: WellKnownFunc.Length,
    scrollMarginTop: WellKnownFunc.Length,
    scrollPadding: WellKnownFunc.MultiLengthWithSpace,
    scrollPaddingBlock: WellKnownFunc.MultiLengthWithSpace,
    scrollPaddingBlockEnd: WellKnownFunc.Length,
    scrollPaddingBlockStart: WellKnownFunc.Length,
    scrollPaddingBottom: WellKnownFunc.Length,
    scrollPaddingInline: WellKnownFunc.MultiLengthWithSpace,
    scrollPaddingInlineEnd: WellKnownFunc.Length,
    scrollPaddingInlineStart: WellKnownFunc.Length,
    scrollPaddingLeft: WellKnownFunc.Length,
    scrollPaddingRight: WellKnownFunc.Length,
    scrollPaddingTop: WellKnownFunc.Length,
    shapeMargin: WellKnownFunc.Length,
    stopColor: WellKnownFunc.Color,
    stroke: WellKnownFunc.Color,

    tabSize: WellKnownFunc.Length,
    textCombineUpright: {
        fromNumber: v => `digits ${v}`
    },
    textDecoration: {
        fromNumber: colorToString,
        fromObj: textDecoration_fromObject
    },
    textDecorationColor: WellKnownFunc.Color,
    textDecorationThickness: WellKnownFunc.Length,
    textEmphasis: {
        fromAny: colorToString
    },
    textEmphasisColor: WellKnownFunc.Color,
    textIndent: {
        fromAny: LengthMath.s2s
    },
    textShadow: {
        fromObj: singleBoxShadow_fromObject,
        arrSep: ",",
    },
    textSizeAdjust: PercentMath.s2s,
    top: WellKnownFunc.Length,
    transform: {
        fromAny: transform_fromObject
    },
    transformOrigin: {
        fromAny: LengthMath.s2s
    },
    transition: {
        fromObj: singleTransition_fromObject,
        fromAny: singleTransition_fromStyle,
        arrSep: ",",
    },
    transitionDelay: WellKnownFunc.MultiTimeWithComma,
    transitionDuration: WellKnownFunc.MultiTimeWithComma,
    transitionTimingFunction: timingFunctionToString,
    translate: {
        fromAny: LengthMath.s2s
    },

    verticalAlign: WellKnownFunc.Length,

    width: WellKnownFunc.Length,
    willChange: {
        fromString: camelToDash
    },
    wordSpacing: WellKnownFunc.Length,

    zoom: PercentMath.s2s,

    // special properties for IVarRule types
    CssLength: WellKnownFunc.Length,
    CssAngle: AngleMath.s2s,
    CssTime: TimeMath.s2s,
    CssResolution: ResolutionMath.s2s,
    CssFrequency: FrequencyMath.s2s,
    CssPercent: PercentMath.s2s,
    CssPosition: WellKnownFunc.Position,
    CssRadius: WellKnownFunc.CornerRadius,
    CssColor: WellKnownFunc.Color,
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS supports query.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given supports query to its string representation */
export function supportsQueryToString( query: SupportsQuery): string
{
    return v2s( query, {
        fromAny: singleSupportsQueryToString,
        arrSep: " or "
    });
}



/** Converts the given supports query to its string representation */
export function singleSupportsQueryToString( query: SingleSupportsQuery): string
{
    return v2s( query, {
        fromObj: (v: ExtendedStyleset & { $negate?: boolean; }) => {
            let propNames = Object.keys( v).filter( (propName) => propName != "$negate");
            if (propNames.length === 0)
                return "";

            let not = v.$negate ? "not" : "";
            return  `${not} (${propNames.map( (propName) =>
                stylePropToString( propName as keyof ExtendedStyleset, query[propName])).join( ") and (")})`;
        }
    });
}



