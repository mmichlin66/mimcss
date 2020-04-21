import {Extended, CssPosition, CssTime, CssLength} from "../styles/UtilTypes"
import {CssColor} from "../styles/ColorTypes"
import {CssImage} from "../styles/ImageTypes"
import {
	VarTemplateName, VarValueType, AnimationName_Single, AnimationTimingFunction_Single,
	AnimationIterationCount_Single, AnimationDirection_Single, AnimationFillMode_Single,
	AnimationPlayState_Single, Animation_Single, BackgroundSize_Single, BackgroundRepeat_Single,
	BackgroundAttachment_Single, BackgroundOrigin_Single, BackgroundClip_Single,
	Background_Single
} from "../styles/StyleTypes"
import { stylePropToString } from "../styles/StyleFuncs"
import {Styleset} from "../styles/StyleTypes"
import {CssSelector, SelectorTokenType} from "../styles/SelectorTypes";
import {formatSelector} from "../styles/SelectorFuncs";



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
export function diffStylesets( oldStyleset: Styleset, newStyleset: Styleset): { [K: string]: string }
{
	const updateVal = {};
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

	return changesExist ? updateVal : undefined;
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
	func: Extended<AnimationTimingFunction_Single> = "ease",
	delay: Extended<CssTime> = 0,
	count: Extended<AnimationIterationCount_Single> = 1,
	direction: Extended<AnimationDirection_Single> = "normal",
	mode: Extended<AnimationFillMode_Single> = "none",
	state: Extended<AnimationPlayState_Single> = "running"): Animation_Single
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
				color: Extended<CssColor>,
				blur: Extended<CssLength> = 1,
				spread: Extended<CssLength> = 0,
				inset: Extended<boolean> = false)
{
	return { x, y, color, blur, spread, inset };
}
