import { ExtendedElement } from "./CompTypes";
import { ReferrerPolicyPropType, FormtargetPropType, CrossoriginPropType, IElementAttrs, IElementEvents } from "./ElementTypes";
import { AlignmentBaselineKeywords, BaselineShift_StyleType, ClipPath_StyleType, ClipRule_StyleType, ColorInterpolation_StyleType, CssColor, CssLength, CssNumber, CssPercent, Cursor_StyleType, Direction, Display_StyleType, DominantBaseline_StyleType, FillRule, FontSize, FontStretch, FontWeight_StyleType, ImageRendering_StyleType, IPathBuilder, LetterSpacing_StyleType, Marker_StyleType, MediaStatement, PointerEvents_StyleType, ShapeRendering_StyleType, StrokeDasharray_StyleType, StrokeLinecap_StyleType, StrokeLinejoin_StyleType, TextAnchor_StyleType, TextRendering_StyleType, UnicodeBidi_StyleType, VectorEffect_StyleType, Visibility_StyleType, WritingMode_StyleType } from "mimcss";
/**
 * The ISvgElementAttrs interface defines standard properties (attributes and event listeners)
 * that can be used on all SVG elements.
 */
export interface ISvgElementAttrs extends IElementAttrs {
}
/**
 * Defines events common to all SVG elements
 */
export interface ISvgElementEvents extends IElementEvents {
    "color"?: CssColor | "inherit";
}
export declare type PreserveAspectRatioPropType = "none" | "xMinYMin" | "xMidYMin" | "xMaxYMin" | "xMinYMid" | "xMidYMid" | "xMaxYMid" | "xMinYMax" | "xMidYMax" | "xMaxYMax" | "meet" | "slice";
export declare type SvgInPropType = string | "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint";
export declare type UnitsPropType = "userSpaceOnUse" | "objectBoundingBox";
export declare type LengthAdjustPropType = "spacing" | "spacingAndGlyphs";
/** The ISvgConditionalProcessingProps interface defines SVG Conditional Processing Attributes. */
export interface ISvgConditionalProcessingAttrs extends ISvgElementAttrs {
    requiredExtensions?: string | string[];
    systemLanguage?: string | string[];
}
/** The ISvgPresentationProps interface defines SVG Presentation Attributes. */
export interface ISvgPresentationAttrs extends ISvgElementAttrs {
    "alignment-baseline"?: AlignmentBaselineKeywords | "inherit";
    "baseline-shift"?: BaselineShift_StyleType | "inherit";
    "clip-path"?: ClipPath_StyleType | "inherit";
    "clip-rule"?: ClipRule_StyleType | "inherit";
    "color-interpolation"?: ColorInterpolation_StyleType | "inherit";
    "color-interpolation-filters"?: ColorInterpolation_StyleType | "inherit";
    "color-rendering"?: "auto" | "optimizeSpeed" | "optimizeQuality" | "inherit";
    "cursor"?: Cursor_StyleType | "inherit";
    "d"?: IPathBuilder;
    "direction"?: Direction | "inherit";
    "display"?: Display_StyleType;
    "dominant-baseline"?: DominantBaseline_StyleType | "inherit";
    "fill"?: CssColor;
    "fill-opacity"?: CssPercent;
    "fill-rule"?: FillRule | "inherit";
    "filter"?: string | "none" | "inherit";
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
    "unicode-bidi"?: UnicodeBidi_StyleType;
    "vector-effect"?: VectorEffect_StyleType;
    "visibility"?: Visibility_StyleType | "inherit";
    "word-spacing"?: CssLength | "inherit";
    "writing-mode"?: WritingMode_StyleType | "inherit";
}
/** The ISvgFilterPrimitiveProps interface defines SVG Filters Attributes. */
export interface ISvgFilterPrimitiveAttrs extends ISvgElementAttrs {
    height?: string | number;
    result?: string;
    width?: string | number;
    x?: string | number;
    y?: string | number;
}
/** The ISvgTransferFunctionProps interface defines SVG Tarnsfer Function Attributes. */
export interface ISvgTransferFunctionsAttrs extends ISvgElementAttrs {
    type?: "identity" | "table" | "discrete" | "linear" | "gamma";
    tableValues?: string;
    slope?: string;
    intercept?: string;
    amplitude?: string;
    exponent?: string;
    offset?: string;
}
/** The ISvgAnimationProps interface defines SVG Animation Attributes. */
export interface ISvgAnimationAttrs extends ISvgElementAttrs {
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
}
export interface ISvgAElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    download?: boolean;
    href?: string;
    hreflang?: string;
    ping?: string;
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    target?: FormtargetPropType;
    type?: string;
}
export interface ISvgAnimateMotionElementProps extends ISvgConditionalProcessingAttrs, ISvgAnimationAttrs {
    calcMode?: "discrete" | "linear" | "paced" | "spline";
    path?: string;
    keyPoints?: string;
    rotate?: string;
    origin?: string;
}
export interface ISvgCircleElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    cx: string | number;
    cy: string | number;
    r: string | number;
    pathLength?: number;
}
export interface ISvgClipPathElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    clipPathUnits?: UnitsPropType;
}
export interface ISvgColorProfilePathElementProps extends ISvgElementAttrs {
    local?: string;
    name?: string;
    "rendering-intent"?: string;
}
export interface ISvgDefsElementProps extends ISvgElementAttrs, ISvgPresentationAttrs {
    begin?: string;
    href?: string;
}
export interface ISvgDiscardElementProps extends ISvgConditionalProcessingAttrs {
    begin?: string;
    href?: string;
}
export interface ISvgEllipseElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    cx: string | number;
    cy: string | number;
    rx: string | number;
    ry: string | number;
    pathLength?: number;
}
export interface ISvgFeBlendElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    mode?: "normal" | "multiply" | "screen" | "darken" | "lighten";
}
export interface ISvgFeColorMatrixElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
    values?: string | number;
}
export interface ISvgFeComponentTransferElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeCompositeElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    mode?: "normal" | "multiply" | "screen" | "darken" | "lighten";
    opertor?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic";
    k1?: number;
    k2?: number;
    k3?: number;
    k4?: number;
}
export interface ISvgFeConvolveMatrixElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
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
export interface ISvgFeDiffuseLightingElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: string | "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint";
    surfaceScale?: number;
    diffuseConstant?: number;
    kernelUnitLength?: string;
}
export interface ISvgFeDisplacementMapElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    scale?: number;
    xChannelSelector?: "R" | "G" | "B" | "A";
    yChannelSelector?: "R" | "G" | "B" | "A";
}
export interface ISvgFeDistantLightElementProps extends ISvgElementAttrs {
    azimuth?: number;
    elevation?: number;
}
export interface ISvgFeDropShadowElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    stdDeviation?: string;
    dx?: string | number;
    dy?: string | number;
    "flood-color"?: CssColor;
    "flood-opacity"?: CssPercent;
}
export interface ISvgFeFloodElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    "flood-color"?: CssColor;
    "flood-opacity"?: CssPercent;
}
export interface ISvgFeGaussianBlurElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    stdDeviation?: string;
    edgeMode?: "duplicate" | "wrap" | "none";
}
export interface ISvgFeImageElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    preserveAspectRatio?: PreserveAspectRatioPropType;
    stdDeviation?: string;
    edgeMode?: "duplicate" | "wrap" | "none";
}
export interface ISvgFeMergeNodeElementProps extends ISvgElementAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeMorphologyElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    operator?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic?: string";
    radius?: string;
}
export interface ISvgFeOffsetElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    dx?: string | number;
    dy?: string | number;
}
export interface ISvgFePointLightElementProps extends ISvgElementAttrs {
    x?: number;
    y?: number;
    z?: number;
}
export interface ISvgFeSpecularLightingElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
    surfaceScale?: number;
    specularConstant?: number;
    specularExponent?: number;
    kernelUnitLength?: string;
}
export interface ISvgFeSpotLightElementProps extends ISvgElementAttrs {
    x?: number;
    y?: number;
    z?: number;
    pointsAtX?: number;
    pointsAtY?: number;
    pointsAtZ?: number;
    specularExponent?: number;
    limitingConeAngle?: number;
}
export interface ISvgFeTileElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeTurbulenceElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    baseFrequency?: string;
    numOctaves?: number;
    seed?: number;
    stitchTiles?: "noStitch" | "stitch";
    type?: "fractalNoise" | "turbulence";
}
export interface ISvgFilterElementProps extends ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    filterUnits?: UnitsPropType;
    primitiveUnits?: UnitsPropType;
}
export interface ISvgForeignObjectElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}
export interface ISvgGElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
}
export interface ISvgHatchElementProps extends ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    pitch?: string;
    rotate?: string;
    hatchUnits?: string;
    hatchContentUnits?: string;
    href?: string;
}
export interface ISvgHatchpathElementProps extends ISvgPresentationAttrs {
    offset?: string;
}
export interface ISvgImageElementProps extends ISvgPresentationAttrs, ISvgFilterPrimitiveAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    href?: string;
}
export interface ISvgLineElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x1?: string | number;
    x2?: string | number;
    y1?: string | number;
    y2?: string | number;
    pathLength?: number;
}
export interface ISvgLinearGradientElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x1?: string | number;
    x2?: string | number;
    y1?: string | number;
    y2?: string | number;
    gradientUnits?: UnitsPropType;
    gradientTransform?: string;
    spreadMethod?: "pad" | "reflect" | "repeat";
    href?: string;
}
export interface ISvgMarkerElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
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
export interface ISvgMaskElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    height?: string | number;
    width?: string | number;
    maskUnits?: UnitsPropType;
    maskContentUnits?: UnitsPropType;
}
export interface ISvgMPathElementProps extends ISvgConditionalProcessingAttrs {
    href?: string;
}
export interface ISvgPathElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    pathLength?: number;
}
export interface ISvgPatternElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    patternUnits?: UnitsPropType;
    patternContentUnits?: UnitsPropType;
    href?: string;
    viewBox?: string;
}
export interface ISvgPolygonElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    points: string;
    pathLength?: number;
}
export interface ISvgPolylineElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    points?: string;
    pathLength?: number;
}
export interface ISvgRadialGradientElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
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
export interface ISvgRectElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
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
export interface ISvgSetElementProps extends ISvgConditionalProcessingAttrs, ISvgAnimationAttrs {
    to: string;
}
export interface ISvgStopElementProps extends ISvgPresentationAttrs {
    offset?: string;
    "stop-color"?: CssColor;
    "stop-opacity"?: CssPercent;
}
export interface ISvgStyleElementProps extends ISvgElementAttrs {
    media?: MediaStatement;
    nonce?: string;
    title?: string;
    type?: string;
}
export interface ISvgSvgElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    height?: string | number;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    viewBox?: string;
    width?: string | number;
    x?: string | number;
    y?: string | number;
}
export interface ISvgSwitchElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
}
export interface ISvgSymbolElementProps extends ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    refX?: string | number;
    refY?: string | number;
    viewBox?: string;
}
export interface ISvgTextElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    rotate?: string;
    lengthAdjust?: LengthAdjustPropType;
    textLength?: string | number;
}
export interface ISvgTextPathElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    href?: string;
    lengthAdjust?: LengthAdjustPropType;
    method?: "align" | "stretch";
    path?: string;
    side?: "left" | "right";
    spacing?: "auto" | "exact";
    startOffset?: string | number;
    textLength?: string | number;
}
export interface ISvgTspanElementProps extends ISvgConditionalProcessingAttrs, ISvgPresentationAttrs {
    x?: string | number;
    y?: string | number;
    dx?: string | number;
    dy?: string | number;
    rotate?: string;
    lengthAdjust?: LengthAdjustPropType;
    textLength?: string | number;
}
export interface ISvgUseElementProps extends ISvgPresentationAttrs {
    href: string;
    x?: string | number;
    y?: string | number;
    width?: string | number;
    height?: string | number;
}
export interface ISvgViewElementProps extends ISvgConditionalProcessingAttrs {
    preserveAspectRatio?: PreserveAspectRatioPropType;
    viewBox?: string;
    zoomAndPan?: string;
    viewTarget?: string;
}
export interface ISvgIntrinsicElements {
    svgA: ExtendedElement<SVGAElement, ISvgAElementProps>;
    animate: ExtendedElement<SVGAnimateElement, ISvgConditionalProcessingAttrs | ISvgAnimationAttrs>;
    animateMotion: ExtendedElement<SVGAnimateMotionElement, ISvgAnimateMotionElementProps>;
    animateTarnsform: ExtendedElement<SVGAnimateTransformElement, ISvgConditionalProcessingAttrs | ISvgAnimationAttrs>;
    circle: ExtendedElement<SVGCircleElement, ISvgCircleElementProps>;
    clipPath: ExtendedElement<SVGClipPathElement, ISvgClipPathElementProps>;
    colorProfile: ExtendedElement<SVGAElement, ISvgColorProfilePathElementProps>;
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
    feFuncA: ExtendedElement<SVGFEFuncAElement, ISvgTransferFunctionsAttrs>;
    feFuncB: ExtendedElement<SVGFEFuncBElement, ISvgTransferFunctionsAttrs>;
    feFuncG: ExtendedElement<SVGFEFuncGElement, ISvgTransferFunctionsAttrs>;
    feFuncR: ExtendedElement<SVGFEFuncRElement, ISvgTransferFunctionsAttrs>;
    feGaussianBlur: ExtendedElement<SVGFEGaussianBlurElement, ISvgFeGaussianBlurElementProps>;
    feImage: ExtendedElement<SVGFEImageElement, ISvgFeImageElementProps>;
    feMerge: ExtendedElement<SVGFEMergeElement, ISvgPresentationAttrs | ISvgFilterPrimitiveAttrs>;
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