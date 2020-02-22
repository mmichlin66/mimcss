import {ITagRule, ExtendedStyleset} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule";
import {StyleScope} from "./StyleScope"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( owner: StyleScope, styleset: ExtendedStyleset)
	{
		super( owner, styleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		this.tagName = ruleName;

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.tagName} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isTagRule: boolean = true;

	// Name of the tag to which the styleset applies.
	public tagName: string;
}



