import {ISupportsRule, RuleType, IGroupRuleDefinitionClass, GroupRuleDefinition} from "./RuleTypes"
import {Rule} from "./Rule"
import {GroupRule} from "./GroupRule"
import {SupportsQuery} from "../styles/StyleTypes"
import {supportsQueryToCssString} from "../styles/StyleFuncs"



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends GroupRuleDefinition<O>, O extends {}> extends GroupRule<T,O> implements ISupportsRule<T>
{
	public constructor( query?: SupportsQuery, definitionClass?: IGroupRuleDefinitionClass<T,O>)
	{
		super( RuleType.SUPPORTS, definitionClass);

		// convert the query to its string form
		this.queryString = supportsQueryToCssString( query);
	}



	// Creates a copy of the rule.
	public clone(): SupportsRule<T,O>
	{
		return new SupportsRule<T,O>( this.queryString, this.definitionClass);
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



