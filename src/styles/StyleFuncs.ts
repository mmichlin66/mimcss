import * as StyleTypes from "./StyleTypes"
import {ExtendedStyleset} from "./StyleTypes"
import {Extended, CssRadius, OneOrMany, CssMultiLength, CssMultiTime} from "./UtilTypes";
import {
    camelToDash, dashToCamel, valueToString, arrayToString, IValueConvertOptions,
    positionToString, multiPositionToString, CssLengthMath, CssTimeMath, CssNumberMath,
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
    return objectToString( val, [
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
    return valueToString( val, {
        fromObject: singleAnimation_fromObject
    });
}



function timingFunctionToString( val: Extended<OneOrMany<StyleTypes.TimingFunction_Single>>): string
{
    return valueToString( val, {
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
        : arrayToString( val, singleTimingFunction_fromStyle, ",");
}



function singleTimingFunction_fromStyle( val: Extended<StyleTypes.TimingFunction_Single>): string
{
    return valueToString( val, {
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
    return objectToString( val, [
        ["color", colorToString],
        "image",
        ["position", positionToString],
        ["size", multiLengthToStringWithSpace, "/"],
        "repeat",
        "attachment",
        "origin",
        "clip"
    ]);
}



function singleBackground_fromStyle( val: Extended<StyleTypes.Background_Single>): string
{
    return valueToString( val, {
        fromNumber: colorToString,
        fromObject: singleBackground_fromObject
    });
}



function singleBackgroundSize_fromStyle( val: Extended<StyleTypes.BackgroundSize_Single>): string
{
    return valueToString( val, {
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

    return objectToString( valCopy, [
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
    return valueToString( val, {
        fromNumber: unitlessOrPercentToString,
        arrayItemFunc: v => valueToString( v, {
            fromBool: () => "fill",
            fromNumber: unitlessOrPercentToString,
        })
    });
}



export function singleBoxShadow_fromObject( val: StyleTypes.BoxShadow_Single): string
{
    return objectToString( val, [
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
    return valueToString( val, {
        arrayItemFunc: CssLengthMath.styleToString,
        fromAny: CssLengthMath.styleToString
    });
}



/**
 * Converts border radius style value to the CSS string.
 */
export function borderRadiusToString( val: Extended<StyleTypes.BorderRadius_StyleType>): string
{
    return valueToString( val, {
        fromArray: v =>
        {
            if (Array.isArray( v[0]))
            {
                // two MultiCornerRadius values
                let s = arrayToString( v[0], CssLengthMath.styleToString, " ");
                s += " / ";
                return s + arrayToString( v[1], CssLengthMath.styleToString, " ");
            }
            else
            {
                // single MultiCornerRadius value
                return arrayToString( v, CssLengthMath.styleToString, " ");
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
    return valueToString( val, {
        fromNumber: CssLengthMath.styleToString,
        fromArray: v =>
        {
            let buf: string[] = [];
            if (v[0] != null)
                buf.push( CssLengthMath.styleToString( v[0]))

            if (v[1] != null)
                buf.push( valueToString(v[1]));

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
    return valueToString( val, {
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
    return valueToString( val, {
        fromArray: v => {
            if (v.length === 0)
                return "";
            else if (v.length === 1)
                return valueToString(v);
            else if (typeof v[1] === "number")
                return valueToString( v, { arraySeparator: " "})
            else
            {
                return valueToString( v, {
                    arrayItemFunc: cursorToString,
                    arraySeparator: ","
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
    return valueToString( val, {
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
    return objectToString( val, [
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
    return valueToString( val, {
        fromNumber: v => "oblique " + CssAngleMath.styleToString( v)
    });
}



function markerStyleToString( val: Extended<StyleTypes.Marker_StyleType>): string
{
    return valueToString( val, {
        fromObject: v => `url(#${(val as IIDRule).name})`
    });
}



function rotateToString( val:StyleTypes.Rotate_StyleType): string
{
    return valueToString( val, {
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
    return objectToString( val, [
        "line",
        "style",
        ["color", colorToString],
        ["thickness", CssLengthMath.styleToString],
    ]);
}



function singleTransition_fromObject( val: Extended<StyleTypes.Transition_Single>): string
{
    return objectToString( val, [
        ["property", camelToDash],
        ["duration", CssTimeMath.styleToString],
        ["func", singleTimingFunction_fromStyle],
        ["delay", CssTimeMath.styleToString]
    ]);
}



function singleTransition_fromStyle( val: Extended<StyleTypes.Transition_Single>): string
{
    return valueToString( val, {
        fromObject: singleTransition_fromObject
    });
}



function offsetToString( val: StyleTypes.Offset_StyleType): string
{
    return objectToString( val, [
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
export function objectToString( val: any,
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
            buf.push( valueToString( propVal));
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
 * Converts the given style property to the CSS style string. Property name cn be in either
 * dash or camel form.
 * @param style 
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
        ? valueToString( varValue)
        : typeof info === "object"
            ? valueToString( varValue, info as IValueConvertOptions)
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Helper object that is used to indicate that values in an array should be separated by comma.
// We use it many times in the stucture below.
let commaArraySeparator = { arraySeparator: "," };



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in StyleTypes.VarTemplateName]?: (ToStringFunc | IValueConvertOptions) } =
{
    animation: {
        fromObject: singleAnimation_fromObject,
        fromAny: singleAnimation_fromStyle,
        arraySeparator: ",",
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
        fromObject: singleBackground_fromObject,
        fromAny: singleBackground_fromStyle,
        arrayItemFunc: singleBackground_fromStyle,
        arraySeparator: ",",
    },
    backgroundAttachment: commaArraySeparator,
    backgroundBlendMode: commaArraySeparator,
    backgroundClip: commaArraySeparator,
    backgroundColor: colorToString,
    backgroundOrigin: commaArraySeparator,
    backgroundPosition: v => multiPositionToString( v, ","),
    backgroundRepeat: commaArraySeparator,
    backgroundSize: {
        fromNumber: CssLengthMath.styleToString,
        arrayItemFunc: singleBackgroundSize_fromStyle,
        arraySeparator: ","
    },
    baselineShift: CssLengthMath.styleToString,
    border: borderToString,
    borderBlockEnd: borderToString,
    borderBlockEndColor: colorToString,
    borderBlockEndWidth: CssLengthMath.styleToString,
    borderBlockStart: borderToString,
    borderBlockStartColor: colorToString,
    borderBlockStartWidth: CssLengthMath.styleToString,
    borderBottom: borderToString,
    borderBottomColor: colorToString,
    borderBottomLeftRadius: singleCornerRadiusToString,
    borderBottomRightRadius: singleCornerRadiusToString,
    borderBottomWidth: CssLengthMath.styleToString,
    borderColor: {
        arrayItemFunc: colorToString,
        fromAny: colorToString
    },
    borderImage: {
        fromObject: borderImageToString,
    },
    borderImageSlice: borderImageSliceToString,
    borderInlineEnd: borderToString,
    borderInlineEndColor: colorToString,
    borderInlineEndWidth: CssLengthMath.styleToString,
    borderInlineStart: borderToString,
    borderInlineStartColor: colorToString,
    borderInlineStartWidth: CssLengthMath.styleToString,
    borderLeft: borderToString,
    borderLeftColor: colorToString,
    borderLeftWidth: CssLengthMath.styleToString,
    borderRadius: borderRadiusToString,
    borderRight: borderToString,
    borderRightColor: colorToString,
    borderRightWidth: CssLengthMath.styleToString,
    borderSpacing: multiLengthToStringWithSpace,
    borderTop: borderToString,
    borderTopColor: colorToString,
    borderTopLeftRadius: singleCornerRadiusToString,
    borderTopRightRadius: singleCornerRadiusToString,
    borderTopWidth: CssLengthMath.styleToString,
    borderWidth: multiLengthToStringWithSpace,
    bottom: CssLengthMath.styleToString,
    boxShadow: {
        fromObject: singleBoxShadow_fromObject,
        arraySeparator: ",",
    },

    caretColor: colorToString,
    clip:  {
        fromArray: v => `rect(${multiLengthToStringWithSpace(v)}`
    },
    color: colorToString,
    columnGap: CssLengthMath.styleToString,
    columnRule: borderToString,
    columnRuleColor: colorToString,
    columnRuleStyle: valueToString,
    columnRuleWidth: multiLengthToStringWithSpace,
    columns: columnsToString,
    columnWidth: CssLengthMath.styleToString,
    cursor: cursorToString,

    fill: colorToString,
    fillOpacity: CssPercentMath.styleToString,
    flex: flexToString,
    flexBasis: CssLengthMath.styleToString,
    floodColor: colorToString,
    font: {
        fromObject: font_fromObject
    },
    fontSize: CssLengthMath.styleToString,
    fontStyle: fontStyleToString,

    gap: multiLengthToStringWithSpace,
    gridColumnGap: CssLengthMath.styleToString,
    gridGap: multiLengthToStringWithSpace,
    gridRowGap: CssLengthMath.styleToString,

    height: CssLengthMath.styleToString,

    inlineSize: CssLengthMath.styleToString,

    left: CssLengthMath.styleToString,
    letterSpacing: CssLengthMath.styleToString,
    lightingColor: colorToString,

    margin: multiLengthToStringWithSpace,
    marginBlockEnd: CssLengthMath.styleToString,
    marginBlockStart: CssLengthMath.styleToString,
    marginBottom: CssLengthMath.styleToString,
    marginInlineEnd: CssLengthMath.styleToString,
    marginInlineStart: CssLengthMath.styleToString,
    marginLeft: CssLengthMath.styleToString,
    marginRight: CssLengthMath.styleToString,
    marginTop: CssLengthMath.styleToString,
    markerEnd: markerStyleToString,
    markerMid: markerStyleToString,
    markerStart: markerStyleToString,
    maxBlockSize: CssLengthMath.styleToString,
    maxHeight: CssLengthMath.styleToString,
    maxInlineSize: CssLengthMath.styleToString,
    maxWidth: CssLengthMath.styleToString,
    minBlockSize: CssLengthMath.styleToString,
    minHeight: CssLengthMath.styleToString,
    minInlineSize: CssLengthMath.styleToString,
	minWidth: CssLengthMath.styleToString,

    objectPosition: positionToString,
    offset: offsetToString,
    offsetAnchor: positionToString,
    offsetDistance: CssLengthMath.styleToString,
    offsetPosition: positionToString,
    offsetRotate: {
        fromAny: CssAngleMath.styleToString
    },
    outline: borderToString,
    outlineColor: colorToString,
    outlineOffset: CssLengthMath.styleToString,

    padding: multiLengthToStringWithSpace,
    paddingBlockEnd: CssLengthMath.styleToString,
    paddingBlockStart: CssLengthMath.styleToString,
    paddingBottom: CssLengthMath.styleToString,
    paddingInlineEnd: CssLengthMath.styleToString,
    paddingInlineStart: CssLengthMath.styleToString,
    paddingLeft: CssLengthMath.styleToString,
    paddingRight: CssLengthMath.styleToString,
    paddingTop: CssLengthMath.styleToString,
    perspective: CssLengthMath.styleToString,
    perspectiveOrigin: {
        fromAny: CssLengthMath.styleToString
    },

    quotes: {
        arrayItemFunc: v => `"${v}"`
    },

    right: CssLengthMath.styleToString,
    rotate: rotateToString,
    rowGap: CssLengthMath.styleToString,

    scrollMargin: multiLengthToStringWithSpace,
    scrollMarginBlock: multiLengthToStringWithSpace,
    scrollMarginBlockEnd: CssLengthMath.styleToString,
    scrollMarginBlockStart: CssLengthMath.styleToString,
    scrollMarginBottom: CssLengthMath.styleToString,
    scrollMarginInline: multiLengthToStringWithSpace,
    scrollMarginInlineEnd: CssLengthMath.styleToString,
    scrollMarginInlineStart: CssLengthMath.styleToString,
    scrollMarginLeft: CssLengthMath.styleToString,
    scrollMarginRight: CssLengthMath.styleToString,
    scrollMarginTop: CssLengthMath.styleToString,
    scrollPadding: multiLengthToStringWithSpace,
    scrollPaddingBlock: multiLengthToStringWithSpace,
    scrollPaddingBlockEnd: CssLengthMath.styleToString,
    scrollPaddingBlockStart: CssLengthMath.styleToString,
    scrollPaddingBottom: CssLengthMath.styleToString,
    scrollPaddingInline: multiLengthToStringWithSpace,
    scrollPaddingInlineEnd: CssLengthMath.styleToString,
    scrollPaddingInlineStart: CssLengthMath.styleToString,
    scrollPaddingLeft: CssLengthMath.styleToString,
    scrollPaddingRight: CssLengthMath.styleToString,
    scrollPaddingTop: CssLengthMath.styleToString,
    shapeMargin: CssLengthMath.styleToString,
    stopColor: colorToString,

    tabSize: CssLengthMath.styleToString,
    textCombineUpright: {
        fromNumber: v => `digits ${v}`
    },
    textDecoration: {
        fromNumber: colorToString,
        fromObject: textDecoration_fromObject
    },
    textDecorationColor: colorToString,
    textDecorationThickness: CssLengthMath.styleToString,
    textEmphasis: {
        arrayItemFunc: colorToString
    },
    textEmphasisColor: colorToString,
    textIndent: {
        fromNumber: CssLengthMath.styleToString,
        arrayItemFunc: CssLengthMath.styleToString
    },
    textShadow: {
        fromObject: singleBoxShadow_fromObject,
        arraySeparator: ",",
    },
    textSizeAdjust: CssPercentMath.styleToString,
    top: CssLengthMath.styleToString,
    transformOrigin: {
        fromAny: CssLengthMath.styleToString
    },
    transition: {
        fromObject: singleTransition_fromObject,
        fromAny: singleTransition_fromStyle,
        arraySeparator: ",",
    },
    transitionDelay: {
        fromAny: CssTimeMath.styleToString,
        arraySeparator: ","
    },
    transitionDuration: {
        fromAny: CssTimeMath.styleToString,
        arraySeparator: ","
    },
    transitionTimingFunction: timingFunctionToString,
    translate: {
        fromAny: CssLengthMath.styleToString
    },

    verticalAlign: {
        fromNumber: CssLengthMath.styleToString
    },

    width: CssLengthMath.styleToString,
    willChange: {
        fromString: camelToDash
    },
    wordSpacing: CssLengthMath.styleToString,

    zoom: CssPercentMath.styleToString,

    // special properties for IVarRule types
    "CssLength": CssLengthMath.styleToString,
    "CssAngle": CssAngleMath.styleToString,
    "CssTime": CssTimeMath.styleToString,
    "CssResolution": CssResolutionMath.styleToString,
    "CssFrequency": CssFrequencyMath.styleToString,
    "CssPercent": CssPercentMath.styleToString,
    "CssPosition": positionToString,
    "CssColor": colorToString,
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



