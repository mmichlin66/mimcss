import {
    SelectorItem, ISelectorProxy, IRawProxy, Extended, IUrlFunc, ICursorFunc, IStringProxy,
    SelectorCombinator, CssSelector, ISelectorBuilder, IParameterizedPseudoEntity,
    NthExpression, Direction, AttrComparisonOperation
} from "./CoreTypes"
import {ICounterRule, IIDRule, IVarRule} from "./RuleTypes";
import {AttrTypeKeyword, AttrUnitKeyword, ExtendedVarValue, ListStyleType_StyleType, VarTemplateName} from "./StyleTypes";
import {sp2s} from "../impl/StyleImpl";
import {a2s, f2s, fdo, mv2s, tag2s, WKF} from "../impl/Utils";




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Selector functions
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
 *     c1 = this.$class({...})
 *     s2 = this.$style( css.selector`ul.${this.c1}:hover`, {...})
 * }
 * ```
 */
export const selector = (parts: TemplateStringsArray, ...params: SelectorItem[]): ISelectorProxy =>
    () => tag2s( parts, params);



/**
 * Array of combinator symbols - needed to check whether a string is a combinator.
 */
const selectorCombinators: SelectorCombinator[] = [",", " ", ">", "+", "~", "||"];
const parameterisedEntities: (keyof IParameterizedPseudoEntity)[] = [":dir", ":has", ":host",
    ":host-context", ":is", ":lang", ":not", ":nth-child", ":nth-of-type", ":nth-last-child",
    ":nth-last-of-type", ":where", "::part", "::slotted"];



/**
 * Provides means to build complex selectors from multiple selector items of all possible kinds
 * including tags, classess, IDs, attributes, pseudo classes and pseudo elements combined with
 * CSS combinators.
 */
class SelectorBuilder<E extends keyof IParameterizedPseudoEntity> implements ISelectorBuilder
{
    fn: "sel" = "sel";
    items: CssSelector[] = [];

    constructor( ...items: CssSelector[]);
    constructor( combinator: SelectorCombinator, ...items: CssSelector[]);
    constructor( entity: E, param: IParameterizedPseudoEntity[E]);
    constructor()
    {
        this.add( ...arguments);
    }



    and( ...items: CssSelector[]): this { return this.a( items, ""); }
    or( ...items: CssSelector[]): this { this.p(","); return this.a( items, ","); }
    child( ...items: CssSelector[]): this { this.p(">"); return this.a( items, ">"); }
    desc( ...items: CssSelector[]): this { this.p(" "); return this.a( items, " "); }
    sib( ...items: CssSelector[]): this { this.p("~"); return this.a( items, "~"); }
    adj( ...items: CssSelector[]): this { this.p("+"); return this.a( items, "+"); }

    pseudo<T extends keyof IParameterizedPseudoEntity>( entity: T, param: IParameterizedPseudoEntity[T]): this
    {
        return this.p({fn: entity, p: param});
    }

    attr( name: string, val?: string | boolean | number, op?: AttrComparisonOperation,
        cf?: "i" | "s", ns?: string): this
    {
        return this.p( {fn: "attr-sel", name, val, op, cf, ns});
    }

    is( ...items: CssSelector[]): this { return this.w( ":is", items); }
    where( ...items: CssSelector[]): this { return this.w( ":where", items); }
    not( ...items: CssSelector[]): this { return this.w( ":not", items); }

    has( ...items: CssSelector[]): this;
    has( combinator: SelectorCombinator | "", ...items: CssSelector[]): this;
    has(): this
    {
        this.p( ":has(");
        this.add( ...arguments);
        this.p(")");
        return this;
    }

    nthChild( nthExpr: NthExpression): this;
    nthChild( a: number, b: number): this;
    nthChild( p1: NthExpression, p2?: number) { return this.nth( ":nth-child", p1, p2); }

    nthLastChild( nthExpr: NthExpression): this;
    nthLastChild( a: number, b: number): this;
    nthLastChild( p1: NthExpression, p2?: number) { return this.nth( ":nth-last-child", p1, p2); }

    nthType( nthExpr: NthExpression): this;
    nthType( a: number, b: number): this;
    nthType( p1: NthExpression, p2?: number) { return this.nth( ":nth-of-type", p1, p2); }

    nthLastType( nthExpr: NthExpression): this;
    nthLastType( a: number, b: number): this;
    nthLastType( p1: NthExpression, p2?: number) { return this.nth( ":nth-last-of-type", p1, p2); }

    dir( direction: Direction): this { return this.p( `:dir(${direction})`); }
    lang( langCode: string): this { return this.p( `:lang(${langCode})`); }
    part( partName: string): this { return this.p( `::part(${partName})`); }
    slotted( ...items: CssSelector[]): this { return this.w( "::slotted", items); }

    add( ...items: CssSelector[]): this;
    add( combinator: SelectorCombinator, ...items: CssSelector[]): this;
    add<T extends keyof IParameterizedPseudoEntity>( entity: T, param: IParameterizedPseudoEntity[T]): this
    add(): this
    {
        let params = Array.from(arguments);
        let p1 = params[0];
        return selectorCombinators.includes(p1 as SelectorCombinator)
            ? this.a( params, p1 as SelectorCombinator, 1)
            : parameterisedEntities.includes(p1 as keyof IParameterizedPseudoEntity)
                ? this.pseudo( p1, params[1])
                : this.a( params, ",");
    }



    // Pushes the given selectors intermingled with the given combinator to the list of items. The
    // "firstCombinatorIndex" parameter indicates the first index after which the combinator
    // should be inserted.
    private a( newItems: CssSelector[], combinator: string = ",", firstCombinatorIndex: number = 0): this
    {
        for( let i = 0; i < newItems.length; i++)
        {
            if (i > firstCombinatorIndex && combinator)
                this.items.push( combinator);

            this.items.push(newItems[i]);
        }

        return this;
    }


    // Pushes the given argument to the list of items
    private p( item: string | SelectorItem | SelectorCombinator): this
    {
        this.items.push(item);
        return this;
    }


    // Wraps the given selectors with the invocation of the given pseudo entity and pushes then
    // to the list of items
    private w( name: string, items: CssSelector[], combinator: string = ","): this
    {
        this.items.push( name + "(");
        this.a( items, combinator)
        this.items.push( ")");
        return this;
    }

    // Pushes the "nth" pseudo class with the given parameters to the list of items
    private nth( name: string, p1: NthExpression, p2?: number)
    {
        this.items.push( { fn: name, p: p2 != null ? [p1 as number, p2] : p1 });
        return this;
    }
}



/**
 * Creates selector builder object that provides means to build complex selectors from multiple
 * selector items of all possible kinds including tags, classess, IDs, attributes, pseudo classes
 * and pseudo elements combined with CSS combinators.
 * @param items List of selector items to initialize the complex selector. If multiple items are
 * specified, they are treated as list; that is, they are combined with the `","` combinator.
 * @returns
 */
export function sel( ...items: CssSelector[]): ISelectorBuilder;
export function sel( combinator: SelectorCombinator, ...items: CssSelector[]): ISelectorBuilder;
export function sel<T extends keyof IParameterizedPseudoEntity>( entity: T, param: IParameterizedPseudoEntity[T]): ISelectorBuilder;

// implementation
export function sel(): ISelectorBuilder
{
    return new SelectorBuilder(...arguments);
}

fdo["sel"] = v => a2s( v.items, { sep: "", recursive: true }, "");



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

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



