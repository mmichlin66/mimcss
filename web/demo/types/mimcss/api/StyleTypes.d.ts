import { Extended, OneOrPair, OneOrBox, OneOrMany, CssString, CssImage, ICursorFunc, IUrlFunc, TimingFunction, IStringProxy } from "./CoreTypes";
import { CssNumber, CssPosition, CssTime, CssLength, CssAngle, CssPercent, HorizontalPositionKeyword, VerticalPositionKeyword, IFitContentProxy, ILengthProxy, CssAspectRatio, CssLengthOrAuto, AngleUnits, FrequencyUnits, LengthUnits, PercentUnits, ResolutionUnits, TimeUnits } from "./NumericTypes";
import { CssColor, CssNonNumericColor } from "./ColorTypes";
import { FontStretchKeyword, FontStyle, FontWeight, SystemFont } from "./FontTypes";
import { BasicShape, IMinMaxFunc, IRepeatFunc, IGridSpanFunc, FilterFuncs, IRayFunc, TransformFuncs } from "./ShapeTypes";
import { IVarRule, IKeyframesRule, ICounterRule, IIDRule, IGridLineRule, IGridAreaRule, ICounterStyleRule, IScrollTimelineRule } from "./RuleTypes";
import { IStyleset } from "./Stylesets";
import { IPageNameRule } from "..";
/**
 * Type representing keywords used to define a type used in the CSS `attr()` function.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/attr" target="mdn">MDN Page</a>
 */
export declare type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" | "angle" | "time" | "frequency";
/**
 * Type representing keywords used to define a unit used in the CSS `attr()` function.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/attr" target="mdn">MDN Page</a>
 */
export declare type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;
/**
 * Keywords used for the [[alignContent]] style property.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-content" target="mdn">MDN Page</a>
 */
export declare type AlignContentKeywords = "normal" | "baseline" | "first baseline" | "last baseline" | "space-between" | "space-around" | "space-evenly" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" | "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";
/**
 * Keywords used for the [[alignItems]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items" target="mdn">MDN Page</a>
 */
export declare type AlignItemsKeywords = "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" | "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end";
/**
 * Keywords used for the [[alignSelf]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-self" target="mdn">MDN Page</a>
 */
export declare type AlignSelfKeywords = "auto" | AlignItemsKeywords;
/**
 * Keywords used for the [[alignmentBaseline]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/alignment-baseline" target="mdn">MDN Page</a>
 */
export declare type AlignmentBaselineKeywords = "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "top" | "center" | "bottom";
/**
 * Type for single animation. Used by [[Animation_StyleType]] style property.
 */
export declare type Animation_Single = {
    name?: Extended<AnimationName_Single>;
    duration?: Extended<CssTime>;
    func?: Extended<TimingFunction>;
    delay?: Extended<CssTime>;
    count?: Extended<AnimationIterationCount_Single>;
    direction?: Extended<AnimationDirectionKeywords>;
    mode?: Extended<AnimationFillModeKeywords>;
    state?: Extended<AnimationPlayStateKeywords>;
    timeline?: Extended<AnimationTimeline_Single>;
};
/**
 * Type for [[animation]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation" target="mdn">MDN Page</a>
 */
export declare type Animation_StyleType = OneOrMany<string | Animation_Single>;
/**
 * Keywords used for the [[animationDirection]] style property.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction" target="mdn">MDN Page</a>
 */
export declare type AnimationDirectionKeywords = "normal" | "reverse" | "alternate" | "alternate-reverse";
/**
 * Keywords used for the [[animationFillMode]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode" target="mdn">MDN Page</a>
 */
export declare type AnimationFillModeKeywords = "none" | "forwards" | "backwards" | "both";
/**
 * Type for [[animationIterationCount]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count" target="mdn">MDN Page</a>
 */
export declare type AnimationIterationCount_Single = "infinite" | CssNumber;
/**
 * Type for [[animationTimeline]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline" target="mdn">MDN Page</a>
 */
export declare type AnimationTimeline_Single = "none" | IScrollTimelineRule | string;
/**
 * Type for [[animationName]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name" target="mdn">MDN Page</a>
 */
export declare type AnimationName_Single = "none" | string | IKeyframesRule;
/**
 * Keywords used for the [[animationPlayState]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state" target="mdn">MDN Page</a>
 */
export declare type AnimationPlayStateKeywords = "paused" | "running";
/**
 * Keywords used for the [[appearance]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/appearance" target="mdn">MDN Page</a>
 */
export declare type AppearanceKeywords = "none" | "auto" | "textfield" | "menulist-button";
/**
 * Type for [[aspectRatio]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ration" target="mdn">MDN Page</a>
 */
export declare type AspectRatio_StyleType = CssAspectRatio | "auto";
/**
 * Keywords used for the [[backfaceVisibility]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility" target="mdn">MDN Page</a>
 */
export declare type BackfaceVisibilityKeywords = "visible" | "hidden";
/**
 * Type for single background value
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background" target="mdn">MDN Page</a>
 */
export declare type Background_Single = string | CssColor | CssImage | {
    color?: Extended<CssColor>;
    image?: Extended<CssImage>;
    position?: Extended<CssPosition>;
    size?: Extended<BackgroundSize>;
    repeat?: Extended<BackgroundRepeat>;
    attachment?: Extended<BackgroundAttachmentKeywords>;
    origin?: Extended<BackgroundOriginKeywords>;
    clip?: Extended<BackgroundClipKeywords>;
};
/**
 * Type for [[background]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background" target="mdn">MDN Page</a>
 */
export declare type Background_StyleType = OneOrMany<Background_Single>;
/**
 * Keywords used for the [[backgroundAttachment]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment" target="mdn">MDN Page</a>
 */
export declare type BackgroundAttachmentKeywords = "scroll" | "fixed" | "local";
/**
 *Keywords used for the [[backgroundBlendMode]] and [[mixBlendMode]] properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode" target="mdn">MDN Page</a>
 */
export declare type BlendModeKeywords = "normal" | "multiply" | "screen" | "overlay" | "darken" | "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" | "exclusion" | "hue" | "saturation" | "color" | "luminosity";
/**
 * Keywords used for the [[backgroundClip]] property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip" target="mdn">MDN Page</a>
 */
export declare type BackgroundClipKeywords = "border-box" | "padding-box" | "content-box" | "text";
/**
 * Type for [[backgroundImage]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-image" target="mdn">MDN Page</a>
 */
export declare type BackgroundImage_StyleType = "none" | OneOrMany<CssImage>;
/**
 * Keywords used for the [[backgroundOrigin]] property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin" target="mdn">MDN Page</a>
 */
export declare type BackgroundOriginKeywords = "border-box" | "padding-box" | "content-box" | "text";
/**
 * Keywords for single background repeat
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat" target="mdn">MDN Page</a>
 */
export declare type BackgroundRepeatKeywords = "repeat" | "space" | "round" | "no-repeat";
/**
 * Keywords for axis-specific background repeat
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat" target="mdn">MDN Page</a>
 */
export declare type BackgroundRepeatAxisKeywords = "repeat-x" | "repeat-y";
/**
 * Type for single background repeat
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat" target="mdn">MDN Page</a>
 */
export declare type BackgroundRepeat = BackgroundRepeatAxisKeywords | OneOrPair<BackgroundRepeatKeywords>;
/**
 * Type for [[backgroundRepeat]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat" target="mdn">MDN Page</a>
 */
export declare type BackgroundRepeat_StyleType = OneOrMany<BackgroundRepeat>;
/**
 * Type for background size
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-size" target="mdn">MDN Page</a>
 */
export declare type BackgroundSize = "cover" | "contain" | OneOrPair<CssLengthOrAuto>;
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
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-size" target="mdn">MDN Page</a>
 */
export declare type BackgroundSize_StyleType = OneOrMany<BackgroundSize>;
/**
 * Type for [[baselineShift]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift" target="mdn">MDN Page</a>
 */
export declare type BaselineShift_StyleType = "sub" | "super" | CssLength;
/**
 * Type for [[borderCollapse]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse" target="mdn">MDN Page</a>
 */
export declare type BorderCollapse_StyleType = "collapse" | "separate";
/**
 * Type for [[borderColor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-color" target="mdn">MDN Page</a>
 */
export declare type BorderColor_StyleType = OneOrBox<CssColor>;
/**
 * Type for border-image style property expressed as an object.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image" target="mdn">MDN Page</a>
 */
export declare type BorderImage_Object = {
    source: Extended<BorderImageSource_StyleType>;
    slice?: Extended<BorderImageSlice_StyleType>;
    width?: Extended<BorderImageWidth_StyleType>;
    outset?: Extended<BorderImageOutset_StyleType>;
    repeat?: Extended<BorderImageRepeat_StyleType>;
};
/**
 * Type for [[borderImage]] style property.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image" target="mdn">MDN Page</a>
 */
export declare type BorderImage_StyleType = CssImage | BorderImage_Object | string;
/**
 * Type for [[borderImageOutset]] style property. It is CssNumber and not CssLength because
 * border-image-outset can be specified as a unitless number.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset" target="mdn">MDN Page</a>
 */
export declare type BorderImageOutset_StyleType = OneOrBox<CssNumber | ILengthProxy>;
/**
 * Type for border-image-repeat keywords
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat" target="mdn">MDN Page</a>
 */
export declare type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space";
/**
 * Type for [[borderImageRepeat]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat" target="mdn">MDN Page</a>
 */
export declare type BorderImageRepeat_StyleType = OneOrPair<BorderImageRepeatKeyword>;
/**
 * Type for [[borderImageSlice]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice" target="mdn">MDN Page</a>
 *
 * Note: numeric values are treated as is - without appending the percent sign to them.
 */
export declare type BorderImageSlice_StyleType = OneOrBox<CssPercent | "fill"> | [
    Extended<CssPercent>,
    Extended<CssPercent>,
    Extended<CssPercent>,
    Extended<CssPercent>,
    "fill"
];
/**
 * Type for [[borderImageSource]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source" target="mdn">MDN Page</a>
 */
export declare type BorderImageSource_StyleType = CssImage | "none";
/**
 * Type for [[borderImageWidth]] style property. It is CssNumber and not CssLength because
 * border-image-width can be specified as a unitless number.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width" target="mdn">MDN Page</a>
 */
export declare type BorderImageWidth_StyleType = OneOrBox<CssNumber | ILengthProxy | "auto">;
/**
 * Type for [[borderSpacing]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing" target="mdn">MDN Page</a>
 */
export declare type BorderSpacing_StyleType = OneOrPair<CssLength>;
/**
 * Type for specifying [[border]] style property value as an object
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border" target="mdn">MDN Page</a>
 */
export declare type BorderObject = {
    width?: LineWidth;
    style?: BorderStyle;
    color?: CssColor;
};
/**
 * Type for specifying [[border]] style property as a tuple. The first number in the touple
 * is treated as line width, unless line width has already been specified as a keyword. That's
 * why only non-numeric color specification can preceed line width in a tuple.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border" target="mdn">MDN Page</a>
 */
export declare type BorderTuple = [
    Extended<LineWidth>,
    Extended<BorderStyle>,
    Extended<CssColor>?
] | [
    Extended<LineWidth>,
    Extended<CssColor>,
    Extended<BorderStyle>?
] | [
    Extended<BorderStyle>,
    Extended<LineWidth>,
    Extended<CssColor>?
] | [
    Extended<BorderStyle>,
    Extended<CssNonNumericColor>,
    Extended<LineWidth>?
] | [
    Extended<CssNonNumericColor>,
    Extended<LineWidth>,
    Extended<BorderStyle>?
] | [
    Extended<CssNonNumericColor>,
    Extended<BorderStyle>,
    Extended<LineWidth>?
];
/**
 * Type for [[border]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border" target="mdn">MDN Page</a>
 */
export declare type Border_StyleType = LineWidth | BorderStyle | CssNonNumericColor | BorderTuple | BorderObject;
/**
 * Border style keywords
 */
export declare type BorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
/**
 * Type for [[borderStyle]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-style" target="mdn">MDN Page</a>
 */
export declare type BorderStyle_StyleType = OneOrBox<BorderStyle>;
/**
 * Defines keywords such as `thin` and `thick` expressing line width. For example, see the
 * [[borderWidth]] property.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-width" target="mdn">MDN Page</a>
 */
export declare type LineWidthKeywords = "thin" | "medium" | "thick";
/**
 * Type used for several style properties that allow defining line width as a `<length>` CSS
 * type as well as keywords such as `thin` and `thick`. For example, see the [[borderWidth]]
 * property.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-width" target="mdn">MDN Page</a>
 */
export declare type LineWidth = LineWidthKeywords | CssLength;
/**
 * Type for [[boxDecorationBreak]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break" target="mdn">MDN Page</a>
 */
export declare type BoxDecorationBreak_StyleType = "slice" | "clone";
/**
 * Type for single box shadow.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" target="mdn">MDN Page</a>
 * @deprecated Use [[BoxShadow]] type.
 */
export declare type BoxShadow_Single = BoxShadow;
/**
 * Type for single box shadow.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" target="mdn">MDN Page</a>
 */
export declare type BoxShadow = "none" | {
    x?: Extended<CssLength>;
    y?: Extended<CssLength>;
    blur?: Extended<CssLength>;
    spread?: Extended<CssLength>;
    color?: Extended<CssColor>;
    inset?: Extended<boolean>;
};
/**
 * Type for [[boxShadow]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" target="mdn">MDN Page</a>
 */
export declare type BoxShadow_StyleType = OneOrMany<string | BoxShadow>;
/**
 * Type for [[boxSizing]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing" target="mdn">MDN Page</a>
 */
export declare type BoxSizing_StyleType = "content-box" | "border-box";
/**
 * Type for [[breakAfter]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/break-after" target="mdn">MDN Page</a>
 */
export declare type BreakAfter_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" | "left" | "right" | "recto" | "verso" | "avoid-column" | "column" | "avoid-region" | "region";
/**
 * Type for [[breakBefore]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/break-before" target="mdn">MDN Page</a>
 */
export declare type BreakBefore_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" | "left" | "right" | "recto" | "verso" | "avoid-column" | "column" | "avoid-region" | "region";
/**
 * Type for [[breakInside]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside" target="mdn">MDN Page</a>
 */
export declare type BreakInside_StyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";
/**
 * Type for [[captionSide]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side" target="mdn">MDN Page</a>
 */
export declare type CaptionSide_StyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end";
/**
 * Type for [[caretColor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color" target="mdn">MDN Page</a>
 */
export declare type CaretColor_StyleType = "auto" | CssColor;
/**
 * Type for [[clear]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clear" target="mdn">MDN Page</a>
 */
export declare type Clear_StyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end";
/**
 * Type representing the boundaries of a box
 */
export declare type GeometryBoxKeyword = "margin-box" | "border-box" | "padding-box" | "content-box" | "fill-box" | "stroke-box" | "view-box";
/**
 * Type for [[clipPath]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-pat" target="mdn">MDN Page</a>
 */
export declare type ClipPath_StyleType = "none" | IUrlFunc | BasicShape | GeometryBoxKeyword | [
    GeometryBoxKeyword,
    BasicShape
];
/**
 * Type for [[clipRule]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/clip-rule" target="mdn">MDN Page</a>
 */
export declare type ClipRule_StyleType = "nonzero" | "evenodd";
/**
 * Type for [[colorAdjust]] and color-adjust style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color-adjust" target="mdn">MDN Page</a>
 */
export declare type ColorAdjust_StyleType = "economy" | "exact";
/**
 * Type for [[colorInterpolation]] and color-interpolation-filters style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation" target="mdn">MDN Page</a>
 */
export declare type ColorInterpolation_StyleType = "auto" | "sRGB" | "linearRGB";
/**
 * Type for [[colorScheme]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/color-count" target="mdn">MDN Page</a>
 */
export declare type ColorScheme_StyleType = "normal" | OneOrMany<"light" | "dark" | string>;
/**
 * Type for [[columnCount]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/column-count" target="mdn">MDN Page</a>
 */
export declare type ColumnCount_StyleType = "auto" | CssNumber;
/**
 * Type for [[columnFill]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill" target="mdn">MDN Page</a>
 */
export declare type ColumnFill_StyleType = "auto" | "balance" | "balance-all";
/**
 * Type for [[columnGap]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap" target="mdn">MDN Page</a>
 */
export declare type ColumnGap_StyleType = "normal" | CssLength;
/**
 * Type for [[columnSpan]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/column-span" target="mdn">MDN Page</a>
 */
export declare type ColumnSpan_StyleType = "none" | "all";
/**
 * Type for [[columns]] style property. The value can be provided in one of the following forms and
 * and will be converted to string as follows:
 *
 * - number: will be converted to a unitless number - count of columns.
 * - ILengthProxy (e.g. px(8)): converted to a number with the proper length units.
 * - two variants of two element arrays: one of the elements will be treated as a number of columns
 *   while another as the column width.
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/columns" target="mdn">MDN Page</a>
 */
export declare type Columns_StyleType = "auto" | CssNumber | Exclude<CssLength, number> | [
    "auto" | Extended<CssNumber>,
    "auto" | Extended<Exclude<CssLength, number>>
] | [
    "auto" | Extended<Exclude<CssLength, number>>,
    "auto" | Extended<CssNumber>
];
/**
 * Keywords that can be combined in the [[IStyleset.contain|contain]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/contain" target="mdn">MDN Page</a>
 */
export declare type ContainAtomKeyword = "size" | "layout" | "style" | "paint";
/**
 * Keywords that can be only used as a sole value of the [[IStyleset.contain|contain]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/contain" target="mdn">MDN Page</a>
 */
export declare type ContainSoleKeyword = "none" | "strict" | "content";
/**
 * Type for [[IStyleset.contain|contain]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/contain" target="mdn">MDN Page</a>
 */
export declare type Contain_StyleType = ContainSoleKeyword | OneOrMany<ContainAtomKeyword>[];
/**
 * Type for [[content]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content" target="mdn">MDN Page</a>
 */
export declare type ContentItem = "open-quote" | "close-quote" | "no-open-quote" | "no-close-quote" | CssString | CssImage;
/**
 * Type for [[content]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content" target="mdn">MDN Page</a>
 */
export declare type Content_StyleType = string | "none" | "normal" | OneOrMany<ContentItem>;
/**
 * Type for [[contentVisibility]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility" target="mdn">MDN Page</a>
 */
export declare type ContentVisibility_StyleType = "auto" | "visible" | "hidden";
/**
 * Type for [[counterIncrement]], [[counterReset]] and [[counterSet]] style properties
 */
export declare type CssCounter = ICounterRule | "page" | "pages" | IStringProxy;
/**
 * Type for [[counterIncrement]], [[counterReset]] and [[counterSet]] style properties
 */
export declare type Counter_StyleType = "none" | OneOrMany<CssCounter | [Extended<CssCounter>, Extended<number>]>;
/**
 * Type for cursor pre-defined names
 */
export declare type CursorKeyword = "auto" | "default" | "none" | "context-menu" | "help" | "pointer" | "progress" | "wait" | "cell" | "crosshair" | "text" | "vertical-text" | "alias" | "copy" | "move" | "no-drop" | "not-allowed" | "e-resize" | "n-resize" | "ne-resize" | "nw-resize" | "s-resize" | "se-resize" | "sw-resize" | "w-resize" | "ew-resize" | "ns-resize" | "nesw-resize" | "nwse-resize" | "col-resize" | "row-resize" | "all-scroll" | "zoom-in" | "zoom-out" | "grab" | "grabbing";
/**
 * Type for [[IStyleset.cursor|cursor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor" target="mdn">MDN Page</a>
 */
export declare type Cursor_StyleType = OneOrMany<CursorKeyword | IUrlFunc | ICursorFunc>;
/**
 * Type for [[display]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/display" target="mdn">MDN Page</a>
 */
export declare type Display_StyleType = "block" | "inline" | "run-in" | "contents" | "none" | "inline-block" | "inline-list-item" | "inline-table" | "inline-flex" | "inline-grid" | "flow" | "flow-root" | "table" | "flex" | "grid" | "ruby" | "table-row-group" | "table-header-group" | "table-footer-group" | "table-row" | "table-cell" | "table-column-group" | "table-column" | "table-caption" | "ruby-base" | "ruby-text" | "ruby-base-container" | "ruby-text-container" | "list-item" | "list-item block" | "list-item inline" | "list-item flow" | "list-item flow-root" | "list-item block flow" | "list-item block flow-root" | "flow list-item block";
/**
 * Type for [[dominantBaseline]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/dominant-baseline" target="mdn">MDN Page</a>
 */
export declare type DominantBaseline_StyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" | "central" | "mathematical" | "hanging" | "text-top";
/**
 * Type for [[emptyCells]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells" target="mdn">MDN Page</a>
 */
export declare type EmptyCells_StyleType = "show" | "hide";
/**
 * Type for [[filter]] and [[backdropFilter]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/filter" target="mdn">MDN Page</a>
 */
export declare type Filter_StyleType = "none" | OneOrMany<IUrlFunc | FilterFuncs>;
/**
 * Type for [[flex]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex" target="mdn">MDN Page</a>
 */
export declare type Flex_StyleType = FlexBasis_StyleType | [
    Extended<CssNumber>,
    Extended<CssNumber>,
    Extended<FlexBasis_StyleType>
];
/**
 * Type for [[flexBasis]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis" target="mdn">MDN Page</a>
 */
export declare type FlexBasis_StyleType = CssLengthOrAuto | "content" | "fill" | "max-content" | "min-content" | "fit-content";
/**
 * Type for [[flexDirection]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction" target="mdn">MDN Page</a>
 */
export declare type FlexDirection_StyleType = "row" | "row-reverse" | "column" | "column-reverse";
/**
 * Type for [[flexFlow]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow" target="mdn">MDN Page</a>
 */
export declare type FlexFlow_StyleType = FlexDirection_StyleType | FlexWrap_StyleType | [
    Extended<FlexDirection_StyleType>,
    Extended<FlexWrap_StyleType>
];
/**
 * Type for [[flexWrap]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap" target="mdn">MDN Page</a>
 */
export declare type FlexWrap_StyleType = "nowrap" | "wrap" | "wrap-reverse";
/**
 * Type for [[float]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/float" target="mdn">MDN Page</a>
 */
export declare type Float_StyleType = "left" | "right" | "none" | "inline-start" | "inline-end";
/**
 * Type for [[font]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font" target="mdn">MDN Page</a>
 */
export declare type Font_StyleType = SystemFont | [string, CssLength] | [CssLength, string] | {
    family: Extended<string>;
    size: Extended<CssLength>;
    style?: Extended<FontStyle>;
    variant?: Extended<string>;
    weight?: Extended<FontWeight_StyleType>;
    stretch?: Extended<FontStretchKeyword>;
    lineHeight?: Extended<CssNumber>;
};
/**
 * Type for [[fontWeight]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight" target="mdn">MDN Page</a>
 */
export declare type FontWeight_StyleType = FontWeight | "bolder" | "lighter";
/**
 * Type for [[forcedColorAdjust]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust" target="mdn">MDN Page</a>
 */
export declare type ForcedColorAdjust_StyleType = "auto" | "none";
/**
 * Type for [[gap]] or [[gridGap]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/gap" target="mdn">MDN Page</a>
 */
export declare type Gap_StyleType = RowGap_StyleType | [RowGap_StyleType, ColumnGap_StyleType];
/**
 * Type for [[gridAutoColumns]] and [[gridAutoRows]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns" target="mdn">MDN Page</a>
 */
export declare type GridAutoAxis_StyleType = OneOrMany<GridTrackSize>;
/**
 * Type for [[gridAutoFlow]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow" target="mdn">MDN Page</a>
 */
export declare type GridAutoFlow_StyleType = "row" | "column" | "dense" | "row dense" | "column dense";
/**
 * Type for specifying either number of grid lines or name of grid line or area. This type is used
 * when defining grid-column-start/end and grid-row-start/end style properties.
 */
export declare type GridLineCountOrName = CssNumber | IGridAreaRule | IGridLineRule;
/**
 * Type for [[gridColumnStart]], [[gridColumnEnd]], [[gridRowStart]] and [[gridRowEnd]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start" target="mdn">MDN Page</a>
 */
export declare type GridAxisSide_StyleType = "auto" | GridLineCountOrName | IGridSpanFunc | [
    Extended<CssNumber>,
    IGridAreaRule | IGridLineRule
];
/**
 * Type for [[gridColumn]] and [[gridRow]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column" target="mdn">MDN Page</a>
 */
export declare type GridAxis_StyleType = OneOrPair<GridAxisSide_StyleType>;
/**
 * Type for [[gridArea]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area" target="mdn">MDN Page</a>
 */
export declare type GridArea_StyleType = OneOrBox<GridAxisSide_StyleType>;
/**
 * Type for defining a single grid area position. The numbers are 1-based indices of the lines in
 * the following sequence: block start, inline start, block end, inline end.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas" target="mdn">MDN Page</a>
 */
export declare type GridTemplateAreaDefinition = [
    IGridAreaRule | Extended<string>,
    number,
    number,
    number,
    number
];
/**
 * Type for [[gridTemplateAreas]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas" target="mdn">MDN Page</a>
 */
export declare type GridTemplateAreas_StyleType = "none" | string[] | GridTemplateAreaDefinition[];
/**
 * Type for [[gridTemplateColumns]] and [[gridTemplateRows]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" target="mdn">MDN Page</a>
 */
export declare type GridTemplateAxis_StyleType = "none" | OneOrMany<GridTrack> | "subgrid";
/**
 * Type for a single track element of grid template axis
 */
export declare type GridTrack = GridTrackSize | GridTrackLine;
/**
 * Type for a single template element defining name or names for a grid line in grid template.
 * This is always an array - even if a single name is given.
 */
export declare type GridTrackLine = (IGridLineRule | Extended<string>)[];
/**
 * Type for a single template element defining track size in grid template
 */
export declare type GridTrackSize = CssLengthOrAuto | "min-content" | "max-content" | IFitContentProxy | IMinMaxFunc | IRepeatFunc;
/**
 * Type for [[hyphens]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens" target="mdn">MDN Page</a>
 */
export declare type Hyphens_StyleType = "none" | "manual" | "auto";
/**
 * Type for [[imageOrientation]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation" target="mdn">MDN Page</a>
 */
export declare type ImageOrientation_StyleType = "none" | "from-image";
/**
 * Type for [[imageRendering]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering" target="mdn">MDN Page</a>
 */
export declare type ImageRendering_StyleType = "auto" | "smooth" | "high-quality" | "pixelated" | "crisp-edges" | "optimizeQuality" | "optimizeSpeed ";
/**
 * Type for [[initialLetter]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter" target="mdn">MDN Page</a>
 */
export declare type InitialLetter_StyleType = OneOrPair<CssNumber>;
/**
 * Type for [[isolation]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/isolation" target="mdn">MDN Page</a>
 */
export declare type Isolation_StyleType = "auto" | "isolate";
/**
 * Type for [[justifyContent]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content" target="mdn">MDN Page</a>
 */
export declare type JustifyContent_StyleType = "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" | "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" | "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";
/**
 * Type for [[justifyItems]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items" target="mdn">MDN Page</a>
 */
export declare type JustifyItems_StyleType = "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" | "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" | "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" | "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right" | "legacy" | "legacy left" | "legacy right" | "legacy center";
/**
 * Type for [[justifySelf]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self" target="mdn">MDN Page</a>
 */
export declare type JustifySelf_StyleType = "auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" | "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" | "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" | "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";
/**
 * Type for [[letterSpacing]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing" target="mdn">MDN Page</a>
 */
export declare type LetterSpacing_StyleType = "normal" | CssLength;
/**
 * Type for [[lineBreak]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-break" target="mdn">MDN Page</a>
 */
export declare type LineBreak_StyleType = "auto" | "loose" | "normal" | "strict" | "anywhere";
/**
 * Type for [[lineClamp]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp" target="mdn">MDN Page</a>
 */
export declare type LineClamp_StyleType = "none" | CssNumber | [Extended<CssNumber>, Extended<string>];
/**
 * Type for [[IStyleset.lineHeight|lineHeight]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/line-height" target="mdn">MDN Page</a>
 */
export declare type LineHeight_StyleType = CssNumber | ILengthProxy;
/**
 * Type for [[listStyle]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style" target="mdn">MDN Page</a>
 */
export declare type ListStyle_StyleType = ListStyleType_StyleType | ListStylePosition_StyleType | ListStyleImage_StyleType | [
    Extended<ListStyleImage_StyleType>,
    Extended<ListStylePosition_StyleType>
] | [
    Extended<ListStyleImage_StyleType>,
    Extended<ListStyleType_StyleType>?
] | [
    Extended<ListStyleType_StyleType>,
    Extended<ListStylePosition_StyleType>
] | [
    Extended<ListStyleImage_StyleType>,
    Extended<ListStylePosition_StyleType>,
    Extended<ListStyleType_StyleType>?
];
/**
 * Type for [[listStyleImage]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image" target="mdn">MDN Page</a>
 */
export declare type ListStyleImage_StyleType = "none" | IUrlFunc;
/**
 * Type for [[listStylePosition]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position" target="mdn">MDN Page</a>
 */
export declare type ListStylePosition_StyleType = "inside" | "outside";
/**
 * Type for [[listStyleType]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type" target="mdn">MDN Page</a>
 */
export declare type ListStyleType_StyleType = ICounterStyleRule | "none" | "disc" | "circle" | "square" | "decimal" | "decimal-leading-zero" | "cjk-decimal" | "cjk-earthly-branch" | "cjk-heavenly-stem" | "cjk-ideographic" | "lower-roman" | "upper-roman" | "lower-greek" | "lower-alpha" | "lower-latin" | "upper-alpha" | "upper-latin" | "arabic-indic" | "armenian" | "bengali" | "cambodian" | "devanagari" | "georgian" | "gujarati" | "gurmukhi" | "hebrew" | "hiragana" | "hiragana-iroha" | "japanese-formal" | "japanese-informal" | "kannada" | "katakana" | "katakana-iroha" | "khmer" | "korean-hangul-formal" | "korean-hanja-formal" | "korean-hanja-informal" | "lao" | "lower-armenian" | "malayalam" | "mongolian" | "myanmar" | "oriya" | "persian" | "simp-chinese-formal" | "simp-chinese-informal" | "tamil" | "telugu" | "thai" | "tibetan" | "trad-chinese-formal" | "trad-chinese-informal" | "upper-armenian" | "disclosure-open" | "disclosure-closed";
/**
 * Type for the [[marginTrim]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim" target="mdn">MDN Page</a>
 */
export declare type MarginTrim_StyleType = "none" | "in-flow" | "all";
/**
 * Type for the [[markerStart]], [[markerMid]] and [[markerEnd]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start" target="mdn">MDN Page</a>
 */
export declare type Marker_StyleType = "none" | IIDRule;
/**
 * Type for the [[marks]] style property for the `@page` at-rule
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start" target="mdn">MDN Page</a>
 */
export declare type Marks_StyleType = "none" | "crop" | "cross" | "crop cross" | "cross crop" | [
    "crop",
    "cross"?
] | ["cross", "crop"?];
/**
 * Type for the [[maskBorder]] style properties
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border" target="mdn">MDN Page</a>
 */
export declare type MaskBorder_Object = {
    source: Extended<BorderImageSource_StyleType>;
    slice?: Extended<BorderImageSlice_StyleType>;
    width?: Extended<BorderImageWidth_StyleType>;
    outset?: Extended<BorderImageOutset_StyleType>;
    repeat?: Extended<BorderImageRepeat_StyleType>;
    mode?: Extended<MaskBorderMode_StyleType>;
};
/**
 * Type for [[maskBorder]] style property.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border" target="mdn">MDN Page</a>
 */
export declare type MaskBorder_StyleType = CssImage | MaskBorder_Object | string;
/**
 * Type for [[maskBorderMode]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-mode" target="mdn">MDN Page</a>
 */
export declare type MaskBorderMode_StyleType = "luminance" | "alpha";
/**
 * Type for the [[maskComposite]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite" target="mdn">MDN Page</a>
 */
export declare type MaskCompositeKeyword = "add" | "subtract" | "intersect" | "exclude";
/**
 * Type for the [[maskMode]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode" target="mdn">MDN Page</a>
 */
export declare type MaskModeKeyword = "alpha" | "luminance" | "match-source";
/**
 * Type for the [[maskType]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type" target="mdn">MDN Page</a>
 */
export declare type MaskTypeKeyword = "alpha" | "luminance";
/**
 * Type for the [[mathStyle]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/math-style" target="mdn">MDN Page</a>
 */
export declare type MathStyle_StyleType = "normal" | "compact";
/**
 * Type for the [[objectFit]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit" target="mdn">MDN Page</a>
 */
export declare type ObjectFit_StyleType = "fill" | "contain" | "cover" | "none" | "scale-down";
/**
 * Type for the [[offset]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/offset" target="mdn">MDN Page</a>
 */
export declare type Offset_StyleType = OffsetPath_StyleType | {
    anchor?: OffsetAnchor_StyleType;
    distance?: CssLength;
    path?: OffsetPath_StyleType;
    position?: CssPosition;
    rotate?: OffsetRotate_StyleType;
};
/**
 * Type for the [[offsetAnchor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/offset-anchor" target="mdn">MDN Page</a>
 */
export declare type OffsetAnchor_StyleType = "auto" | CssPosition;
/**
 * Type for [[offsetPath]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path" target="mdn">MDN Page</a>
 */
export declare type OffsetPath_StyleType = "none" | IRayFunc | IUrlFunc | BasicShape | GeometryBoxKeyword | [
    GeometryBoxKeyword,
    BasicShape
];
/**
 * Type for [[offsetPosition]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position" target="mdn">MDN Page</a>
 */
export declare type OffsetPosition_StyleType = "auto" | CssPosition;
/**
 * Type for the [[offsetRotate]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate" target="mdn">MDN Page</a>
 */
export declare type OffsetRotate_StyleType = "auto" | "reverse" | CssAngle | ["auto" | "reverse", CssAngle];
/**
 * Type for the overflow-x/y style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow" target="mdn">MDN Page</a>
 */
export declare type OverflowKeyword = "visible" | "hidden" | "clip" | "scroll" | "auto";
/**
 * Type for the [[overflow]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow" target="mdn">MDN Page</a>
 */
export declare type Overflow_StyleType = OneOrPair<OverflowKeyword>;
/**
 * Type for the [[overflowAnchor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor" target="mdn">MDN Page</a>
 */
export declare type OverflowAnchor_StyleType = "auto" | "none";
/**
 * Type for the [[overflowClipMargin]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin" target="mdn">MDN Page</a>
 */
export declare type OverflowClipMargin_StyleType = CssLength | "border-box" | "padding-box" | "content-box";
/**
 * Type for the [[overflowWrap]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap" target="mdn">MDN Page</a>
 */
export declare type OverflowWrap_StyleType = "normal" | "break-word" | "anywhere";
/**
 * Type for the [[overscrollBehaviorX]] and [[overscrollBehaviorY]] style property
 */
export declare type OverscrollBehavior = "contain" | "none" | "auto";
/**
 * Type for the [[overscrollBehavior]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior" target="mdn">MDN Page</a>
 */
export declare type OverscrollBehavior_StyleType = OneOrPair<OverscrollBehavior>;
/**
 * Keywords for page sizes
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size" target="mdn">MDN Page</a>
 */
export declare type PageSizeKeyword = "A5" | "A4" | "A3" | "B5" | "B4" | "JIS-B5" | "JIS-B4" | "letter" | "legal" | "ledger";
/**
 * Keywords for page orientations
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size" target="mdn">MDN Page</a>
 */
export declare type PageOrientation = "portrait" | "landscape";
/**
 * Type for the [[size]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size" target="mdn">MDN Page</a>
 */
export declare type Size_StyleType = "auto" | OneOrPair<CssLength> | PageSizeKeyword | PageOrientation | [PageSizeKeyword, PageOrientation];
/**
 * Type for the [[page]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/page" target="mdn">MDN Page</a>
 */
export declare type Page_StyleType = "auto" | IPageNameRule | string;
/**
 * Type for the paint-order style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order" target="mdn">MDN Page</a>
 */
export declare type PaintOrderKeyword = "fill" | "stroke" | "markers";
/**
 * Type for the [[paintOrder]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order" target="mdn">MDN Page</a>
 */
export declare type PaintOrder_StyleType = "normal" | PaintOrderKeyword | [
    PaintOrderKeyword,
    PaintOrderKeyword?,
    PaintOrderKeyword?
];
/**
 * Type for the [[perspective]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/perspective" target="mdn">MDN Page</a>
 */
export declare type Perspective_StyleType = "none" | CssLength;
/**
 * Type for the [[perspectiveOrigin]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin" target="mdn">MDN Page</a>
 */
export declare type PerspectiveOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength | [
    Extended<HorizontalPositionKeyword | CssLength>,
    Extended<VerticalPositionKeyword | CssLength>
];
/**
 * Type for the [[placeContent]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/place-content" target="mdn">MDN Page</a>
 */
export declare type PlaceContent_StyleType = AlignContentKeywords | [Extended<AlignContentKeywords>, Extended<JustifyContent_StyleType>];
/**
 * Type for the [[placeItems]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/place-items" target="mdn">MDN Page</a>
 */
export declare type PlaceItems_StyleType = AlignItemsKeywords | [Extended<AlignItemsKeywords>, Extended<JustifyItems_StyleType>];
/**
 * Type for the [[placeSelf]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/place-self" target="mdn">MDN Page</a>
 */
export declare type PlaceSelf_StyleType = AlignSelfKeywords | [Extended<AlignSelfKeywords>, Extended<JustifySelf_StyleType>];
/**
 * Type for the [[pointerEvents]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events" target="mdn">MDN Page</a>
 */
export declare type PointerEvents_StyleType = "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" | "painted" | "fill" | "stroke" | "all";
/**
 * Type for the [[IStyleset.position|position]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/position" target="mdn">MDN Page</a>
 */
export declare type Position_StyleType = "static" | "relative" | "absolute" | "sticky" | "fixed";
/**
 * Type for the [[quotes]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/quotes" target="mdn">MDN Page</a>
 */
export declare type Quotes_StyleType = "none" | "auto" | OneOrMany<[Extended<CssString>, Extended<CssString>]>;
/**
 * Type for the [[resize]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/resize" target="mdn">MDN Page</a>
 */
export declare type Resize_StyleType = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";
/**
 * Type for [[IStyleset.rotate|rotate]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/rotate" target="mdn">MDN Page</a>
 */
export declare type Rotate_StyleType = "none" | CssAngle | ["x" | "y" | "z", Extended<CssAngle>] | [
    Extended<CssNumber>,
    Extended<CssNumber>,
    Extended<CssNumber>,
    Extended<CssAngle>
];
/**
 * Type for [[rowGap]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap" target="mdn">MDN Page</a>
 */
export declare type RowGap_StyleType = CssLength;
/**
 * Type for the [[IStyleset.scale|scale]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scale" target="mdn">MDN Page</a>
 */
export declare type Scale_StyleType = "none" | CssNumber | [
    Extended<CssNumber>,
    Extended<CssNumber>?,
    Extended<CssNumber>?
];
/**
 * Type for the [[scrollbarColor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color" target="mdn">MDN Page</a>
 */
export declare type ScrollbarColor_StyleType = "auto" | "dark" | "light" | [
    Extended<CssColor>,
    Extended<CssColor>
];
/**
 * Type for the [[scrollbarGutter]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter" target="mdn">MDN Page</a>
 */
export declare type ScrollbarGutter_StyleType = "auto" | "stable" | "stable both-edges";
/**
 * Type for the [[scrollbarWidth]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width" target="mdn">MDN Page</a>
 */
export declare type ScrollbarWidth_StyleType = "auto" | "thin" | "none";
/**
 * Type for the [[scrollBehavior]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior" target="mdn">MDN Page</a>
 */
export declare type ScrollBehavior_StyleType = "auto" | "smooth";
/**
 * Type for the [[scrollSnapAlign]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align" target="mdn">MDN Page</a>
 */
export declare type ScrollSnapAlign_StyleType = OneOrPair<"none" | "start" | "end" | "center">;
/**
 * Type for the [[scrollSnapStop]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop" target="mdn">MDN Page</a>
 */
export declare type ScrollSnapStop_StyleType = "normal" | "always";
/**
 * Type for the [[scrollSnapType]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type" target="mdn">MDN Page</a>
 */
export declare type ScrollSnapType_StyleType = "none" | [
    Extended<"x" | "y" | "block" | "inline" | "both">,
    Extended<"mandatory" | "proximity">
];
/**
 * Type for [[shapeOutside]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside" target="mdn">MDN Page</a>
 */
export declare type ShapeOutside_StyleType = IUrlFunc | BasicShape | GeometryBoxKeyword | CssImage;
/**
 * Type for the [[shapeRendering]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering" target="mdn">MDN Page</a>
 */
export declare type ShapeRendering_StyleType = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";
/**
 * Type for the [[strokeDasharray]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray" target="mdn">MDN Page</a>
 */
export declare type StrokeDasharray_StyleType = "none" | OneOrMany<CssLength>;
/**
 * Type for the [[strokeLinecap]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap" target="mdn">MDN Page</a>
 */
export declare type StrokeLinecap_StyleType = "butt" | "round" | "square";
/**
 * Type for the [[strokeLinejoin]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin" target="mdn">MDN Page</a>
 */
export declare type StrokeLinejoin_StyleType = "arcs" | "bevel" | "miter" | "miter-clip" | "round";
/**
 * Type for the [[tabSize]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size" target="mdn">MDN Page</a>
 */
export declare type TabSize_StyleType = CssNumber | ILengthProxy;
/**
 * Type for the [[tableLayout]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout" target="mdn">MDN Page</a>
 */
export declare type TableLayout_StyleType = "auto" | "fixed";
/**
 * Type for the [[textAlign]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-align" target="mdn">MDN Page</a>
 */
export declare type TextAlign_StyleType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
/**
 * Type for the [[textAlignLast]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last" target="mdn">MDN Page</a>
 */
export declare type TextAlignLast_StyleType = "auto" | "start" | "end" | "left" | "right" | "center" | "justify";
/**
 * Type for the [[textAnchor]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor" target="mdn">MDN Page</a>
 */
export declare type TextAnchor_StyleType = "start" | "middle" | "end";
/**
 * Type for the [[textCombineUpright]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright" target="mdn">MDN Page</a>
 */
export declare type TextCombineUpright_StyleType = "none" | "all" | "digits" | number;
/**
 * Type for the [[textDecoration]] style property. If a number is specified, it will be interpreted
 * as color - not as thickness.
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration" target="mdn">MDN Page</a>
 */
export declare type TextDecoration_StyleType = TextDecorationLine_StyleType | TextDecorationStyle_StyleType | CssColor | TextDecorationThickness_StyleType | {
    line?: Extended<TextDecorationLine_StyleType>;
    style?: Extended<TextDecorationStyle_StyleType>;
    color?: Extended<CssColor>;
    thickness?: Extended<TextDecorationThickness_StyleType>;
};
/**
 * Type for the [[textDecorationLine]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line" target="mdn">MDN Page</a>
 */
export declare type TextDecorationLine_StyleType = "none" | "spelling-error" | "grammar-error" | OneOrMany<"underline" | "overline" | "line-through">;
/**
 * Type for the [[textDecorationStyle]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style" target="mdn">MDN Page</a>
 */
export declare type TextDecorationStyle_StyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";
/**
 * Type for the [[textDecorationSkipInk]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink" target="mdn">MDN Page</a>
 */
export declare type TextDecorationSkipInk_StyleType = "none" | "auto" | "all";
/**
 * Type for the [[textDecorationThickness]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness" target="mdn">MDN Page</a>
 */
export declare type TextDecorationThickness_StyleType = "from-font" | CssLengthOrAuto;
/**
 * Type for the [[textEmphasis]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis" target="mdn">MDN Page</a>
 */
export declare type TextEmphasis_StyleType = TextEmphasisStyle_StyleType | CssColor | [
    Extended<TextEmphasisStyle_StyleType>,
    Extended<CssColor>
];
/**
 * Type for the [[textEmphasisPosition]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position" target="mdn">MDN Page</a>
 */
export declare type TextEmphasisPosition_StyleType = "over left" | "over right" | "under left" | "under right";
/**
 * Shape for the text-emphasis-style style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style" target="mdn">MDN Page</a>
 */
export declare type TextEmphasisShape = "dot" | "circle" | "double-circle" | "triangle" | "sesame" | string;
/**
 * Fill option for the text-emphasis-style style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style" target="mdn">MDN Page</a>
 */
export declare type TextEmphasisFill = "filled" | "open";
/**
 * Type for the [[textEmphasisStyle]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style" target="mdn">MDN Page</a>
 */
export declare type TextEmphasisStyle_StyleType = "none" | TextEmphasisFill | TextEmphasisShape | [
    Extended<TextEmphasisFill>,
    Extended<TextEmphasisShape>
];
/**
 * Type for the [[textIndent]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-inden" target="mdn">MDN Page</a>
 */
export declare type TextIndent_StyleType = CssLength | [
    Extended<CssLength>,
    OneOrMany<"each-line" | "hanging" | "each-line hanging">
];
/**
 * Type for the [[textJustify]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify" target="mdn">MDN Page</a>
 */
export declare type TextJustify_StyleType = "auto" | "inter-character" | "inter-word" | "none";
/**
 * Type for the [[textOrientation]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation" target="mdn">MDN Page</a>
 */
export declare type TextOrientation_StyleType = "mixed" | "upright" | "sideways";
/**
 * Type for the [[textOverflow]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow" target="mdn">MDN Page</a>
 */
export declare type TextOverflow_StyleType = OneOrPair<"clip" | "ellipsis" | "fade" | string>;
/**
 * Type for the [[textRendering]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering" target="mdn">MDN Page</a>
 */
export declare type TextRendering_StyleType = "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";
/**
 * Type for the single value of the tex"t-shadow style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow" target="mdn">MDN Page</a>
 */
export declare type TextShadow = "none" | {
    x?: Extended<CssLength>;
    y?: Extended<CssLength>;
    blur?: Extended<CssLength>;
    color?: Extended<CssColor>;
};
/**
 * Type for the [[textShadow]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow" target="mdn">MDN Page</a>
 */
export declare type TextShadow_StyleType = OneOrMany<TextShadow>;
/**
 * Type for the [[textSizeAdjust]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust" target="mdn">MDN Page</a>
 */
export declare type TextSizeAdjust_StyleType = "none" | "auto" | CssPercent;
/**
 * Type for the [[textStroke]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke" target="mdn">MDN Page</a>
 */
export declare type TextStroke_StyleType = LineWidth | CssNonNumericColor | [
    Extended<LineWidth>,
    Extended<CssColor>
] | [
    Extended<CssNonNumericColor>,
    LineWidth
] | {
    width: Extended<LineWidth>;
    color: Extended<CssColor>;
};
/**
 * Type for the [[textTransform]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform" target="mdn">MDN Page</a>
 */
export declare type TextTransform_StyleType = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";
/**
 * Type for the [[textUnderlinePosition]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position" target="mdn">MDN Page</a>
 */
export declare type TextUnderlinePosition_StyleType = "auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below";
/**
 * Type for the [[touchAction]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action" target="mdn">MDN Page</a>
 */
export declare type TouchAction_StyleType = "auto" | "none" | "manipulation" | "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" | "pan-down" | "pinch-zoom" | [
    "pan-x" | "pan-left" | "pan-right",
    "pan-y" | "pan-up" | "pan-down"
] | [
    "pan-x" | "pan-left" | "pan-right",
    "pinch-zoom"
] | [
    "pan-y" | "pan-up" | "pan-down",
    "pinch-zoom"
] | [
    "pan-x" | "pan-left" | "pan-right",
    "pan-y" | "pan-up" | "pan-down",
    "pinch-zoom"
];
/**
 * Type for [[transform]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform" target="mdn">MDN Page</a>
 */
export declare type Transform_StyleType = "none" | OneOrMany<TransformFuncs>;
/**
 * Type for [[transformBox]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box" target="mdn">MDN Page</a>
 */
export declare type TransformBox_StyleType = "content-box" | "border-box" | "fill-box" | "stroke-box" | "view-box";
/**
 * Type for [[transformOrigin]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin" target="mdn">MDN Page</a>
 */
export declare type TransformOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength | [
    Extended<HorizontalPositionKeyword | CssLength>,
    Extended<VerticalPositionKeyword | CssLength>,
    Extended<CssLength>?
];
/**
 * Type for [[transformStyle]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style" target="mdn">MDN Page</a>
 */
export declare type TransformStyle_StyleType = "flat" | "preserve-3d";
/**
 * Type for single transition
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition" target="mdn">MDN Page</a>
 */
export declare type Transition_Single = string | {
    property?: Extended<TransitionProperty>;
    duration?: Extended<CssTime>;
    func?: Extended<TimingFunction>;
    delay?: Extended<CssTime>;
};
/**
 * Type for [[transition]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition" target="mdn">MDN Page</a>
 */
export declare type Transition_StyleType = OneOrMany<Transition_Single>;
/**
 * Type for single [[transitionProperty]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property" target="mdn">MDN Page</a>
 */
export declare type TransitionProperty = "none" | "all" | keyof IStyleset | IVarRule;
/**
 * Type for [[transitionProperty]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property" target="mdn">MDN Page</a>
 */
export declare type TransitionProperty_StyleType = OneOrMany<TransitionProperty>;
/**
 * Type for the [[IStyleset.translate|translate]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/translate" target="mdn">MDN Page</a>
 */
export declare type Translate_StyleType = "none" | CssLength | [
    Extended<CssLength>,
    Extended<CssLength>,
    Extended<CssLength>?
];
/**
 * Type for the [[unicodeBidi]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi" target="mdn">MDN Page</a>
 */
export declare type UnicodeBidi_StyleType = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";
/**
 * Type for the [[userSelect]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/user-select" target="mdn">MDN Page</a>
 */
export declare type UserSelect_StyleType = "auto" | "text" | "none" | "contain" | "all";
/**
 * Type for the [[verticalAlign]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align" target="mdn">MDN Page</a>
 */
export declare type VerticalAlign_StyleType = "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom" | CssLength;
/**
 * Type for the [[visibility]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/visibility" target="mdn">MDN Page</a>
 */
export declare type Visibility_StyleType = "visible" | "hidden" | "collapse";
/**
 * Type for the [[vectorEffect]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect" target="mdn">MDN Page</a>
 */
export declare type VectorEffect_StyleType = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";
/**
 * Type for the [[whiteSpace]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/white-space" target="mdn">MDN Page</a>
 */
export declare type WhiteSpace_StyleType = "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces";
/**
 * Type for [[willChange]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/will-change" target="mdn">MDN Page</a>
 */
export declare type WillChange_StyleType = "auto" | OneOrMany<"scroll-position" | "contents" | Exclude<keyof IStyleset, "willChange">>;
/**
 * Type for the [[wordBreak]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/word-break" target="mdn">MDN Page</a>
 */
export declare type WordBreak_StyleType = "normal" | "break-all" | "keep-all" | "break-word";
/**
 * Type for the [[wordSpacing]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing" target="mdn">MDN Page</a>
 */
export declare type WordSpacing_StyleType = "normal" | CssLength;
/**
 * Type for the [[writingMode]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode" target="mdn">MDN Page</a>
 */
export declare type WritingMode_StyleType = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";
/**
 * Type for the [[zIndex]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index" target="mdn">MDN Page</a>
 */
export declare type ZIndex_StyleType = "auto" | CssNumber;
/**
 * Type for the [[zoom]] style property
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/zoom" target="mdn">MDN Page</a>
 *
 * @deprecated
 */
export declare type Zoom_StyleType = "normal" | "reset" | CssPercent;
/**
 * Type for style properties for which there is no special type defined.
 */
export declare type DefaultStyleType = string;
//# sourceMappingURL=StyleTypes.d.ts.map