import {MediaStatement, SupportsStatement} from "./MediaTypes";
import {Styleset, ExtendedIStyleset, StringStyleset, IStyleset} from "./Stylesets"
import {sp2s, s_registerSP, s2ss, s2s} from "../impl/StyleImpl"
import {getActivator} from "../impl/SchedulingImpl";
import {media2s, supports2s} from "../impl/MiscImpl";
import { virtMerge } from "../impl/Virt";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Styleset manipulation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Registers the given function to be used for converting values of the given style property to
 * string. The `registerStyleProperty` function must be used after adding the property to the
 * [[IStyleset]] interface via the module augmentation technique if the conversion to string
 * requires non-standard operations. This function should not be called for propeties whose
 * values only include numbers, strings, functions returning a string, objects whose `toString`
 * method produces the necessary string or arrays of the above types.
 *
 * This function can be used for style properties that are not yet supported by Mimcss. This is
 * also the way to support properties with vendor prefixes.
 */
export const registerStyleProperty = (name: string, toStringFunc: (v: any) => string): boolean =>
    s_registerSP( name, toStringFunc);



/**
 * Converts the given value corresponding to the given style property to a CSS string.
 * @param name Style property name that determines how the value should be converted
 * to a CSS compliant string. The name can be given in dash-case or camel-case form.
 * @param value Value to convert.
 * @returns String value of the style property.
 */
export const getStylePropValue = <K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K]): string =>
    sp2s( name, value);

/**
 * Converts the given value corresponding to the given style property to a CSS string. The caller
 * is responsible for ensuring the value type is correct for the given style property. If the
 * property name is not a valid CSS property, empty string is returned.
 * @param name Style property name that determines how the value should be converted
 * to a CSS compliant string. The name can be given in dash-case or camel-case form.
 * @param value Value to convert.
 * @returns String value of the style property.
 */
export const stylePropValueToString = (name: string, value: any): string => sp2s( name, value);



// Sets style property on HTML or SVG element
const setElementStyleProp = <K extends keyof IStyleset>( elm: ElementCSSInlineStyle, name: K,
    value: ExtendedIStyleset[K], schedulerType?: number): void =>
    getActivator(schedulerType).updateStyle( elm, name, sp2s( name, value), false);



/**
 * Sets values of the style properties from the given Styleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML/SVG element whose styles will be set.
 * @param styleset Styleset object which provides values for style properties.
 */
export const setElementStyle = (elm: ElementCSSInlineStyle, styleset: Styleset | null | undefined,
	schedulerType?: number): void =>
    setElementStringStyle( elm, styleset ? stylesetToStringStyleset(styleset) : null, schedulerType);



/**
 * Sets values of the style properties from the given StringStyleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML/SVG element whose styles will be set.
 * @param styleset [[StringStyleset]] object which provides values for style properties.
 */
export const setElementStringStyle = (elm: ElementCSSInlineStyle, styleset: StringStyleset | null | undefined,
	schedulerType?: number): void =>
    getActivator(schedulerType).updateStyle( elm, null, styleset, false);



/**
 * Serializes the given [[Styleset]] to a string.
 * @param styleset
 */
export const stylesetToString = (styleset: Styleset): string => s2s( styleset);



/**
 * Converts the given [[Styleset]] object into an object, where each Styleset's property is
 * converted to its string value.
 * @param styleset
 */
export const stylesetToStringStyleset = (styleset: Styleset): StringStyleset => s2ss( styleset);



/**
 * Compares two Styleset objects by converting style properties to strings and returns an object
 * that contains string values of properties that were new or have different values in the new
 * styleset and undefined values for properties that exist in the old styleset but don't exist
 * in the new one.
 * @param oldStyleset
 * @param newStyleset
 * @returns StringStyleset object with properties that have different values in the old and new
 * stylesets. Properties that existed in the old but don't exist in the new styleset, will have
 * their values set to `"unset"`. If there is no differences between the two stylesets null is
 * returned.
 */
export const diffStylesets = (oldStyleset: Styleset, newStyleset: Styleset): StringStyleset | null =>
{
	if (!oldStyleset && !newStyleset)
		return null;
	else if (!oldStyleset)
		return s2ss( newStyleset);
	else if (!newStyleset)
		return s2ss( oldStyleset);

	// first convert both stylesets to their string versions
	let oldStringStyleset =	s2ss( oldStyleset);
	let newStringStyleset =	s2ss( newStyleset);

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



/**
 * Recursively merges properties of the given list of objects to the given target. If the target
 * is not specified, a plain object is created, to which all other objects are merged, and
 * returned; otherwise, the input target object is returned.
 *
 * When merging a source object to a target, all properties defined in the source will replace the
 * same-named properties in the target. The target properties that are not defined in the source,
 * will remain intact. If the source has properties with the null or undefined values, the
 * same-named properties will be removed from the target. When the same-named properties in the
 * source and in the target are both plain objects, the process continues to merge their properties
 * recursively.
 *
 * Although the types of objects in the funtion signature are specified as `any`, the primary
 * use of this function is to merge style definition objects. This can be used by components to
 * override their default styles with caller provided styles.
 *
 * @param target Object to merge properties to. If undefined or null, a plain object is created as
 * target.
 * @param objects List of objects to merge properties from
 * @returns The target object with merged properties.
 */
export const mergeStylesheets = (target: any, ...objects: any[]): any => virtMerge( target, ...objects);



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Adding methods to several DOM prototypes using module augmentation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

declare global
{
    interface ElementCSSInlineStyle
    {
        /**
         * Set the given value to the given style property of the element.
         * @param name Property name
         * @param value New property value to set.
         * @param schedulerType Scheduler identifier. If omitted, the current default scheduler
         * will be used.
         */
        setStyleProp<K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K],
            schedulerType?: number): void;

        /**
         * Merges or replaces the element's styles with the given styleset.
         * @param styleset Styleset to set or replace
         * @param replace Flag indicating whether the new styleset should completely replace the
         * existing element styles with the new styles (true) or merge the new styles with the
         * existing ones (false). The default value is false.
         * @param schedulerType Scheduler identifier. If omitted, the current default scheduler
         * will be used.
         */
        setStyleset( styleset: Styleset, schedulerType?: number): void;
    }
}

// Sets style property on HTML or SVG element
HTMLElement.prototype.setStyleProp = SVGElement.prototype.setStyleProp =
    function <K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K],
        schedulerType?: number): void
{
    setElementStyleProp( this, name, value, schedulerType);
}

// Sets styleset on HTML or SVG element
HTMLElement.prototype.setStyleset = SVGElement.prototype.setStyleset =
    function( styleset: Styleset, schedulerType?: number): void
{
    setElementStyle( this, styleset, schedulerType);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// @media and @supports queries.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given media query value to the CSS media query string. This function can be used
 * by libraries that allow specifying [[MediaStatement]] for the `media` attribute of elements
 * such as `<link>`, `<style>` and `<source>`
 */
export const mediaToString = (query: MediaStatement): string => query ? media2s( query) : "";



/**
 * Converts the given supports query value to the CSS supports query string.
 */
export const supportsToString = (query: SupportsStatement): string => query ? supports2s( query) : "";



