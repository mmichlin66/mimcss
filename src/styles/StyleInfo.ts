import {StringProxy} from "./UtilTypes"
import * as UtilFuncs from "./UtilFuncs"
import * as ColorFuncs from "./ColorFuncs";
import {Styleset} from "./StyleTypes"
import * as StyleFuncs from "./StyleFuncs"



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
type StylePropertyInfo<T> = PropToStringFunc<T> | keyof Styleset;



/** Converts the given styleset to its string representation */
export function stylesetToCssString( styleset: Styleset, important?: Set<string>): string
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
    else if (propVal instanceof StringProxy)
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
const StylePropertyInfos: { [K in keyof Styleset]: StylePropertyInfo<Styleset[K]> } =
{
    animation: StyleFuncs.animationToCssString,
    animationDelay: UtilFuncs.multiTimeToCssString,
    animationDuration: UtilFuncs.multiTimeToCssString,
    animationIterationCount: UtilFuncs.singleNumberToCssString,
    animationTimingFunction: StyleFuncs.animationTimingFunctionToCssString,

    backgroundColor: ColorFuncs.colorToCssString,
    bgc: "backgroundColor",
    backgroundPosition: UtilFuncs.multiPositionToCssString,
    backgroundSize: UtilFuncs.multiSizeToCssString,
    baselineShift: UtilFuncs.singleLengthToCssString,

    border: StyleFuncs.borderSideToCssString,
    borderBottom: StyleFuncs.borderSideToCssString,
    borderBottomColor: ColorFuncs.colorToCssString,
    borderBottomLeftRadius: StyleFuncs.singleCornerRadiusToCssString,
    borderBottomRightRadius: StyleFuncs.singleCornerRadiusToCssString,
    borderBottomWidth: UtilFuncs.singleLengthToCssString,
    borderColor: StyleFuncs.borderColorToCssString,
    borderImageOutset: StyleFuncs.borderImageOutsetToCssString,
    borderImageWidth: StyleFuncs.borderWidthToCssString,
    borderLeft: StyleFuncs.borderSideToCssString,
    borderLeftColor: ColorFuncs.colorToCssString,
    borderLeftWidth: UtilFuncs.singleLengthToCssString,
    borderRadius: StyleFuncs.borderRadiusToCssString,
    borderRight: StyleFuncs.borderSideToCssString,
    borderRightColor: ColorFuncs.colorToCssString,
    borderRightWidth: UtilFuncs.singleLengthToCssString,
    borderStyle: StyleFuncs.borderStyleToCssString,
    borderSpacing: StyleFuncs.borderSpacingToCssString,
    borderTop: StyleFuncs.borderSideToCssString,
    borderTopColor: ColorFuncs.colorToCssString,
    borderTopLeftRadius: StyleFuncs.singleCornerRadiusToCssString,
    borderTopRightRadius: StyleFuncs.singleCornerRadiusToCssString,
    borderTopWidth: UtilFuncs.singleLengthToCssString,
    borderWidth: StyleFuncs.borderWidthToCssString,
    bottom: UtilFuncs.singleLengthToCssString,
    boxShadow: StyleFuncs.boxShadowToCssString,
    shadow: "boxShadow",

    caretColor: ColorFuncs.colorToCssString,
    clip: StyleFuncs.clipToCssString,
    color: ColorFuncs.colorToCssString,
    columnGap: UtilFuncs.singleLengthToCssString,
    columnRule: StyleFuncs.columnRuleToCssString,
    columnRuleColor: ColorFuncs.colorToCssString,
    columnRuleStyle: StyleFuncs.borderStyleToCssString,
    columnRuleWidth: StyleFuncs.borderWidthToCssString,
    columns: StyleFuncs.columnsToCssString,

    flex: StyleFuncs.flexToCssString,
    flexFlow: StyleFuncs.flexFlowToCssString,
    floodColor: ColorFuncs.colorToCssString,
    fontStyle: StyleFuncs.fontStyleToCssString,

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



