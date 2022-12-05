import { IComponent, IComponentEx } from "./CompTypes";
/**
 * Defines function signature for converting an attribute string value to the corresponding
 * property's type. Converter functions are specified as part of attribute options, e.g. in the
 * [[attr]] decorator.
 *
 * The converter functions are called as part of custom Web element functionality and the
 * `this` parameter points to the instance of the element whose attribute is bein converted.
 *
 * @param stringValue Attribute's string value to convert to the corresponding type.
 * @param attrName Name of the attribute whose value is being converted from string
 */
export declare type WebElmFromHtmlConverter = (this: HTMLElement, stringValue: string | null | undefined, attrName: string) => any;
/**
 * Defines function signature for converting a value to the corresponding attributes's
 * string. Converter functions are specified as part of attribute options, e.g. in the
 * [[attr]] decorator.
 *
 * The converter functions are called as part of custom Web element functionality and the
 * `this` parameter points to the instance of the element whose attribute is bein converted.
 *
 * @param value Value to convert to string.
 * @param attrName Name of the attribute whose value is being converted to string
 */
export declare type WebElmToHtmlConverter = (this: HTMLElement, value: any, attrName: string) => string | null;
/**
 * Defines function signature for attribute change notification handler.
 */
export declare type WebElmAttrChangeHandler<T = any> = (newValue: T, attrName: string) => any;
/**
 * Options specified when defining an element attribute.
 */
export declare type WebElmAttrOptions = {
    /**
     * Flag indicating that no trigger should be created for the property reflecting the
     * attribute's value.
     */
    noTrigger?: boolean;
    /** Converter function that converts the string attribute value to a property native type */
    fromHtml?: WebElmFromHtmlConverter;
    /** Converter function that converts a value to a string that can be set to the HTML attribute */
    toHtml?: WebElmToHtmlConverter;
    /** Notification function that is called when the attribute value changes */
    onchanged?: WebElmAttrChangeHandler;
};
/**
 * Options determining behavior of the custom element. They include ShadowRootInit properties
 * (including the shadow root mode) and several additional configuration parameters.
 */
export declare type WebElmOptions = Partial<ShadowRootInit> & {
    /**
     * If defined, determines the tag name of a built-in HTML element that the custom element
     * extends.
     */
    extends?: string;
    /**
     * Determines whether or not shadow DOM root node should be created under the element. If
     * undefined or false, shadow DOM is created. If true, shadow DOM is not created.
     */
    noShadow?: boolean;
};
/**
 * Maps every property of the given type to an optional "onchanged" function that accepts the old
 * and the new values of a changed property.
 */
export declare type OnPropChangeHandlers<T> = {
    [P in keyof T & string as `onchanged_${P}`]?: (oldValue: T[P], newValue?: T[P]) => any;
};
/**
 * Represents the Mimbl component side of the custom element implementation.
 * @typeparam TAttrs Type or interface mapping attribute names to attribute types.
 * @typeparam TEvents Type or interface mapping event names to the types of the `detail`
 * property of the `CustomEvent` objects for the events.
 */
export interface IWebElm<TAttrs extends {} = {}, TEvents extends {} = {}> extends IComponent, IComponentEx {
    /**
     * Invokes the given function in the "style adoption context"; which allows all Mimcss style
     * manipulations to be reflected in the adoption context of the element's shadow DOM.
     *
     * @param func Function that is called while Mimcss adoption context related to the element's
     * shadow root is set.
     */
    processStyles(func: () => void): void;
    /**
     * Invokes the given function in the "style adoption context"; which allows all Mimcss style
     * manipulations to be reflected in the adoption context of the element's shadow DOM. The
     * `useAdoption` parameter can be set to false if the intention is to create styles under
     * the shadow root element instead of using adoption. This can be useful if the styles are
     * intended to be manipulated directly by the custom element's code, in which case each
     * custom element instance should have its own style sheet (while adoption allows sharing the
     * same style sheet between multiple instances of custom elements).
     *
     * @param useAdoption Flag indicating that stylesheets should be adopted by instead of
     * created under the shadow root. The flag is ignored if the adoption is not supported or if
     * the shadow root does not exist.
     * @param func Function that is called while Mimcss adoption context related to the element's
     * shadow root is set.
     */
    processStyles(useAdoption: boolean, func: () => void): void;
    processStyles(flagOrFunc: boolean | (() => void), func?: () => void): void;
    /**
     * Sets the value of the given attribute converting it to string if necessary.
     * @param attrName Attribute name, which is a key from the `TAttrs` type
     * @param value Value to set to the attribute. It is converted to string if necessary.
     */
    setAttr<K extends string & keyof TAttrs>(attrName: K, value: TAttrs[K]): void;
    /**
     * Gets the current value of the given attribute converting it from string to the
     * attributes type if possible.
     * @param attrName Attribute name, which is a key from the `TAttrs` type
     * @returns The current value of the attribute.
     */
    getAttr<K extends string & keyof TAttrs>(attrName: K): TAttrs[K] | string | null;
    /**
     * Determines whether the element has the attribute with the given name.
     * @param attrName Attribute name, which is a key from the `TAttrs` type
     * @returns True if the attribute with the given name exists on the element.
     */
    hasAttr<K extends string & keyof TAttrs>(attrName: K): boolean;
    /**
     * Fires an event of the given type. The `detail` parameter is interpreted differently for
     * built-in and custom events. For built-in events (that is, events whose type derives from
     * Event), this is the event object itself. For custom events, it becomes the value of the
     * `detail` property of the CustomEvent object.
     * @param eventType Event type name, which is a key from the `TEvents` type
     * @param detail Event data, whose type is defined by the type mapped to the key
     * in the `TEvents` type.
     */
    fireEvent<K extends string & keyof TEvents>(eventType: K, detail: TEvents[K]): boolean;
}
/**
 * Represents a constructor for the HTMLElement-derived classes.
 *
 * @typeparam TElm Class deriving from HTMLElement, from which the resulting class will inherit.
 * @typeparam TAttrs Type or interface mapping attribute names to attribute types.
 * @typeparam TEvents Type or interface mapping event names to the types of the `detail`
 * property of the `CustomEvent` objects for the events.
 */
export interface WebElmConstructor<TElm extends HTMLElement = HTMLElement, TAttrs extends {} = {}, TEvents extends {} = {}> {
    new (): TElm & IWebElm<TAttrs, TEvents>;
}
//# sourceMappingURL=WebElmTypes.d.ts.map