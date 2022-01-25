import {
    INamedEntity, IStyleDefinition, IStyleDefinitionClass, IVarRule, NameGenerationMethod
} from "../api/RuleTypes"
import {SchedulerType} from "../api/SchedulingTypes"
import {StyleDefinition, ThemeDefinition} from "../api/RuleAPI"
import {
    Rule, RuleLike, IRuleContainer, IMimcssActivationContext, IMimcssGroupingRule, IMimcssKeyframesRule,
    IMimcssRule, IMimcssStyleElement, IMimcssRuleBag, symRC, IEmbeddingContainer, IMimcssContainer, IAdoptionRootInfo
} from "./Rule"
import {VarRule} from "./VarRule"
import {ImportRule, NamespaceRule} from "./MiscRules"
import {getActivator, setDefaultScheduler} from "../impl/SchedulingImpl";



/**
 * Flag indicating that a rule container is created not directly (as for styled components)
 * but from the processClass function. This variable is set to true before instantiating the
 * style definition class (and thus the RuleContainer object) and is set back to false after
 * it is used in the RuleContainer constructor.
 */
let s_processingStyleDefinitionClass = false;



/**
 * If the style definition was created from processClass() function (as opposed to directly via
 * new), the class keeps a map of rule (property) names to generated unique names. This is
 * necessary so that different instances created for the same class in different activation
 * contexts use the same generated names.
 */
const symRuleNames = Symbol("RNs");


/**
 * The RuleContainer class is a shadow structure that accompanies every processed style definition
 * object. Since StyleDefinition class is an exported class visible to developers, we don't want
 * to have a lot of functionality in it. The RuleContainer object is a proxy handler for the
 * StyleDefinition object symbol. It contains all the functionality for parsing rule definitions,
 * name assignment and activation/deactivation.
 */
export class RuleContainer implements IRuleContainer, ProxyHandler<StyleDefinition>
{
	constructor( sd: IStyleDefinition)
	{
		this.sd = sd;

        // activation context can be undefined if the style definition instance was created via
        // the new operator (as for styled components). In this case, the context will be set
        // externally when the style definition is passed to the activate() function.
        this.ctx = getCurrentActivationContext();

        this.sdc = sd.constructor as IStyleDefinitionClass;
        this.psd = sd.$parent;
		this.ec = this.sdc[symEmbeddingContainer];

        // get parent and top level containers
        if (this.psd)
            this.pc = this.psd[symRC];

        // remember whether the style definition was created from class or its instance was
        // created using the new operator. If it was created from class, then ensure that it has
        // a map from property "paths" to generated rule names. In the presence of hierarchy of
        // style definition classes, each class has its own map.
        if (s_processingStyleDefinitionClass)
        {
            s_processingStyleDefinitionClass = false;
            this.fromClass = true;
            if (!this.sdc.hasOwnProperty( symRuleNames))
                this.sdc[symRuleNames] = new Map<string,string>();
        }

        // set the name for our container. For optimized name generation mode, generate unique
        // name. Otherwise, if the style definition object is created for a class from the
        // processClass function, then the name is generated depending on the current generation
        // method. If the style definition is created from a direct "new" call the name is
        // generated uniquely.
        if (s_nameGeneratonMethod === NameGenerationMethod.Optimized)
            this.name = generateUniqueName();
        else
        {
            let className = this.sdc.name;
            let name = className ? "" : generateUniqueName();
            if (this.fromClass)
            {
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
        let name: string | undefined;

        // if the style definition was created from processClass() function (as opposed to directly
        // via new), the class keeps a map of rule name to generated unique names. If it already
        // exists for our rule name, just use it. in the presence of style definition class
        // hierarchy we lookup the rule name in each class's map. Note also that if the
        // overriding property uses name override, the name override will be ignored.
        if (this.fromClass && ruleName)
        {
            for( let sdc = this.sdc; sdc !== StyleDefinition && sdc !== ThemeDefinition; sdc = Object.getPrototypeOf( sdc))
            {
                name = (sdc[symRuleNames] as Map<string,string>).get( ruleName);
                if (name)
                    return name;
            }
        }

        if (nameOverride)
            name = typeof nameOverride === "string" ? nameOverride : nameOverride.name;
        else if (this.pc)
        {
            // sub-rules of grouping rules (these are the style definitions with parents) always
            // get their name from the top-level class.
            name = this.pc.getScopedName( ruleName);
        }
        else
            name = generateName( this.name, ruleName);

        // if the style definition was created from processClass() function (as opposed to directly
        // via new), remember the created name in the class's map of rule names to generated unique
        // names.
        if (this.fromClass)
            (this.sdc[symRuleNames] as Map<string,string>).set( ruleName, name!);

        return name!;
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
			this.ctx.activate( ref[symRC], this.elm);

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
			this.ctx.deactivate( ref[symRC]);
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
        let ctx = this.ctx;

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
                    insertBefore = ctx.getThemeElm();

                this.elm = ctx.createElm( this, insertBefore);
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
                    ctx.deactivate( currInstance[symRC] as RuleContainer);

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
        let ctx = this.ctx;

        /// #if DEBUG
        let timeLabel = `Deactivating style definition '${this.name}'`;
        console.time( timeLabel);
        /// #endif

        this.clear();

        // only the top-level not-embedded style definitions create the `<style>` element
        if (!this.psd && !this.ec)
        {
            if (this.elm)
            {
                ctx.removeElm( this.elm);
                this.elm = undefined;
            }
            /// #if DEBUG
            else
                console.error( `'this.elm' is undefined in top-level style definition '${this.name}' upon deactivation`);
            /// #endif

        }

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
     * Adds this container as well as containers of the referenced style definitions
     * to the given root information object.
     */
    public adopt( rootInfo: IAdoptionRootInfo): void
    {
        if (!this.ec && !this.pc)
            rootInfo.add( this);

		// adopt referenced style definitions
		for( let ref of this.refs)
			(ref[symRC] as RuleContainer).adopt( rootInfo);
    }

    /**
     * Removes this container as well as containers of the referenced style definitions
     * from the given root information object.
     */
    public unadopt( rootInfo: IAdoptionRootInfo): void
    {
        if (!this.ec && !this.pc)
            rootInfo.remove( this);

		// unadopt referenced style definitions
		for( let ref of this.refs)
			(ref[symRC] as RuleContainer).unadopt( rootInfo);
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

	/** Activation context in which this object has been created. */
	public ctx: IMimcssActivationContext;

	/**
     * Activation context-specific object representing a stylesheet. For regular client context,
     * it points to a DOM style element; for SSR context, it handles serialization.
     */
	public elm?: IMimcssStyleElement;

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

	/**
     * Parent Container - rule container that belongs to the parent style defintion. If our
     * container is top-level, this property is undefined.
     */
	private pc?: RuleContainer;

    /**
     * Flag indicating that the style definitionof this rule container was created not directly
     * (as for styled components) but from the processClass function. This affects whether the rule
     * names are remembered in the class and are used by other processClass-created instances.
     */
     private fromClass: boolean;

     /** List of references to other style definitions creaed via the $use function. */
	private refs: StyleDefinition[] = [];

	/** List of @import rules */
	private imports: ImportRule[] = [];

	/** List of @namespace rules */
	private namespaces: NamespaceRule[] = [];

	/** List of custom variable rules. */
	private vars: VarRule[] = [];
    public getVars(): VarRule[] { return this.vars; }

	/**
     * List of rules that are not imports, namespaces, custom vars, references or grouping rules.
     */
	private rules: Rule[] = [];

	/** ":root" rule where all custom CSS properties defined in this container are defined. */
	private varRootRule: CSSStyleRule | undefined;
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
		case NameGenerationMethod.Optimized: return generateUniqueName();
        case NameGenerationMethod.Scoped: return `${sheetName}_${ruleName}`;
		case NameGenerationMethod.UniqueScoped: return `${sheetName}_${ruleName}_${s_nextUniqueID++}`;
    }
}



/**
 * Generates a unique name, which can be used either for style element's ID or or class,
 * identifier or animation name. Names are generated using a simple incrementing number.
 */
const generateUniqueName = (prefix?: string): string =>
	(prefix ? prefix : s_uniqueStyleNamesPrefix) + s_nextUniqueID++;



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
 * it is associated with an activation context. If it's not, associates it with the current context.
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
    processClassInContext( getCurrentActivationContext(), sdc, parent);



/**
 * Processes the given style definition class by creating its instance and associating a rule
 * container object with it. The class will be associated with the instance in the given context.
 * The parent parameter is a reference to the parent style definition object or null if the given
 * class is itself a top-level class (that is, is not a class that defines rules within nested
 * grouping rules).
 */
const processClassInContext = (ctx: IMimcssActivationContext, sdc: IStyleDefinitionClass,
    parent?: IStyleDefinition): IStyleDefinition =>
{
    // check whether this definition class is already associated with an instance. Note that we
    // use hasOwnProperty() because otherwise, this could return instance for the base style
    // definition class.
	let sd = ctx.getClassSD(sdc);
	if (sd)
        return sd;

    // recursively process all base classes so that rule names are generated. We don't activate styles
    // for these classes because derived classes will have all the rules from all the base classes
    // as their own and so these rules will be activated as part of the derived class.
    let baseClass = Object.getPrototypeOf( sdc);
    if (baseClass !== StyleDefinition && baseClass !== ThemeDefinition)
        processClassInContext( ctx, baseClass, parent);

    // create the instance of the definition class. We pass the second argument (which is not
    // part of the StyleDefinition constructor signature) in order to indicate that the instance
    // is created by processing a class and not directly by callers via the "new" invocation.
    try
    {
        s_processingStyleDefinitionClass = true;
        sd = new sdc( parent);
    }
    finally
    {
        s_processingStyleDefinitionClass = false;
    }

    // associate the definition class with the created definition instance
    ctx.setClassSD( sdc, sd!);
    return sd!;
}



/**
 * Returns array of custom property rules in the given style definition. The style definition is
 * processed first if it hasn't been processed before.
 */
export const getVarsFromSD = (instOrClass: IStyleDefinition | IStyleDefinitionClass): IVarRule[] =>
    (processSD( instOrClass)[symRC] as RuleContainer).getVars();



/**
 * Processes the given style definition instance or class and schedules its activation. If the root
 * parameter is specified and the browser supports constructable style sheets, then it uses the
 * constructable activation context for processing the style definition. After activation, the
 * style sheet will be adopted by the given root.
 */
export const s_activate = <T extends IStyleDefinition>( instOrClass: T | IStyleDefinitionClass<T>,
    schedulerType?: number): T =>
{
    // if style sheet adoption is not supported, we want to pass undefined in the root parameter
    // when we schedule activation. Thus, when the activateSD function is invoked, we will not
    // call the adopt method.
    let sd = processSD( instOrClass) as T;
    getActivator(schedulerType).activate( sd, isAdoptionSupported ? getCurrentRoot() : undefined);
    return sd;
}

/**
 * Processes the given style definition instance or class and schedules its activation. If the root
 * parameter is specified and the browser supports constructable style sheets, then it uses the
 * constructable activation context for processing the style definition. After activation, the
 * style sheet will be adopted by the given root.
 */
export const s_deactivate = <T extends IStyleDefinition>( sd: T, schedulerType?: number): void =>
    // if style sheet adoption is not supported, we want to pass undefined in the root parameter
    // when we schedule activation. Thus, when the deactivateSD function is invoked, we will not
    // call the unadopt method.
    getActivator(schedulerType).deactivate( sd, isAdoptionSupported ? getCurrentRoot() : undefined);



/**
 * Activates the given style definition and inserts all its rules into DOM. If root parameter
 * is defined, we will also have the root to adopt the corresponding stylesheet.
 */
export const activateSD = (sd: IStyleDefinition, root?: DocumentOrShadowRoot): void =>
{
	let ruleContainer = sd[symRC];

    // if this container has an embedding container, activate the embedding container; otherwise,
    // activate the rule container itself.
	let container: IMimcssContainer = ruleContainer.ec || ruleContainer;
    let ctx = container.ctx;
    ctx.activate( container);

    // if the root is defined, then the activation context is constructable, then adopt this style
    // definition by the root
    if (root)
        adopt( container, root);
}



/**
 * Deactivates the given style definition by removing its rules from DOM.
 */
export const deactivateSD = (sd: IStyleDefinition, root?: DocumentOrShadowRoot): void =>
{
	let ruleContainer = sd[symRC];

    // if this container has an embedding container, deactivate the embedding container; otherwise,
    // deactivate the rule container itself.
	let container: IMimcssContainer = ruleContainer.ec || ruleContainer;
    let ctx = container.ctx;

    // if the root is defined, then the activation context is constructable, so unadopt this style
    // definition by the root
    if (root)
        unadopt( container, root);

    ctx.deactivate( container);
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
class EmbeddingContainer implements IEmbeddingContainer
{
    /** ID to use for the `<style>` element */
    public name: string;

	/** Activation context in which this object has been created. */
	public ctx: IMimcssActivationContext;

	// /** Activation reference count. */
	// public actCount = 0;

	/** DOM style elemnt */
	public elm?: IMimcssStyleElement;

    /** Collection of style definition classes "embedded" in this container */
    private sdcs: Set<IStyleDefinitionClass>;



    public constructor( name: string)
    {
        this.name = name;

        // get the current activation context, which will be the context under which this object
        // will operate
        this.ctx = getCurrentActivationContext();

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
        if (this.elm)
            getActivator().activate( processClassInContext( this.ctx, cls)!);
    }

	/**
     * Inserts all style definitions in this container into DOM.
     */
	public activate(): void
	{
        // activation context may not exist if the code is executing on a server and SSR has
        // not been started
        let ctx = this.ctx;

        // create the style element and insert all rules from all the style definition classes.
        this.elm = ctx.createElm( this);

        for( let sdc of this.sdcs)
        {
            // definition class may be already associated with an instance; if not -
            // process it now.
            let sd = processClassInContext( ctx, sdc);
            ctx.activate(sd[symRC] as RuleContainer);
        }
	}

	/**
     * Removes all stylesheets in this container from DOM.
     */
	public deactivate(): void
	{
        // only if this is the last deactivation call, remove the style element and remove all
        // rules from all the style definition classes.
        let ctx = this.ctx;

        if (this.elm)
        {
            ctx.removeElm(this.elm);
            this.elm = undefined;
        }
        /// #if DEBUG
        else
            console.error( `'this.elm' is undefined in embedding container upon deactivation`);
        /// #endif


        for( let cls of this.sdcs)
        {
            // definition class must be already associated with an instance
            let sd = ctx.getClassSD( cls);

            /// #if DEBUG
            if (!sd)
            {
                console.error( "Attempt to deactivate embedded class without instance");
                continue;
            }
            /// #endif

            // (sd[symRC] as RuleContainer).deactivate();
            ctx.deactivate(sd[symRC] as RuleContainer);
        }
	}



    /**
     * Adds this container as well as containers of the referenced style definitions
     * to the given root information object.
     */
    public adopt( rootInfo: IAdoptionRootInfo): void
    {
        rootInfo.add( this);

        // adopt referenced style definitions
        for( let sdc of this.sdcs)
        {
            let sd = this.ctx.getClassSD( sdc);
            sd && (sd[symRC] as RuleContainer).adopt( rootInfo);
        }
    }

    /**
     * Removes this container as well as containers of the referenced style definitions
     * from the given root information object.
     */
    public unadopt( rootInfo: IAdoptionRootInfo): void
    {
        rootInfo.remove( this);

        // unadopt referenced style definitions
        for( let sdc of this.sdcs)
        {
            let sd = this.ctx.getClassSD( sdc);
            sd && (sd[symRC] as RuleContainer).unadopt( rootInfo);
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
 * Function that should be applied to a rule if it is defined and used in the same style
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
 * an instance of ThemeDefinition class but doesn't derive directly from ThemeDefinition. It can
 * serve as type guard.
 *
 * @param sd Style definition instance
 * @returns boolean
 */
const isThemeImplementation = (sd: IStyleDefinition): sd is ThemeDefinition =>
    sd instanceof ThemeDefinition && Object.getPrototypeOf(sd.constructor) !== ThemeDefinition;



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
// Base implementation for activation contexts
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Base implementation for all activation contexts. It manages activation reference counts for
 * RuleContainer and EmbeddingContainer objects
 */
abstract class ActivationContextBase implements IMimcssActivationContext
{
    /** Retrieves style definition instance associated with the given class in this context. */
    public getClassSD( sdc: IStyleDefinitionClass): IStyleDefinition | undefined
    {
        return this.sds.get(sdc);
    }

    /** Associates style definition instance with the given class in this context. */
    public setClassSD( sdc: IStyleDefinitionClass, sd: IStyleDefinition): void
    {
        this.sds.set( sdc, sd);
    }

    /**
     * Activates the given container and its related containers in this context.
     */
    activate( container: IMimcssContainer, insertBefore?: IMimcssStyleElement): void
    {
        let count = this.counts.get( container);
        if (!count)
        {
            container.activate( insertBefore);
            count = 1;
        }
        else
            count++;

        this.counts.set( container, count);
    }

    /**
     * Deactivates the given container and its related containers in this context;
     */
    deactivate( container: IMimcssContainer): void
    {
        let count = this.counts.get( container);
        if (!count)
            return;
        else if (--count === 0)
        {
            container.deactivate();
            this.counts.delete(container);
        }
        else
            this.counts.set( container, count);
    }

    public abstract getThemeElm(): IMimcssStyleElement;
    public abstract createElm( container: IMimcssContainer, insertBefore?: IMimcssStyleElement): IMimcssStyleElement;
    public abstract removeElm( elm: IMimcssStyleElement): void;

    /** Map of style definition classes to style definition instances in this context */
    protected sds = new Map<IStyleDefinitionClass,IStyleDefinition>();

    /** Map of rule connector or embedding connector objects to their reference counts */
    protected counts = new Map<IMimcssContainer,number>();
}



/**
 * Base class for activation contexts that keep style elements in an array.
 */
abstract class ArrayBasedActivationContext<T extends IMimcssStyleElement> extends ActivationContextBase
{
    public getThemeElm(): T
    {
        let elm = this.themeElm;
        if (!elm)
        {
            elm = this.newElm();
            this.elms.splice( 0, 0, elm);
            this.themeElm = elm;
        }

        return elm;
    }

    public createElm( container: IMimcssContainer, insertBefore?: T): T
    {
        let elm = this.newElm( container);
        if (insertBefore)
            this.elms.splice( this.elms.indexOf( insertBefore), 0, elm);
        else
            this.elms.push( elm);

        return elm;
    }

    public removeElm( elm: T): void
    {
        let index = this.elms.indexOf(elm);
        if (index >= 0)
            this.elms.splice( index, 1);
    }

    public clear(): void
    {
        this.elms = [];
    }

    /**
     * Method that is responsible for creating an instance of IMimcssStyleElement interface.
     * Container can be empty if the element is created for the theme placeholder
     */
    protected abstract newElm( container?: IMimcssContainer): T;

    /** Array of elements */
    protected elms: T[] = [];

    /** Theme placeholder element */
    protected themeElm?: T;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Client-side rendering implementation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * ID of the style element that divides between theme and non-theme style elements.
 */
const themePlaceholderElmID = "__mimcss_themes__";



/**
 * Flag indicating that the client activation context should work in hydration mode; that is, it
 * should try to find rules in already existing style elements instead of creating new ones.
 */
let isInHydrationMode = false;



 // Inserts the given rule into the given parent grouping rule or stylesheet.
const addDomRule = (ruleText: string, parent: CSSStyleSheet | CSSGroupingRule): CSSRule | null =>
{
    try
    {
        return parent.cssRules[parent.insertRule( ruleText, parent.cssRules.length)];
    }
    catch(x)
    {
        /// #if DEBUG
        console.error( `'insertRule' failed for rule '${ruleText}'. Error = ${x.message}` );
        /// #endif
        return null;
    }
}



/**
 * Client-side implementation of activation context.
 */
class ClientActivationContext extends ActivationContextBase implements IMimcssActivationContext
{
    constructor( parent?: ParentNode)
    {
        super();
        this.node = parent ?? document.head;
    }

    public getThemeElm(): IMimcssStyleElement
    {
        if (!this.themeElm)
        {
            let domElm: HTMLStyleElement | undefined;
            if (isInHydrationMode)
            {
                domElm = this.node.querySelector( `style[id=${themePlaceholderElmID}`) as HTMLStyleElement;

                /// #if DEBUG
                if (!domElm)
                    console.error( "Theme placeholder element was requested during hydration but was not found");
                /// #endif
            }

            // if we didn't find element, create one now
            if (!domElm)
            {
                domElm = document.createElement( "style");
                domElm.id = themePlaceholderElmID;
                this.node.insertBefore( domElm, document.head.firstElementChild);
            }

            this.themeElm = new ClientStyleElement( domElm);
        }

        return this.themeElm;
    }

    public createElm( container: IMimcssContainer, insertBefore?: IMimcssStyleElement): IMimcssStyleElement
    {
        let domElm: HTMLStyleElement | undefined;
        if (isInHydrationMode)
        {
            domElm = this.node.querySelector( `style[id=${container.name}`) as HTMLStyleElement;

            /// #if DEBUG
            if (!domElm)
                console.error( `Style element with ID '${container.name}' was requested during hydration but was not found`);
            /// #endif
        }

        // if we didn't find the element, create one now
        if (!domElm)
        {
            domElm = document.createElement( "style");
            domElm.id = container.name;
            this.node.insertBefore( domElm, insertBefore ? (insertBefore as ClientStyleElement).domElm : null);
        }

        return new ClientStyleElement( domElm);
    }

    public removeElm( elm: ClientStyleElement): void
    {
        elm?.domElm?.remove();
    }

    /** DOM node to which `<style>` element are added */
    private readonly node: ParentNode;

    /** Theme placeholder element */
    private themeElm?: IMimcssStyleElement;
}



/**
 * Client-side implementation of an object to which rules can be added.
 */
abstract class ClientRuleBag implements IMimcssRuleBag
{
    constructor( sheet: CSSStyleSheet | CSSGroupingRule)
    {
        this.sheet = sheet;
    }

    public add( ruleText: string): IMimcssRule
    {
        let rule = this.get();
        if (!rule)
            rule = addDomRule( ruleText, this.sheet);

        return new ClientRule( rule);
    }

    public addGroup( selector: string): IMimcssGroupingRule
    {
        let rule = this.get();
        if (!rule)
            rule = addDomRule( `${selector} {}`, this.sheet);

        return new ClientGroupingRule( rule as CSSGroupingRule);
    }

    public addKeyframes( name: string): IMimcssKeyframesRule
    {
        let rule = this.get();
        if (!rule)
            rule = addDomRule( `@keyframes ${name} {}`, this.sheet);

        return new ClientKeyframesRule( rule);
    }

    private get(): CSSRule | null
    {
        return isInHydrationMode ? this.sheet.cssRules[this.index++] : null;
    }

    // either stylesheet or a grouping rule under which rules should be added
    public sheet: CSSStyleSheet | CSSGroupingRule;

    // index of the rule in the list of rules under the stylesheet or grouping rule if we are
    // operating in the hydration mode
    private index = 0;
}



/**
 * Client-side implementation of a style element.
 */
class ClientStyleElement extends ClientRuleBag implements IMimcssStyleElement
{
    constructor( public domElm: HTMLStyleElement)
    {
        super( domElm.sheet!)
    }
}



/**
 * Client-side implementation of a base interface for CSS rule.
 */
class ClientRule implements IMimcssRule
{
    constructor(public cssRule: CSSRule | null) {}
}



/**
 * Client-side implementation of a grouping rule to which rules can be added.
 */
class ClientGroupingRule extends ClientRuleBag implements IMimcssGroupingRule
{
    constructor( cssRule: CSSGroupingRule)
    {
        super( cssRule);
    }

    public get cssRule(): CSSGroupingRule { return this.sheet as CSSGroupingRule};
}



/**
 * Client-side implementation of keyframes rule to which frames can be added.
 */
class ClientKeyframesRule extends ClientRule implements IMimcssKeyframesRule
{
    public addFrame( frameText: string): IMimcssRule
    {
        let cssKeyframesRule = this.cssRule as CSSKeyframesRule;
        let rule = isInHydrationMode ? cssKeyframesRule.cssRules[this.index++] : null;
        if (!rule)
        {
            cssKeyframesRule.appendRule( frameText);
            rule = cssKeyframesRule.cssRules.item( cssKeyframesRule.cssRules.length - 1);
        }

        return new ClientRule( rule);
    }

    // index of the frame in the list of frames under the keyframes rule if we are operating in
    // the hydration mode
    private index = 0;
}



/**
 * Map of document or shadow root objects to the corresponding ClientActivationContext objects.
 * This is needed only if constructable style sheets are not supported.
 */
const clientContextsForRoots = new Map<DocumentOrShadowRoot,ClientActivationContext>();

/**
 * Returns existing or creates new client activation context for the given document or shadow
 * root object.
 */
const getClientContext = (root: DocumentOrShadowRoot): ClientActivationContext =>
{
    let ctx = clientContextsForRoots.get( root);
    if (!ctx)
    {
        ctx = new ClientActivationContext( root instanceof Document ? root.head : root as any as ParentNode);
        clientContextsForRoots.set( root, ctx);
    }

    return ctx;
}



/**
 * Stack of DocumentOrShadowRoot objects. Roots are pushed and popped by code under shadow roots
 * and the object from the top of the stack is used for activation.
 */
const documentOrShadowRootStack: DocumentOrShadowRoot[] = [];

/**
 * Returns the document or shadow root from the top of the stack.
 */
const getCurrentRoot = (): DocumentOrShadowRoot | undefined =>
    documentOrShadowRootStack.length > 0 ? documentOrShadowRootStack[documentOrShadowRootStack.length-1] : undefined;

/**
 * Pushes the given document or shadow root to the top of the stack.
 */
export const s_pushRoot = (root: DocumentOrShadowRoot): void =>
{
    documentOrShadowRootStack.push( root);
    pushActCtx( isAdoptionSupported ? globalConstructableActivationContext! : getClientContext( root));
}

/**
 * Removes the document or shadow root from the top of the stack.
 */
export const s_popRoot = (root: DocumentOrShadowRoot): void =>
{
    let currRoot = getCurrentRoot();
    if (currRoot === root)
    {
        documentOrShadowRootStack.pop();
        popActCtx( isAdoptionSupported ? globalConstructableActivationContext! : getClientContext( root));
    }
}



/**
 * Deletes client activation context for the given document or shadow root object.
 */
export const s_releaseShadow = (root: ShadowRoot): void =>
{
    clientContextsForRoots.delete( root);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Client-side "constructable" implementation, which allows creating CSSStyleSheet objects directly
// in order to adopt them in many places later. This is mostly used for custom Web elements;
// however, can also be used in the document. This class is used only if style sheet adoption is
// implemented by the browser.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Constructable implementation of activation context, which instead of creating `<style>` elements,
 * creates CSSStyleSheet objects directly. This activation context keeps reference counters for
 * every rule container (or embedding container) that is added to or removed from it.
 */
class ConstructableActivationContext extends ArrayBasedActivationContext<ConstructableStyleElement>
{
    public getThemeElm(): ConstructableStyleElement
    {
        return super.getThemeElm();
    }

    public createElm( container: IMimcssContainer, insertBefore?: ConstructableStyleElement): ConstructableStyleElement
    {
        let elm = this.containers.get( container);
        if (!elm)
        {
            elm = super.createElm( container, insertBefore);
            this.containers.set( container, elm);
        }
        else
            elm.actCount++;

        return elm;
    }

    public removeElm( elm: ConstructableStyleElement): void
    {
        if (--elm.actCount == 0)
        {
            super.removeElm(elm);

            // we know that removeElm is not called for theme placeholders, so the container
            // property is guaranteed to be defined.
            this.containers.delete( elm.container!);
        }
    }

    /** Method that is responsible for creating an instance of IMimcssStyleElement interface */
    protected newElm( container?: IMimcssContainer): ConstructableStyleElement
    {
        return new ConstructableStyleElement( container);
    }

    /** Map of containers to their corresponding constructable elements */
    private containers = new Map<IMimcssContainer, ConstructableStyleElement>();
}



/**
 * Client-side implementation of a style element.
 */
class ConstructableStyleElement extends ClientRuleBag implements IMimcssStyleElement
{
    constructor( container?: IMimcssContainer)
    {
        super( new CSSStyleSheet());
        this.container = container;
    }

    /** Container for which the element was created - is null for theme placeholder */
    public container?: IMimcssContainer;

    /** Reference count - how many times the container of this element has been activated */
    public actCount = 1;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Server-side rendering implementation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Server-side implementation of activation context.
 */
class ServerActivationContext extends ArrayBasedActivationContext<ServerStyleElement>
{
    /** Method that is responsible for creating an instance of IMimcssStyleElement interface */
    protected newElm( container?: IMimcssContainer): ServerStyleElement
    {
        return new ServerStyleElement( container ? container.name : themePlaceholderElmID);
    }

    public serialize(): string
    {
        return this.elms.map( (elm: ServerStyleElement) => elm.serialize()).join("");
    }
}



/**
 * Server-side implementation of an object to which rules can be added.
 */
abstract class ServerRuleBag implements IMimcssRuleBag
{
    public add( ruleText: string): IMimcssRule
    {
        return this.push(new ServerRule( ruleText)) as IMimcssRule;
    }

    public addGroup( selector: string): IMimcssGroupingRule
    {
        return this.push(new ServerGroupingRule( selector)) as IMimcssGroupingRule;
    }

    public addKeyframes( name: string): IMimcssKeyframesRule
    {
        return this.push(new ServerKeyframesRule( name)) as IMimcssKeyframesRule;
    }

    private push( rule: ServerRule | ServerGroupingRule | ServerKeyframesRule): typeof rule
    {
        this.rules.push(rule);
        return rule;
    }

    public serialize(): string
    {
        return this.rules.map( rule => rule.serialize()).join("");
    }

    private rules: (ServerRule | ServerGroupingRule | ServerKeyframesRule)[] = [];
}



/**
 * Server-side implementation of a style element.
 */
class ServerStyleElement extends ServerRuleBag implements IMimcssStyleElement
{
    constructor( public id: string) { super(); }

    public serialize(): string
    {
        return `<style id="${this.id}">${super.serialize()}</style>`;
    }
}



/**
 * Server-side implementation of a base interface for CSS rule.
 */
class ServerRule implements IMimcssRule
{
    constructor( public ruleText: string) {}

    public cssRule: CSSRule | null = null;

    public serialize(): string
    {
        return this.ruleText;
    }
}



/**
 * Server-side implementation of a grouping rule to which rules can be added.
 */
class ServerGroupingRule extends ServerRuleBag implements IMimcssGroupingRule
{
    constructor( public selector: string) { super(); }

    public cssRule: CSSRule | null = null;

    public serialize(): string
    {
        return `${this.selector}{${super.serialize()}}`;
    }
}



/**
 * Server-side implementation of a keyframes rule to which frames can be added.
 */
class ServerKeyframesRule implements IMimcssKeyframesRule
{
    constructor( public name: string) {}
    public cssRule: CSSRule | null = null;

    public addFrame( frameText: string): IMimcssRule
    {
        let frame = new ServerRule( frameText);
        this.frames.push( frame);
        return frame;
    }

    public serialize(): string
    {
        return `@keyframes ${this.name}{${this.frames.map( frame => frame.serialize()).join("")}}`;
    }

    private frames: ServerRule[] = [];
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Activation context switching
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Helper constant that determines whether the code is executed in the browser (client-side).
 */
const isClient = !!window?.document

/**
 * Client activation context. In the client environment, it is ClientActivationContext instance;
 * in the server environment, it is undefined.
 */
const globalClientActivationContext = isClient ? new ClientActivationContext() : undefined;

/**
 * Helper constant that determines whether style sheet adoption is supported (that is, adopting
 * constructable style sheets).
 */
const isAdoptionSupported = isClient && "adoptedStyleSheets" in document;

/**
 * Activation context for constructable style sheets. In the client environment with constructable
 * style sheets supported, it is ConstructableActivationContext instance; otherwise, it is undefined.
 */
const globalConstructableActivationContext = isAdoptionSupported ? new ConstructableActivationContext() : undefined;

/**
 * Activation context stack. It is initialized to always have one element, which is never removed.
 */
let s_activationContextStack: IMimcssActivationContext[] = [globalClientActivationContext || new ServerActivationContext()];



/**
 * Pushes the given activation context to the top of the stack
 */
const pushActCtx = (ctx: IMimcssActivationContext): void =>
{
    s_activationContextStack.push( ctx as IMimcssActivationContext);
}

/**
 * Removes the activation context from the top of the stack. We never removed the last element.
 */
const popActCtx = (ctx: IMimcssActivationContext): void =>
{
    let len = s_activationContextStack.length;
    if (len > 1 && s_activationContextStack[len-1] === ctx)
        s_activationContextStack.pop();

    /// #if DEBUG
    else
        console.error("Attempt to pop wrong activation context from the stack");
    /// #endif
}



/**
 * Returns activation context from the top of the stack. Note that it always returns a valid
 * object although it can be a dummy implementation.
 */
const getCurrentActivationContext = (): IMimcssActivationContext =>
    s_activationContextStack[s_activationContextStack.length - 1];



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Adoption of constructable style sheets.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

class AdoptionRootInfo implements IAdoptionRootInfo
{
    constructor( root: DocumentOrShadowRoot)
    {
        this.root = root as any;
    }

    public add( container: IMimcssContainer): void
    {
        let count = this.counts.get( container);
        if (!count)
        {
            count = 1;
            this.elms.add( container.elm as ConstructableStyleElement);
        }
        else
            count++;

        this.counts.set( container, count);
    }

    public remove( container: IMimcssContainer): void
    {
        let count = this.counts.get( container);
        if (!count)
            return;
        else if (--count === 0)
        {
            this.counts.delete(container);
            this.elms.delete(container.elm as ConstructableStyleElement);
        }
        else
            this.counts.set( container, count);
    }

    public adopt(): void
    {
        this.root.adoptedStyleSheets =
            Array.from(this.elms).map( (elm: ConstructableStyleElement) => elm.sheet as CSSStyleSheet);
    }

    /**
     * The root property is an object that implements the DocumentOrShadowRoot interface - that is,
     * it is either a document object or a shadow root of a custom Web element.
     */
    public readonly root: { adoptedStyleSheets: CSSStyleSheet[] };

    /** Map of rule connector or embedding connector objects to their reference counts */
    private counts = new Map<IMimcssContainer,number>();

    /** Array of constructable elements adopted in this context */
    private elms = new Set<ConstructableStyleElement>();
}



/**
 * Map of root objects (documents and shadow roots) to objects that keep information about
 * adoption of rule containers and embedding containers
 */
const adoptionRootInfos = new Map<DocumentOrShadowRoot,AdoptionRootInfo>();



const adopt = (container: IMimcssContainer, root: DocumentOrShadowRoot): void =>
{
    let info = adoptionRootInfos.get( root);
    if (!info)
    {
        info = new AdoptionRootInfo(root);
        adoptionRootInfos.set( root, info);
    }

    container.adopt( info);
    info.adopt();
}

const unadopt = (container: IMimcssContainer, root: DocumentOrShadowRoot): void =>
{
    let info = adoptionRootInfos.get( root);
    if (info)
    {
        container.unadopt( info);
        info.adopt();
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// SSR and hydration support.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Scheduler type remembered upon starting SSR or hydration process. This will be used to restore
 * the sceduler when SSR or hydration process is stopped.
 */
let s_rememberedSchedulerType = 0;



/**
 * Sets server-side activation context.
 */
export const s_startSSR = (): void =>
{
    pushActCtx( new ServerActivationContext());
    s_rememberedSchedulerType = setDefaultScheduler( SchedulerType.Sync);
}

/**
 * Stops server-side activation functionality and returns a string with serialized styles. The
 * string should be added to the `<head>` element using `insertAdjacentHTML()` method.
 * @returns String containing serialized styles
 */
export const s_stopSSR = (): string =>
{
    let ctx = getCurrentActivationContext();
    if (!(ctx instanceof ServerActivationContext))
        return "";

    // restore scheduler type existed before we started SSR
    setDefaultScheduler( s_rememberedSchedulerType);
    s_rememberedSchedulerType = 0;

    let s = ctx.serialize();
    ctx.clear();
    popActCtx(ctx);
    return s;
}



/**
 * Sets hydration activation context. This can only be set if the current activation context is
 * the default (global) client context.
 */
export const s_startHydration = (): void =>
{
    let ctx = getCurrentActivationContext();
    if (ctx !== globalClientActivationContext)
    {
        /// #if DEBUG
        console.error("Attempt to set hydration on a non-client activation context");
        /// #endif
        return;
    }

    isInHydrationMode = true;
    s_rememberedSchedulerType = setDefaultScheduler( SchedulerType.Sync);
}

/**
 * Stops hydration activation functionality and restore the default activation context.
 */
export const s_stopHydration = (): void =>
{
    let ctx = getCurrentActivationContext();
    if (ctx !== globalClientActivationContext)
        return;

    isInHydrationMode = false;

    // restore scheduler type existed before we started SSR
    setDefaultScheduler( s_rememberedSchedulerType);
    s_rememberedSchedulerType = 0;
}



