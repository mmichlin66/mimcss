import * as StyleTypes from "./StyleTypes"
import {camelToDash, valueToCssString, arrayToCssString, objectToCssString,
    multiSizeToCssString, positionToCssString, multiPositionToCssString,
    Num, Len, Angle, Time,
} from "./UtilFuncs"
import * as ColorTypes from "./ColorTypes"
import * as ColorFuncs from "./ColorFuncs";



/**
 * Converts animation style represented as an object with fields corresponding to animation
 * properties to its CSS string value.
 */
function singleAnimationToCssString( val: StyleTypes.SingleAnimation): string
{
    if (typeof val === "string")
        return val;
    else
    {
        return objectToCssString( val, false,
            ["delay", Time.styleToString],
            ["function", singleAnimationTimingFunctionToCssString],
            ["duration", Time.numberToString],
            ["count", Num.styleToString],
            "direction",
            "state",
            "mode",
            "name",
        );
    }
}

/**
 * Converts animation style to its CSS string value.
 */
function animationToCssString( val: StyleTypes.AnimationStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray( val))
        return arrayToCssString( val, singleAnimationToCssString, ",");
    else
        return singleAnimationToCssString( val);
}



/**
 * Converts single animation timing function value to the CSS time string.
 */
function singleAnimationTimingFunctionToCssString( val: StyleTypes.SingleAnimationTimingFunction): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
    {
        if (val.length < 3)
        {
            // this is step function with only the number of steps

            /// #if DEBUG
                if (val[0] <= 0)
                    throw new Error( "Number of steps in animation function must be greater than zero");
                else if (!Number.isInteger( val[0]))
                    throw new Error( "Number of steps in animation function must be an Integer");
            /// #endif

            return `step(${val[0]}${val.length === 2 ? "," + val[1] : ""})`;
        }
        else
        {
            // this is bezier function

            /// #if DEBUG
                if (val[0] < 0 || val[0] > 1 || val[2] < 0 || val[2] > 1)
                    throw new Error( "First and third parameters of cubic-bezier animation function must be between 0 and 1");
            /// #endif

            return `cubic-bezier(${val[0]},${val[1]},${val[2]},${val[3]})`;
        }
    }
    else
        return val.toString();
}

/**
 * Converts animation iteration count style value to the CSS time string.
 */
function animationTimingFunctionToCssString( val: StyleTypes.AnimationTimingFunctionStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
    {
        if (val.length === 0)
            return "";
        else if (typeof val[0] === "number")
            return singleAnimationTimingFunctionToCssString( val as StyleTypes.SingleAnimationTimingFunction);
        else
            return arrayToCssString( val as StyleTypes.SingleAnimationTimingFunction[],
                            singleAnimationTimingFunctionToCssString, ",");
    }
    else
        return val.toString();
}



/**
 * Converts corner radius style value to the CSS string.
 */
function singleCornerRadiusToCssString( val: StyleTypes.SingleCornerRadius_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return arrayToCssString( val, Len.styleToString, " ");
    else if (typeof val === "object")
        return val.toString();
    else
        return Len.styleToString( val);
}



/**
 * Converts border radius style value to the CSS string.
 */
function borderRadiusToCssString( val: StyleTypes.BorderRadiusStyleType): string
{
    if (Array.isArray(val))
    {
        if (Array.isArray( val[0]))
        {
            // two MultiCornerRadius values
            let s = arrayToCssString( val[0], Len.styleToString, " ");
            s += " / ";
            return s + arrayToCssString( val[1] as StyleTypes.MultiCornerRadius_StyleType, Len.styleToString, " ");
        }
        else
        {
            // single MultiCornerRadius value
            return arrayToCssString( val as StyleTypes.MultiCornerRadius_StyleType, Len.styleToString, " ");
        }
    }
    else
        return Len.styleToString( val);
}



/**
 * Converts border spacing style value to the CSS string.
 */
function borderSpacingToCssString( val: StyleTypes.BorderSpacingStyleType): string
{
    if (Array.isArray(val))
        return arrayToCssString( val, Len.styleToString, " ");
    else
        return Len.styleToString( val);
}



/**
 * Converts border color style value to the CSS string.
 * @param val Border color value
 */
function borderColorToCssString( val: StyleTypes.BorderColorStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return arrayToCssString( val as ColorTypes.Color_StyleType[], ColorFuncs.colorToCssString, " ");
    else if (typeof val === "object")
        return val.toString();
    else
        return ColorFuncs.colorToCssString( val);
}



/**
 * Converts border side style value to the CSS string.
 */
function borderSideToCssString( val: StyleTypes.BorderSide_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return Len.styleToString( val);
    else if (Array.isArray(val))
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
    }
    else if (typeof val === "object")
        return val.toString();
    else
        return ColorFuncs.colorToCssString( val);
}



/**
 * Converts border-image-outset style value to the CSS string.
 */
function borderImageOutsetToCssString( val: StyleTypes.BorderImageOutsetStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else if (Array.isArray(val))
        return arrayToCssString( val, borderImageOutsetToCssString, " ");
    else
        return val.toString();
}



/**
 * Converts clip style value to its CSS string value.
 */
function clipToCssString( val: StyleTypes.ClipStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray(val))
        return `rect(${arrayToCssString( val, Len.styleToString, " ")}`;
    else
        return val.toString();
}



/**
 * Converts column rule style represented as an object with fields corresponding to column rule
 * properties to its CSS string value.
 */
function columnRuleToCssString( val: StyleTypes.ColumnRuleStyleType): string
{
    if (!val)
        return null;
    else if (typeof val === "string")
        return val;
    else
    {
        return objectToCssString( val, false,
            ["width", (v) => Len.multiStyleToString( v, " ")],
            ["style", valueToCssString],
            ["color", ColorFuncs.colorToCssString]
        );
    }
}



/**
 * Converts columns style to its CSS string value.
 */
function columnsToCssString( val: StyleTypes.ColumnsStyleType): string
{
    if (!val)
        return null;
    else if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else if (Array.isArray(val))
        return val[0].toString() + " " + Len.styleToString( val[1]);
    else
        return val.toString();
}



/**
 * Converts flex style value to the CSS string.
 */
function flexToCssString( val: StyleTypes.FlexStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else if (Array.isArray(val))
    {
        if (val.length === 2)
            return val.join( " ");
        else
        {
            let s = val[0] + " " + val[1] + " ";
            let v = val[2];
            s += Len.styleToString( v);

            return s;
        }
    }
    else if (typeof val === "object")
        return val.toString();
    else
        return Len.styleToString( val);
}



/**
 * Converts font style value to the CSS string.
 */
function fontStyleToCssString( val: StyleTypes.FontStyleStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return "oblique " + Angle.styleToString( val);
    else
        return val.toString();
}



/**
 * Converts text-emphasis style value to the CSS string.
 */
function textEmphasisPositionToCssString( val: StyleTypes.TextEmphasisPositionStyleType): string
{
    if (Array.isArray( val))
        return valueToCssString( val);
    else
        return Len.styleToString( val);
}



/**
 * Converts text-indent style value to the CSS string.
 */
function textIndentToCssString( val: StyleTypes.TextIndentStyleType): string
{
    if (Array.isArray(val))
    {
        let s = `${Len.styleToString( val[0])} ${val[1]}`;
        if (val[2])
            s += " " + val[2];

        return s;
    }
    else
        return Len.styleToString( val);
}



/**
 * Converts translate style value to the CSS string.
 */
function translateToCssString( val: StyleTypes.TranslateStyleType): string
{
    if (Array.isArray(val))
        return Len.multiStyleToString( val, " ");
    else
        return Len.styleToString( val);
}



/** Type defnition of a function that takes property value and converts it to string */
type PropToStringFunc<T> = (val: T) => string;

/**
 * The StylePropertyInfo type represents information that we keep for style properties. Most
 * commonly, the information needed for a property is a conversion function, which takes a value
 * of a type allowed for the property and converts it to the CSS compliant string. Alternatively,
 * it can be a name of another Styleset property for which this property is an alias. This is used
 * for shortening frequently used but long property names (e.g. "bgc" for "backgroundColor") and
 * for vendor-prefixed properties.
 */
type StylePropertyInfo<T> = PropToStringFunc<T> | keyof StyleTypes.Styleset;



/** Converts the given styleset to its string representation */
export function stylesetToCssString( styleset: StyleTypes.Styleset, impProps?: Set<string>): string
{
    let buf: string[] = [];
	for( let propName in styleset)
	{
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
            buf.push( stylePropToCssString( propName, styleset[propName]) +
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
export function customPropToCssString( propVal: StyleTypes.CustomVarStyleType, valueOnly?: boolean): string | null
{
    if (!propVal)
        return null;

    let varName: string;
    let template: string;
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
export function stylePropToCssString( propName: string, propVal: any, valueOnly?: boolean): string
{
    if (!propName || propVal == null)
        return null;

    // find information object for the property
    let info = StylePropertyInfos[propName];
    if (typeof info === "string")
    {
        // go up the chain of aliases if any (we admittedly don't make the effort to detect circular
        // dependencies, because setting up the information objects is our job and not developers').
        while( typeof info === "string")
        {
            propName = info;
            info = StylePropertyInfos[propName];
        }
    }

    let s = valueOnly ? "" : camelToDash( propName) + ":";

    let varValue;
    if (typeof info === "function")
        varValue = info( propVal);
    else if (typeof propVal === "string")
        varValue = propVal;
    else if (Array.isArray( propVal))
        varValue = arrayToCssString( propVal, item => item == null ? "" : item.toString());
    else
        varValue = propVal.toString();

    return valueOnly ? varValue : `${camelToDash( propName)}:${varValue}`;
}



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in keyof StyleTypes.Styleset]: StylePropertyInfo<StyleTypes.Styleset[K]> } =
{
    animation: animationToCssString,
    animationDelay: (v) => Time.multiStyleToString( v, ","),
    animationDuration: (v) => Time.multiStyleToString( v, ","),
    animationIterationCount: Num.styleToString,
    animationTimingFunction: animationTimingFunctionToCssString,

    backgroundColor: ColorFuncs.colorToCssString,
    // bgc: "backgroundColor",
    backgroundPosition: multiPositionToCssString,
    backgroundSize: multiSizeToCssString,
    baselineShift: Len.styleToString,

    border: borderSideToCssString,
    borderBottom: borderSideToCssString,
    borderBottomColor: ColorFuncs.colorToCssString,
    borderBottomLeftRadius: singleCornerRadiusToCssString,
    borderBottomRightRadius: singleCornerRadiusToCssString,
    borderBottomWidth: Len.styleToString,
    borderColor: borderColorToCssString,
    borderImageOutset: borderImageOutsetToCssString,
    borderImageWidth: (v) => Len.multiStyleToString( v, " "),
    borderLeft: borderSideToCssString,
    borderLeftColor: ColorFuncs.colorToCssString,
    borderLeftWidth: Len.styleToString,
    borderRadius: borderRadiusToCssString,
    borderRight: borderSideToCssString,
    borderRightColor: ColorFuncs.colorToCssString,
    borderRightWidth: Len.styleToString,
    borderStyle: valueToCssString,
    borderSpacing: borderSpacingToCssString,
    borderTop: borderSideToCssString,
    borderTopColor: ColorFuncs.colorToCssString,
    borderTopLeftRadius: singleCornerRadiusToCssString,
    borderTopRightRadius: singleCornerRadiusToCssString,
    borderTopWidth: Len.styleToString,
    borderWidth: (v) => Len.multiStyleToString( v, " "),
    bottom: Len.styleToString,
    boxShadow: valueToCssString,

    caretColor: ColorFuncs.colorToCssString,
    clip: clipToCssString,
    color: ColorFuncs.colorToCssString,
    columnGap: Len.styleToString,
    columnRule: columnRuleToCssString,
    columnRuleColor: ColorFuncs.colorToCssString,
    columnRuleStyle: valueToCssString,
    columnRuleWidth: (v) => Len.multiStyleToString( v, " "),
    columns: columnsToCssString,

    flex: flexToCssString,
    floodColor: ColorFuncs.colorToCssString,
    fontSize: Len.styleToString,
    fontStyle: fontStyleToCssString,

    gap: (v) => Len.multiStyleToString( v, " "),
    gridColumnGap: Len.styleToString,
    gridRowGap: Len.styleToString,

    height: Len.styleToString,

    left: Len.styleToString,
    letterSpacing: Len.styleToString,
    lightingColor: ColorFuncs.colorToCssString,

    margin: (v) => Len.multiStyleToString( v, " "),
    marginBottom: Len.styleToString,
    marginLeft: Len.styleToString,
    marginRight: Len.styleToString,
    marginTop: Len.styleToString,
    maxHeight: Len.styleToString,
    maxWidth: Len.styleToString,
    minHeight: Len.styleToString,
	minWidth: Len.styleToString,

    objectPosition: positionToCssString,
    outlineColor: ColorFuncs.colorToCssString,
    outlineOffset: Len.styleToString,
    outlineStyle: valueToCssString,

    padding: (v) => Len.multiStyleToString( v, " "),
    paddingBottom: Len.styleToString,
    paddingLeft: Len.styleToString,
    paddingRight: Len.styleToString,
    paddingTop: Len.styleToString,
    perspective: Len.styleToString,
    perspectiveOrigin: positionToCssString,

    right: Len.styleToString,
    rowGap: Len.styleToString,

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
    return  `${not} (${propNames.map( (propName) => stylePropToCssString( propName, query[propName])).join( ") and (")})`;
}



