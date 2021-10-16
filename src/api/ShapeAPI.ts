import {Extended, IStringProxy} from "./CoreTypes";
import {BorderRadius, CssAngle, CssLength, CssNumber, CssPercent, CssPoint, CssPosition} from "./NumericTypes";
import {CssColor} from "./ColorTypes";
import {
    CrossFadeParam, GradientStopOrHint, LinearGradientAngle, ShapeRadius, IImageProxy, IMinMaxFunc,
    IPathBuilder, IRepeatFunc, IGridSpanFunc, IUrlFunc, TimingFunctionJumpTerm, ICursorFunc,
    ExtentKeyword, AttrTypeKeyword, AttrUnitKeyword, FillRule, ICircleBuilder, IEllipseBuilder,
    IInsetBuilder, IPolygonBuilder, PathCommand, PathCommandParam, IRayFunc, IStepsFunc, ICubicBezierFunc,
    PercentFilterNames, IPercentFilterFunc, IBlurFunc, IDropShadowFunc, IHueRotateFunc, IMatrixFunc,
    IMatrix3dFunc, IPerspectiveFunc, IRotateFunc, IRotate3dFunc, IScale1dFunc, IScaleFunc, IScale3dFunc,
    ISkewFunc, ISkew1dFunc, ITranslate1dFunc, ITranslate3dFunc, ITranslateFunc, ILinearGradientBuilder,
    ILinearGradientFunc, IRadialGradientBuilder, IRadialGradientFunc, IConicGradientBuilder,
    IConicGradientFunc, IGradientBuilder, IGradientFunc,
} from "./ShapeTypes";
import {ICounterRule, IIDRule} from "./RuleTypes";
import {GridLineCountOrName, GridTrack, GridTrackSize, ListStyleType_StyleType} from "./StyleTypes";
import {AngleMath, LengthMath, NumericMath} from "../impl/NumericImpl";
import {f2s, mv2s, WKF, v2s, wkf, a2s, fdo} from "../impl/Utils";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Images and gradients.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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
export function linearGradient(...stops: GradientStopOrHint<CssLength>[]): ILinearGradientBuilder
{
    return new LinearGradient( stops);
}

fdo["linear-gradient"] = (v: ILinearGradientFunc) => f2s( gradientNameToString(v), [
    linearGradientAngleToString(v.angle),
    gradientStopsOrHintsToString( v.stops, LengthMath)
]);



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
export function radialGradient(...stops: GradientStopOrHint<CssLength>[]): IRadialGradientBuilder
{
    return new RadialGradient( stops);
}

fdo["radial-gradient"] = (v: IRadialGradientFunc) => f2s( gradientNameToString(v), [
    mv2s([ v.shape, [v.size, WKF.MultiLengthWithSpace], [v.pos, WKF.AtPosition] ]),
    gradientStopsOrHintsToString( v.stops, LengthMath)
]);



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
export function conicGradient(...stops: GradientStopOrHint<CssAngle>[]): IConicGradientBuilder
{
    return new ConicGradient( stops);
}

fdo["conic-gradient"] = (v: IConicGradientFunc) => f2s( gradientNameToString(v), [
    mv2s([ v.angle == null ? undefined : "from " + AngleMath.v2s(v.angle), [v.pos, WKF.AtPosition] ]),
    gradientStopsOrHintsToString( v.stops, AngleMath)
]);



/**
 * Base class for gradient implementation
 */
abstract class Gradient<T extends (CssLength | CssAngle)> implements IGradientBuilder<T>
{
    fn: "linear-gradient" | "radial-gradient" | "conic-gradient";

    repeat?: boolean;
    stops: GradientStopOrHint<T>[];

    constructor( stops: GradientStopOrHint<T>[])
    {
        this.stops = stops ?? [];
    }

    public repeating( flag?: boolean): this
    {
        this.repeat = flag == null ? true : flag; return this;
    }

    public add( ...stopsOrHints: GradientStopOrHint<T>[]): this
    {
        this.stops.push( ...stopsOrHints);
        return this;
    }
}



/**
 * Implements functionality of linear gradients
 */
class LinearGradient extends Gradient<CssLength> implements ILinearGradientBuilder
{
    fn: "linear-gradient" = "linear-gradient";

    angle?: LinearGradientAngle;

    public to( angle?: LinearGradientAngle): this { this.angle = angle; return this; }
}



/**
 * Implements functionality of radial gradients
 */
class RadialGradient extends Gradient<CssLength> implements IRadialGradientBuilder
{
    fn: "radial-gradient" = "radial-gradient";

    shape?: "circle" | "ellipse";
	size?: Extended<CssLength> | Extended<ExtentKeyword> | [Extended<CssLength>, Extended<CssLength>];
    pos?: Extended<CssPosition>;

	public circle( sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>): this
    {
        this.shape = "circle";
        this.size = sizeOrExtent;
        return this;
    }

	public ellipse( ...params: any[]): this
    {
        this.shape = "ellipse";
        if (params.length === 1)
            this.size = params[0] as Extended<ExtentKeyword>;
        else if (params.length === 2)
            this.size = [params[0] as Extended<CssLength>, params[1] as Extended<CssLength>];
        else
            this.size = undefined;
        return this;
    }


	public extent( extent: Extended<ExtentKeyword>): this { this.size = extent; return this; }
	public at( pos: Extended<CssPosition>): this { this.pos = pos; return this; }
}



/**
 * Implements functionality of conic gradients
 */
class ConicGradient extends Gradient<CssAngle> implements IConicGradientBuilder
{
    fn: "conic-gradient" = "conic-gradient";

    angle?: Extended<CssAngle>;
    pos?: Extended<CssPosition>;

	public from( angle?: Extended<CssAngle>): this { this.angle = angle; return this; }
	public at( pos?: Extended<CssPosition>): this { this.pos = pos; return this; }
}



function gradientNameToString( val: IGradientFunc<any>): string
{
    return `${val.repeat ? "repeating-" : ""}${val.fn}`;
}

function gradientStopsOrHintsToString( val: GradientStopOrHint<any>[], math: NumericMath): string
{
    return !val ? "" : val.map( v => gradientStopOrHintToString( v, math)).join(",");
}

function gradientStopOrHintToString( val: GradientStopOrHint<any>, math: NumericMath): string
{
    return v2s( val, {
        num: WKF.Color,
        arr: v => {
            if (v.length === 0)
                return "";
            else if (v.length === 1)
                return math.v2s( v[0]);
            else
                return mv2s( [[v[0], WKF.Color], math.v2s( v[1]), math.v2s( v[2])]);
        }
    });
}

/**
 * Converts the given linear gradient angle to string.
 */
function linearGradientAngleToString( angle: LinearGradientAngle): string
{
    return v2s( angle, {
        num: AngleMath.n2s,
        str: v => "to " + v
    });
}





/**
 * Returns an ImageProxy function representing the `cross-fade()` CSS function.
 *
 * @category Image
 */
export function crossFade( ...args: CrossFadeParam[]): IImageProxy
{
    return () => `cross-fade(${a2s( args, v => mv2s( [v[0], [v[1], [WKF.Percent]]], ","))})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IFilterProxy function representing one of the filter CSS function.
 */
function filterPercent( fn: PercentFilterNames, p: Extended<CssPercent>): IPercentFilterFunc
{
    return { fn, p };
}



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
export function brightness( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "brightness", p);
}



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
export function contrast( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "contrast", p);
}



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
export function grayscale( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "grayscale", p);
}



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
export function invert( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "invert", p);
}



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
export function opacity( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "opacity", p);
}



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
export function saturate( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "saturate", p);
}



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
export function sepia( p: Extended<CssPercent>): IPercentFilterFunc
{
    return filterPercent( "sepia", p);
}

fdo.brightness = fdo.contrast = fdo.grayscale = fdo.invert = fdo.opacity = fdo.saturate =
    fdo.sepia = WKF.Percent;



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
export function blur( r: Extended<CssLength>): IBlurFunc
{
    return { fn: "blur", r };
}

fdo.blur = WKF.Length;



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
export function dropShadow( x: Extended<CssLength>, y: Extended<CssLength>,
    color?: Extended<CssColor>, blur?: Extended<CssLength>): IDropShadowFunc
{
    return { fn: "drop-shadow", x, y, color, blur };
}

fdo["drop-shadow"] = {
    p: [ "x", "y", ["color", WKF.Color], "blur" ],
    do: WKF.Length,
    s: " "
}



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
export function hueRotate( a: Extended<CssAngle>): IHueRotateFunc
{
    return { fn: "hue-rotate", a };
}

fdo["hue-rotate"] = WKF.Angle



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Transforms
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IMatrixFunc object representing the `matrix()` CSS function.
 *
 * @category Transform
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): IMatrixFunc
{
    return { fn: "matrix", a, b, c, d, tx, ty };
}

fdo.matrix = [ "a", "b", "c", "d", "tx", "ty" ];



/**
 * Returns an IMatrix3dFunc function representing the `matrix3d()` CSS function.
 *
 * @category Transform
 */
export function matrix3d(
		a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
		a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
		a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
		a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>,
	): IMatrix3dFunc
{
    return { fn: "matrix3d", a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4 };
}

fdo.matrix = [ "a1", "b1", "c1", "d1", "a2", "b2", "c2", "d2", "a3", "b3", "c3", "d3", "a4", "b4", "c4", "d4" ];



/**
 * Returns an IPerspectiveFunc function representing the `perspective()` CSS function.
 *
 * @category Transform
 */
export function perspective( d: Extended<CssLength>): IPerspectiveFunc
{
    return { fn: "perspective", d };
}

fdo.perspective = WKF.Length;



/**
 * Returns an IRotateFunc function representing the `rotate()` CSS function.
 *
 * @category Transform
 */
export function rotate( a: Extended<CssAngle>): IRotateFunc
{
    return { fn: "rotate", a };
}

/**
 * Returns an ITransformProxy function representing the `rotateX()` CSS function.
 *
 * @category Transform
 */
export function rotateX( a: Extended<CssAngle>): IRotateFunc
{
    return { fn: "rotateX", a };
}

/**
 * Returns an ITransformProxy function representing the `rotateY()` CSS function.
 *
 * @category Transform
 */
export function rotateY( a: Extended<CssAngle>): IRotateFunc
{
    return { fn: "rotateY", a };
}

/**
 * Returns an ITransformProxy function representing the `rotateZ()` CSS function.
 *
 * @category Transform
 */
export function rotateZ( a: Extended<CssAngle>): IRotateFunc
{
    return { fn: "rotateZ", a };
}

fdo.rotate = fdo.rotateX = fdo.rotateY = fdo.rotateZ = WKF.Angle;



/**
 * Returns an IRotate3dFunc function representing the `rotate3d()` CSS function.
 *
 * @category Transform
 */
export function rotate3d( x: Extended<CssNumber>, y: Extended<CssNumber>,
    z: Extended<CssNumber>, a: Extended<CssAngle>): IRotate3dFunc
{
    return { fn: "rotate3d", x, y, z, a };
}

fdo.rotate3d = [ "x", "y", "z", ["a", WKF.Angle] ];



/**
 * Returns an IScaleFunc function representing the `scale()` CSS function.
 *
 * @category Transform
 */
export function scale( sx: Extended<CssNumber>, sy?: Extended<CssNumber>): IScaleFunc
{
    return { fn: "scale", sx, sy };
}

fdo.scale = ["sx", "sy"]

/**
 * Returns an IScale1dFunc function representing the `scaleX()` CSS function.
 *
 * @category Transform
 */
export function scaleX( s: Extended<CssNumber>): IScale1dFunc
{
    return { fn: "scaleX", s };
}

/**
 * Returns an IScale1dFunc function representing the `scaleY()` CSS function.
 *
 * @category Transform
 */
export function scaleY( s: Extended<CssNumber>): IScale1dFunc
{
    return { fn: "scaleY", s };
}

/**
 * Returns an IScale1dFunc function representing the `scaleZ()` CSS function.
 *
 * @category Transform
 */
export function scaleZ( s: Extended<CssNumber>): IScale1dFunc
{
    return { fn: "scaleZ", s };
}

/**
 * Returns an IScale3dFunc function representing the `scale3d()` CSS function.
 *
 * @category Transform
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
    sz: Extended<CssNumber>): IScale3dFunc
{
    return { fn: "scale3d", sx, sy, sz };
}

fdo.scale3d = ["sx", "sy", "sz"]



/**
 * Returns an ISkewFunc function representing the `skew()` CSS function.
 *
 * @category Transform
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ISkewFunc
{
    return { fn: "skew", ax, ay };
}

fdo.scale3d = ["ax", "ay"]

/**
 * Returns an ISkew1dFunc function representing the `skewX()` CSS function.
 *
 * @category Transform
 */
export function skewX( a: Extended<CssAngle>): ISkew1dFunc
{
    return { fn: "skewX", a };
}

/**
 * Returns an ISkew1dFunc function representing the `skewY()` CSS function.
 *
 * @category Transform
 */
export function skewY( a: Extended<CssAngle>): ISkew1dFunc
{
    return { fn: "skewY", a };
}

fdo.scew = fdo.skewX = fdo.skewY = WKF.Angle;



/**
 * Returns an ITranslateFunc function representing the `translate()` CSS function.
 *
 * @category Transform
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): ITranslateFunc
{
    return { fn: "translate", x, y };
}

fdo.translate = {
    p: ["x", "y"],
    do: WKF.Length
}

/**
 * Returns an ITranslate1dFunc function representing the `translateX()` CSS function.
 *
 * @category Transform
 */
export function translateX( d: Extended<CssLength>): ITranslate1dFunc
{
    return { fn: "translateX", d };
}

/**
 * Returns an ITranslate1dFunc function representing the `translateY()` CSS function.
 *
 * @category Transform
 */
export function translateY( d: Extended<CssLength>): ITranslate1dFunc
{
    return { fn: "translateY", d };
}

/**
 * Returns an ITranslate1dFunc function representing the `translateZ()` CSS function.
 *
 * @category Transform
 */
export function translateZ( d: Extended<CssLength>): ITranslate1dFunc
{
    return { fn: "translateZ", d };
}

fdo.translateX = fdo.translateY = fdo.translateZ = WKF.Length;

/**
 * Returns an ITranslate3dFunc function representing the `translate3d()` CSS function.
 *
 * @category Transform
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): ITranslate3dFunc
{
    return { fn: "translate3d", x, y, z };
}

fdo.translate3d = {
    p: ["x", "y", "z"],
    do: WKF.Length
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shapes
//
///////////////////////////////////////////////////////////////////////////////////////////////

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
export function inset( o1: Extended<CssLength>, o2?: Extended<CssLength>,
    o3?: Extended<CssLength>, o4?: Extended<CssLength>): IInsetBuilder
{
    return {
        fn: "inset", o1, o2, o3, o4,
        round( r: Extended<BorderRadius>) { this.r = r; return this; }
    };
}

fdo.inset = {
    p: [ "o1", "o2", "o3", "o4", ["r", v => "round " + wkf[WKF.BorderRadius](v)] ],
    do: WKF.Length,
    s: " "
}



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
export function circle( r?: ShapeRadius): ICircleBuilder
{
    return {
        fn: "circle", r,
        at( pos: Extended<CssPosition>) { this.pos = pos; return this; }
    }
}

fdo.circle = {
    p: [ ["r", WKF.Length], ["pos", WKF.AtPosition] ],
    s: " "
}



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
export function ellipse(): IEllipseBuilder;

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
export function ellipse( rx: ShapeRadius, ry: ShapeRadius): IEllipseBuilder;

// implementation
export function ellipse(): IEllipseBuilder
{
    return {
        fn: "ellipse", rx: arguments[0], ry: arguments[1],
        at( pos: Extended<CssPosition>) { this.pos = pos; return this; }
    }
}

fdo.ellipse = {
    p: [ "rx", "ry", ["pos", WKF.AtPosition] ],
    do: WKF.Length,
    s: " "
}


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
export function polygon( ...points: CssPoint[]): IPolygonBuilder
{
    return {
        fn: "polygon", points: points ?? [],
        add( ...points: CssPoint[]) { this.points.push( ...points); return this; },
        fill( rule: FillRule) { this.rule = rule; return this; }
    };
}

fdo.polygon = [
    "rule",
    ["points", { item: WKF.MultiLengthWithSpace, sep: ","}],
]



/**
 * Returns an IPathBuilder object that allows building a CSS path.
 *
 * @category Basic Shape
 */
export function path( fillRule?: FillRule): IPathBuilder
{
    return new PathBuilder( fillRule);
}



/**
 * The IPathBuilder interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function.
 */
class PathBuilder implements IPathBuilder
{
    fn: "path" = "path";
    rule?: FillRule;
    items: PathCommand[] = [];

    public constructor( rule?: FillRule)
    {
        this.rule = rule;
    }

    // Adds the given command and parameters to the path.
    public add( command: string, params?: PathCommandParam[]): this
    {
        this.items.push( [command, params]);
        return this;
    }

    public M( ...params: [number,number][]): this { return this.add( "M", params); }
    public m( ...params: [number,number][]): this { return this.add( "m", params); }

    public L( ...params: [number,number][]): this { return this.add( "L", params); }
    public l( ...params: [number,number][]): this { return this.add( "l", params); }

    public H( ...params: number[]): this { return this.add( "H", params); }
    public h( ...params: number[]): this { return this.add( "h", params); }

    public V( ...params: number[]): this { return this.add( "V", params); }
    public v( ...params: number[]): this { return this.add( "v", params); }

    public C( ...params: [number,number,number,number,number,number][]): this { return this.add( "C", params); }
    public c( ...params: [number,number,number,number,number,number][]): this { return this.add( "c", params); }

    public S( ...params: [number,number,number,number][]): this { return this.add( "S", params); }
    public s( ...params: [number,number,number,number][]): this { return this.add( "s", params); }

    public Q( ...params: [number,number,number,number][]): this { return this.add( "Q", params); }
    public q( ...params: [number,number,number,number][]): this { return this.add( "q", params); }

    public T( ...params: [number,number][]): this { return this.add( "T", params); }
    public t( ...params: [number,number][]): this { return this.add( "t", params); }

    public A( ...params: [number,number,number,0|1,0|1,number,number][]): this { return this.add( "A", params); }
    public a( ...params: [number,number,number,0|1,0|1,number,number][]): this { return this.add( "a", params); }

    public z(): this { return this.add( "z"); }
}

fdo.path = [ "rule", ["items", (v: PathCommand[]) => `"${a2s(v)}"`] ]



/**
 * Returns an IRay object representing invocation of the `ray()` CSS function.
 *
 * @category Basic Shape
 */
 export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
    contain?: boolean): IRayFunc
{
    return { fn: "ray", angle, size, contain }
}

fdo.ray = {
    p: [
        ["angle", WKF.Angle],
        ["size", WKF.Length],
        ["contain", (v: boolean) => (v ? "contain" : "")]
    ],
    s: " "
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Grids
//
///////////////////////////////////////////////////////////////////////////////////////////////

 /**
 * Returns an IMinMax function representing the `minmax()` CSS function.
 *
 * @category Grid
 */
export function minmax( min: GridTrackSize, max: GridTrackSize): IMinMaxFunc
{
    return { fn: "minmax", min, max };
}

fdo.minmax = [ ["min", WKF.Length], ["max", WKF.Length] ]



/**
 * Returns an IRepeat function representing the `repeat()` CSS function.
 *
 * @category Grid
 */
export function repeat( count: Extended<CssNumber> | "auto-fill" | "auto-fit",
    ...tracks: GridTrack[]): IRepeatFunc
{
    return { fn: "repeat", count, tracks }
}

fdo.repeat = [ "count", ["tracks", { item: WKF.GridTrack }] ]



/**
 * Returns an IGridSpanFunc function representing the `span` expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 *
 * @category Grid
 */
export function span( p1: Extended<GridLineCountOrName>, p2?: Extended<GridLineCountOrName>): IGridSpanFunc
{
    return { fn: "span", p1, p2 }
}

fdo.span = (v: IGridSpanFunc) => mv2s( ["span", v.p1, v.p2])



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Counters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a representation of the CSS `counter()` function with additional optional strings
 * added after and/or before the counter.
 *
 * @category Counter
 */
 export function counter( counterObj: Extended<ICounterRule | string>,
	style?: Extended<ListStyleType_StyleType>): IStringProxy
{
    return () => f2s( "counter", [counterObj, style]);
}



/**
 * Returns a representation of the CSS `counters()` function with the given separator string
 * and additional optional strings added after and/or before the counter.
 *
 * @category Counter
 */
export function counters( counterObj: Extended<ICounterRule | string>,
	sep: Extended<string>, style?: Extended<ListStyleType_StyleType>): IStringProxy
{
    return () => f2s( "counters", [counterObj, `"${v2s(sep) || "."}"`, style]);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Miscellaneous functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the CSS `url()` function. The string parameter
 * will be wrapped in a `url()` invocation. The function can also accept the IIDRule object to
 * create url(#element) invocation, which is often used to address SVG elements by their IDs.
 *
 * @category Miscellaneous
 */
export function url( p: Extended<string | IIDRule>): IUrlFunc
{
    return { fn: "url", p };
}



/**
 * Returns a function representing the CSS `url()` function.
 *
 * @category Miscellaneous
 */
export function cursor( p: Extended<string | IIDRule>): ICursorFunc;

/**
 * Returns a function representing the CSS `url()` function followed by two numbers
 * indicating the cursor hotspot.
 *
 * @category Miscellaneous
 */
export function cursor( p: Extended<string | IIDRule>, x: number, y: number): ICursorFunc;

// Implementation
export function cursor( url: Extended<string | IIDRule>, x?: number, y?: number): ICursorFunc
{
    return { fn: "cursor", url, x, y };
}

fdo.cursor = (v: ICursorFunc) => mv2s( [url(v.url), v.x, v.y])



/**
 * Returns a function representing the `attr()` CSS function. It returns IStringProxy
 * and theoretically can be used in any style property; however, its use by browsers is currently
 * limited to the `content` property. Also no browser currently support type, units or fallback
 * values.
 *
 * @category Miscellaneous
 */
 export function attr( attrName: Extended<string>, typeOrUnit?: Extended<AttrTypeKeyword | AttrUnitKeyword>,
	fallback?: Extended<string>): IStringProxy
{
    return () => `attr(${mv2s( [mv2s( [attrName, typeOrUnit]), fallback], ",")})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Animation and transition timing functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing an invocation of the CSS `steps()` function.
 *
 * @category Transition and Animation
 */
export function steps( n: Extended<number>, j?: TimingFunctionJumpTerm): IStepsFunc
{
    return  { fn: "steps", n, j };
}

fdo.steps = ["n", "j"]



/**
 * Returns a function representing an invocation of the CSS `cubic-bezier()` function.
 *
 * @category Transition and Animation
 */
export function cubicBezier( n1: Extended<number>, n2: Extended<number>, n3: Extended<number>,
    n4: Extended<number>): ICubicBezierFunc
{
    return { fn: "cubic-bezier", n1, n2, n3, n4 };
}

fdo["cubic-bezier"] = { p: ["n1", "n2", "n3", "n4"] }



