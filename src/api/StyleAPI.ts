import {MediaStatement, SupportsStatement} from "./MediaTypes";
import {Styleset, ExtendedIStyleset, IStyleset} from "./Stylesets"
import {sp2s, s_registerSP, ss2s, sp2elm, ss2elm} from "../impl/StyleImpl"
import {scheduleAction} from "../impl/SchedulingImpl";
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
 * {@link IStyleset} interface via the module augmentation technique if the conversion to string
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
 * to a CSS compliant string. The name can be given in dash-case or camelCase form.
 * @param value Value to convert.
 * @returns String value of the style property.
 */
export function getStylePropValue<K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K]): string;

/**
 * Converts the given value corresponding to the given style property to a CSS string. The caller
 * is responsible for ensuring the value type is correct for the given style property. If the
 * property name is not a valid CSS property, empty string is returned.
 * @param name Style property name that determines how the value should be converted
 * to a CSS compliant string. The name can be given in dash-case or camelCase form.
 * @param value Value to convert.
 * @returns String value of the style property.
 */
export function getStylePropValue(name: string, value: any): string;

// Implementation
export function getStylePropValue(name: string, value: any): string
{
    return sp2s( name, value);
}



/**
 * Sets, updates or removes the given style property for the given DOM element.
 *
 * @typeparam K A key in the {@link IStyleset} interface, whcih defines the property name.
 * @param elm DOM element whose styles will be set.
 * @param name Name of the style property. This can be either dash-case or camelCase name.
 * @param value New value for the style property. The value can be of any type allowed for the
 * property in the {@link IStyleset} interface. If the value is `null` or `undefined`, the style property
 * is removed from the element's style object.
 */
export const setElementStyleProp = <K extends keyof IStyleset>(elm: ElementCSSInlineStyle, name: K,
        value: ExtendedIStyleset[K] | null | undefined, schedulerType?: number): void =>
    scheduleAction(() => sp2elm(elm, name, value), schedulerType);



/**
 * Sets, updates or removes values of the style properties from the given Styleset object to the
 * `style` attribute of the given DOM element.
 * @param elm DOM element whose styles will be set.
 * @param styleset Styleset object which provides values for style properties.
 * @param merge Flag indicating whether the new styleset should completely replace the
 * existing element styles with the new styles (false) or merge the new styles with the
 * existing ones (true). The default value is false.
 * @param schedulerType Scheduler identifier. If omitted, the current default scheduler will be used.
 */
export const setElementStyle = (elm: ElementCSSInlineStyle, styleset: Styleset | null | undefined,
        merge?: boolean, schedulerType?: number): void =>
    scheduleAction(() => ss2elm(elm, styleset, merge), schedulerType);



/**
 * Serializes the given {@link Styleset} to a string.
 * @param styleset
 */
export const stylesetToString = (styleset: Styleset): string => ss2s( styleset);



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
         * Sets, updates or removes the given value to the given style property of the element.
         * This method schedules the update of an individual property in the nextMimbl tick.
         * @param name Property name
         * @param value New property value to set.
         * @param schedulerType Scheduler identifier. If omitted, the current default scheduler
         * will be used.
         */
        setStyleProp<K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K],
            schedulerType?: number): void;

        /**
         * Replaces or merges the element's styles with the given styleset. This method schedules
         * the style update in the next Mimbl tick.
         * @param styleset Styleset to merge or replace
         * @param merge Flag indicating whether the new styleset should completely replace the
         * existing element styles with the new styles (false) or merge the new styles with the
         * existing ones (true). The default value is false.
         * @param schedulerType Scheduler identifier. If omitted, the current default scheduler
         * will be used.
         */
        setStyleset( styleset: Styleset, merge?: boolean, schedulerType?: number): void;

        /**
         * The styleset property exposes an object through which individual style properties can
         * be set with their IStyleset-defined types. It is a lso possible to assign a Styleset
         * object to this property, which will replace all existing styles for the element. As
         * opposed to {@link setStyleProp} and {@link setStyleset} methods, assigning to the
         * `styleset` property or assigning individual style properties throught it works
         * immediately - without any scheduling.
         */
        styleset: Styleset;
    }
}

// Just for size optimization
const HTMLElementPrototype = HTMLElement.prototype;
const SVGElementPrototype = SVGElement.prototype;
const MathMLElementPrototype = MathMLElement.prototype;

// Sets style property on DOM element
HTMLElementPrototype.setStyleProp = SVGElementPrototype.setStyleProp = MathMLElementPrototype.setStyleProp =
    function <K extends keyof IStyleset>( name: K, value: ExtendedIStyleset[K], schedulerType?: number): void
    {
        setElementStyleProp(this, name, value, schedulerType);
    }



// Sets styleset on DOM element
HTMLElementPrototype.setStyleset = SVGElementPrototype.setStyleset = MathMLElementPrototype.setStyleset =
    function( styleset: Styleset, merge?: boolean, schedulerType?: number): void
    {
        setElementStyle(this, styleset, merge, schedulerType);
    }



// Define styleset property on DOM elements, which will return a proxy on its style object
// with overridden set() method.
const stylesetPropDescr: PropertyDescriptor = {
    get(): Styleset { return ensureStylesetProxyHandler(this).proxy as Styleset; },
    set(ss: Styleset): void { ss2elm(this, ss); }
};

Object.defineProperty(HTMLElementPrototype, "styleset", stylesetPropDescr);
Object.defineProperty(SVGElementPrototype, "styleset", stylesetPropDescr);
Object.defineProperty(MathMLElementPrototype, "styleset", stylesetPropDescr);

/** Symbol under which we keep Styleset proxy object on DOM element prototypes */
const symElmStyleset = Symbol("styleset");

/** Creates new or gets existing proxy handler for Styleset object on a given element */
function ensureStylesetProxyHandler(elm: ElementCSSInlineStyle): StylesetProxyHandler
{
    let handler = elm[symElmStyleset] as StylesetProxyHandler;
    if (!handler)
    {
        elm[symElmStyleset] = handler = new StylesetProxyHandler();
        handler.elm = elm;
        handler.proxy = new Proxy(elm.style, handler);
    }
    return handler;
}

/**
 * Proxy handler for the Styleset object on DOM elements. It only overrides the set() method
 */
class StylesetProxyHandler implements ProxyHandler<Styleset>
{
    /** Keeps the proxy object for which this is the handler */
    public proxy: any;

    /** Keeps the element for whose style object this is a proxy handler */
    public elm: ElementCSSInlineStyle;

    public set(target: any, prop: PropertyKey, value: any, receiver: any): boolean
    {
        sp2elm(this.elm, prop as string, value);
        return true;
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// @media and @supports queries.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Converts the given media query value to the CSS media query string. This function can be used
 * by libraries that allow specifying {@link MediaStatement} for the `media` attribute of elements
 * such as `<link>`, `<style>` and `<source>`
 */
export const mediaToString = (query: MediaStatement): string => query ? media2s( query) : "";



/**
 * Converts the given supports query value to the CSS supports query string.
 */
export const supportsToString = (query: SupportsStatement): string => query ? supports2s( query) : "";



