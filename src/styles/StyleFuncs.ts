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
export function singleAnimationToCssString( val: StyleTypes.SingleAnimation): string
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
export function animationToCssString( val: StyleTypes.AnimationStyleType): string
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
export function singleAnimationTimingFunctionToCssString( val: StyleTypes.SingleAnimationTimingFunction): string
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
export function animationTimingFunctionToCssString( val: StyleTypes.AnimationTimingFunctionStyleType): string
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
export function singleCornerRadiusToCssString( val: StyleTypes.SingleCornerRadius_StyleType): string
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
export function borderRadiusToCssString( val: StyleTypes.BorderRadiusStyleType): string
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
export function borderStyleToCssString( val: StyleTypes.BorderStyleStyleType): string
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
export function borderWidthToCssString( val: StyleTypes.BorderWidthStyleType): string
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
export function borderSpacingToCssString( val: StyleTypes.BorderSpacingStyleType): string
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
export function borderColorToCssString( val: StyleTypes.BorderColorStyleType): string
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
export function borderSideToCssString( val: StyleTypes.BorderSide_StyleType): string
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
export function borderImageOutsetToCssString( val: StyleTypes.BorderImageOutsetStyleType): string
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
 * Converts single box shadow style represented as an object with fields corresponding to box shadow
 * properties to its CSS string value.
 * @param val Single box shadow object. 
 */
export function singleBoxShadowToCssString( val: StyleTypes.SingleBoxShadow): string
{
    if (!val)
        return "none";
    else if (typeof val === "string")
        return val;
    else if (typeof val === "boolean")
        return "0 0 1em 1em #c0c0c0";
    else if (typeof val === "number")
        return `0 0 ${val}em ${val}1em #c0c0c0`;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
    {
        return UtilFuncs.objectToCssString( val, false,
            ["inset", v => v === true ? "inset" : ""],
            ["x", UtilFuncs.singleLengthToCssString],
            ["y", UtilFuncs.singleLengthToCssString],
            ["blur", UtilFuncs.singleLengthToCssString],
            ["spread", UtilFuncs.singleLengthToCssString],
            ["color", ColorFuncs.colorToCssString]
        );
    }
}

/**
 * Converts box shadow style to its CSS string value.
 * @param obj Box shadow value. 
 */
export function boxShadowToCssString( val: StyleTypes.BoxShadowStyleType): string
{
    if (Array.isArray( val))
        return UtilFuncs.arrayToCssString( val, singleBoxShadowToCssString);
    else
        return singleBoxShadowToCssString( val);
}



/**
 * Converts clip style value to its CSS string value.
 * @param val Clip value. 
 */
export function clipToCssString( val: StyleTypes.ClipStyleType): string
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
export function columnRuleToCssString( val: StyleTypes.ColumnRuleStyleType): string
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
export function columnsToCssString( val: StyleTypes.ColumnsStyleType): string
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
export function flexToCssString( val: StyleTypes.FlexStyleType): string
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
export function flexFlowToCssString( val: StyleTypes.FlexFlowStyleType): string
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
export function fontStyleToCssString( val: StyleTypes.FontStyleStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val instanceof UtilTypes.StringProxy)
        return val.toString();
    else
        return UtilFuncs.singleAngleToCssString( val);
}



