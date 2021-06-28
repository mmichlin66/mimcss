import {IStyleDefinitionClass, StyleDefinition, IGroupRule, IMediaRule, ISupportsRule} from "../api/RuleTypes"
import {MediaQuery, SupportsQuery} from "../api/MediaTypes";
import {getContainerFromInstance, processInstanceOrClass} from "./RuleContainer"
import {IRuleContainer, ITopLevelRuleContainer, Rule, IRuleSerializationContext} from "./Rule"
import {s_mediaQueryToString, supportsQueryToString} from "../impl/MediaFuncs";



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends StyleDefinition> extends Rule implements IGroupRule<T>
{
	public constructor( instanceOrClass: T | IStyleDefinitionClass<T>)
	{
		super();
		this.instanceOrClass = instanceOrClass;
	}



	// Processes the given rule.
	public process( container: IRuleContainer, ownerContainer: ITopLevelRuleContainer, ruleName: string)
	{
		super.process( container, ownerContainer, ruleName);

        // container to which our groupng rule belongs becomes the parent container for the
        // style definition instance
		let instance = processInstanceOrClass( this.instanceOrClass, container.getDefinitionInstance());
		if (!instance)
			return;

		this.instance = instance;
		this.ruleContainer = getContainerFromInstance( instance);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (!this.ruleContainer)
			return;

		let selector = this.getGroupSelectorText();
		if (!selector)
			return;

		this.cssRule = Rule.addRuleToDOM( `${selector} {}`, parent) as CSSGroupingRule;

		// insert sub-rules
		if (this.cssRule)
			this.ruleContainer.insertRules( this.cssRule);
	}



	// Serializes this rule to a string.
    public serialize( ctx: IRuleSerializationContext): void
    {
		if (!this.ruleContainer)
			return;

		let selector = this.getGroupSelectorText();
		if (!selector)
			return;

		ctx.addRuleText( `${selector} {`);

		// insert sub-rules
		this.ruleContainer.serializeRules( ctx);

		ctx.addRuleText( "}");
    }



	// Returns the selector string of this grouping rule.
	protected abstract getGroupSelectorText(): string | null;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		if (this.ruleContainer)
			this.ruleContainer.clearRules();
	}



	// Instance of the style definition class defining the rules under this grouping rule
	public get rules(): T { return this.instance as T; }

	/** SOM supports rule */
	public cssRule: CSSGroupingRule | null;

	// Style definition class that defines rules under this grouping rule.
	protected instanceOrClass: T | IStyleDefinitionClass;

	// Style definition instance.
	protected instance: StyleDefinition;

	// Rule container for the definition instance.
	protected ruleContainer: IRuleContainer;
}



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends StyleDefinition> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( query: SupportsQuery, instanceOrClass: T | IStyleDefinitionClass<T>)
	{
		super( instanceOrClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): SupportsRule<T>
	{
		return new SupportsRule<T>( this.query, this.instanceOrClass);
	}



	// Returns the selector string of this grouping rule.
	protected getGroupSelectorText(): string | null
	{
		// convert the query to its string form
		let queryString = supportsQueryToString( this.query);

		// determine whether the query is supported and if it is not, don't insert the rule
		return CSS.supports( queryString) ? `@supports ${queryString}` : null;
	}



	/** Flag indicated whether the browser supports this rule's query */
    public get isSupported(): boolean
    {
        return  CSS.supports( supportsQueryToString( this.query));
    }

	/** SOM supports rule */
	public cssRule: CSSSupportsRule | null;

	// support query for this rule.
	private query: SupportsQuery;
}



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends StyleDefinition> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( query: MediaQuery, instanceOrClass: T | IStyleDefinitionClass<T>)
	{
		super( instanceOrClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): MediaRule<T>
	{
		return new MediaRule<T>( this.query, this.instanceOrClass);
	}



	// Returns the selector string of this grouping rule.
	protected getGroupSelectorText(): string | null
	{
		return `@media ${s_mediaQueryToString( this.query)}`;
	}



	/** SOM media rule */
	public cssRule: CSSMediaRule | null;

	// media query for this rule.
	public query: MediaQuery;
}



