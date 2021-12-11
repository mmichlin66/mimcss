import {IStyleDefinitionClass, IStyleDefinition, IGroupRule, IMediaRule, ISupportsRule} from "../api/RuleTypes"
import {MediaStatement, SupportsStatement} from "../api/MediaTypes";
import {processSD} from "./RuleContainer"
import {IRuleContainer, Rule, IMimcssGroupingRule, IMimcssStyleElement, symRC} from "./Rule"
import {media2s, supports2s} from "../impl/MiscImpl";



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends IStyleDefinition> extends Rule implements IGroupRule<T>
{
	public constructor( rn: string, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super();
        this.rn = rn;
		this.instOrClass = instOrClass;
	}



	// Processes the given rule.
	public process( container: IRuleContainer, ruleName: string | null)
	{
		super.process( container, ruleName);

        // container to which our groupng rule belongs becomes the parent container for the
        // style definition instance
		this.sd = processSD( this.instOrClass, container.getDef()) as T;
		this.rc = this.sd[symRC];
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: IMimcssStyleElement | IMimcssGroupingRule): void
	{
		let mimcssRule = parent.addGroupingRule( `@${this.rn} ${this.condition}`);
        if (mimcssRule)
        {
            this.cssRule = mimcssRule?.cssRule as CSSGroupingRule;

            // insert sub-rules
			this.rc.insert( mimcssRule);
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
		this.rc.clear();
	}



	// Instance of the style definition class defining the rules under this grouping rule
	public sd: T;

	/** SOM supports rule */
	public cssRule: CSSGroupingRule | null;

	// Name of the at-rule (e.g. "supports").
	private rn: string;

	// Style definition class that defines rules under this grouping rule.
	private instOrClass: T | IStyleDefinitionClass<T>;

	// Rule container for the definition instance - this container contains sub-rules.
	private rc: IRuleContainer;

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
		super( "supports", instOrClass);
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
		super( "media", instOrClass);
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



    /** SOM media rule */
	public cssRule: CSSMediaRule | null;

	// media statement for this rule.
	private stmt: MediaStatement;
}



