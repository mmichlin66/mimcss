import {
    Extended, IStringProxy, Pair, Box, OneOrMany, NumberBox,
    CssNumber, MultiCssNumber,
    Size_StyleType, Position_StyleType, MultiPosition_StyleType,
    
} from "./UtilTypes"
import {Color_StyleType, ColorBox} from "./ColorTypes"



/** Type for align-content style property */
export type AlignContentStyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
    "space-between" | "space-around" | "space-evenly";



/** Type for align-items style property */
export type AlignItemsStyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center";



/** Type for align-self style property */
export type AlignSelfStyleType = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
    "safe center" | "unsafe center";



/** Type for alignment-baseline style property */
export type AlignmentBaselineStyleType = "auto" | "baseline" | "before-edge" | "text-before-edge" |
    "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
    "hanging" | "mathematical" | "top" | "center" | "bottom";



/** Type for single animation */
export type SingleAnimation = string |
    {
        delay?: Extended<CssNumber>;
        func?: Extended<SingleAnimationTimingFunction>;
        duration?: Extended<CssNumber>;
        count?: Extended<SingleAnimationIterationCount>;
        direction?: Extended<SingleAnimationDirection>;
        state?: Extended<SingleAnimationPlayState>;
        mode?: Extended<SingleAnimationFillMode>;
        name?: Extended<SingleAnimationName>;
    };

/** Type for animation style property */
export type AnimationStyleType = OneOrMany<SingleAnimation>;



/** Type for single animation direction */
export type SingleAnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";

/** Type for animation-direction style property */
export type AnimationDirectionStyleType = OneOrMany<SingleAnimationDirection>;



/** Type for single animation fill mode */
export type SingleAnimationFillMode = "none" | "forwards" | "backwards" | "both";

/** Type for animation-fill-mode style property */
export type AnimationFillModeStyleType = OneOrMany<SingleAnimationDirection>;



/** Type for single animation iteration count */
export type SingleAnimationIterationCount = "infinite" | CssNumber;

/** Type for animation-iteration-count style property */
export type AnimationIterationCountStyleType = OneOrMany<SingleAnimationIterationCount>;



/**
 * The IAnimationNameProvider interface represents an object that provides a name of an animation.
 * Objects that implement this interface can be used whereever animation name is required. The
 * primary object that implements this interface is AnimationRule returned from the $keyframes
 * function.
 */
export interface IAnimationNameProvider
{
    /** Returns the name of the animation */
    getAnimationName(): string;
}

/** Type for single animation name */
export type SingleAnimationName = "none" | string | IAnimationNameProvider;

/** Type for animation-name style property */
export type AnimationNameStyleType = OneOrMany<SingleAnimationName>;



/** Type for single animation play state */
export type SingleAnimationPlayState = "paused" | "running";

/** Type for animation-play-state style property */
export type AnimationPlayStateStyleType = OneOrMany<SingleAnimationPlayState>;



/** Type for simple animation timing functions - those that don't have parameters */
export type AnimationTimingFunction_Simple = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

/** Type for step animation timing function position */
export type AnimationTimingFunction_StepPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";

/** Type for step animation timing function */
export type AnimationTimingFunction_Step = number | [Extended<number>, Extended<AnimationTimingFunction_StepPosition>?];

/** Type for Bezier animation timing function */
export type AnimationTimingFunction_Bezier = [Extended<number>, Extended<number>, Extended<number>, Extended<number>];

/** Type for single animation timing function */
export type SingleAnimationTimingFunction = AnimationTimingFunction_Simple | AnimationTimingFunction_Step | AnimationTimingFunction_Bezier;

/** Type for animation-timing-function style property */
export type AnimationTimingFunctionStyleType = OneOrMany<SingleAnimationTimingFunction>;



/** Type for backface-visibility style property */
export type BackfaceVisibilityModeStyleType = "visible" | "hidden";



/** Type for single background attachment */
export type SingleBackgroundAttachment = "scroll" | "fixed" | "local";

/** Type for background-attachment style property */
export type BackgroundAttachmentStyleType = OneOrMany<SingleBackgroundAttachment>;



/** Type for single background clip */
export type SingleBackgroundClip = "border-box" | "padding-box" | "content-box" | "text";

/** Type for background-clip style property */
export type BackgroundClipStyleType = OneOrMany<SingleBackgroundClip>;



/** Type for single background origin */
export type SingleBackgroundOrigin = "border-box" | "padding-box" | "content-box" | "text";

/** Type for background-origin style property */
export type BackgroundOriginStyleType = OneOrMany<SingleBackgroundOrigin>;



/** Type for single background repeat */
export type SingleBackgroundRepeat = "repeat-x" | "repeat-y" | "repeat" | "space" | "round" | "no-repeat" |
    "repeat repeat" | "repeat space" | "repeat round" | "repeat no-repeat" |
    "space repeat" | "space space" | "space round" | "space no-repeat" |
    "round repeat" | "round space" | "round round" | "round no-repeat" |
    "no-repeat repeat" | "no-repeat space" | "no-repeat round" | "no-repeat no-repeat";

/** Type for background-repeat style property */
export type BackgroundRepeatStyleType = OneOrMany<SingleBackgroundRepeat>;



/** Type for background size */
export type SingleBackgroundSize = "cover" | "contain" | Size_StyleType;

/** Type for background-size style property */
export type BackgroundSizeStyleType = OneOrMany<SingleBackgroundSize>;



/** Type for a single corner radius */
export type SingleCornerRadius_StyleType = Pair<CssNumber>;



/** Type for border-radius style property */
export type BorderRadiusStyleType = Pair<NumberBox>;



/** Type for baseline-shift style property */
export type BaselineShiftStyleType = "sub" | "super" | CssNumber;



/** Type for single border side style property */
export type BorderSideStyle_StyleType = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
    "groove" | "ridge" | "inset" | "outset";



/** Type for border-style style property */
export type BorderStyleStyleType = Box<BorderSideStyle_StyleType>;



/** Type for border side width style property */
export type BorderSideLength_StyleType = "thin" | "medium" | "thick" | CssNumber;



/** Type for border-width style property */
export type BorderLengthStyleType = NumberBox;



/** Type for border-collapse style property */
export type BorderColapseStyleType = "collapse" | "separate";



/** Type for border-spacing style property */
export type BorderSpacingStyleType = Pair<CssNumber>;



/** Type for border-color style property */
export type BorderColorStyleType = ColorBox;



/** Type for border side style property */
export type BorderSide_StyleType = CssNumber |  BorderSideStyle_StyleType | Color_StyleType |
    [Extended<CssNumber>?, Extended<BorderSideStyle_StyleType>?, Extended<Color_StyleType>?];



/** Type for border-image-outset style property */
export type BorderImageOutsetStyleType = string | number |
    [string | number, string | number, (string | number)?, (string | number)?];



/** Type for border-image-repeat keywords */
export type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space";

/** Type for border-image-repeat style property */
export type BorderImageRepeatStyleType = Pair<BorderImageRepeatKeyword>;



/** Type for single box shadow. */
export type SingleBoxShadow = "none" | string;

/** Type for box shadow style property */
export type BoxShadowStyleType = OneOrMany<SingleBoxShadow>;



/** Type for box-sizing style property */
export type BoxSizingStyleType = "content-box" | "border-box";



/** Type for break-after style property */
export type BreakAfterStyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/** Type for break-before style property */
export type BreakBeforeStyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/** Type for break-inside style property */
export type BreakInsideStyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";



/** Type for caption-side style property */
export type CaptionSideStyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end";



/** Type for caret-color style property */
export type CaretColorStyleType = "auto" | Color_StyleType;



/** Type for clear style property */
export type ClearStyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end";



/** Type for clear style property */
export type ClipStyleType = "auto" | NumberBox;



/** Type for color-interpolation-filters style property */
export type ColorInterpolationFiltersStyleType = "auto" | "sRGB" | "linearRGB";



/** Type for column-count style property */
export type ColumnCountStyleType = "auto" | number;



/** Type for column-fill style property */
export type ColumnFillStyleType = "auto" | "balance" | "balance-all";



/**
 * Type for column rule. Column rule can be presented by the following types:
 *   - string - literal CSS box shadow string.
 *   - object - fields specify column rule parts.
 */
export type ColumnRuleStyleType = string |
    {
        /** Column rule width. */
        width?: BorderLengthStyleType;
        /** Column rule style. */
        style?: BorderStyleStyleType;
        /** Column rule color. */
        color?: Color_StyleType;
    };



/** Type for column-span style property */
export type ColumnSpanStyleType = "none" | "all";



/** Type for columns style property */
export type ColumnsStyleType = "auto" | number | ["auto" | number, CssNumber];



/** Type for float (cssFloat) style property */
export type FloatStyleType = "left" | "right" | "none" | "inline-start" | "inline-end";



/** Type for cursor style property */
export type CursorStyleType = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" |
    "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" |
    "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" |
    "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" |
    "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" |
    "zoom-out" | "grab" | "grabbing";



/** Type for direction style property */
export type DirectionStyleType = "ltr" | "rtl";



/** Type for display style property */
export type DisplayStyleType = "block" | "inline" | "run-in" | "contents" | "none" |
    "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" |
    "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" |
    "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" |
        "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" |
        "ruby-base-container" | "ruby-text-container" |
    "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" |
        "list-item block flow" | "list-item block flow-root" | "flow list-item block";

                

/** Type for dominant-baseline style property */
export type DominantBaselineStyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
    "central" | "mathematical" | "hanging" | "text-top";



/** Type for empty-cells style property */
export type EmptyCellsStyleType = "show" | "hide";



/** Type for fill-rule style property */
export type FillRuleStyleType = "nonzero" | "evenodd";



/** Type for flex-basis style property */
export type FlexBasisStyleType = "auto" | "content" | CssNumber;



/** Type for flex style property */
export type FlexStyleType = FlexBasisStyleType | [Extended<number>, Extended<number>] |
    [Extended<number>, Extended<number>, Extended<FlexBasisStyleType>];



/** Type for flex-direction style property */
export type FlexDirectionStyleType = "row" | "row-reverse" | "column" | "column-reverse";



/** Type for flex-wrap style property */
export type FlexWrapStyleType = "nowrap" | "wrap" | "wrap-reverse";



/** Type for flex-flow style property */
export type FlexFlowStyleType = FlexDirectionStyleType | FlexWrapStyleType |
    [Extended<FlexDirectionStyleType>, Extended<FlexWrapStyleType>];



/** Type for font-style style property */
export type FontStyleStyleType = "normal" | "italic" | "oblique" | CssNumber;



/** Type for font-kerning style property */
export type FontKerningStyleType = "auto" | "normal" | "none";



/** Type for font-weight style property */
export type FontWeightStyleType = "normal" | "bold" | "bolder" | "lighter" | number;



/** Type for a row-gap or column-gap style property */
export type SingleGapStyleType = "normal" | CssNumber;

/** Type for a row-gap or column-gap style property */
export type GapStyleType = Pair<SingleGapStyleType>;



/** Type for hyphens style property */
export type HyphensStyleType = "none" | "manual" | "auto";



/** Type for image-rendering style property */
export type ImageRenderingStyleType = "auto" | "crisp-edges" | "pixelated";



/** Type for isolation style property */
export type IsolationStyleType = "auto" | "isolate";



/** Type for justify-content style property */
export type JustifyContentStyleType = "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" |
    "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/** Type for justify-items style property */
export type JustifyItemsStyleType = "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right" |
    "legacy" | "legacy left" | "legacy right" | "legacy center";



/** Type for justify-self style property */
export type JustifySelfStyleType = "auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/** Type for letter-spacing style property */
export type LetterSpacingStyleType = "normal" | CssNumber;



/** Type for line-break style property */
export type LineBreakStyleType = "auto" | "loose" | "normal" | "strict" | "anywhere";



/** Type for line-height style property */
export type LineHeightStyleType = CssNumber;



/** Type for list-style-type style property */
export type ListStyleTypeStyleType = "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" |
    "cjk-decimal" | "cjk-earthly-branch" | "cjk-heavenly-stem" | "cjk-ideographic" |
    "lower-roman" | "upper-roman" | "lower-greek" | "lower-alpha" | "lower-latin" | "upper-alpha" | "upper-latin" |
    "arabic-indic" | "armenian" | "bengali" | "cambodian" | "devanagari" | "georgian" | "gujarati" | "gurmukhi" | "hebrew" |
    "hiragana" | "hiragana-iroha" | "japanese-formal" | "japanese-informal" | "kannada" | "katakana" | "katakana-iroha" |
    "khmer" | "korean-hangul-formal" | "korean-hanja-formal" | "korean-hanja-informal" | "lao" | "lower-armenian" |
    "malayalam" | "mongolian" | "myanmar" | "oriya" | "persian" | "simp-chinese-formal" | "simp-chinese-informal" |
    "tamil" | "telugu" | "thai" | "tibetan" | "trad-chinese-formal" | "trad-chinese-informal" | "upper-armenian" |
    "disclosure-open" | "disclosure-closed";

/** Type for list-style-position style property */
export type ListStylePositionStyleType = "inside" | "outside";

/** Type for list-style-position style property */
export type ListStyleStyleType = ListStyleTypeStyleType | ListStylePositionStyleType |
    [Extended<ListStyleTypeStyleType>, Extended<ListStylePositionStyleType>, Extended<string>?];



/** Type for the object-fit style property */
export type ObjectFitStyleType = "fill" | "contain" | "cover" | "none" | "scale-down";



/** Type for the overflow-anchor style property */
export type OverflowAnchorStyleType = "auto" | "none";

/** Type for the overflow-wrap style property */
export type OverflowWrapStyleType = "normal" | "break-word" | "anywhere";

/** Type for the overflow-x/y style property */
export type SingleOverflowStyleType = "visible" | "hidden" | "clip" | "scroll" | "auto";

/** Type for the overflow- style property */
export type OverflowStyleType = Pair<SingleOverflowStyleType>;



/** Type for the place-content style property */
export type PlaceContentStyleType = AlignContentStyleType | [Extended<AlignContentStyleType>, Extended<JustifyContentStyleType>];

/** Type for the place-items style property */
export type PlaceItemsStyleType = AlignItemsStyleType | [Extended<AlignItemsStyleType>, Extended<JustifyItemsStyleType>];

/** Type for the place-self style property */
export type PlaceSelfStyleType = AlignSelfStyleType | [Extended<AlignSelfStyleType>, Extended<JustifySelfStyleType>];



/** Type for the pointer-events style property */
export type PointerEventsStyleType = "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" |
    "painted" | "fill" | "stroke" | "all";



/** Type for the position style property */
export type PositionStyleType = "static" | "relative" | "absolute" | "sticky" | "fixed";



/** Type for the resize style property */
export type ResizeStyleType = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";



/** Type for the scroll-behavior style property */
export type ScrollBehaviorStyleType = "auto" | "smooth";



/** Type for the stop-opacity style property */
export type StopOpacityStyleType = number;



/** Type for the table-layout style property */
export type TableLayoutStyleType = "auto" | "fixed";



/** Type for the text-align style property */
export type TextAlignStyleType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";



/** Type for the text-align-last style property */
export type TextAlignLastStyleType = "auto" | "start" | "end" | "left" | "right" | "center" | "justify";



/** Type for the text-anchor style property */
export type TextAnchorStyleType = "start" | "middle" | "end";



/** Type for the text-decoration-line style property */
export type TextDecorationLineStyleType = "none" | "underline" | "overline" | "line-through" | "blink" |
    "spelling-error" | "grammar-error";

/** Type for the text-decoration-style style property */
export type TextDecorationStyleStyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";

/** Type for the text-decoration-thickness style property */
export type TextDecorationThicknessStyleType = "auto" | "from-font" | CssNumber;

// /** Type for the text-decoration-line style property */
// export type TextDecorationStyleType = TextDecorationLineStyleType | TextDecorationStyleStyleType |
//     Color_StyleType | TextDecorationThicknessStyleType |
//     [TextDecorationLineStyleType, TextDecorationStyleStyleType?, Color_StyleType?, TextDecorationThicknessStyleType?];



/** Type for the text-emphasis-position style property */
export type TextEmphasisPositionStyleType = [Extended<"over" | "under">, Extended<"left" | "right">] | CssNumber;

/** Type for the text-emphasis-style style property */
export type TextEmphasisShape = "dot" | "circle" | "double-circle" | "triangle" | "sesame";

/** Type for the text-emphasis-style style property */
export type TextEmphasisStyleStyleType = "none" | number | TextEmphasisShape |
    [Extended<"filled" | "open">, Extended<TextEmphasisShape>];

// /** Type for the text-emphasis style property */
// export type TextEmphasisStyleType = TextEmphasisStyleStyleType | Color_StyleType | [TextEmphasisStyleStyleType, Color_StyleType];



/** Type for the text-indent style property */
export type TextIndentStyleType = CssNumber |
    [Extended<CssNumber>, Extended<"each-line" | "hanging" | "each-line hanging">?];



/** Type for the text-justify style property */
export type TextJustifyStyleType = "auto" | "inter-character" | "inter-word" | "none" | CssNumber;



/** Type for the text-orientation style property */
export type TextOrientationStyleType = "mixed" | "upright" | "sideways";



/** Type for the text-overflow style property */
export type SingleTextOverflowStyleType = "clip" | "ellipsis" | "fade" | CssNumber;

/** Type for the text-overflow style property */
export type TextOverflowStyleType = Pair<SingleTextOverflowStyleType>;



// /** Type for the text-shadow style property */
// export type TextShadowStyleType = string> |
//     [Number_StyleType, Number_StyleType] |
//     [Number_StyleType, Number_StyleType, Number_StyleType] |
//     [Number_StyleType, Number_StyleType, Color_StyleType] |
//     [Number_StyleType, Number_StyleType, Number_StyleType, Color_StyleType];



// /** Type for the text-transform style property */
export type TextTransformStyleType = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";



// /** Type for the text-underlinePosition style property */
export type TextUnderlinePositionStyleType = "auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below";



/** Type for the touch-action style property */
export type TouchActionStyleType = "auto" | "none" | "manipulation" |
    "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" | "pan-down" | "pinch-zoom" |
    "pan-x pinch-zoom" | "pan-left pinch-zoom" | "pan-right pinch-zoom" | "pan-y pinch-zoom" | "pan-up pinch-zoom" | "pan-down pinch-zoom" |
    "pan-x pan-y" | "pan-x pan-y pinch-zoom" | "pan-x pan-up" | "pan-x pan-up pinch-zoom" | "pan-x pan-down" | "pan-x pan-down pinch-zoom" |
    "pan-y pan-left" | "pan-y pan-left pinch-zoom" | "pan-y pan-right" | "pan-y pan-right pinch-zoom" |
    "pan-left pan-up" | "pan-left pan-up pinch-zoom" | "pan-left pan-down" | "pan-left pan-down pinch-zoom" |
    "pan-right pan-up" | "pan-right pan-up pinch-zoom" | "pan-right pan-down" | "pan-right pan-down pinch-zoom" |
    "pan-up pan-left" | "pan-up pan-left pinch-zoom" | "pan-up pan-right" | "pan-up pan-right pinch-zoom" |
    "pan-down pan-left" | "pan-down pan-left pinch-zoom" | "pan-down pan-right" | "pan-down pan-right pinch-zoom";



/** Type for the translate style property */
export type TranslateStyleType = "none" | CssNumber |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<CssNumber>?];



/** Type for the unicode-bidi style property */
export type UnicodeBidiStyleType = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";



/** Type for the user-select style property */
export type UserSelectStyleType = "auto" | "text" | "none" | "contain" | "all";



/** Type for the white-space style property */
export type WhiteSpaceStyleType = "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces";



/** Type for widows style property */
export type WidowsStyleType = number;



/** Type for the word-break style property */
export type WordBreakStyleType = "normal" | "break-all" | "keep-all" | "break-word";



/** Type for the word-spacing style property */
export type WordSpacingStyleType = "normal" | CssNumber;



/** Type for the writing-mode style property */
export type WritingModeStyleType = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";



/** Type for the z-index style property */
export type ZIndexStyleType = "auto" | number;



/** Type for the zoom style property */
export type ZoomStyleType = "normal" | "reset" | CssNumber;



export type StyleType = string;



/**
 * Interface representing a collection of built-in style properties and their values.
 */
export interface ICssStyleset
{
    all?: StyleType;
    alignContent?: AlignContentStyleType;
    alignItems?: AlignItemsStyleType;
    alignSelf?: AlignSelfStyleType;
    alignmentBaseline?: AlignmentBaselineStyleType;
    animation?: AnimationStyleType;
    animationDelay?: MultiCssNumber;
    animationDirection?: AnimationDirectionStyleType;
    animationDuration?: MultiCssNumber;
    animationFillMode?: AnimationFillModeStyleType;
    animationIterationCount?: AnimationIterationCountStyleType;
    animationName?: AnimationNameStyleType;
    animationPlayState?: AnimationPlayStateStyleType;
	animationTimingFunction?: AnimationTimingFunctionStyleType;
	
    backdropFilter?: StyleType;
    backfaceVisibility?: BackfaceVisibilityModeStyleType;
    background?: StyleType;
    backgroundAttachment?: BackgroundAttachmentStyleType;
    backgroundBlendMode?: StyleType;
    backgroundClip?: BackgroundClipStyleType;
    backgroundColor?: Color_StyleType;
    backgroundImage?: StyleType;
    backgroundOrigin?: BackgroundOriginStyleType;
    backgroundPosition?: MultiPosition_StyleType;
    backgroundPositionX?: StyleType;
    backgroundPositionY?: StyleType;
    backgroundRepeat?: BackgroundRepeatStyleType;
    backgroundRepeatX?: StyleType;
    backgroundRepeatY?: StyleType;
    backgroundSize?: BackgroundSizeStyleType;
    baselineShift?: BaselineShiftStyleType;
    blockSize?: StyleType;
    border?: BorderSide_StyleType;
    borderBlockEnd?: BorderSide_StyleType;
    borderBlockEndColor?: Color_StyleType;
    borderBlockEndStyle?: BorderSideStyle_StyleType;
    borderBlockEndWidth?: BorderSideLength_StyleType;
    borderBlockStart?: BorderSide_StyleType;
    borderBlockStartColor?: Color_StyleType;
    borderBlockStartStyle?: BorderSideStyle_StyleType;
    borderBlockStartWidth?: BorderSideLength_StyleType;
    borderBottom?: BorderSide_StyleType;
    borderBottomColor?: Color_StyleType;
    borderBottomLeftRadius?: SingleCornerRadius_StyleType;
    borderBottomRightRadius?: SingleCornerRadius_StyleType;
    borderBottomStyle?: BorderSideStyle_StyleType;
    borderBottomWidth?: BorderSideLength_StyleType;
    borderCollapse?: BorderColapseStyleType;
    borderColor?: BorderColorStyleType;
    borderImage?: StyleType;
    borderImageOutset?: BorderImageOutsetStyleType;
    borderImageRepeat?: BorderImageRepeatStyleType;
    borderImageSlice?: StyleType;
    borderImageSource?: StyleType;
    borderImageWidth?: NumberBox;
    borderInlineEnd?: BorderSide_StyleType;
    borderInlineEndColor?: Color_StyleType;
    borderInlineEndStyle?: BorderSideStyle_StyleType;
    borderInlineEndWidth?: BorderSideLength_StyleType;
    borderInlineStart?: BorderSide_StyleType;
    borderInlineStartColor?: Color_StyleType;
    borderInlineStartStyle?: BorderSideStyle_StyleType;
    borderInlineStartWidth?: BorderSideLength_StyleType;
    borderLeft?: BorderSide_StyleType;
    borderLeftColor?: Color_StyleType;
    borderLeftStyle?: BorderSideStyle_StyleType;
    borderLeftWidth?: BorderSideLength_StyleType;
    borderRadius?: BorderRadiusStyleType;
    bufferedRendering?: StyleType;
    borderRight?: BorderSide_StyleType;
    borderRightColor?: Color_StyleType;
    borderRightStyle?: BorderSideStyle_StyleType;
    borderRightWidth?: BorderSideLength_StyleType;
    borderSpacing?: BorderSpacingStyleType;
    borderStyle?: BorderStyleStyleType;
    borderTop?: BorderSide_StyleType;
    borderTopColor?: Color_StyleType;
    borderTopLeftRadius?: SingleCornerRadius_StyleType;
    borderTopRightRadius?: SingleCornerRadius_StyleType;
    borderTopStyle?: BorderSideStyle_StyleType;
    borderTopWidth?: BorderSideLength_StyleType;
    borderWidth?: BorderLengthStyleType;
    bottom?: CssNumber;
    boxShadow?: BoxShadowStyleType;
    boxSizing?: BoxSizingStyleType;
    breakAfter?: BreakAfterStyleType;
    breakBefore?: BreakBeforeStyleType;
	breakInside?: BreakInsideStyleType;
	
    captionSide?: CaptionSideStyleType;
    caretColor?: CaretColorStyleType;
    clear?: ClearStyleType;
    clip?: ClipStyleType;
    clipPath?: StyleType;
    clipRule?: StyleType;
    color?: Color_StyleType;
    colorInterpolation?: StyleType;
    colorInterpolationFilters?: ColorInterpolationFiltersStyleType;
    columnCount?: ColumnCountStyleType;
    columnFill?: ColumnFillStyleType;
    columnGap?: "normal" | SingleGapStyleType;
    columnRule?: ColumnRuleStyleType;
    columnRuleColor?: Color_StyleType;
    columnRuleStyle?: BorderSideStyle_StyleType;
    columnRuleWidth?: BorderSideLength_StyleType;
    columnSpan?: ColumnSpanStyleType;
    columnWidth?: CssNumber;
    columns?: ColumnsStyleType;
    contain?: StyleType;
    content?: StyleType;
    counterIncrement?: StyleType;
    counterReset?: StyleType;
	cursor?: CursorStyleType;
	
    direction?: DirectionStyleType;
    display?: DisplayStyleType;
    dominantBaseline?: DominantBaselineStyleType;

    emptyCells?: EmptyCellsStyleType;
	
    fill?: StyleType;
    fillOpacity?: StyleType;
    fillRule?: FillRuleStyleType;
    filter?: StyleType;
    flex?: FlexStyleType;
    flexBasis?: FlexBasisStyleType;
    flexDirection?: FlexDirectionStyleType;
    flexFlow?: FlexFlowStyleType;
    flexGrow?: CssNumber;
    flexShrink?: CssNumber;
    flexWrap?: FlexWrapStyleType;
    float?: FloatStyleType;
    floodColor?: Color_StyleType;
    floodOpacity?: StyleType;
    font?: StyleType;
    fontDisplay?: StyleType;
    fontFamily?: StyleType;
    fontFeatureSettings?: StyleType;
    fontKerning?: FontKerningStyleType;
    fontOpticalSizing?: StyleType;
    fontSize?: CssNumber;
    fontSizeAdjust?: StyleType;
    fontStretch?: StyleType;
    fontStyle?: FontStyleStyleType;
    fontSynthesis?: StyleType;
    fontVariant?: StyleType;
    fontVariantCaps?: StyleType;
    fontVariantEastAsian?: StyleType;
    fontVariantLigatures?: StyleType;
    fontVariantNumeric?: StyleType;
    fontVariantPosition?: StyleType;
    fontVariationSettings?: StyleType;
	fontWeight?: FontWeightStyleType;
	
    gap?: GapStyleType;
    grid?: StyleType;
    gridArea?: StyleType;
    gridAutoColumns?: StyleType;
    gridAutoFlow?: StyleType;
    gridAutoRows?: StyleType;
    gridColumn?: StyleType;
    gridColumnEnd?: StyleType;
    gridColumnGap?: SingleGapStyleType;
    gridColumnStart?: StyleType;
    gridGap?: StyleType;
    gridRow?: StyleType;
    gridRowEnd?: StyleType;
    gridRowGap?: SingleGapStyleType;
    gridRowStart?: StyleType;
    gridTemplate?: StyleType;
    gridTemplateAreas?: StyleType;
    gridTemplateColumns?: StyleType;
	gridTemplateRows?: StyleType;
	
    height?: CssNumber;
	hyphens?: HyphensStyleType;
	
    imageRendering?: ImageRenderingStyleType;
	inlineSize?: CssNumber;
	isolation?: IsolationStyleType;
	
    justifyContent?: JustifyContentStyleType;
    justifyItems?: JustifyItemsStyleType;
	justifySelf?: JustifySelfStyleType;
	
	kerning?: FontKerningStyleType;
	
    left?: CssNumber;
    letterSpacing?: LetterSpacingStyleType;
    lightingColor?: Color_StyleType;
    lineBreak?: LineBreakStyleType;
    lineHeight?: LineHeightStyleType;
    listStyle?: ListStyleStyleType;
    listStyleImage?: StyleType;
    listStylePosition?: ListStylePositionStyleType;
	listStyleType?: ListStyleTypeStyleType;
	
    margin?: NumberBox;
    marginBlockEnd?: CssNumber;
    marginBlockStart?: CssNumber;
    marginBottom?: CssNumber;
    marginInlineEnd?: CssNumber;
    marginInlineStart?: CssNumber;
    marginLeft?: CssNumber;
    marginRight?: CssNumber;
    marginTop?: CssNumber;
    marker?: StyleType;
    markerEnd?: StyleType;
    markerMid?: StyleType;
    markerStart?: StyleType;
    mask?: StyleType;
    maskComposite?: StyleType;
    maskImage?: StyleType;
    maskPosition?: StyleType;
    maskRepeat?: StyleType;
    maskSize?: StyleType;
    maskType?: StyleType;
    maxBlockSize?: CssNumber;
    maxHeight?: CssNumber;
    maxInlineSize?: CssNumber;
    maxWidth?: CssNumber;
	maxZoom?: CssNumber;
    minBlockSize?: CssNumber;
    minHeight?: CssNumber;
    minInlineSize?: CssNumber;
	minWidth?: CssNumber;
	minZoom?: CssNumber;
	
    msContentZoomChaining?: StyleType;
    msContentZoomLimit?: StyleType;
    msContentZoomLimitMax?: StyleType;
    msContentZoomLimitMin?: StyleType;
    msContentZoomSnap?: StyleType;
    msContentZoomSnapPoints?: StyleType;
    msContentZoomSnapType?: StyleType;
    msContentZooming?: StyleType;
    msFlowFrom?: StyleType;
    msFlowInto?: StyleType;
    msFontFeatureSettings?: StyleType;
    msGridColumn?: StyleType;
    msGridColumnAlign?: StyleType;
    msGridColumnSpan?: StyleType;
    msGridColumns?: StyleType;
    msGridRow?: StyleType;
    msGridRowAlign?: StyleType;
    msGridRowSpan?: StyleType;
    msGridRows?: StyleType;
    msHighContrastAdjust?: StyleType;
    msHyphenateLimitChars?: StyleType;
    msHyphenateLimitLines?: StyleType;
    msHyphenateLimitZone?: StyleType;
    msHyphens?: StyleType;
    msImeAlign?: StyleType;
    msOverflowStyle?: StyleType;
    msScrollChaining?: StyleType;
    msScrollLimit?: StyleType;
    msScrollLimitXMax?: StyleType;
    msScrollLimitXMin?: StyleType;
    msScrollLimitYMax?: StyleType;
    msScrollLimitYMin?: StyleType;
    msScrollRails?: StyleType;
    msScrollSnapPointsX?: StyleType;
    msScrollSnapPointsY?: StyleType;
    msScrollSnapType?: StyleType;
    msScrollSnapX?: StyleType;
    msScrollSnapY?: StyleType;
    msScrollTranslation?: StyleType;
    msTextCombineHorizontal?: StyleType;
    msTextSizeAdjust?: StyleType;
    msTouchAction?: StyleType;
    msTouchSelect?: StyleType;
    msUserSelect?: StyleType;
    msWrapFlow?: StyleType;
    msWrapMargin?: StyleType;
	msWrapThrough?: StyleType;
	
    objectFit?: ObjectFitStyleType;
    objectPosition?: Position_StyleType;
    offset?: StyleType;
    offsetDistance?: StyleType;
    offsetPath?: StyleType;
    offsetRotate?: StyleType;
    opacity?: CssNumber;
    order?: CssNumber;
    orientation?: StyleType;
    orphans?: CssNumber;
    outline?: BorderSide_StyleType;
    outlineColor?: Color_StyleType;
    outlineOffset?: CssNumber;
    outlineStyle?: BorderStyleStyleType;
    outlineWidth?: BorderSideLength_StyleType;
    overflow?: OverflowStyleType;
    overflowAnchor?: OverflowAnchorStyleType;
    overflowWrap?: OverflowWrapStyleType;
    overflowX?: SingleOverflowStyleType;
	overflowY?: SingleOverflowStyleType;
	overflowInline?: SingleOverflowStyleType;
    overflowBlock?: SingleOverflowStyleType;
    overscrollBehavior?: StyleType;
    overscrollBehaviorBlock?: StyleType;
    overscrollBehaviorInline?: StyleType;
    overscrollBehaviorX?: StyleType;
    overscrollBehaviorY?: StyleType;
    
    padding?: NumberBox;
    paddingBlockEnd?: CssNumber;
    paddingBlockStart?: CssNumber;
    paddingBottom?: CssNumber;
    paddingInlineEnd?: CssNumber;
    paddingInlineStart?: CssNumber;
    paddingLeft?: CssNumber;
    paddingRight?: CssNumber;
    paddingTop?: CssNumber;
    page?: StyleType;
    paintOrder?: StyleType;
    pageBreakAfter?: BreakAfterStyleType;
    pageBreakBefore?: BreakBeforeStyleType;
    pageBreakInside?: BreakInsideStyleType;
    perspective?: CssNumber;
    perspectiveOrigin?: Position_StyleType;
    placeContent?: PlaceContentStyleType;
    placeItems?: PlaceItemsStyleType;
    placeSelf?: PlaceSelfStyleType;
    pointerEvents?: PointerEventsStyleType;
	position?: PositionStyleType;
	
	quotes?: StyleType;
	
    resize?: ResizeStyleType;
    right?: CssNumber;
    rotate?: StyleType;
    rowGap?: SingleGapStyleType;
    rubyAlign?: StyleType;
    rubyOverhang?: StyleType;
	rubyPosition?: StyleType;
	
    scale?: StyleType;
    scrollBehavior?: ScrollBehaviorStyleType;
    scrollMargin?: NumberBox;
    scrollMarginBlock?: NumberBox;
    scrollMarginBlockEnd?: CssNumber;
    scrollMarginBlockStart?: CssNumber;
    scrollMarginBottom?: CssNumber;
    scrollMarginInline?: NumberBox;
    scrollMarginInlineEnd?: CssNumber;
    scrollMarginInlineStart?: CssNumber;
    scrollMarginLeft?: CssNumber;
    scrollMarginRight?: CssNumber;
    scrollMarginTop?: CssNumber;
    scrollPadding?: NumberBox;
    scrollPaddingBlock?: NumberBox;
    scrollPaddingBlockEnd?: CssNumber;
    scrollPaddingBlockStart?: CssNumber;
    scrollPaddingBottom?: CssNumber;
    scrollPaddingInline?: NumberBox;
    scrollPaddingInlineEnd?: CssNumber;
    scrollPaddingInlineStart?: CssNumber;
    scrollPaddingLeft?: CssNumber;
    scrollPaddingRight?: CssNumber;
    scrollPaddingTop?: CssNumber;
    scrollSnapAlign?: StyleType;
    scrollSnapStop?: StyleType;
    scrollSnapType?: StyleType;
    shapeImageThreshold?: StyleType;
    shapeMargin?: StyleType;
    shapeOutside?: StyleType;
    shapeRendering?: StyleType;
    stopColor?: Color_StyleType;
    stopOpacity?: StopOpacityStyleType;
    stroke?: StyleType;
    strokeDasharray?: StyleType;
    strokeDashoffset?: StyleType;
    strokeLinecap?: StyleType;
    strokeLinejoin?: StyleType;
    strokeMiterlimit?: StyleType;
    strokeOpacity?: StyleType;
	strokeWidth?: StyleType;
	
    tabSize?: CssNumber;
    tableLayout?: TableLayoutStyleType;
    textAlign?: TextAlignStyleType;
    textAlignLast?: TextAlignLastStyleType;
    textAnchor?: TextAnchorStyleType;
    textCombineUpright?: StyleType;
    textDecoration?: StyleType;
    textDecorationColor?: Color_StyleType;
    textDecorationLine?: TextDecorationLineStyleType;
    textDecorationSkipInk?: StyleType;
    textDecorationStyle?: TextDecorationStyleStyleType;
    textDecorationThickness?: TextDecorationThicknessStyleType;
    textEmphasis?: StyleType;
    textEmphasisColor?: Color_StyleType;
    textEmphasisPosition?: TextEmphasisPositionStyleType;
    textEmphasisStyle?: TextEmphasisStyleStyleType;
    textIndent?: TextIndentStyleType;
    textJustify?: TextJustifyStyleType;
    textKashida?: StyleType;
    textKashidaSpace?: StyleType;
    textOrientation?: TextOrientationStyleType;
    textOverflow?: TextOverflowStyleType;
    textShadow?: StyleType;
    textSizeAdjust?: StyleType;
    textTransform?: TextTransformStyleType;
    textUnderlinePosition?: TextUnderlinePositionStyleType;
    top?: CssNumber;
    touchAction?: TouchActionStyleType;
    transform?: StyleType;
    transformBox?: StyleType;
    transformOrigin?: StyleType;
    transformStyle?: StyleType;
    transition?: StyleType;
    transitionDelay?: StyleType;
    transitionDuration?: StyleType;
    transitionProperty?: StyleType;
    transitionTimingFunction?: StyleType;
	translate?: TranslateStyleType;
	
    unicodeBidi?: UnicodeBidiStyleType;
	userSelect?: UserSelectStyleType;
    userZoom?: StyleType;
	
    verticalAlign?: StyleType;
	visibility?: StyleType;
	vectorEffect?: StyleType;
	
    webkitBorderImage?: StyleType;
    webkitBoxDirection?: StyleType;
    webkitBoxOrient?: StyleType;
    webkitColumnBreakAfter?: StyleType;
    webkitColumnBreakBefore?: StyleType;
    webkitColumnBreakInside?: StyleType;
    webkitColumnCount?: ColumnCountStyleType;
    webkitColumnGap?: SingleGapStyleType;
    webkitColumnRule?: ColumnRuleStyleType;
    webkitColumnRuleColor?: Color_StyleType;
    webkitColumnRuleStyle?: ColumnRuleStyleType;
    webkitColumnRuleWidth?: BorderLengthStyleType;
    webkitColumnSpan?: StyleType;
    webkitColumnWidth?: StyleType;
    webkitColumns?: StyleType;
    webkitLineClamp?: StyleType;
    webkitTapHighlightColor?: StyleType;
    webkitUserModify?: StyleType;
    webkitUserSelect?: StyleType;
	webkitWritingMode?: StyleType;
	
    whiteSpace?: WhiteSpaceStyleType;
    widows?: WidowsStyleType;
    width?: CssNumber;
    willChange?: StyleType;
    wordBreak?: WordBreakStyleType;
    wordSpacing?: WordSpacingStyleType;
    wordWrap?: StyleType;
	writingMode?: WritingModeStyleType;
	
    zIndex?: ZIndexStyleType;
    zoom?: ZoomStyleType;
}



/**
 * Interface representing a collection of style properties and their values.
 */
export type IStyleset = { [K in keyof ICssStyleset]: Extended<ICssStyleset[K]> }



import {IVarRule} from "../rules/RuleTypes";

/**
 * The CustomVarStyleType type represents a custom CSS property name and value that are used to
 * define custom properties in a Styleset. This object is used in conjunction with the
 * `--` property of the Styleset type.
 * 
 * CustomVarStyleType objects should be mostly used to override custom properties that have
 * previously been defined at the top-level using the $var function. That way you can have a
 * "global" value of a custom property and assign a different value to it under a certain CSS
 * selector.
 * 
 * The values of the type can be specified as either a two-item or a three-item array. The
 * two-item array is used with a previously defined custom CSS property represented by an IVarRule
 * object:
 * - The first item is the IVarRule object.
 * - The second item is the value
 * 
 * The three-item array allows directly specifying the custom CSS property name:
 * - The first item is a string - the name of the custom CSS property. If the name is not prefixed
 * with two dashes they will be added automatically.
 * - The second item is the name of a non-custom CSS property whose type determines the type of the
 * custom property value.
 * - The third item is the value
 * 
 * Use the CustomVarStyleType type in the following manner:
 * 
 * ```typescript
 * class MyStyles
 * {
 *     // define global custom CSS property and re-define its value under "brown" class.
 *     mainColor = $var( "color", "black");
 *     brown = $class({ "--": [ [this.mainColor, "brown"] ] })

 *     // directly define custom CSS property under "blue" class.
 *     blue = $class({ "--": [ ["different-color", "color", "blue"] ] })
 * });
 * ```
 * 
 * This is equivalent to the following CSS:
 * 
 * ```css
 * :root { --MyStyles_mainColor: "black"; }
 * .brown { --MyStyles_mainColor: "brown"; }
 * .blue { --different-olor: "blue"; }
 * ```
 */
export type CustomVarStyleType<K extends keyof IStyleset = any> = 
    [IVarRule<K>, IStyleset[K]] | [string, K, IStyleset[K]]



/**
 * Type representing a collection of style properties and their values. In addition to the
 * properties representing the standard CSS styles, this type also includes:
 * - the "--" property, which is an array of CustomVarStyleType objects.
 * - the "!" property, which is one or more names of CSS properties to which the !important
 *   flag should be added
 */
export type Styleset = IStyleset &
    {
        /**
         * Special property "--" specifies an array that contains CustomVarStyleType objects each
         * representing a definition of a custom CSS property.
         */
        "--"?: CustomVarStyleType[];

        /**
         * Special property "!" specifies one or more names of styleset properties that shuld be
         * considered "important". When the rule is inserted into DOM, the "!important" flag is
         * added to the property value.
         */
        "!"?: (keyof IStyleset)[],
    };



/** Represents pseudo classes */
export type PseudoClass = ":active" | ":any-link" | ":blank" | ":checked" | ":default" | ":defined" |
	":disabled" | ":empty" | ":enabled" | ":first-child" | ":first-of-type" | ":fullscreen" |
	":focus" | ":focus-visible" | ":focus-Within" | ":hover" | ":indeterminate" | ":in-range" | ":invalid" |
	":last-child" | ":last-of-type" | ":link" | ":only-child" | ":only-of-type" | ":optional" |
	":out-of-range" | ":placeholder-shown" | ":read-only" | ":read-write" | ":required" | ":root" |
	":scope" | ":target" | ":valid" | ":visited" | ":dir(rtl)" | ":dir(ltr)";



/** Represents print-related pseudo classes - those that can be specified with the @page CSS rule */
export type PagePseudoClass = ":blank" | ":first" | ":left" | ":right";



/** Represents possible pseudo elements */
export type PseudoElement = "::after" | "::backdrop" | "::before" | "::cue" | "::firstLetter" |
	"::firstLine" | "::grammarError" | "::marker" | "::placeholder" | "::selection" | "::spellingError";



/** Type for a selector */
export type SelectorType = string | IStringProxy;



/**
 * Type representing a single set of styles as part of the @supports rules. The styles in the
 * styleset are combined with the "and" operator. The entire styleset can be negated, which will
 * result in placing the "not" operator that will act on all styles in the query.
 * 
 * Note that using PureStyleset object doesn't allow for checking whether two or more values of
 * a given property are supported. For example, although we can test that the "display" property
 * supports the "flex" value, we cannot check whether both "flex" and "grid" values are supported.
 * To check such criteria you must specify the query as a string.
 */
export type SingleSupportsQuery = string | IStyleset & { $negate?: boolean; };



/**
 * Type representing one or more queries as part of the @supports rule. While multiple queries in
 * an array are combined with the "or" operator, the styles within each styleset are combined with
 * the "and" operator.
 */
export type SupportsQuery = SingleSupportsQuery | SingleSupportsQuery[];



