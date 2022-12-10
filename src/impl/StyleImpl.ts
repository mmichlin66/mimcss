import {Extended} from "../api/CoreTypes";
import {
    BorderImage_Object, Border_StyleType, GridTemplateAreas_StyleType,
    GridTemplateAreaDefinition, GridTrack, GridTemplateAxis_StyleType, Marker_StyleType,
    BoxShadow_StyleType, BoxShadow,
} from "../api/StyleTypes";
import { CustomVar_StyleType, IStyleset, StringStyleset, Styleset} from "../api/Stylesets";
import {IIDRule} from "../api/RuleTypes";
import {v2s, V2SOptions, o2s, WKF, a2s, wkf, camelToDash, dashToCamel, AnyToStringFunc} from "./Utils";
import {getVarsFromSD} from "../rules/RuleContainer";



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
        valCopy.slice = "100%";
    if (val.width == null && val.outset != null)
        valCopy.width = 1;

    return o2s( valCopy, [
        "source",
        "slice",
        ["width", , "/"],
        ["outset", , "/"],
        "repeat",
        "mode"
    ]);
}



wkf[WKF.BoxShadowSingle] = (val: BoxShadow) => v2s( val, {
    obj:[
        ["inset", (v: boolean) => v ? "inset" : ""],
        ["x", WKF.Length, , "0"],
        ["y", WKF.Length, , "0"],
        ["blur", WKF.Length],
        ["spread", WKF.Length],
        ["color", WKF.Color]
    ]
});

wkf[WKF.BoxShadow] = (val: BoxShadow_StyleType) => v2s( val, {
    obj: WKF.BoxShadowSingle,
    item: WKF.BoxShadowSingle,
    sep: ","
});



wkf[WKF.Border] = (val: Extended<Border_StyleType>): string => v2s( val, {
    // single number is interpreted as line width. Also the style "solid" is added because
    // otherwise style defaults to "none".
    num: v => wkf[WKF.Length](v) + " solid",
    // if the single string doesn't indicate style, then the style keyword "solid" is added
    // because otherwise style defaults to "none".
    str: v => ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"].includes(v) ? v : v + " solid",
    obj: [
        ["width", WKF.Length],
        "style",
        ["color", WKF.Color]
    ],
    // first number in a tuple is interpreted as line width, unless line width has already been
    // specified as a keyword
    arr: tuple => {
        let widthEncountered = false;
        return a2s( tuple, item => {
            if (typeof item === "number")
            {
                let ret = v2s( item, widthEncountered ? WKF.Color : WKF.Length)
                widthEncountered = true;
                return ret;
            }
            else
            {
                if (["thin", "medium", "thick"].includes(item))
                    widthEncountered = true;

                return v2s(item);
            }
        });
    },
});




const gridTemplateAreasToString = (val: Extended<GridTemplateAreas_StyleType>): string =>
    // val can be array of strings or GridTemplateArea_Definition touples
    v2s( val, {
        arr: v => typeof v[0] === "string" ? a2s( v, WKF.Quoted) : createGridTemplateAreasFromDefinitions(v)
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
        obj2: (v: IIDRule) => `url(${v.cssName})`
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for handling Stylesets.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given style property to the CSS style string. Property name can be in either
 * dash or camel form.
 */
export const sp2s = (propName: string, propVal: any): string =>
{
    if (!propName)
        return "";

    // handle special properties "!" and "[]"
    let impFlag = false;
    if (typeof propVal === "object")
    {
        if ("!" in propVal)
        {
            // if the property value is an object with the "!" property, then the actual value is
            // the value of this property and we also need to set the "!important" flag.
            propVal = propVal["!"];
            impFlag = true;
        }
        else if ("[]" in propVal)
        {
            // If the property value is an object with the "[]" property, then we take the last
            // value from this property's array.
            let arr = propVal["[]"] as any[];
            if (!arr || arr.length === 0)
                return "";

            // recurse with the last value from the array
            return sp2s( propName, arr[arr.length-1]);
        }
    }

    // try to find information object for the property - either defined in stylePropertyInfos or
    // matches a key in partialStylePropertyInfos. First try the property as is; if not found, try
    // to convert it to camelCase.
    let options = stylePropertyInfos[propName];
    if (!options && propName.includes("-"))
        options = stylePropertyInfos[dashToCamel(propName)];

    // convert the value to string based on the information object for the property (if defined)
    let stringValue = v2s( propVal, options);
    if (!stringValue)
        return "";

    if (impFlag)
        stringValue += " !important";

    return stringValue;
}



/** Converts the given styleset to its string representation */
export const s2s = (styleset: Styleset): string =>
{
    if (!styleset)
        return "";

    let s = "";

    // enumerate all styleset properties retrieving also vendor-prefixed variants
	forAllPropsInStylset(
        styleset,
        (name: string, value: string | undefined | null, isCustom: boolean, isPrefixed: boolean): void =>
        {
            s += isCustom
                ? `${name}:${value};`
                : `${isPrefixed ? "-" : ""}${camelToDash(name)}:${value};`;
        }
    );

    return s;
}



/**
 * Converts the given Styleset object into a StringStyleset object, where each Styleset's property
 * is converted to its string value.
 */
export const s2ss = (styleset: Styleset): StringStyleset =>
{
    // enumerate all styleset properties without retrieving vendor-prefixed variants
    let res: StringStyleset = {};
    forAllPropsInStylset( styleset, (name: string, value: string): void => {res[name] = value});
    return res;
}



/**
 * The tuple that contains the result of applying vendor prefixing on a property.
 * - property name (that may or may not be prefixed).
 * - property value (that may or may not have prefixed items)
 */
type PropPrefixVariant = [string, string];


/** Tuple that contains name, template and optional value of a custom CSS property VarRule */
type VarNTV = [string, string, string?];



/**
 * Extracts name, template and string tuples from the given custom CSS property definition.
 * @param customVars
 */
const getVarsNTVs = (customVars: CustomVar_StyleType): VarNTV[] =>
{
    if (Array.isArray(customVars))
    {
        let varName: string;
        let template: string;
        let value: any;
        if (customVars.length === 2)
        {
            varName = customVars[0].name;
            template = customVars[0].template;
            value = customVars[1]
        }
        else
        {
            varName = customVars[0];
            template = customVars[1];
            value = customVars[2];
        }

        if (!varName || !template)
            return [];

        if (!varName.startsWith("--"))
            varName = "--" + varName;

        return [[varName, template, sp2s( template, value)]];
    }
    else
    {
        let varRules = getVarsFromSD(customVars);
        return varRules.map( varRule => [varRule.cssName, varRule.template,
            sp2s( varRule.template, varRule.getValue())]);
    }
}



/**
 * Callback signature for enumerating Styleset properties converted to strings
 */
type StylesetPropEnumCallback = (name: string, val: string | undefined | null,
    isCustom: boolean, isPrefixed: boolean) => void;



/**
 * For each property - regular and custom - in the given styleset invokes the appropriate
 * function that gets the property name and the value converted to string.
 * @param styleset
 * @param callback
 * @param getPrefixedVariants Flag indicating whether we need to retrieve property variants with
 * vendor prefixes
 */
const forAllPropsInStylset = (styleset: Styleset, callback: StylesetPropEnumCallback) =>
{
	for( let propName in styleset)
	{
        // special handling of the "--" property, which is an array where each item is
        // a two-item or three-item array
		if (propName === "--")
        {
            let customVars = styleset[propName] as CustomVar_StyleType[];
            for( let customVar of customVars)
            {
                if (!customVar)
                    continue;

                // in each tuple, the first element is var name, the second is template property and
                // the third is the value;
                let ntvs: VarNTV[] = getVarsNTVs( customVar);
                for( let ntv of ntvs)
                    callback( ntv[0], ntv[2], true, false);
            }
        }
        else
        {
            let propVal = styleset[propName];
            if (propVal == null)
                continue;
            else
            {
                // check whether the property contains an array of values behind the object with
                // the "[]" property. If not, convert the single value to an array, so that we can
                // iterate over it.
                let propArray = propVal["[]"] as any[];
                if (!propArray)
                    propArray = [propVal];

                for( let propVal of propArray)
                {
                    // get the string representation of the property value
                    let propString = sp2s( propName, propVal);
                    if (!propString)
                        continue;

                    // get vendor-prefixed variants
                    let variants = getPrefixVariants( propName as keyof IStyleset, propString);
                    if (variants)
                    {
                        for( let variant of variants)
                            callback( variant[0], variant[1], false, variant[0] !== propName);
                    }

                    // invoke the callback for the originally found prop name and with (perhaps updated)
                    // value
                    callback( propName, propString, false, false);
                }
            }
        }
	}
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

export const s_registerSP = (name: string, toStringFunc: AnyToStringFunc) =>
    name in stylePropertyInfos ? false : (stylePropertyInfos[name] = toStringFunc, true);



/**
 * Map of property names to the V2SOptions objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const stylePropertyInfos: { [K: string]: V2SOptions } =
{
    accentColor: WKF.Color,
    animation: {
        any: { obj: [
            ["duration", WKF.Time],
            "func",
            ["delay", WKF.Time],
            ["count", WKF.Number],
            "direction",
            "mode",
            "state",
            "name",
            "timeline",
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

    background: {
        num: WKF.Color,
        any: {
            num: WKF.Color,
            obj: [
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
    borderBlockColor: WKF.Color,
    borderBlockEnd: WKF.Border,
    borderBlockEndColor: WKF.Color,
    borderBlockEndWidth: WKF.Length,
    borderBlockStart: WKF.Border,
    borderBlockStartColor: WKF.Color,
    borderBlockStartWidth: WKF.Length,
    borderBlockWidth: WKF.MultiLengthWithSpace,
    borderBottom: WKF.Border,
    borderBottomColor: WKF.Color,
    borderBottomLeftRadius: WKF.Radius,
    borderBottomRightRadius: WKF.Radius,
    borderBottomWidth: WKF.Length,
    borderColor: WKF.Color,
    borderEndEndRadius: WKF.Radius,
    borderEndStartRadius: WKF.Radius,
    borderInline: WKF.Border,
    borderInlineColor: WKF.Color,
    borderInlineEnd: WKF.Border,
    borderInlineEndColor: WKF.Color,
    borderInlineEndWidth: WKF.Length,
    borderInlineStart: WKF.Border,
    borderInlineStartColor: WKF.Color,
    borderInlineStartWidth: WKF.Length,
    borderInlineWidth: WKF.MultiLengthWithSpace,
    borderImage: {
        obj: borderImageToString,
    },
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
    color: WKF.Color,
    columnGap: WKF.Length,
    columnRule: WKF.Border,
    columnRuleWidth: WKF.Length,
    columnRuleColor: WKF.Color,
    columnWidth: WKF.Length,
    content: {
        str: WKF.Quoted,
        item: WKF.Quoted
    },
    cursor: WKF.OneOrManyWithComma,

    fill: WKF.Color,
    fillOpacity: WKF.Percent,
    floodColor: WKF.Color,
    flex: {
        num: WKF.Length,
        arr: {
            3: [WKF.Number, WKF.Number, WKF.Length]
        }
    },
    flexBasis: WKF.Length,
    font: {
        item: WKF.Length,
        obj: [
            ["style", WKF.FontStyle],
            "variant",
            "weight",
            "stretch",
            ["size", WKF.Length],
            ["lineHeight", , "/"],
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

    inset: WKF.MultiLengthWithSpace,
    insetBlock: WKF.MultiLengthWithSpace,
    insetBlockEnd: WKF.MultiLengthWithSpace,
    insetBlockStart: WKF.MultiLengthWithSpace,
    insetInline: WKF.MultiLengthWithSpace,
    insetInlineEnd: WKF.MultiLengthWithSpace,
    insetInlineStart: WKF.MultiLengthWithSpace,
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
    markerEnd: WKF.Marker,
    markerMid: WKF.Marker,
    markerStart: WKF.Marker,
    maskBorder: {
        obj: borderImageToString,
    },
    maskBorderWidth: WKF.MultiLengthWithSpace,
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
    maxInlineSize: WKF.Length,
    maxHeight: WKF.Length,
    maxWidth: WKF.Length,
    minBlockSize: WKF.Length,
    minInlineSize: WKF.Length,
    minHeight: WKF.Length,
    minWidth: WKF.Length,

    objectPosition: WKF.MultiPosition,
    offset: {
        obj: [
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
    outlineWidth: WKF.Length,
    overflowClipMargin: WKF.MultiLengthWithSpace,

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
        arr: {
            2: [WKF.Default, WKF.Angle],
            any: [WKF.Default, WKF.Default, WKF.Default, WKF.Angle],
        }
    },
    rowGap: WKF.Length,

    scrollbarColor: WKF.Color,
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
    shapeMargin: WKF.MultiLengthWithSpace,
    size: WKF.MultiLengthWithSpace,
    stopColor: WKF.Color,
    stroke: WKF.Color,
    strokeDasharray: {
        any: WKF.Length
    },
    strokeDashoffset: WKF.Length,
    strokeOpacity: WKF.Percent,
    strokeWidth: WKF.Length,

    textCombineUpright: {
        num: v => `digits ${v}`
    },
    textDecoration: {
        num: WKF.Color,
        obj: [
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
        any: { obj: [
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

    // properties for CSS syntax values
    "<number>#": WKF.OneOrManyWithComma,

    "<length>": WKF.Length,
    "<length>+": WKF.MultiLengthWithSpace,
    "<length>#": { any: WKF.Length, sep: ","},

    "<percentage>": WKF.Percent,
    "<percentage>+": { any: WKF.Percent },
    "<percentage>#": { any: WKF.Percent, sep: ","},

    "<length-percentage>": WKF.Length,
    "<length-percentage>+": WKF.MultiLengthWithSpace,
    "<length-percentage>#": { any: WKF.Length, sep: ","},

    "<angle>": WKF.Angle,
    "<angle>+": { any: WKF.Angle },
    "<angle>#": { any: WKF.Angle, sep: ","},

    "<time>": WKF.Time,
    "<time>+": { any: WKF.Time },
    "<time>#": WKF.MultiTimeWithComma,

    "<resolution>": WKF.Resolution,
    "<resolution>+": { any: WKF.Resolution },
    "<resolution>#": { any: WKF.Resolution, sep: ","},

    "<color>": WKF.Color,
    "<color>+": WKF.Colors,
    "<color>#": { any: WKF.Color, sep: ","},

    "<image>#": WKF.OneOrManyWithComma,

    "<custom-ident>#": WKF.OneOrManyWithComma,

    // special properties for IVarRule types
    "<string>": WKF.Quoted,
    "<frequency>": WKF.Frequency,
    "<size>": WKF.Length,
    "<point>": WKF.MultiLengthWithSpace,
    "<position>": WKF.Position,
    "<multi-position>": WKF.MultiPosition,
    "<radius>": WKF.Radius,
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
                        newPropValue = value.split(valueToSearch).join(
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
const sizePrefixInfos: PropPrefixInfo[] = [
    {p: VendorPrefix.webkit, valsOnly: true, vals: [{val: "stretch", mode: ValuePrefixMode.ValueOnly, alt: "-webkit-fill-available"}]},
];

// Prefix information for properties that accept "cross-fade" and "image-set" functions (that is, images)
const imageFuncsPrefixInfo: PropPrefixInfo = {
    p: VendorPrefix.webkit, valsOnly: true, vals: [
        {val: "cross-fade", mode: ValuePrefixMode.ValueOnly },
        {val: "image-set", mode: ValuePrefixMode.ValueOnly }
    ]
};

const imageFuncsPrefixInfos: PropPrefixInfo[] = [imageFuncsPrefixInfo];


const propPrefixInfos: { [K in keyof IStyleset]?: string | number | PropPrefixInfo[] } =
{
    appearance: [ VendorPrefix.webkit, VendorPrefix.moz ],
    backgroundClip: [
        {p: VendorPrefix.webkit, valsOnly: true, vals: [{val: "text", mode: ValuePrefixMode.PropertyOnly}]}
    ],
    blockSize: sizePrefixInfos,
    boxDecorationBreak: VendorPrefix.webkit,
    background: imageFuncsPrefixInfos,
    backgroundImage: imageFuncsPrefixInfos,
    borderImage: imageFuncsPrefixInfos,
    borderImageSource: imageFuncsPrefixInfos,
    clipPath: VendorPrefix.webkit,
    colorAdjust: "webkitPrintColorAdjust",
    content: imageFuncsPrefixInfos,
    height: sizePrefixInfos,
    hyphens: [ VendorPrefix.webkit, VendorPrefix.moz, VendorPrefix.ms ],
    initialLetter: VendorPrefix.webkit,
    inlineSize: sizePrefixInfos,
    lineClamp: VendorPrefix.webkit,
    mask: VendorPrefix.webkit,
    maskBorder: ["webkitMaskBoxImage", imageFuncsPrefixInfo],
    maskBorderOutset: "webkitMaskBoxImageOutset",
    maskBorderRepeat: "webkitMaskBoxImageRepeat",
    maskBorderSlice: "webkitMaskBoxImageSlice",
    maskBorderSource: "webkitMaskBoxImageSource",
    maskBorderWidth: "webkitMaskBoxImageWidth",
    maskClip: VendorPrefix.webkit,
    maskComposite: VendorPrefix.webkit,
    maskImage: [VendorPrefix.webkit, imageFuncsPrefixInfo],
    maskMode: VendorPrefix.webkit,
    maskOrigin: VendorPrefix.webkit,
    maskPosition: VendorPrefix.webkit,
    maskRepeat: VendorPrefix.webkit,
    maskSize: VendorPrefix.webkit,
    maskType: VendorPrefix.webkit,
    maxBlockSize: sizePrefixInfos,
    maxHeight: sizePrefixInfos,
    maxInlineSize: sizePrefixInfos,
    maxWidth: sizePrefixInfos,
    minBlockSize: sizePrefixInfos,
    minHeight: sizePrefixInfos,
    minInlineSize: sizePrefixInfos,
    minWidth: sizePrefixInfos,
    shapeOutside: imageFuncsPrefixInfos,
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
    width: sizePrefixInfos,
}



