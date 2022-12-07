import { Styleset, IIDRule, ClassMoniker } from "mimcss";
/**
 * Type for defining the id property of HTML elements
 */
export declare type IDPropType = string | number | IIDRule;
/** Type for `crossorigin` attribute used for some HTML and SVG elements */
export declare type CrossoriginPropType = "anonymous" | "use-credentials";
/** Type for `formenctype` attribute used for some HTML and SVG elements */
export declare type FormenctypePropType = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
/** Type for `formmethod` attribute used for some HTML and SVG elements */
export declare type FormmethodPropType = "get" | "post" | "dialog";
/** Type for `formtarget` attribute used for some HTML and SVG elements */
export declare type FormtargetPropType = string | "_self" | "_blank" | "_parent" | "_top";
/** Type for `referrerpolicy` attribute used for some HTML and SVG elements */
export declare type ReferrerPolicyPropType = "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "unsafe-url";
/** Type for `fetchpriority` attribute used for some HTML and SVG elements */
export declare type FetchpriorityPropType = "high" | "low" | "auto";
/**
 * Represents standard element properties present on all HTML and SVG elements
 */
export interface IElementAttrs {
    class?: ClassMoniker;
    className?: ClassMoniker;
    draggable?: "true" | "false";
    id?: IDPropType;
    lang?: string;
    role?: string;
    style?: string | Styleset;
    tabindex?: number;
    tabIndex?: number;
    xmlns?: string;
}
/**
 * Represents standard element events that can be fired by all HTML and SVG elements.
 */
export interface IElementEvents extends GlobalEventHandlersEventMap, ElementEventMap, DocumentAndElementEventHandlersEventMap {
}
//# sourceMappingURL=ElementTypes.d.ts.map