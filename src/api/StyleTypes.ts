import {Extended, OneOrPair, OneOrBox, OneOrMany, ExtendedProp, IQuotedProxy, Global_StyleType} from "./CoreTypes"
import {
    CssNumber, CssPosition, CssTime, CssLength, CssAngle, CssPercent, CssFrequency, CssResolution,
    CssRadius, HorizontalPositionKeyword, VerticalPositionKeyword, CssPoint, IFitContentProxy,
    ILengthProxy, CssSize, CssAspectRatio, IRectProxy, CssLengthOrAuto
} from "./NumericTypes"
import {CssColor, CssNonNumericColor} from "./ColorTypes";
import {
    FontKerning, FontOpticalSizing, FontSize, FontStretch, FontStyle, FontSynthesis, FontVariantCaps,
    FontVariantPosition, FontWeight, SystemFont
} from "./FontTypes";
import {
    IUrlProxy, BasicShape, CssImage, IMinMaxProxy, IRepeatProxy, ISpanProxy, IFilterProxy,
    ITransformProxy, IRayProxy, ITimingFunctionProxy, ICursorProxy, BorderRadius, FillRule
} from "./ShapeTypes";
import {
    IVarRule, IAnimationRule, ICounterRule, IIDRule, IGridLineRule, IGridAreaRule, IStyleDefinition,
    IStyleDefinitionClass, ICounterStyleRule
} from "./RuleTypes";




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS property types.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type for [[alignContent]] style property.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#align-content
 * @category Style Property
 */
export type AlignContent_StyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center" |
    "space-between" | "space-around" | "space-evenly";



/**
 * Type for [[alignItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#align-items
 * @category Style Property
 */
export type AlignItems_StyleType = "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "baseline" | "first baseline" | "last baseline" | "safe center" | "unsafe center";



/**
 * Type for [[alignSelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#align-self
 * @category Style Property
 */
export type AlignSelf_StyleType = "auto" | "normal" | "stretch" | "center" | "start" | "end" | "flex-start" | "flex-end" |
    "self-start" | "self-end" | "baseline" | "first baseline" | "last baseline" |
    "safe center" | "unsafe center";



/**
 * Type for [[alignmentBaseline]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/alignment-baseline
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#alignment-baseline
 * @category Style Property
 */
export type AlignmentBaseline_StyleType = "auto" | "baseline" | "before-edge" | "text-before-edge" |
    "middle" | "central" | "after-edge" | "text-after-edge" | "ideographic" | "alphabetic" |
    "hanging" | "mathematical" | "top" | "center" | "bottom";



/**
 * Type for single animation. Used by [[Animation_StyleType]].
 * @category Style Helper
 */
export type Animation_Single =
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation
 * @category Style Property
 */
export type Animation_StyleType = OneOrMany<Animation_Single>;



/**
 * Type for [[animationDelay]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-delay
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-direction
 * @category Style Property
 */
export type AnimationDirection_StyleType = OneOrMany<AnimationDirection>;



/**
 * Type for [[animationDuration]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-duration
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-fill-mode
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-iteration-count
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-name
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-play-state
 * @category Style Property
 */
export type AnimationPlayState_StyleType = OneOrMany<AnimationPlayState>;



/**
 * Type for simple animation timing functions - those that don't have parameters
 * @category Style Helper
 */
export type TimingFunctionKeyword = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "step-start" | "step-end";

/**
 * Type for single animation timing function
 * @category Style Helper
 */
export type TimingFunction = TimingFunctionKeyword | ITimingFunctionProxy;

/**
 * Type for [[animationTimingFunction]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-timing-function
 * @category Style Property
 */
export type AnimationTimingFunction_StyleType = OneOrMany<TimingFunction>;



/**
 * Type for [[aspectRatio]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#aspect-ratio
 * @category Style Property
 */
export type AspectRatio_StyleType = CssAspectRatio | "auto";



/**
 * Type for [[backfaceVisibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#backface-visibility
 * @category Style Property
 */
export type BackfaceVisibilityMode_StyleType = "visible" | "hidden";



/**
 * Type for single background value
 * @category Style Helper
 */
export type Background_Single = CssColor |
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-attachment
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-blend-mode
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-clip
 * @category Style Property
 */
export type BackgroundClip_StyleType = OneOrMany<BackgroundClip>;



/**
 * Type for [[backgroundImage]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-image
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-origin
 * @category Style Property
 */
export type BackgroundOrigin_StyleType = OneOrMany<BackgroundOrigin>;



/**
 * Type for [[backgroundPosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-position
 * @category Style Property
 */
export type BackgroundPosition_StyleType = OneOrMany<CssPosition>;



/**
 * Type for background-position-x single item
 * @category Style Helper
 */
export type BackgroundPositionX = HorizontalPositionKeyword | CssLength |
    [HorizontalPositionKeyword , Extended<CssLength>];

/**
 * Type for [[backgroundPositionX]] style property. To use the two-value syntax, e.g. `left 30px`,
 * the values must specified as a tuple inside an array; that is: `[["left", 30]]`. If values
 * are put into a single array, they will be considered two different items and will be
 * separated by comma. For example: `["left", 30]` will become `left, 30px`.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-x
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-position-x
 * @category Style Property
 */
export type BackgroundPositionX_StyleType = OneOrMany<BackgroundPositionX>;



/**
 * Type for background-position-y single item
 * @category Style Helper
 */
export type BackgroundPositionY = VerticalPositionKeyword | CssLength |
    [VerticalPositionKeyword , Extended<CssLength>];

/**
 * Type for [[backgroundPositionY]] style property. To use the two-value syntax, e.g. `top 30px`,
 * the values must specified as a tuple inside an array; that is: `[["top", 30]]`. If values
 * are put into a single array, they will be considered two different items and will be
 * separated by comma. For example: `["top", 30]` will become `top, 30px`.
 *
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-y
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-position-y
 * @category Style Property
 */
export type BackgroundPositionY_StyleType = OneOrMany<BackgroundPositionY>;



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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-repeat
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-size
 * @category Style Property
 */
export type BackgroundSize_StyleType = OneOrMany<BackgroundSize>;



/**
 * Type for [[baselineShift]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#baseline-shift
 * @category Style Property
 */
export type BaselineShift_StyleType = "sub" | "super" | CssLength;



/**
 * Type for [[borderCollapse]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-collapse
 * @category Style Property
 */
export type BorderColapse_StyleType = "collapse" | "separate";



/**
 * Type for [[borderColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-color
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image
 * @category Style Property
 */
export type BorderImage_StyleType = CssImage | BorderImage_Object;

/**
 * Type for [[borderImageOutset]] style property. It is CssNumber and not CssLength because
 * border-image-outset can be specified as a unitless number.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-outset
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-repeat
 * @category Style Property
 */
export type BorderImageRepeat_StyleType = OneOrPair<BorderImageRepeatKeyword>;

/**
 * Type for [[borderImageSlice]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-slice
 * @category Style Property
 */
export type BorderImageSlice_StyleType = OneOrBox<CssPercent> |
    [Extended<CssPercent>, boolean?] |
    [Extended<CssPercent>, Extended<CssPercent>, boolean?] |
    [Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, boolean?] |
    [Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, Extended<CssPercent>, boolean?];

/**
 * Type for [[borderImageSource]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-source
 * @category Style Property
 */
export type BorderImageSource_StyleType = OneOrBox<CssImage> | "none";

/**
 * Type for [[borderImageWidth]] style property. It is CssNumber and not CssLength because
 * border-image-width can be specified as a unitless number.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#
 * @category Style Property
 */
export type BorderImageWidth_StyleType = OneOrBox<CssNumber | ILengthProxy | "auto">;



/**
 * Type for [[borderSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-spacing
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-style
 * @category Style Property
 */
export type BorderStyle_StyleType = OneOrBox<BorderStyle>;



/**
 * Type for [[border]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border
 * @category Style Property
 */
export type Border_StyleType = BorderWidth | BorderStyle | CssNonNumericColor |
    [Extended<BorderWidth>, Extended<BorderStyle>, Extended<CssColor>?] |
    [Extended<BorderWidth>, Extended<CssColor>, Extended<BorderStyle>?] |
    [Extended<BorderStyle>, Extended<BorderWidth>, Extended<CssColor>?] |
    [Extended<BorderStyle>, Extended<CssColor>, Extended<BorderWidth>?] |
    [Extended<CssNonNumericColor>, Extended<BorderWidth>, Extended<BorderStyle>?] |
    [Extended<CssNonNumericColor>, Extended<BorderStyle>, Extended<BorderWidth>?];



/**
 * Type for border side width style property
 * @category Style Helper
 */
export type BorderWidth = "thin" | "medium" | "thick" | CssLength;

/**
 * Type for [[borderWidth]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-width
 * @category Style Property
 */
export type BorderWidth_StyleType = OneOrBox<BorderWidth>;




/**
 * Type for [[boxDecorationBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#box-decoration-break
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#box-shadow
 * @category Style Property
 */
export type BoxShadow_StyleType = OneOrMany<BoxShadow>;



/**
 * Type for [[boxSizing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#box-sizing
 * @category Style Property
 */
export type BoxSizing_StyleType = "content-box" | "border-box";



/**
 * Type for [[breakAfter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#break-after
 * @category Style Property
 */
export type BreakAfter_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/**
 * Type for [[breakBefore]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-before
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#break-before
 * @category Style Property
 */
export type BreakBefore_StyleType = "auto" | "avoid" | "always" | "all" | "avoid-page" | "page" |
    "left" | "right" | "recto" | "verso" | "avoid-column" | "column" |
    "avoid-region" | "region";



/**
 * Type for [[breakInside]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#break-inside
 * @category Style Property
 */
export type BreakInside_StyleType = "auto" | "avoid" | "avoid-page" | "avoid-column" | "avoid-region";



/**
 * Type for [[captionSide]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#caption-side
 * @category Style Property
 */
export type CaptionSide_StyleType = "top" | "bottom" | "block-start" | "block-end" | "inline-start" | "inline-end";



/**
 * Type for [[caretColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#caret-color
 * @category Style Property
 */
export type CaretColor_StyleType = "auto" | CssColor;



/**
 * Type for [[clear]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clear
 * @category Style Property
 */
export type Clear_StyleType = "none" | "left" | "right" | "both" | "inline-start" | "inline-end";



/**
 * Type for [[IBaseStyleset.clip|clip]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clip
 * @category Style Property
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clip-pat
 * @category Style Property
 */
export type ClipPath_StyleType = "none" | IUrlProxy | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/**
 * Type for [[clipRule]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-rule
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clip-rule
 * @category Style Property
 */
export type ClipRule_StyleType = "nonzero" | "evenodd";



/**
 * Type for [[colorInterpolation]] and color-interpolation-filters style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#color-interpolation
 * @category Style Property
 */
export type ColorInterpolation_StyleType = "auto" | "sRGB" | "linearRGB";



/**
 * Type for [[columnCount]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-count
 * @category Style Property
 */
export type ColumnCount_StyleType = "auto" | number;



/**
 * Type for [[columnFill]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-fill
 * @category Style Property
 */
export type ColumnFill_StyleType = "auto" | "balance" | "balance-all";



/**
 * Type for [[columnGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-gap
 * @category Style Property
 */
export type ColumnGap_StyleType = "normal" | CssLength;



/**
 * Type for [[columnSpan]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-span
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#columns
 * @category Style Property
 */
export type Columns_StyleType = "auto" | CssNumber | Exclude<CssLength,number> |
    ["auto" | Extended<CssNumber>, "auto" | Extended<Exclude<CssLength,number>>] |
    ["auto" | Extended<Exclude<CssLength,number>>, "auto" | Extended<CssNumber>];
// Note that no special coversion function is required for this property because the number type will
// always be converted to a unitless number



/**
 * Type for [[IBaseStyleset.contain|contain]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#contain
 * @category Style Property
 */
export type Contain_StyleType = "none" | "strict" | "content" | "size" | "layout" | "style" | "paint" |
    Extended<"size" | "layout" | "style" | "paint">[];



/**
 * Type for [[content]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#content
 * @category Style Property
 */
export type Content_StyleType = string | "none" | "normal" |
    OneOrMany<CssImage |"open-quote" | "close-quote" | "no-open-quote" | "no-close-quote">;



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
 * Type for [[IBaseStyleset.cursor|cursor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#cursor
 * @category Style Property
 */
export type Cursor_StyleType = OneOrMany<CursorKeyword | IUrlProxy | ICursorProxy>;



/**
 * Type for [[IBaseStyleset.direction|direction]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/direction
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#direction
 * @category Style Property
 */
export type Direction_StyleType = "ltr" | "rtl";



/**
 * Type for [[display]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#display
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#dominant-baseline
 * @category Style Property
 */
export type DominantBaseline_StyleType = "auto" | "text-bottom" | "alphabetic" | "ideographic" | "middle" |
    "central" | "mathematical" | "hanging" | "text-top";



/**
 * Type for [[emptyCells]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#empty-cells
 * @category Style Property
 */
export type EmptyCells_StyleType = "show" | "hide";



/**
 * Type for [[filter]] and [[backdropFilter]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#filter
 * @category Style Property
 */
export type Filter_StyleType = OneOrMany<IUrlProxy | IFilterProxy>;



/**
 * Type for [[flex]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex
 * @category Style Property
 */
export type Flex_StyleType = FlexBasis_StyleType |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<FlexBasis_StyleType>];



/**
 * Type for [[flexBasis]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-basis
 * @category Style Property
 */
export type FlexBasis_StyleType = CssLengthOrAuto | "content" | "fill" | "max-content" | "min-content" | "fit-content";



/**
 * Type for [[flexDirection]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-direction
 * @category Style Property
 */
export type FlexDirection_StyleType = "row" | "row-reverse" | "column" | "column-reverse";



/**
 * Type for [[flexFlow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-flow
 * @category Style Property
 */
export type FlexFlow_StyleType = FlexDirection_StyleType | FlexWrap_StyleType |
    [Extended<FlexDirection_StyleType>, Extended<FlexWrap_StyleType>];



/**
 * Type for [[flexWrap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-wrap
 * @category Style Property
 */
export type FlexWrap_StyleType = "nowrap" | "wrap" | "wrap-reverse";



/**
 * Type for [[float]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/float
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#float
 * @category Style Property
 */
export type Float_StyleType = "left" | "right" | "none" | "inline-start" | "inline-end";



/**
 * Type for [[font]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font
 * @category Style Property
 */
export type Font_StyleType = SystemFont |
    {
        size: Extended<CssLength>;
        family: Extended<string>;
        style?: Extended<FontStyle>;
        variant?: Extended<string>;
        weight?: Extended<FontWeight_StyleType>;
        stretch?: Extended<FontStretch>;
        lineHeight?: Extended<CssNumber>
    };



/**
 * Type for [[fontWeight]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-weight
 * @category Style Property
 */
export type FontWeight_StyleType = FontWeight | "bolder" | "lighter";



/**
 * Type for [[gap]] or [[gridGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#gap
 * @category Style Property
 */
export type Gap_StyleType = RowGap_StyleType | [RowGap_StyleType, ColumnGap_StyleType];



/**
 * Type for [[gridAutoColumns]] and [[gridAutoRows]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-auto-columns
 * @category Style Property
 */
export type GridAutoAxis_StyleType = OneOrMany<GridTrackSize>;



/**
 * Type for [[gridAutoFlow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-auto-flow
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-column-start
 * @category Style Property
 */
export type GridAxisSide_StyleType = "auto" | GridLineCountOrName | ISpanProxy |
    [Extended<CssNumber>, IGridAreaRule | IGridLineRule];



/**
 * Type for [[gridColumn]] and [[gridRow]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-column
 * @category Style Property
 */
export type GridAxis_StyleType = OneOrPair<GridAxisSide_StyleType>;



/**
 * Type for [[gridArea]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-area
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-template-areas
 * @category Style Property
 */
export type GridTemplateAreas_StyleType = "none" | OneOrMany<IQuotedProxy> |
    GridTemplateAreaDefinition[];



/**
 * Type for [[gridTemplateColumns]] and [[gridTemplateRows]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-template-columns
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
    IFitContentProxy | IMinMaxProxy | IRepeatProxy;



/**
 * Type for [[hyphens]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#hyphens
 * @category Style Property
 */
export type Hyphens_StyleType = "none" | "manual" | "auto";



/**
 * Type for [[imageRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#image-rendering
 * @category Style Property
 */
export type ImageRendering_StyleType = "auto" | "crisp-edges" | "pixelated";



/**
 * Type for [[isolation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/isolation
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#isolation
 * @category Style Property
 */
export type Isolation_StyleType = "auto" | "isolate";



/**
 * Type for [[justifyContent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#justify-content
 * @category Style Property
 */
export type JustifyContent_StyleType = "normal" | "space-between" | "space-around" | "space-evenly" | "stretch" |
    "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/**
 * Type for [[justifyItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#justify-items
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#justify-self
 * @category Style Property
 */
export type JustifySelf_StyleType = "auto" | "normal" | "stretch" | "baseline" | "first baseline" | "last baseline" |
    "center" | "start" | "end" | "self-start" | "self-end" | "flex-start" | "flex-end" | "left" | "right" |
    "safe center" | "safe start" | "safe end" | "safe self-start" | "safe self-end" | "safe flex-start" | "safe flex-end" | "safe left" | "safe right" |
    "unsafe center" | "unsafe start" | "unsafe end" | "unsafe self-start" | "unsafe self-end" | "unsafe flex-start" | "unsafe flex-end" | "unsafe left" | "unsafe right";



/**
 * Type for [[letterSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#letter-spacing
 * @category Style Property
 */
export type LetterSpacing_StyleType = "normal" | CssLength;



/**
 * Type for [[lineBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#line-break
 * @category Style Property
 */
export type LineBreak_StyleType = "auto" | "loose" | "normal" | "strict" | "anywhere";



/**
 * Type for [[IBaseStyleset.lineHeight|lineHeight]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#line-height
 * @category Style Property
 */
export type LineHeight_StyleType = CssNumber | ILengthProxy;



/**
 * Type for [[listStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style-image
 * @category Style Property
 */
export type ListStyleImage_StyleType = "none" | IUrlProxy;



/**
 * Type for [[listStylePosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style-position
 * @category Style Property
 */
export type ListStylePosition_StyleType = "inside" | "outside";



/**
 * Type for [[listStyleType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style-type
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-trim
 * @category Style Property
 */
export type MarginTrim_StyleType = "none" | "in-flow" | "all";



/**
 * Type for the [[markerStart]], [[markerMid]] and [[markerEnd]] style properties
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#marker-start
 * @category Style Property
 */
export type Marker_StyleType = "none" | IIDRule;



/**
 * Type for the [[objectFit]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#object-fit
 * @category Style Property
 */
export type ObjectFit_StyleType = "fill" | "contain" | "cover" | "none" | "scale-down";



/**
 * Type for the [[offset]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-anchor
 * @category Style Property
 */
export type OffsetAnchor_StyleType = "auto" | CssPosition;



/**
 * Type for [[offsetPath]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-path
 * @category Style Property
 */
export type OffsetPath_StyleType = "none" | IRayProxy | IUrlProxy | BasicShape | GeometryBoxKeyword |
    [GeometryBoxKeyword, BasicShape];



/**
 * Type for the [[offsetRotate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-rotate
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow
 * @category Style Property
 */
export type Overflow_StyleType = OneOrPair<OverflowKeyword>;



/**
 * Type for the [[overflowAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-ancho
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-ancho
 * @category Style Property
 */
export type OverflowAnchor_StyleType = "auto" | "none";



/**
 * Type for the [[overflowWrap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-wrap
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overscroll-behavior
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#paint-order
 * @category Style Property
 */
export type PaintOrder_StyleType = "normal" | PaintOrderKeyword |
    [PaintOrderKeyword, PaintOrderKeyword?, PaintOrderKeyword?];



/**
 * Type for the [[perspective]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#perspective
 * @category Style Property
 */
export type Perspective_StyleType = "none" | CssLength;



/**
 * Type for the [[perspectiveOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#perspective-origin
 * @category Style Property
 */
export type PerspectiveOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>];



/**
 * Type for the [[placeContent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#place-content
 * @category Style Property
 */
export type PlaceContent_StyleType = AlignContent_StyleType | [Extended<AlignContent_StyleType>, Extended<JustifyContent_StyleType>];



/**
 * Type for the [[placeItems]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#place-items
 * @category Style Property
 */
export type PlaceItems_StyleType = AlignItems_StyleType | [Extended<AlignItems_StyleType>, Extended<JustifyItems_StyleType>];



/**
 * Type for the [[placeSelf]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#place-self
 * @category Style Property
 */
export type PlaceSelf_StyleType = AlignSelf_StyleType | [Extended<AlignSelf_StyleType>, Extended<JustifySelf_StyleType>];



/**
 * Type for the [[pointerEvents]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#pointer-events
 * @category Style Property
 */
export type PointerEvents_StyleType = "auto" | "none" | "visiblePainted" | "visibleFill" | "visibleStroke" | "visible" |
    "painted" | "fill" | "stroke" | "all";



/**
 * Type for the [[IBaseStyleset.position|position]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#position
 * @category Style Property
 */
export type Position_StyleType = "static" | "relative" | "absolute" | "sticky" | "fixed";



/**
 * Type for the [[quotes]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#quotes
 * @category Style Property
 */
export type Quotes_StyleType = "none" | "auto" | Extended<string>[];



/**
 * Type for the [[resize]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#resize
 * @category Style Property
 */
export type Resize_StyleType = "none" | "both" | "horizontal" | "vertical" | "block" | "inline";



/**
 * Type for [[IBaseStyleset.rotate|rotate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#rotate
 * @category Style Property
 */
export type Rotate_StyleType = "none" | CssAngle | ["x" | "y" | "z", Extended<CssAngle>] |
    [Extended<CssNumber>, Extended<CssNumber>, Extended<CssNumber>, Extended<CssAngle>];



/**
 * Type for [[rowGap]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#row-gap
 * @category Style Property
 */
export type RowGap_StyleType = CssLength;



/**
 * Type for the [[IBaseStyleset.scale|scale]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scale
 * @category Style Property
 */
export type Scale_StyleType = "none" | CssNumber |
    [Extended<CssNumber>, Extended<CssNumber>?, Extended<CssNumber>?];



/**
 * Type for the [[scrollbarColor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scrollbar-color
 * @category Style Property
 */
export type ScrollbarColor_StyleType = "auto" | "dark" | "light" |
    [Extended<CssColor>, Extended<CssColor>];



/**
 * Type for the [[scrollbarWidth]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scrollbar-width
 * @category Style Property
 */
export type ScrollbarWidth_StyleType = "auto" | "thin" | "none";



/**
 * Type for the [[scrollBehavior]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-behavior
 * @category Style Property
 */
export type ScrollBehavior_StyleType = "auto" | "smooth";



/**
 * Type for the [[scrollSnapAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-snap-align
 * @category Style Property
 */
export type ScrollSnapAlign_StyleType = OneOrPair<"none" | "start" | "end" | "center">;



/**
 * Type for the [[scrollSnapStop]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-snap-stop
 * @category Style Property
 */
export type ScrollSnapStop_StyleType = "normal" | "always";



/**
 * Type for the [[scrollSnapType]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-snap-type
 * @category Style Property
 */
export type ScrollSnapType_StyleType = "none" |
    [Extended<"x" | "y" | "block" | "inline" | "both">, Extended<"mandatory" | "proximity">];



/**
 * Type for [[shapeOutside]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#shape-outside
 * @category Style Property
 */
export type ShapeOutside_StyleType = IUrlProxy | BasicShape | GeometryBoxKeyword | CssImage;



/**
 * Type for the [[shapeRendering]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#shape-rendering
 * @category Style Property
 */
export type ShapeRendering_StyleType = "auto" | "optimizeSpeed" | "crispEdges" | "geometricPrecision";



/**
 * Type for the [[tableLayout]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#table-layout
 * @category Style Property
 */
export type TableLayout_StyleType = "auto" | "fixed";



/**
 * Type for the [[textAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-align
 * @category Style Property
 */
export type TextAlign_StyleType = "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";



/**
 * Type for the [[textAlignLast]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-align-last
 * @category Style Property
 */
export type TextAlignLast_StyleType = "auto" | "start" | "end" | "left" | "right" | "center" | "justify";



/**
 * Type for the [[textAnchor]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-anchor
 * @category Style Property
 */
export type TextAnchor_StyleType = "start" | "middle" | "end";



/**
 * Type for the [[textCombineUpright]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-combine-upright
 * @category Style Property
 */
export type TextCombineUpright_StyleType = "none" | "all" | "digits" | number;



/**
 * Type for the [[textDecoration]] style property. If a number is specified, it will be interpreted
 * as color - not as thickness.
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-line
 * @category Style Property
 */
export type TextDecorationLine_StyleType = "none" | "spelling-error" | "grammar-error" |
    OneOrMany<"underline" | "overline" | "line-through">;



/**
 * Type for the [[textDecorationStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-style
 * @category Style Property
 */
export type TextDecorationStyle_StyleType = "solid" | "double" | "dotted" | "dashed" | "wavy";



/**
 * Type for the [[textDecorationSkipInk]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-skip-ink
 * @category Style Property
 */
export type TextDecorationSkipInk_StyleType = "none" | "auto" | "all";



/**
 * Type for the [[textDecorationThickness]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-thickness
 * @category Style Property
 */
export type TextDecorationThickness_StyleType = "from-font" | CssLengthOrAuto;



/**
 * Type for the [[textEmphasis]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis
 * @category Style Property
 */
export type TextEmphasis_StyleType = TextEmphasisStyle_StyleType | CssColor |
    [Extended<TextEmphasisStyle_StyleType>, Extended<CssColor>];



/**
 * Type for the [[textEmphasisPosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis-position
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis-style
 * @category Style Property
 */
export type TextEmphasisStyle_StyleType = "none" | TextEmphasisFill | TextEmphasisShape |
    [Extended<TextEmphasisFill>, Extended<TextEmphasisShape>];



/**
 * Type for the [[textIndent]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-inden
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-inden
 * @category Style Property
 */
export type TextIndent_StyleType = CssLength |
    [Extended<CssLength>, Extended<OneOrMany<"each-line" | "hanging" | "each-line hanging">>];



/**
 * Type for the [[textJustify]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-justify
 * @category Style Property
 */
export type TextJustify_StyleType = "auto" | "inter-character" | "inter-word" | "none";



/**
 * Type for the [[textOrientation]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-orientation
 * @category Style Property
 */
export type TextOrientation_StyleType = "mixed" | "upright" | "sideways";



/**
 * Type for the [[textOverflow]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-overflow
 * @category Style Property
 */
export type TextOverflow_StyleType = OneOrPair<"clip" | "ellipsis" | "fade" | string>;



/**
 * Type for the single value of the text-shadow style property
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-shadow
 * @category Style Property
 */
export type TextShadow_StyleType = OneOrMany<TextShadow>;



/**
 * Type for the [[textSizeAdjust]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-size-adjust
 * @category Style Property
 */
export type TextSizeAdjust_StyleType = "none" | "auto" | CssPercent;



/**
 * Type for the [[textTransform]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-transform
 * @category Style Property
 */
export type TextTransform_StyleType = "none" | "capitalize" | "uppercase" | "lowercase" | "full-width" | "full-size-kana";



/**
 * Type for the [[textUnderlinePosition]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-underline-position
 * @category Style Property
 */
export type TextUnderlinePosition_StyleType = "auto" | "under" | "left" | "right" | "auto-pos" | "above" | "below";



/**
 * Type for the [[touchAction]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#touch-action
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform
 * @category Style Property
 */
export type Transform_StyleType = "none" | OneOrMany<ITransformProxy>;



/**
 * Type for [[transformBox]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform-box
 * @category Style Property
 */
export type TransformBox_StyleType = "content-box" | "border-box" | "fill-box" | "stroke-box" | "view-box";



/**
 * Type for [[transformOrigin]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform-origin
 * @category Style Property
 */
export type TransformOrigin_StyleType = HorizontalPositionKeyword | VerticalPositionKeyword | CssLength |
    [Extended<HorizontalPositionKeyword | CssLength>, Extended<VerticalPositionKeyword | CssLength>, Extended<CssLength>?];



/**
 * Type for [[transformStyle]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform-style
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
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition
 * @category Style Property
 */
export type Transition_StyleType = OneOrMany<Transition_Single>;



/**
 * Type for single transition-property
 * @category Style Helper
 */
export type TransitionProperty = "none" | "all" | keyof IBaseStyleset;

/**
 * Type for [[transitionProperty]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition-property
 * @category Style Property
 */
export type TransitionProperty_StyleType = OneOrMany<TransitionProperty>;



/**
 * Type for [[transitionTimingFunction]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition-timing-function
 * @category Style Property
 */
export type TransitionTimingFunction_StyleType = OneOrMany<TimingFunction>;



/**
 * Type for the [[IBaseStyleset.translate|translate]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/translate
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#translate
 * @category Style Property
 */
export type Translate_StyleType = "none" | CssLength |
    [Extended<CssLength>, Extended<CssLength>, Extended<CssLength>?];



/**
 * Type for the [[unicodeBidi]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#unicode-bidi
 * @category Style Property
 */
export type UnicodeBidi_StyleType = "normal" | "embed" | "isolate" | "bidi-override" | "isolate-override" | "plaintext";



/**
 * Type for the [[userSelect]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#user-select
 * @category Style Property
 */
export type UserSelect_StyleType = "auto" | "text" | "none" | "contain" | "all";



/**
 * Type for the [[verticalAlign]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#vertical-align
 * @category Style Property
 */
export type VerticalAlign_StyleType = "baseline" | "sub" | "super" | "text-top" | "text-bottom" |
    "middle" | "top" | "bottom" | CssLength;



/**
 * Type for the [[visibility]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#visibility
 * @category Style Property
 */
export type Visibility_StyleType = "visible" | "hidden" | "collapse";



/**
 * Type for the [[vectorEffect]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#vector-effect
 * @category Style Property
 */
export type VectorEffect_StyleType = "none" | "non-scaling-stroke" | "non-scaling-size" | "non-rotation" | "fixed-position";



/**
 * Type for the [[whiteSpace]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#white-space
 * @category Style Property
 */
export type WhiteSpace_StyleType = "normal" | "pre" | "nowrap" | "pre-wrap" | "pre-line" | "break-spaces";



/**
 * Type for [[willChange]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#will-change
 * @category Style Property
 */
export type WillChange_StyleType = "auto" | OneOrMany<"scroll-position" | "contents" | Exclude<keyof IBaseStyleset,"willChange">>;



/**
 * Type for the [[wordBreak]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#word-break
 * @category Style Property
 */
export type WordBreak_StyleType = "normal" | "break-all" | "keep-all" | "break-word";



/**
 * Type for the [[wordSpacing]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#word-spacing
 * @category Style Property
 */
export type WordSpacing_StyleType = "normal" | CssLength;



/**
 * Type for the [[writingMode]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#writing-mode
 * @category Style Property
 */
export type WritingMode_StyleType = "horizontal-tb" | "vertical-rl" | "vertical-lr" | "sideways-rl" | "sideways-lr";



/**
 * Type for the [[zIndex]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#z-index
 * @category Style Property
 */
export type ZIndex_StyleType = "auto" | CssNumber;



/**
 * Type for the [[zoom]] style property
 * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/zoom
 * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#zoom
 * @category Style Property
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
export interface IBaseStyleset
{
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/all
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#all
     */
    all?: Global_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#align-content
     */
    alignContent?: AlignContent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#align-items
     */
    alignItems?: AlignItems_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#align-self
     */
    alignSelf?: AlignSelf_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/alignment-baseline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#alignment-baseline
     */
    alignmentBaseline?: AlignmentBaseline_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation
     */
    animation?: Animation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-delay
     */
    animationDelay?: AnimationDelay_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-direction
     */
    animationDirection?: AnimationDirection_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-duration
     */
    animationDuration?: AnimationDuration_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-fill-mode
     */
    animationFillMode?: AnimationFillMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-iteration-count
     */
    animationIterationCount?: AnimationIterationCount_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-name
     */
    animationName?: AnimationName_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-play-state
     */
    animationPlayState?: AnimationPlayState_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#animation-timing-function
     */
    animationTimingFunction?: AnimationTimingFunction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#aspect-ratio
     */
    aspectRatio?: AspectRatio_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#backdrop-filter
     */
    backdropFilter?: Filter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#backface-visibility
     */
    backfaceVisibility?: BackfaceVisibilityMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background
     */
    background?: Background_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-attachment
     */
    backgroundAttachment?: BackgroundAttachment_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-blend-mode
     */
    backgroundBlendMode?: BackgroundBlendMode_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-clip
     */
    backgroundClip?: BackgroundClip_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-color
     */
    backgroundColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-image
     */
    backgroundImage?: BackgroundImage_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-origin
     */
    backgroundOrigin?: BackgroundOrigin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-position
     */
    backgroundPosition?: BackgroundPosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-x
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-position-x
     */
    backgroundPositionX?: BackgroundPositionX_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-y
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-position-y
     */
    backgroundPositionY?: BackgroundPositionY_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-repeat
     */
    backgroundRepeat?: BackgroundRepeat_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat-x
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-repeat-x
     */
    backgroundRepeatX?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat-y
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-repeat-y
     */
    backgroundRepeatY?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#background-size
     */
    backgroundSize?: BackgroundSize_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#baseline-shift
     */
    baselineShift?: BaselineShift_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/block-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#block-size
     */
    blockSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border
     */
    border?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block
     */
    borderBlock?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bloc-eEnd
     */
    borderBlockEnd?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-end-color
     */
    borderBlockEndColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-end-style
     */
    borderBlockEndStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-end-width
     */
    borderBlockEndWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-start
     */
    borderBlockStart?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-start-color
     */
    borderBlockStartColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-start-style
     */
    borderBlockStartStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-block-start-width
     */
    borderBlockStartWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bottom
     */
    borderBottom?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-cottom-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bottom-color
     */
    borderBottomColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bottom-left-radius
     */
    borderBottomLeftRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bottom-right-radius
     */
    borderBottomRightRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bottom-style
     */
    borderBottomStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-bottom-width
     */
    borderBottomWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-collapse
     */
    borderCollapse?: BorderColapse_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-color
     */
    borderColor?: BorderColor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image
     */
    borderImage?: BorderImage_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-outset
     */
    borderImageOutset?: BorderImageOutset_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-repeat
     */
    borderImageRepeat?: BorderImageRepeat_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-slice
     */
    borderImageSlice?: BorderImageSlice_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-source
     */
    borderImageSource?: BorderImageSource_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-image-width
     */
    borderImageWidth?: BorderImageWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline
     */
    borderInline?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-end
     */
    borderInlineEnd?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-end-color
     */
    borderInlineEndColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-end-style
     */
    borderInlineEndStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-end-width
     */
    borderInlineEndWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-start
     */
    borderInlineStart?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-start-color
     */
    borderInlineStartColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-start-style
     */
    borderInlineStartStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-inline-start-width
     */
    borderInlineStartWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-left
     */
    borderLeft?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-left-color
     */
    borderLeftColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-left-style
     */
    borderLeftStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-left-width
     */
    borderLeftWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-radius
     */
    borderRadius?: BorderRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-right
     */
    borderRight?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-right-color
     */
    borderRightColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-right-style
     */
    borderRightStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-right-width
     */
    borderRightWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-spacing
     */
    borderSpacing?: BorderSpacing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-style
     */
    borderStyle?: BorderStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-top
     */
    borderTop?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-top-color
     */
    borderTopColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-top-left-radius
     */
    borderTopLeftRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-right-radius
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-top-right-radius
     */
    borderTopRightRadius?: CssRadius;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-top-style
     */
    borderTopStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-top-width
     */
    borderTopWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#border-width
     */
    borderWidth?: BorderWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/bottom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#bottom
     */
    bottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#box-decoration-break
     */
    boxDecorationBreak?: BoxDecorationBreak_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#box-shadow
     */
    boxShadow?: BoxShadow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#box-sizing
     */
    boxSizing?: BoxSizing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#break-after
     */
    breakAfter?: BreakAfter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-before
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#break-before
     */
    breakBefore?: BreakBefore_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#break-inside
     */
    breakInside?: BreakInside_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/buffered-rendering
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#buffered-rendering
     */
    bufferedRendering?: DefaultStyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#caption-side
     */
    captionSide?: CaptionSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#caret-color
     */
    caretColor?: CaretColor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clear
     */
    clear?: Clear_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clip
     */
    clip?: Clip_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clip-path
     */
    clipPath?: ClipPath_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-rule
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#clip-rule
     */
    clipRule?: ClipRule_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#color
     */
    color?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#color-interpolation
     */
    colorInterpolation?: ColorInterpolation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-filters
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#color-interpolation-filters
     */
    colorInterpolationFilters?: ColorInterpolation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-count
     */
    columnCount?: ColumnCount_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-fill
     */
    columnFill?: ColumnFill_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-gap
     */
    columnGap?: ColumnGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-rule
     */
    columnRule?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-rule-color
     */
    columnRuleColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-rule-style
     */
    columnRuleStyle?: BorderStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-rule-width
     */
    columnRuleWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-span
     */
    columnSpan?: ColumnSpan_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#column-width
     */
    columnWidth?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/columns
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#columns
     */
    columns?: Columns_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#contain
     */
    contain?: Contain_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#content
     */
    content?: Content_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#counter-increment
     */
    counterIncrement?: CssCounter;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#counter-reset
     */
    counterReset?: CssCounter;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-set
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#counter-set
     */
    counterSet?: CssCounter;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#cursor
     */
    cursor?: Cursor_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/direction
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#direction
     */
    direction?: Direction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#display
     */
    display?: Display_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/dominant-baseline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#dominant-baseline
     */
    dominantBaseline?: DominantBaseline_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#empty-cells
     */
    emptyCells?: EmptyCells_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fill
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#fill
     */
    fill?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fill-opacity
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#fill-opacity
     */
    fillOpacity?: CssPercent;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fill-rule
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#fill-rule
     */
    fillRule?: FillRule;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/filter
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#filter
     */
    filter?: Filter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex
     */
    flex?: Flex_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-basis
     */
    flexBasis?: FlexBasis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-direction
     */
    flexDirection?: FlexDirection_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-flow
     */
    flexFlow?: FlexFlow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-grow
     */
    flexGrow?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-shrink
     */
    flexShrink?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flex-wrap
     */
    flexWrap?: FlexWrap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/float
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#float
     */
    float?: Float_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flood-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flood-color
     */
    floodColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flood-opacity
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#flood-opacity
     */
    floodOpacity?: CssPercent;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font
     */
    font?: Font_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-family
     */
    fontFamily?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-feature-settings
     */
    fontFeatureSettings?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-kerning
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-kerning
     */
    fontKerning?: FontKerning;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-language-override
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-language-override
     */
     fontLanguageOverride?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-optical-sizing
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-optical-sizing
     */
    fontOpticalSizing?: FontOpticalSizing;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-size
     */
    fontSize?: FontSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-size-adjust
     */
    fontSizeAdjust?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-stretch
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-stretch
     */
    fontStretch?: FontStretch;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-style
     */
    fontStyle?: FontStyle;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-synthesis
     */
    fontSynthesis?: FontSynthesis;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variant
     */
    fontVariant?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variant-caps
     */
    fontVariantCaps?: FontVariantCaps;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variant-east-asian
     */
    fontVariantEastAsian?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variant-ligatures
     */
    fontVariantLigatures?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variant-numeric
     */
    fontVariantNumeric?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variant-position
     */
    fontVariantPosition?: FontVariantPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-variation-settings
     */
    fontVariationSettings?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/fontW-wight
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#font-weight
     */
    fontWeight?: FontWeight_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#gap
     */
    gap?: Gap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid
     */
    grid?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-area
     */
    gridArea?: GridArea_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-auto-columns
     */
    gridAutoColumns?: GridAutoAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-auto-flow
     */
    gridAutoFlow?: GridAutoFlow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-auto-rows
     */
    gridAutoRows?: GridAutoAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-column
     */
    gridColumn?: GridAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-column-end
     */
    gridColumnEnd?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-column-gap
     */
    gridColumnGap?: ColumnGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-column-start
     */
    gridColumnStart?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-gap
     */
    gridGap?: Gap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-row
     */
    gridRow?: GridAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-row-end
     */
    gridRowEnd?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-row-gap
     */
    gridRowGap?: RowGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-row-start
     */
    gridRowStart?: GridAxisSide_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-template
     */
    gridTemplate?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-template-areas
     */
    gridTemplateAreas?: GridTemplateAreas_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-template-columns
     */
    gridTemplateColumns?: GridTemplateAxis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#grid-template-rows
     */
    gridTemplateRows?: GridTemplateAxis_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#hanging-punctuation
     */
    hangingPunctuation?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/height
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#height
     */
    height?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#hyphens
     */
    hyphens?: Hyphens_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#image-rendering
     */
    imageRendering?: ImageRendering_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inline-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#inline-size
     */
    inlineSize?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/isolation
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#isolation
     */
    isolation?: Isolation_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#justify-content
     */
    justifyContent?: JustifyContent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#justify-items
     */
    justifyItems?: JustifyItems_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#justify-self
     */
    justifySelf?: JustifySelf_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/left
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#left
     */
    left?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#letter-spacing
     */
    letterSpacing?: LetterSpacing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/lighting-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#lighting-color
     */
    lightingColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#line-break
     */
    lineBreak?: LineBreak_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#line-height
     */
    lineHeight?: LineHeight_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style
     */
    listStyle?: ListStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style-image
     */
    listStyleImage?: ListStyleImage_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style-position
     */
    listStylePosition?: ListStylePosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#list-style-type
     */
    listStyleType?: ListStyleType_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin
     */
    margin?: OneOrBox<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-block
     */
    marginBlock?: OneOrPair<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-block-end
     */
    marginBlockEnd?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-block-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-block-start
     */
    marginBlockStart?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-bottom
     */
    marginBottom?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-inline
     */
    marginInline?: OneOrPair<CssLengthOrAuto>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-inline-end
     */
    marginInlineEnd?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-inline-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-inline-start
     */
    marginInlineStart?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-left
     */
    marginLeft?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-right
     */
    marginRight?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-top
     */
    marginTop?: CssLengthOrAuto;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#margin-trim
     */
    marginTrim?: MarginTrim_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#marker
     */
    marker?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#marker-end
     */
    markerEnd?: Marker_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-mid
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#marker-mid
     */
    markerMid?: Marker_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#marker-start
     */
    markerStart?: Marker_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask
     */
    mask?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask-composite
     */
    maskComposite?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask-image
     */
    maskImage?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask-position
     */
    maskPosition?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-repeat
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask-repeat
     */
    maskRepeat?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask-size
     */
    maskSize?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mask-type
     */
    maskType?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-block-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#max-block-size
     */
    maxBlockSize?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-height
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#max-height
     */
    maxHeight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-inline-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#max-inline-size
     */
    maxInlineSize?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#max-width
     */
    maxWidth?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-block-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#min-block-size
     */
    minBlockSize?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-height
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#min-height
     */
    minHeight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#min-inline-size
     */
    minInlineSize?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/min-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#min-width
     */
    minWidth?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#mix-blend-mode
     */
    mixBlendMode?: BlendMode;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#object-fit
     */
    objectFit?: ObjectFit_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#object-position
     */
    objectPosition?: CssPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset
     */
    offset?: Offset_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-anchor
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-anchor
     */
    offsetAnchor?: OffsetAnchor_StyleType

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-distance
     */
    offsetDistance?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-path
     */
    offsetPath?: OffsetPath_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-position
     */
    offsetPosition?: CssPosition;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#offset-rotate
     */
    offsetRotate?: OffsetRotate_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/opacity
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#opacity
     */
    opacity?: CssPercent;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/order
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#order
     */
    order?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/orphans
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#orphans
     */
    orphans?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#outline
     */
    outline?: Border_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#outline-color
     */
    outlineColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#outline-offset
     */
    outlineOffset?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#outline-style
     */
    outlineStyle?: BorderStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#outline-width
     */
    outlineWidth?: BorderWidth;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow
     */
    overflow?: Overflow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-anchor
     */
    overflowAnchor?: OverflowAnchor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-block
     */
    overflowBlock?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-inline
     */
    overflowInline?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-wrap
     */
    overflowWrap?: OverflowWrap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-x
     */
    overflowX?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overflow-y
     */
    overflowY?: OverflowKeyword;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overscroll-behavior
     */
    overscrollBehavior?: OverscrollBehavior_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overscroll-behavior-block
     */
    overscrollBehaviorBlock?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overscroll-behavior-inline
     */
    overscrollBehaviorInline?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-x
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overscroll-behavior-x
     */
    overscrollBehaviorX?: OverscrollBehavior;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-y
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#overscroll-behavior-y
     */
    overscrollBehaviorY?: OverscrollBehavior;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding
     */
    padding?: OneOrBox<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-block
     */
    paddingBlock?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paddingB-bock-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-block-end
     */
    paddingBlockEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-block-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-block-start
     */
    paddingBlockStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-bottom
     */
    paddingBottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-inline
     */
    paddingInline?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-inline-end
     */
    paddingInlineEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-inline-start
     */
    paddingInlineStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-left
     */
    paddingLeft?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-right
     */
    paddingRight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#padding-top
     */
    paddingTop?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#paint-order
     */
    paintOrder?: PaintOrder_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-after
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#page-break-after
     */
    pageBreakAfter?: BreakAfter_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-before
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#page-break-before
     */
    pageBreakBefore?: BreakBefore_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-inside
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#page-break-inside
     */
    pageBreakInside?: BreakInside_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#perspective
     */
    perspective?: Perspective_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#perspective-origin
     */
    perspectiveOrigin?: PerspectiveOrigin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#place-content
     */
    placeContent?: PlaceContent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#place-items
     */
    placeItems?: PlaceItems_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#place-self
     */
    placeSelf?: PlaceSelf_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#pointer-events
     */
    pointerEvents?: PointerEvents_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#position
     */
    position?: Position_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#quotes
     */
    quotes?: Quotes_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#resize
     */
    resize?: Resize_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/right
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#right
     */
    right?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#rotate
     */
    rotate?: Rotate_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#row-gap
     */
    rowGap?: RowGap_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-align
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#ruby-align
     */
    rubyAlign?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-overhang
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#ruby-overhang
     */
    rubyOverhang?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#ruby-position
     */
    rubyPosition?: DefaultStyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scale
     */
    scale?: Scale_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scrollbar-color
     */
    scrollbarColor?: ScrollbarColor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scrollbar-width
     */
    scrollbarWidth?: ScrollbarWidth_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-behavior
     */
    scrollBehavior?: ScrollBehavior_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin
     */
    scrollMargin?: OneOrBox<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-block
     */
    scrollMarginBlock?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-block-end
     */
    scrollMarginBlockEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-block-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-block-start
     */
    scrollMarginBlockStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-bottom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-bottom
     */
    scrollMarginBottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-inline
     */
    scrollMarginInline?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-inline-end
     */
    scrollMarginInlineEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-inline-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-inline-start
     */
    scrollMarginInlineStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-left
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-left
     */
    scrollMarginLeft?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-right
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-right
     */
    scrollMarginRight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-margin-top
     */
    scrollMarginTop?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding
     */
    scrollPadding?: OneOrBox<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-block
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-block
     */
    scrollPaddingBlock?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-block-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-block-end
     */
    scrollPaddingBlockEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-block-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-block-start
     */
    scrollPaddingBlockStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-bottom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-bottom
     */
    scrollPaddingBottom?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-inline
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-inline
     */
    scrollPaddingInline?: OneOrPair<CssLength>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-inline-end
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-inline-end
     */
    scrollPaddingInlineEnd?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-inline-start
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-inline-start
     */
    scrollPaddingInlineStart?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-left
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-left
     */
    scrollPaddingLeft?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-right
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-right
     */
    scrollPaddingRight?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-padding-top
     */
    scrollPaddingTop?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-snap-align
     */
    scrollSnapAlign?: ScrollSnapAlign_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-snap-stop
     */
    scrollSnapStop?: ScrollSnapStop_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#scroll-snap-type
     */
    scrollSnapType?: ScrollSnapType_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-image-threshold
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#shape-image-threshold
     */
    shapeImageThreshold?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-margin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#shape-margin
     */
    shapeMargin?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#shape-outside
     */
    shapeOutside?: ShapeOutside_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#shape-rendering
     */
    shapeRendering?: ShapeRendering_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stop-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stop-color
     */
    stopColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stop-opacity
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stop-opacity
     */
    stopOpacity?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke
     */
    stroke?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-dasharray
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-dasharray
     */
    strokeDasharray?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-dashoffset
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-dashoffset
     */
    strokeDashoffset?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-linecap
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-linecap
     */
    strokeLinecap?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-linejoin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-linejoin
     */
    strokeLinejoin?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-miterlimit
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-miterlimit
     */
    strokeMiterlimit?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-opacity
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-opacity
     */
    strokeOpacity?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#stroke-width
     */
    strokeWidth?: DefaultStyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#tab-size
     */
    tabSize?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#table-layout
     */
    tableLayout?: TableLayout_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-align
     */
    textAlign?: TextAlign_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-align-last
     */
    textAlignLast?: TextAlignLast_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-anchor
     */
    textAnchor?: TextAnchor_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-combine-upright
     */
    textCombineUpright?: TextCombineUpright_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration
     */
    textDecoration?: TextDecoration_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-color
     */
    textDecorationColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-line
     */
    textDecorationLine?: TextDecorationLine_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-skip-ink
     */
    textDecorationSkipInk?: TextDecorationSkipInk_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-style
     */
    textDecorationStyle?: TextDecorationStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-decoration-thickness
     */
    textDecorationThickness?: TextDecorationThickness_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis
     */
    textEmphasis?: TextEmphasis_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-color
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis-color
     */
    textEmphasisColor?: CssColor;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis-position
     */
    textEmphasisPosition?: TextEmphasisPosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-emphasis-style
     */
    textEmphasisStyle?: TextEmphasisStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-indent
     */
    textIndent?: TextIndent_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-justify
     */
    textJustify?: TextJustify_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-kashida
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-kashida
     */
    textKashida?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-kashida-space
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-kashida-space
     */
    textKashidaSpace?: DefaultStyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-orientation
     */
    textOrientation?: TextOrientation_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-overflow
     */
    textOverflow?: TextOverflow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-shadow
     */
    textShadow?: TextShadow_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-size-adjust
     */
    textSizeAdjust?: TextSizeAdjust_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-transform
     */
    textTransform?: TextTransform_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#text-underline-position
     */
    textUnderlinePosition?: TextUnderlinePosition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/top
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#top
     */
    top?: CssLength;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#touch-action
     */
    touchAction?: TouchAction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform
     */
    transform?: Transform_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform-box
     */
    transformBox?: TransformBox_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform-origin
     */
    transformOrigin?: TransformOrigin_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transform-style
     */
    transformStyle?: TransformStyle_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition
     */
    transition?: Transition_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition-delay
     */
    transitionDelay?: OneOrMany<CssTime>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition-duration
     */
    transitionDuration?: OneOrMany<CssTime>;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition-property
     */
    transitionProperty?: TransitionProperty_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#transition-timing-function
     */
    transitionTimingFunction?: TransitionTimingFunction_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/translate
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#translate
     */
    translate?: Translate_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#unicode-bidi
     */
    unicodeBidi?: UnicodeBidi_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#user-select
     */
    userSelect?: UserSelect_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#vertical-align
     */
    verticalAlign?: VerticalAlign_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#visibility
     */
    visibility?: Visibility_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#vector-effect
     */
    vectorEffect?: VectorEffect_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#white-space
     */
    whiteSpace?: WhiteSpace_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/widows
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#widows
     */
    widows?: CssNumber;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/width
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#width
     */
    width?: CssSize;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/will-change
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#will-change
     */
    willChange?: WillChange_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#word-break
     */
    wordBreak?: WordBreak_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#word-spacing
     */
    wordSpacing?: WordSpacing_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#writing-mode
     */
    writingMode?: WritingMode_StyleType;


    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#z-index
     */
    zIndex?: ZIndex_StyleType;

    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/zoom
     * - Mimcss usage: https://mmichlin66.github.io/mimcss/ref/style-properties.html#zoom
     */
    zoom?: Zoom_StyleType;
}



/**
 * The ExtendedBaseStyleset type maps all CSS properties defined in the [[IBaseStyleset]] interface to the
 * "extended" versions of their types. These extended types are defined by adding basic keywords
 * (e.g. "unset", "initial", etc.) as well as [[StringProxy]] and [[ICustomVar]] to the type that
 * is defined in the IBaseStyleset interface.
 * @category Styleset
 */
export type ExtendedBaseStyleset = { [K in keyof IBaseStyleset]?: ExtendedProp<IBaseStyleset[K]> }



/**
 * The `IVarTemplateStyleset` interface maps template names to the types, which can be used for
 * defining custom CSS properties (a.k.a. variables). Normally, variables are defined using the
 * names of the style properties and their type is determined by the type of this property in the
 * [[IBaseStyleset]] interface. Sometimes, however, there is a need to define variables of some other
 * types, for which there is no suitable style property. The IVarTemplateStyleset interface provides
 * many basic types and it can also be extended using the TypeScript's module augmentation.
 */
export interface IVarTemplateStyleset extends IBaseStyleset
{
    /** Allows having CSS variables and constants that accept value of any type */
    "any"?: any;

    /** Allows having CSS variables and constants that accept a string value */
    CssString?: string;

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
//     K extends keyof IBaseStyleset ? ExtendedProp<VarValue<K>> : Extended<VarValue<K>>;



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
 * The values of the type can be specified as either a two-item or a three-item tuple. The
 * two-item tuple is used with a previously defined custom CSS property represented by an [[IVarRule]]
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
 * Use the `CustomVar_StyleType` type in the following manner:
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // define global custom CSS property and re-define its value under "brown" class.
 *     mainColor = css.$var( "color", "black");
 *     brown = css.$class({ "--": [ [this.mainColor, "brown"] ] })

 *     // define custom CSS property with the given name under "blue" class.
 *     blue = css.$class({ "--": [ ["different-color", "color", "blue"] ] })
 * });
 * ```
 *
 * This is equivalent to the following CSS:
 *
 * ```css
 * :root { --MyStyles_mainColor: "black"; }
 * .brown { --MyStyles_mainColor: "brown"; }
 * .blue { --different-color: "blue"; }
 * ```
 * @category Style Helper
 */
export type CustomVar_StyleType<K extends VarTemplateName = any> =
    [IVarRule<K>, ExtendedVarValue<K>] | [string, K, ExtendedVarValue<K>]



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



