import {IRule} from "./cssts"
import {StyleScope} from "./StyleScope"



/**
 * The RuleWithStyle class is used as a base class for rules that have a single style rule.
 */
export abstract class Rule implements IRule
{
	public constructor( owner: StyleScope)
	{
		this.owner = owner;
	}

	/** Only needed to distinguish from other types */
	public readonly isRule: boolean = true;

	// Style sheet definition to which this rule belongs.
	public owner: StyleScope;

	// Processes the rule.
	public abstract process( styleSheetName: string, ruleName: string): void;

	// Converts the rule to CSS string.
	public abstract toCssString(): string;
}



