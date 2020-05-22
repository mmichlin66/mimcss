import {Extended, CssPosition, CssLength, CssPercent, CssAngle, CssNumber, OneOrBox, CssPoint} from "../styles/UtilTypes"
import {CssColor} from "../styles/ColorTypes"
import {SelectorItem, SelectorProxy} from "../styles/SelectorTypes";
import {
	VarTemplateName, VarValueType, Styleset, FilterProxy, BasicShapeProxy,
	TransformProxy, BorderRadius_StyleType, FillRule_StyleType, IPathBuilder, RayProxy, ExtentKeyword
} from "../styles/StyleTypes"
import {stylePropToString, singleBoxShadow_fromObject, borderRadiusToString} from "../styles/StyleFuncs"
import {CssPercentMath, CssLengthMath, arrayToString, CssAngleMath, CssNumberMath, positionToString, templateStringToString} from "../styles/UtilFuncs";



/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses.
 */
export function selector( parts: TemplateStringsArray, ...params: SelectorItem[]): SelectorProxy
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
export function getStylePropValue<K extends VarTemplateName>( stylePropName: K,
	stylePropValue: VarValueType<K>): string | null
{
	return stylePropToString( stylePropName, stylePropValue, true);
}



/**
 * Sets values of the style properties from the given Styleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML element whose styles will be set.
 * @param styleset Styleset object which provides values for style properties.
 */
export function setElementStyle( elm: HTMLElement, styleset: Styleset): void
{
	if (styleset == undefined)
		elm.removeAttribute( "style");
	else
	{
		let elmStyle = elm.style;
		Object.keys(styleset).forEach( key => elmStyle[key] = stylePropToString( key, styleset[key], true));
	}
}




/**
 * Compares two Styleset objects by converting style properties to strings and returns an object
 * that contains string values of properties that were new or have different values in the new
 * styleset and undefined values for properties that exist in the old styleset but don't exist
 * in the new one.
 * @param oldStyleset 
 * @param newStyleset 
 */
export function diffStylesets( oldStyleset: Styleset, newStyleset: Styleset): { [K: string]: string | undefined } | null
{
	const updateVal: { [K: string]: string | undefined } = {};
	let changesExist = false;

	// loop over keys in the old style object and find those that are not in the new one. These
	// will be removed.
	for( let key in oldStyleset)
	{
		let newVal = newStyleset[key];
		if (newVal == null)
		{
			changesExist = true;
			updateVal[key] = undefined;
		}
		else
		{
			let oldStringVal = stylePropToString( key, oldStyleset[key], true);
			let newStringVal = stylePropToString( key, newVal, true);
			if (oldStringVal !== newStringVal)
			{
				changesExist = true;
				updateVal[key] = newStringVal;
			}
		}
	}

	// loop over keys in the new style object and find those that are not in the old one. These
	// will be added.
	for( let key in newStyleset)
	{
		let oldVal = oldStyleset[key];
		if (oldVal == null)
		{
			changesExist = true;
			updateVal[key] = stylePropToString( key, newStyleset[key], true);
		}
	}

	return changesExist ? updateVal : null;
}



/**
 * Converts the given [[Styleset]] object into an object, where each Styleset's property is
 * converted to its string value.
 * @param styleset 
 */
export function stylesetToStringObject( styleset: Styleset): { [K: string]: string }
{
	let res = {};
	Object.keys( styleset).forEach( key => res[key] = stylePropToString( key, styleset[key], true));
	return res;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
///////////////////////////////////////////////////////////////////////////////////////////////

// Helper function converting percent value to invocation of the given CSS function.
function percentFilter( name: string, amount: Extended<CssPercent>): FilterProxy
{
    return () => `${name}(${CssPercentMath.styleToString( amount)})`;
}



/**
 * Returns an FilterProxy function representing the `brightness()` CSS function.
 */
export function brightness( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "brightness", amount);
}



/**
 * Returns an FilterProxy function representing the `contrast()` CSS function.
 */
export function contrast( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "contrast", amount);
}



/**
 * Returns an FilterProxy function representing the `grayscale()` CSS function.
 */
export function grayscale( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "grayscale", amount);
}



/**
 * Returns an FilterProxy function representing the `invert()` CSS function.
 */
export function invert( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "invert", amount);
}



/**
 * Returns an FilterProxy function representing the `opacity()` CSS function.
 */
export function opacity( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "opacity", amount);
}



/**
 * Returns an FilterProxy function representing the `saturate()` CSS function.
 */
export function saturate( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "saturate", amount);
}



/**
 * Returns an FilterProxy function representing the `sepia()` CSS function.
 */
export function sepia( amount: Extended<CssPercent>): FilterProxy
{
    return percentFilter( "sepia", amount);
}



/**
 * Returns an FilterProxy function representing the `blur()` CSS function.
 */
export function blur( radius: Extended<CssLength>): FilterProxy
{
    return () => `blur(${CssLengthMath.styleToString( radius)})`;
}



/**
 * Returns an FilterProxy function representing the `dropShadow()` CSS function.
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
    blur: Extended<CssLength> = 1,
    spread: Extended<CssLength> = 0): FilterProxy
{
	return () => singleBoxShadow_fromObject( { x, y, color, blur, spread});
}



/**
 * Returns an FilterProxy function representing the `hue-rotate()` CSS function.
 */
export function hueRotate( amount: Extended<CssAngle>): FilterProxy
{
    return () => `hue-rotate(${CssPercentMath.styleToString( amount)})`;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Basic shapes
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an BasicShapeProxy function representing the `inset()` CSS function.
 */
export function inset( offset: Extended<OneOrBox<CssLength>>, radius?: Extended<BorderRadius_StyleType>): BasicShapeProxy
{
	let r = radius != null ? "round " + borderRadiusToString( radius) : "";
    return () => `inset(${CssLengthMath.multiStyleToString( offset, " ")}${r})`;
}



/**
 * Type that is used to specify a radius in [[circle]] and [[ellipse]] functions.
 */
export type ShapeRadius = Extended<CssLength | "closest-side" | "farthest-side">;



/**
 * Returns an BasicShapeProxy function representing the `circle()` CSS function.
 */
export function circle( center?: ShapeRadius, position?: Extended<CssPosition>): BasicShapeProxy
{
    let c =  center != null ? CssLengthMath.styleToString(center) : "";
	let pos = position != null ? " at " + positionToString( position) : "";
    return () => `circle(${c}${pos})`;
}



/**
 * Returns an BasicShapeProxy function representing the `ellipse()` CSS function.
 */
export function ellipse( rx?: ShapeRadius, ry?: ShapeRadius,
	position?: Extended<CssPosition>): BasicShapeProxy
{
    let rxs =  rx != null ? CssLengthMath.styleToString(rx) : "";
    let rys =  ry != null ? " " + CssLengthMath.styleToString(ry) : "";
	let pos = position != null ? " at " + positionToString( position) : "";
    return () => `ellipse(${rxs}${rys}${pos})`;
}



/**
 * Returns an BasicShapeProxy function representing the `polygon()` CSS function.
 */
export function polygon( pointOrRule: CssPoint | FillRule_StyleType,
	...points: CssPoint[]): BasicShapeProxy
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
 * Returns an RayProxy function representing the `ray()` CSS function.
 */
export function ray( angle: Extended<CssAngle>, size?: Extended<ExtentKeyword | CssLength>,
	contain?: boolean): RayProxy
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
 * Returns an BasicShapeProxy function representing the `polygon()` CSS function.
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
 * Returns an TransformProxy function representing the `matrix()` CSS function.
 */
export function matrix( a: Extended<CssNumber>, b: Extended<CssNumber>, c: Extended<CssNumber>,
	d: Extended<CssNumber>, tx: Extended<CssNumber>, ty: Extended<CssNumber>): TransformProxy
{
    return () => `matrix(${arrayToString( [a, b, c, d, tx, ty], undefined, ",")})`;
}



/**
 * Returns an TransformProxy function representing the `matrix3d()` CSS function.
 */
export function matrix3d(
		a1: Extended<CssNumber>, b1: Extended<CssNumber>, c1: Extended<CssNumber>, d1: Extended<CssNumber>,
		a2: Extended<CssNumber>, b2: Extended<CssNumber>, c2: Extended<CssNumber>, d2: Extended<CssNumber>,
		a3: Extended<CssNumber>, b3: Extended<CssNumber>, c3: Extended<CssNumber>, d3: Extended<CssNumber>,
		a4: Extended<CssNumber>, b4: Extended<CssNumber>, c4: Extended<CssNumber>, d4: Extended<CssNumber>,
	): TransformProxy
{
    return () => `matrix(${arrayToString( [a1, b1, c1, d1, a2, b2, c2, d2, a3, b3, c3, d3, a4, b4, c4, d4], undefined, ",")})`;
}



/**
 * Returns an TransformProxy function representing the `perspective()` CSS function.
 */
export function perspective( d: Extended<CssLength>): TransformProxy
{
    return () => `perspective(${CssLengthMath.styleToString(d)})`;
}



/**
 * Returns an TransformProxy function representing the given CSS rotation function.
 */
function rotateImpl( name: string, a: Extended<CssAngle>): TransformProxy
{
    return () => `${name}(${CssAngleMath.styleToString(a)})`;
}



/**
 * Returns an TransformProxy function representing the `rotate()` CSS function.
 */
export function rotate( a: Extended<CssAngle>): TransformProxy
{
    return rotateImpl( "rotate", a);
}



/**
 * Returns an TransformProxy function representing the `rotateX()` CSS function.
 */
export function rotateX( a: Extended<CssAngle>): TransformProxy
{
    return rotateImpl( "rotateX", a);
}



/**
 * Returns an TransformProxy function representing the `rotateY()` CSS function.
 */
export function rotateY( a: Extended<CssAngle>): TransformProxy
{
    return rotateImpl( "rotateY", a);
}



/**
 * Returns an TransformProxy function representing the `rotateZ()` CSS function.
 */
export function rotateZ( a: Extended<CssAngle>): TransformProxy
{
    return rotateImpl( "rotateZ", a);
}



/**
 * Returns an TransformProxy function representing the `rotate3d()` CSS function.
 */
export function rotate3d(
	x: Extended<CssNumber>, y: Extended<CssNumber>, z: Extended<CssNumber>,
	a: Extended<CssAngle>): TransformProxy
{
	let v = [CssNumberMath.styleToString(x), CssNumberMath.styleToString(y),
		CssNumberMath.styleToString(z), CssAngleMath.styleToString(a)].join(",");
    return () => `rotate3d(${v})`;
}



/**
 * Returns an TransformProxy function representing the `scale()` CSS function.
 */
export function scale( cx: Extended<CssNumber>, sy?: Extended<CssNumber>): TransformProxy
{
    return () => `scale(${CssNumberMath.styleToString(cx)}${sy != null ? "," + CssNumberMath.styleToString(sy) : ""})`;
}



/**
 * Returns an TransformProxy function representing the given scale CSS function.
 */
function scaleImpl( name: string, s: Extended<CssNumber>): TransformProxy
{
    return () => `${name}(${CssNumberMath.styleToString(s)})`;
}



/**
 * Returns an TransformProxy function representing the `scaleX()` CSS function.
 */
export function scaleX( s: Extended<CssNumber>): TransformProxy
{
    return scaleImpl( "scaleX", s);
}



/**
 * Returns an TransformProxy function representing the `scaleY()` CSS function.
 */
export function scaleY( s: Extended<CssNumber>): TransformProxy
{
    return scaleImpl( "scaleY", s);
}



/**
 * Returns an TransformProxy function representing the `scaleZ()` CSS function.
 */
export function scaleZ( s: Extended<CssNumber>): TransformProxy
{
    return scaleImpl( "scaleZ", s);
}



/**
 * Returns an TransformProxy function representing the `scale3d()` CSS function.
 */
export function scale3d( sx: Extended<CssNumber>, sy: Extended<CssNumber>,
	sz: Extended<CssNumber>): TransformProxy
{
	let v = [CssNumberMath.styleToString(sx), CssNumberMath.styleToString(sy),
		CssNumberMath.styleToString(sz)].join(",");
    return () => `scale3d(${v})`;
}



/**
 * Returns an TransformProxy function representing the `skew()` CSS function.
 */
export function skew( ax: Extended<CssAngle>, ay?: Extended<CssAngle>): TransformProxy
{
    return () => `skew(${CssAngleMath.styleToString(ax)}${ay != null ? "," + CssAngleMath.styleToString(ay) : ""})`;
}



/**
 * Returns an TransformProxy function representing the `skewX()` CSS function.
 */
export function skewX( ax: Extended<CssAngle>): TransformProxy
{
    return () => `skewX(${CssAngleMath.styleToString(ax)})`;
}



/**
 * Returns an TransformProxy function representing the `skewY()` CSS function.
 */
export function skewY( ay: Extended<CssAngle>): TransformProxy
{
    return () => `skewX(${CssAngleMath.styleToString(ay)})`;
}



/**
 * Returns an TransformProxy function representing the `translate()` CSS function.
 */
export function translate( x: Extended<CssLength>, y?: Extended<CssLength>): TransformProxy
{
    return () => `translate(${CssLengthMath.styleToString(x)}${y != null ? "," + CssLengthMath.styleToString(y) : ""})`;
}



/**
 * Returns an TransformProxy function representing the given translate CSS function.
 */
function translateImpl( name: string, s: Extended<CssLength>): TransformProxy
{
    return () => `${name}(${CssLengthMath.styleToString(s)})`;
}



/**
 * Returns an TransformProxy function representing the `translateX()` CSS function.
 */
export function translateX( x: Extended<CssLength>): TransformProxy
{
    return translateImpl( "translateX", x);
}



/**
 * Returns an TransformProxy function representing the `translateY()` CSS function.
 */
export function translateY( y: Extended<CssLength>): TransformProxy
{
    return translateImpl( "translateY", y);
}



/**
 * Returns an TransformProxy function representing the `translateZ()` CSS function.
 */
export function translateZ( z: Extended<CssLength>): TransformProxy
{
    return translateImpl( "translateZ", z);
}



/**
 * Returns an TransformProxy function representing the `translate3d()` CSS function.
 */
export function translate3d( x: Extended<CssLength>, y: Extended<CssLength>,
	z: Extended<CssLength>): TransformProxy
{
	let v = [CssLengthMath.styleToString(x), CssLengthMath.styleToString(y),
		CssLengthMath.styleToString(z)].join(",");
    return () => `translate3d(${v})`;
}



