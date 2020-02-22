import {ISelectorRule, ISelector, ExtendedStyleset} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule"
import {Selector} from "./Selector";
import {StyleScope} from "./StyleScope"



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a class.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( owner: StyleScope, selector: ISelector | string, styleset: ExtendedStyleset)
	{
		super( owner, styleset);

		this.selector = typeof selector === "string" ? new Selector( selector) : selector;
	}



	// Processes the given rule.
	public process( styleSheetName: string, ruleName: string): void
	{
		super.process( styleSheetName, ruleName);

		// // go through all rules in the selector (if any) and if they belong to a different style
		// // sheet definition, process it.
		// let rulesInSelector = this.selector.getRules();
		// for( let rule of rulesInSelector)
		// {
		// 	if (rule.owner !== this.owner)
		// 		rule.owner.process();
		// }

		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.selector.toCssString()} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public readonly isSelectorRule: boolean = true;

	// selector object for this rule.
	public readonly selector: ISelector;
}



