import {ICustomVar, RuleType, INamedRule} from "./RuleTypes"
import {Rule} from "./Rule";
import {RuleContainer, IRuleContainerOwner} from "./RuleContainer"
import {ExtendedPropType} from "../styles/UtilTypes";
import {stylePropToCssString} from "../styles/StyleFuncs"



/**
 * The CustomVar class describes a custom CSS property.
 */
export class CustomVar<T = any> extends Rule implements ICustomVar<T>
{
	public constructor( templatePropName?: string, varValue?: T, nameOverride?: string | INamedRule)
	{
		super( RuleType.VAR);

		this.templatePropName = templatePropName;
		this.varValue = varValue;
		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: RuleContainer, owner: IRuleContainerOwner, ruleName: string): void
	{
		super.process( container, owner, ruleName);

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



	// Determines whether this rule is a real CSS rule that should be inserted under the <style>
	// element. For the majority of Rule-derived classes this is true; however, for some classes,
	// e.g. for the CustomVar class, this is not so.
	public get isRealCssRule(): boolean { return false; }



	// Creates a copy of the rule.
	public clone(): CustomVar<T>
	{
		let newRule = new CustomVar<T>();
		newRule.templatePropName = this.templatePropName;
		newRule.varValue = this.varValue;
		newRule.nameOverride = this.nameOverride;
		return newRule;
	}



	// Inserts this rule into the given parent rule or stylesheet.
	// Since CustomVar is not a real CSS rule, this implementation does nothing. Instead, the
	// RuleContainer uses the toCssString method of our class.
	public insert( parent: CSSStyleSheet | CSSGroupingRule): void {}



	// Converts the rule to CSS string.
	public toCssString(): string
	{
		return `--${this.varName}: ${stylePropToCssString( this.templatePropName, this.varValue, true)}`;
	}



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



