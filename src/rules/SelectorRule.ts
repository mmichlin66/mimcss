import {ISelectorRule, ExtendedStyleset, RuleType} from "./RuleTypes"
import {StyleRule} from "./StyleRule"
import {SelectorType} from "../styles/SelectorTypes";
import {selectorToCssString} from "../styles/SelectorFuncs";



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a CSS selector.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( selector?: SelectorType, style?: ExtendedStyleset)
	{
		super( RuleType.SELECTOR, style);

		this.selector = selector;
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
	public getSelectorString(): string
	{
		return selectorToCssString( this.selector);
	}



	/** CSS rule selector string */
	public get selectorText(): string { return selectorToCssString( this.selector); }

	// selector object for this rule.
	public selector: SelectorType;
}



