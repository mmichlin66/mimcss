import {IStyleDefinitionClass, StyleDefinition} from "./RuleTypes"
import {RuleContainer, processStyleDefinitionClass, getContainerFromDefinition} from "./RuleContainer"
import {ITopLevelRuleContainer, Rule} from "./Rule"



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T extends StyleDefinition> extends Rule
{
	public constructor( definitionClass: IStyleDefinitionClass<T>)
	{
		super();
		this.definitionClass = definitionClass;
	}



	// Processes the given rule.
	public process( owner: ITopLevelRuleContainer, ruleName: string)
	{
		super.process( owner, ruleName);

		this.definition = processStyleDefinitionClass( this.definitionClass, owner.getDefinitionInstance());
		this.ruleContainer = getContainerFromDefinition( this.definition);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
		this.cssRule = this.insertGroupingRule( parent);

		// insert sub-rules
		if (this.cssRule)
			this.ruleContainer.insertRules( this.cssRule as CSSGroupingRule);
	}



	// Inserts this rule into the given parent rule or stylesheet.
	protected abstract insertGroupingRule( parent: CSSStyleSheet | CSSGroupingRule): CSSRule;



	// Clers the CSS rule object.
	public clear(): void
	{
		super.clear();

		// clear sub-rules
		this.ruleContainer.clearRules();
	}



	// Style definition class that defines rules under this grouping rule.
	protected definitionClass: IStyleDefinitionClass;

	// Style definition instance.
	protected definition: StyleDefinition;

	// Rule container for the definition instance.
	protected ruleContainer: RuleContainer;
}



