import {IStringProxy} from "./CoreTypes";
import {IStyleDefinitionClass, IVarRule, IStyleDefinition} from "./RuleTypes";
import {ExtendedMediaFeatureset, IMediaQueryProxy, ISupportsQueryProxy, MediaStatement, SupportsStatement} from "./MediaTypes";
import {
    Styleset, ExtendedBaseStyleset, StringStyleset, IStyleset, VarTemplateName,
    ExtendedVarValue, ICssSerializer
} from "./StyleTypes"
import {styleProp2s, forAllPropsInStylset, s_registerStylePropertyInfo} from "../impl/StyleImpl"
import {scheduleStyleUpdate} from "../impl/SchedulingImpl";
import {IRuleSerializationContext} from "../rules/Rule";
import {processInstanceOrClass, serializeInstance} from "../rules/RuleContainer";
import {media2s, supports2s} from "../impl/MiscImpl";
import { tag2s } from "../impl/Utils";



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
export function getStylePropValue<K extends keyof ExtendedBaseStyleset>( stylePropName: K,
	stylePropValue: ExtendedBaseStyleset[K]): string
{
	return styleProp2s( stylePropName, stylePropValue);
}



// Sets style property on HTML or SVG element
function setElementStyleProp<K extends keyof IStyleset>( elm: ElementCSSInlineStyle, name: K,
    value: ExtendedBaseStyleset[K], schedulerType?: number): void
{
    scheduleStyleUpdate( elm, name, styleProp2s( name, value), false, schedulerType);
}



/**
 * Sets values of the style properties from the given Styleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML/SVG element whose styles will be set.
 * @param styleset Styleset object which provides values for style properties.
 */
export function setElementStyle( elm: ElementCSSInlineStyle, styleset: Styleset | null | undefined,
	schedulerType?: number): void
{
    setElementStringStyle( elm, styleset ? stylesetToStringStyleset(styleset) : null, schedulerType);
}



/**
 * Sets values of the style properties from the given StringStyleset object to the `style` attribute
 * of the given HTML element.
 * @param elm HTML/SVG element whose styles will be set.
 * @param styleset StringStyleset object which provides values for style properties.
 */
export function setElementStringStyle( elm: ElementCSSInlineStyle, styleset: StringStyleset | null | undefined,
	schedulerType?: number): void
{
    scheduleStyleUpdate( elm, null, styleset, false, schedulerType);
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
 * their values set to `"unset"`. If there is no differences between the two stylesets null is
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



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// CSS functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing the invocation of the `var()` CSS function for the given custom
 * CSS property with optional fallbacks. Usually, when you want to refer to a custom CSS property
 * in style rules, it is enough to just refer to the style definition property created using the
 * [[$var]] function; however, if you want to provide a fallback value, you must use this function.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // create custom CSS property but without an assigned value; it can be assigned
 *     // later programmatically
 *     bgColor = css.$var( "color")
 *
 *     div = css.$tag( "div", {
 *         // use the custom CSS property with the given fallback value
 *         backgroundColor: css.usevar( this.bgColor, "beige")
 *     })
 * }
 * ```
 *
 * @typeparam K Key of the [[IVarTemplateStyleset]] interface that determines the type of the
 * custom CSS property and of the fallback value.
 * @param varObj Custom CSS property object created using the [[$var]] function.
 * @param fallback Fallback value that will be used if the custom CSS property isnt set.
 * @returns
 */
export function usevar<K extends VarTemplateName>( varObj: IVarRule<K>, fallback?: ExtendedVarValue<K>): IStringProxy
{
    return () => fallback
        ? `var(--${varObj.name},${styleProp2s( varObj.template, fallback)})`
        : `var(--${varObj.name})`;
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
        setStyleProp<K extends keyof IStyleset>( name: K, value: ExtendedBaseStyleset[K],
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
    value: ExtendedBaseStyleset[K], schedulerType?: number): void
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
 *     ifNarrowDevice = css.$media(
 *         css.media`screen and ${{width:[400,600], orientation: "portrait"}}`, ...)
 * }
 * ```
 */
 export function media( parts: TemplateStringsArray, ...params: ExtendedMediaFeatureset[]): IMediaQueryProxy
{
    return () => tag2s( parts, params, v => typeof v === "string" ? v : media2s(v));
}



/**
 * Converts the given media query value to the CSS media query string. This function can be used
 * by libraries that allow specifying [[MediaStatement]] for the `media` attribute of elements
 * such as `<link>`, `<style>` and `<source>`
 */
export function mediaToString( query: MediaStatement): string
{
    return media2s( query);
}



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
 *     ifNoTransformOrigin = css.$supports(
 *         css.supports`not (${{transform-origin: [30, 30, 30]}})`, ...)
 * }
 * ```
 */
 export function supports( parts: TemplateStringsArray, ...params: Styleset[]): ISupportsQueryProxy
{
    return () => tag2s( parts, params, v => typeof v === "string" ? v : supports2s(v));
}



/**
 * Converts the given supports query value to the CSS supports query string.
 */
export function supportsToString( query: SupportsStatement): string
{
    return supports2s( query);
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Style serialization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Creates a new ICssSerializer object that allows adding style definition classes
 * and instances and serializing them to a string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
export function createCssSerializer(): ICssSerializer
{
    return new CssSerializer();
}



/**
 * Serializes one or more style definition classes and instances and returns their CSS string
 * representation. This can be used for server-side rendering when the resultant string can be
 * set as the content of a `<style>` element.
 */
export function serializeToCSS( ...args: (IStyleDefinition | IStyleDefinitionClass)[]): string
{
    if (!args || args.length === 0)
        return "";

    let serializer = new CssSerializer();
    args.forEach( instOrClass => serializer.add( instOrClass));
    return serializer.serialize();
}



/**
 * The StyleSerializer class allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
class CssSerializer implements ICssSerializer
{
    /**
     * Adds style definition class or instance.
     */
    public add( instOrClass: IStyleDefinition | IStyleDefinitionClass): void
    {
        let instance = processInstanceOrClass( instOrClass);
        if (!instance || this.instances.has(instance))
            return;

        this.instances.add( instance);
    }

    /**
     * Returns concatenated string representation of all CSS rules added to the context.
     */
    public serialize(): string
    {
        if (this.instances.size === 0)
            return "";

        let ctx = new RuleSerializationContext();
        this.instances.forEach( instance => ctx.addStyleDefinition( instance));
        return ctx.topLevelBuf + ctx.nonTopLevelBuf;
    }

    // Set of style definition instances. This is needed to not add style definitions more than once
    instances = new Set<IStyleDefinition>();
}



/**
 * The RuleSerializationContext class implements the IRuleSerializationContext interface and
 * accumulates text of serialized CSS rules.
 */
class RuleSerializationContext implements IRuleSerializationContext
{
    // Adds rule text
    public addRuleText( s: string, isTopLevelRule?: boolean): void
    {
        if (isTopLevelRule)
            this.topLevelBuf += s + "\n";
        else
            this.nonTopLevelBuf += s + "\n";
    }

    // Adds rule text
    public addStyleDefinition( instance: IStyleDefinition): void
    {
        if (!this.instances.has( instance))
        {
            this.instances.add( instance);
            serializeInstance( instance, this);
        }
    }

    // String buffer that accumulates top-level rule texts.
    public topLevelBuf = "";

    // String buffer that accumulates non-top-level rule texts.
    public nonTopLevelBuf = "";

    // Set of style definition instances that were already serialized in this context.
    private instances = new Set<IStyleDefinition>();
}



