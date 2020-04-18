import {ITagRule, ExtendedStyleset} from "./RuleTypes"
import {RuleType} from "./Rule";
import {StyleRule} from "./StyleRule";



/**
 * The TagRule class describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( tag: string, style?: ExtendedStyleset)
	{
		super( RuleType.TAG, style);
		this.tag = tag;
	}



	// Creates a copy of the rule.
	public clone(): TagRule
	{
		let newRule = new TagRule( this.tag);
		newRule.copyFrom( this);
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



