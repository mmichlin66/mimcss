import {IImportRule} from "./RuleTypes"
import {Rule} from "./Rule"
import {MediaQuery} from "../styles/MediaTypes"
import {SupportsQuery} from "../styles/StyleTypes"
import {mediaQueryToString} from "../styles/MediaFuncs";
import {supportsQueryToString} from "../styles/StyleFuncs";



/**
 * The ImportRule class describes a CSS @import rule.
 */
export class ImportRule extends Rule implements IImportRule
{
	public constructor( url: string, mediaQuery?: string | MediaQuery, supportsQuery?: string | SupportsQuery)
	{
		super();

		this.url = url;
		this.mediaQuery = mediaQuery;
		this.supportsQuery = supportsQuery;
	}



	// Creates a copy of the rule.
	public clone(): ImportRule
	{
		return new ImportRule( this.url, this.mediaQuery, this.supportsQuery);
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

		let supportsQueryString = !this.supportsQuery
			? ""
			: typeof this.supportsQuery === "string"
				? this.supportsQuery
				: supportsQueryToString( this.supportsQuery);

		if (supportsQueryString && !supportsQueryString.startsWith( "supports"))
		supportsQueryString = `supports( ${supportsQueryString} )`;

		let mediaQueryString = !this.mediaQuery
			? ""
			: typeof this.mediaQuery === "string"
				? this.mediaQuery
				: mediaQueryToString( this.mediaQuery);
				
		this.cssRule = Rule.addRuleToDOM( `@import ${url} ${supportsQueryString} ${mediaQueryString}`,
			parent) as CSSImportRule;
}



	/** SOM import rule */
	public cssRule: CSSImportRule;

	// URL to import from.
	public url: string;

	// Optional media query for this rule.
	public mediaQuery?: string | MediaQuery;

	// Optional supports query for this rule.
	public supportsQuery: string | SupportsQuery;
}



