import {ISupportsRule, RuleType} from "./RuleTypes"
import {Rule} from "./Rule"
import {GroupRule} from "./GroupRule"
import {SupportsQuery} from "../styles/StyleTypes"
import {supportsQueryToCssString} from "../styles/StyleFuncs"



/**
 * The SupportRule class describes a CSS @supports rule.
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
	public insertGroupingRule( parent: CSSStyleSheet | CSSGroupingRule): CSSRule
	{
		// determine whether the query is supported and if it is not, don't insert the rule
		return CSS.supports( this.queryString)
			? Rule.addRuleToDOM( `@supports ${this.queryString} {}`, parent)
			: null;
	}



	/** SOM supports rule */
	public get cssSupportsRule(): CSSSupportsRule { return this.cssRule as CSSSupportsRule; }

	// support query for this rule in a string form.
	public queryString: string;
}



