import {IGroupRule, RuleType} from "./RuleTypes"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends {} = {}> extends RuleContainer<T> implements IGroupRule<T>
{
	public constructor( type: RuleType, definition: T)
	{
		super( type, definition);
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		// process sub-rules
		this.processRules();
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = this.insertGroupingRule( parent);

		// insert sub-rules
		if (this.cssRule)
			this.insertRules( this.cssRule as CSSGroupingRule);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	protected abstract insertGroupingRule( parent: CSSStyleSheet | CSSGroupingRule): CSSRule;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		this.clearRules();
	}



	/** SOM grouping rule */
	public get cssGroupRule(): CSSGroupingRule { return this.cssRule as CSSGroupingRule; }
}



