import {RuleType, IRuleDefinition, IStylesheetDefinitionClass, IStylesheet} from "./RuleTypes"
import {Rule} from "./Rule"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The Stylesheet class represents a parsed form of a IStylesheetDefinition-derived class.
 */
export class Stylesheet<T = IRuleDefinition> extends RuleContainer<T> implements IStylesheet<T>, IRuleContainerOwner
{
	public constructor( definitionClass: IStylesheetDefinitionClass<T>)
	{
		super( RuleType.SCOPE, definitionClass)

		this.definitionClass = definitionClass;

		this.activationRefCount = 0;
		this.domStyleElm = null;
		this.usedStylesheets = [];

		this.processStylesheet();
	}



	// Creates a copy of the rule.
	// This method is not used and is need only because it is abstract in the Rule class.
	public clone(): Rule { return null; }

	// Inserts this rule into the given parent rule or stylesheet.
	// This method is not used and is need only because it is abstract in the Rule class.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void {}



	// Creates the stylesheet definition instance, parses its properties and creates names for
	// classes, IDs, animations.
	private processStylesheet(): void
	{
		// check if the stylesheet definition has already been processed
		if (this.isProcessed)
			return;

		// the container and the owner properties of the Rule base class point to the Stylesheet
		// object itself
		super.process( this, this, null);

		this.isMultiplex = !!this.definitionClass.isMultiplex;

		// in DEBUG, each class has a name unless it was created as an anonymous class. In RELEASE,
		// (as well as in the anonymous cases), the name is undefined and we generate a unique
		// name for the stylesheet.
		this.name = this.definitionClass.name;
		if (!this.name)
			this.name = generateUniqueName( "s");

		// process sub-rules rules.
		this.processRules();
	}



	/** Adds a stylesheet this stylesheet */
	public addExternalStylesheet( stylesheet: IStylesheet): void
	{
		this.usedStylesheets.push( stylesheet as Stylesheet);
	}



	/** Generates a name, which will be unique in this stylesheet */
	public getScopedRuleName( ruleName: string): string
	{
		// check whether we already have this rule name: if yes, return the already assigned
		// unique scoped name
		if (!ruleName)
			return generateUniqueName();
		else if (ruleName in this.allNames)
			return this.allNames[ruleName];
		else
			return this.generateScopedName( ruleName);
	}



	// Generates a name, which will be unique in this stylesheet
	public generateScopedName( ruleName: string): string
	{
		if (this.isMultiplex)
			return generateUniqueName();
		else
			return generateName( this.name, ruleName);
	}



	/** Inserts this stylesheet into DOM. */
	public activate(): void
	{
		// activate imported stylesheets
		for( let stylesheet of this.usedStylesheets)
			stylesheet.activate();

		if (++this.activationRefCount === 1)
		{
			this.domStyleElm = document.createElement( "style");
			this.domStyleElm.id = this.name;
			document.head.appendChild( this.domStyleElm);
			this.insertRules( this.domStyleElm.sheet as CSSStyleSheet);
		}
	}



	/** Removes this stylesheet from DOM - only works for multiplex stylesheets. */
	public deactivate(): void
	{
		// guard from extra deactivate calls
		if (this.activationRefCount === 0)
			return;

		if (--this.activationRefCount === 0)
		{
			this.domStyleElm.remove();
			this.domStyleElm = null;
		}

		// deactivate imported stylesheets
		for( let stylesheet of this.usedStylesheets)
			stylesheet.deactivate();
	}



	// Class that defined this stylesheet. This member is used for stylesheet derivation
	public readonly definitionClass: IStylesheetDefinitionClass<T>;

	// Name of the style sheet - used to create scoped names of style rules
	public name: string;

	// Flag indicating whether this stylesheet object owns the <style> element. This is true only
	// for multiplex stylesheets - those that can be creaed multiple times.
	public isMultiplex: boolean;

	// Reference count of activation requests.
	private activationRefCount: number;

	// DOM style elemnt
	public domStyleElm: HTMLStyleElement;

	// List of used stylesheet objects that will be activated when our stylesheet is activated.
	private usedStylesheets: Stylesheet[];
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



/**
 * Sets the flag indicating whether to use optimized (unique) style names. If yes, the names
 * will be created by appending a unique number to the given prefix. If the prefix is not
 * specified, the standard prefix "n" will be used.
 * @param optimize
 * @param prefix
 */
export function useOptimizedStyleNames( optimize: boolean, prefix?: string): void
{
	useUniqueStyleNames = optimize;
	uniqueStyleNamesPrefix = prefix ? prefix : "n";
}



/**
 * Generates name to use for the given rule from the given style sheet.
 * @param sheetName 
 * @param ruleName 
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



