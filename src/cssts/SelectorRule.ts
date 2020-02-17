import * as cssts from "./cssts"
import {StyleRule} from "./StyleRule"



/**
 * The SelectorRule type describes a ruleset that applies to elements identified by a class.
 */
export class SelectorRule extends StyleRule implements cssts.ISelectorRule
{
	public constructor( owner: cssts.StyleSheetDefinition, selector: cssts.ISelector, ruleset: cssts.ExtendedRuleset)
	{
		super( owner, ruleset);

		this.selector = selector;
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string)
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



	// Creates string representation of the 
	public toString(): string
	{
		return `${this.selector.toSelectorString()} ${cssts.rulesetToString( this.ruleset, this.important)}`;
	}



	/** Only needed to distinguish from other style rules */
	public readonly isSelectorRule: boolean = true;

	// selector object for this rule.
	public readonly selector: cssts.ISelector;
}



/** Returns new ClassRule object as belonging to the given style sheet definition  */
export function defineSelectorRule( ssDef: cssts.StyleSheetDefinition, selector: cssts.ISelector,
				ruleset: cssts.ExtendedRuleset): cssts.ISelectorRule
{
	return new SelectorRule( ssDef, selector, ruleset);
}



