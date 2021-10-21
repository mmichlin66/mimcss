import {SelectorItem, ISelectorProxy, IRawProxy, Extended, IUrlFunc, ICursorFunc} from "./CoreTypes"
import {fdo, mv2s, tag2s} from "../impl/Utils";
import { IIDRule } from "./RuleTypes";




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses. This function can be used wherever the
 * [[CssSelector]] or [[SelectorItem]] types are allowed. The parameters embedded into the string
 * must conform to the [[SelectorItem]] type.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // css: ul > li {...}
 *     s1 = this.$style( css.selector`ul > li`, {...})
 *
 *     // css: ul.c1:hover {...}
 *     c1 = this.$class()
 *     s2 = this.$style( css.selector`ul.${this.c1}:hover`, {...})
 * }
 * ```
 */
export const selector = (parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy =>
    () => tag2s( parts, params);



/**
 * The `raw` function allows specifying arbitrary text for properties whose type normally doesn't
 * allow strings.This function is a tag function and must be invoked with the template string
 * without parentheses. The `raw` function can be used for any style property. Note, however, that
 * no validation checks are performed on the structure of the string. If the string isn't valid
 * for the style property, the property will not become part of the style rule inserted into the
 * DOM.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     poly = this.$class({
 *         clipPath: css.raw`polygon(50% 20%, 90% 80%, 10% 80%)`
 *     })
 * }
 * ```
 */
export const raw = (parts: TemplateStringsArray, ...params: any[]): IRawProxy =>
    () => tag2s( parts, params);



/**
 * Returns a function representing the CSS `url()` function. The string parameter
 * will be wrapped in a `url()` invocation. The function can also accept the IIDRule object to
 * create url(#element) invocation, which is often used to address SVG elements by their IDs.
 */
export const url = (p: Extended<string | IIDRule>): IUrlFunc => ({ fn: "url", p });



/**
 * Returns a function representing the CSS `url()` function.
 */
export function cursor( p: Extended<string | IIDRule>): ICursorFunc;

/**
 * Returns a function representing the CSS `url()` function followed by two numbers
 * indicating the cursor hotspot.
 */
export function cursor( p: Extended<string | IIDRule>, x: number, y: number): ICursorFunc;

// Implementation
export function cursor( url: Extended<string | IIDRule>, x?: number, y?: number): ICursorFunc
{
    return { fn: "cursor", url, x, y };
}

fdo.cursor = (v: ICursorFunc) => mv2s( [url(v.url), v.x, v.y])



