import {Extended, CssPosition, CssTime, CssLength} from "../styles/UtilTypes"
import * as ColorTypes from "../styles/ColorTypes"
import * as ImageTypes from "../styles/ImageTypes"
import * as StyleTypes from "../styles/StyleTypes"
import * as StyleFuncs from "../styles/StyleFuncs"
import {CssSelector, SelectorTokenType} from "../styles/SelectorTypes";
import {formatSelector} from "../styles/SelectorFuncs";



/**
 * Converts the given value corresponding to the given style property to a CSS string.
 * @param stylePropName Style property name that determines how the value should be converted
 * to a CSS compliant string.
 * @param stylePropValue Value to convert.
 */
export function getStylePropValue<K extends StyleTypes.VarTemplateName>( stylePropName: K,
	stylePropValue: StyleTypes.VarValueType<K>): string | null
{
	return StyleFuncs.stylePropToString( stylePropName, stylePropValue, true);
}



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
export function animation( name: Extended<StyleTypes.AnimationName_Single>,
	duration: Extended<CssTime> = 1000,
	func: Extended<StyleTypes.AnimationTimingFunction_Single> = "ease",
	delay: Extended<CssTime> = 0,
	count: Extended<StyleTypes.AnimationIterationCount_Single> = 1,
	direction: Extended<StyleTypes.AnimationDirection_Single> = "normal",
	mode: Extended<StyleTypes.AnimationFillMode_Single> = "none",
	state: Extended<StyleTypes.AnimationPlayState_Single> = "running"): StyleTypes.Animation_Single
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
		color?: Extended<ColorTypes.CssColor>,
		image?: Extended<ImageTypes.CssImage>,
		position?: Extended<CssPosition>,
		size?: Extended<StyleTypes.BackgroundSize_Single>,
		repeat: Extended<StyleTypes.BackgroundRepeat_Single> = "repeat",
		attachment: Extended<StyleTypes.BackgroundAttachment_Single> = "scroll",
		origin: Extended<StyleTypes.BackgroundOrigin_Single> = "padding-box",
		clip: Extended<StyleTypes.BackgroundClip_Single> = "border-box"
	): StyleTypes.Background_Single
{
	return { color, image, position, size, repeat, attachment, origin, clip };
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Shadow
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns an object that can be assigned to the box-shadow or text-shadow property.
 * @param x Horizontal offset of the shadow.
 * @param y Vertical offset of the shadow.
 * @param color Color of the shadow.
 * @param blur Value of the shadow's blurring. The default value is 1 pixel.
 * @param spread Value of the shadow's spreading. The default value is 0.
 * @param inset Flag indicating whether the shadow goes inside the shape. The default value is false.
 */
export function shadow(
				x: Extended<CssLength>,
				y: Extended<CssLength>,
				color: Extended<ColorTypes.CssColor>,
				blur: Extended<CssLength> = 1,
				spread: Extended<CssLength> = 0,
				inset: Extended<boolean> = false)
{
	return { x, y, color, blur, spread, inset };
}
