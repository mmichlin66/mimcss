import {ISelectorRule, ExtendedStyleset} from "../api/rules"
import {ISelector} from "../api/Selector"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule"
import {Selector} from "../api/Selector";
import {StyleScope} from "./StyleScope"



/**
 * The SelectorRule type describes a styleset that applies to elements identified by a class.
 */
export class SelectorRule extends StyleRule implements ISelectorRule
{
	public constructor( selector?: ISelector | string, styleset?: ExtendedStyleset)
	{
		super( styleset);

		if (selector)
			this.selector = typeof selector === "string" ? new Selector( selector) : selector;
	}



	// Processes the given rule.
	public process( owner: StyleScope, ruleName: string): void
	{
		super.process( owner, ruleName);

		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	// Creates a copy of the rule.
	public clone(): SelectorRule
	{
		let newRule = new SelectorRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Copies internal data from another rule object.
	public copyFrom( src: SelectorRule): void
	{
		super.copyFrom( src);
		this.selector = src.selector;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.selector.toCssString()} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public get isSelectorRule(): boolean { return true; }

	// selector object for this rule.
	public selector: ISelector;
}



