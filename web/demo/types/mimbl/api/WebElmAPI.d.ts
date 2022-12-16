import { WebElmAttrOptions, WebElmConstructor, WebElmFromHtmlConverter, WebElmOptions } from "./WebElmTypes";
/**
 * Structure defining options that determine an attribute behavior.
 */
export declare type WebElmAttrDefinition = {
    /** Name of the element attribute */
    attrName?: string;
    /** Name of the element property */
    propName?: string;
    /** Optional converter function */
    options?: WebElmAttrOptions;
};
/**
 * Creates and returns a new class from which custom Web elements should derive.
 * The class returned from this function inherits from the HTMLElement-derived class specified
 * as the parameter and implements the [[IComponent]] and [[IComponentEx]] interfaces.
 *
 * **Usage:**
 *
 * ```typescript
 * @mim.webElm("custom-button")
 * class MyCustomButton extends mim.WebElmEx(HTMLButtonElement)
 * {
 *    render(): any { return ... }
 * }
 * ```
 *
 * @typeparam TElm Class deriving from HTMLElement, from which the resulting class will inherit.
 * @typeparam TAttrs Type that maps attribute names to attribute types.
 * @typeparam TEvents Type that maps event names (a.k.a event types) to either Event-derived
 * classes (e.g. MouseEvent) or any other type. The latter will be interpreted as a type of the
 * `detail` property of a CustomEvent.
 *
 * @param elmClass HTMLElement-derived class from which the returned class will derive.
 * @returns Class that inherits from the given HTMLElement-derived class that imlements all
 * the internal logic of custom Web elements.
 */
export declare function WebElmEx<TElm extends HTMLElement = HTMLElement, TAttrs extends {} = {}, TEvents extends {} = {}>(elmClass: new () => TElm): WebElmConstructor<TElm, TAttrs, TEvents>;
/**
 * Function that returns a class from which regular custom Web elements (which don't need to
 * customize existing built-in elements) should inherit. The return class derives directly from
 * HTMLElement.
 *
 * **Usage:**
 *
 * ```typescript
 * @mim.webElm("my-elelemnt")
 * class MyCustomElement extends mim.WebElm()
 * {
 *    render(): any { return ... }
 * }
 * ```
 *
 * @typeparam TAttrs Type that maps attribute names to attribute types.
 * @typeparam TEvents Type that maps event names (a.k.a event types) to either Event-derived
 * classes (e.g. MouseEvent) or any other type. The latter will be interpreted as a type of the
 * `detail` property of a CustomEvent.
 */
export declare const WebElm: <TAttrs extends {} = {}, TEvents extends {} = {}>() => WebElmConstructor<HTMLElement, TAttrs, TEvents>;
/**
 * Decorator function for custom element components.
 *
 * @param name Name of the custom HTML element
 * @param options Configuration options for the custom element.
 * @param attrs Information about the element's attributes
 */
export declare function webElm(name: string, options?: WebElmOptions, attrs?: WebElmAttrDefinition[]): (webElmClass: WebElmConstructor) => void;
/**
 * Decorates a property of custom Web Element class without providing any options. The name
 * of the HTML attribute is set to be the name of the property.
 * @param target Custom Web Element class
 * @param propName Property name to which the decorator was applied
 */
export declare function attr(target: any, propName: string): any;
/**
 * Decorates a property of custom Web Element class specifying the name of the HTML attribute.
 * @param attrName Name of HTML attribute to be reflected by the property.
 */
export declare function attr(attrName: string): any;
/**
 * Decorates a property of custom Web Element class specifying some attribute options.
 * @param attrOptions Options defining attribute/property behavior.
 */
export declare function attr(attrOptions: WebElmAttrOptions): any;
/**
 * Decorates a property of custom Web Element class specifying the name of the HTML attribute
 * and some attribute options.
 * @param attrName Name of HTML attribute to be reflected by the property.
 * @param attrOptions Options defining attribute/property behavior.
 */
export declare function attr(attrName: string, attrOptions: WebElmAttrOptions): any;
/**
 * Registers the given Web Element with optional parameters.
 *
 * @param webElmClass custom Web Element class
 * @param name Name of the custom Web Element to use in HTML
 * @param options Shadow DOM and form-related options
 * @param attrs Information about the element's attributes
 */
export declare function registerWebElm(webElmClass: WebElmConstructor, name?: string, options?: WebElmOptions, attrs?: WebElmAttrDefinition[]): void;
/**
 * Built-in attribute converter that converts string value to a number.
 */
export declare const NumberConverter: WebElmFromHtmlConverter;
/**
 * Built-in attribute converter that converts string value to an integer number.
 */
export declare const IntConverter: WebElmFromHtmlConverter;
/**
 * Built-in attribute converter that converts string value to a Boolean value.
 */
export declare const BoolConverter: WebElmFromHtmlConverter;
//# sourceMappingURL=WebElmAPI.d.ts.map