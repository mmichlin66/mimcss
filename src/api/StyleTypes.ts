import {
    Extended, OneOrPair, OneOrBox, OneOrMany, CssString, CssImage, ICursorFunc, IUrlFunc, TimingFunction, IStringProxy
} from "./CoreTypes"
import {
    CssNumber, CssPosition, CssTime, CssLength, CssAngle, CssPercent, HorizontalPositionKeyword,
    VerticalPositionKeyword, IFitContentProxy, ILengthProxy, CssAspectRatio, CssLengthOrAuto,
    AngleUnits, FrequencyUnits, LengthUnits, PercentUnits, ResolutionUnits, TimeUnits
} from "./NumericTypes"
import {CssColor, CssNonNumericColor} from "./ColorTypes";
import {FontStretchKeyword, FontStyle, FontWeight, SystemFont} from "./FontTypes";
import {
    BasicShape, IMinMaxFunc, IRepeatFunc, IGridSpanFunc, FilterFuncs,
    IRayFunc, TransformFuncs
} from "./ShapeTypes";
import {
    IVarRule, IKeyframesRule, ICounterRule, IIDRule, IGridLineRule, IGridAreaRule, ICounterStyleRule
} from "./RuleTypes";
import {IStyleset} from "./Stylesets";
import { IPageNameRule } from "..";



/**
 * Type representing keywords used to define a type used in the CSS `attr()` function.
 */
 export type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" |
    "angle" | "time" | "frequency";

 /**
  * Type representing keywords used to define a unit used in the CSS `attr()` function.
  */
 export type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS style property types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Keywords used for the [[alignContent]] style property.
 */
export type AlignContentKeywords = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
    "space-between" | "space-around" | "space-evenly";



/**
 * Keywords used for the [[alignItems]] style property
 */
export type AlignItemsKeywords = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center";



/**
 * Keywords used for the [[alignSelf]] style property
 */
export type AlignSelfKeywords = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
    "safe center" | "unsafe center";



/**
 * Keywords used for the [[alignmentBaseline]] style property
 */
export type AlignmentBaselineKeywords = "auto" | "baseline" | "before-edge" | "text-before-edge" |
    "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
    "hanging" | "mathematical" | "top" | "center" | "bottom";



/**
 * Type for single animation. Used by [[Animation_StyleType]] style property.
 */
export type Animation_Single =
    {
        name?: Extended<AnimationName_Single>;
        duration?: Extended<CssTime>;
        func?: Extended<TimingFunction>;
        delay?: Extended<CssTime>;
        count?: Extended<AnimationIterationCount_Single>;
        direction?: Extended<AnimationDirectionKeywords>;
        mode?: Extended<AnimationFillModeKeywords>;
        state?: Extended<AnimationPlayStateKeywords>;
    };

/**
 * Type for [[animation]] style property
 */
export type Animation_StyleType = OneOrMany<string | Animation_Single>;



/**
 * Keywords used for the [[animationDirection]] style property.
 */
export type AnimationDirectionKeywords = "normal" | "reverse" | "alternate" | "alternate-reverse";


/**
 * Keywords used for the [[animationFillMode]] style property
 */
export type AnimationFillModeKeywords = "none" | "forwards" | "backwards" | "both";



/**
 * Type for [[animationIterationCount]] style property
 */
export type AnimationIterationCount_Single = "infinite" | CssNumber;



/**
 * Type for [[animationName]] style property
 */
export type AnimationName_Single = "none" | string | IKeyframesRule;



/**
 * Keywords used for the [[animationPlayState]] style property
 */
export type AnimationPlayStateKeywords = "paused" | "running";



/**
 * Keywords used for the [[appearance]] style property
 */
export type AppearanceKeywords = "none" | "auto" | "textfield" | "menulist-button";



/**
 * Type for [[aspectRatio]] style property
 */
export type AspectRatio_StyleType = CssAspectRatio | "auto";



/**
 * Keywords used for the [[backfaceVisibilityMode]] style property
 */
export type BackfaceVisibilityModeKeywords = "visible" | "hidden";



/**
 * Type for single background value
 */
export type Background_Single = string | CssColor | CssImage |
    {
        color?: Extended<CssColor>,
        image?: Extended<CssImage>,
        position?: Extended<CssPosition>,
        size?: Extended<BackgroundSize>,
        repeat?: Extended<BackgroundRepeat>,
        attachment?: Extended<BackgroundAttachmentKeywords>,
        origin?: Extended<BackgroundOriginKeywords>,
        clip?: Extended<BackgroundClipKeywords>,
    };

/**
 * Type for [[background]] style property
 */
export type Background_StyleType = OneOrMany<Background_Single>;



/**
 * Keywords used for the [[backgroundAttachment]] style property
 */
export type BackgroundAttachmentKeywords = "scroll" | "fixed" | "local";



/**
 *Keywords used for the [[backgroundBlendMode]] and [[mixBlendMode]] properties
 *
 */
export type BlendModeKeywords = "normal" | "multiply" | "screen" | "overlay" | "darken" |
    "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" |
    "exclusion" | "hue" | "saturation" | "color" | "luminosity";



/**
 * Keywords used for the [[backgroundClip]] property
 *
 */
export type BackgroundClipKeywords = "border-box" | "padding-box" | "content-box" | "text";



/**
 * Type for [[backgroundImage]] style property
 */
export type BackgroundImage_StyleType = "none" | OneOrMany<CssImage>;



/**
 * Keywords used for the [[backgroundOrigin]] property
 *
 */
export type BackgroundOriginKeywords = "border-box" | "padding-box" | "content-box" | "text";



/**
 * Keywords for single background repeat
 */
export type BackgroundRepeatKeywords = "repeat" | "space" | "round" | "no-repeat";

/**
 * Keywords for axis-specific background repeat
 */
export type BackgroundRepeatAxisKeywords = "repeat-x" | "repeat-y";

/**
 * Type for single background repeat
 *
 */
export type BackgroundRepeat = BackgroundRepeatAxisKeywords | OneOrPair<BackgroundRepeatKeywords>;

/**
 * Type for [[backgroundRepeat]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
 *
 */
export type BackgroundRepeat_StyleType = OneOrMany<BackgroundRepeat>;



/**
 * Type for background size
 *
 */
export type BackgroundSize = "cover" | "contain" | OneOrPair<CssLengthOrAuto>;

/**
 * Type for [[backgroundSize]] style property. The background-size style can specify one or more
 * comma-separated sizes, where each size can be a keyword, a length or two lengths. We model
 * this structure the following way:
 * - if the value is a string or a number, that's the only value;
 * - if the value is an array, then it is a list of several sizes. Each element in this array is
 *   either a keyword or a length or an array of two elements.
 * Thus [100,200] will be interpreted as "100px, 200px" and not "100px 200px"; that is, it will
 * define two sizes each with a width instead of one size with both width and height. If you need
 * to specify both width and height you must use array within array - even for a single size:
 * [[100,200]] will be interpreted as "100px 200px".
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
 *
 */
export type BackgroundSize_StyleType = OneOrMany<BackgroundSize>;



/**
 * Type for [[baselineShift]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
 *
 */
export type BaselineShift_StyleType = "sub" | "super" | CssLength;



/**
 * Type for [[borderCollapse]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse
 *
 */
export type BorderColapse_StyleType = "collapse" | "separate";



/**
 * Type for [[borderColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
 *
 */
export type BorderColor_StyleType = OneOrBox<CssColor>;



/**
 * Type for border-image style property expressed as an object.
 *
 */
export type BorderImage_Object =
    {
        source: Extended<BorderImageSource_StyleType>,
        slice?: Extended<BorderImageSlice_StyleType>,
        width?: Extended<BorderImageWidth_StyleType>,
        outset?: Extended<BorderImageOutset_StyleType>,
        repeat?: Extended<BorderImageRepeat_StyleType>,
    };

/**
 * Type for [[borderImage]] style property.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image
 *
 */
export type BorderImage_StyleType = CssImage | BorderImage_Object | string;

/**
 * Type for [[borderImageOutset]] style property. It is CssNumber and not CssLength because
 * border-image-outset can be specified as a unitless number.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset
 *
 */
export type BorderImageOutset_StyleType = OneOrBox<CssNumber | ILengthProxy>;

/**
 * Type for border-image-repeat keywords
 *
 */
export type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space";

/**
 * Type for [[borderImageRepeat]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat
 *
 */
export type BorderImageRepeat_StyleType = OneOrPair<BorderImageRepeatKeyword>;

/**
 * Type for [[borderImageSlice]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice
 *
 * Note: numeric values are treated as is - without appending the percent sign to them.
 *
 */
export type BorderImageSlice_StyleType = OneOrBox<CssPercent | "fill"> |
    [Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, "fill"];

/**
 * Type for [[borderImageSource]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
 *
 */
export type BorderImageSource_StyleType = CssImage | "none";

/**
 * Type for [[borderImageWidth]] style property. It is CssNumber and not CssLength because
 * border-image-width can be specified as a unitless number.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width
 *
 */
export type BorderImageWidth_StyleType = OneOrBox<CssNumber | ILengthProxy | "auto">;



/**
 * Type for [[borderSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
 *
 */
export type BorderSpacing_StyleType = OneOrPair<CssLength>;



/**
 * Type for single border side style property
 *
 */
export type BorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
    "groove" | "ridge" | "inset" | "outset";



/**
 * Type for [[borderStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
 *
 */
export type BorderStyle_StyleType = OneOrBox<BorderStyle>;



/**
 * Type for [[border]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border
 *
 */
export type Border_StyleType = LineWidth | BorderStyle | CssNonNumericColor |
    [Extended<LineWidth>, Extended<BorderStyle>, Extended<CssColor>?] |
    [Extended<LineWidth>, Extended<CssColor>, Extended<BorderStyle>?] |
    [Extended<BorderStyle>, Extended<LineWidth>, Extended<CssColor>?] |
    [Extended<BorderStyle>, Extended<CssColor>, Extended<LineWidth>?] |
    [Extended<CssNonNumericColor>, Extended<LineWidth>, Extended<BorderStyle>?] |
    [Extended<CssNonNumericColor>, Extended<BorderStyle>, Extended<LineWidth>?];



/**
 * Type used for several style properties that allow defining line width as a `<length>` CSS
 * type as well as keywords such as `thin` and `thick`. For example, see the [[borderWidth]]
 * property.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
 *
 */
export type LineWidth = "thin" | "medium" | "thick" | CssLength;




/**
 * Type for [[boxDecorationBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
 *
 */
export type BoxDecorationBreak_StyleType = "slice" | "clone";



/**
 * Type for single box shadow.
 *
 */
export type BoxShadow_Single = "none" |
    {
        x: Extended<CssLength>,
        y: Extended<CssLength>,
        blur?: Extended<CssLength>,
        spread?: Extended<CssLength>,
        color?: Extended<CssColor>,
        inset?: Extended<boolean>
    };

/**
 * Type for [[boxShadow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
 *
 */
export type BoxShadow_StyleType = OneOrMany<string | BoxShadow_Single>;



/**
 * Type for [[boxSizing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
 *
 */
export type BoxSizing_StyleType = "content-box" | "border-box";



/**
 * Type for [[breakAfter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
 *
 */
export type BreakAfter_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/**
 * Type for [[breakBefore]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-before
 *
 */
export type BreakBefore_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/**
 * Type for [[breakInside]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside
 *
 */
export type BreakInside_StyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";



/**
 * Type for [[captionSide]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side
 *
 */
export type CaptionSide_StyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end";



/**
 * Type for [[caretColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color
 *
 */
export type CaretColor_StyleType = "auto" | CssColor;



/**
 * Type for [[clear]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
 *
 */
export type Clear_StyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end";



/**
 * Type representing the boundaries of a box
 *
 */
 export type GeometryBoxKeyword = "margin-box" | "border-box" | "padding-box" | "content-box" |
    "fill-box" | "stroke-box" | "view-box";

/**
 * Type for [[clipPath]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-pat
 *
 */
export type ClipPath_StyleType = "none" | IUrlFunc | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/**
 * Type for [[clipRule]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-rule
 *
 */
export type ClipRule_StyleType = "nonzero" | "evenodd";



/**
 * Type for [[colorAdjust]] and color-adjust style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-adjust
 *
 */
export type ColorAdjust_StyleType = "economy" | "exact";



/**
 * Type for [[colorInterpolation]] and color-interpolation-filters style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation
 *
 */
export type ColorInterpolation_StyleType = "auto" | "sRGB" | "linearRGB";



/**
 * Type for [[colorScheme]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-count
 *
 */
export type ColorScheme_StyleType = "normal" | OneOrMany<"light" | "dark" | string>;



/**
 * Type for [[columnCount]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
 *
 */
export type ColumnCount_StyleType = "auto" | CssNumber;



/**
 * Type for [[columnFill]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
 *
 */
export type ColumnFill_StyleType = "auto" | "balance" | "balance-all";



/**
 * Type for [[columnGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
 *
 */
export type ColumnGap_StyleType = "normal" | CssLength;



/**
 * Type for [[columnSpan]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
 *
 */
export type ColumnSpan_StyleType = "none" | "all";



/**
 * Type for [[columns]] style property. The value can be provided in one of the following forms and
 * and will be converted to string as follows:
 *
 * - number: will be converted to a unitless number - count of columns.
 * - ILengthProxy (e.g. px(8)): converted to a number with the proper length units.
 * - two variants of two element arrays: one of the elements will be treated as a number of columns
 *   while another as the column width.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/columns
 *
 */
export type Columns_StyleType = "auto" | CssNumber | Exclude<CssLength,number> |
    ["auto" | Extended<CssNumber>, "auto" | Extended<Exclude<CssLength,number>>] |
    ["auto" | Extended<Exclude<CssLength,number>>, "auto" | Extended<CssNumber>];
// Note that no special coversion function is required for this property because the number type will
// always be converted to a unitless number



/**
 * Keywords that can be combined in the [[IStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 *
 */
export type ContainAtomKeyword = "size" | "layout" | "style" | "paint";

/**
 * Keywords that can be only used as a sole value of the [[IStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 *
 */
export type ContainSoleKeyword = "none" | "strict" | "content";

/**
 * Type for [[IStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 *
 */
export type Contain_StyleType = ContainSoleKeyword | OneOrMany<ContainAtomKeyword>[];



/**
 * Type for [[content]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
 *
 */
export type ContentItem = "open-quote" | "close-quote" | "no-open-quote" | "no-close-quote" |
    CssString | CssImage;

/**
 * Type for [[content]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
 *
 */
export type Content_StyleType = string | "none" | "normal" | OneOrMany<ContentItem>;



/**
 * Type for [[contentVisibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
 *
 */
export type ContentVisibility_StyleType = "auto" | "visible" | "hidden";



/**
 * Type for [[counterIncrement]], [[counterReset]] and [[counterSet]] style properties
 *
 */
export type CssCounter = ICounterRule | "page" | "pages" | IStringProxy;

/**
 * Type for [[counterIncrement]], [[counterReset]] and [[counterSet]] style properties
 *
 */
export type Counter_StyleType = "none" | OneOrMany<CssCounter | [Extended<CssCounter>, Extended<number>]>;



/**
 * Type for cursor pre-defined names
 *
 */
export type CursorKeyword = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" |
    "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" |
    "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" |
    "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" |
    "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" |
    "zoom-out" | "grab" | "grabbing";

/**
 * Type for [[IStyleset.cursor|cursor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
 *
 */
export type Cursor_StyleType = OneOrMany<CursorKeyword | IUrlFunc | ICursorFunc>;



/**
 * Type for [[display]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
 *
 */
export type Display_StyleType = "block" | "inline" | "run-in" | "contents" | "none" |
    "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" |
    "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" |
    "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" |
        "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" |
        "ruby-base-container" | "ruby-text-container" |
    "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" |
        "list-item block flow" | "list-item block flow-root" | "flow list-item block";



/**
 * Type for [[dominantBaseline]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/dominant-baseline
 *
 */
export type DominantBaseline_StyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
    "central" | "mathematical" | "hanging" | "text-top";



/**
 * Type for [[emptyCells]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
 *
 */
export type EmptyCells_StyleType = "show" | "hide";



/**
 * Type for [[filter]] and [[backdropFilter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
 *
 */
export type Filter_StyleType = "none" | OneOrMany<IUrlFunc | FilterFuncs>;



/**
 * Type for [[flex]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
 *
 */
export type Flex_StyleType = FlexBasis_StyleType |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<FlexBasis_StyleType>];



/**
 * Type for [[flexBasis]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
 *
 */
export type FlexBasis_StyleType = CssLengthOrAuto | "content" | "fill" | "max-content" | "min-content" | "fit-content";



/**
 * Type for [[flexDirection]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
 *
 */
export type FlexDirection_StyleType = "row" | "row-reverse" | "column" | "column-reverse";



/**
 * Type for [[flexFlow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow
 *
 */
export type FlexFlow_StyleType = FlexDirection_StyleType | FlexWrap_StyleType |
    [Extended<FlexDirection_StyleType>, Extended<FlexWrap_StyleType>];



/**
 * Type for [[flexWrap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
 *
 */
export type FlexWrap_StyleType = "nowrap" | "wrap" | "wrap-reverse";



/**
 * Type for [[float]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/float
 *
 */
export type Float_StyleType = "left" | "right" | "none" | "inline-start" | "inline-end";



/**
 * Type for [[font]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font
 *
 */
export type Font_StyleType = SystemFont | [string, CssLength] | [CssLength, string] |
    {
        family: Extended<string>;
        size: Extended<CssLength>;
        style?: Extended<FontStyle>;
        variant?: Extended<string>;
        weight?: Extended<FontWeight_StyleType>;
        stretch?: Extended<FontStretchKeyword>;
        lineHeight?: Extended<CssNumber>
    };



/**
 * Type for [[fontWeight]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 *
 */
export type FontWeight_StyleType = FontWeight | "bolder" | "lighter";



/**
 * Type for [[forcedColorAdjust]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust
 *
 */
export type ForcedColorAdjust_StyleType = "auto" | "none";



/**
 * Type for [[gap]] or [[gridGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
 *
 */
export type Gap_StyleType = RowGap_StyleType | [RowGap_StyleType, ColumnGap_StyleType];



/**
 * Type for [[gridAutoColumns]] and [[gridAutoRows]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
 *
 */
export type GridAutoAxis_StyleType = OneOrMany<GridTrackSize>;



/**
 * Type for [[gridAutoFlow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
 *
 */
export type GridAutoFlow_StyleType = "row" | "column" | "dense" | "row dense" | "column dense";



/**
 * Type for specifying either number of grid lines or name of grid line or area. This type is used
 * when defining grid-column-start/end and grid-row-start/end style properties.
 *
 */
export type GridLineCountOrName = CssNumber | IGridAreaRule | IGridLineRule;

/**
 * Type for [[gridColumnStart]], [[gridColumnEnd]], [[gridRowStart]] and [[gridRowEnd]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
 *
 */
export type GridAxisSide_StyleType = "auto" | GridLineCountOrName | IGridSpanFunc |
    [Extended<CssNumber>, IGridAreaRule | IGridLineRule];



/**
 * Type for [[gridColumn]] and [[gridRow]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
 *
 */
export type GridAxis_StyleType = OneOrPair<GridAxisSide_StyleType>;



/**
 * Type for [[gridArea]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
 *
 */
export type GridArea_StyleType = OneOrBox<GridAxisSide_StyleType>;



/**
 * Type for defining a single grid area position. The numbers are 1-based indices of the lines in
 * the following sequence: block start, inline start, block end, inline end.
 *
 */
export type GridTemplateAreaDefinition = [IGridAreaRule | Extended<string>,
    number, number, number, number];

/**
 * Type for [[gridTemplateAreas]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
 *
 */
export type GridTemplateAreas_StyleType = "none" | string[] | GridTemplateAreaDefinition[];



/**
 * Type for [[gridTemplateColumns]] and [[gridTemplateRows]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
 *
 */
export type GridTemplateAxis_StyleType = "none" | OneOrMany<GridTrack> | "subgrid";

/**
 * Type for a single track element of grid template axis
 *
 */
export type GridTrack = GridTrackSize | GridTrackLine;

/**
 * Type for a single template element defining name or names for a grid line in grid template.
 * This is always an array - even if a single name is given.
 *
 */
export type GridTrackLine = (IGridLineRule | Extended<string>)[];

/**
 * Type for a single template element defining track size in grid template
 *
 */
export type GridTrackSize = CssLengthOrAuto | "min-content" | "max-content" |
    IFitContentProxy | IMinMaxFunc | IRepeatFunc;



/**
 * Type for [[hyphens]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
 *
 */
export type Hyphens_StyleType = "none" | "manual" | "auto";



/**
 * Type for [[imageOrientation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation
 *
 */
export type ImageOrientation_StyleType = "none" | "from-image";



/**
 * Type for [[imageRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
 *
 */
export type ImageRendering_StyleType = "auto" | "crisp-edges" | "pixelated";



/**
 * Type for [[initialLetter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter
 *
 */
export type InitialLetter_StyleType = OneOrPair<CssNumber>;



/**
 * Type for [[isolation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/isolation
 *
 */
export type Isolation_StyleType = "auto" | "isolate";



/**
 * Type for [[justifyContent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 *
 */
export type JustifyContent_StyleType = "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" |
    "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/**
 * Type for [[justifyItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
 *
 */
export type JustifyItems_StyleType = "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right" |
    "legacy" | "legacy left" | "legacy right" | "legacy center";



/**
 * Type for [[justifySelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
 *
 */
export type JustifySelf_StyleType = "auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/**
 * Type for [[letterSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
 *
 */
export type LetterSpacing_StyleType = "normal" | CssLength;



/**
 * Type for [[lineBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
 *
 */
export type LineBreak_StyleType = "auto" | "loose" | "normal" | "strict" | "anywhere";



/**
 * Type for [[lineClamp]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp
 *
 */
export type LineClamp_StyleType = "none" | CssNumber | [Extended<CssNumber>, Extended<string>];



/**
 * Type for [[IStyleset.lineHeight|lineHeight]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 *
 */
export type LineHeight_StyleType = CssNumber | ILengthProxy;



/**
 * Type for [[listStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
 *
 */
export type ListStyle_StyleType = ListStyleType_StyleType | ListStylePosition_StyleType | ListStyleImage_StyleType |
    [Extended<ListStyleImage_StyleType>, Extended<ListStylePosition_StyleType>] |
    [Extended<ListStyleImage_StyleType>, Extended<ListStyleType_StyleType>?] |
    [Extended<ListStyleType_StyleType>, Extended<ListStylePosition_StyleType>] |
    [Extended<ListStyleImage_StyleType>, Extended<ListStylePosition_StyleType>, Extended<ListStyleType_StyleType>?];



/**
 * Type for [[listStyleImage]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image
 *
 */
export type ListStyleImage_StyleType = "none" | IUrlFunc;



/**
 * Type for [[listStylePosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
 *
 */
export type ListStylePosition_StyleType = "inside" | "outside";



/**
 * Type for [[listStyleType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
 *
 */
export type ListStyleType_StyleType = ICounterStyleRule |
    "none" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" |
    "cjk-decimal" | "cjk-earthly-branch" | "cjk-heavenly-stem" | "cjk-ideographic" |
    "lower-roman" | "upper-roman" | "lower-greek" | "lower-alpha" | "lower-latin" | "upper-alpha" | "upper-latin" |
    "arabic-indic" | "armenian" | "bengali" | "cambodian" | "devanagari" | "georgian" | "gujarati" | "gurmukhi" | "hebrew" |
    "hiragana" | "hiragana-iroha" | "japanese-formal" | "japanese-informal" | "kannada" | "katakana" | "katakana-iroha" |
    "khmer" | "korean-hangul-formal" | "korean-hanja-formal" | "korean-hanja-informal" | "lao" | "lower-armenian" |
    "malayalam" | "mongolian" | "myanmar" | "oriya" | "persian" | "simp-chinese-formal" | "simp-chinese-informal" |
    "tamil" | "telugu" | "thai" | "tibetan" | "trad-chinese-formal" | "trad-chinese-informal" | "upper-armenian" |
    "disclosure-open" | "disclosure-closed";



/**
 * Type for the [[marginTrim]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim
 *
 */
export type MarginTrim_StyleType = "none" | "in-flow" | "all";



/**
 * Type for the [[markerStart]], [[markerMid]] and [[markerEnd]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
 *
 */
export type Marker_StyleType = "none" | IIDRule;



/**
 * Type for the [[marks]] style property for the `@page` at-rule
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
 *
 */
export type Marks_StyleType = "none" | "crop" | "cross" | "crop cross" | "cross crop" |
    ["crop", "cross"?] | ["cross", "crop"?];



/**
 * Type for the [[maskBorder]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border
 *
 */
export type MaskBorder_Object =
    {
        source: Extended<BorderImageSource_StyleType>,
        slice?: Extended<BorderImageSlice_StyleType>,
        width?: Extended<BorderImageWidth_StyleType>,
        outset?: Extended<BorderImageOutset_StyleType>,
        repeat?: Extended<BorderImageRepeat_StyleType>,
        mode?: Extended<MaskBorderMode_StyleType>,
    };

/**
 * Type for [[maskBorder]] style property.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border
 *
 */
export type MaskBorder_StyleType = CssImage | MaskBorder_Object | string;

/**
 * Type for [[maskBorderMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-mode
 *
 */
export type MaskBorderMode_StyleType = "luminance" | "alpha";



/**
 * Type for the [[maskComposite]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite
 *
 */
export type MaskCompositeKeyword = "add" | "subtract" | "intersect" | "exclude";



/**
 * Type for the [[maskMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode
 *
 */
export type MaskModeKeyword = "alpha" | "luminance" | "match-source";



/**
 * Type for the [[maskType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type
 *
 */
export type MaskTypeKeyword = "alpha" | "luminance";



/**
 * Type for the [[mathStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/math-style
 *
 */
export type MathStyle_StyleType = "normal" | "compact";



/**
 * Type for the [[objectFit]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 *
 */
export type ObjectFit_StyleType = "fill" | "contain" | "cover" | "none" | "scale-down";



/**
 * Type for the [[offset]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset
 *
 */
export type Offset_StyleType = OffsetPath_StyleType |
    {
        anchor?: OffsetAnchor_StyleType,
        distance?: CssLength,
        path?: OffsetPath_StyleType,
        position?: CssPosition,
        rotate?: OffsetRotate_StyleType,
    }



/**
 * Type for the [[offsetAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-anchor
 *
 */
export type OffsetAnchor_StyleType = "auto" | CssPosition;



/**
 * Type for [[offsetPath]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
 *
 */
export type OffsetPath_StyleType = "none" | IRayFunc | IUrlFunc | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/**
 * Type for [[offsetPosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position
 */
export type OffsetPosition_StyleType = "auto" | CssPosition;



/**
 * Type for the [[offsetRotate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate
 *
 */
export type OffsetRotate_StyleType = "auto" | "reverse" | CssAngle | ["auto" | "reverse", CssAngle];



/**
 * Type for the overflow-x/y style property
 *
 */
export type OverflowKeyword = "visible" | "hidden" | "clip" | "scroll" | "auto";

/**
 * Type for the [[overflow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 *
 */
export type Overflow_StyleType = OneOrPair<OverflowKeyword>;



/**
 * Type for the [[overflowAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
 *
 */
export type OverflowAnchor_StyleType = "auto" | "none";



/**
 * Type for the [[overflowClipMargin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin
 *
 */
export type OverflowClipMargin_StyleType = CssLength | "border-box" | "padding-box" | "content-box";



/**
 * Type for the [[overflowWrap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
 *
 */
export type OverflowWrap_StyleType = "normal" | "break-word" | "anywhere";



/**
 * Type for the [[overscrollBehaviorX]] and [[overscrollBehaviorY]] style property
 *
 */
export type OverscrollBehavior = "contain" | "none" | "auto";

/**
 * Type for the [[overscrollBehavior]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
 *
 */
export type OverscrollBehavior_StyleType = OneOrPair<OverscrollBehavior>;



/**
 * Keywords for page sizes
 */
export type PageSizeKeyword = "A5" | "A4" | "A3" | "B5" | "B4" | "JIS-B5" | "JIS-B4" |
    "letter" | "legal" | "ledger";

/**
 * Keywords for page orientations
 */
export type PageOrientation = "portrait" | "landscape";

/**
 * Type for the [[size]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size
 *
 */
export type Size_StyleType = "auto" | OneOrPair<CssLength> |
    PageSizeKeyword | PageOrientation | [PageSizeKeyword, PageOrientation];



/**
 * Type for the [[page]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page
 *
 */
export type Page_StyleType = "auto" | IPageNameRule | string;



/**
 * Type for the paint-order style property
 *
 */
export type PaintOrderKeyword = "fill" | "stroke" | "markers";

/**
 * Type for the [[paintOrder]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
 *
 */
export type PaintOrder_StyleType = "normal" | PaintOrderKeyword |
    [PaintOrderKeyword, PaintOrderKeyword?, PaintOrderKeyword?];



/**
 * Type for the [[perspective]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
 *
 */
export type Perspective_StyleType = "none" | CssLength;



/**
 * Type for the [[perspectiveOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
 *
 */
export type PerspectiveOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>];



/**
 * Type for the [[placeContent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
 *
 */
export type PlaceContent_StyleType = AlignContentKeywords | [Extended<AlignContentKeywords>, Extended<JustifyContent_StyleType>];



/**
 * Type for the [[placeItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
 *
 */
export type PlaceItems_StyleType = AlignItemsKeywords | [Extended<AlignItemsKeywords>, Extended<JustifyItems_StyleType>];



/**
 * Type for the [[placeSelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self
 *
 */
export type PlaceSelf_StyleType = AlignSelfKeywords | [Extended<AlignSelfKeywords>, Extended<JustifySelf_StyleType>];



/**
 * Type for the [[pointerEvents]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
 *
 */
export type PointerEvents_StyleType = "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" |
    "painted" | "fill" | "stroke" | "all";



/**
 * Type for the [[IStyleset.position|position]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
 *
 */
export type Position_StyleType = "static" | "relative" | "absolute" | "sticky" | "fixed";



/**
 * Type for the [[quotes]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes
 *
 */
export type Quotes_StyleType = "none" | "auto" | OneOrMany<[Extended<CssString>,Extended<CssString>]>;



/**
 * Type for the [[resize]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
 *
 */
export type Resize_StyleType = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";



/**
 * Type for [[IStyleset.rotate|rotate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
 *
 */
export type Rotate_StyleType = "none" | CssAngle | ["x" | "y" | "z", Extended<CssAngle>] |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<CssNumber>, Extended<CssAngle>];



/**
 * Type for [[rowGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
 *
 */
export type RowGap_StyleType = CssLength;



/**
 * Type for the [[IStyleset.scale|scale]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
 *
 */
export type Scale_StyleType = "none" | CssNumber |
    [Extended<CssNumber>, Extended<CssNumber>?, Extended<CssNumber>?];



/**
 * Type for the [[scrollbarColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
 *
 */
export type ScrollbarColor_StyleType = "auto" | "dark" | "light" |
    [Extended<CssColor>, Extended<CssColor>];



/**
 * Type for the [[scrollbarGutter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
 *
 */
export type ScrollbarGutter_StyleType = "auto" | "stable" | "stable both-edges";



/**
 * Type for the [[scrollbarWidth]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
 *
 */
export type ScrollbarWidth_StyleType = "auto" | "thin" | "none";



/**
 * Type for the [[scrollBehavior]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
 *
 */
export type ScrollBehavior_StyleType = "auto" | "smooth";



/**
 * Type for the [[scrollSnapAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
 *
 */
export type ScrollSnapAlign_StyleType = OneOrPair<"none" | "start" | "end" | "center">;



/**
 * Type for the [[scrollSnapStop]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
 *
 */
export type ScrollSnapStop_StyleType = "normal" | "always";



/**
 * Type for the [[scrollSnapType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
 *
 */
export type ScrollSnapType_StyleType = "none" |
    [Extended<"x" | "y" | "block" | "inline" | "both">, Extended<"mandatory" | "proximity">];



/**
 * Type for [[shapeOutside]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
 *
 */
export type ShapeOutside_StyleType = IUrlFunc | BasicShape | GeometryBoxKeyword | CssImage;



/**
 * Type for the [[shapeRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering
 *
 */
export type ShapeRendering_StyleType = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";



/**
 * Type for the [[tabSize]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size
 *
 */
export type TabSize_StyleType = CssNumber | ILengthProxy;

/**
 * Type for the [[tableLayout]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
 *
 */
export type TableLayout_StyleType = "auto" | "fixed";



/**
 * Type for the [[textAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
 *
 */
export type TextAlign_StyleType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";



/**
 * Type for the [[textAlignLast]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
 *
 */
export type TextAlignLast_StyleType = "auto" | "start" | "end" | "left" | "right" | "center" | "justify";



/**
 * Type for the [[textAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor
 *
 */
export type TextAnchor_StyleType = "start" | "middle" | "end";



/**
 * Type for the [[textCombineUpright]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright
 *
 */
export type TextCombineUpright_StyleType = "none" | "all" | "digits" | number;



/**
 * Type for the [[textDecoration]] style property. If a number is specified, it will be interpreted
 * as color - not as thickness.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
 *
 */
export type TextDecoration_StyleType = TextDecorationLine_StyleType | TextDecorationStyle_StyleType |
    CssColor | TextDecorationThickness_StyleType |
    {
        line?: Extended<TextDecorationLine_StyleType>,
        style?: Extended<TextDecorationStyle_StyleType>,
        color?: Extended<CssColor>,
        thickness?: Extended<TextDecorationThickness_StyleType>,
    };



/**
 * Type for the [[textDecorationLine]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line
 *
 */
export type TextDecorationLine_StyleType = "none" | "spelling-error" | "grammar-error" |
    OneOrMany<"underline" | "overline" | "line-through">;



/**
 * Type for the [[textDecorationStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style
 *
 */
export type TextDecorationStyle_StyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";



/**
 * Type for the [[textDecorationSkipInk]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
 *
 */
export type TextDecorationSkipInk_StyleType = "none" | "auto" | "all";



/**
 * Type for the [[textDecorationThickness]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness
 *
 */
export type TextDecorationThickness_StyleType = "from-font" | CssLengthOrAuto;



/**
 * Type for the [[textEmphasis]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis
 *
 */
export type TextEmphasis_StyleType = TextEmphasisStyle_StyleType | CssColor |
    [Extended<TextEmphasisStyle_StyleType>, Extended<CssColor>];



/**
 * Type for the [[textEmphasisPosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
 *
 */
export type TextEmphasisPosition_StyleType = "over left" | "over right" | "under left" | "under right";



/**
 * Shape for the text-emphasis-style style property
 *
 */
export type TextEmphasisShape = "dot" | "circle" | "double-circle" | "triangle" | "sesame" | string;

/**
 * Fill option for the text-emphasis-style style property
 *
 */
export type TextEmphasisFill = "filled" | "open";

/**
 * Type for the [[textEmphasisStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style
 *
 */
export type TextEmphasisStyle_StyleType = "none" | TextEmphasisFill | TextEmphasisShape |
    [Extended<TextEmphasisFill>, Extended<TextEmphasisShape>];



/**
 * Type for the [[textIndent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-inden
 *
 */
export type TextIndent_StyleType = CssLength |
    [Extended<CssLength>, OneOrMany<"each-line" | "hanging" | "each-line hanging">];



/**
 * Type for the [[textJustify]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
 *
 */
export type TextJustify_StyleType = "auto" | "inter-character" | "inter-word" | "none";



/**
 * Type for the [[textOrientation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
 *
 */
export type TextOrientation_StyleType = "mixed" | "upright" | "sideways";



/**
 * Type for the [[textOverflow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
 *
 */
export type TextOverflow_StyleType = OneOrPair<"clip" | "ellipsis" | "fade" | string>;



/**
 * Type for the [[textRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
 *
 */
export type TextRendering_StyleType = "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";



/**
 * Type for the single value of the tex"t-shadow style property
 *
 */
export type TextShadow = "none" |
    {
        x: Extended<CssLength>,
        y: Extended<CssLength>,
        blur?: Extended<CssLength>,
        color?: Extended<CssColor>,
    };

/**
 * Type for the [[textShadow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
 *
 */
export type TextShadow_StyleType = OneOrMany<TextShadow>;



/**
 * Type for the [[textSizeAdjust]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust
 *
 */
export type TextSizeAdjust_StyleType = "none" | "auto" | CssPercent;



/**
 * Type for the [[textStroke]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke
 *
 */
export type TextStroke_StyleType = LineWidth | CssNonNumericColor |
    [Extended<LineWidth>, Extended<CssColor>] |
    [Extended<CssNonNumericColor>, LineWidth] |
    { width: Extended<LineWidth>, color: Extended<CssColor> };



/**
 * Type for the [[textTransform]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
 *
 */
export type TextTransform_StyleType = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";



/**
 * Type for the [[textUnderlinePosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position
 *
 */
export type TextUnderlinePosition_StyleType = "auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below";



/**
 * Type for the [[touchAction]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
 *
 */
export type TouchAction_StyleType = "auto" | "none" | "manipulation" |
    "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" | "pan-down" | "pinch-zoom" |
    ["pan-x" | "pan-left" | "pan-right",  "pan-y" | "pan-up" | "pan-down"] |
    ["pan-x" | "pan-left" | "pan-right",  "pinch-zoom"] |
    ["pan-y" | "pan-up" | "pan-down", "pinch-zoom"] |
    ["pan-x" | "pan-left" | "pan-right",  "pan-y" | "pan-up" | "pan-down", "pinch-zoom"];



/**
 * Type for [[transform]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 *
 */
export type Transform_StyleType = "none" | OneOrMany<TransformFuncs>;



/**
 * Type for [[transformBox]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box
 *
 */
export type TransformBox_StyleType = "content-box" | "border-box" | "fill-box" | "stroke-box" | "view-box";



/**
 * Type for [[transformOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
 *
 */
export type TransformOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>, Extended<CssLength>?];



/**
 * Type for [[transformStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
 *
 */
export type TransformStyle_StyleType = "flat" | "preserve-3d";



/**
 * Type for single transition
 *
 */
export type Transition_Single = string |
    {
        property?: Extended<TransitionProperty>;
        duration?: Extended<CssTime>;
        func?: Extended<TimingFunction>;
        delay?: Extended<CssTime>;
    };

/**
 * Type for [[transition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
 *
 */
export type Transition_StyleType = OneOrMany<Transition_Single>;



/**
 * Type for single [[transitionProperty]] style property
 *
 */
export type TransitionProperty = "none" | "all" | keyof IStyleset | IVarRule;

/**
 * Type for [[transitionProperty]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
 *
 */
export type TransitionProperty_StyleType = OneOrMany<TransitionProperty>;



/**
 * Type for the [[IStyleset.translate|translate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/translate
 *
 */
export type Translate_StyleType = "none" | CssLength |
    [Extended<CssLength>, Extended<CssLength>, Extended<CssLength>?];



/**
 * Type for the [[unicodeBidi]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
 *
 */
export type UnicodeBidi_StyleType = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";



/**
 * Type for the [[userSelect]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
 *
 */
export type UserSelect_StyleType = "auto" | "text" | "none" | "contain" | "all";



/**
 * Type for the [[verticalAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
 *
 */
export type VerticalAlign_StyleType = "baseline" | "sub" | "super" | "text-top" | "text-bottom" |
    "middle" | "top" | "bottom" | CssLength;



/**
 * Type for the [[visibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
 *
 */
export type Visibility_StyleType = "visible" | "hidden" | "collapse";



/**
 * Type for the [[vectorEffect]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
 *
 */
export type VectorEffect_StyleType = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";



/**
 * Type for the [[whiteSpace]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
 *
 */
export type WhiteSpace_StyleType = "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces";



/**
 * Type for [[willChange]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
 *
 */
export type WillChange_StyleType = "auto" | OneOrMany<"scroll-position" | "contents" | Exclude<keyof IStyleset,"willChange">>;



/**
 * Type for the [[wordBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
 *
 */
export type WordBreak_StyleType = "normal" | "break-all" | "keep-all" | "break-word";



/**
 * Type for the [[wordSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
 *
 */
export type WordSpacing_StyleType = "normal" | CssLength;



/**
 * Type for the [[writingMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
 *
 */
export type WritingMode_StyleType = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";



/**
 * Type for the [[zIndex]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
 *
 */
export type ZIndex_StyleType = "auto" | CssNumber;



/**
 * Type for the [[zoom]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/zoom
 *
 * @deprecated
 */
export type Zoom_StyleType = "normal" | "reset" | CssPercent;



/**
 * Type for style properties for which there is no special type defined.
 *
 */
export type DefaultStyleType = string;



