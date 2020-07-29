import {Extended, CssPosition, CssLength, CssPercent, CssAngle, CssNumber, OneOrBox, CssPoint} from "../styles/UtilTypes"
import {CssColor} from "../styles/ColorTypes"
import {SelectorItem, ISelectorProxy} from "../styles/SelectorTypes";
import {
	Styleset, ExtendedStyleset, StringStyleset, ExtentKeyword, IFilterProxy, IBasicShapeProxy,
	ITransformProxy, BorderRadius_StyleType, FillRule_StyleType, IPathBuilder, IRayProxy,
	IFitContentProxy, IRepeatProxy, IMinMaxProxy, GridTrackSize, GridTrack, ISpanProxy, GridLineCountOrName
} from "../styles/StyleTypes"
import {
	stylePropToString, singleBoxShadow_fromObject, borderRadiusToString, forAllPropsInStylset, gridTrackToString
} from "../styles/StyleFuncs"
import {
	CssPercentMath, CssLengthMath, arr2str, CssAngleMath, CssNumberMath, pos2str,
	templateStringToString, val2str
} from "../styles/UtilFuncs";
import {s_scheduleStylePropertyUpdate} from "../rules/Scheduling";



/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses.
 */
export function selector( parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy
{
	return () => templateStringToString( parts, params);
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
    return () => `${name}(${CssPercentMath.styleToString( amount)})`;
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
    return () => `blur(${CssLengthMath.styleToString( radius)})`;
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
    blur?: Extended<CssLength>,
    spread?: Extended<CssLength>): IFilterProxy
{
	return () => `drop-shadow(${singleBoxShadow_fromObject( { x, y, color, blur, spread})})`;
}



/**
 * Returns an IFilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( amount: Extended<CssAngle>): IFilterProxy
{
    return () => `hue-rotate(${CssPercentMath.styleToString( amount)})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shapes
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IBasicShapeProxy function representing the `inset()` CSS function.
 */
export function inset( offset: Extended<OneOrBox<CssLength>>, radius?: Extended<BorderRadius_StyleType>): IBasicShapeProxy
{
	let r = radius != null ? "round " + borderRadiusToString( radius) : "";
    return () => `inset(${CssLengthMath.multiStyleToString( offset, " ")}${r})`;
}



/**
 * Type that is used to specify a radius in [[circle]] and [[ellipse]] functions.
 */
export type ShapeRadius = Extended<CssLength | "closest-side" | "farthest-side">;



/**
 * Returns an IBasicShapeProxy function representing the `circle()` CSS function.
 */
export function circle( center?: ShapeRadius, position?: Extended<CssPosition>): IBasicShapeProxy
{
    let c =  center != null ? CssLengthMath.styleToString(center) : "";
	let pos = position != null ? " at " + pos2str( position) : "";
    return () => `circle(${c}${pos})`;
}



/**
 * Returns an IBasicShapeProxy function representing the `ellipse()` CSS function.
 */
export function ellipse( rx?: ShapeRadius, ry?: ShapeRadius,
	position?: Extended<CssPosition>): IBasicShapeProxy
{
    let rxs =  rx != null ? CssLengthMath.styleToString(rx) : "";
    let rys =  ry != null ? " " + CssLengthMath.styleToString(ry) : "";
	let pos = position != null ? " at " + pos2str( position) : "";
    return () => `ellipse(${rxs}${rys}${pos})`;
}



/**
 * Returns an IBasicShapeProxy function representing the `polygon()` CSS function.
 */
export function polygon( pointOrRule: CssPoint | FillRule_StyleType,
	...points: CssPoint[]): IBasicShapeProxy
{
	return () =>
	{
		let s = "polygon(";
		if (typeof pointOrRule === "string")
			s += pointOrRule + ",";
		else
			s += `${CssLengthMath.multiStyleToString( pointOrRule, " ")},`;

		s += points.map( pt => CssLengthMath.multiStyleToString( pt, " ")).join(",");

		return s + ")";
	};
}



/**
 * Returns an IRayProxy function representing the `ray()` CSS function.
 */
export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
	contain?: boolean): IRayProxy
{
	return () =>
	{
		let angleString = CssAngleMath.styleToString( angle);
		let sizeString = size =! null ? "," + CssLengthMath.styleToString( size) : "";
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
	}

	// Returns the accumulated string
	public valueToString() : string { return this.buf + "')"; }


	
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
    return () => `perspective(${CssLengthMath.styleToString(d)})`;
}



/**
 * Returns an ITransformProxy function representing the given CSS rotation function.
 */
function rotateImpl( name: string, a: Extended<CssAngle>): ITransformProxy
{
    return () => `${name}(${CssAngleMath.styleToString(a)})`;
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
	let v = [CssNumberMath.styleToString(x), CssNumberMath.styleToString(y),
		CssNumberMath.styleToString(z), CssAngleMath.styleToString(a)].join(",");
    return () => `rotate3d(${v})`;
}



/**
 * Returns an ITransformProxy function representing the `scale()` CSS function.
 */
export function scale( cx: Extended<CssNumber>, sy?: Extended<CssNumber>): ITransformProxy
{
    return () => `scale(${CssNumberMath.styleToString(cx)}${sy != null ? "," + CssNumberMath.styleToString(sy) : ""})`;
}



/**
 * Returns an ITransformProxy function representing the given scale CSS function.
 */
function scaleImpl( name: string, s: Extended<CssNumber>): ITransformProxy
{
    return () => `${name}(${CssNumberMath.styleToString(s)})`;
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
	let v = [CssNumberMath.styleToString(sx), CssNumberMath.styleToString(sy),
		CssNumberMath.styleToString(sz)].join(",");
    return () => `scale3d(${v})`;
}



/**
 * Returns an ITransformProxy function representing the `skew()` CSS function.
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): ITransformProxy
{
    return () => `skew(${CssAngleMath.styleToString(ax)}${ay != null ? "," + CssAngleMath.styleToString(ay) : ""})`;
}



/**
 * Returns an ITransformProxy function representing the `skewX()` CSS function.
 */
export function skewX( ax: Extended<CssAngle>): ITransformProxy
{
    return () => `skewX(${CssAngleMath.styleToString(ax)})`;
}



/**
 * Returns an ITransformProxy function representing the `skewY()` CSS function.
 */
export function skewY( ay: Extended<CssAngle>): ITransformProxy
{
    return () => `skewX(${CssAngleMath.styleToString(ay)})`;
}



/**
 * Returns an ITransformProxy function representing the `translate()` CSS function.
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): ITransformProxy
{
    return () => `translate(${CssLengthMath.styleToString(x)}${y != null ? "," + CssLengthMath.styleToString(y) : ""})`;
}



/**
 * Returns an ITransformProxy function representing the given translate CSS function.
 */
function translateImpl( name: string, s: Extended<CssLength>): ITransformProxy
{
    return () => `${name}(${CssLengthMath.styleToString(s)})`;
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
	let v = [CssLengthMath.styleToString(x), CssLengthMath.styleToString(y),
		CssLengthMath.styleToString(z)].join(",");
    return () => `translate3d(${v})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Grid functions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an IFitContentProxy function representing the `fit-content()` CSS function.
 */
export function fitContent( size: Extended<CssLength>): IFitContentProxy
{
    return () => `fit-content(${CssLengthMath.styleToString(size)})`;
}



/**
 * Returns an IMinMaxProxy function representing the `minmax()` CSS function.
 */
export function minmax( min: GridTrackSize, max: GridTrackSize): IMinMaxProxy
{
    let options = { fromNumber: CssLengthMath.convertFunc };
    return () => `minmax(${val2str( min, options)},${val2str( max, options)})`;
}



/**
 * Returns an IRepeatProxy function representing the `repeat()` CSS function.
 */
export function repeat( count: Extended<CssNumber> | "auto-fill" | "auto-fill",
    ...tracks: GridTrack[]): IRepeatProxy
{
    // return () => `repeat(${val2str(count)},${stylePropToString( "gridTemplateRows", tracks, true)})`;
    return () => `repeat(${val2str(count)},${val2str( tracks, { arrItemFunc: gridTrackToString })})`;
}



/**
 * Returns an ISpanProxy function representing the span expression for grid layouts. If the first
 * parameter is a number, the second parameter (if defined) must be a name; if the first parameter
 * is a name, the second parameter (if defined) must be a number.
 */
export function span( countOrName: Extended<GridLineCountOrName>,
    nameOrCount?: Extended<GridLineCountOrName>): ISpanProxy
{
    let firstElm = val2str(countOrName);
    let secondElm = nameOrCount ? val2str( nameOrCount) : "";
    return () => `span ${firstElm} ${secondElm}`;
}



