import * as UtilTypes from "./UtilTypes"
import * as UtilFuncs from "./UtilFuncs"
import * as ColorTypes from "./ColorTypes"
import * as ColorFuncs from "./ColorFuncs";
import * as StyleTypes from "./StyleTypes"



/**
 * Converts animation style represented as an object with fields corresponding to animation
 * properties to its CSS string value.
 * @param val Single animation object. 
 */
function singleAnimationToCssString( val: StyleTypes.SingleAnimation): string
{
    if (typeof val === "string")
        return val;
    else
    {
        return UtilFuncs.objectToCssString( val, false,
            ["delay", UtilFuncs.singleTimeToCssString],
            ["function", singleAnimationTimingFunctionToCssString],
            ["duration", UtilFuncs.singleTimeToCssString],
            ["count", UtilFuncs.singleNumberToCssString],
            "direction",
            "state",
            "mode",
            "name",
        );
    }
}

/**
 * Converts animation style to its CSS string value.
 * @param obj Single animation object. 
 */
function animationToCssString( val: StyleTypes.AnimationStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray( val))
        return UtilFuncs.arrayToCssString( val, singleAnimationToCssString);
    else
        return singleAnimationToCssString( val);
}



/**
 * Converts single animation timing function value to the CSS time string.
 * @param val Single animation timing function value
 */
function singleAnimationTimingFunctionToCssString( val: StyleTypes.SingleAnimationTimingFunction): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (val.length < 3)
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

/**
 * Converts animation iteration count style value to the CSS time string.
 * @param val Animation iteration count value
 */
function animationTimingFunctionToCssString( val: StyleTypes.AnimationTimingFunctionStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (val.length === 0)
        return "";
    else if (typeof val[0] === "number")
        return singleAnimationTimingFunctionToCssString( val as StyleTypes.SingleAnimationTimingFunction);
    else
        return UtilFuncs.arrayToCssString( val as StyleTypes.SingleAnimationTimingFunction[], singleAnimationTimingFunctionToCssString);
}



/**
 * Converts corner radius style value to the CSS string.
 * @param val Animation delay value
 */
function singleCornerRadiusToCssString( val: StyleTypes.SingleCornerRadius_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
        return UtilFuncs.arrayToCssString( val, UtilFuncs.singleLengthToCssString, " ");
    else
        return UtilFuncs.singleLengthToCssString( val);
}



/**
 * Converts border radius style value to the CSS string.
 * @param val Border radius value
 */
function borderRadiusToCssString( val: StyleTypes.BorderRadiusStyleType): string
{
    if (Array.isArray(val))
    {
        if (Array.isArray( val[0]))
        {
            // two MultiCornerRadius values
            let s = UtilFuncs.arrayToCssString( val[0], UtilFuncs.singleLengthToCssString, " ");
            s += " / ";
            return s + UtilFuncs.arrayToCssString( val[1] as StyleTypes.MultiCornerRadius_StyleType, UtilFuncs.singleLengthToCssString, " ");
        }
        else
        {
            // single MultiCornerRadius value
            return UtilFuncs.arrayToCssString( val as StyleTypes.MultiCornerRadius_StyleType, UtilFuncs.singleLengthToCssString, " ");
        }
    }
    else
        return UtilFuncs.singleLengthToCssString( val);
}



/**
 * Converts border style style value to the CSS string.
 * @param val Border style value
 */
function borderStyleToCssString( val: StyleTypes.BorderStyleStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
        return UtilFuncs.stringArrayToCssString( val, " ");
    else
        return val;
}



/**
 * Converts border width style value to the CSS string.
 * @param val Border width value
 */
function borderWidthToCssString( val: StyleTypes.BorderWidthStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
        return UtilFuncs.arrayToCssString( val, UtilFuncs.singleLengthToCssString, " ");
    else
        return UtilFuncs.singleLengthToCssString( val);
}



/**
 * Converts border spacing style value to the CSS string.
 * @param val Border spacing value
 */
function borderSpacingToCssString( val: StyleTypes.BorderSpacingStyleType): string
{
    if (Array.isArray(val))
        return UtilFuncs.arrayToCssString( val, UtilFuncs.singleLengthToCssString, " ");
    else
        return UtilFuncs.singleLengthToCssString( val);
}



/**
 * Converts border color style value to the CSS string.
 * @param val Border color value
 */
function borderColorToCssString( val: StyleTypes.BorderColorStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
        return UtilFuncs.arrayToCssString( val as ColorTypes.Color_StyleType[], ColorFuncs.colorToCssString, " ");
    else
        return ColorFuncs.colorToCssString( val);
}



/**
 * Converts border side style value to the CSS string.
 * @param val Border side value
 */
function borderSideToCssString( val: StyleTypes.BorderSide_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return UtilFuncs.singleLengthToCssString( val);
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
    {
        let s = "";
        if (typeof val[0] === "string")
            return val[0];
        else if (val[0] instanceof UtilTypes.StringProxy)
            return val[0].toString();
        else if (val[0] != null)
            s += UtilFuncs.singleLengthToCssString( val[0]) + " ";

        if (val[1])
            s += val[1] + " ";

        if (val[2])
            s += ColorFuncs.colorToCssString( val[2]) + " ";

        return s;
    }
    else
        return ColorFuncs.colorToCssString( val);
}



/**
 * Converts border-image-outset style value to the CSS string.
 * @param val Border image outset value
 */
function borderImageOutsetToCssString( val: StyleTypes.BorderImageOutsetStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return UtilFuncs.arrayToCssString( val, borderImageOutsetToCssString, " ");
}



/**
 * Converts box shadow style to its CSS string value.
 * @param obj Box shadow value. 
 */
function boxShadowToCssString( val: StyleTypes.BoxShadowStyleType): string
{
     if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else 
        return UtilFuncs.stringArrayToCssString( val);
}



/**
 * Converts clip style value to its CSS string value.
 * @param val Clip value. 
 */
function clipToCssString( val: StyleTypes.ClipStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return `rect(${UtilFuncs.arrayToCssString( val, UtilFuncs.singleLengthToCssString, " ")}`;
}



/**
 * Converts column rule style represented as an object with fields corresponding to column rule
 * properties to its CSS string value.
 * @param val Column rule style value. 
 */
function columnRuleToCssString( val: StyleTypes.ColumnRuleStyleType): string
{
    if (!val)
        return null;
    else if (typeof val === "string")
        return val;
    else
    {
        return UtilFuncs.objectToCssString( val, false,
            ["width", borderWidthToCssString],
            ["style", borderStyleToCssString],
            ["color", ColorFuncs.colorToCssString]
        );
    }
}



/**
 * Converts columns style to its CSS string value.
 * @param val Columns style value. 
 */
function columnsToCssString( val: StyleTypes.ColumnsStyleType): string
{
    if (!val)
        return null;
    else if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return val[0].toString() + " " + UtilFuncs.singleLengthToCssString( val[1]);
}



/**
 * Converts flex style value to the CSS string.
 * @param val Flex value
 */
function flexToCssString( val: StyleTypes.FlexStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
    {
        if (val.length === 2)
            return val.join( " ");
        else
        {
            let s = val[0] + " " + val[1] + " ";
            let v = val[2];
            if (typeof v === "string")
                s += v;
            else
              s += UtilFuncs.singleLengthToCssString( v);

            return s;
        }
    }
    else
        return UtilFuncs.singleLengthToCssString( val);
}



/**
 * Converts flex-flow style value to the CSS string.
 * @param val Flex-flow value
 */
function flexFlowToCssString( val: StyleTypes.FlexFlowStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return UtilFuncs.stringArrayToCssString( val);
}



/**
 * Converts font-style style value to the CSS string.
 * @param val Font-style value
 */
function fontStyleToCssString( val: StyleTypes.FontStyleStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return UtilFuncs.singleAngleToCssString( val);
}



/**
 * Converts font-style style value to the CSS string.
 * @param val Font-style value
 */
function gapStyleToCssString( val: StyleTypes.Gap_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else if (Array.isArray(val))
    {
        let s = UtilFuncs.singleLengthToCssString( val[0]);
        if (val.length > 1)
            s += "," + UtilFuncs.singleLengthToCssString( val[1]);

        return s;
    }
    else
        return UtilFuncs.singleLengthToCssString( val);
}



/** Type defnition of a function that takes property value and converts it to string */
type PropToStringFunc<T> = (val: T) => string;

/**
 * The StylePropertyInfo type represents information that we keep for style properties. Most
 * commonly, the information needed for a property is a conversion function, which takes a value
 * of a type allowed for the property and converts it to the CSS compliant string. Alternatively,
 * it can be a name of another Styleset property for which this property is an alias. This is used
 * for shortening frequently used but long property names (e.g. backgroundColor) and for prefixed
 * properties.
 */
type StylePropertyInfo<T> = PropToStringFunc<T> | keyof StyleTypes.Styleset;



/** Converts the given styleset to its string representation */
export function stylesetToCssString( styleset: StyleTypes.Styleset, important?: Set<string>): string
{
    let s = "";
	for( let propName in styleset)
	{
        let propVal: any = styleset[propName];
        if (propName === "$custom")
        {
            // special handling of the "$custom" property
            for( let customPropName in propVal)
            {
                s += `--${customPropName}:${propVal[customPropName]}`;
                s += (important && important.has( propName) ? " !important;" : ";");
            }
        }
        else
        {
            // get the string representation of the property
            s += stylePropToCssString( propName, propVal);
            s += (important && important.has( propName) ? " !important;" : ";");
        }
	}

    return `{${s}}`;
}



/**
 * Converts the given style property to the CSS style string
 * @param style 
 */
export function stylePropToCssString( propName: string, propVal: any, valueOnly?: boolean): string
{
    if (!propName || propVal == null)
        return "";

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

    let s = valueOnly ? "" : UtilFuncs.camelToDash( propName) + ":";

    if (typeof info === "function")
        s += info( propVal);
    else if (typeof propVal === "string")
        s += propVal;
    else if (propVal instanceof UtilTypes.StringProxy)
        s += propVal.toString();
    else if (Array.isArray( propVal))
        s += UtilFuncs.arrayToCssString( propVal, item => item == null ? "" : item.toString());
    else
        s += propVal.toString();

    return s;
}



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in keyof StyleTypes.Styleset]: StylePropertyInfo<StyleTypes.Styleset[K]> } =
{
    animation: animationToCssString,
    animationDelay: UtilFuncs.multiTimeToCssString,
    animationDuration: UtilFuncs.multiTimeToCssString,
    animationIterationCount: UtilFuncs.singleNumberToCssString,
    animationTimingFunction: animationTimingFunctionToCssString,

    backgroundColor: ColorFuncs.colorToCssString,
    // bgc: "backgroundColor",
    backgroundPosition: UtilFuncs.multiPositionToCssString,
    backgroundSize: UtilFuncs.multiSizeToCssString,
    baselineShift: UtilFuncs.singleLengthToCssString,

    border: borderSideToCssString,
    borderBottom: borderSideToCssString,
    borderBottomColor: ColorFuncs.colorToCssString,
    borderBottomLeftRadius: singleCornerRadiusToCssString,
    borderBottomRightRadius: singleCornerRadiusToCssString,
    borderBottomWidth: UtilFuncs.singleLengthToCssString,
    borderColor: borderColorToCssString,
    borderImageOutset: borderImageOutsetToCssString,
    borderImageWidth: borderWidthToCssString,
    borderLeft: borderSideToCssString,
    borderLeftColor: ColorFuncs.colorToCssString,
    borderLeftWidth: UtilFuncs.singleLengthToCssString,
    borderRadius: borderRadiusToCssString,
    borderRight: borderSideToCssString,
    borderRightColor: ColorFuncs.colorToCssString,
    borderRightWidth: UtilFuncs.singleLengthToCssString,
    borderStyle: borderStyleToCssString,
    borderSpacing: borderSpacingToCssString,
    borderTop: borderSideToCssString,
    borderTopColor: ColorFuncs.colorToCssString,
    borderTopLeftRadius: singleCornerRadiusToCssString,
    borderTopRightRadius: singleCornerRadiusToCssString,
    borderTopWidth: UtilFuncs.singleLengthToCssString,
    borderWidth: borderWidthToCssString,
    bottom: UtilFuncs.singleLengthToCssString,
    boxShadow: boxShadowToCssString,
    // shadow: "boxShadow",

    caretColor: ColorFuncs.colorToCssString,
    clip: clipToCssString,
    color: ColorFuncs.colorToCssString,
    columnGap: UtilFuncs.singleLengthToCssString,
    columnRule: columnRuleToCssString,
    columnRuleColor: ColorFuncs.colorToCssString,
    columnRuleStyle: borderStyleToCssString,
    columnRuleWidth: borderWidthToCssString,
    columns: columnsToCssString,

    flex: flexToCssString,
    flexFlow: flexFlowToCssString,
    floodColor: ColorFuncs.colorToCssString,
    fontStyle: fontStyleToCssString,

    gridColumnGap: UtilFuncs.singleLengthToCssString,
    gridRowGap: UtilFuncs.singleLengthToCssString,

    height: UtilFuncs.singleLengthToCssString,

    left: UtilFuncs.singleLengthToCssString,
    lightingColor: ColorFuncs.colorToCssString,

    outlineColor: ColorFuncs.colorToCssString,

    right: UtilFuncs.singleLengthToCssString,
    rowGap: UtilFuncs.singleLengthToCssString,

    textDecorationColor: ColorFuncs.colorToCssString,
    textEmphasisColor: ColorFuncs.colorToCssString,
    top: UtilFuncs.singleLengthToCssString,

    width: UtilFuncs.singleLengthToCssString,
};



