import {ICustomVar, ExtendedStyleset} from "./cssts"
import {stylesetToCssString} from "../styles/styles"
import {Rule} from "./Rule";
import {StyleScope} from "./StyleScope"



/**
 * The IDRule type describes a styleset that applies to elements identified by an ID.
 */
export class CustomVar extends Rule implements ICustomVar
{
	public constructor( varValue?: string)
	{
		super();
		this.varValue = varValue;
	}



	// Processes the given rule.
	public process( owner: StyleScope, ruleName: string): void
	{
		super.process( owner, ruleName);

		this.varName = this.owner.generateScopedName( ruleName);
	}



	// Creates a copy of the rule.
	public clone(): CustomVar
	{
		let newRule = new CustomVar();
		newRule.copyFrom( this);
		return newRule;
	}



	// Copies internal data from another rule object.
	public copyFrom( src: CustomVar): void
	{
		this.varValue = src.varValue;
	}

	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `--${this.varName}: ${this.varValue}`;
	}

	// Determines whether this rule is a real CSS rule that should be inserted under the <style>
	// element. For the majority of Rule-derived classes this is true; however, for some classes,
	// e.g. for the CustomVar class, this is not so.
	public get isRealCssRule(): boolean { return false; }



	/** Only needed to distinguish from other rules */
	public get isCustomVar(): boolean { return true; }

	// Name of the custom CSS property.
	public varValue: string;

	// Name of the custom CSS property.
	public varName: string;
}



