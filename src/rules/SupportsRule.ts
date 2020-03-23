import {ISupportsRule, IRuleDefinitionClass, RuleType} from "./RuleTypes"
import {GroupRule} from "./GroupRule"
import {SupportsQuery} from "../styles/StyleTypes"
import {supportsQueryToCssString} from "../styles/StyleFuncs"



/**
 * The SupportRule type describes a CSS @supports rule.
 */
export class SupportsRule<T = any> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( query?: SupportsQuery, definition?: T)
	{
		super( RuleType.SUPPORTS, definition);

		// convert the query to its string form
		this.queryString = supportsQueryToCssString( query);
	}



	// Creates a copy of the rule.
	public clone(): SupportsRule<T>
	{
		let newRule = new SupportsRule<T>();
		newRule.queryString = this.queryString;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		// determine whether the query is supported and if it is not, don't insert the rule
		if (!CSS.supports( this.queryString))
			return;
			
		let index = parent.insertRule( `@supports ${this.queryString} {}`, parent.cssRules.length);
		this.cssRule = parent.cssRules[index];

		// insert sub-rules
		this.insertRules( this.cssSupportsRule);
	}



	/** SOM supports rule */
	public get cssSupportsRule(): CSSSupportsRule { return this.cssRule as CSSSupportsRule; }

	// support query for this rule in a string form.
	public queryString: string;
}



