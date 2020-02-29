import {ICustomVar} from "../api/rules"
import {Styleset} from "../styles/styles"
import {stylePropToCssString} from "../styles/StyleInfo"
import {Rule} from "./Rule";
import {StyleScope} from "./StyleScope"



/**
 * The CustomVar class describes a custom CSS property.
 */
export class CustomVar<T> extends Rule implements ICustomVar<T>
{
	public constructor( templatePropName?: keyof Styleset, varValue?: T)
	{
		super();
		this.templatePropName = templatePropName;
		this.varValue = varValue;
	}



	// Processes the given rule.
	public process( owner: StyleScope, ruleName: string): void
	{
		super.process( owner, ruleName);

		this.varName = this.owner.generateScopedName( ruleName);
	}



	/**
	 * Determines whether this rule requires name - that is it will be ignored if created within
	 * the createUnnamedRules
	 */
	public get nameIsRequired(): boolean { return true; }



	// Creates a copy of the rule.
	public clone(): CustomVar<T>
	{
		let newRule = new CustomVar<T>();
		newRule.copyFrom( this);
		return newRule;
	}



	// Copies internal data from another rule object.
	public copyFrom( src: CustomVar<T>): void
	{
		this.templatePropName = src.templatePropName;
		this.varValue = src.varValue;
	}

	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `--${this.varName}: ${stylePropToCssString( this.templatePropName, this.varValue, true)}`;
	}

	// Determines whether this rule is a real CSS rule that should be inserted under the <style>
	// element. For the majority of Rule-derived classes this is true; however, for some classes,
	// e.g. for the CustomVar class, this is not so.
	public get isRealCssRule(): boolean { return false; }



	/** Only needed to distinguish from other rules */
	public get isCustomVar(): boolean { return true; }

	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public templatePropName: keyof Styleset;

	// Value of the custom CSS property.
	public varValue: T;

	// Name of the custom CSS property.
	public varName: string;
}



