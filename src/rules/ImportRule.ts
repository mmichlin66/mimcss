import {IImportRule, RuleType} from "./RuleTypes"
import {Rule} from "./Rule"
import {MediaQuery} from "../styles/MediaTypes"
import {mediaQueryToCssString} from "../styles/MediaFuncs";
import {TssManager} from "../scope/TssManager"



/**
 * The ImportRule type describes a CSS @import rule.
 */
export class ImportRule extends Rule implements IImportRule
{
	public constructor( url?: string, query?: string | MediaQuery)
	{
		super( RuleType.IMPORT);

		this.url = url;
		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): ImportRule
	{
		let newRule = new ImportRule();
		newRule.url = this.url;
		newRule.query = this.query;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let url;
		if (!this.url)
			return;
		else if (this.url.startsWith("url") || this.url.startsWith("\"") || this.url.startsWith("'"))
			url = this.url;
		else
			url = `url(${this.url})`;

		let queryString = !this.query ? "" : typeof this.query === "string" ? this.query : mediaQueryToCssString( this.query);
		this.cssRule = TssManager.addImportRule( `@import ${url} ${queryString}`);
	}



	/** SOM media rule */
	public get cssImportRule(): CSSImportRule { return this.cssRule as CSSImportRule; }

	// URL to import from.
	public url: string;

	// Optional media query for this rule.
	public query?: string | MediaQuery;
}



