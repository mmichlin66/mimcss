import * as StyleTypes from "./StyleTypes"
import {IStyleset} from "./StyleTypes"
import {Extended, MultiCssPosition, CssRadius, OneOrMany} from "./UtilTypes";
import {
    camelToDash, valueToString, arrayToString, objectToString, IValueConvertOptions,
    positionToString, multiPositionToString, CssLengthMath, CssTimeMath, CssNumberMath,
    CssAngleMath, CssFrequencyMath, CssFractionMath, CssPercentMath, CssResolutionMath
} from "./UtilFuncs"
import {colorToString} from "./ColorFuncs";
import {VarRule} from "../rules/VarRule";



// helper functions for style property conversions
function multiPositionToStringWithComma( val: Extended<MultiCssPosition>): string { return multiPositionToString( val, ","); }



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
        ["size", CssLengthMath.multiStyleToStringWithSpace, "/"],
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
        fromArray: CssLengthMath.multiStyleToStringWithSpace
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
        ["lineHeight", v => v.toString() , "/"],
        "family"
    ]);
}



function fontStyleToString( val: Extended<StyleTypes.Font_StyleType>): string
{
    return valueToString( val, {
        fromNumber: v => "oblique " + CssAngleMath.styleToString( v)
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for handling Stylesets.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Merges properties from the source styleset to the target styleset. All regular properties are
 * replaced. Properties "--" and "!" get special treatment because they might be arrays.
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

    // check whether custom properties and important properties are defined. If we don't have
    // either, we can just use the Object.assign function.
    let sourceCustomProps = source["--"];
    let sourceImpProps = source["!"];
    if (!sourceCustomProps && !sourceImpProps)
    {
        Object.assign( target, source);
        return target;
    }

    // merge custom and important properties
    mergeStylesetSpecialProps( target, source);

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
 * Merges "--" and "!" properties from the source styleset to the target styleset.
 */
export function mergeStylesetSpecialProps( target: StyleTypes.Styleset,
    source: StyleTypes.Styleset): void
{
    // check whether custom properties and important properties are defined
    let sourceCustomProps = source["--"];
    let sourceImpProps = source["!"];
    if (!sourceCustomProps && !sourceImpProps)
        return;

    // merge custom properties
    if (sourceCustomProps)
    {
        let targetCustomProps = target["--"];
        target["--"] = !targetCustomProps ? sourceCustomProps.slice() : targetCustomProps.concat( sourceCustomProps);
    }

    // merge important properties
    if (sourceImpProps)
    {
        let targetImpProps = target["!"];
        target["!"] = !targetImpProps ? sourceImpProps.slice() : targetImpProps.concat( sourceImpProps);
    }
}



/** Converts the given styleset to its string representation */
export function stylesetToString( styleset: StyleTypes.Styleset): string
{
    if (!styleset)
        return "";

    let impProps: Set<string> | null = null;
    if (styleset["!"])
    {
        // value is either a single name or an array of names of CSS properties to add the !important flag
        impProps = new Set<string>();
        let impPropVal = styleset["!"] as (string | string[]);
        if (typeof impPropVal === "string")
            impProps.add( impPropVal);
        else
            impPropVal.forEach( v => impProps!.add( v));
    }

    let buf: string[] = [];
	for( let propName in styleset)
	{
        if (propName === "!")
            continue;
        if (propName === "--")
        {
            // special handling of the "--" property, which is an array where each item is
            // a two-item or three-item array
            let propVal = styleset[propName] as StyleTypes.CustomVarStyleType[];
            for( let customVal of propVal)
            {
                if (!customVal)
                    continue;

                buf.push( customPropToString( customVal, false));
            }
        }
        else
        {
            // get the string representation of the property
            buf.push( stylePropToString( propName as keyof IStyleset, styleset[propName]) +
                    (impProps && impProps.has( propName) ? " !important" : ""));
        }
	}

    // join all elements in the array except nulls, undefined and empty strings
    return buf.filter( item => item != null).join(";");
}



/**
 * Converts the given custom CSS property definition to string.
 * @param propVal 
 * @param valueOnly 
 */
function customPropToString( propVal: StyleTypes.CustomVarStyleType, valueOnly?: boolean): string
{
    if (!propVal)
        return "";

    let varName: string;
    let template: string;
    let value: any;
    if (propVal.length === 2)
    {
        varName = (propVal[0] as VarRule).cssName;
        template = propVal[0].template;
        value = propVal[1]
    }
    else
    {
        varName = propVal[0];
        if (!varName)
            return "";
        else if (!varName.startsWith("--"))
            varName = "--" + varName;

        template = propVal[1];
        if (!varName || !template)
            return "";

        value = propVal[2];
    }

    let varValue = stylePropToString( template, value, true);
    return valueOnly ? varValue : `${varName}:${varValue}`;
}



/**
 * Converts the given style property to the CSS style string
 * @param style 
 */
export function stylePropToString(
    propName: string, propVal: any, valueOnly?: boolean): string
{
    if (!propName)
        return "";

    // find information object for the property
    let info: any = StylePropertyInfos[propName];

    let varValue = !info
        ? valueToString( propVal)
        : typeof info === "object"
            ? valueToString( propVal, info as IValueConvertOptions)
            : (info as PropToStringFunc)( propVal);

    if (!varValue && !valueOnly)
        varValue = "initial";
        
    return valueOnly ? varValue : `${camelToDash( propName)}:${varValue}`;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// /** Type defnition of a function that takes property value and converts it to string */
// type PropToStringFunc<K extends StyleTypes.VarTemplateName = any> = (val: StyleTypes.VarValueType<K>) => string;

/** Type defnition of a function that takes property value and converts it to string */
type PropToStringFunc = (val: any) => string;



// Helper object that is used to indicate that values in an array should be separated by comma.
// We use it many times in the stucture below.
let commaArraySeparator = { arraySeparator: "," };



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in StyleTypes.VarTemplateName]?: (PropToStringFunc | IValueConvertOptions) } =
{
    animation: {
        fromObject: singleAnimation_fromObject,
        fromAny: singleAnimation_fromStyle,
        arraySeparator: ",",
    },
    animationDelay: CssTimeMath.multiStyleToStringWithComma,
    animationDuration: CssTimeMath.multiStyleToStringWithComma,
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
    backgroundPosition: multiPositionToStringWithComma,
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
    borderSpacing: CssLengthMath.multiStyleToStringWithSpace,
    borderTop: borderToString,
    borderTopColor: colorToString,
    borderTopLeftRadius: singleCornerRadiusToString,
    borderTopRightRadius: singleCornerRadiusToString,
    borderTopWidth: CssLengthMath.styleToString,
    borderWidth: CssLengthMath.multiStyleToStringWithSpace,
    bottom: CssLengthMath.styleToString,
    boxShadow: {
        fromObject: singleBoxShadow_fromObject,
        arraySeparator: ",",
    },

    caretColor: colorToString,
    clip:  {
        fromArray: v => `rect(${CssLengthMath.multiStyleToStringWithSpace(v)}`
    },
    color: colorToString,
    columnGap: CssLengthMath.styleToString,
    columnRule: borderToString,
    columnRuleColor: colorToString,
    columnRuleStyle: valueToString,
    columnRuleWidth: CssLengthMath.multiStyleToStringWithSpace,
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

    gap: CssLengthMath.multiStyleToStringWithSpace,
    gridColumnGap: CssLengthMath.styleToString,
    gridRowGap: CssLengthMath.styleToString,

    height: CssLengthMath.styleToString,

    inlineSize: CssLengthMath.styleToString,

    left: CssLengthMath.styleToString,
    letterSpacing: CssLengthMath.styleToString,
    lightingColor: colorToString,

    margin: CssLengthMath.multiStyleToStringWithSpace,
    marginBlockEnd: CssLengthMath.styleToString,
    marginBlockStart: CssLengthMath.styleToString,
    marginBottom: CssLengthMath.styleToString,
    marginInlineEnd: CssLengthMath.styleToString,
    marginInlineStart: CssLengthMath.styleToString,
    marginLeft: CssLengthMath.styleToString,
    marginRight: CssLengthMath.styleToString,
    marginTop: CssLengthMath.styleToString,
    maxBlockSize: CssLengthMath.styleToString,
    maxHeight: CssLengthMath.styleToString,
    maxInlineSize: CssLengthMath.styleToString,
    maxWidth: CssLengthMath.styleToString,
    maxZoom: CssPercentMath.styleToString,
    minBlockSize: CssLengthMath.styleToString,
    minHeight: CssLengthMath.styleToString,
    minInlineSize: CssLengthMath.styleToString,
	minWidth: CssLengthMath.styleToString,
    minZoom: CssPercentMath.styleToString,

    objectPosition: positionToString,
    outline: borderToString,
    outlineColor: colorToString,
    outlineOffset: CssLengthMath.styleToString,
    outlineStyle: valueToString,

    padding: CssLengthMath.multiStyleToStringWithSpace,
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
    rowGap: CssLengthMath.styleToString,

    scrollMargin: CssLengthMath.multiStyleToStringWithSpace,
    scrollMarginBlock: CssLengthMath.multiStyleToStringWithSpace,
    scrollMarginBlockEnd: CssLengthMath.styleToString,
    scrollMarginBlockStart: CssLengthMath.styleToString,
    scrollMarginBottom: CssLengthMath.styleToString,
    scrollMarginInline: CssLengthMath.multiStyleToStringWithSpace,
    scrollMarginInlineEnd: CssLengthMath.styleToString,
    scrollMarginInlineStart: CssLengthMath.styleToString,
    scrollMarginLeft: CssLengthMath.styleToString,
    scrollMarginRight: CssLengthMath.styleToString,
    scrollMarginTop: CssLengthMath.styleToString,
    scrollPadding: CssLengthMath.multiStyleToStringWithSpace,
    scrollPaddingBlock: CssLengthMath.multiStyleToStringWithSpace,
    scrollPaddingBlockEnd: CssLengthMath.styleToString,
    scrollPaddingBlockStart: CssLengthMath.styleToString,
    scrollPaddingBottom: CssLengthMath.styleToString,
    scrollPaddingInline: CssLengthMath.multiStyleToStringWithSpace,
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
    "CssFraction": CssFractionMath.styleToString,
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
        stylePropToString( propName as keyof IStyleset, query[propName])).join( ") and (")})`;
}



