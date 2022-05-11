import { IEventSlot } from "./EventSlotTypes";
/** Type for functions that accept any number of parameters and return any type */
export declare type AnyAnyFunc = (...args: any[]) => any;
/** Type for functions that accept no parameters and return values of any type */
export declare type NoneTypeFunc<T> = () => T;
/** Type for functions that accept no parameters and don't return any value */
export declare type NoneVoidFunc = () => void;
/** Type for functions that accept one parameter of the given type and don't return any value */
export declare type TypeVoidFunc<T> = (v: T) => void;
/**
 * The ITrigger interface represents an object that keeps a value and notifies all attached wathers
 * when this value changes.
 * @typeparam T Type of the trigger value.
 */
export interface ITrigger<T = any> extends IEventSlot<TypeVoidFunc<T>> {
    /** Retrieves the current value */
    get(): T;
    /** Sets a new value */
    set(v: T): void;
}
/**
 * The IWatcher interface represents a callable object that wraps a function and has the same
 * signature as this function. When a watcher is called it calls the wrapped function and attaches
 * to all triggers whose values were read during the course of the call. When values of these
 * triggers change, a responder function is called. The responder function is provided when the
 * watcher is created, but it can be changed later.
 * @typeparam T Type (signature) of the function to be watched.
 */
export interface IWatcher<T extends AnyAnyFunc = any> {
    /** This is a callable interface, which is implement as a function. */
    (...args: Parameters<T>): ReturnType<T>;
    /** Clears internal resources. */
    dispose(): void;
}
//# sourceMappingURL=TriggerTypes.d.ts.map