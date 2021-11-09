import {IStyleDefinition, IStyleDefinitionClass, IVarRule, NameGenerationMethod} from "../api/RuleTypes"
import {StyleDefinition, ThemeDefinition} from "../api/RuleAPI"
import {Rule, ITopLevelRuleContainer, RuleLike, IRuleSerializationContext} from "./Rule"
import {VarRule} from "./VarRule"
import {ImportRule, NamespaceRule} from "./MiscRules"
import {getActivator, scheduleStyleUpdate} from "../impl/SchedulingImpl";



// Define symbols that are used for keeping important information on the style definition
// instances that we don't want to be visible to developers.

/** Symbol on the style definition class pointing to the singleton instance. */
const symInstance = Symbol("symInstance");

/**
 * Symbol on the style definition instance pointing to the RuleContainer object that is
 * responsible for processing rules.
 */
const symContainer = Symbol("symContainer");

/**
 * Symbol on the style definition instance pointing to the StyleDefinition class for which
 * this instance was created.
 */
const symClass = Symbol("symClass");



/**
 * Element that is created at the top of the "<head>" element before any theme is activated. When
 * themes are activated, their '<style>' elements are created before this element.
 */
let themePlaceholderElement: Element;



/**
 * The RuleContainer class is a shadow structure that accompanies every processed style definition
 * object. Since StyleDefinition class is an exported class visible to developers, we don't want
 * to have a lot of functionality in it. The RuleContainer object is linked to the StyleDefinition
 * object via the [symRuleContainer] symbol. It contains all the functionality for parsing rule
 * definitions, name assignment and activation/deactivation.
 */
class RuleContainer implements ITopLevelRuleContainer
{
	constructor( instance: IStyleDefinition, name: string)
	{
		this.sd = instance;
		this.name = name;

        this.sdc = instance.constructor as IStyleDefinitionClass;
        this.parent = instance.$parent;
		this.ec = this.sdc[symEmbeddingContainer];

		this.refCount = 0;
		this.elm = null;
	}



	// Processes the properties of the style definition instance. This creates names for classes,
	// IDs, animations and custom variables.
	public process(): void
	{
		// get parent and top level containers
        if (this.parent)
        {
            this.pc = this.parent[symContainer];
            this.tlc = this.pc!.tlc;
        }
        else
            this.tlc = this;

		// if our container has parent container, prefix our name with the upper one
		if (this.pc)
			this.name = `${this.pc.name}_${this.name}`;

		this.imports = [];
		this.namespaces = [];
		this.vars = [];
		this.refs = [];
		this.otherRules = [];
		this.ruleLikes = [];

		// loop over the properties of the definition object and process them.
		for( let propName in this.sd)
			this.processProperty( propName, this.sd[propName]);

        // loop over rules and rule-like objects and call the postProcess method, which allows
        // them to connect to other rules.
        for( let rule of this.imports)
            rule.postProcess();
        for( let rule of this.namespaces)
            rule.postProcess();
        for( let rule of this.vars)
            rule.postProcess();
        for( let rule of this.otherRules)
            rule.postProcess();
        for( let rule of this.ruleLikes)
            rule.postProcess();
	}



	// Processes the properties of the style definition instance. This creates names for classes,
	// IDs, animations and custom variables.
	private processProperty( propName: string | null, propVal: any): void
	{
		if (propVal instanceof StyleDefinition)
			this.processReference( propVal)
		else if (propVal instanceof VarRule)
			this.processVarRule( propName, propVal)
		else if (propVal instanceof Rule)
			this.processRule( propName, propVal);
		else if (propVal instanceof RuleLike)
			this.processRuleLike( propName, propVal)
		else if (Array.isArray(propVal))
			this.processArray( propName, propVal)
	}



	// Processes reference to another style definition created by the $use function.
	private processReference( ref: StyleDefinition): void
	{
		// if the instance has not already been processed, process it now.
		processInstance( ref);
		this.refs.push( ref);
	}



	// Processes custom CSS property.
	private processVarRule( propName: string | null, varObj: VarRule): void
	{
		// we only process rules once
		if (!varObj.c)
			varObj.process( this, this.tlc, propName);

        this.vars.push( varObj);
	}



	// Processes counter object.
	private processRuleLike( propName: string | null, ruleLike: RuleLike): void
	{
		// we only process rules once
		if (!ruleLike.c)
            ruleLike.process( this, this.tlc, propName);

		this.ruleLikes.push( ruleLike);
	}



	// Processes the given Rule-derived object.
	private processRule( propName: string | null, rule: Rule): void
	{
		// we only process rules once
		if (!rule.c)
		    rule.process( this, this.tlc, propName);

		if (rule instanceof ImportRule)
			this.imports.push( rule);
		else if (rule instanceof NamespaceRule)
			this.namespaces.push( rule);
		else
			this.otherRules.push( rule);
	}



	// Processes rules from the given array.
	private processArray( propName: string | null, propVals: any[]): void
	{
		if (!propVals || propVals.length === 0)
			return;

		// loop over the properties of the definition object and process those that are rules.
        let i = 0;
		for( let propVal of propVals)
			this.processProperty( `${propName}_${i++}`, propVal);
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
	public getScopedName( ruleName: string): string
	{
		// if rule name was not specified, generate it uniquely; otherwise, check whether we
		// already have this rule name: if yes, return the already assigned name. If we didn't
		// find the name, try to find it in the base classes); if not found there, generate it
		// using this container's name and the rule name (note that depending on the mode, both
		// can be generated uniquely).
		if (!ruleName)
			return generateUniqueName();
		else if (ruleName in this.sd && "name" in this.sd[ruleName])
			return this.sd[ruleName].name;
		else
		{
			// find out if there is a rule with this name defined in a stylesheet instance created for
			// a class from the prototype chain of the style definition class.
			let existingName = findNameForRuleInPrototypeChain( this.sdc, ruleName);
			return existingName ? existingName : generateName( this.name, ruleName);
		}
	}



	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	public insert( container: CSSStyleSheet | CSSGroupingRule): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (container instanceof CSSStyleSheet)
		{
			this.imports && this.imports.forEach( rule => rule.insert( container));
			this.namespaces && this.namespaces.forEach( rule => rule.insert( container));
		}

		// activate referenced style definitions
		for( let ref of this.refs)
			ref[symContainer].activate( this.elm);

		// insert our custom variables in a ":root" rule
		if (this.vars.length > 0)
		{
			this.varRootRule = Rule.toDOM( `:root {${this.vars.map( varObj =>
				varObj.toCss()).filter( v => !!v).join(";")}}`, container) as CSSStyleRule;
		}

		// insert all other rules
		this.otherRules.forEach( rule => rule.insert( container));
	}



	/** Clears all CSS rule objects defined in this container. */
	public clear(): void
	{
        // import and namespace rules can only exist in the top-level style definition class
		if (!this.parent)
		{
			this.imports && this.imports.forEach( rule => rule.clear());
			this.namespaces && this.namespaces.forEach( rule => rule.clear());
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
                this.elm = this.ec.domStyleElm;
            else
            {
                // themes are inserted before the special placeholder element, which is created
                // at the top of the '<head>' element
                if (this.sd instanceof ThemeDefinition)
                {
                    if (!themePlaceholderElement)
                    {
                        themePlaceholderElement = document.createElement( "style");
                        themePlaceholderElement.id = generateUniqueName( "themePlaceholderElement_");
                        document.head.insertBefore( themePlaceholderElement, document.head.firstElementChild);
                    }

                    insertBefore = themePlaceholderElement;
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
        // as active. In any case, set our new instance as the currently active one.
        if (this.sd instanceof ThemeDefinition)
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
        if (this.sd instanceof ThemeDefinition)
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
			this.imports && this.imports.forEach( rule => rule.serialize( ctx));
			this.namespaces && this.namespaces.forEach( rule => rule.serialize( ctx));
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

	// List of references to other style definitions creaed via the $use function.
	private refs: StyleDefinition[];

	// List of @import rules
	private imports: ImportRule[];

	// List of @namespace rules
	private namespaces: NamespaceRule[];

	// List of custom variable rules.
	private vars: VarRule[];
    public getVars(): VarRule[] { return this.vars; }

	// List of rules that are not imports, namespaces, custom vars, references or grouping rules.
	private otherRules: Rule[];

	// List of rule-like objects.
	private ruleLikes: RuleLike[];

	// ":root" rule where all custom CSS properties defined in this container are defined.
	private varRootRule: CSSStyleRule | null;

	// Reference count of activation requests.
	private refCount: number;

	// DOM style elemnt
	public elm: HTMLStyleElement | null;
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
export const s_configureNames = (method: NameGenerationMethod, prefix?: string): void =>
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
		case NameGenerationMethod.Optimized: return generateUniqueName( s_uniqueStyleNamesPrefix);
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
const findNameForRuleInPrototypeChain = (definitionClass: IStyleDefinitionClass, ruleName: string) =>
{
	if (!definitionClass)
		return null;

	// loop over prototypes
    for( let baseClass = Object.getPrototypeOf( definitionClass);
            baseClass !== StyleDefinition && baseClass !== ThemeDefinition;
                baseClass = Object.getPrototypeOf( baseClass))
	{
		// check if the base class already has an associated instance; if yes, check whether
		// it hase a property with the given rule name. If yes, then use this rule's already
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
const processClass = (definitionClass: IStyleDefinitionClass,
	parent?: IStyleDefinition): IStyleDefinition =>
{
    // check whether this definition class is already associated with an instance
    if (definitionClass.hasOwnProperty(symInstance))
        return definitionClass[symInstance];

    // recursively process all base classes so that rule names are generated. We don't activate styles
    // for these classes because derived classes will have all the rules from all the base classes
    // as their own and so these rules will be activated as part of the derived class.
    let baseClass = Object.getPrototypeOf( definitionClass);
    if (baseClass !== StyleDefinition && baseClass !== ThemeDefinition)
		processClass( baseClass, parent);

    // create the instance of the definition class and mark it as the instance created for it
    let instance = new definitionClass( parent);
    instance[symClass] = definitionClass;

    // get the name for our container
    let name = !definitionClass.name || s_nameGeneratonMethod === NameGenerationMethod.Optimized
        ? generateUniqueName()
        : definitionClass.name;

    // create rule container, put reference to this container in the symbol property of the
    // definition instance and process the container rules.
    let container = new RuleContainer( instance, name);
    instance[symContainer] = container;
    container.process();

    // associate the definition class with the created definition instance
    definitionClass[symInstance] = instance;
    return instance;
}



/**
 * Processes the given style definition instance and assigns names to its rules. If the
 * instance has already been processed, we do nothing; otherwise, we assign new unique names
 * to its rules.
 */
const processInstance = (instance: IStyleDefinition): IStyleDefinition =>
{
	// if the instance is already processed, just return; in this case we ignore the
	// embeddingContainer parameter.
	let container = instance[symContainer] as RuleContainer;
	if (container)
		return instance;

	// get the name for our container
	let name = generateUniqueName();
	if (s_nameGeneratonMethod !== NameGenerationMethod.Optimized)
	{
		let definitionClass = instance.constructor;
		if (definitionClass.name)
			name += "_" + definitionClass.name;
	}

    // create rule container, put reference to this container in the symbol property of the
    // definition instance and process the container rules.
    container = new RuleContainer( instance, name);
    instance[symContainer] = container;
    container.process();
    return instance;
}



/**
 * Processes the given style definition instance and assigns names to its rules. If the
 * instance has already been processed, we do nothing; otherwise, we assign new unique names
 * to its rules.
 */
export const getVarsFromSD = (instOrClass: IStyleDefinition | IStyleDefinitionClass): IVarRule[] =>
{
    let instance = processSD( instOrClass);
    if (!instance)
        return [];

	let ruleContainer = instance[symContainer] as RuleContainer;
    return ruleContainer.getVars();
}



/**
 * Returns rule container object associated with the given style definition object.
 */
export const getContainerFromInstance = (instance: IStyleDefinition): RuleContainer =>
	instance ? instance[symContainer] : null;



/**
 * Activates the given style definition and inserts all its rules into DOM. If the input object is
 * not a style definition but a style definition class, obtain style definition by calling the $use
 * function. Note that each style definition object maintains a reference counter of how many times
 * it was activated and deactivated. The rules are inserted to DOM only when this reference counter
 * goes from 0 to 1.
 */
export const activateInstance = (instance: IStyleDefinition): void =>
{
	let ruleContainer = getContainerFromInstance( instance);
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
export const deactivateInstance = (instance: IStyleDefinition): void =>
{
	let ruleContainer = getContainerFromInstance( instance);
	if (!ruleContainer)
        return;

    // if this container has an embedding container, deactivate the embedding container; otherwise,
    // deactivate the rule container itself.
    (ruleContainer.ec ?? ruleContainer).deactivate();
}



/**
 * Serializes the given style definition to the given string.
 */
export const serializeInstance = (instance: IStyleDefinition, ctx: IRuleSerializationContext): void =>
{
	let ruleContainer = getContainerFromInstance( instance);
	if (ruleContainer)
	    ruleContainer.serialize( ctx);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Embedding
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/** Symbol used in style definition classes to point to an embedding container */
let symEmbeddingContainer = Symbol("symEmbeddingContainer");



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
    private definitionClasses: Set<IStyleDefinitionClass>;

	// DOM style elemnt
	public domStyleElm: HTMLStyleElement | null;



    public constructor( id: string)
    {
        this.id = id;
        this.refCount = 0;
        this.definitionClasses = new Set<IStyleDefinitionClass>();
    }



    /**
     * Adds the given style definition class to the list of embedded classes. If the container is
     * currently activated, the class will be activated too.
     */
    public add( cls: IStyleDefinitionClass): void
    {
        // add our class to the container
        this.definitionClasses.add( cls);

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
            this.domStyleElm = document.createElement( "style");
            this.domStyleElm.id = this.id;
            document.head.appendChild( this.domStyleElm);

            for( let cls of this.definitionClasses)
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
            this.domStyleElm?.remove();
            this.domStyleElm = null;

            for( let cls of this.definitionClasses)
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
let embeddingContainers = new Map<string,EmbeddingContainer>();



/**
 * Decorator function for style definition classes that will be embedded into an embedding
 * container for the given category. All style definitions for a given category will be activated
 * and deactivated together and their rules will be inserted into a single `<style>` element.
 */
export const embeddedDecorator = (category: string, target: IStyleDefinitionClass): any =>
{
    // check whether we already have container for this category; if not, add it
    let embeddingContainer = embeddingContainers.get( category);
    if (!embeddingContainer)
    {
        // generate unique ID for our container, which will be the ID of the `<style>` element
        let id = `${category}_${s_nextUniqueID++}`;
        embeddingContainer = new EmbeddingContainer( id);
        embeddingContainers.set( category, embeddingContainer);
    }

    // add our class to the container
    embeddingContainer.add( target);
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Theming support.
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Map of them definition classes to the instances that are currently active for these classes.
 */
let themeInstanceMap = new Map<IStyleDefinitionClass<ThemeDefinition>,ThemeDefinition>();



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
    return themeBaseClass && themeInstanceMap.get( themeBaseClass);
}



/**
 * Sets the theme definition object as the instance that is currently activated for the
 * corresponding base theme class.
 * @param theme theme instance to set as current for the corresponding base theme class
 */
const setCurrentTheme = (theme: ThemeDefinition): void =>
{
    let themeBaseClass = getThemeBaseClass( theme.constructor as IStyleDefinitionClass<ThemeDefinition>);
    themeBaseClass && themeInstanceMap.set( themeBaseClass, theme);
}



/**
 * Removes a theme definition object set as the instance that is currently activated for the
 * corresponding base theme class.
 * @param themeClass Theme definition class
 */
const removeCurrentTheme = (themeClass: IStyleDefinitionClass<ThemeDefinition>): void =>
{
    let themeBaseClass = getThemeBaseClass( themeClass);
    themeBaseClass && themeInstanceMap.delete( themeBaseClass);
}



