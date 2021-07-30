import {IScheduler} from "../api/SchedulingTypes";
import {IStyleDefinitionClass, IStyleDefinition} from "./RuleTypes";
import * as impl from "../impl/SchedulingImpl";
import {processInstanceOrClass} from "../rules/RuleContainer";



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Scheduling.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Activates the given style definition class or instance and inserts all its rules into DOM. If
 * the input object is not an instance but a class, which is not yet associated with an instance,
 * the instance is first created and processed. Note that each style definition instance maintains
 * a reference counter of how many times it was activated and deactivated. The rules are inserted
 * into DOM only upon first activation.
 */
 export function activate<T extends IStyleDefinition>(
	instanceOrClass: T | IStyleDefinitionClass<T>,
	schedulerType?: number): T | null
{
	let instance = processInstanceOrClass( instanceOrClass) as T;
	if (instance)
        impl.getActivator(schedulerType).activate( instance);

	return instance;
}



/**
 * Deactivates the given style definition instance by removing its rules from DOM. Note that each
 * style definition instance maintains a reference counter of how many times it was activated and
 * deactivated. The rules are removed from DOM only when this reference counter goes down to 0.
 */
export function deactivate( instance: IStyleDefinition, schedulerType?: number): void
{
	impl.getActivator(schedulerType).deactivate( instance);
}



/**
 * Writes to DOM all style changes caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function forceDOMUpdate( schedulerType?: number): void
{
	impl.getActivator(schedulerType).forceDOMUpdate();
}



/**
 * Removes all scheduled activations caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export function cancelDOMUpdate( schedulerType?: number): void
{
	impl.getActivator(schedulerType).cancelDOMUpdate();
}



/**
 * Returns the current default scheduler type.
 */
 export function getDefaultScheduler(): number
 {
     return impl.getDefaultScheduler();
 }



 /**
  * Sets the default scheduling type that is used by activate and deactivate functions that are
  * called without explicitly providing value to the scheduling parameter. Returns the type of the
  * previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
  * registered).
  */
 export function setDefaultScheduler( schedulerType: number): number
 {
     return impl.setDefaultScheduler( schedulerType);
 }



 /**
  * Registers the given scheduler object and returns the scheduler type identifier, which
  * should be used when calling activate and deactivate functions.
  */
 export function registerScheduler( scheduler: IScheduler): number
 {
     return impl.registerScheduler( scheduler);
 }



 /**
  * Unregisters a scheduler object with the given scheduler type identifier.
  */
 export function unregisterScheduler( schedulerType: number): void
 {
     return unregisterScheduler( schedulerType);
 }



