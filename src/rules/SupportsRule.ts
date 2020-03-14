import {ISupportsRule, IRuleDefinitionClass, RuleType} from "./RuleTypes"
import {GroupRule} from "./GroupRule"



/**
 * The SupportRule type describes a CSS @supports rule.
 */
export class SupportsRule<T = any> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( query?: string, definitionClass?: IRuleDefinitionClass<T>)
	{
		super( RuleType.SUPPORTS, definitionClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): SupportsRule<T>
	{
		let newRule = new SupportsRule<T>();
		newRule.query = this.query;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		// determine whether the query is supported and if it is not, don't insert the rule
		if (!CSS.supports( this.query))
			return;
			
		let index = parent.insertRule( `@supports ${this.query} {}`, parent.cssRules.length);
		this.cssRule = parent.cssRules[index];

		// insert sub-rules
		this.insertRules( this.cssSupportsRule);
	}



	/** SOM supports rule */
	public get cssSupportsRule(): CSSSupportsRule { return this.cssRule as CSSSupportsRule; }

	// support query for this rule.
	public query: string;
}



