import {ITagRule, StyleSheetDefinition, ExtendedRuleset, rulesetToCssString} from "./cssts"
import {StyleRule} from "./StyleRule";



/**
 * The TagRule type describes a ruleset that applies to elements identified by a tag name.
 */
export class TagRule extends StyleRule implements ITagRule
{
	public constructor( owner: StyleSheetDefinition, ruleset: ExtendedRuleset)
	{
		super( owner, ruleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		this.tagName = ruleName;

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own ruleset.
		for( let parent of this.parents)
			Object.assign( this.ruleset, parent.ruleset);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.tagName} ${rulesetToCssString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isTagRule: boolean = true;

	// Name of the tag to which the ruleset applies.
	public tagName: string;
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineTagRule( ssDef: StyleSheetDefinition, ruleset: ExtendedRuleset): ITagRule
{
	return new TagRule( ssDef, ruleset);
}



