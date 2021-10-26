import {SelectorItem, ISelectorProxy, IRawProxy, Extended, IUrlFunc, ICursorFunc, IStringProxy} from "./CoreTypes"
import {ICounterRule, IIDRule, IVarRule} from "./RuleTypes";
import {AttrTypeKeyword, AttrUnitKeyword, ExtendedVarValue, ListStyleType_StyleType, VarTemplateName} from "./StyleTypes";
import {sp2s} from "../impl/StyleImpl";
import {f2s, fdo, mv2s, tag2s, WKF} from "../impl/Utils";




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

fdo.url = [ ["p", {str: WKF.Quoted} ]]



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



/**
 * Returns a function representing the `attr()` CSS function. It returns [[IStringProxy]] and
 * theoretically can be used in any style property wherever the CSS `<string>` type is accepted;
 * however, its use by browsers is currently limited to the `content` property. Also not all
 * browsers currently support type, units or fallback values.
 *
 * @param attrName Name of the attribute whose value should be returned.
 * @param typeOrUnit Optional type or unit keyword that determines the returned CSS type.
 * @param fallback Optional value that is used if the attribute is not found on the element.
 * @returns
 */
 export const attr = (attrName: Extended<string>, typeOrUnit?: Extended<AttrTypeKeyword | AttrUnitKeyword>,
	fallback?: Extended<string>): IStringProxy =>
    () => `attr(${mv2s( [mv2s( [attrName, typeOrUnit]), fallback], ",")})`;



/**
 * Returns a representation of the CSS `counter()` function with an optional counter style.
 *
 * @param c Counter name or counter rule object
 * @returns ICounterFunc object representing the invocation of the `counter()` CSS function
 */
 export const counter = (counterObj: Extended<ICounterRule | string>,
	style?: Extended<ListStyleType_StyleType>): IStringProxy =>
    () => f2s( "counter", [counterObj, style]);



/**
 * Returns a representation of the CSS `counters()` function with the given separator and
 * an optional counter style.
 *
 * @param counterObj Counter name or counter rule object
 * @param sep Separator string between multiple counters
 * @param style Counter style
 * @returns ICounterFunc object representing the invocation of the `counter()` CSS function
 */
export const counters = (counterObj: Extended<ICounterRule | string>,
	sep: Extended<string>, style?: Extended<ListStyleType_StyleType>): IStringProxy =>
    () => f2s( "counters", [counterObj, [sep, WKF.Quoted], style]);



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
 *     bgColor = this.$var( "color")
 *
 *     div = this.$tag( "div", {
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
 * @returns The `IRawProxy` callable interface, whcih allows the `usevar` function to be called
 * in any context.
 */
export const usevar = <K extends VarTemplateName>( varObj: IVarRule<K>, fallback?: ExtendedVarValue<K>): IRawProxy =>
    () => f2s( "var", ["--" + varObj.name, sp2s( varObj.template, fallback)]);



