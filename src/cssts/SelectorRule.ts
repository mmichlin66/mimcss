import {ISelectorRule, StyleSheetDefinition, ISelector, ExtendedRuleset, rulesetToCssString} from "./cssts"
import {StyleRule} from "./StyleRule"



/**
 * The SelectorRule type describes a ruleset that applies to elements identified by a class.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( owner: StyleSheetDefinition, selector: ISelector, ruleset: ExtendedRuleset)
	{
		super( owner, ruleset);

		this.selector = selector;
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		// go through all rules in the selector (if any) and if they belong to a different style
		// sheet definition, process it.
		let rulesInSelector = this.selector.getRules();
		for( let rule of rulesInSelector)
		{
			if (rule.owner !== this.owner)
				rule.owner.process();
		}

		for( let parent of this.parents)
			Object.assign( this.ruleset, parent.ruleset);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.selector.toCssString()} ${rulesetToCssString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isSelectorRule: boolean = true;

	// selector object for this rule.
	public readonly selector: ISelector;
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineSelectorRule( ssDef: StyleSheetDefinition, selector: ISelector,
				ruleset: ExtendedRuleset): ISelectorRule
{
	return new SelectorRule( ssDef, selector, ruleset);
}



