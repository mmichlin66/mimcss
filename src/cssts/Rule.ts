import * as cssts from "./cssts"



/**
 * The RuleWithStyle class is used as a base class for rules that have a single style rule.
 */
export abstract class Rule implements cssts.IRule
{
	public constructor( owner: cssts.StyleSheetDefinition)
	{
		this.owner = owner;
	}

	// Style sheet definition to which this rule belongs.
	public owner: cssts.StyleSheetDefinition;

	// Processes the given rule.
	public abstract process( styleSheetName: string, ruleName: string);
}



