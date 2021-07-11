import {StyleDefinition, IStyleDefinitionClass, NameGenerationMethod} from "../api/RuleTypes"
import {Rule, ITopLevelRuleContainer, RuleLike, IRuleSerializationContext} from "./Rule"
import {VarRule} from "./VarRule"
import {ImportRule, NamespaceRule} from "./MiscRules"
import {scheduleStyleUpdate} from "../impl/SchedulingImpl";



// Define symbols that are used for keeping important information on the style definition
// instances that we don't want to be visible to developers.

/** Property on the style definition class pointing to the singlton instance. */
const symInstance = Symbol("definition");

/**
 * Property on the style definition instance pointing to the RuleContainer object that is
 * responsible for processing rules.
 */
const symContainer = Symbol("container");



/**
 * The RuleContainer class is a shadow structure that accompanies every processed style definition
 * object. Since StyleDefinition class is an exported class visible to developers, we don't want
 * to have a lot of functionality in it. The RuleContainer object is linked to the StyleDefinition
 * object via the [symRuleContainer] symbol. It contains all the functionality for parsing rule
 * definitions, name assignment and activation/deactivation.
 */
class RuleContainer implements ITopLevelRuleContainer
{
	constructor( instance: StyleDefinition, name: string, embeddingContainer?: RuleContainer)
	{
		this.instance = instance;
		this.name = name;
		this.embeddingContainer = embeddingContainer;

        this.definitionClass = instance.constructor as IStyleDefinitionClass;
        this.parent = instance.$parent;
		this.owner = instance.$owner;

		this.activationRefCount = 0;
		this.domStyleElm = null;

		this.process();
	}



	// Processes the properties of the style definition instance. This creates names for classes,
	// IDs, animations and custom variables.
	private process(): void
	{
		// put reference to this container in the symbol property of the definition instance.
		this.instance[symContainer] = this;

		// get containers for the parent and owner style definition
        if (this.parent)
            this.parentContainer = this.parent[symContainer];

		if (this.owner)
			this.topLevelContainer = this.owner[symContainer];

		// if our container has parent container, prefix our name with the upper one
		if (this.parentContainer)
			this.name = `${this.parentContainer.name}_${this.name}`;

		this.imports = [];
		this.namespaces = [];
		this.vars = [];
		this.refs = [];
		this.otherRules = [];

		// loop over the properties of the definition object and process them.
		for( let propName in this.instance)
			this.processProperty( propName, this.instance[propName]);
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
			this.processArray( propVal)
	}



	// Processes reference to another style definition created by the $use function.
	private processReference( ref: StyleDefinition): void
	{
		// if the instance has not already been processed, process it and indicate that it is
		// embedded into our container because only definitions created with the $embed function
		// are not processed.
		processInstance( ref, this);
		this.refs.push( ref);
	}



	// Processes custom CSS property.
	private processVarRule( propName: string | null, varObj: VarRule): void
	{
		// if the object is already assigned to a stylesheet, we create a clone of the
		// rule and assign it to our stylesheet.
		if (varObj.container)
			varObj = varObj.clone();

		varObj.process( this, this.topLevelContainer, propName);
		this.vars.push( varObj);
	}



	// Processes counter object.
	private processRuleLike( propName: string | null, ruleLike: RuleLike): void
	{
		// if the object is already assigned to a stylesheet, we create a clone of the
		// rule and assign it to our stylesheet.
		if (ruleLike.container)
            ruleLike = ruleLike.clone();

        ruleLike.process( this, this.topLevelContainer, propName);
	}



	// Processes the given Rule-derived object.
	private processRule( propName: string | null, rule: Rule): void
	{
		// if the rule object is already processed as part of another instance, we create a clone
		// of the rule and set it to our instance.
		if (rule.ownerContainer)
		{
			if (propName)
				this.instance[propName] = rule = rule.clone();
			else
			{
				// TODO: support already used rules in an array
				return;
			}
		}

		rule.process( this, this.topLevelContainer, propName);

		if (rule instanceof ImportRule)
			this.imports.push( rule);
		else if (rule instanceof NamespaceRule)
			this.namespaces.push( rule);
		else
			this.otherRules.push( rule);
	}



	// Processes rules from the given array.
	private processArray( propVals: any[]): void
	{
		if (!propVals || propVals.length === 0)
			return;

		// loop over the properties of the definition object and process those that are rules.
		for( let propVal of propVals)
			this.processProperty( null, propVal);
	}



	/** Returns the instance of the stylesheet definition class */
	public getDefinitionInstance(): StyleDefinition
	{
		return this.instance;
	}



	// Sets the given value for the custom CSS roperty with the given name.
	public setCustomVarValue( name: string, value: string, important?: boolean, schedulerType?: number): void
	{
		if (this.cssCustomVarStyleRule)
            scheduleStyleUpdate( this.cssCustomVarStyleRule, name, value, important, schedulerType);
	}



	/**
	 * Generates a globally unique CSS name for the given rule name unless this rule name already
	 * exists either in a base class or in the chain of parent grouping rules.
	 */
	public getScopedRuleName( ruleName: string): string
	{
		// if rule name was not specified, generate it uniquely; otherwise, check whether we
		// already have this rule name: if yes, return the already assigned name. If we didn't
		// find the name, try to find it in the base classes); if not found there, generate it
		// using this container's name and the rule name (note that depending on the mode, both
		// can be generated uniquely).
		if (!ruleName)
			return generateUniqueName();
		else if (ruleName in this.instance && "name" in this.instance[ruleName])
			return this.instance[ruleName].name;
		else
		{
			// find out if there is a rule with this name defined in a stylesheet instance created for
			// a class from the prototype chain of the style definition class.
			let existingName = findNameForRuleInPrototypeChain( this.definitionClass, ruleName);
			return existingName ? existingName : generateName( this.name, ruleName);
		}
	}



	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	public insertRules( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (parent instanceof CSSStyleSheet)
		{
			this.imports && this.imports.forEach( rule => rule.insert( parent));
			this.namespaces && this.namespaces.forEach( rule => rule.insert( parent));
		}

		// activate referenced style definitions
		for( let ref of this.refs)
			ref[symContainer].activate();

		// isert our custom variables in a ":root" rule
		if (this.vars.length > 0)
		{
			this.cssCustomVarStyleRule = Rule.addRuleToDOM( `:root {${this.vars.map( varObj =>
				varObj.toCssString()).filter( v => !!v).join(";")}}`, parent) as CSSStyleRule;
		}

		// insert all other rules
		this.otherRules.forEach( rule => rule.insert( parent));
	}



	/** Clears all CSS rule objects defined in this container. */
	public clearRules(): void
	{
        // import and namespace rules can only exist in the top-level style definition class
		if (this.isTopLevel)
		{
			this.imports && this.imports.forEach( rule => rule.clear());
			this.namespaces && this.namespaces.forEach( rule => rule.clear());
		}

		this.cssCustomVarStyleRule = null;

		this.otherRules.forEach( rule => rule.clear());

		// deactivate imported stylesheets
		for( let ref of this.refs)
			ref[symContainer].deactivate();
	}



	/** Inserts this stylesheet into DOM. */
	public activate(): void
	{
		if (++this.activationRefCount === 1)
		{
			// only the top-level not-embedded style definitions create the `<style>` element
			if (this.embeddingContainer)
				this.domStyleElm = this.embeddingContainer.domStyleElm;
			else if (this.isTopLevel)
			{
				this.domStyleElm = document.createElement( "style");
				this.domStyleElm.id = this.name;
				document.head.appendChild( this.domStyleElm);
			}
			else
				this.domStyleElm = this.topLevelContainer.domStyleElm;

			this.insertRules( this.domStyleElm!.sheet as CSSStyleSheet);
		}
	}



	/** Removes this stylesheet from DOM. */
	public deactivate(): void
	{
		// guard from extra deactivate calls
		if (this.activationRefCount === 0)
			return;

		if (--this.activationRefCount === 0)
		{
			this.clearRules();

			// only the top-level style defiition creates the `<style>` element
			if (this.isTopLevel)
				this.domStyleElm!.remove();

			this.domStyleElm = null;
		}
	}



	/** Writes all rules recursively to the given string. */
	public serializeRules( ctx: IRuleSerializationContext): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (this.isTopLevel)
		{
			this.imports && this.imports.forEach( rule => rule.serialize( ctx));
			this.namespaces && this.namespaces.forEach( rule => rule.serialize( ctx));
		}

		// activate referenced style definitions
        for( let ref of this.refs)
            ctx.addStyleDefinition( ref);

		// serialize our custom variables in a ":root" rule
		if (this.vars.length > 0)
		{
			ctx.addRuleText( `:root {${this.vars.map( varObj => varObj.toCssString()).filter( v => !!v).join(";")}}`);
		}

		// serialize all other rules
		this.otherRules.forEach( rule => rule.serialize( ctx));
	}



	// Flag indicating whether this container is for the top-level style definition.
	private get isTopLevel(): boolean { return this.owner === null || this.owner === this.instance }



	// Instance of the style definition class that this container processed.
	public instance: StyleDefinition;

	// Style definition class that this container creates an instance of.
	private definitionClass: IStyleDefinitionClass

	// Name of this container, which, depending on the mode, is either taken from the class
	// definition name or generated uniquely.
	private name: string

	// Instance of the parent style definition class in the chain of grouping rules that
	// lead to this rule container. For top-level style definitions, this is undefined.
	private parent?: StyleDefinition;

	// Rule container that belongs to the parent style defintion. If our container is top-level,
	// this property is undefined.
	private parentContainer?: RuleContainer;

	// Instance of the top-level style definition class in the chain of grouping rules that
	// lead to this rule container. For top-level style definitions, this points to the same
	// singleton definition instance as the 'instance' property.
	private owner: StyleDefinition;

	// Rule container that belongs to the owner style defintion. If our container is top-level,
	// this property points to `this`. Names for named rules are created using this container.
	private topLevelContainer: RuleContainer;

	// Container corresponding to the style definition instance that is embedding our instance
	// (that is, the instance corresponding to our container). If defined, this container's
	// `<style>` element is used to insert CSS rules into instead of topLevelContainer.
	private embeddingContainer?: RuleContainer;

	// List of references to other style definitions creaed via the $use function.
	private refs: StyleDefinition[];

	// List of @import rules
	private imports: ImportRule[];

	// List of @namespace rules
	private namespaces: NamespaceRule[];

	// List of custom variable rules.
	private vars: VarRule[];

	// List of rules that are not imports, namespaces, custom vars, references or grouping rules.
	private otherRules: Rule[];

	// ":root" rule where all custom CSS properties defined in this container are defined.
	private cssCustomVarStyleRule: CSSStyleRule | null;

	// Reference count of activation requests.
	private activationRefCount: number;

	// DOM style elemnt
	public domStyleElm: HTMLStyleElement | null;
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
export function s_configNames( method: NameGenerationMethod, prefix?: string): void
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
function generateName( sheetName: string, ruleName: string): string
{
	switch( s_nameGeneratonMethod)
    {
		case NameGenerationMethod.UniqueScoped: return `${sheetName}_${ruleName}_${s_nextUniqueID++}`;
		case NameGenerationMethod.Optimized:return generateUniqueName( s_uniqueStyleNamesPrefix);
        case NameGenerationMethod.Scoped:return `${sheetName}_${ruleName}`;
    }
}



/**
 * Generates a unique name, which can be used either for style element's ID or or class,
 * identifier or animation name. Names are generated using a simple incrementing number.
 */
function generateUniqueName( prefix?: string): string
{
	return (prefix ? prefix : s_uniqueStyleNamesPrefix) + s_nextUniqueID++;
}



// Looks up a property with the given name in the prototype chain of the given style definition
// class. If found and if the property is a rule, then returns the name assigned for it.
function findNameForRuleInPrototypeChain( definitionClass: IStyleDefinitionClass, ruleName: string)
{
	if (!definitionClass)
		return null;

	// loop over prototypes
    for( let baseClass = Object.getPrototypeOf( definitionClass);
            baseClass !== StyleDefinition;
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
export function processInstanceOrClass( instOrClass: StyleDefinition | IStyleDefinitionClass,
	parent?: StyleDefinition): StyleDefinition | null
{
	if (!instOrClass)
		return null;

	// instOrClass has type "object" if it is an instance and "function" if it is a class
	if (typeof instOrClass === "object")
	{
		processInstance( instOrClass);
		return instOrClass;
	}
	else
		return processClass( instOrClass, parent);
}



/**
 * Processes the given style definition class by creating its instance and associating a
 * rule container object with it. The class will be associated with the instance using a
 * Symbol property. The parent parameter is a reference to the parent style defiition
 * object or null if the given class is itself a top-level class (that is, is not a class
 * that defines rules within nested grouping rules).
 */
function processClass( definitionClass: IStyleDefinitionClass,
	parent?: StyleDefinition): StyleDefinition | null
{
    // check whether this definition class is already associated with an instance
    if (definitionClass.hasOwnProperty(symInstance))
        return definitionClass[symInstance]

    // recursively process all base classes so that rule names are generated. We don't activate styles
    // for these classes because derived classes will have all the rules from all the base classes
    // as their own and so these rules will be activated as part of the derived class.
    let baseClass = Object.getPrototypeOf( definitionClass);
    if (baseClass !== StyleDefinition)
		processClass( baseClass, parent);

	try
	{
		// create the instance of the definition class
		let instance = new definitionClass( parent);

		// get the name for our container
		let name = !definitionClass.name || s_nameGeneratonMethod === NameGenerationMethod.Optimized
			? generateUniqueName()
			: definitionClass.name;

		new RuleContainer( instance, name);
		definitionClass[symInstance] = instance;
		return instance;
	}
	catch( err)
	{
		console.error( `Error instantiating Style Definition Class '${definitionClass.name}'`, err);
		return null;
	}
}



/**
 * Processes the given style definition instance and assigns names to its rules. If the
 * instance has already been processed, we do nothing; otherwise, we assign new unique names
 * to its rules.
 */
function processInstance( instance: StyleDefinition, embeddingContainer?: RuleContainer): void
{
	// if the instance is already processed, just return; in this case we ignore the
	// embeddingContainer parameter.
	let ruleContainer = instance[symContainer] as RuleContainer;
	if (ruleContainer)
		return;

	// get the name for our container
	let name = generateUniqueName();
	if (!s_nameGeneratonMethod)
	{
		let definitionClass = instance.constructor;
		if (definitionClass.name)
			name += "_" + definitionClass.name;
	}

	// create container - this will associate the new container with the instance and process
	// the rules.
	new RuleContainer( instance, name, embeddingContainer);
}



/**
 * Returns rule container object associated with the given style definition object.
 */
export function getContainerFromInstance( instance: StyleDefinition): RuleContainer
{
	return instance ? instance[symContainer] : null;
}



/**
 * Activates the given style definition and inserts all its rules into DOM. If the input object is
 * not a style definition but a style definition class, obtain style definition by calling the $use
 * function. Note that each style definition object maintains a reference counter of how many times
 * it was activated and deactivated. The rules are inserted to DOM only when this reference counter
 * goes up to 1.
 */
export function activateInstance( instance: StyleDefinition, count: number): void
{
	let ruleContainer = getContainerFromInstance( instance);
	if (ruleContainer)
	{
		for( let i = 0; i < count; i++)
			ruleContainer.activate();
	}
}



/**
 * Deactivates the given style definition by removing its rules from DOM. Note that each style
 * definition object maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function deactivateInstance( instance: StyleDefinition, count: number): void
{
	let ruleContainer = getContainerFromInstance( instance);
	if (ruleContainer)
	{
		for( let i = 0; i < count; i++)
			ruleContainer.deactivate();
	}
}



/**
 * Serializes the given style definition to the given string.
 */
export function serializeInstance( instance: StyleDefinition, ctx: IRuleSerializationContext): void
{
	let ruleContainer = getContainerFromInstance( instance);
	if (ruleContainer)
	    ruleContainer.serializeRules( ctx);
}



