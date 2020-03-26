import {ICustomVar, INamedRule} from "./RuleTypes"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"
import {stylePropToCssString} from "../styles/StyleFuncs"



/**
 * The CustomVar class describes a custom CSS property. CustomVar does not derive from the Rule
 * class because it is not a real CSS rule; however, in many aspects it repeats the Rule's
 * functionality. In particular it has the process function that allows it to obtain an actual
 * name, whcih will be used when defining and using this custom property in CSS.
 */
export class CustomVar<T = any> implements ICustomVar<T>
{
	public constructor( templatePropName?: string, varValue?: T, nameOverride?: string | INamedRule)
	{
		this.templatePropName = templatePropName;
		this.value = varValue;
		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		this.owner = owner;
		this.ruleName = ruleName;

		if (!this.nameOverride)
			this.name = this.owner.getScopedRuleNamed( ruleName);
		else if (typeof this.nameOverride === "string")
			this.name = this.nameOverride;
		else
			this.name = this.nameOverride.name;

		this.cssName = "--" + this.name;
	}



	// Creates a copy of the rule.
	public clone(): CustomVar<T>
	{
		let newRule = new CustomVar<T>();
		newRule.templatePropName = this.templatePropName;
		newRule.value = this.value;
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.cssName}: ${stylePropToCssString( this.templatePropName, this.value, true)}`;
	}



	// The toString function is used when the object is specified as a value of a style property.
	// We return the var(--name) expression.
    public toString(): string
    {
		return `var(${this.cssName})`;
    }



	// Name of the property of the style scope definition to which this rule was assigned. This is
	// null for StyleScope.
	public ruleName: string;

	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public templatePropName: string;

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/**
	 * Rule's name - this is a name that has the prefix that is used when referring to classes (.),
	 * IDs (#) and custom CSS properties (--). For animations, this name is the same as in the
	 * `name` property.
	 */
	public cssName: string;

	// Value of the custom CSS property.
	public value: T;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | INamedRule;

	// Style scope to which this rule belongs. This is "this" for StyleScope.
	public owner: IRuleContainerOwner;
}



