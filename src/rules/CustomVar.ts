import {ICustomVar} from "../api/rules"
import {Styleset} from "../styles/StyleTypes"
import {tsh} from "../styles/tsh"
import {Rule} from "./Rule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



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
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

		this.varName = this.owner.getScopedRuleNamed( ruleName);
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
		newRule.templatePropName = this.templatePropName;
		newRule.varValue = this.varValue;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	// Since CustomVar is not a real CSS rule, this implementation does nothing. Instead, the
	// RuleContainer uses the toCssString method of our class.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void {}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `--${this.varName}: ${tsh.val( this.templatePropName, this.varValue)}`;
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



