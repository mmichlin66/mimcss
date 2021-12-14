import {ExtendedMediaFeatureset, IMediaQueryProxy, ISupportsQueryProxy, MediaStatement, SupportsStatement} from "./MediaTypes";
import {Styleset, ExtendedIStyleset, StringStyleset, IStyleset} from "./Stylesets"
import {sp2s, s_registerSP, s2ss, styleset2s} from "../impl/StyleImpl"
import {getActivator} from "../impl/SchedulingImpl";
import {media2s, supports2s} from "../impl/MiscImpl";
import {tag2s} from "../impl/Utils";



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
 * @param stylePropName Style property name that determines how the value should be converted
 * to a CSS compliant string.
 * @param stylePropValue Value to convert.
 */
export const getStylePropValue = <K extends keyof IStyleset>( stylePropName: K,
	stylePropValue: ExtendedIStyleset[K]): string => sp2s( stylePropName, stylePropValue);



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
export const stylesetToString = (styleset: Styleset): string => styleset2s( styleset);



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


// functions on HTML and SVG element prototypes
HTMLElement.prototype.setStyleProp = setThisElementStyleProp;
SVGElement.prototype.setStyleProp = setThisElementStyleProp;

HTMLElement.prototype.setStyleset = setThisElementStyle;
SVGElement.prototype.setStyleset = setThisElementStyle;



// Sets style property on HTML or SVG element
function setThisElementStyleProp<K extends keyof IStyleset>( name: K,
    value: ExtendedIStyleset[K], schedulerType?: number): void
{
    setElementStyleProp( this, name, value, schedulerType);
}



function setThisElementStyle( styleset: Styleset, schedulerType?: number): void
{
    setElementStyle( this, styleset, schedulerType);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// @media and @supports queries.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Tag function that represents a media query. This function allows expressing media queries in
 * a natural string form while embedding media feature values in type safe manner. The string can
 * contain any media expressions while the embedded objects must be of type [[IMediaFeatureset]].
 * Multiple features in the feature set will be expanded into clauses combined with the "and"
 * operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // screen and (min-width: 400px) and (max-width: 600px) and (orientation: portrait)
 *     ifNarrowDevice = this.$media(
 *         css.media`screen and ${{width:[400,600], orientation: "portrait"}}`, ...)
 * }
 * ```
 */
 export const media = (parts: TemplateStringsArray, ...params: ExtendedMediaFeatureset[]): IMediaQueryProxy =>
    () => tag2s( parts, params, v => typeof v === "string" ? v : media2s(v));



/**
 * Converts the given media query value to the CSS media query string. This function can be used
 * by libraries that allow specifying [[MediaStatement]] for the `media` attribute of elements
 * such as `<link>`, `<style>` and `<source>`
 */
export const mediaToString = (query: MediaStatement): string => media2s( query);



/**
 * Tag function that represents a supports query. This function allows expressing supports
 * queries in a natural string form while embedding media feature values in type safe manner. The
 * string can contain any supports expressions while the embedded objects must be of type
 * Styleset. Multiple properties in the styleset will be expanded into clauses combined with the
 * "or" operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // not (transform-origin: 30px 30px 30px)
 *     ifNoTransformOrigin = this.$supports(
 *         css.supports`not (${{transform-origin: [30, 30, 30]}})`, ...)
 * }
 * ```
 */
 export const supports = (parts: TemplateStringsArray, ...params: Styleset[]): ISupportsQueryProxy =>
    () => tag2s( parts, params, v => typeof v === "string" ? v : supports2s(v));



/**
 * Converts the given supports query value to the CSS supports query string.
 */
export const supportsToString = (query: SupportsStatement): string => supports2s( query);



