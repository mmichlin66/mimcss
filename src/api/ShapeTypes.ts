/**
 * This module contains definitions of types and interfaces used to define CSS functions.
 * @module
 */



import {Extended, IGenericProxy, OneOrBox, OneOrPair} from "./CoreTypes";
import {
    AngleUnits, CssAngle, CssLength, CssNumber, CssPoint, CssPosition, FrequencyUnits, LengthUnits,
    PercentUnits, ResolutionUnits, TimeUnits
} from "./NumericTypes";
import {CssColor} from "./ColorTypes";



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
 export type CssImage = IUrlProxy | IImageProxy | ILinearGradient | IRadialGradient | IConicGradient;



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
 * The IGradient interface represents the common functionality of CSS gradients.
 * @typeparam T Type of numeric values used for hints and color stops.
 */
export interface IGradient<T extends (CssLength | CssAngle)>
{
    /** Sets the flag indicating whether the gradient is repeating; the default value is true. */
    repeating( flag?: boolean): this;

    /**
     * Adds stops or hints to the gradient definition.
     * @param stopsOrHints Variable argument list specifying stops or hints that will be added to
     * the gradient definition.
     */
    add( ...stopsOrHints: GradientStopOrHint<T>[]): this;
}



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
 * The ILinearGradient interface represents an object that produces either `linear-gradient` or
 * `repeating-linear-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `to` method that can be called to
 * specify the angle of the gradiant.
 */
export interface ILinearGradient extends IGradient<CssLength>
{
    /**
     * Sets the angle at which the linear gradient changes colors
     * @param angle Either an angle value or an indication of side or corner such as `right` or
     * `top left`.
     */
	to( angle: LinearGradientAngle): ILinearGradient;
}



/**
 * The IRadialGradient interface represents an object that produces either `radial-gradient` or
 * `repeating-radial-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `circle`, `ellipse`, `extent` and `at`
 * methods that can be called to specify parameters of the gradiant.
 */
export interface IRadialGradient extends IGradient<CssLength>
{
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
 * The IConicGradient interface represents an object that produces either `conic-gradient` or
 * `repeating-conic-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `from` and `at` methods that can be
 * called to specify the parameters of the gradiant.
 */
export interface IConicGradient extends IGradient<CssAngle>
{
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



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filter and transform CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IFilterProxy interface represents the result of invoking one of the CSS `<filter>` functions.
 */
export interface IFilterProxy extends IGenericProxy<"filter"> {}



/**ITransformProxy
 * The IFilterProxy interface represents the result of invoking one of the CSS `<transform>` functions.
 */
export interface ITransformProxy extends IGenericProxy<"transform"> {}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shape CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/** Type for border-radius style property */
export type BorderRadius = OneOrPair<OneOrBox<CssLength>>;

/**
 * Type that is used to specify a radius in [circle]] and [ellipse]] functions.
 */
export type ShapeRadius = Extended<CssLength | "closest-side" | "farthest-side">;

/** Type for fill-rule style property */
export type FillRule = "nonzero" | "evenodd";



/**
 * The IInset interface represents the CSS `inset` basic shape. It is the result of invoking
 * the [inset]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `round` method that can be called to specify the radii of
 * the inset rectangle's corners.
 */
export interface IInset
{
    round( radius?: Extended<BorderRadius>): this;
}



/**
 * The ICircle interface represents the CSS circle basic shape. It is the result of invoking
 * the [circle]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `at` method that can be called to specify the position of
 * the circle's center.
 */
export interface ICircle
{
    /**
     * Sets the position of the circle's center.
     * @param pos Position value.
     */
    at( pos: Extended<CssPosition>): this;
}



/**
 * The IEllipse interface represents the CSS ellipse basic shape. It is the result of invoking
 * the [ellipse]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `at` method that can be called to specify the position of
 * the ellipse's center.
 */
export interface IEllipse
{
    /**
     * Sets the position of the ellipse's center.
     * @param pos Position value.
     */
    at( pos: Extended<CssPosition>): this;
}



/**
 * The IPolygonProxy interface represents the CSS polygon basic shape. It is the result of invoking
 * the [polygon | polygon]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `fill` method that can be called to specify the fill
 * rule.
 */
export interface IPolygon
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
 * The `IPathBuilder` interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function. The `IPathBuilder` interface is
 * returned from the [[path]] function. The methods in this interface mimic the SVG path commands
 * described in MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands" target="mdn">Path Commands</a>
 */
export interface IPathBuilder
{
    /** Filling rule used to determine the interior of the path */
    readonly rule?: FillRule;

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
    z(): IPathBuilder;
}



/**
 * The BasicShapeType represents an invocation of one the CSS `<basic-shape>` functions such as
 * [[circle]], [[polygon]], [[path]], etc.
 */
export type BasicShape = IInset | ICircle | IEllipse | IPolygon | IPathBuilder;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Grid CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IMinMaxProxy interface represents an invocation of the [[minmax]] function.
 */
export interface IMinMaxProxy extends IGenericProxy<"minmax"> {}

/**
 * The IRepeatProxy interface represents an invocation of the [[repeat]] function.
 */
export interface IRepeatProxy extends IGenericProxy<"repeat"> {}

/**
 * The ISpanProxy interface produces the span expression for grid layouts. It is returned from
 * the [[span]] function.
 */
export interface ISpanProxy extends IGenericProxy<"span"> {}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Miscellaneous CSS functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IUrlFunc interface represents an invocation of the CSS `url()` function.
 */
export interface IUrlProxy extends IGenericProxy<"url"> {}

/**
 * The IRayFunc interface represents an invocation of the CSS `ray()` function.
 */
export interface IRayProxy extends IGenericProxy<"ray"> {}

/**
 * The ICursorFunc interface represents an invocation of the CSS `url()` function with two optional
 * numbers indicating the cursor's hotspot.
 */
export interface ICursorProxy extends IGenericProxy<"cursor"> {}

/**
 * Type representing keywords used to define a type used in the CSS `attr()` function.
 */
 export type AttrTypeKeyword = "string" | "color" | "url" | "integer" | "number" | "length" | "angle" | "time" | "frequency";

 /**
  * Type representing keywords used to define a unit used in the CSS `attr()` function.
  */
 export type AttrUnitKeyword = PercentUnits | LengthUnits | TimeUnits | AngleUnits | ResolutionUnits | FrequencyUnits;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Animation and transition timing functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Type for step animation timing function jump-term */
export type TimingFunctionJumpTerm = "jump-start" | "jump-end" | "jump-none" | "jump-both" | "start" | "end";

/**
 * The ITimingFunctionFunc interface represents an invocation of the CSS `steps()` and
 * `cubic-bezier()` function.
 */
export interface ITimingFunctionProxy extends IGenericProxy<"timing-function"> {}



