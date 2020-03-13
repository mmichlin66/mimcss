import {IRuleDefinitionClass, IGroupRule, RuleType} from "../api/rules"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The GroupRule class represents a parsed form of a StyleSheetDefinition-derived class. This
 * class doesn't have a template parameter, but it conforms to the IStyleSheet<T> interface,
 * which provides names of classes, IDs and keyframes defined in the class T, which must be
 * derived from the StyleSheetDefinition class.
 */
export abstract class GroupRule<T = any> extends RuleContainer<T> implements IGroupRule<T>
{
	public constructor( type: RuleType, definitionClass: IRuleDefinitionClass<T>)
	{
		super( type, definitionClass);
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string)
	{
		super.process( container, owner, ruleName);

		// process sub-rules
		this.processRules();
	}



	/** Only needed to distinguish from other types */
	public get isGroupRule(): boolean { return true; }
}



