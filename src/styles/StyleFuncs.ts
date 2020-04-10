import * as StyleTypes from "./StyleTypes"
import {IStyleset} from "./StyleTypes"
import {camelToDash, valueToString, arrayToCssString, objectToCssString,
    multiSizeToCssString, positionToCssString, multiPositionToCssString,
    Num, Len, Angle, Time, StringProxy
} from "./UtilFuncs"
import {
    ExtendedPropType, ExtendedNumber_StyleType, ExtendedMultiNumber_StyleType, IStringProxy
} from "./UtilTypes";
import * as ColorFuncs from "./ColorFuncs";



// helper functions for style property conversions
function multiTimeToStringWithComma( val: ExtendedMultiNumber_StyleType)
{
    return Time.multiStyleToString( val, ",");

}

function multiLenToStringWithSpace( val: ExtendedMultiNumber_StyleType)
{
    return Len.multiStyleToString( val, " ");
}


/**
 * Converts animation style represented as an object with fields corresponding to animation
 * properties to its CSS string value.
 */
function singleAnimationObjectToCssString( val: StyleTypes.SingleAnimation): string
{
    return objectToCssString( val, false,
            ["duration", Time.numberToString],
            ["func", singleAnimationTimingFunctionToCssString],
            ["delay", Time.styleToString],
            ["count", Num.styleToString],
            "direction",
            "mode",
            "state",
            ["name", singleAnimationNameToCssString]);
}

/**
 * Converts animation style represented as an object with fields corresponding to animation
 * properties to its CSS string value.
 */
function singleAnimationNameToCssString( val: ExtendedPropType<StyleTypes.SingleAnimationName>): string
{
    return valueToString( val, {
        fromObject: v => (v as StyleTypes.IAnimationNameProvider).getAnimationName()
    });
}

/**
 * Converts animation style represented as an object with fields corresponding to animation
 * properties to its CSS string value.
 */
function singleAnimationToCssString( val: ExtendedPropType<StyleTypes.SingleAnimation>): string
{
    return valueToString( val, {
        fromObject: singleAnimationObjectToCssString
    });
}

/**
 * Converts animation style to its CSS string value.
 */
function animationToCssString( val: ExtendedPropType<StyleTypes.AnimationStyleType>): string
{
    return valueToString( val, {
        arrayItemFunc: singleAnimationToCssString,
        arraySeparator: ",",
        fromObject: singleAnimationObjectToCssString,
        fromAny: singleAnimationToCssString
    });
}



/**
 * Converts single animation timing function value to the CSS time string.
 */
function singleAnimationTimingFunctionToCssString( val: ExtendedPropType<StyleTypes.SingleAnimationTimingFunction>): string
{
    return valueToString( val, {
        fromNumber: v => `steps(${v})`,
        fromArray: v =>
        {
            if (v.length < 3)
            {
                // this is steps function with only the number of steps

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

/**
 * Converts animation iteration count style value to the CSS time string.
 */
function animationTimingFunctionToCssString( val: StyleTypes.AnimationTimingFunctionStyleType): string
{
    return valueToString( val, {
        fromNumber: singleAnimationTimingFunctionToCssString,
        fromArray: v =>
        {
            if (v.length === 0)
                return "";
            else if (typeof v[0] === "number")
                return singleAnimationTimingFunctionToCssString( val as StyleTypes.SingleAnimationTimingFunction);
            else
                return arrayToCssString( v as StyleTypes.SingleAnimationTimingFunction[],
                                singleAnimationTimingFunctionToCssString, ",");
        }
    });
}



/**
 * Converts corner radius style value to the CSS string.
 */
function singleCornerRadiusToCssString( val: StyleTypes.SingleCornerRadius_StyleType): string
{
    return valueToString( val, {
        arrayItemFunc: Len.styleToString,
        fromAny: Len.styleToString
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
                let s = arrayToCssString( v[0], Len.styleToString, " ");
                s += " / ";
                return s + arrayToCssString( v[1] as StyleTypes.MultiCornerRadius_StyleType, Len.styleToString, " ");
            }
            else
            {
                // single MultiCornerRadius value
                return arrayToCssString( v as StyleTypes.MultiCornerRadius_StyleType, Len.styleToString, " ");
            }
        },
        fromAny: Len.styleToString
    });
}



/**
 * Converts border spacing style value to the CSS string.
 */
function borderSpacingToCssString( val: StyleTypes.BorderSpacingStyleType): string
{
    return valueToString( val, {
        arrayItemFunc: Len.styleToString,
        fromAny: Len.styleToString
    });
}



/**
 * Converts border color style value to the CSS string.
 */
function borderColorToCssString( val: StyleTypes.BorderColorStyleType): string
{
    return valueToString( val, {
        arrayItemFunc: ColorFuncs.colorToCssString,
        fromAny: ColorFuncs.colorToCssString
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
                s += Len.styleToString( val[0]) + " ";

            if (val[1])
                s += val[1] + " ";

            if (val[2])
                s += ColorFuncs.colorToCssString( val[2]) + " ";

            return s;
        },
        fromNumber: Len.styleToString,
        fromAny: ColorFuncs.colorToCssString
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
        fromArray: val => `rect(${arrayToCssString( val, Len.styleToString, " ")}`
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
            ["width", multiLenToStringWithSpace],
            ["style", valueToString],
            ["color", ColorFuncs.colorToCssString]
        )
    });
}



/**
 * Converts columns style to its CSS string value.
 */
function columnsToCssString( val: StyleTypes.ColumnsStyleType): string
{
    return valueToString( val, {
        fromArray: val => val[0] + " " + Len.styleToString( val[1])
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
                return val[0] + " " + val[1] + " "+ Len.styleToString( val[2]);
        },
        fromAny: Len.styleToString
    });
}



/**
 * Converts font style value to the CSS string.
 */
function fontStyleToCssString( val: StyleTypes.FontStyleStyleType): string
{
    return valueToString( val, {
        fromNumber: val => "oblique " + Angle.styleToString( val)
    });
}



/**
 * Converts text-emphasis style value to the CSS string.
 */
function textEmphasisPositionToCssString( val: StyleTypes.TextEmphasisPositionStyleType): string
{
    return valueToString( val, {
        fromNumber: Len.styleToString
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
            let s = `${Len.styleToString( val[0])} ${val[1]}`;
            if (val[2])
                s += " " + val[2];

            return s;
        },
        fromAny: Len.styleToString
    });
}



/**
 * Converts translate style value to the CSS string.
 */
function translateToCssString( val: StyleTypes.TranslateStyleType): string
{
    return valueToString( val, {
        fromArray: val => Len.multiStyleToString( val, " "),
        fromAny: Len.styleToString
    });
}



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

    return `{${buf.filter( (item) => item != null).join(";")}}`;
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
    if (!propName || propVal == null)
        return null;

    // find information object for the property
    let info = StylePropertyInfos[propName];
    let varValue = typeof info === "function" ? (info as PropToStringFunc<K>)( propVal) : valueToString( propVal);
    return valueOnly ? varValue : `${camelToDash( propName)}:${varValue}`;
}



/** Type defnition of a function that takes property value and converts it to string */
type PropToStringFunc<K extends keyof IStyleset> = (val: IStyleset[K]) => string;



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in keyof IStyleset]: PropToStringFunc<K> } =
{
    animation: animationToCssString,
    animationDelay: multiTimeToStringWithComma,
    animationDuration: multiTimeToStringWithComma,
    animationIterationCount: Num.styleToString,
    animationTimingFunction: animationTimingFunctionToCssString,

    backgroundColor: ColorFuncs.colorToCssString,
    backgroundPosition: multiPositionToCssString,
    backgroundSize: multiSizeToCssString,
    baselineShift: Len.styleToString,

    border: borderSideToCssString,
    borderBlockEnd: borderSideToCssString,
    borderBlockEndColor: ColorFuncs.colorToCssString,
    borderBlockEndWidth: Len.styleToString,
    borderBlockStart: borderSideToCssString,
    borderBlockStartColor: ColorFuncs.colorToCssString,
    borderBlockStartWidth: Len.styleToString,
    borderBottom: borderSideToCssString,
    borderBottomColor: ColorFuncs.colorToCssString,
    borderBottomLeftRadius: singleCornerRadiusToCssString,
    borderBottomRightRadius: singleCornerRadiusToCssString,
    borderBottomWidth: Len.styleToString,
    borderColor: borderColorToCssString,
    borderImageOutset: borderImageOutsetToCssString,
    borderImageWidth: multiLenToStringWithSpace,
    borderInlineEnd: borderSideToCssString,
    borderInlineEndColor: ColorFuncs.colorToCssString,
    borderInlineEndWidth: Len.styleToString,
    borderInlineStart: borderSideToCssString,
    borderInlineStartColor: ColorFuncs.colorToCssString,
    borderInlineStartWidth: Len.styleToString,
    borderLeft: borderSideToCssString,
    borderLeftColor: ColorFuncs.colorToCssString,
    borderLeftWidth: Len.styleToString,
    borderRadius: borderRadiusToCssString,
    borderRight: borderSideToCssString,
    borderRightColor: ColorFuncs.colorToCssString,
    borderRightWidth: Len.styleToString,
    borderStyle: valueToString,
    borderSpacing: borderSpacingToCssString,
    borderTop: borderSideToCssString,
    borderTopColor: ColorFuncs.colorToCssString,
    borderTopLeftRadius: singleCornerRadiusToCssString,
    borderTopRightRadius: singleCornerRadiusToCssString,
    borderTopWidth: Len.styleToString,
    borderWidth: multiLenToStringWithSpace,
    bottom: Len.styleToString,
    boxShadow: valueToString,

    caretColor: ColorFuncs.colorToCssString,
    clip: clipToCssString,
    color: ColorFuncs.colorToCssString,
    columnGap: Len.styleToString,
    columnRule: columnRuleToCssString,
    columnRuleColor: ColorFuncs.colorToCssString,
    columnRuleStyle: valueToString,
    columnRuleWidth: multiLenToStringWithSpace,
    columns: columnsToCssString,

    flex: flexToCssString,
    floodColor: ColorFuncs.colorToCssString,
    fontSize: Len.styleToString,
    fontStyle: fontStyleToCssString,

    gap: multiLenToStringWithSpace,
    gridColumnGap: Len.styleToString,
    gridRowGap: Len.styleToString,

    height: Len.styleToString,

    inlineSize: Len.styleToString,

    left: Len.styleToString,
    letterSpacing: Len.styleToString,
    lightingColor: ColorFuncs.colorToCssString,

    margin: multiLenToStringWithSpace,
    marginBlockEnd: Len.styleToString,
    marginBlockStart: Len.styleToString,
    marginBottom: Len.styleToString,
    marginInlineEnd: Len.styleToString,
    marginInlineStart: Len.styleToString,
    marginLeft: Len.styleToString,
    marginRight: Len.styleToString,
    marginTop: Len.styleToString,
    maxBlockSize: Len.styleToString,
    maxHeight: Len.styleToString,
    maxInlineSize: Len.styleToString,
    maxWidth: Len.styleToString,
    maxZoom: Len.styleToString,
    minBlockSize: Len.styleToString,
    minHeight: Len.styleToString,
    minInlineSize: Len.styleToString,
	minWidth: Len.styleToString,
    minZoom: Len.styleToString,

    objectPosition: positionToCssString,
    outlineColor: ColorFuncs.colorToCssString,
    outlineOffset: Len.styleToString,
    outlineStyle: valueToString,

    padding: multiLenToStringWithSpace,
    paddingBlockEnd: Len.styleToString,
    paddingBlockStart: Len.styleToString,
    paddingBottom: Len.styleToString,
    paddingInlineEnd: Len.styleToString,
    paddingInlineStart: Len.styleToString,
    paddingLeft: Len.styleToString,
    paddingRight: Len.styleToString,
    paddingTop: Len.styleToString,
    perspective: Len.styleToString,
    perspectiveOrigin: positionToCssString,

    right: Len.styleToString,
    rowGap: Len.styleToString,

    scrollMargin: multiLenToStringWithSpace,
    scrollMarginBlock: multiLenToStringWithSpace,
    scrollMarginBlockEnd: Len.styleToString,
    scrollMarginBlockStart: Len.styleToString,
    scrollMarginBottom: Len.styleToString,
    scrollMarginInline: multiLenToStringWithSpace,
    scrollMarginInlineEnd: Len.styleToString,
    scrollMarginInlineStart: Len.styleToString,
    scrollMarginLeft: Len.styleToString,
    scrollMarginRight: Len.styleToString,
    scrollMarginTop: Len.styleToString,
    scrollPadding: multiLenToStringWithSpace,
    scrollPaddingBlock: multiLenToStringWithSpace,
    scrollPaddingBlockEnd: Len.styleToString,
    scrollPaddingBlockStart: Len.styleToString,
    scrollPaddingBottom: Len.styleToString,
    scrollPaddingInline: multiLenToStringWithSpace,
    scrollPaddingInlineEnd: Len.styleToString,
    scrollPaddingInlineStart: Len.styleToString,
    scrollPaddingLeft: Len.styleToString,
    scrollPaddingRight: Len.styleToString,
    scrollPaddingTop: Len.styleToString,
    stopColor: ColorFuncs.colorToCssString,

    tabSize: Len.styleToString,
    textDecorationColor: ColorFuncs.colorToCssString,
    textDecorationThickness: Len.styleToString,
    textEmphasisColor: ColorFuncs.colorToCssString,
    textEmphasisPosition: textEmphasisPositionToCssString,
    textIndent: textIndentToCssString,
    top: Len.styleToString,
    translate: translateToCssString,

    width: Len.styleToString,

    zoom: Len.styleToString,
};



/**
 * Converts the selector object into full selector string.
 */
export function selectorToCssString( selector: StyleTypes.SelectorType): string
{
	if (!selector)
		return "";
	else if (typeof selector === "string")
		return selector;
	else if (typeof selector.valueToString === "function")
		return selector.valueToString();
	else
		return selector.toString();
}



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



