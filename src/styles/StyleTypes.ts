import * as UtilTypes from "./UtilTypes"
import * as ColorTypes from "./ColorTypes"



/** Type for align-content style property */
export type AlignContentStyleType = UtilTypes.ExtendedPropType<"normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
    "space-between" | "space-around" | "space-evenly">;



/** Type for align-items style property */
export type AlignItemsStyleType = UtilTypes.ExtendedPropType<"normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center">;



/** Type for align-self style property */
export type AlignSelfStyleType = UtilTypes.ExtendedPropType<"auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
    "safe center" | "unsafe center">;



/** Type for alignment-baseline style property */
export type AlignmentBaselineStyleType = UtilTypes.ExtendedPropType<"auto" | "baseline" | "before-edge" | "text-before-edge" |
    "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
    "hanging" | "mathematical" | "top" | "center" | "bottom">;



/** Type for single animation */
export type SingleAnimation = UtilTypes.Base_StyleType |
    {
        delay?: UtilTypes.Number_StyleType;
        function?: SingleAnimationTimingFunction;
        duration?: UtilTypes.Number_StyleType;
        count?: SingleAnimationIterationCount;
        direction?: SingleAnimationDirection;
        state?: SingleAnimationPlayState;
        mode?: SingleAnimationFillMode;
        name?: SingleAnimationName;
    };

/** Type for animation style property */
export type AnimationStyleType = SingleAnimation | SingleAnimation[];



/** Type for single animation direction */
export type SingleAnimationDirection = UtilTypes.ExtendedPropType<"normal" | "reverse" | "alternate" | "alternate-reverse">;

/** Type for animation-direction style property */
export type AnimationDirectionStyleType = SingleAnimationDirection | SingleAnimationDirection[];



/** Type for single animation fill mode */
export type SingleAnimationFillMode = UtilTypes.ExtendedPropType<"none" | "forwards" | "backwards" | "both">;

/** Type for animation-fill-mode style property */
export type AnimationFillModeStyleType = SingleAnimationDirection | SingleAnimationDirection[];



/** Type for single animation iteration count */
export type SingleAnimationIterationCount = UtilTypes.ExtendedPropType<"infinite"> | UtilTypes.Number_StyleType;

/** Type for animation-iteration-count style property */
export type AnimationIterationCountStyleType = SingleAnimationIterationCount | SingleAnimationIterationCount[];



/** Type for single animation name */
export type SingleAnimationName = UtilTypes.ExtendedPropType<"none" | string>;

/** Type for animation-name style property */
export type AnimationNameStyleType = SingleAnimationName | SingleAnimationName[];



/** Type for single animation play state */
export type SingleAnimationPlayState = UtilTypes.ExtendedPropType<"paused" | "running">;

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
export type SingleAnimationTimingFunction = UtilTypes.ExtendedPropType<AnimationTimingFunction_Simple | AnimationTimingFunction_Step | AnimationTimingFunction_Bezier>;

/** Type for animation-timing-function style property */
export type AnimationTimingFunctionStyleType = SingleAnimationTimingFunction | SingleAnimationTimingFunction[];



/** Type for backface-visibility style property */
export type BackfaceVisibilityModeStyleType = UtilTypes.ExtendedPropType<"visible" | "hidden">;



/** Type for single background attachment */
export type SingleBackgroundAttachment = UtilTypes.ExtendedPropType<"scroll" | "fixed" | "local">;

/** Type for background-attachment style property */
export type BackgroundAttachmentStyleType = SingleBackgroundAttachment | SingleBackgroundAttachment[];



/** Type for single background clip */
export type SingleBackgroundClip = UtilTypes.ExtendedPropType<"border-box" | "padding-box" | "content-box" | "text">;

/** Type for background-clip style property */
export type BackgroundClipStyleType = SingleBackgroundClip | SingleBackgroundClip[];



/** Type for single background origin */
export type SingleBackgroundOrigin = UtilTypes.ExtendedPropType<"border-box" | "padding-box" | "content-box" | "text">;

/** Type for background-origin style property */
export type BackgroundOriginStyleType = SingleBackgroundOrigin | SingleBackgroundOrigin[];



/** Type for single background repeat */
export type SingleBackgroundRepeat = UtilTypes.ExtendedPropType<"repeat-x" | "repeat-y" | "repeat" | "space" | "round" | "no-repeat" |
    "repeat repeat" | "repeat space" | "repeat round" | "repeat no-repeat" |
    "space repeat" | "space space" | "space round" | "space no-repeat" |
    "round repeat" | "round space" | "round round" | "round no-repeat" |
    "no-repeat repeat" | "no-repeat space" | "no-repeat round" | "no-repeat no-repeat">;

/** Type for background-repeat style property */
export type BackgroundRepeatStyleType = SingleBackgroundRepeat | SingleBackgroundRepeat[];



/** Type for background size */
export type SingleBackgroundSize = UtilTypes.ExtendedPropType<"cover" | "contain"> | UtilTypes.Size_StyleType;

/** Type for background-size style property */
export type BackgroundSizeStyleType = SingleBackgroundSize | SingleBackgroundSize[];



/** Type for a single corner radius */
export type SingleCornerRadius_StyleType = UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType];



/** Helper type that defines an array of one to 4 elements each defining a length/percentage */
export type MultiCornerRadius_StyleType =
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType?, UtilTypes.Number_StyleType?, UtilTypes.Number_StyleType?
    ];

/** Type for border-radius style property */
export type BorderRadiusStyleType = UtilTypes.Number_StyleType | MultiCornerRadius_StyleType |
    [MultiCornerRadius_StyleType, MultiCornerRadius_StyleType];



/** Type for baseline-shift style property */
export type BaselineShiftStyleType = UtilTypes.ExtendedPropType<"sub" | "super"> | UtilTypes.Number_StyleType;



/** Type for single border side style property */
export type BorderSideStyle_StyleType = UtilTypes.ExtendedPropType<"none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
    "groove" | "ridge" | "inset" | "outset">;



/** Type for border-style style property */
export type BorderStyleStyleType = BorderSideStyle_StyleType |
    [BorderSideStyle_StyleType, BorderSideStyle_StyleType, BorderSideStyle_StyleType?, BorderSideStyle_StyleType?];



/** Type for border side width style property */
export type BorderSideWidth_StyleType = UtilTypes.ExtendedPropType<"thin" | "medium" | "thick"> | UtilTypes.Number_StyleType;



/** Type for border-width style property */
export type BorderWidthStyleType = BorderSideWidth_StyleType |
    [BorderSideWidth_StyleType, BorderSideWidth_StyleType, BorderSideWidth_StyleType?, BorderSideWidth_StyleType?];



/** Type for border-collapse style property */
export type BorderColapseStyleType = UtilTypes.ExtendedPropType<"collapse" | "separate">;



/** Type for border-spacing style property */
export type BorderSpacingStyleType = UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType];



/** Type for border-color style property */
export type BorderColorStyleType = ColorTypes.Color_StyleType |
    [ColorTypes.Color_StyleType, ColorTypes.Color_StyleType, ColorTypes.Color_StyleType?, ColorTypes.Color_StyleType?];



/** Type for border side style property */
export type BorderSide_StyleType = UtilTypes.Number_StyleType |  BorderSideStyle_StyleType | ColorTypes.Color_StyleType |
    [UtilTypes.Number_StyleType?, BorderSideStyle_StyleType?, ColorTypes.Color_StyleType?];



/** Type for border-image-outset style property */
export type BorderImageOutsetStyleType = UtilTypes.ExtendedPropType<string | number> |
    [string | number, string | number, (string | number)?, (string | number)?];



/** Type for border-image-repeat keywords */
export type BorderImageRepeatKeyword = UtilTypes.ExtendedPropType<"stretch" | "repeat" | "round" | "space">;

/** Type for border-image-repeat style property */
export type BorderImageRepeatStyleType = BorderImageRepeatKeyword | [BorderImageRepeatKeyword, BorderImageRepeatKeyword];



/** Type for border-image-width style property */
export type BorderImageWidthStyleType = UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType?, UtilTypes.Number_StyleType?];



/** Type for single box shadow. */
export type SingleBoxShadow = UtilTypes.ExtendedPropType<"none" | string>;

/** Type for box shadow style property */
export type BoxShadowStyleType = SingleBoxShadow | SingleBoxShadow[];



/** Type for box-sizing style property */
export type BoxSizingStyleType = UtilTypes.ExtendedPropType<"content-box" | "border-box">;



/** Type for break-after style property */
export type BreakAfterStyleType = UtilTypes.ExtendedPropType<"auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region">;



/** Type for break-before style property */
export type BreakBeforeStyleType = UtilTypes.ExtendedPropType<"auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region">;



/** Type for break-inside style property */
export type BreakInsideStyleType = UtilTypes.ExtendedPropType<"auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region">;



/** Type for caption-side style property */
export type CaptionSideStyleType = UtilTypes.ExtendedPropType<"top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end">;



/** Type for caret-color style property */
export type CaretColorStyleType = UtilTypes.ExtendedPropType<"auto"> | ColorTypes.Color_StyleType;



/** Type for clear style property */
export type ClearStyleType = UtilTypes.ExtendedPropType<"none" | "left" | "right" | "both" | "inline-start" | "inline-end">;



/** Type for clear style property */
export type ClipStyleType = UtilTypes.ExtendedPropType<"auto"> |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType];



/** Type for color-interpolation-filters style property */
export type ColorInterpolationFiltersStyleType = UtilTypes.ExtendedPropType<"auto" | "sRGB" | "linearRGB">;



/** Type for column-count style property */
export type ColumnCountStyleType = UtilTypes.ExtendedPropType<"auto" | number>;



/** Type for column-fill style property */
export type ColumnFillStyleType = UtilTypes.ExtendedPropType<"auto" | "balance" | "balance-all">;



/**
 * Type for column rule. Column rule can be presented by the following types:
 *   - string - literal CSS box shadow string.
 *   - object - fields specify column rule parts.
 */
export type ColumnRuleStyleType = UtilTypes.ExtendedPropType<string> |
    {
        /** Column rule width. */
        width?: BorderWidthStyleType;
        /** Column rule style. */
        style?: BorderStyleStyleType;
        /** Column rule color. */
        color?: ColorTypes.Color_StyleType;
    };



/** Type for column-span style property */
export type ColumnSpanStyleType = UtilTypes.ExtendedPropType<"none" | "all">;



/** Type for columns style property */
export type ColumnsStyleType = UtilTypes.ExtendedPropType<"auto" | number | ["auto" | number, UtilTypes.Number_StyleType]>;



/** Type for float (cssFloat) style property */
export type FloatStyleType = UtilTypes.ExtendedPropType<"left" | "right" | "none" | "inline-start" | "inline-end">;



/** Type for cursor style property */
export type CursorStyleType = UtilTypes.ExtendedPropType<"auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" |
    "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" |
    "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" |
    "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" |
    "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" |
    "zoom-out" | "grab" | "grabbing">;



/** Type for direction style property */
export type DirectionStyleType = UtilTypes.ExtendedPropType<"ltr" | "rtl">;



/** Type for display style property */
export type DisplayStyleType = UtilTypes.ExtendedPropType<"block" | "inline" | "run-in" | "contents" | "none" |
    "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" |
    "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" |
    "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" |
        "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" |
        "ruby-base-container" | "ruby-text-container" |
    "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" |
        "list-item block flow" | "list-item block flow-root" | "flow list-item block">;

                

/** Type for dominant-baseline style property */
export type DominantBaselineStyleType = UtilTypes.ExtendedPropType<"auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
    "central" | "mathematical" | "hanging" | "text-top">;



/** Type for empty-cells style property */
export type EmptyCellsStyleType = UtilTypes.ExtendedPropType<"show" | "hide">;



/** Type for fill-rule style property */
export type FillRuleStyleType = UtilTypes.ExtendedPropType<"nonzero" | "evenodd">;



/** Type for flex-basis style property */
export type FlexBasisStyleType = UtilTypes.ExtendedPropType<"auto" | "content"> | UtilTypes.Number_StyleType;



/** Type for flex style property */
export type FlexStyleType = FlexBasisStyleType | [number,number] | [number,number,FlexBasisStyleType];



/** Type for flex-direction style property */
export type FlexDirectionStyleType = UtilTypes.ExtendedPropType<"row" | "row-reverse" | "column" | "column-reverse">;



/** Type for flex-wrap style property */
export type FlexWrapStyleType = UtilTypes.ExtendedPropType<"nowrap" | "wrap" | "wrap-reverse">;



/** Type for flex-flow style property */
export type FlexFlowStyleType = FlexDirectionStyleType | FlexWrapStyleType |
    [FlexDirectionStyleType, FlexWrapStyleType];



/** Type for font-style style property */
export type FontStyleStyleType = UtilTypes.ExtendedPropType<"normal" | "italic" | "oblique"> | UtilTypes.Number_StyleType;



/** Type for font-kerning style property */
export type FontKerningStyleType = UtilTypes.ExtendedPropType<"auto" | "normal" | "none">;



/** Type for font-weight style property */
export type FontWeightStyleType = UtilTypes.ExtendedPropType<"normal" | "bold" | "bolder" | "lighter" |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900>;



/** Type for a row-gap or column-gap style property */
export type SingleGapStyleType = UtilTypes.ExtendedPropType<"normal"> | UtilTypes.Number_StyleType;

/** Type for a row-gap or column-gap style property */
export type GapStyleType = SingleGapStyleType | [SingleGapStyleType, SingleGapStyleType];



/** Type for hyphens style property */
export type HyphensStyleType = UtilTypes.ExtendedPropType<"none" | "manual" | "auto">;



/** Type for image-rendering style property */
export type ImageRenderingStyleType = UtilTypes.ExtendedPropType<"auto" | "crisp-edges" | "pixelated">;



/** Type for justify-content style property */
export type JustifyContentStyleType = UtilTypes.ExtendedPropType<"normal" | "space-between" | "space-around" | "space-evenly" | "stretch" |
    "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right">;



/** Type for justify-items style property */
export type JustifyItemsStyleType = UtilTypes.ExtendedPropType<"normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right" |
    "legacy" | "legacy left" | "legacy right" | "legacy center">;



/** Type for justify-self style property */
export type JustifySelfStyleType = UtilTypes.ExtendedPropType<"auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right">;



/** Type for letter-spacing style property */
export type LetterSpacingStyleType = UtilTypes.ExtendedPropType<"normal"> | UtilTypes.Number_StyleType;



/** Type for line-break style property */
export type LineBreakStyleType = UtilTypes.ExtendedPropType<"auto" | "loose" | "normal" | "strict" | "anywhere">;



/** Type for line-height style property */
export type LineHeightStyleType = UtilTypes.ExtendedPropType<number | string>;



/** Type for list-style-type style property */
export type ListStyleTypeStyleType = UtilTypes.ExtendedPropType<"disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" |
    "cjk-decimal" | "cjk-earthly-branch" | "cjk-heavenly-stem" | "cjk-ideographic" |
    "lower-roman" | "upper-roman" | "lower-greek" | "lower-alpha" | "lower-latin" | "upper-alpha" | "upper-latin" |
    "arabic-indic" | "armenian" | "bengali" | "cambodian" | "devanagari" | "georgian" | "gujarati" | "gurmukhi" | "hebrew" |
    "hiragana" | "hiragana-iroha" | "japanese-formal" | "japanese-informal" | "kannada" | "katakana" | "katakana-iroha" |
    "khmer" | "korean-hangul-formal" | "korean-hanja-formal" | "korean-hanja-informal" | "lao" | "lower-armenian" |
    "malayalam" | "mongolian" | "myanmar" | "oriya" | "persian" | "simp-chinese-formal" | "simp-chinese-informal" |
    "tamil" | "telugu" | "thai" | "tibetan" | "trad-chinese-formal" | "trad-chinese-informal" | "upper-armenian" |
    "disclosure-open" | "disclosure-closed">;

/** Type for list-style-position style property */
export type ListStylePositionStyleType = UtilTypes.ExtendedPropType<"inside" | "outside">;

/** Type for list-style-position style property */
export type ListStyleStyleType = ListStyleTypeStyleType | ListStylePositionStyleType |
    [ListStyleTypeStyleType, ListStylePositionStyleType, string?];



/** Type for the margin style property */
export type MarginStyleType = UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType?, UtilTypes.Number_StyleType?];



/** Type for the object-fit style property */
export type ObjectFitStyleType = UtilTypes.ExtendedPropType<"fill" | "contain" | "cover" | "none" | "scale-down">;



/** Type for the overflow-anchor style property */
export type OverflowAnchorStyleType = UtilTypes.ExtendedPropType<"auto" | "none">;

/** Type for the overflow-wrap style property */
export type OverflowWrapStyleType = UtilTypes.ExtendedPropType<"normal" | "break-word" | "anywhere">;

/** Type for the overflow-x/y style property */
export type SingleOverflowStyleType = UtilTypes.ExtendedPropType<"visible" | "hidden" | "clip" | "scroll" | "auto">;

/** Type for the overflow- style property */
export type OverflowStyleType = SingleOverflowStyleType | [SingleOverflowStyleType, SingleOverflowStyleType];



/** Type for the padding style property */
export type PaddingStyleType = UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType?, UtilTypes.Number_StyleType?];



/** Type for the place-content style property */
export type PlaceContentStyleType = AlignContentStyleType | [AlignContentStyleType, JustifyContentStyleType];

/** Type for the place-items style property */
export type PlaceItemsStyleType = AlignItemsStyleType | [AlignItemsStyleType, JustifyItemsStyleType];

/** Type for the place-self style property */
export type PlaceSelfStyleType = AlignSelfStyleType | [AlignSelfStyleType, JustifySelfStyleType];



/** Type for the pointer-events style property */
export type PointerEventsStyleType = UtilTypes.ExtendedPropType<"auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" |
    "painted" | "fill" | "stroke" | "all">;



/** Type for the position style property */
export type PositionStyleType = UtilTypes.ExtendedPropType<"static" | "relative" | "absolute" | "sticky" | "fixed">;



/** Type for the resize style property */
export type ResizeStyleType = UtilTypes.ExtendedPropType<"none" | "both" | "horizontal" | "vertical" | "block" | "inline">;



/** Type for the scroll-behavior style property */
export type ScrollBehaviorStyleType = UtilTypes.ExtendedPropType<"auto" | "smooth">;



/** Type for the stop-opacity style property */
export type StopOpacityStyleType = UtilTypes.ExtendedPropType<number>;



/** Type for the table-layout style property */
export type TableLayoutStyleType = UtilTypes.ExtendedPropType<"auto" | "fixed">;



/** Type for the text-align style property */
export type TextAlignStyleType = UtilTypes.ExtendedPropType<"start" | "end" | "left" | "right" | "center" | "justify" | "match-parent">;



/** Type for the text-align-last style property */
export type TextAlignLastStyleType = UtilTypes.ExtendedPropType<"auto" | "start" | "end" | "left" | "right" | "center" | "justify">;



/** Type for the text-anchor style property */
export type TextAnchorStyleType = UtilTypes.ExtendedPropType<"start" | "middle" | "end">;



/** Type for the text-decoration-line style property */
export type TextDecorationLineStyleType = UtilTypes.ExtendedPropType<"none" | "underline" | "overline" | "line-through" | "blink" |
    "spelling-error" | "grammar-error">;

/** Type for the text-decoration-style style property */
export type TextDecorationStyleStyleType = UtilTypes.ExtendedPropType<"solid" | "double" | "dotted" | "dashed" | "wavy">;

/** Type for the text-decoration-thickness style property */
export type TextDecorationThicknessStyleType = UtilTypes.ExtendedPropType<"auto" | "from-font"> | UtilTypes.Number_StyleType;

// /** Type for the text-decoration-line style property */
// export type TextDecorationStyleType = TextDecorationLineStyleType | TextDecorationStyleStyleType |
//     ColorTypes.Color_StyleType | TextDecorationThicknessStyleType |
//     [TextDecorationLineStyleType, TextDecorationStyleStyleType?, ColorTypes.Color_StyleType?, TextDecorationThicknessStyleType?];



/** Type for the text-emphasis-position style property */
export type TextEmphasisPositionStyleType = ["over" | "under", "left" | "right"] | UtilTypes.Number_StyleType;

/** Type for the text-emphasis-style style property */
export type TextEmphasisShape = "dot" | "circle" | "double-circle" | "triangle" | "sesame";

/** Type for the text-emphasis-style style property */
export type TextEmphasisStyleStyleType = UtilTypes.ExtendedPropType<"none" | number | TextEmphasisShape | ["filled" | "open", TextEmphasisShape]>;

// /** Type for the text-emphasis style property */
// export type TextEmphasisStyleType = TextEmphasisStyleStyleType | ColorTypes.Color_StyleType | [TextEmphasisStyleStyleType, ColorTypes.Color_StyleType];



/** Type for the text-indent style property */
export type TextIndentStyleType = UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, "each-line", "hanging"?] | [UtilTypes.Number_StyleType, "hanging", "each-line"?];



/** Type for the text-justify style property */
export type TextJustifyStyleType = UtilTypes.ExtendedPropType<"auto" | "inter-character" | "inter-word" | "none"> | UtilTypes.Number_StyleType;



/** Type for the text-orientation style property */
export type TextOrientationStyleType = UtilTypes.ExtendedPropType<"mixed" | "upright" | "sideways">;



/** Type for the text-overflow style property */
export type SingleTextOverflowStyleType = UtilTypes.ExtendedPropType<"clip" | "ellipsis" | "fade"> | UtilTypes.Number_StyleType;

/** Type for the text-overflow style property */
export type TextOverflowStyleType = SingleTextOverflowStyleType | [SingleTextOverflowStyleType, SingleTextOverflowStyleType];



// /** Type for the text-shadow style property */
// export type TextShadowStyleType = string> |
//     [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType] |
//     [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType] |
//     [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, ColorTypes.Color_StyleType] |
//     [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, ColorTypes.Color_StyleType];



// /** Type for the text-transform style property */
export type TextTransformStyleType = UtilTypes.ExtendedPropType<"none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana">;



// /** Type for the text-underlinePosition style property */
export type TextUnderlinePositionStyleType = UtilTypes.ExtendedPropType<"auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below">;



/** Type for the touch-action style property */
export type TouchActionStyleType = UtilTypes.ExtendedPropType<"auto" | "none" | "manipulation" |
    "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" | "pan-down" | "pinch-zoom" |
    "pan-x pinch-zoom" | "pan-left pinch-zoom" | "pan-right pinch-zoom" | "pan-y pinch-zoom" | "pan-up pinch-zoom" | "pan-down pinch-zoom" |
    "pan-x pan-y" | "pan-x pan-y pinch-zoom" | "pan-x pan-up" | "pan-x pan-up pinch-zoom" | "pan-x pan-down" | "pan-x pan-down pinch-zoom" |
    "pan-y pan-left" | "pan-y pan-left pinch-zoom" | "pan-y pan-right" | "pan-y pan-right pinch-zoom" |
    "pan-left pan-up" | "pan-left pan-up pinch-zoom" | "pan-left pan-down" | "pan-left pan-down pinch-zoom" |
    "pan-right pan-up" | "pan-right pan-up pinch-zoom" | "pan-right pan-down" | "pan-right pan-down pinch-zoom" |
    "pan-up pan-left" | "pan-up pan-left pinch-zoom" | "pan-up pan-right" | "pan-up pan-right pinch-zoom" |
    "pan-down pan-left" | "pan-down pan-left pinch-zoom" | "pan-down pan-right" | "pan-down pan-right pinch-zoom">;



/** Type for the translate style property */
export type TranslateStyleType = "none" | UtilTypes.Number_StyleType |
    [UtilTypes.Number_StyleType, UtilTypes.Number_StyleType, UtilTypes.Number_StyleType?];



/** Type for the unicode-bidi style property */
export type UnicodeBidiStyleType = UtilTypes.ExtendedPropType<"normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext">;



/** Type for the user-select style property */
export type UserSelectStyleType = UtilTypes.ExtendedPropType<"auto" | "text" | "none" | "contain" | "all">;



/** Type for the white-space style property */
export type WhiteSpaceStyleType = UtilTypes.ExtendedPropType<"normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces">;



/** Type for widows style property */
export type WidowsStyleType = UtilTypes.ExtendedPropType<number>;



/** Type for the word-break style property */
export type WordBreakStyleType = UtilTypes.ExtendedPropType<"normal" | "break-all" | "keep-all" | "break-word">;



/** Type for the word-spacing style property */
export type WordSpacingStyleType = UtilTypes.ExtendedPropType<"normal"> | UtilTypes.Number_StyleType;



/** Type for the writing-mode style property */
export type WritingModeStyleType = UtilTypes.ExtendedPropType<"horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr">;



/** Type for the z-index style property */
export type ZIndexStyleType = UtilTypes.ExtendedPropType<"auto" | number>;



/** Type for the zoom style property */
export type ZoomStyleType = UtilTypes.ExtendedPropType<"normal" | "reset"> | UtilTypes.Number_StyleType;



export type StyleType = UtilTypes.ExtendedPropType<string>;



/**
 * Interface representing a collection of style properties and their values.
 */
export interface IStyleset
{
    alignContent?: AlignContentStyleType;
    alignItems?: AlignItemsStyleType;
    alignSelf?: AlignSelfStyleType;
    alignmentBaseline?: AlignmentBaselineStyleType;
    animation?: AnimationStyleType;
    animationDelay?: UtilTypes.MultiNumber_StyleType;
    animationDirection?: AnimationDirectionStyleType;
    animationDuration?: UtilTypes.MultiNumber_StyleType;
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
    backgroundPositionX?: StyleType;
    backgroundPositionY?: StyleType;
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
    borderImage?: StyleType;
    borderImageOutset?: BorderImageOutsetStyleType;
    borderImageRepeat?: BorderImageRepeatStyleType;
    borderImageSlice?: StyleType;
    borderImageSource?: StyleType;
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
    bottom?: UtilTypes.Number_StyleType;
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
    color?: ColorTypes.Color_StyleType;
    colorInterpolationFilters?: ColorInterpolationFiltersStyleType;
    columnCount?: ColumnCountStyleType;
    columnFill?: ColumnFillStyleType;
    columnGap?: "normal" | SingleGapStyleType;
    columnRule?: ColumnRuleStyleType;
    columnRuleColor?: ColorTypes.Color_StyleType;
    columnRuleStyle?: BorderSideStyle_StyleType;
    columnRuleWidth?: BorderSideWidth_StyleType;
    columnSpan?: ColumnSpanStyleType;
    columnWidth?: UtilTypes.Number_StyleType;
    columns?: ColumnsStyleType;
    content?: StyleType;
    counterIncrement?: StyleType;
    counterReset?: StyleType;
    // cssFloat?: FloatStyleType;
    // cssText?: StyleType;
	cursor?: CursorStyleType;
	
    direction?: DirectionStyleType;
    display?: DisplayStyleType;
    dominantBaseline?: DominantBaselineStyleType;

    emptyCells?: EmptyCellsStyleType;
	enableBackground?: StyleType;
	
    fill?: StyleType;
    fillOpacity?: StyleType;
    fillRule?: FillRuleStyleType;
    filter?: StyleType;
    flex?: FlexStyleType;
    flexBasis?: FlexBasisStyleType;
    flexDirection?: FlexDirectionStyleType;
    flexFlow?: FlexFlowStyleType;
    flexGrow?: UtilTypes.Number_StyleType;
    flexShrink?: UtilTypes.Number_StyleType;
    flexWrap?: FlexWrapStyleType;
    float?: FloatStyleType;
    floodColor?: ColorTypes.Color_StyleType;
    floodOpacity?: StyleType;
    font?: StyleType;
    fontFamily?: StyleType;
    fontFeatureSettings?: StyleType;
    fontKerning?: FontKerningStyleType;
    fontSize?: UtilTypes.Number_StyleType;
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
	fontWeight?: FontWeightStyleType;
	
    gap?: GapStyleType;
    glyphOrientationHorizontal?: StyleType;
    glyphOrientationVertical?: StyleType;
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
	
    height?: UtilTypes.Number_StyleType;
	hyphens?: HyphensStyleType;
	
    imageOrientation?: StyleType;
    imageRendering?: ImageRenderingStyleType;
	imeMode?: StyleType;
	
    justifyContent?: JustifyContentStyleType;
    justifyItems?: JustifyItemsStyleType;
	justifySelf?: JustifySelfStyleType;
	
	kerning?: FontKerningStyleType;
	
    layoutGrid?: StyleType;
    layoutGridChar?: StyleType;
    layoutGridLine?: StyleType;
    layoutGridMode?: StyleType;
    layoutGridType?: StyleType;
    left?: UtilTypes.Number_StyleType;
    letterSpacing?: LetterSpacingStyleType;
    lightingColor?: ColorTypes.Color_StyleType;
    lineBreak?: LineBreakStyleType;
    lineHeight?: LineHeightStyleType;
    listStyle?: ListStyleStyleType;
    listStyleImage?: StyleType;
    listStylePosition?: ListStylePositionStyleType;
	listStyleType?: ListStyleTypeStyleType;
	
    margin?: MarginStyleType;
    marginBottom?: UtilTypes.Number_StyleType;
    marginLeft?: UtilTypes.Number_StyleType;
    marginRight?: UtilTypes.Number_StyleType;
    marginTop?: UtilTypes.Number_StyleType;
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
    maxHeight?: UtilTypes.Number_StyleType;
    maxWidth?: UtilTypes.Number_StyleType;
    minHeight?: UtilTypes.Number_StyleType;
	minWidth?: UtilTypes.Number_StyleType;
	
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
    objectPosition?: UtilTypes.Position_StyleType;
    opacity?: UtilTypes.Number_StyleType;
    order?: UtilTypes.Number_StyleType;
    orphans?: UtilTypes.Number_StyleType;
    outline?: BorderSide_StyleType;
    outlineColor?: ColorTypes.Color_StyleType;
    outlineOffset?: UtilTypes.Number_StyleType;
    outlineStyle?: BorderStyleStyleType;
    outlineWidth?: BorderSideWidth_StyleType;
    overflow?: OverflowStyleType;
    overflowAnchor?: OverflowAnchorStyleType;
    overflowWrap?: OverflowWrapStyleType;
    overflowX?: SingleOverflowStyleType;
	overflowY?: SingleOverflowStyleType;
	overflowInline?: SingleOverflowStyleType;
    overflowBlock?: SingleOverflowStyleType;
	
    padding?: PaddingStyleType;
    paddingBottom?: UtilTypes.Number_StyleType;
    paddingLeft?: UtilTypes.Number_StyleType;
    paddingRight?: UtilTypes.Number_StyleType;
    paddingTop?: UtilTypes.Number_StyleType;
    pageBreakAfter?: BreakAfterStyleType;
    pageBreakBefore?: BreakBeforeStyleType;
    pageBreakInside?: BreakInsideStyleType;
    penAction?: StyleType;
    perspective?: UtilTypes.Number_StyleType;
    perspectiveOrigin?: UtilTypes.Position_StyleType;
    placeContent?: PlaceContentStyleType;
    placeItems?: PlaceItemsStyleType;
    placeSelf?: PlaceSelfStyleType;
    pointerEvents?: PointerEventsStyleType;
	position?: PositionStyleType;
	
	quotes?: StyleType;
	
    resize?: ResizeStyleType;
    right?: UtilTypes.Number_StyleType;
    rotate?: StyleType;
    rowGap?: SingleGapStyleType;
    rubyAlign?: StyleType;
    rubyOverhang?: StyleType;
	rubyPosition?: StyleType;
	
    scale?: StyleType;
    scrollBehavior?: ScrollBehaviorStyleType;
    stopColor?: ColorTypes.Color_StyleType;
    stopOpacity?: StopOpacityStyleType;
    stroke?: StyleType;
    strokeDasharray?: StyleType;
    strokeDashoffset?: StyleType;
    strokeLinecap?: StyleType;
    strokeLinejoin?: StyleType;
    strokeMiterlimit?: StyleType;
    strokeOpacity?: StyleType;
	strokeWidth?: StyleType;
	
    tabSize?: UtilTypes.Number_StyleType;
    tableLayout?: TableLayoutStyleType;
    textAlign?: TextAlignStyleType;
    textAlignLast?: TextAlignLastStyleType;
    textAnchor?: TextAnchorStyleType;
    textCombineUpright?: StyleType;
    textDecoration?: StyleType;
    textDecorationColor?: ColorTypes.Color_StyleType;
    textDecorationLine?: TextDecorationLineStyleType;
    textDecorationStyle?: TextDecorationStyleStyleType;
    textDecorationThickness?: TextDecorationThicknessStyleType;
    textEmphasis?: StyleType;
    textEmphasisColor?: ColorTypes.Color_StyleType;
    textEmphasisPosition?: TextEmphasisPositionStyleType;
    textEmphasisStyle?: TextEmphasisStyleStyleType;
    textIndent?: TextIndentStyleType;
    textJustify?: TextJustifyStyleType;
    textKashida?: StyleType;
    textKashidaSpace?: StyleType;
    textOrientation?: TextOrientationStyleType;
    textOverflow?: TextOverflowStyleType;
    textShadow?: StyleType;
    textTransform?: TextTransformStyleType;
    textUnderlinePosition?: TextUnderlinePositionStyleType;
    top?: UtilTypes.Number_StyleType;
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
	
    verticalAlign?: StyleType;
	visibility?: StyleType;
	
    webkitBorderImage?: StyleType;
    webkitBoxDirection?: StyleType;
    webkitBoxOrient?: StyleType;
    webkitColumnBreakAfter?: StyleType;
    webkitColumnBreakBefore?: StyleType;
    webkitColumnBreakInside?: StyleType;
    webkitColumnCount?: ColumnCountStyleType;
    webkitColumnGap?: SingleGapStyleType;
    webkitColumnRule?: ColumnRuleStyleType;
    webkitColumnRuleColor?: ColorTypes.Color_StyleType;
    webkitColumnRuleStyle?: ColumnRuleStyleType;
    webkitColumnRuleWidth?: BorderWidthStyleType;
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
    width?: UtilTypes.Number_StyleType;
    willChange?: StyleType;
    wordBreak?: WordBreakStyleType;
    wordSpacing?: WordSpacingStyleType;
    wordWrap?: StyleType;
	writingMode?: WritingModeStyleType;
	
    zIndex?: ZIndexStyleType;
    zoom?: ZoomStyleType;
}



import {ICustomVar} from "../rules/RuleTypes";

/**
 * The CustomVarStyleType type represents a custom CSS property name and value that are used to
 * define custom properties in a Styleset. This object is used in conjunction with the
 * `--` property of the Styleset type.
 * 
 * CustomVarStyleType objects should be mostly used to override custom properties that have
 * previously been defined at the top-level using the $custom function. That way you can have a
 * "global" value of a custom property and assign a different value to it under a certain CSS
 * selector.
 * 
 * The values of the type can be specified as either a two-item or a three-item array. The
 * two-item array is used with a previously defined custom CSS property represented by an ICustomVar
 * object:
 * - The first item is the ICustomVar object.
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
 *     mainColor = $custom( "color", "black");
 *     brown = $class({ $custom: [ [this.mainColor, "brown"] ] })

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
    [ICustomVar<IStyleset[K]>, IStyleset[K]] | [string, K, IStyleset[K]]



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



