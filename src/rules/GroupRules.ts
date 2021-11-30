import {IStyleDefinitionClass, IStyleDefinition, IGroupRule, IMediaRule, ISupportsRule} from "../api/RuleTypes"
import {MediaStatement, SupportsStatement} from "../api/MediaTypes";
import {getRCfromSD, processSD} from "./RuleContainer"
import {IRuleContainer, Rule, IRuleSerializationContext} from "./Rule"
import {media2s, supports2s} from "../impl/MiscImpl";



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends IStyleDefinition> extends Rule implements IGroupRule<T>
{
	public constructor( instOrClass: T | IStyleDefinitionClass<T>)
	{
		super();
		this.instOrClass = instOrClass;
	}



	// Processes the given rule.
	public process( container: IRuleContainer, ruleName: string | null)
	{
		super.process( container, ruleName);

        // container to which our groupng rule belongs becomes the parent container for the
        // style definition instance
		this.sc = getRCfromSD( this._sd = processSD( this.instOrClass, container.getDef()));
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let selector = this.getSel();
		if (!selector)
			return;

		this.cssRule = Rule.toDOM( `${selector} {}`, parent) as CSSGroupingRule;

		// insert sub-rules
		if (this.cssRule)
			this.sc.insert( this.cssRule);
	}



	// Serializes this rule to a string.
    public serialize( ctx: IRuleSerializationContext): void
    {
		let selector = this.getSel();
		if (!selector)
			return;

		ctx.addRule( `${selector} {`);

		// insert sub-rules
		this.sc.serialize( ctx);

		ctx.addRule( "}");
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

	// Returns the selector string of this grouping rule.
	protected abstract getSel(): string | null;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		this.sc.clear();
	}



	// Instance of the style definition class defining the rules under this grouping rule
	public get sd(): T { return this._sd as T; }

	/** SOM supports rule */
	public cssRule: CSSGroupingRule | null;

	// Style definition class that defines rules under this grouping rule.
	private instOrClass: T | IStyleDefinitionClass<T>;

	// Style definition instance.
	private _sd: IStyleDefinition;

	// Rule container for the definition instance - this container contains sub-rules.
	private sc: IRuleContainer;

	// Condition of this grouping rule.
	private _cond: string | null;
}



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends IStyleDefinition> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( statement: SupportsStatement, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super( instOrClass);

		this.stmt = statement;
	}



	/** Flag indicated whether the browser supports this rule's query */
    public get isSupported(): boolean
    {
        return CSS.supports( this.condition);
    }



	// Returns the condition string of this grouping rule.
	protected getCond(): string | null
    {
        return supports2s( this.stmt);
    }

	// Returns the selector string of this grouping rule.
	protected getSel(): string | null
	{
		return `@supports ${this.condition}`;
	}



    /** SOM supports rule */
	public cssRule: CSSSupportsRule | null;

	// support statement for this rule.
	private stmt: SupportsStatement;
}



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends IStyleDefinition> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( statement: MediaStatement, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super( instOrClass);

		this.stmt = statement;
	}



	// Returns the condition string of this grouping rule.
	protected getCond(): string | null
    {
        return media2s( this.stmt);
    }

	// Returns the selector string of this grouping rule.
	protected getSel(): string | null
	{
		return `@media ${this.condition}`;
	}



    /**
     * Returns `MediaQueryList` object that allows programmatic checking whether the document matches
     * the media statement and also allows listening to its `change` event.
     */
    public get mql(): MediaQueryList
    {
        if (!this._mql)
            this._mql = window.matchMedia( this.condition);

        return this._mql;
    }



    /** SOM media rule */
	public cssRule: CSSMediaRule | null;

	// media statement for this rule.
	private stmt: MediaStatement;

    // cached MediaQueryList object created for the media statement
    private _mql: MediaQueryList | null = null;
}



