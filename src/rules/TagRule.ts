import {ITagRule, ExtendedStyleset, RuleType} from "./RuleTypes"
import {StyleRule} from "./StyleRule";



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( tag?: string, style?: ExtendedStyleset)
	{
		super( RuleType.TAG, style);
		this.tag = tag;
	}



	// Creates a copy of the rule.
	public clone(): TagRule
	{
		let newRule = new TagRule();
		newRule.copyFrom( this);
		newRule.tag = this.tag;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return this.tag;
	}



	/** Name of the HTML tag */
	public tag: string;
}



