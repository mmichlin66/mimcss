import {INamedEntity, IStyleDefinition, IStyleDefinitionClass, IVarRule, NameGenerationMethod} from "../api/RuleTypes"
import {StyleDefinition, ThemeDefinition} from "../api/RuleAPI"
import {
    Rule, RuleLike, IRuleContainer, IActivationContext, IMimcssGroupingRule, IMimcssKeyframesRule,
    IMimcssRule, IMimcssStyleElement, IMimcssRuleBag, IServerActivationContext, symRC
} from "./Rule"
import {VarRule} from "./VarRule"
import {ImportRule, NamespaceRule} from "./MiscRules"
import {getActivator, setDefaultScheduler} from "../impl/SchedulingImpl";
import {SchedulerType} from "../api/SchedulingTypes"



/** Symbol on the style definition class pointing to the singleton instance. */
const symInstance = Symbol("sd");

/**
 * Symbol on the style definition instance pointing to the StyleDefinition class for which
 * this instance was created.
 */
const symClass = Symbol("sdc");



/**
 * Flag indicating that a rule container is created not directly (as for styled components)
 * but from the processClass function. This variable is set to true before instantiating the
 * style definition class (and thus the RuleContainer object) and is set back to false after
 * it is used in the RuleContainer constructor.
 */
let s_processingStyleDefinitionClass = false;



/**
 * The RuleContainer class is a shadow structure that accompanies every processed style definition
 * object. Since StyleDefinition class is an exported class visible to developers, we don't want
 * to have a lot of functionality in it. The RuleContainer object is linked to the StyleDefinition
 * object via the [symContainer] symbol. It contains all the functionality for parsing rule
 * definitions, name assignment and activation/deactivation.
 */
export class RuleContainer implements IRuleContainer, ProxyHandler<StyleDefinition>
{
	constructor( sd: IStyleDefinition)
	{
		this.sd = sd;

        this.sdc = sd.constructor as IStyleDefinitionClass;
        this.psd = sd.$parent;
		this.ec = this.sdc[symEmbeddingContainer];

        // get parent and top level containers
        if (this.psd)
            this.pc = this.psd[symRC];

        // set the name for our container. For optimized name generation mode, generate unique
        // name. Otherwise, if the container is created for a class from the
        // processClass function, then the flag s_processingStyleDefinitionClass is defined
        // and the name is generated depending on the current generation method. If this flag is
        // false, that means that the container is created from a direct "new" call on the style
        // definition class and the name is generated uniquely.
        if (s_nameGeneratonMethod === NameGenerationMethod.Optimized)
            this.name = generateUniqueName();
        else
        {
            let className = this.sdc.name;
            let name = className ? "" : generateUniqueName();
            if (s_processingStyleDefinitionClass)
            {
                s_processingStyleDefinitionClass = false;

                name = !className
                    ? generateUniqueName()
                    : s_nameGeneratonMethod === NameGenerationMethod.UniqueScoped
                        ? generateUniqueName( className + "_")
                        : className;
            }
            else
            {
                name = generateUniqueName();
                if (className)
                    name += "_" + className;
            }

            // if our container has parent container, prefix our name with the upper one
            this.name = this.pc ? `${this.pc.name}_${name}` : name;
        }
	}



    // ProxyHandler method, which virtualizes all RuleLike properties
    set( t: StyleDefinition, p: PropertyKey, v: any, r: any): boolean
    {
        if (typeof p !== "string" || typeof v !== "object")
            t[p] = v;
        else
        {
            // we only virtualize rule-like objects. We don't virtualize arrays because there
            // is no trap for isArray() method, which we use later in the processProperty()
            // method. We also don't virtualize primitive types because there is no trap for
            // typeof operation (needed when converting values to strings). We also don't
            // virtualize style definition instances (results of $use() method invocations).
            let isRuleLike = v instanceof RuleLike;
            if (p in t)
            {
                if (isRuleLike)
                    v.process( p);

                t[p] = v;
            }
            else
            {
                if (isRuleLike)
                    virtualize( t, p);

                t[p] = v;
                this.processProperty( p, t[p]);
            }
        }

        return true;
    }



	// Processes the properties of the style definition instance. This creates names for classes,
	// IDs, animations and custom variables.
	private processProperty( propName: string | null, propVal: any): void
	{
		if (propVal instanceof StyleDefinition)
            this.refs.push( propVal);
        // else if (propVal instanceof Array)
        else if (Array.isArray(propVal))
        {
            // loop over array elements and recursively process them. Index becomes part of the
            // rule name.
            let i = 0;
            for( let item of propVal)
                this.processProperty( `${propName}_${i++}`, item);
        }
        else
        {
            if (propVal instanceof RuleLike)
                propVal.process( propName);

            if (propVal instanceof VarRule)
                this.vars.push( propVal);
            else if (propVal instanceof ImportRule)
                this.imports.push( propVal);
            else if (propVal instanceof NamespaceRule)
                this.namespaces.push( propVal);
            else if (propVal instanceof Rule)
                this.rules.push( propVal);
        }
	}



	// Sets the given value for the custom CSS roperty with the given name.
	public setVarValue( name: string, value: string, important?: boolean, schedulerType?: number): void
	{
		if (this.varRootRule)
        getActivator(schedulerType).updateStyle( this.varRootRule, name, value, important);
	}



	/**
	 * Generates a globally unique CSS name for the given rule name unless this rule name already
	 * exists either in a base class or in the chain of parent grouping rules.
	 */
	public getScopedName( ruleName: string, nameOverride?: string | INamedEntity): string
	{
        if (nameOverride)
            return typeof nameOverride === "string" ? nameOverride : nameOverride.name;
		else if (!ruleName)
			return generateUniqueName();
		else if (ruleName in this.sd && "name" in this.sd[ruleName])
            // this handles cases when a "named" rule already exists in the style definition;
            // for example when a derived class overrides the value of a base class
			return this.sd[ruleName].name;
		else
		{
			// find out if there is a rule with this name defined in a stylesheet instance created
            // for a class from the prototype chain of the style definition class. Otherwise, if
            // there is a parent container, recurse to it; otherwise, generate the name.
			let existingName = findNameForRuleInPrototypeChain( this.sdc, ruleName);
            if (existingName)
                return existingName;
            else if (this.pc)
                return this.pc.getScopedName( ruleName);
            else
			    return generateName( this.name, ruleName);
		}
	}



    /** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	public insert( ruleBag: IMimcssRuleBag): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (!this.psd)
		{
			this.imports.forEach( rule => rule.insert( ruleBag));
			this.namespaces.forEach( rule => rule.insert( ruleBag));
		}

		// activate referenced style definitions
		for( let ref of this.refs)
			ref[symRC].activate( this.elm);

		// insert our custom variables into the ":root" rule
		if (this.vars.length > 0)
			this.varRootRule = ruleBag.add( getRootCssForVars( this.vars))?.cssRule as CSSStyleRule;

		// insert all other rules
		this.rules.forEach( rule => rule.insert( ruleBag));
	}



	/** Clears all CSS rule objects defined in this container. */
	public clear(): void
	{
        // import and namespace rules can only exist in the top-level style definition class
		if (!this.psd)
		{
			this.imports.forEach( rule => rule.clear());
			this.namespaces.forEach( rule => rule.clear());
		}

		this.varRootRule = undefined;

		this.rules.forEach( rule => rule.clear());

		// deactivate imported stylesheets
		for( let ref of this.refs)
			ref[symRC].deactivate();
	}



    /**
     * Inserts this stylesheet into DOM.
     *
     * @param insertBefore Optional HTML element before which the new '<style>' element should be
     * inserted. If not specified, the new element will be inserted as the last element under the
     * '<head>' element.
     */
	public activate( insertBefore?: IMimcssStyleElement): void
	{
        // activation context may not exist if the code is executing on a server and SSR has
        // not been started
		if (!s_activationContext || ++this.refCount > 1)
            return;

        /// #if DEBUG
        let timeLabel = `Activating style definition '${this.name}'`;
        console.time( timeLabel);
        /// #endif

        // only the top-level not-embedded style definitions create the `<style>` element
        if (!this.pc)
        {
            if (this.ec)
                this.elm = this.ec.elm;
            else
            {
                // themes are inserted before the special placeholder element, which is created
                // at the top of the '<head>' element
                if (this.sd instanceof ThemeDefinition)
                    insertBefore = s_activationContext?.getThemePlaceholder();

                this.elm = s_activationContext?.createStyleElm( this.name, insertBefore);
            }
        }
        else
            this.elm = this.pc.elm;

        // if this is a theme class activation, check whether the instance is set as the current
        // one for its theme base class. If no, then deactivate the theme instance currently set
        // as active. In any case, set our new instance as the currently active one. We ignore
        // theme declaration classes - those that directly derive from ThemeDefinition
        if (isThemeImplementation(this.sd))
        {
            let themeClass = this.sdc as unknown as IStyleDefinitionClass<ThemeDefinition>;
            if (themeClass)
            {
                let currInstance = getCurrentTheme( themeClass);
                if (currInstance && currInstance !== this.sd)
                {
                    let currContainer = currInstance[symRC] as RuleContainer;
                    currContainer.deactivate();
                }

                setCurrentTheme( this.sd);
            }
        }

        this.insert( this.elm!);

        /// #if DEBUG
        console.timeEnd( timeLabel);
        /// #endif
    }



	/** Removes this stylesheet from DOM. */
	public deactivate(): void
	{
        // guard from extra deactivate calls
		if (this.refCount === 0)
        {
            /// #if DEBUG
                console.error( `Extra call to deactivate() for style definition class '${this.name}'`);
            /// #endif

			return;
        }

		if (--this.refCount > 0)
            return;

        /// #if DEBUG
        let timeLabel = `Deactivating style definition '${this.name}'`;
        console.time( timeLabel);
        /// #endif

        this.clear();

        // only the top-level not-embedded style defiitions create the `<style>` element
        if (!this.psd && !this.ec)
            this.elm!.remove();

        this.elm = undefined;

        // if this is a theme class deactivation, check whether the instance is set as the current
        // one for its theme base class. If yes, remove it as the currently active one.
        if (isThemeImplementation(this.sd))
        {
            let themeClass = this.sdc as unknown as IStyleDefinitionClass<ThemeDefinition>;
            if (themeClass)
            {
                let currInstance = getCurrentTheme( themeClass);
                if (currInstance === this.sd)
                    removeCurrentTheme( themeClass);
            }
        }

        /// #if DEBUG
        console.timeEnd( timeLabel);
        /// #endif
	}



	/**
     * Style Definition - instance of the style definition class that this container is
     * attached to.
     */
	public sd: IStyleDefinition;

	/** Style Definition Class to whose instance this container is attached. */
	public sdc: IStyleDefinitionClass

	/**
     * Name of this container, which, depending on the mode, is either taken from the class
     * definition name or generated uniquely.
     */
	public name: string

	/** Embedding Container that is embedding our instance (that is, the instance corresponding
     * to our container). If defined, this container's `<style>` element is used to insert CSS
     * rules into instead of topLevelContainer.
     */
	public ec?: EmbeddingContainer;

	/**
     * Parent Style Definition - instance of the parent style definition class in the chain of
     * grouping rules that lead to this rule container. For top-level style definitions, this is
     * undefined.
     */
	private psd?: IStyleDefinition;

	/** Parent Container - rule container that belongs to the parent style defintion. If our
     * container is top-level, this property is undefined.
     */
	private pc?: RuleContainer;

	// List of references to other style definitions creaed via the $use function.
	private refs: StyleDefinition[] = [];

	// List of @import rules
	private imports: ImportRule[] = [];

	// List of @namespace rules
	private namespaces: NamespaceRule[] = [];

	// List of custom variable rules.
	private vars: VarRule[] = [];
    public getVars(): VarRule[] { return this.vars; }

	// List of rules that are not imports, namespaces, custom vars, references or grouping rules.
	private rules: Rule[] = [];

	// ":root" rule where all custom CSS properties defined in this container are defined.
	private varRootRule: CSSStyleRule | undefined;

	// Reference count of activation requests.
	private refCount: number = 0;

	// Object representing either DOM style element for client activation context or serialization
    // implementation.
	public elm?: IMimcssStyleElement;
}



const getRootCssForVars = (vars: VarRule[]): string =>
    `:root {${vars.map( varObj => varObj.toCss()).filter( v => !!v).join(";")}}`;




///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Name generation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Sets the flag indicating whether to use optimized (short) rule names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param enable
 * @param prefix
 */
export const configNames = (method: NameGenerationMethod, prefix?: string): void =>
{
	s_nameGeneratonMethod = method;
	s_uniqueStyleNamesPrefix = prefix ? prefix : "n";
}



/**
 * Flag indicating whether to use optimized names for style elements (classes,  animations, etc.)
 * By default this flag is true in the Release build of the library and false in the Debug build.
 */
let s_nameGeneratonMethod = NameGenerationMethod.Optimized;

/// #if DEBUG
s_nameGeneratonMethod = NameGenerationMethod.Scoped;
/// #endif

/**
 * Prefix to use when generating unique style names. If undefined, a standard prefix "n" will be used.
 */
let s_uniqueStyleNamesPrefix = "n";

/** Next number to use when generating unique identifiers. */
let s_nextUniqueID = 1;



/**
 * Generates name to use for the given rule from the given style sheet.
 */
const generateName = (sheetName: string, ruleName: string): string =>
{
	switch( s_nameGeneratonMethod)
    {
		case NameGenerationMethod.UniqueScoped: return `${sheetName}_${ruleName}_${s_nextUniqueID++}`;
		case NameGenerationMethod.Optimized: return generateUniqueName();
        case NameGenerationMethod.Scoped: return `${sheetName}_${ruleName}`;
    }
}



/**
 * Generates a unique name, which can be used either for style element's ID or or class,
 * identifier or animation name. Names are generated using a simple incrementing number.
 */
const generateUniqueName = (prefix?: string): string =>
	(prefix ? prefix : s_uniqueStyleNamesPrefix) + s_nextUniqueID++;



// Looks up a property with the given name in the prototype chain of the given style definition
// class. If found and if the property is a rule, then returns the name assigned for it.
const findNameForRuleInPrototypeChain = (definitionClass: IStyleDefinitionClass, ruleName: string): string | null =>
{
	if (!definitionClass)
		return null;

	// loop over prototypes
    for( let baseClass = Object.getPrototypeOf( definitionClass);
            baseClass !== StyleDefinition && baseClass !== ThemeDefinition;
                baseClass = Object.getPrototypeOf( baseClass))
	{
		// check if the base class already has an associated instance; if yes, check whether
		// it has a property with the given rule name. If yes, then use this rule's already
        // generated name (if exists).
		if (baseClass.hasOwnProperty(symInstance))
		{
            let baseInst = baseClass[symInstance];
			if (baseInst &&  baseInst[ruleName] != null && "name" in baseInst[ruleName])
				return baseInst[ruleName].name;
		}
	}

	return null;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Processing functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Processes the given stylesheet definition class or instance and assigns names to its rules.
 * If the parameter is a style definition class we check whether there is an instance already
 * created for it as a class will have only a single associated instane no matter how many times
 * this function is called.
 *
 * If the parameter is an object (an instance of the StyleDefinition class) then we check whether
 * it has already been processed. If yes, we just return it back; if no, we assign new unique names
 * to its rules.
 */
export const processSD = (instOrClass: IStyleDefinition | IStyleDefinitionClass,
	    parent?: IStyleDefinition): IStyleDefinition =>
	// instOrClass has type "object" if it is an instance and "function" if it is a class
	typeof instOrClass === "object" ? instOrClass : processClass( instOrClass, parent);



/**
 * Processes the given style definition class by creating its instance and associating a
 * rule container object with it. The class will be associated with the instance using a
 * Symbol property. The parent parameter is a reference to the parent style defiition
 * object or null if the given class is itself a top-level class (that is, is not a class
 * that defines rules within nested grouping rules).
 */
const processClass = (sdc: IStyleDefinitionClass, parent?: IStyleDefinition): IStyleDefinition =>
{
    // check whether this definition class is already associated with an instance. Note that we
    // use hasOwnProperty() because otherwise, this could return instance for the base style
    // definition class.
	if (sdc.hasOwnProperty(symInstance))
        return sdc[symInstance] as IStyleDefinition;

    // recursively process all base classes so that rule names are generated. We don't activate styles
    // for these classes because derived classes will have all the rules from all the base classes
    // as their own and so these rules will be activated as part of the derived class.
    let baseClass = Object.getPrototypeOf( sdc);
    if (baseClass !== StyleDefinition && baseClass !== ThemeDefinition)
        processClass( baseClass, parent);

    try
    {
        // create the instance of the definition class
        s_processingStyleDefinitionClass = true;
        let sd = new sdc( parent);

        // associate the definition class with the created definition instance
        sdc[symInstance] = sd;
        sd[symClass] = sdc;
        return sd;
    }
    finally
    {
        s_processingStyleDefinitionClass = false;
    }
}



/**
 * Processes the given style definition instance and assigns names to its rules. If the
 * instance has already been processed, we do nothing; otherwise, we assign new unique names
 * to its rules.
 */
export const getVarsFromSD = (instOrClass: IStyleDefinition | IStyleDefinitionClass): IVarRule[] =>
    (processSD( instOrClass)[symRC] as RuleContainer).getVars();



/**
 * Activates the given style definition and inserts all its rules into DOM. If the input object is
 * not a style definition but a style definition class, obtain style definition by calling the $use
 * function. Note that each style definition object maintains a reference counter of how many times
 * it was activated and deactivated. The rules are inserted to DOM only when this reference counter
 * goes from 0 to 1.
 */
export const activateSD = (instance: IStyleDefinition): void =>
{
	let ruleContainer = instance[symRC];
	if (!ruleContainer)
        return;

    // if this container has an embedding container, activate the embedding container; otherwise,
    // activate the rule container itself.
    (ruleContainer.ec ?? ruleContainer).activate();
}



/**
 * Deactivates the given style definition by removing its rules from DOM. Note that each style
 * definition object maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes from 1 to 0.
 */
export const deactivateSD = (instance: IStyleDefinition): void =>
{
	let ruleContainer = instance[symRC];
	if (!ruleContainer)
        return;

    // if this container has an embedding container, deactivate the embedding container; otherwise,
    // deactivate the rule container itself.
    (ruleContainer.ec ?? ruleContainer).deactivate();
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Embedding
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Symbol used in style definition classes to point to an embedding container */
let symEmbeddingContainer = Symbol("ec");



/**
 * The EmbeddingContainer class contains multiple style definition classes, which are activated and
 * deactivated together under a single `<style>` node. Style definition classes are added to the
 * embedding container by being decorated with the `@embedded` decorator.
 */
class EmbeddingContainer
{
    /** ID to use for the `<style>` element */
    private id: string;

    /**
     * Number of activated style definitions belonging to this container. This number is
     * incremented upon activation and decremented upon deactivation of style definitions. When
     * this number goes from 0 to 1, the `<style>` element is created and all rules from all
     * style definitions are inserted into it. When this number goes from 1 to 0, the `<style>`
     * element is removed.
     */
    private refCount: number;

    /** Collection of style definition classes "embedded" in this container */
    private sdcs: Set<IStyleDefinitionClass>;

	// DOM style elemnt
	public elm?: IMimcssStyleElement;



    public constructor( id: string)
    {
        this.id = id;
        this.refCount = 0;
        this.sdcs = new Set<IStyleDefinitionClass>();
    }



    /**
     * Adds the given style definition class to the list of embedded classes. If the container is
     * currently activated, the class will be activated too.
     */
    public add( cls: IStyleDefinitionClass): void
    {
        // add the class to our container
        this.sdcs.add( cls);

        // set the symbol on our class to point to the container
        cls[symEmbeddingContainer] = this;

        // if the embedding container is currently activated, we need to activate the added
        // style definition class using the currently default activator
        if (this.refCount > 0)
            getActivator().activate( processClass( cls)!);
    }

	/**
     * Inserts all stylesheets in this container into DOM.
     */
	public activate(): void
	{
        // only if this is the first activation call, create the style element and insert all
        // rules from all the style definition classes.
		if (++this.refCount === 1)
		{
            this.elm = s_activationContext?.createStyleElm( this.id);

            for( let cls of this.sdcs)
            {
                // definition class may be already associated with an instance; if not -
                // process it now.
                let instance = cls.hasOwnProperty(symInstance)
                    ? cls[symInstance]
                    : processClass(cls);

                (instance[symRC] as RuleContainer).activate();
            }
		}
	}

	/**
     * Removes all stylesheets in this container into DOM.
     */
	public deactivate(): void
	{
        // only if this is the last deactivation call, remove the style element and remove all
        // rules from all the style definition classes.
		if (--this.refCount === 0)
		{
            this.elm?.remove();
            this.elm = undefined;

            for( let cls of this.sdcs)
            {
                // definition class must be already associated with an instance
                if (!cls.hasOwnProperty(symInstance))
                    continue;

                (cls[symInstance][symRC] as RuleContainer).deactivate();
            }
		}
	}
}



/**
 * Map of category names to embedding container objects containing style definitions for the given
 * category.
 */
let s_embeddingContainers = new Map<string,EmbeddingContainer>();



/**
 * Decorator function for style definition classes that will be embedded into an embedding
 * container for the given category. All style definitions for a given category will be activated
 * and deactivated together and their rules will be inserted into a single `<style>` element.
 */
export const embeddedDecorator = (category: string, target: IStyleDefinitionClass): any =>
{
    // check whether we already have container for this category; if not, add it
    let ec = s_embeddingContainers.get( category);
    if (!ec)
    {
        // generate unique ID for our container, which will be the ID of the `<style>` element
        let id = `${category}_${s_nextUniqueID++}`;
        ec = new EmbeddingContainer( id);
        s_embeddingContainers.set( category, ec);
    }

    // add our class to the container
    ec.add( target);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Rule virtualization.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Decorator that should be applied to a rule if it is defined and used in the same style
 * definition class but then is overridden in a derived style definition class. The problem
 * this solves is this: when a rule is defined in a base class and then overridden in a derived
 * class, when an instance of the derived class is created, the rules that are created in the
 * base and derived classes see different values of the rule. Since our rules are defined as
 * part of the constructor, the base class constructor's code only sees the value assigned in that
 * code. If another rule in the base class uses this first rule, this value is remembered.
 *
 * The `virtualize` function creates a Proxy object for the rule with the handler that keeps the
 * most recent value set. Thus when a rule in the base class's constructor uses a virtualized
 * rule, the first rule will see the overridden value of the rule when accessed in the
 * post-constructor code.
 */
const virtualize = (target: any, name: string): void =>
{
    // we may directly create the handler and the proxy because this function will be invoked
    // for every StyleDefinition instance (as opposed to once per class).
    let handler = new VirtHandler();
    handler.x = new Proxy( {}, handler);

    Object.defineProperty( target, name, {
        enumerable: true,

        // return the proxy object
        get(): any { return handler.x; },

        // set the new value to the handler so that it will use it from now on.
        set(v): void { handler.t = v; }
    });
}

/**
 * Handler for the proxy created by the `virtualize` function. It keeps the current value of a
 * rule so that the most recent value is used whenever the proxy is accessed.
 */
class VirtHandler implements ProxyHandler<any>
{
    // Proxy object, which works with this handler
    public x: any;

    // the latest target object to use for all proxy handler operations
    public t: any;

    // interesting things happen in the get method
    get( t: any, p: PropertyKey, r: any): any
    {
        // if our value is null or undefined and the requested property is a well-known symbol
        // toPrimitive we return a function that returns either null or undefined. This will help
        // if our proxy either participate in an arithmetic expression or is combined with a
        // string.
        if (this.t == null && p === Symbol.toPrimitive)
            return () => this.t;

        // get the value of the request property; if the value is null or undefined, an exception
        // will be thrown - which is expected.
        let pv = Reflect.get( this.t, p, r);

        // if the requested property is a function, bind the original method to the target object
        return typeof pv === "function" ? pv.bind( this.t) : pv;
    }

    // the rest of the methods mostly delegate the calls to the latest target instead of the
    // original target. In some cases, we check whether the target is null or undefined so that
    // we don't throw exceptions where we can avoid it.

    getPrototypeOf( t: any): object | null
        { return this.t == null ? null : Reflect.getPrototypeOf( this.t); }
    // setPrototypeOf(t: any, v: any): boolean
    //     { return Reflect.setPrototypeOf( this.t, v); }
    // isExtensible(t: any): boolean
    //     { return this.t == null ? false : Reflect.isExtensible( this.t); }
    // preventExtensions(t: any): boolean
    //     { return this.t == null ? false : Reflect.preventExtensions( this.t); }
    getOwnPropertyDescriptor(t: any, p: PropertyKey): PropertyDescriptor | undefined
        { return Reflect.getOwnPropertyDescriptor( this.t, p); }
    has(t: any, p: PropertyKey): boolean
        { return this.t == null ? false : Reflect.has( this.t, p); }
    set( t: any, p: PropertyKey, v: any, r: any): boolean
        { return Reflect.set( this.t, p, v, r); }
    deleteProperty(t: any, p: PropertyKey): boolean
        { return Reflect.deleteProperty( this.t, p); }
    defineProperty(t: any, p: PropertyKey, attrs: PropertyDescriptor): boolean
        { return Reflect.defineProperty( this.t, p, attrs); }
    ownKeys(t: any): ArrayLike<string | symbol>
        { return Reflect.ownKeys( this.t); }
    // apply(t: any, thisArg: any, args?: any): any
    //     { return this.t.apply( thisArg, args); }
    // construct(t: any, args: any, newTarget?: any): object
    //     { return Reflect.construct( this.t, args, newTarget); }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Theming support.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Map of them definition classes to the instances that are currently active for these classes.
 */
let s_themeInstanceMap = new Map<IStyleDefinitionClass<ThemeDefinition>,ThemeDefinition>();



/**
 * Determines whether this style definition class is an implementatin of a theme - that is, it is
 * an instance of ThemeDeclaration class but doesn't derive directly from ThemeDeclaration. It can
 * serve as type guard.
 *
 * @param sd Style definition instance
 * @returns boolean
 */
const isThemeImplementation = (sd: IStyleDefinition): sd is ThemeDefinition =>
    sd instanceof ThemeDefinition && Object.getPrototypeOf(sd[symClass]) !== ThemeDefinition;



/**
 * Returns the theme base class for the given theme class.
 * @param themeClass ThemeDefinition-derived class
 * @returns Theme base class.
 */
const getThemeBaseClass = (themeClass: IStyleDefinitionClass<ThemeDefinition>): IStyleDefinitionClass<ThemeDefinition> | undefined =>
{
    // make sure we are not passed the ThemeDefinition class itself
    if (themeClass === ThemeDefinition)
        return undefined;

    // loop over prototypes until we find the class, which derives directly from ThemeDefinition.
    // This is the theme base class
    let themeBaseClass = themeClass;
    for( let cls = Object.getPrototypeOf( themeClass); cls !== ThemeDefinition; cls = Object.getPrototypeOf( cls))
        themeBaseClass = cls;

    return themeBaseClass;
}



/**
 * Returns the theme definition object, which is currently activated for the given theme.
 * @param themeClass Theme definition class
 * @returns Theme instance, which is currently activated for the given theme class or null
 * if no istance is currently activated.
 */
export const getCurrentTheme = (themeClass: IStyleDefinitionClass<ThemeDefinition>): ThemeDefinition | undefined =>
{
    let themeBaseClass = getThemeBaseClass(themeClass)
    return themeBaseClass && s_themeInstanceMap.get( themeBaseClass);
}



/**
 * Sets the theme definition object as the instance that is currently activated for the
 * corresponding base theme class.
 * @param theme theme instance to set as current for the corresponding base theme class
 */
const setCurrentTheme = (theme: ThemeDefinition): void =>
{
    let themeBaseClass = getThemeBaseClass( theme.constructor as IStyleDefinitionClass<ThemeDefinition>);
    themeBaseClass && s_themeInstanceMap.set( themeBaseClass, theme);
}



/**
 * Removes a theme definition object set as the instance that is currently activated for the
 * corresponding base theme class.
 * @param themeClass Theme definition class
 */
const removeCurrentTheme = (themeClass: IStyleDefinitionClass<ThemeDefinition>): void =>
{
    let themeBaseClass = getThemeBaseClass( themeClass);
    themeBaseClass && s_themeInstanceMap.delete( themeBaseClass);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Client-side rendering implementation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Style element that divides between theme and non-theme style elements. This is needed to always
 * place theme styles before the non-theme ones.
 */
let s_clientThemePlaceholderElm: IMimcssStyleElement | undefined = undefined;

/**
 * ID of the style element that divides between theme and non-theme style elements.
 */
const s_themePlaceholderElmID = "__mimcss_themes__";



// Inserts the given rule into the given parent grouping rule or stylesheet.
const addDomRule = (ruleText: string, parent: CSSStyleSheet | CSSGroupingRule): CSSRule | null =>
{
    try
    {
        let index = parent.insertRule( ruleText, parent.cssRules.length);
        return parent.cssRules[index];
    }
    catch( x)
    {
        console.error( `Cannot add CSS rule '${ruleText}'`, x)
        return null;
    }
}



/**
 * Client-side implementation of activation context.
 */
class ClientActivationContext implements IActivationContext
{
    getThemePlaceholder(): IMimcssStyleElement
    {
        if (!s_clientThemePlaceholderElm)
        {
            let domElm = document.createElement( "style");
            domElm.id = s_themePlaceholderElmID;
            document.head.insertBefore( domElm, document.head.firstElementChild);
            s_clientThemePlaceholderElm = new ClientMimcssStyleElement( domElm);
        }

        return s_clientThemePlaceholderElm;
    }

    createStyleElm( id: string, insertBefore?: IMimcssStyleElement): IMimcssStyleElement
    {
        let domElm = document.createElement( "style");
        domElm.id = id;
        document.head.insertBefore( domElm, insertBefore ? insertBefore.domElm : null);
        return new ClientMimcssStyleElement( domElm);
    }
}

/**
 * Client-side implementation of an object to which rules can be added.
 */
abstract class ClientMimcssRuleBag implements IMimcssRuleBag
{
    constructor( public domRuleBag: CSSStyleSheet | CSSGroupingRule) {}

    add( ruleText: string): IMimcssRule | null
    {
        let cssRule = addDomRule( ruleText, this.domRuleBag);
        return cssRule ? new ClientMimcssRule( cssRule) : null;
    }

    addGroup( selector: string): IMimcssGroupingRule | null
    {
        let cssRule = addDomRule( `${selector} {}`, this.domRuleBag);
        return cssRule ? new ClientMimcssGroupingRule( cssRule) : null;
    }

    addKeyframes( name: string): IMimcssKeyframesRule | null
    {
        let cssRule = addDomRule( `@keyframes ${name} {}`, this.domRuleBag);
        return cssRule ? new ClientMimcssKeyframesRule( cssRule) : null;
    }
}

/**
 * Client-side implementation of a style element.
 */
class ClientMimcssStyleElement extends ClientMimcssRuleBag implements IMimcssStyleElement
{
    constructor( public domElm: HTMLStyleElement)
    {
        super( domElm.sheet!)
    }

    remove(): void
    {
        this.domElm?.remove();
    }
}

/**
 * Client-side implementation of a base interface for CSS rule.
 */
class ClientMimcssRule implements IMimcssRule
{
    constructor(public cssRule: CSSRule | null) {}
}

/**
 * Client-side implementation of a grouping rule to which rules can be added.
 */
class ClientMimcssGroupingRule extends ClientMimcssRuleBag implements IMimcssGroupingRule
{
    constructor( public cssRule: CSSRule)
    {
        super( cssRule as CSSGroupingRule)
    }
}

/**
 * Client-side implementation of keyframes rule to which frames can be added.
 */
class ClientMimcssKeyframesRule extends ClientMimcssRule
{
    addFrame( frameText: string): IMimcssRule | null
    {
        try
        {
            (this.cssRule as CSSKeyframesRule).appendRule( frameText);
            let cssFrameRule = (this.cssRule as CSSKeyframesRule).cssRules.item(
                (this.cssRule as CSSKeyframesRule).cssRules.length - 1);

            return cssFrameRule ? new ClientMimcssRule( cssFrameRule) : null;
        }
        catch(x)
        {
            console.error( "Cannot add CSS keyframe rule", x)
            return null;
        }
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Hydration-side rendering implementation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Hydration-side implementation of activation context.
 */
class HydrationActivationContext implements IActivationContext
{
    getThemePlaceholder(): IMimcssStyleElement
    {
        if (!s_clientThemePlaceholderElm)
        {
            let domElm = document.getElementById( s_themePlaceholderElmID) as HTMLStyleElement;
            if (domElm)
                s_clientThemePlaceholderElm = new HydrationMimcssStyleElement( domElm);
            else
                throw new Error( "Theme placeholder element was requested but was not found");
        }

        return s_clientThemePlaceholderElm;
    }

    createStyleElm( id: string, insertBefore?: IMimcssStyleElement): IMimcssStyleElement
    {
        let domElm = document.getElementById( id) as HTMLStyleElement;
        if (domElm)
            return new HydrationMimcssStyleElement( domElm);
        else
            throw new Error( `Style element with ID '${id}' was requested but was not found`);
    }
}

/**
 * Hydration-side implementation of an object to which rules can be added.
 */
abstract class HydrationMimcssRuleBag implements IMimcssRuleBag
{
    constructor( public domRuleBag: CSSStyleSheet | CSSGroupingRule) {}

    add( ruleText: string): IMimcssRule | null
    {
        let cssRule = this.domRuleBag.cssRules[this.index++];
        return cssRule ? new HydrationMimcssRule( cssRule) : null;
    }

    addGroup( selector: string): IMimcssGroupingRule | null
    {
        let cssRule = this.domRuleBag.cssRules[this.index++];
        return cssRule ? new HydrationMimcssGroupingRule( cssRule) : null;
    }

    addKeyframes( name: string): IMimcssKeyframesRule | null
    {
        let cssRule = this.domRuleBag.cssRules[this.index++];
        return cssRule ? new HydrationMimcssKeyframesRule( cssRule) : null;
    }

    // index of the rule in the list of rules under the stylesheet or grouping rule
    private index = 0;
}

/**
 * Hydration-side implementation of a style element.
 */
class HydrationMimcssStyleElement extends HydrationMimcssRuleBag implements IMimcssStyleElement
{
    constructor( public domElm: HTMLStyleElement)
    {
        super( domElm.sheet!)
    }

    remove(): void
    {
        this.domElm?.remove();
    }
}

/**
 * Hydration-side implementation of a base interface for CSS rule.
 */
class HydrationMimcssRule implements IMimcssRule
{
    constructor(public cssRule: CSSRule | null) {}
}

/**
 * Hydration-side implementation of a grouping rule to which rules can be added.
 */
class HydrationMimcssGroupingRule extends HydrationMimcssRuleBag implements IMimcssGroupingRule
{
    constructor( public cssRule: CSSRule)
    {
        super( cssRule as CSSGroupingRule)
    }
}

/**
 * Hydration-side implementation of keyframes rule to which frames can be added.
 */
class HydrationMimcssKeyframesRule extends HydrationMimcssRule
{
    addFrame( frameText: string): IMimcssRule | null
    {
        let cssFrameRule = (this.cssRule as CSSKeyframesRule).cssRules[this.index++];
        return cssFrameRule ? new HydrationMimcssRule( cssFrameRule) : null;
    }

    // index of the frame in the list of frames under the keyframes rule
    private index = 0;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Server-side rendering implementation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Server-side implementation of activation context.
 */
class ServerActivationContext implements IServerActivationContext
{
    getThemePlaceholder(): IMimcssStyleElement
    {
        if (!this.themeElm)
            this.elms.splice( 0, 0, this.themeElm = new ServerMimcssStyleElement(s_themePlaceholderElmID));

        return this.themeElm;
    }

    createStyleElm( id: string, insertBefore?: IMimcssStyleElement): IMimcssStyleElement
    {
        let elm = new ServerMimcssStyleElement(id);
        if (insertBefore)
            this.elms.splice( this.elms.indexOf( insertBefore as ServerMimcssStyleElement), 0, elm);
        else
            this.elms.push( elm);

        return elm;
    }

    serialize(): string
    {
        return this.elms.map( elm => elm.serialize()).join("");
    }

    private elms: ServerMimcssStyleElement[] = [];
    private themeElm?: ServerMimcssStyleElement;
}

/**
 * Server-side implementation of an object to which rules can be added.
 */
abstract class ServerMimcssRuleBag implements IMimcssRuleBag
{
    add( ruleText: string): IMimcssRule | null
    {
        let rule = new ServerMimcssRule( ruleText);
        this.rules.push(rule);
        return rule;
    }

    addGroup( selector: string): IMimcssGroupingRule | null
    {
        let rule = new ServerMimcssGroupingRule( selector);
        this.rules.push(rule);
        return rule;
    }

    addKeyframes( name: string): IMimcssKeyframesRule | null
    {
        let rule = new ServerMimcssKeyframesRule( name);
        this.rules.push(rule);
        return rule;
    }

    serialize(): string
    {
        return this.rules.map( rule => rule.serialize()).join("");
    }

    private rules: (ServerMimcssRule | ServerMimcssGroupingRule | ServerMimcssKeyframesRule)[] = [];
}

/**
 * Server-side implementation of a style element.
 */
class ServerMimcssStyleElement extends ServerMimcssRuleBag implements IMimcssStyleElement
{
    constructor( public id: string) { super(); }
    public domElm: HTMLStyleElement | null = null;
    remove(): void {}

    serialize(): string
    {
        return `<style id="${this.id}">${super.serialize()}</style>`;
    }
}

/**
 * Server-side implementation of a base interface for CSS rule.
 */
class ServerMimcssRule implements IMimcssRule
{
    constructor( public ruleText: string) {}
    public cssRule: CSSRule | null = null;

    serialize(): string
    {
        return this.ruleText;
    }
}

/**
 * Server-side implementation of a grouping rule to which rules can be added.
 */
class ServerMimcssGroupingRule extends ServerMimcssRuleBag implements IMimcssGroupingRule
{
    constructor( public selector: string) { super(); }
    public cssRule: CSSRule | null = null;

    serialize(): string
    {
        return `${this.selector}{${super.serialize()}}`;
    }
}

/**
 * Server-side implementation of a keyframes rule to which frames can be added.
 */
class ServerMimcssKeyframesRule implements IMimcssKeyframesRule
{
    constructor( public name: string) {}
    public cssRule: CSSRule | null = null;

    addFrame( frameText: string): IMimcssRule | null
    {
        let frame = new ServerMimcssRule( frameText);
        this.frames.push( frame);
        return frame;
    }

    serialize(): string
    {
        return `@keyframes ${this.name}{${this.frames.map( frame => frame.serialize()).join("")}}`;
    }

    private frames: ServerMimcssRule[] = [];
}



/**
 * Client activation context. In the client environment, it is ClientActivationContext instance;
 * in the server environment, it is undefined.
 */
const s_clientActivationContext = document?.head ? new ClientActivationContext() : undefined;

/**
 * Activation context to use. In the client environment, it is by default ClientActivationContext
 * but can be changed (temporarily) to HydrationActivationContext. In the server environment, it
 * is by default undefined, but can be changed to ServerActivationContext.
 */
let s_activationContext: IActivationContext | undefined = s_clientActivationContext;

/**
 * Scheduler type remembered upon starting SSR or hydration process. This will be used to restore
 * the sceduler when SSR or hydration process is stopped.
 */
let s_rememberedSchedulerType: number = 0;



/**
 * Sets server-side activation context. Throws an error if non-default activation context is
 * already set.
 */
export const s_startSSR = (): void =>
{
    if (s_activationContext !== s_clientActivationContext)
        throw new Error("SSR already started");
    else
    {
        s_activationContext = new ServerActivationContext();
        s_rememberedSchedulerType = setDefaultScheduler( SchedulerType.Sync);
    }
}

/**
 * Stops server-side activation functionality and returns a string with serialized styles. The
 * string should be added to the `<head>` element using `insertAdjacentHTML()` method.
 * Throws an error if SSR has not been started.
 * @returns String containing serialized styles
 */
export const s_stopSSR = (): string =>
{
    if (!s_activationContext || !(s_activationContext instanceof ServerActivationContext))
        throw new Error("SSR not started");
    else
    {
        // restore scheduler type existed before we started SSR
        setDefaultScheduler( s_rememberedSchedulerType);
        s_rememberedSchedulerType = 0;

        let s = s_activationContext.serialize();
        s_activationContext = s_clientActivationContext;
        return s;
    }
}



/**
 * Sets hydration activation context. Throws an error if non-default activation context is
 * already set.
 */
export const s_startHydration = (): void =>
{
    if (s_activationContext !== s_clientActivationContext)
        throw new Error("Hydration already started");
    else
    {
        s_activationContext = new HydrationActivationContext();
        s_rememberedSchedulerType = setDefaultScheduler( SchedulerType.Sync);
    }
}

/**
 * Stops hydration activation functionality and restore the default activation context.
 * @returns String containing serialized styles
 */
export const s_stopHydration = (): void =>
{
    if (!s_activationContext || !(s_activationContext instanceof HydrationActivationContext))
        throw new Error("Hydration not started");
    else
    {
        // restore scheduler type existed before we started SSR
        setDefaultScheduler( s_rememberedSchedulerType);
        s_rememberedSchedulerType = 0;

        s_activationContext = s_clientActivationContext;
    }
}



