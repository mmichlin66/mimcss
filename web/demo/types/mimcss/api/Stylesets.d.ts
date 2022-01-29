import { CssImage, CssSelector, CssString, DependentRuleCombinator, Direction, ExtendedProp, Global_StyleType, IParameterizedPseudoEntity, OneOrBox, OneOrMany, OneOrPair, PseudoEntity, TimingFunction } from "./CoreTypes";
import { CssColor } from "./ColorTypes";
import { BorderRadius, CssAngle, CssAspectRatio, CssFrequency, CssLength, CssLengthOrAuto, CssMultiPosition, CssMultiPositionX, CssMultiPositionY, CssNumber, CssPercent, CssPoint, CssPosition, CssRadius, CssResolution, CssSize, CssTime } from "./NumericTypes";
import * as st from "./StyleTypes";
import { FillRule, TransformFuncs } from "./ShapeTypes";
import { FontKerning, FontOpticalSizing, FontSize, FontStretch, FontStyle, FontSynthesis, FontVariantCaps, FontVariantPosition } from "./FontTypes";
import { IClassNameRule, IClassRule, IStyleDefinition, IStyleDefinitionClass, IStyleRule, IVarRule } from "./RuleTypes";
/**
 * Interface representing a collection of built-in style properties. Every built-in property
 * appears in this interface. Also it is possible to add aditional properties via module
 * augmentation technique.
 */
export interface IStyleset {
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color
     */
    accentColor?: CssColor;
    /**
     * [[include: styleProps/alignContent.md]]
     */
    alignContent?: st.AlignContentKeywords;
    /**
     * [[include: styleProps/alignItems.md]]
     */
    alignItems?: st.AlignItemsKeywords;
    /**
     * [[include: styleProps/alignSelf.md]]
     */
    alignSelf?: st.AlignSelfKeywords;
    /**
     * [[include: styleProps/alignmentBaseline.md]]
     */
    alignmentBaseline?: st.AlignmentBaselineKeywords;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/all
     */
    all?: Global_StyleType;
    /**
     * [[include: styleProps/animation.md]]
     */
    animation?: st.Animation_StyleType;
    /**
     * [[include: styleProps/animationDelay.md]]
     */
    animationDelay?: OneOrMany<CssTime>;
    /**
     * [[include: styleProps/animationDirection.md]]
     */
    animationDirection?: OneOrMany<st.AnimationDirectionKeywords>;
    /**
     * [[include: styleProps/animationDuration.md]]
     */
    animationDuration?: OneOrMany<CssTime>;
    /**
     * [[include: styleProps/animationFillMode.md]]
     */
    animationFillMode?: OneOrMany<st.AnimationFillModeKeywords>;
    /**
     * [[include: styleProps/animationIterationCount.md]]
     */
    animationIterationCount?: OneOrMany<st.AnimationIterationCount_Single>;
    /**
     * [[include: styleProps/animationName.md]]
     */
    animationName?: OneOrMany<st.AnimationName_Single>;
    /**
     * [[include: styleProps/animationPlayState.md]]
     */
    animationPlayState?: OneOrMany<st.AnimationPlayStateKeywords>;
    /**
     * [[include: styleProps/animationTimingFunction.md]]
     */
    animationTimingFunction?: OneOrMany<TimingFunction>;
    /**
     * [[include: styleProps/appearance.md]]
     */
    appearance?: st.AppearanceKeywords | string;
    /**
     * [[include: styleProps/aspectRatio.md]]
     */
    aspectRatio?: st.AspectRatio_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
     */
    backdropFilter?: st.Filter_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/backface-visibility
     */
    backfaceVisibility?: st.BackfaceVisibilityMode_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background
     */
    background?: st.Background_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment
     */
    backgroundAttachment?: st.BackgroundAttachment_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode
     */
    backgroundBlendMode?: OneOrMany<st.BlendModeKeywords>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip
     */
    backgroundClip?: st.BackgroundClip_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
     */
    backgroundColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image
     */
    backgroundImage?: st.BackgroundImage_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin
     */
    backgroundOrigin?: st.BackgroundOrigin_StyleType;
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
    backgroundRepeat?: st.BackgroundRepeat_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat-x
     */
    backgroundRepeatX?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat-y
     */
    backgroundRepeatY?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
     */
    backgroundSize?: st.BackgroundSize_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/baseline-shift
     */
    baselineShift?: st.BaselineShift_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/block-size
     */
    blockSize?: CssSize;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border
     */
    border?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block
     */
    borderBlock?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-color
     */
    borderBlockColor?: OneOrPair<CssColor>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end
     */
    borderBlockEnd?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-color
     */
    borderBlockEndColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-style
     */
    borderBlockEndStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-end-width
     */
    borderBlockEndWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start
     */
    borderBlockStart?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-color
     */
    borderBlockStartColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-style
     */
    borderBlockStartStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-start-width
     */
    borderBlockStartWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-style
     */
    borderBlockStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-block-width
     */
    borderBlockWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom
     */
    borderBottom?: st.Border_StyleType;
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
    borderBottomStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width
     */
    borderBottomWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-collapse
     */
    borderCollapse?: st.BorderColapse_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
     */
    borderColor?: st.BorderColor_StyleType;
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
    borderImage?: st.BorderImage_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-outset
     */
    borderImageOutset?: st.BorderImageOutset_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-repeat
     */
    borderImageRepeat?: st.BorderImageRepeat_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-slice
     */
    borderImageSlice?: st.BorderImageSlice_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-source
     */
    borderImageSource?: st.BorderImageSource_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-image-width
     */
    borderImageWidth?: st.BorderImageWidth_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline
     */
    borderInline?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-color
     */
    borderInlineColor?: OneOrPair<CssColor>;
    /**
    * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end
    */
    borderInlineEnd?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-color
     */
    borderInlineEndColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-style
     */
    borderInlineEndStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-end-width
     */
    borderInlineEndWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start
     */
    borderInlineStart?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-color
     */
    borderInlineStartColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-style
     */
    borderInlineStartStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-start-width
     */
    borderInlineStartWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-style
     */
    borderInlineStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-inline-width
     */
    borderInlineWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left
     */
    borderLeft?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-color
     */
    borderLeftColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-style
     */
    borderLeftStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width
     */
    borderLeftWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
     */
    borderRadius?: BorderRadius;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right
     */
    borderRight?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-color
     */
    borderRightColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-style
     */
    borderRightStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width
     */
    borderRightWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-spacing
     */
    borderSpacing?: st.BorderSpacing_StyleType;
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
    borderStyle?: st.BorderStyle_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top
     */
    borderTop?: st.Border_StyleType;
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
    borderTopStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width
     */
    borderTopWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
     */
    borderWidth?: st.BorderWidth_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/bottom
     */
    bottom?: CssLength;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break
     */
    boxDecorationBreak?: st.BoxDecorationBreak_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
     */
    boxShadow?: st.BoxShadow_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing
     */
    boxSizing?: st.BoxSizing_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-after
     */
    breakAfter?: st.BreakAfter_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-before
     */
    breakBefore?: st.BreakBefore_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/break-inside
     */
    breakInside?: st.BreakInside_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/buffered-rendering
     */
    bufferedRendering?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side
     */
    captionSide?: st.CaptionSide_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color
     */
    caretColor?: st.CaretColor_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clear
     */
    clear?: st.Clear_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip
     * @deprecated The CSS `clip` property and `rect()` function are deprecated.
     */
    clip?: st.Clip_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path
     */
    clipPath?: st.ClipPath_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/clip-rule
     */
    clipRule?: st.ClipRule_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color
     */
    color?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-adjust
     */
    colorAdjust?: st.ColorAdjust_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation
     */
    colorInterpolation?: st.ColorInterpolation_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/color-interpolation-filters
     */
    colorInterpolationFilters?: st.ColorInterpolation_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
     */
    colorScheme?: st.ColorScheme_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-count
     */
    columnCount?: st.ColumnCount_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-fill
     */
    columnFill?: st.ColumnFill_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
     */
    columnGap?: st.ColumnGap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule
     */
    columnRule?: st.Border_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-color
     */
    columnRuleColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-style
     */
    columnRuleStyle?: st.BorderStyle;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-rule-width
     */
    columnRuleWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-span
     */
    columnSpan?: st.ColumnSpan_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/column-width
     */
    columnWidth?: CssLength;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/columns
     */
    columns?: st.Columns_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/contain
     */
    contain?: st.Contain_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content
     */
    content?: st.Content_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
     */
    contentVisibility?: st.ContentVisibility_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-increment
     */
    counterIncrement?: st.CssCounter;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-reset
     */
    counterReset?: st.CssCounter;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/counter-set
     */
    counterSet?: st.CssCounter;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
     */
    cursor?: st.Cursor_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/direction
     */
    direction?: Direction;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
     */
    display?: st.Display_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/dominant-baseline
     */
    dominantBaseline?: st.DominantBaseline_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/empty-cells
     */
    emptyCells?: st.EmptyCells_StyleType;
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
    filter?: st.Filter_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex
     */
    flex?: st.Flex_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis
     */
    flexBasis?: st.FlexBasis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
     */
    flexDirection?: st.FlexDirection_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow
     */
    flexFlow?: st.FlexFlow_StyleType;
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
    flexWrap?: st.FlexWrap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/float
     */
    float?: st.Float_StyleType;
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
    font?: st.Font_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-family
     */
    fontFamily?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-feature-settings
     */
    fontFeatureSettings?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-kerning
     */
    fontKerning?: FontKerning;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-language-override
     */
    fontLanguageOverride?: st.DefaultStyleType;
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
    fontVariant?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-alternates
     */
    fontVariantAlternates?: st.DefaultStyleType;
    /**
    * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-caps
    */
    fontVariantCaps?: FontVariantCaps;
    /**
      * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-east-asian
      */
    fontVariantEastAsian?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-ligatures
     */
    fontVariantLigatures?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric
     */
    fontVariantNumeric?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-position
     */
    fontVariantPosition?: FontVariantPosition;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-variation-settings
     */
    fontVariationSettings?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/font-wight
     */
    fontWeight?: st.FontWeight_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust
     */
    forcedColorAdjust?: st.ForcedColorAdjust_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/gap
     */
    gap?: st.Gap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid
     */
    grid?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area
     */
    gridArea?: st.GridArea_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns
     */
    gridAutoColumns?: st.GridAutoAxis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow
     */
    gridAutoFlow?: st.GridAutoFlow_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows
     */
    gridAutoRows?: st.GridAutoAxis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column
     */
    gridColumn?: st.GridAxis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end
     */
    gridColumnEnd?: st.GridAxisSide_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap
     */
    gridColumnGap?: st.ColumnGap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start
     */
    gridColumnStart?: st.GridAxisSide_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap
     */
    gridGap?: st.Gap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row
     */
    gridRow?: st.GridAxis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end
     */
    gridRowEnd?: st.GridAxisSide_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap
     */
    gridRowGap?: st.RowGap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start
     */
    gridRowStart?: st.GridAxisSide_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template
     */
    gridTemplate?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas
     */
    gridTemplateAreas?: st.GridTemplateAreas_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
     */
    gridTemplateColumns?: st.GridTemplateAxis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
     */
    gridTemplateRows?: st.GridTemplateAxis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hanging-punctuation
     */
    hangingPunctuation?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/height
     */
    height?: CssSize;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
     */
    hyphens?: st.Hyphens_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-orientation
     */
    imageOrientation?: st.ImageOrientation_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering
     */
    imageRendering?: st.ImageRendering_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/initial-letter
     */
    initialLetter?: st.InitialLetter_StyleType;
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
    isolation?: st.Isolation_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
     */
    justifyContent?: st.JustifyContent_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items
     */
    justifyItems?: st.JustifyItems_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self
     */
    justifySelf?: st.JustifySelf_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/left
     */
    left?: CssLength;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing
     */
    letterSpacing?: st.LetterSpacing_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/lighting-color
     */
    lightingColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-break
     */
    lineBreak?: st.LineBreak_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-clamp
     */
    lineClamp?: st.LineClamp_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
     */
    lineHeight?: st.LineHeight_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style
     */
    listStyle?: st.ListStyle_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-image
     */
    listStyleImage?: st.ListStyleImage_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position
     */
    listStylePosition?: st.ListStylePosition_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type
     */
    listStyleType?: st.ListStyleType_StyleType;
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
    marginTrim?: st.MarginTrim_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker
     */
    marker?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-end
     */
    markerEnd?: st.Marker_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-mid
     */
    markerMid?: st.Marker_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/marker-start
     */
    markerStart?: st.Marker_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask
     */
    mask?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border
     */
    maskBorder?: st.MaskBorder_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-outset
     */
    maskBorderMode?: st.MaskBorderMode_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-outset
     */
    maskBorderOutset?: st.BorderImageOutset_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-repeat
     */
    maskBorderRepeat?: st.BorderImageRepeat_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-slice
     */
    maskBorderSlice?: st.BorderImageSlice_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-source
     */
    maskBorderSource?: st.BorderImageSource_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-border-width
     */
    maskBorderWidth?: st.BorderImageWidth_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-clip
     */
    maskClip?: OneOrMany<st.GeometryBoxKeyword>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-composite
     */
    maskComposite?: OneOrMany<st.MaskCompositeKeyword>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image
     */
    maskImage?: OneOrMany<CssImage>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-mode
     */
    maskMode?: OneOrMany<st.MaskModeKeyword>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-origin
     */
    maskOrigin?: OneOrMany<st.GeometryBoxKeyword>;
    /**
    * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-position
    */
    maskPosition?: CssMultiPosition;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-repeat
     */
    maskRepeat?: OneOrMany<st.BackgroundRepeat>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-size
     */
    maskSize?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/mask-type
     */
    maskType?: st.MaskTypeKeyword;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/math-style
     */
    mathStyle?: st.MathStyle_StyleType;
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
    mixBlendMode?: st.BlendModeKeywords;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
     */
    objectFit?: st.ObjectFit_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
     */
    objectPosition?: CssPosition;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset
     */
    offset?: st.Offset_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-anchor
     */
    offsetAnchor?: st.OffsetAnchor_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance
     */
    offsetDistance?: CssLength;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
     */
    offsetPath?: st.OffsetPath_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position
     */
    offsetPosition?: st.OffsetPosition_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-rotate
     */
    offsetRotate?: st.OffsetRotate_StyleType;
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
    outline?: st.Border_StyleType;
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
    outlineStyle?: st.BorderStyle_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width
     */
    outlineWidth?: st.LineWidth;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
     */
    overflow?: st.Overflow_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor
     */
    overflowAnchor?: st.OverflowAnchor_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-block
     */
    overflowBlock?: st.OverflowKeyword;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin
     */
    overflowClipMargin?: st.OverflowClipMargin_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-inline
     */
    overflowInline?: st.OverflowKeyword;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap
     */
    overflowWrap?: st.OverflowWrap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x
     */
    overflowX?: st.OverflowKeyword;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
     */
    overflowY?: st.OverflowKeyword;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior
     */
    overscrollBehavior?: st.OverscrollBehavior_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-block
     */
    overscrollBehaviorBlock?: st.OverscrollBehavior;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-inline
     */
    overscrollBehaviorInline?: st.OverscrollBehavior;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-x
     */
    overscrollBehaviorX?: st.OverscrollBehavior;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/overscroll-behavior-y
     */
    overscrollBehaviorY?: st.OverscrollBehavior;
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
    pageBreakAfter?: st.BreakAfter_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-before
     */
    pageBreakBefore?: st.BreakBefore_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/page-break-inside
     */
    pageBreakInside?: st.BreakInside_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order
     */
    paintOrder?: st.PaintOrder_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective
     */
    perspective?: st.Perspective_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin
     */
    perspectiveOrigin?: st.PerspectiveOrigin_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content
     */
    placeContent?: st.PlaceContent_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items
     */
    placeItems?: st.PlaceItems_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self
     */
    placeSelf?: st.PlaceSelf_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events
     */
    pointerEvents?: st.PointerEvents_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/position
     */
    position?: st.Position_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/quotes
     */
    quotes?: st.Quotes_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/resize
     */
    resize?: st.Resize_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/right
     */
    right?: CssLength;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/rotate
     */
    rotate?: st.Rotate_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
     */
    rowGap?: st.RowGap_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-align
     */
    rubyAlign?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-overhang
     */
    rubyOverhang?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/ruby-position
     */
    rubyPosition?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scale
     */
    scale?: st.Scale_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
     */
    scrollBehavior?: st.ScrollBehavior_StyleType;
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
    scrollSnapAlign?: st.ScrollSnapAlign_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-stop
     */
    scrollSnapStop?: st.ScrollSnapStop_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-type
     */
    scrollSnapType?: st.ScrollSnapType_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-color
     */
    scrollbarColor?: st.ScrollbarColor_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-gutter
     */
    scrollbarGutter?: st.ScrollbarGutter_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/scrollbar-width
     */
    scrollbarWidth?: st.ScrollbarWidth_StyleType;
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
    shapeOutside?: st.ShapeOutside_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/shape-rendering
     */
    shapeRendering?: st.ShapeRendering_StyleType;
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
    strokeDasharray?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-dashoffset
     */
    strokeDashoffset?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-linecap
     */
    strokeLinecap?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-linejoin
     */
    strokeLinejoin?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-miterlimit
     */
    strokeMiterlimit?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-opacity
     */
    strokeOpacity?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/stroke-width
     */
    strokeWidth?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size
     */
    tabSize?: st.TabSize_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout
     */
    tableLayout?: st.TableLayout_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align
     */
    textAlign?: st.TextAlign_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-align-last
     */
    textAlignLast?: st.TextAlignLast_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-anchor
     */
    textAnchor?: st.TextAnchor_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright
     */
    textCombineUpright?: st.TextCombineUpright_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
     */
    textDecoration?: st.TextDecoration_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-color
     */
    textDecorationColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-line
     */
    textDecorationLine?: st.TextDecorationLine_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-skip-ink
     */
    textDecorationSkipInk?: st.TextDecorationSkipInk_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-style
     */
    textDecorationStyle?: st.TextDecorationStyle_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration-thickness
     */
    textDecorationThickness?: st.TextDecorationThickness_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis
     */
    textEmphasis?: st.TextEmphasis_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-color
     */
    textEmphasisColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-position
     */
    textEmphasisPosition?: st.TextEmphasisPosition_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis-style
     */
    textEmphasisStyle?: st.TextEmphasisStyle_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-fill-color
     */
    textFillColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-indent
     */
    textIndent?: st.TextIndent_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-justify
     */
    textJustify?: st.TextJustify_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-kashida
     */
    textKashida?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-kashida-space
     */
    textKashidaSpace?: st.DefaultStyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-orientation
     */
    textOrientation?: st.TextOrientation_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
     */
    textOverflow?: st.TextOverflow_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
     */
    textRendering?: st.TextRendering_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow
     */
    textShadow?: st.TextShadow_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-size-adjust
     */
    textSizeAdjust?: st.TextSizeAdjust_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke
     */
    textStroke: st.TextStroke_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke-color
     */
    textStrokeColor?: CssColor;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-stroke-width
     */
    textStrokeWidth?: st.LineWidth;
    /**
    * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform
    */
    textTransform?: st.TextTransform_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-position
     */
    textUnderlinePosition?: st.TextUnderlinePosition_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/top
     */
    top?: CssLength;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action
     */
    touchAction?: st.TouchAction_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
     */
    transform?: st.Transform_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-box
     */
    transformBox?: st.TransformBox_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin
     */
    transformOrigin?: st.TransformOrigin_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style
     */
    transformStyle?: st.TransformStyle_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
     */
    transition?: st.Transition_StyleType;
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
    transitionProperty?: st.TransitionProperty_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
     */
    transitionTimingFunction?: OneOrMany<TimingFunction>;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/translate
     */
    translate?: st.Translate_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi
     */
    unicodeBidi?: st.UnicodeBidi_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/user-select
     */
    userSelect?: st.UserSelect_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align
     */
    verticalAlign?: st.VerticalAlign_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
     */
    visibility?: st.Visibility_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/vector-effect
     */
    vectorEffect?: st.VectorEffect_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
     */
    whiteSpace?: st.WhiteSpace_StyleType;
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
    willChange?: st.WillChange_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-break
     */
    wordBreak?: st.WordBreak_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/word-spacing
     */
    wordSpacing?: st.WordSpacing_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode
     */
    writingMode?: st.WritingMode_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
     */
    zIndex?: st.ZIndex_StyleType;
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/zoom
     * @deprecated
     */
    zoom?: st.Zoom_StyleType;
}
/**
 * The ExtendedBaseStyleset type maps all CSS properties defined in the [[IStyleset]] interface to
 * the "extended" versions of their types. These extended types are defined by adding basic keywords
 * (e.g. "unset", "initial", etc.) as well as [[StringProxy]] and [[ICustomVar]] to the type that
 * is defined in the IStyleset interface.
 */
export declare type ExtendedIStyleset = {
    [K in keyof IStyleset]?: ExtendedProp<IStyleset[K]>;
};
/**
 * The `IPageStyleset` interface defines properties that can be used in the `@page` rule in
 * addition to regular style properties.
 */
export interface IPageStyleset {
    /**
     * - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/@page/size
     */
    size?: st.Size_StyleType;
}
/**
 * The `ISyntaxTypeStyleset` interface maps CSS syntax names to the types, which can be used for
 * defining custom CSS properties (a.k.a. variables) via the @property rules.
 */
export interface ISyntaxTypeStyleset {
    /** Allows having CSS variables and constants that accept value of any type */
    "*"?: string;
    /** Allows having CSS variables and constants that accept a `<number>` CSS value */
    "<number>"?: CssNumber;
    "<number>+"?: OneOrMany<CssNumber>;
    "<number>#"?: OneOrMany<CssNumber>;
    /** Allows having CSS variables and constants that accept a `<length>` CSS value */
    "<length>"?: CssLength;
    "<length>+"?: OneOrMany<CssLength>;
    "<length>#"?: OneOrMany<CssLength>;
    /** Allows having CSS variables and constants that accept a `<percent>` CSS value */
    "<percentage>"?: CssPercent;
    "<percentage>+"?: OneOrMany<CssPercent>;
    "<percentage>#"?: OneOrMany<CssPercent>;
    /** Allows having CSS variables and constants that accept a `<length-percentage>` CSS value */
    "<length-percentage>"?: CssLength;
    "<length-percentage>+"?: OneOrMany<CssLength>;
    "<length-percentage>#"?: OneOrMany<CssLength>;
    /** Allows having CSS variables and constants that accept an `<angle>` CSS value */
    "<angle>"?: CssAngle;
    "<angle>+"?: OneOrMany<CssAngle>;
    "<angle>#"?: OneOrMany<CssAngle>;
    /** Allows having CSS variables and constants that accept a `<time>` CSS value */
    "<time>"?: CssTime;
    "<time>+"?: OneOrMany<CssTime>;
    "<time>#"?: OneOrMany<CssTime>;
    /** Allows having CSS variables and constants that accept a `<resolution>` CSS value */
    "<resolution>"?: CssResolution;
    "<resolution>+"?: OneOrMany<CssResolution>;
    "<resolution>#"?: OneOrMany<CssResolution>;
    /** Allows having CSS variables and constants that accept a `<color>` CSS value */
    "<color>"?: CssColor;
    "<color>+"?: OneOrMany<CssColor>;
    "<color>#"?: OneOrMany<CssColor>;
    /** Allows having CSS variables and constants that accept an `<image>` CSS value */
    "<image>"?: CssImage;
    "<image>+"?: OneOrMany<CssImage>;
    "<image>#"?: OneOrMany<CssImage>;
    /** Allows having CSS variables and constants that accept a `<custom-ident>` value */
    "<custom-ident>"?: string;
    "<custom-ident>+"?: OneOrMany<string>;
    "<custom-ident>#"?: OneOrMany<string>;
    /** Allows having CSS variables and constants that accept a `<transform-function>` value */
    "<transform-function>"?: TransformFuncs;
    "<transform-list>"?: OneOrMany<TransformFuncs>;
}
/**
 * The `ICustomTypeStyleset` interface maps template names to the types, which can be used for
 * defining custom CSS properties (a.k.a. variables). Normally, variables are defined using the
 * names of the style properties and their type is determined by the type of this property in the
 * [[IStyleset]] interface. Sometimes, however, there is a need to define variables of some other
 * types, for which there is no suitable style property. The `ICustomTypeStyleset` interface provides
 * many basic types and it can also be extended using the TypeScript's module augmentation.
 */
export interface ICustomTypeStyleset {
    /** Allows having CSS variables and constants that accept value of any type */
    "any"?: any;
    /** Allows having CSS variables and constants that accept a `"string"` value */
    "<string>"?: CssString;
    /** Allows having CSS variables and constants that accept a `"frequency"` CSS value */
    "<frequency>"?: CssFrequency;
    /** Allows having CSS variables and constants that accept a `"size"` value */
    "<size>"?: CssSize;
    /** Allows having CSS variables and constants that accept a `"point"` value */
    "<point>"?: CssPoint;
    /** Allows having CSS variables and constants that accept a `"position"` CSS value */
    "<position>"?: CssPosition;
    /** Allows having CSS variables and constants that accept multiple `"multi-position"` CSS values */
    "<multi-position>"?: CssMultiPosition;
    /** Allows having CSS variables and constants that accept a `"radius"` CSS value */
    "<radius>"?: CssRadius;
    /** Allows having CSS variables and constants that accept a `"ratio"` CSS value */
    "<aspect-ratio>"?: CssAspectRatio;
}
/**
 * The `IVarTemplateStyleset` interface maps template names to the types, which can be used for
 * defining custom CSS properties (a.k.a. variables). Normally, variables are defined using the
 * names of the style properties and their type is determined by the type of this property in the
 * [[IStyleset]] interface. Sometimes, however, there is a need to define variables of some other
 * types, for which there is no suitable style property. The `IVarTemplateStyleset` interface provides
 * many basic types and it can also be extended using the TypeScript's module augmentation.
 */
export interface IVarTemplateStyleset extends IStyleset, IPageStyleset, ISyntaxTypeStyleset, ICustomTypeStyleset {
}
/**
 * The VarTemplateName type defines the keys (strings) that can be used as templates for defining
 * custom CSS properties using the [[$var]] function.
 */
export declare type VarTemplateName = keyof IVarTemplateStyleset;
/**
 * The VarValueType generic type defines the type of the value that can be assigned to the custom
 * CSS property using the generic type K as its template.
 */
export declare type VarValue<K extends VarTemplateName> = IVarTemplateStyleset[K];
/**
 * The VarValueType generic type defines the type of the value that can be assigned to the custom
 * CSS property using the generic type K as its template.
 */
export declare type ExtendedVarValue<K extends VarTemplateName> = ExtendedProp<VarValue<K>>;
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
 */
export declare type CustomVar_StyleType<K extends VarTemplateName = any> = [
    IVarRule<K>,
    ExtendedVarValue<K>
] | [
    string,
    K,
    ExtendedVarValue<K>
] | IStyleDefinitionClass | IStyleDefinition;
/**
 * Type representing a collection of style properties and their values. In addition to the
 * properties representing the standard CSS styles, this type also includes the "--" property,
 * which is an array of [[CustomVar_StyleType]] objects each specifying a value for a single
 * custom property.
 */
export declare type Styleset = ExtendedIStyleset & {
    /**
     * Special property "--" specifies an array that contains [[CustomVar_StyleType]] objects each
     * representing a definition of a custom CSS property.
     */
    "--"?: CustomVar_StyleType[];
};
/**
 * The StringStyleset type maps CSS properties including custom properties to the string values.
 */
export declare type StringStyleset = {
    [K: string]: string | null | undefined;
};
export declare type PageRuleStyleset = Styleset & {
    [K in keyof IPageStyleset]?: ExtendedProp<IPageStyleset[K]>;
} & {
    "+"?: IStyleRule | IStyleRule[];
};
/**
 * The `CombinedStyleset` type extends the Styleset type with certain properties that provide
 * additional meaning to the styleset and allow building dependent style rules:
 * - The `"+"` property specifies one or more parent style rules. This allows specifying
 *   parent rules using a convenient style-property-like notation.
 * - Properties with pseudo class names (e.g. `:hover`) or pseudo element names (e.g. `::after`).
 *   These properties define a styleset that will be assigned to the selector obtained by using
 *   the original styleset's owner followed by the given pseudo class or pseudo element.
 * - Properties with names of parameterized pseudo classes (e.g. `:nth-child`) or parameterized
 *   pseudo elements (e.g. `::slotted`). These properties contain a tuple, where the first
 *   element is the parameter for the selector and the second element is the styleset.
 *   These properties define a styleset that will be assigned to the selector obtained by using
 *   the original styleset's owner followed by the given pseudo class or pseudo element.
 * - Properties with the ampersand symbol (`&`) that contain arrays of two-element tuples each
 *   defining a selector and a style corresponding to this selector. Selectors can use the
 *   ampersand symbol to refer to the parent style selector. If the ampersand symbol is not used,
 *   the selector will be simply appended to the parent selector.
 *
 * Functions that return style rules (e.g. [[$class]]) accept the `CombinedStyleset` as a parameter,
 * for example:
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     class1 = this.$class({})
 *     class2 = this.$class({
 *         backgroundColor: "white",
 *         ":hover" : { backgroundColor: "grey" },
 *         "&": [
 *             [ "li > &", { backgroundColor: "yellow" } ],
 *             [ this.class1, { backgroundColor: "orange" } ]
 *         ]
 *     })
 * }
 * ```
 *
 * This will translate to the following CSS (in reality, class names are auto-generated):
 *
 * ```css
 * .class2 { backgroundColor: white; }
 * .class2:hover { backgroundColor: grey; }
 * li > .class2 { backgroundColor: yellow; }
 * .class2.class1 { backgroundColor: orange; }
 * ```
 */
export declare type CombinedStyleset = Styleset & {
    "+"?: IStyleRule | IStyleRule[];
} & {
    [K in PseudoEntity]?: CombinedStyleset | CombinedStyleset[];
} & {
    [K in keyof IParameterizedPseudoEntity]?: [IParameterizedPseudoEntity[K], CombinedStyleset | CombinedStyleset[]][];
} & {
    [K in DependentRuleCombinator]?: [CssSelector, CombinedStyleset | CombinedStyleset[]][];
};
/**
 * Extends the CombinedStyleset type with the "++" property, which
 * allows combining multiple class rules. Note that the "+" (single plus) property allows deriving
 * from any base style rules (not necessarily classes) and the style properties from the base rules
 * are simply copied to the new rule. Additionally, even if class rules were among the base rules,
 * the names of the base classes are lost.
 *
 * The "++" (double plus) property is different and it only applies to class rules and only allows
 * deriving from class rules. The style properties from the base classes are not copied to the new
 * rule; instead, the name of the new class becomes a concatenation of the new rule name and the
 * names of all base classes.
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     redFG = this.$class({ color: "red" })
 *     whiteBG = this.$class({ backgroundColor: "white" })
 *
 *     emphasized = this.$class({
 *         "++": [this.redFG, this.whiteBG],
 *         fontWeight: 700
 *     })
 * }
 * ```
 *
 * This will translate to the following CSS (in reality, class names are auto-generated):
 *
 * ```css
 * .redFG { color: red; }
 * .whiteBG { backgroundColor: white; }
 * .emphasized.redFG.whiteBG { fontWeight: 700; }
 * ```
 *
 * Note that when the MyStyles is activated and the emphasized property is applied to an element,
 * the class name will be not just "emphasized", but "emphasized redFG whiteBG". That is, the
 * following rendering function
 *
 * ```typescript
 * let styles = css.activate(MyStyles);
 * render()
 * {
 *     return <div className={styles.emphasized.name}>Important stuff</div>
 * }
 * ```
 *
 * will generate the following HTML:
 *
 * ```html
 * <div className="emphasized redFG whiteBG">Important stuff</div>
 * ```
 */
export declare type CombinedClassStyleset = CombinedStyleset & {
    "++"?: ParentClassType | ParentClassType[];
};
/**
 * Represents types that can be used to inherit from an already defined CSS class. This type is
 * used in the `"++"` property of the [[CombinedClassStyleset]] type, which allows CSS classes
 * to include definitions of other CSS classes.
 */
export declare type ParentClassType = string | IClassRule | IClassNameRule;
/**
 * Defines an object containing style properties for an animation frame.
 * Stylesets for keyframes allow custom properties (via "--") but don't allow dependent rules
 * (because dependent rules are actually separate CSS rules). Animation styleset can extend other
 * style rules; however, any dependent rules will be ignored.
 */
export declare type AnimationStyleset = Styleset & {
    "+"?: IStyleRule | IStyleRule[];
};
/**
 * Helper type describing keys of the [[ISyntaxTypeStyleset]] interface.
 */
export declare type SyntaxKey = (keyof ISyntaxTypeStyleset) & string;
/**
 * Type that maps a tuple type with syntax keys to a tuple type with corresponding syntax types.
 * For example, it will map type `["<color>", "<length>"]` to type `[CssColor, CssLength]`.
 * This type is used when defining parameters for the [[paint]] CSS function.
 */
export declare type MappedSyntaxTypes<T extends SyntaxKey[]> = {
    [i in keyof T]: T[i] extends SyntaxKey ? ISyntaxTypeStyleset[T[i]] : never;
};
//# sourceMappingURL=Stylesets.d.ts.map