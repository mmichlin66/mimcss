import {IClassRule, StyleSheetDefinition, ExtendedRuleset, generateName, rulesetToCssString} from "./cssts"
import {StyleRule} from "./StyleRule";



/**
 * The ClassRule type describes a ruleset that applies to elements identified by a class.
 */
export class ClassRule extends StyleRule implements IClassRule
{
	public constructor( owner: StyleSheetDefinition, ruleset: ExtendedRuleset)
	{
		super( owner, ruleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		this.properName = generateName( styleSheetName, ruleName);
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



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `.${this.properName} ${rulesetToCssString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
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
export function defineClassRule( ssDef: StyleSheetDefinition, ruleset: ExtendedRuleset): IClassRule
{
	return new ClassRule( ssDef, ruleset);
}



