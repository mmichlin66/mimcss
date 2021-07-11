import {IStringProxy, IQuotedProxy, SelectorItem, ISelectorProxy, DependentSelectorItem, IDependentSelectorProxy} from "./CoreTypes"
import {tag2s, WKF, wkf} from "../impl/Utils";




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses.
 */
 export function selector( parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy
 {
     return () => tag2s( parts, params);
 }

/**
 * Returns a string representation of a selector that can be used on dependent rules. This function
 * is a tag function and must be invoked with the template string without parentheses.
 */
 export function dependentSelector( parts: TemplateStringsArray,
    ...params: DependentSelectorItem[]): IDependentSelectorProxy
 {
     return () => tag2s( parts, params);
 }



/**
 * The `raw` function allows specifying arbitrary text for properties whose type normally doesn't
 * allow strings.This function is a tag function and must be invoked with the template string
 * without parentheses. The `raw` function can be used for any style property. Note, however, that
 * no validation checks are performed on the structure of the string. If the string isn't valid
 * for the style property, the property will not become part of the style rule inserted into the
 * DOM.
 *
 * **Example**
 *
 * ```typescript
 * clip-path: raw`polygon(50% 20%, 90% 80%, 10% 80%)`
 * ```
 */
export function raw( parts: TemplateStringsArray, ...params: any[]): IStringProxy
{
    return () => tag2s( parts, params);
}



/**
 * Returns a function representing a string in quotation marks.
 */
export function quoted( val: any): IQuotedProxy
{
    return () => wkf[WKF.Quoted](val);
}



