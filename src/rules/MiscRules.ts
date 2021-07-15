import {PagePseudoClass} from "../api/CoreTypes";
import {IFontFaceRule, IImportRule, IPageRule, INamespaceRule, IClassNameRule, IClassRule} from "../api/RuleTypes";
import {Styleset} from "../api/StyleTypes";
import {ExtendedFontFace} from "../api/FontTypes"
import {MediaStatement, SupportsStatemnet} from "../api/MediaTypes";
import {fontFace2s} from "../impl/MiscImpl"
import {Rule, IRuleSerializationContext, RuleLike, IRuleContainer, ITopLevelRuleContainer} from "./Rule";
import {media2s, supports2s} from "../impl/MiscImpl";
import {StyleRule} from "./StyleRules";
import {symValueToString} from "../impl/Utils";



/**
 * The MiscRule class serves as a base class for simple rules.
 */
abstract class MiscRule<T extends CSSRule> extends Rule
{
	public constructor( isTopLevelRule?: boolean)
	{
		super();
		this.isTopLevelRule = isTopLevelRule;
	}

	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = Rule.addRuleToDOM( this.getRuleText(), parent) as T;
	}

	// Serializes this rule to a string.
    public serialize( ctx: IRuleSerializationContext): void
    {
		ctx.addRuleText( this.getRuleText(), this.isTopLevelRule);
    }

	// Returns CSS string for this rule.
    protected abstract getRuleText(): string;

	/** SOM font-face rule */
	public cssRule: T;

    // Flag indicating whether this rule can only be at the top-level of stylesheets (e.g. @import
    // and @namespace).
    private isTopLevelRule?: boolean;
}



/**
 * The ImportRule class describes a CSS @import rule.
 */
export class ImportRule extends MiscRule<CSSImportRule> implements IImportRule
{
	public constructor( url: string, mediaStatement?: MediaStatement, supportsStatement?: string | SupportsStatemnet)
	{
        // this is a top-level rule
		super( true);

		this.url = url;
		this.mediaStatement = mediaStatement;
		this.supportsStatement = supportsStatement;
	}

	// Creates a copy of the rule.
	public clone(): ImportRule
	{
		return new ImportRule( this.url, this.mediaStatement, this.supportsStatement);
	}

	// Returns CSS string for this rule.
    protected getRuleText(): string
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
	public supportsStatement?: string | SupportsStatemnet;
}



/**
 * The NamespaceRule class describes a CSS @namespace rule.
 */
export class NamespaceRule extends MiscRule<CSSNamespaceRule> implements INamespaceRule
{
	public constructor( namespace: string, prefix?: string)
	{
        // this is a top-level rule
		super( true);

		this.namespace = namespace;
		this.prefix = prefix;
	}

	// Creates a copy of the rule.
	public clone(): NamespaceRule
	{
		return new NamespaceRule( this.namespace, this.prefix);
	}

	// Returns CSS string for this rule.
    protected getRuleText(): string
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
	public constructor( fontface: ExtendedFontFace)
	{
		super();

		this.fontface = fontface;
	}

	// Creates a copy of the rule.
	public clone(): FontFaceRule
	{
		return new FontFaceRule( this.fontface);
	}

	// Returns CSS string for this rule.
    protected getRuleText(): string
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
	public constructor( pseudoClass?: PagePseudoClass, style?: Styleset)
	{
		super( style);
		this.pseudoClass = pseudoClass;
	}

	// Creates a copy of the rule.
	public cloneObject(): PageRule
	{
		return new PageRule( this.pseudoClass);
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
 * The PageRule class represents the CSS @page rule.
 */
export class ClassNameRule extends RuleLike implements IClassNameRule
{
	public constructor( classes: (IClassRule | IClassNameRule | string)[])
	{
		super();
		this.classes = classes;
	}

    // This function is used when the object is specified as a value of a style property.
    // We return the CSS class name.
    [symValueToString](): string { return this.cssClassName; }

	/** CSS rule selector string */
	public get selectorText(): string
	{
		return this.cssClassName;
	}

	// Creates a copy of the rule.
	public clone(): ClassNameRule
	{
		return new ClassNameRule( this.classes);
	}

	// Processes the given rule.
	public process( container: IRuleContainer, ownerContainer: ITopLevelRuleContainer, ruleName: string | null): void
	{
        super.process( container, ownerContainer, ruleName);

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



