import {IMediaRule, IRuleDefinitionClass} from "../api/rules"
import {GroupRule} from "./GroupRule"
import {MediaQuery} from "../styles/MediaTypes"
import {mediaQueryToCssString} from "../styles/MediaFuncs";



/**
 * The MediaRule type describes a CSS @media rule.
 */
export class MediaRule<T = any> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( query?: string | MediaQuery, definitionClass?: IRuleDefinitionClass<T>)
	{
		super( definitionClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): MediaRule<T>
	{
		let newRule = new MediaRule<T>();
		newRule.query = this.query;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let queryString = typeof this.query === "string" ? this.query : mediaQueryToCssString( this.query);

		let index = parent.insertRule( `@media ${queryString} {}`, parent.cssRules.length);
		this.cssRule = parent.cssRules[index];

		// insert sub-rules
		this.insertRules();
	}



	/** Only needed to distinguish from other rules */
	public get isMediaRule(): boolean { return true; }

	// media query for this rule.
	public query: string | MediaQuery;
}



