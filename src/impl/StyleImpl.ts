import {CssSelector, Extended} from "../api/CoreTypes";
import {
    Animation_Single, Background_Single, BorderImage_Object, BorderImageSlice_StyleType, BoxShadow,
    Border_StyleType, Flex_StyleType, GridTemplateAreas_StyleType, GridTemplateAreaDefinition,
    GridTrack, GridTemplateAxis_StyleType, Marker_StyleType, Rotate_StyleType, TextDecoration_StyleType,
    Transition_Single, Offset_StyleType, Styleset, CustomVar_StyleType, VarTemplateName, BoxShadow_StyleType, IStyleset,
} from "../api/StyleTypes";
import {IIDRule} from "../api/RuleTypes";
import {LengthMath, AngleMath} from "./NumericImpl";
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
	return v2s( val, { sep: "" });
}



/**
 * Returns a string representation of a parameterized pseudo entity.
 */
export function pseudoEntity2s( entityName: string, val: any): string
{
	if (!entityName)
		return "";

	if (entityName.startsWith( ":nth"))
		return v2s( val, { arr: nthTupleToString });
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
                return [nameOrTuple[0], v => styleProp2s( options as string, v), nameOrTuple[2]];
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
    return v2s( val, { obj: singleAnimation_fromObject });
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
        num: WKF.Color,
        obj: singleBackground_fromObject
    });
}



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



function borderImageSliceToString( val: Extended<BorderImageSlice_StyleType>): string
{
    return v2s( val, {
        num: WKF.UnitlessOrPercent,
        item: v => v2s( v, {
            bool: () => "fill",
            num: WKF.UnitlessOrPercent,
        })
    });
}



wkf[WKF.BoxShadow] = (val: BoxShadow_StyleType) => v2s( val, {
    obj: (v: BoxShadow) => styleObj2String( v, [
        ["inset", b => b ? "inset" : ""],
        ["x", WKF.Length],
        ["y", WKF.Length],
        ["blur", WKF.Length],
        ["spread", WKF.Length],
        ["color", WKF.Color]
    ]),
    sep: ","
});



function borderToString( val: Extended<Border_StyleType>): string
{
    return v2s( val, {
        num: WKF.Length,
        arr: arr => {
            let numbersProcessed = 0;
            return arr.map( item => {
                if (typeof item === "number")
                    return numbersProcessed++ ? v2s( item, WKF.Color) : v2s( item, WKF.Length);
                else
                    return v2s(item);
            }).join(" ");
        },
    });
}

wkf[WKF.Border] = borderToString;



function flexToString( val: Extended<Flex_StyleType>): string
{
    return v2s( val, {
        arr: v =>
        {
            let s = `${wkf[WKF.Number](v[0])} ${wkf[WKF.Number](v[1])}`;
            return v.length > 2 ? s +` ${wkf[WKF.Length]( v[2])}` : s;
        },
        any: WKF.Length
    });
}



function font_fromObject( val: any): string
{
    return styleObj2String( val, [
        ["style", WKF.FontStyle],
        "variant",
        "weight",
        ["stretch", WKF.Percent],
        ["size", WKF.Length],
        ["lineHeight", undefined, "/"],
        "family"
    ]);
}



function gridTemplateAreasToString( val: Extended<GridTemplateAreas_StyleType>): string
{
    // val can be array of strings or GridTemplateArea_Definition touples
    return v2s( val, {
        arr: v => {
            if (v.length === 0)
                return "";
            else if (typeof v[0] === "string")
                return a2s( v, WKF.Quoted);
            else
                return createGridTemplateAreasFromDefinitions(v);
        }
    });
}



/**
 * Converts the array of GridTemplateArea_Definition objects to a string that is suitable for
 * the grid-template-areas format.
 */
function createGridTemplateAreasFromDefinitions( defs: GridTemplateAreaDefinition[]): string
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



wkf[WKF.GridTrack] = (v: GridTrack) => v2s( v, {
    num: WKF.Length,
    arr: v => `[${a2s(v)}]`
});



wkf[WKF.GridAxis] = (v: Extended<GridTemplateAxis_StyleType>) => v2s( v, {
    num: WKF.Length,
    item: WKF.GridTrack
});



function markerStyleToString( val: Extended<Marker_StyleType>): string
{
    return v2s( val, {
        obj: v => `url(#${(v as IIDRule).name})`
    });
}



function rotateToString( val:Rotate_StyleType): string
{
    return v2s( val, {
        num: WKF.Angle,
        arr: v => {
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
        obj: singleTransition_fromObject
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

    // copy all other properties from the source
	for( let propName in source)
	{
        if (propName === "--")
            mergeStylesetCustomProps( target, source);
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
export function styleset2s( styleset: Styleset): string
{
    if (!styleset)
        return "{}";

    let s = "{";

	forAllPropsInStylset( styleset, (name: string, value: string, isCustom: boolean, isPrefixed: boolean): void => {
        s += isCustom
            ? `${name}:${value};`
            : `${isPrefixed ? "-" : ""}${camelToDash(name)}:${value};`;
    });

    return s + "}";
}



/**
 * Extracts name and string values from the given custom CSS property definition.
 * @param customVal
 */
function getCustomPropNameAndValue( customVal: CustomVar_StyleType): [string?,string?]
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

    return [varName, styleProp2s( template, value)];
}



/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
export function styleProp2s( propName: string, propVal: any): string
{
    if (!propName)
        return "";

    // if the property value is an object with the "!" property, then the actual value is the
    // value of this property and we also need to set the "!important" flag
    let value = propVal;
    let impFlag = false;
    if (typeof propVal === "object" && "!" in propVal)
    {
        value = propVal["!"];
        impFlag = true;
    }

    // convert the value to string based on the information object for the property (if defined)
    let stringValue = v2s( value, stylePropertyInfos[dashToCamel(propName)]);

    if (!stringValue)
        return "";

    if (impFlag)
        stringValue += " !important";

    return stringValue;
}



/**
 * For each property - regular and custom - in the given styleset invokes the appropriate
 * function that gets the property name and the value converted to string.
 * @param styleset
 * @param forPropFunc
 */
export function forAllPropsInStylset( styleset: Styleset,
    forPropFunc: (name: string, val: string, isCustom: boolean, isPrefixed: boolean) => void)
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

				forPropFunc( varName, varValue, true, false);
			}
		}
		else
		{
            // prepare map of property names to tuples where the first element is the value and
            // the second element is the flag whether the property name is a prefixed one.
            let map: { [p: string]: [string, boolean] } = {};

            // get the string representation of the property
            let propValue = styleProp2s( propName, styleset[propName]);
            map[propName] = [propValue, false];

            // get vendor-prefixed variants and put them into the map. This can override property
            // name already in the map if the property name is not prefixed (only the value is in
            // this case).
            let variants = getPrefixVariants( propName as keyof IStyleset, propValue);
            if (variants)
            {
                for( let variant of variants)
                {
                    // the property name is prefixed if the name from the variant is not the same
                    // as the original name.
                    map[variant[0]] = [variant[1], variant[0] !== propName];
                }
            }

            for( let name in map)
            {
                let tuple = map[name];
                forPropFunc( name, tuple[0], false, tuple[1]);
            }
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



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const stylePropertyInfos: { [K in VarTemplateName]?: V2SOptions } =
{
    animation: {
        obj: singleAnimation_fromObject,
        any: singleAnimation_fromStyle,
        sep: ",",
    },
    animationDelay: WKF.MultiTimeWithComma,
    animationDuration: WKF.MultiTimeWithComma,
    animationIterationCount: WKF.OneOrManyWithComma,
    animationFillMode: WKF.OneOrManyWithComma,
    animationName: WKF.OneOrManyWithComma,
    animationPlayState: WKF.OneOrManyWithComma,
    animationTimingFunction: WKF.OneOrManyWithComma,

    background: {
        num: WKF.Color,
        obj: singleBackground_fromObject,
        any: singleBackground_fromStyle,
        item: singleBackground_fromStyle,
        sep: ",",
    },
    backgroundAttachment: WKF.OneOrManyWithComma,
    backgroundBlendMode: WKF.OneOrManyWithComma,
    backgroundClip: WKF.OneOrManyWithComma,
    backgroundColor: WKF.Color,
    backgroundImage: WKF.OneOrManyWithComma,
    backgroundOrigin: WKF.OneOrManyWithComma,
    backgroundPosition: WKF.MultiPosition,
    backgroundPositionX: WKF.MultiPosition,
    backgroundPositionY: WKF.MultiPosition,
    backgroundRepeat: WKF.OneOrManyWithComma,
    backgroundSize: {
        num: WKF.Length,
        item: { any: WKF.Length },
        sep: ","
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
        any: WKF.Color
    },
    borderImage: {
        obj: borderImageToString,
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
    borderRadius: WKF.BorderRadius,
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
    boxShadow: WKF.BoxShadow,

    caretColor: WKF.Color,
    clip:  {
        arr: v => `rect(${LengthMath.mv2s(v," ")}`
    },
    color: WKF.Color,
    columnGap: WKF.Length,
    columnRule: WKF.Border,
    columnRuleColor: WKF.Color,
    columnRuleWidth: WKF.MultiLengthWithSpace,
    columnWidth: WKF.Length,
    cursor: WKF.OneOrManyWithComma,

    fill: WKF.Color,
    fillOpacity: WKF.Percent,
    flex: flexToString,
    flexBasis: WKF.Length,
    floodColor: WKF.Color,
    font: {
        obj: font_fromObject
    },
    fontSize: WKF.Length,
    fontStretch: WKF.Percent,
    fontStyle: WKF.FontStyle,

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
    maskClip: WKF.OneOrManyWithComma,
    maskComposite: WKF.OneOrManyWithComma,
    maskImage: WKF.OneOrManyWithComma,
    maskMode: WKF.OneOrManyWithComma,
    maskOrigin: WKF.OneOrManyWithComma,
    maskPosition: WKF.MultiPosition,
    maskRepeat: WKF.OneOrManyWithComma,
    maskSize: {
        num: WKF.Length,
        item: { any: WKF.Length },
        sep: ","
    },
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
        any: WKF.Angle
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
    perspectiveOrigin: WKF.MultiLengthWithSpace,

    quotes: WKF.Quoted,
    // quotes: {
    //     item: v => `"${v}"`
    // },

    right: WKF.Length,
    rotate: rotateToString,
    rowGap: WKF.Length,

    scrollbarColor: {
        item: WKF.Color
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
        num: v => `digits ${v}`
    },
    textDecoration: {
        num: WKF.Color,
        obj: textDecoration_fromObject
    },
    textDecorationColor: WKF.Color,
    textDecorationThickness: WKF.Length,
    textEmphasis: {
        any: WKF.Color
    },
    textEmphasisColor: WKF.Color,
    textIndent: WKF.MultiLengthWithSpace,
    textShadow: WKF.BoxShadow,
    textSizeAdjust: WKF.Percent,
    top: WKF.Length,
    transformOrigin: WKF.MultiLengthWithSpace,
    transition: {
        obj: singleTransition_fromObject,
        any: singleTransition_fromStyle,
        sep: ",",
    },
    transitionDelay: WKF.MultiTimeWithComma,
    transitionDuration: WKF.MultiTimeWithComma,
    transitionTimingFunction: WKF.OneOrManyWithComma,
    translate: WKF.MultiLengthWithSpace,

    verticalAlign: WKF.Length,

    width: WKF.Length,
    willChange: {
        str: camelToDash
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
    CssMultiPosition: WKF.MultiPosition,
    CssRadius: WKF.Radius,
    CssColor: WKF.Color,
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Vendor prefix support
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const enum VendorPrefix
{
    Webkit = 0,
    Moz = 1,
}

// Vendor prefixes with indexes from the VendorPrefix enumeration
const vendorPrefixStrings = ["webkit", "moz"];


// Mode indicating to what entity the prefix should be added if a certain value is found in the
// property.
const enum ValuePrefixMode
{
    // Both the value and the property name are prefixed.
    Both = 0,

    // Only the value is prefixed
    ValueOnly = 1,

    // Only the property name is prefixed
    PropertyOnly = 2,
}



/**
 * Type defining a value which should be prefixed or which indicates that the property should be
 * prefixed.
 */
type ValuePrefixInfo =
    {
        // Value which should be prefixed or which indicates that the property should be prefixed.
        val: string;

        // Flag indicating whether value or property or both should be prefixed. Default is Both.
        mode?: ValuePrefixMode;

        // Alternative name for the value (sometimes a value is not just prefixed, but gets
        // wholly different name).
        alt?: string;
    };

/**
 * Type defining a property which should be prefixed or whose values should be prefixed.
 */
type PropPrefixInfo =
    {
        // Prefix index
        prefix: VendorPrefix;

        // Alternative name for the property (sometimes a property is not just prefixed, but gets
        // wholly different name).
        alt?: string;

        // Flag indicating whether the property is always prefixed or only if it
        // contains special values specified by the `vals` property.
        valsOnly?: boolean;

        // Array of objects providing infomation about values which should be prefixed or
        // which indicates that the property should be prefixed.
        vals?: ValuePrefixInfo[];
    };



/**
 * The tuple that contains the result of applying vendor prefixing on a property.
 * - new property name (that may or may not be prefixed).
 * - new property value (that may or may not have prefixed items)
 */
type PropPrefixVariant = [string, string];


function getPrefixVariants( name: keyof IStyleset, value: string): PropPrefixVariant[] | null
{
    let propInfos = propPrefixInfos[name];
    if (!propInfos)
        return null;

    let variants: PropPrefixVariant[] = [];
    for( let propInfo of propInfos)
    {
        let prefixString = vendorPrefixStrings[propInfo.prefix];

        // determine whether the propert name should be prefixed. Note that even if we decide
        // here that it should not be prefixed, it can change when we go over property values.
        let shouldPrefixProperty = !propInfo.valsOnly;

        // if property values are defined, try to replace them with prefixed versions. Note that
        // this can also set the flag indicating that the property name should be prefixed too.
        let newPropValue = "";
        if (value && propInfo.vals)
        {
            for( let valueInfo of propInfo.vals)
            {
                let valueToSearch = valueInfo.val;
                if (value.indexOf( valueToSearch) < 0)
                    continue;

                let mode = valueInfo.mode;
                if (mode !== ValuePrefixMode.PropertyOnly)
                {
                    let replacement = valueInfo.alt ? valueInfo.alt : `-${prefixString}-${valueToSearch}`;
                    newPropValue = value.replace( valueToSearch, replacement);
                    value = newPropValue;
                }

                if (mode !== ValuePrefixMode.ValueOnly)
                    shouldPrefixProperty = true;
            }
        }

        let newPropName = "";
        if (shouldPrefixProperty)
            newPropName = propInfo.alt ? propInfo.alt : dashToCamel( `${prefixString}-${name}`)

        if (newPropName || newPropValue)
            variants.push( [newPropName || name, newPropValue || value]);
    }

    return variants.length > 0 ? variants : null;
}



// Prefix information for properties that accept "fit-content" value
const fitContentPrefixInfos: PropPrefixInfo[] = [
    {prefix: VendorPrefix.Webkit, valsOnly: true, vals: [{val: "fit-content", mode: ValuePrefixMode.ValueOnly}]}
];



const propPrefixInfos: { [K in keyof IStyleset]?: PropPrefixInfo[]} =
{
    appearance: [ {prefix: VendorPrefix.Webkit}, {prefix: VendorPrefix.Moz} ],
    backgroundClip: [
        {prefix: VendorPrefix.Webkit, valsOnly: true, vals: [{val: "text", mode: ValuePrefixMode.PropertyOnly}]}
    ],
    boxDecorationBreak: [ {prefix: VendorPrefix.Webkit} ],
    colorAdjust: [ {prefix: VendorPrefix.Webkit, alt: "webkitPrintColorAdjust"} ],
    // scrollbarColor: [ [VendorPrefix.Webkit], [VendorPrefix.Moz] ],
    minWidth: fitContentPrefixInfos,
}



