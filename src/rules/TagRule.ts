import {ITagRule, ExtendedStyleset} from "../api/rules"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule";
import {StyleScope} from "./StyleScope"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( styleset?: ExtendedStyleset)
	{
		super( styleset);
	}



	// Processes the given rule.
	public process( owner: StyleScope, ruleName: string): void
	{
		super.process( owner, ruleName);

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	// Creates a copy of the rule.
	public clone(): TagRule
	{
		let newRule = new TagRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.tagName} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public get isTagRule(): boolean { return true; }

	// Name of the tag to which the styleset applies.
	public get tagName(): string { return this.ruleName };
}



