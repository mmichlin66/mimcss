import * as UtilTypes from "./UtilTypes"
import * as UtilFuncs from "./UtilFuncs"
import * as ColorTypes from "./ColorTypes"
import * as ColorFuncs from "./ColorFuncs";



/** Type for align-content style property */
export type AlignContentStyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
				"baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
				"space-between" | "space-around" | "space-evenly" | UtilTypes.Base_StyleType;



/** Type for align-items style property */
export type AlignItemsStyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
				"baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" | UtilTypes.Base_StyleType;



/** Type for align-self style property */
export type AlignSelfStyleType = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
				"self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
				"safe center" | "unsafe center" | UtilTypes.Base_StyleType;



/** Type for alignment-baseline style property */
export type AlignmentBaselineStyleType = "auto" | "baseline" | "before-edge" | "text-before-edge" |
				"middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
				"hanging" | "mathematical" | "top" | "center" | "bottom" | UtilTypes.Base_StyleType;



/** Type for single animation */
export type SingleAnimation = UtilTypes.Base_StyleType |
{
	delay?: UtilTypes.SingleTime_StyleType;
	function?: SingleAnimationTimingFunction;
	duration?: UtilTypes.SingleTime_StyleType;
	count?: SingleAnimationIterationCount;
	direction?: SingleAnimationDirection;
	state?: SingleAnimationPlayState;
	mode?: SingleAnimationFillMode;
	name?: SingleAnimationName;
};

/** Type for animation style property */
export type AnimationStyleType = SingleAnimation | SingleAnimation[];



/** Type for single animation direction */
export type SingleAnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse" | UtilTypes.Base_StyleType;

/** Type for animation-direction style property */
export type AnimationDirectionStyleType = SingleAnimationDirection | SingleAnimationDirection[];



/** Type for single animation fill mode */
export type SingleAnimationFillMode = "none" | "forwards" | "backwards" | "both" | UtilTypes.Base_StyleType;

/** Type for animation-fill-mode style property */
export type AnimationFillModeStyleType = SingleAnimationDirection | SingleAnimationDirection[];



/** Type for single animation iteration count */
export type SingleAnimationIterationCount = "infinite" | UtilTypes.SingleNumber_StyleType | UtilTypes.Base_StyleType;

/** Type for animation-iteration-count style property */
export type AnimationIterationCountStyleType = SingleAnimationIterationCount | SingleAnimationIterationCount[];



/** Type for single animation name */
export type SingleAnimationName = "none" | UtilTypes.Base_StyleType | string;

/** Type for animation-name style property */
export type AnimationNameStyleType = SingleAnimationName | SingleAnimationName[];



/** Type for single animation play state */
export type SingleAnimationPlayState = "paused" | "running" | UtilTypes.Base_StyleType;

/** Type for animation-play-state style property */
export type AnimationPlayStateStyleType = SingleAnimationPlayState | SingleAnimationPlayState[];



/** Type for simple animation timing functions - those that don't have parameters */
export type AnimationTimingFunction_Simple = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

/** Type for step animation timing function position */
export type AnimationTimingFunction_StepPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";

/** Type for step animation timing function */
export type AnimationTimingFunction_Step = [number, AnimationTimingFunction_StepPosition?];

/** Type for Bezier animation timing function */
export type AnimationTimingFunction_Bezier = [number, number, number, number];

/** Type for single animation timing function */
export type SingleAnimationTimingFunction = AnimationTimingFunction_Simple | AnimationTimingFunction_Step | AnimationTimingFunction_Bezier | UtilTypes.Base_StyleType;

/** Type for animation-timing-function style property */
export type AnimationTimingFunctionStyleType = SingleAnimationTimingFunction | SingleAnimationTimingFunction[];



/** Type for backface-visibility style property */
export type BackfaceVisibilityModeStyleType = "visible" | "hidden" | UtilTypes.Base_StyleType;



/** Type for single background attachment */
export type SingleBackgroundAttachment = "scroll" | "fixed" | "local" | UtilTypes.Base_StyleType;

/** Type for background-attachment style property */
export type BackgroundAttachmentStyleType = SingleBackgroundAttachment | SingleBackgroundAttachment[];



/** Type for single background clip */
export type SingleBackgroundClip = "border-box" | "padding-box" | "content-box" | "text" | UtilTypes.Base_StyleType;

/** Type for background-clip style property */
export type BackgroundClipStyleType = SingleBackgroundClip | SingleBackgroundClip[];



/** Type for single background origin */
export type SingleBackgroundOrigin = "border-box" | "padding-box" | "content-box" | "text" | UtilTypes.Base_StyleType;

/** Type for background-origin style property */
export type BackgroundOriginStyleType = SingleBackgroundOrigin | SingleBackgroundOrigin[];



/** Type for single background repeat */
export type SingleBackgroundRepeat = "repeat-x" | "repeat-y" | "repeat" | "space" | "round" | "no-repeat" |
                "repeat repeat" | "repeat space" | "repeat round" | "repeat no-repeat" |
                "space repeat" | "space space" | "space round" | "space no-repeat" |
                "round repeat" | "round space" | "round round" | "round no-repeat" |
                "no-repeat repeat" | "no-repeat space" | "no-repeat round" | "no-repeat no-repeat" |
                UtilTypes.Base_StyleType;

/** Type for background-repeat style property */
export type BackgroundRepeatStyleType = SingleBackgroundRepeat | SingleBackgroundRepeat[];



/** Type for background size */
export type SingleBackgroundSize = "cover" | "contain" | UtilTypes.SingleSize_StyleType;

/** Type for background-size style property */
export type BackgroundSizeStyleType = SingleBackgroundSize | SingleBackgroundSize[];



/** Type for a single corner radius */
export type SingleCornerRadius_StyleType = UtilTypes.SingleLength_StyleType |
                [UtilTypes.SingleLength_StyleType, UtilTypes.SingleLength_StyleType];



/** Helper type that defines an array of one to 4 elements each defining a length/percentage */
export type MultiCornerRadius_StyleType =
                [
                    UtilTypes.SingleLength_StyleType,
                    UtilTypes.SingleLength_StyleType?,
                    UtilTypes.SingleLength_StyleType?,
                    UtilTypes.SingleLength_StyleType?
                ];

/** Type for border-radius style property */
export type BorderRadiusStyleType = UtilTypes.SingleLength_StyleType | MultiCornerRadius_StyleType |
                [MultiCornerRadius_StyleType, MultiCornerRadius_StyleType];



/** Type for baseline-shift style property */
export type BaselineShiftStyleType = "sub" | "super" | UtilTypes.SingleLength_StyleType;



/** Type for single border side style property */
export type BorderSideStyle_StyleType = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
                "groove" | "ridge" | "inset" | "outset" | UtilTypes.Base_StyleType;



/** Type for border-style style property */
export type BorderStyleStyleType = BorderSideStyle_StyleType |
                [
                    BorderSideStyle_StyleType,
                    BorderSideStyle_StyleType,
                    BorderSideStyle_StyleType?,
                    BorderSideStyle_StyleType?,
                ];



/** Type for border side width style property */
export type BorderSideWidth_StyleType = "thin" | "medium" | "thick" | UtilTypes.SingleLength_StyleType;



/** Type for border-width style property */
export type BorderWidthStyleType = BorderSideWidth_StyleType |
                [
                    BorderSideWidth_StyleType,
                    BorderSideWidth_StyleType,
                    BorderSideWidth_StyleType?,
                    BorderSideWidth_StyleType?,
                ];



/** Type for border-collapse style property */
export type BorderColapseStyleType = "collapse" | "separate" | UtilTypes.Base_StyleType;



/** Type for border-spacing style property */
export type BorderSpacingStyleType = UtilTypes.SingleLength_StyleType | UtilTypes.Base_StyleType |
                [
                    UtilTypes.SingleLength_StyleType,
                    UtilTypes.SingleLength_StyleType,
                ];



/** Type for border-color style property */
export type BorderColorStyleType = ColorTypes.Color_StyleType |
                [
                    ColorTypes.Color_StyleType,
                    ColorTypes.Color_StyleType,
                    ColorTypes.Color_StyleType?,
                    ColorTypes.Color_StyleType?,
                ];



/** Type for border side style property */
export type BorderSide_StyleType = UtilTypes.SingleLength_StyleType |  BorderSideStyle_StyleType | ColorTypes.Color_StyleType |
               
                [
                    UtilTypes.SingleLength_StyleType?,
                    BorderSideStyle_StyleType?,
                    ColorTypes.Color_StyleType?,
                ];



/** Type for border-image-outset style property */
export type BorderImageOutsetStyleType = string | number | UtilTypes.Base_StyleType |
                [
                    string | number,
                    string | number,
                    (string | number)?,
                    (string | number)?,
                ];



/** Type for border-image-repeat style property */
export type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space" | UtilTypes.Base_StyleType;
export type BorderImageRepeatStyleType = BorderImageRepeatKeyword | [BorderImageRepeatKeyword, BorderImageRepeatKeyword];



/** Type for border-image-width style property */
export type BorderImageWidthStyleType = UtilTypes.SingleLength_StyleType |
                [
                    UtilTypes.SingleLength_StyleType,
                    UtilTypes.SingleLength_StyleType,
                    UtilTypes.SingleLength_StyleType?,
                    UtilTypes.SingleLength_StyleType?,
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
export type SingleBoxShadow = "none" | boolean | number | UtilTypes.Base_StyleType |
{
    /** Flag indicating whether the shadow is inside the box (true) or outside it (false). Default is false. */
    inset?: boolean;
    /** Horizontal offset where the shadow should begin. Default is 0. */
	x?: UtilTypes.SingleLength_StyleType;
    /** Vertical offset where the shadow should begin. Default is 0. */
    y?: UtilTypes.SingleLength_StyleType;
    /** Blur radius. Default is 1em. */
    blur?: UtilTypes.SingleLength_StyleType;
    /** Spread radius. Default is 1em. */
    spread?: UtilTypes.SingleLength_StyleType;
    /** Shadow color. Default is 0xc0c0c0. */
	color?: ColorTypes.Color_StyleType;
};

/** Type for box shadow style property */
export type BoxShadowStyleType = SingleBoxShadow | SingleBoxShadow[];



/** Type for box-sizing style property */
export type BoxSizingStyleType = "content-box" | "border-box" | UtilTypes.Base_StyleType;



/** Type for break-after style property */
export type BreakAfterStyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
                "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
                "avoid-region" | "region" | UtilTypes.Base_StyleType;



/** Type for break-before style property */
export type BreakBeforeStyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
                "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
                "avoid-region" | "region" | UtilTypes.Base_StyleType;



/** Type for break-inside style property */
export type BreakInsideStyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region" | UtilTypes.Base_StyleType;



/** Type for caption-side style property */
export type CaptionSideStyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end" | UtilTypes.Base_StyleType;



/** Type for caret-color style property */
export type CaretColorStyleType = "auto" | ColorTypes.Color_StyleType;



/** Type for clear style property */
export type ClearStyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end" | UtilTypes.Base_StyleType;



/** Type for clear style property */
export type ClipStyleType = "auto" | UtilTypes.Base_StyleType |
                [
                    UtilTypes.SingleLength_StyleType,
                    UtilTypes.SingleLength_StyleType, 
                    UtilTypes.SingleLength_StyleType,
                    UtilTypes.SingleLength_StyleType, 
                ];



/** Type for color-interpolation-filters style property */
export type ColorInterpolationFiltersStyleType = "auto" | "sRGB" | "linearRGB" | UtilTypes.Base_StyleType;



/** Type for column-count style property */
export type ColumnCountStyleType = "auto" | number | UtilTypes.Base_StyleType;



/** Type for column-fill style property */
export type ColumnFillStyleType = "auto" | "balance" | "balance-all" | UtilTypes.Base_StyleType;



/** Type for single gap style property */
export type SingleGap_StyleType = "normal" | UtilTypes.SingleLength_StyleType;



/**
 * Type for column rule. Column rule can be presented by the following types:
 *   - string - literal CSS box shadow string.
 *   - object - fields specify column rule parts.
 */
export type ColumnRuleStyleType = string | UtilTypes.Base_StyleType |
    {
        /** Column rule width. */
        width?: BorderWidthStyleType;
        /** Column rule style. */
        style?: BorderStyleStyleType;
        /** Column rule color. */
        color?: SingleGap_StyleType;
    };



/** Type for column-span style property */
export type ColumnSpanStyleType = "none" | "all" | UtilTypes.Base_StyleType;



/** Type for columns style property */
export type ColumnsStyleType = "auto" | number | ["auto" | number, UtilTypes.SingleLength_StyleType] | UtilTypes.Base_StyleType;



/** Type for float (cssFloat) style property */
export type FloatStyleType = "left" | "right" | "none" | "inline-start" | "inline-end" | UtilTypes.Base_StyleType;



/** Type for cursor style property */
export type CursorStyleType = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" |
                "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" |
                "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" |
                "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" |
                "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" |
                "zoom-out" | "grab" | "grabbing" | UtilTypes.Base_StyleType;



/** Type for direction style property */
export type DirectionStyleType = "ltr" | "rtl" | UtilTypes.Base_StyleType;



/** Type for display style property */
export type DisplayStyleType = "block" | "inline" | "run-in" | "contents" | "none" |
                "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" |
                "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" |
                "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" |
                    "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" |
                    "ruby-base-container" | "ruby-text-container" |
                "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" |
                    "list-item block flow" | "list-item block flow-root" | "flow list-item block" |
                UtilTypes.Base_StyleType;

                

/** Type for dominant-baseline style property */
export type DominantBaselineStyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
                "central" | "mathematical" | "hanging" | "text-top" | UtilTypes.Base_StyleType;



/** Type for empty-cells style property */
export type EmptyCellsStyleType = "show" | "hide" | UtilTypes.Base_StyleType;



/** Type for fill-rule style property */
export type FillRuleStyleType = "nonzero" | "evenodd" | UtilTypes.Base_StyleType;



/** Type for flex-basis style property */
export type FlexBasisStyleType = "auto" | "content" | UtilTypes.SingleLength_StyleType | UtilTypes.Base_StyleType;



/** Type for flex style property */
export type FlexStyleType = FlexBasisStyleType | [number,number] | [number,number,FlexBasisStyleType];



/** Type for flex-direction style property */
export type FlexDirectionStyleType = "row" | "row-reverse" | "column" | "column-reverse" | UtilTypes.Base_StyleType;



/** Type for flex-wrap style property */
export type FlexWrapStyleType = "nowrap" | "wrap" | "wrap-reverse" | UtilTypes.Base_StyleType;



/** Type for flex-flow style property */
export type FlexFlowStyleType = FlexDirectionStyleType | FlexWrapStyleType |
                [FlexDirectionStyleType,FlexWrapStyleType] | UtilTypes.Base_StyleType;



/** Type for font-style style property */
export type FontStyleStyleType = "normal" | "italic" | "oblique" | UtilTypes.SingleAngle_StyleType;



/** Type for font-weight style property */
export type FontWeightStyleType = "normal" | "bold" | "bolder" | "lighter" |
                100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | UtilTypes.Base_StyleType;



export type StyleType = string | UtilTypes.Base_StyleType;



/**
 * Interface representing a collection of style properties and their values.
 */
export interface Styleset
{
    alignContent?: AlignContentStyleType;
    alignItems?: AlignItemsStyleType;
    alignSelf?: AlignSelfStyleType;
    alignmentBaseline?: AlignmentBaselineStyleType;
    animation?: AnimationStyleType;
    animationDelay?: UtilTypes.MultiTime_StyleType;
    animationDirection?: AnimationDirectionStyleType;
    animationDuration?: UtilTypes.MultiTime_StyleType;
    animationFillMode?: AnimationFillModeStyleType;
    animationIterationCount?: AnimationIterationCountStyleType;
    animationName?: AnimationNameStyleType;
    animationPlayState?: AnimationPlayStateStyleType;
	animationTimingFunction?: AnimationTimingFunctionStyleType;
	
    backfaceVisibility?: BackfaceVisibilityModeStyleType;
    background?: StyleType;
    backgroundAttachment?: BackgroundAttachmentStyleType;
    backgroundClip?: BackgroundClipStyleType;
    backgroundColor?: ColorTypes.Color_StyleType;
    backgroundImage?: StyleType;
    backgroundOrigin?: BackgroundOriginStyleType;
    backgroundPosition?: UtilTypes.MultiPosition_StyleType;
    backgroundPositionX?: string;
    backgroundPositionY?: string;
    backgroundRepeat?: BackgroundRepeatStyleType;
    backgroundSize?: BackgroundSizeStyleType;
    baselineShift?: BaselineShiftStyleType;
    border?: BorderSide_StyleType;
    borderBottom?: BorderSide_StyleType;
    borderBottomColor?: ColorTypes.Color_StyleType;
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
    borderLeftColor?: ColorTypes.Color_StyleType;
    borderLeftStyle?: BorderSideStyle_StyleType;
    borderLeftWidth?: BorderSideWidth_StyleType;
    borderRadius?: BorderRadiusStyleType;
    borderRight?: BorderSide_StyleType;
    borderRightColor?: ColorTypes.Color_StyleType;
    borderRightStyle?: BorderSideStyle_StyleType;
    borderRightWidth?: BorderSideWidth_StyleType;
    borderSpacing?: BorderSpacingStyleType;
    borderStyle?: BorderStyleStyleType;
    borderTop?: BorderSide_StyleType;
    borderTopColor?: ColorTypes.Color_StyleType;
    borderTopLeftRadius?: SingleCornerRadius_StyleType;
    borderTopRightRadius?: SingleCornerRadius_StyleType;
    borderTopStyle?: BorderSideStyle_StyleType;
    borderTopWidth?: BorderSideWidth_StyleType;
    borderWidth?: BorderWidthStyleType;
    bottom?: UtilTypes.SingleLength_StyleType;
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
    color?: ColorTypes.Color_StyleType;
    colorInterpolationFilters?: ColorInterpolationFiltersStyleType;
    columnCount?: ColumnCountStyleType;
    columnFill?: ColumnFillStyleType;
    columnGap?: SingleGap_StyleType;
    columnRule?: ColumnRuleStyleType;
    columnRuleColor?: ColorTypes.Color_StyleType;
    columnRuleStyle?: BorderSideStyle_StyleType;
    columnRuleWidth?: BorderSideWidth_StyleType;
    columnSpan?: ColumnSpanStyleType;
    columnWidth?: UtilTypes.SingleLength_StyleType;
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
    flexGrow?: UtilTypes.SingleNumber_StyleType;
    flexShrink?: UtilTypes.SingleNumber_StyleType;
    flexWrap?: FlexWrapStyleType;
    floodColor?: ColorTypes.Color_StyleType;
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
	
    height?: UtilTypes.SingleLength_StyleType;
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
    left?: UtilTypes.SingleLength_StyleType;
    letterSpacing?: string;
    lightingColor?: ColorTypes.Color_StyleType;
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
    orphans?: number | UtilTypes.Base_StyleType;
    outline?: string;
    outlineColor?: ColorTypes.Color_StyleType;
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
    right?: UtilTypes.SingleLength_StyleType;
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
    textDecorationColor?: ColorTypes.Color_StyleType;
    textDecorationLine?: string;
    textDecorationStyle?: string;
    textEmphasis?: string;
    textEmphasisColor?: ColorTypes.Color_StyleType;
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
    top?: UtilTypes.SingleLength_StyleType;
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
    webkitColumnRuleColor?: ColorTypes.Color_StyleType;
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
    widows?: number | UtilTypes.Base_StyleType;
    width?: UtilTypes.SingleLength_StyleType;
    willChange?: string;
    wordBreak?: string;
    wordSpacing?: string;
    wordWrap?: string;
	writingMode?: string;
	
    zIndex?: "auto" | number | UtilTypes.Base_StyleType;
    zoom?: StyleType;

    // // custom properties/aliases
    // shadow?: BoxShadowStyleType;
    // bgc?: ColorTypes.Color_StyleType;

    /**
     * Special property that contains several definitions of custom CSS properties.
     * This can be used the following way:
     *   $custom: { mainColor: "black", mainBgColor: "white" }
     * The first name (mainColor) determines the custom property name. The second name (color) is
     * one of Styleset properties and is only used to determine the type of value for the custom
     * property.
     */
    $custom?: { [K: string]: string }
    // $custom?: { [K: string]: [P: keyof Styleset, Styleset[P]] } }
}



