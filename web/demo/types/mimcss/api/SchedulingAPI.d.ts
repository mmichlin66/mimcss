import { IScheduler } from "../api/SchedulingTypes";
/**
 * Writes to DOM all style changes caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export declare const forceDOMUpdate: (schedulerType?: number | undefined) => void;
/**
 * Removes all scheduled activations caused by the calls to the activate and deactivate functions
 * accumulated since the last activation of the given scheduling type.
 */
export declare const cancelDOMUpdate: (schedulerType?: number | undefined) => void;
/**
 * Sets the default scheduling type that is used by activate and deactivate functions that are
 * called without explicitly providing value to the scheduling parameter. Returns the type of the
 * previous default activator or 0 if an error occurs (e.g. the given scheduler type ID is not
 * registered).
 */
export declare const setDefaultScheduler: (schedulerType: number) => number;
/**
 * Registers the given scheduler object and returns the scheduler type identifier, which
 * should be used when calling activate and deactivate functions.
 */
export declare const registerScheduler: (scheduler: IScheduler) => number;
//# sourceMappingURL=SchedulingAPI.d.ts.map