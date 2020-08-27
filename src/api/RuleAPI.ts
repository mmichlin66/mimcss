import {CssSelector, PagePseudoClass} from "../api/BasicTypes";
import {
    CombinedStyleset, IStyleRule, IClassRule, IIDRule, AnimationFrame, IAnimationRule, IVarRule,
    ICounterRule, IGridLineRule, IGridAreaRule, IImportRule, IFontFaceRule, INamespaceRule,
    IPageRule, StyleDefinition, IStyleDefinitionClass, ISupportsRule, IMediaRule, IClassNameRule
} from "./RuleTypes";
import {SupportsQuery, Styleset, VarTemplateName, VarValueType} from "./StyleTypes";
import {processInstanceOrClass, s_enableShortNames, serializeInstance} from "../rules/RuleContainer";
import {MediaQuery} from "./MediaAPI"
import {IFontFace} from "./FontFaceAPI";
import {AbstractRule, ClassRule, IDRule, SelectorRule} from "../rules/StyleRules"
import {AnimationRule} from "../rules/AnimationRule"
import {VarRule} from "../rules/VarRule"
import {CounterRule} from "../rules/CounterRules";
import {GridLineRule, GridAreaRule} from "../rules/GridRules";
import {FontFaceRule, ImportRule, NamespaceRule, PageRule, ClassNameRule} from "../rules/MiscRules"
import {SupportsRule, MediaRule} from "../rules/GroupRules"
import {val2str} from "../styles/UtilFuncs";
import {IRuleSerializationContext} from "../rules/Rule";



/**
 * Creates new abstract rule, which defines a styleset that can be extended by other style
 * rules. Abstract rules don't have selectors and are not inserted into DOM.
 */
export function $abstract( style: CombinedStyleset): IStyleRule
{
	return new AbstractRule( style);
}

/**
 * Creates new class rule. The class name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another class rule. The function can be called without parameters just to "declare"
 * the class. Such class can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $class( style?: CombinedStyleset,
    nameOverride?: string | IClassRule | IClassNameRule): IClassRule
{
	return new ClassRule( style, nameOverride);
}

/**
 * Creates new class name rule, which combines one or more other class names. This creates a
 * "synonym" that is easier to apply to an element's class attribute than an array of two or
 * more clas rules.
 */
export function $classname( ...classes: (IClassRule | IClassNameRule | string)[]): IClassNameRule
{
	return new ClassNameRule( classes);
}

/**
 * Creates new ID rule. The ID name will be created when the rule is processed as part of
 * the style definition class. The name can be also overridden by providing either an explicit
 * name or another ID rule. The function can be called without parameters just to "declare"
 * the ID. Such ID can be later used either in conditional grouping rules or in derived
 * style definition classes.
 */
export function $id( style?: CombinedStyleset, nameOverride?: string | IIDRule): IIDRule
{
	return new IDRule( style, nameOverride);
}

/**
 * Creates new selector rule. Selector can be specified as a string or via the selector function.
 */
export function $style( selector: CssSelector, style: CombinedStyleset): IStyleRule
{
	return new SelectorRule( selector, style);
}

/**
 * Creates new animation rule. The animation name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another animation rule. The function can be called without parameters just to
 * "declare" the animation. Such animation can be later used either in conditional grouping rules
 * or in derived style definition classes.
 */
export function $keyframes( frames?: AnimationFrame[],
	nameOverride?: string | IAnimationRule): IAnimationRule
{
	return new AnimationRule( frames, nameOverride);
}

/**
 * Creates new custom variable object that defines a custom CSS property. The variable name will
 * be created when the rule is processed as part of the style definition class. The name can be
 * also overridden by providing either an explicit name or another custom variable rule. The
 * function can be called without specifying the value just to "declare" the variable. Such
 * variable can be later used either in conditional grouping rules or in derived style definition
 * classes.
 */
export function $var<K extends VarTemplateName>( template: K, propVal?: VarValueType<K>,
				nameOverride?: string | IVarRule<K>): IVarRule<K>
{
	return new VarRule( template, propVal, nameOverride);
}

/**
 * Creates new counter object. The counter name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another counter rule.
 */
export function $counter( nameOverride?: string | ICounterRule): ICounterRule
{
	return new CounterRule( nameOverride);
}

/**
 * Creates new grid line object. The line name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another grid line rule.
 */
export function $gridline( nameOverride?: string | IGridLineRule,
    isStartEndOrNone?: boolean): IGridLineRule
{
	return new GridLineRule( nameOverride, isStartEndOrNone);
}

/**
 * Creates new grid area object. The area name will be created when the rule is processed as
 * part of the style definition class. The name can be also overridden by providing either an
 * explicit name or another grid area rule.
 */
export function $gridarea( nameOverride?: string | IGridAreaRule): IGridAreaRule
{
	return new GridAreaRule( nameOverride);
}

/**
 * Creates new import rule.
 */
export function $import( url: string, mediaQuery?: string | MediaQuery,
	supportsQuery?: string | SupportsQuery): IImportRule
{
	return new ImportRule( url, mediaQuery, supportsQuery);
}

/**
 * Creates new font-face rule.
 */
export function $fontface( fontface: IFontFace): IFontFaceRule
{
	return new FontFaceRule( fontface);
}

/**
 * Creates new namespace rule.
 */
export function $namespace( namespace: string, prefix?: string): INamespaceRule
{
	return new NamespaceRule( namespace, prefix);
}

/**
 * Creates new page rule.
 */
export function $page( pseudoClass?: PagePseudoClass, style?: Styleset): IPageRule
{
	return new PageRule( pseudoClass, style);
}

/**
 * Creates new supports rule.
 */
export function $supports<T extends StyleDefinition>( query: SupportsQuery,
    instOrClass: T | IStyleDefinitionClass<T>): ISupportsRule<T>
{
	return new SupportsRule( query, instOrClass);
}

/**
 * Creates new media rule.
 */
export function $media<T extends StyleDefinition>( query: string | MediaQuery,
    instOrClass: T | IStyleDefinitionClass<T>): IMediaRule<T>
{
	return new MediaRule( query, instOrClass);
}



/**
 * Processes the given style definition class or instance and creates unique names for all named
 * entities. For a given style definition class only a single instance is created, no matter how
 * many times this function is invoked. However, if an instance, which has not yet been processed,
 * is passed, then a new set of unique names will be created for it.
 */
export function $use<T extends StyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>): T | null
{
	return processInstanceOrClass( instOrClass) as T;
}



/**
 * Embeds the given style definition class into another style definition object. When activated,
 * the embedded object doesn't create its own `<style>` element but uses that of its owner. This
 * allows creating many small style definition classes instead of one huge one without incurring
 * the overhead of many `<style>` elements.
 *
 * Note that as opposed to the $use function, the $embed function always creates a new instance of
 * the given class and doesn't associate the class with the created instance. That means that if
 * a class is embedded into more than one "owner", two separate instances of each CSS rule will be
 * created with different unique names.
 */
export function $embed<T extends StyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>): T | null
{
	// return definition instance without processing it. This is the indication that the defintion
	// will be embedded into another definition.
	return instOrClass instanceof StyleDefinition ? instOrClass : new instOrClass();
}



/**
 * Sets the flag indicating whether to use optimized (short) rule names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param enable
 * @param prefix
 */
export function enableShortNames( enable: boolean, prefix?: string): void
{
	return s_enableShortNames( enable, prefix);
}



/**
 * Type for defining the class property of HTML elements.
 */
export type ClassPropType = string | IClassRule | IClassNameRule | ClassPropType[];

/**
 * Concatenates the names of the given classes into a single string that can be assigned to a
 * `class` property of an HTML element.
 * @param classProps
 */
export function classes( ...classProps: ClassPropType[]): string
{
	return val2str( classProps, {
		arrItemFunc: v => v instanceof ClassRule ? v.name : classes(v)
	});
}

/**
 * Chooses the first non-null name from the given list of classes.
 * @param classProps
 */
export function chooseClass( ...classProps: ClassPropType[]): string | null
{
    for( let cls of classProps)
    {
        if (!cls)
            continue;
        else if (typeof cls === "string")
            return cls;
        else if (Array.isArray(cls))
        {
            let name = chooseClass( cls);
            if (name)
                return name;
        }
        else if (cls.name)
            return cls.name;
    }

	return null;
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Rule virtualization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * The ICssSerializer interface allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
export interface ICssSerializer
{
    /**
     * Adds style definition class or instance.
     */
    add( instOrClass: StyleDefinition | IStyleDefinitionClass): void;

    /**
     * Returns concatenated string representation of all CSS rules added to the context.
     */
    serialize(): string;
}



/**
 * Creates a new ICssSerializer object that allows adding style definition classes
 * and instances and serializing them to a string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
export function createCssSerializer(): ICssSerializer
{
    return new CssSerializer();
}



/**
 * Serializes one or more style definition classes and instances and returns their CSS string
 * representation. This can be used for server-side rendering when the resultant string can be
 * set as the content of a `<style>` element.
 */
export function serializeToCSS( arg1: StyleDefinition | IStyleDefinitionClass,
    ...args: (StyleDefinition | IStyleDefinitionClass)[]): string
{
    let serializer = new CssSerializer();
    serializer.add( arg1);
    if (args.length > 0)
        args.forEach( instOrClass => serializer.add( instOrClass));

    return serializer.serialize();
}



/**
 * The StyleSerializer class allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
class CssSerializer implements ICssSerializer
{
    /**
     * Adds style definition class or instance.
     */
    public add( instOrClass: StyleDefinition | IStyleDefinitionClass): void
    {
        let instance = processInstanceOrClass( instOrClass);
        if (!instance || this.instances.has(instance))
            return;

        this.instances.add( instance);
    }

    /**
     * Returns concatenated string representation of all CSS rules added to the context.
     */
    public serialize(): string
    {
        let ctx = new RuleSerializationContext();
        this.instances.forEach( instance => ctx.addStyleDefinition( instance));
        return ctx.topLevelBuf + ctx.nonTopLevelBuf;
    }

    // Set of style definition instances. This is needed to not add style definitions more than once
    instances = new Set<StyleDefinition>();
}



/**
 * The StyleSerializer class allows adding style definition classes and objects
 * and serializing them to a single string. This can be used for server-side rendering when
 * the resultant string can be set as the content of a `<style>` element.
 */
class RuleSerializationContext implements IRuleSerializationContext
{
    // Adds rule text
    public addRuleText( s: string, isTopLevelRule?: boolean): void
    {
        if (isTopLevelRule)
            this.topLevelBuf += s + "\n";
        else
            this.nonTopLevelBuf += s + "\n";
    }

    // Adds rule text
    public addStyleDefinition( instance: StyleDefinition): void
    {
        if (!this.instances.has( instance))
        {
            this.instances.add( instance);
            serializeInstance( instance, this);
        }
    }

    // String buffer that accumulates top-level rule texts.
    public topLevelBuf = "";

    // String buffer that accumulates non-top-level rule texts.
    public nonTopLevelBuf = "";

    // Set of style definition instances that were already serialized in this context.
    private instances = new Set<StyleDefinition>();
}



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Rule virtualization.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Decorator that should be applied to a rule if it is defined and used in the same style
 * definition class but then is overridden in a derived style definition class. The problem
 * this solves is this: when a rule is defined in a base class and then overridden in a derived
 * class, when an instance of the derived class is created, the rules that are created in the
 * base and derived classes see different values of the rule. Since our rules are defined as
 * part of the constructor, the base class constructor's code only sees the value assigned in that
 * code. If another rule in the base class uses this first rule, this value is remembered.
 *
 * The `@virtual` decorator creates a Proxy object for the rule with the handler that keeps the
 * most recent value set. Thus when a rule in the base class's constructor uses a virtualized
 * rule, the first rule will see the overridden value of the rule when accessed in the
 * post-constructor code.
 */
export function virtual( target: any, name: string)
{
    // symbol to keep the proxy handler value
    let sym = Symbol(name + "_proxy_handler");

    Object.defineProperty( target, name, {
        enumerable: true,
        get()
        {
            // check whether we already have the handler and create it if we don't. In this
            // case we also create a proxy for an empty object
            let handler = this[sym] as VirtHandler;
            if (!handler)
            {
                this[sym] = handler = new VirtHandler();
                handler.proxy = new Proxy( {}, handler);
            }

            return handler.proxy;
        },

        set(v)
        {
            // depending on the object type we may have a different object to pass to the proxy;
            // also we need to know whether the object is a special (internal to JavaScript) one
            // and the handler will have to treat it specially
            let [newTarget, isSpecial] = getProxiableObject(v);

            // check whether we already have the handler and create it if we don't
            let handler = this[sym] as VirtHandler;
            if (!handler)
            {
                this[sym] = handler = new VirtHandler();
                handler.proxy = newTarget == null ? {} : new Proxy( newTarget, handler);
            }

            // set the new vaules to the handler so that it will use it from now on
            handler.target = newTarget;
            handler.isSpecial = isSpecial;
        }
    });
}



/**
 * For the given value returns a two-element tuple:
 * - the first element is the value that should be passed to a proxy. For objects, it is the input
 *   value. For primitive types it is the boxed object (e.g. Number for numbers). For null and
 *   undefined it is null and undefined respectively
 * - the second element is the "special" flag, which is true if the proxy handler will have to have
 *   a special treatment the objects' methods; that is, it will have to bind them to the target
 *   object before returning them from the get method. This is true for "internal" JavaScript
 *   classes like boxed primitive types, Map, Set, Promise and some others.
 */
function getProxiableObject( v: any): [any, boolean]
{
    if (v == null)
        return [v, false];
    else if (typeof v === "string")
        return [new String(v), true];
    else if (typeof v === "number")
        return [new Number(v), true];
    else if (typeof v === "boolean")
        return [new Boolean(v), true];
    else if (typeof v === "symbol")
        return [new Object(v), true];
    else if (typeof v === "object" && (v instanceof Map || v instanceof Set))
        return [v, true];
    else
        return [v, false];
}



/**
 * Handler for the proxy created by the `@virtual` decorator. It keeps the current value of a
 * rule so that the most recent value is used whenever the proxy is accessed.
 */
class VirtHandler implements ProxyHandler<any>
{
    public proxy: any;
    public target: any;
    public isSpecial: boolean;

    // interesting things happen in the get method
    get( t: any, p: PropertyKey, r: any): any
    {
        // if our value is null or undefined and the requested property is a well-known symbol
        // toPrimitive we return a function that returns either null or undefined. This will help
        // if our proxy either participate in an arithmetic expression or or is combined with a
        // string.
        if (this.target == null && p === Symbol.toPrimitive)
            return () => this.target;

        // get the value of the request property; if the value is null or undefined, an exception
        // will be thrown - which is expected.
        let pv = Reflect.get( this.target, p, r);

        // if the requested property is a function of a boxed primitive, bind the original method
        // to the target object
        return this.isSpecial && typeof pv === "function" ? pv.bind( this.target) : pv;
    }

    // the rest of the methods mostly delegate the calls to the latest target instead of the
    // original target. In some cases, we check whether the target is null or undefined so that
    // we don'tthrow exceptions wher we can avoid it.

    getPrototypeOf( t: any): object | null
        { return this.target == null ? null : Reflect.getPrototypeOf( this.target); }
    setPrototypeOf(t: any, v: any): boolean
        { return Reflect.setPrototypeOf( this.target, v); }
    isExtensible(t: any): boolean
        { return this.target == null ? false : Reflect.isExtensible( this.target); }
    preventExtensions(t: any): boolean
        { return this.target == null ? false : Reflect.preventExtensions( this.target); }
    getOwnPropertyDescriptor(t: any, p: PropertyKey): PropertyDescriptor | undefined
        { return Reflect.getOwnPropertyDescriptor( this.target, p); }
    has(t: any, p: PropertyKey): boolean
        { return this.target == null ? false : Reflect.has( this.target, p); }
    set( t: any, p: PropertyKey, v: any, r: any): boolean
        { return Reflect.set( this.target, p, v, r); }
    deleteProperty(t: any, p: PropertyKey): boolean
        { return Reflect.deleteProperty( this.target, p); }
    defineProperty(t: any, p: PropertyKey, attrs: PropertyDescriptor): boolean
        { return Reflect.defineProperty( this.target, p, attrs); }
    enumerate(t: any): PropertyKey[]
        { return Array.from( Reflect.enumerate( this.target)); }
    ownKeys(t: any): PropertyKey[]
        { return Reflect.ownKeys( this.target); }
    apply(t: any, thisArg: any, args?: any): any
        { return this.target.apply( this, args); }
    construct(t: any, args: any, newTarget?: any): object
        { return Reflect.construct( this.target, args, newTarget); }
}



