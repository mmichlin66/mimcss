import {
    Extended, OneOrPair, OneOrBox, OneOrMany, NumberBox, CssNumber, MultiCssNumber,
    CssPosition, MultiCssPosition, IValueProxy,
} from "./UtilTypes"
import {CssColor} from "./ColorTypes"
import {CssImage} from "./ImageTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS property types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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
export interface IAnimationNameProxy extends IValueProxy
{
    /** Flag indicating that this object implements the IAnimationNameProxy interface */
    readonly isAnimationNameProxy: boolean;
}

/** Type for single animation name */
export type SingleAnimationName = "none" | string | IAnimationNameProxy;

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



/** Type for single background blend mode */
export type SingleBackgroundBlendMode = "normal" | "multiply" | "screen" | "overlay" | "darken" |
    "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" |
    "exclusion" | "hue" | "saturation" | "color" | "luminosity";

/** Type for commaArraySeparator style property */
export type BackgroundBlendModeStyleType = OneOrMany<SingleBackgroundBlendMode>;



/** Type for single background clip */
export type SingleBackgroundClip = "border-box" | "padding-box" | "content-box" | "text";

/** Type for background-clip style property */
export type BackgroundClipStyleType = OneOrMany<SingleBackgroundClip>;



/** Type for background-image style property */
export type BackgroundImageStyleType = "none" | OneOrMany<CssImage>;



/** Type for single background origin */
export type SingleBackgroundOrigin = "border-box" | "padding-box" | "content-box" | "text";

/** Type for background-origin style property */
export type BackgroundOriginStyleType = OneOrMany<SingleBackgroundOrigin>;



/** Type for single background repeat */
export type SingleBackgroundRepeatKeyword = "repeat" | "space" | "round" | "no-repeat";

/** Type for single background repeat */
export type SingleBackgroundRepeat = "repeat-x" | "repeat-y" | OneOrPair<SingleBackgroundRepeatKeyword>;

/** Type for background-repeat style property */
export type BackgroundRepeatStyleType = OneOrMany<SingleBackgroundRepeat>;



/** Type for background size */
export type SingleBackgroundSize = "cover" | "contain" | OneOrPair<CssNumber | "auto">;

/**
 * Type for background-size style property. The background-size style can specify one or more
 * comma-separated sizes, where each size can be a keyword, a length or two lengths. We model
 * this structure the following way:
 * - if the value is a string or a number, that's the only value;
 * - if the value is an array, then it is a list of several sizes. Each element in this array is
 *   either a keyword or a length or an array of two elements.
 * Thus [100,200] will be interpreted as "100px, 200px" and not "100px 200px"; that is, it will
 * define two sizes each with a width instead of one size with both width and height. If you need
 * to specify both width and height you must use array within array - even for a single size:
 * [[100,200]] wll be interpreted as "100px 200px".
 */
export type BackgroundSizeStyleType = OneOrMany<SingleBackgroundSize>;



/** Type for a single corner radius */
export type SingleCornerRadius_StyleType = OneOrPair<CssNumber>;



/** Type for baseline-shift style property */
export type BaselineShiftStyleType = "sub" | "super" | CssNumber;



/** Type for border-radius style property */
export type BorderRadiusStyleType = OneOrPair<NumberBox>;



/** Type for single border side style property */
export type BorderStyleKeyword = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
    "groove" | "ridge" | "inset" | "outset";



/** Type for border-style style property */
export type BorderStyleStyleType = OneOrBox<BorderStyleKeyword>;



/** Type for border side width style property */
export type BorderSideLengthStyleType = "thin" | "medium" | "thick" | CssNumber;



/** Type for border-width style property */
export type BorderLengthStyleType = OneOrBox<BorderSideLengthStyleType>;



/** Type for border-collapse style property */
export type BorderColapseStyleType = "collapse" | "separate";



/** Type for border-spacing style property */
export type BorderSpacingStyleType = OneOrPair<CssNumber>;



/** Type for border-color style property */
export type BorderColorStyleType = OneOrBox<CssColor>;



/** Type for border side style property */
export type BorderStyleType = CssNumber | BorderStyleKeyword | CssColor |
    [Extended<CssNumber>?, Extended<BorderStyleKeyword>?, Extended<CssColor>?];



/** Type for border-image-outset style property */
export type BorderImageOutsetStyleType = OneOrBox<CssNumber>;



/** Type for border-image-repeat keywords */
export type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space";

/** Type for border-image-repeat style property */
export type BorderImageRepeatStyleType = OneOrPair<BorderImageRepeatKeyword>;



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
export type CaretColorStyleType = "auto" | CssColor;



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
        color?: CssColor;
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
export type GapStyleType = OneOrPair<SingleGapStyleType>;



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
export type OverflowStyleType = OneOrPair<SingleOverflowStyleType>;



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
export type TextOverflowStyleType = OneOrPair<SingleTextOverflowStyleType>;



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



export type DefaultStyleType = string;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Styleset types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Interface representing a collection of built-in style properties and their values.
 */
export interface ICssStyleset
{
    all?: DefaultStyleType;
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

    backdropFilter?: DefaultStyleType;
    backfaceVisibility?: BackfaceVisibilityModeStyleType;
    background?: DefaultStyleType;
    backgroundAttachment?: BackgroundAttachmentStyleType;
    backgroundBlendMode?: BackgroundBlendModeStyleType;
    backgroundClip?: BackgroundClipStyleType;
    backgroundColor?: CssColor;
    backgroundImage?: BackgroundImageStyleType;
    backgroundOrigin?: BackgroundOriginStyleType;
    backgroundPosition?: MultiCssPosition;
    backgroundPositionX?: DefaultStyleType;
    backgroundPositionY?: DefaultStyleType;
    backgroundRepeat?: BackgroundRepeatStyleType;
    backgroundRepeatX?: DefaultStyleType;
    backgroundRepeatY?: DefaultStyleType;
    backgroundSize?: BackgroundSizeStyleType;
    baselineShift?: BaselineShiftStyleType;
    blockSize?: CssNumber;
    border?: BorderStyleType;
    borderBlockEnd?: BorderStyleType;
    borderBlockEndColor?: CssColor;
    borderBlockEndStyle?: BorderStyleKeyword;
    borderBlockEndWidth?: BorderSideLengthStyleType;
    borderBlockStart?: BorderStyleType;
    borderBlockStartColor?: CssColor;
    borderBlockStartStyle?: BorderStyleKeyword;
    borderBlockStartWidth?: BorderSideLengthStyleType;
    borderBottom?: BorderStyleType;
    borderBottomColor?: CssColor;
    borderBottomLeftRadius?: SingleCornerRadius_StyleType;
    borderBottomRightRadius?: SingleCornerRadius_StyleType;
    borderBottomStyle?: BorderStyleKeyword;
    borderBottomWidth?: BorderSideLengthStyleType;
    borderCollapse?: BorderColapseStyleType;
    borderColor?: BorderColorStyleType;
    borderImage?: DefaultStyleType;
    borderImageOutset?: BorderImageOutsetStyleType;
    borderImageRepeat?: BorderImageRepeatStyleType;
    borderImageSlice?: DefaultStyleType;
    borderImageSource?: DefaultStyleType;
    borderImageWidth?: NumberBox;
    borderInlineEnd?: BorderStyleType;
    borderInlineEndColor?: CssColor;
    borderInlineEndStyle?: BorderStyleKeyword;
    borderInlineEndWidth?: BorderSideLengthStyleType;
    borderInlineStart?: BorderStyleType;
    borderInlineStartColor?: CssColor;
    borderInlineStartStyle?: BorderStyleKeyword;
    borderInlineStartWidth?: BorderSideLengthStyleType;
    borderLeft?: BorderStyleType;
    borderLeftColor?: CssColor;
    borderLeftStyle?: BorderStyleKeyword;
    borderLeftWidth?: BorderSideLengthStyleType;
    borderRadius?: BorderRadiusStyleType;
    bufferedRendering?: DefaultStyleType;
    borderRight?: BorderStyleType;
    borderRightColor?: CssColor;
    borderRightStyle?: BorderStyleKeyword;
    borderRightWidth?: BorderSideLengthStyleType;
    borderSpacing?: BorderSpacingStyleType;
    borderStyle?: BorderStyleStyleType;
    borderTop?: BorderStyleType;
    borderTopColor?: CssColor;
    borderTopLeftRadius?: SingleCornerRadius_StyleType;
    borderTopRightRadius?: SingleCornerRadius_StyleType;
    borderTopStyle?: BorderStyleKeyword;
    borderTopWidth?: BorderSideLengthStyleType;
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
    clipPath?: DefaultStyleType;
    clipRule?: DefaultStyleType;
    color?: CssColor;
    colorInterpolation?: DefaultStyleType;
    colorInterpolationFilters?: ColorInterpolationFiltersStyleType;
    columnCount?: ColumnCountStyleType;
    columnFill?: ColumnFillStyleType;
    columnGap?: "normal" | SingleGapStyleType;
    columnRule?: ColumnRuleStyleType;
    columnRuleColor?: CssColor;
    columnRuleStyle?: BorderStyleKeyword;
    columnRuleWidth?: BorderSideLengthStyleType;
    columnSpan?: ColumnSpanStyleType;
    columnWidth?: CssNumber;
    columns?: ColumnsStyleType;
    contain?: DefaultStyleType;
    content?: DefaultStyleType;
    counterIncrement?: DefaultStyleType;
    counterReset?: DefaultStyleType;
    cursor?: CursorStyleType;

    direction?: DirectionStyleType;
    display?: DisplayStyleType;
    dominantBaseline?: DominantBaselineStyleType;

    emptyCells?: EmptyCellsStyleType;

    fill?: DefaultStyleType;
    fillOpacity?: DefaultStyleType;
    fillRule?: FillRuleStyleType;
    filter?: DefaultStyleType;
    flex?: FlexStyleType;
    flexBasis?: FlexBasisStyleType;
    flexDirection?: FlexDirectionStyleType;
    flexFlow?: FlexFlowStyleType;
    flexGrow?: CssNumber;
    flexShrink?: CssNumber;
    flexWrap?: FlexWrapStyleType;
    float?: FloatStyleType;
    floodColor?: CssColor;
    floodOpacity?: DefaultStyleType;
    font?: DefaultStyleType;
    fontDisplay?: DefaultStyleType;
    fontFamily?: DefaultStyleType;
    fontFeatureSettings?: DefaultStyleType;
    fontKerning?: FontKerningStyleType;
    fontOpticalSizing?: DefaultStyleType;
    fontSize?: CssNumber;
    fontSizeAdjust?: DefaultStyleType;
    fontStretch?: DefaultStyleType;
    fontStyle?: FontStyleStyleType;
    fontSynthesis?: DefaultStyleType;
    fontVariant?: DefaultStyleType;
    fontVariantCaps?: DefaultStyleType;
    fontVariantEastAsian?: DefaultStyleType;
    fontVariantLigatures?: DefaultStyleType;
    fontVariantNumeric?: DefaultStyleType;
    fontVariantPosition?: DefaultStyleType;
    fontVariationSettings?: DefaultStyleType;
    fontWeight?: FontWeightStyleType;

    gap?: GapStyleType;
    grid?: DefaultStyleType;
    gridArea?: DefaultStyleType;
    gridAutoColumns?: DefaultStyleType;
    gridAutoFlow?: DefaultStyleType;
    gridAutoRows?: DefaultStyleType;
    gridColumn?: DefaultStyleType;
    gridColumnEnd?: DefaultStyleType;
    gridColumnGap?: SingleGapStyleType;
    gridColumnStart?: DefaultStyleType;
    gridGap?: DefaultStyleType;
    gridRow?: DefaultStyleType;
    gridRowEnd?: DefaultStyleType;
    gridRowGap?: SingleGapStyleType;
    gridRowStart?: DefaultStyleType;
    gridTemplate?: DefaultStyleType;
    gridTemplateAreas?: DefaultStyleType;
    gridTemplateColumns?: DefaultStyleType;
    gridTemplateRows?: DefaultStyleType;

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
    lightingColor?: CssColor;
    lineBreak?: LineBreakStyleType;
    lineHeight?: LineHeightStyleType;
    listStyle?: ListStyleStyleType;
    listStyleImage?: DefaultStyleType;
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
    marker?: DefaultStyleType;
    markerEnd?: DefaultStyleType;
    markerMid?: DefaultStyleType;
    markerStart?: DefaultStyleType;
    mask?: DefaultStyleType;
    maskComposite?: DefaultStyleType;
    maskImage?: DefaultStyleType;
    maskPosition?: DefaultStyleType;
    maskRepeat?: DefaultStyleType;
    maskSize?: DefaultStyleType;
    maskType?: DefaultStyleType;
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

    msContentZoomChaining?: DefaultStyleType;
    msContentZoomLimit?: DefaultStyleType;
    msContentZoomLimitMax?: DefaultStyleType;
    msContentZoomLimitMin?: DefaultStyleType;
    msContentZoomSnap?: DefaultStyleType;
    msContentZoomSnapPoints?: DefaultStyleType;
    msContentZoomSnapType?: DefaultStyleType;
    msContentZooming?: DefaultStyleType;
    msFlowFrom?: DefaultStyleType;
    msFlowInto?: DefaultStyleType;
    msFontFeatureSettings?: DefaultStyleType;
    msGridColumn?: DefaultStyleType;
    msGridColumnAlign?: DefaultStyleType;
    msGridColumnSpan?: DefaultStyleType;
    msGridColumns?: DefaultStyleType;
    msGridRow?: DefaultStyleType;
    msGridRowAlign?: DefaultStyleType;
    msGridRowSpan?: DefaultStyleType;
    msGridRows?: DefaultStyleType;
    msHighContrastAdjust?: DefaultStyleType;
    msHyphenateLimitChars?: DefaultStyleType;
    msHyphenateLimitLines?: DefaultStyleType;
    msHyphenateLimitZone?: DefaultStyleType;
    msHyphens?: DefaultStyleType;
    msImeAlign?: DefaultStyleType;
    msOverflowStyle?: DefaultStyleType;
    msScrollChaining?: DefaultStyleType;
    msScrollLimit?: DefaultStyleType;
    msScrollLimitXMax?: DefaultStyleType;
    msScrollLimitXMin?: DefaultStyleType;
    msScrollLimitYMax?: DefaultStyleType;
    msScrollLimitYMin?: DefaultStyleType;
    msScrollRails?: DefaultStyleType;
    msScrollSnapPointsX?: DefaultStyleType;
    msScrollSnapPointsY?: DefaultStyleType;
    msScrollSnapType?: DefaultStyleType;
    msScrollSnapX?: DefaultStyleType;
    msScrollSnapY?: DefaultStyleType;
    msScrollTranslation?: DefaultStyleType;
    msTextCombineHorizontal?: DefaultStyleType;
    msTextSizeAdjust?: DefaultStyleType;
    msTouchAction?: DefaultStyleType;
    msTouchSelect?: DefaultStyleType;
    msUserSelect?: DefaultStyleType;
    msWrapFlow?: DefaultStyleType;
    msWrapMargin?: DefaultStyleType;
    msWrapThrough?: DefaultStyleType;

    objectFit?: ObjectFitStyleType;
    objectPosition?: CssPosition;
    offset?: DefaultStyleType;
    offsetDistance?: DefaultStyleType;
    offsetPath?: DefaultStyleType;
    offsetRotate?: DefaultStyleType;
    opacity?: CssNumber;
    order?: CssNumber;
    orientation?: DefaultStyleType;
    orphans?: CssNumber;
    outline?: BorderStyleType;
    outlineColor?: CssColor;
    outlineOffset?: CssNumber;
    outlineStyle?: BorderStyleStyleType;
    outlineWidth?: BorderSideLengthStyleType;
    overflow?: OverflowStyleType;
    overflowAnchor?: OverflowAnchorStyleType;
    overflowWrap?: OverflowWrapStyleType;
    overflowX?: SingleOverflowStyleType;
    overflowY?: SingleOverflowStyleType;
    overflowInline?: SingleOverflowStyleType;
    overflowBlock?: SingleOverflowStyleType;
    overscrollBehavior?: DefaultStyleType;
    overscrollBehaviorBlock?: DefaultStyleType;
    overscrollBehaviorInline?: DefaultStyleType;
    overscrollBehaviorX?: DefaultStyleType;
    overscrollBehaviorY?: DefaultStyleType;

    padding?: NumberBox;
    paddingBlockEnd?: CssNumber;
    paddingBlockStart?: CssNumber;
    paddingBottom?: CssNumber;
    paddingInlineEnd?: CssNumber;
    paddingInlineStart?: CssNumber;
    paddingLeft?: CssNumber;
    paddingRight?: CssNumber;
    paddingTop?: CssNumber;
    page?: DefaultStyleType;
    paintOrder?: DefaultStyleType;
    pageBreakAfter?: BreakAfterStyleType;
    pageBreakBefore?: BreakBeforeStyleType;
    pageBreakInside?: BreakInsideStyleType;
    perspective?: CssNumber;
    perspectiveOrigin?: CssPosition;
    placeContent?: PlaceContentStyleType;
    placeItems?: PlaceItemsStyleType;
    placeSelf?: PlaceSelfStyleType;
    pointerEvents?: PointerEventsStyleType;
    position?: PositionStyleType;

    quotes?: DefaultStyleType;

    resize?: ResizeStyleType;
    right?: CssNumber;
    rotate?: DefaultStyleType;
    rowGap?: SingleGapStyleType;
    rubyAlign?: DefaultStyleType;
    rubyOverhang?: DefaultStyleType;
    rubyPosition?: DefaultStyleType;

    scale?: DefaultStyleType;
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
    scrollSnapAlign?: DefaultStyleType;
    scrollSnapStop?: DefaultStyleType;
    scrollSnapType?: DefaultStyleType;
    shapeImageThreshold?: DefaultStyleType;
    shapeMargin?: DefaultStyleType;
    shapeOutside?: DefaultStyleType;
    shapeRendering?: DefaultStyleType;
    stopColor?: CssColor;
    stopOpacity?: StopOpacityStyleType;
    stroke?: DefaultStyleType;
    strokeDasharray?: DefaultStyleType;
    strokeDashoffset?: DefaultStyleType;
    strokeLinecap?: DefaultStyleType;
    strokeLinejoin?: DefaultStyleType;
    strokeMiterlimit?: DefaultStyleType;
    strokeOpacity?: DefaultStyleType;
    strokeWidth?: DefaultStyleType;

    tabSize?: CssNumber;
    tableLayout?: TableLayoutStyleType;
    textAlign?: TextAlignStyleType;
    textAlignLast?: TextAlignLastStyleType;
    textAnchor?: TextAnchorStyleType;
    textCombineUpright?: DefaultStyleType;
    textDecoration?: DefaultStyleType;
    textDecorationColor?: CssColor;
    textDecorationLine?: TextDecorationLineStyleType;
    textDecorationSkipInk?: DefaultStyleType;
    textDecorationStyle?: TextDecorationStyleStyleType;
    textDecorationThickness?: TextDecorationThicknessStyleType;
    textEmphasis?: DefaultStyleType;
    textEmphasisColor?: CssColor;
    textEmphasisPosition?: TextEmphasisPositionStyleType;
    textEmphasisStyle?: TextEmphasisStyleStyleType;
    textIndent?: TextIndentStyleType;
    textJustify?: TextJustifyStyleType;
    textKashida?: DefaultStyleType;
    textKashidaSpace?: DefaultStyleType;
    textOrientation?: TextOrientationStyleType;
    textOverflow?: TextOverflowStyleType;
    textShadow?: DefaultStyleType;
    textSizeAdjust?: DefaultStyleType;
    textTransform?: TextTransformStyleType;
    textUnderlinePosition?: TextUnderlinePositionStyleType;
    top?: CssNumber;
    touchAction?: TouchActionStyleType;
    transform?: DefaultStyleType;
    transformBox?: DefaultStyleType;
    transformOrigin?: DefaultStyleType;
    transformStyle?: DefaultStyleType;
    transition?: DefaultStyleType;
    transitionDelay?: DefaultStyleType;
    transitionDuration?: DefaultStyleType;
    transitionProperty?: DefaultStyleType;
    transitionTimingFunction?: DefaultStyleType;
    translate?: TranslateStyleType;

    unicodeBidi?: UnicodeBidiStyleType;
    userSelect?: UserSelectStyleType;
    userZoom?: DefaultStyleType;

    verticalAlign?: DefaultStyleType;
    visibility?: DefaultStyleType;
    vectorEffect?: DefaultStyleType;

    webkitBorderImage?: DefaultStyleType;
    webkitBoxDirection?: DefaultStyleType;
    webkitBoxOrient?: DefaultStyleType;
    webkitColumnBreakAfter?: DefaultStyleType;
    webkitColumnBreakBefore?: DefaultStyleType;
    webkitColumnBreakInside?: DefaultStyleType;
    webkitColumnCount?: ColumnCountStyleType;
    webkitColumnGap?: SingleGapStyleType;
    webkitColumnRule?: ColumnRuleStyleType;
    webkitColumnRuleColor?: CssColor;
    webkitColumnRuleStyle?: ColumnRuleStyleType;
    webkitColumnRuleWidth?: BorderLengthStyleType;
    webkitColumnSpan?: DefaultStyleType;
    webkitColumnWidth?: DefaultStyleType;
    webkitColumns?: DefaultStyleType;
    webkitLineClamp?: DefaultStyleType;
    webkitTapHighlightColor?: DefaultStyleType;
    webkitUserModify?: DefaultStyleType;
    webkitUserSelect?: DefaultStyleType;
    webkitWritingMode?: DefaultStyleType;

    whiteSpace?: WhiteSpaceStyleType;
    widows?: WidowsStyleType;
    width?: CssNumber;
    willChange?: DefaultStyleType;
    wordBreak?: WordBreakStyleType;
    wordSpacing?: WordSpacingStyleType;
    wordWrap?: DefaultStyleType;
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Supports query types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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



