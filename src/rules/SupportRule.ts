import {ISupportRule, IRuleDefinitionClass} from "../api/rules"
import {GroupRule} from "./GroupRule"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The SupportRule type describes a CSS @supports rule.
 */
export class SupportRule<T = any> extends GroupRule<T> implements ISupportRule<T>
{
	public constructor( query?: string, definitionClass?: IRuleDefinitionClass<T>)
	{
		super( definitionClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): SupportRule<T>
	{
		let newRule = new SupportRule<T>();
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
		this.insertRules();
	}



	/** Only needed to distinguish from other rules */
	public get isSupportRule(): boolean { return true; }

	// selector object for this rule.
	public query: string;
}



