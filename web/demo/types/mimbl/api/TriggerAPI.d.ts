import { AnyAnyFunc, ITrigger, IWatcher, NoneTypeFunc, NoneVoidFunc } from "./TriggerTypes";
/**
 * Creates a trigger object of the given depth with the given initial value.
 * @typeparam T Type of the trigger value.
 * @param depth Depth of the trigger, which determines how many levels of nested properties of
 * arrays, maps, sets and objects should trigger changes.
 * @param v Optional initial value
 */
export declare function createTrigger<T = any>(v?: T, depth?: number): ITrigger<T>;
/**
 * Checks whether the given object is a trigger.
 * @param obj Object to check whether it is a trigger
 * @returns True if the object is a trigger and false otherwise
 */
export declare const isTrigger: (obj: object) => obj is ITrigger<any>;
/**
 * Creates a watcher function with the same signature as the given regular function. When the
 * watcher function is invoked it invokes the original function and it notices all trigger objects
 * that were read during its execution. When any of these trigger objects have their values
 * changed, the responder function will be called.
 *
 * @typeparam T Type (signature) of the function to be watched.
 * @param func Function to be watched
 * @param responder Function to be invoked when values of the trigger objects encountered during
 * the original function's last execution change.
 * @param funcThis Optional value of "this" that will be used to call the original function.
 * @param responderThis Optional value of "this" that will be used to call the responder function.
 * If this value is undefined, the "this" value for the original function will be used.
 */
export declare function createWatcher<T extends AnyAnyFunc>(func: T, responder: NoneVoidFunc, funcThis?: any, responderThis?: any): IWatcher<T>;
/**
 * Creates a computed trigger object whose value is calculated by the given function and with an
 * optional initial value.
 *
 * @typeparam T Type of the computed value.
 * @param func Function, method or get accessor that produces the computed value.
 * @param funcThis Optional `this` value to use when invoking the computing function.
 * @returns Trigger object that will trigger changes only when the computed value changes.
 */
export declare function createComputedTrigger<T = any>(func: NoneTypeFunc<T>, funcThis?: any): ITrigger<T>;
/**
 * Increments mutation scope reference count
 */
export declare const enterMutationScope: () => void;
/**
 * Decrements mutation scope reference count. If it reaches zero, notifies all deferred watchers.
 */
export declare const exitMutationScope: () => void;
/**
 * Decorator function for defining properties so that changing their value will any watcher
 * objects attached to them to respond.
 * The form `@trigger` designates a default trigger decorator, whose depth will be assigned
 * depending on the value type: Shallow for arrays, maps and sets and Deep for objects.
 * The form `@trigger(n)` designates a trigger decorator factory with the specified depth.
 */
export declare const trigger: (targetOrDepth: any, name?: string | undefined) => any;
/**
 * Decorator function for defining "get" properties or functions retuning a value so that this
 * value will automatically recalculated if any triggers on which this value depends have their
 * values changed. WHen this happens, the watcher objects attached to this computed value will
 * be notified to respond.
 */
export declare const computed: (target: any, name: string, propDescr: PropertyDescriptor) => void;
//# sourceMappingURL=TriggerAPI.d.ts.map