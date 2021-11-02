import {
    Extended, OneOrPair, OneOrBox, OneOrMany, ExtendedProp, Global_StyleType, CssString, CssImage,
    ICursorFunc, IUrlFunc, Direction
} from "./CoreTypes"
import {
    CssNumber, CssPosition, CssTime, CssLength, CssAngle, CssPercent, CssFrequency, CssResolution,
    CssRadius, HorizontalPositionKeyword, VerticalPositionKeyword, CssPoint, IFitContentProxy,
    ILengthProxy, CssSize, CssAspectRatio, IRectProxy, CssLengthOrAuto, CssMultiPosition,
    CssMultiPositionX, CssMultiPositionY, BorderRadius, AngleUnits, FrequencyUnits, LengthUnits,
    PercentUnits, ResolutionUnits, TimeUnits, IPercentProxy
} from "./NumericTypes"
import {CssColor, CssNonNumericColor} from "./ColorTypes";
import {
    FontKerning, FontOpticalSizing, FontSize, FontStretch, FontStretchKeyword, FontStyle, FontSynthesis,
    FontVariantCaps, FontVariantPosition, FontWeight, SystemFont
} from "./FontTypes";
import {
    BasicShape, IMinMaxFunc, IRepeatFunc, IGridSpanFunc, FilterFuncs,
    FillRule, IRayFunc, IStepsFunc, ICubicBezierFunc, TransformFuncs
} from "./ShapeTypes";
import {
    IVarRule, IAnimationRule, ICounterRule, IIDRule, IGridLineRule, IGridAreaRule, IStyleDefinition,
    IStyleDefinitionClass, ICounterStyleRule
} from "./RuleTypes";



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
// CSS property types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for [[alignContent]] style property.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
 * @category Style Property
 */
export type AlignContent_StyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
    "space-between" | "space-around" | "space-evenly";



/**
 * Type for [[alignItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 * @category Style Property
 */
export type AlignItems_StyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center";



/**
 * Type for [[alignSelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
 * @category Style Property
 */
export type AlignSelf_StyleType = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
    "safe center" | "unsafe center";



/**
 * Type for [[alignmentBaseline]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/alignment-baseline
 * @category Style Property
 */
export type AlignmentBaseline_StyleType = "auto" | "baseline" | "before-edge" | "text-before-edge" |
    "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
    "hanging" | "mathematical" | "top" | "center" | "bottom";



/**
 * Type for single animation. Used by [[Animation_StyleType]].
 * @category Style Helper
 */
export type Animation_Single = string |
    {
        name?: Extended<AnimationName>;
        duration?: Extended<CssTime>;
        func?: Extended<TimingFunction>;
        delay?: Extended<CssTime>;
        count?: Extended<AnimationIterationCount>;
        direction?: Extended<AnimationDirection>;
        mode?: Extended<AnimationFillMode>;
        state?: Extended<AnimationPlayState>;
    };

/**
 * Type for [[animation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
 * @category Style Property
 */
export type Animation_StyleType = OneOrMany<Animation_Single>;



/**
 * Type for [[animationDelay]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
 * @category Style Property
 */
export type AnimationDelay_StyleType = OneOrMany<CssTime>;



/**
 * Type for single animation direction
 * @category Style Helper
 */
export type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";

/**
 * Type for [[animationDirection]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
 * @category Style Property
 */
export type AnimationDirection_StyleType = OneOrMany<AnimationDirection>;



/**
 * Type for [[animationDuration]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
 * @category Style Property
 */
export type AnimationDuration_StyleType = OneOrMany<CssTime>;



/**
 * Type for single animation fill mode
 * @category Style Helper
 */
export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

/**
 * Type for [[animationFillMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
 * @category Style Property
 */
export type AnimationFillMode_StyleType = OneOrMany<AnimationDirection>;



/**
 * Type for single animation iteration count
 * @category Style Helper
 */
export type AnimationIterationCount = "infinite" | CssNumber;

/**
 * Type for [[animationIterationCount]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
 * @category Style Property
 */
export type AnimationIterationCount_StyleType = OneOrMany<AnimationIterationCount>;



/**
 * Type for single animation name
 * @category Style Helper
 */
export type AnimationName = "none" | string | IAnimationRule;

/**
 * Type for [[animationName]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
 * @category Style Property
 */
export type AnimationName_StyleType = OneOrMany<AnimationName>;



/**
 * Type for single animation play state
 * @category Style Helper
 */
export type AnimationPlayState = "paused" | "running";

/**
 * Type for [[animationPlayState]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
 * @category Style Property
 */
export type AnimationPlayState_StyleType = OneOrMany<AnimationPlayState>;



/**
 * Type for [[appearance]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
 * @category Style Property
 */
export type Appearance_StyleType = "none" | "auto" | "textfield" | "menulist-button" |
    "searchfield" | "textarea" | "push-button" | "slider-horizontal" | "checkbox" | "radio" |
    "square-button" | "menulist" | "listbox" | "meter" | "progress-bar" | "button";



/**
 * Type for simple animation timing functions - those that don't have parameters
 * @category Style Helper
 */
export type TimingFunctionKeyword = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

/**
 * Type for single animation timing function
 * @category Style Helper
 */
export type TimingFunction = TimingFunctionKeyword | IStepsFunc | ICubicBezierFunc;

/**
 * Type for [[animationTimingFunction]] and [[transitionTimingFunction]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
 * @category Style Property
 */
export type TimingFunction_StyleType = OneOrMany<TimingFunction>;



/**
 * Type for [[aspectRatio]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
 * @category Style Property
 */
export type AspectRatio_StyleType = CssAspectRatio | "auto";



/**
 * Type for [[backfaceVisibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
 * @category Style Property
 */
export type BackfaceVisibilityMode_StyleType = "visible" | "hidden";



/**
 * Type for single background value
 * @category Style Helper
 */
export type Background_Single = string | CssColor | CssImage |
    {
        color?: Extended<CssColor>,
        image?: Extended<CssImage>,
        position?: Extended<CssPosition>,
        size?: Extended<BackgroundSize>,
        repeat?: Extended<BackgroundRepeat>,
        attachment?: Extended<BackgroundAttachment>,
        origin?: Extended<BackgroundOrigin>,
        clip?: Extended<BackgroundClip>,
    };

/**
 * Type for [[background]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background
 * @category Style Property
 */
export type Background_StyleType = OneOrMany<Background_Single>;



/**
 * Type for single background attachment
 * @category Style Helper
 */
export type BackgroundAttachment = "scroll" | "fixed" | "local";

/**
 * Type for [[backgroundAttachment]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
 * @category Style Property
 */
export type BackgroundAttachment_StyleType = OneOrMany<BackgroundAttachment>;



/**
 * Type for single background blend mode
 * @category Style Helper
 */
export type BlendMode = "normal" | "multiply" | "screen" | "overlay" | "darken" |
    "lighten" | "color-dodge" | "color-burn" | "hard-light" | "soft-light" | "difference" |
    "exclusion" | "hue" | "saturation" | "color" | "luminosity";

/**
 * Type for [[backgroundBlendMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
 * @category Style Property
 */
export type BackgroundBlendMode_StyleType = OneOrMany<BlendMode>;



/**
 * Type for single background clip
 * @category Style Helper
 */
export type BackgroundClip = "border-box" | "padding-box" | "content-box" | "text";

/**
 * Type for [[backgroundClip]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
 * @category Style Property
 */
export type BackgroundClip_StyleType = OneOrMany<BackgroundClip>;



/**
 * Type for [[backgroundImage]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
 * @category Style Property
 */
export type BackgroundImage_StyleType = "none" | OneOrMany<CssImage>;



/**
 * Type for single background origin
 * @category Style Helper
 */
export type BackgroundOrigin = "border-box" | "padding-box" | "content-box" | "text";

/**
 * Type for [[backgroundOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
 * @category Style Property
 */
export type BackgroundOrigin_StyleType = OneOrMany<BackgroundOrigin>;



/**
 * Keywords for single background repeat
 * @category Style Helper
 */
export type BackgroundRepeatKeyword = "repeat" | "space" | "round" | "no-repeat";

/**
 * Type for single background repeat
 * @category Style Helper
 */
export type BackgroundRepeat = "repeat-x" | "repeat-y" | OneOrPair<BackgroundRepeatKeyword>;

/**
 * Type for [[backgroundRepeat]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
 * @category Style Property
 */
export type BackgroundRepeat_StyleType = OneOrMany<BackgroundRepeat>;



/**
 * Type for background size
 * @category Style Helper
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
 * [[100,200]] wll be interpreted as "100px 200px".
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
 * @category Style Property
 */
export type BackgroundSize_StyleType = OneOrMany<BackgroundSize>;



/**
 * Type for [[baselineShift]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
 * @category Style Property
 */
export type BaselineShift_StyleType = "sub" | "super" | CssLength;



/**
 * Type for [[borderCollapse]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse
 * @category Style Property
 */
export type BorderColapse_StyleType = "collapse" | "separate";



/**
 * Type for [[borderColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
 * @category Style Property
 */
export type BorderColor_StyleType = OneOrBox<CssColor>;



/**
 * Type for border-image style property expressed as an object.
 * @category Style Helper
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
 * @category Style Property
 */
export type BorderImage_StyleType = CssImage | BorderImage_Object | string;

/**
 * Type for [[borderImageOutset]] style property. It is CssNumber and not CssLength because
 * border-image-outset can be specified as a unitless number.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset
 * @category Style Property
 */
export type BorderImageOutset_StyleType = OneOrBox<CssNumber | ILengthProxy>;

/**
 * Type for border-image-repeat keywords
 * @category Style Helper
 */
export type BorderImageRepeatKeyword = "stretch" | "repeat" | "round" | "space";

/**
 * Type for [[borderImageRepeat]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat
 * @category Style Property
 */
export type BorderImageRepeat_StyleType = OneOrPair<BorderImageRepeatKeyword>;

/**
 * Type for [[borderImageSlice]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice
 *
 * Note: numeric values are treated as is - without appending the percent sign to them.
 * @category Style Property
 */
export type BorderImageSlice_StyleType = OneOrBox<CssPercent | "fill"> |
    [Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, "fill"];

/**
 * Type for [[borderImageSource]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
 * @category Style Property
 */
export type BorderImageSource_StyleType = CssImage | "none";

/**
 * Type for [[borderImageWidth]] style property. It is CssNumber and not CssLength because
 * border-image-width can be specified as a unitless number.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width
 * @category Style Property
 */
export type BorderImageWidth_StyleType = OneOrBox<CssNumber | ILengthProxy | "auto">;



/**
 * Type for [[borderSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
 * @category Style Property
 */
export type BorderSpacing_StyleType = OneOrPair<CssLength>;



/**
 * Type for single border side style property
 * @category Style Helper
 */
export type BorderStyle = "none" | "hidden" | "dotted" | "dashed" | "solid" | "double" |
    "groove" | "ridge" | "inset" | "outset";



/**
 * Type for [[borderStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
 * @category Style Property
 */
export type BorderStyle_StyleType = OneOrBox<BorderStyle>;



/**
 * Type for [[border]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border
 * @category Style Property
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
 * @category Style Helper
 */
export type LineWidth = "thin" | "medium" | "thick" | CssLength;

/**
 * Type for [[borderWidth]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
 * @category Style Property
 */
export type BorderWidth_StyleType = OneOrBox<LineWidth>;




/**
 * Type for [[boxDecorationBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
 * @category Style Property
 */
export type BoxDecorationBreak_StyleType = "slice" | "clone";



/**
 * Type for single box shadow.
 * @category Style Helper
 */
export type BoxShadow = "none" |
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
 * @category Style Property
 */
export type BoxShadow_StyleType = OneOrMany<BoxShadow>;



/**
 * Type for [[boxSizing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
 * @category Style Property
 */
export type BoxSizing_StyleType = "content-box" | "border-box";



/**
 * Type for [[breakAfter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
 * @category Style Property
 */
export type BreakAfter_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/**
 * Type for [[breakBefore]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-before
 * @category Style Property
 */
export type BreakBefore_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/**
 * Type for [[breakInside]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside
 * @category Style Property
 */
export type BreakInside_StyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";



/**
 * Type for [[captionSide]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side
 * @category Style Property
 */
export type CaptionSide_StyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end";



/**
 * Type for [[caretColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color
 * @category Style Property
 */
export type CaretColor_StyleType = "auto" | CssColor;



/**
 * Type for [[clear]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
 * @category Style Property
 */
export type Clear_StyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end";



/**
 * Type for [[IStyleset.clip|clip]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
 * @category Style Property
 * @deprecated The CSS `clip` property and `rect()` function are deprecated.
 */
export type Clip_StyleType = "auto" | IRectProxy;



/**
 * Type representing the boundaries of a box
 * @category Style Helper
 */
 export type GeometryBoxKeyword = "margin-box" | "border-box" | "padding-box" | "content-box" |
    "fill-box" | "stroke-box" | "view-box";

/**
 * Type for [[clipPath]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-pat
 * @category Style Property
 */
export type ClipPath_StyleType = "none" | IUrlFunc | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/**
 * Type for [[clipRule]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-rule
 * @category Style Property
 */
export type ClipRule_StyleType = "nonzero" | "evenodd";



/**
 * Type for [[colorAdjust]] and color-adjust style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-adjust
 * @category Style Property
 */
export type ColorAdjust_StyleType = "economy" | "exact";



/**
 * Type for [[colorInterpolation]] and color-interpolation-filters style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation
 * @category Style Property
 */
export type ColorInterpolation_StyleType = "auto" | "sRGB" | "linearRGB";



/**
 * Type for [[colorScheme]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-count
 * @category Style Property
 */
export type ColorScheme_StyleType = "normal" | OneOrMany<"light" | "dark" | string>;



/**
 * Type for [[columnCount]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
 * @category Style Property
 */
export type ColumnCount_StyleType = "auto" | CssNumber;



/**
 * Type for [[columnFill]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
 * @category Style Property
 */
export type ColumnFill_StyleType = "auto" | "balance" | "balance-all";



/**
 * Type for [[columnGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
 * @category Style Property
 */
export type ColumnGap_StyleType = "normal" | CssLength;



/**
 * Type for [[columnSpan]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
 * @category Style Property
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
 * @category Style Property
 */
export type Columns_StyleType = "auto" | CssNumber | Exclude<CssLength,number> |
    ["auto" | Extended<CssNumber>, "auto" | Extended<Exclude<CssLength,number>>] |
    ["auto" | Extended<Exclude<CssLength,number>>, "auto" | Extended<CssNumber>];
// Note that no special coversion function is required for this property because the number type will
// always be converted to a unitless number



/**
 * Keywords that can be combined in the [[IStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 * @category Style Property
 */
export type ContainAtomKeyword = "size" | "layout" | "style" | "paint";

/**
 * Keywords that can be only used as a sole value of the [[IStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 * @category Style Property
 */
export type ContainSoleKeyword = "none" | "strict" | "content";

/**
 * Type for [[IStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 * @category Style Property
 */
export type Contain_StyleType = ContainSoleKeyword | OneOrMany<ContainAtomKeyword>[];



/**
 * Type for [[content]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
 * @category Style Property
 */
export type ContentItem = "open-quote" | "close-quote" | "no-open-quote" | "no-close-quote" |
    CssString | CssImage;

/**
 * Type for [[content]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
 * @category Style Property
 */
export type Content_StyleType = string | "none" | "normal" | OneOrMany<ContentItem>;



/**
 * Type for [[contentVisibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
 * @category Style Property
 */
export type ContentVisibility_StyleType = "auto" | "visible" | "hidden";



/**
 * Type for [[counterIncrement]], [[counterReset]] and [[counterSet]] style properties
 * @category Style Helper
 */
export type CssCounter = "none" | OneOrMany<ICounterRule | string | [ICounterRule | string, Extended<number>]>;



/**
 * Type for cursor pre-defined names
 * @category Style Helper
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
 * @category Style Property
 */
export type Cursor_StyleType = OneOrMany<CursorKeyword | IUrlFunc | ICursorFunc>;



/**
 * Type for [[display]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * @category Style Property
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
 * @category Style Property
 */
export type DominantBaseline_StyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
    "central" | "mathematical" | "hanging" | "text-top";



/**
 * Type for [[emptyCells]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
 * @category Style Property
 */
export type EmptyCells_StyleType = "show" | "hide";



/**
 * Type for [[filter]] and [[backdropFilter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
 * @category Style Property
 */
export type Filter_StyleType = OneOrMany<IUrlFunc | FilterFuncs>;



/**
 * Type for [[flex]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
 * @category Style Property
 */
export type Flex_StyleType = FlexBasis_StyleType |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<FlexBasis_StyleType>];



/**
 * Type for [[flexBasis]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
 * @category Style Property
 */
export type FlexBasis_StyleType = CssLengthOrAuto | "content" | "fill" | "max-content" | "min-content" | "fit-content";



/**
 * Type for [[flexDirection]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
 * @category Style Property
 */
export type FlexDirection_StyleType = "row" | "row-reverse" | "column" | "column-reverse";



/**
 * Type for [[flexFlow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow
 * @category Style Property
 */
export type FlexFlow_StyleType = FlexDirection_StyleType | FlexWrap_StyleType |
    [Extended<FlexDirection_StyleType>, Extended<FlexWrap_StyleType>];



/**
 * Type for [[flexWrap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
 * @category Style Property
 */
export type FlexWrap_StyleType = "nowrap" | "wrap" | "wrap-reverse";



/**
 * Type for [[float]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/float
 * @category Style Property
 */
export type Float_StyleType = "left" | "right" | "none" | "inline-start" | "inline-end";



/**
 * Type for [[font]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font
 * @category Style Property
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
 * @category Style Property
 */
export type FontWeight_StyleType = FontWeight | "bolder" | "lighter";



/**
 * Type for [[forcedColorAdjust]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust
 * @category Style Property
 */
export type ForcedColorAdjust_StyleType = "auto" | "none";



/**
 * Type for [[gap]] or [[gridGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
 * @category Style Property
 */
export type Gap_StyleType = RowGap_StyleType | [RowGap_StyleType, ColumnGap_StyleType];



/**
 * Type for [[gridAutoColumns]] and [[gridAutoRows]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
 * @category Style Property
 */
export type GridAutoAxis_StyleType = OneOrMany<GridTrackSize>;



/**
 * Type for [[gridAutoFlow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
 * @category Style Property
 */
export type GridAutoFlow_StyleType = "row" | "column" | "dense" | "row dense" | "column dense";



/**
 * Type for specifying either number of grid lines or name of grid line or area. This type is used
 * when defining grid-column-start/end and grid-row-start/end style properties.
 * @category Style Helper
 */
export type GridLineCountOrName = CssNumber | IGridAreaRule | IGridLineRule;

/**
 * Type for [[gridColumnStart]], [[gridColumnEnd]], [[gridRowStart]] and [[gridRowEnd]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
 * @category Style Property
 */
export type GridAxisSide_StyleType = "auto" | GridLineCountOrName | IGridSpanFunc |
    [Extended<CssNumber>, IGridAreaRule | IGridLineRule];



/**
 * Type for [[gridColumn]] and [[gridRow]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
 * @category Style Property
 */
export type GridAxis_StyleType = OneOrPair<GridAxisSide_StyleType>;



/**
 * Type for [[gridArea]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
 * @category Style Property
 */
export type GridArea_StyleType = OneOrBox<GridAxisSide_StyleType>;



/**
 * Type for defining a single grid area position. The numbers are 1-based indices of the lines in
 * the following sequence: block start, inline start, block end, inline end.
 * @category Style Helper
 */
export type GridTemplateAreaDefinition = [IGridAreaRule | Extended<string>,
    number, number, number, number];

/**
 * Type for [[gridTemplateAreas]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
 * @category Style Property
 */
export type GridTemplateAreas_StyleType = "none" | string[] | GridTemplateAreaDefinition[];



/**
 * Type for [[gridTemplateColumns]] and [[gridTemplateRows]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
 * @category Style Property
 */
export type GridTemplateAxis_StyleType = "none" | OneOrMany<GridTrack> | "subgrid";

/**
 * Type for a single track element of grid template axis
 * @category Style Helper
 */
export type GridTrack = GridTrackSize | GridTrackLine;

/**
 * Type for a single template element defining name or names for a grid line in grid template.
 * This is always an array - even if a single name is given.
 * @category Style Helper
 */
export type GridTrackLine = (IGridLineRule | Extended<string>)[];

/**
 * Type for a single template element defining track size in grid template
 * @category Style Helper
 */
export type GridTrackSize = CssLengthOrAuto | "min-content" | "max-content" |
    IFitContentProxy | IMinMaxFunc | IRepeatFunc;



/**
 * Type for [[hyphens]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
 * @category Style Property
 */
export type Hyphens_StyleType = "none" | "manual" | "auto";



/**
 * Type for [[imageOrientation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation
 * @category Style Property
 */
export type ImageOrientation_StyleType = "none" | "from-image";



/**
 * Type for [[imageRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
 * @category Style Property
 */
export type ImageRendering_StyleType = "auto" | "crisp-edges" | "pixelated";



/**
 * Type for [[initialLetter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter
 * @category Style Property
 */
export type InitialLetter_StyleType = OneOrPair<CssNumber>;



/**
 * Type for [[isolation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/isolation
 * @category Style Property
 */
export type Isolation_StyleType = "auto" | "isolate";



/**
 * Type for [[justifyContent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 * @category Style Property
 */
export type JustifyContent_StyleType = "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" |
    "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/**
 * Type for [[justifyItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
 * @category Style Property
 */
export type JustifyItems_StyleType = "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right" |
    "legacy" | "legacy left" | "legacy right" | "legacy center";



/**
 * Type for [[justifySelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
 * @category Style Property
 */
export type JustifySelf_StyleType = "auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/**
 * Type for [[letterSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
 * @category Style Property
 */
export type LetterSpacing_StyleType = "normal" | CssLength;



/**
 * Type for [[lineBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
 * @category Style Property
 */
export type LineBreak_StyleType = "auto" | "loose" | "normal" | "strict" | "anywhere";



/**
 * Type for [[lineClamp]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp
 * @category Style Property
 */
export type LineClamp_StyleType = "none" | CssNumber | [Extended<CssNumber>, Extended<string>];



/**
 * Type for [[IStyleset.lineHeight|lineHeight]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @category Style Property
 */
export type LineHeight_StyleType = CssNumber | ILengthProxy;



/**
 * Type for [[listStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
 * @category Style Property
 */
export type ListStyle_StyleType = ListStyleType_StyleType | ListStylePosition_StyleType | ListStyleImage_StyleType |
    [Extended<ListStyleImage_StyleType>, Extended<ListStylePosition_StyleType>] |
    [Extended<ListStyleImage_StyleType>, Extended<ListStyleType_StyleType>?] |
    [Extended<ListStyleType_StyleType>, Extended<ListStylePosition_StyleType>] |
    [Extended<ListStyleImage_StyleType>, Extended<ListStylePosition_StyleType>, Extended<ListStyleType_StyleType>?];



/**
 * Type for [[listStyleImage]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image
 * @category Style Property
 */
export type ListStyleImage_StyleType = "none" | IUrlFunc;



/**
 * Type for [[listStylePosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
 * @category Style Property
 */
export type ListStylePosition_StyleType = "inside" | "outside";



/**
 * Type for [[listStyleType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
 * @category Style Property
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
 * @category Style Property
 */
export type MarginTrim_StyleType = "none" | "in-flow" | "all";



/**
 * Type for the [[markerStart]], [[markerMid]] and [[markerEnd]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
 * @category Style Property
 */
export type Marker_StyleType = "none" | IIDRule;



/**
 * Type for the [[maskBorder]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border
 * @category Style Property
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
 * @category Style Property
 */
export type MaskBorder_StyleType = CssImage | MaskBorder_Object | string;

/**
 * Type for [[maskBorderMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-mode
 * @category Style Property
 */
export type MaskBorderMode_StyleType = "luminance" | "alpha";



/**
 * Type for the [[maskComposite]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite
 * @category Style Property
 */
export type MaskCompositeKeyword = "add" | "subtract" | "intersect" | "exclude";



/**
 * Type for the [[maskMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode
 * @category Style Property
 */
export type MaskModeKeyword = "alpha" | "luminance" | "match-source";



/**
 * Type for the [[maskType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type
 * @category Style Property
 */
export type MaskTypeKeyword = "alpha" | "luminance";



/**
 * Type for the [[mathStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/math-style
 * @category Style Property
 */
export type MathStyle_StyleType = "normal" | "compact";



/**
 * Type for the [[objectFit]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 * @category Style Property
 */
export type ObjectFit_StyleType = "fill" | "contain" | "cover" | "none" | "scale-down";



/**
 * Type for the [[offset]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset
 * @category Style Property
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
 * @category Style Property
 */
export type OffsetAnchor_StyleType = "auto" | CssPosition;



/**
 * Type for [[offsetPath]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
 * @category Style Property
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
 * @category Style Property
 */
export type OffsetRotate_StyleType = "auto" | "reverse" | CssAngle | ["auto" | "reverse", CssAngle];



/**
 * Type for the overflow-x/y style property
 * @category Style Helper
 */
export type OverflowKeyword = "visible" | "hidden" | "clip" | "scroll" | "auto";

/**
 * Type for the [[overflow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 * @category Style Property
 */
export type Overflow_StyleType = OneOrPair<OverflowKeyword>;



/**
 * Type for the [[overflowAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
 * @category Style Property
 */
export type OverflowAnchor_StyleType = "auto" | "none";



/**
 * Type for the [[overflowClipMargin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin
 * @category Style Property
 */
export type OverflowClipMargin_StyleType = CssLength | "border-box" | "padding-box" | "content-box";



/**
 * Type for the [[overflowWrap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
 * @category Style Property
 */
export type OverflowWrap_StyleType = "normal" | "break-word" | "anywhere";



/**
 * Type for the [[overscrollBehaviorX]] and [[overscrollBehaviorY]] style property
 * @category Style Helper
 */
export type OverscrollBehavior = "contain" | "none" | "auto";

/**
 * Type for the [[overscrollBehavior]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
 * @category Style Property
 */
export type OverscrollBehavior_StyleType = OneOrPair<OverscrollBehavior>;



/**
 * Type for the paint-order style property
 * @category Style Helper
 */
export type PaintOrderKeyword = "fill" | "stroke" | "markers";

/**
 * Type for the [[paintOrder]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
 * @category Style Property
 */
export type PaintOrder_StyleType = "normal" | PaintOrderKeyword |
    [PaintOrderKeyword, PaintOrderKeyword?, PaintOrderKeyword?];



/**
 * Type for the [[perspective]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
 * @category Style Property
 */
export type Perspective_StyleType = "none" | CssLength;



/**
 * Type for the [[perspectiveOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
 * @category Style Property
 */
export type PerspectiveOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>];



/**
 * Type for the [[placeContent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
 * @category Style Property
 */
export type PlaceContent_StyleType = AlignContent_StyleType | [Extended<AlignContent_StyleType>, Extended<JustifyContent_StyleType>];



/**
 * Type for the [[placeItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
 * @category Style Property
 */
export type PlaceItems_StyleType = AlignItems_StyleType | [Extended<AlignItems_StyleType>, Extended<JustifyItems_StyleType>];



/**
 * Type for the [[placeSelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self
 * @category Style Property
 */
export type PlaceSelf_StyleType = AlignSelf_StyleType | [Extended<AlignSelf_StyleType>, Extended<JustifySelf_StyleType>];



/**
 * Type for the [[pointerEvents]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
 * @category Style Property
 */
export type PointerEvents_StyleType = "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" |
    "painted" | "fill" | "stroke" | "all";



/**
 * Type for the [[IStyleset.position|position]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
 * @category Style Property
 */
export type Position_StyleType = "static" | "relative" | "absolute" | "sticky" | "fixed";



/**
 * Type for the [[quotes]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes
 * @category Style Property
 */
export type Quotes_StyleType = "none" | "auto" | OneOrMany<[Extended<CssString>,Extended<CssString>]>;



/**
 * Type for the [[resize]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
 * @category Style Property
 */
export type Resize_StyleType = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";



/**
 * Type for [[IStyleset.rotate|rotate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
 * @category Style Property
 */
export type Rotate_StyleType = "none" | CssAngle | ["x" | "y" | "z", Extended<CssAngle>] |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<CssNumber>, Extended<CssAngle>];



/**
 * Type for [[rowGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
 * @category Style Property
 */
export type RowGap_StyleType = CssLength;



/**
 * Type for the [[IStyleset.scale|scale]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
 * @category Style Property
 */
export type Scale_StyleType = "none" | CssNumber |
    [Extended<CssNumber>, Extended<CssNumber>?, Extended<CssNumber>?];



/**
 * Type for the [[scrollbarColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
 * @category Style Property
 */
export type ScrollbarColor_StyleType = "auto" | "dark" | "light" |
    [Extended<CssColor>, Extended<CssColor>];



/**
 * Type for the [[scrollbarGutter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
 * @category Style Property
 */
export type ScrollbarGutter_StyleType = "auto" | "stable" | "stable both-edges";



/**
 * Type for the [[scrollbarWidth]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
 * @category Style Property
 */
export type ScrollbarWidth_StyleType = "auto" | "thin" | "none";



/**
 * Type for the [[scrollBehavior]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
 * @category Style Property
 */
export type ScrollBehavior_StyleType = "auto" | "smooth";



/**
 * Type for the [[scrollSnapAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
 * @category Style Property
 */
export type ScrollSnapAlign_StyleType = OneOrPair<"none" | "start" | "end" | "center">;



/**
 * Type for the [[scrollSnapStop]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
 * @category Style Property
 */
export type ScrollSnapStop_StyleType = "normal" | "always";



/**
 * Type for the [[scrollSnapType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
 * @category Style Property
 */
export type ScrollSnapType_StyleType = "none" |
    [Extended<"x" | "y" | "block" | "inline" | "both">, Extended<"mandatory" | "proximity">];



/**
 * Type for [[shapeOutside]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
 * @category Style Property
 */
export type ShapeOutside_StyleType = IUrlFunc | BasicShape | GeometryBoxKeyword | CssImage;



/**
 * Type for the [[shapeRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering
 * @category Style Property
 */
export type ShapeRendering_StyleType = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";



/**
 * Type for the [[tabSize]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size
 * @category Style Property
 */
export type TabSize_StyleType = CssNumber | ILengthProxy;

/**
 * Type for the [[tableLayout]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
 * @category Style Property
 */
export type TableLayout_StyleType = "auto" | "fixed";



/**
 * Type for the [[textAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
 * @category Style Property
 */
export type TextAlign_StyleType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";



/**
 * Type for the [[textAlignLast]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
 * @category Style Property
 */
export type TextAlignLast_StyleType = "auto" | "start" | "end" | "left" | "right" | "center" | "justify";



/**
 * Type for the [[textAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor
 * @category Style Property
 */
export type TextAnchor_StyleType = "start" | "middle" | "end";



/**
 * Type for the [[textCombineUpright]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright
 * @category Style Property
 */
export type TextCombineUpright_StyleType = "none" | "all" | "digits" | number;



/**
 * Type for the [[textDecoration]] style property. If a number is specified, it will be interpreted
 * as color - not as thickness.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
 * @category Style Property
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
 * @category Style Property
 */
export type TextDecorationLine_StyleType = "none" | "spelling-error" | "grammar-error" |
    OneOrMany<"underline" | "overline" | "line-through">;



/**
 * Type for the [[textDecorationStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style
 * @category Style Property
 */
export type TextDecorationStyle_StyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";



/**
 * Type for the [[textDecorationSkipInk]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
 * @category Style Property
 */
export type TextDecorationSkipInk_StyleType = "none" | "auto" | "all";



/**
 * Type for the [[textDecorationThickness]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness
 * @category Style Property
 */
export type TextDecorationThickness_StyleType = "from-font" | CssLengthOrAuto;



/**
 * Type for the [[textEmphasis]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis
 * @category Style Property
 */
export type TextEmphasis_StyleType = TextEmphasisStyle_StyleType | CssColor |
    [Extended<TextEmphasisStyle_StyleType>, Extended<CssColor>];



/**
 * Type for the [[textEmphasisPosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
 * @category Style Property
 */
export type TextEmphasisPosition_StyleType = "over left" | "over right" | "under left" | "under right";



/**
 * Shape for the text-emphasis-style style property
 * @category Style Helper
 */
export type TextEmphasisShape = "dot" | "circle" | "double-circle" | "triangle" | "sesame" | string;

/**
 * Fill option for the text-emphasis-style style property
 * @category Style Helper
 */
export type TextEmphasisFill = "filled" | "open";

/**
 * Type for the [[textEmphasisStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style
 * @category Style Property
 */
export type TextEmphasisStyle_StyleType = "none" | TextEmphasisFill | TextEmphasisShape |
    [Extended<TextEmphasisFill>, Extended<TextEmphasisShape>];



/**
 * Type for the [[textIndent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-inden
 * @category Style Property
 */
export type TextIndent_StyleType = CssLength |
    [Extended<CssLength>, OneOrMany<"each-line" | "hanging" | "each-line hanging">];



/**
 * Type for the [[textJustify]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
 * @category Style Property
 */
export type TextJustify_StyleType = "auto" | "inter-character" | "inter-word" | "none";



/**
 * Type for the [[textOrientation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
 * @category Style Property
 */
export type TextOrientation_StyleType = "mixed" | "upright" | "sideways";



/**
 * Type for the [[textOverflow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
 * @category Style Property
 */
export type TextOverflow_StyleType = OneOrPair<"clip" | "ellipsis" | "fade" | string>;



/**
 * Type for the [[textRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
 * @category Style Property
 */
export type TextRendering_StyleType = "auto" | "optimizeSpeed" | "optimizeLegibility" | "geometricPrecision";



/**
 * Type for the single value of the tex"t-shadow style property
 * @category Style Helper
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
 * @category Style Property
 */
export type TextShadow_StyleType = OneOrMany<TextShadow>;



/**
 * Type for the [[textSizeAdjust]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust
 * @category Style Property
 */
export type TextSizeAdjust_StyleType = "none" | "auto" | CssPercent;



/**
 * Type for the [[textStroke]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke
 * @category Style Property
 */
export type TextStroke_StyleType = LineWidth | CssNonNumericColor |
    [Extended<LineWidth>, Extended<CssColor>] |
    [Extended<CssNonNumericColor>, LineWidth] |
    { width: Extended<LineWidth>, color: Extended<CssColor> };



/**
 * Type for the [[textTransform]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
 * @category Style Property
 */
export type TextTransform_StyleType = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";



/**
 * Type for the [[textUnderlinePosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position
 * @category Style Property
 */
export type TextUnderlinePosition_StyleType = "auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below";



/**
 * Type for the [[touchAction]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
 * @category Style Property
 */
export type TouchAction_StyleType = "auto" | "none" | "manipulation" |
    "pan-x" | "pan-left" | "pan-right" | "pan-y" | "pan-up" | "pan-down" | "pinch-zoom" |
    "pan-x pinch-zoom" | "pan-left pinch-zoom" | "pan-right pinch-zoom" | "pan-y pinch-zoom" | "pan-up pinch-zoom" | "pan-down pinch-zoom" |
    "pan-x pan-y" | "pan-x pan-y pinch-zoom" | "pan-x pan-up" | "pan-x pan-up pinch-zoom" | "pan-x pan-down" | "pan-x pan-down pinch-zoom" |
    "pan-y pan-left" | "pan-y pan-left pinch-zoom" | "pan-y pan-right" | "pan-y pan-right pinch-zoom" |
    "pan-left pan-up" | "pan-left pan-up pinch-zoom" | "pan-left pan-down" | "pan-left pan-down pinch-zoom" |
    "pan-right pan-up" | "pan-right pan-up pinch-zoom" | "pan-right pan-down" | "pan-right pan-down pinch-zoom" |
    "pan-up pan-left" | "pan-up pan-left pinch-zoom" | "pan-up pan-right" | "pan-up pan-right pinch-zoom" |
    "pan-down pan-left" | "pan-down pan-left pinch-zoom" | "pan-down pan-right" | "pan-down pan-right pinch-zoom";



/**
 * Type for [[transform]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 * @category Style Property
 */
export type Transform_StyleType = "none" | OneOrMany<TransformFuncs>;



/**
 * Type for [[transformBox]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box
 * @category Style Property
 */
export type TransformBox_StyleType = "content-box" | "border-box" | "fill-box" | "stroke-box" | "view-box";



/**
 * Type for [[transformOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
 * @category Style Property
 */
export type TransformOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>, Extended<CssLength>?];



/**
 * Type for [[transformStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
 * @category Style Property
 */
export type TransformStyle_StyleType = "flat" | "preserve-3d";



/**
 * Type for single transition
 * @category Style Helper
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
 * @category Style Property
 */
export type Transition_StyleType = OneOrMany<Transition_Single>;



/**
 * Type for single transition-property
 * @category Style Helper
 */
export type TransitionProperty = "none" | "all" | keyof IStyleset;

/**
 * Type for [[transitionProperty]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
 * @category Style Property
 */
export type TransitionProperty_StyleType = OneOrMany<TransitionProperty>;



/**
 * Type for the [[IStyleset.translate|translate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/translate
 * @category Style Property
 */
export type Translate_StyleType = "none" | CssLength |
    [Extended<CssLength>, Extended<CssLength>, Extended<CssLength>?];



/**
 * Type for the [[unicodeBidi]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
 * @category Style Property
 */
export type UnicodeBidi_StyleType = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";



/**
 * Type for the [[userSelect]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
 * @category Style Property
 */
export type UserSelect_StyleType = "auto" | "text" | "none" | "contain" | "all";



/**
 * Type for the [[verticalAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
 * @category Style Property
 */
export type VerticalAlign_StyleType = "baseline" | "sub" | "super" | "text-top" | "text-bottom" |
    "middle" | "top" | "bottom" | CssLength;



/**
 * Type for the [[visibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
 * @category Style Property
 */
export type Visibility_StyleType = "visible" | "hidden" | "collapse";



/**
 * Type for the [[vectorEffect]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
 * @category Style Property
 */
export type VectorEffect_StyleType = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";



/**
 * Type for the [[whiteSpace]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
 * @category Style Property
 */
export type WhiteSpace_StyleType = "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces";



/**
 * Type for [[willChange]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
 * @category Style Property
 */
export type WillChange_StyleType = "auto" | OneOrMany<"scroll-position" | "contents" | Exclude<keyof IStyleset,"willChange">>;



/**
 * Type for the [[wordBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
 * @category Style Property
 */
export type WordBreak_StyleType = "normal" | "break-all" | "keep-all" | "break-word";



/**
 * Type for the [[wordSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
 * @category Style Property
 */
export type WordSpacing_StyleType = "normal" | CssLength;



/**
 * Type for the [[writingMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
 * @category Style Property
 */
export type WritingMode_StyleType = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";



/**
 * Type for the [[zIndex]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
 * @category Style Property
 */
export type ZIndex_StyleType = "auto" | CssNumber;



/**
 * Type for the [[zoom]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/zoom
 * @category Style Property
 * @deprecated
 */
export type Zoom_StyleType = "normal" | "reset" | CssPercent;



/**
 * Type for style properties for which there is no special type defined.
 * @category Style Helper
 */
export type DefaultStyleType = string;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Styleset types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Interface representing a collection of built-in style properties. Every built-in property
 * appears in this interface. Also it is possible to add aditional properties via module
 * augmentation technique.
 */
export interface IStyleset
{
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/all
     */
    all?: Global_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
     */
    alignContent?: AlignContent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
     */
    alignItems?: AlignItems_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
     */
    alignSelf?: AlignSelf_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/alignment-baseline
     */
    alignmentBaseline?: AlignmentBaseline_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
     */
    animation?: Animation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
     */
    animationDelay?: AnimationDelay_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
     */
    animationDirection?: AnimationDirection_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
     */
    animationDuration?: AnimationDuration_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
     */
    animationFillMode?: AnimationFillMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
     */
    animationIterationCount?: AnimationIterationCount_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
     */
    animationName?: AnimationName_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
     */
    animationPlayState?: AnimationPlayState_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
     */
    animationTimingFunction?: TimingFunction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/appearance
     */
    appearance?: Appearance_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
     */
    aspectRatio?: AspectRatio_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
     */
    backdropFilter?: Filter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
     */
    backfaceVisibility?: BackfaceVisibilityMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background
     */
    background?: Background_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
     */
    backgroundAttachment?: BackgroundAttachment_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
     */
    backgroundBlendMode?: BackgroundBlendMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
     */
    backgroundClip?: BackgroundClip_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
     */
    backgroundColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
     */
    backgroundImage?: BackgroundImage_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
     */
    backgroundOrigin?: BackgroundOrigin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
     */
    backgroundPosition?: CssMultiPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-x
     */
    backgroundPositionX?: CssMultiPositionX;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-y
     */
    backgroundPositionY?: CssMultiPositionY;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
     */
    backgroundRepeat?: BackgroundRepeat_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat-x
     */
    backgroundRepeatX?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat-y
     */
    backgroundRepeatY?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
     */
    backgroundSize?: BackgroundSize_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
     */
    baselineShift?: BaselineShift_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/block-size
     */
    blockSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border
     */
    border?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block
     */
    borderBlock?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-color
     */
    borderBlockColor?: OneOrPair<CssColor>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end
     */
    borderBlockEnd?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-color
     */
    borderBlockEndColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-style
     */
    borderBlockEndStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-width
     */
    borderBlockEndWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start
     */
    borderBlockStart?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-color
     */
    borderBlockStartColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-style
     */
    borderBlockStartStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-width
     */
    borderBlockStartWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-style
     */
    borderBlockStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-width
     */
    borderBlockWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom
     */
    borderBottom?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-cottom-color
     */
    borderBottomColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius
     */
    borderBottomLeftRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius
     */
    borderBottomRightRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-style
     */
    borderBottomStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width
     */
    borderBottomWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse
     */
    borderCollapse?: BorderColapse_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
     */
    borderColor?: BorderColor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-end-end-radius
     */
    borderEndEndRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-end-start-radius
     */
    borderEndStartRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image
     */
    borderImage?: BorderImage_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset
     */
    borderImageOutset?: BorderImageOutset_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat
     */
    borderImageRepeat?: BorderImageRepeat_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice
     */
    borderImageSlice?: BorderImageSlice_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
     */
    borderImageSource?: BorderImageSource_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width
     */
    borderImageWidth?: BorderImageWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline
     */
    borderInline?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-color
     */
     borderInlineColor?: OneOrPair<CssColor>;

     /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end
     */
    borderInlineEnd?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-color
     */
    borderInlineEndColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-style
     */
    borderInlineEndStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-width
     */
    borderInlineEndWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start
     */
    borderInlineStart?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-color
     */
    borderInlineStartColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-style
     */
    borderInlineStartStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-width
     */
    borderInlineStartWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-style
     */
    borderInlineStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-width
     */
    borderInlineWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left
     */
    borderLeft?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color
     */
    borderLeftColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-style
     */
    borderLeftStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width
     */
    borderLeftWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
     */
    borderRadius?: BorderRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right
     */
    borderRight?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color
     */
    borderRightColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-style
     */
    borderRightStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width
     */
    borderRightWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
     */
    borderSpacing?: BorderSpacing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-start-end-radius
     */
    borderStartEndRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-start-start-radius
     */
    borderStartStartRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
     */
    borderStyle?: BorderStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top
     */
    borderTop?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color
     */
    borderTopColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius
     */
    borderTopLeftRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius
     */
    borderTopRightRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-style
     */
    borderTopStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width
     */
    borderTopWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
     */
    borderWidth?: BorderWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/bottom
     */
    bottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
     */
    boxDecorationBreak?: BoxDecorationBreak_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
     */
    boxShadow?: BoxShadow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
     */
    boxSizing?: BoxSizing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
     */
    breakAfter?: BreakAfter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-before
     */
    breakBefore?: BreakBefore_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside
     */
    breakInside?: BreakInside_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/buffered-rendering
     */
    bufferedRendering?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side
     */
    captionSide?: CaptionSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color
     */
    caretColor?: CaretColor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
     */
    clear?: Clear_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
     * @deprecated The CSS `clip` property and `rect()` function are deprecated.
     */
    clip?: Clip_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
     */
    clipPath?: ClipPath_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clip-rule
     */
    clipRule?: ClipRule_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color
     */
    color?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-adjust
     */
    colorAdjust?: ColorAdjust_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation
     */
    colorInterpolation?: ColorInterpolation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation-filters
     */
    colorInterpolationFilters?: ColorInterpolation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
     */
    colorScheme?: ColorScheme_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
     */
    columnCount?: ColumnCount_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
     */
    columnFill?: ColumnFill_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
     */
    columnGap?: ColumnGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule
     */
    columnRule?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-color
     */
    columnRuleColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-style
     */
    columnRuleStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-width
     */
    columnRuleWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
     */
    columnSpan?: ColumnSpan_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width
     */
    columnWidth?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/columns
     */
    columns?: Columns_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
     */
    contain?: Contain_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
     */
    content?: Content_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
     */
    contentVisibility?: ContentVisibility_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment
     */
    counterIncrement?: CssCounter;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset
     */
    counterReset?: CssCounter;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-set
     */
    counterSet?: CssCounter;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     */
    cursor?: Cursor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/direction
     */
    direction?: Direction;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
     */
    display?: Display_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/dominant-baseline
     */
    dominantBaseline?: DominantBaseline_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
     */
    emptyCells?: EmptyCells_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fill
     */
    fill?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fill-opacity
     */
    fillOpacity?: CssPercent;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fill-rule
     */
    fillRule?: FillRule;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
     */
    filter?: Filter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
     */
    flex?: Flex_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
     */
    flexBasis?: FlexBasis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
     */
    flexDirection?: FlexDirection_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow
     */
    flexFlow?: FlexFlow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
     */
    flexGrow?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
     */
    flexShrink?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
     */
    flexWrap?: FlexWrap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/float
     */
    float?: Float_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flood-color
     */
    floodColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flood-opacity
     */
    floodOpacity?: CssPercent;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font
     */
    font?: Font_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
     */
    fontFamily?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
     */
    fontFeatureSettings?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-kerning
     */
    fontKerning?: FontKerning;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-language-override
     */
     fontLanguageOverride?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-optical-sizing
     */
    fontOpticalSizing?: FontOpticalSizing;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
     */
    fontSize?: FontSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust
     */
    fontSizeAdjust?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch
     */
    fontStretch?: FontStretch;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
     */
    fontStyle?: FontStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis
     */
    fontSynthesis?: FontSynthesis;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
     */
    fontVariant?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates
     */
    fontVariantAlternates?: DefaultStyleType;

     /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps
     */
    fontVariantCaps?: FontVariantCaps;

   /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian
     */
    fontVariantEastAsian?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures
     */
    fontVariantLigatures?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
     */
    fontVariantNumeric?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position
     */
    fontVariantPosition?: FontVariantPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
     */
    fontVariationSettings?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-wight
     */
    fontWeight?: FontWeight_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust
     */
    forcedColorAdjust?: ForcedColorAdjust_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
     */
    gap?: Gap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid
     */
    grid?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
     */
    gridArea?: GridArea_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
     */
    gridAutoColumns?: GridAutoAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
     */
    gridAutoFlow?: GridAutoFlow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows
     */
    gridAutoRows?: GridAutoAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
     */
    gridColumn?: GridAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
     */
    gridColumnEnd?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap
     */
    gridColumnGap?: ColumnGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
     */
    gridColumnStart?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
     */
    gridGap?: Gap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
     */
    gridRow?: GridAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
     */
    gridRowEnd?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap
     */
    gridRowGap?: RowGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
     */
    gridRowStart?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
     */
    gridTemplate?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
     */
    gridTemplateAreas?: GridTemplateAreas_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
     */
    gridTemplateColumns?: GridTemplateAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
     */
    gridTemplateRows?: GridTemplateAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation
     */
    hangingPunctuation?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/height
     */
    height?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
     */
    hyphens?: Hyphens_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation
     */
    imageOrientation?: ImageOrientation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
     */
    imageRendering?: ImageRendering_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter
     */
    initialLetter?: InitialLetter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size
     */
    inlineSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset
     */
    inset?: OneOrBox<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block
     */
    insetBlock?: OneOrPair<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-end
     */
    insetBlockEnd?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-block-start
     */
    insetBlockStart?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline
     */
    insetInline?: OneOrPair<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-end
     */
    insetInlineEnd?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset-inline-start
     */
    insetInlineStart?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/isolation
     */
    isolation?: Isolation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
     */
    justifyContent?: JustifyContent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
     */
    justifyItems?: JustifyItems_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
     */
    justifySelf?: JustifySelf_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/left
     */
    left?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
     */
    letterSpacing?: LetterSpacing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/lighting-color
     */
    lightingColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
     */
    lineBreak?: LineBreak_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp
     */
    lineClamp?: LineClamp_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
     */
    lineHeight?: LineHeight_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
     */
    listStyle?: ListStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image
     */
    listStyleImage?: ListStyleImage_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
     */
    listStylePosition?: ListStylePosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
     */
    listStyleType?: ListStyleType_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin
     */
    margin?: OneOrBox<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block
     */
    marginBlock?: OneOrPair<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-end
     */
    marginBlockEnd?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-start
     */
    marginBlockStart?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom
     */
    marginBottom?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline
     */
    marginInline?: OneOrPair<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end
     */
    marginInlineEnd?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start
     */
    marginInlineStart?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left
     */
    marginLeft?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right
     */
    marginRight?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top
     */
    marginTop?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim
     */
    marginTrim?: MarginTrim_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker
     */
    marker?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-end
     */
    markerEnd?: Marker_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-mid
     */
    markerMid?: Marker_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
     */
    markerStart?: Marker_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask
     */
    mask?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image
     */
    maskBorder?: MaskBorder_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-outset
     */
    maskBorderMode?: MaskBorderMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-outset
     */
    maskBorderOutset?: BorderImageOutset_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-repeat
     */
    maskBorderRepeat?: BorderImageRepeat_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-slice
     */
    maskBorderSlice?: BorderImageSlice_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-source
     */
    maskBorderSource?: BorderImageSource_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-width
     */
    maskBorderWidth?: BorderImageWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-clip
     */
    maskClip?: OneOrMany<GeometryBoxKeyword>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite
     */
    maskComposite?: OneOrMany<MaskCompositeKeyword>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
     */
    maskImage?: OneOrMany<CssImage>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode
     */
    maskMode?: OneOrMany<MaskModeKeyword>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-origin
     */
    maskOrigin?: OneOrMany<GeometryBoxKeyword>;

     /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position
     */
    maskPosition?: CssMultiPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-repeat
     */
    maskRepeat?: OneOrMany<BackgroundRepeat>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size
     */
    maskSize?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type
     */
    maskType?: MaskTypeKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/math-style
     */
    mathStyle?: MathStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size
     */
    maxBlockSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
     */
    maxHeight?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size
     */
    maxInlineSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
     */
    maxWidth?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size
     */
    minBlockSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-height
     */
    minHeight?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size
     */
    minInlineSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
     */
    minWidth?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
     */
    mixBlendMode?: BlendMode;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
     */
    objectFit?: ObjectFit_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
     */
    objectPosition?: CssPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset
     */
    offset?: Offset_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-anchor
     */
    offsetAnchor?: OffsetAnchor_StyleType

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance
     */
    offsetDistance?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
     */
    offsetPath?: OffsetPath_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position
     */
    offsetPosition?: OffsetPosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate
     */
    offsetRotate?: OffsetRotate_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
     */
    opacity?: CssPercent;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/order
     */
    order?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/orphans
     */
    orphans?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline
     */
    outline?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color
     */
    outlineColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset
     */
    outlineOffset?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style
     */
    outlineStyle?: BorderStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width
     */
    outlineWidth?: LineWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
     */
    overflow?: Overflow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
     */
    overflowAnchor?: OverflowAnchor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-block
     */
    overflowBlock?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin
     */
     overflowClipMargin?: OverflowClipMargin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-inline
     */
    overflowInline?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
     */
    overflowWrap?: OverflowWrap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
     */
    overflowX?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
     */
    overflowY?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
     */
    overscrollBehavior?: OverscrollBehavior_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-block
     */
    overscrollBehaviorBlock?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-inline
     */
    overscrollBehaviorInline?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-x
     */
    overscrollBehaviorX?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-y
     */
    overscrollBehaviorY?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding
     */
    padding?: OneOrBox<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block
     */
    paddingBlock?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paddingB-bock-end
     */
    paddingBlockEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-start
     */
    paddingBlockStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom
     */
    paddingBottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline
     */
    paddingInline?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end
     */
    paddingInlineEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start
     */
    paddingInlineStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left
     */
    paddingLeft?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right
     */
    paddingRight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top
     */
    paddingTop?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-after
     */
    pageBreakAfter?: BreakAfter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-before
     */
    pageBreakBefore?: BreakBefore_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-inside
     */
    pageBreakInside?: BreakInside_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
     */
    paintOrder?: PaintOrder_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
     */
    perspective?: Perspective_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
     */
    perspectiveOrigin?: PerspectiveOrigin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
     */
    placeContent?: PlaceContent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
     */
    placeItems?: PlaceItems_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self
     */
    placeSelf?: PlaceSelf_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
     */
    pointerEvents?: PointerEvents_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
     */
    position?: Position_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes
     */
    quotes?: Quotes_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
     */
    resize?: Resize_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/right
     */
    right?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
     */
    rotate?: Rotate_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
     */
    rowGap?: RowGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-align
     */
    rubyAlign?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-overhang
     */
    rubyOverhang?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-position
     */
    rubyPosition?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
     */
    scale?: Scale_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
     */
    scrollBehavior?: ScrollBehavior_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin
     */
    scrollMargin?: OneOrBox<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block
     */
    scrollMarginBlock?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block-end
     */
    scrollMarginBlockEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block-start
     */
    scrollMarginBlockStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-bottom
     */
    scrollMarginBottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline
     */
    scrollMarginInline?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline-end
     */
    scrollMarginInlineEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline-start
     */
    scrollMarginInlineStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-left
     */
    scrollMarginLeft?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-right
     */
    scrollMarginRight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top
     */
    scrollMarginTop?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding
     */
    scrollPadding?: OneOrBox<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-block
     */
    scrollPaddingBlock?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-block-end
     */
    scrollPaddingBlockEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-block-start
     */
    scrollPaddingBlockStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-bottom
     */
    scrollPaddingBottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-inline
     */
    scrollPaddingInline?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-inline-end
     */
    scrollPaddingInlineEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-inline-start
     */
    scrollPaddingInlineStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-left
     */
    scrollPaddingLeft?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-right
     */
    scrollPaddingRight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top
     */
    scrollPaddingTop?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
     */
    scrollSnapAlign?: ScrollSnapAlign_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
     */
    scrollSnapStop?: ScrollSnapStop_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
     */
    scrollSnapType?: ScrollSnapType_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
     */
    scrollbarColor?: ScrollbarColor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
     */
    scrollbarGutter?: ScrollbarGutter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
     */
    scrollbarWidth?: ScrollbarWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-image-threshold
     */
    shapeImageThreshold?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-margin
     */
    shapeMargin?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
     */
    shapeOutside?: ShapeOutside_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering
     */
    shapeRendering?: ShapeRendering_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stop-color
     */
    stopColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stop-opacity
     */
    stopOpacity?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke
     */
    stroke?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-dasharray
     */
    strokeDasharray?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-dashoffset
     */
    strokeDashoffset?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-linecap
     */
    strokeLinecap?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-linejoin
     */
    strokeLinejoin?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-miterlimit
     */
    strokeMiterlimit?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-opacity
     */
    strokeOpacity?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-width
     */
    strokeWidth?: DefaultStyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size
     */
    tabSize?: TabSize_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
     */
    tableLayout?: TableLayout_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
     */
    textAlign?: TextAlign_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
     */
    textAlignLast?: TextAlignLast_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor
     */
    textAnchor?: TextAnchor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright
     */
    textCombineUpright?: TextCombineUpright_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
     */
    textDecoration?: TextDecoration_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color
     */
    textDecorationColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line
     */
    textDecorationLine?: TextDecorationLine_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
     */
    textDecorationSkipInk?: TextDecorationSkipInk_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style
     */
    textDecorationStyle?: TextDecorationStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness
     */
    textDecorationThickness?: TextDecorationThickness_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis
     */
    textEmphasis?: TextEmphasis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-color
     */
    textEmphasisColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
     */
    textEmphasisPosition?: TextEmphasisPosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style
     */
    textEmphasisStyle?: TextEmphasisStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-fill-color
     */
    textFillColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent
     */
    textIndent?: TextIndent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
     */
    textJustify?: TextJustify_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-kashida
     */
    textKashida?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-kashida-space
     */
    textKashidaSpace?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
     */
    textOrientation?: TextOrientation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
     */
    textOverflow?: TextOverflow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
     */
    textRendering?: TextRendering_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
     */
    textShadow?: TextShadow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust
     */
    textSizeAdjust?: TextSizeAdjust_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke
     */
    textStroke: TextStroke_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke-color
     */
    textStrokeColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke-width
     */
    textStrokeWidth?: LineWidth;

     /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
     */
    textTransform?: TextTransform_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position
     */
    textUnderlinePosition?: TextUnderlinePosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/top
     */
    top?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
     */
    touchAction?: TouchAction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
     */
    transform?: Transform_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box
     */
    transformBox?: TransformBox_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
     */
    transformOrigin?: TransformOrigin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
     */
    transformStyle?: TransformStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
     */
    transition?: Transition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay
     */
    transitionDelay?: OneOrMany<CssTime>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
     */
    transitionDuration?: OneOrMany<CssTime>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
     */
    transitionProperty?: TransitionProperty_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
     */
    transitionTimingFunction?: TimingFunction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/translate
     */
    translate?: Translate_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
     */
    unicodeBidi?: UnicodeBidi_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
     */
    userSelect?: UserSelect_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
     */
    verticalAlign?: VerticalAlign_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
     */
    visibility?: Visibility_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
     */
    vectorEffect?: VectorEffect_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
     */
    whiteSpace?: WhiteSpace_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/widows
     */
    widows?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/width
     */
    width?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
     */
    willChange?: WillChange_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
     */
    wordBreak?: WordBreak_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
     */
    wordSpacing?: WordSpacing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
     */
    writingMode?: WritingMode_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
     */
    zIndex?: ZIndex_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/zoom
     * @deprecated
     */
    zoom?: Zoom_StyleType;
}



/**
 * The ExtendedBaseStyleset type maps all CSS properties defined in the [[IStyleset]] interface to the
 * "extended" versions of their types. These extended types are defined by adding basic keywords
 * (e.g. "unset", "initial", etc.) as well as [[StringProxy]] and [[ICustomVar]] to the type that
 * is defined in the IStyleset interface.
 * @category Styleset
 */
export type ExtendedBaseStyleset = { [K in keyof IStyleset]?: ExtendedProp<IStyleset[K]> }



/**
 * The `IVarTemplateStyleset` interface maps template names to the types, which can be used for
 * defining custom CSS properties (a.k.a. variables). Normally, variables are defined using the
 * names of the style properties and their type is determined by the type of this property in the
 * [[IStyleset]] interface. Sometimes, however, there is a need to define variables of some other
 * types, for which there is no suitable style property. The `IVarTemplateStyleset` interface provides
 * many basic types and it can also be extended using the TypeScript's module augmentation.
 */
export interface IVarTemplateStyleset extends IStyleset
{
    /** Allows having CSS variables and constants that accept value of any type */
    "any"?: any;

    /** Allows having CSS variables and constants that accept a `<string>` value */
    CssString?: CssString;

    /** Allows having CSS variables and constants that accept a `<number>` CSS value */
    CssNumber?: CssNumber;

    /** Allows having CSS variables and constants that accept a `<length>` CSS value */
    CssLength?: CssLength;

    /** Allows having CSS variables and constants that accept an `<angle>` CSS value */
    CssAngle?: CssAngle;

    /** Allows having CSS variables and constants that accept a `<time>` CSS value */
    CssTime?: CssTime;

    /** Allows having CSS variables and constants that accept a `<resolution>` CSS value */
    CssResolution?: CssResolution;

    /** Allows having CSS variables and constants that accept a `<frequency>` CSS value */
    CssFrequency?: CssFrequency;

    /** Allows having CSS variables and constants that accept a `<percent>` CSS value */
    CssPercent?: CssPercent;

    /** Allows having CSS variables and constants that accept a size value */
    CssSize?: CssSize;

    /** Allows having CSS variables and constants that accept a point value */
    CssPoint?: CssPoint;

    /** Allows having CSS variables and constants that accept a `<position>` CSS value */
    CssPosition?: CssPosition;

    /** Allows having CSS variables and constants that accept multiple `<position>` CSS values */
    CssMultiPosition?: CssMultiPosition;

    /** Allows having CSS variables and constants that accept a `<radius>` CSS value */
    CssRadius?: CssRadius;

    /** Allows having CSS variables and constants that accept a `<ratio>` CSS value */
    CssAspectRatio?: CssAspectRatio;

    /** Allows having CSS variables and constants that accept a `<color>` CSS value */
    CssColor?: CssColor;

    /** Allows having CSS variables and constants that accept an `<image>` CSS value */
    CssImage?: CssImage;
}



/**
 * The VarTemplateName type defines the keys (strings) that can be used as templates for defining
 * custom CSS properties using the [[$var]] function.
 * @category Style Helper
 */
export type VarTemplateName = keyof IVarTemplateStyleset;

/**
 * The VarValueType generic type defines the type of the value that can be assigned to the custom
 * CSS property using the generic type K as its template.
 * @category Style Helper
 */
export type VarValue<K extends VarTemplateName> = IVarTemplateStyleset[K];

/**
 * The VarValueType generic type defines the type of the value that can be assigned to the custom
 * CSS property using the generic type K as its template.
 * @category Style Helper
 */
export type ExtendedVarValue<K extends VarTemplateName> = ExtendedProp<VarValue<K>>;

// // The following would be more correct type representation; however, TypeScript produces error
// // "TS2590: Expression produces a union type that is too complex to represent".
// export type ExtendedVarValue<K extends VarTemplateName> =
//     K extends keyof IStyleset ? ExtendedProp<VarValue<K>> : Extended<VarValue<K>>;



/**
 * The `CustomVar_StyleType` type represents a custom CSS property name and value that are used to
 * define custom properties in a Styleset. This object is used in conjunction with the
 * `"--""` property of the Styleset type.
 *
 * `CustomVar_StyleType` objects should be mostly used to override custom properties that have
 * previously been defined at the top-level using the [[$var]] function. That way you can have a
 * "global" value of a custom property and assign a different value to it under a certain CSS
 * selector.
 *
 * The values of the type can be specified as either a two-item or a three-item tuple or as style
 * definition class or style definition object.
 *
 * The two-item tuple is used with a previously defined custom CSS property represented by an [[IVarRule]]
 * object:
 * - The first item is the [[IVarRule]] object.
 * - The second item is the value
 *
 * The three-item array allows explicitly specifying the custom CSS property name:
 * - The first item is a string - the name of the custom CSS property. If the name is not prefixed
 * with two dashes they will be added automatically.
 * - The second item is the name of a non-custom CSS property whose type determines the type of the
 * custom property value.
 * - The third item is the value
 *
 * If a style definition class or style definition object are specified, then all custom properties
 * defined in this style definition with their values are inserted into the styleset. If the style
 * definition is not processed yet, it is processed right away.
 *
 * Use the `CustomVar_StyleType` type in the following manner:
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // define global custom CSS property and re-define its value under "brown" class.
 *     mainColor = this.$var( "color", "black");
 *     brown = this.$class({ "--": [ [this.mainColor, "brown"] ] })
 *
 *     // define custom CSS property with the given name under "blue" class.
 *     blue = this.$class({ "--": [ ["different-color", "color", "blue"] ] })
 *
 *     // take all custom CSS properties from the given theme.
 *     yellow = this.$class({ "--": [ YellowTheme ] })
 * }
 *
 * class YellowTheme extends css.StyleDefinition
 * {
 *     bg = this.$var( "color", "yellow");
 *     fg = this.$var( "color", "brown");
 *     link = this.$var( "color", "orange");
 * }
 * ```
 *
 * This is equivalent to the following CSS:
 *
 * ```css
 * :root { --MyStyles_mainColor: black; }
 * .brown { --MyStyles_mainColor: brown; }
 * .blue { --different-color: blue; }
 * .yellow
 * {
 *   --bg: yellow;
 *   --fg: brown;
 *   --link: orange;
 * }
 * ```
 * @category Style Helper
 */
export type CustomVar_StyleType<K extends VarTemplateName = any> =
    [IVarRule<K>, ExtendedVarValue<K>] |
    [string, K, ExtendedVarValue<K>] |
    IStyleDefinitionClass |
    IStyleDefinition



/**
 * Type representing a collection of style properties and their values. In addition to the
 * properties representing the standard CSS styles, this type also includes the "--" property,
 * which is an array of [[CustomVar_StyleType]] objects each specifying a value for a single
 * custom property.
 * @category Styleset
 */
export type Styleset = ExtendedBaseStyleset &
    {
        /**
         * Special property "--" specifies an array that contains [[CustomVar_StyleType]] objects each
         * representing a definition of a custom CSS property.
         */
        "--"?: CustomVar_StyleType[];
    };



/**
 * The StringStyleset type maps CSS properties including custom properties to the string values.
 * @category Styleset
 */
export type StringStyleset = { [K: string]: string | null | undefined }



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Serialization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The ICssSerializer interface allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
 export interface ICssSerializer
 {
     /**
      * Adds style definition class or instance.
      */
     add( instOrClass: IStyleDefinition | IStyleDefinitionClass): void;

     /**
      * Returns concatenated string representation of all CSS rules added to the context.
      */
     serialize(): string;
 }



