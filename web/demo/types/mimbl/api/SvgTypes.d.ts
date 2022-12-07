import { ExtendedElement } from "./CompTypes";
import { ReferrerPolicyPropType, FormtargetPropType, CrossoriginPropType, IElementAttrs, IElementEvents } from "./ElementTypes";
import { AlignmentBaselineKeywords, BaselineShift_StyleType, ClipPath_StyleType, ClipRule_StyleType, ColorInterpolation_StyleType, CssColor, CssLength, CssNumber, CssPercent, Cursor_StyleType, Direction, Display_StyleType, DominantBaseline_StyleType, FillRule, Filter_StyleType, FontSize, FontStretch, FontWeight_StyleType, ImageRendering_StyleType, IPathBuilder, LetterSpacing_StyleType, Marker_StyleType, MediaStatement, PointerEvents_StyleType, ShapeRendering_StyleType, StrokeDasharray_StyleType, StrokeLinecap_StyleType, StrokeLinejoin_StyleType, TextAnchor_StyleType, TextRendering_StyleType, TransformOrigin_StyleType, UnicodeBidi_StyleType, VectorEffect_StyleType, Visibility_StyleType, WritingMode_StyleType } from "mimcss";
export declare type PreserveAspectRatioPropType = "none" | "xMinYMin" | "xMidYMin" | "xMaxYMin" | "xMinYMid" | "xMidYMid" | "xMaxYMid" | "xMinYMax" | "xMidYMax" | "xMaxYMax" | "meet" | "slice";
export declare type SvgInPropType = string | "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint";
export declare type UnitsPropType = "userSpaceOnUse" | "objectBoundingBox";
export declare type LengthAdjustPropType = "spacing" | "spacingAndGlyphs";
/** The ISvgConditionalProcessingProps interface defines SVG Conditional Processing Attributes. */
export interface ISvgConditionalProcessingAttrs {
    requiredExtensions?: string | string[];
    systemLanguage?: string | string[];
}
/** The ISvgPresentationProps interface defines SVG Presentation Attributes. */
export interface ISvgPresentationAttrs {
    "alignment-baseline"?: AlignmentBaselineKeywords | "inherit";
    "baseline-shift"?: BaselineShift_StyleType | "inherit";
    "clip-path"?: ClipPath_StyleType | "inherit";
    "clip-rule"?: ClipRule_StyleType | "inherit";
    "color"?: CssColor | "inherit";
    "color-interpolation"?: ColorInterpolation_StyleType | "inherit";
    "color-interpolation-filters"?: ColorInterpolation_StyleType | "inherit";
    "cursor"?: Cursor_StyleType | "inherit";
    "d"?: IPathBuilder;
    "direction"?: Direction | "inherit";
    "display"?: Display_StyleType;
    "dominant-baseline"?: DominantBaseline_StyleType | "inherit";
    "fill"?: "freeze" | "remove";
    "fillColor"?: CssColor;
    "fill-opacity"?: CssPercent;
    "fillOpacity"?: CssPercent;
    "fill-rule"?: FillRule | "inherit";
    "filter"?: Filter_StyleType;
    "flood-color"?: CssColor;
    "flood-opacity"?: CssPercent;
    "font-family"?: string;
    "font-size"?: FontSize | "inherit";
    "font-size-adjust"?: CssNumber | "none" | "inherit";
    "font-stretch"?: FontStretch | "inherit";
    "font-style"?: "normal" | "italic" | "oblique";
    "font-variant"?: string;
    "font-weight"?: FontWeight_StyleType | "inherit";
    "glyph-orientation-horizontal"?: string;
    "glyph-orientation-vertical"?: string;
    "image-rendering"?: ImageRendering_StyleType | "inherit";
    "letter-spacing"?: LetterSpacing_StyleType | "inherit";
    "lighting-color"?: CssColor;
    "marker-end"?: Marker_StyleType | "inherit";
    "marker-mid"?: Marker_StyleType | "inherit";
    "marker-start"?: Marker_StyleType | "inherit";
    "mask"?: string;
    "opacity"?: number;
    "overflow"?: "visible" | "hidden" | "scroll" | "auto" | "inherit";
    "pointer-events"?: PointerEvents_StyleType;
    "shape-rendering"?: ShapeRendering_StyleType | "inherit";
    "stop-color"?: CssColor;
    "stop-opacity"?: number;
    "stroke"?: CssColor;
    "stroke-dasharray"?: StrokeDasharray_StyleType;
    "stroke-dashoffset"?: CssLength;
    "stroke-linecap"?: StrokeLinecap_StyleType;
    "stroke-linejoin"?: StrokeLinejoin_StyleType;
    "stroke-miterlimit"?: CssNumber;
    "stroke-opacity"?: CssPercent;
    "stroke-width"?: CssLength;
    "text-anchor"?: TextAnchor_StyleType | "inherit";
    "text-decoration"?: "none" | "underline" | "overline" | "line-through" | "blink" | "inherit";
    "text-rendering"?: TextRendering_StyleType | "inherit";
    "transform"?: string;
    "transform-origin"?: TransformOrigin_StyleType;
    "unicode-bidi"?: UnicodeBidi_StyleType;
    "vector-effect"?: VectorEffect_StyleType;
    "visibility"?: Visibility_StyleType | "inherit";
    "word-spacing"?: CssLength | "inherit";
    "writing-mode"?: WritingMode_StyleType | "inherit";
}
/** The ISvgFilterPrimitiveProps interface defines SVG Filters Attributes. */
export interface ISvgFilterPrimitiveAttrs {
    height?: string | number;
    result?: string;
    width?: string | number;
    x?: string | number;
    y?: string | number;
}
/** The ISvgTransferFunctionProps interface defines SVG Tarnsfer Function Attributes. */
export interface ISvgTransferFunctionAttrs {
    type?: "identity" | "table" | "discrete" | "linear" | "gamma";
    tableValues?: string;
    slope?: string;
    intercept?: string;
    amplitude?: string;
    exponent?: string;
    offset?: string;
}
/** The ISvgAnimationProps interface defines SVG Animation Attributes. */
export interface ISvgAnimationAttrs {
    attributeType?: string;
    attributeName?: string;
    begin?: string;
    dur?: string;
    end?: string;
    min?: string;
    max?: string;
    restart?: "always" | "whenNotActive" | "never";
    repeatCount?: string | number;
    repeatDur?: string;
    fill?: "freeze" | "remove";
    calcMode?: "discrete" | "linear" | "paced" | "spline";
    values?: string;
    keyTimes?: string;
    keySplines?: string;
    from?: string | number;
    to?: string | number;
    by?: string;
    autoReverse?: string;
    accelerate?: string;
    decelerate?: string;
    additive?: "replace" | "sum";
    accumulate?: "none" | "sum";
    href?: string;
}
/**
 * The ISvgElementAttrs interface defines standard properties (attributes and event listeners)
 * that can be used on all SVG elements.
 */
export interface ISvgElementAttrs extends IElementAttrs, Pick<ISvgPresentationAttrs, "color" | "display" | "transform" | "transform-origin"> {
}
/**
 * Defines events common to all SVG elements
 */
export interface ISvgElementEvents extends IElementEvents {
}
/**
 * Represents SVG elements of the Animation category
 */
export interface ISvgAnimationCategoryAttrs extends ISvgElementAttrs, ISvgAnimationAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-rule" | "fill"> {
}
/**
 * Represents SVG elements of the Container category
 */
export interface ISvgContainerCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "color-interpolation" | "cursor" | "filter" | "mask" | "pointer-events"> {
}
/**
 * Represents SVG elements of the Descriptive category
 */
export interface ISvgDescriptiveCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "clip-rule"> {
}
/**
 * Represents SVG elements of the Filter Primitive category
 */
export interface ISvgFilterPrimitiveCategoryAttrs extends ISvgElementAttrs, ISvgFilterPrimitiveAttrs, Pick<ISvgPresentationAttrs, "color-interpolation-filters"> {
}
/**
 * Represents SVG elements of the Transfer Function category
 */
export interface ISvgTransferFunctionCategoryAttrs extends ISvgElementAttrs, ISvgTransferFunctionAttrs {
}
/**
 * Represents SVG elements of the Graphics category
 */
export interface ISvgGraphicsCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "cursor" | "filter" | "mask" | "opacity" | "pointer-events"> {
}
/**
 * Represents SVG elements of the Light Source category
 */
export interface ISvgLightSourceCategoryAttrs extends ISvgElementAttrs {
}
/**
 * Represents SVG elements of the Gradient category
 */
export interface ISvgGradientCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "color-interpolation"> {
}
/**
 * Represents SVG elements of the Paint Server category
 */
export interface ISvgPaintServerCategoryAttrs extends ISvgElementAttrs {
}
/**
 * Represents SVG elements of the Renderable category
 */
export interface ISvgRenderableCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "color-interpolation" | "opacity" | "pointer-events"> {
}
/**
 * Represents SVG elements of the Shape category
 */
export interface ISvgShapeCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-rule" | "fillColor" | "fill-opacity" | "fillOpacity" | "marker-end" | "marker-mid" | "marker-start" | "mask" | "opacity" | "pointer-events" | "shape-rendering" | "stroke" | "stroke-dasharray" | "stroke-dashoffset" | "stroke-linecap" | "stroke-linejoin" | "stroke-miterlimit" | "stroke-opacity" | "stroke-width" | "vector-effect" | "visibility"> {
}
/**
 * Represents SVG elements of the Structural category
 */
export interface ISvgStructuralCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "color-interpolation" | "pointer-events"> {
}
/**
 * Represents SVG elements of the TextContent category
 */
export interface ISvgTextContentCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "color-interpolation" | "direction" | "dominant-baseline" | "fillColor" | "fill-opacity" | "fill-rule" | "font-family" | "font-size" | "font-size-adjust" | "font-stretch" | "font-style" | "font-variant" | "font-weight" | "letter-spacing" | "pointer-events" | "stroke" | "stroke-dasharray" | "stroke-dashoffset" | "stroke-linecap" | "stroke-linejoin" | "stroke-miterlimit" | "stroke-opacity" | "stroke-width" | "text-anchor" | "text-decoration" | "unicode-bidi" | "vector-effect" | "visibility" | "word-spacing" | "writing-mode"> {
}
export interface ISvgAElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "visibility"> {
    download?: boolean;
    href?: string;
    hreflang?: string;
    ping?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    target?: FormtargetPropType;
    type?: string;
}
export interface ISvgAnimateElementProps extends ISvgAnimationCategoryAttrs, Pick<ISvgPresentationAttrs, "color-interpolation"> {
}
export interface ISvgAnimateMotionElementProps extends ISvgAnimationCategoryAttrs {
    path?: string;
    keyPoints?: string;
    rotate?: string;
    origin?: string;
}
export interface ISvgAnimateTransformElementProps extends ISvgAnimationCategoryAttrs {
}
export interface ISvgCircleElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    cx: string | number;
    cy: string | number;
    r: string | number;
    pathLength?: number;
}
export interface ISvgClipPathElementProps extends ISvgAElementProps, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "color-interpolation"> {
    clipPathUnits?: UnitsPropType;
}
export interface ISvgDefsElementProps extends ISvgContainerCategoryAttrs, ISvgStructuralCategoryAttrs, Pick<ISvgPresentationAttrs, "clip-path"> {
    begin?: string;
    href?: string;
}
export interface ISvgDeskElementProps extends ISvgDescriptiveCategoryAttrs {
}
export interface ISvgDiscardElementProps extends ISvgAnimationCategoryAttrs {
}
export interface ISvgEllipseElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    cx: string | number;
    cy: string | number;
    rx: string | number;
    ry: string | number;
    pathLength?: number;
}
export interface ISvgFeBlendElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    mode?: "normal" | "multiply" | "screen" | "darken" | "lighten";
}
export interface ISvgFeColorMatrixElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
    values?: string | number;
}
export interface ISvgFeComponentTransferElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeCompositeElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    mode?: "normal" | "multiply" | "screen" | "darken" | "lighten";
    opertor?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic";
    k1?: number;
    k2?: number;
    k3?: number;
    k4?: number;
}
export interface ISvgFeConvolveMatrixElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    bias?: number;
    divisor?: number;
    edgeMode?: "duplicate" | "wrap" | "none";
    in?: string | "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint";
    kernelMatrix?: string;
    kernelUnitLength?: string;
    order?: string;
    preserveAlpha?: boolean;
    targetX?: number;
    targetY?: number;
}
export interface ISvgFeDiffuseLightingElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "lighting-color"> {
    in?: string | "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint";
    surfaceScale?: number;
    diffuseConstant?: number;
    kernelUnitLength?: string;
}
export interface ISvgFeDisplacementMapElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    scale?: number;
    xChannelSelector?: "R" | "G" | "B" | "A";
    yChannelSelector?: "R" | "G" | "B" | "A";
}
export interface ISvgFeDistantLightElementProps extends ISvgLightSourceCategoryAttrs {
    azimuth?: number;
    elevation?: number;
}
export interface ISvgFeDropShadowElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "flood-color" | "flood-opacity"> {
    in?: SvgInPropType;
    stdDeviation?: string;
    dx?: string | number;
    dy?: string | number;
}
export interface ISvgFeFloodElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "flood-color" | "flood-opacity"> {
}
export interface ISvgFeFuncAElementProps extends ISvgTransferFunctionCategoryAttrs {
}
export interface ISvgFeFuncBElementProps extends ISvgTransferFunctionCategoryAttrs {
}
export interface ISvgFeFuncGElementProps extends ISvgTransferFunctionCategoryAttrs {
}
export interface ISvgFeFuncRElementProps extends ISvgTransferFunctionCategoryAttrs {
}
export interface ISvgFeGaussianBlurElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    stdDeviation?: string;
    edgeMode?: "duplicate" | "wrap" | "none";
}
export interface ISvgFeImageElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    preserveAspectRatio?: PreserveAspectRatioPropType;
    stdDeviation?: string;
    edgeMode?: "duplicate" | "wrap" | "none";
}
export interface ISvgFeMergeElementProps extends ISvgFilterPrimitiveCategoryAttrs {
}
export interface ISvgFeMergeNodeElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeMorphologyElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    operator?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic?: string";
    radius?: string;
}
export interface ISvgFeOffsetElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    dx?: string | number;
    dy?: string | number;
}
export interface ISvgFePointLightElementProps extends ISvgLightSourceCategoryAttrs {
    x?: number;
    y?: number;
    z?: number;
}
export interface ISvgFeSpecularLightingElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "lighting-color"> {
    in?: SvgInPropType;
    surfaceScale?: number;
    specularConstant?: number;
    specularExponent?: number;
    kernelUnitLength?: string;
}
export interface ISvgFeSpotLightElementProps extends ISvgLightSourceCategoryAttrs {
    x?: number;
    y?: number;
    z?: number;
    pointsAtX?: number;
    pointsAtY?: number;
    pointsAtZ?: number;
    specularExponent?: number;
    limitingConeAngle?: number;
}
export interface ISvgFeTileElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeTurbulenceElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    baseFrequency?: string;
    numOctaves?: number;
    seed?: number;
    stitchTiles?: "noStitch" | "stitch";
    type?: "fractalNoise" | "turbulence";
}
export interface ISvgFilterElementProps extends ISvgElementAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    filterUnits?: UnitsPropType;
    primitiveUnits?: UnitsPropType;
}
export interface ISvgForeignObjectElementProps extends ISvgRenderableCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "overflow" | "vector-effect" | "visibility"> {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}
export interface ISvgGElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path"> {
}
export interface ISvgHatchElementProps extends ISvgPaintServerCategoryAttrs {
    x?: string | number;
    y?: string | number;
    pitch?: string;
    rotate?: string;
    hatchUnits?: string;
    hatchContentUnits?: string;
    href?: string;
}
export interface ISvgHatchpathElementProps extends ISvgElementAttrs {
    offset?: string;
}
export interface ISvgImageElementProps extends ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "image-rendering" | "overflow" | "vector-effect" | "visibility"> {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    href?: string;
}
export interface ISvgLineElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    x1?: string | number;
    x2?: string | number;
    y1?: string | number;
    y2?: string | number;
    pathLength?: number;
}
export interface ISvgLinearGradientElementProps extends ISvgGradientCategoryAttrs, ISvgPaintServerCategoryAttrs, Pick<ISvgPresentationAttrs, "clip-path"> {
    x1?: string | number;
    x2?: string | number;
    y1?: string | number;
    y2?: string | number;
    gradientUnits?: UnitsPropType;
    gradientTransform?: string;
    spreadMethod?: "pad" | "reflect" | "repeat";
    href?: string;
}
export interface ISvgMarkerElementProps extends ISvgContainerCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "opacity" | "overflow"> {
    markerHeight?: string | number;
    markerUnits?: UnitsPropType;
    markerWidth?: string | number;
    gradientTransform?: string;
    orient?: number | string | "auto" | "auto-start-reverse";
    preserveAspectRatio?: PreserveAspectRatioPropType;
    refX?: string | number;
    refY?: string | number;
    viewBox?: string;
}
export interface ISvgMaskElementProps extends ISvgContainerCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path"> {
    x?: string | number;
    y?: string | number;
    height?: string | number;
    width?: string | number;
    maskUnits?: UnitsPropType;
    maskContentUnits?: UnitsPropType;
}
export interface ISvgDeskElementProps extends ISvgDescriptiveCategoryAttrs {
}
export interface ISvgMPathElementProps extends ISvgAnimationCategoryAttrs {
    href?: string;
}
export interface ISvgPathElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "d" | "fill-rule"> {
    pathLength?: number;
}
export interface ISvgPatternElementProps extends ISvgContainerCategoryAttrs, ISvgPaintServerCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "overflow"> {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    patternUnits?: UnitsPropType;
    patternContentUnits?: UnitsPropType;
    href?: string;
    viewBox?: string;
}
export interface ISvgPolygonElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "fill-rule"> {
    points: string;
    pathLength?: number;
}
export interface ISvgPolylineElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "fill-rule"> {
    points?: string;
    pathLength?: number;
}
export interface ISvgRadialGradientElementProps extends ISvgGradientCategoryAttrs, ISvgPaintServerCategoryAttrs {
    cx?: string | number;
    cy?: string | number;
    r?: string | number;
    fx?: string | number;
    fy?: string | number;
    fr?: string | number;
    gradientUnits?: UnitsPropType;
    gradientTransform?: string;
    spreadMethod?: "pad" | "reflect" | "repeat";
    href?: string;
}
export interface ISvgRectElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    rx?: string | number;
    ry?: string | number;
    pathLength?: number;
}
export interface ISvgScriptElementProps extends ISvgElementAttrs {
    async?: boolean;
    crossorigin?: CrossoriginPropType;
    defer?: boolean;
    integrity?: string;
    nomodule?: boolean;
    nonce?: string;
    src?: string;
    text?: string;
    type?: string;
}
export interface ISvgSetElementProps extends ISvgAnimationCategoryAttrs {
    to: string;
}
export interface ISvgStopElementProps extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "stop-color" | "stop-opacity"> {
    offset?: CssPercent;
}
export interface ISvgStyleElementProps extends ISvgElementAttrs {
    media?: MediaStatement;
    nonce?: string;
    title?: string;
    type?: string;
}
export interface ISvgSvgElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "overflow"> {
    height?: string | number;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    viewBox?: string;
    width?: string | number;
    x?: string | number;
    y?: string | number;
}
export interface ISvgSwitchElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clip-path"> {
}
export interface ISvgSymbolElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "overflow"> {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    refX?: string | number;
    refY?: string | number;
    viewBox?: string;
}
export interface ISvgTextElementProps extends ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgTextContentCategoryAttrs, Pick<ISvgPresentationAttrs, "clip-rule" | "overflow" | "text-rendering"> {
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    rotate?: string;
    lengthAdjust?: LengthAdjustPropType;
    textLength?: string | number;
}
export interface ISvgTextPathElementProps extends ISvgRenderableCategoryAttrs, ISvgTextContentCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "alignment-baseline" | "baseline-shift"> {
    href?: string;
    lengthAdjust?: LengthAdjustPropType;
    method?: "align" | "stretch";
    path?: string;
    side?: "left" | "right";
    spacing?: "auto" | "exact";
    startOffset?: string | number;
    textLength?: string | number;
}
export interface ISvgTitleElementProps extends ISvgDescriptiveCategoryAttrs {
}
export interface ISvgTspanElementProps extends ISvgRenderableCategoryAttrs, ISvgTextContentCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "alignment-baseline" | "baseline-shift"> {
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    rotate?: string;
    lengthAdjust?: LengthAdjustPropType;
    textLength?: string | number;
}
export interface ISvgUseElementProps extends ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, Pick<ISvgPresentationAttrs, "clip-path" | "clip-rule" | "filter" | "vector-effect"> {
    href: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}
export interface ISvgViewElementProps extends ISvgElementAttrs {
    preserveAspectRatio?: PreserveAspectRatioPropType;
    viewBox?: string;
}
export interface ISvgIntrinsicElements {
    svgA: ExtendedElement<SVGAElement, ISvgAElementProps>;
    animate: ExtendedElement<SVGAnimateElement, ISvgAnimateElementProps>;
    animateMotion: ExtendedElement<SVGAnimateMotionElement, ISvgAnimateMotionElementProps>;
    animateTarnsform: ExtendedElement<SVGAnimateTransformElement, ISvgAnimateMotionElementProps>;
    circle: ExtendedElement<SVGCircleElement, ISvgCircleElementProps>;
    clipPath: ExtendedElement<SVGClipPathElement, ISvgClipPathElementProps>;
    defs: ExtendedElement<SVGDefsElement, ISvgDefsElementProps>;
    desc: ExtendedElement<SVGDescElement, ISvgElementAttrs>;
    discard: ExtendedElement<SVGElement, ISvgDiscardElementProps>;
    ellipse: ExtendedElement<SVGEllipseElement, ISvgEllipseElementProps>;
    feBlend: ExtendedElement<SVGFEBlendElement, ISvgFeBlendElementProps>;
    feColorMatrix: ExtendedElement<SVGFEColorMatrixElement, ISvgFeColorMatrixElementProps>;
    feComponentTransfer: ExtendedElement<SVGFEComponentTransferElement, ISvgFeComponentTransferElementProps>;
    feComposite: ExtendedElement<SVGFECompositeElement, ISvgFeCompositeElementProps>;
    feConvolveMatrix: ExtendedElement<SVGFEConvolveMatrixElement, ISvgFeConvolveMatrixElementProps>;
    feDiffuseLighting: ExtendedElement<SVGFEDiffuseLightingElement, ISvgFeDiffuseLightingElementProps>;
    feDisplacementMap: ExtendedElement<SVGFEDisplacementMapElement, ISvgFeDisplacementMapElementProps>;
    feDistantLight: ExtendedElement<SVGFEDistantLightElement, ISvgFeDistantLightElementProps>;
    feDropShadow: ExtendedElement<SVGFEDropShadowElement, ISvgFeDropShadowElementProps>;
    feFlood: ExtendedElement<SVGFEFloodElement, ISvgFeFloodElementProps>;
    feFuncA: ExtendedElement<SVGFEFuncAElement, ISvgFeFuncAElementProps>;
    feFuncB: ExtendedElement<SVGFEFuncBElement, ISvgFeFuncBElementProps>;
    feFuncG: ExtendedElement<SVGFEFuncGElement, ISvgFeFuncGElementProps>;
    feFuncR: ExtendedElement<SVGFEFuncRElement, ISvgFeFuncRElementProps>;
    feGaussianBlur: ExtendedElement<SVGFEGaussianBlurElement, ISvgFeGaussianBlurElementProps>;
    feImage: ExtendedElement<SVGFEImageElement, ISvgFeImageElementProps>;
    feMerge: ExtendedElement<SVGFEMergeElement, ISvgFeMergeElementProps>;
    feMergeNode: ExtendedElement<SVGFEMergeNodeElement, ISvgFeMergeNodeElementProps>;
    feMorphology: ExtendedElement<SVGFEMorphologyElement, ISvgFeMorphologyElementProps>;
    feOffset: ExtendedElement<SVGFEOffsetElement, ISvgFeOffsetElementProps>;
    fePointLight: ExtendedElement<SVGFEPointLightElement, ISvgFePointLightElementProps>;
    feSpecularLighting: ExtendedElement<SVGFESpecularLightingElement, ISvgFeSpecularLightingElementProps>;
    feSpotLight: ExtendedElement<SVGFESpotLightElement, ISvgFeSpotLightElementProps>;
    feTile: ExtendedElement<SVGFETileElement, ISvgFeTileElementProps>;
    feTurbulence: ExtendedElement<SVGFETurbulenceElement, ISvgFeTurbulenceElementProps>;
    filter: ExtendedElement<SVGFilterElement, ISvgFilterElementProps>;
    foreignObject: ExtendedElement<SVGForeignObjectElement, ISvgForeignObjectElementProps>;
    g: ExtendedElement<SVGGElement, ISvgGElementProps>;
    hatch: ExtendedElement<SVGElement, ISvgHatchElementProps>;
    hatchpath: ExtendedElement<SVGElement, ISvgHatchpathElementProps>;
    image: ExtendedElement<SVGImageElement, ISvgImageElementProps>;
    line: ExtendedElement<SVGLineElement, ISvgLineElementProps>;
    linearGradient: ExtendedElement<SVGLinearGradientElement, ISvgLinearGradientElementProps>;
    marker: ExtendedElement<SVGMarkerElement, ISvgMarkerElementProps>;
    mask: ExtendedElement<SVGMaskElement, ISvgMaskElementProps>;
    metadata: ExtendedElement<SVGMetadataElement, ISvgElementAttrs>;
    mpath: ExtendedElement<SVGMPathElement, ISvgMPathElementProps>;
    path: ExtendedElement<SVGPathElement, ISvgPathElementProps>;
    pattern: ExtendedElement<SVGPatternElement, ISvgPatternElementProps>;
    polygon: ExtendedElement<SVGPolygonElement, ISvgPolygonElementProps>;
    polyline: ExtendedElement<SVGPolylineElement, ISvgPolylineElementProps>;
    radialGradient: ExtendedElement<SVGRadialGradientElement, ISvgRadialGradientElementProps>;
    rect: ExtendedElement<SVGRectElement, ISvgRectElementProps>;
    svgScript: ExtendedElement<SVGScriptElement, ISvgScriptElementProps>;
    set: ExtendedElement<SVGSetElement, ISvgSetElementProps>;
    solidcolor: ExtendedElement<SVGElement, ISvgElementAttrs>;
    stop: ExtendedElement<SVGStopElement, ISvgStopElementProps>;
    svgStyle: ExtendedElement<SVGStyleElement, ISvgStyleElementProps>;
    svg: ExtendedElement<SVGSVGElement, ISvgSvgElementProps>;
    switch: ExtendedElement<SVGSwitchElement, ISvgSwitchElementProps>;
    symbol: ExtendedElement<SVGSymbolElement, ISvgSymbolElementProps>;
    text: ExtendedElement<SVGTextElement, ISvgTextElementProps>;
    textPath: ExtendedElement<SVGTextPathElement, ISvgTextPathElementProps>;
    svgTitle: ExtendedElement<SVGTitleElement, ISvgElementAttrs>;
    tspan: ExtendedElement<SVGTSpanElement, ISvgTspanElementProps>;
    use: ExtendedElement<SVGUseElement, ISvgUseElementProps>;
    view: ExtendedElement<SVGViewElement, ISvgViewElementProps>;
}
//# sourceMappingURL=SvgTypes.d.ts.map