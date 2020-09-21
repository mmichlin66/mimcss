import {
    Extended, CssPosition, CssLength, CssPercent, CssAngle, CssNumber, CssPoint, CssColor,
    SelectorItem, ISelectorProxy, IFilterProxy, IBasicShapeProxy, IPathBuilder, IRayProxy,
    IRepeatProxy, IMinMaxProxy, ITransformProxy, ISpanProxy, ExtentKeyword, IColorProxy,
    INamedColors
} from "../api/BasicTypes"
import {
	Styleset, ExtendedStyleset, StringStyleset, BorderRadius_StyleType, FillRule_StyleType,
	GridTrackSize, GridTrack, GridLineCountOrName
} from "./StyleTypes"
import {
	PercentMath, LengthMath, arr2str, AngleMath, NumberMath, pos2str,
	templateStringToString, val2str, symValueToString
} from "../impl/UtilFuncs";
import {
    stylePropToString, singleBoxShadow_fromObject, borderRadiusToString, forAllPropsInStylset,
    gridTrackToString, s_registerStylePropertyInfo
} from "../impl/StyleFuncs"
import {s_scheduleStylePropertyUpdate} from "../rules/Scheduling";
import {rgbToString, hslToString, colorWithAlphaToString} from "../impl/ColorFuncs";



/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses.
 */
export function selector( parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy
{
	return () => templateStringToString( parts, params);
}



/**
 * Registers the given function to be used for converting values of the given style property to
 * string. The `registerStyleProperty` function must be used after adding the property to the
 * [[ICssStyleset]] interface via the module augmentation technique if the conversion to string
 * requires non-standard operations. This function should not be called for propeties whose
 * values only include numbers, strings, functions returning a string, objects whose `toString`
 * method produces the necessary string or arrays of the above types.
 *
 * This function can be used for style properties that are not yet supported by Mimcss. This is
 * also the way to support properties with vendor prefixes.
 */
export function registerStyleProperty( name: string, toStringFunc: (v: any) => string): boolean
{
    return s_registerStylePropertyInfo( name, toStringFunc);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Styleset manipulation
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given value corresponding to the given style property to a CSS string.
 * @param stylePropName Style property name that determines how the value should be converted
 * to a CSS compliant string.
 * @param stylePropValue Value to convert.
 */
export function getStylePropValue<K extends keyof ExtendedStyleset>( stylePropName: K,
	stylePropValue: ExtendedStyleset[K]): string
{
	return stylePropToString( stylePropName, stylePropValue, true);
}



/**
 * Sets values of the style properties from the given Styleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML element whose styles will be set.
 * @param styleset Styleset object which provides values for style properties.
 */
export function setElementStyle( elm: HTMLElement, styleset: Styleset | null | undefined,
	schedulerType?: number): void
{
    setElementStringStyle( elm, styleset ? stylesetToStringStyleset(styleset) : null, schedulerType);
}



/**
 * Sets values of the style properties from the given StringStyleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML element whose styles will be set.
 * @param styleset StringStyleset object which provides values for style properties.
 */
export function setElementStringStyle( elm: HTMLElement, styleset: StringStyleset | null | undefined,
	schedulerType?: number): void
{
    s_scheduleStylePropertyUpdate( elm, null, styleset, false, schedulerType);
}



/**
 * Converts the given [[Styleset]] object into an object, where each Styleset's property is
 * converted to its string value.
 * @param styleset
 */
export function stylesetToStringStyleset( styleset: Styleset): StringStyleset
{
	let res: StringStyleset = {};

	forAllPropsInStylset( styleset,
		(name: string, value: string): void => { res[name] = value });

	return res;
}



/**
 * Compares two Styleset objects by converting style properties to strings and returns an object
 * that contains string values of properties that were new or have different values in the new
 * styleset and undefined values for properties that exist in the old styleset but don't exist
 * in the new one.
 * @param oldStyleset
 * @param newStyleset
 * @returns StringStyleset object with properties that have different values in the old and new
 * stylesets. Properties that existed in the old but don't exist in the new styleset, will have
 * their values set to undefined. If there is no differences between the two stylesets null is
 * returned.
 */
export function diffStylesets( oldStyleset: Styleset, newStyleset: Styleset): StringStyleset | null
{
	if (!oldStyleset && !newStyleset)
		return null;
	else if (!oldStyleset)
		return stylesetToStringStyleset( newStyleset);
	else if (!newStyleset)
		return stylesetToStringStyleset( oldStyleset);

	// first convert both stylesets to their string versions
	let oldStringStyleset =	stylesetToStringStyleset( oldStyleset);
	let newStringStyleset =	stylesetToStringStyleset( newStyleset);

	let updateVal: StringStyleset | null = null;

	// loop over keys in the old style object and find those that are not in the new one. These
	// will be removed.
	for( let key in oldStringStyleset)
	{
		let newStringVal = newStringStyleset[key];
		if (newStringVal == null)
		{
			updateVal = updateVal || {};
			updateVal[key] = undefined;
		}
		else
		{
			let oldStringVal = oldStringStyleset[key];
			if (oldStringVal !== newStringVal)
			{
				updateVal = updateVal || {};
				updateVal[key] = newStringVal;
			}
		}
	}

	// loop over keys in the new style object and find those that are not in the old one. These
	// will be added.
	for( let key in newStringStyleset)
	{
		let oldStringVal = oldStringStyleset[key];
		if (oldStringVal == null)
		{
			updateVal = updateVal || {};
			updateVal[key] = newStringStyleset[key];
		}
	}

	return updateVal;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
///////////////////////////////////////////////////////////////////////////////////////////////

// Helper function converting percent value to invocation of the given CSS function.
function percentFilter( name: string, amount: Extended<CssPercent>): IFilterProxy
{
    return () => `${name}(${PercentMath.styleToString( amount)})`;
}



/**
 * Returns an IFilterProxy function representing the `brightness()` CSS function.
 */
export function brightness( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "brightness", amount);
}



/**
 * Returns an IFilterProxy function representing the `contrast()` CSS function.
 */
export function contrast( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "contrast", amount);
}



/**
 * Returns an IFilterProxy function representing the `grayscale()` CSS function.
 */
export function grayscale( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "grayscale", amount);
}



/**
 * Returns an IFilterProxy function representing the `invert()` CSS function.
 */
export function invert( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "invert", amount);
}



/**
 * Returns an IFilterProxy function representing the `opacity()` CSS function.
 */
export function opacity( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "opacity", amount);
}



/**
 * Returns an IFilterProxy function representing the `saturate()` CSS function.
 */
export function saturate( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "saturate", amount);
}



/**
 * Returns an IFilterProxy function representing the `sepia()` CSS function.
 */
export function sepia( amount: Extended<CssPercent>): IFilterProxy
{
    return percentFilter( "sepia", amount);
}



/**
 * Returns an IFilterProxy function representing the `blur()` CSS function.
 */
export function blur( radius: Extended<CssLength>): IFilterProxy
{
    return () => `blur(${LengthMath.styleToString( radius)})`;
}



/**
 * Returns an IFilterProxy function representing the `dropShadow()` CSS function.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 * @param spread Value of the shadow's spreading. The default value is 0.
 * @param inset Flag indicating whether the shadow goes inside the shape. The default value is false.
 */
export function dropShadow(
    x: Extended<CssLength>,
    y: Extended<CssLength>,
    color?: Extended<CssColor>,
    blur?: Extended<CssLength>): IFilterProxy
{
	return () => `drop-shadow(${singleBoxShadow_fromObject( { x, y, color, blur})})`;
}



/**
 * Returns an IFilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( amount: Extended<CssAngle>): IFilterProxy
{
    return () => `hue-rotate(${AngleMath.styleToString( amount)})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shapes
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
        return `inset(${LengthMath.multiStyleToString( [o1, o2, o3, o4], " ")}${r})`;
    }

    f.round = (radius?: Extended<BorderRadius_StyleType>): IBasicShapeProxy => {
        f.radius = radius;
        return f;
    }

    return f;
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
        let rs =  radius != null ? LengthMath.styleToString(radius) : "";
        let pos = f.pos != null ? " at " + pos2str( f.pos) : "";
        return `circle(${rs}${pos})`;
    }

    f.at = (pos: Extended<CssPosition>): IBasicShapeProxy => { f.pos = pos; return f; }

    return f;
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
        let rxs =  radiusX != null ? LengthMath.styleToString(radiusX) : "";
        let rys =  radiusY != null ? " " + LengthMath.styleToString(radiusY) : "";
        let pos = f.pos != null ? " at " + pos2str( f.pos) : "";
        return `ellipse(${rxs}${rys}${pos})`
    }

    f.at = (pos: Extended<CssPosition>): IBasicShapeProxy => { f.pos = pos; return f; }

    return f;
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

		s += points.map( pt => LengthMath.multiStyleToString( pt, " ")).join(",");

		return s + ")";
    };

    f.fill = (rule: FillRule_StyleType): IBasicShapeProxy => { f.fillParam = rule; return f; };

    return f;
}



/**
 * Returns an IRayProxy function representing the `ray()` CSS function.
 */
export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
	contain?: boolean): IRayProxy
{
	return () =>
	{
		let angleString = AngleMath.styleToString( angle);
		let sizeString = size != null ? "," + LengthMath.styleToString( size) : "";
		let containString = contain ? ",contain" : "";
		return `ray(${angleString}${sizeString}${containString})`;
	};
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



    // Move-to command with absolute coordinates.
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
// Transforms
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an ITransformProxy function representing the `matrix()` CSS function.
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): ITransformProxy
{
    return () => `matrix(${arr2str( [a, b, c, d, tx, ty], undefined, ",")})`;
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
    return () => `matrix(${arr2str( [a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4], undefined, ",")})`;
}



/**
 * Returns an ITransformProxy function representing the `perspective()` CSS function.
 */
export function perspective( d: Extended<CssLength>): ITransformProxy
{
    return () => `perspective(${LengthMath.styleToString(d)})`;
}



/**
 * Returns an ITransformProxy function representing the given CSS rotation function.
 */
function rotateImpl( name: string, a: Extended<CssAngle>): ITransformProxy
{
    return () => `${name}(${AngleMath.styleToString(a)})`;
}



/**
 * Returns an ITransformProxy function representing the `rotate()` CSS function.
 */
export function rotate( a: Extended<CssAngle>): ITransformProxy
{
    return rotateImpl( "rotate", a);
}



/**
 * Returns an ITransformProxy function representing the `rotateX()` CSS function.
 */
export function rotateX( a: Extended<CssAngle>): ITransformProxy
{
    return rotateImpl( "rotateX", a);
}



/**
 * Returns an ITransformProxy function representing the `rotateY()` CSS function.
 */
export function rotateY( a: Extended<CssAngle>): ITransformProxy
{
    return rotateImpl( "rotateY", a);
}



/**
 * Returns an ITransformProxy function representing the `rotateZ()` CSS function.
 */
export function rotateZ( a: Extended<CssAngle>): ITransformProxy
{
    return rotateImpl( "rotateZ", a);
}



/**
 * Returns an ITransformProxy function representing the `rotate3d()` CSS function.
 */
export function rotate3d(
	x: Extended<CssNumber>, y: Extended<CssNumber>, z: Extended<CssNumber>,
	a: Extended<CssAngle>): ITransformProxy
{
    return () => {
        let v = [NumberMath.styleToString(x), NumberMath.styleToString(y),
                NumberMath.styleToString(z), AngleMath.styleToString(a)];
        return `rotate3d(${v.join(",")})`;
    }
}



/**
 * Returns an ITransformProxy function representing the `scale()` CSS function.
 */
export function scale( cx: Extended<CssNumber>, cy?: Extended<CssNumber>): ITransformProxy
{
    return () => `scale(${NumberMath.styleToString(cx)}${cy != null ? "," + NumberMath.styleToString(cy) : ""})`;
}



/**
 * Returns an ITransformProxy function representing the given scale CSS function.
 */
function scaleImpl( name: string, s: Extended<CssNumber>): ITransformProxy
{
    return () => `${name}(${NumberMath.styleToString(s)})`;
}



/**
 * Returns an ITransformProxy function representing the `scaleX()` CSS function.
 */
export function scaleX( s: Extended<CssNumber>): ITransformProxy
{
    return scaleImpl( "scaleX", s);
}



/**
 * Returns an ITransformProxy function representing the `scaleY()` CSS function.
 */
export function scaleY( s: Extended<CssNumber>): ITransformProxy
{
    return scaleImpl( "scaleY", s);
}



/**
 * Returns an ITransformProxy function representing the `scaleZ()` CSS function.
 */
export function scaleZ( s: Extended<CssNumber>): ITransformProxy
{
    return scaleImpl( "scaleZ", s);
}



/**
 * Returns an ITransformProxy function representing the `scale3d()` CSS function.
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
	sz: Extended<CssNumber>): ITransformProxy
{
    return () => {
        let v = [NumberMath.styleToString(sx), NumberMath.styleToString(sy), NumberMath.styleToString(sz)];
        return `scale3d(${v.join(",")})`;
    }
}



/**
 * Returns an ITransformProxy function representing the `skew()` CSS function.
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ITransformProxy
{
    return () => `skew(${AngleMath.styleToString(ax)}${ay != null ? "," + AngleMath.styleToString(ay) : ""})`;
}



/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
export function skewX( ax: Extended<CssAngle>): ITransformProxy
{
    return () => `skewX(${AngleMath.styleToString(ax)})`;
}



/**
 * Returns an ITransformProxy function representing the `skewY()` CSS function.
 */
export function skewY( ay: Extended<CssAngle>): ITransformProxy
{
    return () => `skewX(${AngleMath.styleToString(ay)})`;
}



/**
 * Returns an ITransformProxy function representing the `translate()` CSS function.
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): ITransformProxy
{
    return () => `translate(${LengthMath.styleToString(x)}${y != null ? "," + LengthMath.styleToString(y) : ""})`;
}



/**
 * Returns an ITransformProxy function representing the given translate CSS function.
 */
function translateImpl( name: string, s: Extended<CssLength>): ITransformProxy
{
    return () => `${name}(${LengthMath.styleToString(s)})`;
}



/**
 * Returns an ITransformProxy function representing the `translateX()` CSS function.
 */
export function translateX( x: Extended<CssLength>): ITransformProxy
{
    return translateImpl( "translateX", x);
}



/**
 * Returns an ITransformProxy function representing the `translateY()` CSS function.
 */
export function translateY( y: Extended<CssLength>): ITransformProxy
{
    return translateImpl( "translateY", y);
}



/**
 * Returns an ITransformProxy function representing the `translateZ()` CSS function.
 */
export function translateZ( z: Extended<CssLength>): ITransformProxy
{
    return translateImpl( "translateZ", z);
}



/**
 * Returns an ITransformProxy function representing the `translate3d()` CSS function.
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): ITransformProxy
{
    return () => {
        let v = [LengthMath.styleToString(x), LengthMath.styleToString(y), LengthMath.styleToString(z)];
        return `translate3d(${v.join(",")})`;
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Grid functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IMinMaxProxy function representing the `minmax()` CSS function.
 */
export function minmax( min: GridTrackSize, max: GridTrackSize): IMinMaxProxy
{
    return () => {
        let options = { fromNumber: LengthMath.convertFunc };
        return `minmax(${val2str( min, options)},${val2str( max, options)})`;
    }
}



/**
 * Returns an IRepeatProxy function representing the `repeat()` CSS function.
 */
export function repeat( count: Extended<CssNumber> | "auto-fill" | "auto-fit",
    ...tracks: GridTrack[]): IRepeatProxy
{
    return () => `repeat(${val2str(count)},${val2str( tracks, { arrItemFunc: gridTrackToString })})`;
}



/**
 * Returns an ISpanProxy function representing the `span` expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 */
export function span( countOrName: Extended<GridLineCountOrName>,
    nameOrCount?: Extended<GridLineCountOrName>): ISpanProxy
{
    return () => `span ${val2str(countOrName)} ${nameOrCount ? val2str( nameOrCount) : ""}`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Color functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

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



