import {IRule, INamedEntity, StyleDefinition} from "./RuleTypes"



/**
 * The IRuleContainerOwner interface represents a stylesheet that "owns" the rules under this
 * container. In particular, the owner's job is to generate "scoped" unique names.
 */
export interface ITopLevelRuleContainer
{
	/** Returns the instance of the stylesheet definition class */
	getDefinitionInstance(): StyleDefinition;

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
	public process( owner: ITopLevelRuleContainer, ruleName: string): void
	{
		this.owner = owner;
		this.ruleName = ruleName;
	}

	// Creates a copy of the rule.
	public clone(): Rule { return null; }

	// Inserts this rule into the given parent rule or stylesheet. This method is called when the
	// style definition class, to which this rule belongs, is activated.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void {}

	// Clers the CSS rule object. This method is called when the style definition class, to which
	// this rule belongs, is deactivated.
	public clear(): void { this.cssRule = null; }



	// Inserts the given rule into the given parent rule or stylesheet.
	public static addRuleToDOM( ruleText: string, parent: CSSStyleSheet | CSSGroupingRule): CSSRule
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
	public ruleName: string;

	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule. This is undefined for Stylesheet objects.
	public cssRule: CSSRule;
}



/** Creates scoped names based on the given parameters */
export function createNames( owner: ITopLevelRuleContainer, ruleName: string, nameOverride: string | INamedEntity,
	cssPrefix?: string): [string,string]
{
	let name = !nameOverride
		? owner.getScopedRuleName( ruleName)
		: typeof nameOverride === "string"
			? nameOverride
			: nameOverride.name;

	return [name, cssPrefix ? name.startsWith( cssPrefix) ? name : cssPrefix + name : name];
}



