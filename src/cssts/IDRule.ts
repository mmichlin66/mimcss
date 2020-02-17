import {IIDRule, StyleSheetDefinition, ExtendedRuleset, generateName, rulesetToCssString} from "./cssts"
import {StyleRule} from "./StyleRule";



/**
 * The IDRule type describes a ruleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements IIDRule
{
	public constructor( owner: StyleSheetDefinition, ruleset: ExtendedRuleset)
	{
		super( owner, ruleset);
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		this.idName = generateName( styleSheetName, ruleName);

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own ruleset.
		for( let parent of this.parents)
			Object.assign( this.ruleset, parent.ruleset);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `#${this.idName} ${rulesetToCssString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isIDRule: boolean = true;

	// Name of the element identifier for applying the ruleset.
	public idName: string;
}



/** Returns new IDRule object as belonging to the given style sheet definition  */
export function defineIDRule( ssDef: StyleSheetDefinition, ruleset: ExtendedRuleset): IIDRule
{
	return new IDRule( ssDef, ruleset);
}



