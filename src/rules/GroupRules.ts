import {
    IStyleDefinitionClass, IStyleDefinition, IGroupRule, IMediaRule, ISupportsRule,
    ILayerBlockRule, LayerMoniker
} from "../api/RuleTypes"
import {MediaStatement, SupportsStatement} from "../api/MediaTypes";
import {processSD} from "./RuleContainer"
import {IRuleContainer, Rule, symRC, IMimcssRuleBag} from "./Rule"
import {media2s, supports2s} from "../impl/MiscImpl";



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends IStyleDefinition, R extends CSSGroupingRule = any>
    extends Rule implements IGroupRule<T>
{
	public constructor( sd: IStyleDefinition, rn: string, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super(sd);
        this.rn = rn;
		this.instOrClass = instOrClass;
	}



	// Processes the given rule.
	public process( ruleName: string | null)
	{
        // container to which our grouping rule belongs becomes the parent container for the
        // style definition instance
		this.gsd = processSD( this.instOrClass, this.sd) as T;
		this.grc = this.gsd[symRC];
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( ruleBag: IMimcssRuleBag): void
	{
		let mimcssRule = ruleBag.addGroup( `@${this.rn} ${this.condition}`);
        if (mimcssRule)
        {
            this.cssRule = mimcssRule?.cssRule as R;

            // insert sub-rules
			this.grc.insert( mimcssRule);
        }
	}



	// Condition of this grouping rule.
	public get condition(): string
    {
        if (!this._cond)
            this._cond = this.getCond();

        return this._cond ?? "";
    }



	// Returns the condition string of this grouping rule.
	protected abstract getCond(): string | null;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		this.grc.clear();
	}



	/** Instance of the style definition class defining the rules under this grouping rule */
	public gsd: T;

	/** SOM supports rule */
	public cssRule: R | null;

	/** Name of the at-rule (e.g. "supports"). */
	private rn: string;

	/** Style definition class that defines rules under this grouping rule. */
	private instOrClass: T | IStyleDefinitionClass<T>;

	/**
     * Group Rule Container - this container contains rules for the group definition instance.
     */
	private grc: IRuleContainer;

	/** Condition of this grouping rule. */
	private _cond: string | null;
}



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends IStyleDefinition> extends GroupRule<T,CSSSupportsRule> implements ISupportsRule<T>
{
	public constructor( sd: IStyleDefinition, statement: SupportsStatement, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super( sd, "supports", instOrClass);
		this.stmt = statement;
	}



	/** Flag indicated whether the browser supports this rule's query */
    public get isSupported(): boolean
    {
        return window && CSS.supports( this.condition);
    }



	// Returns the condition string of this grouping rule.
	protected getCond(): string | null
    {
        return supports2s( this.stmt);
    }



	// support statement for this rule.
	private stmt: SupportsStatement;
}



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends IStyleDefinition> extends GroupRule<T,CSSMediaRule> implements IMediaRule<T>
{
	public constructor( sd: IStyleDefinition, statement: MediaStatement, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super( sd, "media", instOrClass);
		this.stmt = statement;
	}



	// Returns the condition string of this grouping rule.
	protected getCond(): string | null
    {
        return media2s( this.stmt);
    }



    /**
     * Returns `MediaQueryList` object that allows programmatic checking whether the document matches
     * the media statement and also allows listening to its `change` event.
     */
    public get queryList(): MediaQueryList | undefined
    {
        return window && matchMedia( this.condition);
    }



	// media statement for this rule.
	private stmt: MediaStatement;
}



/**
 * The LayerRule class describes a layer definition.
 */
export class LayerBlockRule<T extends IStyleDefinition> extends GroupRule<T,CSSGroupingRule>
    implements ILayerBlockRule<T>
{
    public constructor( sd: IStyleDefinition, nameOverride: undefined | LayerMoniker,
        instOrClass: T | IStyleDefinitionClass<T>)
    {
        super( sd, "layer", instOrClass);
        this.nameOverride = nameOverride;
    }

    // This function is used when the object is specified as a value of a style property.
    // We return the counter name.
    public toString(): string { return this.name; }

	// Processes the given rule.
	public process( ruleName: string | null): void
	{
		super.process( ruleName);
        this.name = this.rc.getScopedName( ruleName, this.nameOverride);
	}

	// Returns the condition string of this grouping rule.
	protected getCond(): string | null
    {
        return this.layerName;
    }



    /** Name of the layer. */
    public get layerName(): string { return this.name; }

    /**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/**
	 * Layer name or layer object used to create the name of this layer.
	 */
	private nameOverride: undefined | LayerMoniker;
}



