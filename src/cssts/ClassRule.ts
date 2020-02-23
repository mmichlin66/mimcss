import {IClassRule, ExtendedStyleset} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule";
import {StyleScope} from "./StyleScope"



/**
 * The ClassRule type describes a styleset that applies to elements identified by a class.
 */
export class ClassRule extends StyleRule implements IClassRule
{
	public constructor( owner: StyleScope, styleset: ExtendedStyleset)
	{
		super( owner, styleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		this.properName = this.owner.generateScopedName( ruleName);
		this.combinedName = this.properName;
		this.combinedSelectorName = "." + this.properName;

		// go through all parents; for those who are classes, add their names to the combined name.
		// For those who are not classes, copy their style properties to our own styleset.
		for( let parent of this.parents)
		{
			if (parent instanceof ClassRule)
			{
				this.combinedName += " " + parent.combinedName;
				this.combinedSelectorName += parent.combinedSelectorName;
			}
			else
				Object.assign( this.styleset, parent.styleset);
		}
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `.${this.properName} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isClassRule: boolean = true;

	// Name of the class under which the styleset will appear in the style sheet.
	public properName: string;

	// Name that combines the proper name of this class and the proper names of all classes this
	// class inherits from. This name used with the "class" attribute on the elements.
	public combinedName: string;

	// Name that combines the proper name of this class and the proper names of all classes this
	// class inherits from. This name is used as a selector for CSS rules.
	public combinedSelectorName: string;
}



