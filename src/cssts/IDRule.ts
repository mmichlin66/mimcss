import {IIDRule, ExtendedStyleset} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {StyleRule} from "./StyleRule";
import {StyleScope} from "./StyleScope"



/**
 * The IDRule type describes a styleset that applies to elements identified by an ID.
 */
export class IDRule extends StyleRule implements IIDRule
{
	public constructor( styleset?: ExtendedStyleset)
	{
		super( styleset);
	}



	// Processes the given rule.
	public process( owner: StyleScope, ruleName: string): void
	{
		super.process( owner, ruleName);

		this.idName = this.owner.generateScopedName( ruleName);

		// go through all parents; for those who are classes, add their name to the
		// combined name. For those who are not classes, copy style properties to the
		// class's own styleset.
		for( let parent of this.parents)
			Object.assign( this.styleset, parent.styleset);
	}



	// Creates a copy of the rule.
	public clone(): IDRule
	{
		let newRule = new IDRule();
		newRule.copyFrom( this);
		return newRule;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `#${this.idName} ${stylesetToCssString( this.styleset, this.important)}`;
	}



	/** Only needed to distinguish from other rules */
	public get isIDRule(): boolean { return true; }

	// Name of the element identifier for applying the styleset.
	public idName: string;
}



