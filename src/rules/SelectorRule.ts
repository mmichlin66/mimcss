import {ISelectorRule, ExtendedStyleset} from "./RuleTypes"
import {StyleRule} from "./StyleRule"
import {CssSelector} from "../styles/SelectorTypes";
import {selectorToCssString} from "../styles/SelectorFuncs";



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a CSS selector.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( selector: CssSelector, style?: ExtendedStyleset)
	{
		super( style);

		this.selector = selector;
	}



	// Creates a copy of the rule.
	public clone(): SelectorRule
	{
		let newRule = new SelectorRule( this.selector);
		newRule.copyFrom( this);
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
	public selector: CssSelector;
}



