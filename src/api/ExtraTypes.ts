import {
    CssAngle, CssLength, CssNumber, CssPercent, CssPosition, Extended, ExtentKeyword,
    IGenericProxy
} from "./CoreTypes";
import {BorderRadius_StyleType, FillRule_StyleType} from "./StyleTypes";
import {IIDRule} from "./RuleTypes";
import {CssFunc} from "../impl/CoreFuncs";



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
 export type CssImage = UrlFunc | IImageProxy;



 /**
 * Type representing either color stop or color hint for the `<gradient>` CSS functions. Color
 * stop is represented by either a simple color value or a two-to-three element tuple. In this
 * tuple, the first item is the color value, the second item is the distance/angle of where the
 * color starts and the optional third item is the distance/angle where the color stops.
 *
 * Hint value is expressed as a single-item array that contains a single CSS numeric value.
 * Although hint is a single number, it must be enclosedin an array to distinguish it from color
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
export type LinearGradSideOrCorner = "bottom" | "left" | "top" | "right" |
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
export type LinearGradAngle = Extended<CssAngle> | LinearGradSideOrCorner;



/**
 * The ILinearGradient interface represents a function that produces either `linear-gradient` or
 * `repeating-linear-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `to` method that can be called to
 * specify the angle of the gradiant.
 */
export interface ILinearGradient extends IImageProxy
{
	to( angle: LinearGradAngle): IImageProxy;
}



/**
 * The IRadialGradient interface represents a function that produces either `radial-gradient` or
 * `repeating-radial-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `circle`, `ellipse`, `extent` and `at`
 * methods that can be called to specify parameters of the gradiant.
 */
export interface IRadialGradient extends IImageProxy
{
	circle( sizeOrExtent?: Extended<CssLength> | Extended<ExtentKeyword>): IRadialGradient;
	ellipse( sizeOrExtent?: [Extended<CssLength>, Extended<CssLength>] | Extended<ExtentKeyword>): IRadialGradient;
	extent( extent: Extended<ExtentKeyword>): IRadialGradient;
	at( pos: Extended<CssPosition>): IRadialGradient;
}



/**
 * The IConicGradient interface represents a function that produces either `conic-gradient` or
 * `repeating-conic-gradient` CSS function. It can be directly assigned to a suitable style
 * property (e.g. background-image). In addition it has the `from` and `at` methods that can be
 * called to specify the parameters of the gradiant.
 */
export interface IConicGradient extends IImageProxy
{
	from( angle: Extended<CssAngle>): IConicGradient;
	at( pos: Extended<CssPosition>): IConicGradient;
}



/**
 * Type representing parameters for the [[crossFade]] function.
 */
export type CrossFadeParam = Extended<CssImage> | [Extended<CssImage>, Extended<CssNumber>];



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filter CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/** Names of filter functions with a single percent parameter */
export type FilterPercentFuncNames = "brightness" | "contrast" | "grayscale" | "invert" |
    "opacity" | "saturate" | "sepia";

/**
 * Object representing CSS functions that accept a percent value and can be used for `filter`
 * style property.
 */
export class FilterPercentFunc extends CssFunc
{
    /** Function name */
    fn: FilterPercentFuncNames;
    /** Percent value */
    p: Extended<CssPercent>;

    constructor( fn: FilterPercentFuncNames, p: Extended<CssPercent>)
    {
        super();
        this.fn = fn; this.p = p;
    }

    public get name(): string { return this.fn; }
}



/**
 * Object representing `blur()` CSS function that can be used for `filter` style property.
 */
export class BlurFunc extends CssFunc
{
    /** Blur radius */
    r: Extended<CssLength>;

    constructor( r: Extended<CssLength>)
    {
        super();
        this.r = r;
    }
}



/**
 * Object representing `drop-shadow()` CSS function that can be used for `filter` style property.
 */
export class DropShadowFunc extends CssFunc
{
    /** Size along the X axis */
    x: Extended<CssLength>;
    /** Size along the Y axis */
    y: Extended<CssLength>;
    /** Shadow color */
    color?: Extended<CssColor>;
    /** Blur radius */
    blur?: Extended<CssLength>;

    constructor( x: Extended<CssLength>, y: Extended<CssLength>, color?: Extended<CssColor>,
        blur?: Extended<CssLength>)
    {
        super();
        this.x = x; this.y = y; this.color = color; this.blur = blur;
    }
}



/**
 * Object representing the `hue-rotate()` CSS function that can be used for `filter` style property.
 */
export class HueRotateFunc extends CssFunc
{
    /** Rotation angle */
    a: Extended<CssAngle>;

    constructor( a: Extended<CssAngle>)
    {
        super();
        this.a = a;
    }
}



/**
 * Type representing CSS `<filter>` functions accepted by the `filter` style property
 */
export type FilterFunc = FilterPercentFunc | BlurFunc | DropShadowFunc | HueRotateFunc;



 ///////////////////////////////////////////////////////////////////////////////////////////////
 //
 // Transform CSS functions
 //
 ///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Object representing matrix CSS function that can be used for `transform` property.
 */
export class MatrixFunc extends CssFunc
{
    a: Extended<CssNumber>; b: Extended<CssNumber>; c: Extended<CssNumber>; d: Extended<CssNumber>;
    tx: Extended<CssNumber>; ty: Extended<CssNumber>;

    constructor(a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>, d: Extended<CssNumber>,
        tx: Extended<CssNumber>, ty: Extended<CssNumber>)
    {
        super(),
        this.a = a; this.b = b; this.c = c; this.d = d; this.tx = tx; this.ty = ty;
    }
}

/**
 * Object representing matrix3d CSS function that can be used for `transform` property.
 */
export class Matrix3dFunc extends CssFunc
{
    a1: Extended<CssNumber>; b1: Extended<CssNumber>; c1: Extended<CssNumber>; d1: Extended<CssNumber>;
    a2: Extended<CssNumber>; b2: Extended<CssNumber>; c2: Extended<CssNumber>; d2: Extended<CssNumber>;
    a3: Extended<CssNumber>; b3: Extended<CssNumber>; c3: Extended<CssNumber>; d3: Extended<CssNumber>;
    a4: Extended<CssNumber>; b4: Extended<CssNumber>; c4: Extended<CssNumber>; d4: Extended<CssNumber>;

    constructor(
        a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
        a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
        a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
        a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>)
    {
        super();
        this.a1 = a1; this.b1 = b1; this.c1 = c1; this.d1 = d1;
        this.a2 = a2; this.b2 = b2; this.c2 = c2; this.d2 = d2;
        this.a3 = a3; this.b3 = b3; this.c3 = c3; this.d3 = d3;
        this.a4 = a4; this.b4 = b4; this.c4 = c4; this.d4 = d4;
    }
}



/**
 * Object representing `perspective()` CSS function that can be used for `transform` property.
 */
export class PerspectiveFunc extends CssFunc
{
    /** Distance */
    d: Extended<CssLength>;

    constructor( d: Extended<CssLength>)
    {
        super();
        this.d = d;
    }
}



/**
 * Object representing single-dimensional `rotate()` CSS function as well as `rotateX()`,
 * `rotateY()` and `rotateZ()` functions that can be used for `transform` property.
 */
export class RotateFunc extends CssFunc
{
    /** Rotation angle */
    a: Extended<CssAngle>;
    /** Direction of rotation determining function name */
    d?: "X" | "Y" | "Z";

    constructor( a: Extended<CssAngle>, d?: "X" | "Y" | "Z")
    {
        super();
        this.a = a; this.d = d;
    }

    public get name(): string { return `rotate${this.d ?? ""}`; }
}

/**
 * Object representing three-dimensional `rotate3d()` CSS function that can be used for `transform` property.
 */
export class Rotate3dFunc extends CssFunc
{
    /** Rotation axis compnent along the X axis */
    x: Extended<CssNumber>;
    /** Rotation axis compnent along the Y axis */
    y?: Extended<CssNumber>;
    /** Rotation axis compnent along the Z axis */
    z: Extended<CssNumber>;
    /** Rotation angle */
    a: Extended<CssAngle>;

    constructor( x: Extended<CssNumber>, y: Extended<CssNumber>, z: Extended<CssNumber>, a: Extended<CssAngle>)
    {
        super();
        this.x = x; this.y = y; this.z = z; this.a = a;
    }
}



/**
 * Object representing single-dimensional `scaleX()` or `scaleY()` or `scaleZ()` CSS function that
 * can be used for `transform` property.
 */
export class Scale1dFunc extends CssFunc
{
    /** Scale factor along one of the axis */
    s: Extended<CssNumber>;
    /** Direction of scaling determining function name */
    d: "X" | "Y" | "Z";

    constructor( s: Extended<CssNumber>, d: "X" | "Y" | "Z")
    {
        super();
        this.s = s; this.d = d;
    }

    public get name(): string { return `scale${this.d}`; }
}

/**
 * Object representing two-dimensional `scale()` CSS function that can be used for `transform`
 * property.
 */
export class ScaleFunc extends CssFunc
{
    /** Scale factor along the X axis */
    sx: Extended<CssNumber>;
    /** Scale factor along the Y axis */
    sy?: Extended<CssNumber>;

    constructor( sx: Extended<CssNumber>, sy: Extended<CssNumber>)
    {
        super();
        this.sx = sx; this.sy = sy;
    }
}

/**
 * Object representing three-dimensional `scale3d()` CSS function that can be used for `transform`
 * property.
 */
export class Scale3dFunc extends CssFunc
{
    /** Scale factor along the X axis */
    sx: Extended<CssNumber>;
    /** Scale factor along the Y axis */
    sy?: Extended<CssNumber>;
    /** Scale factor along the Z axis */
    sz: Extended<CssNumber>;

    constructor( sx: Extended<CssNumber>, sy: Extended<CssNumber>, sz: Extended<CssNumber>)
    {
        super();
        this.sx = sx; this.sy = sy; this.sz = sz;
    }
}



/**
 * Object representing single-dimensional `skewX()` or `skewY()` CSS function that can be used
 * for `transform` property.
 */
export class Skew1dFunc extends CssFunc
{
    /** Angle along one of the axis */
    a: Extended<CssAngle>;
    /** Direction of skewing determining function name */
    d: "X" | "Y";

    constructor( a: Extended<CssAngle>, d: "X" | "Y")
    {
        super();
        this.a = a; this.d = d;
    }

    public get name(): string { return `skew${this.d}`; }
}

/**
 * Object representing two-dimensional `skew()` CSS function that can be used for `transform` property.
 */
 export class SkewFunc extends CssFunc
 {
    /** Angle along the X axis */
    ax: Extended<CssAngle>;
    /** Angle along the Y axis */
    ay?: Extended<CssAngle>;

    constructor( ax: Extended<CssAngle>, ay: Extended<CssAngle>)
    {
        super();
        this.ax = ax; this.ay = ay;
    }
}



/**
 * Object representing single-dimensional `translateX()` or `translateY()` or `translateZ()` CSS
 * function that can be used for `transform` property.
 */
export class Translate1dFunc extends CssFunc
{
    /** Offset along one of the axis */
    l?: Extended<CssLength>;
    /** Direction of translation determining function name */
    d: "X" | "Y" | "Z";

    constructor( l: Extended<CssLength>, d: "X" | "Y" | "Z")
    {
        super();
        this.l = l; this.d = d;
    }

    public get name(): string { return `translate${this.d}`; }
}

/**
 * Object representing two-dimensional `translate()` CSS function that can be used for `transform` property.
 */
export class TranslateFunc extends CssFunc
{
    /** Offset along the X axis */
    x: Extended<CssLength>;
    /** Offset along the Y axis */
    y?: Extended<CssLength>;

    constructor( x: Extended<CssLength>, y?: Extended<CssLength>)
    {
        super();
        this.x = x; this.y = y;
    }
}

/**
 * Object representing three-dimensional `translate3d()` CSS function that can be used for `transform` property.
 */
export class Translate3dFunc extends CssFunc
{
    /** Offset along the X axis */
    x: Extended<CssLength>;
    /** Offset along the Y axis */
    y?: Extended<CssLength>;
    /** Offset along the Z axis */
    z: Extended<CssLength>;

    constructor( x: Extended<CssLength>, y: Extended<CssLength>, z: Extended<CssLength>)
    {
        super();
        this.x = x; this.y = y; this.z = z;
    }
}



/**
 * Type representing CSS `<transform>` functions accepted by the `transform` style property
 */
export type TransformFunc =
    MatrixFunc | Matrix3dFunc | PerspectiveFunc |
    RotateFunc | Rotate3dFunc |
    Scale1dFunc | ScaleFunc | Scale3dFunc |
    Skew1dFunc | SkewFunc |
    Translate1dFunc | TranslateFunc | Translate3dFunc;



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shape CSS functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The IInsetProxy interface represents the CSS inset basic shape. It is the result of invoking
 * the [[inset]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `round` method that can be called to specify the radii of
 * the inset rectangle's corners.
 */
export interface IInsetProxy extends IBasicShapeProxy
{
    round( radius?: Extended<BorderRadius_StyleType>): IBasicShapeProxy;
}



/**
 * Type that is used to specify a radius in [[circle]] and [[ellipse]] functions.
 */
export type ShapeRadius = Extended<CssLength | "closest-side" | "farthest-side">;



/**
 * The ICircleProxy interface represents the CSS circle basic shape. It is the result of invoking
 * the [[circle]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `at` method that can be called to specify the position of
 * the circle's center.
 */
export interface ICircleProxy extends IBasicShapeProxy
{
    at( pos: Extended<CssPosition>): IBasicShapeProxy;
}



/**
 * The IEllipseProxy interface represents the CSS ellipse basic shape. It is the result of invoking
 * the [[ellipse]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `at` method that can be called to specify the position of
 * the ellipse's center.
 */
export interface IEllipseProxy extends IBasicShapeProxy
{
    at( pos: Extended<CssPosition>): IBasicShapeProxy;
}



/**
 * The IPolygonProxy interface represents the CSS polygon basic shape. It is the result of invoking
 * the [[polygon]] function and it can be directly assigned to a suitable style property (e.g.
 * clip-path). In addition it has the `fill` method that can be called to specify the fill
 * rule.
 */
export interface IPolygonProxy extends IBasicShapeProxy
{
    fill( rule: FillRule_StyleType): IBasicShapeProxy;
}

/**
 * The IBasicShapeProxy interface represents an invocation of one the CSS `<basic-shape>`
 * functions, for example, [[circle]], [[polygon]], etc. (except the [[path]] function).
 */
export interface IBasicShapeProxy extends IGenericProxy<"basic-shape"> {};



/**
 * The BasicShapeType represents an invocation of one the CSS `<basic-shape>` functions such as
 * [[circle]], [[polygon]], [[path]], etc.
 */
export type BasicShape = IBasicShapeProxy | IPathBuilder;



/**
 * The `IPathBuilder` interface represents the object that accumulates path commands that are then
 * converted to a string parameter of the CSS `path()` function. The `IPathBuilder` interface is
 * returned from the [[path]] function.
 */
export interface IPathBuilder
{
    /** Move-to command with absolute coordinates. */
    M( first: [number,number], ...next: [number,number][]): IPathBuilder;

    /** Move-to command with relative coordinates. */
    m( first: [number,number], ...next: [number,number][]): IPathBuilder;

    /** Line-to command with absolute coordinates. */
    L( first: [number,number], ...next: [number,number][]): IPathBuilder;

    /** Line-to command with relative coordinates. */
    l( first: [number,number], ...next: [number,number][]): IPathBuilder;

    /** Horizontal line-to command with absolute coordinates. */
    H( first: number, ...next: number[]): IPathBuilder;

    /** Horizontal line-to command with relative coordinates. */
    h( first: number, ...next: number[]): IPathBuilder;

    /** Vertical line-to command with absolute coordinates. */
    V( first: number, ...next: number[]): IPathBuilder;

    /** Vertical line-to command with relative coordinates. */
    v( first: number, ...next: number[]): IPathBuilder;

    /** Cubic bezier curve command with absolute coordinates. */
    C( first: [number,number,number,number,number,number],
        ...next: [number,number,number,number,number,number][]): IPathBuilder;

    /** Cubic bezier curve command with relative coordinates. */
    c( first: [number,number,number,number,number,number],
        ...next: [number,number,number,number,number,number][]): IPathBuilder;

    /** Smooth cubic bezier curve command with absolute coordinates. */
    S( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    /** Smooth cubic bezier curve command with relative coordinates. */
    s( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    /** Quadratic bezier curve command with absolute coordinates. */
    Q( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    /** Quadratic bezier curve command with relative coordinates. */
    q( first: [number,number,number,number], ...next: [number,number,number,number][]): IPathBuilder;

    /** Smooth quadratic bezier curve command with absolute coordinates. */
    T( first: [number,number], ...next: [number,number][]): IPathBuilder;

    /** Smooth quadratic bezier curve command with relative coordinates. */
    t( first: [number,number], ...next: [number,number][]): IPathBuilder;

    /** Elliptical arc curve command with absolute coordinates. */
    A( first: [number,number,number,0|1,0|1,number,number],
        ...next: [number,number,number,0|1,0|1,number,number][]): IPathBuilder;

    /** Elliptical arc curve command with relative coordinates. */
    a( first: [number,number,number,0|1,0|1,number,number],
        ...next: [number,number,number,0|1,0|1,number,number][]): IPathBuilder;

    /** Close-path command. */
    z(): IPathBuilder;
}



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
 * The UrlFunc class represents an invocation of the CSS `url()` function.
 */
export class UrlFunc extends CssFunc
{
    /**
     * Parameter of the `url()` function. It can be specified as a string or as an [[IIDRule]]
     * object. In the latter case, the identifier name will be prefixed with the pund sign, for
     * example: `url(#svgID)`.
     */
    public p: Extended<string | IIDRule>;

    constructor( p: Extended<string | IIDRule>)
    {
        super();
        this.p = p;
    }
}



/**
 * The RayFunc object represents an invocation of the CSS `ray()` function.
 */
 export class RayFunc extends CssFunc
 {
     /** Ray's angle */
     angle: Extended<CssAngle>;
     /** Ray's length */
     size?: Extended<ExtentKeyword | CssLength>;
     /** Ray's contain flag */
     contain?: boolean

     constructor( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>, contain?: boolean)
     {
         super();
         this.angle = angle; this.size = size; this.contain = contain;
     }
 }



