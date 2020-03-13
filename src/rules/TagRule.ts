import {ITagRule, ExtendedStyleset, RuleType} from "../api/rules"
import {StyleRule} from "./StyleRule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The TagRule type describes a styleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( tagName?: string, styleset?: ExtendedStyleset)
	{
		super( RuleType.TAG, styleset);
		this.tagName = tagName;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		// go through all parents and copy style properties to the class's own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
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



	/** Only needed to distinguish from other rules */
	public get isTagRule(): boolean { return true; }

	// Name of the tag to which the styleset applies.
	public tagName: string;
}



