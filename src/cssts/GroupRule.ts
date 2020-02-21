import {IRule, IStyleScope} from "./cssts"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class GroupRule
{
	public constructor( owner: IStyleScope)
	{
		this. owner = owner;
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
	}



	/** StyleScope object to which this rule belongs */
	private readonly owner: IStyleScope;

	/** Array of nested rules */
	public readonly subRules: IRule[];
}



