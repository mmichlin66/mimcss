﻿import {
    CssSelector, ISelectorProxy, IRawProxy, Extended, IUrlFunc, ICursorFunc, IStringProxy,
    ISelectorBuilder, NthExpression, AttrComparisonOperation, TimingFunctionJumpTerm,
    ICubicBezierFunc, IStepsFunc, INSTagFunc, ElementTagName, SelectorCombinator,
} from "./CoreTypes"
import {IIDRule, INamespaceRule, IVarRule} from "./RuleTypes";
import {AttrTypeKeyword, AttrUnitKeyword, CssCounter, ListStyleType_StyleType} from "./StyleTypes";
import {ExtendedVarValue, Styleset, VarTemplateName} from "./Stylesets";
import {
    ContainerQuery, ContainerStatement, IContainerQueryProxy, IContainerStyleQueryProxy, IMediaQueryProxy, ISupportsQueryProxy,
    MediaStatement, SupportsStatement
} from "./MediaTypes";
import {sp2s} from "../impl/StyleImpl";
import {media2s, supports2s} from "../impl/MiscImpl";
import {a2s, camelToDash, f2s, fdo, mv2s, tag2s, WKF} from "../impl/Utils";



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selector functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a string representation of a selector. This function is a tag function and must be
 * invoked with the template string without parentheses. This function can be used wherever the
 * {@link CoreTypes!CssSelector} types are allowed. The parameters embedded into the string
 * must conform to the {@link CoreTypes!CssSelector} type.
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
 *     c1 = this.$class({...})
 *     s2 = this.$style( css.selector`ul.${this.c1}:hover`, {...})
 * }
 * ```
 */
export const selector = (parts: TemplateStringsArray, ...params: CssSelector[]): ISelectorProxy =>
    () => tag2s( parts, params);



/**
 * Array of attribute comparison operation strings - needed to check whether a string is an
 * attribute comparison operation.
 */
const attrComparisonOperations: AttrComparisonOperation[] = ["=",  "~=", "|=", "^=", "$=", "*="];



/**
 * Provide numeric values that are used to identify what to do when an appropriate property or
 * method from the ISelectorBuilder interface is invoked.
 */
const enum SelectorProcessingType
{
    SimplePseudoElement = 1,
    ParameterizedPseudoClass,
    ParameterizedPseudoElement,
}

/**
 * Type that determines how a property or a method of the ISelectorBuilder interface should be
 * converted to CssSelector values: The type can be one of the following:
 *   - number - one of the values from the SelectorProcessingType enumeration
 *   - Function - the function will be bound to the SelectorBuilderHandler instance and the
 *     property name.
 *   - object with the following fieds:
 *     - f - the function will be bound to the SelectorBuilderHandler instance, the
 *       property name and whatever arguments are specified in the "a" field.
 *     - a - array of arguments to which the function specified by the "f" field wil be bound to
 *       in addition to the SelectorBuilderHandler instance and the property name.
 *     - p - optional prefix to be added to the property name for pseudo classes and elements.
 *     - n - optional name of the entity to be passed to the function instead of the property name.
 */
type SelectorProcessingInfo = SelectorProcessingType | Function |
    { f: Function, a: any[], p?: ":" | "::", n?: string };

// SelectorProcessingInfo object that used several times, so it is "cached" here
const pseudoClassWithSelectorsInfo: SelectorProcessingInfo = { f: wrapAndAddSelectors, a: [","], p: ":" };

/**
 * Object containing information about how properties and methods of the ISelectorBuilder interface
 * should be converted to CssSelector values. If a name of the property is not in this object, it
 * is treated as a non-parameterized pseudo class.
 */
const selectorInfos: { [P in string]: SelectorProcessingInfo } =
{
    // helper methods
    "attr": addAttrSelector,
    "and": { f: addSelectorsWithCombinators, a: [""] },
    "or": { f: addSelectorsWithCombinators, a: [","] },
    "child": { f: addSelectorsWithCombinators, a: [">"] },
    "desc": { f: addSelectorsWithCombinators, a: [" "] },
    "sib": { f: addSelectorsWithCombinators, a: ["~"] },
    "adj": { f: addSelectorsWithCombinators, a: ["+"] },

    // simple pseudo elements
    "after": SelectorProcessingType.SimplePseudoElement,
    "backdrop": SelectorProcessingType.SimplePseudoElement,
    "before": SelectorProcessingType.SimplePseudoElement,
    "cue": SelectorProcessingType.SimplePseudoElement,
    "firstLetter": SelectorProcessingType.SimplePseudoElement,
    "firstLine": SelectorProcessingType.SimplePseudoElement,
    "grammarError": SelectorProcessingType.SimplePseudoElement,
    "marker": SelectorProcessingType.SimplePseudoElement,
    "placeholder": SelectorProcessingType.SimplePseudoElement,
    "selection": SelectorProcessingType.SimplePseudoElement,
    "spellingError": SelectorProcessingType.SimplePseudoElement,

    // parameterized pseudo classes
    "dir": SelectorProcessingType.ParameterizedPseudoClass,
    // "has": pseudoClassWithSelectorsInfo,
    "host$": { f: wrapAndAddSelectors, a: [","], p: ":", n: ":host" },
    "hostContext": pseudoClassWithSelectorsInfo,
    "is": pseudoClassWithSelectorsInfo,
    "lang": SelectorProcessingType.ParameterizedPseudoClass,
    "not": pseudoClassWithSelectorsInfo,
    "nthChild": addNthPseudoClass,
    "nthLastChild": addNthPseudoClass,
    "nthOfType": addNthPseudoClass,
    "nthLastOfType": addNthPseudoClass,
    "where": pseudoClassWithSelectorsInfo,

    // parameterized pseudo elements
    "part": SelectorProcessingType.ParameterizedPseudoElement,
    "slotted": { f: wrapAndAddSelectors, a: [","], p: "::" },
}



/**
 * Proxy handler that serves as an implementation of the ISelectorBuilder interface.
 */
class SelectorBuilderHandler implements ProxyHandler<ISelectorBuilder>
{
    items: CssSelector[] = [];

    // array of keys that are considered "own": these are the keys from the ISelectorFunc interface
    static keys = ["fn", "items"];

    get( t: any, propName: PropertyKey, r: any): any
    {
        if (typeof propName !== "string")
            return undefined;

        // the following makes our object to implement the ISelectorFunc interface
        if (propName === "fn")
            return "sel";
        else if (propName === "items")
            return this.items;

        let info = selectorInfos[propName];
        if (!info)
            return pushSelector.call( this, pseudoCamelTodDash( ":", propName));
        else if (info === SelectorProcessingType.SimplePseudoElement)
            return pushSelector.call( this, pseudoCamelTodDash( "::", propName));
        else if (info === SelectorProcessingType.ParameterizedPseudoClass)
            return addParameterizedPseudoEntity.bind( this, pseudoCamelTodDash( ":", propName));
        else if (info === SelectorProcessingType.ParameterizedPseudoElement)
            return addParameterizedPseudoEntity.bind( this, pseudoCamelTodDash( "::", propName));
        else if (typeof info === "function")
            return info.bind( this, propName);
        else
        {
            propName = info.n ?? (info.p ? pseudoCamelTodDash( info.p, propName) : propName);
            return info.f.bind( this, propName, ...info.a);
        }
    }

    ownKeys( t: any): ArrayLike<string | symbol> { return SelectorBuilderHandler.keys; }
    has( t: any, p: string): boolean { return SelectorBuilderHandler.keys.includes(p); }



    // reference to the proxy object that this handler serves. We need it to return from
    // our functions in order to make the call chaining work.
    proxy: any;

    constructor( items: CssSelector[])
    {
        this.items = items;
    }
}



// adds an attribute selector
function addAttrSelector( this: SelectorBuilderHandler, propName: string,
    attrName: string, p2?: any, p3?: any, p4?: any, p5?: any): any
{
    return pushSelector.call( this,
        attrComparisonOperations.includes(p2)
            ? {fn: "attr-sel", name: attrName, val: p3, op: p2, cf: p4, ns: p5}
            : {fn: "attr-sel", name: attrName, val: p2, cf: p3, ns: p4}
    );
}

// Pushes a selector for the given parameterized pseudo entity to the list of items
function addParameterizedPseudoEntity( this: SelectorBuilderHandler, entity: string, param: any): any
{
    return pushSelector.call( this, { fn: entity, p: param });
}

// Adds the given selectors intermingled with the given combinator to the list of items.
function addSelectorsWithCombinators( this: SelectorBuilderHandler, entity: string,
    combinator: string, ...newItems: CssSelector[]): any
{
    return pushSelectorsWithCombinators.call( this, combinator, true, ...newItems);
}

// Wraps the given selectors with the invocation of the given pseudo entity and pushes them
// to the list of items
function wrapAndAddSelectors( this: SelectorBuilderHandler, name: string, combinator: string, ...newItems: CssSelector[]): any
{
    this.items.push( name + "(");
    pushSelectorsWithCombinators.call( this, combinator, false, ...newItems)
    this.items.push( ")");
    return this.proxy;
}

// Pushes the "nth" pseudo class with the given parameters to the list of items
function addNthPseudoClass( this: SelectorBuilderHandler, propName: string, p1: NthExpression, p2?: number): any
{
    return pushSelector.call( this, { fn: pseudoCamelTodDash( ":", propName), p: p2 != null ? [p1 as number, p2] : p1 });
}

// Pushes the given selectors intermingled with the given combinator to the list of items. The
// "insertBefore" parameter indicates whether the combinator should be inserted before the first
// selector item.
function pushSelectorsWithCombinators( this: SelectorBuilderHandler, combinator: string,
    insertBefore: boolean, ...newItems: CssSelector[]): any
{
    if (insertBefore && combinator)
        this.items.push( combinator);

    for( let i = 0; i < newItems.length; i++)
    {
        if (i > 0 && combinator)
            this.items.push( combinator);

        this.items.push(newItems[i]);
    }

    return this.proxy;
}

// Pushes the given argument to the list of items
function pushSelector( this: SelectorBuilderHandler, item: CssSelector): any
{
    this.items.push(item);
    return this.proxy;
}

// combines the given prefix with the pseudo entity camel name converted to dash form
const pseudoCamelTodDash = (prefix: ":" | "::", name: string) => prefix + camelToDash(name);



/**
 * Creates selector builder object that provides means to build complex selectors from multiple
 * selector items of all possible kinds including tags, classess, IDs, attributes, pseudo classes
 * and pseudo elements combined with CSS combinators. This function returns the {@link CoreTypes!ISelectorBuilder}
 * interface, which has methods and properties for all selector items.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     cls = this.$class({...})
 *     myID = this.$id({...})
 *
 *     // produces CSS: label.cls1[for="myID"]:hover {...}
 *     s1 = this.$style( css.sel("label").and(this.cls1)).attr("for", this.myID).hover, {...})
 * }
 * ```
 * @param items List of selector items to initialize the complex selector. If multiple items are
 * specified, they are treated as list; that is, they are combined with the `","` combinator.
 * @returns
 */
export const sel = (...items: CssSelector[]): ISelectorBuilder =>
{
    let handler = new SelectorBuilderHandler(items);
    let proxy = new Proxy( {}, handler);

    // the handler should reference the proxy in order to return it from methods (and properties)
    // to allow chain calls.
    handler.proxy = proxy;
    return proxy as ISelectorBuilder;
}

fdo["sel"] = v => a2s( v.items, { sep: "", recursive: true }, "");



/**
 * Creates a new selector for the given element tags with the given namespace prefix. The
 * `ns` parameter specifies the namespace prefix as either a string or a reference to the
 * namespace rule. The `tags` parameter specifies either a single tag or an array of tags. In
 * addition, an asterisk symbol (`"*"`) can be specified to target all elements.
 *
 * When multiple tags are specified, they will be combied using the selector combinators
 * specified by the `comb` parameter.
 *
 * **Examples:**
 *
 * ```typescript
 * class MyStyles extends css.StyleDefinition
 * {
 *     // define HTML as default namespace and "svg" as a prefix for SVG namespace
 *     htmlNS = this.$namespace( css.WebNamespaces.HTML)
 *     svgNS = this.$namespace( css.WebNamespaces.SVG, "svg")
 *
 *     // produces CSS "svg|a {}", which will match only SVG `<a>` elements
 *     rule1 = this.$style( css.nstag( this.svgNS, "a"), {})
 *
 *     // produces CSS "*|a {}", which will match both HTML and SVG `<a>` elements
 *     rule2 = this.$style( css.nstag( "*", "a"), {})
 *
 *     // produces CSS "svg|circle, svg|ellipse {}"
 *     rule3 = this.$style( css.nstag( this.svgNS, ["circle", "ellipse"]), {})
 * }
 * ```
 *
 * @param ns Namespace prefix string or reference to a namespace rule. This can also be `"*"`,
 * in which case tags of all naespaces are selected
 * @param tags One or more element tag names.
 * @param comb Optional selector combinator if more than one tag is given. Default is `","`.
 * @returns Object representing parameters from which namespaced tag selector is created.
 */
export const nstag = (ns: string | INamespaceRule, tags: "*" | ElementTagName | ElementTagName[],
    comb: SelectorCombinator = ","): INSTagFunc => ({fn: "nstag", ns, tags, comb})

fdo["nstag"] = (v: INSTagFunc) => {
    let prefix = typeof v.ns === "string" ? v.ns + "|" : v.ns.prefix ? v.ns.prefix + "|" : "";
    return typeof v.tags === "string" ? prefix + v.tags : v.tags.map( tag => prefix + tag).join(v.comb);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Animation and transition timing functions.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Returns a function representing an invocation of the CSS `steps()` function.
 */
 export const steps = (n: Extended<number>, j?: TimingFunctionJumpTerm): IStepsFunc =>
 ({ fn: "steps", n, j });

fdo.steps = ["n", "j"]



/**
* Returns a function representing an invocation of the CSS `cubic-bezier()` function.
*/
export const cubicBezier = (n1: Extended<number>, n2: Extended<number>, n3: Extended<number>,
 n4: Extended<number>): ICubicBezierFunc => ({ fn: "cubic-bezier", n1, n2, n3, n4 });

fdo["cubic-bezier"] = ["n1", "n2", "n3", "n4"]



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// @media, @container and @supports queries.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Tag function that represents a media query. This function allows expressing media queries in
 * a natural string form while embedding media feature values in type safe manner. The string can
 * contain any media expressions while the embedded objects must be of type {@link MediaTypes!IMediaFeatureset}.
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
export const media = (parts: TemplateStringsArray, ...params: MediaStatement[]): IMediaQueryProxy =>
    () => tag2s(parts, params, media2s);



/**
 * Tag function that represents a supports query. This function allows expressing supports
 * queries in a natural string form while embedding styleset objects in type safe manner. The
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
export const supports = (parts: TemplateStringsArray, ...params: SupportsStatement[]): ISupportsQueryProxy =>
    () => tag2s(parts, params, supports2s);



/**
 * Tag function that represents a container query. This function allows expressing container queries in
 * a natural string form while embedding container feature values in type safe manner. The string can
 * contain any container expressions while the embedded objects must be of type {@link MediaTypes!IContainerFeatureset}.
 * Multiple features in the feature set will be expanded into clauses combined with the "and" operator.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // not (width > 400px) or (height < 600px)
 *     ifNarrow = this.$container(
 *         css.container`not ${{minWidth: 400}} or maxHeight: 600}}`, ...)
 * }
 * ```
 */
export const container = media as any as (parts: TemplateStringsArray, ...params: ContainerStatement[]) => IContainerQueryProxy



/**
 * Tag function that represents a container style query expressed as the CSS `style()` function.
 *
 * **Example:**
 *
 * ```typescript
 * class MyStyles extends StyleDefinition
 * {
 *     // @container style(background-colr: blue)
 *     ifBlue = this.$container(css.style({bacgroundColor: "blue"}), ...)
 * }
 * ```
 */
export const style = (styleset: Styleset): IContainerStyleQueryProxy =>
    () => `style${supports2s(styleset)}`;



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The `raw` function allows specifying arbitrary text for properties whose type normally doesn't
 * allow strings. This function is a tag function and must be invoked with the template string
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
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/url" target="mdn">MDN Page</a>
 *
 * @param p URL path or IIDRule object
 * @returns
 */
export const url = (p: Extended<string> | IIDRule): IUrlFunc => ({ fn: "url", p });

fdo.url = [ ["p", {str: WKF.Quoted} ]]



/**
 * Returns a function representing the CSS `url()` function, which can be used in the
 * {@link Stylesets!IStyleset.cursor} style property.
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor" target="mdn">MDN Page</a>
 *
 * @param p Path to the cursor image file
 * @returns Plain object with cursor parameters
 */
export function cursor( p: Extended<string | IIDRule>): ICursorFunc;

/**
 * Returns a function representing the CSS `url()` function followed by two numbers
 * indicating the cursor hotspot. This can be used in the {@link Stylesets!IStyleset.cursor}
 * style property
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/cursor" target="mdn">MDN Page</a>
 *
 * @param p Path to the cursor image file
 * @param x X-coordinate of the cursor hot spot
 * @param y Y-coordinate of the cursor hot spot
 * @returns Plain object with cursor parameters
 */
export function cursor( p: Extended<string> | IIDRule, x: number, y: number): ICursorFunc;

// Implementation
export function cursor( url: Extended<string> | IIDRule, x?: Extended<number>, y?: Extended<number>): ICursorFunc
{
    return { fn: "cursor", url, x, y };
}

fdo.cursor = (v: ICursorFunc) => mv2s( [url(v.url), v.x, v.y])



/**
 * Returns a function representing the `attr()` CSS function. It returns {@link CoreTypes!IStringProxy} and
 * theoretically can be used in any style property wherever the CSS `<string>` type is accepted;
 * however, its use by browsers is currently limited to the `content` property. Also not all
 * browsers currently support type, units or fallback values.
 *
 * - <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/attr" target="mdn">MDN Page</a>
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
 export const counter = (counterObj: Extended<CssCounter>,
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
export const counters = (counterObj: Extended<CssCounter>,
	sep: Extended<string>, style?: Extended<ListStyleType_StyleType>): IStringProxy =>
    () => f2s( "counters", [counterObj, [sep, WKF.Quoted], style]);



/**
 * Returns a function representing the invocation of the `var()` CSS function for the given custom
 * CSS property with optional fallbacks. Usually, when you want to refer to a custom CSS property
 * in style rules, it is enough to just refer to the style definition property created using the
 * {@link RuleAPI!StyleDefinition.$var} function; however, if you want to provide a fallback value, you must use this function.
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
 * @typeparam K Key of the {@link Stylesets!IVarTemplateStyleset} interface that determines the type of the
 * custom CSS property and of the fallback value.
 * @param varObj Custom CSS property object created using the {@link RuleAPI!StyleDefinition.$var} function.
 * @param fallback Fallback value that will be used if the custom CSS property isnt set.
 * @returns The `IRawProxy` callable interface, which allows the `usevar` function to be called
 * in any context.
 */
export const usevar = <K extends VarTemplateName>( varObj: IVarRule<K>, fallback?: ExtendedVarValue<K>): IRawProxy =>
    () => f2s( "var", [varObj.cssName, sp2s( varObj.template, fallback)]);



