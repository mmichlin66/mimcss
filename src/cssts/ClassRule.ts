import * as cssts from "./cssts"
import {StyleRule} from "./StyleRule";



/**
 * The ClassRule type describes a ruleset that applies to elements identified by a class.
 */
export class ClassRule extends StyleRule implements cssts.IClassRule
{
	public constructor( owner: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset)
	{
		super( owner, ruleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
	{
		super.process( styleSheetName, ruleName);

		this.properName = cssts.generateName( styleSheetName, ruleName);
		this.combinedName = this.properName;
		this.combinedSelectorName = "." + this.properName;

		// go through all parents; for those who are classes, add their names to the combined name.
		// For those who are not classes, copy their style properties to our own ruleset.
		for( let parent of this.parents)
		{
			if (parent instanceof ClassRule)
			{
				this.combinedName += " " + parent.combinedName;
				this.combinedSelectorName += parent.combinedSelectorName;
			}
			else
				Object.assign( this.ruleset, parent.ruleset);
		}
	}



	// Creates string representation of the 
	public toString(): string
	{
		return `.${this.properName} ${cssts.rulesetToString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from tag and ID rules */
	public readonly isClassRule: boolean = true;

	// Name of the class under which the ruleset will appear in the style sheet.
	public properName: string;

	// Name that combines the proper name of this class and the proper names of all classes this
	// class inherits from. This name used with the "class" attribute on the elements
	public combinedName: string;

	// Name that combines the proper name of this class and the proper names of all classes this
	// class inherits from. This name is used as a selector for CSS rules
	public combinedSelectorName: string;
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineClassRule( ssDef: cssts.StyleSheetDefinition, ruleset: cssts.ExtendedRuleset): cssts.IClassRule
{
	return new ClassRule( ssDef, ruleset);
}



