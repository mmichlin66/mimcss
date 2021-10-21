import {CssSelector, Extended} from "../api/CoreTypes";
import {
    BorderImage_Object, BorderImageSlice_StyleType, Border_StyleType, GridTemplateAreas_StyleType,
    GridTemplateAreaDefinition, GridTrack, GridTemplateAxis_StyleType, Marker_StyleType, Styleset,
    CustomVar_StyleType, VarTemplateName, BoxShadow_StyleType, IStyleset,
} from "../api/StyleTypes";
import {IIDRule} from "../api/RuleTypes";
import {LengthMath, AngleMath} from "./NumericImpl";
import {VarRule} from "../rules/VarRule";
import {v2s, V2SOptions, o2s, WKF, a2s, wkf, camelToDash, dashToCamel, AnyToStringFunc, mv2s} from "./Utils";
import {getVarsFromSTyleDefinition} from "../rules/RuleContainer";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS selector.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector.
 */
export const selector2s = (val: CssSelector): string => v2s( val, { sep: "" });



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for converting CSS property types to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const borderImageToString = (val: BorderImage_Object): string =>
{
    // if width is specified, but slice is not, we need to set slice to the default 100% value;
    // if outset is specified but width is not. we need to set width to the default 1 value;
    let valCopy: BorderImage_Object = Object.assign( {}, val);
    if (val.slice == null && (val.width != null || val.outset != null))
        valCopy.slice = () => "100%";
    if (val.width == null && val.outset != null)
        valCopy.width = 1;

    return o2s( valCopy, [
        "source",
        "slice",
        ["width", undefined, "/"],
        ["outset", undefined, "/"],
        "repeat",
        "mode"
    ]);
}



wkf[WKF.BoxShadow] = (val: BoxShadow_StyleType) => v2s( val, {
    obj: {
        props: [
            ["inset", (v: boolean) => v ? "inset" : ""],
            ["x", WKF.Length],
            ["y", WKF.Length],
            ["blur", WKF.Length],
            ["spread", WKF.Length],
            ["color", WKF.Color]
        ]
    },
    sep: ","
});



wkf[WKF.Border] = (val: Extended<Border_StyleType>): string => v2s( val, {
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




const gridTemplateAreasToString = (val: Extended<GridTemplateAreas_StyleType>): string =>
    // val can be array of strings or GridTemplateArea_Definition touples
    v2s( val, {
        arr: v => {
            if (v.length === 0)
                return "";
            else if (typeof v[0] === "string")
                return a2s( v, WKF.Quoted);
            else
                return createGridTemplateAreasFromDefinitions(v);
        }
    });



/**
 * Converts the array of GridTemplateArea_Definition objects to a string that is suitable for
 * the grid-template-areas format.
 */
const createGridTemplateAreasFromDefinitions = (defs: GridTemplateAreaDefinition[]): string =>
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



wkf[WKF.Marker] = (val: Extended<Marker_StyleType>): string =>
{
    return v2s( val, {
        obj: v => `url(#${(v as IIDRule).name})`
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for handling Stylesets.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given styleset to its string representation */
export const styleset2s = (styleset: Styleset): string =>
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
const getCustomPropNamesAndValues = (customVal: CustomVar_StyleType): [string,string?][] =>
{
    if (!customVal)
        return [];

    if (Array.isArray(customVal))
    {
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

        return [[varName, styleProp2s( template, value)]];
    }
    else
    {
        let vars = getVarsFromSTyleDefinition(customVal);
        return vars.map( varRule => [varRule.cssName, styleProp2s( varRule.template, varRule.getValue())]);
    }
}



/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
export const styleProp2s = (propName: string, propVal: any): string =>
{
    if (!propName)
        return "";

    // if the property value is an object with the "!" property, then the actual value is the
    // value of this property and we also need to set the "!important" flag
    let impFlag = false;
    if (typeof propVal === "object" && "!" in propVal)
    {
        propVal = propVal["!"];
        impFlag = true;
    }

    // convert the value to string based on the information object for the property (if defined)
    let stringValue = v2s( propVal, stylePropertyInfos[dashToCamel(propName)]);
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
export const forAllPropsInStylset = (styleset: Styleset,
    forPropFunc: (name: string, val: string, isCustom: boolean, isPrefixed: boolean) => void) =>
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

				let tuples: [string, string?][] = getCustomPropNamesAndValues( customVal);
                for( let tuple of tuples)
                {
                    if (!tuple[0])
                        continue;

                    let varValue = tuple[1] == null ? "" : tuple[1];
                    forPropFunc( tuple[0], varValue, true, false);
                }
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

export const s_registerStylePropertyInfo = (name: string, toStringFunc: AnyToStringFunc) =>
    name in stylePropertyInfos ? false : (stylePropertyInfos[name] = toStringFunc, true);



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const stylePropertyInfos: { [K in VarTemplateName]?: V2SOptions } =
{
    animation: {
        any: { props: [
            ["duration", WKF.Time],
            "func",
            ["delay", WKF.Time],
            ["count", WKF.Number],
            "direction",
            "mode",
            "state",
            "name"
        ]},
        sep: ",",
    },
    animationDelay: WKF.MultiTimeWithComma,
    animationDuration: WKF.MultiTimeWithComma,
    animationIterationCount: WKF.OneOrManyWithComma,
    animationFillMode: WKF.OneOrManyWithComma,
    animationName: WKF.OneOrManyWithComma,
    animationPlayState: WKF.OneOrManyWithComma,
    animationTimingFunction: WKF.OneOrManyWithComma,
    aspectRatio: {
        sep: "/"
    },

    background: {
        num: WKF.Color,
        any: {
            num: WKF.Color,
            props: [
                ["color", WKF.Color],
                "image",
                ["position", WKF.Position],
                ["size", WKF.MultiLengthWithSpace, "/"],
                "repeat",
                "attachment",
                "origin",
                "clip"
            ]
        },
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
    borderBlockColor: WKF.Colors,
    borderBlockEnd: WKF.Border,
    borderBlockEndColor: WKF.Color,
    borderBlockEndWidth: WKF.Length,
    borderBlockStart: WKF.Border,
    borderBlockStartColor: WKF.Color,
    borderBlockStartWidth: WKF.Length,
    borderBlockWidth: WKF.Length,
    borderBottom: WKF.Border,
    borderBottomColor: WKF.Color,
    borderBottomLeftRadius: WKF.Radius,
    borderBottomRightRadius: WKF.Radius,
    borderBottomWidth: WKF.Length,
    borderColor: WKF.Colors,
    borderEndEndRadius: WKF.Radius,
    borderEndStartRadius: WKF.Radius,
    borderImage: {
        obj: borderImageToString,
    },
    borderInline: WKF.Border,
    borderInlineColor: WKF.Colors,
    borderInlineEnd: WKF.Border,
    borderInlineEndColor: WKF.Color,
    borderInlineEndWidth: WKF.Length,
    borderInlineStart: WKF.Border,
    borderInlineStartColor: WKF.Color,
    borderInlineStartWidth: WKF.Length,
    borderInlineWidth: WKF.Length,
    borderLeft: WKF.Border,
    borderLeftColor: WKF.Color,
    borderLeftWidth: WKF.Length,
    borderRadius: WKF.BorderRadius,
    borderRight: WKF.Border,
    borderRightColor: WKF.Color,
    borderRightWidth: WKF.Length,
    borderSpacing: WKF.MultiLengthWithSpace,
    borderStartEndRadius: WKF.Radius,
    borderStartStartRadius: WKF.Radius,
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
    flex: {
        num: WKF.Length,
        arr: v =>
        {
            let s = `${wkf[WKF.Number](v[0])} ${wkf[WKF.Number](v[1])}`;
            return v.length > 2 ? s +` ${wkf[WKF.Length]( v[2])}` : s;
        }
    },
    flexBasis: WKF.Length,
    floodColor: WKF.Color,
    font: {
        item: WKF.Length,
        props: [
            ["style", WKF.FontStyle],
            "variant",
            "weight",
            "stretch",
            ["size", WKF.Length],
            ["lineHeight", undefined, "/"],
            "family"
        ]
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
    inset: WKF.MultiLengthWithSpace,
    insetBlock: WKF.MultiLengthWithSpace,
    insetBlockEnd: WKF.Length,
    insetBlockStart: WKF.Length,
    insetInline: WKF.MultiLengthWithSpace,
    insetInlineEnd: WKF.Length,
    insetInlineStart: WKF.Length,

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
    markerEnd: WKF.Marker,
    markerMid: WKF.Marker,
    markerStart: WKF.Marker,
    maskBorder: {
        obj: borderImageToString,
    },
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
    offset: {
        props: [
            ["position", WKF.Position],
            "path",
            ["distance", WKF.Length],
            ["rotate", { any: WKF.Angle }],
            ["anchor", WKF.Position, "/"],
        ]
    },
    offsetAnchor: WKF.Position,
    offsetDistance: WKF.Length,
    offsetPosition: WKF.Position,
    offsetRotate: {
        any: WKF.Angle
    },
    outline: WKF.Border,
    outlineColor: WKF.Color,
    outlineOffset: WKF.Length,
    overflowClipMargin: WKF.Length,

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

    quotes: {
        item: {
            str: WKF.Quoted,
            item: WKF.Quoted,
        }
    },

    right: WKF.Length,
    rotate: {
        num: WKF.Angle,
        arr: v => {
            return v.length === 2
                ? mv2s( [ v[0], [v[1], WKF.Angle] ])
                : mv2s( [ v[0], v[1], v[2], [v[3], WKF.Angle] ]);
        }
    },
    rowGap: WKF.Length,

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
    scrollbarColor: {
        item: WKF.Color
    },
    shapeMargin: WKF.Length,
    stopColor: WKF.Color,
    stroke: WKF.Color,

    textCombineUpright: {
        num: v => `digits ${v}`
    },
    textDecoration: {
        num: WKF.Color,
        props: [
            "line",
            "style",
            ["color", WKF.Color],
            ["thickness", WKF.Length],
        ]
    },
    textDecorationColor: WKF.Color,
    textDecorationThickness: WKF.Length,
    textEmphasis: WKF.Color,
    textEmphasisColor: WKF.Color,
    textFillColor: WKF.Color,
    textIndent: WKF.MultiLengthWithSpace,
    textShadow: WKF.BoxShadow,
    textSizeAdjust: WKF.Percent,
    textStrokeColor: WKF.Color,
    textStrokeWidth: WKF.Length,
    top: WKF.Length,
    transformOrigin: WKF.MultiLengthWithSpace,
    transition: {
        any: { props: [
            ["property", camelToDash],
            ["duration", WKF.Time],
            "func",
            ["delay", WKF.Time]
        ]},
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
    CssString: WKF.Quoted,
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
    webkit = 1,
    moz = 2,
    ms = 3,
}

// Vendor prefixes with indexes from the VendorPrefix enumeration. The first one is only here to
// allow the first enumeration value to be 1 and not zero.
const vendorPrefixStrings = ["", "webkit", "moz", "ms"];


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
 *   - string - specifies the new name of the property
 *   - number - specifies the single supported vendor prefix
 */
type PropPrefixInfo = string | number |
    {
        // Prefix index
        p: VendorPrefix;

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


const getPrefixVariants = (name: keyof IStyleset, value: string): PropPrefixVariant[] | null =>
{
    let info = propPrefixInfos[name];
    if (!info)
        return null;

    if (typeof info === "string")
        return [[info, value]];

    if (typeof info === "number")
        return [[dashToCamel(`${vendorPrefixStrings[info]}-${name}`), value]];

    let variants: PropPrefixVariant[] = [];
    for( let item of info)
    {
        if (typeof item === "string")
            variants.push( [item, value]);
        else if (typeof item === "number")
            variants.push( [dashToCamel(`${vendorPrefixStrings[item]}-${name}`), value]);
        else
        {
            let prefixString = vendorPrefixStrings[item.p];

            // determine whether the property name should be prefixed. Note that even if we decide
            // here that it should not be prefixed, it can change when we go over property values.
            let shouldPrefixProperty = !item.valsOnly;

            // if property values are defined, try to replace them with prefixed versions. Note that
            // this can also set the flag indicating that the property name should be prefixed too.
            let newPropValue = "";
            if (value && item.vals)
            {
                for( let valueInfo of item.vals)
                {
                    let valueToSearch = valueInfo.val;
                    if (value.indexOf( valueToSearch) < 0)
                        continue;

                    if (valueInfo.mode !== ValuePrefixMode.PropertyOnly)
                    {
                        newPropValue = value.replace( valueToSearch,
                            valueInfo.alt ? valueInfo.alt : `-${prefixString}-${valueToSearch}`);
                        value = newPropValue;
                    }

                    if (valueInfo.mode !== ValuePrefixMode.ValueOnly)
                        shouldPrefixProperty = true;
                }
            }

            let newPropName = "";
            if (shouldPrefixProperty)
                newPropName = item.alt ? item.alt : dashToCamel(`${prefixString}-${name}`);

            if (newPropName || newPropValue)
                variants.push( [newPropName || name, newPropValue || value]);
        }
    }

    return variants.length > 0 ? variants : null;
}



// Prefix information for size-like properties that accept "stretch" value
const sizePrefixInfo: PropPrefixInfo[] = [
    {p: VendorPrefix.webkit, valsOnly: true, vals: [{val: "stretch", mode: ValuePrefixMode.ValueOnly, alt: "-webkit-fill-available"}]},
];



const propPrefixInfos: { [K in keyof IStyleset]?: string | number | PropPrefixInfo[] } =
{
    appearance: [ VendorPrefix.webkit, VendorPrefix.moz ],
    backgroundClip: [
        {p: VendorPrefix.webkit, valsOnly: true, vals: [{val: "text", mode: ValuePrefixMode.PropertyOnly}]}
    ],
    blockSize: sizePrefixInfo,
    boxDecorationBreak: VendorPrefix.webkit,
    colorAdjust: "webkitPrintColorAdjust",
    clipPath: VendorPrefix.webkit,
    height: sizePrefixInfo,
    hyphens: [ VendorPrefix.webkit, VendorPrefix.moz, VendorPrefix.ms ],
    initialLetter: VendorPrefix.webkit,
    inlineSize: sizePrefixInfo,
    lineClamp: VendorPrefix.webkit,
    mask: VendorPrefix.webkit,
    maskBorder: "webkitMaskBoxImage",
    maskBorderOutset: "webkitMaskBoxImageOutset",
    maskBorderRepeat: "webkitMaskBoxImageRepeat",
    maskBorderSlice: "webkitMaskBoxImageSlice",
    maskBorderSource: "webkitMaskBoxImageSource",
    maskBorderWidth: "webkitMaskBoxImageWidth",
    maskClip: VendorPrefix.webkit,
    maskComposite: VendorPrefix.webkit,
    maskImage: VendorPrefix.webkit,
    maskMode: VendorPrefix.webkit,
    maskOrigin: VendorPrefix.webkit,
    maskPosition: VendorPrefix.webkit,
    maskRepeat: VendorPrefix.webkit,
    maskSize: VendorPrefix.webkit,
    maskType: VendorPrefix.webkit,
    maxBlockSize: sizePrefixInfo,
    maxHeight: sizePrefixInfo,
    maxInlineSize: sizePrefixInfo,
    maxWidth: sizePrefixInfo,
    minBlockSize: sizePrefixInfo,
    minHeight: sizePrefixInfo,
    minInlineSize: sizePrefixInfo,
    minWidth: sizePrefixInfo,
    scrollbarColor: VendorPrefix.webkit,
    scrollbarWidth: VendorPrefix.webkit,
    textEmphasis: VendorPrefix.webkit,
    textEmphasisColor: VendorPrefix.webkit,
    textEmphasisPosition: VendorPrefix.webkit,
    textEmphasisStyle: VendorPrefix.webkit,
    textFillColor: VendorPrefix.webkit,
    textOrientation: VendorPrefix.webkit,
    textSizeAdjust: [ VendorPrefix.webkit, VendorPrefix.moz, VendorPrefix.ms ],
    textStroke: VendorPrefix.webkit,
    textStrokeColor: VendorPrefix.webkit,
    textStrokeWidth: VendorPrefix.webkit,
    userSelect: [
        {p: VendorPrefix.webkit, vals: [{val: "none", mode: ValuePrefixMode.PropertyOnly}]}
    ],
    width: sizePrefixInfo,
}



