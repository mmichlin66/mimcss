import {ISelectorRule, ExtendedStyleset, RuleType} from "./RuleTypes"
import {StyleRule} from "./StyleRule"
import {SelectorType} from "../helpers/SelectorTypes";
import {Selector} from "../helpers/SelectorFuncs";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a class.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( selector?: SelectorType, style?: ExtendedStyleset)
	{
		super( RuleType.SELECTOR, style);

		this.selector = new Selector( selector);
	}



	// Creates a copy of the rule.
	public clone(): SelectorRule
	{
		let newRule = new SelectorRule();
		newRule.copyFrom( this);
		newRule.selector = this.selector;
		return newRule;
	}



	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return this.selector.toCssString();
	}



	/** CSS rule selector string */
	public get selectorText(): string { return this.selector.toCssString(); }

	// selector object for this rule.
	public selector: Selector;
}



