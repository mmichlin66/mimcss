import {IRule, StyleSheetDefinition} from "./cssts"



/**
 * The RuleWithStyle class is used as a base class for rules that have a single style rule.
 */
export abstract class Rule implements IRule
{
	public constructor( owner: StyleSheetDefinition)
	{
		this.owner = owner;
	}

	// Style sheet definition to which this rule belongs.
	public owner: StyleSheetDefinition;

	// Processes the rule.
	public abstract process( styleSheetName: string, ruleName: string): void;

	// Converts the rule to CSS string.
	public abstract toCssString(): string;
}



