import {IMediaRule, RuleType, INestedGroupClass, NestedGroup} from "./RuleTypes"
import {Rule} from "./Rule"
import {GroupRule} from "./GroupRule"
import {MediaQuery} from "../styles/MediaTypes"
import {mediaQueryToCssString} from "../styles/MediaFuncs";



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends NestedGroup<O>, O extends {}> extends GroupRule<T,O> implements IMediaRule<T>
{
	public constructor( query?: string | MediaQuery, definitionClass?: INestedGroupClass<T,O>)
	{
		super( RuleType.MEDIA, definitionClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): MediaRule<T,O>
	{
		return new MediaRule<T,O>( this.query, this.definitionClass);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insertGroupingRule( parent: CSSStyleSheet | CSSGroupingRule): CSSRule
	{
		let queryString = typeof this.query === "string" ? this.query : mediaQueryToCssString( this.query);
		return Rule.addRuleToDOM( `@media ${queryString} {}`, parent);
	}



	/** SOM media rule */
	public get cssMediaRule(): CSSMediaRule { return this.cssRule as CSSMediaRule; }

	// media query for this rule.
	public query: string | MediaQuery;
}



