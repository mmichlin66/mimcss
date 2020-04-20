import {IStyleDefinitionClass, StyleDefinition, IGroupRule} from "./RuleTypes"
import {getContainerFromDefinition, processInstanceOrClass} from "./RuleContainer"
import {IRuleContainer, ITopLevelRuleContainer, Rule} from "./Rule"



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

		this.instance = processInstanceOrClass( this.instanceOrClass, owner.getDefinitionInstance());
		if (!this.instance)
			return;

		this.ruleContainer = getContainerFromDefinition( this.instance);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		if (!this.ruleContainer)
			return;

		let selector = this.getGroupSelectorText();
		if (!selector)
			return;

		this.cssRule = Rule.addRuleToDOM( `${selector} {}`, parent) as CSSSupportsRule;

		// insert sub-rules
		if (this.cssRule)
			this.ruleContainer.insertRules( this.cssRule);
	}



	// Returns the selector string of this grouping rule.
	protected abstract getGroupSelectorText(): string;



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
	public cssRule: CSSGroupingRule;
}



