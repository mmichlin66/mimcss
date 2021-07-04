/**
 * This module contains definitions of types and interfaces used to define CSS functions.
 * @module
 */



import {CssAngle, CssLength, CssNumber, CssPoint, CssPosition, Extended, ExtentKeyword,IGenericProxy} from "./CoreTypes";
import {BorderRadius_StyleType, FillRule_StyleType} from "./StyleTypes";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Colors.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The INamedColors interface lists the names of standard Web colors. It is needed to allow developers
 * to add new named colors through module augmentation technique.
 */
export interface INamedColors
{
    readonly black:                  number;
    readonly silver:                 number;
    readonly gray:                   number;
    readonly white:                  number;
    readonly maroon:                 number;
    readonly red:                    number;
    readonly purple:                 number;
    readonly fuchsia:                number;
    readonly green:                  number;
    readonly lime:                   number;
    readonly olive:                  number;
    readonly yellow:                 number;
    readonly navy:                   number;
    readonly blue:                   number;
    readonly teal:                   number;
    readonly aqua:                   number;
    readonly orange:                 number;
    readonly aliceblue:              number;
    readonly antiquewhite:           number;
    readonly aquamarine:             number;
    readonly azure:                  number;
    readonly beige:                  number;
    readonly bisque:                 number;
    readonly blanchedalmond:         number;
    readonly blueviolet:             number;
    readonly brown:                  number;
    readonly burlywood:              number;
    readonly cadetblue:              number;
    readonly chartreuse:             number;
    readonly chocolate:              number;
    readonly coral:                  number;
    readonly cornflowerblue:         number;
    readonly cornsilk:               number;
    readonly crimson:                number;
    readonly cyan:                   number;
    readonly darkblue:               number;
    readonly darkcyan:               number;
    readonly darkgoldenrod:          number;
    readonly darkgray:               number;
    readonly darkgreen:              number;
    readonly darkgrey:               number;
    readonly darkkhaki:              number;
    readonly darkmagenta:            number;
    readonly darkolivegreen:         number;
    readonly darkorange:             number;
    readonly darkorchid:             number;
    readonly darkred:                number;
    readonly darksalmon:             number;
    readonly darkseagreen:           number;
    readonly darkslateblue:          number;
    readonly darkslategray:          number;
    readonly darkslategrey:          number;
    readonly darkturquoise:          number;
    readonly darkviolet:             number;
    readonly deeppink:               number;
    readonly deepskyblue:            number;
    readonly dimgray:                number;
    readonly dimgrey:                number;
    readonly dodgerblue:             number;
    readonly firebrick:              number;
    readonly floralwhite:            number;
    readonly forestgreen:            number;
    readonly gainsboro:              number;
    readonly ghostwhite:             number;
    readonly gold:                   number;
    readonly goldenrod:              number;
    readonly greenyellow:            number;
    readonly grey:                   number;
    readonly honeydew:               number;
    readonly hotpink:                number;
    readonly indianred:              number;
    readonly indigo:                 number;
    readonly ivory:                  number;
    readonly khaki:                  number;
    readonly lavender:               number;
    readonly lavenderblush:          number;
    readonly lawngreen:              number;
    readonly lemonchiffon:           number;
    readonly lightblue:              number;
    readonly lightcoral:             number;
    readonly lightcyan:              number;
    readonly lightgoldenrodyellow:   number;
    readonly lightgray:              number;
    readonly lightgreen:             number;
    readonly lightgrey:              number;
    readonly lightpink:              number;
    readonly lightsalmon:            number;
    readonly lightseagreen:          number;
    readonly lightskyblue:           number;
    readonly lightslategray:         number;
    readonly lightslategrey:         number;
    readonly lightsteelblue:         number;
    readonly lightyellow:            number;
    readonly limegreen:              number;
    readonly linen:                  number;
    readonly magenta:                number;
    readonly mediumaquamarine:       number;
    readonly mediumblue:             number;
    readonly mediumorchid:           number;
    readonly mediumpurple:           number;
    readonly mediumseagreen:         number;
    readonly mediumslateblue:        number;
    readonly mediumspringgreen:      number;
    readonly mediumturquoise:        number;
    readonly mediumvioletred:        number;
    readonly midnightblue:           number;
    readonly mintcream:              number;
    readonly mistyrose:              number;
    readonly moccasin:               number;
    readonly navajowhite:            number;
    readonly oldlace:                number;
    readonly olivedrab:              number;
    readonly orangered:              number;
    readonly orchid:                 number;
    readonly palegoldenrod:          number;
    readonly palegreen:              number;
    readonly paleturquoise:          number;
    readonly palevioletred:          number;
    readonly papayawhip:             number;
    readonly peachpuff:              number;
    readonly peru:                   number;
    readonly pink:                   number;
    readonly plum:                   number;
    readonly powderblue:             number;
    readonly rosybrown:              number;
    readonly royalblue:              number;
    readonly saddlebrown:            number;
    readonly salmon:                 number;
    readonly sandybrown:             number;
    readonly seagreen:               number;
    readonly seashell:               number;
    readonly sienna:                 number;
    readonly skyblue:                number;
    readonly slateblue:              number;
    readonly slategray:              number;
    readonly slategrey:              number;
    readonly snow:                   number;
    readonly springgreen:            number;
    readonly steelblue:              number;
    readonly tan:                    number;
    readonly thistle:                number;
    readonly tomato:                 number;
    readonly turquoise:              number;
    readonly violet:                 number;
    readonly wheat:                  number;
    readonly whitesmoke:             number;
    readonly yellowgreen:            number;
    readonly rebeccapurple:          number;
}



/**
 * The IColorProxy interface represents an invocation of one of CSS functions that are used for
 * specifying colors. This interface is returned from functions like: rgb(), alpha(), etc.
 */
export interface IColorProxy extends IGenericProxy<"color"> {};



/**
 * The SystemColors type defines keywords for system colors that are used in forced-color mode
 * (but can be also used in the regular mode).
 */
export type SystemColors = "ActiveText" | "ButtonFace" | "ButtonText" | "Canvas" | "CanvasText" |
    "Field" | "FieldText" | "GrayText" | "Highlight" | "HighlightText" | "LinkText" | "VisitedText";



/**
 * Type for CSS color. Color can be represented using the following types:
 * - keywords: any string that is a name of a property in the [[INamedColors]] interface or of the
 *   [[SystemColors]] type.
 * - number:
 *   - negative numbers are treated as inverted colors.
 *   - integer part of the number must be less than or equal to 0xFFFFFF - everything else is
 *     ignored.
 *   - floating point part of the number is treated as percents of alpha channel. If there is no
 *     floating part, alpha is 1.
 * - functions: [[rgb]], [[hsl]], [[alpha]] as well as any function that returns the IColorProxy type.
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // using string value and numeric value of Web colors
 *     cls1 = css.$class({ color: "red", backgroundColor: css.Colors.yellow })
 *
 *     // using string value of a system color
 *     cls2 = css.$class({ color: "LinkText" })
 *
 *     // using numeric value
 *     cls3 = css.$class({ color: 0xCCCCCC })
 *
 *     // using numeric value with fractional part for alpha
 *     cls4 = css.$class({ color: 0x123456 + 0.4 })
 *
 *     // using negative numeric value for inverted color
 *     cls5 = css.$class({ color: -0x123456 })
 *
 *     // using negative numeric value with fractional part for inverted color with alpha
 *     cls6 = css.$class({ color: -(0x123456 + 0.4) })
 *
 *     // using the `alpha()` function with named color
 *     cls7 = css.$class({ color: css.alpha( "red", 0.4) })
 *
 *     // using the `rgb()` function
 *     cls8 = css.$class({ color: css.rgb( 256, 0, 128) })
 *
 *     // using the `hsl()` function
 *     cls9 = css.$class({ color: css.hsl( 200, 90, 52) })
 * }
 * ```
 */
export type CssColor = "transparent" | "currentcolor" | keyof INamedColors | number | IColorProxy | SystemColors;

/**
 * Type for CSS color that exclude numeric color representation. Color can be represented using
 * the following types:
 * - keywords: any string that is a name of a property in the [[INamedColors]] interface or of the
 *   [[SystemColors]] type.
 * - functions: [[rgb]], [[hsl]], [[alpha]] as well as any function that returns the IColorProxy type.
 *
 * Non-numeric representation of color is sometimes required where it can conflict with numeric
 * representations of other style properties. For example, the `border` property allows specifying
 * border width, style and color in any order. In this case a numeric representation of color could
 * come into conflict with a numeric representation of width. Therefore, for the `border` property,
 * only non-numeric color representation is allowed.
 */
// export type CssNonNumericColor = Exclude<CssColor,number>;
export type CssNonNumericColor = "transparent" | "currentcolor" | keyof INamedColors | IColorProxy | SystemColors;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Image and gradient CSS functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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
 export type CssImage = IUrlFunc | IImageProxy | ILinearGradient | IRadialGradient | IConicGradient;



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

/**
 * The IInset interface represents the CSS `inset` basic shape. It is the result of invoking
 * the [[ExtraAPI.inset]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `round` method that can be called to specify the radii of
 * the inset rectangle's corners.
 */
export interface IInset
{
    round( radius?: Extended<BorderRadius_StyleType>): this;
}



/**
 * Type that is used to specify a radius in [[ExtraAPI.circle]] and [[ExtraAPI.ellipse]] functions.
 */
export type ShapeRadius = Extended<CssLength | "closest-side" | "farthest-side">;



/**
 * The ICircle interface represents the CSS circle basic shape. It is the result of invoking
 * the [[ExtraAPI.circle]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `at` method that can be called to specify the position of
 * the circle's center.
 */
export interface ICircle
{
    at( pos: Extended<CssPosition>): this;
}



/**
 * The IEllipse interface represents the CSS ellipse basic shape. It is the result of invoking
 * the [[ExtraAPI.ellipse]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `at` method that can be called to specify the position of
 * the ellipse's center.
 */
export interface IEllipse
{
    at( pos: Extended<CssPosition>): this;
}



/**
 * The IPolygonProxy interface represents the CSS polygon basic shape. It is the result of invoking
 * the [[ExtraAPI.polygon]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `fill` method that can be called to specify the fill
 * rule.
 */
export interface IPolygon
{
    add( ...points: CssPoint[]): this;
    fill( rule: FillRule_StyleType): this;
}



/**
 * The `IPathBuilder` interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function. The `IPathBuilder` interface is
 * returned from the [[path]] function.
 */
export interface IPathBuilder
{
    /** Filling rule used to determine the interior of the path */
    readonly rule?: FillRule_StyleType;

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
export interface IUrlFunc extends IGenericProxy<"url"> {}

/**
 * The IRayFunc interface represents an invocation of the CSS `ray()` function.
 */
export interface IRayFunc extends IGenericProxy<"ray"> {}

/**
 * The ICursorFunc interface represents an invocation of the CSS `url()` function with two optional
 * numbers indicating the cursor's hotspot.
 */
export interface ICursorFunc extends IGenericProxy<"cursor"> {}



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
export interface ITimingFunctionFunc extends IGenericProxy<"timing-function"> {}



