import {ICustomVar, INamedRule} from "./RuleTypes"
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"
import {stylePropToCssString} from "../styles/StyleFuncs"



/**
 * The CustomVar class describes a custom CSS property.
 */
export class CustomVar<T = any> implements ICustomVar<T>
{
	public constructor( templatePropName?: string, varValue?: T, nameOverride?: string | INamedRule)
	{
		this.templatePropName = templatePropName;
		this.varValue = varValue;
		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		this.container = container;
		this.owner = owner;
		this.ruleName = ruleName;

		if (!this.nameOverride)
			this.varName = this.owner.getScopedRuleNamed( ruleName);
		else if (typeof this.nameOverride === "string")
			this.varName = this.nameOverride;
		else
			this.varName = this.nameOverride.name;
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



	// Creates a copy of the rule.
	public clone(): CustomVar<T>
	{
		let newRule = new CustomVar<T>();
		newRule.templatePropName = this.templatePropName;
		newRule.varValue = this.varValue;
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `--${this.varName}: ${stylePropToCssString( this.templatePropName, this.varValue, true)}`;
	}



	// The toString function is used when the object is specified as a value of a style property.
	// We return the var(--name) expression.
    public toString(): string
    {
		return `var(--${this.varName})`;
    }



	// Rule container to which this rule belongs. This is "this" for StyleScope.
	public container: RuleContainer;

	// Style scope to which this rule belongs. This is "this" for StyleScope.
	public owner: IRuleContainerOwner;

	// Name of the property of the style scope definition to which this rule was assigned. This is
	// null for StyleScope.
	public ruleName: string;

	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public templatePropName: string;

	// Name of the custom CSS property.
	public varName: string;

	// Value of the custom CSS property.
	public varValue: T;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | INamedRule;
}



