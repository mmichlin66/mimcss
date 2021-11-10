import {
    Extended, OneOrPair, OneOrBox, OneOrMany, CssString, CssImage, ICursorFunc, IUrlFunc
} from "./CoreTypes"
import {
    CssNumber, CssPosition, CssTime, CssLength, CssAngle, CssPercent, HorizontalPositionKeyword,
    VerticalPositionKeyword, IFitContentProxy, ILengthProxy, CssAspectRatio, IRectProxy, CssLengthOrAuto,
    AngleUnits, FrequencyUnits, LengthUnits, PercentUnits, ResolutionUnits, TimeUnits
} from "./NumericTypes"
import {CssColor, CssNonNumericColor} from "./ColorTypes";
import {FontStretchKeyword, FontStyle, FontWeight, SystemFont} from "./FontTypes";
import {
    BasicShape, IMinMaxFunc, IRepeatFunc, IGridSpanFunc, FilterFuncs,
    IRayFunc, IStepsFunc, ICubicBezierFunc, TransformFuncs
} from "./ShapeTypes";
import {
    IVarRule, IAnimationRule, ICounterRule, IIDRule, IGridLineRule, IGridAreaRule, ICounterStyleRule
} from "./RuleTypes";
import {IStyleset} from "./Stylesets";



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
    ["pan-x" | "pan-left" | "pan-right",  "pan-y" | "pan-up" | "pan-down"] |
    ["pan-x" | "pan-left" | "pan-right",  "pinch-zoom"] |
    ["pan-y" | "pan-up" | "pan-down", "pinch-zoom"] |
    ["pan-x" | "pan-left" | "pan-right",  "pan-y" | "pan-up" | "pan-down", "pinch-zoom"];



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
 * Type for single [[transitionProperty]] style property
 * @category Style Helper
 */
export type TransitionProperty = "none" | "all" | keyof IStyleset | IVarRule;

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



