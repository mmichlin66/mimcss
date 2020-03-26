import {IAbstractRule, ExtendedStyleset, RuleType} from "./RuleTypes"
import {StyleRule} from "./StyleRule";



/**
 * The AbstractRule type describes a styleset that can only be used as a base for other style
 * rules.
 */
export class AbstractRule extends StyleRule implements IAbstractRule
{
	public constructor( style?: ExtendedStyleset)
	{
		super( RuleType.ABSTRACT, style);
	}



	// Creates a copy of the rule.
	public clone(): AbstractRule
	{
		let newRule = new AbstractRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Overrides the StyleRule's implementation to do nothing. No CSSStyleRule is created for
	// abstract rules.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void
	{
	}

	// Returns the selector part of the style rule.
	protected geSelectorString(): string
	{
		return null;
	}



	/** Only needed to distinguish from other rules */
	public get isAbstractRule(): boolean { return true; }
}



