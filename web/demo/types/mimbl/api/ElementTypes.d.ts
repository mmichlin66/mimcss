import { Styleset, IIDRule, ClassMoniker } from "mimcss";
/**
 * Type for defining the id property of HTML elements
 */
export declare type IDPropType = string | number | IIDRule;
/** Type for `crossorigin` attribute used for some HTML and SVG elements */
export declare type CrossoriginPropType = "anonymous" | "use-credentials" | boolean;
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
 * Type for custom `data` attribute that Combines `data-*` properties into one object, so that it
 * is easier (less verbose) to specify them.
 */
export declare type DatasetPropType = {
    [K: string]: any;
};
/**
 * Boolean values in aria are specified as strings`"true"` or `"false"`
 */
export declare type AriaBoolean = boolean | "true" | "false";
/**
 * Defines a set of aria properties
 */
export declare type Ariaset = {
    activedescendant?: IDPropType;
    atomic?: AriaBoolean;
    autocomplete?: "none" | "inline" | "list" | "both";
    braillelabel?: string;
    brailleroledescription?: string;
    busy?: AriaBoolean;
    checked?: AriaBoolean | "mixed" | "undefined";
    colcount?: number;
    colindex?: number;
    colindextext?: string;
    colspan?: number;
    controls?: IDPropType | IDPropType[];
    current?: AriaBoolean | "page" | "step" | "location" | "date" | "time";
    describedby?: IDPropType | IDPropType[];
    description?: string;
    details?: IDPropType | IDPropType[];
    disabled?: AriaBoolean;
    errormessage?: IDPropType | IDPropType[];
    expanded?: AriaBoolean | "undefined";
    flowto?: IDPropType | IDPropType[];
    haspopup?: AriaBoolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
    hidden?: AriaBoolean | "undefined";
    invalid?: AriaBoolean | "grammar" | "spelling";
    keyshortcuts?: string | string[];
    label?: AriaBoolean;
    labelledby?: IDPropType | IDPropType[];
    level?: number;
    live?: "assertive" | "off" | "polite";
    modal?: AriaBoolean;
    multiline?: AriaBoolean;
    multiselectable?: AriaBoolean;
    orientation?: "horizontal" | "vertical" | "undefined";
    owns?: IDPropType | IDPropType[];
    placeholder?: string;
    posinset?: number;
    pressed?: AriaBoolean | "mixed" | "undefined";
    readonly?: AriaBoolean;
    relevant?: "additions" | "all" | "removals" | "text" | "additions text";
    required?: AriaBoolean;
    roledescription?: string;
    rowcount?: number;
    rowindex?: number;
    rowindextext?: string;
    rowspan?: number;
    selected?: AriaBoolean | "undefined";
    setsize?: number;
    sort?: "ascending" | "descending" | "none" | "other";
    valuemax?: number;
    valuemin?: number;
    valuenow?: number;
    valuetext?: string;
};
/**
 * Represents standard element properties present on all HTML and SVG elements
 */
export interface IElementAttrs {
    class?: ClassMoniker;
    draggable?: "true" | "false";
    id?: IDPropType;
    lang?: string;
    role?: string;
    style?: string | Styleset;
    tabindex?: number;
    xmlns?: string;
    /**
     * Combines `data-*` properties into one object, so that it is easier (less verbose) to specify
     * them. When this object is serialized to HTML element, each property name is converted to
     * dash-style and prefixed with the `data-` string. The values are always converted to strings
     * according to the following rules:
     *   - strings are returned as is.
     *   - arrays are converted by converting their items using these rules and joining them with spaces.
     *   - everything else is converted by calling the toString method.
     */
    dataset?: DatasetPropType;
    /**
     * Combines `aria-*` properties into one object, so that it is easier (less verbose) to specify
     * them. When this object is serialized to HTML element, each property name is converted to
     * dash-style and prefixed with the `aria-` string. The values are always converted to strings
     * according to the following rules:
     *   - strings are returned as is.
     *   - arrays are converted by converting their items using these rules and joining them with spaces.
     *   - everything else is converted by calling the toString method.
     */
    aria?: Ariaset;
}
/**
 * Represents standard element events that can be fired by all elements.
 */
export interface IElementEvents extends GlobalEventHandlersEventMap, ElementEventMap, DocumentAndElementEventHandlersEventMap {
}
//# sourceMappingURL=ElementTypes.d.ts.map