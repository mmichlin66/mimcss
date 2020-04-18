import {StyleDefinition, IStyleDefinitionClass} from "./RuleTypes"
import {Rule, ITopLevelRuleContainer} from "./Rule"
import {VarRule} from "./VarRule"
import {ImportRule} from "./ImportRule"
import {NamespaceRule} from "./NamespaceRule"



// Define symbols that are used for keeping important information on the style definition
// instances that we don't want to be visible to developers.

// Property on the style definition class pointing to the singlton instance.
const symDefinition = Symbol("definition");

// Property on the style definition instance pointing to the RuleContainer object that is
// responsible for processing rules.
const symRuleContainer = Symbol("ruleContainer");



export function getContainerFromDefinition( definition: StyleDefinition): RuleContainer
{
	return definition[symRuleContainer];
}



export function processStyleDefinitionClass( definitionClass: IStyleDefinitionClass, owner: StyleDefinition): StyleDefinition
{
	try
	{
		let container = new RuleContainer( definitionClass, owner);
		container.process();
		definitionClass[symDefinition] = container.definition;
		return container.definition;
	}
	catch( err)
	{
		console.error( `Error instantiating Style Definition Class '${definitionClass.name}'`, err);
		return null;
	}
}



/**
 * The RuleContainer class is a shadow structure that accompanies every processed style definition
 * object. Since StyleDefinition class is an exported class visible to developers, we don't want
 * to have a lot of functionality in it. The RuleContainer object is linked to the StyleDefinition
 * object via the [symRuleContainer] symbol. It contains all the functionality for parsing rule
 * definitions, name assignment and activation/deactivation.
 */
export class RuleContainer implements ITopLevelRuleContainer
{
	constructor( definitionClass: IStyleDefinitionClass, owner: StyleDefinition)
	{
		this.definitionClass = definitionClass;
		this.owner = owner;

		this.activationRefCount = 0;
		this.domStyleElm = null;
	}



	// Creates the stylesheet definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	public process(): void
	{
		// call the 'use' function for all the base classes so that rule names are generated. We
		// don't activate stylesheets for these clases because derived classes will have all the
		// rules from all the base classes as their own and so these rules will be activated as
		// part of the derived class.
		let baseClass = this.definitionClass;
		while( (baseClass = Object.getPrototypeOf( baseClass)) !== StyleDefinition)
			use( baseClass);

		this.imports = [];
		this.namespaces = [];
		this.vars = [];
		this.refs = [];
		this.otherRules = [];

		try
		{
			// create the instance of the definition class
			this.definition = new this.definitionClass( this.owner);
		}
		catch( err)
		{
			console.error( `Error instantiating Style Definition Class '${this.definitionClass.name}'`, err);
			return;
		}

		// put reference to this container in the symbol property of the definition instance.
		this.definition[symRuleContainer] = this;

		// if the owner given in the constructor is null (that is this is a top-level definition),
		// change our owner property to point to the defintion itself
		if (!this.owner)
		{
			this.owner = this.definition;
			this.topLevelContainer = this;
		}
		else
			this.topLevelContainer = this.owner[symRuleContainer];

		// loop over the properties of the definition object and process them.
		for( let propName in this.definition)
		{
			let propVal = this.definition[propName];
			if (propVal instanceof StyleDefinition)
				this.processReference( propVal)
			else if (propVal instanceof VarRule)
				this.processVarRule( propName, propVal)
			else if (propVal instanceof Rule)
				this.processRule( propName, propVal);
			else if (Array.isArray(propVal))
				this.processArray( propVal)
		}
	}



	// Processes reference to another style definition created by the $use function.
	private processReference( ref: StyleDefinition): void
	{
		this.refs.push( ref);
	}



	// Processes custom CSS property.
	private processVarRule( propName: string, varObj: VarRule): void
	{
		// if the object is already assigned to a stylesheet, we create a clone of the
		// rule and assign it to our stylesheet.
		if (varObj.container)
			varObj = varObj.clone();

		varObj.process( this, this.topLevelContainer, propName);
		this.vars.push( varObj);
	}



	// Processes the given Rule-derived object.
	private processRule( propName: string, rule: Rule): void
	{
		// if the rule object is already assigned to a stylesheet, we create a clone of the
		// rule and assign it to our stylesheet.
		if (rule.owner)
			rule = rule.clone();

		rule.process( this.topLevelContainer, propName);

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
		{
			if (propVal instanceof StyleDefinition)
				this.processReference( propVal)
			else if (propVal instanceof VarRule)
				this.processVarRule( null, propVal)
			else if (propVal instanceof Rule)
				this.processRule( null, propVal);
			else if (Array.isArray(propVal))
				this.processArray( propVal)
		}
	}



	/** Returns the instance of the stylesheet definition class */
	public getDefinitionInstance(): StyleDefinition
	{
		return this.definition;
	}

	/** Generates a name, which will be unique in this stylesheet */
	public getScopedRuleName( ruleName: string): string
	{
		// check whether we already have this rule name: if yes, return the already assigned
		// unique scoped name
		if (!ruleName)
			return generateUniqueName();
		else if (ruleName in this.definition && "name" in this.definition[ruleName])
			return this.definition[ruleName].name;
		else
		{
			// find out if there is a rule with this name defined in a stylesheet instance created for
			// a class from the prototype chain of the style definition class.
			let existingName = findNameForRuleInPrototypeChain( this.definitionClass, ruleName);
			return existingName
				? existingName
				: this.definitionClass.isMultiplex
					? generateUniqueName()
					: generateName( this.definitionClass.name, ruleName);
		}
	}



	/** Inserts this stylesheet into DOM. */
	public activate(): void
	{
		// activate referenced style definitions
		for( let ref of this.refs)
			ref[symRuleContainer].activate();

		if (++this.activationRefCount === 1)
		{
			// only the top-level style defiition creates the `<style>` element
			if (this.isTopLevel)
			{
				this.domStyleElm = document.createElement( "style");
				this.domStyleElm.id = this.definitionClass.name;
				document.head.appendChild( this.domStyleElm);
			}
			else
				this.domStyleElm = this.topLevelContainer.domStyleElm;

			this.insertRules( this.domStyleElm.sheet as CSSStyleSheet);
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
				this.domStyleElm.remove();

			this.domStyleElm = null;
		}

		// deactivate imported stylesheets
		for( let ref of this.refs)
			ref[symRuleContainer].deactivate();
	}



	// Inserts all rules defined in this container to either the style sheet or grouping rule.
	public insertRules( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		// insert @import and @namespace rules as they must be before other rules. If the parent is a grouping
		// rule, don't insert @import and @namespace rules at all
		if (parent instanceof CSSStyleSheet)
		{
			this.imports && this.imports.forEach( rule => rule.insert( parent));
			this.namespaces && this.namespaces.forEach( rule => rule.insert( parent));
		}

		// isert our custom variables in a ":root" rule
		if (this.vars.length > 0)
		{
			this.cssCustomVarStyleRule = Rule.addRuleToDOM( `:root {${this.vars.map( varObj =>
				varObj.toCssString()).join(";")}}`, parent) as CSSStyleRule;
		}

		// insert all other rules
		this.otherRules.forEach( rule => rule.insert( parent));
	}



	// Clears all CSS rule objects defined in this container.
	public clearRules(): void
	{
		if (this.owner === this.definition)
		{
			this.imports && this.imports.forEach( rule => rule.clear());
			this.namespaces && this.namespaces.forEach( rule => rule.clear());
		}

		this.cssCustomVarStyleRule = null;

		this.otherRules.forEach( rule => rule.clear());
	}



	// Sets the given value for the property with the given name
	public setCustomVarValue( name: string, value: string, important?: boolean): void
	{
		if (this.cssCustomVarStyleRule)
			this.cssCustomVarStyleRule.style.setProperty( name, value, important ? "!important" : null);
	}



	// Flag indicating whether this container is for the top-level style definition.
	private get isTopLevel(): boolean { return this.owner === null || this.owner === this.definition }



	// Style definition class that this container creates an instance of.
	private definitionClass: IStyleDefinitionClass

	// Instance of the style definition class that this container processed.
	public definition: StyleDefinition;

	// Instance of the top-level style definition class in the chain of grouping rules that
	// lead to this rule container. For top-level style definitions, this points to the same
	// singleton definition instance as the 'definition' property.
	private owner: StyleDefinition;

	// Rule container that belongs to the owner style defintion. If our container is top-level,
	// this property points to `this`.
	private topLevelContainer: RuleContainer;

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
	private cssCustomVarStyleRule: CSSStyleRule;

	// Reference count of activation requests.
	private activationRefCount: number;

	// DOM style elemnt
	public domStyleElm: HTMLStyleElement;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// Name generation
//
///////////////////////////////////////////////////////////////////////////////////////////////////

// Flag indicating whether to use optimaized names for style elements (class names, animation
// names, etc.)
let useUniqueStyleNames: boolean = false;

// Prefix to use when generating unique style names. If undefined, a standard prefix "n" will
// be used.
let uniqueStyleNamesPrefix: string = "n";

// Next number to use when generating unique identifiers.
let nextUniqueID: number = 1;

// Map of style definition classes to their singlton Stylesheet objects. Non-multiplex style
// definition classes are added to this map upon calling the $use function on them.
let classToInstanceMap = new Map<IStyleDefinitionClass,StyleDefinition>();




/**
 * Generates name to use for the given rule from the given style sheet.
 */
function generateName( sheetName: string, ruleName: string): string
{
	return useUniqueStyleNames
		? generateUniqueName( uniqueStyleNamesPrefix)
		: `${sheetName}_${ruleName}`;
}



/**
 * Generates a unique name, which can be used either for style element's ID or or class,
 * identifier or animation name. Names are generated using a simple incrementing number.
 */
function generateUniqueName( prefix?: string): string
{
	return (prefix ? prefix : uniqueStyleNamesPrefix) + nextUniqueID++;
}



// Looks up a property with the given name in the prototype chain of the given style definition
// class. If found and if the property is a rule, then returns the name assigned for it.
function findNameForRuleInPrototypeChain( definitionClass: IStyleDefinitionClass, ruleName: string)
{
	// loop over prototypes
	let baseClass = definitionClass;
	while( (baseClass = Object.getPrototypeOf( baseClass)) !== StyleDefinition)
	{
		// check if the base class has an instance in the global map of used definition classes;
		// if yes, check whether it hase a property with the given rule name. If yes, then
		// use this rule's already generated name (if exists).
		let baseInst = classToInstanceMap.get( baseClass);
		if (baseInst && ruleName in baseInst && "name" in baseInst[ruleName])
			return baseInst[ruleName].name;
	}

	return null;
}



///////////////////////////////////////////////////////////////////////////////////////////////////
//
// API functions
//
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Processes the given stylesheet definition and returns the Stylesheet object that contains
 * names of IDs, classes and keyframes and allows style manipulations. For a given stylesheet
 * definition class there is a single stylesheet object, no matter how many times this function
 * is invoked.
 */
export function use<T extends StyleDefinition>( definitionClass: IStyleDefinitionClass<T>): T
{
	if (!definitionClass)
		return null;

	// if the stylesheet definition is multiplex, create new Stylesheet object every time;
	// otherwise, check whether the style sheet definition object has already been processed. This
	// is indicated by the existence of the instance static property on the class.
	if (definitionClass.isMultiplex)
		return processStyleDefinitionClass( definitionClass, null) as T;
	else
	{
		let definition = classToInstanceMap.get( definitionClass);
		if (!definition)
		{
			definition = processStyleDefinitionClass( definitionClass, null);
			if (!definition)
				return null;
				
			classToInstanceMap.set( definitionClass, definition);
		}

		return definition as T;
	}
}



/**
 * Activates the given style definition and inserts all its rules into DOM. If the input object is
 * not a style definition but a style definition class, obtain style definition by calling the $use
 * function. Note that each style definition object maintains a reference counter of how many times
 * it was activated and deactivated. The rules are inserted to DOM only when this reference counter
 * goes up to 1.
 */
export function activate<T extends StyleDefinition>( definitionOrClass: T | IStyleDefinitionClass<T>): T
{
	if (!definitionOrClass)
		return null;

	let definition: T;
	if (definitionOrClass instanceof StyleDefinition)
		definition = definitionOrClass as T;
	else
		definition = use( definitionOrClass as IStyleDefinitionClass<T>);

	if (!definition)
		return null;

	let ruleContainer = definition[symRuleContainer] as RuleContainer;
	ruleContainer.activate();
	return definition;
}



/**
 * Deactivates the given style definition by removing its rules from DOM. Note that each style
 * definition object maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function deactivate( definition: StyleDefinition): void
{
	if (!definition)
		return;

	let ruleContainer = definition[symRuleContainer] as RuleContainer;
	ruleContainer.deactivate();
}



/**
 * Sets the flag indicating whether to use optimized (short) rule names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param enable
 * @param prefix
 */
export function enableOptimizedStyleNames( enable: boolean, prefix?: string): void
{
	useUniqueStyleNames = enable;
	uniqueStyleNamesPrefix = prefix ? prefix : "n";
}



