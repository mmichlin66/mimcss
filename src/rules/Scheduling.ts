import {ActivatorType, StyleDefinition} from "./RuleTypes";



/**
 * The IActivator interface represents an object responsible for a certain type of activation
 * mechanism.
 */
export interface IActivator
{
	/**
	 * Instructs to activate the given style definition instance. This method is called when the
	 * $activate function is called for this activation mechanism.
	 */
	activate( definition: StyleDefinition): void;

	/**
	 * Instructs to deactivate the given style definition instance. This method is called when the
	 * $deactivate function is called for this activation mechanism.
	 */
	deactivate( definition: StyleDefinition): void;

	/**
	 * Instructs to set the value of the property in the given CSS style rule.
	 */
	setStyleProperty( rule: CSSStyleRule, name: string, value?: string | null, important?: boolean): void;

	/**
	 * Performs activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the $forceActivation function is called
	 * for this activation mechanism.
	 */
	forceActivation(): void;

	/**
	 * Cancel activation/deactivation for all style definitions accumulated since the last
	 * activation/deactivation. This method is called when the $cancelActivation function is called
	 * for this activation mechanism.
	 */
	cancelActivation(): void;
}



/**
 * Represents objects that are used in the IActivator interface for setting property values.
 */
export interface ScheduledStylePropValue
{
	/** Style rule in which to set the property value */
	rule: CSSStyleRule;

	/** Dashe-cased property name */
	name: string;

	/** Property value. If the value is null or undefined, it is removed. */
	value?: string | null;

	/** Flag indicating whether the property should be marked "!important" */
	important?: boolean;
}



/**
 * Map of registered built-in and custom activators.
 */
export let s_registeredActivators = new Map<number,IActivator>();



/**
 * Schedules the update of the value of the given CSS property in the given rule.
 */
export function s_scheduleStylePropertyUpdate( rule: CSSStyleRule, name: string,
	value?: string | null, important?: boolean, activatorType?: number): void
{
	s_scheduleCall( (activator: IActivator) =>
		activator.setStyleProperty( rule, name, value, important), activatorType);
}



/**
 * Schedules calling of the iven function using the given activator type.
 */
export function s_scheduleCall( func: (activator: IActivator) => void, activatorType?: number): void
{
	if (activatorType == null)
		activatorType = s_currentDefaultActivatorType;

	let activator = s_registeredActivators.get( activatorType);
	if (activator)
		func( activator);
}



/**
 * Returns the current default activator type.
 */
export function s_getCurrentDefaultActivatorType(): number
{
	return s_currentDefaultActivatorType;
}

/**
 * Sets the current default activator type.
 */
export function s_setCurrentDefaultActivatorType( activatorType: number): void
{
	s_currentDefaultActivatorType = activatorType;
}

/**
 * Current default activator. This activator will be used if activator type is not explicitly
 * specified in calls such as $activate or IStyleRule.setProp.
 */
let s_currentDefaultActivatorType: number = ActivatorType.Sync;



