import { EventSlotFunc, IEventSlotOwner, MultiEventSlotOwner } from "./EventSlotTypes";
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
    /**
     * Reference counter of the listener function.
     */
    private rc;
    private listeners?;
}
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
//# sourceMappingURL=EventSlotAPI.d.ts.map