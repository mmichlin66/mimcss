import {IPageRule} from "./RuleTypes"
import {StyleRule} from "./StyleRule";
import {Styleset} from "../styles/StyleTypes";
import {PagePseudoClass} from "../styles/SelectorTypes";



/**
 * The PageRule class represents the CSS @page rule.
 */
export class PageRule extends StyleRule implements IPageRule
{
	public constructor( style?: Styleset, pseudoClass?: PagePseudoClass)
	{
		super( style);
		this.pseudoClass = pseudoClass;
	}



	// Creates a copy of the rule.
	public clone(): PageRule
	{
		let newRule = new PageRule( undefined, this.pseudoClass);
		newRule.copyFrom( this);
		return newRule;
	}



	// Returns the selector part of the style rule.
	public getSelectorString(): string
	{
		return `@page ${this.pseudoClass ? this.pseudoClass : ""}`;
	}



	/** SOM page rule */
	public cssRule: CSSPageRule;

	/** Optional name of the page pseudo style (e.g. "":first") */
	public pseudoClass: PagePseudoClass | undefined;
}



