import {
    Extended, OneOrPair, OneOrBox, OneOrMany, CssNumber, CssPosition, MultiCssPosition,
    CssTime, CssLength, CssAngle, CssPercent, CssLengthBox, CssMultiTime, CssFrequency,
    CssResolution, CssRadius, IUrlProxy, HorizontalPositionKeyword, VerticalPositionKeyword,
    CssPoint, ExtendedProp, CssLengthPair, IQuotedProxy, CssColor, CssImage, BasicShape,
    GeometryBoxKeyword, IFilterProxy, IMinMaxProxy, IFitContentProxy, IRepeatProxy, ISpanProxy,
    IRayProxy, ITransformProxy
} from "./BasicTypes"
import {FontStretch_Single} from "./FontFaceAPI";
import {IVarRule, IAnimationRule, ICounterRule, IIDRule, IGridLineRule, IGridAreaRule} from "./RuleTypes";




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS property types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for align-content style property */
export type AlignContent_StyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
    "space-between" | "space-around" | "space-evenly";



/** Type for align-items style property */
export type AlignItems_StyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center";



/** Type for align-self style property */
export type AlignSelf_StyleType = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
    "safe center" | "unsafe center";



/** Type for alignment-baseline style property */
export type AlignmentBaseline_StyleType = "auto" | "baseline" | "before-edge" | "text-before-edge" |
    "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
    "hanging" | "mathematical" | "top" | "center" | "bottom";



/** Type for single animation */
export type Animation_Single =
    {
        name?: Extended<AnimationName_Single>;
        duration?: Extended<CssTime>;
        func?: Extended<TimingFunction_Single>;
        delay?: Extended<CssTime>;
        count?: Extended<AnimationIterationCount_Single>;
        direction?: Extended<AnimationDirection_Single>;
        mode?: Extended<AnimationFillMode_Single>;
        state?: Extended<AnimationPlayState_Single>;
    };

/** Type for animation style property */
export type Animation_StyleType = string | OneOrMany<Animation_Single>;



/** Type for animation-delay style property */
export type AnimationDelay_StyleType = CssMultiTime;



/** Type for single animation direction */
export type AnimationDirection_Single = "normal" | "reverse" | "alternate" | "alternate-reverse";

/** Type for animation-direction style property */
export type AnimationDirection_StyleType = OneOrMany<AnimationDirection_Single>;



/** Type for animation-duraton style property */
export type AnimationDuration_StyleType = CssMultiTime;



/** Type for single animation fill mode */
export type AnimationFillMode_Single = "none" | "forwards" | "backwards" | "both";

/** Type for animation-fill-mode style property */
export type AnimationFillMode_StyleType = OneOrMany<AnimationDirection_Single>;



/** Type for single animation iteration count */
export type AnimationIterationCount_Single = "infinite" | CssNumber;

/** Type for animation-iteration-count style property */
export type AnimationIterationCount_StyleType = OneOrMany<AnimationIterationCount_Single>;



/** Type for single animation name */
export type AnimationName_Single = "none" | string | IAnimationRule;

/** Type for animation-name style property */
export type AnimationName_StyleType = OneOrMany<AnimationName_Single>;



/** Type for single animation play state */
export type AnimationPlayState_Single = "paused" | "running";

/** Type for animation-play-state style property */
export type AnimationPlayState_StyleType = OneOrMany<AnimationPlayState_Single>;



/** Type for simple animation timing functions - those that don't have parameters */
export type TimingFunction_Simple = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

/** Type for step animation timing function position */
export type TimingFunction_StepPosition = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";

/** Type for step animation timing function */
export type TimingFunction_Step = number | [Extended<number>, Extended<TimingFunction_StepPosition>?];

/** Type for Bezier animation timing function */
export type TimingFunction_Bezier = [Extended<number>, Extended<number>, Extended<number>, Extended<number>];

/** Type for single animation timing function */
export type TimingFunction_Single = TimingFunction_Simple | TimingFunction_Step | TimingFunction_Bezier;

/** Type for animation-timing-function style property */
export type AnimationTimingFunction_StyleType = OneOrMany<TimingFunction_Single>;



/** Type for backface-visibility style property */
export type BackfaceVisibilityMode_StyleType = "visible" | "hidden";



/** Type for single background value */
export type Background_Single = string | CssColor |
    {
        color?: Extended<CssColor>,
        image?: Extended<CssImage | string>,
        position?: Extended<CssPosition>,
        size?: Extended<BackgroundSize_Single>,
        repeat?: Extended<BackgroundRepeat_Single>,
        attachment?: Extended<BackgroundAttachment_Single>,
        origin?: Extended<BackgroundOrigin_Single>,
        clip?: Extended<BackgroundClip_Single>,
    };

/** Type for background style property */
export type Background_StyleType = OneOrMany<Background_Single>;



/** Type for single background attachment */
export type BackgroundAttachment_Single = "scroll" | "fixed" | "local";

/** Type for background-attachment style property */
export type BackgroundAttachment_StyleType = OneOrMany<BackgroundAttachment_Single>;



/** Type for single background blend mode */
export type BackgroundBlendMode_Single = "normal" | "multiply" | "screen" | "overlay" | "darken" |
    "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" |
    "exclusion" | "hue" | "saturation" | "color" | "luminosity";

/** Type for background-blend-mode style property */
export type BackgroundBlendMode_StyleType = OneOrMany<BackgroundBlendMode_Single>;



/** Type for single background clip */
export type BackgroundClip_Single = "border-box" | "padding-box" | "content-box" | "text";

/** Type for background-clip style property */
export type BackgroundClip_StyleType = OneOrMany<BackgroundClip_Single>;



/** Type for background-image style property */
export type BackgroundImage_StyleType = "none" | OneOrMany<CssImage | string>;



/** Type for single background origin */
export type BackgroundOrigin_Single = "border-box" | "padding-box" | "content-box" | "text";

/** Type for background-origin style property */
export type BackgroundOrigin_StyleType = OneOrMany<BackgroundOrigin_Single>;



/** Type for background-position style property */
export type BackgroundPosition_StyleType = MultiCssPosition;



/** Type for single background repeat */
export type BackgroundRepeatKeyword_Single = "repeat" | "space" | "round" | "no-repeat";

/** Type for single background repeat */
export type BackgroundRepeat_Single = "repeat-x" | "repeat-y" | OneOrPair<BackgroundRepeatKeyword_Single>;

/** Type for background-repeat style property */
export type BackgroundRepeat_StyleType = OneOrMany<BackgroundRepeat_Single>;



/** Type for background size */
export type BackgroundSize_Single = "cover" | "contain" | OneOrPair<CssLength | "auto">;

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
export type BackgroundSize_StyleType = OneOrMany<BackgroundSize_Single>;



/** Type for baseline-shift style property */
export type BaselineShift_StyleType = "sub" | "super" | CssLength;



/** Type for border-collapse style property */
export type BorderColapse_StyleType = "collapse" | "separate";



/** Type for border-color style property */
export type BorderColor_StyleType = OneOrBox<CssColor>;



/** Type for border-image style property expressed as an object. */
export type BorderImage_Object =
    {
        source: Extended<BorderImageSource_StyleType>,
        slice?: Extended<BorderImageSlice_StyleType>,
        width?: Extended<BorderImageWidth_StyleType>,
        outset?: Extended<BorderImageOutset_StyleType>,
        repeat?: Extended<BorderImageRepeat_StyleType>,
    };

/** Type for border-image style property. */
export type BorderImage_StyleType = string | CssImage | BorderImage_Object;

/**
 * Type for border-image-outset style property. It is CssNumber and not CssLength because
 * border-image-outset can be specified as a unitless number.
 */
export type BorderImageOutset_StyleType = OneOrBox<CssNumber | string>;

/** Type for border-image-repeat keywords */
export type BorderImageRepeat_Keyword = "stretch" | "repeat" | "round" | "space";

/** Type for border-image-repeat style property */
export type BorderImageRepeat_StyleType = OneOrPair<BorderImageRepeat_Keyword>;

/** Type for border-image-slice style property */
export type BorderImageSlice_StyleType = OneOrBox<CssNumber | string> |
    [Extended<CssNumber | string>, true] |
    [Extended<CssNumber | string>, Extended<CssNumber | string>, true] |
    [Extended<CssNumber | string>, Extended<CssNumber | string>, Extended<CssNumber | string>, true] |
    [Extended<CssNumber | string>, Extended<CssNumber | string>, Extended<CssNumber | string>, Extended<CssNumber | string>, true];

/** Type for border-image-source style property */
export type BorderImageSource_StyleType = OneOrBox<CssImage | string>;

/**
 * Type for border-image-width style property. It is CssNumber and not CssLength because
 * border-image-width can be specified as a unitless number.
 */
export type BorderImageWidth_StyleType = OneOrBox<CssNumber | "auto" | string>;



/** Type for border-radius style property */
export type BorderRadius_StyleType = OneOrPair<CssLengthBox>;



/** Type for border-spacing style property */
export type BorderSpacing_StyleType = OneOrPair<CssLength>;



/** Type for single border side style property */
export type BorderStyle_Keyword = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
    "groove" | "ridge" | "inset" | "outset";



/** Type for border-style style property */
export type BorderStyle_StyleType = OneOrBox<BorderStyle_Keyword>;



/** Type for border style property */
export type Border_StyleType = CssLength | BorderStyle_Keyword | CssColor |
    [Extended<CssLength>?, Extended<BorderStyle_Keyword>?, Extended<CssColor>?];



/** Type for border side width style property */
export type BorderWidth_Single = "thin" | "medium" | "thick" | CssLength;

/** Type for border-width style property */
export type BorderWidth_StyleType = OneOrBox<BorderWidth_Single>;



/** Type for single box shadow. */
export type BoxShadow_Single = "none" | string |
    {
        x: Extended<CssLength>,
        y: Extended<CssLength>,
        blur?: Extended<CssLength>,
        spread?: Extended<CssLength>,
        color?: Extended<CssColor>,
        inset?: Extended<boolean>
    };

/** Type for box shadow style property */
export type BoxShadow_StyleType = OneOrMany<BoxShadow_Single>;



/** Type for box-sizing style property */
export type BoxSizing_StyleType = "content-box" | "border-box";



/** Type for break-after style property */
export type BreakAfter_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/** Type for break-before style property */
export type BreakBefore_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/** Type for break-inside style property */
export type BreakInside_StyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";



/** Type for caption-side style property */
export type CaptionSide_StyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end";



/** Type for caret-color style property */
export type CaretColor_StyleType = "auto" | CssColor;



/** Type for clear style property */
export type Clear_StyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end";



/** Type for clip style property */
export type Clip_StyleType = "auto" | CssLengthBox;



/** Type for clip-path style property */
export type ClipPath_StyleType = "none" | IUrlProxy | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/** Type for clip-rule style property */
export type ClipRule_StyleType = "nonzero" | "evenodd";



/** Type for color-interpolation and color-interpolation-filters style properties */
export type ColorInterpolation_StyleType = "auto" | "sRGB" | "linearRGB";



/** Type for column-count style property */
export type ColumnCount_StyleType = "auto" | number;



/** Type for column-fill style property */
export type ColumnFill_StyleType = "auto" | "balance" | "balance-all";



/** Type for column-gap style property */
export type ColumnGap_StyleType = "normal" | CssLength;



/** Type for column-span style property */
export type ColumnSpan_StyleType = "none" | "all";



/**
 * Type for columns style property. The value can be provided in one of the following forms and
 * and will be converted to string as follows:
 *
 * - string: will be treated as is.
 * - number: will be converted to a unitless number - count of columns.
 * - ILengthProxy (e.g. px(8)): converted to a number with the proper length units.
 * - two variants of two element arrays: one of the elements will be treated as a number of columns
 *   while another as the column width.
 */
export type Columns_StyleType = "auto" | CssNumber | CssLength |
    ["auto" | Extended<CssNumber>, "auto" | Exclude<Extended<CssLength>,number>] |
    ["auto" | Exclude<Extended<CssLength>,number>, "auto" | Extended<CssNumber>];
// Note that no special coversion function is required for this property because the number type will
// always be converted to a unitless number



/** Type for contain style property */
export type Contain_StyleType = "none" | "strict" | "content" | "size" | "layout" | "style" | "paint" |
    Extended<"size" | "layout" | "style" | "paint">[];



/** Type for content style property */
export type Content_StyleType = string | "none" | "normal" | OneOrMany<CssImage |
    "open-quote" | "close-quote" | "no-open-quote" | "no-close-quote">;



/** Type for counter-increment, counter-reset and counter-set style properties */
export type Counter_StyleType = "none" | OneOrMany<ICounterRule | string | [ICounterRule | string, Extended<number>]>;



/** Type for cursor pre-defined names */
export type Cursor_Keyword = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" |
    "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" |
    "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" |
    "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" |
    "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" |
    "zoom-out" | "grab" | "grabbing";

/** Type for cursor style property single value */
export type Cursor_Single = Cursor_Keyword | IUrlProxy | [IUrlProxy, Extended<CssNumber>, Extended<CssNumber>];

/** Type for cursor style property */
export type Cursor_StyleType = OneOrMany<Cursor_Single>;



/** Type for direction style property */
export type Direction_StyleType = "ltr" | "rtl";



/** Type for display style property */
export type Display_StyleType = "block" | "inline" | "run-in" | "contents" | "none" |
    "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" |
    "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" |
    "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" |
        "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" |
        "ruby-base-container" | "ruby-text-container" |
    "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" |
        "list-item block flow" | "list-item block flow-root" | "flow list-item block";



/** Type for dominant-baseline style property */
export type DominantBaseline_StyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
    "central" | "mathematical" | "hanging" | "text-top";



/** Type for empty-cells style property */
export type EmptyCells_StyleType = "show" | "hide";



/** Type for fill-rule style property */
export type FillRule_StyleType = "nonzero" | "evenodd";



/** Type for filter and backdrop-filter style single value */
export type Filter_Single = string | IUrlProxy | IFilterProxy;

/** Type for filter and backdrop-filter style property */
export type Filter_StyleType = OneOrMany<Filter_Single>;



/** Type for flex style property */
export type Flex_StyleType = FlexBasis_StyleType | [Extended<number>, Extended<number>] |
    [Extended<number>, Extended<number>, Extended<FlexBasis_StyleType>];



/** Type for flex-basis style property */
export type FlexBasis_StyleType = "auto" | "content" | CssLength;



/** Type for flex-direction style property */
export type FlexDirection_StyleType = "row" | "row-reverse" | "column" | "column-reverse";



/** Type for flex-flow style property */
export type FlexFlow_StyleType = FlexDirection_StyleType | FlexWrap_StyleType |
    [Extended<FlexDirection_StyleType>, Extended<FlexWrap_StyleType>];



/** Type for flex-wrap style property */
export type FlexWrap_StyleType = "nowrap" | "wrap" | "wrap-reverse";



/** Type for float style property */
export type Float_StyleType = "left" | "right" | "none" | "inline-start" | "inline-end";



/** Keywords for font style property */
export type Font_SystemKeyword = "caption" | "icon" | "menu" | "message-box" | "small-caption" | "status-bar";

/** Type for font style property */
export type Font_StyleType = string | Font_SystemKeyword |
    {
        size: Extended<CssLength>;
        family: Extended<string>;
        style?: Extended<FontStyle_StyleType>;
        variant?: Extended<string>;
        weight?: Extended<FontWeight_StyleType>;
        stretch?: Extended<Exclude<FontStretch_Single,number>>;
        lineHeight?: Extended<CssNumber>
    };



/** Type for font-kerning style property */
export type FontKerning_StyleType = "auto" | "normal" | "none";



/** Type for font-optical-sizing style property */
export type FontOpticalSizing_StyleType = "auto" | "none";



/** Type for font-size style property */
export type FontSize_StyleType = "xx-small" | "x-small" | "small" | "medium" | "large" |
    "x-large" | "xx-large" | "xxx-large" | "larger" | "smaller" | CssLength;



/** Type for font-stretch style property */
export type FontStretch_StyleType = "normal" | "ultra-condensed" | "extra-condensed" | "condensed" |
"semi-condensed" | "semi-expanded" | "expanded" | "extra-expanded" | "ultra-expanded" | CssNumber;



/** Type for font-style style property */
export type FontStyle_StyleType = "normal" | "italic" | "oblique" | CssAngle;



/** Type for font-synthesis style property */
export type FontSynthesis_StyleType = "none" | "weight" | "style" | "weight style";



/** Type for font-variant-caps style property */
export type FontVariantCaps_StyleType = "normal" | "small-caps" | "all-small-caps" |
    "petite-caps" | "all-petite-caps" | "unicase" | "titling-caps";



/** Type for font-variant-position style property */
export type FontVariantPosition_StyleType = "normal" | "sub" | "super";



/** Type for font-weight style property */
export type FontWeight_StyleType = "normal" | "bold" | "bolder" | "lighter" | CssNumber;



/** Type for gap or grid-gap style property */
export type Gap_StyleType = RowGap_StyleType | [RowGap_StyleType, ColumnGap_StyleType];



/** Type for a single template element defining track size in grid template */
export type GridTrackSize = CssLength | "min-content" | "max-content" | "auto" |
    IMinMaxProxy | IFitContentProxy | IRepeatProxy;



/** Type for grid-auto-columns and grid-auto-rows style properties */
export type GridAutoAxis_StyleType = OneOrMany<GridTrackSize>;



/** Type for grid-auto-flow style property */
export type GridAutoFlow_StyleType = "row" | "column" | "dense" | "row dense" | "column dense";



/** Type for specifying either number of grid lines or name of grid line or area */
export type GridLineCountOrName = CssNumber | IGridAreaRule | IGridLineRule | string;

/** Type for grid-column-start/end and grid-row-start/end style properties */
export type GridAxisSide_StyleType = "auto" | GridLineCountOrName | ISpanProxy;



/** Type for grid-column and grid-row style properties */
export type GridAxis_StyleType = OneOrPair<GridAxisSide_StyleType>;



/** Type for grid-area style property */
export type GridArea_StyleType = OneOrBox<GridAxisSide_StyleType>;



/**
 * Type for defining a single grid area position. The numbers are 1-based indices of the lines in
 * the following sequence: block start, inline start, block end, inline end.
 */
export type GridTemplateArea_Definition = [IGridAreaRule | Extended<string>,
    number, number, number, number];

/** Type for grid-template-areas style property */
export type GridTemplateAreas_StyleType = "none" | OneOrMany<IQuotedProxy> |
    GridTemplateArea_Definition[];



/**
 * Type for a single template element defining name or names for a grid line in grid template.
 * This is always an array - even if a single name is given.
 */
export type GridTrackLine = (IGridLineRule | Extended<string>)[];

/** Type for a single track element of grid template axis */
export type GridTrack = GridTrackSize | GridTrackLine;

/** Type for grid-template-columns and grid-template-rows style properties */
export type GridTemplateAxis_StyleType = "none" | OneOrMany<GridTrack> | "subgrid";



/** Type for hyphens style property */
export type Hyphens_StyleType = "none" | "manual" | "auto";



/** Type for image-rendering style property */
export type ImageRendering_StyleType = "auto" | "crisp-edges" | "pixelated";



/** Type for isolation style property */
export type Isolation_StyleType = "auto" | "isolate";



/** Type for justify-content style property */
export type JustifyContent_StyleType = "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" |
    "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/** Type for justify-items style property */
export type JustifyItems_StyleType = "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right" |
    "legacy" | "legacy left" | "legacy right" | "legacy center";



/** Type for justify-self style property */
export type JustifySelf_StyleType = "auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/** Type for letter-spacing style property */
export type LetterSpacing_StyleType = "normal" | CssLength;



/** Type for line-break style property */
export type LineBreak_StyleType = "auto" | "loose" | "normal" | "strict" | "anywhere";



/** Type for line-height style property */
export type LineHeight_StyleType = CssNumber | string;



/** Type for list-style style property */
export type ListStyle_StyleType = ListStyleType_StyleType | ListStylePosition_StyleType | ListStyleImage_StyleType |
    [Extended<ListStyleImage_StyleType>, Extended<ListStylePosition_StyleType>] |
    [Extended<ListStyleImage_StyleType>, Extended<ListStyleType_StyleType>?] |
    [Extended<ListStyleType_StyleType>, Extended<ListStylePosition_StyleType>] |
    [Extended<ListStyleImage_StyleType>, Extended<ListStylePosition_StyleType>, Extended<ListStyleType_StyleType>?];



/** Type for line-style-image style property */
export type ListStyleImage_StyleType = "none" | IUrlProxy;



/** Type for list-style-position style property */
export type ListStylePosition_StyleType = "inside" | "outside";



/** Type for list-style-type style property */
export type ListStyleType_StyleType = "none" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" |
    "cjk-decimal" | "cjk-earthly-branch" | "cjk-heavenly-stem" | "cjk-ideographic" |
    "lower-roman" | "upper-roman" | "lower-greek" | "lower-alpha" | "lower-latin" | "upper-alpha" | "upper-latin" |
    "arabic-indic" | "armenian" | "bengali" | "cambodian" | "devanagari" | "georgian" | "gujarati" | "gurmukhi" | "hebrew" |
    "hiragana" | "hiragana-iroha" | "japanese-formal" | "japanese-informal" | "kannada" | "katakana" | "katakana-iroha" |
    "khmer" | "korean-hangul-formal" | "korean-hanja-formal" | "korean-hanja-informal" | "lao" | "lower-armenian" |
    "malayalam" | "mongolian" | "myanmar" | "oriya" | "persian" | "simp-chinese-formal" | "simp-chinese-informal" |
    "tamil" | "telugu" | "thai" | "tibetan" | "trad-chinese-formal" | "trad-chinese-informal" | "upper-armenian" |
    "disclosure-open" | "disclosure-closed";



/** Type for the marker-start, marker-mid and marker-end style properties */
export type Marker_StyleType = "none" | IIDRule;



/** Type for the object-fit style property */
export type ObjectFit_StyleType = "fill" | "contain" | "cover" | "none" | "scale-down";



/** Type for the offset style property */
export type Offset_StyleType = string | OffsetPath_StyleType |
{
    anchor?: OffsetAnchor_StyleType,
    distance?: CssLength,
    path?: OffsetPath_StyleType,
    position?: CssPosition,
    rotate?: OffsetRotate_StyleType,
}



/** Type for the offset-anchor style property */
export type OffsetAnchor_StyleType = "auto" | CssPosition;



/** Type for offset-path style property */
export type OffsetPath_StyleType = "none" | IRayProxy | IUrlProxy | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/** Type for the offset-rotate style property */
export type OffsetRotate_StyleType = "auto" | "reverse" | CssAngle | ["auto" | "reverse", CssAngle];



/** Type for the overflow-x/y style property */
export type Overflow_Single_StyleType = "visible" | "hidden" | "clip" | "scroll" | "auto";

/** Type for the overflow- style property */
export type Overflow_StyleType = OneOrPair<Overflow_Single_StyleType>;



/** Type for the overflow-anchor style property */
export type OverflowAnchor_StyleType = "auto" | "none";



/** Type for the overflow-wrap style property */
export type OverflowWrap_StyleType = "normal" | "break-word" | "anywhere";



/** Type for the overscroll-behavior-x/y style property */
export type OverscrollBehavior_Single_StyleType = "contain" | "none" | "auto";

/** Type for the overscroll-behavior style property */
export type OverscrollBehavior_StyleType = OneOrPair<OverscrollBehavior_Single_StyleType>;



/** Type for the paint-order style property */
export type PaintOrder_Keyword = "fill" | "stroke" | "markers";

/** Type for the paint-order style property */
export type PaintOrder_StyleType = "normal" | PaintOrder_Keyword |
    [PaintOrder_Keyword, PaintOrder_Keyword?, PaintOrder_Keyword?];



/** Type for the perspective style property */
export type Perspective_StyleType = "none" | CssLength;



/** Type for the perspective-origin style property */
export type PerspectiveOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>];



/** Type for the place-content style property */
export type PlaceContent_StyleType = AlignContent_StyleType | [Extended<AlignContent_StyleType>, Extended<JustifyContent_StyleType>];



/** Type for the place-items style property */
export type PlaceItems_StyleType = AlignItems_StyleType | [Extended<AlignItems_StyleType>, Extended<JustifyItems_StyleType>];



/** Type for the place-self style property */
export type PlaceSelf_StyleType = AlignSelf_StyleType | [Extended<AlignSelf_StyleType>, Extended<JustifySelf_StyleType>];



/** Type for the pointer-events style property */
export type PointerEvents_StyleType = "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" |
    "painted" | "fill" | "stroke" | "all";



/** Type for the position style property */
export type Position_StyleType = "static" | "relative" | "absolute" | "sticky" | "fixed";



/** Type for the quotes style property */
export type Quotes_StyleType = "none" | "auto" | Extended<string>[];



/** Type for the resize style property */
export type Resize_StyleType = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";



/** Type for rotate style property */
export type Rotate_StyleType = "none" | CssAngle | ["x" | "y" | "z", Extended<CssAngle>] |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<CssNumber>, Extended<CssAngle>];



/** Type for row-gap style property */
export type RowGap_StyleType = CssLength;



/** Type for the scale style property */
export type Scale_StyleType = "none" | CssNumber |
    [Extended<CssNumber>, Extended<CssNumber>?, Extended<CssNumber>?];



/** Type for the scrollbar-color style property */
export type ScrollbarColor_StyleType = "auto" | "dark" | "light" |
    [Extended<CssColor>, Extended<CssColor>];



/** Type for the scrollbar-width style property */
export type ScrollbarWidth_StyleType = "auto" | "thin" | "none";



/** Type for the scroll-behavior style property */
export type ScrollBehavior_StyleType = "auto" | "smooth";



/** Type for the scroll-snap-align style property */
export type ScrollSnapAlign_StyleType = OneOrPair<"none" | "start" | "end" | "center">;



/** Type for the scroll-snap-stop style property */
export type ScrollSnapStop_StyleType = "normal" | "always";



/** Type for the scroll-snap-type style property */
export type ScrollSnapType_StyleType = "none" |
    [Extended<"x" | "y" | "block" | "inline" | "both">, Extended<"mandatory" | "proximity">];



/** Type for shape-outside style property */
export type ShapeOutside_StyleType = IUrlProxy | BasicShape | GeometryBoxKeyword | CssImage;



/** Type for the shape-rendering style property */
export type ShapeRendering_StyleType = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";



/** Type for the table-layout style property */
export type TableLayout_StyleType = "auto" | "fixed";



/** Type for the text-align style property */
export type TextAlign_StyleType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";



/** Type for the text-align-last style property */
export type TextAlignLast_StyleType = "auto" | "start" | "end" | "left" | "right" | "center" | "justify";



/** Type for the text-anchor style property */
export type TextAnchor_StyleType = "start" | "middle" | "end";



/** Type for the text-combine-upright style property */
export type TextCombineUpright_StyleType = "none" | "all" | "digits" | number;



/**
 * Type for the text-decoration style property. If a number is specified, it will be interpreted
 * as color - not as thickness.
 */
export type TextDecoration_StyleType = TextDecorationLine_StyleType | TextDecorationStyle_StyleType |
    CssColor | TextDecorationThickness_StyleType |
    {
        line?: Extended<TextDecorationLine_StyleType>,
        style?: Extended<TextDecorationStyle_StyleType>,
        color?: Extended<CssColor>,
        thickness?: Extended<TextDecorationThickness_StyleType>,
    };



/** Type for the text-decoration-line style property */
export type TextDecorationLine_StyleType = "none" | "spelling-error" | "grammar-error" |
    OneOrMany<"underline" | "overline" | "line-through">;



/** Type for the text-decoration-style style property */
export type TextDecorationStyle_StyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";



/** Type for the text-decoration-skip-ink style property */
export type TextDecorationSkipInk_StyleType = "none" | "auto" | "all";



/** Type for the text-decoration-thickness style property */
export type TextDecorationThickness_StyleType = "auto" | "from-font" | CssLength;



// /** Type for the text-emphasis style property */
export type TextEmphasis_StyleType = TextEmphasisStyle_StyleType | CssColor |
    [Extended<TextEmphasisStyle_StyleType>, Extended<CssColor>];



/** Type for the text-emphasis-position style property */
export type TextEmphasisPosition_StyleType = "over left" | "over right" | "under left" | "under right";



/** Shape for the text-emphasis-style style property */
export type TextEmphasisShape = "dot" | "circle" | "double-circle" | "triangle" | "sesame" | string;

/** Fill option for the text-emphasis-style style property */
export type TextEmphasisFill = "filled" | "open";

/** Type for the text-emphasis-style style property */
export type TextEmphasisStyle_StyleType = "none" | TextEmphasisFill | TextEmphasisShape |
    [Extended<TextEmphasisFill>, Extended<TextEmphasisShape>];



/** Type for the text-indent style property */
export type TextIndent_StyleType = CssLength |
    [Extended<CssLength>, Extended<OneOrMany<"each-line" | "hanging" | "each-line hanging">>];



/** Type for the text-justify style property */
export type TextJustify_StyleType = "auto" | "inter-character" | "inter-word" | "none";



/** Type for the text-orientation style property */
export type TextOrientation_StyleType = "mixed" | "upright" | "sideways";



/** Type for the text-overflow style property */
export type TextOverflow_StyleType = OneOrPair<"clip" | "ellipsis" | "fade" | string>;



/** Type for the single value of the text-shadow style property */
export type TextShadow_Single = "none" | string |
    {
        x: Extended<CssLength>,
        y: Extended<CssLength>,
        blur?: Extended<CssLength>,
        color?: Extended<CssColor>,
    };

/** Type for the text-shadow style property */
export type TextShadow_StyleType = OneOrMany<TextShadow_Single>;



/** Type for the text-size-adjust style property */
export type TextSizeAdjust_StyleType = "none" | "auto" | CssPercent;



/** Type for the text-transform style property */
export type TextTransform_StyleType = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";



/** Type for the text-underline-position style property */
export type TextUnderlinePosition_StyleType = "auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below";



/** Type for the touch-action style property */
export type TouchAction_StyleType = "auto" | "none" | "manipulation" |
    "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" | "pan-down" | "pinch-zoom" |
    "pan-x pinch-zoom" | "pan-left pinch-zoom" | "pan-right pinch-zoom" | "pan-y pinch-zoom" | "pan-up pinch-zoom" | "pan-down pinch-zoom" |
    "pan-x pan-y" | "pan-x pan-y pinch-zoom" | "pan-x pan-up" | "pan-x pan-up pinch-zoom" | "pan-x pan-down" | "pan-x pan-down pinch-zoom" |
    "pan-y pan-left" | "pan-y pan-left pinch-zoom" | "pan-y pan-right" | "pan-y pan-right pinch-zoom" |
    "pan-left pan-up" | "pan-left pan-up pinch-zoom" | "pan-left pan-down" | "pan-left pan-down pinch-zoom" |
    "pan-right pan-up" | "pan-right pan-up pinch-zoom" | "pan-right pan-down" | "pan-right pan-down pinch-zoom" |
    "pan-up pan-left" | "pan-up pan-left pinch-zoom" | "pan-up pan-right" | "pan-up pan-right pinch-zoom" |
    "pan-down pan-left" | "pan-down pan-left pinch-zoom" | "pan-down pan-right" | "pan-down pan-right pinch-zoom";



/** Type for transform style property */
export type Transform_StyleType = "none" | string | OneOrMany<ITransformProxy>;



/** Type for transform-box style property */
export type TransformBox_StyleType = "content-box" | "border-box" | "fill-box" | "stroke-box" | "view-box";



/** Type for transform-origin style property */
export type TransformOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>, Extended<CssLength>?];



/** Type for transform-style style property */
export type TransformStyle_StyleType = "flat" | "preserve-3d";



/** Type for single transition */
export type Transition_Single = string |
    {
        property?: Extended<TransitionProperty_Single>;
        duration?: Extended<CssTime>;
        func?: Extended<TimingFunction_Single>;
        delay?: Extended<CssTime>;
    };

/** Type for transition style property */
export type Transition_StyleType = OneOrMany<Transition_Single>;



/** Type for single transition-property */
export type TransitionProperty_Single = "none" | "all" | keyof ICssStyleset;

/** Type for transition-property style property */
export type TransitionProperty_StyleType = OneOrMany<TransitionProperty_Single>;



/** Type for transition-timing-function style property */
export type TransitionTimingFunction_StyleType = OneOrMany<TimingFunction_Single>;



/** Type for the translate style property */
export type Translate_StyleType = "none" | CssLength |
    [Extended<CssLength>, Extended<CssLength>, Extended<CssLength>?];



/** Type for the unicode-bidi style property */
export type UnicodeBidi_StyleType = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";



/** Type for the user-select style property */
export type UserSelect_StyleType = "auto" | "text" | "none" | "contain" | "all";



/** Type for the vertical-align style property */
export type VerticalAlign_StyleType = "baseline" | "sub" | "super" | "text-top" | "text-bottom" |
    "middle" | "top" | "bottom" | CssLength;



/** Type for the visibility style property */
export type Visibility_StyleType = "visible" | "hidden" | "collapse";



/** Type for the vector-effect style property */
export type VectorEffect_StyleType = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";



/** Type for the white-space style property */
export type WhiteSpace_StyleType = "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces";



/** Type for will-change style property */
export type WillChange_StyleType = "auto" | OneOrMany<"scroll-position" | "contents" | Exclude<keyof ICssStyleset,"willChange">>;



/** Type for the word-break style property */
export type WordBreak_StyleType = "normal" | "break-all" | "keep-all" | "break-word";



/** Type for the word-spacing style property */
export type WordSpacing_StyleType = "normal" | CssLength;



/** Type for the writing-mode style property */
export type WritingMode_StyleType = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";



/** Type for the z-index style property */
export type ZIndex_StyleType = "auto" | CssNumber;



/** Type for the zoom style property */
export type Zoom_StyleType = "normal" | "reset" | CssPercent;



/** Type for style properties for which there is no special type defined. */
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
    alignContent?: AlignContent_StyleType;
    alignItems?: AlignItems_StyleType;
    alignSelf?: AlignSelf_StyleType;
    alignmentBaseline?: AlignmentBaseline_StyleType;
    animation?: Animation_StyleType;
    animationDelay?: AnimationDelay_StyleType;
    animationDirection?: AnimationDirection_StyleType;
    animationDuration?: AnimationDuration_StyleType;
    animationFillMode?: AnimationFillMode_StyleType;
    animationIterationCount?: AnimationIterationCount_StyleType;
    animationName?: AnimationName_StyleType;
    animationPlayState?: AnimationPlayState_StyleType;
    animationTimingFunction?: AnimationTimingFunction_StyleType;

    backdropFilter?: Filter_StyleType;
    backfaceVisibility?: BackfaceVisibilityMode_StyleType;
    background?: Background_StyleType;
    backgroundAttachment?: BackgroundAttachment_StyleType;
    backgroundBlendMode?: BackgroundBlendMode_StyleType;
    backgroundClip?: BackgroundClip_StyleType;
    backgroundColor?: CssColor;
    backgroundImage?: BackgroundImage_StyleType;
    backgroundOrigin?: BackgroundOrigin_StyleType;
    backgroundPosition?: BackgroundPosition_StyleType;
    backgroundPositionX?: DefaultStyleType;
    backgroundPositionY?: DefaultStyleType;
    backgroundRepeat?: BackgroundRepeat_StyleType;
    backgroundRepeatX?: DefaultStyleType;
    backgroundRepeatY?: DefaultStyleType;
    backgroundSize?: BackgroundSize_StyleType;
    baselineShift?: BaselineShift_StyleType;
    blockSize?: CssLength;
    border?: Border_StyleType;
    borderBlockEnd?: Border_StyleType;
    borderBlockEndColor?: CssColor;
    borderBlockEndStyle?: BorderStyle_Keyword;
    borderBlockEndWidth?: BorderWidth_Single;
    borderBlockStart?: Border_StyleType;
    borderBlockStartColor?: CssColor;
    borderBlockStartStyle?: BorderStyle_Keyword;
    borderBlockStartWidth?: BorderWidth_Single;
    borderBottom?: Border_StyleType;
    borderBottomColor?: CssColor;
    borderBottomLeftRadius?: CssRadius;
    borderBottomRightRadius?: CssRadius;
    borderBottomStyle?: BorderStyle_Keyword;
    borderBottomWidth?: BorderWidth_Single;
    borderCollapse?: BorderColapse_StyleType;
    borderColor?: BorderColor_StyleType;
    borderImage?: BorderImage_StyleType;
    borderImageOutset?: BorderImageOutset_StyleType;
    borderImageRepeat?: BorderImageRepeat_StyleType;
    borderImageSlice?: BorderImageSlice_StyleType;
    borderImageSource?: BorderImageSource_StyleType;
    borderImageWidth?: BorderImageWidth_StyleType;
    borderInlineEnd?: Border_StyleType;
    borderInlineEndColor?: CssColor;
    borderInlineEndStyle?: BorderStyle_Keyword;
    borderInlineEndWidth?: BorderWidth_Single;
    borderInlineStart?: Border_StyleType;
    borderInlineStartColor?: CssColor;
    borderInlineStartStyle?: BorderStyle_Keyword;
    borderInlineStartWidth?: BorderWidth_Single;
    borderLeft?: Border_StyleType;
    borderLeftColor?: CssColor;
    borderLeftStyle?: BorderStyle_Keyword;
    borderLeftWidth?: BorderWidth_Single;
    borderRadius?: BorderRadius_StyleType;
    borderRight?: Border_StyleType;
    borderRightColor?: CssColor;
    borderRightStyle?: BorderStyle_Keyword;
    borderRightWidth?: BorderWidth_Single;
    borderSpacing?: BorderSpacing_StyleType;
    borderStyle?: BorderStyle_StyleType;
    borderTop?: Border_StyleType;
    borderTopColor?: CssColor;
    borderTopLeftRadius?: CssRadius;
    borderTopRightRadius?: CssRadius;
    borderTopStyle?: BorderStyle_Keyword;
    borderTopWidth?: BorderWidth_Single;
    borderWidth?: BorderWidth_StyleType;
    bottom?: CssLength;
    boxShadow?: BoxShadow_StyleType;
    boxSizing?: BoxSizing_StyleType;
    breakAfter?: BreakAfter_StyleType;
    breakBefore?: BreakBefore_StyleType;
    breakInside?: BreakInside_StyleType;
    bufferedRendering?: DefaultStyleType;

    captionSide?: CaptionSide_StyleType;
    caretColor?: CaretColor_StyleType;
    clear?: Clear_StyleType;
    clip?: Clip_StyleType;
    clipPath?: ClipPath_StyleType;
    clipRule?: ClipRule_StyleType;
    color?: CssColor;
    colorInterpolation?: ColorInterpolation_StyleType;
    colorInterpolationFilters?: ColorInterpolation_StyleType;
    columnCount?: ColumnCount_StyleType;
    columnFill?: ColumnFill_StyleType;
    columnGap?: ColumnGap_StyleType;
    columnRule?: Border_StyleType;
    columnRuleColor?: CssColor;
    columnRuleStyle?: BorderStyle_Keyword;
    columnRuleWidth?: BorderWidth_Single;
    columnSpan?: ColumnSpan_StyleType;
    columnWidth?: CssLength;
    columns?: Columns_StyleType;
    contain?: Contain_StyleType;
    content?: Content_StyleType;
    counterIncrement?: Counter_StyleType;
    counterReset?: Counter_StyleType;
    counterSet?: Counter_StyleType;
    cursor?: Cursor_StyleType;

    direction?: Direction_StyleType;
    display?: Display_StyleType;
    dominantBaseline?: DominantBaseline_StyleType;

    emptyCells?: EmptyCells_StyleType;

    fill?: CssColor;
    fillOpacity?: CssPercent;
    fillRule?: FillRule_StyleType;
    filter?: Filter_StyleType;
    flex?: Flex_StyleType;
    flexBasis?: FlexBasis_StyleType;
    flexDirection?: FlexDirection_StyleType;
    flexFlow?: FlexFlow_StyleType;
    flexGrow?: CssNumber;
    flexShrink?: CssNumber;
    flexWrap?: FlexWrap_StyleType;
    float?: Float_StyleType;
    floodColor?: CssColor;
    floodOpacity?: CssPercent;
    font?: Font_StyleType;
    fontFamily?: DefaultStyleType;
    fontFeatureSettings?: DefaultStyleType;
    fontKerning?: FontKerning_StyleType;
    fontOpticalSizing?: FontOpticalSizing_StyleType;
    fontSize?: FontSize_StyleType;
    fontSizeAdjust?: CssNumber;
    fontStretch?: FontStretch_StyleType;
    fontStyle?: FontStyle_StyleType;
    fontSynthesis?: FontSynthesis_StyleType;
    fontVariant?: DefaultStyleType;
    fontVariantCaps?: FontVariantCaps_StyleType;
    fontVariantEastAsian?: DefaultStyleType;
    fontVariantLigatures?: DefaultStyleType;
    fontVariantNumeric?: DefaultStyleType;
    fontVariantPosition?: FontVariantPosition_StyleType;
    fontVariationSettings?: DefaultStyleType;
    fontWeight?: FontWeight_StyleType;

    gap?: Gap_StyleType;
    grid?: DefaultStyleType;
    gridArea?: GridArea_StyleType;
    gridAutoColumns?: GridAutoAxis_StyleType;
    gridAutoFlow?: GridAutoFlow_StyleType;
    gridAutoRows?: GridAutoAxis_StyleType;
    gridColumn?: GridAxis_StyleType;
    gridColumnEnd?: GridAxisSide_StyleType;
    gridColumnGap?: ColumnGap_StyleType;
    gridColumnStart?: GridAxisSide_StyleType;
    gridGap?: Gap_StyleType;
    gridRow?: GridAxis_StyleType;
    gridRowEnd?: GridAxisSide_StyleType;
    gridRowGap?: RowGap_StyleType;
    gridRowStart?: GridAxisSide_StyleType;
    gridTemplate?: DefaultStyleType;
    gridTemplateAreas?: GridTemplateAreas_StyleType;
    gridTemplateColumns?: GridTemplateAxis_StyleType;
    gridTemplateRows?: GridTemplateAxis_StyleType;

    height?: CssLength;
    hyphens?: Hyphens_StyleType;

    imageRendering?: ImageRendering_StyleType;
    inlineSize?: CssLength;
    isolation?: Isolation_StyleType;

    justifyContent?: JustifyContent_StyleType;
    justifyItems?: JustifyItems_StyleType;
    justifySelf?: JustifySelf_StyleType;

    left?: CssLength;
    letterSpacing?: LetterSpacing_StyleType;
    lightingColor?: CssColor;
    lineBreak?: LineBreak_StyleType;
    lineHeight?: LineHeight_StyleType;
    listStyle?: ListStyle_StyleType;
    listStyleImage?: ListStyleImage_StyleType;
    listStylePosition?: ListStylePosition_StyleType;
    listStyleType?: ListStyleType_StyleType;

    margin?: CssLengthBox;
    marginBlockEnd?: CssLength;
    marginBlockStart?: CssLength;
    marginBottom?: CssLength;
    marginInlineEnd?: CssLength;
    marginInlineStart?: CssLength;
    marginLeft?: CssLength;
    marginRight?: CssLength;
    marginTop?: CssLength;
    marker?: DefaultStyleType;
    markerEnd?: Marker_StyleType;
    markerMid?: Marker_StyleType;
    markerStart?: Marker_StyleType;
    mask?: DefaultStyleType;
    maskComposite?: DefaultStyleType;
    maskImage?: DefaultStyleType;
    maskPosition?: DefaultStyleType;
    maskRepeat?: DefaultStyleType;
    maskSize?: DefaultStyleType;
    maskType?: DefaultStyleType;
    maxBlockSize?: CssLength;
    maxHeight?: CssLength;
    maxInlineSize?: CssLength;
    maxWidth?: CssLength;
    minBlockSize?: CssLength;
    minHeight?: CssLength;
    minInlineSize?: CssLength;
    minWidth?: CssLength;

    objectFit?: ObjectFit_StyleType;
    objectPosition?: CssPosition;
    offset?: Offset_StyleType;
    offsetAnchor?: OffsetAnchor_StyleType
    offsetDistance?: CssLength;
    offsetPath?: OffsetPath_StyleType;
    offsetPosition?: CssPosition;
    offsetRotate?: OffsetRotate_StyleType;
    opacity?: CssPercent;
    order?: CssNumber;
    orphans?: CssNumber;
    outline?: Border_StyleType;
    outlineColor?: CssColor;
    outlineOffset?: CssLength;
    outlineStyle?: BorderStyle_StyleType;
    outlineWidth?: BorderWidth_Single;
    overflow?: Overflow_StyleType;
    overflowAnchor?: OverflowAnchor_StyleType;
    overflowBlock?: Overflow_Single_StyleType;
    overflowInline?: Overflow_Single_StyleType;
    overflowWrap?: OverflowWrap_StyleType;
    overflowX?: Overflow_Single_StyleType;
    overflowY?: Overflow_Single_StyleType;
    overscrollBehavior?: OverscrollBehavior_StyleType;
    overscrollBehaviorBlock?: OverscrollBehavior_Single_StyleType;
    overscrollBehaviorInline?: OverscrollBehavior_Single_StyleType;
    overscrollBehaviorX?: OverscrollBehavior_Single_StyleType;
    overscrollBehaviorY?: OverscrollBehavior_Single_StyleType;

    padding?: CssLengthBox;
    paddingBlockEnd?: CssLength;
    paddingBlockStart?: CssLength;
    paddingBottom?: CssLength;
    paddingInlineEnd?: CssLength;
    paddingInlineStart?: CssLength;
    paddingLeft?: CssLength;
    paddingRight?: CssLength;
    paddingTop?: CssLength;
    paintOrder?: PaintOrder_StyleType;
    pageBreakAfter?: BreakAfter_StyleType;
    pageBreakBefore?: BreakBefore_StyleType;
    pageBreakInside?: BreakInside_StyleType;
    perspective?: Perspective_StyleType;
    perspectiveOrigin?: PerspectiveOrigin_StyleType;
    placeContent?: PlaceContent_StyleType;
    placeItems?: PlaceItems_StyleType;
    placeSelf?: PlaceSelf_StyleType;
    pointerEvents?: PointerEvents_StyleType;
    position?: Position_StyleType;

    quotes?: Quotes_StyleType;

    resize?: Resize_StyleType;
    right?: CssLength;
    rotate?: Rotate_StyleType;
    rowGap?: RowGap_StyleType;
    rubyAlign?: DefaultStyleType;
    rubyOverhang?: DefaultStyleType;
    rubyPosition?: DefaultStyleType;

    scale?: Scale_StyleType;
    scrollbarColor?: ScrollbarColor_StyleType;
    scrollbarWidth?: ScrollbarWidth_StyleType;
    scrollBehavior?: ScrollBehavior_StyleType;
    scrollMargin?: CssLengthBox;
    scrollMarginBlock?: CssLengthPair;
    scrollMarginBlockEnd?: CssLength;
    scrollMarginBlockStart?: CssLength;
    scrollMarginBottom?: CssLength;
    scrollMarginInline?: CssLengthPair;
    scrollMarginInlineEnd?: CssLength;
    scrollMarginInlineStart?: CssLength;
    scrollMarginLeft?: CssLength;
    scrollMarginRight?: CssLength;
    scrollMarginTop?: CssLength;
    scrollPadding?: CssLengthBox;
    scrollPaddingBlock?: CssLengthPair;
    scrollPaddingBlockEnd?: CssLength;
    scrollPaddingBlockStart?: CssLength;
    scrollPaddingBottom?: CssLength;
    scrollPaddingInline?: CssLengthPair;
    scrollPaddingInlineEnd?: CssLength;
    scrollPaddingInlineStart?: CssLength;
    scrollPaddingLeft?: CssLength;
    scrollPaddingRight?: CssLength;
    scrollPaddingTop?: CssLength;
    scrollSnapAlign?: ScrollSnapAlign_StyleType;
    scrollSnapStop?: ScrollSnapStop_StyleType;
    scrollSnapType?: ScrollSnapType_StyleType;
    shapeImageThreshold?: CssNumber;
    shapeMargin?: CssLength;
    shapeOutside?: ShapeOutside_StyleType;
    shapeRendering?: ShapeRendering_StyleType;
    stopColor?: CssColor;
    stopOpacity?: CssNumber;
    stroke?: CssColor;
    strokeDasharray?: DefaultStyleType;
    strokeDashoffset?: DefaultStyleType;
    strokeLinecap?: DefaultStyleType;
    strokeLinejoin?: DefaultStyleType;
    strokeMiterlimit?: DefaultStyleType;
    strokeOpacity?: DefaultStyleType;
    strokeWidth?: DefaultStyleType;

    tabSize?: CssLength;
    tableLayout?: TableLayout_StyleType;
    textAlign?: TextAlign_StyleType;
    textAlignLast?: TextAlignLast_StyleType;
    textAnchor?: TextAnchor_StyleType;
    textCombineUpright?: TextCombineUpright_StyleType;
    textDecoration?: TextDecoration_StyleType;
    textDecorationColor?: CssColor;
    textDecorationLine?: TextDecorationLine_StyleType;
    textDecorationSkipInk?: TextDecorationSkipInk_StyleType;
    textDecorationStyle?: TextDecorationStyle_StyleType;
    textDecorationThickness?: TextDecorationThickness_StyleType;
    textEmphasis?: TextEmphasis_StyleType;
    textEmphasisColor?: CssColor;
    textEmphasisPosition?: TextEmphasisPosition_StyleType;
    textEmphasisStyle?: TextEmphasisStyle_StyleType;
    textIndent?: TextIndent_StyleType;
    textJustify?: TextJustify_StyleType;
    textKashida?: DefaultStyleType;
    textKashidaSpace?: DefaultStyleType;
    textOrientation?: TextOrientation_StyleType;
    textOverflow?: TextOverflow_StyleType;
    textShadow?: TextShadow_StyleType;
    textSizeAdjust?: TextSizeAdjust_StyleType;
    textTransform?: TextTransform_StyleType;
    textUnderlinePosition?: TextUnderlinePosition_StyleType;
    top?: CssLength;
    touchAction?: TouchAction_StyleType;
    transform?: Transform_StyleType;
    transformBox?: TransformBox_StyleType;
    transformOrigin?: TransformOrigin_StyleType;
    transformStyle?: TransformStyle_StyleType;
    transition?: Transition_StyleType;
    transitionDelay?: OneOrMany<CssTime>;
    transitionDuration?: OneOrMany<CssTime>;
    transitionProperty?: TransitionProperty_StyleType;
    transitionTimingFunction?: TransitionTimingFunction_StyleType;
    translate?: Translate_StyleType;

    unicodeBidi?: UnicodeBidi_StyleType;
    userSelect?: UserSelect_StyleType;

    verticalAlign?: VerticalAlign_StyleType;
    visibility?: Visibility_StyleType;
    vectorEffect?: VectorEffect_StyleType;

    whiteSpace?: WhiteSpace_StyleType;
    widows?: CssNumber;
    width?: CssLength;
    willChange?: WillChange_StyleType;
    wordBreak?: WordBreak_StyleType;
    wordSpacing?: WordSpacing_StyleType;
    writingMode?: WritingMode_StyleType;

    zIndex?: ZIndex_StyleType;
    zoom?: Zoom_StyleType;
}



/**
 * The StringStyleset type maps CSS properties including custom properties to the string values.
 */
export type StringStyleset = { [K: string]: string | null | undefined }



/**
 * The ExtendedStyleset type maps all CSS properties defined in the [[ICssStyleset]] interface to the
 * "extended" versions of their types. These extended types are defined by adding basic keywords
 * (e.g. "unset", "initial", etc.) as well as [[StringProxy]] and [[ICustomVar]] to the type that
 * is defined in the ICssStyleset interface.
 */
export type ExtendedStyleset = { [K in keyof ICssStyleset]?: ExtendedProp<ICssStyleset[K]> }



/**
 * The ICssVarTemplates interface maps template names to the types, which can be used for
 * defining custom CSS properties (a.k.a. variables). Normally, variables are defined using the
 * names of the style properties and their type is determined by the type of this property in the
 * ICssStyleset interface. Sometimes, however, there is a need to define variables of some other
 * types, for which there is no suitable style property. The ICssVarTemplates interface provides
 * many basic types and it can also be extended using the TypeScript's module augmentation.
 */
export interface ICssVarTemplates extends ICssStyleset
{
    /** Allows having CSS variables that accept value of any type */
    "any"?: any;

    /** Allows having CSS variables that accept a string value */
    CssString?: string;

    /** Allows having CSS variables that accept a `<number>` CSS value */
    CssNumber?: CssNumber;

    /** Allows having CSS variables that accept a `<length>` CSS value */
    CssLength?: CssLength;

    /** Allows having CSS variables that accept an `<angle>` CSS value */
    CssAngle?: CssAngle;

    /** Allows having CSS variables that accept a `<time>` CSS value */
    CssTime?: CssTime;

    /** Allows having CSS variables that accept a `<resolution>` CSS value */
    CssResolution?: CssResolution;

    /** Allows having CSS variables that accept a `<frequency>` CSS value */
    CssFrequency?: CssFrequency;

    /** Allows having CSS variables that accept a `<percent>` CSS value */
    CssPercent?: CssPercent;

    /** Allows having CSS variables that accept a Point value */
    CssPoint?: CssPoint;

    /** Allows having CSS variables that accept a `<position>` CSS value */
    CssPosition?: CssPosition;

    /** Allows having CSS variables that accept a `Radius` CSS value */
    CssRadius?: CssRadius;

    /** Allows having CSS variables that accept a `<color>` CSS value */
    CssColor?: CssColor;

    /** Allows having CSS variables that accept an `<image>` CSS value */
    CssImage?: CssImage;
}



/**
 * The VarTemplateName type defines the keys (strings) that can be used as templates for defining
 * custom CSS properties using the [[$var]] function.
 */
export type VarTemplateName = keyof ICssVarTemplates;

/**
 * The VarValueType generic type defines the type of the value that can be assigned to the custom
 * CSS property using the generic type K as its template.
 */
export type VarValue<K extends VarTemplateName> = ICssVarTemplates[K];

/**
 * The VarValueType generic type defines the type of the value that can be assigned to the custom
 * CSS property using the generic type K as its template.
 */
export type ExtendedVarValue<K extends VarTemplateName> = Extended<VarValue<K>>;



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
 * class MyStyles extends StyleDefinition
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
export type CustomVar_StyleType<K extends VarTemplateName = any> =
    [IVarRule<K>, ExtendedVarValue<K>] | [string, K, ExtendedVarValue<K>]



/**
 * Type representing a collection of style properties and their values. In addition to the
 * properties representing the standard CSS styles, this type also includes the "--" property,
 * which is an array of CustomVarStyleType objects.
 */
export type Styleset = ExtendedStyleset &
    {
        /**
         * Special property "--" specifies an array that contains CustomVarStyleType objects each
         * representing a definition of a custom CSS property.
         */
        "--"?: CustomVar_StyleType[];
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
export type SingleSupportsQuery = string | ExtendedStyleset & { $negate?: boolean; };



/**
 * Type representing one or more queries as part of the @supports rule. While multiple queries in
 * an array are combined with the "or" operator, the styles within each styleset are combined with
 * the "and" operator.
 */
export type SupportsQuery = SingleSupportsQuery | SingleSupportsQuery[];



