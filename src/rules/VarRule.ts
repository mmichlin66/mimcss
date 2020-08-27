import {IVarRule} from "../api/RuleTypes"
import {VarValueType, VarTemplateName} from "../api/StyleTypes"
import {stylePropToString} from "../styles/StyleFuncs"
import {createNames, IRuleContainer, ITopLevelRuleContainer, RuleLike} from "./Rule";



/**
 * The VarRule class describes a custom CSS property. VarRule does not derive from the Rule
 * class because it is not a real CSS rule; however, in many aspects it repeats the Rule's
 * functionality. In particular it has the process function that allows it to obtain an actual
 * name, which will be used when defining and using this custom property in CSS.
 *
 * Note that while the type parameter K is a key of the ICssStyleset interface, the value is of
 * type IStileset[K], which is Extended<ICssStyleset[K]>. This allows specifying values that are
 * valid for the Extended roperty type.
 */
export class VarRule<K extends VarTemplateName = any> extends RuleLike implements IVarRule<K>
{
	public constructor( template: K, value?: VarValueType<K>, nameOverride?: string | IVarRule<K>)
	{
        super();
		this.template = template;
		this.value = value;
		this.nameOverride = nameOverride;
	}



	// Processes the given rule.
	public process( container: IRuleContainer, ownerContainer: ITopLevelRuleContainer, ruleName: string | null): void
	{
		super.process( container, ownerContainer, ruleName);
		[this.name, this.cssName] = createNames( ownerContainer, ruleName, this.nameOverride, "--");
	}



	// Creates a copy of the rule.
	public clone(): VarRule<K>
	{
		return new VarRule<K>(this.template, this.value, this.nameOverride);
	}



	// Converts the rule to CSS string.
	public toCssString(): string | null
	{
		return this.value == null ? null : `${this.cssName}: ${stylePropToString( this.template, this.value, true)}`;
	}



	// The valueToString function is used when the object is specified as a value of a style property.
	// We return the var(--name) expression.
    public valueToString(): string
    {
		return `var(${this.cssName})`;
    }



	/**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param important Flag indicating whether to set the "!important" flag on the property value.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	public setValue( value: VarValueType<K>, important?: boolean, schedulerType?: number): void
	{
		this.container.setCustomVarValue( this.cssName,
            value == null ? null : stylePropToString( this.template, value, true),
            important, schedulerType)
	}



	// // Name of the property of the stylesheet definition to which this rule was assigned. This is
	// // null for Stylesheet.
	// public ruleName: string;

	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public template: K;

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
	private value: VarValueType<K>;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | IVarRule<K>;
}



