import {IMediaRule, IRuleDefinitionClass} from "../api/rules"
import {GroupRule} from "./GroupRule"



/**
 * The MediaRule type describes a CSS @media rule.
 */
export class MediaRule<T = any> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( query?: string, definitionClass?: IRuleDefinitionClass<T>)
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
		let index = parent.insertRule( `@media ${this.query} {}`, parent.cssRules.length);
		this.cssRule = parent.cssRules[index];

		// insert sub-rules
		this.insertRules();
	}



	/** Only needed to distinguish from other rules */
	public get isMediaRule(): boolean { return true; }

	// media query for this rule.
	public query: string;
}



