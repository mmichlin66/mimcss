import {
    IFontFaceRule, IImportRule, INamespaceRule, IClassNameRule, IClassRule, IStyleDefinition,
    IColorProfileRule, IPageNameRule, ILayerNameRule, ILayerBlockRule, ILayerOrderRule, LayerMoniker,
    ImportRuleOptions, IScrollTimelineRule
} from "../api/RuleTypes";
import {ExtendedFontFace} from "../api/FontTypes"
import {ColorProfileRenderingIntent} from "../api/ColorTypes";
import {fontFace2s, scrollTimeline2s} from "../impl/MiscImpl"
import {Rule, IMimcssRuleBag, NamedRuleLike} from "./Rule";
import {media2s, supports2s} from "../impl/MiscImpl";
import {a2s, symV2S, v2s} from "../impl/Utils";
import { ExtendedScrollTimeline } from "../api/ScrollTimelineTypes";



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
	public insert( ruleBag: IMimcssRuleBag): void
	{
		this.cssRule = ruleBag.add( this.toCss())?.cssRule as T;
	}

	// Returns CSS string for this rule.
    protected abstract toCss(): string;

	/** SOM font-face rule */
	declare public cssRule: T;
}



/**
 * The ImportRule class describes a CSS @import rule.
 */
export class ImportRule extends MiscRule<CSSImportRule> implements IImportRule
{
	public constructor( sd: IStyleDefinition, url: string, options?: ImportRuleOptions)
	{
		super(sd);

		this.url = url;
		this.options = options;
	}

	// Returns CSS string for this rule.
    protected toCss(): string
    {
		let url: string;
		if (this.url.startsWith("url") || this.url.startsWith("\"") || this.url.startsWith("'"))
			url = this.url;
		else
			url = `url(${this.url})`;

		let layerString = this.options?.layer;
		if (layerString == null)
            layerString = "";
        else
        {
            layerString = v2s( layerString);
            if (layerString === "")
                layerString = `layer`;
            else
                layerString = `layer(${layerString})`;
        }

		let supportsString = supports2s( this.options?.supports);
		if (supportsString)
		    supportsString = `supports(${supportsString})`;

		return `@import ${url} ${layerString} ${supportsString} ${media2s( this.options?.media)};`;
    }

	// URL to import from.
	public url: string;

	// Optional media query for this rule.
	private options?: ImportRuleOptions;
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
		return `@namespace ${this.prefix ?? ""} ${url}`;
    }

	/** Namespace string for the rule */
	public namespace: string;

	/** Optional prefix for the rule */
	public prefix?: string;

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
export class ClassNameRule extends NamedRuleLike implements IClassNameRule
{
	public constructor( sd: IStyleDefinition, classes: (IClassRule | IClassNameRule | string)[])
	{
		super(sd);
		this.classes = classes;
	}

	// Prefix for CSS classes.
	public get prefix(): "." { return "."; }

    // This function is used when the object is specified as a value of a style property.
    // We return the CSS class name.
    [symV2S](): string { return this.cssName; }

	/** CSS rule selector string */
	public get selectorText(): string
	{
		return this.cssName;
	}

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        this.name = this.classes.map( v => typeof v === "string" ? v : v.name).join(" ");
        this.cssName = "." + this.name.replace( / /g, ".");
    }

    /** All class CSS names (with dots) concatenated together */
    public cssName: string;

    private classes: (IClassRule | IClassNameRule | string)[];
}



/**
 * The ColorProfileRule class represents the CSS @color-profile rule.
 */
export class ColorProfileRule extends MiscRule<CSSRule> implements IColorProfileRule
{
	public constructor( sd: IStyleDefinition, url: string, intent?: ColorProfileRenderingIntent,
        nameOverride?: IColorProfileRule | string)
	{
		super(sd);
		this.url = url;
        this.intent = intent;
        this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        this.name = "--" + this.rc.getScopedName( ruleName, this.nameOverride);
    }

	// Inserts this rule into the given parent rule or stylesheet.
	public toCss(): string
	{
		return `@color-profile ${this.name} {src:url('${this.url}');` +
            (this.intent ? `rendering-intent:${this.intent};}` : "}");
	}

    // Implementation of the toString method returns the profile name.
	public toString(): string { return this.name; }

    /** Name of the color profile rule that can be used in the [[color]] function. */
    public get profileName(): string { return this.name; }

    /** Profile name */
    public name: string;

    private url: string;
    private intent?: ColorProfileRenderingIntent;
    private nameOverride?: IColorProfileRule | string;
}



/**
 * The FontFaceRule class describes a @font-face CSS rule.
 */
export class ScrollTimelineRule extends MiscRule<CSSRule/*CSSScrollTimelineRule*/> implements IScrollTimelineRule
{
	public constructor( sd: IStyleDefinition, timeline: ExtendedScrollTimeline, nameOverride?: IScrollTimelineRule | string)
	{
		super(sd);

		this.timeline = timeline;
        this.nameOverride = nameOverride;
	}

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
        this.name = this.rc.getScopedName( ruleName, this.nameOverride);
    }

    // Implementation of the toString method returns the profile name.
	public toString(): string { return this.name; }

	// Returns CSS string for this rule.
    protected toCss(): string
    {
		return `@scroll-timeline {${scrollTimeline2s( this.timeline)}}`;
    }

    /** Name of the scroll timeline rule that can be used in the [[animationTimeline]] style property. */
    public get timelineName(): string { return this.name; }

    /** Scroll timeline name */
    public name: string;

	/** Object defining scroll timeline properties. */
	private timeline: ExtendedScrollTimeline;

    /** String or another IScrollTimelineRule object overriding Mimcss name assignment mechanism */
    private nameOverride?: IScrollTimelineRule | string;
}



/**
 * The PageNameRule class describes a named page definition. No CSS rule is created for these
 * rules - they are needed only to provide type-safe name definitions.
 */
export class PageNameRule extends NamedRuleLike implements IPageNameRule
{
    public constructor( sd: IStyleDefinition, nameOverride?: string | IPageNameRule)
	{
        super( sd, nameOverride);
	}

    /** Name of the page. */
    public get pageName(): string { return this.name; }
}



/**
 * The LayerNameRule class describes a named layer definition.
 */
export class LayerNameRule extends MiscRule<CSSRule/*CSSLayerStatementRule*/> implements ILayerNameRule
{
	public constructor( sd: IStyleDefinition, nameOverride?: LayerMoniker)
	{
        super(sd);
		this.nameOverride = nameOverride;
	}


    // This function is used when the object is specified as a value of a style property.
    // We return the counter name.
    public toString(): string { return this.name; }

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
		this.name = this.rc.getScopedName( ruleName, this.nameOverride);
	}

	// Inserts this rule into the given parent rule or stylesheet.
	protected toCss(): string
	{
		return `@layer ${this.name};`;
	}

    /** Name of the page. */
    public get layerName(): string { return this.name; }



    /**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	protected nameOverride?: string | ILayerNameRule | ILayerBlockRule;
}



/**
 * The LayerNameRule class describes a named layer definition.
 */
export class LayerOrderRule extends MiscRule<CSSRule/*CSSLayerStatementRule*/> implements ILayerOrderRule
{
	public constructor( sd: IStyleDefinition, ...names: LayerMoniker[])
	{
        super(sd);
		this.names = names;
	}


	// Inserts this rule into the given parent rule or stylesheet.
	protected toCss(): string
	{
		return `@layer ${a2s(this.names, undefined, ",")};`;
	}



	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	protected names: LayerMoniker[];
}



