import {PagePseudoClass} from "../api/CoreTypes";
import {IFontFaceRule, IImportRule, IPageRule, INamespaceRule, IClassNameRule, IClassRule, IStyleDefinition} from "../api/RuleTypes";
import {Styleset} from "../api/Stylesets";
import {ExtendedFontFace} from "../api/FontTypes"
import {MediaStatement, SupportsStatement} from "../api/MediaTypes";
import {fontFace2s} from "../impl/MiscImpl"
import {Rule, RuleLike, IMimcssStyleElement, IMimcssGroupingRule} from "./Rule";
import {media2s, supports2s} from "../impl/MiscImpl";
import {StyleRule} from "./StyleRules";
import {symV2S} from "../impl/Utils";



/**
 * The MiscRule class serves as a base class for simple rules.
 */
abstract class MiscRule<T extends CSSRule> extends Rule
{
	public constructor( sd: IStyleDefinition)
	{
		super(sd);
	}

	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: IMimcssStyleElement | IMimcssGroupingRule): void
	{
		this.cssRule = parent.addRule( this.toCss())?.cssRule as T;
	}

	// Returns CSS string for this rule.
    protected abstract toCss(): string;

	/** SOM font-face rule */
	public cssRule: T;
}



/**
 * The ImportRule class describes a CSS @import rule.
 */
export class ImportRule extends MiscRule<CSSImportRule> implements IImportRule
{
	public constructor( sd: IStyleDefinition, url: string, mediaStatement?: MediaStatement,
        supportsStatement?: string | SupportsStatement)
	{
		super(sd);

		this.url = url;
		this.mediaStatement = mediaStatement;
		this.supportsStatement = supportsStatement;
	}

	// Returns CSS string for this rule.
    protected toCss(): string
    {
		let url: string;
		if (this.url.startsWith("url") || this.url.startsWith("\"") || this.url.startsWith("'"))
			url = this.url;
		else
			url = `url(${this.url})`;

		let supportsQueryString = !this.supportsStatement ? "" : supports2s( this.supportsStatement);
		if (supportsQueryString && !supportsQueryString.startsWith( "supports"))
		    supportsQueryString = `supports( ${supportsQueryString} )`;

		let mediaQueryString = !this.mediaStatement ? "" : media2s( this.mediaStatement);
		return `@import ${url} ${supportsQueryString} ${mediaQueryString}`;
    }

	// URL to import from.
	public url: string;

	// Optional media query for this rule.
	public mediaStatement?: MediaStatement;

	// Optional supports query for this rule.
	public supportsStatement?: string | SupportsStatement;
}



/**
 * The NamespaceRule class describes a CSS @namespace rule.
 */
export class NamespaceRule extends MiscRule<CSSNamespaceRule> implements INamespaceRule
{
	public constructor( sd: IStyleDefinition, namespace: string, prefix?: string)
	{
		super(sd);

		this.namespace = namespace;
		this.prefix = prefix;
	}

	// Returns CSS string for this rule.
    protected toCss(): string
    {
		let url = this.namespace.startsWith( "url(") ? this.namespace : `url(${this.namespace})`;
		return `@namespace ${this.prefix ? this.prefix : ""} ${url}`;
    }

	/** Namespace string for the rule */
	public namespace: string;

	/** Optional prefix for the rule */
	public prefix: string | undefined;

}



/**
 * The FontFaceRule class describes a @font-face CSS rule.
 */
export class FontFaceRule extends MiscRule<CSSFontFaceRule> implements IFontFaceRule
{
	public constructor( sd: IStyleDefinition, fontface: ExtendedFontFace)
	{
		super(sd);

		this.fontface = fontface;
	}

	// Returns CSS string for this rule.
    protected toCss(): string
    {
		return `@font-face {${fontFace2s( this.fontface)}}`;
    }

	// Object defining font-face properties.
	public fontface: ExtendedFontFace;
}



/**
 * The PageRule class represents the CSS @page rule.
 */
export class PageRule extends StyleRule implements IPageRule
{
	public constructor( sd: IStyleDefinition, pseudoClass?: PagePseudoClass, style?: Styleset)
	{
		super( sd, style);
		this.pseudoClass = pseudoClass;
	}

	// Returns the selector part of the style rule.
	public getSel(): string
	{
		return `@page ${this.pseudoClass ? this.pseudoClass : ""}`;
	}

	/** SOM page rule */
	public cssRule: CSSPageRule;

	/** Optional name of the page pseudo style (e.g. "":first") */
	public pseudoClass?: PagePseudoClass;
}



/**
 * The PageRule class represents the CSS @page rule.
 */
export class ClassNameRule extends RuleLike implements IClassNameRule
{
	public constructor( sd: IStyleDefinition, classes: (IClassRule | IClassNameRule | string)[])
	{
		super(sd);
		this.classes = classes;
	}

    // This function is used when the object is specified as a value of a style property.
    // We return the CSS class name.
    [symV2S](): string { return this.cssClassName; }

	/** CSS rule selector string */
	public get selectorText(): string
	{
		return this.cssClassName;
	}

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        super.process( ruleName);

        this.name = this.classes.map( cls => typeof cls === "string" ? cls : cls.name).join(" ");
        this.cssClassName = "." + this.classes.map( cls => typeof cls === "string" ? cls : cls.name).join(".");
    }

    // Implementation of the toString method returns the combined name of the classes (without
    // the CSS prefixes).
	public toString(): string
	{
		return this.name;
	}

    /** All class names concatenated with space */
    public name: string;

    /** All class CSS names (with dots) concatenated together */
    public cssClassName: string;

    private classes: (IClassRule | IClassNameRule | string)[];
}



