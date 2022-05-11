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
//# sourceMappingURL=EventSlotTypes.d.ts.map