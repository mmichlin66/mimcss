import {IVarRule, IConstRule} from "../api/RuleTypes"
import {VarTemplateName, ExtendedVarValue} from "../api/Stylesets"
import {sp2s} from "../impl/StyleImpl"
import {IRuleContainer, RuleLike} from "./Rule";



/**
 * The VarRule class describes a custom CSS property. VarRule does not derive from the Rule
 * class because it is not a real CSS rule; however, in many aspects it repeats the Rule's
 * functionality. In particular it has the process function that allows it to obtain an actual
 * name, which will be used when defining and using this custom property in CSS.
 */
export class VarRule<K extends VarTemplateName = any> extends RuleLike implements IVarRule<K>
{
	public constructor( template: K, value?: ExtendedVarValue<K>, nameOverride?: string | IVarRule<K>)
	{
        super();
		this.template = template;
		this.value = value;
		this.nameOverride = nameOverride;
	}


    // This function is used when the object is specified as a value of a style property.
    // We return the var(--name) expression.
    public toString(): string { return `var(${this.cssVarName})`; }


	// Processes the given rule.
	public process( container: IRuleContainer, ruleName: string | null): void
	{
		super.process( container, ruleName);
		this.name = container.getScopedName( ruleName, this.nameOverride);
        this.cssVarName = "--" + this.name;
	}



	// Converts the rule to CSS string.
	public toCss(): string | null
	{
		return this.value == null ? null : `${this.cssVarName}: ${sp2s( this.template, this.value)}`;
	}



	/**
	 * Gets the value of the property.
	 */
    public getValue(): ExtendedVarValue<K>
    {
        return this.value!;
    }



    /**
	 * Sets new value of this custom CSS property.
	 * @param value New value for the CSS property.
	 * @param schedulerType ID of a registered scheduler type that is used to write the property
	 * value to the DOM. If undefined, the current default scheduler will be used.
	 */
	public setValue( value: ExtendedVarValue<K>, schedulerType?: number): void
	{
        this.value = value;
        if (this.c)
		{
            let important = false;
            if (value != null && typeof value === "object" && "!" in (value as any))
            {
                important = true;
                value = value["!"];
            }

            this.c.setVarValue( this.cssVarName,
                value == null
                    ? null
                    : sp2s( this.template, value), important, schedulerType)
        }
	}



	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public template: K;

	/**
	 * Rule's name - this is a unique name that is assigned by the Mimcss infrastucture. This name
	 * doesn't have the prefix that is used when referring to classes (.), IDs (#) and custom CSS
	 * properties (--).
	 */
	public name: string;

	/**
	 * Custom CSS property name prefixed with `"--"`.
	 */
	public cssVarName: string;

	// Value of the custom CSS property.
	private value?: ExtendedVarValue<K>;

	// Name or named object that should be used to create a name for this rule. If this property
	// is not defined, the name will be uniquely generated.
	private nameOverride?: string | IVarRule<K>;
}



/**
 * The IConstRule interface represents a "constant" that can be used anywhere the type defined by
 * the `template` parameter can be used. These are called constants, because they provide the
 * convenient and lightweight way of defining values that are unchanged during the application
 * lifetime. Although constants are defined very similarly to custom properties (see the
 * [[IVarRule]] function), they cannot participate in the cascade and cannot be redefined under
 * elements. Constant can, however, use any expression that satisfies the type defined by the
 * `template` parameter including other constants, custom properties and functions.
 * Objects implementing this interface are returned from the [[$const]] function.
 */
export class ConstRule<K extends VarTemplateName = any> extends RuleLike implements IConstRule<K>
{
	public constructor( template: K, value?: ExtendedVarValue<K>, cachedValue?: string)
	{
        super();
		this.template = template;
        this.value = value;
        this._val = cachedValue;
	}


    // This function is used when the object is specified as a value of a style property.
    public toString(): string { return this._val!; }


	// Processes the given rule.
	public process( container: IRuleContainer, ruleName: string | null): void
	{
        super.process( container, ruleName);

        if (!this._val)
		    this._val = sp2s( this.template, this.value);
	}



	/**
	 * Gets the value of the property.
	 */
    public getValue(): ExtendedVarValue<K>
    {
        return this.value!;
    }



	// Name of a non-custom CSS property whose type determines the type of the custom property value.
	public template: K;

	// Value of the custom CSS property.
	private value?: ExtendedVarValue<K>;

	// Property value cached when the rule is proceed.
	private _val?: string;
}



