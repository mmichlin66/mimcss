import {StyleDefinition, IStyleDefinitionClass, IScheduler} from "../rules/RuleTypes";
import {processInstanceOrClass} from "../rules/RuleContainer";
import {
    s_scheduleCall, s_setDefaultSchedulerType, s_getDefaultSchedulerType,
    IActivator, s_registerScheduler, s_unregisterScheduler
} from "../rules/Scheduling";



/**
 * Activates the given style definition class or instance and inserts all its rules into DOM. If
 * the input object is not an instance but a class, which is not yet associated with an instance,
 * the instance is first created and processed. Note that each style definition instance maintains
 * a reference counter of how many times it was activated and deactivated. The rules are inserted
 * into DOM only upon first activation.
 */
export function $activate<T extends StyleDefinition>(
	instanceOrClass: T | IStyleDefinitionClass<T>,
	schedulerType?: number): T | null
{
	let instance = processInstanceOrClass( instanceOrClass) as T;
	if (instance)
		s_scheduleCall( (activator: IActivator) => activator.activate( instance), schedulerType);

	return instance;
}



/**
 * Deactivates the given style definition instance by removing its rules from DOM. Note that each
 * style definition instance maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function $deactivate( instance: StyleDefinition, schedulerType?: number): void
{
	s_scheduleCall( (activator: IActivator) => activator.deactivate( instance), schedulerType);
}



/**
 * Writes to DOM all style changes caused by the calls to the $activate and $deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function $forceActivation( schedulerType?: number): void
{
	s_scheduleCall( (activator: IActivator) => activator.forceActivation(), schedulerType);
}



/**
 * Removes all scheduled activations caused by the calls to the $activate and $deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function $cancelActivation( schedulerType?: number): void
{
	s_scheduleCall( (activator: IActivator) => activator.cancelActivation(), schedulerType);
}



/**
 * Sets the default scheduler type that is used by $activate and $deactivate functions that are
 * called without explicitly providing value to the scheduler type parameter. Returns the type of
 * the previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
 * registered).
 */
export function setDefaultSchedulerType( schedulerType: number): number
{
	return s_setDefaultSchedulerType( schedulerType);
}



/**
 * Returns the default scheduler type that is used by $activate and $deactivate functions that are
 * called without explicitly providing value to the scheduler type parameter.
 */
export function getDefaultSchedulerType(): number
{
	return s_getDefaultSchedulerType();
}



/**
 * Registers the given scheduler object and returns the scheduler type identifier, which
 * should be used when calling $activate and $deactivate functions.
 */
export function registerScheduler( scheduler: IScheduler): number
{
    return s_registerScheduler( scheduler);
}



/**
 * Unregisters a scheduler object with the given scheduler type identifier.
 */
export function unregisterScheduler( id: number): void
{
    return s_unregisterScheduler( id);
}



