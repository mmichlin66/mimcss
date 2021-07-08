import {CssSelector, Extended, CssRadius} from "../api/CoreTypes";
import {
    Animation_Single, Background_Single, BackgroundSize_Single,
    BorderImage_Object, BorderImageSlice_StyleType, BoxShadow_Single, BorderRadius_StyleType,
    Border_StyleType, Columns_StyleType, Flex_StyleType, Font_StyleType,
    GridTemplateAreas_StyleType, GridTemplateArea_Definition, GridTrack, GridTemplateAxis_StyleType,
    Marker_StyleType, Rotate_StyleType, TextDecoration_StyleType, Transition_Single, Offset_StyleType,
    Styleset, CustomVar_StyleType, VarTemplateName,
} from "../api/StyleTypes";
import {IIDRule} from "../api/RuleTypes";
import {LengthMath, AngleMath} from "./CoreFuncs";
import {color2s} from "./ExtraFuncs";
import {VarRule} from "../rules/VarRule";
import {v2s, V2SOptions, o2s, P2SOption, WKF, a2s, wkf, camelToDash, dashToCamel, AnyToStringFunc} from "./Utils";



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
export function selector2s( val: CssSelector): string
{
	return v2s( val, { arrSep: "" });
}



/**
 * Returns a string representation of a parameterized pseudo entity.
 */
export function pseudoEntity2s( entityName: string, val: any): string
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
 *   converted property value followed by the separator.
 *
 * The order of the names determines in which order the properties should be added to the string.
*/
function styleObj2String( val: any,
    info: (string | [string, (V2SOptions | string)?, string?])[],
    separator: string = " "): string
{
    // call utility function substituting every touple with style property name with function
    // that converts this property value to string
    return o2s( val, info.map( nameOrTuple =>
        {
            let options = typeof nameOrTuple === "string" ? undefined : nameOrTuple[1];
            if (typeof options === "string")
                return [nameOrTuple[0], v => styleProp2s( options as string, v, true), nameOrTuple[2]];
            else
                return nameOrTuple as P2SOption;
        }
    ), separator);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for converting CSS property types to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

function singleAnimation_fromObject( val: Animation_Single): string
{
    return styleObj2String( val, [
        ["duration", WKF.Time],
        "func",
        ["delay", WKF.Time],
        ["count", WKF.Number],
        "direction",
        "mode",
        "state",
        "name"
    ]);
}



function singleAnimation_fromStyle( val: Extended<Animation_Single>): string
{
    return v2s( val, { fromObj: singleAnimation_fromObject });
}



function singleBackground_fromObject( val: Background_Single): string
{
    return styleObj2String( val, [
        ["color", WKF.Color],
        "image",
        ["position", WKF.Position],
        ["size", WKF.MultiLengthWithSpace, "/"],
        "repeat",
        "attachment",
        "origin",
        "clip"
    ]);
}



function singleBackground_fromStyle( val: Extended<Background_Single>): string
{
    return v2s( val, {
        fromNumber: WKF.Color,
        fromObj: singleBackground_fromObject
    });
}



function singleBackgroundSize_fromStyle( val: Extended<BackgroundSize_Single>): string
{
    return v2s( val, { fromAny: WKF.Length });
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
        ["width", undefined, "/"],
        ["outset", undefined, "/"],
        "repeat"
    ]);
}



/**
 * Converts border image slice style value to the CSS string.
 */
function borderImageSliceToString( val: Extended<BorderImageSlice_StyleType>): string
{
    return v2s( val, {
        fromNumber: WKF.UnitlessOrPercent,
        arrItemFunc: v => v2s( v, {
            fromBool: () => "fill",
            fromNumber: WKF.UnitlessOrPercent,
        })
    });
}



export function singleBoxShadow_fromObject( val: BoxShadow_Single): string
{
    return styleObj2String( val, [
        ["inset", v => v ? "inset" : ""],
        ["x", WKF.Length],
        ["y", WKF.Length],
        ["blur", WKF.Length],
        ["spread", WKF.Length],
        ["color", WKF.Color]
    ]);
}



/**
 * Converts corner radius style value to the CSS string.
 */
function singleCornerRadiusToString( val: Extended<CssRadius>): string
{
    return v2s( val, { fromAny: WKF.Length });
}



/**
 * Converts border radius style value to the CSS string.
 */
export function borderRadius2s( val: Extended<BorderRadius_StyleType>): string
{
    return v2s( val, {
        fromArray: v =>
        {
            if (Array.isArray( v[0]))
            {
                // two MultiCornerRadius values
                let s = a2s( v[0], WKF.Length, " ");
                s += " / ";
                return s + a2s( v[1], WKF.Length, " ");
            }
            else
            {
                // single MultiCornerRadius value
                return a2s( v, WKF.Length, " ");
            }
        },
        fromAny: WKF.Length
    });
}



/**
 * Converts border side style value to the CSS string.
 */
function borderToString( val: Extended<Border_StyleType>): string
{
    return v2s( val, {
        fromNumber: WKF.Length,
        fromArray: v =>
        {
            let buf: string[] = [];
            if (v[0] != null)
                buf.push( LengthMath.v2s( v[0]))

            if (v[1] != null)
                buf.push( v2s(v[1]));

            if (v[2] != null)
                buf.push( color2s(v[2]));

            return buf.join(" ");
        },
        fromAny: color2s
    });
}



/**
 * Converts columns style to its CSS string value.
 */
function columnsToString( val: Extended<Columns_StyleType>): string
{
    return v2s( val, {
        fromArray: v => v[0] + " " + LengthMath.v2s( v[1])
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
            let s = `${wkf[WKF.Number](v[0])} ${wkf[WKF.Number](v[1])}`;
            return v.length > 2 ? s +` ${wkf[WKF.Length]( v[2])}` : s;
        },
        fromAny: WKF.Length
    });
}



function font_fromObject( val: any): string
{
    return styleObj2String( val, [
        ["style", fontStyleToString],
        "variant",
        "weight",
        "stretch",
        ["size", WKF.Length],
        ["lineHeight", undefined, "/"],
        "family"
    ]);
}



function fontStyleToString( val: Extended<Font_StyleType>): string
{
    return v2s( val, {
        fromNumber: v => "oblique " + AngleMath.v2s( v)
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
                return a2s( v);
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



export function gridTrack2s( val: GridTrack): string
{
    return v2s( val, {
        fromNumber: WKF.Length,
        fromArray: v => `[${a2s(v)}]`
    });
}



function gridAxisToString( val: Extended<GridTemplateAxis_StyleType>): string
{
    return v2s( val, {
        fromNumber: WKF.Length,
        arrItemFunc: gridTrack2s
    });
}



function markerStyleToString( val: Extended<Marker_StyleType>): string
{
    return v2s( val, {
        fromObj: v => `url(#${(v as IIDRule).name})`
    });
}



function rotateToString( val:Rotate_StyleType): string
{
    return v2s( val, {
        fromNumber: WKF.Angle,
        fromArray: v => {
            if (v.length === 2)
                return `${v[0]} ${AngleMath.v2s(v[1])}`;
            else
                return `${v[0]} ${v[1]} ${v[2]} ${AngleMath.v2s(v[3])}`;
        }
    });
}

function textDecoration_fromObject( val: Extended<TextDecoration_StyleType>): string
{
    return styleObj2String( val, [
        "line",
        "style",
        ["color", WKF.Color],
        ["thickness", WKF.Length],
    ]);
}



function singleTransition_fromObject( val: Extended<Transition_Single>): string
{
    return styleObj2String( val, [
        ["property", camelToDash],
        ["duration", WKF.Time],
        "func",
        ["delay", WKF.Time]
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

    return [varName, styleProp2s( template, value, true)];
}



/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
export function styleProp2s( propName: string, propVal: any, valueOnly?: boolean): string
{
    if (!propName)
        return "";

    // find information object for the property
    let options: V2SOptions = stylePropertyInfos[dashToCamel(propName)];

    // if the property value is an object with the "!" property, then the actual value is the
    // value of this property and we also need to set the "!important" flag
    let varValue = propVal;
    let impFlag = false;
    if (typeof propVal === "object" && "!" in propVal)
    {
        varValue = propVal["!"];
        impFlag = true;
    }

    let stringValue = v2s( varValue, options);
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
            forProp( propName, styleProp2s( propName, styleset[propName], true), false);
		}
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

export function s_registerStylePropertyInfo( name: string, toStringFunc: AnyToStringFunc)
{
    if (name in stylePropertyInfos)
        return false;
    else
    {
        stylePropertyInfos[name] = toStringFunc;
        return true;
    }
}



// Register frequently used conversion functions
wkf[WKF.Radius] = singleCornerRadiusToString;
wkf[WKF.Border] = borderToString;
wkf[WKF.GridAxis] = gridAxisToString;



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const stylePropertyInfos: { [K in VarTemplateName]?: V2SOptions } =
{
    animation: {
        fromObj: singleAnimation_fromObject,
        fromAny: singleAnimation_fromStyle,
        arrSep: ",",
    },
    animationDelay: WKF.MultiTimeWithComma,
    animationDuration: WKF.MultiTimeWithComma,
    animationIterationCount: WKF.OneOrManyWithComma,
    animationFillMode: WKF.OneOrManyWithComma,
    animationName: WKF.OneOrManyWithComma,
    animationPlayState: WKF.OneOrManyWithComma,
    animationTimingFunction: WKF.OneOrManyWithComma,

    background: {
        fromNumber: WKF.Color,
        fromObj: singleBackground_fromObject,
        fromAny: singleBackground_fromStyle,
        arrItemFunc: singleBackground_fromStyle,
        arrSep: ",",
    },
    backgroundAttachment: WKF.OneOrManyWithComma,
    backgroundBlendMode: WKF.OneOrManyWithComma,
    backgroundClip: WKF.OneOrManyWithComma,
    backgroundColor: WKF.Color,
    backgroundImage: WKF.OneOrManyWithComma,
    backgroundOrigin: WKF.OneOrManyWithComma,
    backgroundPosition: WKF.MultiPositionWithComma,
    backgroundPositionX: WKF.MultiPositionWithComma,
    backgroundPositionY: WKF.MultiPositionWithComma,
    backgroundRepeat: WKF.OneOrManyWithComma,
    backgroundSize: {
        fromNumber: WKF.Length,
        arrItemFunc: singleBackgroundSize_fromStyle,
        arrSep: ","
    },
    baselineShift: WKF.Length,
    blockSize: WKF.Length,
    border: WKF.Border,
    borderBlock: WKF.Border,
    borderBlockEnd: WKF.Border,
    borderBlockEndColor: WKF.Color,
    borderBlockEndWidth: WKF.Length,
    borderBlockStart: WKF.Border,
    borderBlockStartColor: WKF.Color,
    borderBlockStartWidth: WKF.Length,
    borderBottom: WKF.Border,
    borderBottomColor: WKF.Color,
    borderBottomLeftRadius: WKF.Radius,
    borderBottomRightRadius: WKF.Radius,
    borderBottomWidth: WKF.Length,
    borderColor: {
        fromAny: WKF.Color
    },
    borderImage: {
        fromObj: borderImageToString,
    },
    borderImageSlice: borderImageSliceToString,
    borderInline: WKF.Border,
    borderInlineEnd: WKF.Border,
    borderInlineEndColor: WKF.Color,
    borderInlineEndWidth: WKF.Length,
    borderInlineStart: WKF.Border,
    borderInlineStartColor: WKF.Color,
    borderInlineStartWidth: WKF.Length,
    borderLeft: WKF.Border,
    borderLeftColor: WKF.Color,
    borderLeftWidth: WKF.Length,
    borderRadius: borderRadius2s,
    borderRight: WKF.Border,
    borderRightColor: WKF.Color,
    borderRightWidth: WKF.Length,
    borderSpacing: WKF.MultiLengthWithSpace,
    borderTop: WKF.Border,
    borderTopColor: WKF.Color,
    borderTopLeftRadius: WKF.Radius,
    borderTopRightRadius: WKF.Radius,
    borderTopWidth: WKF.Length,
    borderWidth: WKF.MultiLengthWithSpace,
    bottom: WKF.Length,
    boxShadow: {
        fromObj: singleBoxShadow_fromObject,
        arrSep: ",",
    },

    caretColor: WKF.Color,
    clip:  {
        fromArray: v => `rect(${LengthMath.mv2s(v," ")}`
    },
    color: WKF.Color,
    columnGap: WKF.Length,
    columnRule: WKF.Border,
    columnRuleColor: WKF.Color,
    columnRuleWidth: WKF.MultiLengthWithSpace,
    columns: columnsToString,
    columnWidth: WKF.Length,
    cursor: {
        arrSep: ","
    },

    fill: WKF.Color,
    fillOpacity: WKF.Percent,
    flex: flexToString,
    flexBasis: WKF.Length,
    floodColor: WKF.Color,
    font: {
        fromObj: font_fromObject
    },
    fontSize: WKF.Length,
    fontStyle: fontStyleToString,

    gap: WKF.MultiLengthWithSpace,
    gridColumnGap: WKF.Length,
    gridGap: WKF.MultiLengthWithSpace,
    gridRowGap: WKF.Length,
    gridArea: WKF.OneOrManyWithSlash,
    gridAutoColumns: WKF.GridAxis,
    gridAutoRows: WKF.GridAxis,
    gridColumn: WKF.OneOrManyWithSlash,
    gridRow: WKF.OneOrManyWithSlash,
    gridTemplateAreas: gridTemplateAreasToString,
    gridTemplateColumns: WKF.GridAxis,
    gridTemplateRows: WKF.GridAxis,

    height: WKF.Length,

    inlineSize: WKF.Length,

    left: WKF.Length,
    letterSpacing: WKF.Length,
    lightingColor: WKF.Color,

    margin: WKF.MultiLengthWithSpace,
    marginBlock: WKF.MultiLengthWithSpace,
    marginBlockEnd: WKF.Length,
    marginBlockStart: WKF.Length,
    marginBottom: WKF.Length,
    marginInline: WKF.MultiLengthWithSpace,
    marginInlineEnd: WKF.Length,
    marginInlineStart: WKF.Length,
    marginLeft: WKF.Length,
    marginRight: WKF.Length,
    marginTop: WKF.Length,
    markerEnd: markerStyleToString,
    markerMid: markerStyleToString,
    markerStart: markerStyleToString,
    maxBlockSize: WKF.Length,
    maxHeight: WKF.Length,
    maxInlineSize: WKF.Length,
    maxWidth: WKF.Length,
    minBlockSize: WKF.Length,
    minHeight: WKF.Length,
    minInlineSize: WKF.Length,
	minWidth: WKF.Length,

    objectPosition: WKF.Position,
    offset: offsetToString,
    offsetAnchor: WKF.Position,
    offsetDistance: WKF.Length,
    offsetPosition: WKF.Position,
    offsetRotate: {
        fromAny: WKF.Angle
    },
    outline: WKF.Border,
    outlineColor: WKF.Color,
    outlineOffset: WKF.Length,

    padding: WKF.MultiLengthWithSpace,
    paddingBlock: WKF.MultiLengthWithSpace,
    paddingBlockEnd: WKF.Length,
    paddingBlockStart: WKF.Length,
    paddingBottom: WKF.Length,
    paddingInline: WKF.MultiLengthWithSpace,
    paddingInlineEnd: WKF.Length,
    paddingInlineStart: WKF.Length,
    paddingLeft: WKF.Length,
    paddingRight: WKF.Length,
    paddingTop: WKF.Length,
    perspective: WKF.Length,
    perspectiveOrigin: {
        fromAny: WKF.Length
    },

    quotes: {
        arrItemFunc: v => `"${v}"`
    },

    right: WKF.Length,
    rotate: rotateToString,
    rowGap: WKF.Length,

    scrollbarColor: {
        arrItemFunc: WKF.Color
    },
    scrollMargin: WKF.MultiLengthWithSpace,
    scrollMarginBlock: WKF.MultiLengthWithSpace,
    scrollMarginBlockEnd: WKF.Length,
    scrollMarginBlockStart: WKF.Length,
    scrollMarginBottom: WKF.Length,
    scrollMarginInline: WKF.MultiLengthWithSpace,
    scrollMarginInlineEnd: WKF.Length,
    scrollMarginInlineStart: WKF.Length,
    scrollMarginLeft: WKF.Length,
    scrollMarginRight: WKF.Length,
    scrollMarginTop: WKF.Length,
    scrollPadding: WKF.MultiLengthWithSpace,
    scrollPaddingBlock: WKF.MultiLengthWithSpace,
    scrollPaddingBlockEnd: WKF.Length,
    scrollPaddingBlockStart: WKF.Length,
    scrollPaddingBottom: WKF.Length,
    scrollPaddingInline: WKF.MultiLengthWithSpace,
    scrollPaddingInlineEnd: WKF.Length,
    scrollPaddingInlineStart: WKF.Length,
    scrollPaddingLeft: WKF.Length,
    scrollPaddingRight: WKF.Length,
    scrollPaddingTop: WKF.Length,
    shapeMargin: WKF.Length,
    stopColor: WKF.Color,
    stroke: WKF.Color,

    tabSize: WKF.Length,
    textCombineUpright: {
        fromNumber: v => `digits ${v}`
    },
    textDecoration: {
        fromNumber: WKF.Color,
        fromObj: textDecoration_fromObject
    },
    textDecorationColor: WKF.Color,
    textDecorationThickness: WKF.Length,
    textEmphasis: {
        fromAny: WKF.Color
    },
    textEmphasisColor: WKF.Color,
    textIndent: {
        fromAny: WKF.Length
    },
    textShadow: {
        fromObj: singleBoxShadow_fromObject,
        arrSep: ",",
    },
    textSizeAdjust: WKF.Percent,
    top: WKF.Length,
    transformOrigin: {
        fromAny: WKF.Length
    },
    transition: {
        fromObj: singleTransition_fromObject,
        fromAny: singleTransition_fromStyle,
        arrSep: ",",
    },
    transitionDelay: WKF.MultiTimeWithComma,
    transitionDuration: WKF.MultiTimeWithComma,
    transitionTimingFunction: WKF.OneOrManyWithComma,
    translate: {
        fromAny: WKF.Length
    },

    verticalAlign: WKF.Length,

    width: WKF.Length,
    willChange: {
        fromString: camelToDash
    },
    wordSpacing: WKF.Length,

    zoom: WKF.Percent,

    // special properties for IVarRule types
    CssLength: WKF.Length,
    CssAngle: WKF.Angle,
    CssTime: WKF.Time,
    CssResolution: WKF.Resolution,
    CssFrequency: WKF.Frequency,
    CssPercent: WKF.Percent,
    CssPosition: WKF.Position,
    CssRadius: WKF.Radius,
    CssColor: WKF.Color,
};



