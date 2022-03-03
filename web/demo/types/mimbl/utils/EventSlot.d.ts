/**
 * The IEventSlot interface represents an event with custom parameters. Multiple listeners can be
 * added/removed to/from an event.
 */
export interface IEventSlot<TFunc extends Function = Function> {
    /**
     * Adds the given function as a listener to the event. Note that this cannot be a lambda
     * function because there will be no way to remove a lambda function listener later.
     */
    attach(listener: TFunc): void;
    /** Removes the given function as a listener to the event. */
    detach(listener: TFunc): void;
    /** Determines whether this event slot has any listeners. */
    has(): boolean;
}
export declare type EventSlotFunc = (...args: any[]) => void;
/**
 * The IEventSlotOwner interface represents an event slot from the point of view of the caller who
 * created it. The owner can fire events and clear event listeners.
 */
export interface IEventSlotOwner<TFunc extends EventSlotFunc = any> extends IEventSlot<TFunc> {
    /**
     * Method that raises the event and calls all the listeners (if any). It has the signature
     * of the template function so only proper-types parameters can be passed to it.
     */
    fire(...a: Parameters<TFunc>): void;
    /** Removes all listeners to the event. */
    clear(): void;
}
/**
 * The EventSlot class defines an event with custom parameters as members of classes without the
 * need for the classes to derive from EventTarget and use string names for events. Multiple
 * listeners can be added/removed to/from an event.
 */
export declare class EventSlot<TFunc extends EventSlotFunc = any> implements IEventSlotOwner<TFunc> {
    /**
     * Method that raises the event and calls all the listeners (if any). It has the signature
     * of the template function so only proper-types parameters can be passed to it.
     */
    fire(...args: Parameters<TFunc>): void;
    /**
     * Adds the given function as a listener to the event.
     */
    attach(listener: TFunc): void;
    /** Removes the given function as a listener to the event. */
    detach(listener: TFunc): void;
    /** Determines whether this event slot has any listeners. */
    has(): boolean;
    /** Removes all listeners to the event. */
    clear(): void;
    /**
     * The first listener function. Since many times there is only one listener to an event, we
     * optimize by not creating a set of listeners.
     */
    private listener?;
    private listeners?;
}
/**
 * The MultiEventSlot type represents an object that for each property from the template type T
 * has corresponding property, which is an event slot for a function, whose signature is the same
 * as of the original property. For example, if we have the following type:
 *
 * ```typescript
 * type IMyEvents =
 * {
 *     click: () => void;
 *     change: ( newVal: number) => void;
 * }
 * ```
 *
 * then the MultiEventSlot<IMyEvents> type will have the following shape:
 *
 * ```typescript
 * {
 *     click: IEventSlot<() => void>;
 *     change: IEventSlot(newVal: number) => void>;
 * }
 * ```
 *
 */
export declare type MultiEventSlot<T> = {
    readonly [P in keyof T]: IEventSlot<Extract<T[P], EventSlotFunc>>;
};
/**
 * The MultiEventSlotOwner type represents an object that for each property from the template type
 * T has corresponding property, which is an event slot for a function, whose signature is the same
 * as of the original property. For example, if we have the following type:
 *
 * ```typescript
 * type IMyEvents =
 * {
 *     click: () => void;
 *     change: ( newVal: number) => void;
 * }
 * ```
 *
 * then the MultiEventSlotOwner<IMyEvents> type will have the following shape:
 *
 * ```typescript
 * {
 *     click: IEventSlotOwner<() => void>;
 *     change: IEventSlotOwner(newVal: number) => void>;
 * }
 * ```
 *
 */
export declare type MultiEventSlotOwner<T> = {
    readonly [P in keyof T]: IEventSlotOwner<Extract<T[P], EventSlotFunc>>;
};
/**
 * Creates an object that will have event slots for each property of the template type T. The
 * caller will be the owner of the event slots; that is, it will be able to fire events and
 * clear all listeners when necessary. This allows the following code:
 *
 * ```typescript
 * type IMyEvents =
 * {
 *     click: () => void;
 *     change: ( newVal: number) => void;
 * }
 *
 * interface IMyClass
 * {
 *     events: MultiEventSlot<IMyEvents>;
 *     doSomething(): void;
 * }
 *
 * class MyClass implements IMyClass
 * {
 *     private _events = createMultiEventSlot<IMyEvents>();
 *     public get events(): MultiEventSlot<IMyEvents> { return this._events; }
 *
 *     public doSomething(): void { this._events.change.fire(1);}
 * }
 *
 * let obj: IMyClass = new MyClass();
 * obj.events.change.attach( (n: number) => console.log(n));
 * obj.doSomething();
 * ```
 */
export declare function createMultiEventSlot<T>(): MultiEventSlotOwner<T>;
//# sourceMappingURL=EventSlot.d.ts.map