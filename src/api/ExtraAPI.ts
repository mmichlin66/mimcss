/**
 * This module contains definitions of functions and classes used to define CSS functions.
 * @module ExtraAPI
 */



import {CssAngle, CssLength, CssNumber, CssPercent, CssPoint, CssPosition, Extended, ExtentKeyword, IStringProxy} from "./CoreTypes";
import {
    CrossFadeParam, CssColor, GradientStopOrHint, ICircle, IColorProxy,
    IConicGradient, IEllipse, LinearGradientAngle, ShapeRadius,
    IImageProxy, IInset, IGradient, ILinearGradient, IMinMaxProxy, INamedColors, IPathBuilder,
    IPolygon, IRadialGradient, IRepeatProxy, ISpanProxy,
    IFilterProxy, ITransformProxy, IUrlFunc, IRayFunc, TimingFunctionJumpTerm, ITimingFunctionFunc,
    ICursorFunc,
} from "./ExtraTypes";
import {ICounterRule, IIDRule, IVarRule} from "./RuleTypes";
import {
    BorderRadius_StyleType, ExtendedVarValue, FillRule_StyleType, GridLineCountOrName, GridTrack,
    GridTrackSize, ListStyleType_StyleType, VarTemplateName
} from "./StyleTypes";
import {
    AngleMath, f2s, INumberBaseMathClass, LengthMath, mv2s, PercentMath, pos2s, registerV2SFuncID,
    v2s, WellKnownFunc
} from "../impl/CoreFuncs";
import {rgbToString, hslToString, colorWithAlphaToString, getColorsObject, colorToString} from "../impl/ExtraFuncs";
import {borderRadiusToString, gridTrackToString, stylePropToString} from "../impl/StyleFuncs";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Colors.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Object whose property names are names of well-known colors and values correspond to the
 * hexadecimal representation of the RGB separations (without an alpha mask). The properties of
 * this object can be used wherever the [[CssColor]] type can be used. Since the properties are
 * of the `number` type, they can be used for manipulating the color value.
 */
export let Colors = getColorsObject();



/**
 * Converts the color specified as red, green, blue separation values and an optional alpha
 * mask to a CSS color representation. Each color separation can be represented as a number with
 * the following meaning:
 *   - Integer number -255 to 255. Numbers beyond this range will be clamped. Negative numbers
 *     will be inverted.
 *   - Floating number -1.0 to 1.0 non-inclusive, which is multiplied by 100 treated as percentage.
 *     Floating numbers beyond this range will be rounded and treated as integer numbers. Negative
 *     numbers will be inverted.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * @param r Red separation value.
 * @param g Green separation value.
 * @param b Blue separation value.
 * @param a Optional alpha mask as a percentage value.
 */
export function rgb( r: Extended<number>, g: Extended<number>, b: Extended<number>, a?: Extended<number>): IColorProxy
{
    return () => rgbToString( r, g, b, a);
}



/**
 * Converts the color specified as hue-saturation-lightness components and an optional alpha
 * mask to a CSS color representation. This method should be used when defining CSS color
 * values in styleset properties.
 *
 * The Hue component is treated as the CSS `<angle>` type. Numbers are considered degrees.
 *
 * The Saturation and Lightness components are treated as percentages:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Floating number 0 to 1 inclusive are multiplied by 100 and treated as percentage.
 *   - Integer or floating number 1 to 100 are treated as percentage. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped to 100.
 *
 * The alpha mask can be one of the following:
 *   - Floating number 0 to 1 inclusive.
 *   - Integer or floating number 1 to 100, which is divided by 100. Floating numbers will be
 *     rounded. Numbers beyond this range will be clamped.
 *   - The sign of alpha is ignored; that is, only the absolute value is considered.
 *
 * @param h Hue component as an angle value.
 * @param s Saturation component as a percentage value.
 * @param l Lightness component as a percentage value.
 * @param a Optional alpha mask as a percentage value.
 */
export function hsl( h: Extended<CssAngle>, s: Extended<number>, l: Extended<number>, a?: Extended<number>): IColorProxy
{
    return () => hslToString( h, s, l, a);
}



/**
 * Converts the given color and the alpha mask to the CSS Color representation. This
 * method should be used when defining CSS color values in styleset properties.
 *
 * The color can be specified as a numeric value or as a string color name.
 *
 * The alpha mask is specified as a number:
 *   - The sign is ignored; that is, only the absolute value is considered.
 *   - Number 0 to 1 inclusive, which is treated as percentage.
 *   - Number 1 to 100 inclusive, which is treated as percentage.
 *   - Numbers greater than 100 are clamped to 100;
 *
 * @param c Color value as either a number or a named color
 * @param a Alpha channel value
 */
export function alpha( c: number | keyof INamedColors, a: number): IColorProxy
{
    return () => colorWithAlphaToString( c, a);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Images and gradients.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Function returning the ILinearGradient interface representing the `linear-gradient` CSS functions.
 *
 * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
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
 */
export function linearGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
    return new LinearGradient( stopsOrHints);
}



/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
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
 */
export function radialGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
    return new RadialGradient( stopsOrHints);
}



/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
 * the gradient definition.
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
    protected matchClass: INumberBaseMathClass<T>;

    /** Name of the gradient */
    protected name: string;

    /** Name of the gradient */
    protected isRepeating?: boolean;

    /** Array of stops and hints */
    protected stopsOrHints: GradientStopOrHint<T>[];

    constructor( matchClass: INumberBaseMathClass<T>, name: string,
        stopsOrHints: GradientStopOrHint<T>[])
    {
        this.matchClass = matchClass;
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
        this.stopsOrHints = this.stopsOrHints.concat( stopsOrHints);
        return this;
    }

    // Converts object data to the CSS conic function - this is called when the object is assigned
    // to a CSS property
    public toString(): string
    {
        return f2s( `${this.isRepeating ? "repeating-" : ""}${this.name}-gradient`, [
            this.options2s(),
            [this.stopsOrHints, (v: GradientStopOrHint<T>[]) => gradientStopsOrHintsToString( v, this.matchClass)]
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
            [this.sizeOrExtent, LengthMath.mv2s],
            [this.pos, this.pos == null ? undefined: (v: Extended<CssPosition>) => "at " + pos2s(v)],
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
            [this.pos, this.pos == null ? undefined: (v: Extended<CssPosition>) => "at " + pos2s(v)],
        ]);
    }
}



function gradientStopsOrHintsToString( val: GradientStopOrHint<any>[],
    mathClass: INumberBaseMathClass): string
{
    return val.map( v => gradientStopOrHintToString( v, mathClass)).join(",");
}

function gradientStopOrHintToString( val: GradientStopOrHint<any>, mathClass: INumberBaseMathClass): string
{
    return v2s( val, {
        fromNumber: colorToString,
        fromArray: v => {
            if (v.length === 0)
                return "";
            else if (v.length === 1)
                return mathClass.v2s( v[0]);
            else
            {
                let secondStop = v.length > 2 ? mathClass.v2s( v[2]) : "";
                return `${colorToString(v[0])} ${mathClass.v2s( v[1])} ${secondStop}`;
            }
        }
    });
}

/**
 * Converts the given linear gradient angle to string.
 */
function linearGradientAngleToString( angle: LinearGradientAngle): string
{
    // if angle value is undefined or is 0, no need to specify it
    if (!angle)
        return "";

    // Since the linear gradient angle has the "to" prefix before `side-or-corner` values such as
    // `to right`, but doesn't have it before regular angle values such as `0.25turn`, we must
    // check whether the value contains any digits. We do it via regex test.
    return v2s( angle, {
        fromNumber: AngleMath.n2s,
        fromString: v => /\d+.*/.test(v) ? v : "to " + v
    });
}





/**
 * Returns an ImageProxy function representing the `cross-fade()` CSS function.
 */
export function crossFade( ...args: CrossFadeParam[]): IImageProxy
{
    return () => crossFadeToString( args);
}



function crossFadeToString( args: CrossFadeParam[]): string
{
    let paramsString = v2s( args, {
        arrItemFunc: crossFadeParamToString,
        arrSep: ","
    })

    return `cross-fade(${paramsString})`;
}



function crossFadeParamToString( val: CrossFadeParam): string
{
    return v2s( val, {
        fromArray: v => `${v2s(v[0])},${PercentMath.v2s(v[1])}`
    });
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
    return () => f2s( name, [[p, WellKnownFunc.Percent]]);
}



/**
 * Returns an IFilterProxy function representing the `brightness()` CSS function.
 */
export function brightness( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "brightness", p);
}



/**
 * Returns an IFilterProxy function representing the `contrast()` CSS function.
 */
export function contrast( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "contrast", p);
}



/**
 * Returns an IFilterProxy function representing the `grayscale()` CSS function.
 */
export function grayscale( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "grayscale", p);
}



/**
 * Returns an IFilterProxy function representing the `invert()` CSS function.
 */
export function invert( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "invert", p);
}



/**
 * Returns an IFilterProxy function representing the `opacity()` CSS function.
 */
export function opacity( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "opacity", p);
}



/**
 * Returns an IFilterProxy function representing the `saturate()` CSS function.
 */
export function saturate( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "saturate", p);
}



/**
 * Returns an IFilterProxy function representing the `sepia()` CSS function.
 */
export function sepia( p: Extended<CssPercent>): IFilterProxy
{
    return filterPercent( "sepia", p);
}



/**
 * Returns an IFilterProxy function representing the `blur()` CSS function.
 */
export function blur( r: Extended<CssLength>): IFilterProxy
{
    return () => f2s( "", [[r, WellKnownFunc.Length]]);
}



/**
 * Returns an IFilterProxy function representing the `dropShadow()` CSS function.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 */
export function dropShadow( x: Extended<CssLength>, y: Extended<CssLength>,
    color?: Extended<CssColor>, blur?: Extended<CssLength>): IFilterProxy
{
    return () => f2s( "drop-shadow", [[x, WellKnownFunc.Length], [y, WellKnownFunc.Length],
        [color, WellKnownFunc.Color], [blur, WellKnownFunc.Length]]);
}



/**
 * Returns an IFilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( a: Extended<CssAngle>): IFilterProxy
{
    return () => f2s( "", [[a, WellKnownFunc.Angle]]);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Transforms
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an ITransformProxy function representing the `matrix()` CSS function.
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( "matrix", [a, b, c, d, tx, ty]);
}



/**
 * Returns an ITransformProxy function representing the `matrix3d()` CSS function.
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
 */
export function perspective( d: Extended<CssLength>): ITransformProxy
{
    return () => f2s( "perspective", [[d, WellKnownFunc.Length]]);
}



/**
 * Returns an ITransformProxy function representing the `rotate()` CSS function.
 */
function rotate1d( name: string, a: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( name, [[a, WellKnownFunc.Angle]]);
}

/**
 * Returns an ITransformProxy function representing the `rotate()` CSS function.
 */
export function rotate( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "rotate", a);
}

/**
 * Returns an ITransformProxy function representing the `rotateX()` CSS function.
 */
export function rotateX( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "rotateX", a);
}

/**
 * Returns an ITransformProxy function representing the `rotateY()` CSS function.
 */
export function rotateY( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "rotateY", a);
}

/**
 * Returns an ITransformProxy function representing the `rotateZ()` CSS function.
 */
export function rotateZ( a: Extended<CssAngle>): ITransformProxy
{
    return rotate1d( "rotateZ", a);
}

/**
 * Returns an ITransformProxy function representing the `rotate3d()` CSS function.
 */
export function rotate3d( x: Extended<CssNumber>, y: Extended<CssNumber>,
    z: Extended<CssNumber>, a: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( "rotate3d", [x, y, z, [a, WellKnownFunc.Angle]]);
}



/**
 * Returns an ITransformProxy function representing the `scale()` CSS function.
 */
export function scale( sx: Extended<CssNumber>, sy?: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( "scale", [sx, sy]);
}

/**
 * Returns an ITransformProxy function representing the `scaleX()` CSS function.
 */
function scale1d( name: string, s: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( name, [s]);
}

/**
 * Returns an ITransformProxy function representing the `scaleX()` CSS function.
 */
export function scaleX( s: Extended<CssNumber>): ITransformProxy
{
    return scale1d( "scaleX", s);
}

/**
 * Returns an ITransformProxy function representing the `scaleY()` CSS function.
 */
export function scaleY( s: Extended<CssNumber>): ITransformProxy
{
    return scale1d( "scaleY", s);
}

/**
 * Returns an ITransformProxy function representing the `scaleZ()` CSS function.
 */
export function scaleZ( s: Extended<CssNumber>): ITransformProxy
{
    return scale1d( "scaleZ", s);
}

/**
 * Returns an ITransformProxy function representing the `scale3d()` CSS function.
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
    sz: Extended<CssNumber>): ITransformProxy
{
    return () => f2s( "scale3d", [sx, sy, sz]);
}



/**
 * Returns an ITransformProxy function representing the `skew()` CSS function.
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( "skew", [[ax, WellKnownFunc.Angle], [ay, WellKnownFunc.Angle]]);
}

/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
function skew1d( name: string, a: Extended<CssAngle>): ITransformProxy
{
    return () => f2s( name, [[a, WellKnownFunc.Angle]]);
}

/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
export function skewX( a: Extended<CssAngle>): ITransformProxy
{
    return skew1d( "skewX", a);
}

/**
 * Returns an ITransformProxy function representing the `skewY()` CSS function.
 */
export function skewY( a: Extended<CssAngle>): ITransformProxy
{
    return skew1d( "skewY", a);
}



/**
 * Returns an ITransformProxy function representing the `translate()` CSS function.
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): ITransformProxy
{
    return () => f2s( "translate", [[x, WellKnownFunc.Length], [y, WellKnownFunc.Length]]);
}

/**
 * Returns an ITransformProxy function representing the `translateX()` CSS function.
 */
function translate1d( name: string, d: Extended<CssLength>): ITransformProxy
{
    return () => f2s( name, [[d, WellKnownFunc.Length]]);
}

/**
 * Returns an ITransformProxy function representing the `translateX()` CSS function.
 */
export function translateX( d: Extended<CssLength>): ITransformProxy
{
    return translate1d( "translateX", d);
}

/**
 * Returns an ITransformProxy function representing the `translateY()` CSS function.
 */
export function translateY( d: Extended<CssLength>): ITransformProxy
{
    return translate1d( "translateY", d);
}

/**
 * Returns an ITransformProxy function representing the `translateZ()` CSS function.
 */
export function translateZ( d: Extended<CssLength>): ITransformProxy
{
    return translate1d( "translateZ", d);
}

/**
 * Returns an ITransformProxy function representing the `translate3d()` CSS function.
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): ITransformProxy
{
    return () => f2s( "translate3d", [[x, WellKnownFunc.Length], [y, WellKnownFunc.Length], [z, WellKnownFunc.Length]]);
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
    radius?: Extended<BorderRadius_StyleType>;

    constructor( o1?: Extended<CssLength>, o2?: Extended<CssLength>,
        o3?: Extended<CssLength>, o4?: Extended<CssLength>)
    {
        this.o1 = o1; this.o2 = o2; this.o3 = o3; this.o4 = o4;
    }

    public round( radius?: Extended<BorderRadius_StyleType>): this
    {
        this.radius = radius;
        return this;
    }

    public toString(): string
    {
        return f2s( "inset", [
            [this.o1, WellKnownFunc.Length], [this.o2, WellKnownFunc.Length],
            [this.o3, WellKnownFunc.Length], [this.o4, WellKnownFunc.Length],
            [this.radius, this.radius && ((v: Extended<BorderRadius_StyleType>) => mv2s( ["round", borderRadiusToString(v)]))],
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
            [this.radius, WellKnownFunc.Length],
            [this.pos, this.pos && ((v: Extended<CssPosition>) => "at " + pos2s(v))],
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

    constructor( radiusX?: ShapeRadius, radiusY?: ShapeRadius)
    {
        this.radiusX = radiusX; this.radiusY = radiusY;
    }

    public at( pos?: Extended<CssPosition>): this { this.pos = pos; return this; }

    public toString(): string
    {
        return f2s( "ellipse", [
            [this.radiusX, WellKnownFunc.Length], [this.radiusY, WellKnownFunc.Length],
            [this.pos, this.pos && ((v: Extended<CssPosition>) => "at " + pos2s(v))],
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
 */
export function polygon( ...points: CssPoint[]): IPolygon
{
    return new Polygon( points);
}

// Implementation of the polygon CSS function
class Polygon implements IPolygon
{
    points: CssPoint[];
    radiusY?: ShapeRadius;
    rule: FillRule_StyleType;

    constructor( points: CssPoint[])
    {
        this.points = points ?? [];
    }

    public add( ...points: CssPoint[]): this
    {
        this.points = this.points.concat( points);
        return this;
    }

    public fill( rule: FillRule_StyleType): this { this.rule = rule; return this; }

    public toString(): string
    {
        return f2s( "polygon", [
            this.rule,
            [this.points, { arrItemFunc: WellKnownFunc.MultiLengthWithSpace, arrSep: ","}],
        ]);
    }
}



/**
 * Returns an IPathBuilder interface that allows building a CSS path.
 */
export function path( fillRule?: FillRule_StyleType): IPathBuilder
{
    return new PathBuilder( fillRule);
}



/**
 * The IPathBuilder interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function.
 */
class PathBuilder implements IPathBuilder
{
    private buf: string;

    public constructor( fillRule?: FillRule_StyleType)
    {
        this.buf = "path(";
        if (fillRule)
            this.buf += fillRule + ",";

        this.buf += "'";
    }

    // Returns the accumulated string
    public toString(): string { return this.buf + "')"; }



    // Adds the given command and parameters to the path.
    private items( command: string, ...items: (number | number[])[]): IPathBuilder
    {
        this.buf += " " + command;

        for( let item of items)
        {
            if (typeof item === "number")
                this.buf += " " + item;
            else
            {
                for( let subItem of item)
                    this.buf += " " + subItem;
            }
        }

        return this;
    }

    public M( first: [number,number], ...next: [number,number][]) { return this.items( "M", first, ...next); }
    public m( first: [number,number], ...next: [number,number][]) { return this.items( "m", first, ...next); }

    public L( first: [number,number], ...next: [number,number][]) { return this.items( "L", first, ...next); }
    public l( first: [number,number], ...next: [number,number][]) { return this.items( "l", first, ...next); }

    public H( first: number, ...next: number[]) { return this.items( "H", first, ...next); }
    public h( first: number, ...next: number[]) { return this.items( "h", first, ...next); }

    public V( first: number, ...next: number[]) { return this.items( "V", first, ...next); }
    public v( first: number, ...next: number[]) { return this.items( "v", first, ...next); }

    public C( first: [number,number,number,number,number,number],
        ...next: [number,number,number,number,number,number][]) { return this.items( "C", first, ...next); }
    public c( first: [number,number,number,number,number,number],
        ...next: [number,number,number,number,number,number][]) { return this.items( "c", first, ...next); }

    public S( first: [number,number,number,number],
        ...next: [number,number,number,number][]) { return this.items( "S", first, ...next); }
    public s( first: [number,number,number,number],
        ...next: [number,number,number,number][]) { return this.items( "s", first, ...next); }

    public Q( first: [number,number,number,number],
        ...next: [number,number,number,number][]) { return this.items( "Q", first, ...next); }
    public q( first: [number,number,number,number],
        ...next: [number,number,number,number][]) { return this.items( "q", first, ...next); }

    public T( first: [number,number], ...next: [number,number][]) { return this.items( "T", first, ...next); }
    public t( first: [number,number], ...next: [number,number][]) { return this.items( "t", first, ...next); }

    public A( first: [number,number,number,0|1,0|1,number,number],
        ...next: [number,number,number,0|1,0|1,number,number][]) { return this.items( "A", first, ...next); }
    public a( first: [number,number,number,0|1,0|1,number,number],
        ...next: [number,number,number,0|1,0|1,number,number][]) { return this.items( "a", first, ...next); }

    public z() { this.buf += " z"; return this; }
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Grids
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IMinMaxProxy function representing the `minmax()` CSS function.
 */
export function minmax( min: GridTrackSize, max: GridTrackSize): IMinMaxProxy
{
    return () => {
        let options = { fromNumber: LengthMath.n2s };
        return `minmax(${v2s( min, options)},${v2s( max, options)})`;
    }
}



/**
 * Returns an IRepeatProxy function representing the `repeat()` CSS function.
 */
export function repeat( count: Extended<CssNumber> | "auto-fill" | "auto-fit",
    ...tracks: GridTrack[]): IRepeatProxy
{
    return () => `repeat(${v2s(count)},${v2s( tracks, { arrItemFunc: gridTrackToString })})`;
}



/**
 * Returns an ISpanProxy function representing the `span` expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 */
export function span( countOrName: Extended<GridLineCountOrName>,
    nameOrCount?: Extended<GridLineCountOrName>): ISpanProxy
{
    return () => `span ${v2s(countOrName)} ${nameOrCount ? v2s( nameOrCount) : ""}`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Counters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the CSS `counter()` function with additional
 * optional strings added after and/or before the counter.
 */
 export function counter( counterObj: Extended<ICounterRule | string>,
	style?: Extended<ListStyleType_StyleType>,
	textAfter?: Extended<string>, textBefore?: Extended<string>): IStringProxy
{
	return () =>
	{
		let styleString = style ? `,${v2s( style)}` : "";
		let before = textBefore ? `"${v2s( textBefore)}"` : "";
		let after = textAfter ? `"${v2s( textAfter)}"` : "";
		return `${before} counter(${v2s(counterObj)}${styleString}) ${after}`;
	}
}



/**
 * Returns a function representing the CSS `counters()` function with the given
 * separator string and additional optional strings added after and/or before the counter.
 */
export function counters( counterObj: Extended<ICounterRule | string>,
	separator: Extended<string>, style?: Extended<ListStyleType_StyleType>,
	textAfter?: Extended<string>, textBefore?: Extended<string>): IStringProxy
{
	return () =>
	{
		let sepString = separator ? `"${v2s( separator)}"` : `"."`;
		let styleString = style ? `,${v2s( style)}` : "";
		let before = textBefore ? `"${v2s( textBefore)}"` : "";
		let after = textAfter ? `"${v2s( textAfter)}"` : "";
		return `${before} counters(${v2s(counterObj)},${sepString}${styleString}) ${after}`;
	}
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
 */
export function url( p: Extended<string | IIDRule>): IUrlFunc
{
    return () => f2s( "url", [p]);
}



/**
 * Returns a function representing the CSS `url()` function followed by two optional numbers
 * indicating the cursor hotspot.
 */
export function cursor( p: string, x?: number, y?: number): ICursorFunc
{
    return () => {
        let s = `url(${p})`;
        if (x != null)
            s += ` ${x} ${y != null ? y : x}`;
        return s;
    }
}



/**
 * Returns an IRayFunc function representing invocation of the `ray()` CSS function.
 */
 export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
    contain?: boolean): IRayFunc
{
    return () => f2s( "ray", [[angle, WellKnownFunc.Angle], [size, WellKnownFunc.Length], [contain ? "contain" : undefined]], " ");
}



/**
 * Returns a function representing the invocation of the `var()` CSS function for
 * the given custom CSS property with optional fallbacks.
 */
export function usevar<K extends VarTemplateName>( varObj: IVarRule<K>, fallback?: ExtendedVarValue<K>): IStringProxy
{
    return () => fallback
        ? `var(--${varObj.name},${stylePropToString( varObj.template, fallback, true)})`
        : `var(--${varObj.name})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Animation and transition timing functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing an invocation of the CSS `steps()` function.
 */
 export function steps( n: Extended<number>, jumpTerm?: TimingFunctionJumpTerm): ITimingFunctionFunc
{
    return () => f2s( "steps", [n, jumpTerm]);
}

/**
 * Returns a function representing an invocation of the CSS `cubic-bezier()` function.
 */
 export function cubicBezier( n1: Extended<number>, n2: Extended<number>, n3: Extended<number>,
    n4: Extended<number>): ITimingFunctionFunc
{
    return () => f2s( "cubic-bezier", [n1, n2, n3, n4]);
}



 ///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Registration of function converting parameters of CSS functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

registerV2SFuncID( colorToString, WellKnownFunc.Color);





