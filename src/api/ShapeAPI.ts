import {CssImage, Extended, ExtentKeyword} from "./CoreTypes";
import {BorderRadius, CssAngle, CssLength, CssNumber, CssPercent, CssPoint, CssPosition} from "./NumericTypes";
import {CssColor} from "./ColorTypes";
import {
    GradientStopOrHint, LinearGradientAngle, ShapeRadius, IMinMaxFunc, IPathBuilder,
    IRepeatFunc, IGridSpanFunc, FillRule, ICircleBuilder, IEllipseBuilder,
    IInsetBuilder, IPolygonBuilder, PathCommand, PathCommandParam, IRayFunc,
    PercentFilterNames, IPercentFilterFunc, IBlurFunc, IDropShadowFunc, IHueRotateFunc, IMatrixFunc,
    IMatrix3dFunc, IPerspectiveFunc, IRotateFunc, IRotate3dFunc, IScale1dFunc, IScaleFunc, IScale3dFunc,
    ISkewFunc, ISkew1dFunc, ITranslate1dFunc, ITranslate3dFunc, ITranslateFunc, ILinearGradientBuilder,
    ILinearGradientFunc, IRadialGradientBuilder, IRadialGradientFunc, IConicGradientBuilder,
    IConicGradientFunc, IGradientBuilder, IGradientFunc, ICrossFadeBuilder, ICrossFadeFunc, IImageSetFunc,
    ImageSetItem, ImageSetResolution, IPaintWorklets, IPaintFunc
} from "./ShapeTypes";
import {GridLineCountOrName, GridTrack, GridTrackSize} from "./StyleTypes";
import {mv2s, WKF, v2s, wkf, a2s, fdo, f2s} from "../impl/Utils";
import { MappedSyntaxTypes } from "./Stylesets";
import { sp2s } from "../impl/StyleImpl";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Images and gradients.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

const gradientNameToString = (val: IGradientFunc<any>): string => `${val.repeat ? "repeating-" : ""}${val.fn}`;

const gradientStopsOrHintsToString = (val: GradientStopOrHint<any>[], math: WKF.Length | WKF.Angle): string =>
    v2s( val, {
        item: {
            num: WKF.Color,
            arr: { 1: [math], any: [WKF.Color, math, math] }
        },
        sep: ","
    });



/**
 * Function returning the ILinearGradientBuilder interface representing the `linear-gradient` CSS functions.
 *
 * **Examples:**
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
export const linearGradient = (...stops: GradientStopOrHint<CssLength>[]): ILinearGradientBuilder =>
    new LinearGradientBuilder( stops);

fdo["linear-gradient"] = {
    fn: gradientNameToString,
    f: (val: ILinearGradientFunc) => mv2s([
        v2s( val.angle, {num: WKF.Angle, str: v => "to " + v}),
        gradientStopsOrHintsToString( val.stops, WKF.Length)
    ], ",")
}



/**
 * Function returning the IRadialGradient interface representing the `radial-gradient` CSS functions.
 *
 * **Examples:**
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
export const radialGradient = (...stops: GradientStopOrHint<CssLength>[]): IRadialGradientBuilder =>
    new RadialGradientBuilder( stops);

fdo["radial-gradient"] = {
    fn: gradientNameToString,
    f: (val: IRadialGradientFunc) => mv2s([
        mv2s([ val.shape, [val.size, WKF.MultiLengthWithSpace], [val.pos, WKF.AtPosition] ]),
        gradientStopsOrHintsToString( val.stops, WKF.Length)
    ], ",")
};



/**
 * Function returning the IConicGradient interface representing the `radial-gradient` CSS functions.
 *
 * **Examples:**
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
export const conicGradient = (...stops: GradientStopOrHint<CssAngle>[]): IConicGradientBuilder =>
    new ConicGradientBuilder( stops);

fdo["conic-gradient"] = {
    fn: gradientNameToString,
    f: (val: IConicGradientFunc) => mv2s([
        mv2s([ [val.angle, (v: Extended<CssAngle>) => "from " + v2s( v, WKF.Angle)], [val.pos, WKF.AtPosition] ]),
        gradientStopsOrHintsToString( val.stops, WKF.Angle)
    ], ",")
};



/**
 * Base class for gradient implementation
 */
abstract class GradientBuilder<T extends (CssLength | CssAngle)> implements IGradientBuilder<T>
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
class LinearGradientBuilder extends GradientBuilder<CssLength> implements ILinearGradientBuilder
{
    fn: "linear-gradient" = "linear-gradient";

    angle?: LinearGradientAngle;

    public to( angle?: LinearGradientAngle): this { this.angle = angle; return this; }
}



/**
 * Implements functionality of radial gradients
 */
class RadialGradientBuilder extends GradientBuilder<CssLength> implements IRadialGradientBuilder
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
        this.size =
            params.length === 1 ? params[0] as Extended<ExtentKeyword> :
            params.length === 2 ? [params[0] as Extended<CssLength>, params[1] as Extended<CssLength>] :
            undefined;

        return this;
    }


	public extent( extent: Extended<ExtentKeyword>): this { this.size = extent; return this; }
	public at( pos: Extended<CssPosition>): this { this.pos = pos; return this; }
}



/**
 * Implements functionality of conic gradients
 */
class ConicGradientBuilder extends GradientBuilder<CssAngle> implements IConicGradientBuilder
{
    fn: "conic-gradient" = "conic-gradient";

    angle?: Extended<CssAngle>;
    pos?: Extended<CssPosition>;

	public from( angle?: Extended<CssAngle>): this { this.angle = angle; return this; }
	public at( pos?: Extended<CssPosition>): this { this.pos = pos; return this; }
}



/**
 * Function returning the ICrossFadeFunc interface representing the "older" `cross-fade` CSS
 * function invocation that accepts two images and a single percentage.
 *
 * @category Image
 */
export function crossFade( old: [Extended<CssImage>, Extended<CssImage>, Extended<CssPercent>]): ICrossFadeFunc;

/**
 * Function returning the ICrossFadeFunc interface representing the "newer" `cross-fade` CSS
 * function invocation that accepts multiple images - each with an optional percentage.
 *
 * @category Image
 */
export function crossFade( ...images: (Extended<CssImage> | [Extended<CssImage>, Extended<CssPercent>])[]): ICrossFadeBuilder;

// Implementation
export function crossFade(): ICrossFadeBuilder
{
    return new CrossFadeBuilder( ...arguments);
}

/**
 * Implements functionality of cross-fade()
 */
class CrossFadeBuilder implements ICrossFadeBuilder
{
    fn: "cross-fade" = "cross-fade";

    old?: [Extended<CssImage>, Extended<CssImage>, Extended<CssPercent>];
    images?: [Extended<CssImage>, Extended<CssPercent>?][];
    c?: Extended<CssColor>;

    // constructor for old function signature
	constructor( old: [Extended<CssImage>, Extended<CssImage>, Extended<CssPercent>]);

    // constructor for new function signature
	constructor( ...images: (Extended<CssImage> | [Extended<CssImage>, Extended<CssPercent>])[]);

	constructor()
    {
        let p1 = arguments[0];
        if (Array.isArray( p1) && p1.length === 3)
        {
            // this is the old signature
            this.old = p1 as [Extended<CssImage>, Extended<CssImage>, Extended<CssPercent>];
        }
        else
        {
            // this is the new signature
            this.add( ...arguments);
        }
    }

	add( ...images: (Extended<CssImage> | [Extended<CssImage>, Extended<CssPercent>])[]): this
    {
        if (!this.images)
            this.images = [];

        for( let item of images)
            this.images.push( Array.isArray(item) ? item : [item]);

        return this;
    }

	color( c: Extended<CssColor>): this { this.c = c; return this; }
}

fdo["cross-fade"] = (val: ICrossFadeFunc): string =>
    f2s( "cross-fade", [
        val.images
            ? mv2s( [[val.images, { item: { arr: [WKF.Default, WKF.Percent] }, sep: "," }], [val.c, WKF.Color]], ",")
            : v2s( val.old, { arr: [WKF.Default, WKF.Default, WKF.Percent], sep: "," })
    ])



/**
 * Returns an IImageSetFunc object representing the `image-set()` CSS function.
 *
 * @param items One or more items specifying an image and optionally image type and resolution.
 * @returns
 *
 * @category Image
 */
export const imageSet = (...items: ImageSetItem[]): IImageSetFunc => ({ fn: "image-set", items })

const imageTypeToString = (val: Extended<string>): string => v2s( val, {
    str: v => `type("${v.indexOf("/") > 0 ? val : "image/" + val}")`
});

const imageResolutionToString = (val: Extended<ImageSetResolution>): string => v2s( val, {
    num: v => v + "x"
});

fdo["image-set"] = [
    [
        "items", {
            item: {
                str: WKF.Quoted,
                arr: {
                    1: [WKF.Quoted],
                    2: [WKF.Quoted, {str: imageTypeToString, num: imageResolutionToString}],
                    3: [WKF.Quoted, imageTypeToString, imageResolutionToString],
                }
            },
            sep: ","
        }
    ]
]



/**
 * Registers a paint worklet with the given name, optional argument syntax and optional URL of
 * the worklet module. The worklet name should have been added to the [[IPaintWorklets]] interface
 * using the module augmentation technique. Although it is possible to use paint worklets without
 * adding them to the [[IPaintWorklets]] interface, this will prevent Mimcss from enforcing the
 * types of arguments when the [[paint]] function is invoked.
 * @param name Worklet name
 * @param syntax Tuple containing syntax definitions for worklet arguments.
 * @param url URL to the worklet module. If specified, the module will be automatically added.
 *
 * @category Image
 */
export const registerPaintWorklet = async <K extends keyof IPaintWorklets>( name: K,
    syntax: IPaintWorklets[K] = [], url?: string): Promise<void> =>
{
    if ((CSS as any).paintWorklet)
    {
        if (!registeredPaintWorkletInfos[name])
        {
            registeredPaintWorkletInfos[name] = {syntax, url};

            // if URL is specified use it to add worklet module
            if (url && !addedPaintWorkletModules.has(url))
            {
                addedPaintWorkletModules.add(url);
                try
                {
                    await (CSS as any).paintWorklet.addModule( url);
                }
                catch(x)
                {
                    console.error( `Error adding module '${url}' for paint worklet '${name}'`, x)
                }
            }
        }
    }
}

/**
 * Defines information we keep for registered paint worklets.
 */
type PaintWorkletInfo<K extends keyof IPaintWorklets> = { syntax: IPaintWorklets[K], url?: string };

/**
 * Information about registered paint worklets.
 */
let registeredPaintWorkletInfos: { [K in keyof IPaintWorklets]?: PaintWorkletInfo<K> } = {};

/**
 * Set of URLs of already added paint worklet modules.
 */
let addedPaintWorkletModules = new Set<string>();



/**
 * Returns the IPaintFunc object describing an invocation of the `paint()` CSS function.
 *
 * @param name Paint worklet name.
 * @param args Parameters to be passed to the paint worklet.
 *
 * @category Image
 *
 * @ts-expect-error: Erroneously reports TS2370 although the rest's type is an array (a tuple) */
export const paint = <K extends keyof IPaintWorklets>( name: K, ...args: MappedSyntaxTypes<IPaintWorklets[K]>): IPaintFunc =>
    ({ fn: "paint", name: name as string, args: args as any as string[] })

fdo["paint"] = (v: IPaintFunc): string =>
{
    if (!v?.args?.length)
        return `paint(${v.name})`;

    let info = registeredPaintWorkletInfos[v.name];
    let buf: string[] = [];
    for( let i = 0; i < v.args.length; i++)
    {
        let syntax = info?.syntax[i];
        buf.push( syntax ? sp2s( syntax, v.args[i]) : v2s( v.args[i]));
    }

    return `paint(${v.name},${buf.filter(v=>!!v).join(",")})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IFilterProxy function representing one of the filter CSS function.
 */
const filterPercent = (fn: PercentFilterNames, p: Extended<CssPercent>): IPercentFilterFunc => ({ fn, p });



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
export const brightness = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "brightness", p);



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
export const contrast = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "contrast", p);



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
export const grayscale = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "grayscale", p);



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
export const invert = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "invert", p);



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
export const opacity = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "opacity", p);



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
export const saturate = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "saturate", p);



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
export const sepia = (p: Extended<CssPercent>): IPercentFilterFunc => filterPercent( "sepia", p);

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
export const blur = ( r: Extended<CssLength>): IBlurFunc => ({ fn: "blur", r });

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
export const dropShadow = (x: Extended<CssLength>, y: Extended<CssLength>,
    color?: Extended<CssColor>, blur?: Extended<CssLength>): IDropShadowFunc => ({ fn: "drop-shadow", x, y, color, blur });

fdo["drop-shadow"] = {
    p: [ "x", "y", "blur", ["color", WKF.Color] ],
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
export const hueRotate = (a: Extended<CssAngle>): IHueRotateFunc => ({ fn: "hue-rotate", a });

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
export const matrix = (a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): IMatrixFunc =>
    ({fn: "matrix", a, b, c, d, tx, ty });

fdo.matrix = [ "a", "b", "c", "d", "tx", "ty" ];



/**
 * Returns an IMatrix3dFunc function representing the `matrix3d()` CSS function.
 *
 * @category Transform
 */
export const matrix3d = (
		a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
		a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
		a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
		a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>,
	): IMatrix3dFunc => ({ fn: "matrix3d", a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4 });

fdo.matrix = [ "a1", "b1", "c1", "d1", "a2", "b2", "c2", "d2", "a3", "b3", "c3", "d3", "a4", "b4", "c4", "d4" ];



/**
 * Returns an IPerspectiveFunc function representing the `perspective()` CSS function.
 *
 * @category Transform
 */
export const perspective = (d: Extended<CssLength>): IPerspectiveFunc => ({ fn: "perspective", d });

fdo.perspective = WKF.Length;



/**
 * Returns an IRotateFunc function representing the `rotate()` CSS function.
 *
 * @category Transform
 */
export const rotate = (a: Extended<CssAngle>): IRotateFunc => ({ fn: "rotate", a });

/**
 * Returns an ITransformProxy function representing the `rotateX()` CSS function.
 *
 * @category Transform
 */
export const rotateX = (a: Extended<CssAngle>): IRotateFunc => ({ fn: "rotateX", a });

/**
 * Returns an ITransformProxy function representing the `rotateY()` CSS function.
 *
 * @category Transform
 */
export const rotateY = (a: Extended<CssAngle>): IRotateFunc => ({ fn: "rotateY", a });

/**
 * Returns an ITransformProxy function representing the `rotateZ()` CSS function.
 *
 * @category Transform
 */
export const rotateZ = (a: Extended<CssAngle>): IRotateFunc => ({ fn: "rotateZ", a });

fdo.rotate = fdo.rotateX = fdo.rotateY = fdo.rotateZ = WKF.Angle;



/**
 * Returns an IRotate3dFunc function representing the `rotate3d()` CSS function.
 *
 * @category Transform
 */
export const rotate3d = (x: Extended<CssNumber>, y: Extended<CssNumber>,
    z: Extended<CssNumber>, a: Extended<CssAngle>): IRotate3dFunc => ({ fn: "rotate3d", x, y, z, a });

fdo.rotate3d = [ "x", "y", "z", ["a", WKF.Angle] ];



/**
 * Returns an IScaleFunc function representing the `scale()` CSS function.
 *
 * @category Transform
 */
export const scale = (sx: Extended<CssNumber>, sy?: Extended<CssNumber>): IScaleFunc => ({ fn: "scale", sx, sy });

fdo.scale = ["sx", "sy"]

/**
 * Returns an IScale1dFunc function representing the `scaleX()` CSS function.
 *
 * @category Transform
 */
export const scaleX = (s: Extended<CssNumber>): IScale1dFunc => ({ fn: "scaleX", s });

/**
 * Returns an IScale1dFunc function representing the `scaleY()` CSS function.
 *
 * @category Transform
 */
export const scaleY = (s: Extended<CssNumber>): IScale1dFunc => ({ fn: "scaleY", s });

/**
 * Returns an IScale1dFunc function representing the `scaleZ()` CSS function.
 *
 * @category Transform
 */
export const scaleZ = (s: Extended<CssNumber>): IScale1dFunc => ({ fn: "scaleZ", s });

/**
 * Returns an IScale3dFunc function representing the `scale3d()` CSS function.
 *
 * @category Transform
 */
export const scale3d = (sx: Extended<CssNumber>, sy: Extended<CssNumber>,
    sz: Extended<CssNumber>): IScale3dFunc => ({ fn: "scale3d", sx, sy, sz });

fdo.scale3d = ["sx", "sy", "sz"]



/**
 * Returns an ISkewFunc function representing the `skew()` CSS function.
 *
 * @category Transform
 */
export const skew = (ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ISkewFunc => ({ fn: "skew", ax, ay });

fdo.skew = {
    p: ["ax", "ay"],
    do: WKF.Angle
}

/**
 * Returns an ISkew1dFunc function representing the `skewX()` CSS function.
 *
 * @category Transform
 */
export const skewX = (a: Extended<CssAngle>): ISkew1dFunc => ({ fn: "skewX", a });

/**
 * Returns an ISkew1dFunc function representing the `skewY()` CSS function.
 *
 * @category Transform
 */
export const skewY = (a: Extended<CssAngle>): ISkew1dFunc => ({ fn: "skewY", a });

fdo.skewX = fdo.skewY = WKF.Angle;



/**
 * Returns an ITranslateFunc function representing the `translate()` CSS function.
 *
 * @category Transform
 */
export const translate = (x: Extended<CssLength>, y?: Extended<CssLength>): ITranslateFunc => ({ fn: "translate", x, y });

fdo.translate = {
    p: ["x", "y"],
    do: WKF.Length
}

/**
 * Returns an ITranslate1dFunc function representing the `translateX()` CSS function.
 *
 * @category Transform
 */
export const translateX = (d: Extended<CssLength>): ITranslate1dFunc => ({ fn: "translateX", d });

/**
 * Returns an ITranslate1dFunc function representing the `translateY()` CSS function.
 *
 * @category Transform
 */
export const translateY = (d: Extended<CssLength>): ITranslate1dFunc => ({ fn: "translateY", d });

/**
 * Returns an ITranslate1dFunc function representing the `translateZ()` CSS function.
 *
 * @category Transform
 */
export const translateZ = (d: Extended<CssLength>): ITranslate1dFunc => ({ fn: "translateZ", d });

fdo.translateX = fdo.translateY = fdo.translateZ = WKF.Length;

/**
 * Returns an ITranslate3dFunc function representing the `translate3d()` CSS function.
 *
 * @category Transform
 */
export const translate3d = (x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): ITranslate3dFunc => ({ fn: "translate3d", x, y, z });

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
 * **Examples:**
 *
 * ```typescript
 * clipPath: inset( css.percent(15))
 *
 * clipPath: inset( 10, 12, 14, 16).round( 8)
 * ```
 *
 * @category Basic Shape
 */
export const inset = (o1: Extended<CssLength>, o2?: Extended<CssLength>,
    o3?: Extended<CssLength>, o4?: Extended<CssLength>): IInsetBuilder =>
    ({
        fn: "inset", o1, o2, o3, o4,
        round( r: Extended<BorderRadius>) { this.r = r; return this; }
    });

fdo.inset = {
    p: [ "o1", "o2", "o3", "o4", ["r", v => "round " + wkf[WKF.BorderRadius](v)] ],
    do: WKF.Length,
    s: " "
}



/**
 * Returns an ICircleBuilder object representing the `circle()` CSS function.
 *
 * **Examples:**
 *
 * ```typescript
 * clipPath: circle( 100)
 *
 * clipPath: circle( 100).at( ["center", css.percent(30)])
 * ```
 *
 * @category Basic Shape
 */
export const circle = (r?: ShapeRadius): ICircleBuilder =>
    ({
        fn: "circle", r,
        at( pos: Extended<CssPosition>) { this.pos = pos; return this; }
    });

fdo.circle = {
    p: [ ["r", WKF.Length], ["pos", WKF.AtPosition] ],
    s: " "
}



/**
 * Returns an IEllipseBuilder object representing the `ellipse()` CSS function.
 *
 * **Examples:**
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
 * **Examples:**
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
 * **Examples:**
 *
 * ```typescript
 * clipPath: css.polygon( [0,100], [50,0], [100,100])
 *
 * clipPath: css.polygon( [0,100], [50,0], [100,100]).fill( "evenodd")
 * ```
 *
 * @category Basic Shape
 */
export const polygon = (...points: CssPoint[]): IPolygonBuilder =>
    ({
        fn: "polygon", points: points ?? [],
        add( ...points: CssPoint[]) { this.points.push( ...points); return this; },
        fill( rule: FillRule) { this.rule = rule; return this; }
    });

fdo.polygon = [
    "rule",
    ["points", { item: WKF.MultiLengthWithSpace, sep: ","}],
]



/**
 * Returns an IPathBuilder object that allows building a CSS path.
 *
 * @category Basic Shape
 */
export const path = (fillRule?: FillRule): IPathBuilder => new PathBuilder( fillRule);



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

    public toString(): string { return `"${a2s(this.items)}"`; }
}

fdo.path = [ "rule", ["items", (v: PathCommand[]) => `"${a2s(v)}"`] ]



/**
 * Returns an IRay object representing invocation of the `ray()` CSS function.
 *
 * @category Basic Shape
 */
export const ray = (angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
    contain?: boolean): IRayFunc => ({ fn: "ray", angle, size, contain });

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
export const minmax = (min: GridTrackSize, max: GridTrackSize): IMinMaxFunc =>
    ({ fn: "minmax", min, max });

fdo.minmax = [ ["min", WKF.Length], ["max", WKF.Length] ]



/**
 * Returns an IRepeat function representing the `repeat()` CSS function.
 *
 * @category Grid
 */
export const repeat = (count: Extended<CssNumber> | "auto-fill" | "auto-fit",
    ...tracks: GridTrack[]): IRepeatFunc => ({ fn: "repeat", count, tracks });

fdo.repeat = [ "count", ["tracks", { item: WKF.GridTrack }] ]



/**
 * Returns an IGridSpanFunc function representing the `span` expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 *
 * @category Grid
 */
export const span = (p1: Extended<GridLineCountOrName>, p2?: Extended<GridLineCountOrName>): IGridSpanFunc =>
    ({ fn: "span", p1, p2 });

fdo.span = (v: IGridSpanFunc) => mv2s( ["span", v.p1, v.p2])



