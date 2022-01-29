import { CssImage, Extended, ExtentKeyword } from "./CoreTypes";
import { CssAngle, CssLength, CssNumber, CssPercent, CssPoint } from "./NumericTypes";
import { CssColor } from "./ColorTypes";
import { GradientStopOrHint, ShapeRadius, IMinMaxFunc, IPathBuilder, IRepeatFunc, IGridSpanFunc, FillRule, ICircleBuilder, IEllipseBuilder, IInsetBuilder, IPolygonBuilder, IRayFunc, IPercentFilterFunc, IBlurFunc, IDropShadowFunc, IHueRotateFunc, IMatrixFunc, IMatrix3dFunc, IPerspectiveFunc, IRotateFunc, IRotate3dFunc, IScale1dFunc, IScaleFunc, IScale3dFunc, ISkewFunc, ISkew1dFunc, ITranslate1dFunc, ITranslate3dFunc, ITranslateFunc, ILinearGradientBuilder, IRadialGradientBuilder, IConicGradientBuilder, ICrossFadeBuilder, ICrossFadeFunc, IImageSetFunc, ImageSetItem, IPaintWorklets, IPaintFunc } from "./ShapeTypes";
import { GridLineCountOrName, GridTrack, GridTrackSize } from "./StyleTypes";
import { MappedSyntaxTypes } from "./Stylesets";
/**
 * Function returning the ILinearGradientBuilder interface representing the `linear-gradient` CSS functions.
 *
 * *Examples:*
 *
 * ```typescript
 * backgroundImage: linearGradient( "red", "blue")
 *
 * backgroundImage: linearGradient( ["red", 30], ["green", 50, 60], ["blue", 80]).repeating()
 *
 * backgroundImage: linearGradient( "red", "blue").to( 45)
 * ```
 *
 * @param stops Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
 *
 * @category Image
 */
export declare const linearGradient: (...stops: GradientStopOrHint<CssLength>[]) => ILinearGradientBuilder;
/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Examples:*
 *
 * ```typescript
 * backgroundImage: radialGradient( "red", "blue")
 *
 * backgroundImage: radialGradient( "red", "blue").circle( css.percent(30)).at( ["center", css.percent(65)])
 *
 * backgroundImage: radialGradient( "red", "blue").circle( 200).repeating()
 *
 * backgroundImage: radialGradient( "red", "blue").ellipse( "closest-side")
 * ```
 *
 * @param stops Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
 *
 * @category Image
 */
export declare const radialGradient: (...stops: GradientStopOrHint<CssLength>[]) => IRadialGradientBuilder;
/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Examples:*
 *
 * ```typescript
 * backgroundImage: conicGradient( "red", "blue")
 *
 * backgroundImage: conicGradient().repeating().add( "red", "blue")
 *
 * backgroundImage: conicGradient( "red", "blue").from( 0.25).at( ["center", css.percent(65)])
 * ```
 *
 * @param stops Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
 *
 * @category Image
 */
export declare const conicGradient: (...stops: GradientStopOrHint<CssAngle>[]) => IConicGradientBuilder;
/**
 * Function returning the ICrossFadeFunc interface representing the "older" `cross-fade` CSS
 * function invocation that accepts two images and a single percentage.
 *
 * @category Image
 */
export declare function crossFade(old: [Extended<CssImage>, Extended<CssImage>, Extended<CssPercent>]): ICrossFadeFunc;
/**
 * Function returning the ICrossFadeFunc interface representing the "newer" `cross-fade` CSS
 * function invocation that accepts multiple images - each with an optional percentage.
 *
 * @category Image
 */
export declare function crossFade(...images: (Extended<CssImage> | [Extended<CssImage>, Extended<CssPercent>])[]): ICrossFadeBuilder;
/**
 * Returns an IImageSetFunc object representing the `image-set()` CSS function.
 *
 * @param items One or more items specifying an image and optionally image type and resolution.
 * @returns
 *
 * @category Image
 */
export declare const imageSet: (...items: ImageSetItem[]) => IImageSetFunc;
/**
 * Registers a paint worklet with the given name, optional argument syntax and optional URL of
 * the worklet module. The worklet name should have been added to the [[IPaintWorklets]] interface
 * using the module augmentation technique. Although it is possible to use paint worklets without
 * adding them to the [[IPaintWorklets]] interface, this will prevent Mimcss from enforcing the
 * types of arguments when the [[paint]] function is invoked.
 * @param name Worklet name
 * @param syntax Tuple containing syntax definitions for worklet arguments.
 * @param url URL to the worklet module. If specified, the module will be automatically added.
 */
export declare const registerPaintWorklet: <K extends string | number>(name: K, syntax?: IPaintWorklets[K], url?: string | undefined) => Promise<void>;
/**
 * Returns the IPaintFunc object describing an invocation of the `paint()` CSS function.
 *
 * @param name Paint worklet name.
 * @param args Parameters to be passed to the paint worklet.
 *
 * @category Image
 *
 * @ts-expect-error: Erroneously reports TS2370 although the rest's type is an array (a tuple) */
export declare const paint: <K extends string | number>(name: K, ...args: MappedSyntaxTypes<IPaintWorklets[K]>) => IPaintFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `brightness()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: brightness(150%)
 *     bright = this.$class({ filter: css.brightness(150)})
 *
 *     // filter: brightness(50%)
 *     dim = this.$class({ filter: css.brightness(0.5)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const brightness: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `contrast()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: contrast(150%)
 *     highContrast = this.$class({ filter: css.contrast(150)})
 *
 *     // filter: contrast(50%)
 *     lowContrast = this.$class({ filter: css.contrast(0.5)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const contrast: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `grayscale()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: grayscale(100%)
 *     gray = this.$class({ filter: css.grayscale(100)})
 *
 *     // filter: grayscale(50%)
 *     halfColor = this.$class({ filter: css.grayscale(0.5)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const grayscale: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `invert()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: invert(100%)
 *     inverted = this.$class({ filter: css.invert(100)})
 *
 *     // filter: invert(75%)
 *     somewhatnverted = this.$class({ filter: css.invert(0.75)})
 *
 *     // filter: invert(50%)
 *     gray = this.$class({ filter: css.invert(0.5)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const invert: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `opacity()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: opacity(50%)
 *     halfTransparent = this.$class({ filter: css.opacity(0.5)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const opacity: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `saturate()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: saturate(150%)
 *     superSaturated = this.$class({ filter: css.saturate(150)})
 *
 *     // filter: saturate(50%)
 *     underSaturated = this.$class({ filter: css.saturate(0.5)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const saturate: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IPercentFilterFunc]] object representing the `sepia()` CSS function.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: sepia(100%)
 *     vintage = this.$class({ filter: css.sepia(100)})
 * }
 * ```
 *
 * @param p Value interpreted as percentage. Integer number is used as is while  floating point
 * numbers are multiplied by 100.
 * @returns The `IPercentFilterFunc` interface containing percentage value
 * @category Filter
 */
export declare const sepia: (p: Extended<CssPercent>) => IPercentFilterFunc;
/**
 * Returns an [[IBlurFunc]] object representing the `blur()` CSS function parameters.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: blur(0)
 *     sharp = this.$class({ filter: css.blur(0)})
 *
 *     // filter: blur(2px)
 *     blurred = this.$class({ filter: css.blur(2)})
 *
 *     // filter: blur(1.5em)
 *     superBlurred = this.$class({ filter: css.blur(1.5)})
 * }
 * ```
 *
 * @param r Radius of the blur.
 * @returns The `IBlurFunc` interface containing the blur radius
 * @category Filter
 */
export declare const blur: (r: Extended<CssLength>) => IBlurFunc;
/**
 * Returns an [[IDropShadowFunc]] object representing the `dropShadow()` CSS function parameters.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: drop-shadow(30px 10px 4px blue)
 *     blurredShadow = this.$class({ filter: css.dropShadow( 30, 10, "blue", 4)})
 *
 *     // filter: drop-shadow(2.5em -1.5em green)
 *     sharpShadow = this.$class({ filter: css.dropShadow( 2.5, -1.5, "green")})
 *
 *     // filter: drop-shadow(0 0 20px orange)
 *     haloShadow = this.$class({ filter: css.dropShadow( 0, 0, "orange", 20px)})
 * }
 * ```
 *
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow. If undefined, the color of the shadow is taken from the color
 * property.
 * @param blur Value of the shadow's blurring. If undefined, the shadow will be sharp (not blurred).
 * @returns The `IDropShadowFunc` interface containing the shadow parameters.
 *
 * @category Filter
 */
export declare const dropShadow: (x: Extended<CssLength>, y: Extended<CssLength>, color?: Extended<CssColor> | undefined, blur?: Extended<CssLength> | undefined) => IDropShadowFunc;
/**
 * Returns an [[IHueRotateFunc]] object representing the `hue-rotate()` CSS function parameters.
 *
 * **Example**
 *
 * ```tsx
 * class MyStyles extends css.StyleDefinition
 * {
 *     // filter: hue-rotate(90deg)
 *     toTheRight = this.$class({ filter: css.hueRotate(90)})
 *
 *     // filter: hue-rotate(-0.25turn)
 *     toTheLeft = this.$class({ filter: css.blur(-0.25)})
 * }
 * ```
 *
 * @param a The relative change in hue of the input sample.
 * @returns The `IHueRotateFunc` interface containing the hue rotation angle
 * @category Filter
 */
export declare const hueRotate: (a: Extended<CssAngle>) => IHueRotateFunc;
/**
 * Returns an IMatrixFunc object representing the `matrix()` CSS function.
 *
 * @category Transform
 */
export declare const matrix: (a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>, d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>) => IMatrixFunc;
/**
 * Returns an IMatrix3dFunc function representing the `matrix3d()` CSS function.
 *
 * @category Transform
 */
export declare const matrix3d: (a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>, a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>, a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>, a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>) => IMatrix3dFunc;
/**
 * Returns an IPerspectiveFunc function representing the `perspective()` CSS function.
 *
 * @category Transform
 */
export declare const perspective: (d: Extended<CssLength>) => IPerspectiveFunc;
/**
 * Returns an IRotateFunc function representing the `rotate()` CSS function.
 *
 * @category Transform
 */
export declare const rotate: (a: Extended<CssAngle>) => IRotateFunc;
/**
 * Returns an ITransformProxy function representing the `rotateX()` CSS function.
 *
 * @category Transform
 */
export declare const rotateX: (a: Extended<CssAngle>) => IRotateFunc;
/**
 * Returns an ITransformProxy function representing the `rotateY()` CSS function.
 *
 * @category Transform
 */
export declare const rotateY: (a: Extended<CssAngle>) => IRotateFunc;
/**
 * Returns an ITransformProxy function representing the `rotateZ()` CSS function.
 *
 * @category Transform
 */
export declare const rotateZ: (a: Extended<CssAngle>) => IRotateFunc;
/**
 * Returns an IRotate3dFunc function representing the `rotate3d()` CSS function.
 *
 * @category Transform
 */
export declare const rotate3d: (x: Extended<CssNumber>, y: Extended<CssNumber>, z: Extended<CssNumber>, a: Extended<CssAngle>) => IRotate3dFunc;
/**
 * Returns an IScaleFunc function representing the `scale()` CSS function.
 *
 * @category Transform
 */
export declare const scale: (sx: Extended<CssNumber>, sy?: Extended<CssNumber> | undefined) => IScaleFunc;
/**
 * Returns an IScale1dFunc function representing the `scaleX()` CSS function.
 *
 * @category Transform
 */
export declare const scaleX: (s: Extended<CssNumber>) => IScale1dFunc;
/**
 * Returns an IScale1dFunc function representing the `scaleY()` CSS function.
 *
 * @category Transform
 */
export declare const scaleY: (s: Extended<CssNumber>) => IScale1dFunc;
/**
 * Returns an IScale1dFunc function representing the `scaleZ()` CSS function.
 *
 * @category Transform
 */
export declare const scaleZ: (s: Extended<CssNumber>) => IScale1dFunc;
/**
 * Returns an IScale3dFunc function representing the `scale3d()` CSS function.
 *
 * @category Transform
 */
export declare const scale3d: (sx: Extended<CssNumber>, sy: Extended<CssNumber>, sz: Extended<CssNumber>) => IScale3dFunc;
/**
 * Returns an ISkewFunc function representing the `skew()` CSS function.
 *
 * @category Transform
 */
export declare const skew: (ax: Extended<CssAngle>, ay?: Extended<CssAngle> | undefined) => ISkewFunc;
/**
 * Returns an ISkew1dFunc function representing the `skewX()` CSS function.
 *
 * @category Transform
 */
export declare const skewX: (a: Extended<CssAngle>) => ISkew1dFunc;
/**
 * Returns an ISkew1dFunc function representing the `skewY()` CSS function.
 *
 * @category Transform
 */
export declare const skewY: (a: Extended<CssAngle>) => ISkew1dFunc;
/**
 * Returns an ITranslateFunc function representing the `translate()` CSS function.
 *
 * @category Transform
 */
export declare const translate: (x: Extended<CssLength>, y?: Extended<CssLength> | undefined) => ITranslateFunc;
/**
 * Returns an ITranslate1dFunc function representing the `translateX()` CSS function.
 *
 * @category Transform
 */
export declare const translateX: (d: Extended<CssLength>) => ITranslate1dFunc;
/**
 * Returns an ITranslate1dFunc function representing the `translateY()` CSS function.
 *
 * @category Transform
 */
export declare const translateY: (d: Extended<CssLength>) => ITranslate1dFunc;
/**
 * Returns an ITranslate1dFunc function representing the `translateZ()` CSS function.
 *
 * @category Transform
 */
export declare const translateZ: (d: Extended<CssLength>) => ITranslate1dFunc;
/**
 * Returns an ITranslate3dFunc function representing the `translate3d()` CSS function.
 *
 * @category Transform
 */
export declare const translate3d: (x: Extended<CssLength>, y: Extended<CssLength>, z: Extended<CssLength>) => ITranslate3dFunc;
/**
 * Returns an IInsetBuilder object representing the `inset()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: inset( css.percent(15))
 *
 * clipPath: inset( 10, 12, 14, 16).round( 8)
 * ```
 *
 * @category Basic Shape
 */
export declare const inset: (o1: Extended<CssLength>, o2?: Extended<CssLength> | undefined, o3?: Extended<CssLength> | undefined, o4?: Extended<CssLength> | undefined) => IInsetBuilder;
/**
 * Returns an ICircleBuilder object representing the `circle()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: circle( 100)
 *
 * clipPath: circle( 100).at( ["center", css.percent(30)])
 * ```
 *
 * @category Basic Shape
 */
export declare const circle: (r?: ShapeRadius | undefined) => ICircleBuilder;
/**
 * Returns an IEllipseBuilder object representing the `ellipse()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: ellipse().at( ["top", "50%"])
 * ```
 *
 * @category Basic Shape
 */
export declare function ellipse(): IEllipseBuilder;
/**
 * Returns an IEllipseBuilder object representing the `ellipse()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: ellipse( 100, 50)
 *
 * clipPath: ellipse( 100, 50).at( ["center", css.percent(30)])
 * ```
 *
 * @category Basic Shape
 */
export declare function ellipse(rx: ShapeRadius, ry: ShapeRadius): IEllipseBuilder;
/**
 * Returns an IPolygon object representing the `polygon()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: css.polygon( [0,100], [50,0], [100,100])
 *
 * clipPath: css.polygon( [0,100], [50,0], [100,100]).fill( "evenodd")
 * ```
 *
 * @category Basic Shape
 */
export declare const polygon: (...points: CssPoint[]) => IPolygonBuilder;
/**
 * Returns an IPathBuilder object that allows building a CSS path.
 *
 * @category Basic Shape
 */
export declare const path: (fillRule?: FillRule | undefined) => IPathBuilder;
/**
 * Returns an IRay object representing invocation of the `ray()` CSS function.
 *
 * @category Basic Shape
 */
export declare const ray: (angle: Extended<CssAngle>, size?: Extended<CssLength | ExtentKeyword> | undefined, contain?: boolean | undefined) => IRayFunc;
/**
* Returns an IMinMax function representing the `minmax()` CSS function.
*
* @category Grid
*/
export declare const minmax: (min: GridTrackSize, max: GridTrackSize) => IMinMaxFunc;
/**
 * Returns an IRepeat function representing the `repeat()` CSS function.
 *
 * @category Grid
 */
export declare const repeat: (count: Extended<CssNumber> | "auto-fill" | "auto-fit", ...tracks: GridTrack[]) => IRepeatFunc;
/**
 * Returns an IGridSpanFunc function representing the `span` expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 *
 * @category Grid
 */
export declare const span: (p1: Extended<GridLineCountOrName>, p2?: Extended<GridLineCountOrName> | undefined) => IGridSpanFunc;
//# sourceMappingURL=ShapeAPI.d.ts.map