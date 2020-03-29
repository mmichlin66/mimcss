import {IImportRule, RuleType} from "./RuleTypes"
import {Rule} from "./Rule"
import {MediaQuery} from "../styles/MediaTypes"
import {SupportsQuery} from "../styles/StyleTypes"
import {mediaQueryToCssString} from "../styles/MediaFuncs";
import {supportsQueryToCssString} from "../styles/StyleFuncs";



/**
 * The ImportRule type describes a CSS @import rule.
 */
export class ImportRule extends Rule implements IImportRule
{
	public constructor( url?: string, mediaQuery?: string | MediaQuery, supportsQuery?: string | SupportsQuery)
	{
		super( RuleType.IMPORT);

		this.url = url;
		this.mediaQuery = mediaQuery;
		this.supportsQuery = supportsQuery;
	}



	// Creates a copy of the rule.
	public clone(): ImportRule
	{
		let newRule = new ImportRule();
		newRule.url = this.url;
		newRule.mediaQuery = this.mediaQuery;
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

		let supportsQueryString = !this.supportsQuery ? "" : typeof this.supportsQuery === "string" ? this.supportsQuery : supportsQueryToCssString( this.supportsQuery);
		if (supportsQueryString && !supportsQueryString.startsWith( "supports"))
			supportsQueryString = `supports( ${supportsQueryString} )`;

		let mediaQueryString = !this.mediaQuery ? "" : typeof this.mediaQuery === "string" ? this.mediaQuery : mediaQueryToCssString( this.mediaQuery);
		let index = parent.insertRule( `@import ${url} ${supportsQueryString} ${mediaQueryString}`, parent.cssRules.length);
		this.cssRule = parent.cssRules[index] as CSSImportRule;
}



	/** SOM media rule */
	public get cssImportRule(): CSSImportRule { return this.cssRule as CSSImportRule; }

	// URL to import from.
	public url: string;

	// Optional media query for this rule.
	public mediaQuery?: string | MediaQuery;

	// Optional supports query for this rule.
	public supportsQuery: string | SupportsQuery;
}



