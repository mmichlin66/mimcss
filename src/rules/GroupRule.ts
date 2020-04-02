import {IRuleDefinitionClass, IGroupRule, RuleType} from "./RuleTypes"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The GroupRule class serves as a base class for all grouping CSS rules.
 */
export abstract class GroupRule<T = any> extends RuleContainer<T> implements IGroupRule<T>
{
	public constructor( type: RuleType, definition: T)
	{
		super( type, definition);
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		// process sub-rules
		this.processRules();
	}



	/** SOM grouping rule */
	public get cssGroupRule(): CSSGroupingRule { return this.cssRule as CSSGroupingRule; }
}



