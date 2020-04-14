import * as StyleTypes from "./StyleTypes"
import {IStyleset} from "./StyleTypes"
import {Extended, MultiCssPosition} from "./UtilTypes";
import {camelToDash, valueToString, arrayToCssString, objectToCssString,
    IValueConvertOptions, positionToString, multiPositionToString, LengthMath, TimeMath, NumMath, AngleMath
} from "./UtilFuncs"
import {colorToString} from "./ColorFuncs";



// helper functions for style property conversions
function multiPositionToStringWithComma( val: Extended<MultiCssPosition>): string { return multiPositionToString( val, ","); }



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Functions for converting CSS property types to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

function singleAnimation_fromObject( val: StyleTypes.SingleAnimation): string
{
    return objectToCssString( val, false,
            ["duration", TimeMath.styleToString],
            ["func", singleAnimationTimingFunction_fromStyle],
            ["delay", TimeMath.styleToString],
            ["count", NumMath.styleToString],
            "direction",
            "mode",
            "state",
            "name");
}



function singleAnimation_fromStyle( val: Extended<StyleTypes.SingleAnimation>): string
{
    return valueToString( val, {
        fromObject: singleAnimation_fromObject
    });
}



function animationTimingFunction_fromNumber( val: number): string
{
    return `steps(${val})`;
}



function animationTimingFunction_fromArray( val: any[]): string
{
    return typeof val[0] === "number"
        ? singleAnimationTimingFunction_fromStyle( val as StyleTypes.SingleAnimationTimingFunction)
        : arrayToCssString( val, singleAnimationTimingFunction_fromStyle, ",");
}



function singleAnimationTimingFunction_fromStyle( val: Extended<StyleTypes.SingleAnimationTimingFunction>): string
{
    return valueToString( val, {
        fromNumber: animationTimingFunction_fromNumber,
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



function singleBackgroundSize_fromStyle( val: Extended<StyleTypes.SingleBackgroundSize>): string
{
    return valueToString( val, {
        fromNumber: LengthMath.styleToString,
        fromArray: LengthMath.multiStyleToStringWithSpace
    });
}



/**
 * Converts corner radius style value to the CSS string.
 */
function singleCornerRadiusToCssString( val: StyleTypes.SingleCornerRadius_StyleType): string
{
    return valueToString( val, {
        arrayItemFunc: LengthMath.styleToString,
        fromAny: LengthMath.styleToString
    });
}



/**
 * Converts border radius style value to the CSS string.
 */
function borderRadiusToCssString( val: StyleTypes.BorderRadiusStyleType): string
{
    return valueToString( val, {
        fromArray: v =>
        {
            if (Array.isArray( v[0]))
            {
                // two MultiCornerRadius values
                let s = arrayToCssString( v[0], LengthMath.styleToString, " ");
                s += " / ";
                return s + arrayToCssString( v[1], LengthMath.styleToString, " ");
            }
            else
            {
                // single MultiCornerRadius value
                return arrayToCssString( v, LengthMath.styleToString, " ");
            }
        },
        fromAny: LengthMath.styleToString
    });
}



/**
 * Converts border spacing style value to the CSS string.
 */
function borderSpacingToCssString( val: StyleTypes.BorderSpacingStyleType): string
{
    return valueToString( val, {
        arrayItemFunc: LengthMath.styleToString,
        fromAny: LengthMath.styleToString
    });
}



/**
 * Converts border color style value to the CSS string.
 */
function borderColorToCssString( val: StyleTypes.BorderColorStyleType): string
{
    return valueToString( val, {
        arrayItemFunc: colorToString,
        fromAny: colorToString
    });
}



/**
 * Converts border side style value to the CSS string.
 */
function borderSideToCssString( val: StyleTypes.BorderSide_StyleType): string
{
    return valueToString( val, {
        fromArray: val =>
        {
            let s = "";
            if (typeof val[0] === "string")
                return val[0];
            else if (typeof val[0] === "object")
                return val[0].toString();
            else if (val[0] != null)
                s += LengthMath.styleToString( val[0]) + " ";

            if (val[1])
                s += val[1] + " ";

            if (val[2])
                s += colorToString( val[2]) + " ";

            return s;
        },
        fromNumber: LengthMath.styleToString,
        fromAny: colorToString
    });
}



/**
 * Converts border-image-outset style value to the CSS string.
 */
function borderImageOutsetToCssString( val: StyleTypes.BorderImageOutsetStyleType): string
{
    return valueToString( val, {
        arrayItemFunc: borderImageOutsetToCssString
    });
}



/**
 * Converts clip style value to its CSS string value.
 */
function clipToCssString( val: StyleTypes.ClipStyleType): string
{
    return valueToString( val, {
        fromArray: val => `rect(${arrayToCssString( val, LengthMath.styleToString, " ")}`
    });
}



/**
 * Converts column rule style represented as an object with fields corresponding to column rule
 * properties to its CSS string value.
 */
function columnRuleToCssString( val: StyleTypes.ColumnRuleStyleType): string
{
    return valueToString( val, {
        fromObject: val => objectToCssString( val, false,
            ["width", LengthMath.multiStyleToStringWithSpace],
            ["style", valueToString],
            ["color", colorToString]
        )
    });
}



/**
 * Converts columns style to its CSS string value.
 */
function columnsToCssString( val: StyleTypes.ColumnsStyleType): string
{
    return valueToString( val, {
        fromArray: val => val[0] + " " + LengthMath.styleToString( val[1])
    });
}



/**
 * Converts flex style value to the CSS string.
 */
function flexToCssString( val: StyleTypes.FlexStyleType): string
{
    return valueToString( val, {
        fromArray: val =>
        {
            if (val.length === 2)
                return val.join( " ");
            else
                return val[0] + " " + val[1] + " "+ LengthMath.styleToString( val[2]);
        },
        fromAny: LengthMath.styleToString
    });
}



/**
 * Converts font style value to the CSS string.
 */
function fontStyleToCssString( val: StyleTypes.FontStyleStyleType): string
{
    return valueToString( val, {
        fromNumber: val => "oblique " + AngleMath.styleToString( val)
    });
}



/**
 * Converts text-emphasis style value to the CSS string.
 */
function textEmphasisPositionToCssString( val: StyleTypes.TextEmphasisPositionStyleType): string
{
    return valueToString( val, {
        fromNumber: LengthMath.styleToString
    });
}



/**
 * Converts text-indent style value to the CSS string.
 */
function textIndentToCssString( val: StyleTypes.TextIndentStyleType): string
{
    return valueToString( val, {
        fromArray: val =>
        {
            let s = `${LengthMath.styleToString( val[0])} ${val[1]}`;
            if (val[2])
                s += " " + val[2];

            return s;
        },
        fromAny: LengthMath.styleToString
    });
}



/**
 * Converts translate style value to the CSS string.
 */
function translateToCssString( val: StyleTypes.TranslateStyleType): string
{
    return valueToString( val, {
        fromArray: LengthMath.multiStyleToStringWithSpace,
        fromAny: LengthMath.styleToString
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
export function mergeStylesets( target: StyleTypes.Styleset, source: StyleTypes.Styleset): StyleTypes.Styleset
{
    if (!source)
        return target;

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

    // merge custom properties
    if (sourceCustomProps)
    {
        let targetCustomProps = target["--"];
        target["--"] = !targetCustomProps ? sourceCustomProps : targetCustomProps.concat( sourceCustomProps);
    }

    // merge important properties
    if (sourceImpProps)
    {
        let targetImpProps = target["!"];
        target["!"] = !targetImpProps ? sourceImpProps : targetImpProps.concat( sourceImpProps);
    }

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



/** Converts the given styleset to its string representation */
export function stylesetToCssString( styleset: StyleTypes.Styleset): string | null
{
    if (!styleset)
        return null;

    let impProps: Set<string> = null;
    if (styleset["!"])
    {
        // value is either a single name or an array of names of CSS properties to add the !important flag
        impProps = new Set<string>();
        let impPropVal = styleset["!"] as (string | string[]);
        if (typeof impPropVal === "string")
            impProps.add( impPropVal);
        else
            impPropVal.forEach( v => impProps.add( v));
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

                buf.push( customPropToCssString( customVal, false));
            }
        }
        else
        {
            // get the string representation of the property
            buf.push( stylePropToCssString( propName as keyof IStyleset, styleset[propName]) +
                    (impProps && impProps.has( propName) ? " !important" : ""));
        }
	}

    // join all elements in the array except nulls, undefined and empty strings
    return `{${buf.filter( (item) => !!item).join(";")}}`;
}



/**
 * Converts the given custom CSS property definition to string.
 * @param propVal 
 * @param valueOnly 
 */
export function customPropToCssString<K extends keyof IStyleset>(
    propVal: StyleTypes.CustomVarStyleType<K>, valueOnly?: boolean): string | null
{
    if (!propVal)
        return null;

    let varName: string;
    let template: K;
    let value: any;
    if (propVal.length === 2)
    {
        varName = propVal[0].cssName;
        template = propVal[0].template;
        value = propVal[1]
    }
    else
    {
        varName = propVal[0];
        if (!varName)
            return null;
        else if (!varName.startsWith("--"))
            varName = "--" + varName;

        template = propVal[1];
        if (!varName || !template)
            return null;

        value = propVal[2];
    }

    let varValue = stylePropToCssString( template, value, true);
    return valueOnly ? varValue : `${varName}:${varValue}`;
}



/**
 * Converts the given style property to the CSS style string
 * @param style 
 */
export function stylePropToCssString<K extends keyof IStyleset>(
    propName: K, propVal: IStyleset[K], valueOnly?: boolean): string | null
{
    if (!propName)
        return null;

    // find information object for the property
    let info: any = StylePropertyInfos[propName];

    let varValue = !info
        ? valueToString( propVal)
        : typeof info === "object"
            ? valueToString( propVal, info as IValueConvertOptions)
            : (info as PropToStringFunc<K>)( propVal);

    if (!varValue)
        varValue = "initial";
        
    return valueOnly ? varValue : `${camelToDash( propName)}:${varValue}`;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registry of CSS properties that specifies how their values should be converted to strings.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type defnition of a function that takes property value and converts it to string */
type PropToStringFunc<K extends keyof IStyleset> = (val: IStyleset[K]) => string;



// Helper object that is used to indicate that values in an array should be separated by comma.
// We use it many times in the stucture below.
let commaArraySeparator = { arraySeparator: "," };



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in keyof IStyleset]: (PropToStringFunc<K> | IValueConvertOptions) } =
{
    animation: {
        arrayItemFunc: singleAnimation_fromStyle,
        arraySeparator: ",",
        fromObject: singleAnimation_fromObject,
        fromAny: singleAnimation_fromStyle
    },

    animationDelay: TimeMath.multiStyleToStringWithComma,
    animationDuration: TimeMath.multiStyleToStringWithComma,
    animationIterationCount: commaArraySeparator,
    animationFillMode: commaArraySeparator,
    animationName: commaArraySeparator,
    animationPlayState: commaArraySeparator,

    animationTimingFunction: {
        fromNumber: animationTimingFunction_fromNumber,
        fromArray: animationTimingFunction_fromArray
    },

    backgroundAttachment: commaArraySeparator,
    backgroundBlendMode: commaArraySeparator,
    backgroundClip: commaArraySeparator,
    backgroundColor: colorToString,
    backgroundOrigin: commaArraySeparator,
    backgroundPosition: multiPositionToStringWithComma,
    backgroundRepeat: commaArraySeparator,
    backgroundSize: {
        fromNumber: LengthMath.styleToString,
        arrayItemFunc: singleBackgroundSize_fromStyle,
        arraySeparator: ","
    },

    baselineShift: LengthMath.styleToString,

    border: borderSideToCssString,
    borderBlockEnd: borderSideToCssString,
    borderBlockEndColor: colorToString,
    borderBlockEndWidth: LengthMath.styleToString,
    borderBlockStart: borderSideToCssString,
    borderBlockStartColor: colorToString,
    borderBlockStartWidth: LengthMath.styleToString,
    borderBottom: borderSideToCssString,
    borderBottomColor: colorToString,
    borderBottomLeftRadius: singleCornerRadiusToCssString,
    borderBottomRightRadius: singleCornerRadiusToCssString,
    borderBottomWidth: LengthMath.styleToString,
    borderColor: borderColorToCssString,
    borderImageOutset: borderImageOutsetToCssString,
    borderImageWidth: LengthMath.multiStyleToStringWithSpace,
    borderInlineEnd: borderSideToCssString,
    borderInlineEndColor: colorToString,
    borderInlineEndWidth: LengthMath.styleToString,
    borderInlineStart: borderSideToCssString,
    borderInlineStartColor: colorToString,
    borderInlineStartWidth: LengthMath.styleToString,
    borderLeft: borderSideToCssString,
    borderLeftColor: colorToString,
    borderLeftWidth: LengthMath.styleToString,
    borderRadius: borderRadiusToCssString,
    borderRight: borderSideToCssString,
    borderRightColor: colorToString,
    borderRightWidth: LengthMath.styleToString,
    borderStyle: valueToString,
    borderSpacing: borderSpacingToCssString,
    borderTop: borderSideToCssString,
    borderTopColor: colorToString,
    borderTopLeftRadius: singleCornerRadiusToCssString,
    borderTopRightRadius: singleCornerRadiusToCssString,
    borderTopWidth: LengthMath.styleToString,
    borderWidth: LengthMath.multiStyleToStringWithSpace,

    bottom: LengthMath.styleToString,
    boxShadow: valueToString,

    caretColor: colorToString,
    clip: clipToCssString,
    color: colorToString,
    columnGap: LengthMath.styleToString,
    columnRule: columnRuleToCssString,
    columnRuleColor: colorToString,
    columnRuleStyle: valueToString,
    columnRuleWidth: LengthMath.multiStyleToStringWithSpace,
    columns: columnsToCssString,

    flex: flexToCssString,
    floodColor: colorToString,
    fontSize: LengthMath.styleToString,
    fontStyle: fontStyleToCssString,

    gap: LengthMath.multiStyleToStringWithSpace,
    gridColumnGap: LengthMath.styleToString,
    gridRowGap: LengthMath.styleToString,

    height: LengthMath.styleToString,

    inlineSize: LengthMath.styleToString,

    left: LengthMath.styleToString,
    letterSpacing: LengthMath.styleToString,
    lightingColor: colorToString,

    margin: LengthMath.multiStyleToStringWithSpace,
    marginBlockEnd: LengthMath.styleToString,
    marginBlockStart: LengthMath.styleToString,
    marginBottom: LengthMath.styleToString,
    marginInlineEnd: LengthMath.styleToString,
    marginInlineStart: LengthMath.styleToString,
    marginLeft: LengthMath.styleToString,
    marginRight: LengthMath.styleToString,
    marginTop: LengthMath.styleToString,
    maxBlockSize: LengthMath.styleToString,
    maxHeight: LengthMath.styleToString,
    maxInlineSize: LengthMath.styleToString,
    maxWidth: LengthMath.styleToString,
    maxZoom: LengthMath.styleToString,
    minBlockSize: LengthMath.styleToString,
    minHeight: LengthMath.styleToString,
    minInlineSize: LengthMath.styleToString,
	minWidth: LengthMath.styleToString,
    minZoom: LengthMath.styleToString,

    objectPosition: positionToString,
    outlineColor: colorToString,
    outlineOffset: LengthMath.styleToString,
    outlineStyle: valueToString,

    padding: LengthMath.multiStyleToStringWithSpace,
    paddingBlockEnd: LengthMath.styleToString,
    paddingBlockStart: LengthMath.styleToString,
    paddingBottom: LengthMath.styleToString,
    paddingInlineEnd: LengthMath.styleToString,
    paddingInlineStart: LengthMath.styleToString,
    paddingLeft: LengthMath.styleToString,
    paddingRight: LengthMath.styleToString,
    paddingTop: LengthMath.styleToString,
    perspective: LengthMath.styleToString,
    perspectiveOrigin: positionToString,

    right: LengthMath.styleToString,
    rowGap: LengthMath.styleToString,

    scrollMargin: LengthMath.multiStyleToStringWithSpace,
    scrollMarginBlock: LengthMath.multiStyleToStringWithSpace,
    scrollMarginBlockEnd: LengthMath.styleToString,
    scrollMarginBlockStart: LengthMath.styleToString,
    scrollMarginBottom: LengthMath.styleToString,
    scrollMarginInline: LengthMath.multiStyleToStringWithSpace,
    scrollMarginInlineEnd: LengthMath.styleToString,
    scrollMarginInlineStart: LengthMath.styleToString,
    scrollMarginLeft: LengthMath.styleToString,
    scrollMarginRight: LengthMath.styleToString,
    scrollMarginTop: LengthMath.styleToString,
    scrollPadding: LengthMath.multiStyleToStringWithSpace,
    scrollPaddingBlock: LengthMath.multiStyleToStringWithSpace,
    scrollPaddingBlockEnd: LengthMath.styleToString,
    scrollPaddingBlockStart: LengthMath.styleToString,
    scrollPaddingBottom: LengthMath.styleToString,
    scrollPaddingInline: LengthMath.multiStyleToStringWithSpace,
    scrollPaddingInlineEnd: LengthMath.styleToString,
    scrollPaddingInlineStart: LengthMath.styleToString,
    scrollPaddingLeft: LengthMath.styleToString,
    scrollPaddingRight: LengthMath.styleToString,
    scrollPaddingTop: LengthMath.styleToString,
    stopColor: colorToString,

    tabSize: LengthMath.styleToString,
    textDecorationColor: colorToString,
    textDecorationThickness: LengthMath.styleToString,
    textEmphasisColor: colorToString,
    textEmphasisPosition: textEmphasisPositionToCssString,
    textIndent: textIndentToCssString,
    top: LengthMath.styleToString,
    translate: translateToCssString,

    width: LengthMath.styleToString,

    zoom: LengthMath.styleToString,
};



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS supports query.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Converts the given supports query to its string representation */
export function supportsQueryToCssString( query: StyleTypes.SupportsQuery): string
{
    if (!query)
        return "";
    else if (typeof query === "string")
        return query;
    else if (Array.isArray( query))
        return query.map( (singleQuery) => singleSupportsQueryToCssString( singleQuery)).join(" or ");
    else
        return singleSupportsQueryToCssString( query);
}



/** Converts the given supports query to its string representation */
export function singleSupportsQueryToCssString( query: StyleTypes.SingleSupportsQuery): string
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
        stylePropToCssString( propName as keyof IStyleset, query[propName])).join( ") and (")})`;
}



