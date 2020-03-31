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
	public constructor( template?: string, value?: T, nameOverride?: string | INamedRule)
	{
		this.template = template;
		this.value = value;
		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		this.container = container;
		this.ruleName = ruleName;

		if (!this.nameOverride)
			this.name = owner.getScopedRuleName( ruleName);
		else if (typeof this.nameOverride === "string")
			this.name = this.nameOverride;
		else
			this.name = this.nameOverride.name;

		this.cssName = this.name.startsWith("--") ? this.name : "--" + this.name;
	}



	// Creates a copy of the rule.
	public clone(): CustomVar<T>
	{
		let newRule = new CustomVar<T>();
		newRule.template = this.template;
		newRule.value = this.value;
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `${this.cssName}: ${stylePropToCssString( this.template, this.value, true)}`;
	}



	// The toString function is used when the object is specified as a value of a style property.
	// We return the var(--name) expression.
    public toString(): string
    {
		return `var(${this.cssName})`;
    }



	/**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 */
	public setValue( value: T, important?: boolean): void
	{
		this.container.setCustomVarValue( this.cssName, stylePropToCssString( this.template, value, true), important)
	}


	
	// Name of the property of the stylesheet definition to which this rule was assigned. This is
	// null for Stylesheet.
	public ruleName: string;

	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public template: string;

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
	private value: T;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | INamedRule;

	// Rule container to which this rule belongs. This is "this" for Stylesheet.
	public container: RuleContainer;
}



