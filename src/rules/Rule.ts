import {IRule, RuleType, INamedEntity} from "./RuleTypes"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for Stylesheet; however, most of its the fields are undefined in
 * te Stylesheet instances.
 */
export abstract class Rule implements IRule
{
	constructor( ruleType: RuleType)
	{
		this.ruleType = ruleType;
	}



	// Processes the rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		this.container = container;
		this.owner = owner;
		this.ruleName = ruleName;
	}

	// Creates a copy of the rule.
	public abstract clone(): Rule;

	// Inserts this rule into the given parent rule or stylesheet.
	public abstract insert( parent: CSSStyleSheet | CSSGroupingRule): void;



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



	/** Type of the rule */
	public readonly ruleType: RuleType;

	// Rule container to which this rule belongs. This is "this" for Stylesheet.
	public container: RuleContainer;

	// Stylesheet to which this rule belongs. This is "this" for Stylesheet.
	public owner: IRuleContainerOwner;

	// Name of the property of the stylesheet definition to which this rule was assigned. This is
	// null for Stylesheet.
	public ruleName: string;

	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule. This is undefined for Stylesheet objects.
	public cssRule: CSSRule;
}



/** Creates scoped names based on the given parameters */
export function createNames( owner: IRuleContainerOwner, ruleName: string, nameOverride: string | INamedEntity,
	cssPrefix?: string): [string,string]
{
	let name = !nameOverride
		? owner.getScopedRuleName( ruleName)
		: typeof nameOverride === "string"
			? nameOverride
			: nameOverride.name;

	return [name, cssPrefix ? name.startsWith( cssPrefix) ? name : cssPrefix + name : name];
}



