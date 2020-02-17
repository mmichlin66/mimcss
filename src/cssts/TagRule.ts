import * as cssts from "./cssts"
import {StyleRule} from "./StyleRule";



/**
 * The TagRule type describes a ruleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements cssts.ITagRule
{
	public constructor( owner: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset)
	{
		super( owner, ruleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		super.process( styleSheetName, ruleName);

		this.tagName = ruleName;

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own ruleset.
		for( let parent of this.parents)
			Object.assign( this.ruleset, parent.ruleset);
	}



	// Creates string representation of the 
	public toString(): string
	{
		return `${this.tagName} ${cssts.rulesetToString( this.ruleset, this.important)}`;
	}



	// Name of the class under which the ruleset will appear in the style sheet.
	public tagName: string;

	/** Only needed to distinguish from class and ID rules */
	public readonly isTagRule: boolean = true;
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineTagRule( ssDef: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset): cssts.ITagRule
{
	return new TagRule( ssDef, ruleset);
}



