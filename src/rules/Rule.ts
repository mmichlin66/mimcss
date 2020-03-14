import {IRule, RuleType} from "../api/rules"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The Rule class is used as a base class for all rules. As a parent of RuleContainer, the Rule
 * class is also an ancestor for StyleScope; however, most of its the fields are undefined in
 * te StyleScope instances.
 */
export abstract class Rule implements IRule
{
	constructor( type: RuleType)
	{
		this.type = type;
	}



	// Processes the rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		this.container = container;
		this.owner = owner;
		this.ruleName = ruleName;
	}

	/**
	 * Determines whether this rule requires name - that is it will be ignored if created within
	 * the addUnnamedRules function.
	 */
	public get nameIsRequired(): boolean { return false; }

	// Creates a copy of the rule.
	public abstract clone(): Rule;

	// Inserts this rule into the given parent rule or stylesheet.
	public abstract insert( parent: CSSStyleSheet | CSSGroupingRule): void;



	// Determines whether this rule is a real CSS rule that should be inserted under the <style>
	// element. For the majority of Rule-derived classes this is true; however, for some classes,
	// e.g. for the CustomVar class, this is not so.
	public get isRealCssRule(): boolean { return true; }



	/** Type of the rule */
	public readonly type: RuleType;

	// Rule container to which this rule belongs. This is "this" for StyleScope.
	public container: RuleContainer;

	// Style scope to which this rule belongs. This is "this" for StyleScope.
	public owner: IRuleContainerOwner;

	// Name of the property of the style scope definition to which this rule was assigned. This is
	// null for StyleScope.
	public ruleName: string;

	// CSSRule-derived object corresponding to the actuall CSS rule inserted into
	// the styles sheet or the parent rule. This is undefined for StyleScope objects.
	public cssRule: CSSRule;
}



