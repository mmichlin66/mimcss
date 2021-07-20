/**
 * This module contains definitions of functions and classes used to define CSS functions.
 * @module
 */



import {Extended, IStringProxy} from "./CoreTypes";
import {CssAngle, CssLength, CssNumber, CssPercent, CssPoint, CssPosition} from "./NumericTypes";
import {CssColor} from "./ColorTypes";
import {
    CrossFadeParam, GradientStopOrHint, ICircle, IConicGradient, IEllipse,
    LinearGradientAngle, ShapeRadius, IImageProxy, IInset, IGradient, ILinearGradient, IMinMaxProxy,
    IPathBuilder, IPolygon, IRadialGradient, IRepeatProxy, ISpanProxy, IFilterProxy,
    ITransformProxy, IUrlProxy, IRayProxy, TimingFunctionJumpTerm, ITimingFunctionProxy, ICursorProxy,
    ExtentKeyword, AttrTypeKeyword, AttrUnitKeyword, BorderRadius, FillRule,
} from "./ShapeTypes";
import {ICounterRule, IIDRule} from "./RuleTypes";
import {GridLineCountOrName, GridTrack, GridTrackSize, ListStyleType_StyleType} from "./StyleTypes";
import {AngleMath, LengthMath, NumericMath} from "../impl/NumericImpl";
import {f2s, mv2s, WKF, v2s, wkf, a2s} from "../impl/Utils";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Images and gradients.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function returning the ILinearGradient interface representing the `linear-gradient` CSS functions.
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
 * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
 *
 * @category Image
 */
export function linearGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
    return new LinearGradient( stopsOrHints);
}



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
 * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
 *
 * @category Image
 */
export function radialGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
    return new RadialGradient( stopsOrHints);
}



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
 * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
 *
 * @category Image
 */
export function conicGradient(...stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
    return new ConicGradient( stopsOrHints);
}



/**
 * Base class for gradient implementation
 */
abstract class Gradient<T extends (CssLength | CssAngle)> implements IGradient<T>
{
    /** Number-based Math class to convert numeric values in stops and hints to strings */
    protected math: NumericMath<T>;

    /** Name of the gradient */
    protected name: string;

    /** Name of the gradient */
    protected isRepeating?: boolean;

    /** Array of stops and hints */
    protected stopsOrHints: GradientStopOrHint<T>[];

    constructor( math: NumericMath<T>, name: string,
        stopsOrHints: GradientStopOrHint<T>[])
    {
        this.math = math;
        this.name = name;
        this.stopsOrHints = stopsOrHints ?? [];
    }

    /** Flag indicating whether the gradient is repeating; the default value is true. */
    public repeating( flag?: boolean): this { this.isRepeating = flag == null ? true : flag; return this; }

    /**
     * Adds stops or hints to the gradient definition.
     * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
     * the gradient definition.
     */
    public add( ...stopsOrHints: GradientStopOrHint<T>[]): this
    {
        this.stopsOrHints.push( ...stopsOrHints);
        return this;
    }

    // Converts object data to the CSS conic function - this is called when the object is assigned
    // to a CSS property
    public toString(): string
    {
        return f2s( `${this.isRepeating ? "repeating-" : ""}${this.name}-gradient`, [
            this.options2s(),
            [this.stopsOrHints, (v: GradientStopOrHint<T>[]) => gradientStopsOrHintsToString( v, this.math)]
        ]);
    }

    // Returns optional parameters that should precede stops and hints in the gradient function
    protected abstract options2s(): string;
}



/**
 * Implements functionality of linear gradients
 */
class LinearGradient extends Gradient<CssLength> implements ILinearGradient
{
    protected angle?: LinearGradientAngle;

    constructor( stopsOrHints: GradientStopOrHint<CssLength>[])
    {
        super( LengthMath, "linear", stopsOrHints);
    }

	public to( angle?: LinearGradientAngle): this { this.angle = angle; return this; }

    // Returns optional parameters that should precede stops and hints in the gradient function
    protected options2s(): string
    {
        return mv2s([[this.angle, linearGradientAngleToString]]);
    }
}



/**
 * Implements functionality of radial gradients
 */
class RadialGradient extends Gradient<CssLength> implements IRadialGradient
{
    protected shape?: string;
	protected sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword> | [Extended<CssLength>, Extended<CssLength>];
    protected pos?: Extended<CssPosition>;

    constructor( stopsOrHints: GradientStopOrHint<CssLength>[])
    {
        super( LengthMath, "radial", stopsOrHints);
    }

	public circle(): this;
	public circle( size: Extended<CssLength>): this;
	public circle( extent?: Extended<ExtentKeyword>): this;
	public circle( sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>): this
    {
        this.shape = "circle";
        this.sizeOrExtent = sizeOrExtent;
        return this;
    }

	public ellipse(): this;
	public ellipse( rx: Extended<CssLength>, ry: Extended<CssLength>): this;
	public ellipse( extent: Extended<ExtentKeyword>): this;
	public ellipse( ...params: any[]): this
    {
        this.shape = "ellipse";
        if (params.length === 1)
            this.sizeOrExtent = params[0] as Extended<ExtentKeyword>;
        else if (params.length === 2)
            this.sizeOrExtent = [params[0] as Extended<CssLength>, params[1] as Extended<CssLength>];
        else
            this.sizeOrExtent = undefined;
        return this;
    }


	public extent( extent: Extended<ExtentKeyword>): this
    {
        this.sizeOrExtent = extent;
        return this;
    }

	public at( pos: Extended<CssPosition>): this
    {
        this.pos = pos;
        return this;
    }

    // Returns optional parameters that should precede stops and hints in the gradient function
    protected options2s(): string
    {
        return mv2s([
            this.shape,
            [this.sizeOrExtent, WKF.MultiLengthWithSpace],
            [this.pos, WKF.AtPosition],
        ]);
    }
}



/**
 * Implements functionality of conic gradients
 */
class ConicGradient extends Gradient<CssAngle> implements IConicGradient
{
    protected angle?: Extended<CssAngle>;
    protected pos?: Extended<CssPosition>;

    constructor( stopsOrHints: GradientStopOrHint<CssAngle>[])
    {
        super( AngleMath, "conic", stopsOrHints);
    }

	public from( angle?: Extended<CssAngle>): this { this.angle = angle; return this; }

	public at( pos?: Extended<CssPosition>): this { this.pos = pos; return this; }

    // Returns optional parameters that should precede stops and hints in the gradient function
    protected options2s(): string
    {
        return mv2s([
            [this.angle, this.angle == null ? undefined : (v: Extended<CssAngle>) => "from " + AngleMath.v2s(v)],
            [this.pos, WKF.AtPosition],
        ]);
    }
}



function gradientStopsOrHintsToString( val: GradientStopOrHint<any>[], math: NumericMath): string
{
    return val.map( v => gradientStopOrHintToString( v, math)).join(",");
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
            {
                // let secondStop = v.length > 2 ? math.v2s( v[2]) : "";
                // return mv2s( [[v[0], WKF.Color], math.v2s( v[1]), secondStop]);
                return mv2s( [[v[0], WKF.Color], math.v2s( v[1]), math.v2s( v[2])]);
            }
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
 * Returns an IFilterProxy function representing the `brightness()` CSS function.
 */
function filterPercent( name: string, p: Extended<CssPercent>): IFilterProxy
{
    return () => f2s( name, [[p, WKF.Percent]]);
}



/**
 * Returns an IFilterProxy function representing the `brightness()` CSS function.
 *
 * @category Filter
 */
export function brightness( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "brightness", p);
}



/**
 * Returns an IFilterProxy function representing the `contrast()` CSS function.
 *
 * @category Filter
 */
export function contrast( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "contrast", p);
}



/**
 * Returns an IFilterProxy function representing the `grayscale()` CSS function.
 *
 * @category Filter
 */
export function grayscale( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "grayscale", p);
}



/**
 * Returns an IFilterProxy function representing the `invert()` CSS function.
 *
 * @category Filter
 */
export function invert( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "invert", p);
}



/**
 * Returns an IFilterProxy function representing the `opacity()` CSS function.
 *
 * @category Filter
 */
export function opacity( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "opacity", p);
}



/**
 * Returns an IFilterProxy function representing the `saturate()` CSS function.
 *
 * @category Filter
 */
export function saturate( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "saturate", p);
}



/**
 * Returns an IFilterProxy function representing the `sepia()` CSS function.
 *
 * @category Filter
 */
export function sepia( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "sepia", p);
}



/**
 * Returns an IFilterProxy function representing the `blur()` CSS function.
 *
 * @category Filter
 */
export function blur( r: Extended<CssLength>): IFilterProxy
{
    return () => f2s( "", [[r, WKF.Length]]);
}



/**
 * Returns an IFilterProxy function representing the `dropShadow()` CSS function.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 *
 * @category Filter
 */
export function dropShadow( x: Extended<CssLength>, y: Extended<CssLength>,
    color?: Extended<CssColor>, blur?: Extended<CssLength>): IFilterProxy
{
    return () => f2s( "drop-shadow", [[x, WKF.Length], [y, WKF.Length],
        [color, WKF.Color], [blur, WKF.Length]]);
}



/**
 * Returns an IFilterProxy function representing the `hue-rotate()` CSS function.
 *
 * @category Filter
 */
export function hueRotate( a: Extended<CssAngle>): IFilterProxy
{
    return () => f2s( "", [[a, WKF.Angle]]);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Transforms
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an ITransformProxy function representing the `matrix()` CSS function.
 *
 * @category Transform
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( "matrix", [a, b, c, d, tx, ty]);
}



/**
 * Returns an ITransformProxy function representing the `matrix3d()` CSS function.
 *
 * @category Transform
 */
export function matrix3d(
		a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
		a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
		a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
		a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>,
	): ITransformProxy
{
    return () => f2s( "matrix", [a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4]);
}



/**
 * Returns an ITransformProxy function representing the `perspective()` CSS function.
 *
 * @category Transform
 */
export function perspective( d: Extended<CssLength>): ITransformProxy
{
    return () => f2s( "perspective", [[d, WKF.Length]]);
}



/**
 * Returns an ITransformProxy function representing the `rotate()` CSS function.
 */
function rotate1d( axis: string, a: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( `rotate${axis}`, [[a, WKF.Angle]]);
}

/**
 * Returns an ITransformProxy function representing the `rotate()` CSS function.
 *
 * @category Transform
 */
export function rotate( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "", a);
}

/**
 * Returns an ITransformProxy function representing the `rotateX()` CSS function.
 *
 * @category Transform
 */
export function rotateX( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "X", a);
}

/**
 * Returns an ITransformProxy function representing the `rotateY()` CSS function.
 *
 * @category Transform
 */
export function rotateY( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "Y", a);
}

/**
 * Returns an ITransformProxy function representing the `rotateZ()` CSS function.
 *
 * @category Transform
 */
export function rotateZ( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "Z", a);
}

/**
 * Returns an ITransformProxy function representing the `rotate3d()` CSS function.
 *
 * @category Transform
 */
export function rotate3d( x: Extended<CssNumber>, y: Extended<CssNumber>,
    z: Extended<CssNumber>, a: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( "rotate3d", [x, y, z, [a, WKF.Angle]]);
}



/**
 * Returns an ITransformProxy function representing the `scale()` CSS function.
 *
 * @category Transform
 */
export function scale( sx: Extended<CssNumber>, sy?: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( "scale", [sx, sy]);
}

/**
 * Returns an ITransformProxy function representing the `scaleX()` CSS function.
 */
function scale1d( axis: string, s: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( `scale${axis}`, [s]);
}

/**
 * Returns an ITransformProxy function representing the `scaleX()` CSS function.
 *
 * @category Transform
 */
export function scaleX( s: Extended<CssNumber>): ITransformProxy
{
    return scale1d( "X", s);
}

/**
 * Returns an ITransformProxy function representing the `scaleY()` CSS function.
 *
 * @category Transform
 */
export function scaleY( s: Extended<CssNumber>): ITransformProxy
{
    return scale1d( "Y", s);
}

/**
 * Returns an ITransformProxy function representing the `scaleZ()` CSS function.
 *
 * @category Transform
 */
export function scaleZ( s: Extended<CssNumber>): ITransformProxy
{
    return scale1d( "Z", s);
}

/**
 * Returns an ITransformProxy function representing the `scale3d()` CSS function.
 *
 * @category Transform
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
    sz: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( "scale3d", [sx, sy, sz]);
}



/**
 * Returns an ITransformProxy function representing the `skew()` CSS function.
 *
 * @category Transform
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( "skew", [[ax, WKF.Angle], [ay, WKF.Angle]]);
}

/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
function skew1d( axis: string, a: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( `skew${axis}`, [[a, WKF.Angle]]);
}

/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 *
 * @category Transform
 */
export function skewX( a: Extended<CssAngle>): ITransformProxy
{
    return skew1d( "X", a);
}

/**
 * Returns an ITransformProxy function representing the `skewY()` CSS function.
 *
 * @category Transform
 */
export function skewY( a: Extended<CssAngle>): ITransformProxy
{
    return skew1d( "Y", a);
}



/**
 * Returns an ITransformProxy function representing the `translate()` CSS function.
 *
 * @category Transform
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): ITransformProxy
{
    return () => f2s( "translate", [[x, WKF.Length], [y, WKF.Length]]);
}

/**
 * Returns an ITransformProxy function representing the `translateX()` CSS function.
 *
 * @category Transform
 */
function translate1d( axis: string, d: Extended<CssLength>): ITransformProxy
{
    return () => f2s( `translate${axis}`, [[d, WKF.Length]]);
}

/**
 * Returns an ITransformProxy function representing the `translateX()` CSS function.
 *
 * @category Transform
 */
export function translateX( d: Extended<CssLength>): ITransformProxy
{
    return translate1d( "X", d);
}

/**
 * Returns an ITransformProxy function representing the `translateY()` CSS function.
 *
 * @category Transform
 */
export function translateY( d: Extended<CssLength>): ITransformProxy
{
    return translate1d( "Y", d);
}

/**
 * Returns an ITransformProxy function representing the `translateZ()` CSS function.
 *
 * @category Transform
 */
export function translateZ( d: Extended<CssLength>): ITransformProxy
{
    return translate1d( "Z", d);
}

/**
 * Returns an ITransformProxy function representing the `translate3d()` CSS function.
 *
 * @category Transform
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): ITransformProxy
{
    return () => f2s( "translate3d", [[x, WKF.Length], [y, WKF.Length], [z, WKF.Length]]);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shapes
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IInsetProxy function representing the `inset()` CSS function.
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
    o3?: Extended<CssLength>, o4?: Extended<CssLength>): IInset
{
    return new Inset( o1, o2, o3, o4);
}

// Implementation of inset CSS function
class Inset implements IInset
{
    o1?: Extended<CssLength>;
    o2?: Extended<CssLength>;
    o3?: Extended<CssLength>;
    o4?: Extended<CssLength>;
    radius?: Extended<BorderRadius>;

    constructor( o1?: Extended<CssLength>, o2?: Extended<CssLength>,
        o3?: Extended<CssLength>, o4?: Extended<CssLength>)
    {
        this.o1 = o1; this.o2 = o2; this.o3 = o3; this.o4 = o4;
    }

    public round( radius?: Extended<BorderRadius>): this
    {
        this.radius = radius;
        return this;
    }

    public toString(): string
    {
        return f2s( "inset", [
            [this.o1, WKF.Length], [this.o2, WKF.Length],
            [this.o3, WKF.Length], [this.o4, WKF.Length],
            [this.radius, this.radius && ((v: Extended<BorderRadius>) =>"round " + wkf[WKF.BorderRadius](v))],
        ], " ");
    }
}



/**
 * Returns an ICircle objectn representing the `circle()` CSS function.
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
export function circle( radius?: ShapeRadius): ICircle
{
    return new Circle( radius);
}

// Implementation of the circle CSS function
class Circle implements ICircle
{
    radius?: ShapeRadius;
    pos?: Extended<CssPosition>;

    constructor( radius?: ShapeRadius)
    {
        this.radius = radius;
    }

    public at( pos?: Extended<CssPosition>): this { this.pos = pos; return this; }

    public toString(): string
    {
        return f2s( "circle", [
            [this.radius, WKF.Length],
            [this.pos, WKF.AtPosition],
        ], " ");
    }
}


/**
 * Returns an IEllipse object representing the `ellipse()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: ellipse().at( ["top", "50%"])
 * ```
 *
 * @category Basic Shape
 */
export function ellipse(): IEllipse;

/**
 * Returns an IEllipse object representing the `ellipse()` CSS function.
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
export function ellipse( radiusX: ShapeRadius, radiusY: ShapeRadius): IEllipse;

// implementation
export function ellipse(): IEllipse
{
    return new Ellipse( arguments[0], arguments[1]);
}

// Implementation of the ellipse CSS function
class Ellipse implements IEllipse
{
    radiusX?: ShapeRadius;
    radiusY?: ShapeRadius;
    pos?: Extended<CssPosition>;

    constructor()
    constructor( radiusX: ShapeRadius, radiusY: ShapeRadius)
    constructor( radiusX?: ShapeRadius, radiusY?: ShapeRadius)
    {
        this.radiusX = radiusX; this.radiusY = radiusY;
    }

    public at( pos?: Extended<CssPosition>): this { this.pos = pos; return this; }

    public toString(): string
    {
        return f2s( "ellipse", [
            [this.radiusX, WKF.Length],
            [this.radiusY, WKF.Length],
            [this.pos, WKF.AtPosition],
        ], " ");
    }
}



/**
 * Returns an IPolygon interface representing the `polygon()` CSS function.
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
export function polygon( ...points: CssPoint[]): IPolygon
{
    return new Polygon( points);
}

// Implementation of the polygon CSS function
class Polygon implements IPolygon
{
    points: CssPoint[];
    rule: FillRule;

    constructor( points: CssPoint[])
    {
        this.points = points ?? [];
    }

    public add( ...points: CssPoint[]): this
    {
        this.points.push( ...points);
        return this;
    }

    public fill( rule: FillRule): this { this.rule = rule; return this; }

    public toString(): string
    {
        return f2s( "polygon", [
            this.rule,
            [this.points, { item: WKF.MultiLengthWithSpace, sep: ","}],
        ]);
    }
}



/**
 * Returns an IPathBuilder interface that allows building a CSS path.
 *
 * @category Basic Shape
 */
export function path( fillRule?: FillRule): IPathBuilder
{
    return new PathBuilder( fillRule);
}



type PathCommandParam = number | number[];
type PathCommand = [string, PathCommandParam[]?];

/**
 * The IPathBuilder interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function.
 */
class PathBuilder implements IPathBuilder
{
    rule?: FillRule;
    items: PathCommand[] = [];

    public constructor( rule?: FillRule)
    {
        this.rule = rule;
    }

    // Returns the accumulated string
    public toString(): string
    {
        return f2s( "path", [
            this.rule,
            [this.items, (v: PathCommand[]) => `"${a2s(v)}"`]
        ]);
    }

    // Adds the given command and parameters to the path.
    private add( command: string, params?: PathCommandParam[]): this
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

    public z() { return this.add( "z"); }
}



/**
 * Returns an IRayFunc function representing invocation of the `ray()` CSS function.
 *
 * @category Basic Shape
 */
 export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
    contain?: boolean): IRayProxy
{
    return () => f2s( "ray", [
        [angle, WKF.Angle],
        [size, WKF.Length],
        [contain ? "contain" : undefined]
    ], " ");
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Grids
//
///////////////////////////////////////////////////////////////////////////////////////////////

 /**
 * Returns an IMinMaxProxy function representing the `minmax()` CSS function.
 *
 * @category Grid
 */
export function minmax( min: GridTrackSize, max: GridTrackSize): IMinMaxProxy
{
    return () => f2s( "minmax", [[min, WKF.Length], [max, WKF.Length]]);
}



/**
 * Returns an IRepeatProxy function representing the `repeat()` CSS function.
 *
 * @category Grid
 */
export function repeat( count: Extended<CssNumber> | "auto-fill" | "auto-fit",
    ...tracks: GridTrack[]): IRepeatProxy
{
    return () => f2s( "repeat", [
        count,
        [tracks, { item: WKF.GridTrack}]
    ]);
}



/**
 * Returns an ISpanProxy function representing the `span` expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 *
 * @category Grid
 */
export function span( countOrName: Extended<GridLineCountOrName>,
    nameOrCount?: Extended<GridLineCountOrName>): ISpanProxy
{
    return () => mv2s( ["span", countOrName, nameOrCount]);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Counters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the CSS `counter()` function with additional
 * optional strings added after and/or before the counter.
 *
 * @category Counter
 */
 export function counter( counterObj: Extended<ICounterRule | string>,
	style?: Extended<ListStyleType_StyleType>,
	textAfter?: Extended<string>, textBefore?: Extended<string>): IStringProxy
{
    return () => mv2s( [
        [textBefore, (v: Extended<string>) => v && `"${v2s(v)}"`],
        f2s( "counter", [counterObj, style]),
        [textAfter, (v: Extended<string>) => v && `"${v2s(v)}"`],
    ]);
}



/**
 * Returns a function representing the CSS `counters()` function with the given
 * separator string and additional optional strings added after and/or before the counter.
 *
 * @category Counter
 */
export function counters( counterObj: Extended<ICounterRule | string>,
	separator: Extended<string>, style?: Extended<ListStyleType_StyleType>,
	textAfter?: Extended<string>, textBefore?: Extended<string>): IStringProxy
{
    return () => mv2s( [
        [textBefore, (v: Extended<string>) => v && `"${v2s(v)}"`],
        f2s( "counters", [
            counterObj,
            [separator, (v: Extended<string>) => `"${v2s(v) || "."}"`],
            style
        ]),
        [textAfter, (v: Extended<string>) => v && `"${v2s(v)}"`],
    ]);
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
export function url( p: Extended<string | IIDRule>): IUrlProxy
{
    return () => f2s( "url", [p]);
}



/**
 * Returns a function representing the CSS `url()` function.
 *
 * @category Miscellaneous
 */
export function cursor( p: Extended<string | IIDRule>): ICursorProxy;

/**
 * Returns a function representing the CSS `url()` function followed by two numbers
 * indicating the cursor hotspot.
 *
 * @category Miscellaneous
 */
export function cursor( p: Extended<string | IIDRule>, x: number, y: number): ICursorProxy;

// Implementation
export function cursor( p: Extended<string | IIDRule>, x?: number, y?: number): ICursorProxy
{
    return () => mv2s( [url(p), x, y]);
}



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
    // () => `attr(${attrName}${typeOrUnit ? " " + typeOrUnit : ""}${fallback ? "," + fallback : ""})`;
    return () => `attr(${mv2s( [mv2s( [attrName, typeOrUnit], " "), fallback], ",")})`;
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
 export function steps( n: Extended<number>, jumpTerm?: TimingFunctionJumpTerm): ITimingFunctionProxy
{
    return () => f2s( "steps", [n, jumpTerm]);
}

/**
 * Returns a function representing an invocation of the CSS `cubic-bezier()` function.
 *
 * @category Transition and Animation
 */
 export function cubicBezier( n1: Extended<number>, n2: Extended<number>, n3: Extended<number>,
    n4: Extended<number>): ITimingFunctionProxy
{
    return () => f2s( "cubic-bezier", [n1, n2, n3, n4]);
}



