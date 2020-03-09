import {ICustomVar} from "../api/rules"
import {PureStyleset, Styleset} from "../styles/StyleTypes"
import {tsh} from "../api/tsh"
import {Rule} from "./Rule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"



/**
 * The CustomVar class describes a custom CSS property.
 */
export class CustomVar<K extends keyof PureStyleset> extends Rule implements ICustomVar<K>
{
	public constructor( templatePropName?: K, varValue?: PureStyleset[K])
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
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public get name(): string { return this.varName; }

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public get cssName(): string { return "--" + this.varName; }



	/**
	 * Determines whether this rule requires name - that is it will be ignored if created within
	 * the createUnnamedRules
	 */
	public get nameIsRequired(): boolean { return true; }



	// Creates a copy of the rule.
	public clone(): CustomVar<K>
	{
		let newRule = new CustomVar<K>();
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
	public templatePropName: K;

	// Value of the custom CSS property.
	public varValue: PureStyleset[K];

	// Name of the custom CSS property.
	public varName: string;
}



