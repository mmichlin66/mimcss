import * as utils from "./utils"
import * as styles from "./styles"
import * as colors from "./colors"



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
type StylePropertyInfo<T> = PropToStringFunc<T> | keyof styles.Styleset;



/** Converts the given styleset to its string representation */
export function stylesetToCssString( styleset: styles.Styleset, important?: Set<string>): string
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

    let s = valueOnly ? "" : utils.camelToDash( propName) + ":";

    if (typeof info === "function")
        s += info( propVal);
    else if (typeof propVal === "string")
        s += propVal;
    else if (propVal instanceof utils.StringProxy)
        s += propVal.toString();
    else if (Array.isArray( propVal))
        s += utils.arrayToCssString( propVal, item => item == null ? "" : item.toString());
    else
        s += propVal.toString();

    return s;
}



/**
 * Map of property names to the StylePropertyInfo objects describing custom actions necessary to
 * convert the property value to the CSS-compliant string.
 */
const StylePropertyInfos: { [K in keyof styles.Styleset]: StylePropertyInfo<styles.Styleset[K]> } =
{
    animation: styles.animationToCssString,
    animationDelay: utils.multiTimeToCssString,
    animationDuration: utils.multiTimeToCssString,
    animationIterationCount: utils.singleNumberToCssString,
    animationTimingFunction: styles.animationTimingFunctionToCssString,

    backgroundColor: colors.colorToCssString,
    bgc: "backgroundColor",
    backgroundPosition: utils.multiPositionToCssString,
    backgroundSize: utils.multiSizeToCssString,
    baselineShift: utils.singleLengthToCssString,

    border: styles.borderSideToCssString,
    borderBottom: styles.borderSideToCssString,
    borderBottomColor: colors.colorToCssString,
    borderBottomLeftRadius: styles.singleCornerRadiusToCssString,
    borderBottomRightRadius: styles.singleCornerRadiusToCssString,
    borderBottomWidth: utils.singleLengthToCssString,
    borderColor: styles.borderColorToCssString,
    borderImageOutset: styles.borderImageOutsetToCssString,
    borderImageWidth: styles.borderWidthToCssString,
    borderLeft: styles.borderSideToCssString,
    borderLeftColor: colors.colorToCssString,
    borderLeftWidth: utils.singleLengthToCssString,
    borderRadius: styles.borderRadiusToCssString,
    borderRight: styles.borderSideToCssString,
    borderRightColor: colors.colorToCssString,
    borderRightWidth: utils.singleLengthToCssString,
    borderStyle: styles.borderStyleToCssString,
    borderSpacing: styles.borderSpacingToCssString,
    borderTop: styles.borderSideToCssString,
    borderTopColor: colors.colorToCssString,
    borderTopLeftRadius: styles.singleCornerRadiusToCssString,
    borderTopRightRadius: styles.singleCornerRadiusToCssString,
    borderTopWidth: utils.singleLengthToCssString,
    borderWidth: styles.borderWidthToCssString,
    bottom: utils.singleLengthToCssString,
    boxShadow: styles.boxShadowToCssString,
    shadow: "boxShadow",

    caretColor: colors.colorToCssString,
    clip: styles.clipToCssString,
    color: colors.colorToCssString,
    columnGap: utils.singleLengthToCssString,
    columnRule: styles.columnRuleToCssString,
    columnRuleColor: colors.colorToCssString,
    columnRuleStyle: styles.borderStyleToCssString,
    columnRuleWidth: styles.borderWidthToCssString,
    columns: styles.columnsToCssString,

    flex: styles.flexToCssString,
    flexFlow: styles.flexFlowToCssString,
    floodColor: colors.colorToCssString,
    fontStyle: styles.fontStyleToCssString,

    gridColumnGap: utils.singleLengthToCssString,
    gridRowGap: utils.singleLengthToCssString,

    height: utils.singleLengthToCssString,

    left: utils.singleLengthToCssString,
    lightingColor: colors.colorToCssString,

    outlineColor: colors.colorToCssString,

    right: utils.singleLengthToCssString,
    rowGap: utils.singleLengthToCssString,

    textDecorationColor: colors.colorToCssString,
    textEmphasisColor: colors.colorToCssString,
    top: utils.singleLengthToCssString,

    width: utils.singleLengthToCssString,
};



