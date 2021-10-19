import {IScheduler} from "../api/SchedulingTypes";
import * as impl from "../impl/SchedulingImpl";



///////////////////////////////////////////////////////////////////////////////////////////////
//
// Scheduling.
//
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Writes to DOM all style changes caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export const forceDOMUpdate = (schedulerType?: number): void =>
	impl.getActivator(schedulerType).forceDOMUpdate();



/**
 * Removes all scheduled activations caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export const cancelDOMUpdate = (schedulerType?: number): void =>
	impl.getActivator(schedulerType).cancelDOMUpdate();



/**
 * Returns the current default scheduler type.
 */
export const getDefaultScheduler = (): number =>
    impl.getDefaultScheduler();



/**
 * Sets the default scheduling type that is used by activate and deactivate functions that are
 * called without explicitly providing value to the scheduling parameter. Returns the type of the
 * previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
 * registered).
 */
export const setDefaultScheduler = (schedulerType: number): number =>
    impl.setDefaultScheduler( schedulerType);



/**
 * Registers the given scheduler object and returns the scheduler type identifier, which
 * should be used when calling activate and deactivate functions.
 */
export const registerScheduler = (scheduler: IScheduler): number =>
    impl.registerScheduler( scheduler);



/**
 * Unregisters a scheduler object with the given scheduler type identifier.
 */
export const unregisterScheduler = (schedulerType: number): void =>
    impl.unregisterScheduler( schedulerType);



