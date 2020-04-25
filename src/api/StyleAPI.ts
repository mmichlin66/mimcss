import {Extended, CssPosition, CssTime, CssLength, CssPercent, CssAngle, CssNumber, OneOrBox, CssPoint} from "../styles/UtilTypes"
import {CssColor} from "../styles/ColorTypes"
import {CssImage} from "../styles/ImageTypes"
import {FontStretch_Single } from "../styles/FontFaceTypes";
import {CssSelector, SelectorTokenType} from "../styles/SelectorTypes";
import {
	VarTemplateName, VarValueType, AnimationName_Single, TimingFunction_Single,
	AnimationIterationCount_Single, AnimationDirection_Single, AnimationFillMode_Single,
	AnimationPlayState_Single, Animation_Single, BackgroundSize_Single, BackgroundRepeat_Single,
	BackgroundAttachment_Single, BackgroundOrigin_Single, BackgroundClip_Single,
	Background_Single, BoxShadow_Single, Styleset, FilterProxy, BasicShapeProxy,
	FontStyle_StyleType, FontWeight_StyleType, Font_StyleType, TextDecorationLine_StyleType,
	TextDecorationStyle_StyleType, TextDecorationThickness_StyleType, TextDecoration_StyleType,
	TextShadow_Single, TransformProxy, Transition_Single, TransitionProperty_Single, BorderRadius_StyleType, FillRule_StyleType
} from "../styles/StyleTypes"
import {stylePropToString, singleBoxShadow_fromObject, borderRadiusToString} from "../styles/StyleFuncs"
import {formatSelector} from "../styles/SelectorFuncs";
import {CssPercentMath, CssLengthMath, arrayToString, CssAngleMath, CssNumberMath, positionToString} from "../styles/UtilFuncs";



/**
 * Returns a string representation of a selector using the given template string with optional
 * placeholders (e.g. {0}), which will be replaced by names of tags, classes and IDs and other
 * possible types.
 */
export function $selector( template: string, ...args: SelectorTokenType[]): CssSelector
{
	return () => formatSelector( template, args);
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
 * Compares two Styleset objects by converting style properties to strings and returns an object
 * that contains string values of properties that were new or have different values in the new
 * styleset and undefined values for properties that exist in the old styleset but don't exist
 * in the new one.
 * @param oldStyleset 
 * @param newStyleset 
 */
export function stylesetToStringObject( styleset: Styleset): { [K: string]: string }
{
	let res = {};
	Object.keys( styleset).forEach( key => res[key] = stylePropToString( key, styleset[key], true));
	return res;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Animations
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the animation property.
 * @param name Animation name. This can be either a string or a reference to the animation
 * rule definition.
 * @param duration Animation duration. Integer numbers for milliseconds, floating point
 * numbers for seconds. The default value is 1 second.
 * @param func Timing function. Default value is "ease". This can be one of the following types:
 *   - one of pre-defined timing function names.
 *   - a number of steps in the steps function. The step position will be set to jump-start.
 *   - one- or two-item array that defines a step function. The first item defines the number
 *     of steps. The optional second item is one of pre-defined step postion names.
 *   - four-item array that defines cubic-bezier function.
 * @param delay Delay before the animation starts. Integer numbers for milliseconds, floating
 * point numbers for seconds. The default value is 0.
 * @param count Number of iterations the animation shold run. The default value is 1.
 * @param direction Animation direction. The default value is "normal".
 * @param mode Animation fill mode. The default value is "none".
 * @param state Animation state. The default value is "running".
 */
export function animation( name: Extended<AnimationName_Single>,
		duration: Extended<CssTime> = 1000,
		func: Extended<TimingFunction_Single> = "ease",
		delay: Extended<CssTime> = 0,
		count: Extended<AnimationIterationCount_Single> = 1,
		direction: Extended<AnimationDirection_Single> = "normal",
		mode: Extended<AnimationFillMode_Single> = "none",
		state: Extended<AnimationPlayState_Single> = "running"
	): Animation_Single
{
	return { name, duration, func, delay,count, direction, state, mode };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Background
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the animation property.
 * @param color Color value.
 * @param position
 * @param size
 * @param repeat Background repeat value. The default value is "repeat".
 * @param attachment Background attachment. The default value is "scroll".
 * @param origin Background origin. The default value is "padding-box".
 * @param clip Background clip. The default value is "border-box".
 */
export function background(
		color?: Extended<CssColor>,
		image?: Extended<CssImage>,
		position?: Extended<CssPosition>,
		size?: Extended<BackgroundSize_Single>,
		repeat: Extended<BackgroundRepeat_Single> = "repeat",
		attachment: Extended<BackgroundAttachment_Single> = "scroll",
		origin: Extended<BackgroundOrigin_Single> = "padding-box",
		clip: Extended<BackgroundClip_Single> = "border-box"
	): Background_Single
{
	return { color, image, position, size, repeat, attachment, origin, clip };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Transitions
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the transition property.
 * @param property Name of the property to transition. The default value is "all".
 * @param duration Transition duration. Integer numbers for milliseconds, floating point
 * numbers for seconds. The default value is 1 second.
 * @param func Timing function. Default value is "ease". This can be one of the following types:
 *   - one of pre-defined timing function names.
 *   - a number of steps in the steps function. The step position will be set to jump-start.
 *   - one- or two-item array that defines a step function. The first item defines the number
 *     of steps. The optional second item is one of pre-defined step postion names.
 *   - four-item array that defines cubic-bezier function.
 * @param delay Delay before the transition starts. Integer numbers for milliseconds, floating
 * point numbers for seconds. The default value is 0.
 */
export function transition( property: Extended<TransitionProperty_Single> = "all",
	duration: Extended<CssTime> = 1000,
	func: Extended<TimingFunction_Single> = "ease",
	delay: Extended<CssTime> = 0
	): Transition_Single
{
return { property, duration, func, delay };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Shadows
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the box-shadow property.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 * @param spread Value of the shadow's spreading. The default value is 0.
 * @param inset Flag indicating whether the shadow goes inside the shape. The default value is false.
 */
export function boxShadow(
		x: Extended<CssLength>,
		y: Extended<CssLength>,
		color?: Extended<CssColor>,
		blur: Extended<CssLength> = 1,
		spread: Extended<CssLength> = 0,
		inset: Extended<boolean> = false
	): BoxShadow_Single
{
	return { x, y, color, blur, spread, inset };
}

/**
 * Returns an object that can be assigned to the text-shadow property.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 */
export function textShadow(
		x: Extended<CssLength>,
		y: Extended<CssLength>,
		color?: Extended<CssColor>,
		blur: Extended<CssLength> = 1,
	): TextShadow_Single
{
	return { x, y, color, blur };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Font
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the font property.
 * @param family Font family.
 * @param size Font size.
 * @param style Font style.
 * @param variant Font variant.
 * @param weight Font weight.
 * @param stretch Font stretch.
 * @param lineHeight Line height.
 */
export function font(
		family: string,
		size: Extended<CssLength>,
		style?: Extended<FontStyle_StyleType>,
		weight?: Extended<FontWeight_StyleType>,
		lineHeight?: Extended<CssNumber>,
		variant?: Extended<"normal" | "small-caps">,
		stretch?: Extended<Exclude<FontStretch_Single,number>>
	): Font_StyleType
{
	return { size, family, style, variant, weight, stretch, lineHeight };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Text decoration
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the font property.
 * @param line Type of line.
 * @param color Line color.
 * @param style Line style.
 * @param thickness Line size.
 */
export function textDecoration(
        line?: Extended<TextDecorationLine_StyleType>,
        color?: Extended<CssColor>,
        style?: Extended<TextDecorationStyle_StyleType>,
        thickness?: Extended<TextDecorationThickness_StyleType>,
	): TextDecoration_StyleType
{
	return { line, style, color, thickness };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an FilterProxy function representing the `brightness()` CSS function.
 */
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
    return () => `inset(${CssLengthMath.multiStyleToStringWithSpace(offset)}${r})`;
}



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
			s += `${CssLengthMath.multiStyleToStringWithSpace( pointOrRule)},`;

		s += points.map( pt => CssLengthMath.multiStyleToStringWithSpace( pt)).join(",");

		return s + ")";
	};
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



