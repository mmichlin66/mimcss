import {IStyleDefinitionClass, IStyleDefinition, IGroupRule, IMediaRule, ISupportsRule} from "../api/RuleTypes"
import {MediaStatement, SupportsStatement} from "../api/MediaTypes";
import {getContainerFromInstance, processSD} from "./RuleContainer"
import {IRuleContainer, ITopLevelRuleContainer, Rule, IRuleSerializationContext} from "./Rule"
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
	public process( container: IRuleContainer, topLevelContainer: ITopLevelRuleContainer, ruleName: string)
	{
		super.process( container, topLevelContainer, ruleName);

        // container to which our groupng rule belongs becomes the parent container for the
        // style definition instance
		let instance = processSD( this.instOrClass, container.getDef());
		this.sd = instance;
		this.ruleContainer = getContainerFromInstance( instance);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		let selector = this.getSelectorText();
		if (!selector)
			return;

		this.cssRule = Rule.toDOM( `${selector} {}`, parent) as CSSGroupingRule;

		// insert sub-rules
		if (this.cssRule)
			this.ruleContainer.insert( this.cssRule);
	}



	// Serializes this rule to a string.
    public serialize( ctx: IRuleSerializationContext): void
    {
		let selector = this.getSelectorText();
		if (!selector)
			return;

		ctx.addRule( `${selector} {`);

		// insert sub-rules
		this.ruleContainer.serialize( ctx);

		ctx.addRule( "}");
    }



	// Condition of this grouping rule.
	public get condition(): string
    {
        if (!this._condition)
            this._condition = this.getConditionText();

        return this._condition ?? "";
    }



	// Returns the condition string of this grouping rule.
	protected abstract getConditionText(): string | null;

	// Returns the selector string of this grouping rule.
	protected abstract getSelectorText(): string | null;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		this.ruleContainer.clear();
	}



	// Instance of the style definition class defining the rules under this grouping rule
	public get definition(): T { return this.sd as T; }

	/** SOM supports rule */
	public cssRule: CSSGroupingRule | null;

	// Style definition class that defines rules under this grouping rule.
	protected instOrClass: T | IStyleDefinitionClass<T>;

	// Style definition instance.
	protected sd: IStyleDefinition;

	// Rule container for the definition instance.
	protected ruleContainer: IRuleContainer;

	// Condition of this grouping rule.
	private _condition: string | null;
}



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends IStyleDefinition> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( statement: SupportsStatement, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super( instOrClass);

		this.statement = statement;
	}



	/** Flag indicated whether the browser supports this rule's query */
    public get isSupported(): boolean
    {
        return CSS.supports( this.condition);
    }



	// Returns the condition string of this grouping rule.
	protected getConditionText(): string | null
    {
        return supports2s( this.statement);
    }

	// Returns the selector string of this grouping rule.
	protected getSelectorText(): string | null
	{
		// determine whether the query is supported and if it is not, don't insert the rule
		return CSS.supports( this.condition) ? `@supports ${this.condition}` : null;
	}



    /** SOM supports rule */
	public cssRule: CSSSupportsRule | null;

	// support statement for this rule.
	private statement: SupportsStatement;
}



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends IStyleDefinition> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( statement: MediaStatement, instOrClass: T | IStyleDefinitionClass<T>)
	{
		super( instOrClass);

		this.statement = statement;
	}



	// Returns the condition string of this grouping rule.
	protected getConditionText(): string | null
    {
        return media2s( this.statement);
    }

	// Returns the selector string of this grouping rule.
	protected getSelectorText(): string | null
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
	private statement: MediaStatement;

    // cached MediaQueryList object created for the media statement
    private _mql: MediaQueryList | null = null;
}



