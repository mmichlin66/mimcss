import {IFontFaceRule, IImportRule, IPageRule, INamespaceRule} from "./RuleTypes";
import {Fontface} from "../styles/FontFaceTypes"
import {fontFaceToString} from "../styles/FontFaceFuncs"
import {Rule} from "./Rule";
import {MediaQuery} from "../styles/MediaTypes";
import {SupportsQuery, Styleset} from "../styles/StyleTypes";
import {supportsQueryToString} from "../styles/StyleFuncs";
import {mediaQueryToString} from "../styles/MediaFuncs";
import {StyleRule} from "./StyleRules";
import {PagePseudoClass} from "../styles/SelectorTypes";



/**
 * The FontFaceRule class describes a @font-face CSS rule.
 */
export class FontFaceRule extends Rule implements IFontFaceRule
{
	public constructor( fontface: Fontface)
	{
		super();

		this.fontface = fontface;
	}

	// Creates a copy of the rule.
	public clone(): FontFaceRule
	{
		return new FontFaceRule( this.fontface);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = Rule.addRuleToDOM( `@font-face ${fontFaceToString( this.fontface)}`,
			parent) as CSSFontFaceRule;
	}



	/** SOM font-face rule */
	public cssRule: CSSFontFaceRule;

	// Object defining font-face properties.
	public fontface: Fontface;
}



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



/**
 * The PageRule class represents the CSS @page rule.
 */
export class PageRule extends StyleRule implements IPageRule
{
	public constructor( style?: Styleset, pseudoClass?: PagePseudoClass)
	{
		super( style);
		this.pseudoClass = pseudoClass;
	}



	// Creates a copy of the rule.
	public clone(): PageRule
	{
		let newRule = new PageRule( undefined, this.pseudoClass);
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return `@page ${this.pseudoClass ? this.pseudoClass : ""}`;
	}



	/** SOM page rule */
	public cssRule: CSSPageRule;

	/** Optional name of the page pseudo style (e.g. "":first") */
	public pseudoClass: PagePseudoClass | undefined;
}



/**
 * The NamespaceRule class describes a CSS @namespace rule.
 */
export class NamespaceRule extends Rule implements INamespaceRule
{
	public constructor( namespace: string, prefix?: string)
	{
		super();

		this.namespace = namespace;
		this.prefix = prefix;
	}



	// Creates a copy of the rule.
	public clone(): NamespaceRule
	{
		return new NamespaceRule( this.namespace, this.prefix);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (!this.namespace)
			return;

		let url = this.namespace.startsWith( "url(") ? this.namespace : `url(${this.namespace})`;
		this.cssRule = Rule.addRuleToDOM( `@namespace ${this.prefix ? this.prefix : ""} ${url}`,
			parent) as CSSNamespaceRule;
	}



	/** SOM namespace rule */
	public cssRule: CSSNamespaceRule;

	/** Namespace string for the rule */
	public namespace: string;

	/** Optional prefix for the rule */
	public prefix: string | undefined;

}



