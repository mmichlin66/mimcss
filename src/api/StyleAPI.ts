import {
    Extended, CssPosition, CssLength, CssPercent, CssAngle, CssNumber, CssPoint, CssColor,
    SelectorItem, ISelectorProxy, IBasicShapeProxy, IPathBuilder, IRayProxy,
    IRepeatProxy, IMinMaxProxy, ISpanProxy, ExtentKeyword, IColorProxy, INamedColors,
} from "./BasicTypes"
import {
    ITransformMatrix, ITransformMatrix3d, ITransformPerspective,
    ITransformRotate1d, ITransformRotate3d,
    ITransformSkew1d, ITransformSkew2d, ITransformScale1d, ITransformScale2d, ITransformScale3d,
    ITransformTranslate1d, ITransformTranslate3d, ITransformTranslate2d,
	Styleset, ExtendedStyleset, StringStyleset, BorderRadius_StyleType, FillRule_StyleType,
	GridTrackSize, GridTrack, GridLineCountOrName, IFilterPercent, IFilterBlur, IFilterDropShadow, IFilterHueRotate
} from "./StyleTypes"
import {LengthMath, AngleMath, pos2str, templateStringToString, v2s, symValueToString} from "../impl/UtilFuncs";
import {
    stylePropToString, borderRadiusToString, forAllPropsInStylset,
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
			updateVal[key] = "unset";
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

/**
 * Returns an IFilterPercent object representing the `brightness()` CSS function.
 */
export function brightness( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "brightness", p };
}



/**
 * Returns an IFilterProxy function representing the `contrast()` CSS function.
 */
export function contrast( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "contrast", p };
}



/**
 * Returns an IFilterProxy function representing the `grayscale()` CSS function.
 */
export function grayscale( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "grayscale", p };
}



/**
 * Returns an IFilterProxy function representing the `invert()` CSS function.
 */
export function invert( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "invert", p };
}



/**
 * Returns an IFilterProxy function representing the `opacity()` CSS function.
 */
export function opacity( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "opacity", p };
}



/**
 * Returns an IFilterProxy function representing the `saturate()` CSS function.
 */
export function saturate( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "saturate", p };
}



/**
 * Returns an IFilterProxy function representing the `sepia()` CSS function.
 */
export function sepia( p: Extended<CssPercent>): IFilterPercent
{
    return { fn: "sepia", p };
}



/**
 * Returns an IFilterProxy function representing the `blur()` CSS function.
 */
export function blur( r: Extended<CssLength>): IFilterBlur
{
    return { fn: "blur", r };
}



/**
 * Returns an IFilterProxy function representing the `dropShadow()` CSS function.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 */
export function dropShadow( x: Extended<CssLength>, y: Extended<CssLength>,
    color?: Extended<CssColor>, blur?: Extended<CssLength>): IFilterDropShadow
{
	return { fn: "drop-shadow", x, y, color, blur };
}



/**
 * Returns an IFilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( a: Extended<CssAngle>): IFilterHueRotate
{
	return { fn: "hue-rotate", a };
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
        return `inset(${LengthMath.ms2s( [o1, o2, o3, o4], " ")}${r})`;
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
        let rs =  radius != null ? LengthMath.s2s(radius) : "";
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
        let rxs =  radiusX != null ? LengthMath.s2s(radiusX) : "";
        let rys =  radiusY != null ? " " + LengthMath.s2s(radiusY) : "";
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

		s += points.map( pt => LengthMath.ms2s( pt, " ")).join(",");

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
		let angleString = AngleMath.s2s( angle);
		let sizeString = size != null ? "," + LengthMath.s2s( size) : "";
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
// Transforms
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an ITransformMatrix function representing the `matrix()` CSS function.
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): ITransformMatrix
{
    return { fn: "matrix", a, b, c, d, tx, ty };
}



/**
 * Returns an ITransformProxy function representing the `matrix3d()` CSS function.
 */
export function matrix3d(
		a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
		a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
		a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
		a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>,
	): ITransformMatrix3d
{
    return { fn: "matrix3d", a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4 };
}



/**
 * Returns an ITransformProxy function representing the `perspective()` CSS function.
 */
export function perspective( d: Extended<CssLength>): ITransformPerspective
{
    return { fn: "perspective", d};
}



/**
 * Returns an ITransformRotate2d object representing the `rotate()` CSS function.
 */
export function rotate( a: Extended<CssAngle>): ITransformRotate1d
{
    return { fn: "rotate", a};
}

/**
 * Returns an ITransformRotate object representing the `rotateX()` CSS function.
 */
export function rotateX( a: Extended<CssAngle>): ITransformRotate1d
{
    return { fn: "rotateX", a };
}

/**
 * Returns an ITransformRotate object representing the `rotateY()` CSS function.
 */
export function rotateY( a: Extended<CssAngle>): ITransformRotate1d
{
    return { fn: "rotateY", a };
}

/**
 * Returns an ITransformRotate object representing the `rotateZ()` CSS function.
 */
export function rotateZ( a: Extended<CssAngle>): ITransformRotate1d
{
    return { fn: "rotateZ", a };
}

/**
 * Returns an ITransformRotate3d object representing the `rotate3d()` CSS function.
 */
export function rotate3d( x: Extended<CssNumber>, y: Extended<CssNumber>,
    z: Extended<CssNumber>, a: Extended<CssAngle>): ITransformRotate3d
{
    return { fn: "rotate3d", x, y, z, a }
}



/**
 * Returns an ITransformScale2d object representing the `scale()` CSS function.
 */
export function scale( sx: Extended<CssNumber>, sy?: Extended<CssNumber>): ITransformScale2d
{
    return { fn: "scale", sx, sy};
}

/**
 * Returns an ITransformScale object representing the `scaleX()` CSS function.
 */
export function scaleX( s: Extended<CssNumber>): ITransformScale1d
{
    return { fn: "scaleX", s };
}

/**
 * Returns an ITransformScale object representing the `scaleY()` CSS function.
 */
export function scaleY( s: Extended<CssNumber>): ITransformScale1d
{
    return { fn: "scaleY", s };
}

/**
 * Returns an ITransformScale object representing the `scaleZ()` CSS function.
 */
export function scaleZ( s: Extended<CssNumber>): ITransformScale1d
{
    return { fn: "scaleZ", s };
}

/**
 * Returns an ITransformScale3d object representing the `scale3d()` CSS function.
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
    sz: Extended<CssNumber>): ITransformScale3d
{
    return { fn: "scale3d", sx, sy, sz }
}



/**
 * Returns an ITransformProxy function representing the `skew()` CSS function.
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ITransformSkew2d
{
    return { fn: "skew", ax, ay };
}

/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
export function skewX( a: Extended<CssAngle>): ITransformSkew1d
{
    return { fn: "skewX", a };
}

/**
 * Returns an ITransformProxy function representing the `skewY()` CSS function.
 */
export function skewY( a: Extended<CssAngle>): ITransformSkew1d
{
    return { fn: "skewY", a };
}



/**
 * Returns an ITransformTranslate2d object representing the `translate()` CSS function.
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): ITransformTranslate2d
{
    return { fn: "translate", x, y};
}

/**
 * Returns an ITransformTranslate object representing the `translateX()` CSS function.
 */
export function translateX( d: Extended<CssLength>): ITransformTranslate1d
{
    return { fn: "translateX", d };
}

/**
 * Returns an ITransformTranslate object representing the `translateY()` CSS function.
 */
export function translateY( d: Extended<CssLength>): ITransformTranslate1d
{
    return { fn: "translateY", d };
}

/**
 * Returns an ITransformTranslate object representing the `translateZ()` CSS function.
 */
export function translateZ( d: Extended<CssLength>): ITransformTranslate1d
{
    return { fn: "translateZ", d };
}

/**
 * Returns an ITransformTranslate3d object representing the `translate3d()` CSS function.
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): ITransformTranslate3d
{
    return { fn: "translate3d", x, y, z }
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



