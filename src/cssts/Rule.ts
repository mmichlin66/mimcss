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



	// Processes the rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		this.ruleName = ruleName;
	}

	// Converts the rule to CSS string.
	public abstract toCssString(): string;



	/** Only needed to distinguish from other types */
	public get isRule(): boolean { return true; }

	// Style scope to which this rule belongs.
	public owner: StyleScope;

	// Name of the property of the style scope definition to which this rule was assigned.
	public ruleName: string;

	// Index of the rule in the DOM style sheet. The DOM style sheet object is held by the
	// owner StyleScope
	public index: number;
}



