import * as cssts from "./cssts"
import {StyleRule} from "./StyleRule";



/**
 * The IDRule type describes a ruleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements cssts.IIDRule
{
	public constructor( owner: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset)
	{
		super( owner, ruleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		super.process( styleSheetName, ruleName);

		this.idName = ruleName;

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own ruleset.
		for( let parent of this.parents)
			Object.assign( this.ruleset, parent.ruleset);
	}



	// Creates string representation of the 
	public toString(): string
	{
		return `#${this.idName} ${cssts.rulesetToString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from tag and class rules */
	public readonly isIDRule: boolean = true;

	// Name of the class under which the ruleset will appear in the style sheet.
	public idName: string;
}



/** Returns new IDRule object as belonging to the given style sheet definition  */
export function defineIDRule( ssDef: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset): cssts.IIDRule
{
	return new IDRule( ssDef, ruleset);
}



