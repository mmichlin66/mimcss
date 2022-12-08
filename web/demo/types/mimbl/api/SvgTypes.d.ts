import { ExtendedElement } from "./CompTypes";
import { ReferrerPolicyPropType, FormtargetPropType, CrossoriginPropType, IElementAttrs, IElementEvents } from "./ElementTypes";
import { AlignmentBaselineKeyword, AngleUnits, BlendModeKeyword, ClipPath_StyleType, ClipRule_StyleType, ColorInterpolation_StyleType, CssColor, Cursor_StyleType, Direction, Display_StyleType, DominantBaseline_StyleType, FillRule, Filter_StyleType, FontSizeKeyword, FontStretchKeyword, HorizontalPositionKeyword, ImageRendering_StyleType, IPathBuilder, LengthUnits, Marker_StyleType, MediaStatement, OneOrMany, PercentUnits, PointerEvents_StyleType, ShapeRendering_StyleType, StrokeLinecap_StyleType, StrokeLinejoin_StyleType, TextAnchor_StyleType, TextRendering_StyleType, Transform_StyleType, UnicodeBidi_StyleType, VectorEffect_StyleType, VerticalPositionKeyword, Visibility_StyleType, WritingMode_StyleType } from "mimcss";
export declare type PreserveAspectAlignKeyword = "none" | "xMinYMin" | "xMidYMin" | "xMaxYMin" | "xMinYMid" | "xMidYMid" | "xMaxYMid" | "xMinYMax" | "xMidYMax" | "xMaxYMax";
export declare type PreserveAspectRatioMeetOrSliceKeyword = "meet" | "slice";
export declare type PreserveAspectRatioPropType = "none" | PreserveAspectAlignKeyword | [
    PreserveAspectAlignKeyword,
    PreserveAspectRatioMeetOrSliceKeyword?
];
export declare type SvgInPropType = string | "SourceGraphic" | "SourceAlpha" | "BackgroundImage" | "BackgroundAlpha" | "FillPaint" | "StrokePaint";
export declare type SvgUnitsPropType = "userSpaceOnUse" | "objectBoundingBox";
export declare type LengthAdjustPropType = "spacing" | "spacingAndGlyphs";
/**
 * Defines units used in the SVG `<clock-value>' type
 */
export declare type SvgClockUnits = "h" | "min" | "s" | "ms";
export declare type SvgClock = number | `${number}${SvgClockUnits}` | `${number}:${number}` | `${number}:${number}:${number}`;
export declare type SvgViewBox = number | [number, number?, number?, number?];
/**
 * Type for presentation attributes of the `<percentage>` SVG type. Values of this type can be specifed as:
 * - strings that have a number followed by the percent sign, like `"83%"`
 * - a number:
 *   - if the number is an integer, it is taken as is and a percent sign is appended to it
 *   - if the number is a floating point, it is multiplied by 100 and a percent sign is appended to it
 */
export declare type SvgPercent = number | `${number}${PercentUnits}`;
/**
 * Type for presentation attributes of the `<length>` SVG type. Values of this type can be specifed as:
 * - strings that have a number followed by one of the length units, like `"100vh"` or `"1em"`
 * - a number
 */
export declare type SvgLength = SvgPercent | `${number}${LengthUnits}`;
/**
 * Type for presentation attributes of the `<length>` SVG type. Values of this type can be specifed as:
 * - strings that have a number followed by one of the length units, like `"100deg"` or `"1rad"`
 * - a number
 */
export declare type SvgAngle = number | `${number}${AngleUnits}`;
/** The ISvgConditionalProcessingProps interface defines SVG Conditional Processing Attributes. */
export interface ISvgConditionalProcessingAttrs {
    requiredExtensions?: string | string[];
    systemLanguage?: string | string[];
}
/** The ISvgPresentationProps interface defines SVG Presentation Attributes. */
export interface ISvgPresentationAttrs {
    alignmentBaseline?: AlignmentBaselineKeyword | "inherit";
    baselineShift?: "sub" | "super" | SvgLength | "inherit";
    clipPath?: ClipPath_StyleType | "inherit";
    clipRule?: ClipRule_StyleType | "inherit";
    color?: CssColor | "inherit";
    colorInterpolation?: ColorInterpolation_StyleType | "inherit";
    colorInterpolationFilters?: ColorInterpolation_StyleType | "inherit";
    cursor?: Cursor_StyleType | "inherit";
    d?: string | IPathBuilder;
    direction?: Direction | "inherit";
    display?: Display_StyleType;
    dominantBaseline?: DominantBaseline_StyleType | "inherit";
    fill?: "freeze" | "remove";
    fillColor?: CssColor;
    fillOpacity?: SvgPercent;
    fillRule?: FillRule | "inherit";
    filter?: Filter_StyleType;
    floodColor?: CssColor;
    floodOpacity?: SvgPercent;
    fontFamily?: string;
    fontSize?: FontSizeKeyword | SvgLength | "inherit";
    fontSizeAdjust?: number | "none" | "inherit";
    fontStretch?: FontStretchKeyword | SvgPercent | "inherit";
    fontStyle?: "normal" | "italic" | "oblique";
    fontVariant?: string;
    fontWeight?: number | "normal" | "bold" | "bolder" | "lighter" | "inherit";
    imageRendering?: ImageRendering_StyleType | "inherit";
    letterSpacing?: "normal" | SvgLength | "inherit";
    lightingColor?: CssColor;
    markerEnd?: Marker_StyleType | "inherit";
    markerMid?: Marker_StyleType | "inherit";
    markerStart?: Marker_StyleType | "inherit";
    mask?: string;
    opacity?: number;
    overflow?: "visible" | "hidden" | "scroll" | "auto" | "inherit";
    pointerEvents?: PointerEvents_StyleType;
    shapeRendering?: ShapeRendering_StyleType | "inherit";
    stopColor?: CssColor;
    stopOpacity?: number;
    stroke?: CssColor;
    strokeDasharray?: "none" | OneOrMany<SvgLength>;
    strokeDashoffset?: SvgLength;
    strokeLinecap?: StrokeLinecap_StyleType;
    strokeLinejoin?: StrokeLinejoin_StyleType;
    strokeMiterlimit?: number;
    strokeOpacity?: SvgPercent;
    strokeWidth?: SvgLength;
    textAnchor?: TextAnchor_StyleType | "inherit";
    textDecoration?: "none" | "underline" | "overline" | "line-through" | "blink" | "inherit";
    textRendering?: TextRendering_StyleType | "inherit";
    transform?: Transform_StyleType;
    transformOrigin?: HorizontalPositionKeyword | VerticalPositionKeyword | SvgLength | [
        HorizontalPositionKeyword | SvgLength,
        VerticalPositionKeyword | SvgLength,
        SvgLength?
    ];
    unicodeBidi?: UnicodeBidi_StyleType;
    vectorEffect?: VectorEffect_StyleType;
    visibility?: Visibility_StyleType | "inherit";
    wordSpacing?: SvgLength | "inherit";
    writingMode?: WritingMode_StyleType | "inherit";
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
    type: "identity" | "table" | "discrete" | "linear" | "gamma";
    tableValues?: string;
    slope?: string;
    intercept?: string;
    amplitude?: string;
    exponent?: string;
    offset?: string;
}
/** Defines SVG animation target attributes. */
export interface ISvgAnimationTargetAttrs {
    href?: string;
}
/** Defines SVG property that is a subject of animation. */
export interface ISvgAnimationTargetAttributeAttrs {
    attributeName: string;
}
/** Defines SVG animation timing attributes. */
export interface ISvgAnimationTimingAttrs {
    begin?: string | string[];
    dur?: SvgClock;
    end?: string[];
    min?: SvgClock;
    max?: SvgClock;
    restart?: "always" | "whenNotActive" | "never";
    repeatCount?: number | "indefinite";
    repeatDur?: SvgClock;
    fill?: "freeze" | "remove";
}
/** Defines SVG animation value attributes. */
export interface ISvgAnimationValueAttrs {
    calcMode?: "discrete" | "linear" | "paced" | "spline";
    values?: string[];
    keyTimes?: number[];
    keySplines?: [number, number, number, number][];
    from?: string | number;
    to?: string | number;
    by?: string | number;
    autoReverse?: string;
    accelerate?: string;
    decelerate?: string;
}
/** Defines SVG animation addition attributes. */
export interface ISvgAnimationAdditionAttrs {
    additive?: "replace" | "sum";
    accumulate?: "none" | "sum";
}
/**
 * The ISvgElementAttrs interface defines standard properties (attributes and event listeners)
 * that can be used on all SVG elements.
 */
export interface ISvgElementAttrs extends IElementAttrs, Pick<ISvgPresentationAttrs, "color" | "display" | "transform" | "transformOrigin"> {
}
/**
 * Defines events common to all SVG elements
 */
export interface ISvgElementEvents extends IElementEvents {
}
/**
 * Represents SVG elements of the Animation category
 */
export interface ISvgAnimationCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipRule" | "fill"> {
}
/**
 * Represents SVG elements of the Container category
 */
export interface ISvgContainerCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "colorInterpolation" | "cursor" | "filter" | "mask" | "pointerEvents"> {
}
/**
 * Represents SVG elements of the Descriptive category
 */
export interface ISvgDescriptiveCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "clipRule"> {
}
/**
 * Represents SVG elements of the Filter Primitive category
 */
export interface ISvgFilterPrimitiveCategoryAttrs extends ISvgElementAttrs, ISvgFilterPrimitiveAttrs, Pick<ISvgPresentationAttrs, "colorInterpolationFilters"> {
}
/**
 * Represents SVG elements of the Transfer Function category
 */
export interface ISvgTransferFunctionCategoryAttrs extends ISvgElementAttrs, ISvgTransferFunctionAttrs {
}
/**
 * Represents SVG elements of the Graphics category
 */
export interface ISvgGraphicsCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "cursor" | "filter" | "mask" | "opacity" | "pointerEvents"> {
}
/**
 * Represents SVG elements of the Light Source category
 */
export interface ISvgLightSourceCategoryAttrs extends ISvgElementAttrs {
}
/**
 * Represents SVG elements of the Gradient category
 */
export interface ISvgGradientCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "colorInterpolation"> {
}
/**
 * Represents SVG elements of the Paint Server category
 */
export interface ISvgPaintServerCategoryAttrs extends ISvgElementAttrs {
}
/**
 * Represents SVG elements of the Renderable category
 */
export interface ISvgRenderableCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "colorInterpolation" | "opacity" | "pointerEvents"> {
}
/**
 * Represents SVG elements of the Shape category
 */
export interface ISvgShapeCategoryAttrs extends ISvgElementAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipRule" | "fillColor" | "fillOpacity" | "markerEnd" | "markerMid" | "markerStart" | "mask" | "opacity" | "pointerEvents" | "shapeRendering" | "stroke" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "strokeOpacity" | "strokeWidth" | "vectorEffect" | "visibility"> {
}
/**
 * Represents SVG elements of the Structural category
 */
export interface ISvgStructuralCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "colorInterpolation" | "pointerEvents"> {
}
/**
 * Represents SVG elements of the TextContent category
 */
export interface ISvgTextContentCategoryAttrs extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "colorInterpolation" | "direction" | "dominantBaseline" | "fillColor" | "fillOpacity" | "fillRule" | "fontFamily" | "fontSize" | "fontSizeAdjust" | "fontStretch" | "fontStyle" | "fontVariant" | "fontWeight" | "letterSpacing" | "pointerEvents" | "stroke" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "strokeOpacity" | "strokeWidth" | "textAnchor" | "textDecoration" | "unicodeBidi" | "vectorEffect" | "visibility" | "wordSpacing" | "writingMode"> {
}
export interface ISvgAElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "visibility"> {
    download?: string;
    href?: string;
    hreflang?: string;
    ping?: string | string[];
    referrerpolicy?: ReferrerPolicyPropType;
    rel?: string;
    target?: FormtargetPropType;
    type?: string;
}
export interface ISvgAnimateElementProps extends ISvgAnimationCategoryAttrs, ISvgAnimationTargetAttrs, ISvgAnimationTargetAttributeAttrs, ISvgAnimationTimingAttrs, ISvgAnimationValueAttrs, ISvgAnimationAdditionAttrs, Pick<ISvgPresentationAttrs, "colorInterpolation"> {
}
export interface ISvgAnimateMotionElementProps extends ISvgAnimationCategoryAttrs, ISvgAnimationTargetAttrs, ISvgAnimationTimingAttrs, ISvgAnimationValueAttrs, ISvgAnimationAdditionAttrs {
    path?: string | IPathBuilder;
    keyPoints?: number[];
    rotate?: number | "auto" | "auto-reverse";
}
export interface ISvgAnimateTransformElementProps extends ISvgAnimationCategoryAttrs, ISvgAnimationTargetAttrs, ISvgAnimationTargetAttributeAttrs, ISvgAnimationTimingAttrs, ISvgAnimationValueAttrs, ISvgAnimationAdditionAttrs {
    type: "translate" | "scale" | "rotate" | "skewX" | "skewY";
}
export interface ISvgCircleElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    cx?: SvgLength;
    cy?: SvgLength;
    r?: SvgLength;
    pathLength?: number;
}
export interface ISvgClipPathElementProps extends ISvgAElementProps, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "colorInterpolation"> {
    clipPathUnits?: SvgUnitsPropType;
}
export interface ISvgDefsElementProps extends ISvgContainerCategoryAttrs, ISvgStructuralCategoryAttrs, Pick<ISvgPresentationAttrs, "clipPath"> {
    begin?: string;
    href?: string;
}
export interface ISvgDeskElementProps extends ISvgDescriptiveCategoryAttrs {
}
export interface ISvgDiscardElementProps extends ISvgAnimationCategoryAttrs, ISvgAnimationTimingAttrs {
}
export interface ISvgEllipseElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    cx?: SvgLength;
    cy?: SvgLength;
    rx?: SvgLength | "auto";
    ry?: SvgLength | "auto";
    pathLength?: number;
}
export interface ISvgFeBlendElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    mode?: BlendModeKeyword;
}
export interface ISvgFeColorMatrixElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    type: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha";
    values?: number | [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
}
export interface ISvgFeComponentTransferElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeCompositeElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    in2?: SvgInPropType;
    opertor?: "over" | "in" | "out" | "atop" | "xor" | "lighter" | "arithmetic";
    k1?: number;
    k2?: number;
    k3?: number;
    k4?: number;
}
export interface ISvgFeConvolveMatrixElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    bias?: number;
    divisor?: number;
    edgeMode?: "duplicate" | "wrap" | "none";
    in?: SvgInPropType;
    kernelMatrix?: number[];
    order?: number | [number, number?];
    preserveAlpha?: "true" | "false";
    targetX?: number;
    targetY?: number;
}
export interface ISvgFeDiffuseLightingElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "lightingColor"> {
    in?: SvgInPropType;
    surfaceScale?: number;
    diffuseConstant?: number;
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
export interface ISvgFeDropShadowElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "floodColor" | "floodOpacity"> {
    in?: SvgInPropType;
    stdDeviation?: number;
    dx?: number;
    dy?: number;
}
export interface ISvgFeFloodElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "floodColor" | "floodOpacity"> {
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
    stdDeviation?: number | [number, number?];
    edgeMode?: "duplicate" | "wrap" | "none";
}
export interface ISvgFeImageElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    href: string;
    preserveAspectRatio?: PreserveAspectRatioPropType;
}
export interface ISvgFeMergeElementProps extends ISvgFilterPrimitiveCategoryAttrs {
}
export interface ISvgFeMergeNodeElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
}
export interface ISvgFeMorphologyElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    operator?: "erode" | "dilate";
    radius?: number | [number, number?];
}
export interface ISvgFeOffsetElementProps extends ISvgFilterPrimitiveCategoryAttrs {
    in?: SvgInPropType;
    dx?: number;
    dy?: number;
}
export interface ISvgFePointLightElementProps extends ISvgLightSourceCategoryAttrs {
    x?: number;
    y?: number;
    z?: number;
}
export interface ISvgFeSpecularLightingElementProps extends ISvgFilterPrimitiveCategoryAttrs, Pick<ISvgPresentationAttrs, "lightingColor"> {
    in?: SvgInPropType;
    surfaceScale?: number;
    specularConstant?: number;
    specularExponent?: number;
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
    baseFrequency?: number | [number, number?];
    numOctaves?: number;
    seed?: number;
    stitchTiles?: "noStitch" | "stitch";
    type: "fractalNoise" | "turbulence";
}
export interface ISvgFilterElementProps extends ISvgElementAttrs {
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength;
    height?: SvgLength;
    filterUnits?: SvgUnitsPropType;
    primitiveUnits?: SvgUnitsPropType;
    href?: string;
}
export interface ISvgForeignObjectElementProps extends ISvgRenderableCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "overflow" | "vectorEffect" | "visibility"> {
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength;
    height?: SvgLength;
}
export interface ISvgGElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath"> {
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
export interface ISvgImageElementProps extends ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "imageRendering" | "overflow" | "vectorEffect" | "visibility"> {
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength;
    height?: SvgLength;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    href?: string;
    crossorigin?: CrossoriginPropType;
}
export interface ISvgLineElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    x1?: CrossoriginPropType;
    x2?: CrossoriginPropType;
    y1?: CrossoriginPropType;
    y2?: CrossoriginPropType;
    pathLength?: number;
}
export interface ISvgLinearGradientElementProps extends ISvgGradientCategoryAttrs, ISvgPaintServerCategoryAttrs, Pick<ISvgPresentationAttrs, "clipPath"> {
    x1?: SvgLength;
    x2?: SvgLength;
    y1?: SvgLength;
    y2?: SvgLength;
    gradientUnits?: SvgUnitsPropType;
    gradientTransform?: Transform_StyleType;
    spreadMethod?: "pad" | "reflect" | "repeat";
}
export interface ISvgMarkerElementProps extends ISvgContainerCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "opacity" | "overflow"> {
    markerHeight?: SvgLength;
    markerUnits?: SvgUnitsPropType;
    markerWidth?: SvgLength;
    gradientTransform?: Transform_StyleType;
    orient?: SvgAngle | "auto" | "auto-start-reverse";
    preserveAspectRatio?: PreserveAspectRatioPropType;
    refX?: "left" | "center" | "right" | SvgLength;
    refY?: "top" | "center" | "bottom" | SvgLength;
    viewBox?: SvgViewBox;
}
export interface ISvgMaskElementProps extends ISvgContainerCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath"> {
    x?: SvgLength;
    y?: SvgLength;
    height?: SvgLength;
    width?: SvgLength;
    maskUnits?: SvgUnitsPropType;
    maskContentUnits?: SvgUnitsPropType;
}
export interface ISvgMetadataElementProps extends ISvgDescriptiveCategoryAttrs {
}
export interface ISvgMPathElementProps extends ISvgAnimationCategoryAttrs {
    href?: string;
}
export interface ISvgPathElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "d" | "fillRule"> {
    pathLength?: number;
}
export interface ISvgPatternElementProps extends ISvgContainerCategoryAttrs, ISvgPaintServerCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "overflow"> {
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength;
    height?: SvgLength;
    patternUnits?: SvgUnitsPropType;
    patternContentUnits?: SvgUnitsPropType;
    patternTransform?: Transform_StyleType;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    href?: string;
    viewBox?: SvgViewBox;
}
export interface ISvgPolygonElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "fillRule"> {
    points: number[];
    pathLength?: number;
}
export interface ISvgPolylineElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, Pick<ISvgPresentationAttrs, "fillRule"> {
    points?: number[];
    pathLength?: number;
}
export interface ISvgRadialGradientElementProps extends ISvgGradientCategoryAttrs, ISvgPaintServerCategoryAttrs {
    cx?: SvgLength;
    cy?: SvgLength;
    r?: SvgLength;
    fx?: SvgLength;
    fy?: SvgLength;
    fr?: SvgLength;
    gradientUnits?: SvgUnitsPropType;
    gradientTransform?: Transform_StyleType;
    spreadMethod?: "pad" | "reflect" | "repeat";
}
export interface ISvgRectElementProps extends ISvgShapeCategoryAttrs, ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs {
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength | "auto";
    height?: SvgLength | "auto";
    rx?: SvgLength | "auto";
    ry?: SvgLength | "auto";
    pathLength?: number;
}
export interface ISvgScriptElementProps extends ISvgElementAttrs {
    type?: string;
    href?: string;
    crossorigin?: CrossoriginPropType;
}
export interface ISvgSetElementProps extends ISvgAnimationCategoryAttrs, ISvgAnimationTargetAttrs, ISvgAnimationTargetAttributeAttrs, ISvgAnimationTimingAttrs {
    to: string | number;
}
export interface ISvgStopElementProps extends ISvgElementAttrs, Pick<ISvgPresentationAttrs, "stopColor" | "stopOpacity"> {
    offset?: SvgPercent;
}
export interface ISvgStyleElementProps extends ISvgElementAttrs {
    media?: MediaStatement;
    nonce?: string;
    title?: string;
    type?: string;
}
export interface ISvgSvgElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "overflow"> {
    height?: SvgLength;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    viewBox?: SvgViewBox;
    width?: SvgLength;
    x?: SvgLength;
    y?: SvgLength;
}
export interface ISvgSwitchElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "clipPath"> {
}
export interface ISvgSymbolElementProps extends ISvgContainerCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "overflow"> {
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength;
    height?: SvgLength;
    preserveAspectRatio?: PreserveAspectRatioPropType;
    refX?: SvgLength | "left" | "center" | "right";
    refY?: SvgLength | "top" | "center" | "bottom";
    viewBox?: SvgViewBox;
}
export interface ISvgTextElementProps extends ISvgGraphicsCategoryAttrs, ISvgRenderableCategoryAttrs, ISvgTextContentCategoryAttrs, Pick<ISvgPresentationAttrs, "clipRule" | "overflow" | "textRendering"> {
    x?: SvgLength;
    y?: SvgLength;
    dx?: SvgLength;
    dy?: SvgLength;
    rotate?: number | number[];
    lengthAdjust?: LengthAdjustPropType;
    textLength?: SvgLength;
}
export interface ISvgTextPathElementProps extends ISvgRenderableCategoryAttrs, ISvgTextContentCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "alignmentBaseline" | "baselineShift"> {
    href?: string;
    lengthAdjust?: LengthAdjustPropType;
    method?: "align" | "stretch";
    path?: string | IPathBuilder;
    side?: "left" | "right";
    spacing?: "auto" | "exact";
    startOffset?: SvgLength;
    textLength?: SvgLength;
}
export interface ISvgTitleElementProps extends ISvgDescriptiveCategoryAttrs {
}
export interface ISvgTspanElementProps extends ISvgRenderableCategoryAttrs, ISvgTextContentCategoryAttrs, ISvgConditionalProcessingAttrs, Pick<ISvgPresentationAttrs, "alignmentBaseline" | "baselineShift"> {
    x?: SvgLength;
    y?: SvgLength;
    dx?: SvgLength;
    dy?: SvgLength;
    rotate?: number | number[];
    lengthAdjust?: LengthAdjustPropType;
    textLength?: SvgLength;
}
export interface ISvgUseElementProps extends ISvgRenderableCategoryAttrs, ISvgStructuralCategoryAttrs, Pick<ISvgPresentationAttrs, "clipPath" | "clipRule" | "filter" | "vectorEffect"> {
    href: string;
    x?: SvgLength;
    y?: SvgLength;
    width?: SvgLength;
    height?: SvgLength;
}
export interface ISvgViewElementProps extends ISvgElementAttrs {
    preserveAspectRatio?: PreserveAspectRatioPropType;
    viewBox?: SvgViewBox;
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