import {Extended, ICssFuncObject, IGenericProxy} from "./CoreTypes";
import {BorderRadius, CssAngle, CssLength, CssNumber, CssPercent, CssPoint, CssPosition} from "./NumericTypes";
import {CssColor} from "./ColorTypes";
import {GridLineCountOrName, GridTrack, GridTrackSize} from "./StyleTypes";
import {IIDRule} from "./RuleTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Image and gradient CSS functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type representing extent for the [[radialGradient]] or [[ray]] functions.
 */
 export type ExtentKeyword = "closest-corner" | "closest-side" | "farthest-corner" | "farthest-side";



 /**
 * The ImageProxy interface represents an invocation of one of CSS functions that are used for
 * specifying images. This interface is returned from functions like [[linearGradient]],
 * [[crossFade]] and others.
 */
 export interface IImageProxy extends IGenericProxy<"image"> {};



 /**
  * The CssImage type represents a type used for CSS properties that accept the `<image>` type.
  * Image can be specified either using the [[url]] function that returns the [[IUrlFunc]]
  * interface or any of the functions that return the [[IImageProxy]] interface such as
  * [[linearGradient]], [[crossFade]] and others.
  */
 export type CssImage = IUrlFunc | IImageProxy | ILinearGradientFunc | IRadialGradientFunc | IConicGradientFunc;



 /**
 * Type representing either color stop or color hint for the `<gradient>` CSS functions. Color
 * stop is represented by either a simple color value or a two-to-three element tuple. In this
 * tuple, the first item is the color value, the second item is the distance/angle of where the
 * color starts and the optional third item is the distance/angle where the color stops.
 *
 * Hint value is expressed as a single-item array that contains a single CSS numeric value.
 * Although hint is a single number, it must be enclosed in an array to distinguish it from color
 * values because any numeric values in the gradient functions are interpreted as colors.
 *
 * For linear and radial gradients numeric values are of type [[CssLength]]; for conic gradients,
 * these are of type [[CssAngle]]. Percents can be used for all types of gradients.
 *
 * **Examples:**
 *
 * ```typescript
 * // linear gradient with 50px hint
 * linearGradient( Colors.red, [50], Colors.blue)
 *
 * // radial gradient with a second color starting at 20%
 * radialGradient( "red", ["blue", css.percent(20)], "yellow")
 *
 * // conic gradient with a second color starting at 0.4turn and stopping at 0.6turn
 * conicGradient( "red", ["blue", 0.4, 0.6], "yellow")
 * ```
 * @typeparam T Type of numeric values used for hints and color stops.
 */
export type GradientStopOrHint<T extends (CssLength | CssAngle)> =
    Extended<CssColor> | [Extended<CssColor>, Extended<T>, Extended<T>?] | [Extended<T>];



/**
 * Type that enumerates possible values of the side-or-corner for the [[linearGradient]] function.
 * These values can be specified in lieu of the angle in the [[ILinearGradient.to|to]] method of
 * the [[ILinearGradient]] interface.
 *
 * **Examples:**
 *
 * ```typescript
 * linearGradient( Colors.red, Colors.blue).to( "bottom right")
 * ```
 */
export type SideOrCorner = "bottom" | "left" | "top" | "right" |
    "top left" | "top right" | "bottom right" | "bottom left" |
    "left top" | "right top" | "left bottom" | "right bottom";



/**
 * Type that represents the angle of the [[linearGradient]] CSS function. These values can be
 * specified in lieu of the angle in the [[ILinearGradient.to|to]] method of the
 * [[ILinearGradient]] interface.
 *
 * **Examples:**
 *
 * ```typescript
 * // linear gradient directed at the bottom corner of the element
 * linearGradient( Colors.red, Colors.blue).to( "bottom right")
 *
 * // linear gradient at 45deg angle
 * linearGradient( Colors.red, Colors.blue).to( 45)
 * ```
 */
export type LinearGradientAngle = Extended<CssAngle> | SideOrCorner;



/**
 * Base class for gradients
 * @typeparam T Type of numeric values used for hints and color stops.
 * @category Image
 */
export interface IGradientFunc<T extends (CssLength | CssAngle)> extends ICssFuncObject
{
    /** flag indicating whether the gradient is repeating */
    repeat?: boolean;

    /** Array of stops and hints */
    stops: GradientStopOrHint<T>[];
}



/**
 * Base class for gradient builders.
 * @typeparam T Type of numeric values used for hints and color stops.
 * @category Image
 */
export interface IGradientBuilder<T extends (CssLength | CssAngle)> extends IGradientFunc<T>
{
    /**
     * Sets the flag indicating whether the gradient is repeating.
     * @param repeatFflag indicating whether to set the gradient as repeating; the default value
     * is true.
     */
    repeating( repeat?: boolean): this;

    /**
     * Adds stops or hints to the gradient definition.
     * @param stops Variable argument list specifying stops or hints that will be added to
     * the gradient definition.
     */
    add( ...stops: GradientStopOrHint<T>[]): this;
}



/**
 * Represents an object that produces either `linear-gradient` or
 * `repeating-linear-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). Objects implementing this interface can be used whereever
 * gradients are used.
 * @category Image
 */
export interface ILinearGradientFunc extends IGradientFunc<CssLength>
{
    fn: "linear-gradient";

    /** Gradient angle */
	angle?: LinearGradientAngle;
}



/**
 * Represents an object that produces either `linear-gradient`
 * or `repeating-linear-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `to` method that can be called to
 * specify the angle of the gradient.
 * @category Image
 */
export interface ILinearGradientBuilder extends ILinearGradientFunc, IGradientBuilder<CssLength>
{
    fn: "linear-gradient";

    /**
     * Sets the angle at which the linear gradient changes colors
     * @param angle Either an angle value or an indication of side or corner such as `right` or
     * `top left`.
     */
	to( angle: LinearGradientAngle): this;
}



/**
 * Represents an object that produces either `radial-gradient` or
 * `repeating-radial-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). Objects implementing this interface can be used whereever
 * gradients are used.
 * @category Image
 */
export interface IRadialGradientFunc extends IGradientFunc<CssLength>
{
    fn: "radial-gradient";

    /** Gradient's ending shape */
    shape?: "circle" | "ellipse";

    /** Size of the gradient's ending shape */
	size?: Extended<CssLength> | Extended<ExtentKeyword> | [Extended<CssLength>, Extended<CssLength>];

    /** Gradient's position */
    pos?: Extended<CssPosition>;
}



/**
 * Represents an object that produces either `radial-gradient` or
 * `repeating-radial-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `circle`, `ellipse`, `extent` and `at`
 * methods that can be called to specify parameters of the gradient.
 * @category Image
 */
export interface IRadialGradientBuilder extends IRadialGradientFunc, IGradientBuilder<CssLength>
{
    fn: "radial-gradient";

    /**
     * Sets the shape of the gradient to circle.
     */
	circle(): this;

    /**
     * Sets the shape of the gradient to circle with the given size.
     * @param size Circle radius.
     */
	circle( size: Extended<CssLength>): this;

    /**
     * Sets the shape of the gradient to circle with the given extent.
     * @param eExtent Circle extent keyword.
     */
	circle( extent?: Extended<ExtentKeyword>): this;

    // /**
    //  * Sets the shape of the gradient to ellipse with the given radius values or extent.
    //  * @param sizeOrExtent Either a touple of ellipse's two radii or an extent keyword.
    //  */
	// ellipse( sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>): this;

    /**
     * Sets the shape of the gradient to ellipse.
     */
    ellipse(): this;

    /**
     * Sets the shape of the gradient to ellipse with the given radius values or extent.
     * @param rx Ellipse's X-axis radius.
     * @param rx Ellipse's Y-axis radius.
     */
	ellipse( rx: Extended<CssLength>, ry: Extended<CssLength>): this;

    /**
     * Sets the shape of the gradient to ellipse with the given radius values or extent.
     * @param extent Extent keyword.
     */
	ellipse( extent: Extended<ExtentKeyword>): this;

    /**
     * Sets the extent of the gradient.
     * @param extent Extent keyword.
     */
	extent( extent: Extended<ExtentKeyword>): this;

    /**
     * Sets the position of the gradient's center.
     * @param pos Position value.
     */
    at( pos: Extended<CssPosition>): this;
}



/**
 * Represents an object that produces either `conic-gradient` or
 * `repeating-conic-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). Objects implementing this interface can be used whereever
 * gradients are used.
 * @category Image
 */
export interface IConicGradientFunc extends IGradientFunc<CssAngle>
{
    fn: "conic-gradient";

    /** Gradient's rotation angle */
    angle?: Extended<CssAngle>;

    /** Gradient's position */
    pos?: Extended<CssPosition>;
}



/**
 * Represents an object that produces either `conic-gradient` or
 * `repeating-conic-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `from` and `at` methods that can be
 * called to specify the starting angle and center of the gradient.
 * @category Image
 */
export interface IConicGradientBuilder extends IConicGradientFunc, IGradientBuilder<CssAngle>
{
    fn: "conic-gradient";

    /**
     * Sets the angle from which the gradient starts.
     * @param angle Angle value
     */
	from( angle: Extended<CssAngle>): this;

    /**
     * Sets the position of the gradient's center.
     * @param pos Position value
     */
	at( pos: Extended<CssPosition>): this;
}



/**
 * Type representing parameters for the [[crossFade]] function.
 */
export type CrossFadeParam = Extended<CssImage> | [Extended<CssImage>, Extended<CssNumber>];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Filter CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The PercentFilterNames type represents the names of the percentage-based filter functions.
 */
export type PercentFilterNames = "brightness" | "contrast" | "grayscale" | "invert" |
    "opacity" | "saturate" | "sepia";

/**
 * The IPercentFilterFunc interface represents the parameter of percentage-based filter. It can
 * be directly assigned to a style property that accepts filter values (e.g. filter).
 * @category Filter
 */
 export interface IPercentFilterFunc extends ICssFuncObject
{
    fn: PercentFilterNames;

    /** Percentage value */
    p: Extended<CssPercent>;
}



/**
 * The IBlurFunc interface represents the parameters of the `blur()` CSS function. It can
 * be directly assigned to a style property that accepts filter values (e.g. filter). It is
 * returned from the [[blur]] function.
 * @category Filter
 */
 export interface IBlurFunc extends ICssFuncObject
{
    fn: "blur";

    /** Blur radius */
    r: Extended<CssLength>;
}



/**
 * The IDropShadowFunc interface represents the parameters of the `drop-shadow()` CSS function.
 * It can be directly assigned to a style property that accepts filter values (e.g. filter). It is
 * returned from the [[dropShadow]] function.
 * @category Filter
 */
 export interface IDropShadowFunc extends ICssFuncObject
{
    fn: "drop-shadow";

    /** X-axis offset of the shadow */
    x: Extended<CssLength>;

    /** Y-axis offset of the shadow */
    y: Extended<CssLength>;

    /** Shadow color */
    color?: Extended<CssColor>;

    /** Blur radius */
    blur?: Extended<CssLength>;
}



/**
 * The IHueRotateFunc interface represents the parameters of the `hue-rotate()` CSS function.
 * It can be directly assigned to a style property that accepts filter values (e.g. filter). It is
 * returned from the [[hueRotate]] function.
 * @category Filter
 */
 export interface IHueRotateFunc extends ICssFuncObject
{
    fn: "hue-rotate";

    /** Hue rotation angle */
    a: Extended<CssAngle>;
}



/**
 * The FilterFuncs interface represents the result of invoking one of the CSS `<filter>` functions.
 */
export type FilterFuncs = IPercentFilterFunc | IBlurFunc | IDropShadowFunc | IHueRotateFunc;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Transform CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IMatrixFunc interface represents the parameters of the `matrix()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[matrix]] function.
 * @category Transform
 */
 export interface IMatrixFunc extends ICssFuncObject
{
    fn: "matrix";

    a: Extended<CssNumber>;
    b: Extended<CssNumber>;
    c: Extended<CssNumber>;
	d: Extended<CssNumber>;
    tx: Extended<CssNumber>;
    ty: Extended<CssNumber>;
}



/**
 * The IMatrix3dFunc interface represents the parameters of the `matrix3d()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[matrix3d]] function.
 * @category Transform
 */
 export interface IMatrix3dFunc extends ICssFuncObject
{
    fn: "matrix3d";

    a1: Extended<CssNumber>; b1: Extended<CssNumber>; c1: Extended<CssNumber>; d1: Extended<CssNumber>;
    a2: Extended<CssNumber>; b2: Extended<CssNumber>; c2: Extended<CssNumber>; d2: Extended<CssNumber>;
    a3: Extended<CssNumber>; b3: Extended<CssNumber>; c3: Extended<CssNumber>; d3: Extended<CssNumber>;
    a4: Extended<CssNumber>; b4: Extended<CssNumber>; c4: Extended<CssNumber>; d4: Extended<CssNumber>;
}



/**
 * The IPerspectiveFunc interface represents the parameters of the `perspective()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[perspective]] function.
 * @category Transform
 */
 export interface IPerspectiveFunc extends ICssFuncObject
{
    fn: "perspective";

    d: Extended<CssLength>;
}



/**
 * The IRotateFunc interface represents the parameters of the `rotate()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[rotate]] function.
 * @category Transform
 */
 export interface IRotateFunc extends ICssFuncObject
{
    fn: "rotate" | "rotateX" | "rotateY" | "rotateZ";

    a: Extended<CssAngle>;
}



/**
 * The IRotate3dFunc interface represents the parameters of the `rotate3d()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[rotate3d]] function.
 * @category Transform
 */
 export interface IRotate3dFunc extends ICssFuncObject
{
    fn: "rotate3d";

    x: Extended<CssNumber>;
    y: Extended<CssNumber>;
    z: Extended<CssNumber>;
    a: Extended<CssAngle>;
}



/**
 * The IScale1dFunc interface represents the parameters of the `scaleX()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[scaleX]] function.
 * @category Transform
 */
 export interface IScale1dFunc extends ICssFuncObject
{
    fn: "scaleX" | "scaleY" | "scaleZ";

    s: Extended<CssNumber>;
}



/**
 * The IScaleFunc interface represents the parameters of the `scale()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[scale]] function.
 * @category Transform
 */
 export interface IScaleFunc extends ICssFuncObject
{
    fn: "scale";

    sx: Extended<CssNumber>;
    sy?: Extended<CssNumber>;
}



/**
 * The IScale3dFunc interface represents the parameters of the `scale3d()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[scale3d]] function.
 * @category Transform
 */
 export interface IScale3dFunc extends ICssFuncObject
{
    fn: "scale3d";

    sx: Extended<CssNumber>;
    sy: Extended<CssNumber>;
    sz: Extended<CssNumber>;
}



/**
 * The ISkew1dFunc interface represents the parameters of the `skewX()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[skewX]] function.
 * @category Transform
 */
 export interface ISkew1dFunc extends ICssFuncObject
{
    fn: "skewX" | "skewY";

    a: Extended<CssAngle>;
}



/**
 * The ISkewFunc interface represents the parameters of the `skew()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[skew]] function.
 * @category Transform
 */
 export interface ISkewFunc extends ICssFuncObject
{
    fn: "skew";

    ax: Extended<CssAngle>;
    ay?: Extended<CssAngle>;
}



/**
 * The ITranslate1dFunc interface represents the parameters of the `translateX()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[translateX]] function.
 * @category Transform
 */
 export interface ITranslate1dFunc extends ICssFuncObject
{
    fn: "translateX" | "translateY" | "translateZ";

    d: Extended<CssLength>;
}



/**
 * The ITranslateFunc interface represents the parameters of the `translate()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[translate]] function.
 * @category Transform
 */
 export interface ITranslateFunc extends ICssFuncObject
{
    fn: "translate";

    x: Extended<CssLength>;
    y?: Extended<CssLength>;
}



/**
 * The ITranslate3dFunc interface represents the parameters of the `translate3d()` CSS function. It can
 * be directly assigned to a style property that accepts transform values (e.g. transform). It is
 * returned from the [[translate3d]] function.
 * @category Transform
 */
 export interface ITranslate3dFunc extends ICssFuncObject
{
    fn: "translate3d";

    x: Extended<CssLength>;
    y: Extended<CssLength>;
    z: Extended<CssLength>;
}



/**
 * The TransformFuncs interface represents the result of invoking one of the CSS `<transform>` functions.
 */
export type TransformFuncs = IMatrixFunc | IMatrix3dFunc | IPerspectiveFunc |
    IRotateFunc | IRotate3dFunc | IScale1dFunc | IScaleFunc | IScale3dFunc |
    ISkew1dFunc | ISkewFunc | ITranslate1dFunc | ITranslateFunc | ITranslate3dFunc;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shape CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Type that is used to specify a radius in [circle]] and [ellipse]] functions.
 */
export type ShapeRadius = Extended<CssLength | "closest-side" | "farthest-side">;

/** Type for fill-rule style property */
export type FillRule = "nonzero" | "evenodd";



/**
 * The IInsetFunc interface represents the data of the CSS inset basic shape. It can be directly
 * assigned to any style property that accepts values of the [[BasicShape]] type (e.g. clip-path).
 * @category Basic Shape
 */
 export interface IInsetFunc extends ICssFuncObject
{
    fn: "inset";

    /** First offset value */
    o1: Extended<CssLength>;

    /** First offset value */
    o2?: Extended<CssLength>;

    /** First offset value */
    o3?: Extended<CssLength>;

    /** First offset value */
    o4?: Extended<CssLength>;

    /** Border radius value */
    r?: Extended<BorderRadius>;
}

/**
 * The IInsetBuilder interface extends the [[IInsetFunc]] interface and adds the `round` method that
 * can be called to specify the border radius of the inset rectangle. It is the result of invoking
 * the [[inset]] function.
 * @category Basic Shape
 */
 export interface IInsetBuilder extends IInsetFunc
{
    /** Sets the border radius */
    round( r?: Extended<BorderRadius>): this;
}



/**
 * The ICircleFunc interface represents the data of the CSS circle basic shape. It can be directly
 * assigned to any style property that accepts values of the [[BasicShape]] type (e.g. clip-path).
 * @category Basic Shape
 */
export interface ICircleFunc extends ICssFuncObject
{
    fn: "circle";

    /** Circle's radius. */
    r?: ShapeRadius;

    /** Position of the circle's center. */
    pos?: Extended<CssPosition>;
}

/**
 * The ICircleBuilder interface extends the [[ICircleFunc]] interface and adds the `at` method that
 * can be called to specify the position of the circle's center. It is the result of invoking
 * the [[circle]] function.
 * @category Basic Shape
 */
export interface ICircleBuilder extends ICircleFunc
{
    /** Sets the position of the circle's center. */
    at( pos: Extended<CssPosition>): this;
}



/**
 * The IEllipseFunc interface represents the data of the CSS ellipse basic shape. It can be directly
 * assigned to any style property that accepts values of the [[BasicShape]] type (e.g. clip-path).
 * @category Basic Shape
 */
 export interface IEllipseFunc extends ICssFuncObject
{
    fn: "ellipse";

    /** Ellipses's X-axis radius. */
    rx?: ShapeRadius;

    /** Ellipses's Y-axis radius. */
    ry?: ShapeRadius;

    /** Position of the ellipse's center. */
    pos?: Extended<CssPosition>;
}

/**
 * The IEllipseBuilder interface extends the [[IEllipseFunc]] interface and adds the `at` method that
 * can be called to specify the position of the ellipse's center. It is the result of invoking
 * the [[ellipse]] function.
 * @category Basic Shape
 */
 export interface IEllipseBuilder extends IEllipseFunc
{
    /**
     * Sets the position of the ellipse's center.
     * @param pos Position value.
     */
    at( pos: Extended<CssPosition>): this;
}



/**
 * The IPolygonFunc interface represents the data of the CSS polygon basic shape. It can be directly
 * assigned to any style property that accepts values of the [[BasicShape]] type (e.g. clip-path).
 * @category Basic Shape
 */
 export interface IPolygonFunc extends ICssFuncObject
{
    fn: "polygon";

    /** Polygon points */
    points: CssPoint[];

    /** Poligon filling rule */
    rule?: FillRule;
}

/**
 * The IPolygonBuilder interface extends the [[IPolygonFunc]] interface and adds several methods that
 * allow changing the polygon parameters. It is the result of invoking the [[polygon]] function.
 * @category Basic Shape
 */
 export interface IPolygonBuilder extends IPolygonFunc
{
    /**
     * Adds the given points to the polygon
     * @param points
     */
    add( ...points: CssPoint[]): this;

    /**
     * Sets the filling rule used to determine the inside part of the polygon
     * @param rule
     */
    fill( rule: FillRule): this;
}



/**
 * Defines type of path command parameters, which could be either a single number or an array
 * of numbers.
 */
export type PathCommandParam = number | number[];

/**
 * Defines type used to store a path command. This includes the command name and its parameters.
 */
export type PathCommand = [string, PathCommandParam[]?];

/**
 * The IPathFunc interface represents the data of the CSS path basic shape. It can be directly
 * assigned to any style property that accepts values of the [[BasicShape]] type (e.g. clip-path).
 * @category Basic Shape
 */
export interface IPathFunc extends ICssFuncObject
{
    fn: "path";

    /** Path filling rule */
    rule?: FillRule;

    /** Array of path commands */
    items: PathCommand[];
}

/**
 * The IPathBuilder interface extends the [[IPathFunc]] interface and adds several methods that allow
 * adding path commands. It is the result of invoking the [[path]] function. The methods in this
 * interface mimic the SVG path commands described in MDN:
 * <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands" target="mdn">Path Commands</a>
 * @category Basic Shape
 */
export interface IPathBuilder extends IPathFunc
{
    // Adds the given command and parameters to the path.
    add( command: string, params?: PathCommandParam[]): this

    /** Move-to command with absolute coordinates. */
    M( ...params: [number,number][]): this;

    /** Move-to command with relative coordinates. */
    m( ...params: [number,number][]): this;

    /** Line-to command with absolute coordinates. */
    L( ...params: [number,number][]): this;

    /** Line-to command with relative coordinates. */
    l( ...params: [number,number][]): this;

    /** Horizontal line-to command with absolute coordinates. */
    H( ...params: number[]): this;

    /** Horizontal line-to command with relative coordinates. */
    h( ...params: number[]): this;

    /** Vertical line-to command with absolute coordinates. */
    V( ...params: number[]): this;

    /** Vertical line-to command with relative coordinates. */
    v( ...params: number[]): this;

    /** Cubic bezier curve command with absolute coordinates. */
    C( ...params: [number,number,number,number,number,number][]): this;

    /** Cubic bezier curve command with relative coordinates. */
    c( ...params: [number,number,number,number,number,number][]): this;

    /** Smooth cubic bezier curve command with absolute coordinates. */
    S( ...params: [number,number,number,number][]): this;

    /** Smooth cubic bezier curve command with relative coordinates. */
    s( ...params: [number,number,number,number][]): this;

    /** Quadratic bezier curve command with absolute coordinates. */
    Q( ...params: [number,number,number,number][]): this;

    /** Quadratic bezier curve command with relative coordinates. */
    q( ...params: [number,number,number,number][]): this;

    /** Smooth quadratic bezier curve command with absolute coordinates. */
    T( ...params: [number,number][]): this;

    /** Smooth quadratic bezier curve command with relative coordinates. */
    t( ...params: [number,number][]): this;

    /** Elliptical arc curve command with absolute coordinates. */
    A( ...params: [number,number,number,0|1,0|1,number,number][]): this;

    /** Elliptical arc curve command with relative coordinates. */
    a( ...params: [number,number,number,0|1,0|1,number,number][]): this;

    /** Close-path command. */
    z(): this;
}



/**
 * The BasicShapeType represents an invocation of one the CSS `<basic-shape>` functions such as
 * [[inset]], [[circle]], [[ellipse]], [[polygon]], [[path]].
 */
export type BasicShape = IInsetFunc | ICircleFunc | IEllipseFunc | IPolygonFunc | IPathBuilder;



/**
 * The IRayFunc interface represents the data of the CSS ray function. It can be directly
 * assigned to any style property that accepts the suitable type (e.g. offset-path).
 * @category Basic Shape
*/
export interface IRayFunc extends ICssFuncObject
{
    fn: "ray";

    /** Ray's angle. */
    angle: Extended<CssAngle>;

    /** Ray's size */
    size?: Extended<ExtentKeyword | CssLength>;

    /** Flag determining the presence of the keyword "contain" */
    contain?: boolean;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Grid CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IMinMaxFunc interface represents an invocation of the [[minmax]] function.
 * @category Grid
 */
export interface IMinMaxFunc extends ICssFuncObject
{
    fn: "minmax";

    /** Minimum track size */
    min: GridTrackSize;

    /** Minimum track size */
    max: GridTrackSize;
}



/**
 * The IRepeatFunc interface represents an invocation of the [[repeat]] function.
 * @category Grid
 */
export interface IRepeatFunc extends ICssFuncObject
{
    fn: "repeat";

    /** Number of repetitions */
    count: Extended<CssNumber> | "auto-fill" | "auto-fit";

    /** Array of track definitions */
    tracks: GridTrack[];
}



/**
 * The IGridSpanFunc interface represents a span expression for grid layouts. It is returned from
 * the [[span]] function.
 * @category Grid
 */
export interface IGridSpanFunc extends ICssFuncObject
{
    fn: "span";

    /** First span argument */
    p1: Extended<GridLineCountOrName>;

    /** Second span argument */
    p2?: Extended<GridLineCountOrName>;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Miscellaneous CSS functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IUrlFunc interface represents an invocation of the CSS `url()` function. It is returned from
 * the [[url]] function.
 * @category Miscellaneous
 */
export interface IUrlFunc extends ICssFuncObject
{
    fn: "url";

    /** URL or reference to the ID rule identifying an SVG element */
    p: Extended<string | IIDRule>;
}



/**
 * The ICursorFunc interface represents an invocation of the CSS `url()` function with two optional
 * numbers indicating the cursor's hotspot.
 * @category Miscellaneous
 */
export interface ICursorFunc extends ICssFuncObject
{
    fn: "cursor";

    /** Cursor URL or reference to the ID rule identifying an SVG element */
    url: Extended<string | IIDRule>;

    /** X-coordinate of the cursor hotspot */
    x?: number;

    /** Y-coordinate of the cursor hotspot */
    y?: number;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Animation and transition timing functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for step animation timing function jump-term */
export type TimingFunctionJumpTerm = "jump-start" | "jump-end" | "jump-none" | "jump-both" |
    "start" | "end";

/**
 * The IStepsFunc interface represents an invocation of the CSS `steps()` function. It is returned
 * from the [[steps]] function.
 * @category Transition and Animation
 */
export interface IStepsFunc extends ICssFuncObject
{
    fn: "steps";

    /** Number of stops */
    n: Extended<number>;

    /** Jump term */
    j?: TimingFunctionJumpTerm;
}



/**
 * The ICubicBezierFunc interface represents an invocation of the CSS `cubic-bezier()` function.
 * It is returned from the [[cubicBezier]] function.
 * @category Transition and Animation
 */
export interface ICubicBezierFunc extends ICssFuncObject
{
    fn: "cubic-bezier";

    n1: Extended<number>;
    n2: Extended<number>;
    n3: Extended<number>,
    n4: Extended<number>;
}



