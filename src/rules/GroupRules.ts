import {IStyleDefinitionClass, StyleDefinition, IGroupRule, IMediaRule, ISupportsRule} from "./RuleTypes"
import {getContainerFromInstance, processInstanceOrClass} from "./RuleContainer"
import {IRuleContainer, ITopLevelRuleContainer, Rule} from "./Rule"
import {supportsQueryToString} from "../styles/StyleFuncs";
import {SupportsQuery} from "../styles/StyleTypes";
import {MediaQuery} from "../styles/MediaTypes";
import {mediaQueryToString} from "../styles/MediaFuncs";



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
	public process( owner: ITopLevelRuleContainer, ruleName: string)
	{
		super.process( owner, ruleName);

		let instance = processInstanceOrClass( this.instanceOrClass, owner.getDefinitionInstance());
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



	// Style definition class that defines rules under this grouping rule.
	protected instanceOrClass: T | IStyleDefinitionClass;

	// Style definition instance.
	protected instance: StyleDefinition;

	// Rule container for the definition instance.
	protected ruleContainer: IRuleContainer;

	// Instance of the style definition class defining the rules under this grouping rule
	public get rules(): T { return this.instance as T; }

	/** SOM supports rule */
	public cssRule: CSSGroupingRule | null;
}



/**
 * The SupportRule class describes a CSS @supports rule.
 */
export class SupportsRule<T extends StyleDefinition<O>, O extends StyleDefinition> extends GroupRule<T> implements ISupportsRule<T>
{
	public constructor( query: SupportsQuery, instanceOrClass: T | IStyleDefinitionClass<T,O>)
	{
		super( instanceOrClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): SupportsRule<T,O>
	{
		return new SupportsRule<T,O>( this.query, this.instanceOrClass);
	}



	// Returns the selector string of this grouping rule.
	protected getGroupSelectorText(): string | null
	{
		// convert the query to its string form
		let queryString = supportsQueryToString( this.query);

		// determine whether the query is supported and if it is not, don't insert the rule
		return CSS.supports( queryString) ? `@supports ${queryString}` : null;
	}



	/** SOM supports rule */
	public cssRule: CSSSupportsRule | null;

	// support query for this rule in a string form.
	public query: SupportsQuery;
}



/**
 * The MediaRule class describes a CSS @media rule.
 */
export class MediaRule<T extends StyleDefinition<O>, O extends StyleDefinition> extends GroupRule<T> implements IMediaRule<T>
{
	public constructor( query: string | MediaQuery, instanceOrClass: T | IStyleDefinitionClass<T,O>)
	{
		super( instanceOrClass);

		this.query = query;
	}



	// Creates a copy of the rule.
	public clone(): MediaRule<T,O>
	{
		return new MediaRule<T,O>( this.query, this.instanceOrClass);
	}



	// Returns the selector string of this grouping rule.
	protected getGroupSelectorText(): string | null
	{
		let queryString = typeof this.query === "string" ? this.query : mediaQueryToString( this.query);
		return `@media ${queryString}`;
	}



	/** SOM media rule */
	public cssRule: CSSMediaRule | null;

	// media query for this rule.
	public query: string | MediaQuery;
}



