import {IRule, INamedEntity, StyleDefinition} from "./RuleTypes"



/**
 * The IRuleContainer interface represents an object that accompanies and is associated with
 * a style definition object.
 */
export interface IRuleContainer
{
	/** Returns the instance of the stylesheet definition class */
	getDefinitionInstance(): StyleDefinition;

	/** Inserts all rules defined in this container to either the style sheet or grouping rule. */
	insertRules( parent: CSSStyleSheet | CSSGroupingRule): void;

	/** Clears all CSS rule objects defined in this container. */
	clearRules(): void;

	/** Sets the given value for the custom CSS roperty with the given name. */
	setCustomVarValue( name: string, value: string | null, important?: boolean): void;
}



/**
 * The ITopLevelRuleContainer interface represents a top-level style definition object that "owns"
 * the rules under this container. In particular, the owner's job is to generate "scoped" unique
 * names.
 */
export interface ITopLevelRuleContainer extends IRuleContainer
{
	/** Generates a name, which will be unique in this stylesheet */
	getScopedRuleName( ruleName: string): string;
}



/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for Stylesheet; however, most of its the fields are undefined in
 * te Stylesheet instances.
 */
export abstract class Rule implements IRule
{
	// Processes the rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string | null): void
	{
		this.owner = owner;
		this.ruleName = ruleName;
	}

	// Creates a copy of the rule.
	public abstract clone(): Rule;

	// Inserts this rule into the given parent rule or stylesheet. This method is called when the
	// style definition class, to which this rule belongs, is activated.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void {}

	// Clers the CSS rule object. This method is called when the style definition class, to which
	// this rule belongs, is deactivated.
	public clear(): void { this.cssRule = null; }



	// Inserts the given rule into the given parent rule or stylesheet.
	public static addRuleToDOM( ruleText: string, parent: CSSStyleSheet | CSSGroupingRule): CSSRule | null
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



	// Stylesheet to which this rule belongs. This is "this" for Stylesheet.
	public owner: ITopLevelRuleContainer;

	// Name of the property of the stylesheet definition to which this rule was assigned. This is
	// null for Stylesheet.
	public ruleName: string | null;

	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule. This is undefined for Stylesheet objects.
	public cssRule: CSSRule | null;
}



/** Creates scoped names based on the given parameters */
export function createNames( owner: ITopLevelRuleContainer, ruleName: string | null, nameOverride?: string | INamedEntity,
	cssPrefix?: string): [string,string]
{
	if (!ruleName && !nameOverride)
		return ["", ""];

	let name = !nameOverride
		? owner.getScopedRuleName( ruleName!)
		: typeof nameOverride === "string"
			? nameOverride
			: nameOverride.name;

	return !cssPrefix
		? [name,name]
		: name.startsWith( cssPrefix)
			? [name.substr( cssPrefix.length), name]
			: [name, cssPrefix + name];
}



