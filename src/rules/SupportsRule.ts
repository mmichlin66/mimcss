import {ISupportsRule, IStyleDefinitionClass, StyleDefinition} from "./RuleTypes"
import {GroupRule} from "./GroupRule"
import {Rule} from "./Rule"
import {SupportsQuery} from "../styles/StyleTypes"
import {supportsQueryToCssString} from "../styles/StyleFuncs"



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends StyleDefinition<O>, O extends StyleDefinition> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( query: SupportsQuery, definitionClass: IStyleDefinitionClass<T,O>)
	{
		super( definitionClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): SupportsRule<T,O>
	{
		return new SupportsRule<T,O>( this.query, this.definitionClass);
	}



	// Returns the selector string of this grouping rule.
	protected getGroupSelectorText(): string
	{
		// convert the query to its string form
		let queryString = supportsQueryToCssString( this.query);

		// determine whether the query is supported and if it is not, don't insert the rule
		return CSS.supports( queryString) ? `@supports ${queryString}` : null;
	}



	/** SOM supports rule */
	public cssRule: CSSSupportsRule;

	// support query for this rule in a string form.
	public query: SupportsQuery;
}



