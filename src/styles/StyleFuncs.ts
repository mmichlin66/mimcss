import * as StyleTypes from "./StyleTypes"
import {ExtendedStyleset} from "./StyleTypes"
import {Extended, CssRadius, OneOrMany, CssMultiLength, CssMultiTime} from "./UtilTypes";
import {
    camelToDash, dashToCamel, val2str, arr2str, IValueConvertOptions,
    pos2str, multiPos2str, CssLengthMath, CssTimeMath, CssNumberMath,
    CssAngleMath, CssFrequencyMath, CssPercentMath, CssResolutionMath, unitlessOrPercentToString,
} from "./UtilFuncs"
import {colorToString} from "./ColorFuncs";
import {VarRule} from "../rules/VarRule";
import { IIDRule } from "../rules/RuleTypes";



function multiLengthToStringWithSpace( val: Extended<CssMultiLength>): string
{ return CssLengthMath.multiStyleToString( val, " "); }

function multiTimeToStringWithComma( val: Extended<CssMultiTime>): string
{ return CssTimeMath.multiStyleToString( val, ","); }


///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for converting CSS property types to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

function singleAnimation_fromObject( val: StyleTypes.Animation_Single): string
{
    return obj2str( val, [
        ["duration", CssTimeMath.styleToString],
        ["func", singleTimingFunction_fromStyle],
        ["delay", CssTimeMath.styleToString],
        ["count", CssNumberMath.styleToString],
        "direction",
        "mode",
        "state",
        "name"
    ]);
}



function singleAnimation_fromStyle( val: Extended<StyleTypes.Animation_Single>): string
{
    return val2str( val, {
        fromObj: singleAnimation_fromObject
    });
}



function timingFunctionToString( val: Extended<OneOrMany<StyleTypes.TimingFunction_Single>>): string
{
    return val2str( val, {
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
        ? singleTimingFunction_fromStyle( val as StyleTypes.TimingFunction_Single)
        : arr2str( val, singleTimingFunction_fromStyle, ",");
}



function singleTimingFunction_fromStyle( val: Extended<StyleTypes.TimingFunction_Single>): string
{
    return val2str( val, {
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



function singleBackground_fromObject( val: StyleTypes.Background_Single): string
{
    return obj2str( val, [
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



function singleBackground_fromStyle( val: Extended<StyleTypes.Background_Single>): string
{
    return val2str( val, {
        fromNumber: colorToString,
        fromObj: singleBackground_fromObject
    });
}



function singleBackgroundSize_fromStyle( val: Extended<StyleTypes.BackgroundSize_Single>): string
{
    return val2str( val, {
        fromNumber: CssLengthMath.styleToString,
        fromArray: multiLengthToStringWithSpace
    });
}



/**
 * Converts border image style value to the CSS string.
 */
function borderImageToString( val: StyleTypes.BorderImage_Object): string
{
    // if width is specified, but slice is not, we need to set slice to the default 100% value;
    // if outset is specified but width is not. we need to set width to the default 1 value;
    let valCopy: StyleTypes.BorderImage_Object = Object.assign( {}, val);
    if (val.slice == null && (val.width != null || val.outset != null))
        valCopy.slice = "100%";
    if (val.width == null && val.outset != null)
        valCopy.width = 1;

    return obj2str( valCopy, [
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
function borderImageSliceToString( val: Extended<StyleTypes.BorderImageSlice_StyleType>): string
{
    return val2str( val, {
        fromNumber: unitlessOrPercentToString,
        arrFunc: v => val2str( v, {
            fromBool: () => "fill",
            fromNumber: unitlessOrPercentToString,
        })
    });
}



export function singleBoxShadow_fromObject( val: StyleTypes.BoxShadow_Single): string
{
    return obj2str( val, [
        ["inset", v => v ? "inset" : ""],
        ["x", CssLengthMath.styleToString],
        ["y", CssLengthMath.styleToString],
        ["blur", CssLengthMath.styleToString],
        ["spread", CssLengthMath.styleToString],
        ["color", colorToString]
    ]);
}



/**
 * Converts corner radius style value to the CSS string.
 */
function singleCornerRadiusToString( val: Extended<CssRadius>): string
{
    return val2str( val, {
        arrFunc: CssLengthMath.styleToString,
        fromAny: CssLengthMath.styleToString
    });
}



/**
 * Converts border radius style value to the CSS string.
 */
export function borderRadiusToString( val: Extended<StyleTypes.BorderRadius_StyleType>): string
{
    return val2str( val, {
        fromArray: v =>
        {
            if (Array.isArray( v[0]))
            {
                // two MultiCornerRadius values
                let s = arr2str( v[0], CssLengthMath.styleToString, " ");
                s += " / ";
                return s + arr2str( v[1], CssLengthMath.styleToString, " ");
            }
            else
            {
                // single MultiCornerRadius value
                return arr2str( v, CssLengthMath.styleToString, " ");
            }
        },
        fromAny: CssLengthMath.styleToString
    });
}



/**
 * Converts border side style value to the CSS string.
 */
function borderToString( val: Extended<StyleTypes.Border_StyleType>): string
{
    return val2str( val, {
        fromNumber: CssLengthMath.styleToString,
        fromArray: v =>
        {
            let buf: string[] = [];
            if (v[0] != null)
                buf.push( CssLengthMath.styleToString( v[0]))

            if (v[1] != null)
                buf.push( val2str(v[1]));

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
function columnsToString( val: Extended<StyleTypes.Columns_StyleType>): string
{
    return val2str( val, {
        fromArray: v => v[0] + " " + CssLengthMath.styleToString( v[1])
    });
}



/**
 * Converts cursor style to its CSS string value.
 */
function cursorToString( val: Extended<StyleTypes.Cursor_StyleType>): string
{
    // the value can be either a string or a function or an array. If it is an array,
    // if the first element is a function, then we need to use space as a separator (because
    // this is a URL with optional numbers for the hot spot); otherwise, we use comma as a
    // separator - because these are multiple cursor definitions.
    return val2str( val, {
        fromArray: v => {
            if (v.length === 0)
                return "";
            else if (v.length === 1)
                return val2str(v);
            else if (typeof v[1] === "number")
                return val2str( v, { arrSep: " "})
            else
            {
                return val2str( v, {
                    arrFunc: cursorToString,
                    arrSep: ","
                })
            }
        }
    });
}



/**
 * Converts flex style value to the CSS string.
 */
function flexToString( val: Extended<StyleTypes.Flex_StyleType>): string
{
    return val2str( val, {
        fromArray: v =>
        {
            if (v.length === 2)
                return v.join( " ");
            else
                return v[0] + " " + v[1] + " " + CssLengthMath.styleToString( v[2]);
        },
        fromAny: CssLengthMath.styleToString
    });
}



function font_fromObject( val: any): string
{
    return obj2str( val, [
        ["style", fontStyleToString],
        "variant",
        "weight",
        "stretch",
        ["size", CssLengthMath.styleToString],
        ["lineHeight", null, "/"],
        "family"
    ]);
}



function fontStyleToString( val: Extended<StyleTypes.Font_StyleType>): string
{
    return val2str( val, {
        fromNumber: v => "oblique " + CssAngleMath.styleToString( v)
    });
}



function markerStyleToString( val: Extended<StyleTypes.Marker_StyleType>): string
{
    return val2str( val, {
        fromObj: v => `url(#${(val as IIDRule).name})`
    });
}



function rotateToString( val:StyleTypes.Rotate_StyleType): string
{
    return val2str( val, {
        fromArray: v => {
            if (v.length === 2)
                return `${v[0]} ${CssAngleMath.styleToString(v[1])}`;
            else
                return `${v[0]} ${v[1]} ${v[2]} ${CssAngleMath.styleToString(v[3])}`;
        }
    });
}

function textDecoration_fromObject( val: Extended<StyleTypes.TextDecoration_StyleType>): string
{
    return obj2str( val, [
        "line",
        "style",
        ["color", colorToString],
        ["thickness", CssLengthMath.styleToString],
    ]);
}



function singleTransition_fromObject( val: Extended<StyleTypes.Transition_Single>): string
{
    return obj2str( val, [
        ["property", camelToDash],
        ["duration", CssTimeMath.styleToString],
        ["func", singleTimingFunction_fromStyle],
        ["delay", CssTimeMath.styleToString]
    ]);
}



function singleTransition_fromStyle( val: Extended<StyleTypes.Transition_Single>): string
{
    return val2str( val, {
        fromObj: singleTransition_fromObject
    });
}



function offsetToString( val: StyleTypes.Offset_StyleType): string
{
    return obj2str( val, [
        ["position", "offsetPosition"],
        ["path", "offsetPath"],
        ["distance", "offsetDistance"],
        ["rotate", "offsetRotate"],
        ["anchor", "offsetAnchor", "/"],
    ]);
}



/** Type defnition of a function that takes a value and converts it to string */
export type ToStringFunc = (val: any) => string;




/**
 * Converts the given value to a CSS string using the info parameter to inform how the object's
 * properties should be converted to strings. The info parameter is an array of either strings
 * or two- or thre-element tuples. The only string and the first tuple element corresponds to a
 * property expected in the value object to be converted. Each property is converted according
 * to the following rules:
 * - If the array item is just a string, the corresponding value's property is converted using
 *   the valueToString function.
 * - If the second element is null or undefined, the corresponding value's property is converted using
 *   the valueToString function..
 * - If the second element is a string it is treated as a name of a longhand style property. The
 *   value's property is converted using the stylePropToString function for this longhand style
 *   property.
 * - If the second element is a function, it is used to convert the value's property.
 * - If a third element exists in the tuple it is treated as a prefix to be placed before the
 *   converted property value.
 * 
 * The order of the names determines in which order the properties should be added to the string.
 */
export function obj2str( val: any,
    info: (string | [string, null | string | ToStringFunc, string?] )[],
    separator: string = " "): string
{
    if (val == null)
        return "";
    else if (typeof val !== "object")
        return val.toString();

    let buf: (string)[] = [];
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
            buf.push( val2str( propVal));
        else if (typeof convertor === "string")
            buf.push( stylePropToString( convertor, propVal, true));
        else
            buf.push( convertor( propVal));
    });

	return buf.join(separator);
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
export function mergeStylesets( target: StyleTypes.Styleset | undefined | null,
    source: StyleTypes.Styleset): StyleTypes.Styleset
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
export function mergeStylesetCustomProps( target: StyleTypes.Styleset,
    source: StyleTypes.Styleset): void
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
export function stylesetToString( styleset: StyleTypes.Styleset): string
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
export function getCustomPropNameAndValue( customVal: StyleTypes.CustomVar_StyleType): [string?,string?]
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
    let info: any = StylePropertyInfos[dashToCamel(propName)];

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
        ? val2str( varValue)
        : typeof info === "object"
            ? val2str( varValue, info as IValueConvertOptions)
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
 * @param forCustomProp 
 */
export function forAllPropsInStylset( styleset: StyleTypes.Styleset,
    forProp: (name: string, val: any, isCustom: boolean) => void)
{
	for( let propName in styleset)
	{
		if (propName === "--")
		{
			// special handling of the "--" property, which is an array where each item is
			// a two-item or three-item array
			let propVal = styleset[propName] as StyleTypes.CustomVar_StyleType[];
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



/**
 * Numeric identifiers corresponding to well known functions used to convert style property values
 * to strings. This is used to reduce the size of the object used for mapping style properties to
 * conversion functions.
 * 
 * Note!!!: the order in the enumeration cannot be changed - otherwise, it will not be backwards
 * compatible. All new values must be appended at the end.
 */
const enum WellKnownFunc
{
    Length = 1,
    MultiLengthWithSpace,
    Color,
    Border,
    Position,
    CornerRadius,
}



/**
 * Converts the given value to string using a well-known function indicated by the given
 * enumeration value.
 * @param val 
 * @param funcType 
 */
function valueToStringByWellKnownFunc( val: any, funcType: WellKnownFunc): string
{
    switch( funcType)
    {
        case WellKnownFunc.Length: return CssLengthMath.styleToString( val);
        case WellKnownFunc.MultiLengthWithSpace: return multiLengthToStringWithSpace( val);
        case WellKnownFunc.Color: return colorToString( val);
        case WellKnownFunc.Border: return borderToString( val);
        case WellKnownFunc.Position: return pos2str( val);
        case WellKnownFunc.CornerRadius: return singleCornerRadiusToString( val);

        default: return "";
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Helper object that is used to indicate that values in an array should be separated by comma.
// We use it many times in the stucture below.
let commaArraySeparator = { arrSep: "," };



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in StyleTypes.VarTemplateName]?: (WellKnownFunc | ToStringFunc | IValueConvertOptions) } =
{
    animation: {
        fromObj: singleAnimation_fromObject,
        fromAny: singleAnimation_fromStyle,
        arrSep: ",",
    },
    animationDelay: multiTimeToStringWithComma,
    animationDuration: multiTimeToStringWithComma,
    animationIterationCount: commaArraySeparator,
    animationFillMode: commaArraySeparator,
    animationName: commaArraySeparator,
    animationPlayState: commaArraySeparator,
    animationTimingFunction: timingFunctionToString,

    background: {
        fromNumber: colorToString,
        fromObj: singleBackground_fromObject,
        fromAny: singleBackground_fromStyle,
        arrFunc: singleBackground_fromStyle,
        arrSep: ",",
    },
    backgroundAttachment: commaArraySeparator,
    backgroundBlendMode: commaArraySeparator,
    backgroundClip: commaArraySeparator,
    backgroundColor: WellKnownFunc.Color,
    backgroundOrigin: commaArraySeparator,
    backgroundPosition: v => multiPos2str( v, ","),
    backgroundRepeat: commaArraySeparator,
    backgroundSize: {
        fromNumber: CssLengthMath.styleToString,
        arrFunc: singleBackgroundSize_fromStyle,
        arrSep: ","
    },
    baselineShift: WellKnownFunc.Length,
    border: WellKnownFunc.Border,
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
        arrFunc: colorToString,
        fromAny: colorToString
    },
    borderImage: {
        fromObj: borderImageToString,
    },
    borderImageSlice: borderImageSliceToString,
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
    fillOpacity: CssPercentMath.styleToString,
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

    height: WellKnownFunc.Length,

    inlineSize: WellKnownFunc.Length,

    left: WellKnownFunc.Length,
    letterSpacing: WellKnownFunc.Length,
    lightingColor: WellKnownFunc.Color,

    margin: WellKnownFunc.MultiLengthWithSpace,
    marginBlockEnd: WellKnownFunc.Length,
    marginBlockStart: WellKnownFunc.Length,
    marginBottom: WellKnownFunc.Length,
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
        fromAny: CssAngleMath.styleToString
    },
    outline: WellKnownFunc.Border,
    outlineColor: WellKnownFunc.Color,
    outlineOffset: WellKnownFunc.Length,

    padding: WellKnownFunc.MultiLengthWithSpace,
    paddingBlockEnd: WellKnownFunc.Length,
    paddingBlockStart: WellKnownFunc.Length,
    paddingBottom: WellKnownFunc.Length,
    paddingInlineEnd: WellKnownFunc.Length,
    paddingInlineStart: WellKnownFunc.Length,
    paddingLeft: WellKnownFunc.Length,
    paddingRight: WellKnownFunc.Length,
    paddingTop: WellKnownFunc.Length,
    perspective: WellKnownFunc.Length,
    perspectiveOrigin: {
        fromAny: CssLengthMath.styleToString
    },

    quotes: {
        arrFunc: v => `"${v}"`
    },

    right: WellKnownFunc.Length,
    rotate: rotateToString,
    rowGap: WellKnownFunc.Length,

    scrollbarColor: {
        arrFunc: colorToString
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
        arrFunc: colorToString
    },
    textEmphasisColor: WellKnownFunc.Color,
    textIndent: {
        fromNumber: CssLengthMath.styleToString,
        arrFunc: CssLengthMath.styleToString
    },
    textShadow: {
        fromObj: singleBoxShadow_fromObject,
        arrSep: ",",
    },
    textSizeAdjust: CssPercentMath.styleToString,
    top: WellKnownFunc.Length,
    transformOrigin: {
        fromAny: CssLengthMath.styleToString
    },
    transition: {
        fromObj: singleTransition_fromObject,
        fromAny: singleTransition_fromStyle,
        arrSep: ",",
    },
    transitionDelay: {
        fromAny: CssTimeMath.styleToString,
        arrSep: ","
    },
    transitionDuration: {
        fromAny: CssTimeMath.styleToString,
        arrSep: ","
    },
    transitionTimingFunction: timingFunctionToString,
    translate: {
        fromAny: CssLengthMath.styleToString
    },

    verticalAlign: {
        fromNumber: CssLengthMath.styleToString
    },

    width: WellKnownFunc.Length,
    willChange: {
        fromString: camelToDash
    },
    wordSpacing: WellKnownFunc.Length,

    zoom: CssPercentMath.styleToString,

    // special properties for IVarRule types
    "CssLength": WellKnownFunc.Length,
    "CssAngle": CssAngleMath.styleToString,
    "CssTime": CssTimeMath.styleToString,
    "CssResolution": CssResolutionMath.styleToString,
    "CssFrequency": CssFrequencyMath.styleToString,
    "CssPercent": CssPercentMath.styleToString,
    "CssPosition": WellKnownFunc.Position,
    "CssColor": WellKnownFunc.Color,
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS supports query.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given supports query to its string representation */
export function supportsQueryToString( query: StyleTypes.SupportsQuery): string
{
    if (!query)
        return "";
    else if (typeof query === "string")
        return query;
    else if (Array.isArray( query))
        return query.map( (singleQuery) => singleSupportsQueryToString( singleQuery)).join(" or ");
    else
        return singleSupportsQueryToString( query);
}



/** Converts the given supports query to its string representation */
export function singleSupportsQueryToString( query: StyleTypes.SingleSupportsQuery): string
{
    if (!query)
        return "";
    else if (typeof query === "string")
        return query;

    let propNames = Object.keys( query).filter( (propName) => propName != "$negate");
    if (propNames.length === 0)
        return "";

    let not = query.$negate ? "not" : "";
    return  `${not} (${propNames.map( (propName) =>
        stylePropToString( propName as keyof ExtendedStyleset, query[propName])).join( ") and (")})`;
}



