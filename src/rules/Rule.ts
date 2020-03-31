import {IRule, RuleType} from "./RuleTypes"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for StyleScope; however, most of its the fields are undefined in
 * te StyleScope instances.
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



	/** Type of the rule */
	public readonly ruleType: RuleType;

	// Rule container to which this rule belongs. This is "this" for StyleScope.
	public container: RuleContainer;

	// Stylesheet to which this rule belongs. This is "this" for StyleScope.
	public owner: IRuleContainerOwner;

	// Name of the property of the stylesheet definition to which this rule was assigned. This is
	// null for StyleScope.
	public ruleName: string;

	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule. This is undefined for StyleScope objects.
	public cssRule: CSSRule;
}



