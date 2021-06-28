﻿import {Styleset, ExtendedStyleset, StringStyleset} from "./StyleTypes"
import {stylePropToString, forAllPropsInStylset, s_registerStylePropertyInfo} from "../impl/StyleFuncs"
import {s_scheduleStylePropertyUpdate} from "../rules/Scheduling";



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Styleset manipulation
//
///////////////////////////////////////////////////////////////////////////////////////////////

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



