import {IIDRule, IStyleScope, ExtendedStyleset, generateName} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule";



/**
 * The IDRule type describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements IIDRule
{
	public constructor( owner: IStyleScope, styleset: ExtendedStyleset)
	{
		super( owner, styleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		this.idName = generateName( styleSheetName, ruleName);

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `#${this.idName} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isIDRule: boolean = true;

	// Name of the element identifier for applying the styleset.
	public idName: string;
}



