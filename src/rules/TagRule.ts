import {ITagRule, ExtendedStyleset, RuleType} from "./RuleTypes"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( tagName?: string, style?: ExtendedStyleset)
	{
		super( RuleType.TAG, style);
		this.tagName = tagName;
	}



	// Creates a copy of the rule.
	public clone(): TagRule
	{
		let newRule = new TagRule();
		newRule.copyFrom( this);
		newRule.tagName = this.tagName;
		return newRule;
	}



	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return this.tagName;
	}



	/** Name of the HTML tag */
	public get tag(): string { return this.tagName; }

	// Name of the tag to which the styleset applies.
	public tagName: string;
}



