import {IPageRule, RuleType} from "./RuleTypes"
import {StyleRule} from "./StyleRule";
import {Styleset, PagePseudoClass} from "../styles/StyleTypes";



/**
 * The PageRule class represents the CSS @page rule.
 */
export class PageRule extends StyleRule implements IPageRule
{
	public constructor( style?: Styleset, pseudoClass?: PagePseudoClass)
	{
		super( RuleType.PAGE, style);
		this.pseudoClass = pseudoClass;
	}



	// Creates a copy of the rule.
	public clone(): PageRule
	{
		let newRule = new PageRule();
		newRule.copyFrom( this);
		newRule.pseudoClass = this.pseudoClass;
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return `@page ${this.pseudoClass ? this.pseudoClass : ""}`;
	}



	/** SOM page rule */
	public get cssPageRule(): CSSPageRule { return this.cssRule as CSSPageRule; }

	/** Optional name of the page pseudo style (e.g. "":first") */
	public pseudoClass: PagePseudoClass | undefined;
}



