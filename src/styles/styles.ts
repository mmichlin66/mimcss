import * as utils from "./utils"



/** Type for align-content style property */
export type AlignContentStyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
				"baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
				"space-between" | "space-around" | "space-evenly" | utils.Base_StyleType;



/** Type for align-items style property */
export type AlignItemsStyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
				"baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" | utils.Base_StyleType;



/** Type for align-self style property */
export type AlignSelfStyleType = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
				"self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
				"safe center" | "unsafe center" | utils.Base_StyleType;



/** Type for alignment-baseline style property */
export type AlignmentBaselineStyleType = "auto" | "baseline" | "before-edge" | "text-before-edge" |
				"middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
				"hanging" | "mathematical" | "top" | "center" | "bottom" | utils.Base_StyleType;



/** Type for single animation */
export type SingleAnimation = utils.Base_StyleType |
{
	delay?: utils.SingleTime_StyleType;
	function?: SingleAnimationTimingFunction;
	duration?: utils.SingleTime_StyleType;
	count?: SingleAnimationIterationCount;
	direction?: SingleAnimationDirection;
	state?: SingleAnimationPlayState;
	mode?: SingleAnimationFillMode;
	name?: SingleAnimationName;
};

/** Type for animation style property */
export type AnimationStyleType = SingleAnimation | SingleAnimation[] | string;

/**
 * Converts animation style represented as an object with fields corresponding to animation
 * properties to its CSS string value.
 * @param val Single animation object. 
 */
export function singleAnimationToCssString( val: SingleAnimation): string
{
    if (typeof val === "string")
        return val;
    else
    {
        return utils.objectToCssString( val, false,
            ["delay", utils.singleTimeToCssString],
            ["function", singleAnimationTimingFunctionToCssString],
            ["duration", utils.singleTimeToCssString],
            ["count", utils.singleNumberToCssString],
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
export function animationToCssString( val: AnimationStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (Array.isArray( val))
        return utils.arrayToCssString( val, singleAnimationToCssString);
    else
        return singleAnimationToCssString( val);
}



/** Type for single animation direction */
export type SingleAnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse" | utils.Base_StyleType;

/** Type for animation-direction style property */
export type AnimationDirectionStyleType = SingleAnimationDirection | SingleAnimationDirection[] | string;



/** Type for single animation fill mode */
export type SingleAnimationFillMode = "none" | "forwards" | "backwards" | "both" | utils.Base_StyleType;

/** Type for animation-fill-mode style property */
export type AnimationFillModeStyleType = SingleAnimationDirection | SingleAnimationDirection[] | string;



/** Type for single animation iteration count */
export type SingleAnimationIterationCount = "infinite" | utils.SingleNumber_StyleType | utils.Base_StyleType;

/** Type for animation-iteration-count style property */
export type AnimationIterationCountStyleType = SingleAnimationIterationCount | SingleAnimationIterationCount[] | string;



/** Type for single animation name */
export type SingleAnimationName = "none" | utils.Base_StyleType | string;

/** Type for animation-name style property */
export type AnimationNameStyleType = SingleAnimationName | SingleAnimationName[] | string;



/** Type for single animation play state */
export type SingleAnimationPlayState = "paused" | "running" | utils.Base_StyleType;

/** Type for animation-play-state style property */
export type AnimationPlayStateStyleType = SingleAnimationPlayState | SingleAnimationPlayState[] | string;



/** Type for simple animation timing functions - those that don't have parameters */
export type AnimationTimingFunction_Simple = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

/** Type for step animation timing function position */
export type AnimationTimingFunction_StepPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";

/** Type for step animation timing function */
export type AnimationTimingFunction_Step = [number, AnimationTimingFunction_StepPosition?];

/** Type for Bezier animation timing function */
export type AnimationTimingFunction_Bezier = [number, number, number, number];

/** Type for single animation timing function */
export type SingleAnimationTimingFunction = AnimationTimingFunction_Simple | AnimationTimingFunction_Step | AnimationTimingFunction_Bezier | utils.Base_StyleType | string;

/** Type for animation-timing-function style property */
export type AnimationTimingFunctionStyleType = SingleAnimationTimingFunction | SingleAnimationTimingFunction[] | string;

/**
 * Converts single animation timing function value to the CSS time string.
 * @param val Single animation timing function value
 */
export function singleAnimationTimingFunctionToCssString( val: SingleAnimationTimingFunction): string
{
    if (typeof val === "string")
        return val;
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
export function animationTimingFunctionToCssString( val: AnimationTimingFunctionStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (val.length === 0)
        return "";
    else if (typeof val[0] === "number")
        return singleAnimationTimingFunctionToCssString( val as SingleAnimationTimingFunction);
    else
        return utils.arrayToCssString( val as SingleAnimationTimingFunction[], singleAnimationTimingFunctionToCssString);
}



/** Type for backface-visibility style property */
export type BackfaceVisibilityModeStyleType = "visible" | "hidden" | utils.Base_StyleType;



/** Type for single background attachment */
export type SingleBackgroundAttachment = "scroll" | "fixed" | "local" | utils.Base_StyleType;

/** Type for background-attachment style property */
export type BackgroundAttachmentStyleType = SingleBackgroundAttachment | SingleBackgroundAttachment[] | string;



/** Type for single background clip */
export type SingleBackgroundClip = "border-box" | "padding-box" | "content-box" | "text" | utils.Base_StyleType;

/** Type for background-clip style property */
export type BackgroundClipStyleType = SingleBackgroundClip | SingleBackgroundClip[] | string;



/** Type for single background origin */
export type SingleBackgroundOrigin = "border-box" | "padding-box" | "content-box" | "text" | utils.Base_StyleType;

/** Type for background-origin style property */
export type BackgroundOriginStyleType = SingleBackgroundOrigin | SingleBackgroundOrigin[] | string;



/** Type for single background repeat */
export type SingleBackgroundRepeat = "repeat-x" | "repeat-y" | "repeat" | "space" | "round" | "no-repeat" |
                "repeat repeat" | "repeat space" | "repeat round" | "repeat no-repeat" |
                "space repeat" | "space space" | "space round" | "space no-repeat" |
                "round repeat" | "round space" | "round round" | "round no-repeat" |
                "no-repeat repeat" | "no-repeat space" | "no-repeat round" | "no-repeat no-repeat" |
                utils.Base_StyleType;

/** Type for background-repeat style property */
export type BackgroundRepeatStyleType = SingleBackgroundRepeat | SingleBackgroundRepeat[] | string;



/** Type for background size */
export type SingleBackgroundSize = "cover" | "contain" | utils.SingleSize_StyleType;

/** Type for background-size style property */
export type BackgroundSizeStyleType = SingleBackgroundSize | SingleBackgroundSize[] | string;



/** Type for a single corner radius */
export type SingleCornerRadius_StyleType = utils.SingleLength_StyleType |
                [utils.SingleLength_StyleType, utils.SingleLength_StyleType] | string;

/**
 * Converts corner radius style value to the CSS string.
 * @param val Animation delay value
 */
export function singleCornerRadiusToCssString( val: SingleCornerRadius_StyleType): string
{
    if (Array.isArray(val))
        return utils.arrayToCssString( val, utils.singleLengthToCssString, " ");
    else
        return utils.singleLengthToCssString( val);
}



/** Helper type that defines an array of one to 4 elements each defining a length/percentage */
export type MultiCornerRadius_StyleType =
                [
                    utils.SingleLength_StyleType,
                    utils.SingleLength_StyleType?,
                    utils.SingleLength_StyleType?,
                    utils.SingleLength_StyleType?
                ];

/** Type for border-radius style property */
export type BorderRadiusStyleType = utils.SingleLength_StyleType | MultiCornerRadius_StyleType |
                [MultiCornerRadius_StyleType, MultiCornerRadius_StyleType];

/**
 * Converts border radius style value to the CSS string.
 * @param val Border radius value
 */
export function borderRadiusToCssString( val: BorderRadiusStyleType): string
{
    if (Array.isArray(val))
    {
        if (Array.isArray( val[0]))
        {
            // two MultiCornerRadius values
            let s = utils.arrayToCssString( val[0], utils.singleLengthToCssString, " ");
            s += " / ";
            return s + utils.arrayToCssString( val[1] as MultiCornerRadius_StyleType, utils.singleLengthToCssString, " ");
        }
        else
        {
            // single MultiCornerRadius value
            return utils.arrayToCssString( val as MultiCornerRadius_StyleType, utils.singleLengthToCssString, " ");
        }
    }
    else
        return utils.singleLengthToCssString( val);
}



/** Type for baseline-shift style property */
export type BaselineShiftStyleType = "sub" | "super" | utils.SingleLength_StyleType;



/** Type for single border side style property */
export type BorderSideStyle_StyleType = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
                "groove" | "ridge" | "inset" | "outset" | utils.Base_StyleType;



/** Type for border-style style property */
export type BorderStyleStyleType = BorderSideStyle_StyleType | string |
                [
                    BorderSideStyle_StyleType,
                    BorderSideStyle_StyleType,
                    BorderSideStyle_StyleType?,
                    BorderSideStyle_StyleType?,
                ];

/**
 * Converts border style style value to the CSS string.
 * @param val Border style value
 */
export function borderStyleToCssString( val: BorderStyleStyleType): string
{
    if (Array.isArray(val))
        return utils.stringArrayToCssString( val, " ");
    else
        return val;
}



/** Type for baseline-shift style property */
export type BorderSideWidth_StyleType = "thin" | "medium" | "thick" | utils.SingleLength_StyleType;



/** Type for border-width style property */
export type BorderWidthStyleType = BorderSideWidth_StyleType |
                [
                    BorderSideWidth_StyleType,
                    BorderSideWidth_StyleType,
                    BorderSideWidth_StyleType?,
                    BorderSideWidth_StyleType?,
                ];

/**
 * Converts border width style value to the CSS string.
 * @param val Border width value
 */
export function borderWidthToCssString( val: BorderWidthStyleType): string
{
    if (Array.isArray(val))
        return utils.arrayToCssString( val, utils.singleLengthToCssString, " ");
    else
        return utils.singleLengthToCssString( val);
}



/** Type for border-collapse style property */
export type BorderColapseStyleType = "collapse" | "separate" | utils.Base_StyleType;



/** Type for border-spacing style property */
export type BorderSpacingStyleType = utils.SingleLength_StyleType | utils.Base_StyleType |
                [
                    utils.SingleLength_StyleType,
                    utils.SingleLength_StyleType,
                ];

/**
 * Converts border spacing style value to the CSS string.
 * @param val Border spacing value
 */
export function borderSpacingToCssString( val: BorderSpacingStyleType): string
{
    if (Array.isArray(val))
        return utils.arrayToCssString( val, utils.singleLengthToCssString, " ");
    else
        return utils.singleLengthToCssString( val);
}



/** Type for border-color style property */
export type BorderColorStyleType = utils.Color_StyleType |
                [
                    utils.Color_StyleType,
                    utils.Color_StyleType,
                    utils.Color_StyleType?,
                    utils.Color_StyleType?,
                ];

/**
 * Converts border color style value to the CSS string.
 * @param val Border color value
 */
export function borderColorToCssString( val: BorderColorStyleType): string
{
    if (Array.isArray(val))
        return utils.arrayToCssString( val, utils.colorToCssString, " ");
    else
        return utils.colorToCssString( val);
}



/** Type for border side style property */
export type BorderSide_StyleType = utils.SingleLength_StyleType |  BorderSideStyle_StyleType | utils.Color_StyleType |
               
                [
                    utils.SingleLength_StyleType?,
                    BorderSideStyle_StyleType?,
                    utils.Color_StyleType?,
                ];

/**
 * Converts border side style value to the CSS string.
 * @param val Border side value
 */
export function borderSideToCssString( val: BorderSide_StyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return utils.singleLengthToCssString( val);
    else if (Array.isArray(val))
    {
        let s = "";
        if (val[0] != null)
            s += utils.singleLengthToCssString( val[0]) + " ";

        if (val[1])
            s += val[1] + " ";

        if (val[2])
            s += utils.colorToCssString( val[2]) + " ";

        return s;
    }
    else
        return utils.colorToCssString( val);
}



/** Type for border-image-outset style property */
export type BorderImageOutsetStyleType = string | number | utils.Base_StyleType |
               
                [
                    string | number,
                    string | number,
                    (string | number)?,
                    (string | number)?,
                ];

/**
 * Converts border-image-outset style value to the CSS string.
 * @param val Border image outset value
 */
export function borderImageOutsetToCssString( val: BorderImageOutsetStyleType): string
{
    if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else
        return utils.arrayToCssString( val, borderImageOutsetToCssString, " ");
}



/** Type for border-image-repeat style property */
export type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space" | utils.Base_StyleType;
export type BorderImageRepeatStyleType = BorderImageRepeatKeyword | [BorderImageRepeatKeyword, BorderImageRepeatKeyword];



/** Type for border-image-width style property */
export type BorderImageWidthStyleType = utils.SingleLength_StyleType |
                [
                    utils.SingleLength_StyleType,
                    utils.SingleLength_StyleType,
                    utils.SingleLength_StyleType?,
                    utils.SingleLength_StyleType?,
                ];



/**
 * Type for single box shadow. Box shadow can be presented by the following types:
 *   - "none" - no shadow.
 *   - boolean - false - no shadow; true - default shadow: "0 0 1em 1em #c0c0c0".
 *   - number - "0 0 Nem Nem #c0c0c0"; that is, the number defines the value of blur and spread
 *     radii in "em" units.
 *   - string - literal CSS box shadow string.
 *   - object - fields specify box shadow parts.
 */
export type SingleBoxShadow = "none" | boolean | number | string | utils.Base_StyleType |
{
    /** Flag indicating whether the shadow is inside the box (true) or outside it (false). Default is false. */
    inset?: boolean;
    /** Horizontal offset where the shadow should begin. Default is 0. */
	x?: utils.SingleLength_StyleType;
    /** Vertical offset where the shadow should begin. Default is 0. */
    y?: utils.SingleLength_StyleType;
    /** Blur radius. Default is 1em. */
    blur?: utils.SingleLength_StyleType;
    /** Spread radius. Default is 1em. */
    spread?: utils.SingleLength_StyleType;
    /** Shadow color. Default is 0xc0c0c0. */
	color?: utils.Color_StyleType;
};

/** Type for box shadow style property */
export type BoxShadowStyleType = SingleBoxShadow | SingleBoxShadow[];

/**
 * Converts single box shadow style represented as an object with fields corresponding to box shadow
 * properties to its CSS string value.
 * @param val Single box shadow object. 
 */
export function singleBoxShadowToCssString( val: SingleBoxShadow): string
{
    if (!val)
        return "none";
    else if (typeof val === "string")
        return val;
    else if (typeof val === "boolean")
        return "0 0 1em 1em #c0c0c0";
    else if (typeof val === "number")
        return `0 0 ${val}em ${val}1em #c0c0c0`;
    else
    {
        return utils.objectToCssString( val, false,
            ["inset", v => v === true ? "inset" : ""],
            ["x", utils.singleLengthToCssString],
            ["y", utils.singleLengthToCssString],
            ["blur", utils.singleLengthToCssString],
            ["spread", utils.singleLengthToCssString],
            ["color", utils.colorToCssString]
        );
    }
}

/**
 * Converts box shadow style to its CSS string value.
 * @param obj Box shadow value. 
 */
export function boxShadowToCssString( val: BoxShadowStyleType): string
{
    if (Array.isArray( val))
        return utils.arrayToCssString( val, singleBoxShadowToCssString);
    else
        return singleBoxShadowToCssString( val);
}



/** Type for box-sizing style property */
export type BoxSizingStyleType = "content-box" | "border-box" | utils.Base_StyleType;



/** Type for break-after style property */
export type BreakAfterStyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
                "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
                "avoid-region" | "region" | utils.Base_StyleType;



/** Type for break-before style property */
export type BreakBeforeStyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
                "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
                "avoid-region" | "region" | utils.Base_StyleType;



/** Type for break-inside style property */
export type BreakInsideStyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region" | utils.Base_StyleType;



/** Type for caption-side style property */
export type CaptionSideStyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end" | utils.Base_StyleType;



/** Type for caret-color style property */
export type CaretColorStyleType = "auto" | utils.Color_StyleType;



/** Type for clear style property */
export type ClearStyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | utils.Base_StyleType;



/** Type for clear style property */
export type ClipStyleType = "auto" | utils.Base_StyleType |
                [
                    utils.SingleLength_StyleType,
                    utils.SingleLength_StyleType, 
                    utils.SingleLength_StyleType,
                    utils.SingleLength_StyleType, 
                ];

/**
 * Converts clip style value to its CSS string value.
 * @param val Clip value. 
 */
export function clipToCssString( val: ClipStyleType): string
{
    if (typeof val === "string")
        return val;
    else
        return `rect(${utils.arrayToCssString( val, utils.singleLengthToCssString, " ")}`;
}



/** Type for color-interpolation-filters style property */
export type ColorInterpolationFiltersStyleType = "auto" | "sRGB" | "linearRGB" | utils.Base_StyleType;



/** Type for column-count style property */
export type ColumnCountStyleType = "auto" | number | utils.Base_StyleType;



/** Type for column-fill style property */
export type ColumnFillStyleType = "auto" | "balance" | "balance-all" | utils.Base_StyleType;



/** Type for single gap style property */
export type SingleGap_StyleType = "normal" | utils.SingleLength_StyleType;



/**
 * Type for column rule. Column rule can be presented by the following types:
 *   - string - literal CSS box shadow string.
 *   - object - fields specify column rule parts.
 */
export type ColumnRuleStyleType = string | utils.Base_StyleType |
{
    /** Column rule width. */
    width?: BorderWidthStyleType;
    /** Column rule style. */
	style?: BorderStyleStyleType;
    /** Column rule color. */
	color?: SingleGap_StyleType;
};

/**
 * Converts column rule style represented as an object with fields corresponding to column rule
 * properties to its CSS string value.
 * @param val Column rule style value. 
 */
export function columnRuleToCssString( val: ColumnRuleStyleType): string
{
    if (!val)
        return null;
    else if (typeof val === "string")
        return val;
    else
    {
        return utils.objectToCssString( val, false,
            ["width", borderWidthToCssString],
            ["style", borderStyleToCssString],
            ["color", utils.colorToCssString]
        );
    }
}



/** Type for column-span style property */
export type ColumnSpanStyleType = "none" | "all" | utils.Base_StyleType;



/** Type for columns style property */
export type ColumnsStyleType = "auto" | number | string | ["auto" | number, utils.SingleLength_StyleType] | utils.Base_StyleType;

/**
 * Converts columns style to its CSS string value.
 * @param val Columns style value. 
 */
export function columnsToCssString( val: ColumnsStyleType): string
{
    if (!val)
        return null;
    else if (typeof val === "string")
        return val;
    else if (typeof val === "number")
        return val.toString();
    else
        return val[0].toString() + " " + utils.singleLengthToCssString( val[1]);
}



/** Type for float (cssFloat) style property */
export type FloatStyleType = "left" | "right" | "none" | "inline-start" | "inline-end" | utils.Base_StyleType;



/** Type for cursor style property */
export type CursorStyleType = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" |
                "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" |
                "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" |
                "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" |
                "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" |
                "zoom-out" | "grab" | "grabbing" | utils.Base_StyleType | string;



/** Type for direction style property */
export type DirectionStyleType = "ltr" | "rtl" | utils.Base_StyleType;



/** Type for display style property */
export type DisplayStyleType = "block" | "inline" | "run-in" | "contents" | "none" |
                "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" |
                "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" |
                "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" |
                    "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" |
                    "ruby-base-container" | "ruby-text-container" |
                "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" |
                    "list-item block flow" | "list-item block flow-root" | "flow list-item block" |
                utils.Base_StyleType;

                

/** Type for dominant-baseline style property */
export type DominantBaselineStyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
                "central" | "mathematical" | "hanging" | "text-top" | utils.Base_StyleType;



/** Type for empty-cells style property */
export type EmptyCellsStyleType = "show" | "hide" | utils.Base_StyleType;



/** Type for fill-rule style property */
export type FillRuleStyleType = "nonzero" | "evenodd" | utils.Base_StyleType;



/** Type for flex-basis style property */
export type FlexBasisStyleType = "auto" | "content" | utils.SingleLength_StyleType | utils.Base_StyleType;



/** Type for flex style property */
export type FlexStyleType = FlexBasisStyleType | [number,number] | [number,number,FlexBasisStyleType];

/**
 * Converts flex style value to the CSS string.
 * @param val Flex value
 */
export function flexToCssString( val: FlexStyleType): string
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
            if (typeof v === "string")
                s += v;
            else
              s += utils.singleLengthToCssString( v);

            return s;
        }
    }
    else
        return utils.singleLengthToCssString( val);
}



/** Type for flex-direction style property */
export type FlexDirectionStyleType = "row" | "row-reverse" | "column" | "column-reverse" | utils.Base_StyleType;



/** Type for flex-wrap style property */
export type FlexWrapStyleType = "nowrap" | "wrap" | "wrap-reverse" | utils.Base_StyleType;



/** Type for flex-flow style property */
export type FlexFlowStyleType = FlexDirectionStyleType | FlexWrapStyleType |
                [FlexDirectionStyleType,FlexWrapStyleType] | utils.Base_StyleType;

/**
 * Converts flex-flow style value to the CSS string.
 * @param val Flex-flow value
 */
export function flexFlowToCssString( val: FlexFlowStyleType): string
{
    if (typeof val === "string")
        return val;
    else
        return utils.stringArrayToCssString( val);
}



/** Type for font-style style property */
export type FontStyleStyleType = "normal" | "italic" | "oblique" | utils.SingleAngle_StyleType;

/**
 * Converts font-style style value to the CSS string.
 * @param val Font-style value
 */
export function fontStyleToCssString( val: FontStyleStyleType): string
{
    return utils.singleAngleToCssString( val);
}



/** Type for font-weight style property */
export type FontWeightStyleType = "normal" | "bold" | "bolder" | "lighter" | number | string | utils.Base_StyleType;



export type StyleType = "" | string;



/**
 * Interface representing the type of objects that can be assigned to the style property of HTML
 * and SVG elements.
 */
export interface StylePropType {
    alignContent?: AlignContentStyleType;
    alignItems?: AlignItemsStyleType;
    alignSelf?: AlignSelfStyleType;
    alignmentBaseline?: AlignmentBaselineStyleType;
    animation?: AnimationStyleType;
    animationDelay?: utils.MultiTime_StyleType;
    animationDirection?: AnimationDirectionStyleType;
    animationDuration?: utils.MultiTime_StyleType;
    animationFillMode?: AnimationFillModeStyleType;
    animationIterationCount?: AnimationIterationCountStyleType;
    animationName?: AnimationNameStyleType;
    animationPlayState?: AnimationPlayStateStyleType;
	animationTimingFunction?: AnimationTimingFunctionStyleType;
	
    backfaceVisibility?: BackfaceVisibilityModeStyleType;
    background?: StyleType;
    backgroundAttachment?: BackgroundAttachmentStyleType;
    backgroundClip?: BackgroundClipStyleType;
    backgroundColor?: utils.Color_StyleType;
    backgroundImage?: StyleType;
    backgroundOrigin?: BackgroundOriginStyleType;
    backgroundPosition?: utils.MultiPosition_StyleType;
    backgroundPositionX?: string;
    backgroundPositionY?: string;
    backgroundRepeat?: BackgroundRepeatStyleType;
    backgroundSize?: BackgroundSizeStyleType;
    baselineShift?: BaselineShiftStyleType;
    border?: BorderSide_StyleType;
    borderBottom?: BorderSide_StyleType;
    borderBottomColor?: utils.Color_StyleType;
    borderBottomLeftRadius?: SingleCornerRadius_StyleType;
    borderBottomRightRadius?: SingleCornerRadius_StyleType;
    borderBottomStyle?: BorderSideStyle_StyleType;
    borderBottomWidth?: BorderSideWidth_StyleType;
    borderCollapse?: BorderColapseStyleType;
    borderColor?: BorderColorStyleType;
    borderImage?: string;
    borderImageOutset?: BorderImageOutsetStyleType;
    borderImageRepeat?: BorderImageRepeatStyleType;
    borderImageSlice?: string;
    borderImageSource?: string;
    borderImageWidth?: BorderImageWidthStyleType;
    borderLeft?: BorderSide_StyleType;
    borderLeftColor?: utils.Color_StyleType;
    borderLeftStyle?: BorderSideStyle_StyleType;
    borderLeftWidth?: BorderSideWidth_StyleType;
    borderRadius?: BorderRadiusStyleType;
    borderRight?: BorderSide_StyleType;
    borderRightColor?: utils.Color_StyleType;
    borderRightStyle?: BorderSideStyle_StyleType;
    borderRightWidth?: BorderSideWidth_StyleType;
    borderSpacing?: BorderSpacingStyleType;
    borderStyle?: BorderStyleStyleType;
    borderTop?: BorderSide_StyleType;
    borderTopColor?: utils.Color_StyleType;
    borderTopLeftRadius?: SingleCornerRadius_StyleType;
    borderTopRightRadius?: SingleCornerRadius_StyleType;
    borderTopStyle?: BorderSideStyle_StyleType;
    borderTopWidth?: BorderSideWidth_StyleType;
    borderWidth?: BorderWidthStyleType;
    bottom?: utils.SingleLength_StyleType;
    boxShadow?: BoxShadowStyleType;
    boxSizing?: BoxSizingStyleType;
    breakAfter?: BreakAfterStyleType;
    breakBefore?: BreakBeforeStyleType;
	breakInside?: BreakInsideStyleType;
	
    captionSide?: CaptionSideStyleType;
    caretColor?: CaretColorStyleType;
    clear?: ClearStyleType;
    clip?: ClipStyleType;
    clipPath?: string;
    clipRule?: string;
    color?: utils.Color_StyleType;
    colorInterpolationFilters?: ColorInterpolationFiltersStyleType;
    columnCount?: ColumnCountStyleType;
    columnFill?: ColumnFillStyleType;
    columnGap?: SingleGap_StyleType;
    columnRule?: ColumnRuleStyleType;
    columnRuleColor?: utils.Color_StyleType;
    columnRuleStyle?: BorderSideStyle_StyleType;
    columnRuleWidth?: BorderSideWidth_StyleType;
    columnSpan?: ColumnSpanStyleType;
    columnWidth?: utils.SingleLength_StyleType;
    columns?: ColumnsStyleType;
    content?: string;
    counterIncrement?: StyleType;
    counterReset?: StyleType;
    cssFloat?: FloatStyleType;
    cssText?: string;
	cursor?: CursorStyleType;
	
    direction?: DirectionStyleType;
    display?: DisplayStyleType;
    dominantBaseline?: DominantBaselineStyleType;

    emptyCells?: EmptyCellsStyleType;
	enableBackground?: string;
	
    fill?: StyleType;
    fillOpacity?: StyleType;
    fillRule?: FillRuleStyleType;
    filter?: string;
    flex?: FlexStyleType;
    flexBasis?: FlexBasisStyleType;
    flexDirection?: FlexDirectionStyleType;
    flexFlow?: FlexFlowStyleType;
    flexGrow?: utils.SingleNumber_StyleType;
    flexShrink?: utils.SingleNumber_StyleType;
    flexWrap?: FlexWrapStyleType;
    floodColor?: utils.Color_StyleType;
    floodOpacity?: string;
    font?: string;
    fontFamily?: string;
    fontFeatureSettings?: string;
    fontKerning?: string;
    fontSize?: string;
    fontSizeAdjust?: string;
    fontStretch?: string;
    fontStyle?: FontStyleStyleType;
    fontSynthesis?: string;
    fontVariant?: string;
    fontVariantCaps?: string;
    fontVariantEastAsian?: string;
    fontVariantLigatures?: string;
    fontVariantNumeric?: string;
    fontVariantPosition?: string;
	fontWeight?: FontWeightStyleType;
	
    gap?: string;
    glyphOrientationHorizontal?: StyleType;
    glyphOrientationVertical?: string;
    grid?: StyleType;
    gridArea?: StyleType;
    gridAutoColumns?: StyleType;
    gridAutoFlow?: StyleType;
    gridAutoRows?: StyleType;
    gridColumn?: StyleType;
    gridColumnEnd?: StyleType;
    gridColumnGap?: SingleGap_StyleType;
    gridColumnStart?: StyleType;
    gridGap?: string;
    gridRow?: StyleType;
    gridRowEnd?: StyleType;
    gridRowGap?: SingleGap_StyleType;
    gridRowStart?: StyleType;
    gridTemplate?: StyleType;
    gridTemplateAreas?: StyleType;
    gridTemplateColumns?: StyleType;
	gridTemplateRows?: StyleType;
	
    height?: utils.SingleLength_StyleType;
	hyphens?: string;
	
    imageOrientation?: string;
    imageRendering?: string;
	imeMode?: StyleType;
	
    justifyContent?: string;
    justifyItems?: string;
	justifySelf?: string;
	
	kerning?: StyleType;
	
    layoutGrid?: StyleType;
    layoutGridChar?: StyleType;
    layoutGridLine?: StyleType;
    layoutGridMode?: StyleType;
    layoutGridType?: StyleType;
    left?: utils.SingleLength_StyleType;
    letterSpacing?: string;
    lightingColor?: utils.Color_StyleType;
    lineBreak?: string;
    lineHeight?: StyleType;
    listStyle?: StyleType;
    listStyleImage?: StyleType;
    listStylePosition?: StyleType;
	listStyleType?: StyleType;
	
    margin?: StyleType;
    marginBottom?: StyleType;
    marginLeft?: StyleType;
    marginRight?: StyleType;
    marginTop?: StyleType;
    marker?: StyleType;
    markerEnd?: StyleType;
    markerMid?: StyleType;
    markerStart?: StyleType;
    mask?: string;
    maskComposite?: string;
    maskImage?: string;
    maskPosition?: string;
    maskRepeat?: string;
    maskSize?: string;
    maskType?: string;
    maxHeight?: StyleType;
    maxWidth?: StyleType;
    minHeight?: StyleType;
	minWidth?: StyleType;
	
    msContentZoomChaining?: StyleType;
    msContentZoomLimit?: StyleType;
    msContentZoomLimitMax?: any;
    msContentZoomLimitMin?: any;
    msContentZoomSnap?: StyleType;
    msContentZoomSnapPoints?: StyleType;
    msContentZoomSnapType?: StyleType;
    msContentZooming?: StyleType;
    msFlowFrom?: StyleType;
    msFlowInto?: StyleType;
    msFontFeatureSettings?: StyleType;
    msGridColumn?: any;
    msGridColumnAlign?: StyleType;
    msGridColumnSpan?: any;
    msGridColumns?: StyleType;
    msGridRow?: any;
    msGridRowAlign?: StyleType;
    msGridRowSpan?: any;
    msGridRows?: StyleType;
    msHighContrastAdjust?: StyleType;
    msHyphenateLimitChars?: StyleType;
    msHyphenateLimitLines?: any;
    msHyphenateLimitZone?: any;
    msHyphens?: StyleType;
    msImeAlign?: StyleType;
    msOverflowStyle?: StyleType;
    msScrollChaining?: StyleType;
    msScrollLimit?: StyleType;
    msScrollLimitXMax?: any;
    msScrollLimitXMin?: any;
    msScrollLimitYMax?: any;
    msScrollLimitYMin?: any;
    msScrollRails?: StyleType;
    msScrollSnapPointsX?: StyleType;
    msScrollSnapPointsY?: StyleType;
    msScrollSnapType?: StyleType;
    msScrollSnapX?: StyleType;
    msScrollSnapY?: StyleType;
    msScrollTranslation?: StyleType;
    msTextCombineHorizontal?: StyleType;
    msTextSizeAdjust?: any;
    msTouchAction?: StyleType;
    msTouchSelect?: StyleType;
    msUserSelect?: StyleType;
    msWrapFlow?: string;
    msWrapMargin?: any;
	msWrapThrough?: string;
	
    objectFit?: string;
    objectPosition?: string;
    opacity?: StyleType;
    order?: StyleType;
    orphans?: number | utils.Base_StyleType;
    outline?: string;
    outlineColor?: utils.Color_StyleType;
    outlineOffset?: string;
    outlineStyle?: string;
    outlineWidth?: string;
    overflow?: string;
    overflowAnchor?: string;
    overflowWrap?: string;
    overflowX?: string;
	overflowY?: string;
	
    padding?: StyleType;
    paddingBottom?: StyleType;
    paddingLeft?: StyleType;
    paddingRight?: StyleType;
    paddingTop?: StyleType;
    pageBreakAfter?: BreakAfterStyleType;
    pageBreakBefore?: BreakBeforeStyleType;
    pageBreakInside?: BreakInsideStyleType;
    penAction?: StyleType;
    perspective?: StyleType;
    perspectiveOrigin?: StyleType;
    placeContent?: string;
    placeItems?: string;
    placeSelf?: string;
    pointerEvents?: StyleType;
	position?: StyleType;
	
	quotes?: StyleType;
	
    resize?: string;
    right?: utils.SingleLength_StyleType;
    rotate?: StyleType;
    rowGap?: SingleGap_StyleType;
    rubyAlign?: StyleType;
    rubyOverhang?: StyleType;
	rubyPosition?: StyleType;
	
    scale?: StyleType;
    scrollBehavior?: string;
    stopColor?: StyleType;
    stopOpacity?: StyleType;
    stroke?: StyleType;
    strokeDasharray?: StyleType;
    strokeDashoffset?: StyleType;
    strokeLinecap?: StyleType;
    strokeLinejoin?: StyleType;
    strokeMiterlimit?: StyleType;
    strokeOpacity?: StyleType;
	strokeWidth?: StyleType;
	
    tabSize?: string;
    tableLayout?: StyleType;
    textAlign?: string;
    textAlignLast?: string;
    textAnchor?: StyleType;
    textCombineUpright?: string;
    textDecoration?: string;
    textDecorationColor?: utils.Color_StyleType;
    textDecorationLine?: string;
    textDecorationStyle?: string;
    textEmphasis?: string;
    textEmphasisColor?: utils.Color_StyleType;
    textEmphasisPosition?: string;
    textEmphasisStyle?: string;
    textIndent?: string;
    textJustify?: string;
    textKashida?: StyleType;
    textKashidaSpace?: StyleType;
    textOrientation?: string;
    textOverflow?: string;
    textShadow?: string;
    textTransform?: string;
    textUnderlinePosition?: string;
    top?: utils.SingleLength_StyleType;
    touchAction?: string;
    transform?: string;
    transformBox?: string;
    transformOrigin?: string;
    transformStyle?: StyleType;
    transition?: string;
    transitionDelay?: string;
    transitionDuration?: string;
    transitionProperty?: string;
    transitionTimingFunction?: string;
	translate?: StyleType;
	
    unicodeBidi?: string;
	userSelect?: string;
	
    verticalAlign?: StyleType;
	visibility?: StyleType;
	
    /** @deprecated */ webkitAlignContent?: string;
    /** @deprecated */ webkitAlignItems?: string;
    /** @deprecated */ webkitAlignSelf?: string;
    /** @deprecated */ webkitAnimation?: string;
    /** @deprecated */ webkitAnimationDelay?: string;
    /** @deprecated */ webkitAnimationDirection?: string;
    /** @deprecated */ webkitAnimationDuration?: string;
    /** @deprecated */ webkitAnimationFillMode?: string;
    /** @deprecated */ webkitAnimationIterationCount?: string;
    /** @deprecated */ webkitAnimationName?: string;
    /** @deprecated */ webkitAnimationPlayState?: string;
    /** @deprecated */ webkitAnimationTimingFunction?: string;
    /** @deprecated */ webkitAppearance?: string;
    /** @deprecated */ webkitBackfaceVisibility?: string;
    /** @deprecated */ webkitBackgroundClip?: string;
    /** @deprecated */ webkitBackgroundOrigin?: string;
    /** @deprecated */ webkitBackgroundSize?: string;
    /** @deprecated */ webkitBorderBottomLeftRadius?: string;
    /** @deprecated */ webkitBorderBottomRightRadius?: string;
    webkitBorderImage?: StyleType;
    /** @deprecated */ webkitBorderRadius?: string;
    /** @deprecated */ webkitBorderTopLeftRadius?: string;
    /** @deprecated */ webkitBorderTopRightRadius?: string;
    /** @deprecated */ webkitBoxAlign?: string;
    webkitBoxDirection?: StyleType;
    /** @deprecated */ webkitBoxFlex?: string;
    /** @deprecated */ webkitBoxOrdinalGroup?: string;
    webkitBoxOrient?: StyleType;
    /** @deprecated */ webkitBoxPack?: string;
    /** @deprecated */webkitBoxShadow?: string;
    /** @deprecated */ webkitBoxSizing?: string;
    webkitColumnBreakAfter?: StyleType;
    webkitColumnBreakBefore?: StyleType;
    webkitColumnBreakInside?: StyleType;
    webkitColumnCount?: ColumnCountStyleType;
    webkitColumnGap?: SingleGap_StyleType;
    webkitColumnRule?: ColumnRuleStyleType;
    webkitColumnRuleColor?: utils.Color_StyleType;
    webkitColumnRuleStyle?: ColumnRuleStyleType;
    webkitColumnRuleWidth?: BorderWidthStyleType;
    webkitColumnSpan?: StyleType;
    webkitColumnWidth?: any;
    webkitColumns?: StyleType;
    /** @deprecated */ webkitFilter?: string;
    /** @deprecated */ webkitFlex?: string;
    /** @deprecated */ webkitFlexBasis?: string;
    /** @deprecated */ webkitFlexDirection?: string;
    /** @deprecated */ webkitFlexFlow?: string;
    /** @deprecated */ webkitFlexGrow?: string;
    /** @deprecated */ webkitFlexShrink?: string;
    /** @deprecated */ webkitFlexWrap?: string;
    /** @deprecated */ webkitJustifyContent?: string;
    webkitLineClamp?: string;
    /** @deprecated */ webkitMask?: string;
    /** @deprecated */ webkitMaskBoxImage?: string;
    /** @deprecated */ webkitMaskBoxImageOutset?: string;
    /** @deprecated */ webkitMaskBoxImageRepeat?: string;
    /** @deprecated */ webkitMaskBoxImageSlice?: string;
    /** @deprecated */ webkitMaskBoxImageSource?: string;
    /** @deprecated */ webkitMaskBoxImageWidth?: string;
    /** @deprecated */ webkitMaskClip?: string;
    /** @deprecated */ webkitMaskComposite?: string;
    /** @deprecated */ webkitMaskImage?: string;
    /** @deprecated */ webkitMaskOrigin?: string;
    /** @deprecated */ webkitMaskPosition?: string;
    /** @deprecated */ webkitMaskRepeat?: string;
    /** @deprecated */ webkitMaskSize?: string;
    /** @deprecated */ webkitOrder?: string;
    /** @deprecated */ webkitPerspective?: string;
    /** @deprecated */ webkitPerspectiveOrigin?: string;
    webkitTapHighlightColor?: StyleType;
    /** @deprecated */ webkitTextFillColor?: string;
    /** @deprecated */ webkitTextSizeAdjust?: string;
    /** @deprecated */ webkitTextStroke?: string;
    /** @deprecated */ webkitTextStrokeColor?: string;
    /** @deprecated */ webkitTextStrokeWidth?: string;
    /** @deprecated */ webkitTransform?: string;
    /** @deprecated */ webkitTransformOrigin?: string;
    /** @deprecated */ webkitTransformStyle?: string;
    /** @deprecated */ webkitTransition?: string;
    /** @deprecated */ webkitTransitionDelay?: string;
    /** @deprecated */ webkitTransitionDuration?: string;
    /** @deprecated */ webkitTransitionProperty?: string;
    /** @deprecated */ webkitTransitionTimingFunction?: string;
    webkitUserModify?: StyleType;
    webkitUserSelect?: StyleType;
	webkitWritingMode?: StyleType;
	
    whiteSpace?: string;
    widows?: number | utils.Base_StyleType;
    width?: utils.SingleLength_StyleType;
    willChange?: string;
    wordBreak?: string;
    wordSpacing?: string;
    wordWrap?: string;
	writingMode?: string;
	
    zIndex?: "auto" | number | utils.Base_StyleType;
    zoom?: StyleType;

    // custom properties/aliases
    shadow?: BoxShadowStyleType;
    bgc?: utils.Color_StyleType;
}



/**
 * The StylePropertyInfo represents information that we keep for style properties
 */
interface StylePropertyInfo<T>
{
    /** If defined, indicates the property that our property is alias for */
    aliasOf?: string;

    /** Function that converts from object representation to CSS string */
    convert?: (val: T) => string;

    // /** Function that converts from number representation to CSS string */
    // fromNumber?: (val: number) => string;

    // /** Function that converts from Boolean representation to CSS string */
    // fromBool?: (val: boolean) => string;

    // /** Function that converts from array representation to CSS string */
    // fromArray?: (val: any[]) => string;

    // /** Function that converts from object representation to CSS string */
    // fromObject?: (val: any) => string;
}



let styleProperties: { [K in keyof StylePropType]: StylePropertyInfo<StylePropType[K]> } =
{
    animation: { convert: animationToCssString },
    animationDelay: { convert: utils.multiTimeToCssString },
    animationDuration: { convert: utils.multiTimeToCssString },
    animationIterationCount: { convert: utils.singleNumberToCssString },
    animationTimingFunction: { convert: animationTimingFunctionToCssString },

    backgroundColor: { convert: utils.colorToCssString },
    backgroundPosition: { convert: utils.multiPositionToCssString },
    backgroundSize: { convert: utils.multiSizeToCssString },
    baselineShift: { convert: utils.singleLengthToCssString },

    border: { convert: borderSideToCssString },
    borderBottom: { convert: borderSideToCssString },
    borderBottomColor: { convert: utils.colorToCssString },
    borderBottomLeftRadius: { convert: singleCornerRadiusToCssString },
    borderBottomRightRadius: { convert: singleCornerRadiusToCssString },
    borderBottomWidth: { convert: utils.singleLengthToCssString },
    borderColor: { convert: borderColorToCssString },
    borderImageOutset: { convert: borderImageOutsetToCssString },
    borderImageWidth: { convert: borderWidthToCssString },
    borderLeft: { convert: borderSideToCssString },
    borderLeftColor: { convert: utils.colorToCssString },
    borderLeftWidth: { convert: utils.singleLengthToCssString },
    borderRadius: { convert: borderRadiusToCssString },
    borderRight: { convert: borderSideToCssString },
    borderRightColor: { convert: utils.colorToCssString },
    borderRightWidth: { convert: utils.singleLengthToCssString },
    borderStyle: { convert: borderStyleToCssString },
    borderSpacing: { convert: borderSpacingToCssString },
    borderTop: { convert: borderSideToCssString },
    borderTopColor: { convert: utils.colorToCssString },
    borderTopLeftRadius: { convert: singleCornerRadiusToCssString },
    borderTopRightRadius: { convert: singleCornerRadiusToCssString },
    borderTopWidth: { convert: utils.singleLengthToCssString },
    borderWidth: { convert: borderWidthToCssString },
    bottom: { convert: utils.singleLengthToCssString },
    boxShadow: { convert: boxShadowToCssString },

    caretColor: { convert: utils.colorToCssString },
    clip: { convert: clipToCssString },
    color: { convert: utils.colorToCssString },
    columnGap: { convert: utils.singleLengthToCssString },
    columnRule: { convert: columnRuleToCssString },
    columnRuleColor: { convert: utils.colorToCssString },
    columnRuleStyle: { convert: borderStyleToCssString },
    columnRuleWidth: { convert: borderWidthToCssString },
    columns: { convert: columnsToCssString },

    flex: { convert: flexToCssString },
    flexFlow: { convert: flexFlowToCssString },
    floodColor: { convert: utils.colorToCssString },
    fontStyle: { convert: fontStyleToCssString },

    gridColumnGap: { convert: utils.singleLengthToCssString },
    gridRowGap: { convert: utils.singleLengthToCssString },

    height: { convert: utils.singleLengthToCssString },

    left: { convert: utils.singleLengthToCssString },
    lightingColor: { convert: utils.colorToCssString },

    outlineColor: { convert: utils.colorToCssString },

    right: { convert: utils.singleLengthToCssString },
    rowGap: { convert: utils.singleLengthToCssString },

    textDecorationColor: { convert: utils.colorToCssString },
    textEmphasisColor: { convert: utils.colorToCssString },
    top: { convert: utils.singleLengthToCssString },

    width: { convert: utils.singleLengthToCssString },

    // aliases
    bgc: { aliasOf: "backgroundColor" },
    shadow: { aliasOf: "boxShadow" },
};



/**
 * Converts the given style object to the CSS style string
 * @param style 
 */
export function styleToCssString( style: StylePropType): string | null
{
    if (!style)
        return null;

    let s = "";

    for( let propName in style)
    {
        if (style[propName])
        {
            if (s.length > 0)
                s += ";";

            s += stylePropToCssString( propName, style[propName]);
        }
    }

    return s;
}



/**
 * Converts the given style property to the CSS style string
 * @param style 
 */
export function stylePropToCssString( propName: string, propVal: StylePropType): string | null
{
    if (!propName || propVal == null)
        return null;

    let info: StylePropertyInfo<any> = styleProperties[propName];
    while( info && info.aliasOf)
    {
        propName = info.aliasOf;
        info = styleProperties[propName];
    }

    let s = utils.camelToDash( propName) + ":";

    if (info && info.convert)
        s += info.convert( propVal);
    else if (typeof propVal === "string")
        s += propVal;
    else if (Array.isArray( propVal))
        s += utils.arrayToCssString( propVal, item => item == null ? "" : item.toString());
    else
        s += propVal.toString();

    return s;
}



