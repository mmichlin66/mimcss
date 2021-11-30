import {INamedEntity, IStyleDefinition, IStyleDefinitionClass, IVarRule, NameGenerationMethod} from "../api/RuleTypes"
import {StyleDefinition, ThemeDefinition} from "../api/RuleAPI"
import {Rule, RuleLike, IRuleSerializationContext, IRuleContainer} from "./Rule"
import {VarRule} from "./VarRule"
import {ImportRule, NamespaceRule} from "./MiscRules"
import {getActivator, scheduleStyleUpdate} from "../impl/SchedulingImpl";



// Define symbols that are used for keeping important information on the style definition
// instances that we don't want to be visible to developers.

/** Symbol on the style definition class pointing to the singleton instance. */
const symInstance = Symbol("sd");

/**
 * Symbol on the style definition instance pointing to the RuleContainer object that is
 * responsible for processing rules.
 */
const symContainer = Symbol("rc");

/**
 * Symbol on the style definition instance pointing to the StyleDefinition class for which
 * this instance was created.
 */
const symClass = Symbol("sdc");



/**
 * Element that is created at the top of the "<head>" element before any theme is activated. When
 * themes are activated, their '<style>' elements are created before this element.
 */
let s_themePlaceholderElm: Element;



/**
 * Flag indicating that a rule container is created not directly (as for styled components)
 * but from the processClass function. This variable is set to true before instantiating the
 * style definition class (and thus the RuleCOntainer object) and is set back to false after
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
        this.parent = sd.$parent;
		this.ec = this.sdc[symEmbeddingContainer];

        // get parent and top level containers
        if (this.parent)
        {
            this.pc = this.parent[symContainer];
            this.tlc = this.pc!.tlc;
        }
        else
            this.tlc = this;

        // get the name for our container. If the container is created for a class from the
        // processClass function, then the flag s_processingStyleDefinitionClass is defined
        // and the name isgenerated depending on the current generation method. If this flag is
        // false, that means that the container is created from a direct "new" call on the style
        // definition class and the name is generated uniquely.
        let name: string;
        if (s_processingStyleDefinitionClass)
        {
            s_processingStyleDefinitionClass = false;
            name = !this.sdc.name || s_nameGeneratonMethod === NameGenerationMethod.Optimized
                ? generateUniqueName()
                : this.sdc.name;

            // associate the definition class with the created definition instance
            this.sdc[symInstance] = sd;
            sd[symClass] = this.sdc;
        }
        else
        {
            name = generateUniqueName();
            if (s_nameGeneratonMethod !== NameGenerationMethod.Optimized && this.sdc.name)
                name += "_" + this.sdc.name;
        }

        // Style Definition instance points to this rule container
        sd[symContainer] = this;

		// if our container has parent container, prefix our name with the upper one
        this.name = this.pc ? `${this.pc.name}_${name}` : name;
	}



    // ProxyHandler method, whcih virtualizes all non-array properties
    set( t: StyleDefinition, p: PropertyKey, v: any, r: any): boolean
    {
        if (typeof p === "symbol" || typeof p === "number" || p in t /*t[p] !== undefined*/)
            return Reflect.set( t, p, v, r);
        else
        {
            // we don't virtualize arrays because there is no trap for isArray() method, which
            // we use later in the processProperty() method.
            if (!Array.isArray(v))
                virtualize( t, p);

            t[p] = v;
            this.keys.push(p);
            return true;
        }
    }



    // Processes the properties of the style definition instance. This creates names for classes,
	// IDs, animations and custom variables.
	public process(): void
	{
		// loop over the properties of the definition object and process them.
		for( let propName of this.keys)
			this.processProperty( propName, this.sd[propName]);

        this.processed = true;
	}



	// Processes the properties of the style definition instance. This creates names for classes,
	// IDs, animations and custom variables.
	private processProperty( propName: string | null, propVal: any): void
	{
		if (propVal instanceof StyleDefinition)
        {
            processInstance( propVal);
            this.refs.push( propVal);
        }
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
            {
                propVal.process( this, propName);
                if (propVal instanceof VarRule)
                    this.vars.push( propVal);
                else if (propVal instanceof ImportRule)
                    this.imports.push( propVal);
                else if (propVal instanceof NamespaceRule)
                    this.namespaces.push( propVal);
                else if (propVal instanceof Rule)
                    this.otherRules.push( propVal);
                else
                    this.ruleLikes.push( propVal);
            }
        }
	}



	/** Returns the instance of the stylesheet definition class */
	public getDef(): IStyleDefinition
	{
		return this.sd;
	}



	// Sets the given value for the custom CSS roperty with the given name.
	public setVarValue( name: string, value: string, important?: boolean, schedulerType?: number): void
	{
		if (this.varRootRule)
            scheduleStyleUpdate( this.varRootRule, name, value, important, schedulerType);
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
	public insert( sheetOrGroupingRule: CSSStyleSheet | CSSGroupingRule): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (sheetOrGroupingRule instanceof CSSStyleSheet)
		{
			this.imports.forEach( rule => rule.insert( sheetOrGroupingRule));
			this.namespaces.forEach( rule => rule.insert( sheetOrGroupingRule));
		}

		// activate referenced style definitions
		for( let ref of this.refs)
			ref[symContainer].activate( this.elm);

		// insert our custom variables into the ":root" rule
		if (this.vars.length > 0)
		{
			this.varRootRule = Rule.toDOM( `:root {${this.vars.map( varObj =>
				varObj.toCss()).filter( v => !!v).join(";")}}`, sheetOrGroupingRule) as CSSStyleRule;
		}

		// insert all other rules
		this.otherRules.forEach( rule => rule.insert( sheetOrGroupingRule));
	}



	/** Clears all CSS rule objects defined in this container. */
	public clear(): void
	{
        // import and namespace rules can only exist in the top-level style definition class
		if (!this.parent)
		{
			this.imports.forEach( rule => rule.clear());
			this.namespaces.forEach( rule => rule.clear());
		}

		this.varRootRule = null;

		this.otherRules.forEach( rule => rule.clear());

		// deactivate imported stylesheets
		for( let ref of this.refs)
			ref[symContainer].deactivate();
	}



    /**
     * Inserts this stylesheet into DOM.
     *
     * @param insertBefore Optional HTML element before which the new '<style>' element should be
     * inserted. If not specified, the new element will be inserted as the last element under the
     * '<head>' element.
     */
	public activate( insertBefore: Element | null = null): void
	{
		if (++this.refCount > 1)
            return;

        // only the top-level not-embedded style definitions create the `<style>` element
        if (!this.parent)
        {
            if (this.ec)
                this.elm = this.ec.elm;
            else
            {
                // themes are inserted before the special placeholder element, which is created
                // at the top of the '<head>' element
                if (this.sd instanceof ThemeDefinition)
                {
                    if (!s_themePlaceholderElm)
                    {
                        s_themePlaceholderElm = document.createElement( "style");
                        s_themePlaceholderElm.id = generateUniqueName( "themePlaceholderElement_");
                        document.head.insertBefore( s_themePlaceholderElm, document.head.firstElementChild);
                    }

                    insertBefore = s_themePlaceholderElm;
                }

                this.elm = document.createElement( "style");
                this.elm.id = this.name;
                document.head.insertBefore( this.elm, insertBefore);
            }
        }
        else
            this.elm = this.tlc.elm;

        // if this is a theme class activation, check whether the instance is set as the current
        // one for its theme base class. If no, then deactivate the theme instance currently set
        // as active. In any case, set our new instance as the currently active one. We ignore
        // theme declaration classes - those that directly derive from ThemeDefinition
        if (this.sd instanceof ThemeDefinition && Object.getPrototypeOf(this.sdc) !== ThemeDefinition)
        {
            let themeClass = this.sd[symClass] as unknown as IStyleDefinitionClass<ThemeDefinition>;
            if (themeClass)
            {
                let currInstance = getCurrentTheme( themeClass);
                if (currInstance && currInstance !== this.sd)
                {
                    let currContainer = currInstance[symContainer] as RuleContainer;
                    currContainer.deactivate();
                }

                setCurrentTheme( this.sd);
            }
        }

        this.insert( this.elm!.sheet as CSSStyleSheet);
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

        this.clear();

        // only the top-level not-embedded style defiitions create the `<style>` element
        if (!this.parent && !this.ec)
            this.elm!.remove();

        this.elm = null;

        // if this is a theme class deactivation, check whether the instance is set as the current
        // one for its theme base class. If yes, remove it as the currently active one.
        if (this.sd instanceof ThemeDefinition && Object.getPrototypeOf(this.sdc) !== ThemeDefinition)
        {
            let themeClass = this.sd[symClass] as unknown as IStyleDefinitionClass<ThemeDefinition>;
            if (themeClass)
            {
                let currInstance = getCurrentTheme( themeClass);
                if (currInstance === this.sd)
                    removeCurrentTheme( themeClass);
            }
        }
	}



	/** Writes all rules recursively to the given string. */
	public serialize( ctx: IRuleSerializationContext): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (!this.parent)
		{
			this.imports.forEach( rule => rule.serialize( ctx));
			this.namespaces.forEach( rule => rule.serialize( ctx));
		}

		// activate referenced style definitions
        for( let ref of this.refs)
            ctx.addSD( ref);

		// serialize our custom variables in a ":root" rule
		if (this.vars.length > 0)
			ctx.addRule( `:root {${this.vars.map( varObj => varObj.toCss()).filter( v => !!v).join(";")}}`);

		// serialize all other rules
		this.otherRules.forEach( rule => rule.serialize( ctx));
	}



	// Instance of the style definition class that this container processed.
	public sd: IStyleDefinition;

	// Style definition class that this container creates an instance of.
	public sdc: IStyleDefinitionClass

	// Name of this container, which, depending on the mode, is either taken from the class
	// definition name or generated uniquely.
	public name: string

	// Container that is embedding our instance (that is, the instance corresponding to our
    // container). If defined, this container's `<style>` element is used to insert CSS rules
    // into instead of topLevelContainer.
	public ec?: EmbeddingContainer;

	// Instance of the parent style definition class in the chain of grouping rules that
	// lead to this rule container. For top-level style definitions, this is undefined.
	private parent?: IStyleDefinition;

	// Rule container that belongs to the parent style defintion. If our container is top-level,
	// this property is undefined.
	private pc?: RuleContainer;

	// Rule container that belongs to the owner style defintion. If our container is top-level,
	// this property points to `this`. Names for named rules are created using this container.
	private tlc: RuleContainer;

    // Array of names of properties that would be considered "own" properties of the style
    // definition object. This array keeps the  property names in the order they are defined
    // in the class
    private keys: string[] = [];

    // Flag determining whether this container has already been processed
    public processed: boolean;

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
	private otherRules: Rule[] = [];

	// List of rule-like objects.
	private ruleLikes: RuleLike[] = [];

	// ":root" rule where all custom CSS properties defined in this container are defined.
	private varRootRule: CSSStyleRule | null;

	// Reference count of activation requests.
	private refCount: number = 0;

	// DOM style elemnt
	public elm: HTMLStyleElement | null = null;
}



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
s_nameGeneratonMethod = NameGenerationMethod.UniqueScoped;
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
	typeof instOrClass === "object" ? processInstance( instOrClass) : processClass( instOrClass, parent);



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

        // get rule container from the instance and process the rules.
        (sd[symContainer] as RuleContainer).process();
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
const processInstance = (sd: IStyleDefinition): IStyleDefinition =>
{
	// if the instance is already processed, just return; in this case we ignore the
	// embeddingContainer parameter.
	let container = sd[symContainer] as RuleContainer;
    if (!container.processed)
        container.process();

    return sd;
}



/**
 * Processes the given style definition instance and assigns names to its rules. If the
 * instance has already been processed, we do nothing; otherwise, we assign new unique names
 * to its rules.
 */
export const getVarsFromSD = (instOrClass: IStyleDefinition | IStyleDefinitionClass): IVarRule[] =>
    (processSD( instOrClass)[symContainer] as RuleContainer).getVars();



/**
 * Returns rule container object associated with the given style definition object.
 */
export const getRCfromSD = (instance: IStyleDefinition): RuleContainer =>
	instance ? instance[symContainer] : null;



/**
 * Activates the given style definition and inserts all its rules into DOM. If the input object is
 * not a style definition but a style definition class, obtain style definition by calling the $use
 * function. Note that each style definition object maintains a reference counter of how many times
 * it was activated and deactivated. The rules are inserted to DOM only when this reference counter
 * goes from 0 to 1.
 */
export const activateSD = (instance: IStyleDefinition): void =>
{
	let ruleContainer = getRCfromSD( instance);
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
	let ruleContainer = getRCfromSD( instance);
	if (!ruleContainer)
        return;

    // if this container has an embedding container, deactivate the embedding container; otherwise,
    // deactivate the rule container itself.
    (ruleContainer.ec ?? ruleContainer).deactivate();
}



/**
 * Serializes the given style definition to the given string.
 */
export const serializeSD = (instance: IStyleDefinition, ctx: IRuleSerializationContext): void =>
{
	let ruleContainer = getRCfromSD( instance);
	if (ruleContainer)
	    ruleContainer.serialize( ctx);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Embedding
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Symbol used in style definition classes to point to an embedding container */
let symEmbeddingContainer = Symbol();



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
	public elm: HTMLStyleElement | null;



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
        // add our class to the container
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
            this.elm = document.createElement( "style");
            this.elm.id = this.id;
            document.head.appendChild( this.elm);

            for( let cls of this.sdcs)
            {
                // definition class may be already associated with an instance; if not -
                // process it now.
                let instance = cls.hasOwnProperty(symInstance)
                    ? cls[symInstance]
                    : processClass(cls);

            	let ruleContainer = instance[symContainer] as RuleContainer;
                ruleContainer.activate();
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
            this.elm = null;

            for( let cls of this.sdcs)
            {
                // definition class must be already associated with an instance
                if (!cls.hasOwnProperty(symInstance))
                    continue;

                let instance = cls[symInstance];
            	let ruleContainer = instance[symContainer] as RuleContainer;
                ruleContainer.deactivate();
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
 * The `@virtual` decorator creates a Proxy object for the rule with the handler that keeps the
 * most recent value set. Thus when a rule in the base class's constructor uses a virtualized
 * rule, the first rule will see the overridden value of the rule when accessed in the
 * post-constructor code.
 */
const virtualize = (target: any, name: string): void =>
{
    // symbol to keep the proxy handler value
    let sym = Symbol(name);

    Object.defineProperty( target, name, {
        enumerable: true,
        get() { return ensureHandlerAndProxy( this, sym).x; },

        set(v)
        {
            // set the new value to the handler so that it will use it from now on. The primitive
            // values are boxed.
            let type = typeof v;
            ensureHandlerAndProxy( this, sym).t =
                type === "string" ? new String(v) :
                type === "number" ? new Number(v) :
                type === "boolean" ? new Boolean(v) :
                type === "symbol" ? new Object(v) :
                v;
        }
    });
}



/**
 * Creates handler and proxy in the given object using the given symbol if not created yet.
 * Returns the handler. Proxy is stored in the handler's property.
 */
const ensureHandlerAndProxy = (instance: any, sym: symbol): VirtHandler =>
{
    // check whether we already have the handler and create it if we don't. In this
    // case we also create a proxy for an empty object
    let handler = instance[sym] as VirtHandler;
    if (!handler)
    {
        instance[sym] = handler = new VirtHandler();
        handler.x = new Proxy( {}, handler);
    }

    return handler;
}



/**
 * Handler for the proxy created by the `@virtual` decorator. It keeps the current value of a
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
    setPrototypeOf(t: any, v: any): boolean
        { return Reflect.setPrototypeOf( this.t, v); }
    isExtensible(t: any): boolean
        { return this.t == null ? false : Reflect.isExtensible( this.t); }
    preventExtensions(t: any): boolean
        { return this.t == null ? false : Reflect.preventExtensions( this.t); }
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
    apply(t: any, thisArg: any, args?: any): any
        { return this.t.apply( thisArg, args); }
    construct(t: any, args: any, newTarget?: any): object
        { return Reflect.construct( this.t, args, newTarget); }
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



