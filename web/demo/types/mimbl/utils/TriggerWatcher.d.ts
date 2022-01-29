/**
 * The IDisposer interface allows clients to inform the object that it can clear its internal
 * resources. The object cannot be used after it has been disposed off.
 */
export interface IDisposer {
    /** Clears internal resources. */
    dispose(): void;
}
/** Type for functions that accept any number of parameters and return any type */
export declare type AnyAnyFunc = (...args: any[]) => any;
/** Type for functions that accept no parameters and return values of any type */
export declare type NoneTypeFunc<T> = () => T;
/** Type for functions that accept no parameters and don't return any value */
export declare type NoneVoidFunc = () => void;
/**
 * The ITrigger interface represents an object that keeps a value and notifies all attached wathers
 * when this value changes.
 */
export interface ITrigger<T = any> {
    get(): T;
    set(v: T): void;
}
/**
 * Creates a trigger object of the given depth with the given initial value.
 * @param v
 */
export declare function createTrigger<T = any>(depth: number, v?: T): ITrigger<T>;
/**
 * The IWatcher interface represents a callable object that wraps a function and has the same
 * signature as this function. When a watcher is called it cals the wrapped function and attaches
 * to all triggers whose values were read during the course of the call. When values of these
 * triggers change, a responder function is called. The responder function is provided when the
 * watcher is created, but it can be changed later.
 */
export interface IWatcher<T extends AnyAnyFunc = any> extends IDisposer {
    /** This is a callable interface, which is implement as a function. */
    (...args: Parameters<T>): ReturnType<T>;
}
/**
 * Creates a watcher function with the same signature as the given regular function. When the
 * watcher function is invoked it invokes the original function and it notices all trigger objects
 * that were read during its execution. When any of these trigger objects have their values
 * changed, the responder function will be called.
 * @param func Function to be watched
 * @param responder Function to be invoked when values of the trigger objects encountered during
 * the original function's last execution change.
 * @param funcThis Optional value of "this" that will be used to call the original function.
 * @param responderThis Optional value of "this" that will be used to call the responder function.
 * If this value is undefined, the "this" value for the original function will be used.
 */
export declare function createWatcher<T extends AnyAnyFunc>(func: T, responder: NoneVoidFunc, funcThis?: any, responderThis?: any): IWatcher<T>;
/**
 * Increments mutation scope reference count
 */
export declare function enterMutationScope(): void;
/**
 * Decrements mutation scope reference count. If it reaches zero, notifies all deferred watchers.
 */
export declare function exitMutationScope(): void;
/**
 * The IComputedTrigger interface represents a value that is calculated by a function. This is a
 * combination of Trigger and Watcher. It is a watcher because it watches over the function and
 * calls it whenever any triggers this function uses are changed. It is a trigger because it
 * triggers change when the function returns a new value.
 *
 * The important fact about a computed trigger is that it only invokes the watched function
 * if it's value is being used by at least one watcher.
 */
export interface IComputedTrigger<T = any> extends ITrigger<T>, IDisposer {
}
/**
 * Creates a computed trigger object whose value is calculated by the given function and with an
 * optional initial value.
 * @param v
 */
export declare function createComputedTrigger<T = any>(func: NoneTypeFunc<T>, funcThis?: any): IComputedTrigger<T>;
/**
 * The IMutator interface represents a callable object that wraps a function and has the same
 * signature as this function. When a watcher is called it cals the wrapped function and attaches
 * to all triggers whose values were read during the course of the call. When values of these
 * triggers change, a responder function is called. The responder function is provided when the
 * watcher is created, but it can be changed later.
 */
export interface IMutator<T extends AnyAnyFunc = any> extends IDisposer {
    /** This is a callable interface, which is implement as a function. */
    (...args: Parameters<T>): ReturnType<T>;
}
/**
 * Creates a mutator function with the same signature as the given regular function which executes
 * the wrapped function within a mutation scope. Watchers for triggers that have their values
 * changed during execution of this function are not notified immediately. Instead, the watchers
 * are "deferred" and will be notified only once after the last mutation scope exits. This can be
 * useful since usually watchers depend on many triggers and we don't want the watchers being
 * notified many time but rather only once after all the changes have been done.
 * @param func Function around which to establish a mutation scope. If this is a class method,
 * then either provide the funcThis parameter or bind the function before passing it in. Note
 * that arrow functions are already bound.
 * @param funcThis The "this" value to apply when calling the function. This is necessary if the
 * function is an unboundclass method.
 */
export declare function createMutator<T extends AnyAnyFunc>(func: T, funcThis?: any): IMutator<T>;
/**
 * Decorator function for defining properties so that changing their value will any watcher
 * objects attached to them to respond.
 * The form `@trigger` designates a default trigger decorator, whose depth will be assigned
 * depending on the value type: Shallow for arrays, maps and sets and Deep for objects.
 * The form `@trigger(n)` designates a trigger decorator factory with the specified depth.
 */
export declare function trigger(targetOrDepth: any, name?: string): any;
/**
 * Decorator function for defining "get" properties or functions retuning a value so that this
 * value will automatically recalculated if any triggers on which this value depends have their
 * values changed. WHen this happens, the watcher objects attached to this computed value will
 * be notified to respond.
 */
export declare function computed(target: any, name: string, propDescr: PropertyDescriptor): void;
