import {IMediaRule, IStyleDefinitionClass, StyleDefinition} from "./RuleTypes"
import {Rule} from "./Rule"
import {GroupRule} from "./GroupRule"
import {MediaQuery} from "../styles/MediaTypes"
import {mediaQueryToString} from "../styles/MediaFuncs";



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends StyleDefinition<O>, O extends StyleDefinition> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( query: string | MediaQuery, instanceOrClass: T | IStyleDefinitionClass<T,O>)
	{
		super( instanceOrClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): MediaRule<T,O>
	{
		return new MediaRule<T,O>( this.query, this.instanceOrClass);
	}



	// Returns the selector string of this grouping rule.
	protected getGroupSelectorText(): string
	{
		let queryString = typeof this.query === "string" ? this.query : mediaQueryToString( this.query);
		return `@media ${queryString}`;
	}



	/** SOM media rule */
	public cssRule: CSSMediaRule;

	// media query for this rule.
	public query: string | MediaQuery;
}



