import {CssAngle, CssLength, CssNumber, CssPercent, CssPoint, CssPosition, Extended, ExtentKeyword, IStringProxy} from "./CoreTypes";
import {
    CrossFadeParam, CssColor, GradientStopOrHint, IBasicShapeProxy, ICircleProxy, IColorProxy,
    IConicGradient, IEllipseProxy, LinearGradAngle, ShapeRadius,
    IImageProxy, IInsetProxy, ILinearGradient, IMinMaxProxy, INamedColors, IPathBuilder,
    IPolygonProxy, IRadialGradient, IRepeatProxy, ISpanProxy,
    FilterPercentFunc, BlurFunc, DropShadowFunc, HueRotateFunc,
    MatrixFunc, Matrix3dFunc, PerspectiveFunc, RotateFunc, Rotate3dFunc,
    Scale1dFunc, ScaleFunc, Scale3dFunc, Skew1dFunc, SkewFunc,
    Translate1dFunc, TranslateFunc, Translate3dFunc,
    RayFunc, UrlFunc
} from "./ExtraTypes";
import {ICounterRule, IIDRule, IVarRule} from "./RuleTypes";
import {
    BorderRadius_StyleType, ExtendedVarValue, FillRule_StyleType, GridLineCountOrName, GridTrack,
    GridTrackSize, ListStyleType_StyleType, VarTemplateName
} from "./StyleTypes";
import {AngleMath, INumberBaseMathClass, LengthMath, PercentMath, pos2str, symValueToString, v2s } from "../impl/CoreFuncs";
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
 * *Example:*
 *
 * ```typescript
 * backgroundImage: linearGradient( "red", "blue")
 *
 * backgroundImage: linearGradient( "red", "blue").to( 45)
 * ```
 */
export function linearGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
    return linearGradientFunc( "linear-gradient", stopsOrHints);
}



/**
 * Function returning the ILinearGradient interface representing the `repeating-linear-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: linearGradient( "red", "blue")
 *
 * backgroundImage: linearGradient( "red", "blue").to( 45)
 * ```
 */
export function repeatingLinearGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
    return linearGradientFunc( "repeating-linear-gradient", stopsOrHints);
}



/**
 * Function returning the ILinearGradient interface for either `linear-gradient` or
 * `repeating-linear-gradient` CSS functions.
 */
function linearGradientFunc( name: string, stopsOrHints: GradientStopOrHint<CssLength>[]): ILinearGradient
{
    let f: any = () => {
        let angleString = "";
        if (f.angle)
        {
            angleString = v2s( f.angle, {
                fromNumber: AngleMath.convertFunc,
                fromString: v => /\d+.*/.test(v) ? v : "to " + v
            }) + ",";
        }

        return `${name}(${angleString}${gradientStopsOrHintsToString( stopsOrHints, LengthMath)})`;
    }

    f.to = (angle: LinearGradAngle) => {
        f.angle = angle;
        return f;
    }

    return f;
}



/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: radialGradient( "red", "blue")
 *
 * backgroundImage: radialGradient( "red", "blue").circle( css.percent(30)).at( ["center", css.percent(65)])
 *
 * backgroundImage: radialGradient( "red", "blue").ellipse( "closest-side")
 * ```
 */
export function radialGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
    return radialGradientFunc( "radial-gradient", stopsOrHints);
}



/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: repeatinGradialGradient( "red", "blue")
 *
 * backgroundImage: repeatinGradialGradient( "red", "blue").circle( css.percent(30)).at( ["center", css.percent(65)])
 *
 * backgroundImage: repeatinGradialGradient( "red", "blue").ellipse( "closest-side")
 * ```
 */
export function repeatingGradialGradient(...stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
    return radialGradientFunc( "repeating-radial-gradient", stopsOrHints);
}



/**
 * Function returning the IRadialGradient interface for either `radial-gradient` or
 * `repeating-radial-gradient` CSS functions.
 */
function radialGradientFunc( name: string, stopsOrHints: GradientStopOrHint<CssLength>[]): IRadialGradient
{
    let f: any = () =>
    {
        let shapeString = f.shape ? f.shape : "";
        let sizeOrExtentString = f.sizeOrExtent ? LengthMath.ms2s( f.sizeOrExtent, " ") : "";
        let posString = f.pos ? `at ${pos2str( f.pos)}` : "";
        let whatAndWhere = f.shape || sizeOrExtentString || f.pos ? `${shapeString} ${sizeOrExtentString} ${posString},` : "";
        return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, LengthMath)})`;
    }

    f.circle = (sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>) => {
        f.shape = "circle";
        f.sizeOrExtent = sizeOrExtent;
        return f;
    }

    f.ellipse = (sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>) => {
        f.shape = "ellipse";
        f.sizeOrExtent = sizeOrExtent;
        return f;
    }

    f.extent = (extent: Extended<ExtentKeyword>) => { f.sizeOrExtent = extent; return f; }

    f.at = (pos: Extended<CssPosition>) => { f.pos = pos; return f; }

    return f;
}



/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: conicGradient( "red", "blue")
 *
 * backgroundImage: conicGradient( "red", "blue").from( 0.25).at( ["center", css.percent(65)])
 * ```
 */
export function conicGradient(...stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
    return conicGradientFunc( "conic-gradient", stopsOrHints);
}



/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * *Example:*
 *
 * ```typescript
 * backgroundImage: repeatingConicGradient( "red", "blue")
 *
 * backgroundImage: repeatingConicGradient( "red", "blue").from( 0.25).at( ["center", css.percent(65)])
 * ```
 */
export function repeatingConicGradient(...stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
    return conicGradientFunc( "repeating-conic-gradient", stopsOrHints);
}



/**
 * Function returning the IConicGradient interface for either `conic-gradient` or
 * `repeating-conic-gradient` CSS functions.
 */
function conicGradientFunc( name: string, stopsOrHints: GradientStopOrHint<CssAngle>[]): IConicGradient
{
    let f: any = () =>
    {
        let angleString = f.angle ? `from ${AngleMath.s2s( f.angle)}` : "";
        let posString = f.pos ? `at ${pos2str( f.pos)}` : "";
        let whatAndWhere = f.angle || f.pos ? `${angleString} ${posString},` : "";
        return `${name}(${whatAndWhere}${gradientStopsOrHintsToString( stopsOrHints, AngleMath)})`;
    }
        // () => conicGradientToString( name, stopsOrHints, f.angleParam, f.posParam);

    f.from = (angle: LinearGradAngle) => { f.angle = angle; return f; }

    f.at = (pos: Extended<CssPosition>) => { f.pos = pos; return f; }

    return f;
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
                return mathClass.s2s( v[0]);
            else
            {
                let secondStop = v.length > 2 ? mathClass.s2s( v[2]) : "";
                return `${colorToString(v[0])} ${mathClass.s2s( v[1])} ${secondStop}`;
            }
        }
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
        fromArray: v => `${v2s(v[0])},${PercentMath.s2s(v[1])}`
    });
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IFilterPercent object representing the `brightness()` CSS function.
 */
export function brightness( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "brightness", p);
}



/**
 * Returns an IFilterProxy function representing the `contrast()` CSS function.
 */
export function contrast( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "contrast", p);
}



/**
 * Returns an IFilterProxy function representing the `grayscale()` CSS function.
 */
export function grayscale( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "grayscale", p);
}



/**
 * Returns an IFilterProxy function representing the `invert()` CSS function.
 */
export function invert( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "invert", p);
}



/**
 * Returns an IFilterProxy function representing the `opacity()` CSS function.
 */
export function opacity( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "opacity", p);
}



/**
 * Returns an IFilterProxy function representing the `saturate()` CSS function.
 */
export function saturate( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "saturate", p);
}



/**
 * Returns an IFilterProxy function representing the `sepia()` CSS function.
 */
export function sepia( p: Extended<CssPercent>): FilterPercentFunc
{
    return new FilterPercentFunc( "sepia", p);
}



/**
 * Returns an IFilterProxy function representing the `blur()` CSS function.
 */
export function blur( r: Extended<CssLength>): BlurFunc
{
    return new BlurFunc( r);
}



/**
 * Returns an IFilterProxy function representing the `dropShadow()` CSS function.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 */
export function dropShadow( x: Extended<CssLength>, y: Extended<CssLength>,
    color?: Extended<CssColor>, blur?: Extended<CssLength>): DropShadowFunc
{
    return new DropShadowFunc( x, y, color, blur);
}



/**
 * Returns an IFilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( a: Extended<CssAngle>): HueRotateFunc
{
    return new HueRotateFunc( a);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Transforms
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an ITransformMatrix function representing the `matrix()` CSS function.
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): MatrixFunc
{
    return new MatrixFunc(  a, b, c, d, tx, ty);
}



/**
 * Returns an ITransformProxy function representing the `matrix3d()` CSS function.
 */
export function matrix3d(
		a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
		a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
		a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
		a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>,
	): Matrix3dFunc
{
    return new Matrix3dFunc(  a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4);
}



/**
 * Returns an ITransformProxy function representing the `perspective()` CSS function.
 */
export function perspective( d: Extended<CssLength>): PerspectiveFunc
{
    return new PerspectiveFunc( d);
}



/**
 * Returns an ITransformRotate2d object representing the `rotate()` CSS function.
 */
export function rotate( a: Extended<CssAngle>): RotateFunc
{
    return new RotateFunc( a);
}

/**
 * Returns an ITransformRotate object representing the `rotateX()` CSS function.
 */
export function rotateX( a: Extended<CssAngle>): RotateFunc
{
    return new RotateFunc( a, "X");
}

/**
 * Returns an ITransformRotate object representing the `rotateY()` CSS function.
 */
export function rotateY( a: Extended<CssAngle>): RotateFunc
{
    return new RotateFunc( a, "Y");
}

/**
 * Returns an ITransformRotate object representing the `rotateZ()` CSS function.
 */
export function rotateZ( a: Extended<CssAngle>): RotateFunc
{
    return new RotateFunc( a, "Z");
}

/**
 * Returns an ITransformRotate3d object representing the `rotate3d()` CSS function.
 */
export function rotate3d( x: Extended<CssNumber>, y: Extended<CssNumber>,
    z: Extended<CssNumber>, a: Extended<CssAngle>): Rotate3dFunc
{
    return new Rotate3dFunc( x, y, z, a);
}



/**
 * Returns an ITransformScale2d object representing the `scale()` CSS function.
 */
export function scale( sx: Extended<CssNumber>, sy?: Extended<CssNumber>): ScaleFunc
{
    return new ScaleFunc( sx, sy);
}

/**
 * Returns an ITransformScale object representing the `scaleX()` CSS function.
 */
export function scaleX( s: Extended<CssNumber>): Scale1dFunc
{
    return new Scale1dFunc( s, "X");
}

/**
 * Returns an ITransformScale object representing the `scaleY()` CSS function.
 */
export function scaleY( s: Extended<CssNumber>): Scale1dFunc
{
    return new Scale1dFunc( s, "Y");
}

/**
 * Returns an ITransformScale object representing the `scaleZ()` CSS function.
 */
export function scaleZ( s: Extended<CssNumber>): Scale1dFunc
{
    return new Scale1dFunc( s, "Z");
}

/**
 * Returns an ITransformScale3d object representing the `scale3d()` CSS function.
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
    sz: Extended<CssNumber>): Scale3dFunc
{
    return new Scale3dFunc( sx, sy, sz);
}



/**
 * Returns an ITransformProxy function representing the `skew()` CSS function.
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): SkewFunc
{
    return new SkewFunc( ax, ay);
}

/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
export function skewX( a: Extended<CssAngle>): Skew1dFunc
{
    return new Skew1dFunc( a, "X");
}

/**
 * Returns an ITransformProxy function representing the `skewY()` CSS function.
 */
export function skewY( a: Extended<CssAngle>): Skew1dFunc
{
    return new Skew1dFunc( a, "Y");
}



/**
 * Returns an ITransformTranslate2d object representing the `translate()` CSS function.
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): TranslateFunc
{
    return new TranslateFunc( x, y);
}

/**
 * Returns an ITransformTranslate1d object representing the `translateX()` CSS function.
 */
export function translateX( l: Extended<CssLength>): Translate1dFunc
{
    return new Translate1dFunc( l, "X");
}

/**
 * Returns an ITransformTranslate1d object representing the `translateY()` CSS function.
 */
export function translateY( l: Extended<CssLength>): Translate1dFunc
{
    return new Translate1dFunc( l, "Y");
}

/**
 * Returns an ITransformTranslate1d object representing the `translateZ()` CSS function.
 */
export function translateZ( l: Extended<CssLength>): Translate1dFunc
{
    return new Translate1dFunc( l, "Z");
}

/**
 * Returns an ITransformTranslate3d object representing the `translate3d()` CSS function.
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): Translate3dFunc
{
    return new Translate3dFunc( x, y, z);
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
 * clipPath: inset( css.percent(15)).round( 8)
 * ```
 */
export function inset( o1: Extended<CssLength>, o2?: Extended<CssLength>,
    o3?: Extended<CssLength>, o4?: Extended<CssLength>): IInsetProxy
{
    let f: any = () =>
    {
        let r = f.radius != null ? " round " + borderRadiusToString( f.radius) : "";
        return `inset(${LengthMath.ms2s( [o1, o2, o3, o4], " ")}${r})`;
    }

    f.round = (radius?: Extended<BorderRadius_StyleType>): IBasicShapeProxy => {
        f.radius = radius;
        return f;
    }

    return f;
}



/**
 * Returns an ICircleProxy function representing the `circle()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: circle( 100)
 *
 * clipPath: circle( 100).at( ["center", css.percent(30)])
 * ```
 */
export function circle( radius?: ShapeRadius): ICircleProxy
{
    let f: any = () =>
    {
        let rs =  radius != null ? LengthMath.s2s(radius) : "";
        let pos = f.pos != null ? " at " + pos2str( f.pos) : "";
        return `circle(${rs}${pos})`;
    }

    f.at = (pos: Extended<CssPosition>): IBasicShapeProxy => { f.pos = pos; return f; }

    return f;
}



/**
 * Returns an IEllipseProxy function representing the `ellipse()` CSS function.
 *
 * *Example:*
 *
 * ```typescript
 * clipPath: ellipse( 100, 50)
 *
 * clipPath: ellipse( 100, 50).at( ["center", css.percent(30)])
 * ```
 */
export function ellipse( radiusX?: ShapeRadius, radiusY?: ShapeRadius): IEllipseProxy
{
    let f: any = () =>
    {
        let rxs =  radiusX != null ? LengthMath.s2s(radiusX) : "";
        let rys =  radiusY != null ? " " + LengthMath.s2s(radiusY) : "";
        let pos = f.pos != null ? " at " + pos2str( f.pos) : "";
        return `ellipse(${rxs}${rys}${pos})`
    }

    f.at = (pos: Extended<CssPosition>): IBasicShapeProxy => { f.pos = pos; return f; }

    return f;
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
export function polygon( ...points: CssPoint[]): IPolygonProxy
{
    let f: any = () =>
    {
        let s = "polygon(";
        if (f.fillParam)
            s += f.fillParam + ",";

        s += points.map( pt => LengthMath.ms2s( pt, " ")).join(",");

        return s + ")";
    };

    f.fill = (rule: FillRule_StyleType): IBasicShapeProxy => { f.fillParam = rule; return f; };

    return f;
}



/**
 * Returns an IRayFunc function representing invocation of the `ray()` CSS function.
 */
export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
    contain?: boolean): RayFunc
{
    return new RayFunc( angle, size, contain);
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

        // Returns the accumulated string
        this[symValueToString] = (): string => this.buf + "')";
    }



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
        let options = { fromNumber: LengthMath.convertFunc };
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
 * Returns a function representing the CSS `countesr()` function with the given
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
export function url( p: Extended<string | IIDRule>): UrlFunc
{
    return new UrlFunc(p);
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



